## Aim and hypothesis

<aside class="author-note"><b>Section order.</b> This is an experiment page, so it follows the default order: Aim → Methods → Results → Interpretation → Limitations and next steps → References. Titles are sentence case, unnumbered and six words or fewer.</aside>

We wanted to know how strongly incubation temperature sets the growth rate of *Escherichia coli*, and whether a simple model can predict growth at a temperature we have not measured. We expected growth to speed up from 25 °C to 37 °C, and the square-root model of Ratkowsky and colleagues <a class="cite" href="#ref-1">1</a> to describe that rise with two parameters. If it did, the model would let us plan incubations at any temperature in that range without measuring each one.

<aside class="author-note"><b>First sentence = the point.</b> The section opens with the question and the expectation, not with background on bacteria. Background, if needed, comes after.</aside>

<div class="callout accent">

<p class="callout-label">What this page covers, and what it doesn't</p>

Growth in one rich medium, at three temperatures, measured as optical density. It does not cover temperatures above the optimum, minimal media or gene expression; those are in [Limitations and next steps](#limitations-and-next-steps).

</div>

<aside class="author-note"><b>Scope callout (accent).</b> A scope statement is a claim worth highlighting, not a warning, so it uses the accent tone. The label says what the box is, not "Note". The link jumps to the section by its anchor instead of just naming it.</aside>

### Why *E. coli* K-12

We used *E. coli* K-12 MG1655, the standard laboratory reference strain <a class="cite" href="#ref-2">2</a>. Using a reference strain means our growth rates can be compared with other labs' numbers. K-12 strains also need only Biosafety Level 1 (BSL-1) containment, which our teaching lab provides.

<aside class="author-note"><b>Species in headings.</b> Species names stay italic in headings too. The heading is still sentence case and under six words.</aside>

### Why these three temperatures

<div class="card-grid compact">

<div>

#### 25 °C

An unheated lab bench

</div>

<div>

#### 30 °C

Common for protein expression

</div>

<div>

#### 37 °C

Body temperature, the usual *E. coli* default

</div>

</div>

<aside class="author-note"><b>Card grid.</b> The three temperatures are parallel, comparable items, so they sit in a compact grid instead of a bullet list. Each card is a title plus one line, which is what the compact variant is for.</aside>

## Methods

<aside class="author-note"><b>Species names.</b> The full name, <i>Escherichia coli</i>, is used once per page and abbreviated after. The strain name (MG1655) stays roman. Every abbreviation (OD600, LB, SD) is spelled out on first use.</aside>

We grew MG1655 in Luria–Bertani (LB) broth <a class="cite" href="#ref-3">3</a> in a 96-well plate reader. We measured optical density at 600 nm (OD600) every 15 min for 8 h, giving 3,168 readings per run. Each temperature was a separate run on 14–16 September 2026, with three biological replicates per run (nine growth curves in all) and identical conditions otherwise (Table 1).

<div class="flow">

<span class="flow-node">Glycerol stock</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Overnight culture</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">96-well plate</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">OD600 time series</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Growth-rate fit</span>

</div>

<aside class="author-note"><b>Flow, not a list.</b> The nodes are named states of the sample, so a flow fits. A list of instructions ("pipette, then incubate") would stay a numbered list or go in the protocol below.</aside>

<div class="table-wrap">

| Setting | Value | Source |
| --- | --- | --- |
| Medium | LB broth | <a class="cite" href="#ref-3">3</a> |
| Starting OD600 | 0.02 | This work |
| Volume per well | 200 µL | This work |
| Reading interval | 15 min | This work |
| Run length | 8 h | This work |
| Replicates | 3 biological × 6 technical | This work |

</div>

<div class="caption">

**Table 1. Every run differed only in temperature, so differences in growth can be put down to temperature alone.** Culture conditions shared by all three runs; the Source column says where each value comes from.

</div>

<aside class="author-note"><b>Table rules.</b> The table sits in a table-wrap, with its caption below it. The caption opens with a bold take-home sentence, not a label. Units are in the values, and a Source column makes every parameter traceable.</aside>

<div class="photo-frame">

![A 96-well plate map: water in all edge wells, culture in rows B to D, blanks in rows E to G, the rest unused](https://static.igem.wiki/teams/6341/wiki/content/example-article/plate-layout.svg)

</div>

<div class="caption">

**Figure 1. Culture never sits in an edge well, because edge wells dry out fastest.** Plate layout used for every run: three culture replicates (rows B–D), matching LB-only blanks (rows E–G) and water in the outer ring. Why the layout ended up like this is explained in [Two cycles to a usable plate](#two-cycles-to-a-usable-plate).

</div>

<aside class="author-note"><b>Photo frame.</b> Like every image here, it was uploaded with iGEM's uploads tool and is linked from static.igem.wiki. This diagram has a white background, so it is matted in a photo frame to sit well on the dark page. The alt text describes what the image shows for someone who can't see it. Every image on this page was made by the team; an image from anyone else would end its caption with "Image: [source]."</aside>

<details class="details">
<summary class="details-summary">Full protocol</summary>

<div class="details-body">

1. Streak MG1655 from the glycerol stock onto an LB agar plate; incubate overnight at 37 °C.
2. Pick one colony per biological replicate into 5 mL LB; shake overnight at 37 °C.
3. Dilute each overnight culture into fresh LB to an OD600 of 0.02.
4. Fill the plate as in Figure 1, 200 µL per well, and apply the sealing film.
5. Read OD600 every 15 min for 8 h at the run temperature, with orbital shaking between reads.
6. Subtract the mean blank of the same plate from every culture well before fitting.

</div>

</details>

<aside class="author-note"><b>Details block.</b> The step-by-step protocol is something careful readers want and most readers skip, so it is collapsed. Nothing a judge needs to see the result is hidden in here.</aside>

<h3 id="two-cycles-to-a-usable-plate">Two cycles to a usable plate</h3>

Getting a plate we could trust took two engineering cycles. The first gave a fast-looking result at 37 °C that turned out to be an artefact. The second fixed the cause, and its plate is the one every result on this page comes from.

<aside class="author-note"><b>Engineering steps.</b> Each cycle follows the engineering order (Design → Build → Test → Learn), and Cycle 1's Learn step is what Cycle 2 is designed from. The cycle names are chips, not headings, because <code>####</code> is reserved for card titles.</aside>

<span class="chip">Cycle 1</span> Unsealed plate

<div class="card-grid compact">

<div>

#### Design

Cultures in all 96 wells

</div>

<div>

#### Build

Standard lid, no seal

</div>

<div>

#### Test

37 °C run, well volumes checked after

</div>

<div>

#### Learn

Edge wells lost up to 22% of their volume

</div>

</div>

<div class="callout critical">

<p class="callout-label">Claim retracted</p>

After Cycle 1 we reported a doubling time of 19 min at 37 °C. Evaporation concentrated the cells in the edge wells and inflated their OD600, which made growth look faster. With the Cycle 2 plate, the doubling time at 37 °C is 25 min (Table 2).

</div>

<aside class="author-note"><b>Retractions stay visible.</b> The wrong number stays on the page, in a critical callout, with the reason it was wrong and the corrected value. Judges trust a page more when it shows this.</aside>

<span class="chip">Cycle 2</span> Sealed plate, water in the edges

The fix came from a conversation with the lab's technician, and it cut evaporation to under 3% per well (Figure 2). We redesigned the layout so no culture sits in an edge well, and added a sealing film. Every result in this page's Results section comes from this second plate.

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/example-article/avatar.svg" alt="Placeholder silhouette for a fictional person">
<h4 class="person-name">Dana Example (fictional), Lab Technician</h4>
<p>Dana Example looks after the department's plate readers. Their advice was to "fill the outer wells with water and seal the plate; the edges always dry out first." We changed the layout (Figure 1) and added a sealing film in response.</p>
</div>

<aside class="author-note"><b>Person card.</b> Full name and role on first mention. The quote is word for word and was approved by the person before publishing. The card ends with what we changed because of them. This person is invented for the example.</aside>

<div class="two-col-images">

<div class="photo-frame">

![Plate map for Cycle 1: edge wells shaded dark red, showing 12 to 22 percent volume loss](https://static.igem.wiki/teams/6341/wiki/content/example-article/evaporation-cycle-1.svg)

</div>

<div class="photo-frame">

![Plate map for Cycle 2: all wells pale, showing under 3 percent volume loss](https://static.igem.wiki/teams/6341/wiki/content/example-article/evaporation-cycle-2.svg)

</div>

</div>

<div class="caption">

**Figure 2. Sealing the plate and buffering the edges cut evaporation from up to 22% to under 3% per well.** Volume lost per well after 8 h at 37 °C, measured by pipette at the end of each run. Left: Cycle 1. Right: Cycle 2. Illustrative data.

</div>

<aside class="author-note"><b>Two images side by side.</b> A before/after pair goes in two columns, each in its own photo frame, under one shared caption. Both panels use the same colour scale so they can be compared directly.</aside>

## Results

<aside class="author-note"><b>Lead with the result.</b> The section's first sentence gives the finding and its number. The method details are already above, so this section is all answers.</aside>

*E. coli* grew 2.6 times faster at 37 °C than at 25 °C: the doubling time fell from 65 min to 25 min (Table 2). All three temperatures followed the familiar lag, exponential and stationary phases <a class="cite" href="#ref-4">4</a><a class="cite" href="#ref-5">5</a>. Higher temperatures shortened the lag and reached stationary phase sooner (Figure 3).

<div data-chart="growth-curves"></div>

<div class="caption">

**Figure 3. Going from 25 °C to 37 °C halves the lag, from about 1.5 h to 0.75 h, and steepens the exponential phase.** OD600 over 8 h at 25, 30 and 37 °C, blank-subtracted. Points are means of three biological replicates; error bars are standard deviation (SD, n = 3). Illustrative data.

</div>

<aside class="author-note"><b>Chart, not a screenshot.</b> The author supplied the data and the finding; the developer built the chart from a placeholder in the markdown. Axes have units, error bars say what they are, and one colour per temperature is used on the whole page.</aside>

<div class="table-wrap">

| Temperature (°C) | Growth rate, μ (h⁻¹) | Doubling time (min) | Verdict |
| --- | --- | --- | --- |
| 25 | 0.64 ± 0.03 | 65 | Robust |
| 30 | 1.00 ± 0.05 | 42 | Robust |
| 37 | 1.64 ± 0.08 | 25 | Re-measured |

</div>

<div class="caption">

**Table 2. Growth rate more than doubles between 25 °C and 37 °C, from 0.64 to 1.64 h⁻¹.** Maximum specific growth rate fitted to each curve with the modified logistic model <a class="cite" href="#ref-4">4</a>, mean ± SD (n = 3). "Re-measured" marks the value corrected after the Cycle 1 retraction. Illustrative data.

</div>

<aside class="author-note"><b>No number twice.</b> Figure 3 shows the curves; Table 2 shows the rates derived from them. The same values never appear in both. The Verdict column uses one word per row, and the same word means the same thing everywhere.</aside>

<div class="callout good">

<p class="callout-label">Controls passed</p>

Blank wells stayed below an OD600 of 0.005 for all 8 h in every run. End-of-run streaks showed a single colony type at each temperature, including the fastest run at 37 °C (Figure 4c).

</div>

<div class="photo-frame">

<div class="notebook-img-row">
<img src="https://static.igem.wiki/teams/6341/wiki/content/example-article/streak-25.svg" alt="(a) Streak plate from the 25 °C run, one colony type" style="width:32%" loading="lazy" />
<img src="https://static.igem.wiki/teams/6341/wiki/content/example-article/streak-30.svg" alt="(b) Streak plate from the 30 °C run, one colony type" style="width:32%" loading="lazy" />
<img src="https://static.igem.wiki/teams/6341/wiki/content/example-article/streak-37.svg" alt="(c) Streak plate from the 37 °C run, one colony type" style="width:32%" loading="lazy" />
</div>

</div>

<div class="caption">

**Figure 4. No run was contaminated.** End-of-run streaks from (a) 25 °C, (b) 30 °C and (c) 37 °C on LB agar, each showing a single colony type. Illustrative images.

</div>

<aside class="author-note"><b>Multi-panel figures.</b> Panels of one figure share one row and one caption, labelled (a), (b), (c). A passed control gets a "good" callout so a judge sees the check without reading the methods.</aside>

## Interpretation

<aside class="author-note"><b>Equations.</b> Display equations only, with every symbol defined right after, including its unit. The fitted values are given once, in prose, with their source.</aside>

A two-parameter model fits all three growth rates, so it can predict growth at temperatures we have not measured. The square-root model <a class="cite" href="#ref-1">1</a> treats growth below the optimum temperature as a straight line:

$$
\sqrt{\mu} = b\,(T - T_{\min})
$$

where μ is the maximum specific growth rate (h⁻¹), T is the incubation temperature (°C), T<sub>min</sub> is the temperature at which growth would stop (°C), and b is a fitted slope (°C⁻¹ h⁻⁰·⁵). We fitted b and T<sub>min</sub> to the three rates in Table 2 by least squares, using SciPy <a class="cite" href="#ref-6">6</a>. The fit gives b = 0.040 °C⁻¹ h⁻⁰·⁵ and T<sub>min</sub> = 5 °C, and passes through all three points within their SD (illustrative values).

That means the model can make a prediction we can test. We chose 33 °C because it sits between two measured temperatures, where the model should be most reliable. At 33 °C it predicts:

<div class="panel">
<div class="panel-title"><span>Model prediction · 33 °C</span><span>Simulated</span></div>
<div class="dash">
<div class="dash-card">
<div class="k">Growth rate, μ</div>
<div class="v">1.25<span>h⁻¹</span></div>
</div>
<div class="dash-card">
<div class="k">Doubling time</div>
<div class="v">33<span>min</span></div>
</div>
</div>
</div>

<aside class="author-note"><b>Simulated is labelled.</b> A number that comes from a model rather than a measurement says "Simulated" in its title, so it can't be mistaken for a result.</aside>

<div class="callout">

<p class="callout-label">How far this model can be trusted</p>

The rates in Table 2 are measured, the 33 °C values are modelled, and the straight-line shape is assumed from <a class="cite" href="#ref-1">1</a>. Three temperatures are the minimum that can show a straight line, so a good fit here is weak evidence. The model also only holds below the optimum temperature <a class="cite" href="#ref-1">1</a>, so it says nothing about 42 °C.

</div>

<aside class="author-note"><b>Neutral callout for a caveat.</b> A limit of the method, not a warning about missing work, so it uses the neutral tone. It separates what was measured, modelled and assumed, and says how strong the evidence is.</aside>

## Limitations and next steps

<aside class="author-note"><b>Honest pending state.</b> Missing work is a warning callout that says exactly what is missing and when it is expected, with no placeholder numbers.</aside>

<div class="callout warn">

<p class="callout-label">Not measured yet</p>

The 33 °C run that tests the prediction above will be added after the next plate-reader booking on 20 October 2026.

</div>

Our three next steps, in order:

<ol class="goals">

<li>

**Test the prediction:** measure growth at 33 °C and compare it with the simulated 1.25 h⁻¹.

</li>
<li>

**Find the optimum:** add runs at 40 °C and 42 °C, where the square-root model is expected to break down.

</li>
<li>

**Add a second readout:** repeat with a strain carrying a *gfp* reporter so GFP fluorescence is read alongside OD600.

</li>

</ol>

<aside class="author-note"><b>Ordered goals.</b> The order matters (step 2 only makes sense after step 1), so the steps are numbered goals instead of cards. The gene is italic (<i>gfp</i>) and the protein is roman (GFP).</aside>

The plate-reader protocol format used here matches our other wet-lab protocols on the [Experiments page](/kaust-ksa/experiments).

<aside class="author-note"><b>Wiki links.</b> Links to other wiki pages use the full site path, starting with /kaust-ksa/. Link text names the destination; it never says "click here".</aside>

## References

<aside class="author-note"><b>References.</b> Always the last section, numbered in order of first citation. Journal articles list up to three authors, then "et al."; web pages carry an access date; software has a version. A claim still waiting for its source would get a warning callout instead of a guessed reference; this page has none. Every reference here is real.</aside>

<ol class="ref-list">

<li id="ref-1">Ratkowsky DA, Olley J, McMeekin TA, et al. Relationship between temperature and growth rate of bacterial cultures. <i>Journal of Bacteriology</i>, 149(1):1–5, 1982. <a href="https://doi.org/10.1128/jb.149.1.1-5.1982" target="_blank" rel="noopener noreferrer">doi:10.1128/jb.149.1.1-5.1982</a></li>
<li id="ref-2">NCBI Taxonomy — <i>Escherichia coli</i> K-12. Accessed 5 October 2026. <a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=83333" target="_blank" rel="noopener noreferrer">NCBI Taxonomy entry for E. coli K-12</a></li>
<li id="ref-3">Bertani G. Studies on lysogenesis I. <i>Journal of Bacteriology</i>, 62(3):293–300, 1951. <a href="https://doi.org/10.1128/jb.62.3.293-300.1951" target="_blank" rel="noopener noreferrer">doi:10.1128/jb.62.3.293-300.1951</a></li>
<li id="ref-4">Zwietering MH, Jongenburger I, Rombouts FM, et al. Modeling of the bacterial growth curve. <i>Applied and Environmental Microbiology</i>, 56(6):1875–1881, 1990. <a href="https://doi.org/10.1128/aem.56.6.1875-1881.1990" target="_blank" rel="noopener noreferrer">doi:10.1128/aem.56.6.1875-1881.1990</a></li>
<li id="ref-5">Monod J. The growth of bacterial cultures. <i>Annual Review of Microbiology</i>, 3:371–394, 1949. <a href="https://doi.org/10.1146/annurev.mi.03.100149.002103" target="_blank" rel="noopener noreferrer">doi:10.1146/annurev.mi.03.100149.002103</a></li>
<li id="ref-6">SciPy 1.13 (scipy.optimize.curve_fit). Virtanen P, Gommers R, Oliphant TE, et al. SciPy 1.0: fundamental algorithms for scientific computing in Python. <i>Nature Methods</i>, 17(3):261–272, 2020. <a href="https://doi.org/10.1038/s41592-019-0686-2" target="_blank" rel="noopener noreferrer">doi:10.1038/s41592-019-0686-2</a></li>

</ol>
