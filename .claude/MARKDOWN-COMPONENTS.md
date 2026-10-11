# Markdown components — the cheap tier

Companion to **[DESIGN.md](DESIGN.md)** and **[ARTICLE-STANDARDS.md](ARTICLE-STANDARDS.md)**.
DESIGN.md names archetype 2 ("prose/article content → markdown +
`SectionedArticle`") and archetype 3 ("bespoke layout → custom page, e.g.
Model"). This file documents the tier that sits _between_ them: a fixed set
of classes, already styled in `SectionedArticle.module.scss`, that any
`src/content/en/*.md` page can reach for with plain HTML — no new component
to build, no page to hand-roll. Nine sections in `hardware.md` use the whole
set and read close to Model-quality; most other content pages use one or two
of these at most, not because the rest don't apply, but because nobody wrote
this catalogue down until now.

**Use this file to decide _which_ class fits a piece of content you're
about to format. If you're deciding _whether_ a page needs this tier at all
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
so no blank lines are needed around those (and inside `.flow` there should
be none — see `.flow` below).

## Quick reference

| I have…                                                                                                        | Reach for                                                       | Looks like                                                                |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| A claim that needs to stand apart from running prose — a caveat, a scope statement, a pending/in-progress note | `.callout`                                                      | Left accent bar + tinted background, optional small-caps label            |
| A set of parallel, comparable short items (steps, criteria, categories)                                        | `.card-grid` (or `.card-grid.compact` for title + one line)     | Bordered tiles in a row that wrap                                         |
| A markdown table that should read as one discrete data object                                                  | `.table-wrap`                                                   | Bordered card around the table                                            |
| A short pipeline/control-loop sequence ("sensor → control → actuator")                                         | `.flow`                                                         | Labelled nodes joined by arrows                                           |
| A one- or two-word tag standing in for a subheading                                                            | `.chip`                                                         | Small mono pill                                                           |
| A labelled readout, diagram, or grouped figure that's more than a bare image                                   | `.panel` (+ `.dash` for a live-value grid inside it)            | Bordered glass card with a title row                                      |
| A few real headline numbers (team size, counts, a year) | `.stat-grid` | Bordered strip of big numbers over small-caps labels |
| Content a careful reader wants but most readers should be able to skip                                         | `.details` (+ `.details-body` wrapping the collapsible content) | Native `<details>`, styled as a bordered card, smoothly expands/collapses |
| A person you spoke with (interviewee, expert) with a photo and a short summary                                 | `.person-card`                                                  | Round photo + name on top, summary below, in a bordered card              |
| A photo/render whose own background is opaque light/white                                                      | `.photo-frame`                                                  | Dark matted card around the image                                         |
| The one sentence that interprets a figure or table                                                             | `.caption`                                                      | Bold "Figure N." + muted mono text, pulled up close under it              |
| A row of figures, each with its own caption                                                                    | `.figure-grid`                                                  | Even columns of matted photos with captions, optional equal heights       |
| Parallel items whose full text is too long to show inline (features, subsystems)                               | `.popup-grid` + `.popup-card`                                   | Clickable tiles; each opens its hidden content in a popup                 |
| A design iteration told as Design → Build → Test → Learn                                                       | `.iter-list` + `.iter`                                          | Numbered card, one row per stage with a colored label pill                |
| A short key/value table (summary statistics), no header row                                                    | `table.kv-table` in a `.table-wrap`                             | Row headers on the left, values on the right                              |
| A grid of X-by-Y values (components x chassis, payload x chassis)                                              | `table.matrix-table` in a `.table-wrap`                         | Column header row *and* a labelled first column                           |
| A sourced claim that needs an in-text citation, plus the reference list it points to                           | `.cite` + `.ref-list`                                           | Small mono numeral, dotted underline; clicking scrolls to the reference |
| Two side-by-side images, or two side-by-side prose+diagram blocks                                              | `.two-col-images` / `.two-col-tracks`                           | Two even columns, stacks on mobile                                        |
| A run of small images that should sit in one row (composite figure panels)                                     | `.notebook-img-row`                                             | Flex row, no forced full-width wrap                                       |
| A set of event photos shown together as a gallery                                                              | `.gallery`                                                      | Even grid of 4:3-cropped thumbnails, each opens full-size in the lightbox |
| A short ranked/staged list where each item also jumps to its own section                                       | `.ladder` (+ `.ladder-axis`)                                    | Row of clickable cards, graduated height                                  |
| An event with a headline number worth leading with, linking to its own heading                                 | `.tickets` (+ `.ticket`/`.ticket-main`/`.ticket-stub`)          | Card split into info + a dashed "stub" showing the number                 |
| One featured piece of media (a podcast, a video) that deserves more than a plain paragraph                     | `.pod`                                                          | Icon beside a name and one-line description                               |
| A numbered list where the sequence itself matters (goal 1, goal 2, …)                                          | `ol.goals`                                                      | Large numbered circles instead of bullets                                 |

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
`callout critical`. Pick the tone by what the sentence _means_, not by
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

**Modifier — `.card-grid.row`**: for a short set (2–4 cards) that should
read side by side as one comparison, e.g. the three gaps in education.md's
Kallpa section. The default 260px basis wraps the last card onto its own
row in the article column; `class="card-grid row"` keeps every card on one
row at equal widths on wide screens and still stacks them on narrow ones.

**Don't** reach for `card-grid` when the items aren't actually parallel —
three sequential process steps that depend on each other read better as an
ordered list, or as a `.flow` if the sequence itself is the point.

### `.table-wrap` — bound a table in its own card

A markdown table sitting bare against the page reads as an afterthought; a
`.table-wrap` bounds it in a card so it reads as one discrete data object,
matching `.card-grid`'s and `.panel`'s visual language.

```md
<div class="table-wrap">

| Stakeholder group           | What we need to learn from them | How it could influence SHIHAB           |
| --------------------------- | ------------------------------- | --------------------------------------- |
| Astronauts & Space Medicine | What medical problems matter?   | Therapeutic choice, usability, autonomy |

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

**Long flows wrap onto more rows.** The `markdown-sections` build plugin
glues each `.flow-arrow` to the node after it (in a `.flow-step` span), so
every new row starts with "→ Node" and an arrow is never left alone at the
end of a row. Nodes in the same row share one height, and a long label
wraps inside its node (max ~22em wide). Blank lines inside the block are
harmless, but leaving them out keeps the source tidy.

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

### `.stat-grid` — a row of headline numbers

The markdown-level version of the masthead stat grid (ARTICLE-STANDARDS.md
§1): big numbers over small-caps labels, in one bordered strip. Add `hi`
to a cell to tint its number amber. Works on its own or inside a `.panel`
(see education.md's Kallpa Greenz partner card).

```md
<div class="stat-grid">
<div><strong>76+</strong><span>Young professionals &amp; students</span></div>
<div><strong>8</strong><span>Managers</span></div>
<div class="hi"><strong>2021</strong><span>iGEM Design League gold</span></div>
</div>
```

**Don't** put anything here but real, reported numbers — same rule as
`.ticket-stub`.

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

**Quote variant.** For something the person said, put an optional
`<p class="person-role">` under the name and the words in a `<blockquote>`
(see hardware.md's "Beyond space"):

```md
<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/..." alt="Portrait of Full Name">
<h4 class="person-name">Full Name</h4>
<p class="person-role">Their role and organisation</p>
<blockquote><p>What they said, verbatim.</p></blockquote>
</div>
```

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
(numbered "Figure N."/"Table N.", one sentence saying what to _notice_,
not just what the figure _shows_) had no markdown-level equivalent. Tight
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

### `.figure-grid` — a row of figures, each with its own caption

`.two-col-images` pairs two images; when each image needs its own
`.caption`, or there are three or four, use `.figure-grid`. Write it as
plain HTML, one `<figure>` per line (no blank lines needed):

```md
<div class="figure-grid" style="--cols: 3; --fig-h: 160px; --fig-fit: cover;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/..." alt="..."></div><figcaption class="caption"><strong>Figure 15. What to notice.</strong> More detail.</figcaption></figure>
<figure>…</figure>
</div>
```

- `--cols` sets the column count (default 2; one column on phones).
- `--fig-h` gives every image the same height so captions line up;
  `--fig-fit: cover` crops to fill it (default `contain` letterboxes).
  `.photo-frame.contain` keeps one image uncropped in a `cover` grid.
- `class="figure-grid single"` is one figure, centered at a readable
  420px max; `single wide` lets it fill the column (charts, diagrams).

### `.popup-grid` + `.popup-card` — tiles that open a popup

For a set of parallel items (features, subsystems) where each has more
text than belongs on the page. Each card's face is a button; clicking it
opens the card's hidden `.popup-more` content in the same popup
`.person-card`'s "See more" uses (`Article.jsx` → `PersonModal`), with the
card's `.popup-title` as its heading. Links to the same page (citations,
`#section-id`) close the popup and scroll there. The popup styles tables,
`.table-wrap`, `.caption`, `####` subheadings and `.cite` marks.

Keep each `<button>` on one line, and leave blank lines around the
markdown inside `.popup-more`:

```md
<div class="popup-grid">

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-num">1</span><span class="popup-face"><span class="popup-title">Low power demand</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Popup markdown — paragraphs, tables, `#### Subheadings`, citations...

</div>
</div>

</div>
```

The face takes either a `.popup-num` (numbered, beside the title) or a
`.popup-icon` holding an inline SVG (above the title), then inside
`.popup-face`: `.popup-title`, an optional `.popup-desc` line or
`svg.popup-art` illustration, and `.popup-hint`.

**Don't** hide content a reader needs to follow the page's argument in a
popup — only the detail behind a tile that already stands on its own.

### `.iter-list` + `.iter` — Design → Build → Test → Learn cards

One card per design iteration, one row per stage, each row a colored
label pill (`design` violet, `build` light violet, `test` amber outline,
`learn` solid amber) beside its markdown. Leave out any stage the
iteration didn't have. `.iter.final` (amber-tinted) is the summary card
after a list:

```md
<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Iteration 1: Magnetic stirring</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Markdown...

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Markdown...

</div></div>
</div>

</div>

<div class="iter final">
<h4 class="iter-title"><span class="iter-num">✓</span>Final design</h4>

Summary markdown...

</div>
```

### `table.kv-table` — a key/value table

Markdown tables need a header row; a short set of labelled values (a
setpoint, a mean, a standard deviation) doesn't have one. Write it as raw
HTML inside a `.table-wrap`:

```md
<div class="table-wrap">
<table class="kv-table"><tbody>
<tr><th scope="row">Setpoint</th><td>36.00 °C</td></tr>
<tr><th scope="row">Standard deviation</th><td>≈ 0.03 °C</td></tr>
</tbody></table>
</div>
```

### `table.matrix-table` — an X-by-Y matrix

A markdown table gives you a header row only. A matrix — components x
chassis, payload x chassis — also needs a *labelled first column*, and a
`<th scope="row">` written into a plain table picks up the base `th`
rules (tinted background, 2px bottom border) that are meant for a header
row, so the label column renders as a stack of header bars whose borders
don't line up with the `td` borders beside them. `.matrix-table` gives
`tbody` row headers a quieter tint and the body's own 1px rule, leaving
the full header treatment to `thead`. Raw HTML inside a `.table-wrap`:

```md
<div class="table-wrap">
<table class="matrix-table">
<thead>
<tr><th></th><th colspan="3">Chassis</th></tr>
<tr><th scope="col">Components</th><th scope="col"><i>B. subtilis</i></th><th scope="col"><i>P. pastoris</i></th><th scope="col"><i>S. cerevisiae</i></th></tr>
</thead>
<tbody>
<tr><th scope="row">Vectors</th><td>pBS4S, pHT-ads</td><td>pPIC Z, pPICZα A</td><td>HO-poly-KanMX4-HO, pYES2</td></tr>
</tbody>
</table>
</div>
```

Raw HTML (not markdown pipes) is what makes the two things a markdown
table can't express available: a `colspan` group header above the real
header row, and a spanning cell used as a row-group label mid-table.
Reach for it when the source table genuinely has one of those — a plain
markdown table in a `.table-wrap` is still correct for everything else.

**Modifier — `.matrix-table.marks`**: when every body cell is a single
`+`/`-` verdict rather than text, this centres them under their column
headers. A matrix of text cells keeps the default start alignment, so
it's opt-in; a spanning row-group label stays start-aligned either way.

### `.cite` + `.ref-list` — in-text citations and a references list

The markdown-tier counterpart to the Model page's `Cref`/`References.jsx`
(see ARTICLE-STANDARDS.md) — added per a UI/UX audit finding that every
other article page was either hand-rolling its own citation scheme or
citing nothing at all for claims that read as sourced. `.cite` is a plain
inline citation mark; `.ref-list` is the numbered list it points into.
Clicking a `.cite` mark scrolls to the matching `.ref-list` entry. (A
hover tooltip showing the reference was tried and removed for now — it
stuck open on markdown pages; see the comment in `Article.jsx`.)

```md
Space agencies are preparing for longer missions <a class="cite" href="#ref-1">1</a>,
and the systems that support them already recycle water in orbit <a class="cite" href="#ref-2">2</a>.

<ol class="ref-list">

<li id="ref-1"><a href="https://www.nasa.gov/humans-in-space/" target="_blank" rel="noopener noreferrer">NASA — Humans in Space</a></li>
<li id="ref-2"><a href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/" target="_blank" rel="noopener noreferrer">NASA — Environmental Control and Life Support Systems (ECLSS)</a></li>

</ol>
```

Write `.cite` as plain HTML (`<a class="cite" href="#ref-N">N</a>`, not
markdown link syntax) and keep every `<li id="ref-N">` on its own line —
both are already valid HTML, so neither needs the blank-line treatment
nested markdown syntax would (see "How these are authored" above). The
list auto-numbers itself from a CSS counter in the order the `<li>`s
appear, so inserting a reference later never desyncs a visible number from
its position — only the `id`/`href` pair has to stay matched.

**Don't** invent a citation you can't back with a real source. A page with
a real, acknowledged gap (a citekey carried over from a source document
with no bibliography to resolve it, say) should say so with a `.callout
warn` rather than leave an unresolved marker unexplained or, worse, filled
in with a guessed reference.

### `.ladder` — a ranked/staged list that also navigates

For a short list that's both ordered (by scope, depth, seniority, …) _and_
something a reader would want to jump from straight into its own section —
a table doesn't invite a click, and a `.card-grid`'s items are all the same
size, which hides the ranking. Each card's height is set individually via
a `style="--h:<px>"` custom property, and doubles as a same-page link to
that item's section (which needs a real `id` — every section already gets
one, slugified from its `##` title, so `href="#your-section-title"` just
works). Pair with a `.ladder-axis` line underneath labelling the two ends
of the height axis — required, not decorative: an unlabeled height implies
a precise metric nothing here actually measures, so the two-word labels
("First encounter" → "Teaching others") are what keeps it honest rather
than pseudo-quantitative.

```md
<div class="ladder">

<a href="#copy-paste-plants" style="--h:120px"><b>Copy Paste Plants</b><span>Elementary students and families</span></a>
<a href="#kallpa-multiplier-mentorship-peru" style="--h:280px"><b>Kallpa Mentorship</b><span>Youth volunteers who teach rural farmers</span></a>

</div>
<div class="ladder-axis"><span>First encounter</span><span>Teaching others</span></div>
```

**Don't** reach for `.ladder` when the items aren't actually ordered along
some real axis — that's what `.card-grid` is for — and don't invent a
height difference for items that are genuinely equivalent just to make the
row look more dynamic.

### `.tickets` — an event with a headline number

For one or a few events/sessions that each have a real headline number
worth leading with (attendance, capacity) and their own heading further
down the page to jump to. `##` headings get a real `id` automatically
(slugified from the title — see `.ladder` above), but a `.ticket` usually
points at a `###`/`####` heading nested inside a bigger section, which
needs one added by hand: write it as a raw HTML heading instead of markdown
syntax (`<h3 id="wall-e">WALL-E</h3>` instead of `### WALL-E`) so the `id`
attribute has somewhere to go. `.ticket-main`/`.ticket-stub` must be
`<span>`, not `<div>` — confirmed `marked` mis-tokenizes an `<a>` wrapping
block-level `<div>` children (it auto-closes the `<a>` partway through,
splitting one ticket into broken, duplicated markup); a `<span>` still
renders as a block once it's a grid item, styled the same either way.

```md
<div class="tickets">

<a class="ticket" href="#wall-e"><span class="ticket-main"><b>WALL-E</b><span>May 7, 2026<br>Discovery Cinema</span></span><span class="ticket-stub"><strong>70</strong><small>guests</small></span></a>
<a class="ticket" href="#hail-mary"><span class="ticket-main"><b>Project Hail Mary</b><span>Aug 30, 2026<br>Conference Room 0215</span></span><span class="ticket-stub"><strong>35</strong><small>guests</small></span></a>

</div>
```

**Don't** use `.ticket-stub`'s big number for anything but a real reported
count — it's built to read as a headline statistic, not a decoration.

### `.pod` — one featured piece of media

For a single podcast, video, or similar recurring show that deserves more
presence than a plain paragraph mentioning its name — an icon beside a
name and one-line description. SVG `fill` is a plain presentation
attribute, not CSS, so it can't reference a custom property; use the
token's literal hex value instead (`--amber` is `#FFD84D`, `--bg` is
`#0A0A27` — see `src/styles/index.scss`).

```md
<div class="pod">
<svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#FFD84D"/><path d="M26 20 L46 32 L26 44 Z" fill="#0A0A27"/></svg>
<div><b>Life in Orbit</b><span>Expert conversations in Arabic and English</span></div>
</div>
```

### `ol.goals` — a numbered list where the order matters

For a short list where the sequence itself is part of the content (goal 1,
goal 2, …), not just parallel items that happen to be listed — large
numbered circles (CSS counters, no JS) instead of bullets or a `.card-grid`.
Author each item as a raw `<li>`, **not** markdown `1. 2. 3.` syntax —
`marked` parses a numbered list into its own `<ol>`, which nests inside
this one instead of reusing it (confirmed: doubles the numbering and the
indent). Blank lines around each `<li>`'s markdown per the `.card-grid`
convention above.

```md
<ol class="goals">

<li>

**Arabic synthetic biology education:** co-create accessible, standardized educational tools, glossaries and outreach materials in Arabic.

</li>
<li>

**Unified regional outreach:** co-design Arabic public engagement tools and culturally tailored science communication.

</li>

</ol>
```

**Don't** reach for this over a plain `<ol>` just for the visual flourish —
use it when the count itself is meaningful ("four goals," "three phases"),
the same bar `.ladder` and `.tickets` hold their own numbers to.

## Layout utilities

Four more classes exist in the same stylesheet. They're layout
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

**`.gallery`** — a photo gallery: plain `<img>` tags in an even
auto-fill grid, each thumbnail cropped to 4:3 with `object-fit: cover` so
mixed portrait/landscape shots line up. Clicking one opens the full,
uncropped image in the lightbox. See the end of `education.md`.

```md
<div class="gallery">
<img src="https://static.igem.wiki/..." alt="..." loading="lazy">
<img src="https://static.igem.wiki/..." alt="..." loading="lazy">
</div>
```

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
