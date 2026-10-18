# page-export: reference (read only when export.mjs isn't enough)

## How export.mjs works

1. Finds the route's `title` and component in `src/pages.js`.
2. Starts Vite in SSR mode with the repo's own `vite.config.ts` (so `.md`
   imports go through `plugins/markdown-sections.js` exactly as on the site),
   plus a plugin that:
   - resolves `*.module.scss` to a Proxy, so `styles.foo` renders as
     `class="foo"`, and drops plain stylesheets;
   - swaps `SectionedArticle` (and `NotebookArticle`) for a stub that
     captures its props: `title`, `intro`, `sections`, `panelHeader`;
   - makes `PageWrapper` render only its children;
   - swaps `ChartSlots` for a stub that captures its `charts` map, so
     `<div data-chart="id">` slots in the markdown get the chart rendered in.
3. Renders the intro, then each section's `html` followed by its `content`
   (the order `Article.jsx` uses). Every component sits in its own Suspense
   boundary, so a browser-only one (portals, `document`/`DOMParser` during
   render, WebGL) becomes a labelled placeholder instead of failing the
   page. If the component got an `html` string prop, that HTML is kept
   under the placeholder.
4. Turns `<img>`, video, iframe, canvas, `.pdf-viewer` and `.structure-3d`
   into placeholders, opens every `<details>`, keeps TeX as source, strips
   remote `url(...)` and `<link>`s. Fills `template.html`, then runs
   `export_markdown.py`.
5. Checks the Markdown `##` count against the section count, checks that no
   external resource is left, and greps the page's own sources for
   `TODO(humanize)`.

Interactive components render in their **default state** only: a tab set
shows its first tab, a stepper its first step. That's the main way text can
go missing without a placeholder. If it matters for a page, add that
component's case to the script (below), not to the page.

## Fixing a gap

Extend `export.mjs` rather than hand-building one export. That way the
next export of that page is a single command again.

- **Component fails, and its text matters**: add a stub to the plugin's
  `resolveId`/`load` (like `STUB_CS`) that renders its text statically. Or,
  if it fails only because of `window`/`document` during render, guard that
  in the component itself. That's also a real SSR fix for the site.
- **Sub-article picker (Education → Tawasol Hackathon)**: only the default
  sub-article is exported. To export another, temporarily point a scratch
  copy of the page at that article, or export its markdown on its own.
- **Page without `SectionedArticle`** (Experiments/`Protocols`, Protein
  Library, Roster, Attributions with `SectionedPage`): the script refuses.
  Either add a stub for that page's wrapper component, or build the HTML by
  hand from `template.html` using the conversions below.
- **Charts that need their numbers**: inline SVG is kept, so axis labels and
  values printed in the SVG survive. Values that appear only in tooltips
  don't. If a reviewer needs them, add a `<details class="chart-data" open>`
  data table built from the page's `data.js` after the figure (the template
  styles it, and the Markdown converter skips it).

## Template slots and conversions (manual builds)

`template.html` slots: `{{PAGE_TITLE}}`, `{{PAGE_SLUG}}`, `{{ROUTE}}`,
`{{SOURCES}}`, `{{COMMIT}}`, `{{DATE}}`, `{{NAV}}` (one `<a href="#id">`
per section), `{{MASTHEAD}}` (`<header class="masthead"
data-section="masthead">` with `h1.pageTitle`), `{{SECTIONS}}` (one
`<section id data-section>` per section, starting with its `<h2>`).

| Source | Export as |
|---|---|
| Markdown component classes (`.callout`, `.card-grid`, `.table-wrap`, `.flow`, `.stat-grid`, `.cite`/`.ref-list`, …) | unchanged; the template styles them |
| Image | `<div class="placeholder" data-kind="image" data-src="URL"><div class="kicker">Photo</div><p class="desc">ALT</p></div>` |
| Video, 3D, canvas, explorer | `<div class="placeholder" data-kind="interactive" data-component="Name"><div class="kicker">…</div><p class="desc">one line on what it shows</p></div>` |
| `.details` | `<details class="details" open>` |
| KaTeX | `<code class="tex">…source…</code>` |

Keep text verbatim. The file must work offline: no external fonts, scripts
or images.
