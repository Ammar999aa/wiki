# Markdown components — the cheap tier

Companion to **[DESIGN.md](DESIGN.md)** and **[ARTICLE-STANDARDS.md](ARTICLE-STANDARDS.md)**.
DESIGN.md names archetype 2 ("prose/article content → markdown +
`SectionedArticle`") and archetype 3 ("bespoke layout → custom page, e.g.
Model"). This file documents the tier that sits *between* them: a fixed set
of classes, already styled in `SectionedArticle.module.scss`, that any
`src/content/en/*.md` page can reach for with plain HTML — no new component
to build, no page to hand-roll. Nine sections in `hardware.md` use the whole
set and read close to Model-quality; most other content pages use one or two
of these at most, not because the rest don't apply, but because nobody wrote
this catalogue down until now.

**Use this file to decide *which* class fits a piece of content you're
about to format. If you're deciding *whether* a page needs this tier at all
versus staying plain markdown versus becoming a full custom page, that
decision lives in DESIGN.md's three archetypes and ARTICLE-STANDARDS.md's
checklist — read those first.**

## Before you reach for any of this

Every class below turns one paragraph, list, or table into something that
looks intentional instead of like running prose. That's only a win if the
content actually has that shape. Don't wrap a class around content just to
use the class — a `.callout` should still read as a genuine aside if you
strip its border and background, and a `.card-grid` should still be a set
of genuinely parallel, comparable items if you strip its grid. If neither
is true, leave it as plain markdown; a page of ten callouts in a row reads
as noisier than a page of ten paragraphs, not more polished.

## How these are authored

All of this lives in **`SectionedArticle.module.scss`**, under `:global(...)`
selectors scoped to `.article` — that's what makes a bare CSS class written
directly in a `.md` file's raw HTML pick up styling with no import, no
component, nothing but the class name. One component system, one file,
matching every markdown-driven page (`SectionedArticle`/`SectionedPage`, see
DESIGN.md) automatically. **New classes belong in that same file** —
resist the urge to start a second markdown stylesheet.

The trick every block-level class relies on: **blank lines around any
markdown you nest inside raw HTML**. The `markdown-sections` build plugin
runs each section's content through `marked`, and `marked` only re-parses
nested Markdown syntax (`**bold**`, `#### headings`, table pipes, links)
inside a raw HTML block if that content is separated from the surrounding
tags by blank lines. Without them, the parser treats everything as opaque
HTML and passes `**bold**` through literally as three asterisks. Every
snippet below shows the blank lines exactly where they need to be — copy
the spacing, not just the tags.

Inline classes (`.chip`, `.flow-node`, `.flow-arrow`) don't have this
problem — `<span>` is inline HTML, `marked` leaves it alone mid-paragraph,
so no blank lines are needed around those.

## Quick reference

| I have… | Reach for | Looks like |
|---|---|---|
| A claim that needs to stand apart from running prose — a caveat, a scope statement, a pending/in-progress note | `.callout` | Left accent bar + tinted background, optional small-caps label |
| A set of parallel, comparable short items (steps, criteria, categories) | `.card-grid` (or `.card-grid.compact` for title + one line) | Bordered tiles in a row that wrap |
| A markdown table that should read as one discrete data object | `.table-wrap` | Bordered card around the table |
| A short pipeline/control-loop sequence ("sensor → control → actuator") | `.flow` | Labelled nodes joined by arrows |
| A one- or two-word tag standing in for a subheading | `.chip` | Small mono pill |
| A labelled readout, diagram, or grouped figure that's more than a bare image | `.panel` (+ `.dash` for a live-value grid inside it) | Bordered glass card with a title row |
| Content a careful reader wants but most readers should be able to skip | `.details` (+ `.details-body` wrapping the collapsible content) | Native `<details>`, styled as a bordered card, smoothly expands/collapses |
| A person you spoke with (interviewee, expert) with a photo and a short summary | `.person-card` | Round photo + name on top, summary below, in a bordered card |
| A photo/render whose own background is opaque light/white | `.photo-frame` | Dark matted card around the image |
| The one sentence that interprets a figure or table | `.caption` | Bold "Figure N." + muted mono text, pulled up close under it |
| Two side-by-side images, or two side-by-side prose+diagram blocks | `.two-col-images` / `.two-col-tracks` | Two even columns, stacks on mobile |
| A run of small images that should sit in one row (composite figure panels) | `.notebook-img-row` | Flex row, no forced full-width wrap |

## The components

### `.callout` — a claim that needs to stand apart

For a caveat, a scope statement, a retracted point, or a plainly-labelled
pending state ("we're still testing this"). Default tone is neutral; add a
second class for a tinted one, matching the tones used for status pills
elsewhere on the site. An optional first-line label renders as a small-caps
kicker above the text.

```md
<div class="callout warn">

<p class="callout-label">Where we are right now</p>

We're currently testing the bioreactor and purification system as an
integrated platform. Results will be added here as they come in.

</div>
```

Tones: `callout` (neutral, default), `callout accent` (violet — a claim
worth highlighting, not a warning), `callout good`, `callout warn`,
`callout critical`. Pick the tone by what the sentence *means*, not by
habit — a pending-content note is `warn` (see the guardrail on honest
pending states below), a genuine caveat about a method's limits is
`neutral` or `warn` depending on severity, a retracted or wrong claim kept
visible on purpose is `critical`.

**Don't** use `.callout` for a plain aside that doesn't need visual
separation — that's what a normal paragraph, or `blockquote` (already
styled by the base `.article` rules), is for. A page where every third
paragraph is a callout has stopped signalling anything.

### `.card-grid` — parallel, comparable items

A set of short items that are all instances of the same kind of thing
(framework steps, judging criteria, hardware subsystems) reads better as
tiles than as a bullet list, because tiles make the parallelism visible at
a glance. Each `<div>` becomes one card; give each a `####` heading so it
still parses as markdown.

```md
<div class="card-grid">

<div>

#### O — Observe the Challenge
Understand the healthcare, biological, and logistical challenges of space
exploration.

</div>

<div>

#### R — Reach Stakeholders
Engage astronauts, researchers, space medicine specialists, industry,
regulatory experts and communities.

</div>

</div>
```

Rows wrap and grow evenly with a flex layout — a 5-card grid at the
default width never strands the 5th card alone in an empty row.

**Modifier — `.card-grid.compact`**: for items that are a title plus one
short line (a stat, a tag) rather than a real paragraph, e.g. three
filtration stages each with a two-word description. The default 260px
basis leaves compact items in oversized, mostly-empty tiles; add
`compact` alongside the base class (`class="card-grid compact"`) for a
smaller basis that packs more, appropriately snug cards per row.

```md
<div class="card-grid compact">

<div>

#### Stage 1
Coarse filter

</div>

<div>

#### Stage 2
Medium filter

</div>

</div>
```

**Don't** reach for `card-grid` when the items aren't actually parallel —
three sequential process steps that depend on each other read better as an
ordered list, or as a `.flow` if the sequence itself is the point.

### `.table-wrap` — bound a table in its own card

A markdown table sitting bare against the page reads as an afterthought; a
`.table-wrap` bounds it in a card so it reads as one discrete data object,
matching `.card-grid`'s and `.panel`'s visual language.

```md
<div class="table-wrap">

| Stakeholder group | What we need to learn from them | How it could influence SHIHAB |
|---|---|---|
| Astronauts & Space Medicine | What medical problems matter? | Therapeutic choice, usability, autonomy |

</div>
```

Always pair a `.table-wrap` with a `.caption` underneath when the table
needs interpreting, not just labelling — see `.caption` below.

### `.flow` — a short pipeline or control-loop diagram

A sentence undersells a mechanical sequence ("a sensor feeds a controller
which drives an actuator") in a way a labelled diagram doesn't. Nodes are
monospace (metadata, not prose — see ARTICLE-STANDARDS.md §5's small-caps/
mono convention) and joined by arrow spans.

```md
<div class="flow">

<span class="flow-node amber">Temperature sensor</span>
<span class="flow-arrow">→</span>
<span class="flow-node">PID control</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">Flexible heating element</span>

</div>
```

`amber`/`accent` on a node are optional tint modifiers, typically used for
the two ends of a loop (sensing vs. actuation) while the shared
control-logic step in the middle stays neutral — that's a convention, not
a rule; use whichever nodes deserve the visual emphasis. Stacks vertically
on narrow screens automatically.

**Don't** use `.flow` for a sequence that's really just an ordered list of
instructions (do this, then this, then this) — that's what markdown's `1.
2. 3.` is for. Reach for `.flow` specifically when the nodes are named
components/states, not action steps.

### `.chip` — a one- or two-word tag standing in for a subheading

For a short label that would be an awkward `<h3>` — a part number, a
one-word section marker ("Pills", "Part I: Bioreactor") — inline, no block
wrapper needed since `<span>` is inline HTML.

```md
<span class="chip">Pills</span>
<span class="chip amber">Part I: Bioreactor</span>
```

Default tone is violet/primary; `chip amber` gives the amber tint.

### `.panel` + `.dash` — a labelled readout or grouped figure

For a figure, diagram, or live-value readout that's more than a bare
image — something with its own title row, or a set of instrument values.
`.panel-title`'s two children lay out at opposite ends (a name and a status
tag are the common pair).

```md
<div class="panel">
<div class="panel-title"><span>Dashboard · live readout</span><span>Sim</span></div>
<div class="dash">
<div class="dash-card">
<div class="k">Temperature</div>
<div class="v">37.0<span>°C</span></div>
<div class="dash-bar"><i style="width:78%; background:var(--amber);"></i></div>
</div>
<div class="dash-card">
<div class="k">pH</div>
<div class="v">7.20<span>pH</span></div>
<div class="dash-bar"><i style="width:64%;"></i></div>
</div>
</div>
</div>
```

`.dash` alone (without the surrounding `.panel`) still works as a bare
2-up grid, but pairing it with `.panel` is the common case — the panel
supplies the bordered card and the title row, `.dash` supplies the value
grid inside it. A `.panel` doesn't need a `.dash` at all — it works as a
plain bordered card for any figure or diagram with a title row, e.g.
wrapping a `.flow` (see hardware.md's control-loop panels).

**Don't** use `.dash` for anything that isn't a real instrument-style
reading (a number with a unit, an optional progress bar). It's built for
the "current settings/telemetry" shape specifically, not a general 2-column
layout — that's what a `.card-grid` or `.two-col-tracks` is for.

### `.details` — content most readers can skip

For a proof, a full data table, or background reading that a careful reader
wants but the page shouldn't force on everyone — a native `<details>`,
styled as a bordered card with a `+`/`–` marker, matching Model's own
`Details` component (see ARTICLE-STANDARDS.md). The collapsible content
**must** sit in its own `.details-body` wrapper — `Article.jsx`'s delegated
click handler (`toggleDetails`) looks for exactly that class to animate the
expand/collapse with the Web Animations API. Plain CSS can't do this: a
`transition` on `.details-body`'s `max-height`/`opacity` does not animate
the native `<details>` toggle in current Chromium no matter how long its
duration is, since the browser applies the open/close style change with no
intervening rendered frame to interpolate from — confirmed by forcing a
multi-second transition in devtools and watching it still snap instantly.
Skip the `.details-body` wrapper and the toggle still works, just without
the animation (`Article.jsx` finds nothing to animate and the native
instant snap is all that's left).

```md
<details class="details">
<summary class="details-summary">Oxygen</summary>

<div class="details-body">

Body markdown...

</div>

</details>
```

**Don't** put more than one top-level `.details-body` per `<details>`, and
don't skip the blank lines around it — same rule as every other block-level
class here, but easy to miss since a bare `<details>`/`<summary>` pair
doesn't otherwise need one.

### `.person-card` — a person with a photo and a summary

A smaller, markdown-level version of the Attributions page's profile
header, for stakeholders/interviewees inside an article: round photo
top-left, name beside it, summary paragraph below at full text width. Write
it as plain HTML (no nested markdown), so blank lines don't matter.

```md
<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/..." alt="Full Name" style="--photo-x: 60%; --photo-y: 26%; --photo-zoom: 2.6;">
<h4 class="person-name">Full Name</h4>
<p>One-paragraph summary of who they are and what we learned.</p>
</div>
```

`--photo-x`/`--photo-y` pick the crop point (raising a value moves the
picture left/up) and `--photo-zoom` zooms in. Leave all three out for a
square headshot; for a full-length photo, raise `--photo-zoom` until the
face fills the circle, then nudge `--photo-x`/`--photo-y` to center it. Clicking the photo opens
the full image in the lightbox, like every other article image.

**Optional "See more" popup.** Add a button and a hidden `.person-more`
block after the summary; clicking the button opens that content in a
centered popup with the person's photo and name (same look as the Roster
page's popup — `PersonModal.jsx`, wired up in `Article.jsx`):

```md
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<p>Full write-up...</p>
</div>
```

Leave both out if there's no longer write-up yet.

### `.photo-frame` — mat a photo whose own background is opaque

An image that's already dark, or transparent, or sits on its own
night-sky-style background butts fine against the page directly. A CAD
export or a studio product shot with a flat white/light background fights
the dark page unless it's matted first — `.photo-frame` mats it in a dark
bordered card so it reads as a deliberately placed figure instead of
pasted from a different design system.

```md
<div class="photo-frame">

![CAD render of the assembled prototype](https://static.igem.wiki/...)

</div>
```

Combine with `.two-col-images` by wrapping each image in its own
`.photo-frame` inside the pair (see hardware.md's opener), or use
standalone for a single full-width image.

### `.caption` — the sentence that interprets a figure or table

The one gap the original eight classes left: Model's `Caption` component
(numbered "Figure N."/"Table N.", one sentence saying what to *notice*,
not just what the figure *shows*) had no markdown-level equivalent. Tight
margins keep it read as attached to whatever it's captioning rather than a
new paragraph — place it directly below a figure/`.photo-frame` (the usual
case), or directly above a `.table-wrap` if you're following the
"Table N." caption-precedes-table convention `notebook.md` already uses.

```md
<div class="caption">

**Figure 1.** B. subtilis colonies on LB agar. A slight progressive
reduction in colony density is visible at higher nominal doses.

</div>
```

Write the "Figure N."/"Table N." lead-in as markdown `**bold**` (not raw
`<b>`) — the blank lines around it mean it still parses normally, and it
picks up the brighter inline tone automatically. Number figures and
tables independently and sequentially within a page ("Figure 1", "Figure
2", "Table 1"), the same convention `notebook.md`'s existing bare
`**Figure N.**` lines already follow.

**The bar for what belongs in a caption**: it should say something a
reader would otherwise have to infer by staring at the figure — a trend,
a comparison, a reason a result matters, a limitation. "Figure 1. A photo
of the bioreactor" labels; "Figure 1. Progressive but mild reduction in
CFUs across 10–40 Gy, consistent with literature radiation-resistance
profiles" interprets. Model's whole `Caption` convention (see
ARTICLE-STANDARDS.md §2, §3) exists to make that distinction visible —
don't let this class regress back to a label with a number in front of it.

## Layout utilities

Three more classes exist in the same stylesheet. They're layout
primitives rather than typed content components — no tone, no label, just
column arrangement — so they're grouped separately here, but they're just
as available.

**`.two-col-images`** — two images side by side, each full-width within
its own column, stacking on mobile. Pair each with its own `.photo-frame`
if either image needs matting.

**`.two-col-tracks`** — two `<div>`s of mixed markdown content
(headings + prose) side by side, for comparing two tracks/approaches.
Each inner `<div>` is its own bordered card.

**`.notebook-img-row`** — a run of `<img>` tags that should sit on one
row instead of each wrapping full-width (composite figure panels, e.g.
"A) ... B) ... C) ..."). Each `<img>` carries its own inline `width: %`
proportional to its size in the source figure; this class just supplies
the flex row and gap. Despite the name, it isn't Notebook-specific —
reach for it anywhere a multi-panel figure needs the same treatment.

## Guardrails specific to this system

Straight from `CLAUDE.md`/`DESIGN.md`/`RESPONSIBLE_AI_USE.md`, repeated
here because they bear directly on how these classes get used:

- **New classes live in `SectionedArticle.module.scss`, not a parallel
  stylesheet.** One component system, documented in this one file.
- **Pending states are honest, not decorative.** A `.callout warn` marking
  unfinished content ("content coming soon", "results pending") must say
  exactly that — never dressed up with invented interim numbers to look
  more finished than it is.
- **No fabricated data, ever.** A `.dash` value, a `.caption` interpreting
  a result, a `.card-grid` entry — every one of these renders real project
  content. Formatting existing prose into a component must not add a claim,
  a number, or a conclusion that wasn't already there.
- **Hardcode English.** i18n is mid-removal (see `src/i18n/CLAUDE.md`) —
  none of this wires into `useLanguage()`.
