# Article formatting standards — learned from the Model page

This is a companion to **[DESIGN.md](DESIGN.md)**, one level down: DESIGN.md
covers the whole site's visual system and page archetypes; this file zooms
into archetype 2 ("prose/article content") and records *why* `Model`
(`/modeling`, `src/pages/Model/`) reads as dramatically more polished and
credible than every other article page, so future long-form pages can be
built to the same standard on purpose rather than by accident.

Read this before writing a substantial article page (thousands of words,
data-backed claims, figures/tables) — not before wiring up a two-paragraph
stub.

## The core diagnosis

Every other article page (`drylab.md`, `wetlab.md`, `hardware.md`, etc.) is a
flat markdown file rendered through `SectionedArticle`'s generic
`article p / h2 / h3 / table / blockquote` styles — the same handful of
typographic rules applied uniformly to a whole page of running prose. `Model`
uses the *same* `SectionedArticle` shell, but almost none of its content is
plain markdown paragraphs. It's built from a purpose-made component library
(`src/pages/Model/components/Ui.jsx` + `Model.module.scss`) that gives every
paragraph a *typed role* — claim, caveat, retraction, evidence, data,
navigation — and a distinct visual treatment for each role. That's the whole
trick: **structure the content into named kinds of thing, then style each
kind once**, rather than writing prose and reaching for bold/italics to carry
the emphasis.

Concretely, `Model` is a custom page (`Model.jsx` + `Model.module.scss` +
`data.js` + `components/*.jsx`) that still uses `SectionedArticle` for its
scroll/jump-nav shell — it does this via a `content` JSX prop that
`Article.jsx` (`src/components/SectionedArticle/Article/Article.jsx`) grew
specifically to hold rich per-section markup alongside (or instead of) the
plain `html` markdown output. That prop is the generalizable part: any future
data-heavy article can adopt the same pattern without forking
`SectionedArticle` itself.

## What makes it look the way it does

### 1. A masthead that states scope before the prose starts

`Model` doesn't open with a paragraph — it opens with an `intro` slot
(`pageIntro` in `Model.jsx`) rendered between the `<h1>` and the first
section:

- an **eyebrow line**: small caps, monospace, dot-separated metadata
  (category · subject · location · version), immediately signalling "this is
  a versioned, precise document" rather than a casual page;
- a **deck** (one bolded-key-phrase lede paragraph, capped wider than body
  text) that states the thesis in one breath;
- a **stat grid** (`statGrid`/`statCell`) — the page's headline numbers
  (sample counts, candidate counts) in a bordered grid, big tabular-nums
  figures over small caps labels, with a `.hi` accent variant for the two or
  three numbers that matter most.

No other page has anything like this. A future long-form page with real
quantitative results should open the same way: eyebrow → deck → stat grid,
*before* section 1's own heading.

### 2. A small, closed set of typed content components — not raw HTML

Everything in the body is authored through `Ui.jsx`'s components, not bare
`<p>`/`<div>` soup:

| Component | Role | Visual signature |
|---|---|---|
| `Callout` (`tone="accent"/"good"/"warn"/"critical"`) | A claim that needs to stand apart: scope statements, retractions, consequences, controls | Colored left border + tinted background, small-caps label above the text |
| `Card` / `CardGrid` | Parallel, comparable short items (pipeline layers, open gaps) | Bordered tiles in an auto-fit grid, a monospace "tag" above a title |
| `ChartPanel` + `Legend` | Any figure | Bordered panel, title/subtitle row, optional color-coded legend baked in *next to* the title, not just below the chart |
| `Caption` (`n="Figure N"` / `"Table N"`) | The one required sentence *interpreting* a figure/table, not just labeling it | Monospace, muted, bold figure number, sits directly under the panel |
| `TableWrap` + `.table` | Any data table | Bordered card wrapper (never a bare `<table>`), sticky-looking header row in small-caps mono, tabular-nums, row hover |
| `Pill` (`tone="good"/"warn"/"critical"/"neutral"`) | A one-word verdict inline in a table/card ("Excluded", "Robust", "Restored") | Small pill badge, tinted per tone |
| `Details` | Content a careful reader wants but most readers should be able to skip (a proof, a full audit register) | Native `<details>`, styled as a bordered card with a `+`/`–` marker — used generously instead of making the page longer for everyone |
| `SecRef` (`n="7"` → `#s7`) / `Cref` (`References.jsx`, numbered citations) | Any reference to another part of the document, or to a source | Dotted-underline inline link, monospace, colored — `SecRef` in `--primary` (reads as a word, e.g. "§07"), `Cref` in a dedicated citation blue at `0.82em` (reads as a numeral mark) |

The rule this produces: **before writing a paragraph, decide what kind of
statement it is.** A retracted claim is never just italicized text inside a
normal paragraph — it's a `Callout tone="critical"`. A figure never floats
loose — it's always `ChartPanel` + `Caption`. This is the single biggest
lever a future page has: pick (or extend) `Ui.jsx`, don't freehand markup.

### 3. Hedging and provenance are first-class, not footnotes

The page constantly names its own uncertainty in-line rather than only in a
methods section: "Verdict" columns in tables, explicit `Callout` boxes titled
things like *"A check that cannot fail"* or *"What still has to happen before
this counts as a contribution."* Retracted claims are kept visible with the
reason (per `README-FOR-WIKI.md`'s explicit instruction — "that they are
shown is the point"), and every number traces to `data.js` with a sourcing
comment rather than being retyped by hand in prose.

For future pages: if a page makes a quantitative claim, prefer showing the
number in a table/stat cell with a `Caption` that says what it means and
what it doesn't, over asserting it only in prose.

### 4. In-page cross-referencing is real, not aspirational

`SecRef`/`Cref` aren't decoration — nearly every section links back to the
specific section or reference that backs a claim ("see §07"), and the
References component groups citations by kind (software, methods/metrics,
structures) rather than one flat numbered list. This is what makes the page
read as a single argument instead of twelve independent blurbs. A future
page with more than ~4–5 sections should give every section a stable `id`
and actually use `SecRef` when one section's claim depends on another's.

### 5. One typography system, reused everywhere, matched to the shared baseline

`Model.module.scss` explicitly keeps its own body-copy rules (`.note p`,
`.card p`, `.detBody p`) identical to `SectionedArticle`'s own `.article p`
(justified, `hyphens: auto`, same size/line-height) — see the comments above
`.note` and `.tableWrap` in that file. This matters: the rich components
don't create a *different* reading experience, they extend the *same* one
into cards, callouts and tables so the page never feels like two designs
stitched together. A future page's custom components should do the same:
check `SectionedArticle.module.scss`'s base rules before writing a
component's own type rules, and match them unless there's a specific reason
to diverge (e.g. `.lede`/`.deck`'s larger intro-only sizes).

Other conventions worth lifting directly:
- One `--doc-*` custom-property namespace (surfaces, borders, muted/faint
  text, good/warn/critical, a monospace stack) defined once on the page's
  root class (`.doc`) and referenced everywhere, instead of hardcoded hex
  values scattered through the stylesheet.
- Monospace (`--doc-mono`) is reserved for *metadata*: eyebrows, table
  headers, captions, pills, chart axis labels, gene/locus names. Body prose
  is never monospace. This is what gives the page its "lab notebook /
  data sheet" feel without ever looking like a code block dump.
- `tabular-nums` on every place a number appears in a grid/table so columns
  align.
- Small-caps-style labels (`text-transform: uppercase; letter-spacing:
  0.08–0.14em`, 9.5–12px, monospace) as the universal "this is a label, not
  content" signal — used identically for the eyebrow, stat-cell keys, table
  headers, card tags, callout labels, and t2-card field labels.

### 6. Data lives in `data.js`, not inline in JSX

Large structured datasets (the 45-candidate table, category metadata, funnel
step counts) are pulled into `data.js` as plain arrays/objects with a
column-index map (`F = { loc: 0, gene: 1, ... }`) and sourcing comments,
imported into both the components that render tables/charts and the
`Explorer`. This keeps `Model.jsx` itself readable as *argument structure*
(what claim, in what order) rather than being buried under data. A future
data-heavy page should split the same way: `<Page>.jsx` for structure and
prose, `data.js` for the numbers, `components/` for anything reused more
than once or complex enough to deserve its own file (a chart, a filterable
table).

### 7. Charts and interactive elements are hand-built SVG/React, not a library

`Funnel`, `ScatterChart`, `OrfChart`, `BarRows`, `Explorer` are small
bespoke components (SVG or styled divs) sharing the page's own
`.chartSvg`/`.dot`/`.tip`/`.gridline` classes and the page's `TooltipProvider`
— no charting library dependency. They're worth building bespoke *because*
the page reuses the same handful of primitives (axis line, gridline,
reference line, tooltip, legend swatch) everywhere rather than each chart
inventing its own look. A future page with only one or two simple charts
should weigh whether it's worth a bespoke component vs. simpler static
markup — the payoff here comes from repetition (7 figures sharing one visual
language), not from charts being mandatory.

## Quick checklist for the next data-heavy article page

1. Does the content have real quantitative claims, multiple figures/tables,
   or enough sections that a reader needs to jump between them? If it's
   still mostly prose paragraphs, plain markdown + `SectionedArticle` is
   correct and this checklist doesn't apply yet (see DESIGN.md's archetype
   2).
2. If yes: build it as a custom page like `Model` — `<Page>.jsx` +
   `<Page>.module.scss` + `data.js` + `components/` — still passed into
   `SectionedArticle` via the `content` prop per section (`Article.jsx`
   already supports this; don't fork it).
3. Start with a masthead: eyebrow line, one-paragraph deck, a stat grid of
   the headline numbers.
4. Before writing a paragraph, ask what *kind* of statement it is
   (claim / caveat / retraction / evidence / verdict / navigation) and reach
   for the matching `Ui.jsx`-style component instead of a bare paragraph.
   Extend `Ui.jsx`'s pattern (or the page's own equivalent) with new
   component types as needed, rather than one-off inline styles.
5. Every figure gets a `ChartPanel` + numbered `Caption` that interprets it,
   not just labels it. Every table gets `TableWrap`, never a bare `<table>`.
6. Give every section a stable id and actually cross-reference between
   sections/citations (`SecRef`/`Cref` equivalents) wherever one claim
   depends on another.
7. Keep prose typography identical to `SectionedArticle`'s base `.article`
   rules; reserve monospace + small-caps for metadata/labels only.
8. Pull any nontrivial dataset out into its own `data.js` with sourcing
   comments, keyed rather than magic-indexed where practical.
