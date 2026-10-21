# Design system — how to build a new page

Read this before adding or restyling a page. It's a map of the patterns already
in the codebase, not a spec to redesign against — match what's here rather than
inventing a new look.

Companions: **[MARKDOWN-COMPONENTS.md](MARKDOWN-COMPONENTS.md)** (the styled
classes any `.md` page can use) and **[ARTICLE-STANDARDS.md](ARTICLE-STANDARDS.md)**
(what makes a data-heavy article page read as polished).

**Stack reality check:** despite README.md describing `.tsx`/`src/containers/App`,
the actual code is plain `.jsx`/`.js` (see `tsconfig.json` — it's config-only)
and lives at `src/App.jsx`, `src/pages/*`, `src/content/*`. Routing is
`src/pages.js` (not `pages.ts`). Follow the code, not the README's file list.

## Visual identity

Dark space theme: near-black indigo background, violet primary, frosted-glass
("liquid glass") panels floating over a faint tiled star/nebula texture with
occasional ambient meteors. All tokens live in `src/styles/index.scss` under
`:root`:

- **Color scales**: `--primary-*` (violet, brand), `--secondary-*` (dark
  neutrals), `--tertiary-*` (blue accent), each 100–900. Use the bare
  `--primary`/`--secondary`/`--tertiary` (= the 500 step) unless you need a
  specific shade. `--accent`/`--amber` (`#FFD84D`) is the one warm highlight
  color — used sparingly (e.g. the scroll-progress bar, `.chip.amber`,
  meteor color); `--accent-soft` is its 30% tint.
- **`--link` / `--link-hover`** (`#7B9EFF` / `#A0BFFF`) — the in-prose link
  color, deliberately more saturated than `--tertiary` (which stays for
  decorative/categorical accents). Shared by article body links, citations
  and popup links; reuse it instead of re-hardcoding a blue.
- **`--bg` (`#0A0A27`)** — the page background color, passed explicitly to
  `PageWrapper` on every page (see below); not applied globally.
- **`--maxw`** (1320px) — max content width. **`--nav-clearance`** (130px) —
  room to leave under page content so the fixed bottom nav never covers the
  last lines (`PageWrapper` adds it for you).
- **Radius scale**, iOS "continuous curve" spirit: `--radius-xs` 8px (inline
  code), `--radius-sm` 16px (images, code blocks), `--radius-md` 24px (medium
  cards), `--radius-lg` 32px (large cards/panels/dropdowns). `LiquidGlass`
  panels usually go bigger still (`radius={40}`) via its own squircle math,
  not this scale.
- **Type**: `Inter` (self-hosted variable font, weights 100–900, no italic —
  see `src/styles/fonts.scss` for why) is the base `font-family` on `:root`.
  `Aref Ruqaa` is the Arabic display face (the "شهاب" wordmark on Home, the
  `.polaroids` labels); `Silkscreen` is a pixel face used only in the
  Hardware dashboard. Arabic/RTL is otherwise dormant — see i18n below. Global
  heading sizes (`h2`/`h3`/`h4`) are set in `index.scss`; most pages don't
  override them beyond page-specific hero titles. Fonts are bundled
  (`src/assets/fonts/`, the only thing left in `src/assets/` that ships) —
  they're OFL-licensed and credited in the Footer.
- No CSS framework despite README mentioning Bootstrap/React Bootstrap —
  neither is a dependency (see `package.json`). Styling is hand-written SCSS
  modules (`*.module.scss`) plus the shared tokens above.
- **Low-performance mode**: `src/utils/perfMode.js` sets `data-perf="low"` on
  `<html>` for machines that scroll poorly (or `?perf=low|high` to force it);
  `LiquidGlass`'s backdrop blur and canvas animations drop out under it. If
  you add a new expensive effect (big blur, per-frame canvas), honour it —
  `isLowPerf()` for JS, `:root[data-perf="low"]` for CSS.

## Core building blocks (reuse, don't reinvent)

**`PageWrapper`** (`src/components/PageWrapper/PageWrapper.jsx`) — every single
page wraps its content in this, with the *same* background config, copy-pasted
verbatim across pages:
```jsx
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";
// ...
<PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
```
The two SVGs are hosted on iGEM's asset server (see Assets below), not
imported from `src/assets`. `PageWrapper` portals a fixed full-viewport
background div to `document.body` (so it doesn't scroll with content) and
gives the page a `min-height: 100dvh` wrapper. New pages should copy this
exact pattern unless there's a specific reason not to. Optional extras:

- `background.photo` (+ `photoPosition`, `photoOpacity`, `photoFade`,
  `photoClassName`) — a full-bleed photo under the gradient, as on Judging,
  ProteinLibrary and Roster. `photoFade` (a share of screen height) fades it
  out once scrolled past, in one CSS transition rather than per-frame —
  frosted panels re-blur on every repaint, so a continuously changing photo
  makes scrolling lag.
- `ambientMeteors` (default `true`) — the faint meteor canvas on every page.
  Home passes `false` because it renders its own richer `Starfield`.
- `navClearance` (default `true`) — the extra bottom scroll room. Home passes
  `false` because its closing Sponsors section already reserves it.
- `fixed`, `scrollable`, `className` — rarely needed.

**`LiquidGlass`** (`src/components/LiquidGlass/LiquidGlass.jsx`) — the
signature frosted-glass panel: a squircle-clipped, blurred, tinted div with an
optional cursor-follow edge glow. Used for *every* elevated surface — nav bar,
dropdown, cards, roster tiles, the sectioned-content pane. Backed by an SVG
blur filter mounted once in `LiquidGlassFilter` (rendered at the `App.jsx`
root — don't re-mount it per page). Typical usage:
```jsx
<LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
  <div className={styles.yourInner}>...</div>
</LiquidGlass>
```
`color` is an `[r,g,b]` array, not a CSS string. Common opacities: `0.07` for
dark glass-on-background cards, `0.25` for the nav/panel chrome (`color={[52,52,52]}`).
Set `radius` large relative to the box's short side to get a pill/circle
(roster thumbnails use very large `radius` values for this). Other props
(defaults in parentheses): `blur` (8), `cornerGlow` (true), `glowMask`,
`grain`, `drift`, `refract` (all off) — reach for these only if a page
already uses them; plain glass is the norm.

**Global chrome** — `Menu`, `SiteMark` (the small top-left logo link, hidden
on Home), `Footer`, `LiquidGlassFilter`, `NotFound` and `ChunkErrorBoundary`
are mounted once in `App.jsx` and apply to every route automatically — a new
page component never renders its own nav, logo or footer. The footer's
iGEM-required license/repo line (`Footer.jsx`) must not be duplicated or
removed per-page. `App.jsx` also sets `document.title`, the meta description
and the canonical link per route, and runs a View Transition crossfade
between routes (preloading the target chunk first) — none of which a page has
to do itself.

## Page archetypes

Three tiers of "how much a page needs to build." Pick the cheapest one that
fits the content you actually have.

**1. Not written yet → `Stub`.** Every route in `pages.js` should resolve to
*something*; pages without real content point at
`src/pages/Stub/Stub.jsx`, which renders a centered "Coming soon" + title over
the standard `PageWrapper` background and marks itself `noindex`. Don't invent
placeholder copy — wire the route to `Stub` and leave content for later (see
the i18n `CLAUDE.md` note on why a prior placeholder article was deleted
outright rather than kept). Stub routes are also left out of the sitemap
automatically; a page joins it on the next build once it stops being a Stub.

**2. Prose/article content → markdown + `SectionedArticle` or `SectionedPage`.**
This is the standard pattern for long-form written content (most of the
site: Project Description, Parts, Protocols, Results, Safety, Contribution,
Human Practices, Education, …). Write the content as markdown in
`src/content/en/<page>.md` using `##` headers — each `##` becomes one section:
```md
## First Section Title
Body markdown for this section...

## Second Section Title
More body markdown...
```
The `markdown-sections` Vite plugin (`plugins/markdown-sections.js`) parses
any `.md` under a `/content/` path at build time into
`[{ title, html, id, … }, ...]` via `marked` (with KaTeX for `$…$` math, a
slug `id` per section for `#deep-links`, and `.flow` arrow grouping),
importable directly as a JS module:
```jsx
import sections from "../../content/en/wetlab.md";
```
Then render it:
- **`SectionedArticle`** (`src/components/SectionedArticle/`) — single
  scrolling column; the side panel is a jump-to-section index synced to scroll
  position via `IntersectionObserver`, with a document scroll-progress bar and
  the site's closing Sponsors strip underneath. Props beyond `sections` and
  `title`:
  - `intro` — JSX rendered between the `<h1>` and the first section (figures
    that must sit above section 1, or a `Masthead`).
  - `numbered` — "01", "02" … beside each heading and nav entry; only for long
    pages whose sections refer back to each other by number.
  - `accentBold`, `panelHeader`, `panelLinks`/`panelLinkTints`,
    `defaultSelected` — fine-tuning; copy a neighbouring page rather than
    guessing.
  - A section may carry a `content` JSX node (alongside or instead of `html`)
    and a `titleContent` for a styled panel label — this is how custom
    components get inside an article without forking it.
- **`Masthead`** (`src/components/SectionedArticle/Masthead/`) — the shared
  eyebrow line + one-sentence deck (+ optional `stats` grid) for the `intro`
  slot. Used by most article pages; its first eyebrow item should be the nav
  trail the reader clicked ("Dry Lab", "Overview"). See ARTICLE-STANDARDS.md §1.
- **`SectionedPage`** (`src/components/SectionedPage/`) — click-to-switch
  panel (no scrolling between sections, one section replaces another), and
  its `Content` supports a photo + role/department header per section. Use
  for people/profile-style listings (`Attributions` builds its `sections`
  array by hand in JS instead of markdown, one entry per person, because it
  needs per-entry photos/roles — see that file for the pattern). Both accept
  a `heading` entry (`{ heading: "..." }`) to insert a non-selectable group
  label into the panel, e.g. `Attributions`'s "Students" / "Principal
  Investigators" / "Advisors" / "Volunteers" split.

Both variants share one visual language (defined once in each component's
`.module.scss`) for rendered markdown: headings, `p`, `a` (blue, underlined),
`blockquote`, lists, tables, `code`/`pre`, `hr` — don't restyle these
per-page; extend the shared stylesheet if a new markdown element needs rules.

**The cheap upgrade tier.** Before building bespoke JSX for a callout, card
row, figure, citation, popup, tab set, etc., check
**[MARKDOWN-COMPONENTS.md](MARKDOWN-COMPONENTS.md)** — a large catalogue of
classes (`.callout`, `.card-grid`, `.table-wrap`, `.caption`, `.stat-grid`,
`.popup-grid`, `.cite`, …) is already styled in `SectionedArticle.module.scss`
and usable from plain markdown. Most pages need nothing beyond that.

**Real components inside markdown (`data-slot`).** When a mostly-prose page
needs a live React piece mid-section (a 3D model, a chart, a simulation),
don't convert the whole page: mark the spot in the `.md` with an empty
`<div data-slot="name"></div>`, then in the page component split each
section's `html` at those markers and render the matching component between
the pieces, passing the result as the section's `content`. `Hardware.jsx`
(`withSlots`) is the reference implementation; `ProofOfConcept`,
`Inclusivity` and `HumanIntegratedPractices` use the same idea. Captions and
surrounding prose stay editable in the `.md`. A variant: `DryLabModeling`
marks spots with `<div data-chart="id"></div>` and portals the chart in at
runtime (`ChartSlots`), which keeps the chart mid-section but needs a
MutationObserver because `SectionedArticle` re-renders rebuild the HTML.

**3. Bespoke layout → custom page.** For anything that isn't a plain article
or profile list (`Home`, `Roster`, `ProteinLibrary`, `Sponsors`, `Judging`,
and the data-heavy `Model` at `/software`), build a page component from
scratch under `src/pages/<Name>/<Name>.jsx` + `<Name>.module.scss`, still
wrapped in the same `PageWrapper`, and reuse `LiquidGlass` for any elevated
surface. `ProteinLibrary` and `Judging` are the cleanest small examples:
static content, a plain data array, mapped over a `.module.scss` grid
(`Judging` also shows an article-shaped page that is JSX because every
criterion is a `LiquidGlass` card). `Home` is the far end of the spectrum
(scroll-driven animation engine, canvas starfield) — don't reach for that
complexity unless the page actually needs it. For a long, quantitative
article that outgrows markdown, follow ARTICLE-STANDARDS.md and feed custom
sections into `SectionedArticle` via `content`.

## Routing & navigation — `src/pages.js` is the single source of truth

Add a page by editing **only** `src/pages.js`; both routing (`App.jsx`) and
the nav bar (`Menu.jsx`) derive from it, so there's no separate list to keep
in sync (this replaced an older setup that caused a real path-casing bug —
see the comment at the top of `pages.js`). `plugins/sitemap.js` reads the same
file to emit `sitemap.xml`.

- Page components are imported with `lazyWithPreload(() => import(...))`
  (defined at the top of `pages.js`), so each route is its own chunk and
  `App.jsx` can preload the target before its transition. Add new pages the
  same way, not with a static `import`.
- Flat entries: `{ name, title, path, component, description? }`.
- Grouped/dropdown entries: `{ name, folder: [ {name, title, path, component}, ... ] }`
  — renders as a nav dropdown; `folder` children are what `getPathMapping()`
  flattens into actual routes.
- `hidden: true` on a flat entry routes it (reachable by direct URL) without
  listing it in the nav or the sitemap — used for pages superseded by a newer
  category structure but kept at their old URL, for old URLs from before paths
  were aligned with iGEM's required award URLs, and for required-URL Stubs not
  yet in the nav. When several routes render the same component, the canonical
  `<link>` points at the first one in `pages.js` — so put the preferred URL
  first.
- `description` (optional) is the page's search/link-preview snippet; keep it
  to text already on the page. Without one the site-wide description from
  `index.html` is used.
- `name` is what the nav renders; `title` feeds `document.title` (as
  "`<title> · SHIHAB · KAUST-KSA iGEM 2026`") and any page that displays its
  own title (e.g. `Stub`).
- The categories currently in `pages.js` — `Home`, `Project`, `Wet Lab`,
  `Hardware`, `Dry Lab`, `Beyond the Lab`, `Team`, `Judging` — follow
  `src/content/pages.md`; check that file before adding a new top-level
  category rather than inventing one. Home isn't listed in the nav (the logo
  links to it).
- Several paths are fixed by iGEM's award requirements (`/engineering`,
  `/human-practices`, `/model`, `/software`, `/safety-and-security`,
  `/contribution`, `/education`, `/hardware`, `/inclusivity`, `/measurement`,
  …). Don't rename one without keeping the old URL as a `hidden` route.
- `site.js` (`SITE_URL`) and `vite.config.ts` (`base: "/kaust-ksa/"`) are
  hardcoded on purpose — see the comments there; internal links on a page
  must account for the `/kaust-ksa/` base (use `<Link>` / router paths, or
  `#anchors` inside markdown).

## i18n — mostly dormant, don't block on it

Translation infra (`src/i18n/LanguageContext.jsx`, `useLanguage()`/`t()`) is
mid-removal: `ar`/`es`/`fr` were stripped to keep the wiki English-only while
content is still being written (full context in `src/i18n/CLAUDE.md`). Only
`Roster` and `Attributions` still route their copy through `t("...")` against
`src/i18n/en.json`; every other page (`Stub`, `Sponsors`, `Judging`, `NotFound`,
`Home`, markdown-driven pages) just hardcodes English strings directly in JSX.
For a new page, **hardcode English text** like the majority of pages do —
don't newly wire a page into `useLanguage()` unless you're specifically asked
to restore i18n, since that's a half-migrated system, not the current norm.

## Assets

Images, photos, SVG backgrounds and videos are hosted on iGEM's asset server
and referenced by URL — **not** imported from `src/assets/`:

- Site-wide files live under `https://static.igem.wiki/teams/6341/wiki/`:
  `svg-assets/` (background, gradient, logos), `images/` (page photos),
  `roster/` (team portraits, `.avif`), `content/<page>/` (per-page figures,
  e.g. `content/hardware/…`). Prefer `.webp`/`.avif`.
- Page components keep these as top-of-file string constants (`const bg = "…"`,
  or a small `ROSTER_CDN`/`media` base + filename), usually with the comment
  "Hosted on iGEM's asset server rather than bundled locally". In markdown,
  write the full `https://static.igem.wiki/…` URL.
- This is an iGEM requirement (README.md: everything the wiki loads must be
  served from iGEM infrastructure; no Google Fonts, jsDelivr, cdnjs …), so
  **don't add a local image import or an external CDN link for a new asset** —
  upload it through iGEM's uploads tool and reference the resulting URL.
  Videos are embedded from iGEM Video Universe.
- 3D structures go through the same uploader (see `.structure-3d` in
  MARKDOWN-COMPONENTS.md and `src/components/StructureCanvas/structures.js`).
- `src/assets/` now holds only `fonts/` (bundled, OFL license files kept as
  paperwork) and a stray `Design Wet Lab (2)` export folder that no page
  imports. Don't add new images there.

## Quick checklist: adding a new page

1. Does it have real written content yet? If not, point its `pages.js` entry
   at `Stub` and stop there.
2. Is it prose/an article? Write `src/content/en/<name>.md` with `##`
   section headers, then a thin page component importing it into
   `SectionedArticle` (or `SectionedPage` for a people/profile list),
   wrapped in `PageWrapper` with the standard background props. Add a
   `Masthead` in `intro`, and format with the classes in
   MARKDOWN-COMPONENTS.md. Use a `data-slot` if one section needs a live
   component.
3. Otherwise, build a custom `src/pages/<Name>/<Name>.jsx` +
   `.module.scss`, still inside `PageWrapper`, reusing `LiquidGlass` for any
   card/panel/nav-like surface and the color/radius tokens from
   `src/styles/index.scss` rather than new hardcoded hex values. If it's a
   long data-backed article, read ARTICLE-STANDARDS.md first.
4. Host any images/media on `static.igem.wiki` and reference them by URL (see
   Assets) — no local image imports.
5. Register it in `src/pages.js` using `lazyWithPreload` (flat, or inside an
   existing `folder` category matching `src/content/pages.md`), with a
   `description` if it's a real page — this alone wires up the route, the nav
   link, the canonical URL and the sitemap. Don't touch `App.jsx` or
   `Menu.jsx`.
6. Don't add your own `<Footer>`/nav/`SiteMark`/`LiquidGlassFilter` — those
   are global.
7. Before finishing, run `yarn lint` and `yarn build` (the build also runs
   `tsc` and generates the sitemap), and keep claims, numbers and citations
   to what the team actually has (RESPONSIBLE_AI_USE.md).
