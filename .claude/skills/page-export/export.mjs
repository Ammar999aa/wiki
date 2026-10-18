#!/usr/bin/env node
// One-command page export: read-only HTML + text-only Markdown.
//
//   node .claude/skills/page-export/export.mjs /hardware [/safety ...]
//
// Renders the page's own component with Vite SSR, so markdown pages and
// custom JSX pages (Model, DryLabOverview, ...) go through the same path:
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
function exportPlugin() {
  return {
    name: "page-export",
    enforce: "pre",
    resolveId(src) {
      if (/\.module\.s?css(\?.*)?$/.test(src)) return "\0export:cssmod";
      if (/\.s?css(\?.*)?$/.test(src)) return "\0export:css";
      if (/(SectionedArticle\/SectionedArticle|Notebook\/NotebookArticle|^\.\/NotebookArticle)(\.jsx)?$/.test(src)) return STUB_SA;
      if (/PageWrapper\/PageWrapper(\.jsx)?$/.test(src)) return STUB_PW;
      if (/\/ChartSlots(\.jsx)?$/.test(src)) return STUB_CS;
      return null;
    },
    load(id) {
      if (id === "\0export:cssmod") return "export default new Proxy({}, { get: (_, k) => (typeof k === 'string' ? k : undefined) });";
      if (id === "\0export:css") return "export default '';";
      if (id === STUB_SA) return "export default function SectionedArticle(p) { (globalThis.__pageExport ||= []).push(p); return null; }";
      if (id === STUB_PW) return "export default function PageWrapper({ children }) { return children; }";
      // ChartSlots portals charts into <div data-chart="id"> at runtime; keep its map so the export can fill the slots.
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
  plugins: [exportPlugin()],
  optimizeDeps: { noDiscovery: true, include: [] },
  ssr: { external: ["react", "react-dom"] },
});
const React = (await import("react")).default;
const { renderToStaticMarkup } = await import("react-dom/server");
const { TooltipProvider } = await server.ssrLoadModule("/src/components/Tooltip/Tooltip.jsx");
// Browser-only components (portals, `document`/`window` during render, WebGL)
// can't render in Node. Wrapping every component in a Suspense boundary makes
// React render that boundary's fallback instead of failing the whole page, so
// only the broken component becomes a placeholder.
let broken = [];
function guard(node) {
  if (Array.isArray(node)) return node.map(guard);
  if (!React.isValidElement(node)) return node;
  const { type, props } = node;
  if (typeof type === "string" || type === React.Fragment) {
    return props.children === undefined ? node : React.cloneElement(node, null, ...[].concat(guard(props.children)));
  }
  const name = type.displayName || type.name || "Component";
  let fallback = React.createElement("div", { className: "placeholder", "data-kind": "interactive", "data-component": name },
    React.createElement("div", { className: "kicker" }, "Interactive component"),
    React.createElement("p", { className: "desc" }, `${name}: shown on the live page only.`));
  // Components fed a rendered-markdown string (tab sets, etc.) still carry their text: keep it.
  if (typeof props.html === "string") {
    fallback = React.createElement(React.Fragment, null, fallback, React.createElement("div", { dangerouslySetInnerHTML: { __html: props.html } }));
  }
  return React.createElement(React.Suspense, { key: node.key, fallback }, node);
}
function render(node) {
  if (!node) return "";
  const err = console.error;
  console.error = (...a) => broken.push(String(a[0]?.message || a[0]).split("\n")[0]);
  try {
    return renderToStaticMarkup(React.createElement(TooltipProvider, null, guard(node)));
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
  html = html.replace(/<img\b[^>]*>/g, (t) => ph("image", "Photo", attr(t, "alt") || "(no alt text in source)", attr(t, "src")));
  html = html.replace(/<(video|iframe|audio)\b[^>]*>[\s\S]*?<\/\1>/g, (m, t) =>
    ph("interactive", { video: "Video", audio: "Audio", iframe: "Embedded content" }[t], attr(m, "title") || attr(m, "aria-label") || "Shown on the live page.", attr(m, "src")),
  );
  html = html.replace(/<canvas\b[^>]*>(?:[\s\S]*?<\/canvas>)?/g, (m) => ph("interactive", "Interactive canvas", attr(m, "aria-label") || "Animated or 3D view on the live page."));
  html = html.replace(/<div class="pdf-viewer"[^>]*>[\s\S]*?<\/div>/g, (m) => ph("interactive", "PDF viewer", attr(m, "data-title") || "Embedded PDF on the live page."));
  html = html.replace(/<div class="structure-3d"[^>]*><\/div>/g, (m) => ph("interactive", "3D protein structure", `${attr(m, "data-label")} (PDB ${attr(m, "data-pdb")})`));
  html = html.replace(/<link\b[^>]*>/g, ""); // React 19 hoists <link rel=preload> for images
  html = html.replace(/url\((["']?)https?:[^)]*\1\)/g, "none");
  html = html.replace(/<details class="details"(?![^>]*\sopen)/g, '<details class="details" open');
  html = html.replace(/<details(?![^>]*\sopen)/g, "<details open");
  html = html.replace(/<button[^>]*class="(?:person-more-btn|popup-next)"[^>]*>[\s\S]*?<\/button>\s*/g, "");
  return html;
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
    renderToStaticMarkup(React.createElement(mod.default)); // only to capture SectionedArticle's props
    broken = [];
    const warn = [];
    const props = globalThis.__pageExport[0];
    if (!props) throw new Error(`${page.comp} doesn't render SectionedArticle; this exporter only handles article pages`);
    if (props.panelHeader) warn.push("page has a sub-article picker: only the default sub-article was exported");

    const title = props.title || page.title;
    const sections = props.sections.filter((s) => !s.heading);
    const body = sections
      .map((s) => {
        const id = s.id || s.title;
        const charts = globalThis.__pageExportCharts;
        const filled = (s.html || "").replace(/<div data-chart="([\w-]+)"><\/div>/g, (m, k) => (charts[k] ? render(charts[k]) : m));
        const html = simplify(protectTex(filled + render(s.content)));
        if (!html.trim()) warn.push(`section "${s.title}" rendered empty`);
        return `    <section id="${id}" data-section="${id}">\n<h2>${s.title}</h2>\n${html}\n    </section>`;
      })
      .join("\n\n");
    const masthead = `<header class="masthead" data-section="masthead">\n  <h1 class="pageTitle">${title}</h1>\n${simplify(render(props.intro)).replace(/<span class="mastheadDot"><\/span>/g, '<span class="mastheadDot"> · </span>')}\n</header>`;
    const nav = sections.map((s) => `    <a href="#${s.id || s.title}">${s.title}</a>`).join("\n");

    // Sources = every repo file Vite loaded for this page (minus shared app chrome).
    const sources = [...server.moduleGraph.idToModuleMap.keys()]
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
    const out = fs.readFileSync(path.join(here, "template.html"), "utf-8").replace(/\{\{(\w+)\}\}/g, (m, k) => (k in fill ? fill[k] : m));

    const dir = `outputs/exports/${page.slug}`;
    const htmlPath = `${dir}/${page.slug}-export.html`;
    const mdPath = `${dir}/${page.slug}-export.md`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(htmlPath, out);
    execFileSync("python3", [path.join(here, "export_markdown.py"), htmlPath, mdPath]);

    // Self-checks, so nobody has to open the files.
    const md = fs.readFileSync(mdPath, "utf-8");
    const h2 = (md.match(/^## /gm) || []).length;
    if (h2 !== sections.length) warn.push(`markdown has ${h2} "## " headings for ${sections.length} sections`);
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
