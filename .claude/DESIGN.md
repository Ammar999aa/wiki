# Design system — how to build a new page

Read this before adding or restyling a page. It's a map of the patterns already
in the codebase, not a spec to redesign against — match what's here rather than
inventing a new look.

**Stack reality check:** despite README.md describing `.tsx`/`src/containers/App`,
the actual code is plain `.jsx`/`.js` (see `tsconfig.json` — it's config-only)
and lives at `src/App.jsx`, `src/pages/*`, `src/content/*`. Follow the code, not
the README's file list.

## Visual identity

Dark space theme: near-black indigo background, violet primary, frosted-glass
("liquid glass") panels floating over a faint tiled star/nebula texture. All
tokens live in `src/styles/index.scss` under `:root`:

- **Color scales**: `--primary-*` (violet, brand), `--secondary-*` (dark
  neutrals), `--tertiary-*` (blue accent), each 100–900. Use the bare
  `--primary`/`--secondary`/`--tertiary` (= the 500 step) unless you need a
  specific shade. `--accent`/`--amber` (`#FFD84D`) is the one warm highlight
  color — used sparingly (e.g. the "Medicine" essential on Home, meteor color).
- **`--bg` (`#0A0A27`)** — the page background color, passed explicitly to
  `PageWrapper` on every page (see below); not applied globally.
- **Radius scale**, iOS "continuous curve" spirit: `--radius-xs` 8px (inline
  code), `--radius-sm` 16px (images, code blocks), `--radius-md` 24px (medium
  cards), `--radius-lg` 32px (large cards/panels/dropdowns). `LiquidGlass`
  panels usually go bigger still (`radius={40}`) via its own squircle math,
  not this scale.
- **Type**: `Inter` (self-hosted variable font, weights 100–900, no italic —
  see `src/styles/fonts.scss` for why) is the base `font-family` on `:root`.
  `Aref Ruqaa` exists for Arabic display text (e.g. the "شهاب" wordmark on
  Home) but Arabic/RTL is otherwise dormant — see i18n section below. Global
  heading sizes (`h2`/`h3`/`h4`) are set in `index.scss`; most pages don't
  override them beyond page-specific hero titles.
- No CSS framework despite README mentioning Bootstrap/React Bootstrap —
  neither is a dependency (see `package.json`). Styling is hand-written SCSS
  modules (`*.module.scss`) plus the shared tokens above.

## Core building blocks (reuse, don't reinvent)

**`PageWrapper`** (`src/components/PageWrapper/PageWrapper.jsx`) — every single
page wraps its content in this, with the *same* background config, copy-pasted
verbatim across pages:
```jsx
<PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
```
where `bg` = `src/assets/bg.svg?url` and `gradient` = `src/assets/gradient.svg?url`.
It portals a fixed full-viewport background div to `document.body` (so it
doesn't scroll with content) and gives the page a `min-height: 100dvh`
wrapper. New pages should copy this exact pattern unless there's a specific
reason not to (Home does — see `Starfield` canvas layered on top of the same
`PageWrapper`).

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
(roster thumbnails use very large `radius` values for this).

**`Menu`, `Footer`, `LiquidGlassFilter`, `NotFound`** are mounted once in
`App.jsx` and apply to every route automatically — a new page component never
renders its own nav or footer. The footer's iGEM-required license/repo line
(`Footer.jsx`) must not be duplicated or removed per-page.

## Page archetypes

Three tiers of "how much a page needs to build." Pick the cheapest one that
fits the content you actually have.

**1. Not written yet → `Stub`.** Every route in `pages.js` should resolve to
*something*; pages without real content point at
`src/pages/Stub/Stub.jsx`, which renders a centered "Coming soon" + title over
the standard `PageWrapper` background. Don't invent placeholder copy — wire
the route to `Stub` and leave content for later (see the i18n `CLAUDE.md`
note on why a prior placeholder article was deleted outright rather than kept).

**2. Prose/article content → markdown + `SectionedArticle` or `SectionedPage`.**
This is the standard pattern for long-form written content (Wet Lab, Dry Lab,
Human Practices, Education). Write the content as markdown in
`src/content/en/<page>.md` using `##` headers — each `##` becomes one section:
```md
## First Section Title
Body markdown for this section...

## Second Section Title
More body markdown...
```
The `markdown-sections` Vite plugin (`plugins/markdown-sections.js`) parses
any `.md` under a `/content/` path at build time into
`[{ title, html }, ...]` via `marked`, importable directly as a JS module:
```jsx
import sections from "../../content/en/wetlab.md";
```
Then render it:
- **`SectionedArticle`** (`src/components/SectionedArticle/`) — single
  scrolling column; the side panel is a jump-to-section index synced to scroll
  position via `IntersectionObserver`. Use for a single continuous article
  (this is what `WetLab`/`DryLab`/`HumanPractices`/`Engagement`/`Education`
  all use).
- **`SectionedPage`** (`src/components/SectionedPage/`) — click-to-switch
  panel (no scrolling between sections, one section replaces another), and
  its `Content` supports a photo + role/department header per section. Use
  for people/profile-style listings (`Attributions` builds its `sections`
  array by hand in JS instead of markdown, one entry per person, because it
  needs per-entry photos/roles — see that file for the pattern). Both accept
  a `heading` entry (`{ heading: "..." }`) to insert a non-selectable group
  label into the panel, e.g. `Attributions`'s "Students" / "Principal
  Investigators" split.

Both variants share one visual language (defined once in each component's
`.module.scss`) for rendered markdown: headings, `p`, `a` (blue, underlined),
`blockquote`, lists, tables, `code`/`pre`, `hr` — don't restyle these
per-page; extend the shared stylesheet if a new markdown element needs rules.

**3. Bespoke layout → custom page.** For anything that isn't a plain article
or profile list (`Home`, `Roster`, `ProteinLibrary`, `Sponsors`), build a page
component from scratch under `src/pages/<Name>/<Name>.jsx` +
`<Name>.module.scss`, still wrapped in the same `PageWrapper`, and reuse
`LiquidGlass` for any elevated surface. `ProteinLibrary` is the cleanest small
example of this: static content, plain data array, mapped over a
`.module.scss` grid. `Home` is the far end of the spectrum (scroll-driven
animation engine, canvas starfield) — don't reach for that complexity unless
the page actually needs it.

## Routing & navigation — `src/pages.js` is the single source of truth

Add a page by editing **only** `src/pages.js`; both routing (`App.jsx`) and
the nav bar (`Menu.jsx`) derive from it, so there's no separate list to keep
in sync (this replaced an older setup that caused a real path-casing bug —
see the comment at the top of `pages.js`).

- Flat entries: `{ name, title, path, component }`.
- Grouped/dropdown entries: `{ name, folder: [ {name, title, path, component}, ... ] }`
  — renders as a nav dropdown; `folder` children are what `getPathMapping()`
  flattens into actual routes.
- `hidden: true` on a flat entry routes it (reachable by direct URL) without
  listing it in the nav — used for pages superseded by a newer category
  structure but kept at their old URL.
- `name` is what the nav renders; `title` feeds `document.title` (via
  `App.jsx`) and any page that displays its own title (e.g. `Stub`).
- The categories currently in `pages.js` (`Project`, `Wet Lab`, `Engineering`,
  `Dry Lab`, `Beyond the Lab`, `Team`, `Awards`) follow `src/content/pages.md`
  verbatim — check that file before adding a new top-level category rather
  than inventing one.

## i18n — mostly dormant, don't block on it

Translation infra (`src/i18n/LanguageContext.jsx`, `useLanguage()`/`t()`) is
mid-removal: `ar`/`es`/`fr` were stripped to keep the wiki English-only while
content is still being written (full context in `src/i18n/CLAUDE.md`). Only
`Roster` and `Attributions` still route their copy through `t("...")` against
`src/i18n/en.json`; every other page (`Stub`, `Sponsors`, `NotFound`, `Home`,
markdown-driven pages) just hardcodes English strings directly in JSX. For a
new page, **hardcode English text** like the majority of pages do — don't
newly wire a page into `useLanguage()` unless you're specifically asked to
restore i18n, since that's a half-migrated system, not the current norm.

## Assets

Images/photos are checked into `src/assets/<category>/` (e.g. `roster/`,
`sponsors/`, `flags/`) and imported as ES modules, `?url` suffix when the
import is used as a CSS `background-image` / passed as a URL string rather
than an `<img src>`. Note: `README.md` instructs uploading media to
`static.igem.wiki` via iGEM's uploads tool instead of committing it — actual
practice in this repo has consistently been local `src/assets` imports (every
existing page does this). Follow the existing convention rather than
switching a new page to remote assets unasked; flag the tension if it matters
rather than silently picking one.

## Quick checklist: adding a new page

1. Does it have real written content yet? If not, point its `pages.js` entry
   at `Stub` and stop there.
2. Is it prose/an article? Write `src/content/en/<name>.md` with `##`
   section headers, then a thin page component importing it into
   `SectionedArticle` (or `SectionedPage` for a people/profile list),
   wrapped in `PageWrapper` with the standard background props.
3. Otherwise, build a custom `src/pages/<Name>/<Name>.jsx` +
   `.module.scss`, still inside `PageWrapper`, reusing `LiquidGlass` for any
   card/panel/nav-like surface and the color/radius tokens from
   `src/styles/index.scss` rather than new hardcoded hex values.
4. Register it in `src/pages.js` (flat, or inside an existing `folder`
   category matching `src/content/pages.md`) — this alone wires up both the
   route and the nav link. Don't touch `App.jsx` or `Menu.jsx`.
5. Don't add your own `<Footer>`/nav/`LiquidGlassFilter` — those are global.
