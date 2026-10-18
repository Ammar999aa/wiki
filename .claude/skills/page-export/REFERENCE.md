# page-export: reference (read only when export.mjs isn't enough)

## How export.mjs works

1. Finds the route's `title` and component in `src/pages.js`.
2. Starts Vite in SSR mode with the repo's own `vite.config.ts` (so `.md`
   imports go through `plugins/markdown-sections.js` exactly as on the site),
   plus a plugin that:
   - resolves `*.module.scss` to a Proxy, so `styles.foo` renders as
     `class="foo"`, and drops plain stylesheets. The module files the page
     imports are then compiled with `sass`. `styles.svg` renders as
     `class="svg svg__m<hash>"`: the plain name matches template.html, and
     the module's compiled selectors are rewritten to the scoped name, so two
     modules' same-named classes can't hit each other's elements together with the `:root` tokens from `src/styles/index.scss`,
     and put in an `@layer page` block. Charts keep their real colours, and
     the template's own rules still win wherever both set something.
     `SectionedArticle`'s styles are skipped because the template already
     covers them;
   - swaps `SectionedArticle` (and `NotebookArticle`) for a stub that
     captures its props: `title`, `intro`, `sections`, `panelHeader`;
   - makes `PageWrapper` render only its children;
   - swaps `ChartSlots` for a stub that captures its `charts` map, so
     `<div data-chart="id">` slots in the markdown get the chart rendered in.
3. Renders the intro, then each section's `html` followed by its `content`
   (the order `Article.jsx` uses). Every component sits in its own Suspense
   boundary, so a browser-only one (portals, `document`/`DOMParser` during
   render, WebGL) becomes a labelled placeholder instead of failing the
   page. This applies to every function component in page code: the plugin
   rewrites page modules' `react/jsx-dev-runtime` import to a stub runtime
   that swaps each component type for a guarded wrapper. Links render inside a
   `MemoryRouter`. If the component got an `html` string prop, that HTML is kept
   under the placeholder.
4. Turns `<img>`, video, iframe, canvas, `.pdf-viewer` and `.structure-3d`
   into placeholders (compact ones for images with no alt text), gives
   icon-sized SVGs with no `width` their viewBox size as attributes, opens
   every `<details>`, keeps TeX as source, strips
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
- **Page without `SectionedArticle`** (Home, Protocols, Protein Library,
  Roster, …): exported in whole-page mode. The page renders as one
  `<section id="page">`, inline `style` attributes are stripped (scroll
  animations park text at opacity 0), and only the site tokens are included,
  not the page's own styles. Responsive duplicates both show up (Home's
  challenge cards appear twice: the desktop planet grid and the mobile grid
  are rendered from the same `PROBLEMS` array). For a properly sectioned
  export, add a stub for that page's wrapper component.
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
