#!/usr/bin/env node
// Build a read-only page export from a markdown-driven page.
//
// Usage (from the repo root):
//   node .claude/skills/page-export/build_export.mjs spec.json
//
// spec.json:
// {
//   "md": "src/content/en/hardware.md",
//   "title": "Hardware",                 // pages.js title
//   "slug": "hardware",                  // route without "/"
//   "sources": ["src/content/en/hardware.md", "src/pages/Hardware/Hardware.jsx"],
//   "masthead": "<header class=\"masthead\" data-section=\"masthead\">…</header>",
//   "append": { "Section title": "<div class=\"placeholder\">…</div>" },  // content overrides
//   "out": "outputs/exports/hardware/hardware-export.html"
// }
//
// Splits the markdown on "## " exactly like plugins/markdown-sections.js,
// renders each section with the repo's own `marked`, then swaps photos for
// placeholders, opens <details>, keeps TeX as source and drops
// live-site-only buttons. Masthead and content-override placeholders are
// written by hand into the spec, since they come from JSX.
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { marked } from "marked";

const here = path.dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(fs.readFileSync(process.argv[2], "utf-8"));

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Keep TeX as source instead of rendering it.
function protectTex(md) {
  const parts = [];
  const put = (tex) => `@@TEX${parts.push(tex) - 1}@@`;
  md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => put(`$$${t}$$`));
  md = md.replace(/\$([^\n$]+?)\$/g, (_, t) => put(`$${t}$`));
  return { md, restore: (html) => html.replace(/@@TEX(\d+)@@/g, (_, i) => `<code class="tex">${esc(parts[+i])}</code>`) };
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : "";
}

function simplify(html) {
  // person-card photos → round placeholder grouped with the name
  html = html.replace(
    /<img[^>]*class="person-photo"[^>]*>\s*(<h4 class="person-name">[\s\S]*?<\/h4>)/g,
    (m, name) =>
      `<div class="person-head"><div class="placeholder round" data-kind="image" data-src="${attr(m, "src")}"><div class="kicker">Photo</div></div>${name}</div>`,
  );
  // marked wraps a lone image in <p>; unwrap it so the block placeholder isn't inside a <p>
  html = html.replace(/<p>\s*((?:<img\b[^>]*>\s*)+)<\/p>/g, "$1");
  // every other image → placeholder with its alt text
  html = html.replace(/<img\b[^>]*>/g, (tag) => {
    const alt = attr(tag, "alt");
    return `<div class="placeholder" data-kind="image" data-src="${attr(tag, "src")}"><div class="kicker">Photo</div><p class="desc">${alt || "(no alt text in source)"}</p></div>`;
  });
  // videos / iframes / PDF viewers → interactive placeholders
  html = html.replace(/<(video|iframe)\b[^>]*>[\s\S]*?<\/\1>/g, (m, t) =>
    `<div class="placeholder" data-kind="interactive" data-src="${attr(m, "src")}"><div class="kicker">${t === "video" ? "Video" : "Embedded content"}</div><p class="desc">${attr(m, "title") || attr(m, "aria-label") || "Shown on the live page."}</p></div>`,
  );
  html = html.replace(/<div class="pdf-viewer"[^>]*>[\s\S]*?<\/div>/g, (m) =>
    `<div class="placeholder" data-kind="interactive"><div class="kicker">PDF viewer</div><p class="desc">${attr(m, "data-title") || "Embedded PDF on the live page."}</p></div>`,
  );
  html = html.replace(/<details class="details"(?![^>]*\sopen)/g, '<details class="details" open');
  html = html.replace(/<button[^>]*class="person-more-btn"[^>]*>[\s\S]*?<\/button>\s*/g, "");
  return html;
}

const raw = fs.readFileSync(spec.md, "utf-8");
const sections = [];
let cur = null;
for (const line of raw.split("\n")) {
  if (line.startsWith("## ")) {
    if (cur) sections.push(cur);
    cur = { title: line.replace("## ", "").trim(), body: "" };
  } else if (cur) cur.body += line + "\n";
}
if (cur) sections.push(cur);

const append = spec.append || {};
for (const t of Object.keys(append)) {
  if (!sections.some((s) => s.title === t)) throw new Error(`append: no section titled "${t}"`);
}

const nav = sections.map((s) => `    <a href="#${slugify(s.title)}">${s.title}</a>`).join("\n");
const body = sections
  .map((s) => {
    const id = slugify(s.title);
    const { md, restore } = protectTex(s.body.trim());
    const html = simplify(restore(marked(md)));
    const extra = append[s.title] ? `\n<!-- content override from the page .jsx -->\n${append[s.title]}` : "";
    return `    <!-- source: ${spec.md} · ## ${s.title} -->\n    <section id="${id}" data-section="${id}">\n<h2>${s.title}</h2>\n${html}${extra}\n    </section>`;
  })
  .join("\n\n");

let commit = execSync("git rev-parse --short HEAD").toString().trim();
if (execSync(`git status --porcelain -- ${spec.sources.join(" ")}`).toString().trim()) commit += "+dirty";
const date = new Date().toISOString().slice(0, 10);

const masthead = spec.masthead || `<header class="masthead" data-section="masthead">\n  <h1 class="pageTitle">${spec.title}</h1>\n</header>`;
const fill = {
  PAGE_TITLE: spec.title,
  PAGE_SLUG: spec.slug,
  ROUTE: `/${spec.slug}`,
  SOURCES: spec.sources.join(", "),
  COMMIT: commit,
  DATE: date,
  NAV: nav,
  MASTHEAD: masthead,
  SECTIONS: body,
};
const out = fs
  .readFileSync(path.join(here, "template.html"), "utf-8")
  .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in fill ? fill[k] : m));

fs.mkdirSync(path.dirname(spec.out), { recursive: true });
if (fs.existsSync(spec.out) && !spec.overwrite) {
  throw new Error(`${spec.out} exists. Archive it or set "overwrite": true.`);
}
fs.writeFileSync(spec.out, out);
console.log(`wrote ${spec.out} (${sections.length} sections, commit ${commit})`);
