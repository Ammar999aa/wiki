---
name: page-export
description: Export a wiki page as a lightweight, self-contained, read-only HTML file plus a text-only Markdown file, so people without the dev setup can read and review the page's full content offline. Use when asked to "export a page", "make an offline copy of /hardware", "send the Safety page to the team", or "give me the page's text as markdown".
---

# Page export

One command per export. Don't read the page sources or the output files;
the script reports everything you need.

```
node .claude/skills/page-export/export.mjs /hardware [/safety ...]
```

Takes routes from `src/pages.js`. It renders the page's own JSX (via Vite
SSR), so markdown pages and custom pages (Software, Dry Lab Overview, …)
work the same way. Pages that aren't articles (`/` Home, Sponsors, …) come
out as one block of text and structure, without animations or page
styling. That's rough, but every word is there to edit. It writes:

```
outputs/exports/<slug>/<slug>-export.html   offline, read-only, no scripts
outputs/exports/<slug>/<slug>-export.md     text only (via export_markdown.py)
```

It overwrites an existing export. `outputs/` is gitignored, and an export
can be regenerated from its commit.

## What to tell the person

Relay the script's summary in a few lines:

- both file paths;
- placeholders: photos become alt-text placeholders. Any component listed
  under "rendered as placeholders (browser-only)" is missing from the export
  (its text too, unless it was fed an `html` prop);
- every `TODO(humanize)` line: that copy is AI-drafted and still needs a
  human rewrite;
- every `WARN` line, and `+dirty` in the commit (uncommitted source changes
  are included in the export).

They send the files themselves. Don't email or upload them, and don't publish
them as an Artifact.

## Only if the script can't do it

Read `REFERENCE.md` in this folder only when the script fails, prints a WARN
you have to fix, or the person asks for something it doesn't cover (sub-article
pickers, chart data tables, a whole-page export that's missing text). Don't open the HTML in a browser
unless the person asks for a visual check.

## Guardrails

- Exports carry only real page content: never add or tidy copy, captions,
  alt text or numbers. If you spot a problem in the copy, say so in your
  reply. Don't put the fix in the file.
- Don't edit `Footer`, `LICENSE` or the license line.
