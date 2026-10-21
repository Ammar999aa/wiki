## Model system overview

<span id="can-a-nanobody-be-manufactured-in-a-closed-oxygen-and-carbon-limited-habitat"></span>

<section class="model-question" id="sec:question">

<div class="table-wrap">
<table class="matrix-table" aria-labelledby="model-links-caption">
<thead><tr><th>Link</th><th>What is actually passed</th><th>Strength</th></tr></thead>
<tbody><tr><th scope="row">Cyanobacteria → Yeast</th><td>Sucrose and O<sub>2</sub> fluxes used as uptake bounds in the yeast model</td><td><span class="chip">Modeled</span></td></tr><tr><th scope="row">Hosts → Cyanobacteria</th><td>CO<sub>2</sub> output at the micro-aerophilic point is a candidate carbon input</td><td><span class="chip">Identified</span></td></tr><tr><th scope="row">GEM → ODE</th><td>Chassis choice set which host each dynamic model was built for</td><td><span class="chip">Assumed</span></td></tr><tr><th scope="row">Cyanobacteria → Bacteria</th><td>Per-carbon sucrose analysis confirms the feedstock does not penalize the host</td><td><span class="chip">Modeled</span></td></tr></tbody>
</table>
</div>
<div class="caption" id="model-links-caption"><strong>Table 1. How each model connects to the next, and whether the connection is measured, modeled or assumed.</strong></div>
<details class="details" id="models-software-and-the-constraints-shared-by-every-simulation">
<summary class="details-summary">Details: models, software and the constraints shared by every simulation</summary>
<div class="details-body">
<p>All GEM used are published reconstructions: <strong>Yeast9</strong><sup class="cite">[<a href="#ref-1">1</a>]</sup> for <em>S. cerevisiae</em>,
      <strong>iBsu1147</strong><sup class="cite">[<a href="#ref-2">2</a>]</sup> for <em>B. subtilis</em>, and <strong>iMS837</strong><sup class="cite">[<a href="#ref-3">3</a>]</sup> for
      <em>S. elongatus</em> PCC 7942. iMS837 was built on iJB792<sup class="cite">[<a href="#ref-4">4</a>]</sup>, one of the earlier <em>S. elongatus</em>
      reconstructions alongside iJB785<sup class="cite">[<a href="#ref-5">5</a>]</sup>.</p>
<p>Unless stated otherwise,
      heterotrophic simulations used glucose exchange 5 mmol gDW<sup>−1</sup> h<sup>−1</sup>, glycerol 0 mmol gDW<sup>−1</sup> h<sup>−1</sup>, and oxygen 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>
      (aerobic) or 0 mmol gDW<sup>−1</sup> h<sup>−1</sup> (anaerobic). Anaerobic <em>B. subtilis</em> simulations also cap nitrate uptake at
      10 mmol gDW<sup>−1</sup> h<sup>−1</sup>. Maximum nanobody fluxes were calculated with no growth requirement. Cyanobacterial
      simulations used habitat-analogue light (145 mmol photons gDW<sup>−1</sup>
      h<sup>−1</sup>) and the carbon bound stated per analysis.</p>
<p>Dynamic models were integrated with <code>scipy.integrate.solve_ivp</code> (RK45). Code:
      <a href="https://github.com/taibazeyak/drylab-ode_igem" rel="noopener" target="_blank">ODE
      models</a> and <a href="https://github.com/Halion1/iGEM-KAUST-Drylab" rel="noopener" target="_blank">GEM notebooks</a>.</p>
</div>
</details>
</section>

## Yeast: Saccharomyces cerevisiae

<span id="sec:yeast"></span>

<p>We picked <em>S. cerevisiae</em> because it is generally recognized as safe (GRAS), easy to transform, and
  carries the secretory machinery and oxidizing endoplasmic reticulum (ER) that disulfide-bonded
  antibody fragments usually want<sup class="cite">[<a href="#ref-6">6</a>]</sup>.</p>

<section id="sec:yeast_carbon_photosynth">
<div class="chip-row"><span class="chip"><em>S. cerevisiae</em></span></div>
<h3 id="partner">Sucrose is a good alternative to glucose, and cyanobacteria can make it photosynthetically</h3>
<p>Glucose is the default carbon source for growing microorganisms, but it would be impossible to
  constantly replenish lab grade glucose from earth to the space station or to our base in Mars. So,
  we begin the search for finding a medium that can be sustainable in a closed system and we found
  sucrose.</p>
<p>Examining the anaerobic yeast model for alternative carbon sources, we found sucrose as a good
  second alternative, with almost the same amount of yeast growth as in glucose. However, most of
  the carbon goes to alcohol which brings up the question of how to deal with the waste and whether
  we can force the carbon to useful product synthesis (like biologics production) rather than to
  alcohol production.</p>
<p>But how would we supply sucrose sustainably? For this we propose an elegant idea: a cyanobacteria
  model in co-culture or separate culture to obtain sucrose (and oxygen).</p>
<p>When we model the co-culture system of a cyanobacteria producing sucrose and an anaerobic yeast
  consuming it as its main carbon source, it reached 0.038 h<sup>−1</sup>, roughly three times its unfed
  anaerobic baseline. Adding the oxygen that the same co-culture produces, it reaches
  0.18 h<sup>−1</sup>, a <strong>13-fold</strong> increase. Glucose will not exist in a closed loop, so the
  realistic sugar is sucrose from a photosynthetic supplier. We took the sucrose export fluxes
  computed from our engineered cyanobacterial model (<a href="#export">the sucrose export result</a>)
  and applied them directly as uptake bounds on the anaerobic yeast model.</p>
<div class="table-wrap">
<table aria-labelledby="model-table-2-caption" class="matrix-table align-end">

<thead><tr><th>Supply condition</th><th class="num">Sucrose (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">O<sub>2</sub> (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">Yeast μ (h<sup>−1</sup>)</th></tr></thead>
<tbody><tr><th scope="row">Anaerobic baseline</th><td class="num">none</td><td class="num">0</td><td class="num">0.014</td></tr><tr><th scope="row">Supplier at higher growth than yeast</th><td class="num">0.23</td><td class="num">0</td><td class="num">0.011</td></tr><tr><th scope="row">Supplier growth-capped</th><td class="num">0.81</td><td class="num">0</td><td class="num"><strong>0.038</strong></td></tr><tr><th scope="row">Growth-capped, O<sub>2</sub> included</th><td class="num">0.81</td><td class="num">≤ 4.2</td><td class="num"><strong>0.18</strong></td></tr></tbody>
</table>
</div><div class="caption" id="model-table-2-caption"><strong>Table 2. Slowing the cyanobacteria down more than triples yeast growth, and giving the yeast their oxygen, triples it again.</strong> Anaerobic yeast growth on sucrose and oxygen fluxes taken from the engineered <em>S. elongatus</em> model, before any transfer losses.</div>

<div data-chart="yeast-partner-supply"></div>


<p>At the supplier's growth point, sucrose uptake equals export, so the steady state
  needs a 1:1 biomass ratio between the two organisms. That is not stable, because cyanobacteria
  grow faster than yeast and the culture would drift. Capping the supplier's growth moves the
  system along the trade-off and fixes both problems at once.</p>
<p>The details of the co-culture model are given in <a href="#export">the cyanobacteria section</a>.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>This sets up the beginning point
  for the co-culture experiment, and the limitation that we should place on the cyanobacteria's
  growth.</p>
</section>

<section id="sec:yeast_oxygen">
<div class="chip-row"><span class="chip"><em>S. cerevisiae</em></span></div>
<h3 id="yeast-oxygen">Removing oxygen costs yeast three quarters of its growth</h3>
<p>Aerobically, yeast grows at 0.41 h<sup>−1</sup>. It doubles about every 1.7 hours. Without oxygen,
  growth falls to 0.11 h<sup>−1</sup>, and it doubles about every 6.4 hours. This is a large drop for a
  habitat with little oxygen.</p>
<p>Yeast9 does not grow anaerobically, so we used the anaerobic setup from the
  Yeast9 authors. We set non-growth ATP maintenance to zero, blocked the biomass reactions that
  need oxygen, and allowed uptake of sterols and unsaturated fatty acids, because yeast cannot make
  them without oxygen. The anaerobic result therefore assumes the medium supplies them.</p>
<p>For the oxygen sweep we used the unmodified model, without the anaerobic setup. We raised the
  oxygen uptake limit from zero to 10 mmol gDW<sup>−1</sup> h<sup>−1</sup> at 200 equally spaced values and recorded growth and
  CO<sub>2</sub> output at each. We called yeast viable when growth reached 5% of the aerobic rate.
  We tracked CO<sub>2</sub> because the cyanobacteria could use it as feedstock.</p>


<div data-chart="yeast-aerobic-anaerobic"></div>

<div data-chart="yeast-o2-sweep"></div>

<div class="caption">

**Figure 2. Yeast growth falls by about three quarters without oxygen, and recovers roughly in proportion to the oxygen supplied.** Simulated. (a) Growth falls from 0.41 h<sup>−1</sup> to 0.11 h<sup>−1</sup> when oxygen is removed. (b) Oxygen sweep on the unmodified model. Growth (left axis) is already 0.092 h<sup>−1</sup> at the first non-zero oxygen value (0.0503 mmol gDW<sup>−1</sup> h<sup>−1</sup>), so the 5% viability threshold (dashed) is exceeded at that first point and the sweep cannot resolve a lower limit. Growth then rises close to linearly up to the aerobic rate at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>. CO<sub>2</sub> secretion (right axis) saturates much earlier than growth does.

</div>


<p>Growth is already 0.092 h<sup>−1</sup> at the lowest non-zero oxygen value in the sweep, 0.0503 mmol gDW<sup>−1</sup> h<sup>−1</sup>.
  That is about 85% of the strict-anaerobic rate and more than four times the viability threshold.
  Beyond that point growth rises roughly in proportion to oxygen supply, reaching 0.41 h<sup>−1</sup> at 10
  mmol gDW<sup>−1</sup> h<sup>−1</sup>. CO<sub>2</sub> output at the first point is 7.8 mmol gDW<sup>−1</sup> h<sup>−1</sup>.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>It is necessary to set up an
  oxygen gradient, considering the results that we obtained from the model.</p>
</section>

<section id="sec:yeast_protein">
<div class="chip-row"><span class="chip"><em>S. cerevisiae</em></span></div>
<h3 id="yeast-nanobody">Yeast loses four fifths of its nanobody capacity</h3>
<p>Both nanobody constructs lose about 82% of their maximum production flux without oxygen. A
  habitat has little oxygen, so this counts against yeast.</p>
<p>Growth is only a rough stand-in for protein output, so we also optimized the model for protein
  production directly. We did this in two ways: for the combined output of GFP and anti-GFP
  nanobody across the oxygen range, and for the maximum theoretical flux of each of our two
  constructs, Nb14 and Nb1_gbHSV, with and without oxygen.</p>
<div class="table-wrap">
<table aria-labelledby="model-table-3-caption" class="matrix-table align-end">

<thead><tr><th>Construct</th><th class="num">Aerobic (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">Anaerobic (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">Loss</th></tr></thead>
<tbody><tr><th scope="row">Nb14</th><td class="num">0.0335</td><td class="num">0.00589</td><td class="num">−82%</td></tr><tr><th scope="row">Nb1_gbHSV</th><td class="num">0.0371</td><td class="num">0.00654</td><td class="num">−82%</td></tr></tbody>
</table>
</div><div class="caption" id="model-table-3-caption"><strong>Table 3. Both constructs lose about 82% of their capacity without oxygen.</strong> Maximum theoretical nanobody production flux in <em>S. cerevisiae</em>, with glucose uptake at 5 mmol gDW<sup>−1</sup> h<sup>−1</sup> and oxygen uptake capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>.</div>


<div data-chart="yeast-nanobody-by-construct"></div>

<div data-chart="yeast-combined-production-vs-o2"></div>

<div class="caption">

**Figure 3. Yeast matches *B. subtilis* aerobically, but is about three times lower without oxygen.** Simulated. (a) Maximum theoretical production flux of each construct in yeast, aerobic and anaerobic, on the same *y*-axis as the *B. subtilis* panel (Figure 8a). The *B. subtilis* anaerobic result assumes nitrate is supplied (uptake capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>). (b) Combined GFP plus nanobody flux rises with oxygen and saturates near 7.5 mmol gDW<sup>−1</sup> h<sup>−1</sup>. Panel (b) comes from an earlier model setup and is not directly comparable with panel (a).

</div>


<p>Nb1_gbHSV has a production ceiling about 11% higher than Nb14 in both oxygen conditions. This
  fits with it being shorter (119 residues against 129).</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span> Where the two constructs are
  otherwise interchangeable, prefer Nb1_gbHSV.</p>
</section>

<section id="sec:yeast_induction">
<div class="chip-row"><span class="chip">Dynamic models</span></div>
<h3 id="induction">Resource limits flip the induction-timing advice</h3>
<p>Under ideal conditions the best moment to switch production on is late in the batch, at
  32.7 h of 48. Once the batch can actually run out of sugar and oxygen, the advice reverses
  and early induction wins. The disagreement is the finding. FBA gives a ceiling, not a protocol.
  Overexpressing a nanobody burdens the host: transcription and translation compete with growth, so
  an inducible promoter separates biomass accumulation from production. Inducing too early leaves
  too few cells; inducing too late leaves no time to produce. We built two models, one that assumes
  resources are unlimited and one that does not.</p>


<div data-chart="yeast-constitutive-vs-inducible"></div>

<div data-chart="yeast-resource-simulation"></div>

<div data-chart="yeast-induction-scan"></div>

<div data-chart="yeast-yield-loss-heatmap"></div>

<div class="caption">

**Figure 4. An induction time derived from a resource-unlimited model is an upper bound on how long to wait, not a recommendation.** Simulated. (a) Inducing at the analytical optimum overtakes constitutive expression before harvest, despite producing nothing for the first two thirds of the batch. (b) With finite resources, sugar and dissolved oxygen are driven toward exhaustion in the second half of the batch and both biomass and product stall. (c) Peak nanobody falls monotonically from 0.24 mg L<sup>−1</sup> at *t*<sub>i</sub> = 0: once resources are finite, delaying only wastes substrate. (d) Nanobody across cultivation time and induction time.

</div>


<details class="details">
<summary class="details-summary">Details: the induction model and its closed-form optimum</summary>
<div class="details-body">
<p>Biomass grows exponentially with a rate that switches at the induction time
      <i>t</i><sub>i</sub>, from <i>μ</i> to <i>βμ</i>, where <i>β</i> is the burden
      parameter. Product accumulates in proportion to active biomass and is lost first-order at rate
      <i>k<sub>d</sub></i>. Solving for the production-phase duration <i>τ</i> = <i>T</i> −
      <i>t</i><sub>i</sub> that maximizes harvest titer gives</p>
<div class="table-wrap">

$$
\begin{gathered}\tau^{*} = \frac{1}{\beta\mu + k_d}\ln\frac{\mu + k_d}{(1-\beta)\mu},\\ t_{\mathrm{i}}^{*}=T-\tau^{*}\qquad\text{(1)}\end{gathered}
$$

</div>
<p>Three limits check it. With no burden (<i>β</i> → 1) the optimum runs to the
      whole batch, so a cheap product should be induced immediately. With complete growth arrest
      (<i>β</i> → 0) a finite optimum survives, <i>τ</i>* =
      <i>k<sub>d</sub></i><sup>−1</sup> ln(1 + <i>k<sub>d</sub></i>/<i>μ</i>). With no
      degradation (<i>k<sub>d</sub></i> → 0) the trade-off becomes purely cell density against
      production time.</p>
<p>The resource-limited version adds a sugar pool, dissolved oxygen and a headspace reservoir,
      each entering growth and production through multiplicative Monod terms<sup class="cite">[<a href="#ref-7">7</a>]</sup>, with oxygen
      supplied through a <i>k<sub>L</sub>a</i> term<sup class="cite">[<a href="#ref-8">8</a>]</sup>. Full equations and parameter values
      are in the code repository.</p>
</div>
</details>
<div class="callout warn">
<p class="callout-label">For reading the numbers:</p>
<p>Only the maximum growth rate is FBA-informed. Every Monod constant, yield and transfer
  coefficient is an illustrative setting, and nothing was fitted to data. These models demonstrate
  the induction-timing trade-off; they are not calibrated predictions for our strain, and the
  specific optimum should not be used as a process set-point until the parameters are
  grounded.</p>
</div>
</section>

## Yeast: Pichia pastoris

<section id="sec:pichia">
<div class="chip-row"><span class="chip"><em>P. pastoris</em></span></div>
<h3 id="pastoris"><em>P. pastoris</em> grows fastest aerobically, but tolerates oxygen restriction worst</h3>
<p><em>P. pastoris</em> is an established recombinant protein host<sup class="cite">[<a href="#ref-9">9</a>]</sup> and the fastest grower of any
  chassis we tested aerobically, doubling about every 1.25 hours. However, under oxygen restriction
  that advantage disappears completely, we found that it grows more slowly than <em>S. cerevisiae</em> and
  makes less than half the combined protein flux.</p>
<div class="table-wrap">
<table aria-labelledby="model-table-4-caption" class="matrix-table align-end">

<thead><tr><th>Quantity</th><th class="num"><em>P. pastoris</em></th><th class="num"><em>S. cerevisiae</em></th></tr></thead>
<tbody><tr><th scope="row">Maximum growth rate (h<sup>−1</sup>)</th><td class="num">0.58</td><td class="num">0.41</td></tr><tr><th scope="row">Growth at minimum viable O<sub>2</sub> (h<sup>−1</sup>)</th><td class="num">0.074</td><td class="num">0.092</td></tr><tr><th scope="row">Combined GFP + nanobody flux there (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><td class="num">0.0016</td><td class="num">0.0035</td></tr></tbody>
</table>
</div><div class="caption" id="model-table-4-caption"><strong>Table 4. The fastest aerobic grower is the worst performer once oxygen is restricted.</strong> <em>P. pastoris</em> against <em>S. cerevisiae</em> at the same 5% viability convention.</div>


<div data-chart="pichia-o2-sweep"></div>

<div data-chart="pichia-combined-production-vs-o2"></div>

<div class="caption">

**Figure 5. *P. pastoris* buys its aerobic speed with a steeper oxygen dependence.** Growth and production against oxygen uptake, under the same conditions as Figures 2 and 3.

</div>


<p><em>P. pastoris</em> was introduced later and did not grow well anaerobically. However, considering that some
  oxygen can be supplied in the habitat, <em>P. pastoris</em> may still be viable given its high aerobic growth
  rate.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>This organism can be attractive for
  wet lab experiments due to its high robustness, regulated recombinant expression, stable genome
  engineering, and efficient protein secretion.</p>
</section>

## Bacteria: Bacillus subtilis

<span id="sec:bacteria"></span>

<p><em>B. subtilis</em> secretes protein into the medium, saving purification steps in the
  habitat. More importantly it has real anaerobic capability that yeast lacks: nitrate respiration
  through the <em>narGHJI</em> operon, and mixed acid-butanediol fermentation when no electron
  acceptor is available<sup class="cite">[<a href="#ref-10">10</a>, <a href="#ref-11">11</a>]</sup>.</p>

<section id="sec:gapfill">
<div class="chip-row"><span class="chip"><em>B. subtilis</em></span></div>
<h3 id="gapfill">Filling in the model: hunting down the reactions that stopped the growth of the anaerobic
  model</h3>
<p>The published iBsu1147 model does not produce any biomass in the absence of oxygen, even though
  <em>B. subtilis</em> is known to grow anaerobically. This was a gap in the model and it had to be closed
  before any oxygen question could be asked. We discovered that two reaction additions were needed
  to repair the model. The functioning, revised anaerobic iBsu1147 model is one of the most
  important outputs of our dry lab team.</p>
<p>We first confirmed nitrate was being consumed, so the anaerobic respiration route itself was
  open and the failure lay downstream in biomass precursor synthesis. Rather than checking
  components one at a time, we screened every reaction active aerobically but dead anaerobically
  and filtered for those touching <code>o2_c</code>. That returned five reactions. Three were
  expected to die without oxygen (O<sub>2</sub> transport and aerobic terminal oxidase). Two were
  genuine gaps with no anaerobic alternative in the model: <strong>ASPO6</strong> (L-aspartate
  oxidase), an oxygen-dependent step in <em>de novo</em> NAD<sup>+</sup> synthesis, and
  <strong>DHORDfum</strong> (dihydroorotate dehydrogenase), an oxygen-dependent step in pyrimidine
  synthesis. Despite its name, DHORDfum passes its electrons to oxygen in the published model, not
  to fumarate.</p>
<div class="reaction"><b>ASPO6</b> : L-aspartate + O<sub>2</sub> → iminoaspartate +
    H<sub>2</sub>O<sub>2</sub> + H<sup>+</sup></div>
<div class="reaction"><b>DHORDfum</b> : (S)-dihydroorotate + O<sub>2</sub> → orotate +
    H<sub>2</sub>O<sub>2</sub></div>
<p>Opening free exchanges for their products confirmed this: a free supply of NAD<sup>+</sup>
  alone gave zero growth, a free supply of orotate alone gave zero, and both together restored
  growth to 0.22 h<sup>−1</sup>, with uncapped nitrate supply.</p>
<p>To be able to open up the exchanges of these reactions, we looked for pathways and enzymes that
  would supply these products anaerobically:</p>
<ul>
<li><strong>DHORDnad as an alternative to DHORDfum:</strong> The Kyoto Encyclopedia of Genes
    and Genomes (KEGG) gives DHORDnad (EC 1.3.1.14), which our model assigns to BSU15530 and
    BSU15540. This is not merely an anaerobic workaround: <em>B. subtilis</em> dihydroorotate dehydrogenase
    is natively a Class 1B enzyme that uses NAD<sup>+</sup> as its physiological electron acceptor
    regardless of oxygen<sup class="cite">[<a href="#ref-12">12</a>]</sup>.
    <div class="reaction corrected"><b>DHORDnad</b> : (S)-dihydroorotate + NAD<sup>+</sup> →
      orotate + NADH + H<sup>+</sup></div></li>
<li><strong>ASPOfum as an alternative to ASPO6:</strong> Upon an initial search on KEGG, the
    obvious candidate was ASPDH, which we used initially. However, upon literature search, we
    realized that the ASPDH enzyme family is specific to archaea and thermophiles, with no evidence
    in <em>B. subtilis</em>. Upon further literature search, we found the fumarate linked mode of NadB
    (BSU27870), supported by <em>in vitro</em> characterization of the purified protein<sup class="cite">[<a href="#ref-13">13</a>]</sup>.
    <div class="reaction corrected"><b>ASPOfum</b> : L-aspartate + fumarate → iminoaspartate +
      succinate + H<sup>+</sup></div></li>
</ul>
<p>We thus applied the two confirmed corrections, DHORDnad and ASPOfum, unconditionally to both
  model conditions (aerobic and anaerobic), since both represent constitutive enzyme capabilities,
  not regulatory switches. Finally, we packaged the model with the new reactions as a reusable
  function for downstream use.</p>
<div class="table-wrap">
<table aria-labelledby="model-gapfill-caption" class="matrix-table">

<thead><tr><th></th><th>NAD<sup>+</sup> route</th><th>Pyrimidine route</th></tr></thead>
<tbody><tr><th scope="row">Enzyme (job)</th><td>NadB, L-aspartate oxidase (starts <em>de novo</em> NAD<sup>+</sup> synthesis)</td><td>PyrD/PyrK, dihydroorotate dehydrogenase (makes orotate for pyrimidines)</td></tr><tr><th scope="row">Published model reaction (O<sub>2</sub> is the electron acceptor)</th><td>ASPO6: L-aspartate + O<sub>2</sub> → iminoaspartate + H<sub>2</sub>O<sub>2</sub> + H<sup>+</sup></td><td>DHORDfum: (S)-dihydroorotate + O<sub>2</sub> → orotate + H<sub>2</sub>O<sub>2</sub></td></tr><tr><th scope="row">Our replacement</th><td>ASPOfum: L-aspartate + fumarate → iminoaspartate + succinate + H<sup>+</sup></td><td>DHORDnad: (S)-dihydroorotate + NAD<sup>+</sup> → orotate + NADH + H<sup>+</sup></td></tr><tr><th scope="row">New electron acceptor</th><td>Fumarate (becomes succinate)</td><td>NAD<sup>+</sup> (becomes NADH)</td></tr><tr><th scope="row">Gene(s) in the model</th><td>BSU27870</td><td>BSU15530 and BSU15540</td></tr><tr><th scope="row">Evidence</th><td><em>In vitro</em>: purified <em>B. subtilis</em> NadB uses fumarate and supports quinolinate formation<sup class="cite">[<a href="#ref-13">13</a>]</sup></td><td>Class 1B enzyme, EC 1.3.1.14, with NAD<sup>+</sup> as physiological acceptor<sup class="cite">[<a href="#ref-12">12</a>]</sup></td></tr></tbody>
</table>
</div><div class="caption" id="model-gapfill-caption"><strong>Table 5. Two reactions make the anaerobic model functional.</strong> The published model recorded only the O<sub>2</sub>-linked mode of each enzyme, so both steps stopped without oxygen. Our replacements give the same enzymes a different electron acceptor and are applied in all conditions.</div>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>Grow <em>B. subtilis</em> on nitrate under strict
  anaerobiosis, with and without pyrimidine and NAD<sup>+</sup> supplementation. A positive result
  validates our own correction.</p>
</section>

<section id="sec:bac_oxygen">
<div class="chip-row"><span class="chip"><em>B. subtilis</em></span></div>
<h3 id="bacillus-oxygen"><em>Bacillus</em> does not require oxygen, and with nitrate it outgrows yeast without it</h3>
<p><em>B. subtilis</em> grows without oxygen in our model, and how fast it grows depends on what else it
  can respire. With nitrate uptake capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>, growth falls from 0.32 h<sup>−1</sup> aerobically to
  0.14 h<sup>−1</sup> anaerobically, a loss of 57%, against 74% for yeast. It then doubles about every five
  hours, where yeast takes around six. The aerobic value is the rate at an oxygen limit of 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>;
  growth is still rising at that limit, and without it the model reaches 0.40 h<sup>−1</sup>. The ranking of
  the two chassis therefore flips without oxygen, but only if nitrate is available.</p>
<p>With the repaired model we ran the same three analyses as for yeast: aerobic versus anaerobic
  growth, a continuous oxygen sweep, and the minimum oxygen uptake that sustains 5% of the aerobic
  maximum.</p>


<div data-chart="bacillus-aerobic-anaerobic"></div>

<div data-chart="bacillus-o2-sweep"></div>

<div class="caption">

**Figure 6. *B. subtilis* needs no oxygen to stay viable, and a small oxygen supply does the work of nitrate.** Simulated. (a) Growth falls from 0.32 h<sup>−1</sup> to 0.14 h<sup>−1</sup> anaerobically, with nitrate capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>. This is a 57% loss, against 74% for yeast (Figure 2a). It is non-zero only because of the two reactions added in the gap-filling section; the unrepaired model gives zero. (b) With no nitrate, growth is 0.071 h<sup>−1</sup> at zero oxygen (solid line), above the 5% viability line (dashed), so the minimum oxygen is zero. The dotted line marks anaerobic growth with nitrate at zero oxygen. Growth without nitrate overtakes it at an oxygen uptake of about 2.5 mmol gDW<sup>−1</sup> h<sup>−1</sup>. CO<sub>2</sub> secretion is on the right axis.

</div>


<p>With no oxygen and no nitrate, <em>Bacillus</em> still grows by fermentation at 0.071 h<sup>−1</sup>, more than
  four times the viability threshold of 0.016 h<sup>−1</sup>, so the minimum oxygen uptake for viability is
  zero. Oxygen then raises growth roughly in proportion to supply and matches the nitrate-supported
  anaerobic rate at about 2.5 mmol gDW<sup>−1</sup> h<sup>−1</sup>. CO<sub>2</sub> output starts at 9.2 mmol gDW<sup>−1</sup> h<sup>−1</sup>, dips to about 7.7 mmol gDW<sup>−1</sup> h<sup>−1</sup>
  near an uptake of 7, and reaches 10.8 mmol gDW<sup>−1</sup> h<sup>−1</sup> at 10 as the cell shifts from fermentation to
  respiration. In our closed-loop set-up that CO<sub>2</sub> can be fed to the cyanobacteria.</p>
</section>

<section id="sec:bac_carbon">
<div class="chip-row"><span class="chip"><em>B. subtilis</em></span></div>
<h3 id="sucrose"><em>Bacillus</em> grows as well with sucrose as with glucose</h3>
<p>Because sucrose can be supplied by a photosynthesizing cyanobacterial culture, we tested growth on
  sucrose instead of glucose. Carbon flux
  distribution in <em>B. subtilis</em> is substrate-dependent<sup class="cite">[<a href="#ref-14">14</a>]</sup>; anaerobically, sucrose and glucose
  are equally efficient per carbon delivered, both around 0.0046 h<sup>−1</sup> mmol C<sup>−1</sup>. Aerobically glucose is
  better, 0.0106 against 0.0075 h<sup>−1</sup> mmol C<sup>−1</sup>. Sucrose, a disaccharide, delivers twice the carbon per
  molecule taken up, so its advantage comes from delivering more carbon atoms per uptake unit
  rather than from being metabolized more efficiently.</p>


<div data-chart="bacillus-glucose-vs-sucrose"></div>

<div class="caption">

**Figure 7. Sucrose's apparent advantage is carbon delivery, not metabolic efficiency.** Simulated. Total growth rate (left pair) and growth per mmol of carbon (right pair) on glucose and sucrose, aerobic and anaerobic. Sucrose wins on total growth in both conditions; per carbon atom the two are equivalent anaerobically and glucose is better aerobically.

</div>


<p class="callout"><span class="chip amber">For the Wet Lab</span><br>Switching to a
  cyanobacteria-derived feedstock is safe for the preferred chassis. If the project ever moves
  toward a better-aerated design, this conclusion may change.</p>
<div class="callout">
<p class="callout-label">From the Wet Lab</p>
<p>In aerobic plate cultures, <em>B. subtilis</em> 168 grew on sucrose at 0.66 h<sup>−1</sup>
  against 0.79 h<sup>−1</sup> on glucose. The two runs were on separate plates, so we read
  this as “sucrose supports comparable growth”. This supports using cyanobacterial sucrose as the
  feedstock. Raw plate data:
  <a href="https://github.com/Halion1/iGEM-KAUST-Drylab/tree/master/obj2_gem/wetlab_results" rel="noopener" target="_blank"><code>obj2_gem/wetlab_results</code></a>.</p>
</div>
</section>

<section id="sec:bac_protein">
<div class="chip-row"><span class="chip"><em>B. subtilis</em></span></div>
<h3 id="bacillus-nanobody"><em>Bacillus</em> keeps about three times more nanobody capacity without oxygen</h3>
<p>With oxygen, <em>B. subtilis</em> and yeast are close: for Nb1_gbHSV, <em>B. subtilis</em> reaches 0.0410 mmol gDW<sup>−1</sup> h<sup>−1</sup>
  against 0.0371 for yeast, about 10% higher. Without oxygen the gap opens. Going anaerobic costs
  <em>B. subtilis</em> 46% of its capacity, where yeast loses 82%, and it then makes about <strong>3.4 times
  more</strong> (0.0220 against 0.00654). This anaerobic result assumes nitrate is supplied,
  with uptake capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>. With no nitrate the ratio falls to about 1.8, and with unlimited
  nitrate it rises to about 4.5. Since the habitat scenario is the oxygen-poor case, this is the
  comparison that matters.</p>
<div class="table-wrap">
<table aria-labelledby="model-table-6-caption" class="matrix-table align-end">

<thead><tr><th>Construct</th><th class="num">Aerobic (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">Anaerobic (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">Loss</th><th class="num">Aerobic vs. yeast</th><th class="num">Anaerobic vs. yeast</th></tr></thead>
<tbody><tr><th scope="row">Nb14</th><td class="num">0.0369</td><td class="num">0.0199</td><td class="num">−46%</td><td class="num">1.10×</td><td class="num">3.4×</td></tr><tr><th scope="row">Nb1_gbHSV</th><td class="num">0.0410</td><td class="num">0.0220</td><td class="num">−46%</td><td class="num">1.10×</td><td class="num">3.4×</td></tr></tbody>
</table>
</div><div class="caption" id="model-table-6-caption"><strong>Table 6. <em>B. subtilis</em> matches yeast with oxygen and keeps about three times more capacity without it.</strong> Maximum theoretical nanobody production flux, with the ratio to the equivalent <em>S. cerevisiae</em> value from Table 3. Glucose uptake is 5 mmol gDW<sup>−1</sup> h<sup>−1</sup>, aerobic oxygen uptake is capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>, and anaerobic nitrate uptake is capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>.</div>


<div data-chart="bacillus-nanobody-by-construct"></div>

<div data-chart="bacillus-combined-production-vs-o2"></div>

<div class="caption">

**Figure 8. *B. subtilis* starts about 10% above yeast and loses less than half of its capacity without oxygen, where yeast loses four fifths.** Simulated. (a) Maximum theoretical production flux of each construct, on the same *y*-axis as the yeast panel (Figure 3a); the anaerobic result assumes nitrate is supplied (uptake capped at 10 mmol gDW<sup>−1</sup> h<sup>−1</sup>). As in yeast, Nb1_gbHSV has a ceiling about 11% above Nb14. (b) Combined output versus oxygen; it comes from an earlier model setup and is not directly comparable with panel (a).

</div>


</section>

<section id="sec:bac_induction">
<div class="chip-row"><span class="chip"><em>B. subtilis</em></span></div>
<h3 id="bacillus-induction">The induction window is narrow</h3>
<p>Inducing around 6.5 h to 7 h gives the highest predicted titer, and missing it by a few
  hours costs us most of the product. The dynamic framework is
  <a href="#induction">the one used for yeast</a>, with two additions this host needs. A
  nanobody is a protein, so its synthesis needs nitrogen-containing amino-acid precursors as well as
  carbon and energy: we added an explicit precursor pool. And <em>Bacillus</em> secretes extracellular
  proteases that degrade heterologous product<sup class="cite">[<a href="#ref-15">15</a>]</sup>, so product loss carries a term proportional
  to biomass itself. The second term means that whatever makes the product also destroys it.</p>


<div data-chart="bacillus-fig9-multi-induction"></div>

<div class="caption">

**Figure 9. Peak titer and harvest titer are not the same quantity.** Simulated. Biomass (left) and nanobody (right) under five induction strategies; the same color is the same induction time in both panels. Very early induction produces little because there is no biomass yet; very late induction reaches maximum biomass but leaves no production window. The *t*<sub>i</sub> = 12 h run peaks near 140 mg L<sup>−1</sup> around 28 h and then declines, because protease loss outruns production once resources deplete.

</div>




<div data-chart="bacillus-fig2-sugar-nitrogen"></div>

<div data-chart="bacillus-fig6-final-nanobody"></div>

<div data-chart="bacillus-fig8-heatmap"></div>

<div class="caption">

**Figure 10. Carbon, not nitrogen, is the binding resource under this parameter set.** Simulated. (a) Sugar is exhausted by about 40 h while the nitrogen pool is only partly consumed. (b) The induction sweep peaks sharply at about 6.5 h and collapses within a few hours either side. (c) Nanobody across cultivation time and induction time, showing a narrow high-yield ridge.

</div>


<p>Figure 10(a) is a negative result about the extension: we added the nitrogen pool because
  protein synthesis needs precursors, and then sized it generously enough (5.0 g L<sup>−1</sup>) that it
  never became binding.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>Induce early, and harvest at
  the product peak rather than at a fixed end time. That recommendation comes from the dynamic model
  alone; neither FBA nor the analytical model could have produced it.</p>
<details class="details">
<summary class="details-summary"><span>Details: full parameter set for the <em>Bacillus</em> dynamic model</span></summary>
<div class="details-body">
<p>Six states: biomass, nanobody, sugar, nitrogen pool, dissolved oxygen, headspace oxygen.
      Growth and production are each throttled by multiplicative Monod terms in all three nutrients.
      Product is lost at a baseline rate plus a biomass-proportional protease term.</p>
<div class="table-wrap">
<table class="matrix-table">
<thead><tr><th>Symbol</th><th>Meaning</th><th>Value</th><th>Source</th></tr></thead>
<tbody><tr><th scope="row">μ<sub>B</sub></th><td>Maximum specific growth rate</td><td>0.40 h<sup>−1</sup></td><td>Literature-guided</td></tr><tr><th scope="row">β<sub>B</sub></th><td>Post-induction growth factor</td><td>0.10</td><td>Assumed</td></tr><tr><th scope="row">q<sub>B</sub></th><td>Specific production rate</td><td>2.0 mg g<sup>−1</sup> h<sup>−1</sup></td><td>Assumed</td></tr><tr><th scope="row">k<sub>d,0</sub></th><td>Baseline product loss</td><td>0.010 h<sup>−1</sup></td><td>Assumed</td></tr><tr><th scope="row">k<sub>prot</sub></th><td>Protease loss coefficient</td><td>0.005 L g<sup>−1</sup> h<sup>−1</sup></td><td>Assumed</td></tr><tr><th scope="row">T</th><td>Cultivation time</td><td>72 h</td><td>Chosen</td></tr><tr><th scope="row">Monod constants</th><td>sugar / nitrogen / oxygen</td><td>0.10 / 0.05 / 0.10</td><td>Assumed</td></tr><tr><th scope="row">Yields</th><td>biomass and product on each</td><td>see repository</td><td>Assumed</td></tr><tr><th scope="row">k<sub>L</sub>a</th><td>Oxygen transfer coefficient</td><td>0.30 h<sup>−1</sup></td><td>Assumed</td></tr><tr><th scope="row">Initial state</th><td>X<sub>0</sub> 0.05 g L<sup>−1</sup>, S<sub>0</sub> 20 g L<sup>−1</sup>, N<sub>0</sub> 5.0 g L<sup>−1</sup></td><td></td><td>Chosen</td></tr></tbody>
</table>
</div>
</div>
</details>
</section>

## Cyanobacteria: Synechococcus elongatus PCC 7942

<span id="sec:cyano"></span>

<p>How do we supply our suggested carbon source, sucrose, in a closed-loop fashion in space? We
  suggest the photosynthetic cyanobacterial culture model to supply the sucrose flux as an input to
  our chassis.</p>
<p>Cyanobacteria make sucrose directly from photosynthesis. Other carbohydrates can be made
  phototrophically<sup class="cite">[<a href="#ref-16">16</a>, <a href="#ref-17">17</a>]</sup>, but sucrose is the highest-yielding one, and
  <a href="#sucrose">the per-carbon analysis</a> shows it works well with our chassis.
  However, although <em>S. elongatus</em> makes sucrose, it does not secrete it. So how would we obtain
  sucrose from cyanobacteria? We propose two routes:</p>
<ul>
<li>By forcing the export of sucrose (co-culture method).</li>
<li>By reducing the loss of carbon to competing pathways and recovering sucrose following lysis
    of the cyanobacteria (separate cultures).</li>
</ul>
<p>Before discussing the modeling methods for either, we explored the constraints of the aerobic
  PCC 7942 cyanobacteria model, iMS837<sup class="cite">[<a href="#ref-3">3</a>]</sup>.</p>
<p>The default model has a low carbon uptake bound of 2 mmol gDW<sup>−1</sup> h<sup>−1</sup>, which we found to be binding on
  growth. From the literature, we adopt the measured photobioreactor carbon uptake of PCC 7942, 5.1
  mmol gDW<sup>−1</sup> h<sup>−1</sup><sup class="cite">[<a href="#ref-18">18</a>]</sup>, as an optimistic upper bound on habitat carbon delivery; Mars does not constrain
  CO<sub>2</sub> supply, but reactor mass transfer does. Assuming a habitat reactor can deliver more
  carbon than the terrestrial measurement, we set 5.1 for each of CO<sub>2</sub> and
  HCO<sub>3</sub><sup>−</sup>, giving a total inorganic carbon uptake of 10.2 mmol gDW<sup>−1</sup> h<sup>−1</sup>, twice the
  measured rate, as an optimistic engineering case. This increased the growth even further from
  0.131 h<sup>−1</sup> to 0.219 h<sup>−1</sup>. We considered building a shared carbon cap across both CO<sub>2</sub>
  and HCO<sub>3</sub><sup>−</sup>, but on comparison a shared cap and separate bounds gave the
  same growth rate, so the model treats the two carbon sources equivalently.</p>
<p>Photon uptake was set to 145 mmol photons gDW<sup>−1</sup> h<sup>−1</sup>.
  Broddrick et al.<sup class="cite">[<a href="#ref-4">4</a>]</sup> measured biomass-specific absorbed quantum flux in <em>S. elongatus</em> PCC
  7942 at 60 and 600 µmol m<sup>−2</sup> s<sup>−1</sup> photons, corresponding to
  roughly 44 and 216 mmol photons gDW<sup>−1</sup> h<sup>−1</sup> respectively. Our
  value lies between these, representing a moderately high-light habitat photobioreactor.</p>
<p>Oxygen exchange was left unbounded. The model is a net oxygen exporter, so the uptake bound is
  inactive. The export bound does affect growth: O<sub>2</sub> evolution is a byproduct of water
  splitting at photosystem II, which supplies the reductant and ATP that drive CO<sub>2</sub>
  fixation, so capping export indirectly caps carbon fixation. A sweep showed growth rising linearly
  up to at least 12 mmol gDW<sup>−1</sup> h<sup>−1</sup> of O<sub>2</sub>, with no feasible solution below about 6 mmol gDW<sup>−1</sup> h<sup>−1</sup>.</p>

<section id="sec:cyano_limits">
<div class="chip-row"><span class="chip"><em>S. elongatus</em></span></div>
<h3 id="cyano-limits">At our operating point, nitrogen and sulfate are co-limiting</h3>
<p>At our operating point neither CO<sub>2</sub> nor light is binding. Both return shadow prices
  of essentially zero, meaning more of either buys no growth at all. The limiting resource is total
  nitrogen, ammonium and nitrate at the same bound, at a shadow price of −0.124.</p>
<p>Knowing what limits the supplier decides where engineering effort should go, so we established
  it rather than assuming it. We first swept the CO<sub>2</sub>/HCO<sub>3</sub><sup>−</sup>
  uptake bound of the model to find the growth plateau, then ran shadow price analysis at the chosen
  operating point. A shadow price is the marginal gain in the objective per unit relaxation of a
  constraint; zero means the constraint is not binding.</p>


<div data-chart="cyano-co2-hco3-bounds"></div>

<div class="caption">

**Figure 11. Carbon supply stops helping well below the bound we chose.** Simulated. Optimal growth against the CO<sub>2</sub>/HCO<sub>3</sub><sup>−</sup> uptake bound. Growth saturates past roughly 4.2 mmol gDW<sup>−1</sup> h<sup>−1</sup>; our habitat-analogue operating point of 5.1 mmol gDW<sup>−1</sup> h<sup>−1</sup> for each of the carbon sources (green) sits just past the knee, and the model's own default bound of 2 mmol gDW<sup>−1</sup> h<sup>−1</sup> sits well below it.

</div>


<span id="cascade"></span><p>Relieving nitrogen alone moves growth by about 0.5% (0.2191 → 0.2202 h<sup>−1</sup>), because the
  sulfate bound of about 0.03 mmol gDW<sup>−1</sup> h<sup>−1</sup> (model default) then becomes binding. Nitrogen and sulfate are
  co-limiting, and the next step is to relieve both. Carbon, which we had raised to 5.1 mmol gDW<sup>−1</sup> h<sup>−1</sup> for each
  of CO<sub>2</sub> and HCO<sub>3</sub><sup>−</sup> in the previous section, then becomes
  binding. The walk ends on light, at a growth rate of 0.3279 h<sup>−1</sup>.</p>
<p>We established ceilings first, based on literature and model defaults, and then followed the
  limitation iteratively. At each step we identified the limiting group, relieved it to its
  breakpoint, and re-tested. The walk ran until no nutrient group, alone or in combination, could
  raise growth further. That took three relief steps and terminated where light was the only
  remaining constraint. Freeing all eight nutrient groups simultaneously also gives 0.3279 h<sup>−1</sup>,
  matching the light-only ceiling in Figure 12. All runs hold light at 145 mmol photons
  gDW<sup>−1</sup> h<sup>−1</sup>, applied to the sum of the 15 wavelength bins.</p>


<div data-chart="cyano-limiting-factors"></div>

<div class="caption">

**Figure 12. Fixing one nutrient only reveals the next.** Simulated growth rate against relief step; each step relieves the limiting nutrient group to its breakpoint and re-tests what binds. Baseline 0.2191 h<sup>−1</sup> (nitrogen) → 0.2202 h<sup>−1</sup> (nitrogen and sulfate, co-limiting) → 0.2619 h<sup>−1</sup> (carbon, nitrogen and sulfate, co-limiting) → 0.3279 h<sup>−1</sup>, where no nutrient binds and light is the only remaining constraint. Carbon appears twice because relieving nitrogen and sulfate raises growth, which raises the carbon requirement. Limiting groups were identified by growth gain rather than by shadow price, and every breakpoint by direct bisection on growth. Light was held at 145 mmol photons gDW<sup>−1</sup> h<sup>−1</sup> [assumption].

</div>


<p class="callout"><span class="chip amber">For the Wet Lab</span><br>Nitrogen and sulfate must be
  supplemented together; relieving either alone moves growth only slightly, because the other is at
  its bound. Sulfate is cheap to relieve: past 0.04 mmol gDW<sup>−1</sup> h<sup>−1</sup> it is no longer binding. Recovered human
  urine can be used to supply the nitrogen. Carbon (CO<sub>2</sub>/HCO<sub>3</sub><sup>−</sup>)
  needs about three times the stock bound.</p>
<div class="callout warn">
<p class="callout-label">A method failure worth recording</p>
<p>Shadow prices identified <em>which</em> constraints bind, but located breakpoints unreliably
  near the optimum, because several alternative optimal flux distributions give the same growth rate
  and different dual values. Any team using shadow prices to find limiting nutrients should expect
  this and confirm with direct sweeps. Under co-limitation the dual credits one nutrient
  arbitrarily. Here it credited nitrogen alone at 0.1243 while sulfate was equally at its bound, so
  a dual-driven search relieved nitrogen indefinitely and never reached sulfate. The fix is to
  decide by growth gain and search subsets, using duals only to nominate candidates.</p>
</div>
<p>Now back to the main question, how can we get sucrose out of the cyanobacteria and optimize the
  model for sucrose production?</p>
</section>

<section id="sec:cyano_export">
<div class="chip-row"><span class="chip"><em>S. elongatus</em></span></div>
<h3 id="export">Exporting sucrose out of cyanobacteria requires capping growth and provides oxygen for better
  consumer growth</h3>
<p>Letting the engineered culture grow as fast as it can gives 0.23 mmol gDW<sup>−1</sup> h<sup>−1</sup> of sucrose. Capping its
  biomass flux at 0.013 h<sup>−1</sup> gives 0.81 mmol gDW<sup>−1</sup> h<sup>−1</sup>, a 3.5× increase, which is the operating point we
  recommend.</p>
<p>Sucrose sits at a junction inside the cell: held as an osmolyte, broken back down to hexoses,
  or, with the right transporter, exported. We aimed to close the first two routes and open the
  third, so that the model could export sucrose rather than metabolize it. Thus, we added the
  <em>cscB</em> gene, the <em>E. coli</em> sucrose permease whose expression in PCC 7942 has been validated
  experimentally<sup class="cite">[<a href="#ref-19">19</a>, <a href="#ref-20">20</a>]</sup>. CscB is a proton-sucrose symporter natively, but in cases of high
  intracellular sucrose it can run in reverse, exporting sucrose to the medium.</p>
<p>But does sucrose export cost growth? Thus, we swept the biomass constraint to map the export–growth
  trade-off to find a reasonable operating point. Biomass and sucrose export
  linearly negatively correlate, so we had to cap growth to get more sucrose export.</p>


<div data-chart="cyano-sucrose-vs-growth"></div>

<div class="caption">

**Figure 13. Every unit of supplier growth is paid for in sucrose not exported.** Simulated. Maximum sucrose export against the biomass flux constraint at CO<sub>2</sub>/HCO<sub>3</sub><sup>−</sup> = 5.1 mmol gDW<sup>−1</sup> h<sup>−1</sup> (per each). The relationship is almost linear.

</div>


<p>Based on the trade-off, we sought a plausible point to cap growth. This also depends on the
  hypothetical co-culture dynamics, which we do not model explicitly. We tested the case with yeast
  (<em>S. cerevisiae</em>): we show in the table below the growth rates of both the supplier (cyanobacteria)
  and the consumer (yeast). The ratio of sucrose export by cyanobacteria to uptake by yeast was
  found to be 1:1.</p>
<p>We initially chose a cap of 0.03 for cyanobacteria, but the sucrose export at that rate was
  causing yeast to grow slower than cyanobacteria, which would mean that cyanobacteria would take
  over the culture. Choosing a lower growth cap for cyanobacteria yields a higher sucrose export
  which makes yeast grow faster than cyanobacteria.</p>
<div class="table-wrap">
<table aria-labelledby="model-table-7-caption" class="matrix-table align-end">

<thead><tr><th>Operating point</th><th class="num">Supplier biomass (h<sup>−1</sup>)</th><th class="num">Sucrose export (mmol gDW<sup>−1</sup> h<sup>−1</sup>)</th><th class="num">Yeast μ (h<sup>−1</sup>)</th></tr></thead>
<tbody><tr><th scope="row">Maximum supplier growth</th><td class="num">0.030</td><td class="num">0.23</td><td class="num">0.011</td></tr><tr><th scope="row">Growth-capped (preferred)</th><td class="num">0.013</td><td class="num"><strong>0.81</strong></td><td class="num"><strong>0.038</strong></td></tr></tbody>
</table>
</div><div class="caption" id="model-table-7-caption"><strong>Table 7. The growth-capped supplier is both more productive and more stable.</strong> Yeast growth rates are from Table 2. The maximum-growth point needs a 1:1 biomass ratio to balance, which drifts because cyanobacteria grow faster than yeast; capping removes that problem and raises export at the same time.</div>
<p>The other great advantage of such a co-culture would be the oxygen provided by cyanobacteria.
  At the capped growth rate, the cyanobacteria release oxygen at a flux of 4.23 mmol gDW<sup>−1</sup> h<sup>−1</sup>.
  <a href="#yeast-oxygen">The yeast oxygen sweep</a> showed that a small amount of oxygen buys a
  disproportionate amount of capability: yeast growth in this oxygenated condition is
  0.176 h<sup>−1</sup>, about 13 times the growth of anaerobic yeast.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>Build the co-culture at the
  capped operating point, and measure oxygen in the vessel, not only sugar.</p>
</section>

<section id="sec:cyano_dissociation">
<div class="chip-row"><span class="chip"><em>S. elongatus</em></span></div>
<h3 id="export-limits">Carbon supply is the main limit in sucrose production</h3>
<p>Under the capped growth rate the only binding constraint on sucrose production is carbon.
  Nitrogen and phosphate, which govern growth, price at zero.</p>
<div class="table-wrap">
<table aria-labelledby="model-table-8-caption" class="matrix-table align-end">

<thead><tr><th>Exchange reaction</th><th class="num">Flux</th><th class="num">Shadow price</th><th>Binding?</th></tr></thead>
<tbody><tr><th scope="row">CO<sub>2</sub></th><td class="num">−5.10</td><td class="num">−0.083</td><td>Yes</td></tr><tr><th scope="row">HCO<sub>3</sub><sup>−</sup></th><td class="num">−5.10</td><td class="num">−0.083</td><td>Yes</td></tr><tr><th scope="row">NH<sub>4</sub><sup>+</sup></th><td class="num">−0.003</td><td class="num">≈ 0</td><td>No</td></tr><tr><th scope="row">NO<sub>3</sub><sup>−</sup></th><td class="num">−0.102</td><td class="num">≈ 0</td><td>No</td></tr><tr><th scope="row">PO<sub>4</sub><sup>3−</sup></th><td class="num">−0.006</td><td class="num">≈ 0</td><td>No</td></tr><tr><th scope="row">SO<sub>4</sub><sup>2−</sup></th><td class="num">−0.002</td><td class="num">≈ 0</td><td>No</td></tr><tr><th scope="row">Photons</th><td class="num">≈ 0</td><td class="num">≈ 0</td><td>No</td></tr></tbody>
</table>
</div><div class="caption" id="model-table-8-caption"><strong>Table 8. Sucrose export is carbon-limited even where growth is not.</strong> Shadow prices for the sucrose objective, carbon bound 5.1 mmol gDW<sup>−1</sup> h<sup>−1</sup>, biomass capped at 0.013 h<sup>−1</sup>. Fluxes in mmol gDW<sup>−1</sup> h<sup>−1</sup>. Compare Figure 12: the two objectives have different bottlenecks.</div>
<p>That dissociation is the practically useful part. Richer medium, urine-derived nitrogen
  included, matters a great deal for growth optimization and does not move the sucrose bottleneck at
  all, which stays carbon and Calvin-cycle limited regardless.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>If the goal is more sucrose,
  invest in CO<sub>2</sub> delivery, not in richer medium. If the goal is more supplier biomass, the
  opposite.</p>
</section>

<section id="sec:cyano_knockouts">
<div class="chip-row"><span class="chip"><em>S. elongatus</em></span></div>
<h3 id="knockouts">Knocking out pathways that consume sucrose did not yield more sucrose</h3>
<p>The alternative to exporting sucrose is to stop the cell consuming it and let it accumulate for
  recovery by lysis. Thus, we tried to knock out genes that consume sucrose. To our surprise, this
  did not change the sucrose flux in any combination we tried, even under unlimited light and
  carbon. However, the literature reports increases of 15 to 300% for the same
  knockouts<sup class="cite">[<a href="#ref-20">20</a>, <a href="#ref-19">19</a>, <a href="#ref-21">21</a>, <a href="#ref-22">22</a>]</sup>.</p>
<p>The obvious targets are <em>glgC</em>, which competes for the hexose phosphates sucrose is made
  from, and <em>invA</em>, which hydrolyses sucrose back to glucose and fructose. We added a sucrose
  sink so FBA could optimize for accumulation, tested further knockouts of competing pathways,
  traced flux to locate the bottleneck, ran single gene deletion across the genome, and ran flux
  variability analysis (FVA) at fixed biomass 0.013 h<sup>−1</sup> to screen for any gene whose deletion would
  force sucrose flux upward.</p>
<p>Accumulation flux under habitat-analogue light and carbon was 0.29 mmol gDW<sup>−1</sup> h<sup>−1</sup>. Under unlimited carbon
  and light the theoretical maximum is 16.3 mmol gDW<sup>−1</sup> h<sup>−1</sup>, with and without the knockouts alike. Flux tracing
  put the bottleneck in Calvin cycle output, specifically the fructose-6-phosphate pool available
  for sucrose synthesis. Single gene deletion confirmed sucrose phosphate synthase as essential, and
  each NDH-1 subunit, part of the CO<sub>2</sub>-concentrating mechanism, cost about 53% of sucrose
  flux. The FVA screen did not return any candidate: sucrose and growth stayed uncoupled for every
  gene tested.</p>
<div class="callout warn">
<p class="callout-label">Why the model disagrees with the literature</p>
<p>Published knockouts (InvA, GlgA/GlgC, GgpS) report 15–300% sucrose increases, but only under
  salt-stress conditions. It is possible that since the literature-reported effects work through
  ion-dependent regulation (salt stress conditions), which are mechanisms absent from stoichiometric
  FBA, the model's solution never routes flux through the competing pathways, so knocking them out
  changes nothing. This shows that GEM-based knockout screening cannot discover
  regulation-dependent targets.</p>
</div>
<p>Because the two strategies (forcing export, and knocking out the consuming pathways) give the same
  flux, FBA cannot choose between them and the decision falls to downstream processing. Cytosolic
  volume caps how much sucrose can be held, and the cost of harvesting, lysing and processing cells
  tends to exceed the value of what is inside them<sup class="cite">[<a href="#ref-23">23</a>]</sup>; secretion into the supernatant has
  been proposed as the more viable route, and cyanobacteria have been engineered to export lactate
  and hexoses<sup class="cite">[<a href="#ref-16">16</a>, <a href="#ref-24">24</a>]</sup>. In a habitat, where lysis hardware is mass that has to be launched, a
  co-culture with sucrose exported by cyanobacteria may be the better choice.</p>
<p class="callout"><span class="chip amber">For the Wet Lab</span><br>Cyanobacteria in co-culture with
  an exporter gene would supply sucrose and oxygen.</p>
</section>

## Decisions the modeling made

<span id="what-the-model-changed"></span>

<section id="sec:decisions">

<p><strong>The chassis.</strong> We started expecting yeast, which is the default for a secreted
  eukaryotic-style product, and without oxygen the models pointed away from it: <em>B. subtilis</em> keeps
  about 54% of its nanobody flux where yeast keeps 18%, so it makes about three times more, and its
  growth falls 57% against 74% for yeast. With oxygen the two are within about 10%. The advantage
  depends on nitrate being supplied.</p>
<p><strong>The feedstock.</strong> Sucrose from a growth-capped cyanobacterial partner, not
  glucose. <a href="#sucrose">The per-carbon analysis</a> showed the switch costs <em>B. subtilis</em>
  nothing anaerobically, which is what made the co-culture defensible rather than merely
  necessary.</p>
<p><strong>The aeration target.</strong> Not “aerobic or anaerobic” but how much
  growth is worth supplying oxygen for. In both host models growth rises roughly in proportion to
  oxygen supply. <em>B. subtilis</em> grows without oxygen, and faster with nitrate, while yeast grows
  without it only if sterols are supplied. That changes what the bioreactor has to do.</p>
<p><strong>Where not to spend engineering effort.</strong> Competing-pathway knockouts in the
  supplier, which our models say do nothing, and which we now understand FBA cannot evaluate.</p>
<h3>What the Wet Lab is being asked to test</h3>
<ol>
<li>Build and compare the nanobody in <em>B. subtilis</em> alongside yeast, measuring titer and folding
    quality, because FBA measures capacity and not quality.</li>
<li>Run the co-culture at the capped supplier operating point and measure both sucrose and
    dissolved oxygen.</li>
<li>Measure the induction window. Both dynamic models say the optimum is early and the penalty
    for missing it is asymmetric, and the two models disagree about <em>how</em> early, which is
    itself a result to settle experimentally.</li>
<li>Confirm the two gap-filling reactions added to the <em>Bacillus</em> model correspond to activity the
    strain actually has.</li>
</ol>
</section>

## Model limitations

<section id="sec:limits">

<div class="card-grid">
<div><h4>No regulation</h4>
<p>FBA cannot represent a change that works by altering how a cell responds to stress. Thus,
      performing knock-out strategies that are based on genes regulated by environmental factors may
      not be reflected in the model because of the absence of those factors.</p></div>
<div><h4>Steady state</h4>
<p>FBA has no time axis, which is why the dynamic models exist; but those in turn have no
      metabolism in them beyond lumped Monod terms. Dynamic FBA would present a next step analysis
      method.</p></div>
<div><h4>Parameters are mostly assumed</h4>
<p>Only the yeast maximum specific growth rate is FBA derived. Every other value in the dynamic
      models is literature supported but not strain specific.</p></div>
<div><h4>The co-culture arithmetic is idealized</h4>
<p>It assumes steady state and that all exported sucrose reaches the partner. It ignores transfer
      losses, spatial gradients, competition for shared nutrients, pH coupling.</p></div>
</div>
</section>

## Conclusions

<section id="sec:conclusions">

<ul>
<li>The <em>Bacillus</em> GEM model (iBsu1147) we used did not grow anaerobically. To enable its anaerobic
    growth we had to look for and engineer 2 additional pathways so it can produce biomass in the
    absence of oxygen. This is available as a new function to be used by other teams in
    <a href="https://github.com/Halion1/iGEM-KAUST-Drylab" rel="noopener" target="_blank">our GitHub</a>.
    <strong>The functioning, revised anaerobic iBsu1147 model is one of the most important outputs of
    our dry lab team.</strong></li>
<li>Without oxygen <em>Bacillus</em> keeps about 54% of its nanobody capacity where yeast keeps only 18%, so
    it makes roughly <strong>3.4 times more</strong>, but only as long as nitrate is there to respire. With
    oxygen the two are within about 10% of each other, so the whole chassis argument stands or falls
    on how much aeration a habitat can afford.</li>
<li>Sucrose works well with our chassis. We checked this before committing to a cyanobacterial
    feedstock, and per carbon atom sucrose and glucose are equally efficient for <em>B. subtilis</em>
    anaerobically. This is also the one prediction we have tested ourselves: on aerobic plates
    <em>B. subtilis</em> grew well on sucrose, at 0.66 h<sup>−1</sup> against 0.79 h<sup>−1</sup> on glucose. This
    further motivated sucrose as our feedstock choice.</li>
<li>We managed to model and conclude that the use of cyanobacteria co-cultured with <em>S. cerevisiae</em>
    can be a strong candidate for a closed cycle that can be self-sustaining during space
    missions.</li>
<li>Getting sucrose out of the cyanobacteria means deliberately slowing them down. Export and growth
    trade off almost linearly, and capping biomass at 0.013 h<sup>−1</sup> raised sucrose export from 0.23 to
    0.81 mmol gDW<sup>−1</sup> h<sup>−1</sup>, a 3.5× increase. The cap also solves a second problem for free: at
    maximum supplier growth the system needs a 1:1 biomass ratio to balance, which would drift as the
    faster-growing cyanobacteria took over the culture.</li>
<li>The <em>Bacillus</em> GEM model grows the best anaerobically, while <em>Pichia</em> grows better aerobically.
    However <em>Pichia</em> would be preferred by the wet lab aerobically since it grows better and has other
    advantages like lower chances of contamination and robustness.</li>
<li>Knocking out the pathways that consume sucrose did nothing for us, in any combination we tried,
    in contrast to what published wet lab results report. We think the published effects run through
    salt-stress regulation, which a stoichiometric model simply does not contain, so the model never
    routes flux through those pathways in the first place and removing them changes nothing. This is a
    real limit of what GEM-based knockout screening can find.</li>
</ul>
</section>

## References

<ol class="ref-list">

<li id="ref-1">Zhang C, et al. Yeast9: A consensus genome-scale metabolic model for <i>S. cerevisiae</i> curated by the community. <i>Molecular Systems Biology</i>, 20, 2024. Model and anaerobic protocol: <a href="https://github.com/SysBioChalmers/yeast-GEM" target="_blank" rel="noopener noreferrer">github.com/SysBioChalmers/yeast-GEM</a>. <a href="https://doi.org/10.1038/s44320-024-00060-7" target="_blank" rel="noopener noreferrer">doi:10.1038/s44320-024-00060-7</a></li>
<li id="ref-2">Hao T, Han B, Ma H, Fu J, Wang H, Wang Z, Tang B, Chen T, Zhao X. In silico metabolic engineering of <i>Bacillus subtilis</i> for improved production of riboflavin, Egl-237, (R,R)-2,3-Butanediol and isobutanol. <i>Molecular BioSystems</i>, 9(8):2034–2044, 2013. Model repository: <a href="https://github.com/tibbdc/ecBSU1" target="_blank" rel="noopener noreferrer">github.com/tibbdc/ecBSU1</a>. <a href="https://doi.org/10.1039/c3mb25568a" target="_blank" rel="noopener noreferrer">doi:10.1039/c3mb25568a</a></li>
<li id="ref-3">Santos-Merino M, Gargantilla-Becerra Á, de la Cruz F, Nogales J. Highlighting the potential of <i>Synechococcus elongatus</i> PCC 7942 as platform to produce α-linolenic acid through an updated genome-scale metabolic modeling. <i>Frontiers in Microbiology</i>, 14:1126030, 2023. <a href="https://doi.org/10.3389/fmicb.2023.1126030" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2023.1126030</a></li>
<li id="ref-4">Broddrick JT, Welkie DG, Jallet D, Golden SS, Peers G, Palsson BO. Predicting the metabolic capabilities of <i>Synechococcus elongatus</i> PCC 7942 adapted to different light regimes. <i>Metabolic Engineering</i>, 52:42–56, 2019. <a href="https://doi.org/10.1016/j.ymben.2018.11.001" target="_blank" rel="noopener noreferrer">doi:10.1016/j.ymben.2018.11.001</a></li>
<li id="ref-5">Broddrick JT, Rubin BE, Welkie DG, Du N, Mih N, Diamond S, Lee JJ, Golden SS, Palsson BO. Unique attributes of cyanobacterial metabolism revealed by improved genome-scale metabolic modeling and essential gene analysis. <i>Proceedings of the National Academy of Sciences</i>, 113(51):E8344–E8353, 2016.</li>
<li id="ref-6">Kastberg LLB, Ard R, Jensen MK, Workman CT. Burden imposed by heterologous protein production in two major industrial yeast cell factories: Identifying sources and mitigation strategies. <i>Frontiers in Fungal Biology</i>, 3:827704, 2022. <a href="https://doi.org/10.3389/ffunb.2022.827704" target="_blank" rel="noopener noreferrer">doi:10.3389/ffunb.2022.827704</a></li>
<li id="ref-7">Monod J. The growth of bacterial cultures. <i>Annual Review of Microbiology</i>, 3:371–394, 1949. <a href="https://doi.org/10.1146/annurev.mi.03.100149.002103" target="_blank" rel="noopener noreferrer">doi:10.1146/annurev.mi.03.100149.002103</a></li>
<li id="ref-8">Garcia-Ochoa F, Gomez E. Bioreactor scale-up and oxygen transfer rate in microbial processes: An overview. <i>Biotechnology Advances</i>, 27(2):153–176, 2009. <a href="https://doi.org/10.1016/j.biotechadv.2008.10.006" target="_blank" rel="noopener noreferrer">doi:10.1016/j.biotechadv.2008.10.006</a></li>
<li id="ref-9">Pan Y, Yang J, Wu J, Yang L, Fang H. Current advances of <i>Pichia pastoris</i> as cell factories for production of recombinant proteins. <i>Frontiers in Microbiology</i>, 13:1059777, 2022. <a href="https://doi.org/10.3389/fmicb.2022.1059777" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2022.1059777</a></li>
<li id="ref-10">Nakano MM, Zuber P. Anaerobic growth of a &ldquo;strict aerobe&rdquo; (<i>Bacillus subtilis</i>). <i>Annual Review of Microbiology</i>, 52:165–190, 1998. <a href="https://doi.org/10.1146/annurev.micro.52.1.165" target="_blank" rel="noopener noreferrer">doi:10.1146/annurev.micro.52.1.165</a></li>
<li id="ref-11">Schallmey M, Singh A, Ward OP. Developments in the use of <i>Bacillus</i> species for industrial production. <i>Canadian Journal of Microbiology</i>, 50(1):1–17, 2004. <a href="https://doi.org/10.1139/w03-076" target="_blank" rel="noopener noreferrer">doi:10.1139/w03-076</a></li>
<li id="ref-12">Kahler AE, Nielsen FS, Switzer RL. Biochemical characterization of the heteromeric <i>Bacillus subtilis</i> dihydroorotate dehydrogenase and its isolated subunits. <i>Archives of Biochemistry and Biophysics</i>, 371(2):191–201, 1999. <a href="https://doi.org/10.1006/abbi.1999.1455" target="_blank" rel="noopener noreferrer">doi:10.1006/abbi.1999.1455</a></li>
<li id="ref-13">Marinoni I, Nonnis S, Monteferrante C, Heathcote P, Härtig E, Böttger LH, Trautwein AX, Negri A, Albertini AM, Tedeschi G. Characterization of L-aspartate oxidase and quinolinate synthase from <i>Bacillus subtilis</i>. <i>The FEBS Journal</i>, 275(20):5090–5107, 2008. <a href="https://doi.org/10.1111/j.1742-4658.2008.06641.x" target="_blank" rel="noopener noreferrer">doi:10.1111/j.1742-4658.2008.06641.x</a></li>
<li id="ref-14">Dauner M, Storni T, Sauer U. <i>Bacillus subtilis</i> metabolism and energetics in carbon-limited and excess-carbon chemostat culture. <i>Journal of Bacteriology</i>, 183(24):7308–7317, 2001. <a href="https://doi.org/10.1128/JB.183.24.7308-7317.2001" target="_blank" rel="noopener noreferrer">doi:10.1128/JB.183.24.7308-7317.2001</a></li>
<li id="ref-15">Cui W, Han L, Suo F, Liu Z, Zhou L, Zhou Z. Exploitation of <i>Bacillus subtilis</i> as a robust workhorse for production of heterologous proteins and beyond. <i>World Journal of Microbiology and Biotechnology</i>, 34(10):145, 2018. <a href="https://doi.org/10.1007/s11274-018-2531-7" target="_blank" rel="noopener noreferrer">doi:10.1007/s11274-018-2531-7</a></li>
<li id="ref-16">Niederholtmeyer H, Wolfstädter BT, Savage DF, Silver PA, Way JC. Engineering cyanobacteria to synthesize and export hydrophilic products. <i>Applied and Environmental Microbiology</i>, 76(11):3462–3466, 2010. <a href="https://doi.org/10.1128/AEM.00202-10" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.00202-10</a></li>
<li id="ref-17">Arias DM, Ortíz-Sánchez E, Okoye PU, Rodríguez-Rangel H, Balbuena Ortega A, Longoria A, Domínguez-Espíndola R, Sebastian PJ. A review on cyanobacteria cultivation for carbohydrate-based biofuels: Cultivation aspects, polysaccharides accumulation strategies, and biofuels production scenarios. <i>Science of The Total Environment</i>, 794:148636, 2021. <a href="https://doi.org/10.1016/j.scitotenv.2021.148636" target="_blank" rel="noopener noreferrer">doi:10.1016/j.scitotenv.2021.148636</a></li>
<li id="ref-18">Abernathy MH, Yu J, Ma F, Liberton M, Ungerer J, Hollinshead WD, Gopalakrishnan S, He L, Maranas CD, Pakrasi HB, Allen DK, Tang YJ. Deciphering cyanobacterial phenotypes for fast photoautotrophic growth via isotopically nonstationary metabolic flux analysis. <i>Biotechnology for Biofuels</i>, 10:273, 2017. <a href="https://doi.org/10.1186/s13068-017-0958-y" target="_blank" rel="noopener noreferrer">doi:10.1186/s13068-017-0958-y</a></li>
<li id="ref-19">Ducat DC, Avelar-Rivas JA, Way JC, Silver PA. Rerouting carbon flux to enhance photosynthetic productivity. <i>Applied and Environmental Microbiology</i>, 78(8):2660–2668, 2012. <a href="https://doi.org/10.1128/AEM.07901-11" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.07901-11</a></li>
<li id="ref-20">Santos-Merino M, Yun L, Ducat DC. Cyanobacteria as cell factories for the photosynthetic production of sucrose. <i>Frontiers in Microbiology</i>, 14:1126032, 2023. <a href="https://doi.org/10.3389/fmicb.2023.1126032" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2023.1126032</a></li>
<li id="ref-21">Kirsch F, Klähn S, Hagemann M. Salt-regulated accumulation of the compatible solutes sucrose and glucosylglycerol in cyanobacteria and its biotechnological potential. <i>Frontiers in Microbiology</i>, 10:2139, 2019. <a href="https://doi.org/10.3389/fmicb.2019.02139" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2019.02139</a></li>
<li id="ref-22">Du W, Liang F, Duan Y, Tan X, Lu X. Exploring the photosynthetic production capacity of sucrose by cyanobacteria. <i>Metabolic Engineering</i>, 19:17–25, 2013. <a href="https://doi.org/10.1016/j.ymben.2013.05.001" target="_blank" rel="noopener noreferrer">doi:10.1016/j.ymben.2013.05.001</a></li>
<li id="ref-23">Prabha S, Vijay AK, Paul RR, George B. Cyanobacterial biorefinery: Towards economic feasibility through the maximum valorization of biomass. <i>Science of The Total Environment</i>, 814:152795, 2022. <a href="https://doi.org/10.1016/j.scitotenv.2021.152795" target="_blank" rel="noopener noreferrer">doi:10.1016/j.scitotenv.2021.152795</a></li>
<li id="ref-24">Angermayr SA, Paszota M, Hellingwerf KJ. Engineering a cyanobacterial cell factory for production of lactic acid. <i>Applied and Environmental Microbiology</i>, 78(19):7098–7106, 2012. <a href="https://doi.org/10.1128/AEM.01587-12" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.01587-12</a></li>

</ol>
