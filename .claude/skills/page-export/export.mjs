#!/usr/bin/env node
// One-command page export: read-only HTML + text-only Markdown.
//
//   node .claude/skills/page-export/export.mjs /hardware [/safety ...]
//
// Renders the page's own component with Vite SSR, so markdown pages and
// custom JSX pages (Model, DryLabModeling, ...) go through the same path:
//   - SectionedArticle is swapped for a stub that captures its props
//     (title, intro, sections); PageWrapper just renders its children;
//   - CSS module imports resolve to a Proxy, so `styles.foo` renders as
//     class="foo"; plain stylesheets resolve to nothing;
//   - each section is rendered as its markdown `html` followed by its
//     `content` JSX (the same order Article.jsx uses), then photos, video,
//     canvases and embeds become labelled placeholders.
// It prints a short summary; there is no need to open the output files.
import fs from "fs";
import path from "path";
import { execSync, execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import postcss from "postcss";

const here = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(here, "../../..");
process.chdir(REPO);

const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!routes.length) {
  console.error("usage: node .claude/skills/page-export/export.mjs /route [/route ...]");
  process.exit(1);
}

// ---------- route -> page component, read statically from src/pages.js ----------
const pagesSrc = fs.readFileSync("src/pages.js", "utf-8");
function findPage(route) {
  route = "/" + route.replace(/^\/+/, "");
  const at = pagesSrc.indexOf(`path: "${route}"`);
  if (at < 0) throw new Error(`no route ${route} in src/pages.js`);
  const objStart = pagesSrc.lastIndexOf("{", at);
  const objEnd = pagesSrc.indexOf("}", at);
  const obj = pagesSrc.slice(objStart, objEnd);
  const title = obj.match(/title:\s*"([^"]*)"/)?.[1];
  const comp = obj.match(/component:\s*(\w+)/)?.[1];
  const file = pagesSrc.match(new RegExp(`const ${comp} = lazyWithPreload\\(\\(\\) =>\\s*import\\("\\./([^"]+)"\\)`))?.[1];
  if (!file) throw new Error(`can't find the import for ${comp}`);
  return { route, slug: route.slice(1) || "home", title, comp, file: `/src/${file}.jsx` };
}

// ---------- Vite SSR with export stubs ----------
const STUB_SA = "\0export:SectionedArticle";
const STUB_PW = "\0export:PageWrapper";
const STUB_CS = "\0export:ChartSlots";
// Page code's JSX goes through a runtime that guards every component (see
// __exportGuardType below). Vite externalizes "react/jsx-dev-runtime" before
// resolveId sees it, so the import is rewritten after the JSX transform instead.
const jsxRewrite = {
  name: "page-export-jsx",
  enforce: "post",
  transform(code, id) {
    if (!id.startsWith(path.join(REPO, "src")) || !/\.[jt]sx$/.test(id)) return null;
    return code.replace(/(["'])react\/(jsx-(?:dev-)?runtime)\1/g, '"export-jsx:react/$2"');
  },
};
const modHash = (file) => "m" + createHash("md5").update(path.relative(REPO, file)).digest("hex").slice(0, 5);

// Scope a compiled module's class selectors to match the Proxy's scoped names,
// leaving :global(...) parts and quoted strings alone.
function scopeModule(css, h) {
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/.test(rule.parent.name)) return;
    rule.selectors = rule.selectors.map((sel) => {
      const keep = [];
      sel = sel.replace(/:global\(([^)]*)\)|"[^"]*"|'[^']*'/g, (m, g) => `\u0000${keep.push(g ?? m) - 1}\u0000`);
      sel = sel.replace(/\.(-?[_a-zA-Z][\w-]*)/g, `.$1__${h}`);
      return sel.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[+i]);
    });
  });
  return root.toString();
}

function exportPlugin() {
  return {
    name: "page-export",
    enforce: "pre",
    resolveId(src, importer) {
      // Keep the file path in the id, so the export can compile the page's own styles (charts need them).
      if (/\.module\.s?css(\?.*)?$/.test(src)) return "\0export:cssmod:" + path.resolve(path.dirname(importer || REPO), src.replace(/\?.*/, "")) + ":js"; // suffix keeps Vite's CSS plugin off it
      if (/\.s?css(\?.*)?$/.test(src)) return "\0export:css";
      if (/(SectionedArticle\/SectionedArticle|Notebook\/NotebookArticle|^\.\/NotebookArticle)(\.jsx)?$/.test(src)) return STUB_SA;
      if (/PageWrapper\/PageWrapper(\.jsx)?$/.test(src)) return STUB_PW;
      if (/\/ChartSlots(\.jsx)?$/.test(src)) return STUB_CS;
      if (src.startsWith("export-jsx:")) return "\0export:" + src.slice("export-jsx:".length);
      return null;
    },
    load(id) {
      // `styles.svg` renders as class="svg svg__<file hash>": the plain name for
      // template.html's rules, the scoped one for this module's own compiled CSS
      // (unscoped, two modules' `.svg` rules would hit each other's elements).
      if (id.startsWith("\0export:cssmod:")) {
        const h = modHash(id.slice("\0export:cssmod:".length, -":js".length));
        return `export default new Proxy({}, { get: (_, k) => (typeof k === 'string' ? k + " " + k + "__${h}" : undefined) });`;
      }
      if (id === "\0export:css") return "export default '';";
      if (id === STUB_SA) return "export default function SectionedArticle(p) { (globalThis.__pageExport ||= []).push(p); return null; }";
      if (id === STUB_PW) return "export default function PageWrapper({ children }) { return children; }";
      // ChartSlots portals charts into <div data-chart="id"> at runtime; keep its map so the export can fill the slots.
      if (id.startsWith("\0export:react/jsx")) {
        const rt = id.slice("\0export:".length);
        return `import * as rt from "${rt}";
export const Fragment = rt.Fragment;
const g = (t) => (globalThis.__exportGuardType ? globalThis.__exportGuardType(t) : t);
export const jsx = (t, ...a) => rt.jsx(g(t), ...a);
export const jsxs = (t, ...a) => rt.jsxs(g(t), ...a);
export const jsxDEV = (t, ...a) => rt.jsxDEV(g(t), ...a);`;
      }
      if (id === STUB_CS) return "export default function ChartSlots({ charts }) { globalThis.__pageExportCharts = charts; return null; }";
      return null;
    },
  };
}

const { createServer } = await import("vite");
const server = await createServer({
  root: REPO,
  configFile: path.join(REPO, "vite.config.ts"),
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
  plugins: [exportPlugin(), jsxRewrite],
  optimizeDeps: { noDiscovery: true, include: [] },
  ssr: { external: ["react", "react-dom"] },
});
const React = (await import("react")).default;
const { renderToStaticMarkup } = await import("react-dom/server");
const { MemoryRouter } = await import("react-router-dom");
const { TooltipProvider } = await server.ssrLoadModule("/src/components/Tooltip/Tooltip.jsx");
// Browser-only components (portals, `document`/`window` during render, WebGL)
// can't render in Node. Wrapping every component in a Suspense boundary makes
// React render that boundary's fallback instead of failing the whole page, so
// only the broken component becomes a placeholder.
let broken = [];
function fallbackFor(type, props) {
  const name = type.displayName || type.name || "Component";
  let fallback = React.createElement("div", { className: "placeholder", "data-kind": "interactive", "data-component": name },
    React.createElement("div", { className: "kicker" }, "Interactive component"),
    React.createElement("p", { className: "desc" }, `${name}: shown on the live page only.`));
  // Components fed a rendered-markdown string (tab sets, etc.) still carry their text: keep it.
  if (typeof props.html === "string") {
    fallback = React.createElement(React.Fragment, null, fallback, React.createElement("div", { dangerouslySetInnerHTML: { __html: props.html } }));
  }
  return fallback;
}
// Every function component used by page code is swapped (via the JSX runtime
// stub in the plugin) for a wrapper that renders it inside its own Suspense
// boundary, so a failure deep inside a custom page only loses that component.
// Wrapping the type, not the element, keeps element.props intact for code
// that inspects its children.
const guarded = new WeakMap();
globalThis.__exportGuardType = (type) => {
  if (typeof type !== "function" || type.prototype?.isReactComponent || type === React.Suspense) return type;
  if (!guarded.has(type)) {
    const G = (props) => React.createElement(React.Suspense, { fallback: fallbackFor(type, props) }, React.createElement(type, props));
    G.displayName = type.displayName || type.name;
    guarded.set(type, G);
  }
  return guarded.get(type);
};
const guard = (node) => node;
function render(node) {
  if (!node) return "";
  const err = console.error;
  console.error = (...a) => broken.push(String(a[0]?.message || a[0]).split("\n")[0]);
  try {
    return renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(TooltipProvider, null, guard(node))));
  } finally {
    console.error = err;
  }
}

// ---------- HTML post-processing ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1] || "";
const ph = (kind, kicker, desc, src = "") =>
  `<div class="placeholder" data-kind="${kind}"${src ? ` data-src="${src}"` : ""}><div class="kicker">${kicker}</div>${desc ? `<p class="desc">${desc}</p>` : ""}</div>`;

function protectTex(html) {
  // KaTeX source stays as source (the build plugin leaves $…$ in the html).
  return html
    .replace(/\$\$([\s\S]+?)\$\$/g, (m) => `<code class="tex">${esc(m)}</code>`)
    .replace(/(^|[^\\$])\$([^\n$<>]+?)\$/g, (_, pre, t) => `${pre}<code class="tex">${esc(`$${t}$`)}</code>`);
}

function simplify(html) {
  html = html.replace(
    /<img[^>]*class="person-photo"[^>]*>\s*(<h4 class="person-name">[\s\S]*?<\/h4>)/g,
    (m, name) => `<div class="person-head"><div class="placeholder round" data-kind="image" data-src="${attr(m, "src")}"><div class="kicker">Photo</div></div>${name}</div>`,
  );
  html = html.replace(/<p>\s*((?:<img\b[^>]*>\s*)+)<\/p>/g, "$1");
  // No alt text usually means a decorative thumbnail (map avatars, card art):
  // a compact placeholder that fits whatever box the page gives it.
  html = html.replace(/<img\b[^>]*>/g, (t) =>
    attr(t, "alt")
      ? ph("image", "Photo", attr(t, "alt"), attr(t, "src"))
      : `<div class="placeholder mini" data-kind="image" data-src="${attr(t, "src")}" title="Photo (no alt text in source)"><div class="kicker">Photo</div></div>`,
  );
  html = html.replace(/<(video|iframe|audio)\b[^>]*>[\s\S]*?<\/\1>/g, (m, t) =>
    ph("interactive", { video: "Video", audio: "Audio", iframe: "Embedded content" }[t], attr(m, "title") || attr(m, "aria-label") || "Shown on the live page.", attr(m, "src")),
  );
  html = html.replace(/<canvas\b[^>]*>(?:[\s\S]*?<\/canvas>)?/g, (m) => ph("interactive", "Interactive canvas", attr(m, "aria-label") || "Animated or 3D view on the live page."));
  html = html.replace(/<div class="pdf-viewer"[^>]*>[\s\S]*?<\/div>/g, (m) => ph("interactive", "PDF viewer", attr(m, "data-title") || "Embedded PDF on the live page."));
  html = html.replace(/<div class="structure-3d"[^>]*><\/div>/g, (m) => ph("interactive", "3D protein structure", `${attr(m, "data-label")} (PDB ${attr(m, "data-pdb")})`));
  // An icon-sized SVG with no width stretches to the full column when no page
  // style sizes it. Give it its viewBox size as attributes: any real CSS still wins.
  html = html.replace(/<svg\b[^>]*>/g, (t) => {
    const vb = attr(t, "viewBox").split(/[\s,]+/).map(Number);
    if (/\swidth=/.test(t) || vb.length !== 4 || vb[2] > 96) return t;
    return t.replace("<svg", `<svg width="${vb[2]}" height="${vb[3]}"`);
  });
  html = html.replace(/<link\b[^>]*>/g, ""); // React 19 hoists <link rel=preload> for images
  html = html.replace(/url\((["']?)https?:[^)]*\1\)/g, "none");
  html = html.replace(/<details class="details"(?![^>]*\sopen)/g, '<details class="details" open');
  html = html.replace(/<details(?![^>]*\sopen)/g, "<details open");
  html = html.replace(/<button[^>]*class="(?:person-more-btn|popup-next)"[^>]*>[\s\S]*?<\/button>\s*/g, "");
  return html;
}

// ---------- the page's own styles ----------
const sass = await import("sass");
const compile = (file) =>
  sass.compile(file, { loadPaths: [REPO, path.join(REPO, "src"), path.join(REPO, "node_modules")], silenceDeprecations: ["import", "global-builtin", "legacy-js-api"] }).css;
// Site tokens (--primary-300, --amber, ...) that module styles and inline SVG attributes refer to.
const tokens = (compile(path.join(REPO, "src/styles/index.scss")).match(/:root\s*\{[^}]*\}/g) || []).join("\n");
const styleCache = new Map();
function pageStyles(ids, warn) {
  const files = ids
    .filter((id) => id.startsWith("\0export:cssmod:"))
    .map((id) => id.slice("\0export:cssmod:".length, -":js".length))
    // SectionedArticle's markdown/masthead styles are already in template.html, in export form.
    .filter((f) => !/components\/(SectionedArticle|Tooltip)\//.test(f));
  const css = files.map((f) => {
    if (!styleCache.has(f)) {
      try {
        styleCache.set(f, `/* ${path.relative(REPO, f)} */\n` + scopeModule(compile(f), modHash(f)));
      } catch (e) {
        styleCache.set(f, "");
        warn.push(`couldn't compile ${path.relative(REPO, f)}: ${e.message.split("\n")[0]}`);
      }
    }
    return styleCache.get(f);
  });
  return [tokens, ...css].join("\n").replace(/url\((["']?)https?:[^)]*\1\)/g, "none").replace(/@import[^;]*;/g, "");
}

// ---------- export one page ----------
const date = new Date().toISOString().slice(0, 10);
let failed = 0;

for (const r of routes) {
  try {
    const page = findPage(r);
    globalThis.__pageExport = [];
    globalThis.__pageExportCharts = {};
    const mod = await server.ssrLoadModule(page.file);
    const whole = render(React.createElement(mod.default)); // also captures SectionedArticle's props
    broken = [];
    const warn = [];
    const props = globalThis.__pageExport[0];
    const wholePage = !props;
    let title, sections, body, masthead, nav;

    if (wholePage) {
      // Not an article (Home, Sponsors, ...): one block of the page's text and
      // structure. Inline styles go (scroll animations park text at opacity 0
      // or off-screen), and so do the page's own styles, below.
      warn.push("not an article page: exported as one block, without animations or page styling");
      title = page.title;
      sections = [{ id: "page", title }];
      body = `    <section id="page" data-section="page">\n${simplify(whole.replace(/\sstyle="[^"]*"/g, ""))}\n    </section>`;
      masthead = `<header class="masthead" data-section="masthead">\n  <h1 class="pageTitle">${title}</h1>\n</header>`;
      nav = "";
    } else {
      if (props.panelHeader) warn.push("page has a sub-article picker: only the default sub-article was exported");

      title = props.title || page.title;
      sections = props.sections.filter((s) => !s.heading);
      body = sections
        .map((s) => {
          const id = s.id || s.title;
          const charts = globalThis.__pageExportCharts;
          const filled = (s.html || "").replace(/<div data-chart="([\w-]+)"><\/div>/g, (m, k) => (charts[k] ? render(charts[k]) : m));
          const html = simplify(protectTex(filled + render(s.content)));
          if (!html.trim()) warn.push(`section "${s.title}" rendered empty`);
          return `    <section id="${id}" data-section="${id}">\n<h2>${s.title}</h2>\n${html}\n    </section>`;
        })
        .join("\n\n");
      masthead = `<header class="masthead" data-section="masthead">\n  <h1 class="pageTitle">${title}</h1>\n${simplify(render(props.intro)).replace(/<span class="mastheadDot"><\/span>/g, '<span class="mastheadDot"> · </span>')}\n</header>`;
      nav = sections.map((s) => `    <a href="#${s.id || s.title}">${s.title}</a>`).join("\n");
    }

    // Everything this page imports, walked from its own module (not every
    // module loaded so far, which would mix in earlier pages of the same run).
    const reached = new Set();
    const walk = (m) => {
      if (!m || reached.has(m.id)) return;
      reached.add(m.id);
      m.importedModules.forEach(walk);
    };
    walk(server.moduleGraph.getModuleById(path.join(REPO, page.file)));
    const styles = wholePage ? tokens : pageStyles([...reached], warn);
    const sources = [...reached]
      .filter((id) => id.startsWith(path.join(REPO, "src")) && !id.includes("?") && /\.(jsx?|md)$/.test(id))
      .map((id) => path.relative(REPO, id))
      .filter((p) => !p.startsWith("src/components/Tooltip"));
    const pageSources = sources.filter((p) => p.startsWith(path.dirname(page.file.slice(1))) || p.startsWith("src/content/"));
    let commit = execSync("git rev-parse --short HEAD").toString().trim();
    if (execFileSync("git", ["status", "--porcelain", "--", ...sources]).toString().trim()) commit += "+dirty";
    const todos = [];
    for (const p of pageSources) {
      fs.readFileSync(p, "utf-8").split("\n").forEach((l, i) => l.includes("TODO(humanize)") && todos.push(`${p}:${i + 1}`));
    }

    const fill = {
      PAGE_TITLE: title,
      PAGE_SLUG: page.slug,
      ROUTE: page.route,
      SOURCES: pageSources.join(", "),
      COMMIT: commit,
      DATE: date,
      NAV: nav,
      MASTHEAD: masthead,
      SECTIONS: body,
    };
    const out = fs
      .readFileSync(path.join(here, "template.html"), "utf-8")
      .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in fill ? fill[k] : m))
      .replace("</style>", () => `</style>\n<style>\n/* The page's own styles (chart colours etc.), compiled from its .module.scss files.\n   In a layer, so the export's rules above win wherever both set something. */\n@layer page {\n${styles}\n}\n</style>`);

    const dir = `outputs/exports/${page.slug}`;
    const htmlPath = `${dir}/${page.slug}-export.html`;
    const mdPath = `${dir}/${page.slug}-export.md`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(htmlPath, out);
    execFileSync("python3", [path.join(here, "export_markdown.py"), htmlPath, mdPath]);

    // Self-checks, so nobody has to open the files.
    const md = fs.readFileSync(mdPath, "utf-8");
    const h2 = (md.match(/^## /gm) || []).length;
    if (!wholePage && h2 !== sections.length) warn.push(`markdown has ${h2} "## " headings for ${sections.length} sections`);
    if (/<script\b|<link\b|<img\b|@import|url\(\s*["']?https?:/i.test(out)) warn.push("HTML references an external resource (should be fully offline)");
    const count = (re) => (out.match(re) || []).length;
    const kb = (p) => `${Math.round(fs.statSync(p).size / 1024)} KB`;

    console.log(`${page.route} → ${dir}/${page.slug}-export.{html,md}`);
    console.log(`  ${sections.length} sections · html ${kb(htmlPath)} · md ${kb(mdPath)} · commit ${commit}`);
    console.log(`  placeholders: ${count(/data-kind="image"/g)} photo, ${count(/data-kind="interactive"/g)} interactive · inline SVG kept: ${count(/<svg\b/g)}`);
    const fell = [...out.matchAll(/data-component="(\w+)"/g)].map((m) => m[1]);
    if (fell.length) console.log(`  rendered as placeholders (browser-only): ${[...new Set(fell)].join(", ")}`);
    if (todos.length) console.log(`  TODO(humanize): ${todos.join(", ")}`);
    for (const w of warn) console.log(`  WARN: ${w}`);
  } catch (e) {
    failed++;
    console.log(`${r} → FAILED: ${e.message.split("\n")[0]}`);
  }
}

await server.close();
process.exit(failed ? 1 : 0);
