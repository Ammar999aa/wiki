## Can a nanobody be manufactured in a closed, oxygen- and carbon-limited habitat?

Producing medicines on demand could reduce dependence on stored supplies during
long space missions. But the microorganisms making them would also depend on limited resources.
For SHIHAB, this raised three design questions: which host should we use, what should we feed it,
and when should we trigger production?

We explored these questions computationally, considering restricted oxygen and carbon supplies
and the potential recovery of nitrogen and phosphate from crew waste. We used genome-scale
metabolic models (GEMs) to compare the three chassis and evaluate nutrient options through flux
balance analysis (FBA). We then added a dynamic model based on ordinary differential equations
(ODEs) to explore production timing and changes over time that steady-state FBA alone cannot
capture.

These predictions guide our design but remain experimentally unvalidated. Our models suggest
that *B. subtilis* has greater metabolic capacity to support production under the conditions
tested.

## Models, software and the constraints shared by every simulation

We used published genome-scale metabolic reconstructions to compare chassis under defined
resource constraints: Yeast9 <a class="cite" href="#ref-1">1</a> for *S. cerevisiae*, iBsu1147 <a class="cite" href="#ref-2">2</a> for *B. subtilis*, and
iMS837 for *S. elongatus* PCC 7942.

Unless otherwise stated, heterotrophic FBA simulations used the following uptake limits:

<div class="table-wrap">

| Resource | Uptake limit (mmol gDW<sup>−1</sup> h<sup>−1</sup>) |
|---|---|
| Glucose | 5 |
| Glycerol | 0 |
| Oxygen, aerobic conditions | 10 |
| Oxygen, anaerobic conditions | 0 |
| Nitrate, anaerobic *B. subtilis* only | 10 |

</div>

Maximum predicted nanobody production was calculated without a minimum growth requirement,
representing production capacity without requiring simultaneous biomass formation.

Cyanobacterial simulations used a light input of 145 mmol photons gDW<sup>−1</sup>
h<sup>−1</sup>, with carbon uptake limits specified in each analysis. Dynamic models were
integrated using `scipy.integrate.solve_ivp` with the RK45 method.

## Yeast: Saccharomyces cerevisiae

*S. cerevisiae* is an established host for recombinant protein production. Its genetic
accessibility, secretory machinery, and oxidizing endoplasmic reticulum make it a promising
candidate for producing antibody fragments that require disulfide bonds <a class="cite" href="#ref-4">4</a>. However, using it
in a closed habitat raises a question: how can we supply the carbon and oxygen needed to sustain
it?

We explored whether a photosynthetic partner could help meet both needs. We selected
*Synechococcus elongatus* PCC 7942, a cyanobacterium that produces oxygen through photosynthesis and
was engineered in our model to export sucrose. We then used its predicted sucrose and oxygen
supplies to constrain uptake in the yeast model and evaluate how this partnership could support
growth.

<span class="chip"><i>S. cerevisiae</i></span>

<h3 id="partner">How much could the photosynthetic partner supply?</h3>

The resources available to yeast depend on how the cyanobacterium allocates its metabolism
between its own growth and sucrose export. We therefore compared a supplier growing at its maximum
predicted rate with one whose growth was capped to favor sucrose production. We then tested how
including its oxygen output affected yeast growth.

<div class="table-wrap">

| Supply condition | Sucrose uptake (mmol gDW<sup>−1</sup> h<sup>−1</sup>) | Oxygen uptake limit (mmol gDW<sup>−1</sup> h<sup>−1</sup>) | Predicted yeast growth rate, μ (h<sup>−1</sup>) |
|---|---|---|---|
| Anaerobic reference* | none | 0 | 0.014 |
| Supplier at maximum growth | 0.23 | 0 | 0.011 |
| Supplier with capped growth | 0.81 | 0 | 0.038 |
| **Supplier with capped growth, including oxygen supply** | **0.81** | **4.2** | **0.18** |

</div>

<div data-chart="yeast-partner-supply"></div>

<div class="caption">

**Figure .** Predicted yeast growth rate under each supply condition in the table above.

</div>

At maximum supplier growth, the predicted sucrose supply supported a yeast growth rate of 0.011
h<sup>−1</sup>. Capping supplier growth increased sucrose supply from 0.23 to 0.81 mmol gDW<sup>−1</sup> h<sup>−1</sup>, raising yeast growth
to 0.038 h<sup>−1</sup>. Including the predicted oxygen supply increased growth further to 0.18 h<sup>−1</sup>,
approximately 4.7 times the sucrose-only result.

These predictions suggest that the partner could support yeast through both carbon provision and
oxygen production. However, the oxygen scenario assumes that the predicted supply reaches the
yeast; transfer losses and consumption within a real vessel could reduce this benefit. Sustaining
the partnership would also require balancing the biomass and growth rates of both organisms.

<span class="chip"><i>S. cerevisiae</i></span>

<h3 id="yeast-oxygen">How much oxygen does yeast need?</h3>

To assess yeast's dependence on oxygen, we compared aerobic growth with a modified anaerobic
setup that allowed sterol and unsaturated fatty acid uptake, removed non-growth-associated ATP
maintenance, and blocked oxygen-dependent biomass reactions. Predicted growth fell from 0.41 to
0.11 h<sup>−1</sup>, increasing the doubling time from 1.7 to 6.3 hours.

We then used the unmodified model to explore oxygen uptake limits between 0 and 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>. At the
lowest non-zero value tested, 0.0503 mmol gDW<sup>−1</sup> h<sup>−1</sup>, growth reached 0.092 h<sup>−1</sup>, exceeding our analysis
threshold of 5% of aerobic growth. CO<sub>2</sub> output reached 7.8 mmol gDW<sup>−1</sup> h<sup>−1</sup>, potentially supplying
carbon to the cyanobacterial partner. These results should be interpreted separately from the
modified anaerobic simulation.

<div data-chart="yeast-aerobic-anaerobic"></div>

<div data-chart="yeast-o2-sweep"></div>

<div class="caption">

**Figure 1. Predicted effects of oxygen availability on yeast growth.** (a) Growth decreases from 0.41 to 0.11 h<sup>−1</sup> under modified anaerobic conditions. (b) In the unmodified model, growth increases approximately linearly with oxygen supply, while CO<sub>2</sub> secretion plateaus earlier. The first non-zero oxygen point already exceeds the 5% growth threshold, so the sweep does not resolve the minimum oxygen requirement.

</div>

<span class="chip"><i>S. cerevisiae</i></span>

<h3 id="yeast-nanobody">Does limited oxygen also reduce nanobody production?</h3>

We used the yeast model to estimate the maximum production rate of our two nanobody constructs,
Nb14 and Nb1_gbHSV, with and without oxygen. For both constructs, removing oxygen reduced predicted
production capacity by approximately 82%.

<div class="table-wrap">

| Construct | With oxygen | Without oxygen | Reduction |
|---|---|---|---|
| Nb14 | 0.0335 | 0.00589 | 82% |
| Nb1_gbHSV | 0.0371 | 0.00654 | 82% |

</div>

Nb1_gbHSV had an approximately 11% higher predicted production rate than Nb14 under both
conditions. Its shorter sequence (119 aa) may contribute to this difference by requiring fewer
resources per molecule. However, these predictions do not assess folding, biological activity, or
therapeutic suitability. Additionally, we explored how oxygen affected the combined production of a
nanobody and green fluorescent protein (GFP). In this analysis, production increased with oxygen
supply before reaching a plateau near 7.5 mmol gDW<sup>−1</sup> h<sup>−1</sup>.

Oxygen availability affects both yeast growth and its predicted ability to produce nanobodies.
Chassis selection therefore needs to consider protein production under the intended resource
constraints.

<div data-chart="yeast-nanobody-by-construct"></div>

<div data-chart="yeast-combined-production-vs-o2"></div>

<div class="caption">

**Figure 2. Predicted protein production in yeast.** (a) Maximum production rates for both nanobody constructs with and without oxygen. Yeast performs similarly to *B. subtilis* aerobically but approximately three times lower anaerobically; the *B. subtilis* simulation includes nitrate supply. (b) Combined GFP and nanobody production increases with oxygen before plateauing. Panel (b) uses an earlier model setup and is not directly comparable with panel (a).

</div>

<span class="chip">Dynamic models</span>

<h3 id="induction">When should we switch production on?</h3>

Producing a nanobody uses resources that cells also need to grow. An inducible system lets us
choose when cells begin production, switching on early provides more production time, while waiting
allows more cells to accumulate first. Thus, we built two dynamic models to explore this balance
over a 48-hour batch. The first assumed that nutrients and oxygen remained available throughout
cultivation. The second allowed sugar and oxygen to run out.

<div data-chart="yeast-constitutive-vs-inducible"></div>

<div data-chart="yeast-resource-simulation"></div>

<div data-chart="yeast-induction-scan"></div>

<div data-chart="yeast-yield-loss-heatmap"></div>

<div class="caption">

**Figure 3. Resource availability changes predicted induction timing.** (a) With unlimited resources, delayed induction produces a higher final concentration than continuous production. (b) With finite resources, sugar and oxygen depletion cause growth and production to stall. (c and d) Earlier induction gives higher output in the resource-limited simulation, with a maximum of 0.24 mg L<sup>−1</sup> when production begins immediately.

</div>

With unlimited resources, the model predicted the highest final nanobody concentration when
production began at 32.7 hours. Under these assumptions, allowing cells to grow first outweighed
the shorter production period. With finite resources, the result reversed. Starting production
immediately gave the highest predicted output, while delaying induction reduced it. As sugar and
oxygen became depleted, growth and production stalled, leaving less opportunity to benefit from a
later switch.

The two models show why induction timing depends on resource availability. Waiting can help when
resources remain available, but it can reduce output when cells consume those resources before
production begins.

<div class="callout warn">

<p class="callout-label">What the models include</p>

Both models describe cell growth, slower growth after induction due to the production burden,
and nanobody accumulation and degradation. The resource-limited model additionally tracks sugar,
dissolved oxygen, and oxygen in the vessel's headspace. Growth and production decrease as resources
become scarce <a class="cite" href="#ref-6">6</a>, while an oxygen-transfer term describes oxygen movement into the
liquid <a class="cite" href="#ref-7">7</a>.

Only the maximum growth rate was informed by FBA. The remaining parameters were illustrative and
were not fitted to experimental measurements. Full equations, the analytical solution for induction
timing, and parameter values are available in the code repository.

</div>

<span class="chip"><i>P. pastoris</i></span>

<h3 id="pastoris">Would <i>Pichia pastoris</i> perform better?</h3>

The strong effect of oxygen on *S. cerevisiae* led us to examine another established
protein-production host, *Pichia pastoris* <a class="cite" href="#ref-5">5</a>. Under aerobic conditions, *P. pastoris* had the
highest predicted growth rate among the chassis tested. Under the tested low-oxygen condition,
however, it grew more slowly than *S. cerevisiae* and supported less than half its combined GFP and
nanobody production rate.

<div class="table-wrap">

| Model output | *P. pastoris* | *S. cerevisiae* |
|---|---|---|
| Maximum aerobic growth rate (h<sup>−1</sup>) | 0.58 | 0.41 |
| Growth rate at the evaluated low-oxygen point (h<sup>−1</sup>) | 0.074 | 0.092 |
| Combined GFP and nanobody production rate at that point (mmol gDW<sup>−1</sup> h<sup>−1</sup>) | 0.0016 | 0.0035 |

</div>

Our results show that rapid aerobic growth does not necessarily translate into strong
performance when oxygen is restricted. Based on this comparison, we did not carry *P. pastoris*
forward into construct-specific or induction-timing simulations.

<div data-chart="pichia-o2-sweep"></div>

<div data-chart="pichia-combined-production-vs-o2"></div>

<div class="caption">

**Figure 4. Predicted responses of *P. pastoris* to oxygen availability.** (a) Growth and CO<sub>2</sub> output across the oxygen range. (b) Combined GFP and nanobody production across the same range.

</div>

The comparison favored *S. cerevisiae* over *P. pastoris* for further modeling under the tested
low-oxygen conditions. Experimental validation is needed to determine whether this ranking holds in
cultivation.

## Bacteria: Bacillus subtilis

*B. subtilis* offers two attractive features for SHIHAB. It can secrete recombinant proteins into
the surrounding medium, potentially simplifying recovery, and it can grow without oxygen through
nitrate respiration or fermentation <a class="cite" href="#ref-10">10</a><a class="cite" href="#ref-8">8</a>. We therefore investigated whether these
capabilities could support production under oxygen-limited conditions. Before comparing its
performance with yeast, however, we needed to resolve a problem, the published metabolic model
predicted no growth without oxygen.

<span class="chip"><i>B. subtilis</i></span>

<h3 id="gapfill">Why did the model fail without oxygen?</h3>

A metabolic model can only use the reactions included in its reconstruction. Missing or
incorrectly represented reactions can therefore prevent simulated growth, even when the organism
can grow experimentally. In iBsu1147, nitrate consumption remained possible without oxygen,
suggesting that the blockage lay elsewhere. We screened reactions that operated aerobically but
stopped under anaerobic conditions, focusing on those involving oxygen.

This identified two steps needed to make essential cell components:

- **NAD<sup>+</sup> synthesis:** NAD<sup>+</sup> helps cells transfer electrons
  during metabolism.
- **Pyrimidine synthesis:** Pyrimidines are building blocks of DNA and RNA.

Both steps were represented by oxygen-dependent reactions, leaving the model without a route to
make these components anaerobically.

To test this, we allowed the model to obtain NAD<sup>+</sup> and orotate, a pyrimidine
precursor, directly. Supplying either alone did not restore growth. Supplying both restored a
predicted growth rate of 0.22 h<sup>−1</sup> under uncapped nitrate supply, supporting the identification of
two simultaneous bottlenecks.

We searched for alternatives supported by known *B. subtilis* enzymes. These reactions allow the
required synthesis steps to proceed using molecules other than oxygen as electron acceptors.

<div class="table-wrap">

| Pathway | Problem in the published model | Evidence-supported correction | Associated genes |
|---|---|---|---|
| NAD<sup>+</sup> synthesis | ASPO6 required oxygen | Added the fumarate-dependent activity of NadB as ASPOfum, supported by purified-enzyme experiments <a class="cite" href="#ref-12">12</a> | BSU27870 |
| Pyrimidine synthesis | DHORDfum used oxygen despite its reaction name | Represented the NAD<sup>+</sup>-dependent activity of the PyrD/PyrK enzyme as DHORDnad <a class="cite" href="#ref-11">11</a> | BSU15530 and BSU15540 |

</div>

For NAD<sup>+</sup> synthesis, our first candidate was an aspartate dehydrogenase reaction. We
rejected it after finding insufficient evidence for that enzyme in *B. subtilis*. Instead, we used
the experimentally characterized ability of NadB to use fumarate <a class="cite" href="#ref-12">12</a>. For pyrimidine
synthesis, the correction represents the native Class 1B dihydroorotate dehydrogenase, which uses
NAD<sup>+</sup> as its physiological electron acceptor <a class="cite" href="#ref-11">11</a>.

Both corrections were available in aerobic and anaerobic simulations. They represent enzyme
capabilities rather than an assumed switch activated by oxygen removal.

<div class="callout good">

<p class="callout-label">Our contribution</p>

The corrections enabled us to investigate anaerobic metabolism without the two identified
synthesis bottlenecks. We included them in our anaerobic modeling function so that the changes can
be inspected and reused.

This process also illustrates how we refined the model: identify a failed prediction, locate the
blocked pathways, evaluate candidate reactions, and check their biological support before applying
a correction.

</div>

<span class="chip"><i>B. subtilis</i></span>

<h3 id="bacillus-oxygen">Can <i>B. subtilis</i> grow without oxygen?</h3>

After correcting the model, we tested how oxygen and nitrate availability affected growth.
Nitrate can provide an alternative to oxygen for respiration, helping cells obtain energy. With
nitrate uptake limited to 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>, predicted growth decreased from 0.32 h<sup>−1</sup> aerobically to 0.14
h<sup>−1</sup> anaerobically, a reduction of approximately 57%, compared with approximately 74% for yeast.
Under these anaerobic conditions, *B. subtilis* doubled in approximately five hours, compared with
approximately six hours for yeast.

This comparison favored *B. subtilis* without oxygen, provided nitrate was available. The aerobic
result also depended on the oxygen uptake limit: growth reached 0.32 h<sup>−1</sup> at the imposed limit of
10 mmol gDW<sup>−1</sup> h<sup>−1</sup>, but increased to approximately 0.40 h<sup>−1</sup> when that restriction was removed.

<div data-chart="bacillus-aerobic-anaerobic"></div>

<div data-chart="bacillus-o2-sweep"></div>

<div class="caption">

**Figure 5. Predicted effects of oxygen and nitrate availability on *B. subtilis* growth.** (a) Growth decreases from 0.32 h<sup>−1</sup> aerobically to 0.14 h<sup>−1</sup> anaerobically with nitrate supplied. (b) Without nitrate, predicted growth remains above the defined 5% growth threshold even at zero oxygen. Increasing oxygen uptake raises growth, matching the nitrate-supported anaerobic reference near 2.5 mmol gDW<sup>−1</sup> h<sup>−1</sup>. CO<sub>2</sub> secretion is shown on the right axis. All simulations use the corrected model.

</div>

Without either oxygen or nitrate, the corrected model still predicted growth through
fermentation at 0.071 h<sup>−1</sup>. This exceeded our analysis threshold of 0.016 h<sup>−1</sup>, defined as 5% of
the oxygen-capped aerobic growth rate. Under this definition, the model required no oxygen to
remain above the threshold. Adding oxygen progressively increased growth. Without nitrate, an
oxygen uptake of approximately 2.5 mmol gDW<sup>−1</sup> h<sup>−1</sup> supported growth comparable to the nitrate-supplied
anaerobic condition.

The model also predicted CO<sub>2</sub> release across the oxygen range, identifying a potential
carbon source for the photosynthetic partner. Whether this CO<sub>2</sub> could support the partner
would depend on its capture and transfer within the system.

<span class="chip"><i>B. subtilis</i></span>

<h3 id="sucrose">Could sucrose replace glucose?</h3>

A photosynthetic partner would supply sucrose rather than glucose. We therefore tested whether
this change in carbon source would affect *B. subtilis* growth. Sucrose contains twice as many carbon
atoms per molecule as glucose. Comparing growth at equal molecular uptake rates would therefore
give sucrose twice the carbon supply. To account for this difference, we compared predicted growth
relative to the amount of carbon supplied. Under anaerobic conditions, the two sugars supported
approximately equal growth per unit of carbon. Under aerobic conditions, glucose supported more
growth per unit of carbon than sucrose.

For SHIHAB, this suggests that switching to sucrose may preserve carbon efficiency under the
modeled anaerobic conditions. This prediction still requires experimental validation and does not
establish whether the cyanobacterium can supply enough sucrose.

<div data-chart="bacillus-glucose-vs-sucrose"></div>

<div class="caption">

**Figure 6. Predicted growth on glucose and sucrose before and after normalizing for carbon supply.** Left: sucrose supports higher growth at equal molecular uptake rates, supplying twice as much carbon as glucose. Right: growth per unit of carbon is approximately equal anaerobically, while glucose supports higher growth per unit of carbon aerobically.

</div>

<span class="chip"><i>B. subtilis</i></span>

<h3 id="bacillus-nanobody">Can <i>B. subtilis</i> maintain nanobody production without oxygen?</h3>

Having established that the corrected model supports anaerobic growth, we next examined whether
it could also sustain nanobody production. With oxygen, *B. subtilis* had approximately 10% higher
predicted production capacity than yeast. Without oxygen, and with nitrate supplied, its advantage
increased to approximately 3.4 times the yeast prediction.

<div class="table-wrap">

| Construct | With oxygen | Without oxygen, with nitrate | Reduction | Anaerobic production relative to yeast |
|---|---|---|---|---|
| Nb14 | 0.0369 | 0.0199 | 46% | 3.4× |
| Nb1_gbHSV | 0.0410 | 0.0220 | 46% | 3.4× |

</div>

Removing oxygen reduced predicted production by 46% in *B. subtilis*, compared with 82% in yeast.
However, the bacterial advantage depended on nitrate availability: its predicted anaerobic
production was approximately 1.8 times the yeast value without nitrate, increasing to approximately
4.5 times with unrestricted nitrate supply. These results favor *B. subtilis* for further
investigation under oxygen-limited conditions, while identifying nitrate supply as an important
design consideration. They describe metabolic production capacity, without assessing protein
folding, secretion efficiency, or biological activity.

<div data-chart="bacillus-nanobody-by-construct"></div>

<div data-chart="bacillus-combined-production-vs-o2"></div>

<div class="caption">

**Figure 7. Predicted nanobody production in *B. subtilis*.** (a) Removing oxygen reduces maximum production by approximately 46% for both constructs when nitrate is supplied. (b) Combined GFP and nanobody production increases with oxygen supply before reaching a plateau. Panel (b) uses an earlier model setup and is not directly comparable with panel (a).

</div>

<span class="chip"><i>B. subtilis</i></span>

<h3 id="bacillus-induction">When should production begin and when should we harvest?</h3>

As we stated before, cells need time to grow, but delaying induction leaves less time and fewer
resources for protein production. For *B. subtilis*, another factor matters: secreted proteases can
break down the product after it has been made <a class="cite" href="#ref-9">9</a>. In this sense, we extended the dynamic
framework used for yeast to include a nitrogen-containing precursor pool and product degradation
that increases with biomass. This allowed us to explore how cell growth, resource depletion, and
protein loss interact over a 72-hour cultivation.

The simulations showed why peak concentration and final concentration must be distinguished.
When induction began at 12 hours, nanobody concentration peaked near 140 mg L<sup>−1</sup> at
approximately 28 hours, then declined as modeled degradation exceeded production. In contrast, the
6.5-hour induction run continued accumulating product through the end of cultivation.

<div data-chart="bacillus-fig9-multi-induction"></div>

<div class="caption">

**Figure 8. Induction timing affects biomass accumulation and nanobody concentration.** Left: predicted biomass under five induction strategies. Right: corresponding nanobody concentrations. Induction at 6.5 hours gives the highest final concentration among the strategies shown, while the 12-hour run peaks earlier and then declines. Colors identify the same induction times in both panels.

</div>

To examine the timing more closely, we varied induction time and compared nanobody
concentrations at the fixed 72-hour harvest. Under the illustrative parameter settings, the highest
final concentration occurred near 6.5 hours, with lower output for earlier or later induction. We
also examined resource consumption. In the trajectory shown, sugar was depleted by approximately 45
hours, while nitrogen-containing precursors remained available. Nitrogen therefore did not become
limiting under these settings; its importance in practice will depend on the medium composition.

<div data-chart="bacillus-fig2-sugar-nitrogen"></div>

<div data-chart="bacillus-fig6-final-nanobody"></div>

<div data-chart="bacillus-fig8-heatmap"></div>

<div class="caption">

**Figure 9. Resource depletion and induction timing in the *B. subtilis* dynamic model.** (a) Sugar and nitrogen-containing precursor concentrations for induction at 10 hours; sugar is depleted while precursors remain available. (b) Final nanobody concentration at 72 hours peaks near an induction time of 6.5 hours. (c) Nanobody concentration across cultivation and induction times, showing how the best induction time depends on when the culture is harvested.

</div>

<div class="callout warn">

<p class="callout-label">What assumptions shape these results?</p>

The model tracks six quantities: biomass, nanobody concentration, sugar, nitrogen-containing
precursors, dissolved oxygen, and headspace oxygen. Resource availability limits growth and
production, while product loss includes both baseline degradation and a biomass-dependent protease
term.

The starting precursor pool was set to 5 g L<sup>−1</sup> and did not become limiting in
the simulations. This means the runs do not establish whether nitrogen availability would constrain
production in the intended medium.

No parameters were fitted to our experimental data. Growth, production burden, degradation, and
oxygen-transfer settings were illustrative or literature-guided. Consequently, the predicted timing
and concentrations are hypotheses for testing. Full equations and parameter values are available in
the code repository.

</div>

## Cyanobacteria: Synechococcus elongatus PCC 7942

Our previous analyses identified sucrose as a promising carbon source for anaerobic
*B. subtilis*. But supplying it in a closed habitat raises another question: could we produce the
feedstock within the system?

We explored a photosynthetic partnership using *Synechococcus elongatus* PCC 7942. This
cyanobacteria uses light and inorganic carbon to produce sugars while releasing oxygen. In
principle, it could supply sucrose to the protein-producing chassis and use CO<sub>2</sub>
recovered from the habitat or microbial cultures. However, making sucrose inside a cell does not
automatically make it available to another organism. Our proposed system therefore requires both
sucrose production and export. Before investigating export, we used the iMS837 metabolic
model <a class="cite" href="#ref-3">3</a> to determine which resources constrained the supplier's growth.

<span class="chip"><i>S. elongatus</i></span>

<h3 id="cyano-limits">What limits the cyanobacterial supplier?</h3>

We first increased the model's uptake limit for inorganic carbon, supplied as CO<sub>2</sub> or
bicarbonate, and recorded its predicted growth. Growth increased until the carbon uptake bound
reached approximately 4.2 mmol gDW<sup>−1</sup> h<sup>−1</sup>, then plateaued. Beyond this point, additional carbon alone did not
improve growth. We selected a carbon uptake bound of 5.1 mmol gDW<sup>−1</sup> h<sup>−1</sup>, informed by published experimental
work <a class="cite" href="#ref-22">22</a>. This supported a predicted baseline growth rate of 0.219 h<sup>−1</sup>.

<div data-chart="cyano-co2-hco3-bounds"></div>

<div class="caption">

**Figure 10. Predicted cyanobacterial growth across inorganic-carbon uptake limits.** Growth plateaus above approximately 4.2 mmol gDW<sup>−1</sup> h<sup>−1</sup>. The selected bound of 5.1 lies beyond the onset of the plateau, while the model's default bound of 2 restricts growth.

</div>

To identify what prevented further growth, we examined how the model responded to resource
constraints. The analysis indicated that nitrogen availability limited growth under the tested
conditions, while additional carbon or light offered no predicted growth benefit.

<div class="table-wrap">

| Resource | Reported shadow price |
|---|---|
| CO<sub>2</sub> | ≈ 0 |
| Bicarbonate | ≈ 0 |
| Light | ≈ 0 |
| Ammonium | −0.124 |
| Nitrate | −0.124 |

</div>

The analysis indicated that nitrogen availability limited growth under these conditions.
Additional carbon or light offered no predicted growth benefit, whereas the nitrogen-related values
identified ammonium and nitrate availability as priorities for further investigation. This finding
concerns the supplier's growth at the selected operating point. Resource requirements may change
when metabolism is directed towards sucrose export.

<span class="chip"><i>S. elongatus</i></span>

<h3 id="cascade">Nitrogen and sulfate must be considered together</h3>

Our initial analysis identified nitrogen as a growth limitation. However, increasing nitrogen
availability alone produced only a small improvement: growth rose from 0.2191 to 0.2202 h<sup>−1</sup>,
approximately 0.5%. The reason was sulfate. Its default uptake limit was also close to the amount
required for growth, so relieving nitrogen limitation quickly exposed a second bottleneck.
Improving nitrogen supply alone was therefore insufficient to substantially increase growth.

We investigated these interactions by progressively relaxing nutrient constraints. At each step,
we tested which nutrient, or combination of nutrients, could increase growth and identified the
point beyond which additional supply stopped helping.

<div class="table-wrap">

| Simulation stage | Predicted growth rate (h<sup>−1</sup>) |
|---|---|
| Selected baseline conditions | 0.2191 |
| Nitrogen supply increased; sulfate becomes limiting | 0.2202 |
| Nitrogen and sulfate constraints relaxed; carbon becomes limiting | 0.2619 |
| Carbon, nitrogen, and sulfate constraints relaxed; light becomes limiting | 0.3279 |

</div>

Although carbon was sufficient at the original operating point, it became limiting once improved
nitrogen and sulfate supplies supported faster growth. Resource requirements therefore changed as
each bottleneck was removed. After three relief steps, growth reached 0.3279 h<sup>−1</sup>. Relaxing all
eight nutrient groups simultaneously gave the same result, supporting this value as the growth
ceiling under the fixed light supply of 145 mmol photons gDW<sup>−1</sup> h<sup>−1</sup>,
summed across 15 wavelength bins.

<div data-chart="cyano-limiting-factors"></div>

<div class="caption">

**Figure 11. Predicted nutrient limitations change as resource availability increases.** Growth rises from 0.2191 to 0.3279 h<sup>−1</sup> as nitrogen, sulfate, and carbon constraints are progressively relaxed. At the final stage, additional nutrients no longer increase growth under the fixed light supply. Limiting groups and transition points were identified through direct tests of predicted growth.

</div>

<div class="callout warn">

<p class="callout-label">What does this mean for experimental design?</p>

Carbon imposed the strongest restriction in the default model medium. Once its availability was
increased, nitrogen and sulfate became the next bottlenecks. Our initial sensitivity analysis
highlighted nitrogen but did not fully reveal this interaction, so we used direct nutrient sweeps
and tests of nutrient combinations to confirm which changes improved growth.

These results suggest testing nitrogen and sulfate separately and together, then reassessing
carbon supply as growth increases. Experiments should measure both growth and sucrose export, since
conditions that favor biomass accumulation may differ from those that maximize feedstock
delivery.

Recovered nitrogen from processed urine could be explored as a future input, subject to testing
its composition and compatibility with the culture. Before experimental use, the model's uptake
limits must also be translated into medium concentrations or feeding rates.

</div>

<span class="chip"><i>S. elongatus</i></span>

<h3 id="export">Can we direct more carbon towards sucrose export?</h3>

After identifying the resources needed for cyanobacterial growth, we examined how much sucrose
the supplier could release for another organism to use. We added a transport reaction representing
CscB, an *E. coli* sucrose transporter whose use for sucrose export in *S. elongatus* PCC 7942 has been
demonstrated experimentally <a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a>. We then varied the biomass requirement and calculated
the maximum sucrose export at each setting.

The model predicted a clear trade-off: supporting more supplier growth left less carbon
available for sucrose export. At the reported maximum-growth operating point, sucrose export
reached 0.23 mmol gDW<sup>−1</sup> h<sup>−1</sup>. Reducing the supplier growth rate to 0.013 h<sup>−1</sup> increased export to 0.81 mmol gDW<sup>−1</sup> h<sup>−1</sup>,
approximately 3.5 times higher.

<div data-chart="cyano-sucrose-vs-growth"></div>

<div class="caption">

**Figure 12. Predicted trade-off between cyanobacterial growth and sucrose export.** Maximum sucrose export decreases approximately linearly as the required biomass flux increases. The horizontal axis expresses biomass flux as a fraction of the maximum achievable growth rate. Simulations use iMS837 with the added CscB transport reaction and the stated inorganic-carbon uptake limits.

</div>

<div class="table-wrap">

| Operating point | Supplier growth rate (h<sup>−1</sup>) | Sucrose export (mmol gDW<sup>−1</sup> h<sup>−1</sup>) | Predicted yeast growth rate (h<sup>−1</sup>) |
|---|---|---|---|
| Maximum supplier growth | 0.030 | 0.23 | 0.011 |
| **Reduced supplier growth** | **0.013** | **0.81** | **0.038** |

</div>

The reduced-growth condition therefore provides a candidate for experimental testing. It does
not establish co-culture stability, which also depends on the relative abundance and growth of both
organisms. The supplier also released oxygen at a predicted rate of **4.23 mmol gDW<sup>−1</sup> h<sup>−1</sup>**.
Together with the yeast results, this suggests that the partnership could provide both carbon and
oxygen. Experiments should therefore measure oxygen availability alongside sucrose delivery.

<span class="chip"><i>S. elongatus</i></span>

<h3 id="export-limits">Do growth and sucrose export have the same nutrient requirements?</h3>

The earlier nutrient analysis focused on maximizing cyanobacterial growth. We next changed the
objective to maximizing sucrose export at a supplier growth rate of 0.013 h<sup>−1</sup>. Under these
conditions, carbon availability constrained predicted export. Nitrogen, phosphate, and sulfate did
not show the same limiting effect at the tested operating point. This distinction matters for
experimental design. Increasing nitrogen and sulfate may support more supplier biomass, but it does
not necessarily increase sucrose delivery. Once sufficient nutrients are available to sustain the
chosen growth rate, improving carbon supply becomes a priority for testing export.

<div class="table-wrap">

| Exchange reaction | Flux | Shadow price | Binding? |
|---|---|---|---|
| CO<sub>2</sub> | −5.10 | −0.083 | Yes |
| HCO<sub>3</sub><sup>−</sup> | −5.10 | −0.083 | Yes |
| NH<sub>4</sub><sup>+</sup> | −0.003 | ≈ 0 | No |
| NO<sub>3</sub><sup>−</sup> | −0.102 | ≈ 0 | No |
| PO<sub>4</sub><sup>3−</sup> | −0.006 | ≈ 0 | No |
| SO<sub>4</sub><sup>2−</sup> | −0.002 | ≈ 0 | No |
| Photons | ≈ 0 | ≈ 0 | No |

</div>

<span class="chip"><i>S. elongatus</i></span>

<h3 id="knockouts">Would gene deletions increase sucrose production?</h3>

We tested whether deleting *glgC*, involved in glycogen storage, and *invA*,
involved in sucrose breakdown, could redirect resources towards sucrose production. Neither
deletion, alone or in combination, increased predicted production even when carbon and light
restrictions were removed.

Using an artificial reaction to represent sucrose accumulation, the model predicted
**0.29 mmol gDW<sup>−1</sup> h<sup>−1</sup>** under the selected conditions and **16.3 mmol gDW<sup>−1</sup> h<sup>−1</sup>** without
carbon and light restrictions. Further screening found no deletion that forced higher sucrose
production. Instead, flux analysis pointed to precursor supply through the Calvin cycle as a
constraint.

Published studies report benefits from these deletions under conditions including salt
stress <a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a><a class="cite" href="#ref-18">18</a><a class="cite" href="#ref-19">19</a>. Our model does not explicitly represent the regulatory responses
involved. If competing pathways are already inactive in the optimal solution, deleting them has no
effect.

The model therefore provides no support for these deletions under the simulated conditions, but
does not rule out their experimental benefit.

## What the model changed

<div class="callout accent">

<p class="callout-label">The honest summary</p>

No prediction on this page has been tested against our own experimental
data yet, and no wet-lab measurement went into any model. What follows is
what the modeling decided, and what it is waiting on.

</div>

### Decisions the modeling made

**The chassis.** We started expecting yeast, which is the default for a
secreted eukaryotic-style product, and the models argued against it:
*B. subtilis* keeps 73% of its growth without oxygen where yeast keeps
20%, and carries roughly 5.5× the nanobody flux aerobically.
This is the clearest case in our work of modeling changing a decision
rather than confirming one.

**The feedstock.** Sucrose from a growth-capped cyanobacterial partner,
not glucose. [The per-carbon analysis](#bac-carbon) showed the switch
costs *B. subtilis* nothing anaerobically, which is what made the
co-culture defensible rather than merely necessary.

**The aeration target.** Not "aerobic or anaerobic" but the smallest
oxygen trickle that clears viability, which both host models put very
low. That changes what the bioreactor has to do.

**Where not to spend engineering effort.** Competing-pathway knockouts in
the supplier, which our models say do nothing and which we now understand
why FBA cannot evaluate.

### What went into the models

- **CO₂/HCO₃⁻ uptake bound.** The habitat-analog CO₂/HCO₃⁻ bound of
  5.1 mmol·h<sup>−1</sup> used throughout the cyanobacterial work is
  supported by published experimental
  measurements<a class="cite" href="#ref-22">22</a>, not chosen
  for convenience.
- **CscB feasibility.** The export strategy rests on the experimentally
  validated incorporation of CscB into PCC
  7942<a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a>.
  We are modeling a strain that has been built, not a hypothetical
  one.
- **Gap-fill reaction identity.** Both reactions added to iBsu1147 were
  accepted only after literature confirmation: dihydroorotate
  dehydrogenase as a constitutively NAD-dependent Class 1B
  enzyme<a class="cite" href="#ref-11">11</a>, and NadB's
  fumarate-linked mode by direct enzymatic characterization of the
  purified *B. subtilis*
  protein<a class="cite" href="#ref-12">12</a>. A candidate that
  lacked such evidence (ASPDH) was rejected.
- **Anaerobic yeast protocol.** Applied from the Yeast9 authors' own
  published implementation rather than reconstructed by us.
- **Knockout expectations.** The 15–300% sucrose increases reported
  under salt
  stress<a class="cite" href="#ref-17">17</a><a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-18">18</a><a class="cite" href="#ref-19">19</a>
  are what allowed us to recognize our null in-silico result as a
  method limitation rather than as evidence against the knockouts.

### What the Wet Lab is being asked to test

Each item is something the Wet Lab could act on directly. The first
three are the ones we would prioritize.

<div class="card-grid">

<div>

#### 1. Build in *B. subtilis* first
5.5× higher theoretical aerobic production than yeast and a 27% rather
than 80% loss going anaerobic (Table 6). If resources allow only
one chassis to be built, this is it.

</div>

<div>

#### 2. Test the anaerobic gap-fill directly
Grow *B. subtilis* on nitrate under strict anaerobiosis, with and
without pyrimidine and NAD supplementation. This tests the specific
model correction our Dry Lab proposed (see the model-repair discussion
above) and would be a genuinely novel validation rather than a
literature reproduction.

</div>

<div>

#### 3. Run the co-culture at the growth-capped operating point
Cap cyanobacterial biomass flux near 0.013 h<sup>−1</sup> rather than
letting it grow maximally; the model predicts sucrose export rises from
0.234 to 0.8078 mmol·h<sup>−1</sup> and the partner culture becomes more
stable.

</div>

<div>

#### 4. Prefer Nb1_gbHSV
Where the two constructs are otherwise interchangeable, since it is
consistently and systematically easier to produce in both hosts.

</div>

<div>

#### 5. Do not over-engineer aeration
A supply on the order of 0.05 mmol·h<sup>−1</sup> keeps all three
tested chassis well above their 5% viability thresholds. Worth testing
directly, since the identical value across three organisms may be a
grid artifact (see [the yeast oxygen section](#yeast-oxygen)).

</div>

<div>

#### 6. Target CO₂ delivery in the cyanobacteria
Not competing-pathway knockouts. Three independent analyses converge on
the CO₂-concentrating mechanism as the leverage point.

</div>

<div>

#### 7. Solve phosphate sourcing
Growth is limited by nitrogen first, then carbon, then phosphate, with
phosphate carrying by far the steepest shadow price (−2.349).
Urine-derived nitrogen addresses the first constraint; phosphate is
currently unassigned.

</div>

<div>

#### 8. Induce early and harvest at the product peak
Not at a fixed endpoint, because product declines under protease loss
once resources deplete (Figure 10).

</div>

<div>

#### 9. Test the ratio question
Whether increasing the cyanobacteria:host ratio above 1:1 raises supply
enough to accelerate the partner further is an open question raised by
our own 13-fold result and not answerable with the models as currently
built.

</div>

</div>

### Validation available so far

In the absence of experimental data, the checks available to us were
internal. We record them rather than claim more.

- **Analytical limit checks.** All three limiting cases of the
  $\tau^*$ equation (see [the yeast induction section](#yeast-induction)) recover
  the biologically correct answer.
- **Dual-solution sanity check.** NH₄⁺ and NO₃⁻ return identical shadow
  prices, as they must if both converge on GS-GOGAT (see the Nutrient
  Supply and Limitation section, [above](#cyano-limits)).
- **Convergent evidence for the cyanobacterial bottleneck.** Shadow
  prices under a sucrose objective, flux tracing to the `f6p_c` pool,
  and NDH-1 single-gene deletions all independently identify CO₂
  delivery as the constraint.
- **Agreement across three FBA objectives.** Growth rate, combined
  protein output and per-construct nanobody flux all rank *B. subtilis*
  above *S. cerevisiae* under oxygen limitation.
- **Independent reproduction of the iBsu1147 gap.** Two Dry Lab members
  independently identified the same two missing reactions, which is
  weak but real evidence that the gap is in the model rather than in a
  particular analysis script.

## Limitations and next steps

### What these models cannot see

We list these in rough order of how much they constrain the
conclusions.

No prediction on this page has been tested against our own data. Every
number should be read as a model output.

#### FBA measures metabolic capacity, not protein quality.

The chassis comparison ranks organisms by how much carbon, nitrogen and
energy they could route into a nanobody. It says nothing about folding,
disulfide-bond formation, post-translational modification, secretion
efficiency or solubility, exactly the areas where eukaryotic hosts are
usually preferred for antibody fragments. Read our chassis
recommendation as "*B. subtilis* has the metabolic headroom", not
"*B. subtilis* will make better nanobody".

#### Stoichiometric models cannot see regulation.

Demonstrated directly by the cyanobacterial knockout screen (see the
[Knockout Strategy section](#cyano-knockouts)). Any engineering target whose benefit
is regulatory will be invisible to this method.

#### FBA has no time axis; the ODEs have no metabolic detail.

The two model classes have complementary blind spots, and we have not
yet bridged them. Dynamic FBA (dFBA) is the obvious bridge and was not
attempted.

#### The dynamic model parameters are mostly assumed.

Only $\mu$ is described as FBA-derived, and that link is unverified.
Optimal induction times ($t_{\mathrm{i}}^* = 32.7$ h for the analytical
yeast model, ≈6.5 h for *Bacillus*) are therefore *model-dependent
illustrations of a trade-off*, not process set-points.

#### The co-culture arithmetic is idealized.

Steady state, perfect sucrose transfer, no spatial gradients, no
competition, no pH coupling.

#### The induction switch is instantaneous.

Both dynamic models assume the metabolic shift at $t_{\mathrm{i}}$ is
sharp relative to the cultivation time. Real inducible systems have
induction kinetics, leakiness and a lag.

#### Protease loss is a lumped term.

$k_{\mathrm{prot}}XP$ stands in for the entire *Bacillus* extracellular
protease system without modeling any protease explicitly.

#### Habitat conditions are represented only through bounds.

"Habitat-analog" here means a particular photon bound and a particular
CO₂ bound. Temperature, pressure, radiation and gravity effects are
entirely absent.

#### Single-model reliance.

Each organism is represented by one published reconstruction;
model-to-model variation was not assessed.

### Future directions

<div class="card-grid">

<div>

#### Feed cyanobacterial sucrose into the *Bacillus* model
The calculation done for yeast ([Table 2](#yeast-carbon)) has not been done for
the chassis we actually recommend. Both the models and the flux values
already exist; this is the cheapest missing piece of work in the whole
Dry Lab and it closes an obvious hole a judge will notice.

</div>

<div>

#### Close the loop with dFBA
The highest-value next step. dFBA would let metabolism change over the
batch timecourse, testing whether the Monod-based approximation is
adequate or whether other limitations take over, and would replace the
currently weak GEM-to-ODE coupling with a real one.

</div>

<div>

#### Re-parameterize the dynamic models from the GEMs
Replacing $\mu_B = 0.40$ h<sup>−1</sup> with the FBA-derived
0.3186 h<sup>−1</sup>/0.22 h<sup>−1</sup>, and deriving yields from the
corresponding flux distributions, would make the two model classes
quantitatively consistent.

</div>

<div>

#### Model the full closed loop
We modeled cyanobacteria feeding sugar and oxygen to the host, but not
the host feeding back, even though we computed that CO₂ output
(7.75–9.23 mmol·h<sup>−1</sup>) and separately showed that increasing
CO₂ is the one thing that raises sucrose output. Both halves are in
hand.

</div>

<div>

#### Sensitivity analysis
No formal sensitivity or uncertainty analysis was performed. Given how
many dynamic-model parameters are assumed, a global sensitivity
analysis would tell us which ones actually need experimental grounding,
and which do not, which is just as useful.

</div>

<div>

#### Add protein-quality constraints
Resource-allocation or enzyme-constrained models (the *ecBSU1*
formulation is already available) would begin to capture the expression
burden that the $\beta$ parameter currently represents
phenomenologically.

</div>

</div>

<div class="callout warn">

<p class="callout-label">Known inconsistencies still to resolve</p>

Two numbers need checking before this page is frozen: the minimum viable
oxygen uptake, which comes out identical to four significant figures for
all three organisms and is almost certainly our sweep's grid spacing, and
the anaerobic yeast baseline in [Table 2](#yeast-carbon), flagged there.

</div>

## References

<ol class="ref-list">

<li id="ref-1">Zhang C, et al. Yeast9: A consensus genome-scale metabolic model for <i>S. cerevisiae</i> curated by the community. <i>Molecular Systems Biology</i>, 20, 2024. <a href="https://doi.org/10.1038/s44320-024-00060-7" target="_blank" rel="noopener noreferrer">doi:10.1038/s44320-024-00060-7</a></li>
<li id="ref-2">Hao T, Han B, Ma H, Fu J, Wang H, Wang Z, Tang B, Chen T, Zhao X. In silico metabolic engineering of <i>Bacillus subtilis</i> for improved production of riboflavin, Egl-237, (R,R)-2,3-Butanediol and isobutanol. <i>Molecular BioSystems</i>, 9(8):2034–2044, 2013. <a href="https://doi.org/10.1039/c3mb25568a" target="_blank" rel="noopener noreferrer">doi:10.1039/c3mb25568a</a></li>
<li id="ref-3">Santos-Merino M, Gargantilla-Becerra Á, de la Cruz F, Nogales J. Highlighting the potential of <i>Synechococcus elongatus</i> PCC 7942 as platform to produce α-linolenic acid through an updated genome-scale metabolic modeling. <i>Frontiers in Microbiology</i>, 14:1126030, 2023. <a href="https://doi.org/10.3389/fmicb.2023.1126030" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2023.1126030</a></li>
<li id="ref-4">Kastberg LLB, Ard R, Jensen MK, Workman CT. Burden imposed by heterologous protein production in two major industrial yeast cell factories: Identifying sources and mitigation strategies. <i>Frontiers in Fungal Biology</i>, 3:827704, 2022. <a href="https://doi.org/10.3389/ffunb.2022.827704" target="_blank" rel="noopener noreferrer">doi:10.3389/ffunb.2022.827704</a></li>
<li id="ref-5">Pan Y, Yang J, Wu J, Yang L, Fang H. Current advances of <i>Pichia pastoris</i> as cell factories for production of recombinant proteins. <i>Frontiers in Microbiology</i>, 13:1059777, 2022. <a href="https://doi.org/10.3389/fmicb.2022.1059777" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2022.1059777</a></li>
<li id="ref-6">Monod J. The growth of bacterial cultures. <i>Annual Review of Microbiology</i>, 3:371–394, 1949. <a href="https://doi.org/10.1146/annurev.mi.03.100149.002103" target="_blank" rel="noopener noreferrer">doi:10.1146/annurev.mi.03.100149.002103</a></li>
<li id="ref-7">Garcia-Ochoa F, Gomez E. Bioreactor scale-up and oxygen transfer rate in microbial processes: An overview. <i>Biotechnology Advances</i>, 27(2):153–176, 2009. <a href="https://doi.org/10.1016/j.biotechadv.2008.10.006" target="_blank" rel="noopener noreferrer">doi:10.1016/j.biotechadv.2008.10.006</a></li>
<li id="ref-8">Schallmey M, Singh A, Ward OP. Developments in the use of <i>Bacillus</i> species for industrial production. <i>Canadian Journal of Microbiology</i>, 50(1):1–17, 2004. <a href="https://doi.org/10.1139/w03-076" target="_blank" rel="noopener noreferrer">doi:10.1139/w03-076</a></li>
<li id="ref-9">Cui W, Han L, Suo F, Liu Z, Zhou L, Zhou Z. Exploitation of <i>Bacillus subtilis</i> as a robust workhorse for production of heterologous proteins and beyond. <i>World Journal of Microbiology and Biotechnology</i>, 34(10):145, 2018. <a href="https://doi.org/10.1007/s11274-018-2531-7" target="_blank" rel="noopener noreferrer">doi:10.1007/s11274-018-2531-7</a></li>
<li id="ref-10">Nakano MM, Zuber P. Anaerobic growth of a &ldquo;strict aerobe&rdquo; (<i>Bacillus subtilis</i>). <i>Annual Review of Microbiology</i>, 52:165–190, 1998. <a href="https://doi.org/10.1146/annurev.micro.52.1.165" target="_blank" rel="noopener noreferrer">doi:10.1146/annurev.micro.52.1.165</a></li>
<li id="ref-11">Kahler AE, Nielsen FS, Switzer RL. Biochemical characterization of the heteromeric <i>Bacillus subtilis</i> dihydroorotate dehydrogenase and its isolated subunits. <i>Archives of Biochemistry and Biophysics</i>, 371(2):191–201, 1999. <a href="https://doi.org/10.1006/abbi.1999.1455" target="_blank" rel="noopener noreferrer">doi:10.1006/abbi.1999.1455</a></li>
<li id="ref-12">Marinoni I, Nonnis S, Monteferrante C, Heathcote P, Härtig E, Böttger LH, Trautwein AX, Negri A, Albertini AM, Tedeschi G. Characterization of L-aspartate oxidase and quinolinate synthase from <i>Bacillus subtilis</i>. <i>The FEBS Journal</i>, 275(20):5090–5107, 2008. <a href="https://doi.org/10.1111/j.1742-4658.2008.06641.x" target="_blank" rel="noopener noreferrer">doi:10.1111/j.1742-4658.2008.06641.x</a></li>
<li id="ref-13">Dauner M, Storni T, Sauer U. <i>Bacillus subtilis</i> metabolism and energetics in carbon-limited and excess-carbon chemostat culture. <i>Journal of Bacteriology</i>, 183(24):7308–7317, 2001. <a href="https://doi.org/10.1128/JB.183.24.7308-7317.2001" target="_blank" rel="noopener noreferrer">doi:10.1128/JB.183.24.7308-7317.2001</a></li>
<li id="ref-14">Niederholtmeyer H, Wolfstädter BT, Savage DF, Silver PA, Way JC. Engineering cyanobacteria to synthesize and export hydrophilic products. <i>Applied and Environmental Microbiology</i>, 76(11):3462–3466, 2010. <a href="https://doi.org/10.1128/AEM.00202-10" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.00202-10</a></li>
<li id="ref-15">Arias DM, Ortíz-Sánchez E, Okoye PU, Rodríguez-Rangel H, Balbuena Ortega A, Longoria A, Domínguez-Espíndola R, Sebastian PJ. A review on cyanobacteria cultivation for carbohydrate-based biofuels: Cultivation aspects, polysaccharides accumulation strategies, and biofuels production scenarios. <i>Science of The Total Environment</i>, 794:148636, 2021. <a href="https://doi.org/10.1016/j.scitotenv.2021.148636" target="_blank" rel="noopener noreferrer">doi:10.1016/j.scitotenv.2021.148636</a></li>
<li id="ref-16">Ducat DC, Avelar-Rivas JA, Way JC, Silver PA. Rerouting carbon flux to enhance photosynthetic productivity. <i>Applied and Environmental Microbiology</i>, 78(8):2660–2668, 2012. <a href="https://doi.org/10.1128/AEM.07901-11" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.07901-11</a></li>
<li id="ref-17">Santos-Merino M, Yun L, Ducat DC. Cyanobacteria as cell factories for the photosynthetic production of sucrose. <i>Frontiers in Microbiology</i>, 14:1126032, 2023. <a href="https://doi.org/10.3389/fmicb.2023.1126032" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2023.1126032</a></li>
<li id="ref-18">Kirsch F, Klähn S, Hagemann M. Salt-regulated accumulation of the compatible solutes sucrose and glucosylglycerol in cyanobacteria and its biotechnological potential. <i>Frontiers in Microbiology</i>, 10:2139, 2019. <a href="https://doi.org/10.3389/fmicb.2019.02139" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2019.02139</a></li>
<li id="ref-19">Du W, Liang F, Duan Y, Tan X, Lu X. Exploring the photosynthetic production capacity of sucrose by cyanobacteria. <i>Metabolic Engineering</i>, 19:17–25, 2013. <a href="https://doi.org/10.1016/j.ymben.2013.05.001" target="_blank" rel="noopener noreferrer">doi:10.1016/j.ymben.2013.05.001</a></li>
<li id="ref-20">Prabha S, Vijay AK, Paul RR, George B. Cyanobacterial biorefinery: Towards economic feasibility through the maximum valorization of biomass. <i>Science of The Total Environment</i>, 814:152795, 2022. <a href="https://doi.org/10.1016/j.scitotenv.2021.152795" target="_blank" rel="noopener noreferrer">doi:10.1016/j.scitotenv.2021.152795</a></li>
<li id="ref-21">Angermayr SA, Paszota M, Hellingwerf KJ. Engineering a cyanobacterial cell factory for production of lactic acid. <i>Applied and Environmental Microbiology</i>, 78(19):7098–7106, 2012. <a href="https://doi.org/10.1128/AEM.01587-12" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.01587-12</a></li>
<li id="ref-22">Abernathy MH, Yu J, Ma F, Liberton M, Ungerer J, Hollinshead WD, Gopalakrishnan S, He L, Maranas CD, Allen DK, Tang YJ. Deciphering cyanobacterial phenotypes for fast photoautotrophic growth via isotopically nonstationary metabolic flux analysis. <i>Biotechnology for Biofuels</i>, 10:273, 2017. <a href="https://doi.org/10.1186/s13068-017-0958-y" target="_blank" rel="noopener noreferrer">doi:10.1186/s13068-017-0958-y</a></li>

</ol>
