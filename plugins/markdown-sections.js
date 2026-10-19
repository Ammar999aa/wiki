import fs from "fs";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";

// throwOnError: false — a typo'd formula should degrade to visible raw
// LaTeX in the built page, not fail the whole site build.
// nonStandard: true — the strict mode requires a literal space (or
// start-of-string) immediately before an opening "$" and whitespace/
// punctuation immediately after the closing one, so inline math wrapped in
// parentheses (`($0 < \beta < 1$)`) or split across a hard-wrapped source
// line (a "$" as the first character after a line break) silently fails to
// tokenize and falls through to literal text. No content in this repo uses
// "$" for anything but LaTeX math (checked: only *.md files under
// content/en/ that contain "$" are dry-lab-modeling.md and
// a stale math-only page, both math-only), so relaxing this is safe.
marked.use(markedKatex({ throwOnError: false, nonStandard: true }));

// Kebab-case anchor id for a "## Heading" title, e.g. "Tawasol: Uniting MENA
// iGEM Teams" -> "tawasol-uniting-mena-igem-teams". Article.jsx already
// renders each section's wrapper div with `id={section.id}` (for in-page
// and cross-page deep links, e.g. "/education#tawasol-hackathon") — this is
// what actually populates it.
function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Glue each `.flow-arrow` to the `.flow-node` after it in one `.flow-step`
// span, so a `.flow` that wraps onto several rows starts each new row with
// "→ Node" instead of stranding an arrow at the end of the previous row.
// Authors keep writing flat arrow/node spans; this runs on marked's output.
function groupFlowSteps(html) {
  return html.replace(
    /(<span class="flow-arrow">[^<]*<\/span>)\s*(<span class="flow-node[^"]*">[\s\S]*?<\/span>)/g,
    '<span class="flow-step">$1$2</span>',
  );
}

export default function markdownSections() {
  return {
    name: "markdown-sections",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;
      if (!id.includes("/content/")) return null;

      const raw = fs.readFileSync(id, "utf-8");
      const lines = raw.split("\n");
      const sections = [];
      let current = null;
      // Superheadings: a "# Title" line (outside code fences) groups the
      // "##" sections after it, and any prose between it and the first "##"
      // becomes the group's intro. A bare "#" line ends the group, so
      // trailing sections (References) belong to none. Pages that don't use
      // "# " lines get no `group` fields at all.
      let group = null;
      let inFence = false;

      for (const line of lines) {
        if (/^(```|~~~)/.test(line)) inFence = !inFence;
        if (!inFence && (line.startsWith("# ") || line.trim() === "#")) {
          if (current) sections.push(current);
          current = null;
          const title = line.slice(1).trim();
          group = title ? { title, id: slugify(title), body: "", used: false } : null;
        } else if (!inFence && line.startsWith("## ")) {
          if (current) sections.push(current);
          current = { title: line.replace("## ", "").trim(), body: "", group };
        } else if (current) {
          current.body += line + "\n";
        } else if (group) {
          group.body += line + "\n";
        }
      }
      if (current) sections.push(current);

      const parsed = sections.map((s) => {
        const out = {
          title: s.title,
          id: slugify(s.title),
          html: groupFlowSteps(marked(s.body.trim())),
        };
        if (s.group) {
          out.group = s.group.title;
          // The first section of a group carries the superheading to render.
          if (!s.group.used) {
            s.group.used = true;
            out.superheading = {
              title: s.group.title,
              id: s.group.id,
              html: groupFlowSteps(marked(s.group.body.trim())),
            };
          }
        }
        return out;
      });

      return {
        code: `export default ${JSON.stringify(parsed)};`,
        map: null,
      };
    },
  };
}
