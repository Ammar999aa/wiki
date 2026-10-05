## The Problem & Approach

### The problem

Our project asks whether a nanobody can be manufactured on demand inside
a closed, resource-limited habitat rather than shipped there pre-made.
That setting, a Mars-analog or spaceflight life-support loop, changes
almost every assumption a normal bioprocess makes. Oxygen is expensive
and cannot be assumed to be abundant. Carbon feedstock cannot be trucked
in as bags of glucose. Nitrogen and phosphate have to be recovered from
what the crew already produces, principally urine. Illumination and
availability are set by the habitat, not by the engineer.

### Why computational work was necessary

Three things the project needed to know are expensive or impossible to
measure at our scale.

**Which host to build in.** Comparing candidate chassis across a
continuous range of oxygen availability is a combinatorial problem, and
the quantity that actually matters, the *maximum theoretical* nanobody
production flux, is not something a shake flask reports at all.
Genome-scale metabolic models (GEMs) compute exactly that, and compute
it identically for every organism, which is what makes the comparison
fair.

**What to feed it.** A heterotrophic chassis in a closed habitat needs a
carbon source that can be regenerated in situ. Testing whether
cyanobacteria can be engineered to supply one is a multi-gene project;
stoichiometric modeling lets us evaluate export strategies and knockouts
before committing cloning effort, and lets us ask which *nutrient*, not
just which gene, is capping output.

**How to run the culture.** Recombinant expression competes with growth
for the same finite resources, so the moment production is switched on
determines how much is harvested. GEMs are steady-state by construction
and cannot answer a timing question at all, which is why we added a
dynamic ordinary differential equation (ODE) layer on top of them.

### Three chassis models, and how they relate

We built one genome-scale model per organism and asked each of them the
same family of questions: can it use our feedstock, can it survive our
oxygen budget, and how much protein can it make. The cyanobacterial
model plays a different role from the other two: it is not a production
host but the supplier that makes the other two viable in a closed loop.

<div data-chart="workflow"></div>

<div class="caption">

**Figure 1.** The three chassis models and their relationship. Each host
model answers the same three questions independently; the cyanobacterial
model supplies the feedstock that makes either host viable in a closed
loop. Only the cyanobacteria → yeast arrow corresponds to an actual
numerical hand-off in this work (sucrose and oxygen fluxes used as uptake
bounds); the equivalent calculation for *B. subtilis* has not yet been
done (see Limitations and Future Directions).

</div>

<div class="table-wrap">

| Coupling | What is actually passed | Strength |
|---|---|---|
| Cyanobacteria → Yeast | Sucrose export flux (0.234 and 0.8078 mmol·h<sup>−1</sup>) and O₂ flux (4.2305 mmol·h<sup>−1</sup>) used as uptake bounds in the yeast GEM, giving 0.011132, 0.038429 and 0.175773 h<sup>−1</sup> respectively | **Strong**: direct numerical hand-off |
| Hosts → Cyanobacteria | CO₂ output at the micro-aerophilic operating point (7.75–9.23 mmol·h<sup>−1</sup>) is a candidate carbon input to the supplier | **Identified, not yet computed** |
| GEM → ODE | Chassis selection determined which host each dynamic model was built for; $\mu = 0.0854$ h<sup>−1</sup> in the yeast ODE is described as FBA-derived | **Weak**: motivational; the numerical link is unverified (see §Parameter provenance below) |
| Cyanobacteria → Bacteria | Sucrose-versus-glucose per-carbon analysis (see Bacillus subtilis §Alternative Carbon Source) confirms the feedstock decision does not penalise the preferred host | **Moderate**: same question, separate calculations |

</div>

<div class="caption">

**Table 1.** Quantitative hand-offs between the models. We distinguish strong
couplings (a number computed in one model is used as an input in
another) from weak ones (one model motivated another without a direct
numerical hand-off), because presenting a weak coupling as a strong
one would overstate the integration.

</div>

### Models, software and common constraints

All flux balance analysis (FBA) was performed on published,
peer-reviewed reconstructions rather than on models we built ourselves,
so that another team can start from the same public artefacts.

<div class="table-wrap">

| Organism | Model | Source / notes |
|---|---|---|
| *S. cerevisiae* | Yeast9 <a class="cite" href="#ref-1">1</a> | Anaerobic condition applied using the authors' own published protocol. |
| *B. subtilis* | iBsu1147 <a class="cite" href="#ref-2">2</a> | Required two reaction additions before it could grow anaerobically (see §Oxygen Deprivation, "repairing the model before we could ask the question"). |
| *P. pastoris* | **[model name — to be filled in]** | Used as a comparator for oxygen requirement and production only. |
| *S. elongatus* PCC 7942 | iMS837 | Updated PCC 7942 reconstruction of Santos-Merino et al. <a class="cite" href="#ref-3">3</a> (837 genes, 887 reactions, 801 metabolites). |

</div>

<div class="caption">

**Table 2.** Genome-scale models used, and their provenance.

</div>

Unless stated otherwise in a specific subsection, heterotrophic
simulations used a common constraint set so that chassis could be
compared on equal terms:

- glucose exchange: 5 mmol·h<sup>−1</sup>;
- glycerol exchange: 0 mmol·h<sup>−1</sup>;
- oxygen exchange: 10 mmol·h<sup>−1</sup> (aerobic) or 0 mmol·h<sup>−1</sup>
  (anaerobic).

Cyanobacterial simulations used habitat-analog light and carbon bounds
(145 µE·m<sup>−2</sup>·s<sup>−1</sup> photon flux; CO₂/HCO₃⁻ as stated per analysis).

Analysis notebooks (draft, unpolished) are available at [our Dry Lab
GitHub repository](https://github.com/Halion1/iGEM-KAUST-Drylab/blob/master/obj2_gem/Notebooks/cyanobacteria_model.ipynb).

## Chassis Models: Yeast (Saccharomyces cerevisiae)

### Yeast: *Saccharomyces cerevisiae*

#### Design Goals

*S. cerevisiae* is the reference eukaryotic production host: it is
GRAS-classified, easy to transform and, unlike a bacterial host, has the
secretory machinery and oxidising ER environment usually preferred for
disulfide-bonded antibody fragments. It is the chassis a team would
choose by default, which is precisely why we wanted to test it rather
than assume it.

Three things had to be established before yeast could be accepted or
rejected for a habitat application:

1. **Can it run on our feedstock?** Glucose will not be available in a
   closed loop. The realistic in-situ sugar is sucrose from a
   photosynthetic supplier (see the cyanobacteria section below), so we
   needed to know what yeast growth looks like on the sucrose fluxes
   that supplier can actually deliver.

2. **Can it survive our oxygen budget?** Yeast is a facultative
   anaerobe on paper, but "survives" and "remains a useful cell
   factory" are different claims.

3. **How much nanobody can it make, and when should we ask for it?**
   Both the steady-state ceiling and the dynamic question of induction
   timing.

All yeast work used the Yeast9 reconstruction.

#### Alternative Carbon Source

**Method.**

Alternative to glucose, yeast can use sucrose as a carbon source well
enough to be viable. The efficiency problem is not the sugar identity
but the redox situation: in the absence of oxygen, most of the carbon
taken up is spent regenerating electron acceptors rather than building
biomass or product. Nitrogen is less of a constraint, since astronaut
urine can supply ammonium for nanobody production. The open question is
therefore the sucrose supply, which is what motivated the cyanobacterial
model.

Rather than asking abstractly whether yeast grows on sucrose, we asked
what it does on the sucrose fluxes our supplier can actually deliver. We
took the sucrose export fluxes computed from the engineered
cyanobacterial model (see the cyanobacterial sucrose-export analysis
below) and applied them directly as sucrose uptake bounds on the
anaerobic Yeast9 model, then repeated the exercise with the
cyanobacterial oxygen output included as well. This is a direct
numerical hand-off between two of our models rather than a literature
assumption.

**Result.**

<div class="table-wrap">

| Supply condition | Sucrose (mmol·h<sup>−1</sup>) | O₂ (mmol·h<sup>−1</sup>) | Yeast μ (h<sup>−1</sup>) |
|---|---|---|---|
| No carbon supply (anaerobic baseline) | none | 0 | 0.0138 |
| Supplier at maximum growth | 0.234 | 0 | 0.011132 |
| Supplier growth-capped (preferred) | 0.8078 | 0 | **0.038429** |
| Growth-capped supplier, O₂ included | 0.8078<sup>*</sup> | ≤ 4.2305<sup>*</sup> | **0.175773** |

</div>

<div class="caption">

**Table 3.** Anaerobic yeast growth on cyanobacteria-derived sucrose.
Each row uses a sucrose (and, in the last row, oxygen) flux computed
from the engineered *S. elongatus* model as a yeast uptake bound.
<sup>*</sup>Sucrose and oxygen supplied by the same growth-capped
cyanobacterial culture; 4.2305 mmol·h<sup>−1</sup> is that culture's
total oxygen output, and the oxygen actually transferred to the yeast
partner in a real vessel would be at most this.

</div>

At the supplier's maximum-growth operating point, sucrose export is
0.234 mmol·h<sup>−1</sup> and yeast reaches 0.011132 h<sup>−1</sup>, at a
biomass carbon percentage of 14.9. Because uptake equals export at
steady state, the required biomass ratio is

$$
\frac{\mathrm{gDW}_{\text{cyanobacteria}}}{\mathrm{gDW}_{\text{yeast}}}
= \frac{\text{sucrose uptake by yeast}}{\text{sucrose export by cyanobacteria}}
= \frac{0.234}{0.234} = 1 ,
$$

assuming both models are at steady state and that all exported sucrose
reaches the yeast.

Deliberately capping the supplier's growth releases substantially more
sucrose (see the cyanobacterial sucrose-export analysis below) and
raises yeast growth more than threefold, to 0.038429 h<sup>−1</sup>.
Including the oxygen the supplier co-produces raises it to
0.175773 h<sup>−1</sup>, a **13-fold increase** over the strictly
anaerobic yeast baseline of 0.0138 h<sup>−1</sup>, and the single
largest predicted improvement anywhere in our Dry Lab work.

The reading is that a photosynthetic partner is not merely a sugar
workaround. It also supplies the resource that the oxygen-deprivation
analysis below identifies as yeast's binding constraint.

#### Oxygen Deprivation

**Method.**

Yeast9 does not grow anaerobically out of the box. Rather than devise
our own workaround, we applied the anaerobic condition using the
protocol published with the model itself, following the reference
implementation in
[`anaerobicModel.m`](https://github.com/SysBioChalmers/yeast-GEM/blob/main/code/otherChanges/anaerobicModel.m).
The protocol:

- sets non-growth-associated ATP maintenance to zero, representing the
  ATP saved by switching off non-essential reactions;
- blocks oxygen-dependent reactions contributing to biomass;
- opens sterol exchanges, because yeast cannot synthesise sterols
  anaerobically and must import them from the medium.

Using the authors' own procedure rather than an ad-hoc one keeps this
step reproducible and removes a source of arbitrary modeller choice.

We then ran three analyses. First, growth under the common constraint
set (see Models, software and common constraints above) with oxygen
exchange bounded at 10 mmol·h<sup>−1</sup> versus 0. Second, a
continuous sweep of the oxygen uptake bound from zero upward, recording
growth rate and CO₂ secretion at each point. Third, we defined a
viability threshold as 5% of the aerobic maximum growth rate and located
the minimum oxygen uptake that still clears it. CO₂ was tracked
throughout because in our system it is not waste but the supplier's
feedstock.

**Result.**

Aerobically, yeast grows at 0.40 h<sup>−1</sup> (a doubling roughly
every 2 h). Anaerobically it falls to 0.10 h<sup>−1</sup> (roughly every
7 h), a loss of about three quarters of its growth rate.

<div data-chart="yeast-aerobic-anaerobic"></div>

<div data-chart="yeast-o2-sweep"></div>

<div class="caption">

**Figure 2.** Oxygen dependence of *S. cerevisiae*. (a) Growth drops
from 0.40 h<sup>−1</sup> to 0.10 h<sup>−1</sup> on removing oxygen. (b)
Growth rate (left axis, blue) rises very steeply over the first fraction
of a mmol·h<sup>−1</sup> of oxygen and then close to linearly; the 5%
viability threshold (red dashed) is cleared almost immediately. CO₂
secretion (right axis, green) saturates much earlier than growth does.

</div>

<div class="table-wrap">

| Quantity | Value | Unit |
|---|---|---|
| Maximum growth rate | 0.4091 | h<sup>−1</sup> |
| Viability threshold (5% of max) | 0.0205 | h<sup>−1</sup> |
| Minimum viable O₂ uptake | 0.0503 | mmol·h<sup>−1</sup> |
| Growth rate at that point | 0.0917 | h<sup>−1</sup> |
| CO₂ output at that point | 7.7513 | mmol·h<sup>−1</sup> |

</div>

<div class="caption">

**Table 4.** Minimum viable oxygen analysis for *S. cerevisiae*. The
viability threshold is 5% of the aerobic maximum.

</div>

The shape of the oxygen-sweep panel in Figure 2 (panel b) is the
important part. Growth rises so steeply out of zero that a trickle of
oxygen, 0.0503 mmol·h<sup>−1</sup>, already brings yeast to
0.0917 h<sup>−1</sup>, more than four times its own viability threshold
and close to its strict-anaerobic rate. The design target for a habitat
is therefore not "aerobic or anaerobic" but "how little oxygen can we
get away with", and the answer is: very little.

#### Protein Production

Growth is a proxy. This subsection addresses production directly, in
two parts: the steady-state ceiling (how much *can* yeast make) and the
dynamic question (*when* should we ask it to).

**Method: steady-state capacity (FBA).**

We re-optimised the model for combined recombinant protein output (GFP
plus anti-GFP nanobody) across the same oxygen range used in the
oxygen-deprivation analysis above, and separately computed the maximum
theoretical production flux for each of our two nanobody constructs,
Nb14 and Nb1_gbHSV, under aerobic and anaerobic conditions.

**Result: steady-state capacity.**

At the minimum viable oxygen uptake, combined GFP + nanobody flux is
0.0035 mmol·h<sup>−1</sup>.

<div class="table-wrap">

| Construct | Aerobic | Anaerobic | Loss |
|---|---|---|---|
| Nb14 | 0.0068 | 0.0014 | −79% |
| Nb1_gbHSV | 0.0076 | 0.0015 | −80% |

</div>

<div class="caption">

**Table 5.** Maximum theoretical nanobody production flux
(mmol·h<sup>−1</sup>) in *S. cerevisiae*.

</div>

<div data-chart="yeast-nanobody-by-construct"></div>

<div data-chart="yeast-combined-production-vs-o2"></div>

<div class="caption">

**Figure 3.** Nanobody production capacity in *S. cerevisiae*. (a) Both
constructs lose roughly 80% of their production capacity on removing
oxygen. (b) Combined output rises with oxygen uptake and saturates near
7.5 mmol·h<sup>−1</sup>; the minimum viable cutoff is marked in orange.
Note the y-axis maximum of 0.008 mmol·h<sup>−1</sup>, an order of
magnitude below the equivalent *B. subtilis* figure (see Figure 9
below).

</div>

Nb1_gbHSV is consistently, if marginally, easier to produce than Nb14.
The effect is small (≈10%) but systematic across both oxygen
conditions, which is what one expects from Nb1_gbHSV having fewer amino
acids, and so less precursor and ATP demand per molecule, rather than
from noise.

**Method: dynamic production and induction timing (ODE).**

FBA gives a ceiling, not a protocol. It assumes a steady state by
construction: it reports rates, not trajectories, and has no notion of
a batch that starts, depletes its medium and is harvested. Yet the
timing question is not a detail. Overexpressing a recombinant nanobody
is a physiological burden on the host: high-level transcription and
translation hijack the host's core cellular machinery, and that burden
restricts growth<a class="cite" href="#ref-4">4</a>. The
standard bioprocess response is an inducible promoter, which separates
biomass accumulation from recombinant protein
production<a class="cite" href="#ref-5">5</a><a class="cite" href="#ref-4">4</a>:
an uninduced growth phase in which cells replicate at their maximum
specific growth rate μ to build the cell factory, followed by a
production phase in which synthesis is triggered and the growth rate
falls to a constrained value βμ.

Induce too early and there are too few cells to produce with; too late
and there is no time left before harvest. We therefore built two ODE
models:

- **Model 1**, an analytical induction model assuming resources are not
  limiting, solvable in closed form so that the structure of the
  optimum can be seen algebraically;
- **Model 2**, a five-state extension adding sugar, dissolved oxygen and
  headspace oxygen limitation, so that the batch can actually run out
  of things.

*Note on scope.* The mathematical framework developed here is shared
with the *Bacillus* model in the Protein Production subsection of the
bacteria section below; it is derived once, in full, at this point, and
that section presents only the host-specific extensions.

<div class="table-wrap">

| Symbol | Description | Unit |
|---|---|---|
| $X(t)$ | Biomass concentration | g·l<sup>−1</sup> |
| $P(t)$ | Nanobody concentration | mg·l<sup>−1</sup> |
| $S(t)$ | Sugar/substrate concentration (Model 2) | g·l<sup>−1</sup> |
| $O(t)$ | Dissolved oxygen concentration (Model 2) | dimensionless |
| $O_g(t)$ | Headspace oxygen concentration (Model 2) | dimensionless |

</div>

<div class="caption">

**Table 6.** State variables in the yeast dynamic models (Models 1 and
2).

</div>

**Model 1: biomass dynamics.**

Assuming a sharp transition post-induction, where the metabolic shift
occurs rapidly relative to the total cultivation time, biomass follows
exponential growth with a time-dependent effective rate:

$$\frac{dX(t)}{dt} = \mu_{\mathrm{e}}(t) \, X(t),$$

$$
\mu_{\mathrm{e}}(t) = \begin{cases}
\mu, & t < t_{\mathrm{i}} \\
\beta \, \mu, & t \geq t_{\mathrm{i}}
\end{cases}
$$

where $\mu$ is the maximum attainable growth rate and $0 \leq \beta \leq 1$
controls how much growth is impaired by nanobody production.
Biologically, $\beta$ is the burden parameter: $\beta = 1$ means
expression is free, $\beta = 0$ means it stops the cells dividing
entirely.

Integrating gives

$$
X(t) = \begin{cases}
X_0 \, e^{\mu t}, & t < t_{\mathrm{i}} \\
X_0 \, e^{\mu \left[t_{\mathrm{i}} + \beta (t - t_{\mathrm{i}})\right]}, & t \geq t_{\mathrm{i}}
\end{cases}
$$

and, writing $X_{\mathrm{i}}$ for the biomass at the moment of
induction, the post-induction profile simplifies to

$$X(t) = X_{\mathrm{i}} \, e^{\beta \mu (t - t_{\mathrm{i}})} .$$

**Model 1: nanobody production.**

The product evolves according to a production–degradation balance:
nothing is made before induction, and afterwards nanobody accumulates
in proportion to active biomass while being lost by first-order
processes such as proteolytic degradation or chemical denaturation:

$$
\frac{dP(t)}{dt} = q_{\mathrm{e}}(t) \, X(t) - k_d \, P(t),
\qquad
q_{\mathrm{e}}(t) = \begin{cases}
0, & t < t_{\mathrm{i}} \\
q, & t \geq t_{\mathrm{i}}
\end{cases}
$$

with $q$ the production rate per unit active biomass and $k_d$ the
first-order loss rate constant.

Substituting the post-induction biomass profile above gives a linear
first-order ODE,

$$
\frac{dP(t)}{dt} = q \, X_{\mathrm{i}} \, e^{\beta \mu (t - t_{\mathrm{i}})} - k_d \, P(t),
\qquad t \geq t_{\mathrm{i}},
$$

which, with an integrating factor and the initial condition
$P(t_{\mathrm{i}}) = 0$, has the explicit solution

$$
P(t) = \frac{q \, X_{\mathrm{i}}}{\beta \, \mu + k_d}
\left[ e^{\beta \mu(t - t_{\mathrm{i}})} - e^{-k_d (t - t_{\mathrm{i}})} \right],
\qquad t \geq t_{\mathrm{i}}.
$$

The two exponentials have a direct physical reading: the first is
biomass-driven production, the second is product loss.

**Model 1: the optimal induction time.**

For a batch of fixed total duration $T$, evaluating the
nanobody-concentration solution above at $t = T$ and substituting
$X_{\mathrm{i}}$ gives the harvest titre as a function of induction
time:

$$
P(T; t_{\mathrm{i}}) = \frac{q \, X_0}{k_d + \beta \, \mu} \, e^{\mu t_{\mathrm{i}}}
\left[ e^{\beta \mu (T - t_{\mathrm{i}})} - e^{-k_d (T - t_{\mathrm{i}})} \right] .
$$

It is more convenient to work with the *production phase duration*
$\tau \coloneqq T - t_{\mathrm{i}}$, with $0 \leq \tau \leq T$.
Substituting $t_{\mathrm{i}} = T - \tau$:

$$
P(\tau) = C \left[ e^{-(1 - \beta) \, \mu \tau} - e^{-(\mu + k_d)\tau} \right] ,
\qquad
C \coloneqq \frac{q \, X_0}{k_d + \beta \, \mu} \, e^{\mu T}.
$$

Differentiating and setting to zero,

$$
\frac{dP}{d\tau} = C \left[ -(1 - \beta) \, \mu e^{-(1 - \beta) \mu \tau}
+ (\mu + k_d) e^{-(\mu + k_d) \tau} \right] = 0 ,
$$

which for non-trivial conditions ($C \neq 0$) reduces to balancing the
exponential decay weight of the growth penalty against that of product
loss,

$$(1 - \beta) \, \mu \, e^{-(1 - \beta)\mu \tau} = \left(\mu + k_d\right) e^{-(\mu + k_d) \tau} .$$

Taking logarithms and isolating $\tau$ gives the optimal production
duration

$$
\boxed{\;\tau^* = \frac{1}{\beta \, \mu + k_d}
\ln\!\left( \frac{\mu + k_d}{(1 - \beta) \, \mu} \right)\;}
$$

and hence the optimal induction time

$$t_{\mathrm{i}}^* = T - \tau^*.$$

Since $\mu + k_d > (1 - \beta)\mu$ reduces trivially to
$\beta\mu + k_d > 0$, the logarithm is well defined under standard
conditions. If induction causes any growth deceleration
($0 < \beta < 1$), the argument exceeds unity and $\tau^* > 0$ is
guaranteed: there is always a genuine interior optimum.

**Model 1: limiting cases as a validation check.**

Because the $\tau^*$ expression above is closed-form, we can check it
against limits that are independently interpretable on biological
grounds. This is the validation available to a purely analytical model,
and it is worth doing explicitly.

- **Negligible burden ($\beta \to 1$).** The denominator of the
  logarithm approaches zero, so $\tau^* \to \infty$; with no
  burden–productivity trade-off the objective increases monotonically
  with production time and the constrained optimum collapses to the
  boundary $\tau = T$. A low-burden product should be induced from the
  start of the batch and left on, which is the correct and obvious
  answer.

- **Complete growth arrest ($\beta \to 0$).** The toxic, high-level
  expression case. Setting $\beta = 0$,

  $$\tau^* = \frac{1}{k_d} \ln\!\left(1 + \frac{k_d}{\mu}\right),$$

  a finite, strictly positive optimum. Even when production stops
  growth completely, it is still worth inducing before the very end of
  the batch.

- **No product degradation ($k_d \to 0$).** For a highly stable
  construct,

  $$\tau^* = \frac{1}{\beta \, \mu} \ln\!\left(\frac{1}{1 - \beta}\right).$$

  An optimum still exists, governed purely by the interplay between the
  uninduced and production-phase growth rates. With no degradation the
  only reason to delay induction is to accumulate biomass, so the
  trade-off becomes purely cell density at induction versus length of
  the production phase.

All three limits recover the biologically sensible answer, which gives
reasonable confidence that the $\tau^*$ expression is not an artefact
of the algebra.

**Model 2: adding finite resources.**

Model 1 assumes unlimited substrate and fixed specific rates; a closed
batch vessel has neither. Model 2 adds a depletable sugar pool $S(t)$,
dissolved oxygen $O(t)$ and a headspace oxygen reservoir $O_g(t)$ that
replenishes the liquid phase, with growth and production each scaled by
a multiplicative Monod-type saturation
function<a class="cite" href="#ref-6">6</a>:

$$
\begin{aligned}
\Phi_X(S, O) &\coloneqq \frac{S}{K_{S,X} + S} \cdot \frac{O}{K_{O,X} + O},
&
\Phi_P(S, O) &\coloneqq \frac{S}{K_{S,P} + S} \cdot \frac{O}{K_{O,P} + O},
\end{aligned}
$$

each lying in $[0,1]$. Distinct half-saturation constants are used for
growth and production because the two processes need not have the same
substrate affinity. The coupled system is

$$
\begin{aligned}
\frac{dX}{dt} &= \mu_{\mathrm{e}}(t) \, \Phi_X \, X, \\
\frac{dP}{dt} &= q_{\mathrm{e}}(t) \, \Phi_P \, X - k_d \, P, \\
\frac{dS}{dt} &= -\left( \frac{\mu_{\mathrm{e}}(t) \, \Phi_X}{Y_{X/S}}
               + \frac{q_{\mathrm{e}}(t) \, \Phi_P}{Y_{P/S}} \right) X, \\
\frac{dO}{dt} &= k_La\left(\alpha O_{g} - O\right)
               - \left( \frac{\mu_{\mathrm{e}}(t) \, \Phi_X}{Y_{X/O}}
               + \frac{q_{\mathrm{e}}(t) \, \Phi_P}{Y_{P/O}} \right) X, \\
\frac{dO_{g}}{dt} &= -\frac{k_La \, V_{l}}{V_{g}} \left(\alpha O_{g} - O\right),
\end{aligned}
$$

where $Y$ terms are stoichiometric yield coefficients, $V_{l}$ and
$V_{g}$ the liquid and headspace volumes, $\alpha$ converts headspace
oxygen into an equivalent liquid saturation concentration, and $k_La$
is the volumetric mass-transfer coefficient combining the liquid-side
transfer coefficient and the specific interfacial
area<a class="cite" href="#ref-7">7</a>. The system was
integrated numerically from the initial conditions in Table 7 below.

<div class="table-wrap">

| Symbol | Description | Value | Unit |
|---|---|---|---|
| **Kinetic and operational** | | | |
| $X_0$ | Initial biomass | 0.10 | g·l<sup>−1</sup> |
| $\mu^{\dagger}$ | Maximum specific growth rate | 0.0854 | h<sup>−1</sup> |
| $\beta$ | Post-induction growth factor | 0.50 | — |
| $q$ | Specific nanobody production rate | 0.05 | mg·g<sup>−1</sup>·h<sup>−1</sup> |
| $k_d$ | Product degradation/loss rate | 0.010 | h<sup>−1</sup> |
| $T$ | Total cultivation time | 48 | h |
| $t_{\mathrm{ind}}$ | Example induction time, Model 2 | 10 | h |
| **Monod constants** | | | |
| $K_{S,X}$ | Sugar Monod constant, growth | 0.50 | simulation unit |
| $K_{O,X}$ | Oxygen Monod constant, growth | 0.05 | simulation unit |
| $K_{S,P}$ | Sugar Monod constant, production | 0.50 | simulation unit |
| $K_{O,P}$ | Oxygen Monod constant, production | 0.05 | simulation unit |
| **Yields** | | | |
| $Y_{X/S}$ | Biomass yield on sugar | 0.50 | g·g<sup>−1</sup> |
| $Y_{P/S}$ | Nanobody yield on sugar | 0.20 | mg·g<sup>−1</sup> |
| $Y_{X/O}$ | Biomass yield on oxygen | 0.50 | simulation unit |
| $Y_{P/O}$ | Nanobody yield on oxygen | 0.20 | simulation unit |
| **Oxygen transfer and vessel** | | | |
| $k_La$ | Oxygen mass transfer coefficient | 0.20 | h<sup>−1</sup> |
| $\alpha$ | Gas–liquid oxygen partition coefficient | 1.00 | — |
| $V_l$ | Liquid volume | 1.00 | L |
| $V_g$ | Headspace volume | 1.00 | L |
| **Initial conditions** | | | |
| $P_0$ | Initial nanobody | 0.00 | mg·l<sup>−1</sup> |
| $S_0$ | Initial sugar | 10.0 | simulation unit |
| $O_0$ | Initial dissolved oxygen | 1.00 | dimensionless |
| $O_{g,0}$ | Initial headspace oxygen | 1.00 | dimensionless |

</div>

<div class="caption">

**Table 7.** Parameter values used in the yeast dynamic models.
<sup>†</sup> marks the FBA/GEM-informed growth-rate estimate; all
remaining values are illustrative simulation settings, not
strain-specific fitted parameters.

</div>

**Parameter provenance.**

We separate parameter classes explicitly rather than presenting them as
one undifferentiated table:

- **FBA/GEM-informed:** the maximum specific growth rate,
  $\mu = 0.0854$ h<sup>−1</sup>, taken from the FBA-derived growth
  estimate.
- **Literature-derived:** none of the numerical values was taken
  directly from a specific publication. The *model structure* is
  literature-supported (Monod kinetics for nutrient-limited
  growth<a class="cite" href="#ref-6">6</a>, $k_La$-based
  oxygen transfer<a class="cite" href="#ref-7">7</a>),
  but the numbers are not.
- **Fitted/calibrated:** none.
- **Assumed:** everything else, meaning all Monod constants, yields,
  transfer coefficients and initial conditions.

These models should therefore be read as **qualitative models that
demonstrate the induction-timing trade-off and the effect of finite
sugar and oxygen availability**, not as calibrated predictive models of
our strain. We state this prominently because quoting a specific
optimal induction time as though it were a prediction would be
misleading.

**Result: dynamic production.**

<div data-chart="yeast-model1-induction-times"></div>

<div class="caption">

**Figure 4.** Analytical model (Model 1): biomass (left) and nanobody
concentration (right) for a range of induction times over a 48 h batch.
Early induction gives a long production window but a small cell
population to produce with; late induction gives a large population but
little time. The dashed trajectory is the analytically predicted
optimum $t_i^* = 32.7$ h from the boxed $\tau^*$ result above, which
reaches a final titre comparable to much earlier induction while
leaving substantially more biomass, the visual signature of a genuine
interior optimum.

</div>

<div data-chart="yeast-constitutive-vs-inducible"></div>

<div data-chart="yeast-resource-simulation"></div>

<div data-chart="yeast-induction-scan"></div>

<div data-chart="yeast-yield-loss-heatmap"></div>

<div class="caption">

**Figure 5.** Yeast dynamic simulation results. (a) Inducible expression
at $t_i^* = 32.7$ h overtakes constitutive expression ($t_i = 0$) before
harvest, despite producing nothing for the first two thirds of the
batch. This is the case for an inducible promoter, made quantitatively.
(b) Model 2 dynamics (normalised): biomass, product, sugar, dissolved
oxygen and headspace oxygen, with induction at 10 h. Sugar and dissolved
oxygen are driven toward exhaustion in the second half of the batch, at
which point biomass and product both stall, behaviour Model 1 cannot
produce. (c) Final product versus induction time under resource
limitation. Unlike the analytical case, the curve decreases
monotonically: once resources are finite, delaying induction only
wastes substrate. (d) Nanobody concentration across cultivation time and
induction time.

</div>

The two models disagree, and the disagreement is the point. Under ideal
conditions the analytical model favours late induction
($t_{\mathrm{i}}^* = 32.7$ h of a 48 h batch); under resource
limitation, the induction-time scan (Figure 5c) favours early induction.
The reason is that Model 1 has no way for the batch to run out of
anything, so delaying induction is free; once sugar and oxygen deplete,
biomass accumulated late in the batch cannot be converted into product
because the substrate to make it from is gone.

Any induction time derived from a resource-unlimited model is an upper
bound on how long one should wait, not a recommendation.

#### A Second Yeast: *Pichia pastoris*

**Method.**

*P. pastoris* is the other standard yeast expression host and is
frequently preferred over *S. cerevisiae* for recombinant protein
yield<a class="cite" href="#ref-5">5</a>. We ran the same
oxygen-requirement and combined-production analyses on it as a
comparator, under the same 5% viability convention.

**Result.**

<div class="table-wrap">

| Quantity | *P. pastoris* | *S. cerevisiae* |
|---|---|---|
| Maximum growth rate (h<sup>−1</sup>) | 0.5806 | 0.4091 |
| Viability threshold, 5% of max (h<sup>−1</sup>) | 0.0290 | 0.0205 |
| Minimum viable O₂ uptake (mmol·h<sup>−1</sup>) | 0.0503 | 0.0503 |
| Growth at that point (h<sup>−1</sup>) | 0.0744 | 0.0917 |
| CO₂ output there (mmol·h<sup>−1</sup>) | 9.1898 | 7.7513 |
| Combined GFP + Nb flux there (mmol·h<sup>−1</sup>) | 0.0016 | 0.0035 |

</div>

<div class="caption">

**Table 8.** Minimum viable oxygen analysis for *P. pastoris*, alongside
*S. cerevisiae* for comparison.

</div>

<div data-chart="pichia-o2-sweep"></div>

<div data-chart="pichia-combined-production-vs-o2"></div>

<div class="caption">

**Figure 6.** *P. pastoris* oxygen dependence. Its aerobic growth
advantage (0.5806 h<sup>−1</sup>, the highest of any chassis tested)
does not survive oxygen restriction: at the minimum viable oxygen point
it grows more slowly than *S. cerevisiae* and produces less than half
the combined protein flux.

</div>

*P. pastoris* is the fastest grower of any chassis we tested
aerobically, doubling roughly every 1.25 h. Under oxygen restriction
that advantage disappears entirely: 0.0744 h<sup>−1</sup> against
0.0917 h<sup>−1</sup> for *S. cerevisiae*, and a combined production
flux of 0.0016 mmol·h<sup>−1</sup>, less than half. It was therefore not
carried forward, and no per-construct nanobody or dynamic analysis was
run for it.

#### Discussion

Yeast is a workable but fragile choice for this application, and the
three analyses agree on why.

**It can run on our feedstock, but only just.** Anaerobic yeast on the
sucrose a growth-capped cyanobacterial supplier can deliver reaches
0.038429 h<sup>−1</sup>. That is a viable culture, not a productive one.

**Oxygen is its binding constraint, and the constraint is steep.**
Removing oxygen costs three quarters of the growth rate and roughly 80%
of nanobody production capacity. For a chassis intended to operate in an
oxygen-poor habitat, losing four fifths of your capacity to the defining
feature of the environment is a serious problem.

**But the same analysis points at the fix.** The oxygen response curve
rises so steeply out of zero that a trickle of oxygen recovers most of
the loss, and our own cyanobacterial supplier co-produces oxygen.
Supplying both sucrose and oxygen from the partner raises yeast growth
13-fold over strict anaerobiosis. Yeast's weakness and its remedy are
both in the same figure.

**Two outputs are usable regardless of the final chassis choice.** The
induction-timing framework (the $\tau^*$/$t_i^*$ equations above) is
host-agnostic and is reused for *B. subtilis* in the Protein Production
section below. And the finding that a resource-unlimited model
recommends late induction while a resource-limited one recommends early
induction is a general caution, not a yeast-specific result.

FBA measures metabolic capacity, not protein quality. Yeast's
conventional advantages for antibody fragments (ER-based disulfide-bond
formation, glycosylation, efficient secretion) are invisible to a
stoichiometric model, and none of the numbers above should be read as
evidence against them. See the Limitations and Future Directions
section below.

## Chassis Models: Bacteria (Bacillus subtilis)

### Bacteria: *Bacillus subtilis*

#### Design Goals

*Bacillus* species are Gram-positive bacteria widely used as microbial
cell factories because they grow rapidly and secrete proteins directly
into the culture
medium<a class="cite" href="#ref-8">8</a><a class="cite" href="#ref-9">9</a>,
an advantage for downstream processing in a habitat, where every
purification step is mass and power that has to be launched.

More importantly for our application, *B. subtilis* has genuine
anaerobic capability that yeast lacks. It grows anaerobically through
two routes<a class="cite" href="#ref-10">10</a>: anaerobic
respiration using nitrate/nitrite as the terminal electron acceptor, via
a respiratory nitrate reductase encoded by the `narGHJI` operon together
with specific nitrite reductases; and, when external electron acceptors
are entirely absent, mixed acid–butanediol fermentation, producing
lactate, acetate and 2,3-butanediol without formate.

We asked the same three questions of *B. subtilis* as of yeast: can it
run on cyanobacteria-derived sucrose, can it survive our oxygen budget,
and how much nanobody can it make and when. All work used the iBsu1147
reconstruction, which, as the model-repair discussion below describes,
could not answer the second question at all until we repaired it.

#### Alternative Carbon Source

**Method.**

Having established in the cyanobacteria section below that our in-situ
feedstock will be sucrose rather than glucose, we needed to know what
that substitution costs this chassis. We computed maximum growth rate
on each substrate under both aerobic and anaerobic conditions and, more
informatively, normalised each by the carbon delivered, giving a growth
yield per mmol of carbon. The normalisation matters because sucrose is
a disaccharide: it delivers twice the carbon per molecule taken up, so
a raw comparison of growth rates would flatter it for trivial reasons.

**Result.**

<div data-chart="bacillus-glucose-vs-sucrose"></div>

<div class="caption">

**Figure 7.** Glucose versus sucrose for *B. subtilis*: total growth
rate (left panel) and growth per mmol of carbon (right panel),
under aerobic and anaerobic conditions. Sucrose wins on total growth in
both conditions; per carbon atom the two are equivalent anaerobically,
but glucose is the better substrate aerobically.

</div>

Sucrose supports higher **total** growth than glucose in both
conditions. The per-carbon picture is the one that matters:

- **Anaerobically**, per-carbon efficiency is nearly identical between
  the two substrates: about 0.0046 h<sup>−1</sup> in both cases.
  Sucrose's growth advantage anaerobically therefore comes entirely
  from delivering more carbon per unit of uptake, rather than from
  being metabolised more efficiently per carbon atom.
- **Aerobically**, glucose is the more carbon-efficient substrate
  (0.0106 versus 0.0075 h<sup>−1</sup>).

In a closed habitat the scarce quantity is carbon atoms, not uptake
events. The anaerobic per-carbon equivalence therefore says that
switching to a cyanobacteria-derived sucrose feedstock costs this
chassis nothing in the regime our project actually operates in. The
feedstock decision does not compromise the chassis decision.
Aerobically there would be a real per-carbon penalty, worth remembering
if the project ever moves toward a better-aerated design.

#### Oxygen Deprivation

**Method: repairing the model before we could ask the question.**

The iBsu1147 reconstruction is validated aerobically, but with oxygen
uptake set to zero it produced *zero* biomass flux. Since *B. subtilis*
is known to grow anaerobically (see Design Goals above), this was a
model gap, not biology, and it had to be fixed before any oxygen
analysis was possible.

Diagnosis proceeded in stages:

1. We first confirmed that nitrate was actually being consumed (flux
   ≈ 1), verifying that the anaerobic respiration route itself was
   open. The failure was therefore downstream, in biomass precursor
   synthesis.
2. Searching biomass components one at a time was slow, so we switched
   to a systematic screen: every reaction active aerobically but dead
   anaerobically, filtered for those touching `o2_c`.
3. That screen returned five reactions. CAT, O2t and CYOO3 (catalase,
   oxygen transport, aerobic terminal oxidase) are *supposed* to die
   anaerobically and were discarded as expected. Two were genuine
   problems because they had no alternative anaerobic route in the
   model: **ASPO6**, an O₂-dependent step in de novo NAD synthesis, and
   **DHORDfum**, an O₂-dependent step in pyrimidine synthesis.
4. To confirm these two were sufficient to explain the failure, we
   opened free exchanges for their products individually: the ASPO6
   product alone: growth = 0. Orotate (the
   DHORDfum product) alone: growth = 0. **Both together:
   0.224 h<sup>−1</sup>.** Growth resumed, at a plausible fraction of
   the aerobic rate.

Having localised the gap, we did not simply insert generic bypasses.
Each replacement had to be defensible as a real *B. subtilis* enzyme:

- **DHORDfum → DHORDnad.** We identified DHORDnad (NAD-dependent
  dihydroorotate dehydrogenase, EC 1.3.1.14, BSU15540) in KEGG. This is
  not merely an anaerobic workaround: the literature confirms that
  *B. subtilis* dihydroorotate dehydrogenase is natively a Class 1B
  enzyme (PyrDI/PyrDII subunits) that uses NAD as its physiological
  electron acceptor constitutively, independent of oxygen
  availability<a class="cite" href="#ref-11">11</a>.
- **ASPO6 → ASPOfum.** The obvious KEGG candidate for the NAD route was
  ASPDH (NADP-dependent aspartate dehydrogenase, K06989/R07407), and
  this was the reaction used in our first pass. A literature check
  rejected it: the NadX enzyme family is specific to archaea and
  thermophiles and is structurally distinct from NadB, with no evidence
  for its presence in *B. subtilis*. We instead used the fumarate-linked
  mode of NadB/L-aspartate oxidase (BSU27870), which has been confirmed
  by direct enzymatic characterisation of purified *B. subtilis* NadB
  showing activity with both O₂ and fumarate as electron
  acceptors<a class="cite" href="#ref-12">12</a>.

Both corrections were applied **unconditionally to all model
conditions**, aerobic and anaerobic, because both represent constitutive
enzyme capabilities rather than regulatory switches. Turning them on
only anaerobically would have encoded a regulatory assumption we have
no evidence for. The corrected model was packaged as a reusable function
so that every downstream analysis starts from the same object.

This sequence, *model fails → systematic diagnosis → candidate fix →
literature check rejects the first candidate → second candidate
accepted on direct enzymatic evidence*, is a complete
Design–Build–Test–Learn cycle carried out entirely in the Dry Lab, and
it is arguably the most reusable single output of our modeling work:
any team wanting an anaerobic iBsu1147 needs these two reactions.

**Method: the oxygen analyses.**

With the corrected model, we ran the same three analyses used for
yeast: growth with oxygen exchange bounded at [−10, 10] versus [0, 10];
a continuous sweep of the oxygen uptake bound recording growth and CO₂
output; and location of the minimum oxygen uptake sustaining 5% of the
aerobic maximum.

**Result.**

<div data-chart="bacillus-aerobic-anaerobic"></div>

<div data-chart="bacillus-o2-sweep"></div>

<div class="caption">

**Figure 8.** Oxygen dependence of *B. subtilis*. (a) Growth falls from
0.31 h<sup>−1</sup> to 0.22 h<sup>−1</sup> on removing oxygen, a 29%
loss, against 75% for yeast (Figure 2a above). Panel (a) is non-zero
only because of the two reactions added in the model-repair discussion
above; the unrepaired model gives zero. (b) The oxygen sweep, with the
5% viability threshold marked.

</div>

<div class="table-wrap">

| Quantity | Value | Unit |
|---|---|---|
| Maximum growth rate | 0.3186 | h<sup>−1</sup> |
| Viability threshold (5% of max) | 0.0159 | h<sup>−1</sup> |
| Minimum viable O₂ uptake | 0.0503 | mmol·h<sup>−1</sup> |
| Growth rate at that point | 0.0726 | h<sup>−1</sup> |
| CO₂ output at that point | 9.2262 | mmol·h<sup>−1</sup> |

</div>

<div class="caption">

**Table 9.** Minimum viable oxygen analysis for *B. subtilis*. The
viability threshold is 5% of the aerobic maximum.

</div>

*B. subtilis* starts from a lower aerobic ceiling than yeast
(0.31 h<sup>−1</sup> versus 0.40 h<sup>−1</sup>) but loses far less on
losing oxygen: a 29% drop against 75%. Anaerobically it doubles roughly
every 3 h where yeast takes about 7 h. **The ranking of the two chassis
inverts once oxygen becomes scarce**, which is the first indication
that the conventional choice is the wrong one for this application.

Its CO₂ output at the micro-aerophilic point (9.2262 mmol·h<sup>−1</sup>)
is also the highest of the three hosts tested, which is relevant
because in a closed loop that is the supplier's feedstock, not waste.

#### Protein Production

**Method: steady-state capacity (FBA).**

As for yeast (see the Protein Production section above): combined
GFP + anti-GFP output swept across oxygen, and maximum theoretical
per-construct nanobody flux aerobically and anaerobically.

**Result: steady-state capacity.**

At the minimum viable oxygen uptake, combined GFP + nanobody flux is
0.0050 mmol·h<sup>−1</sup>.

<div class="table-wrap">

| Construct | Aerobic | Anaerobic | Loss | Aerobic vs. yeast |
|---|---|---|---|---|
| Nb14 | 0.0381 | 0.0280 | −27% | 5.6× |
| Nb1_gbHSV | 0.0423 | 0.0310 | −27% | 5.6× |

</div>

<div class="caption">

**Table 10.** Maximum theoretical nanobody production flux
(mmol·h<sup>−1</sup>) in *B. subtilis*, with the *S. cerevisiae* values
from Table 5 above for comparison.

</div>

<div data-chart="bacillus-nanobody-by-construct"></div>

<div data-chart="bacillus-combined-production-vs-o2"></div>

<div class="caption">

**Figure 9.** Nanobody production capacity in *B. subtilis*. Note the
y-axis of panel (a) extends to 0.045 mmol·h<sup>−1</sup>, against
0.008 mmol·h<sup>−1</sup> for the equivalent yeast figure (Figure 3a
above). The two panels are not on the same scale, and the difference
between the hosts is larger than it looks.

</div>

Under optimal aerobic growth *B. subtilis* reaches 0.0423 mmol·h<sup>−1</sup>
for Nb1_gbHSV against 0.0076 mmol·h<sup>−1</sup> for yeast, roughly
**5.5 times higher**. Going anaerobic costs it about 27% of that
capacity, where yeast loses about 80%. Since our habitat scenario is
precisely the oxygen-poor case, this is the decisive comparison.

As in yeast, Nb1_gbHSV is consistently marginally easier to produce
than Nb14, the same ≈10% systematic advantage, in the same direction,
consistent with a construct-length effect rather than noise.

**Method: dynamic production (ODE).**

The dynamic framework is the one derived in the Protein Production
section above; the biomass, production and induction-timing equations
there apply unchanged. Two features of this host are not captured by
the yeast version, and are the *Bacillus*-specific extensions:

1. **Nitrogen/amino-acid precursor limitation.** A nanobody is a
   protein, so its synthesis needs not just carbon and energy but
   nitrogen-containing amino-acid precursors. We add an explicit
   precursor pool $N(t)$.
2. **Protease-associated product loss.** *Bacillus* secretes
   extracellular proteases that can degrade heterologous
   proteins<a class="cite" href="#ref-8">8</a>. Rather
   than modelling protease concentration as its own state variable, we
   use a biomass-proportional loss term, which is minimal but still
   captures a genuinely *Bacillus*-specific bottleneck.

<div class="table-wrap">

| Symbol | Description | Unit |
|---|---|---|
| $X(t)$ | *Bacillus* biomass concentration | g·l<sup>−1</sup> |
| $P(t)$ | Nanobody concentration | mg·l<sup>−1</sup> |
| $S(t)$ | Sugar/carbon-source concentration | g·l<sup>−1</sup> |
| $N(t)^{\dagger}$ | Nitrogen/amino-acid precursor pool | g·l<sup>−1</sup> |
| $O(t)$ | Dissolved oxygen concentration | mg·l<sup>−1</sup> |
| $O_g(t)$ | Headspace oxygen concentration | mg·l<sup>−1</sup> |

</div>

<div class="caption">

**Table 11.** State variables in the *Bacillus* dynamic model.
<sup>†</sup> marks the host-specific addition.

</div>

The induction logic is unchanged from the growth-switch equation above,
with host-specific symbols:

$$
\mu_e(t) =
\begin{cases}
\mu_B, & t < t_i \\
\beta_B\mu_B, & t \geq t_i
\end{cases}
\qquad
q_e(t) =
\begin{cases}
0, & t < t_i \\
q_B, & t \geq t_i
\end{cases}
$$

where $\mu_B$ is the maximum specific growth rate, $\beta_B \in (0,1]$
the post-induction burden factor, and $q_B$ the specific production
rate per unit biomass.

The saturation functions now carry three factors instead of two:

$$
\begin{aligned}
\Phi_X(S,N,O) &= \frac{S}{K_{S,X}+S} \cdot \frac{N}{K_{N,X}+N} \cdot \frac{O}{K_{O,X}+O}, \\
\Phi_P(S,N,O) &= \frac{S}{K_{S,P}+S} \cdot \frac{N}{K_{N,P}+N} \cdot \frac{O}{K_{O,P}+O}.
\end{aligned}
$$

Values near 1 mean weak limitation; values near 0 mean strong
limitation. The multiplicative form encodes the assumption that the
resources are non-substitutable: running out of any one of them stops
the process, regardless of how much of the others remains.

The complete six-state system is

$$
\begin{aligned}
\frac{dX}{dt} &= \mu_e(t)\,\Phi_X(S,N,O)\,X \\
\frac{dP}{dt} &= q_e(t)\,\Phi_P(S,N,O)\,X
               - \left(k_{d,0}+k_{\mathrm{prot}}X\right)P \\
\frac{dS}{dt} &= - \left( \frac{\mu_e(t)\Phi_X(S,N,O)}{Y_{X/S}}
               + \frac{q_e(t)\Phi_P(S,N,O)}{Y_{P/S}} \right)X \\
\frac{dN}{dt} &= - \left( \frac{\mu_e(t)\Phi_X(S,N,O)}{Y_{X/N}}
               + \frac{q_e(t)\Phi_P(S,N,O)}{Y_{P/N}} \right)X \\
\frac{dO}{dt} &= k_La(\alpha O_g-O)
               - \left( \frac{\mu_e(t)\Phi_X(S,N,O)}{Y_{X/O}}
               + \frac{q_e(t)\Phi_P(S,N,O)}{Y_{P/O}} \right)X \\
\frac{dO_g}{dt} &= - \frac{k_LaV_l}{V_g}(\alpha O_g-O)
\end{aligned}
$$

Reading these biologically: the biomass equation says biomass grows at
the effective rate, throttled by whichever resource is scarcest. The
product equation is the key *Bacillus* equation: product is made in
proportion to active biomass, and lost both to baseline degradation
($k_{d,0}P$) *and* to a term proportional to biomass itself
($k_{\mathrm{prot}}XP$). That second term means the very thing that
makes product also destroys it, so a dense culture is not unambiguously
good. The sugar and nitrogen equations debit carbon and nitrogen for
both growth and production; the oxygen equations are the standard
two-phase oxygen balance.

The model was simulated for induction times between 0 and 48 h,
recording for each the peak nanobody concentration, the final
concentration at harvest, final biomass and remaining resources.

<div class="table-wrap">

| Symbol | Description | Value | Unit |
|---|---|---|---|
| **Kinetic** | | | |
| $\mu_B$ | Maximum specific growth rate | 0.40 | h<sup>−1</sup> |
| $\beta_B$ | Post-induction growth factor | 0.10 | — |
| $q_B$ | Specific nanobody production rate | 2.00 | mg·g<sup>−1</sup>·h<sup>−1</sup> |
| $k_{d,0}$ | Baseline product degradation rate | 0.010 | h<sup>−1</sup> |
| $k_{\mathrm{prot}}^{\dagger}$ | Biomass-associated protease loss coefficient | 0.005 | l·g<sup>−1</sup>·h<sup>−1</sup> |
| **Monod constants** | | | |
| $K_{S,X}$ | Sugar Monod constant, growth | 0.10 | g·l<sup>−1</sup> |
| $K_{N,X}^{\dagger}$ | Nitrogen Monod constant, growth | 0.05 | g·l<sup>−1</sup> |
| $K_{O,X}$ | Oxygen Monod constant, growth | 0.10 | mg·l<sup>−1</sup> |
| $K_{S,P}$ | Sugar Monod constant, production | 0.10 | g·l<sup>−1</sup> |
| $K_{N,P}^{\dagger}$ | Nitrogen Monod constant, production | 0.05 | g·l<sup>−1</sup> |
| $K_{O,P}$ | Oxygen Monod constant, production | 0.10 | mg·l<sup>−1</sup> |
| **Yields** | | | |
| $Y_{X/S}$ | Biomass yield on sugar | 0.50 | g·g<sup>−1</sup> |
| $Y_{X/N}^{\dagger}$ | Biomass yield on nitrogen | 4.00 | g·g<sup>−1</sup> |
| $Y_{X/O}$ | Biomass yield on oxygen | 0.50 | g·mg<sup>−1</sup> |
| $Y_{P/S}$ | Nanobody yield on sugar | 100 | mg·g<sup>−1</sup> |
| $Y_{P/N}^{\dagger}$ | Nanobody yield on nitrogen | 800 | mg·g<sup>−1</sup> |
| $Y_{P/O}$ | Nanobody yield on oxygen | 100 | mg·mg<sup>−1</sup> |
| **Oxygen transfer and vessel** | | | |
| $k_La$ | Oxygen mass transfer coefficient | 0.30 | h<sup>−1</sup> |
| $\alpha$ | Gas–liquid oxygen partition coefficient | 0.03 | — |
| $V_l$ | Liquid volume | 1.00 | L |
| $V_g$ | Headspace volume | 0.25 | L |
| **Initial conditions** | | | |
| $X_0$ | Initial biomass | 0.05 | g·l<sup>−1</sup> |
| $P_0$ | Initial nanobody | 0.00 | mg·l<sup>−1</sup> |
| $S_0$ | Initial sugar | 20.0 | g·l<sup>−1</sup> |
| $N_0^{\dagger}$ | Initial nitrogen/amino-acid precursor pool | 5.00 | g·l<sup>−1</sup> |
| $O_0$ | Initial dissolved oxygen | 7.00 | mg·l<sup>−1</sup> |
| $O_{g,0}$ | Initial headspace oxygen | 270.0 | mg·l<sup>−1</sup> |

</div>

<div class="caption">

**Table 12.** Illustrative parameter values for the *Bacillus* dynamic
model. <sup>†</sup> marks the two host-specific additions:
nitrogen/amino-acid limitation and protease-associated product loss.

</div>

**Parameter provenance.**

As for the yeast models, we state the status of these numbers
explicitly:

- **Literature-guided (structure and order of magnitude):** the model
  structure is literature-supported: Monod kinetics for
  nutrient-limited growth<a class="cite" href="#ref-6">6</a>,
  $k_La$-based oxygen transfer<a class="cite" href="#ref-7">7</a>,
  and the *Bacillus*-specific elements based on its use as a
  heterologous protein production host and on protease-related product
  loss<a class="cite" href="#ref-8">8</a><a class="cite" href="#ref-9">9</a>.
  The maximum growth rate $\mu_B = 0.40$ h<sup>−1</sup> was chosen as
  an approximate illustrative value consistent with reported
  *B. subtilis* growth studies<a class="cite" href="#ref-13">13</a>.
- **Assumed:** all Monod constants, yields, the protease coefficient
  $k_{\mathrm{prot}}$, transfer parameters and initial conditions.
- **Fitted/calibrated:** none.

Values were selected to produce biologically reasonable qualitative
behaviour and were guided by the growth–production trade-off expected
from FBA. The predicted optimal induction time is therefore
**model-dependent** and should be refined using experimental data or
FBA-derived parameter estimates before it is used as a process
set-point.

**Result: dynamic production.**

<div data-chart="bacillus-fig9-multi-induction"></div>

<div class="caption">

**Figure 10.** Biomass (left) and nanobody (right) trajectories under
different *Bacillus* induction strategies; the same colour denotes the
same induction time in both panels. Very early induction ($t_i = 0$ h)
produces little of either because there is no biomass to produce with.
Very late induction ($t_i = 24$ h, 40 h) reaches maximum biomass but
leaves no production window. The simulation-predicted optimum under the
illustrative parameter set, $t_i^* \approx 6.5$ h, gives the highest
final nanobody concentration. Note also that the $t_i = 12$ h trajectory
*peaks* near 140 mg·l<sup>−1</sup> around 28 h and then declines,
because product loss outruns production once resources deplete, so peak
titre and harvest titre are not the same quantity.

</div>

<div data-chart="bacillus-fig2-sugar-nitrogen"></div>

<div data-chart="bacillus-fig6-final-nanobody"></div>

<div data-chart="bacillus-fig8-heatmap"></div>

<div class="caption">

**Figure 11.** Supporting *Bacillus* dynamic outputs. (a) Sugar is
driven to exhaustion by about 40 h while the nitrogen/amino-acid pool is
only partially consumed, so under this parameter set carbon, not
nitrogen, is the binding resource. (b) The induction-time scan is
sharply peaked at $t_i \approx 6.5$ h and collapses within a few hours
either side, so the recommended operating window is narrow. (c)
Nanobody concentration across cultivation time and induction time,
showing a narrow high-yield ridge at early induction times that shifts
to slightly earlier induction as cultivation time is extended.

</div>

Three things come out of the dynamic model.

**Induction timing matters more than the idealised analysis suggests.**
The yield curve in Figure 11b is a sharp peak, not a broad plateau:
induction around 6.5 h–7 h gives the highest predicted final titre, and
missing it by a few hours costs most of the product. That is a
process-control requirement, not a modelling curiosity.

**Carbon is the dominant limiting resource under this parameter set**,
not nitrogen (Figure 11a), even though nitrogen limitation was the main
reason for adding the $N(t)$ pool. That is a negative result about our
own extension and worth stating: the pool was sized generously enough
($N_0 = 5.00$ g·l<sup>−1</sup>) that it never became binding. Whether
nitrogen matters in practice depends on a medium composition we have
not yet fixed.

**Peak and harvest titre diverge.** Because the protease term scales
with biomass, product accumulated early can be lost later (Figure 10,
right panel). This argues for harvesting at the product peak rather
than at a fixed end time, an operational recommendation that neither
the analytical model nor FBA could have generated.

#### Discussion

**_B. subtilis_ is the preferred chassis, and three independent
objectives agree on it.** Growth rate, combined protein output and
per-construct nanobody flux all rank it above *S. cerevisiae* under
oxygen limitation. That convergence across different objective
functions is a useful internal cross-check: it is not an artefact of
how we posed one optimisation problem.

<div class="table-wrap">

| Quantity | *S. cerevisiae* | *B. subtilis* | *P. pastoris* |
|---|---|---|---|
| Aerobic μ (h<sup>−1</sup>) | 0.4091 | 0.3186 | 0.5806 |
| Anaerobic μ (h<sup>−1</sup>) | 0.10 | 0.22 | n/a |
| Growth lost without O₂ | −75% | −29% | n/a |
| μ at min viable O₂ (h<sup>−1</sup>) | 0.0917 | 0.0726 | 0.0744 |
| Combined flux at min O₂ | 0.0035 | **0.0050** | 0.0016 |
| Best aerobic Nb flux | 0.0076 | **0.0423** | n/a |
| Best anaerobic Nb flux | 0.0015 | **0.0310** | n/a |
| Nb capacity lost without O₂ | −80% | **−27%** | n/a |

</div>

<div class="caption">

**Table 13.** Chassis comparison summary. All values from this section
and the yeast oxygen-deprivation and Pichia sections above.

</div>

**The aerobic ranking is misleading, and that is the finding.**
*P. pastoris* grows fastest aerobically and *S. cerevisiae* is the
conventional choice, but neither advantage survives the oxygen
restriction that defines our application. A team that selected a
chassis on aerobic benchmarks would have chosen wrongly. This is the
clearest case in our work of modeling changing a decision rather than
confirming one.

**Construct choice.** Nb1_gbHSV is the marginally easier construct in
both hosts and both oxygen conditions. Where the two are otherwise
interchangeable, prefer it.

**The gap-fill is a reusable deliverable in its own right.** An
anaerobic-capable iBsu1147 requires DHORDnad and ASPOfum; both
corrections are literature-justified, and the corrected model is
packaged for reuse. This is also the one prediction in our Dry Lab work
that is directly and cheaply testable: growth on nitrate under strict
anaerobiosis, with and without pyrimidine and NAD supplementation.

FBA ranks metabolic capacity, not protein quality, and a Gram-positive
host brings its own problems with disulfide-bonded fragments that these
models cannot see. The protease term in the dynamic model is a lumped
stand-in for the entire extracellular protease system. And the dynamic
model still runs on mostly assumed parameters, including a $\mu_B$ that
does not match this section's own FBA result. The chassis
recommendation rests on the FBA comparison, which is well grounded; the
induction timing rests on the dynamic model, which is not yet.

## Chassis Models: Cyanobacteria (Synechococcus elongatus)

### Cyanobacteria: *Synechococcus elongatus* PCC 7942

#### Design Goals

The two previous subsections assume a sugar feedstock. In a closed
habitat that assumption has to be earned: glucose is not a given, and
the only large-scale carbon input available is CO₂. This model answers
where the sugar comes from.

Cyanobacteria are photoautotrophs that produce sucrose directly from
photosynthesis. Other sugars can be produced phototrophically (glucose,
fructose, polysaccharides<a class="cite" href="#ref-14">14</a><a class="cite" href="#ref-15">15</a>),
but sucrose is the highest-yielding carbohydrate, and the *Bacillus*
Alternative Carbon Source section above shows it costs our preferred
host nothing per carbon atom anaerobically. The obstacle is that
cyanobacteria make sucrose and then keep it: **they do not secrete
it**.

The goals for this model were therefore:

1. **Characterise the unmodified organism** and find out what actually
   limits it, rather than assuming it is simply because it is a
   photoautotroph.
2. **Evaluate forced export**: engineer sucrose out of the cell with a
   heterologous transporter, enabling a co-culture with the production
   host.
3. **Evaluate accumulation and recovery**: block the pathways that
   consume sucrose, let it build up intracellularly, and recover it by
   lysis in a separate culture.
4. **Choose between them** on grounds the models can support.

Unlike the two host models, this one is not asked to make protein. Its
output is a flux that becomes another model's input.

#### Nutrient Supply and Limitation

**Method.**

Before evaluating either export strategy we characterised the
unmodified aerobic PCC 7942 model
(iMS837)<a class="cite" href="#ref-3">3</a>. We swept the
CO₂/HCO₃⁻ uptake bound to locate the growth plateau, then used **shadow
price analysis** to identify which constraints were actually binding. A
shadow price is the marginal improvement in the objective per unit
relaxation of a constraint; a shadow price of zero means the constraint
is not binding and relaxing it buys nothing. We then relaxed each
binding constraint in turn and re-ran the analysis, following the
limitation as it moved from nutrient to nutrient.

Because each nutrient's requirement scales with the growth rate
actually achieved rather than with a fixed absolute quantity,
breakpoints found by relaxing one constraint at a time are not
self-consistent: relieving nitrogen raises the achievable growth rate,
which raises the phosphate requirement, and so on. We therefore refined
the breakpoints by **iterative joint optimisation** (coordinate descent
across all three constraints) until they converged.

**Result: baseline and the binding constraint.**

The default model grows at approximately 0.102 h<sup>−1</sup>, with
CO₂/HCO₃⁻ uptake capping growth; the model's native bound on that
uptake is 2 mmol·h<sup>−1</sup>. Figure 12 shows optimal growth as a
function of the bound: it rises approximately linearly and plateaus
around ≈4.2 mmol·h<sup>−1</sup>. Supported by experimental work in the
literature<a class="cite" href="#ref-22">22</a>, we raised the
bound to 5.1 mmol·h<sup>−1</sup>, which with the model's inherited
default photon, nitrogen and phosphate bounds gives a baseline growth
rate of 0.2191 h<sup>−1</sup>. This is the operating point used for the
rest of the cyanobacterial analysis.

<div data-chart="cyano-co2-hco3-bounds"></div>

<div class="caption">

**Figure 12.** Optimal growth rate of *S. elongatus* PCC 7942 as a
function of the CO₂/HCO₃⁻ uptake bound. Growth saturates beyond
approximately 4.2 mmol·h<sup>−1</sup>; the habitat-analog operating
point of 5.1 mmol·h<sup>−1</sup> (green, giving 0.2191 h<sup>−1</sup>)
sits just past the knee, and the model's native default bound of
2 mmol·h<sup>−1</sup> sits well below it.

</div>

Shadow price analysis at this operating point produced a result we did
not expect.

<div class="table-wrap">

| Reaction | Shadow price |
|---|---|
| EX_co2_e | −8.00×10⁻¹⁶ |
| EX_hco3_e | 3.27×10⁻¹⁷ |
| EX_nh4_e | −0.1243 |
| EX_no3_e | −0.1243 |
| EX_photon650_e | −6.18×10⁻¹⁷ |

</div>

<div class="caption">

**Table 14.** Shadow prices at the baseline operating point (CO₂/HCO₃⁻
bound 5.1 mmol·h<sup>−1</sup>, growth rate 0.2191 h<sup>−1</sup>),
growth objective.

</div>

Neither CO₂ nor photon supply was binding; both returned shadow prices
of essentially zero, meaning more light or more carbon would not
improve growth at all. The true limiting resource was **nitrogen**,
specifically ammonium (`EX_nh4_e`), with a shadow price of −0.1243.
Nitrate (`EX_no3_e`) carried an identical shadow price, exactly as
expected if both nitrogen sources converge on the same downstream
assimilation pathway (GS-GOGAT) once inside the cell, a useful sanity
check that the dual solution is behaving sensibly.

**Result: a three-stage co-limitation cascade.**

Relaxing each constraint in turn revealed that the limitation does not
sit with one nutrient but moves:

- **Stage 1: nitrogen-limited.** Growth rose linearly from
  0.2191 h<sup>−1</sup> to 0.2619 h<sup>−1</sup> as the uptake bound was
  increased from the model default (0.0031 mmol·h<sup>−1</sup>) to
  approximately 0.35 mmol·h<sup>−1</sup>, with CO₂/HCO₃⁻ held at 5.1. At
  0.35 mmol·h<sup>−1</sup> the shadow price dropped to zero and
  CO₂/HCO₃⁻ became the new binding constraint.
- **Stage 2: carbon-limited.** With nitrogen relieved, growth continued
  rising linearly (shadow price constant at −0.0257) from
  0.2619 h<sup>−1</sup> to 0.4699 h<sup>−1</sup> as the CO₂/HCO₃⁻ bound
  was increased from 5.1 to approximately 15 mmol·h<sup>−1</sup>.
  Growth stopped improving beyond CO₂/HCO₃⁻ = 9.5 and NH₄⁺ = 2.07.
- **Stage 3: phosphate-limited.** Phosphate (`EX_pi_e`) then emerged as
  a third constraint, with a shadow price of −2.349, an order of
  magnitude larger than either nitrogen or carbon. Growth plateaued at
  0.6343 h<sup>−1</sup> once the phosphate bound exceeded approximately
  0.2782 mmol·h<sup>−1</sup>, with NH₄⁺ at about 3.425 and CO₂/HCO₃⁻ at
  12.728 (see panel (b) of Figure 13 below).

<div data-chart="cyano-cn-bof"></div>

<div data-chart="cyano-cpn-increased"></div>

<div data-chart="cyano-limiting-factors"></div>

<div class="caption">

**Figure 13.** Sequential nutrient co-limitation in *S. elongatus* PCC
7942. (a) Growth rate over the CO₂/HCO₃⁻ × NH₄⁺ plane with phosphate
held at the model default; the marked point is where phosphate takes
over as the binding constraint. (b) Growth as all three bounds are
scaled proportionally toward the converged solution, showing the
plateau. (c) The cascade summarised: 0.2191 h<sup>−1</sup> (baseline) →
0.2619 h<sup>−1</sup> (N relieved) → 0.499 h<sup>−1</sup> (N+C relieved)
→ 0.6343 h<sup>−1</sup> (N+C+P relieved).

</div>

At convergence the model predicts a **maximum growth rate of
0.6274 h<sup>−1</sup>**, requiring

CO₂/HCO₃⁻ ≈ 12.22 mmol·h<sup>−1</sup>, NH₄⁺ ≈ 3.29 mmol·h<sup>−1</sup>,
PO₄³⁻ ≈ 0.27 mmol·h<sup>−1</sup>.

with photon supply (145 µE·m<sup>−2</sup>·s<sup>−1</sup>) and nitrate,
sulfate, iron and magnesium all remaining non-binding throughout (see
Table 15 below).

<div class="table-wrap">

| Reaction | Flux | Bound | Shadow price | Binding? |
|---|---|---|---|---|
| EX_co2_e | −12.2203 | −12.2203 | −2.567×10⁻² | Yes |
| EX_hco3_e | −12.2203 | −12.2203 | −2.567×10⁻² | Yes |
| EX_nh4_e | −3.3000 | −3.3000 | ≈0 | No |
| EX_no3_e | −1.7484 | −1.7600 | ≈0 | No |
| EX_so4_e | −0.0855 | −1000.0000 | ≈0 | No |
| EX_pi_e | −0.2671 | −0.2671 | ≈0 | No |
| EX_fe3_e | −0.0010 | −0.0010 | ≈0 | No |
| EX_mg2_e | −0.0070 | −1000.0000 | ≈0 | No |
| EX_photon650_e | −0.0070 | −145.0000 | ≈0 | No |

</div>

<div class="caption">

**Table 15.** Shadow price analysis for the growth objective at the
converged nutrient-sufficient bounds (CO₂/HCO₃⁻ = 12.2203, NH₄⁺ = 3.3,
PO₄³⁻ = 0.2671 mmol·h<sup>−1</sup>). Growth rate = 0.6274 h<sup>−1</sup>.

</div>

**A methodological negative result worth recording.**

Shadow price analysis was reliable for *identifying* which constraints
were binding, but unreliable for *precisely locating* breakpoints near
the optimum, because of solution degeneracy: multiple alternate optimal
flux distributions give identical growth rates but different dual
values. All breakpoints reported above were therefore confirmed by
direct growth-rate sweeps rather than by looking for a shadow-price
zero-crossing. Any team using shadow prices to find limiting nutrients
should be aware of this failure mode.

**Design consequence.**

Supplying CO₂ alone is not enough: nitrogen and phosphate become
binding in turn, and phosphate has by far the steepest shadow price.
That strengthens the case for using recovered urine as a nutrient
source, since it supplies nitrogen, and it raises **phosphate sourcing
as an unsolved design problem** the project needs an answer to.

#### Exporting Sucrose

**Method.**

Sucrose sits at a metabolic junction inside the cyanobacterial cell. It
can be held as an osmolyte, broken back down into hexoses and fed into
glycogen, or, with the right transporter, exported. The engineering
logic is to close off the first two routes while opening the third.

The transporter is CscB, the sucrose permease from *E. coli*, whose
incorporation into PCC 7942 has been experimentally
validated<a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a>.
Its native reaction in *E. coli* is a sucrose/H⁺ symport *into* the
cell; in the cyanobacterial context the high intracellular sucrose
concentration reverses this, giving effectively irreversible export of
both sucrose and protons.

We added the CscB reaction to the model and then (i) mapped the
trade-off between sucrose export and biomass production by sweeping the
biomass flux constraint; (ii) selected candidate operating points and
fed the resulting sucrose fluxes into the yeast model (see the yeast
Alternative Carbon Source section above); and (iii) ran shadow price
analysis with *sucrose export* rather than growth as the objective, to
find what limits production rather than growth.

**Result: the export–growth trade-off.**

Sucrose export and biomass production compete for the same fixed
carbon. Figure 14 maps that trade-off directly: maximum sucrose export
falls approximately linearly as the biomass flux constraint is raised.

<div data-chart="cyano-sucrose-vs-growth"></div>

<div class="caption">

**Figure 14.** Sucrose excretion versus growth rate trade-off for
*S. elongatus* PCC 7942 carrying *cscB*, at CO₂/HCO₃⁻ =
5.1 mmol·h<sup>−1</sup>. The near-linear relationship means that every
unit of cyanobacterial growth is paid for in sucrose not exported,
which is what makes deliberate growth-capping a usable control handle
rather than simply a loss.

</div>

**Result: co-culture operating points.**

At the high-growth end of the trade-off, maximum sucrose export is
0.234 mmol·h<sup>−1</sup> at a cyanobacterial biomass flux of 0.03,
which supports a 1:1 biomass ratio with the yeast partner (see the
yeast Alternative Carbon Source section above). A 1:1 ratio is not,
however, a *stable* operating point, because the cyanobacteria grow
faster than the yeast and the co-culture would drift over time. Capping
cyanobacterial growth lower moves the system along the trade-off curve
in the direction we want.

<div class="table-wrap">

| Operating point | Cyano. biomass flux (h<sup>−1</sup>) | Sucrose export (mmol·h<sup>−1</sup>) | Resulting yeast μ (h<sup>−1</sup>) |
|---|---|---|---|
| Max cyanobacterial growth | 0.03 | 0.234 | 0.011132 |
| Growth-capped (preferred) | 0.013 | **0.8078** | **0.038429** |

</div>

<div class="caption">

**Table 16.** Two candidate co-culture operating points. Capping
cyanobacterial growth more aggressively releases substantially more
sucrose and gives a faster-growing, more stable partner culture. Yeast
growth rates from Table 3 above.

</div>

At a biomass flux of 0.013 and a CO₂/HCO₃⁻ uptake of 5.1 mmol·h<sup>−1</sup>,
sucrose secretion rises to 0.8078 mmol·h<sup>−1</sup>, a 3.5× increase
over the high-growth point, and the yeast partner reaches
0.038429 h<sup>−1</sup>. This is the co-culture operating point we
recommend.

**Result: oxygen is the second product.**

A co-culture supplies more than sugar. The oxygen flux of the
*cscB*-carrying cyanobacteria is 4.2305 mmol·h<sup>−1</sup>, and the
yeast oxygen-deprivation section above established that a small amount
of oxygen buys a disproportionate amount of metabolic capability.
Supplying the yeast with both sucrose and oxygen raises its growth rate
to 0.175773 h<sup>−1</sup>, a **13-fold increase** over the strictly
anaerobic baseline of 0.0138 h<sup>−1</sup>.

This reframes the co-culture: it is not a feedstock workaround, it is a
partial solution to the oxygen problem as well.

**Result: what limits export is not what limits growth.**

<div class="table-wrap">

| Reaction | Flux | Bound | Shadow price | Binding? |
|---|---|---|---|---|
| EX_co2_e | −5.1000 | −5.1000 | −8.333×10⁻² | Yes |
| EX_hco3_e | −5.1000 | −5.1000 | −8.333×10⁻² | Yes |
| EX_nh4_e | −0.0031 | −0.0031 | −1.055×10⁻¹⁶ | No |
| EX_no3_e | −0.1015 | −1.7600 | −0.000×10⁰ | No |
| EX_so4_e | −0.0018 | −1000.0000 | 0.000×10⁰ | No |
| EX_pi_e | −0.0055 | −0.2000 | −0.000×10⁰ | No |
| EX_fe3_e | −0.0000 | −0.0010 | −0.000×10⁰ | No |
| EX_mg2_e | −0.0001 | −1000.0000 | 0.000×10⁰ | No |
| EX_photon650_e | −0.0001 | −145.0000 | −0.000×10⁰ | No |

</div>

<div class="caption">

**Table 17.** Shadow price analysis for the sucrose production
objective, habitat-analog CO₂/HCO₃⁻ bound (5.1 mmol·h<sup>−1</sup>),
biomass objective capped at 0.013 h<sup>−1</sup>.

</div>

Under the capped growth rate, the only binding constraint on sucrose
production is CO₂/HCO₃⁻, and increasing CO₂ does increase sucrose
output.

Comparing Table 17 with Table 15 above gives a clean and genuinely
useful dissociation: **sucrose export and biomass growth are governed
by different limiting resources**. Nutrient supplementation strategies
such as urine-derived nitrogen and phosphate sourcing matter a great
deal for growth optimisation but do not move the sucrose-production
bottleneck at all, which remains carbon/Calvin-cycle-limited regardless
of nitrogen or phosphate availability. Practically: if the goal is more
sucrose, invest in CO₂ delivery, not in richer medium.

#### Retaining Sucrose: the Knockout Strategy

**Method.**

The alternative to export is to stop the cell consuming its own
sucrose and let it accumulate. Two knockouts were the obvious targets:

1. ***glgC*** (ADP-glucose pyrophosphorylase), which competes for the
   hexose phosphates that are the source of sucrose;
2. ***invA***/SUCR (sucrose-hydrolysing enzyme), which breaks sucrose
   back down into glucose and fructose.

To let FBA optimise for accumulation rather than export, a sucrose sink
reaction had to be added to the model. We then tested additional
knockouts of competing pathways, performed single gene deletion
analysis across the genome, traced flux to locate the bottleneck, and
ran flux variability analysis (FVA) at fixed biomass flux
0.013 h<sup>−1</sup> and CO₂/HCO₃⁻ uptake 5.1 mmol·h<sup>−1</sup> to
screen for any gene whose deletion would *force* higher sucrose flux.

**Result.**

Sucrose accumulation flux at a biomass flux capped at 0.013 h<sup>−1</sup>
was 0.2895 mmol·h<sup>−1</sup> under habitat-analog light and CO₂
constraints. Under unlimited carbon and light, the theoretical maximum
is 16.33 mmol·h<sup>−1</sup>, with *and without* the relevant
knockouts, indicating substantial headroom accessible through
bioreactor optimisation rather than through genetics.

The knockouts, in other words, did essentially nothing:

- Additional knockouts of competing pathways yielded *identical*
  sucrose production fluxes, even under unlimited light and CO₂.
- Flux tracing located the bottleneck in Calvin cycle output,
  specifically the `f6p_c` pool available for sucrose synthesis.
  Increasing sucrose production therefore requires either enhanced CO₂
  fixation capacity or reduced biomass allocation, not elimination of
  competing pathways.
- Single gene deletion confirmed sucrose phosphate synthase/phosphatase
  as **essential**: knocking it out abolishes sucrose flux entirely.
  NDH-1 subunit genes each caused approximately a **53% reduction** in
  sucrose flux. These are linked to the CO₂-concentrating mechanism,
  reconfirming from an entirely different direction that CO₂ delivery
  is the primary constraint.
- The FVA screen found **no single gene candidate**: sucrose and growth
  remained uncoupled for every gene tested.

**A negative result that teaches something about the method.**

This appears to conflict with the literature. Published knockouts of
*invA*, *glgA*/*glgC* and *ggpS* report 15–300% increases in
sucrose<a class="cite" href="#ref-17">17</a><a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-18">18</a><a class="cite" href="#ref-19">19</a>,
but only under salt-stress conditions.

Our interpretation is that the reported effects operate through
ion-dependent regulation, and regulatory mechanisms of that kind are
simply absent from stoichiometric FBA. Without the salt-stress
regulatory state, the model's optimal solution never routes flux
through the competing pathways in the first place, so knocking them out
changes nothing in silico. The knockouts are not wrong; the model
cannot see what makes them work.

This is a real limitation of the method rather than a failure of the
analysis: **GEM-based knockout screening cannot discover
regulation-dependent targets.** A knockout that only helps because it
changes how a cell responds to stress will look like a no-op to FBA.

#### Discussion

**The two strategies give the same flux, so the choice is made on
other grounds.** Under both scenarios (sucrose excreted via an
introduced exporter, or accumulated via knockout of consuming genes)
the total sucrose flux the model predicts is the same. FBA cannot
separate them.

The literature makes the case for export. Cytosolic volume constrains
how much sucrose can be accumulated intracellularly, and the costs of
cyanobacterial cell recovery, lysis and processing would likely exceed
the economic value of the commodity products contained in the
cytosol<a class="cite" href="#ref-20">20</a>. Secreting sugars into
the supernatant for collection has been proposed as the more viable
strategy, and cyanobacteria have been engineered to express
heterologous transporters capable of exporting lactate and
hexoses<a class="cite" href="#ref-14">14</a><a class="cite" href="#ref-21">21</a>.
In a habitat, where lysis-and-recovery hardware is mass and power that
has to be launched, this argument is if anything stronger than it is on
Earth.

**Our design decision.** Based on the literature and our own analysis,
**CscB export combined with sucrose phosphate synthase overexpression
and *invA* knockout under salt-stress induction**, if these are
compatible, appears to be the most robust route to obtaining sucrose
from cyanobacteria. Export is chosen for downstream-processing reasons;
the *invA* knockout is retained on literature grounds even though our
own FBA cannot demonstrate its benefit, precisely because we have
identified *why* FBA cannot see it.

**Where to invest engineering effort.** CO₂ delivery and Calvin-cycle
capacity, not competing-pathway knockouts. Three independent lines of
evidence converge on this: shadow prices under a sucrose objective,
flux tracing to the `f6p_c` pool, and the NDH-1 single-deletion result.
The gap between the habitat-analog flux (0.2895 mmol·h<sup>−1</sup>)
and the unlimited-carbon theoretical maximum (16.33 mmol·h<sup>−1</sup>)
is where the headroom is.

**The supplier solves two problems, not one.** The strongest result in
this subsection is not the sucrose flux but the oxygen. The co-culture
raises partner growth 13-fold over strict anaerobiosis, which addresses
the constraint that the yeast and bacteria oxygen-deprivation sections
above identify as decisive for both hosts.

The co-culture arithmetic assumes steady state and that all exported
sucrose reaches the partner organism; it ignores transfer losses,
spatial gradients, competition for shared nutrients, pH coupling and
the fact that the two organisms have different optimal conditions. The
accumulation result additionally assumes sucrose is continuously
removed by a sink reaction, which is why dynamic FBA would be needed
for a realistic picture. And an open design question follows directly
from our own results: could the oxygen supply be raised further by
increasing the cyanobacteria:host ratio above 1:1? More cyanobacteria
means more and faster partner growth, but our models cannot settle it.

## Wet Lab Experiments from the Results

At the time of writing, no experimental measurement generated by our
own Wet Lab has been used as a model input, and no model prediction has
yet been tested experimentally by our team. What exists is a set of
literature- and database-derived constraints flowing into the models,
and a set of concrete, testable recommendations flowing out of them.

### What went into the models

- **CO₂/HCO₃⁻ uptake bound.** The habitat-analog CO₂/HCO₃⁻ bound of
  5.1 mmol·h<sup>−1</sup> used throughout the cyanobacterial work is
  supported by published experimental
  measurements<a class="cite" href="#ref-22">22</a>, not chosen
  for convenience.
- **CscB feasibility.** The export strategy rests on the experimentally
  validated incorporation of CscB into PCC
  7942<a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a>.
  We are modelling a strain that has been built, not a hypothetical
  one.
- **Gap-fill reaction identity.** Both reactions added to iBsu1147 were
  accepted only after literature confirmation: dihydroorotate
  dehydrogenase as a constitutively NAD-dependent Class 1B
  enzyme<a class="cite" href="#ref-11">11</a>, and NadB's
  fumarate-linked mode by direct enzymatic characterisation of the
  purified *B. subtilis*
  protein<a class="cite" href="#ref-12">12</a>. A candidate that
  lacked such evidence (ASPDH) was rejected.
- **Anaerobic yeast protocol.** Applied from the Yeast9 authors' own
  published implementation rather than reconstructed by us.
- **Knockout expectations.** The 15–300% sucrose increases reported
  under salt
  stress<a class="cite" href="#ref-17">17</a><a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-18">18</a><a class="cite" href="#ref-19">19</a>
  are what allowed us to recognise our null in-silico result as a
  method limitation rather than as evidence against the knockouts.

### Experiments the models recommend

Each item is something the Wet Lab could act on directly. The first
three are the ones we would prioritise.

<div class="card-grid">

<div>

#### 1. Build in *B. subtilis* first
5.5× higher theoretical aerobic production than yeast and a 27% rather
than 80% loss going anaerobic (Table 13 above). If resources allow only
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
grid artefact (see the yeast oxygen-deprivation section above).

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
once resources deplete (Figure 10 above).

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
  $\tau^*$ equation (see the Protein Production section above) recover
  the biologically correct answer.
- **Dual-solution sanity check.** NH₄⁺ and NO₃⁻ return identical shadow
  prices, as they must if both converge on GS-GOGAT (see the Nutrient
  Supply and Limitation section above).
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

## Limitations and Future Directions

### What these models do not capture

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
Knockout Strategy section above). Any engineering target whose benefit
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

#### The co-culture arithmetic is idealised.

Steady state, perfect sucrose transfer, no spatial gradients, no
competition, no pH coupling.

#### The induction switch is instantaneous.

Both dynamic models assume the metabolic shift at $t_{\mathrm{i}}$ is
sharp relative to the cultivation time. Real inducible systems have
induction kinetics, leakiness and a lag.

#### Protease loss is a lumped term.

$k_{\mathrm{prot}}XP$ stands in for the entire *Bacillus* extracellular
protease system without modelling any protease explicitly.

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
The calculation done for yeast (Table 3 above) has not been done for
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

#### Re-parameterise the dynamic models from the GEMs
Replacing $\mu_B = 0.40$ h<sup>−1</sup> with the FBA-derived
0.3186 h<sup>−1</sup>/0.22 h<sup>−1</sup>, and deriving yields from the
corresponding flux distributions, would make the two model classes
quantitatively consistent.

</div>

<div>

#### Model the full closed loop
We modelled cyanobacteria feeding sugar and oxygen to the host, but not
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
