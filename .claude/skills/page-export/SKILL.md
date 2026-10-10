---
name: page-export
description: Export a wiki page as a lightweight, self-contained, read-only HTML file plus a text-only Markdown file, so people without the dev setup can read and review the page's full content offline. Use when asked to "export a page", "make an offline copy of /hardware", "send the Safety page to the team", or "give me the page's text as markdown".
---

# Page export: read-only HTML and text-only Markdown

Authors on the team aren't developers. They need to read a page's full content
(every word, table and chart value) without running `yarn dev` or reading
markdown, JSX or `data.js`. This skill produces two files per page:

1. **HTML export**: one offline HTML file (`template.html` in this folder),
   read-only. It keeps all text, tables, numbers and charts. Photos and
   interactive components become labelled placeholders.
2. **Markdown export**: the same page as text only (`export_markdown.py`
   converts the HTML export), for pasting into a doc or reviewing the wording.

Feedback comes back however the team prefers (comments, a doc, a message). It
doesn't come back through these files. Apply any requested changes to the
sources directly, the normal way.

Read `.claude/MARKDOWN-COMPONENTS.md` and `.claude/DESIGN.md` first if they
aren't already in context. The export's class names mirror the markdown
component classes on purpose, so an exported block maps back to its source
one to one.

## Files

| File | Purpose |
|---|---|
| `template.html` | Page shell: CSS for every markdown component, `{{…}}` slots. No scripts |
| `build_export.mjs` | `node .claude/skills/page-export/build_export.mjs spec.json` builds the HTML export for a **markdown-driven page**: it splits on `##` like the build plugin, renders with the repo's `marked`, and turns images into placeholders. You supply only the masthead and the `content`-override blocks (spec format at the top of the file). It refuses to overwrite an existing export unless `"overwrite": true` |
| `export_markdown.py` | `python3 export_markdown.py X-export.html X-export.md` writes the text-only Markdown from a finished HTML export |

**Markdown pages** (Hardware, Safety, Education, …): write a spec in the
scratchpad and run `build_export.mjs`. Steps 2–3 below are then only the
masthead and override snippets. **Custom pages** (Model/Software, …): see
"Custom pages" under step 3.

## Output location

```
outputs/exports/<page-slug>/<page-slug>-export.html
outputs/exports/<page-slug>/<page-slug>-export.md
```

To re-export a page, archive the old pair first (`…-export-<date>.html`) or
overwrite them deliberately. `outputs/` is not committed. Check `.gitignore`
covers `outputs/exports/`, and add it if it doesn't.

---

## 1. Find every source for the page

Start from the route in `src/pages.js` → the page component
(`src/pages/<Name>/<Name>.jsx`). Collect:

- the markdown it imports (`src/content/en/<page>.md`), split into sections
  on `##`. Each `##` is one section, whose id is the slug of its title (this
  matches the live page's anchors). Pages that set their own `id` per
  section (Model uses `s1`…`s12`) keep those ids;
- the masthead in the `.jsx` (`intro`, `eyebrow`, `deck`, stat grid, or a
  custom hero component such as Hardware's `BulbHero`). Read the hero
  component for its visible text;
- any `content` overrides (`sections.map(... ? { ...section, content: <X/> } ...)`).
  `Article.jsx` renders `content` **after that section's markdown**, so the
  placeholder for `<X/>` goes at the end of that section, not where it seems
  to fit. Get this right: an earlier hardware export put the 3D model in the
  wrong section;
- for custom pages (Model-style): `data.js`, `components/*.jsx`, and the
  per-section JSX in the page file;
- visible text **inside** those components: captions, labels, helper lines
  (e.g. `BioreactorModel.jsx`'s caption under the 3D model, `Explorer.jsx`'s
  Table 7 caption). That text is page copy, so export it as a plain `<p>`
  next to the placeholder with a `<!-- source: … -->` comment. Only the
  interactive part becomes a placeholder;
- `// TODO(humanize)` comments, which mark AI-drafted copy.

Record the current commit: `git rev-parse --short HEAD`. If the sources have
uncommitted changes, say so in your reply and put `<sha>+dirty` in the
export's commit slot.

## 2. Fill the template

Copy `template.html` and fill the slots:

| Slot | Value |
|---|---|
| `{{PAGE_TITLE}}` | the `title` from `pages.js` |
| `{{PAGE_SLUG}}` | the route without `/`, e.g. `hardware` |
| `{{ROUTE}}` | e.g. `/hardware` |
| `{{SOURCES}}` | comma-separated repo paths, e.g. `src/content/en/hardware.md, src/pages/Hardware/Hardware.jsx` |
| `{{COMMIT}}` / `{{DATE}}` | short sha / ISO date |
| `{{NAV}}` | one `<a href="#id">Section title</a>` per section |
| `{{MASTHEAD}}` | see below |
| `{{SECTIONS}}` | one `<section id="id" data-section="id">` per section |

Every section carries `data-section`, and the masthead uses
`<header class="masthead" data-section="masthead">`, so each block of the
export can be traced back to its source section.

**Masthead**

```html
<header class="masthead" data-section="masthead">
  <h1 class="pageTitle">Safety</h1>
  <p class="eyebrow">Project · Safety · BSL-1</p>
  <p class="deck">…deck text, with its <b>key phrase</b>…</p>
  <!-- TODO(humanize): drafted by Claude Code, not yet rewritten by the team -->
</header>
```

When a masthead or any other copy is marked `TODO(humanize)`, keep the
comment in the export and list that copy in your reply, so the person knows
which text still needs rewriting. For a custom hero (Hardware's `BulbHero`),
show its visible lines as a `.callout accent` with a `.callout-label` saying
"Animated hero on the live page". The text is kept; the animation is
described, not reproduced.

If the page needs a few styles the template doesn't have (Model's `.gene`,
`.locus`, `.t2card`, …), add them in a clearly labelled block at the end of
the export's `<style>`. Keep it offline: no external fonts, scripts or images.

## 3. Convert each block

Keep text **verbatim**: same wording, same numbers, same inline
bold/italic/links/`<sub>`/`<sup>`. Never tidy, fix or shorten copy during
an export: the export has to show exactly what the live page says. If you
spot a problem, mention it in your reply, not in the file.

| Source | Export as |
|---|---|
| Markdown prose, lists, `###`/`####`, blockquote, code | the plain HTML `marked` would produce |
| Any `.callout`, `.card-grid`, `.chip`, `.flow`, `.panel`/`.dash`, `.stat-grid`, `.table-wrap` + table, `.caption`, `.two-col-tracks`, `ol.goals`, `.tickets`, `.ladder`(+axis), `.pod` | the same element and classes; the template styles them all |
| `.cite` + `ol.ref-list` | keep both, with the same `href`/`id` pairs |
| `.details` | `<details class="details" open>`, so readers see the hidden text |
| Image (`![alt](url)`, `<img>`, `.photo-frame`) | `<div class="placeholder" data-kind="image" data-src="URL"><div class="kicker">Photo</div><p class="desc">ALT TEXT</p></div>`. Keep any `.two-col-images` / `.notebook-img-row` wrapper around the placeholders |
| `.person-card` | keep the card. The photo becomes `<div class="placeholder round" data-kind="image" data-src="URL"><div class="kicker">Photo</div></div>` inside `<div class="person-head">` with the name; keep `.person-more` content visible (the template labels it). Drop the button |
| Video, PDF viewer, 3D model, canvas, scroll animation, interactive explorer/filter | `<div class="placeholder" data-kind="interactive" data-component="BioreactorModel"><div class="kicker">Interactive 3D model</div><p class="desc">One sentence on what it shows on the live page.</p></div>` |
| Interactive *table* (e.g. Model's `Explorer`) | a static `.table-wrap` table of the rows it shows by default, preceded by a placeholder that says the live version is filterable |
| KaTeX (`$…$`, `$$…$$`) | `<code class="tex">…TeX source…</code>` |
| Model-style typed components (`Callout`, `Card`, `Pill`, `TableWrap`, `Caption`, `Details`, `SecRef`, `Cref`) | their markdown-class equivalents: `.callout <tone>` + `.callout-label`, `.card-grid` card with `<span class="tag">` + `<h5>`, `<span class="pill <tone>">`, `.table-wrap`, `.caption`, `details.details open`, `<a class="secref" href="#…">`, `<a class="cite" href="#ref-N">` |

**Charts and graphs (keep them in).** Each chart becomes a `figure.chart`
with two parts: a picture, and the numbers behind it.

```html
<figure class="chart" data-chart="ScatterChart" data-data="src/pages/Model/data.js#CANDIDATES">
  <div class="panel-title"><span>Chart title</span><span>subtitle</span></div>
  <div class="legend"><span><i style="background:#B16DFF"></i>Series A</span>…</div>
  <div class="chart-svg"><svg viewBox="…">…</svg></div>
  <details class="chart-data" open>
    <summary>Chart data</summary>
    <p class="hint">The numbers behind this chart.</p>
    <div class="table-wrap"><table>…one row per data point / bar…</table></div>
  </details>
</figure>
<div class="caption">…the figure's caption, verbatim…</div>
```

- **Picture:** first choice is the real rendered SVG (see "Custom pages"
  below, or read `outerHTML` from `yarn dev` with the claude-in-chrome
  tools). Strip class names that point at CSS modules and inline the few
  colours you need as `fill`/`stroke` attributes; CSS variables don't work
  inside SVG presentation attributes, so replace `var(--doc-*)` with the
  literal value. Drop tooltips and event handlers. For div-based charts
  (Model's `Funnel`, `BarRows`), draw a simple static SVG from the same
  data and the same width formula. Use the page's real colours, not new ones.
- **Data table:** always included, even when the picture is real. Build it
  from the exact values the component reads (`data.js` arrays, props). Put
  the source path and variable name in `data-data`. For a large dataset
  (more than ~60 rows), include the rows the chart actually labels or
  highlights, and say in the hint how many rows were left out.
- Markdown pages with hand-made figures (`.panel` + `.dash`, `.flow`) don't
  need this: they're already text.

**Don't** add content: no invented captions, alt text, chart labels or
summaries. A missing caption stays missing (mention it in your reply if
it matters).

### Custom pages: render the JSX instead of retyping it

Hand-copying a 1,500-line JSX page is slow and risks typos in the copy. What
worked for Software (`src/pages/Model/`) was rendering the page's own JSX to
static HTML with Vite SSR (`createServer` + `ssrLoadModule`,
`renderToStaticMarkup`) and a small plugin that:

- resolves every `*.module.scss` / `.css` import to a virtual module exporting
  `new Proxy({}, { get: (_, k) => k })`, so `styles.gene` renders as
  `class="gene"`;
- appends `export { sections, pageIntro, pageTitle }` to the page module so
  its internal arrays can be rendered section by section;
- swaps the presentational components (`Ui.jsx`, `References.jsx`, chart
  components, `Explorer.jsx`) for export-format versions that emit the
  classes in the table above around the same `children`, and stubs
  `useTooltip`.

Keep the build scripts in the scratchpad. Script files there need a
`node_modules` symlink to the repo's to resolve `react`. Then assemble the
template from the rendered sections and post-process the SVGs. Spot-check a
few paragraphs against the JSX afterwards. JSX whitespace rules (`{" "}`, line
breaks) are the main place text can shift.

## 4. Write the Markdown export

```
python3 .claude/skills/page-export/export_markdown.py \
  outputs/exports/<slug>/<slug>-export.html outputs/exports/<slug>/<slug>-export.md
```

It walks the HTML export's `<main>` and writes headings, prose, callouts
(as blockquotes with a bold label), cards, every page table (as Markdown
tables), figure titles and captions, `§`/citation links and the reference
list. It leaves out chart pictures, `Chart data` tables, legends,
placeholders and export chrome. Check that the `## ` count matches the
section count, and skim it for structure that came out flat.

## 5. Check before handing it over

- Open the HTML locally (`open <file>`). The browser tools can't open
  `file://`, so to check it there, serve the folder (`python3 -m http.server
  8765 --bind 127.0.0.1`, in the background) and stop the server afterwards.
  It must render with no network access: no external fonts, scripts or
  images (placeholders only). Outbound `<a href>` links in page copy are fine.
- Compare section count and order with the live page (`##` count in the
  `.md`, or the jump-nav on `yarn dev`).
- Reply with both file paths, what became placeholders, which charts are real
  SVG and which are redrawn, and any `TODO(humanize)` copy you found. The
  person sends the files. Don't email or upload them yourself unless asked.

## Guardrails

- Exports carry only real page content (`RESPONSIBLE_AI_USE.md`): no filler,
  no invented interim numbers, nothing "to make it look finished".
- Don't edit `Footer`, `LICENSE` or the license line. They aren't part of
  the export.
- The export is for the team. It isn't an Artifact and isn't published
  anywhere, and the files stay local.
