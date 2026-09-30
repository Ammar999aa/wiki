# Dry Lab Overview {#sec:overview}

## The problem {#sec:problem}

Our project asks whether a nanobody can be manufactured on demand inside
a closed, resource-limited habitat rather than shipped there pre-made.
That setting, a Mars-analog or spaceflight life-support loop, changes
almost every assumption a normal bioprocess makes. Oxygen is expensive
and cannot be assumed to be abundant. Carbon feedstock cannot be trucked
in as bags of glucose. Nitrogen and phosphate have to be recovered from
what the crew already produces, principally urine. Illumination and
availability are set by the habitat, not by the engineer.

## Why computational work was necessary

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

## Three chassis models, and how they relate {#sec:how_related}

We built one genome-scale model per organism and asked each of them the
same family of questions: can it use our feedstock, can it survive our
oxygen budget, and how much protein can it make. The cyanobacterial
model plays a different role from the other two: it is not a production
host but the supplier that makes the other two viable in a closed loop.

<figure id="fig:workflow" data-latex-placement="H">

<figcaption>The three chassis models and their relationship. Each host
model answers the same three questions independently; the cyanobacterial
model supplies the feedstock that makes either host viable in a closed
loop. Only the cyanobacteria <span class="math inline">→</span> yeast
arrow corresponds to an actual numerical hand-off in this work (sucrose
and oxygen fluxes used as uptake bounds); the equivalent calculation for
<em>B. subtilis</em> has not yet been done (Sec. <a href="#sec:future"
data-reference-type="ref"
data-reference="sec:future">4.2</a>).</figcaption>
</figure>

::: {#tab:couplings}
  **Coupling**                           **What is actually passed**                                                                                                                                                                        **Strength**
  -------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  Cyanobacteria $\rightarrow$ Yeast      Sucrose export flux (0.234 and 0.8078 mmol  h^−−1^) and flux (4.2305) used as uptake bounds in the yeast GEM, giving 0.011132, 0.038429 and 0.175773  h respectively                               **Strong**: direct numerical hand-off
  Hosts $\rightarrow$ Cyanobacteria      output at the micro-aerophilic operating point (7.75 mmol  h^−−1^--9.23 mmol  h^−−1^) is a candidate carbon input to the supplier                                                                  **Identified, not yet computed**
  GEM $\rightarrow$ ODE                  Chassis selection determined which host each dynamic model was built for; $\mu = \SI{0.0854}{\per\hour}$ in the yeast ODE is described as FBA-derived                                              **Weak**: motivational; the numerical link is unverified (Sec. [2.1.4.3.6](#sec:yeast_ode_params){reference-type="ref" reference="sec:yeast_ode_params"})
  Cyanobacteria $\rightarrow$ Bacteria   Sucrose-versus-glucose per-carbon analysis (Sec. [2.2.2](#sec:bac_carbon){reference-type="ref" reference="sec:bac_carbon"}) confirms the feedstock decision does not penalise the preferred host   **Moderate**: same question, separate calculations

  : Quantitative hand-offs between the models. We distinguish strong
  couplings (a number computed in one model is used as an input in
  another) from weak ones (one model motivated another without a direct
  numerical hand-off), because presenting a weak coupling as a strong
  one would overstate the integration.
:::

## Models, software and common constraints {#sec:reproducibility}

All flux balance analysis (FBA) was performed on published,
peer-reviewed reconstructions rather than on models we built ourselves,
so that another team can start from the same public artefacts.

::: {#tab:models}
  **Organism**              **Model**                                  **Source / notes**
  ------------------------- ------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------
  *S. cerevisiae*           Yeast9 [@yeastgem]                         Anaerobic condition applied using the authors' own published protocol.
  *B. subtilis*             iBsu1147 [@ecbsu1]                         Required two reaction additions before it could grow anaerobically (Sec. [2.2.3.1](#sec:gapfill){reference-type="ref" reference="sec:gapfill"}).
  *P. pastoris*             [**\[model name\]**]{style="color: red"}   Used as a comparator for oxygen requirement and production only.
  *S. elongatus* PCC 7942   iMS837                                     Updated PCC 7942 reconstruction of Santos-Merino et al. [@santosmerino2023model] (837 genes, 887 reactions, 801 metabolites).

  : Genome-scale models used, and their provenance.
:::

Unless stated otherwise in a specific subsection, heterotrophic
simulations used a common constraint set so that chassis could be
compared on equal terms:

- glucose exchange: 5 mmol  h^−−1^;

- glycerol exchange: 0 mmol  h^−−1^;

- oxygen exchange: 10 mmol  h^−−1^ (aerobic) or 0 mmol  h^−−1^
  (anaerobic).

Cyanobacterial simulations used habitat-analog light and carbon bounds
(145   h^−−1^; / as stated per analysis).

Analysis notebooks (draft, unpolished) are available at [our Dry Lab
GitHub
repository](https://github.com/Halion1/iGEM-KAUST-Drylab/blob/master/obj2_gem/Notebooks/cyanobacteria_model.ipynb).

# Chassis Models {#sec:chassis}

## Yeast: *Saccharomyces cerevisiae* {#sec:yeast}

### Design Goals {#sec:yeast_goals}

*S. cerevisiae* is the reference eukaryotic production host: it is
GRAS-classified, easy to transform and, unlike a bacterial host, has the
secretory machinery and oxidising ER environment usually preferred for
disulfide-bonded antibody fragments. It is the chassis a team would
choose by default, which is precisely why we wanted to test it rather
than assume it.

Three things had to be established before yeast could be accepted or
rejected for a habitat application:

1.  **Can it run on our feedstock?** Glucose will not be available in a
    closed loop. The realistic in-situ sugar is sucrose from a
    photosynthetic supplier (Sec. [2.3](#sec:cyano){reference-type="ref"
    reference="sec:cyano"}), so we needed to know what yeast growth
    looks like on the sucrose fluxes that supplier can actually deliver.

2.  **Can it survive our oxygen budget?** Yeast is a facultative
    anaerobe on paper, but "survives" and "remains a useful cell
    factory" are different claims.

3.  **How much nanobody can it make, and when should we ask for it?**
    Both the steady-state ceiling and the dynamic question of induction
    timing.

All yeast work used the Yeast9 reconstruction.

### Alternative Carbon Source {#sec:yeast_carbon}

#### Method.

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
cyanobacterial model
(Sec. [2.3.3](#sec:cyano_export){reference-type="ref"
reference="sec:cyano_export"}) and applied them directly as sucrose
uptake bounds on the anaerobic Yeast9 model, then repeated the exercise
with the cyanobacterial oxygen output included as well. This is a direct
numerical hand-off between two of our models rather than a literature
assumption.

#### Result.

::: {#tab:yeast_on_sucrose}
  --------------------------------------- -------------------- -------------------- -----------------
  **Supply condition**                        **Sucrose**                            **Yeast $\mu$**
                                           **(mmol  h^−−1^)**   **(mmol  h^−−1^)**      **( h)**
  No carbon supply (anaerobic baseline)           none                  0                0.0138
  Supplier at maximum growth                     0.234                  0               0.011132
  Supplier growth-capped (preferred)             0.8078                 0             **0.038429**
  Growth-capped supplier, included            0.8078$^{*}$      $\leq 4.2305^{*}$     **0.175773**
  --------------------------------------- -------------------- -------------------- -----------------

  : Anaerobic yeast growth on cyanobacteria-derived sucrose. Each row
  uses a sucrose (and, in the last row, oxygen) flux computed from the
  engineered *S. elongatus* model as a yeast uptake bound.
:::

$^{*}$Sucrose and oxygen supplied by the same growth-capped
cyanobacterial culture; 4.2305 mmol  h^−−1^ is that culture's total
oxygen output, and the oxygen actually transferred to the yeast partner
in a real vessel would be at most this.

At the supplier's maximum-growth operating point, sucrose export is
0.234 mmol  h^−−1^ and yeast reaches 0.011132  h, at a biomass carbon
percentage of 14.9. Because uptake equals export at steady state, the
required biomass ratio is

$$\frac{\mathrm{gDW}_{\text{cyanobacteria}}}{\mathrm{gDW}_{\text{yeast}}}
= \frac{\text{sucrose uptake by yeast}}{\text{sucrose export by cyanobacteria}}
= \frac{0.234}{0.234} = 1 ,$$

assuming both models are at steady state and that all exported sucrose
reaches the yeast.

Deliberately capping the supplier's growth releases substantially more
sucrose (Sec. [2.3.3](#sec:cyano_export){reference-type="ref"
reference="sec:cyano_export"}) and raises yeast growth more than
threefold, to 0.038429  h. Including the oxygen the supplier co-produces
raises it to 0.175773  h, a **13-fold increase** over the strictly
anaerobic yeast baseline of 0.0138  h, and the single largest predicted
improvement anywhere in our Dry Lab work.

The reading is that a photosynthetic partner is not merely a sugar
workaround. It also supplies the resource that
Section [2.1.3](#sec:yeast_oxygen){reference-type="ref"
reference="sec:yeast_oxygen"} identifies as yeast's binding constraint.

### Oxygen Deprivation {#sec:yeast_oxygen}

#### Method.

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
set (Sec. [1.4](#sec:reproducibility){reference-type="ref"
reference="sec:reproducibility"}) with oxygen exchange bounded at
10 mmol  h^−−1^ versus 0. Second, a continuous sweep of the oxygen
uptake bound from zero upward, recording growth rate and secretion at
each point. Third, we defined a viability threshold as 5 % of the
aerobic maximum growth rate and located the minimum oxygen uptake that
still clears it. was tracked throughout because in our system is not
waste but the supplier's feedstock.

#### Result.

Aerobically, yeast grows at 0.40  h (a doubling roughly every 2 h).
Anaerobically it falls to 0.10  h (roughly every 7 h), a loss of about
three quarters of its growth rate.

<figure id="fig:yeast_oxygen_panel" data-latex-placement="H">
<figure id="fig:yeast_aer_anaer">
<img src="./figures/noureldin/yeast_aerobic_vs_anaerobic.png" />
<figcaption>Aerobic versus anaerobic growth.</figcaption>
</figure>
<figure id="fig:yeast_o2_sweep">
<img src="./figures/noureldin/yeast_o2_requirement_co2.png" />
<figcaption>Growth and output versus uptake.</figcaption>
</figure>
<figcaption>Oxygen dependence of <em>S. cerevisiae</em>. (a) Growth
drops from 0.40  h to 0.10  h on removing oxygen. (b) Growth rate (left
axis, blue) rises very steeply over the first fraction of a
mmol  h<sup>−−1</sup> of oxygen and then close to linearly; the 5 %
viability threshold (red dashed) is cleared almost immediately.
secretion (right axis, green) saturates much earlier than growth
does.</figcaption>
</figure>

::: {#tab:yeast_min_o2}
  **Quantity**                        **Value**     **Unit**
  ---------------------------------- ----------- --------------
  Maximum growth rate                  0.4091           h
  Viability threshold (5 % of max)     0.0205           h
  Minimum viable uptake                0.0503     mmol  h^−−1^
  Growth rate at that point            0.0917           h
  output at that point                 7.7513     mmol  h^−−1^

  : Minimum viable oxygen analysis for *S. cerevisiae*. The viability
  threshold is 5 % of the aerobic maximum.
:::

The shape of Figure [3](#fig:yeast_o2_sweep){reference-type="ref"
reference="fig:yeast_o2_sweep"} is the important part. Growth rises so
steeply out of zero that a trickle of oxygen, 0.0503 mmol  h^−−1^,
already brings yeast to 0.0917  h, more than four times its own
viability threshold and close to its strict-anaerobic rate. The design
target for a habitat is therefore not "aerobic or anaerobic" but "how
little oxygen can we get away with", and the answer is: very little.

### Protein Production {#sec:yeast_protein}

Growth is a proxy. This subsection addresses production directly, in two
parts: the steady-state ceiling (how much *can* yeast make) and the
dynamic question (*when* should we ask it to).

#### Method: steady-state capacity (FBA).

We re-optimised the model for combined recombinant protein output (GFP
plus anti-GFP nanobody) across the same oxygen range used in
Section [2.1.3](#sec:yeast_oxygen){reference-type="ref"
reference="sec:yeast_oxygen"}, and separately computed the maximum
theoretical production flux for each of our two nanobody constructs,
Nb14 and Nb1_gbHSV, under aerobic and anaerobic conditions.

#### Result: steady-state capacity.

At the minimum viable oxygen uptake, combined GFP $+$ nanobody flux is
0.0035 mmol  h^−−1^.

::: {#tab:yeast_nb}
  **Construct**    **Aerobic**   **Anaerobic**   **Loss**
  --------------- ------------- --------------- -----------
  Nb14               0.0068         0.0014       $-79\,\%$
  Nb1_gbHSV          0.0076         0.0015       $-80\,\%$

  : Maximum theoretical nanobody production flux (mmol  h^−−1^) in
  *S. cerevisiae*.
:::

<figure id="fig:yeast_nb_panel" data-latex-placement="H">
<figure>
<img src="./figures/noureldin/yeast_max_nanobody_production.png" />
<figcaption>Maximum nanobody flux by construct.</figcaption>
</figure>
<figure>
<img src="./figures/noureldin/yeast_combined_production_vs_o2.png" />
<figcaption>Combined GFP <span class="math inline">+</span> nanobody
flux versus .</figcaption>
</figure>
<figcaption>Nanobody production capacity in <em>S. cerevisiae</em>. (a)
Both constructs lose roughly 80 % of their production capacity on
removing oxygen. (b) Combined output rises with oxygen uptake and
saturates near 7.5 mmol  h<sup>−−1</sup>; the minimum viable cutoff is
marked in orange. Note the <span
class="math inline"><em>y</em></span>-axis maximum of
0.008 mmol  h<sup>−−1</sup>, an order of magnitude below the equivalent
<em>B. subtilis</em> figure (Fig. <a href="#fig:bac_nb_panel"
data-reference-type="ref"
data-reference="fig:bac_nb_panel">17</a>).</figcaption>
</figure>

Nb1_gbHSV is consistently, if marginally, easier to produce than Nb14.
The effect is small ($\approx 10$ %) but systematic across both oxygen
conditions, which is what one expects from Nb1_gbHSV having fewer amino
acids, and so less precursor and ATP demand per molecule, rather than
from noise.

#### Method: dynamic production and induction timing (ODE).

FBA gives a ceiling, not a protocol. It assumes a steady state by
construction: it reports rates, not trajectories, and has no notion of a
batch that starts, depletes its medium and is harvested. Yet the timing
question is not a detail. Overexpressing a recombinant nanobody is a
physiological burden on the host: high-level transcription and
translation hijack the host's core cellular machinery, and that burden
restricts growth [@kastberg2022burden]. The standard bioprocess response
is an inducible promoter, which separates biomass accumulation from
recombinant protein production [@pan2022pichia; @kastberg2022burden]: an
uninduced growth phase in which cells replicate at their maximum
specific growth rate $\mu$ to build the cell factory, followed by a
production phase in which synthesis is triggered and the growth rate
falls to a constrained value $\beta\mu$.

Induce too early and there are too few cells to produce with; too late
and there is no time left before harvest. We therefore built two ODE
models:

- **Model 1**, an analytical induction model assuming resources are not
  limiting, solvable in closed form so that the structure of the optimum
  can be seen algebraically;

- **Model 2**, a five-state extension adding sugar, dissolved oxygen and
  headspace oxygen limitation, so that the batch can actually run out of
  things.

*Note on scope.* The mathematical framework developed here is shared
with the *Bacillus* model in
Section [2.2.4](#sec:bac_protein){reference-type="ref"
reference="sec:bac_protein"}; it is derived once, in full, at this
point, and that section presents only the host-specific extensions.

::: {#tab:yeast_state_variables}
  **Symbol**   **Description**                            **Unit**
  ------------ ------------------------------------------ ---------------
  $X(t)$       Biomass concentration                      g l^−1^
  $P(t)$       Nanobody concentration                     mg l^−1^
  $S(t)$       Sugar/substrate concentration (Model 2)    g l^−1^
  $O(t)$       Dissolved oxygen concentration (Model 2)   dimensionless
  $O_g(t)$     Headspace oxygen concentration (Model 2)   dimensionless

  : State variables in the yeast dynamic models (Models 1 and 2).
:::

##### Model 1: biomass dynamics.

Assuming a sharp transition post-induction, where the metabolic shift
occurs rapidly relative to the total cultivation time, biomass follows
exponential growth with a time-dependent effective rate:
$$\begin{equation}
    \frac{dX(t)}{dt} = \mu_{\mathrm{e}}(t) \, X(t),
    \label{eq:dXdt}
\end{equation}$$ $$\begin{equation}
    \mu_{\mathrm{e}}(t) = \begin{cases}
        \mu,        & t < t_{\mathrm{i}} \\
        \beta \, \mu, & t \geq t_{\mathrm{i}}
    \end{cases}
    \label{eq:mu_switch}
\end{equation}$$ where $\mu$ is the maximum attainable growth rate and
$0 \leq \beta \leq 1$ controls how much growth is impaired by nanobody
production. Biologically, $\beta$ is the burden parameter: $\beta = 1$
means expression is free, $\beta = 0$ means it stops the cells dividing
entirely.

Integrating gives $$\begin{equation}
    X(t) = \begin{cases}
        X_0 \, e^{\mu t}, & t < t_{\mathrm{i}} \\
        X_0 \, e^{\mu \left[t_{\mathrm{i}} + \beta (t - t_{\mathrm{i}})\right]}, & t \geq t_{\mathrm{i}}
    \end{cases}
    \label{eq:X_burden_solution}
\end{equation}$$ and, writing $X_{\mathrm{i}}$ for the biomass at the
moment of induction, the post-induction profile simplifies to
$$\begin{equation}
    X(t) = X_{\mathrm{i}} \, e^{\beta \mu (t - t_{\mathrm{i}})} .
    \label{eq:X_post_ind}
\end{equation}$$

##### Model 1: nanobody production.

The product evolves according to a production--degradation balance:
nothing is made before induction, and afterwards nanobody accumulates in
proportion to active biomass while being lost by first-order processes
such as proteolytic degradation or chemical denaturation:
$$\begin{equation}
    \frac{dP(t)}{dt} = q_{\mathrm{e}}(t) \, X(t) - k_d \, P(t),
    \qquad
    q_{\mathrm{e}}(t) = \begin{cases}
        0, & t < t_{\mathrm{i}} \\
        q, & t \geq t_{\mathrm{i}}
    \end{cases}
    \label{eq:dPdt}
\end{equation}$$ with $q$ the production rate per unit active biomass
and $k_d$ the first-order loss rate constant.

Substituting
Eq. [\[eq:X_post_ind\]](#eq:X_post_ind){reference-type="eqref"
reference="eq:X_post_ind"} gives a linear first-order ODE,
$$\begin{equation}
    \frac{dP(t)}{dt} = q \, X_{\mathrm{i}} \, e^{\beta \mu (t - t_{\mathrm{i}})} - k_d \, P(t),
    \qquad t \geq t_{\mathrm{i}},
    \label{eq:P_ode_burden}
\end{equation}$$ which, with an integrating factor and the initial
condition $P(t_{\mathrm{i}}) = 0$, has the explicit solution
$$\begin{equation}
    P(t) = \frac{q \, X_{\mathrm{i}}}{\beta \, \mu + k_d}
    \left[ e^{\beta \mu(t - t_{\mathrm{i}})} - e^{-k_d (t - t_{\mathrm{i}})} \right],
    \qquad t \geq t_{\mathrm{i}}.
    \label{eq:P_burden_solution}
\end{equation}$$ The two exponentials have a direct physical reading:
the first is biomass-driven production, the second is product loss.

##### Model 1: the optimal induction time.

For a batch of fixed total duration $T$, evaluating
Eq. [\[eq:P_burden_solution\]](#eq:P_burden_solution){reference-type="eqref"
reference="eq:P_burden_solution"} at $t = T$ and substituting
$X_{\mathrm{i}}$ gives the harvest titre as a function of induction
time: $$\begin{equation}
    P(T; t_{\mathrm{i}}) = \frac{q \, X_0}{k_d + \beta \, \mu} \, e^{\mu t_{\mathrm{i}}}
    \left[ e^{\beta \mu (T - t_{\mathrm{i}})} - e^{-k_d (T - t_{\mathrm{i}})} \right] .
    \label{eq:P_objective}
\end{equation}$$

It is more convenient to work with the *production phase duration*
$\tau \coloneqq T - t_{\mathrm{i}}$, with $0 \leq \tau \leq T$.
Substituting $t_{\mathrm{i}} = T - \tau$: $$\begin{equation}
    P(\tau) = C \left[ e^{-(1 - \beta) \, \mu \tau} - e^{-(\mu + k_d)\tau} \right] ,
    \qquad
    C \coloneqq \frac{q \, X_0}{k_d + \beta \, \mu} \, e^{\mu T}.
    \label{eq:P_tau}
\end{equation}$$

Differentiating and setting to zero, $$\begin{equation}
    \frac{dP}{d\tau} = C \left[ -(1 - \beta) \, \mu e^{-(1 - \beta) \mu \tau}
    + (\mu + k_d) e^{-(\mu + k_d) \tau} \right] = 0 ,
    \label{eq:dPdtau}
\end{equation}$$ which for non-trivial conditions ($C \neq 0$) reduces
to balancing the exponential decay weight of the growth penalty against
that of product loss, $$\begin{equation}
    (1 - \beta) \, \mu \, e^{-(1 - \beta)\mu \tau} = \left(\mu + k_d\right) e^{-(\mu + k_d) \tau} .
    \label{eq:optimality_condition}
\end{equation}$$ Taking logarithms and isolating $\tau$ gives the
optimal production duration $$\begin{equation}
    \boxed{\;\tau^* = \frac{1}{\beta \, \mu + k_d}
    \ln\!\left( \frac{\mu + k_d}{(1 - \beta) \, \mu} \right)\;}
    \label{eq:tau_star}
\end{equation}$$ and hence the optimal induction time $$\begin{equation}
    t_{\mathrm{i}}^* = T - \tau^*.
    \label{eq:tind_star}
\end{equation}$$

Since $\mu + k_d > (1 - \beta)\mu$ reduces trivially to
$\beta\mu + k_d > 0$, the logarithm is well defined under standard
conditions. If induction causes any growth deceleration
($0 < \beta < 1$), the argument exceeds unity and $\tau^* > 0$ is
guaranteed: there is always a genuine interior optimum.

##### Model 1: limiting cases as a validation check.

Because Eq. [\[eq:tau_star\]](#eq:tau_star){reference-type="eqref"
reference="eq:tau_star"} is closed-form, we can check it against limits
that are independently interpretable on biological grounds. This is the
validation available to a purely analytical model, and it is worth doing
explicitly.

- **Negligible burden ($\beta \to 1$).** The denominator of the
  logarithm approaches zero, so $\tau^* \to \infty$; with no
  burden--productivity trade-off the objective increases monotonically
  with production time and the constrained optimum collapses to the
  boundary $\tau = T$. A low-burden product should be induced from the
  start of the batch and left on, which is the correct and obvious
  answer.

- **Complete growth arrest ($\beta \to 0$).** The toxic, high-level
  expression case. Setting $\beta = 0$, $$\begin{equation}
          \tau^* = \frac{1}{k_d} \ln\!\left(1 + \frac{k_d}{\mu}\right),
          \label{eq:tau_star_muprod0}
  \end{equation}$$ a finite, strictly positive optimum. Even when
  production stops growth completely, it is still worth inducing before
  the very end of the batch.

- **No product degradation ($k_d \to 0$).** For a highly stable
  construct, $$\begin{equation}
          \tau^* = \frac{1}{\beta \, \mu} \ln\!\left(\frac{1}{1 - \beta}\right).
          \label{eq:tau_star_kd0}
  \end{equation}$$ An optimum still exists, governed purely by the
  interplay between the uninduced and production-phase growth rates.
  With no degradation the only reason to delay induction is to
  accumulate biomass, so the trade-off becomes purely cell density at
  induction versus length of the production phase.

All three limits recover the biologically sensible answer, which gives
reasonable confidence that
Eq. [\[eq:tau_star\]](#eq:tau_star){reference-type="eqref"
reference="eq:tau_star"} is not an artefact of the algebra.

##### Model 2: adding finite resources.

Model 1 assumes unlimited substrate and fixed specific rates; a closed
batch vessel has neither. Model 2 adds a depletable sugar pool $S(t)$,
dissolved oxygen $O(t)$ and a headspace oxygen reservoir $O_g(t)$ that
replenishes the liquid phase, with growth and production each scaled by
a multiplicative Monod-type saturation function [@monod1949growth]:
$$\begin{align}
    \Phi_X(S, O) &\coloneqq \frac{S}{K_{S,X} + S} \cdot \frac{O}{K_{O,X} + O},
    &
    \Phi_P(S, O) &\coloneqq \frac{S}{K_{S,P} + S} \cdot \frac{O}{K_{O,P} + O},
    \label{eq:phi_yeast}
\end{align}$$ each lying in $[0,1]$. Distinct half-saturation constants
are used for growth and production because the two processes need not
have the same substrate affinity. The coupled system is $$\begin{align}
    \frac{dX}{dt} &= \mu_{\mathrm{e}}(t) \, \Phi_X \, X,
    \label{eq:m2_X} \\[2pt]
    \frac{dP}{dt} &= q_{\mathrm{e}}(t) \, \Phi_P \, X - k_d \, P,
    \label{eq:m2_P} \\[2pt]
    \frac{dS}{dt} &= -\left( \frac{\mu_{\mathrm{e}}(t) \, \Phi_X}{Y_{X/S}}
                   + \frac{q_{\mathrm{e}}(t) \, \Phi_P}{Y_{P/S}} \right) X,
    \label{eq:m2_S} \\[2pt]
    \frac{dO}{dt} &= k_La\left(\alpha O_{g} - O\right)
                   - \left( \frac{\mu_{\mathrm{e}}(t) \, \Phi_X}{Y_{X/O}}
                   + \frac{q_{\mathrm{e}}(t) \, \Phi_P}{Y_{P/O}} \right) X,
    \label{eq:m2_O} \\[2pt]
    \frac{dO_{g}}{dt} &= -\frac{k_La \, V_{l}}{V_{g}} \left(\alpha O_{g} - O\right),
    \label{eq:m2_Og}
\end{align}$$ where $Y_{\cdot/\cdot}$ are stoichiometric yield
coefficients, $V_{l}$ and $V_{g}$ the liquid and headspace volumes,
$\alpha$ converts headspace oxygen into an equivalent liquid saturation
concentration, and $k_La$ is the volumetric mass-transfer coefficient
combining the liquid-side transfer coefficient and the specific
interfacial area [@garciaochoa2009oxygen]. The system was integrated
numerically from the initial conditions in
Table [7](#tab:yeast_parameters){reference-type="ref"
reference="tab:yeast_parameters"}.

::: {#tab:yeast_parameters}
+--------------------+-------------------+-----------+-----------------+
| **Symbol**         | **Description**   | **Value** | **Unit**        |
+:===================+:==================+:==========+:================+
| *Kinetic and operational*                                            |
+--------------------+-------------------+-----------+-----------------+
| $X_0$              | Initial biomass   | 0.10      | g l^−1^         |
+--------------------+-------------------+-----------+-----------------+
| $\mu^{\dagger}$    | Maximum specific  | 0.0854    |  h              |
|                    | growth rate       |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $\beta$            | Post-induction    | 0.50      | --              |
|                    | growth factor     |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $q$                | Specific nanobody | 0.05      | mg g h^−−1^     |
|                    | production rate   |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $k_d$              | Product           | 0.010     |  h              |
|                    | degradation/loss  |           |                 |
|                    | rate              |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $T$                | Total cultivation | 48        | h               |
|                    | time              |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $t_{\mathrm{ind}}$ | Example induction | 10        | h               |
|                    | time, Model 2     |           |                 |
+--------------------+-------------------+-----------+-----------------+
| *Monod constants*                                                    |
+--------------------+-------------------+-----------+-----------------+
| $K_{S,X}$          | Sugar Monod       | 0.50      | simulation unit |
|                    | constant, growth  |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $K_{O,X}$          | Oxygen Monod      | 0.05      | simulation unit |
|                    | constant, growth  |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $K_{S,P}$          | Sugar Monod       | 0.50      | simulation unit |
|                    | constant,         |           |                 |
|                    | production        |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $K_{O,P}$          | Oxygen Monod      | 0.05      | simulation unit |
|                    | constant,         |           |                 |
|                    | production        |           |                 |
+--------------------+-------------------+-----------+-----------------+
| *Yields*                                                             |
+--------------------+-------------------+-----------+-----------------+
| $Y_{X/S}$          | Biomass yield on  | 0.50      | g g^−1^         |
|                    | sugar             |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $Y_{P/S}$          | Nanobody yield on | 0.20      | mg g^−1^        |
|                    | sugar             |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $Y_{X/O}$          | Biomass yield on  | 0.50      | simulation unit |
|                    | oxygen            |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $Y_{P/O}$          | Nanobody yield on | 0.20      | simulation unit |
|                    | oxygen            |           |                 |
+--------------------+-------------------+-----------+-----------------+
| *Oxygen transfer and vessel*                                         |
+--------------------+-------------------+-----------+-----------------+
| $k_La$             | Oxygen mass       | 0.20      |  h              |
|                    | transfer          |           |                 |
|                    | coefficient       |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $\alpha$           | Gas--liquid       | 1.00      | --              |
|                    | oxygen partition  |           |                 |
|                    | coefficient       |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $V_l$              | Liquid volume     | 1.00      | L               |
+--------------------+-------------------+-----------+-----------------+
| $V_g$              | Headspace volume  | 1.00      | L               |
+--------------------+-------------------+-----------+-----------------+
| *Initial conditions*                                                 |
+--------------------+-------------------+-----------+-----------------+
| $P_0$              | Initial nanobody  | 0.00      | mg l^−1^        |
+--------------------+-------------------+-----------+-----------------+
| $S_0$              | Initial sugar     | 10.0      | simulation unit |
+--------------------+-------------------+-----------+-----------------+
| $O_0$              | Initial dissolved | 1.00      | dimensionless   |
|                    | oxygen            |           |                 |
+--------------------+-------------------+-----------+-----------------+
| $O_{g,0}$          | Initial headspace | 1.00      | dimensionless   |
|                    | oxygen            |           |                 |
+--------------------+-------------------+-----------+-----------------+

: Parameter values used in the yeast dynamic models. $^{\dagger}$ marks
the FBA/GEM-informed growth-rate estimate; all remaining values are
illustrative simulation settings, not strain-specific fitted parameters.
:::

##### Parameter provenance. {#sec:yeast_ode_params}

We separate parameter classes explicitly rather than presenting them as
one undifferentiated table:

- **FBA/GEM-informed:** the maximum specific growth rate,
  $\mu = \SI{0.0854}{\per\hour}$, taken from the FBA-derived growth
  estimate.

- **Literature-derived:** none of the numerical values was taken
  directly from a specific publication. The *model structure* is
  literature-supported (Monod kinetics for nutrient-limited
  growth [@monod1949growth], $k_La$-based oxygen
  transfer [@garciaochoa2009oxygen]), but the numbers are not.

- **Fitted/calibrated:** none.

- **Assumed:** everything else, meaning all Monod constants, yields,
  transfer coefficients and initial conditions.

These models should therefore be read as **qualitative models that
demonstrate the induction-timing trade-off and the effect of finite
sugar and oxygen availability**, not as calibrated predictive models of
our strain. We state this prominently because quoting a specific optimal
induction time as though it were a prediction would be misleading.

#### Result: dynamic production.

<figure id="fig:yeast_model1_induction_times" data-latex-placement="H">
<img src="./Yeast/yeast_model1_induction_times.png"
style="width:88.0%" />
<figcaption>Analytical model (Model 1): biomass (left) and nanobody
concentration (right) for a range of induction times over a 48 h batch.
Early induction gives a long production window but a small cell
population to produce with; late induction gives a large population but
little time. The dashed trajectory is the analytically predicted optimum
<span
class="math inline"><em>t</em><sub>i</sub><sup>*</sup> = 32.7 h</span>
from Eq. <a href="#eq:tind_star" data-reference-type="eqref"
data-reference="eq:tind_star">[eq:tind_star]</a>, which reaches a final
titre comparable to much earlier induction while leaving substantially
more biomass, the visual signature of a genuine interior
optimum.</figcaption>
</figure>

<figure id="fig:yeast_panel" data-latex-placement="H">
<figure id="fig:yeast_constitutive_vs_inducible">
<img src="./Yeast/yeast_constitutive_vs_inducible.png" />
<figcaption>Constitutive versus inducible production.</figcaption>
</figure>
<figure id="fig:yeast_resource_simulation">
<img src="./Yeast/yeast_resource_simulation.png" />
<figcaption>Resource-depleting simulation (Model 2).</figcaption>
</figure>
<figure id="fig:yeast_induction_scan">
<img src="./Yeast/yeast_induction_scan.png" />
<figcaption>Induction-time scan.</figcaption>
</figure>
<figure id="fig:yeast_heatmap">
<img src="./Yeast/yeast_yield_loss_heatmap.png" />
<figcaption>Nanobody production landscape.</figcaption>
</figure>
<figcaption>Yeast dynamic simulation results. (a) Inducible expression
at <span
class="math inline"><em>t</em><sub>i</sub><sup>*</sup> = 32.7 h</span>
overtakes constitutive expression (<span
class="math inline"><em>t</em><sub>i</sub> = 0</span>) before harvest,
despite producing nothing for the first two thirds of the batch. This is
the case for an inducible promoter, made quantitatively. (b) Model 2
dynamics (normalised): biomass, product, sugar, dissolved oxygen and
headspace oxygen, with induction at 10 h. Sugar and dissolved oxygen are
driven toward exhaustion in the second half of the batch, at which point
biomass and product both stall, behaviour Model 1 cannot produce. (c)
Final product versus induction time under resource limitation. Unlike
the analytical case, the curve decreases monotonically: once resources
are finite, delaying induction only wastes substrate. (d) Nanobody
concentration across cultivation time and induction time.</figcaption>
</figure>

The two models disagree, and the disagreement is the point. Under ideal
conditions the analytical model favours late induction
($t_{\mathrm{i}}^* = \SI{32.7}{\hour}$ of a 48 h batch); under resource
limitation, the induction-time scan
(Fig. [9](#fig:yeast_induction_scan){reference-type="ref"
reference="fig:yeast_induction_scan"}) favours early induction. The
reason is that Model 1 has no way for the batch to run out of anything,
so delaying induction is free; once sugar and oxygen deplete, biomass
accumulated late in the batch cannot be converted into product because
the substrate to make it from is gone.

**Any induction time derived from a resource-unlimited model is an upper
bound on how long one should wait, not a recommendation.**

### A Second Yeast: *Pichia pastoris* {#sec:pichia}

#### Method.

*P. pastoris* is the other standard yeast expression host and is
frequently preferred over *S. cerevisiae* for recombinant protein
yield [@pan2022pichia]. We ran the same oxygen-requirement and
combined-production analyses on it as a comparator, under the same 5 %
viability convention.

#### Result.

::: {#tab:pichia}
  **Quantity**                                     ***P. pastoris***   ***S. cerevisiae***
  ----------------------------------------------- ------------------- ---------------------
  Maximum growth rate ( h)                              0.5806               0.4091
  Viability threshold, 5 % of max ( h)                  0.0290               0.0205
  Minimum viable (mmol  h^−−1^)                         0.0503               0.0503
  Growth at that point ( h)                             0.0744               0.0917
  output there (mmol  h^−−1^)                           9.1898               7.7513
  Combined GFP $+$ Nb flux there (mmol  h^−−1^)         0.0016               0.0035

  : Minimum viable oxygen analysis for *P. pastoris*, alongside
  *S. cerevisiae* for comparison.
:::

<figure id="fig:pichia_panel" data-latex-placement="H">
<figure>
<img src="./figures/noureldin/pastoris_o2_requirement_co2.png" />
<figcaption>Growth and output versus uptake.</figcaption>
</figure>
<figure>
<img src="./figures/noureldin/pastoris_combined_production_vs_o2.png" />
<figcaption>Combined GFP <span class="math inline">+</span> nanobody
flux versus .</figcaption>
</figure>
<figcaption><em>P. pastoris</em> oxygen dependence. Its aerobic growth
advantage (0.5806  h, the highest of any chassis tested) does not
survive oxygen restriction: at the minimum viable oxygen point it grows
more slowly than <em>S. cerevisiae</em> and produces less than half the
combined protein flux.</figcaption>
</figure>

*P. pastoris* is the fastest grower of any chassis we tested
aerobically, doubling roughly every 1.25 h. Under oxygen restriction
that advantage disappears entirely: 0.0744  h against 0.0917  h for
*S. cerevisiae*, and a combined production flux of 0.0016 mmol  h^−−1^,
less than half. It was therefore not carried forward, and no
per-construct nanobody or dynamic analysis was run for it.

### Discussion {#sec:yeast_discussion}

Yeast is a workable but fragile choice for this application, and the
three analyses agree on why.

**It can run on our feedstock, but only just.** Anaerobic yeast on the
sucrose a growth-capped cyanobacterial supplier can deliver reaches
0.038429  h. That is a viable culture, not a productive one.

**Oxygen is its binding constraint, and the constraint is steep.**
Removing oxygen costs three quarters of the growth rate and roughly 80 %
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
induction-timing framework
(Eqs. [\[eq:tau_star\]](#eq:tau_star){reference-type="ref"
reference="eq:tau_star"}--[\[eq:tind_star\]](#eq:tind_star){reference-type="ref"
reference="eq:tind_star"}) is host-agnostic and is reused for
*B. subtilis* in Section [2.2.4](#sec:bac_protein){reference-type="ref"
reference="sec:bac_protein"}. And the finding that a resource-unlimited
model recommends late induction while a resource-limited one recommends
early induction is a general caution, not a yeast-specific result.

**What this analysis does not say.** FBA measures metabolic capacity,
not protein quality. Yeast's conventional advantages for antibody
fragments (ER-based disulfide-bond formation, glycosylation, efficient
secretion) are invisible to a stoichiometric model, and none of the
numbers above should be read as evidence against them. See
Section [4](#sec:limitations){reference-type="ref"
reference="sec:limitations"}.

## Bacteria: *Bacillus subtilis* {#sec:bacteria}

### Design Goals {#sec:bac_goals}

*Bacillus* species are Gram-positive bacteria widely used as microbial
cell factories because they grow rapidly and secrete proteins directly
into the culture medium [@schallmey2004bacillus; @cui2018bacillus], an
advantage for downstream processing in a habitat, where every
purification step is mass and power that has to be launched.

More importantly for our application, *B. subtilis* has genuine
anaerobic capability that yeast lacks. It grows anaerobically through
two routes [@nakano1998anaerobic]: anaerobic respiration using
nitrate/nitrite as the terminal electron acceptor, via a respiratory
nitrate reductase encoded by the `narGHJI` operon together with specific
nitrite reductases; and, when external electron acceptors are entirely
absent, mixed acid--butanediol fermentation, producing lactate, acetate
and 2,3-butanediol without formate.

We asked the same three questions of *B. subtilis* as of yeast: can it
run on cyanobacteria-derived sucrose, can it survive our oxygen budget,
and how much nanobody can it make and when. All work used the iBsu1147
reconstruction, which, as
Section [2.2.3.1](#sec:gapfill){reference-type="ref"
reference="sec:gapfill"} describes, could not answer the second question
at all until we repaired it.

### Alternative Carbon Source {#sec:bac_carbon}

#### Method.

Having established in Section [2.3](#sec:cyano){reference-type="ref"
reference="sec:cyano"} that our in-situ feedstock will be sucrose rather
than glucose, we needed to know what that substitution costs this
chassis. We computed maximum growth rate on each substrate under both
aerobic and anaerobic conditions and, more informatively, normalised
each by the carbon delivered, giving a growth yield per mmol of carbon.
The normalisation matters because sucrose is a disaccharide: it delivers
twice the carbon per molecule taken up, so a raw comparison of growth
rates would flatter it for trivial reasons.

#### Result.

<figure id="fig:glc_vs_suc" data-latex-placement="H">
<img src="./glucose_vs_suc_bascillus.png" style="width:88.0%" />
<figcaption>Glucose versus sucrose for <em>B. subtilis</em>: total
growth rate (left pair of panels) and growth per mmol of carbon (right
pair), under aerobic and anaerobic conditions. Sucrose wins on total
growth in both conditions; per carbon atom the two are equivalent
anaerobically, but glucose is the better substrate
aerobically.</figcaption>
</figure>

Sucrose supports higher **total** growth than glucose in both
conditions. The per-carbon picture is the one that matters:

- **Anaerobically**, per-carbon efficiency is nearly identical between
  the two substrates: about 0.0046  h ^−1^ in both cases. Sucrose's
  growth advantage anaerobically therefore comes entirely from
  delivering more carbon per unit of uptake, rather than from being
  metabolised more efficiently per carbon atom.

- **Aerobically**, glucose is the more carbon-efficient substrate
  (0.0106 versus 0.0075  h ^−1^).

In a closed habitat the scarce quantity is carbon atoms, not uptake
events. The anaerobic per-carbon equivalence therefore says that
switching to a cyanobacteria-derived sucrose feedstock costs this
chassis nothing in the regime our project actually operates in. The
feedstock decision does not compromise the chassis decision. Aerobically
there would be a real per-carbon penalty, worth remembering if the
project ever moves toward a better-aerated design.

### Oxygen Deprivation {#sec:bac_oxygen}

#### Method: repairing the model before we could ask the question. {#sec:gapfill}

The iBsu1147 reconstruction is validated aerobically, but with oxygen
uptake set to zero it produced *zero* biomass flux. Since *B. subtilis*
is known to grow anaerobically
(Sec. [2.2.1](#sec:bac_goals){reference-type="ref"
reference="sec:bac_goals"}), this was a model gap, not biology, and it
had to be fixed before any oxygen analysis was possible.

Diagnosis proceeded in stages:

1.  We first confirmed that nitrate was actually being consumed (flux
    $\approx 1$), verifying that the anaerobic respiration route itself
    was open. The failure was therefore downstream, in biomass precursor
    synthesis.

2.  Searching biomass components one at a time was slow, so we switched
    to a systematic screen: every reaction active aerobically but dead
    anaerobically, filtered for those touching `o2_c`.

3.  That screen returned five reactions. CAT, O2t and CYOO3 (catalase,
    oxygen transport, aerobic terminal oxidase) are *supposed* to die
    anaerobically and were discarded as expected. Two were genuine
    problems because they had no alternative anaerobic route in the
    model: **ASPO6**, an -dependent step in de novo synthesis, and
    **DHORDfum**, an -dependent step in pyrimidine synthesis.

4.  To confirm these two were sufficient to explain the failure, we
    opened free exchanges for their products. alone: growth $= 0$.
    Orotate alone: growth $= 0$. **Both together: 0.224  h**. Growth
    resumed, at a plausible fraction of the aerobic rate.

Having localised the gap, we did not simply insert generic bypasses.
Each replacement had to be defensible as a real *B. subtilis* enzyme:

- **DHORDfum $\rightarrow$ DHORDnad.** We identified DHORDnad
  (NAD-dependent dihydroorotate dehydrogenase, EC 1.3.1.14, BSU15540) in
  KEGG. This is not merely an anaerobic workaround: the literature
  confirms that *B. subtilis* dihydroorotate dehydrogenase is natively a
  Class 1B enzyme (PyrDI/PyrDII subunits) that uses as its physiological
  electron acceptor constitutively, independent of oxygen
  availability [@dhod_class1b].

- **ASPO6 $\rightarrow$ ASPOfum.** The obvious KEGG candidate for the
  route was ASPDH (NADP-dependent aspartate dehydrogenase,
  K06989/R07407), and this was the reaction used in our first pass. A
  literature check rejected it: the NadX enzyme family is specific to
  archaea and thermophiles and is structurally distinct from NadB, with
  no evidence for its presence in *B. subtilis*. We instead used the
  fumarate-linked mode of NadB/L-aspartate oxidase (BSU27870), which has
  been confirmed by direct enzymatic characterisation of purified
  *B. subtilis* NadB showing activity with both and fumarate as electron
  acceptors [@nadb_fumarate].

Both corrections were applied **unconditionally to all model
conditions**, aerobic and anaerobic, because both represent constitutive
enzyme capabilities rather than regulatory switches. Turning them on
only anaerobically would have encoded a regulatory assumption we have no
evidence for. The corrected model was packaged as a reusable function so
that every downstream analysis starts from the same object.

This sequence, *model fails $\rightarrow$ systematic diagnosis
$\rightarrow$ candidate fix $\rightarrow$ literature check rejects the
first candidate $\rightarrow$ second candidate accepted on direct
enzymatic evidence*, is a complete Design--Build--Test--Learn cycle
carried out entirely in the Dry Lab, and it is arguably the most
reusable single output of our modeling work: any team wanting an
anaerobic iBsu1147 needs these two reactions.

#### Method: the oxygen analyses.

With the corrected model, we ran the same three analyses used for yeast:
growth with oxygen exchange bounded at $[-10, 10]$ versus $[0, 10]$; a
continuous sweep of the oxygen uptake bound recording growth and output;
and location of the minimum oxygen uptake sustaining 5 % of the aerobic
maximum.

#### Result.

<figure id="fig:bac_oxygen_panel" data-latex-placement="H">
<figure id="fig:bacillus_aer_anaer">
<img src="./bascillus_aerobic_anaerobic.png" />
<figcaption>Aerobic versus anaerobic growth.</figcaption>
</figure>
<figure id="fig:bac_o2_sweep">
<img src="./min_oxygen_for_viability.png" />
<figcaption>Growth and output versus uptake.</figcaption>
</figure>
<figcaption>Oxygen dependence of <em>B. subtilis</em>. (a) Growth falls
from 0.31  h to 0.22  h on removing oxygen, a 29 % loss, against 75 %
for yeast (Fig. <a href="#fig:yeast_aer_anaer" data-reference-type="ref"
data-reference="fig:yeast_aer_anaer">2</a>). Panel (a) is non-zero only
because of the two reactions added in Section <a href="#sec:gapfill"
data-reference-type="ref" data-reference="sec:gapfill">2.2.3.1</a>; the
unrepaired model gives zero. (b) The oxygen sweep, with the 5 %
viability threshold marked.</figcaption>
</figure>

::: {#tab:bac_min_o2}
  **Quantity**                        **Value**     **Unit**
  ---------------------------------- ----------- --------------
  Maximum growth rate                  0.3186           h
  Viability threshold (5 % of max)     0.0159           h
  Minimum viable uptake                0.0503     mmol  h^−−1^
  Growth rate at that point            0.0726           h
  output at that point                 9.2262     mmol  h^−−1^

  : Minimum viable oxygen analysis for *B. subtilis*. The viability
  threshold is 5 % of the aerobic maximum.
:::

*B. subtilis* starts from a lower aerobic ceiling than yeast (0.31  h
versus 0.40  h) but loses far less on losing oxygen: a 29 % drop against
75 %. Anaerobically it doubles roughly every 3 h where yeast takes about
7 h. **The ranking of the two chassis inverts once oxygen becomes
scarce**, which is the first indication that the conventional choice is
the wrong one for this application.

Its output at the micro-aerophilic point (9.2262 mmol  h^−−1^) is also
the highest of the three hosts tested, which is relevant because in a
closed loop that is the supplier's feedstock, not waste.

### Protein Production {#sec:bac_protein}

#### Method: steady-state capacity (FBA).

As for yeast (Sec. [2.1.4](#sec:yeast_protein){reference-type="ref"
reference="sec:yeast_protein"}): combined GFP $+$ anti-GFP output swept
across oxygen, and maximum theoretical per-construct nanobody flux
aerobically and anaerobically.

#### Result: steady-state capacity.

At the minimum viable oxygen uptake, combined GFP $+$ nanobody flux is
0.0050 mmol  h^−−1^.

::: {#tab:bac_nb}
  **Construct**    **Aerobic**   **Anaerobic**   **Loss**    **Aerobic vs. yeast**
  --------------- ------------- --------------- ----------- -----------------------
  Nb14               0.0381         0.0280       $-27\,\%$        $5.6\times$
  Nb1_gbHSV          0.0423         0.0310       $-27\,\%$        $5.6\times$

  : Maximum theoretical nanobody production flux (mmol  h^−−1^) in
  *B. subtilis*, with the *S. cerevisiae* values from
  Table [5](#tab:yeast_nb){reference-type="ref"
  reference="tab:yeast_nb"} for comparison.
:::

<figure id="fig:bac_nb_panel" data-latex-placement="H">
<figure>
<img src="./figures/noureldin/bacillus_max_nanobody_production.png" />
<figcaption>Maximum nanobody flux by construct.</figcaption>
</figure>
<figure>
<img src="./figures/noureldin/bacillus_combined_production_vs_o2.png" />
<figcaption>Combined GFP <span class="math inline">+</span> nanobody
flux versus .</figcaption>
</figure>
<figcaption>Nanobody production capacity in <em>B. subtilis</em>. Note
the <span class="math inline"><em>y</em></span>-axis of panel (a)
extends to 0.045 mmol  h<sup>−−1</sup>, against
0.008 mmol  h<sup>−−1</sup> for the equivalent yeast figure (Fig. <a
href="#fig:yeast_nb_panel" data-reference-type="ref"
data-reference="fig:yeast_nb_panel">5</a>a). The two panels are not on
the same scale, and the difference between the hosts is larger than it
looks.</figcaption>
</figure>

Under optimal aerobic growth *B. subtilis* reaches 0.0423 mmol  h^−−1^
for Nb1_gbHSV against 0.0076 mmol  h^−−1^ for yeast, roughly **5.5 times
higher**. Going anaerobic costs it about 27 % of that capacity, where
yeast loses about 80 %. Since our habitat scenario is precisely the
oxygen-poor case, this is the decisive comparison.

As in yeast, Nb1_gbHSV is consistently marginally easier to produce than
Nb14, the same $\approx 10$ % systematic advantage, in the same
direction, consistent with a construct-length effect rather than noise.

#### Method: dynamic production (ODE).

The dynamic framework is the one derived in
Section [2.1.4](#sec:yeast_protein){reference-type="ref"
reference="sec:yeast_protein"};
Eqs. [\[eq:dXdt\]](#eq:dXdt){reference-type="eqref"
reference="eq:dXdt"}--[\[eq:tind_star\]](#eq:tind_star){reference-type="eqref"
reference="eq:tind_star"} apply unchanged. Two features of this host are
not captured by the yeast version, and are the *Bacillus*-specific
extensions:

1.  **Nitrogen/amino-acid precursor limitation.** A nanobody is a
    protein, so its synthesis needs not just carbon and energy but
    nitrogen-containing amino-acid precursors. We add an explicit
    precursor pool $N(t)$.

2.  **Protease-associated product loss.** *Bacillus* secretes
    extracellular proteases that can degrade heterologous
    proteins [@schallmey2004bacillus]. Rather than modelling protease
    concentration as its own state variable, we use a
    biomass-proportional loss term, which is minimal but still captures
    a genuinely *Bacillus*-specific bottleneck.

::: {#tab:bacillus_states}
  **Symbol**         **Description**                      **Unit**
  ------------------ ------------------------------------ ----------
  $X(t)$             *Bacillus* biomass concentration     g l^−1^
  $P(t)$             Nanobody concentration               mg l^−1^
  $S(t)$             Sugar/carbon-source concentration    g l^−1^
  $N(t)^{\dagger}$   Nitrogen/amino-acid precursor pool   g l^−1^
  $O(t)$             Dissolved oxygen concentration       mg l^−1^
  $O_g(t)$           Headspace oxygen concentration       mg l^−1^

  : State variables in the *Bacillus* dynamic model. $^{\dagger}$ marks
  the host-specific addition.
:::

The induction logic is unchanged from
Eq. [\[eq:mu_switch\]](#eq:mu_switch){reference-type="eqref"
reference="eq:mu_switch"}, with host-specific symbols:
$$\begin{equation}
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
\label{eq:switch_bacillus}
\end{equation}$$ where $\mu_B$ is the maximum specific growth rate,
$\beta_B \in (0,1]$ the post-induction burden factor, and $q_B$ the
specific production rate per unit biomass.

The saturation functions now carry three factors instead of two:
$$\begin{align}
\Phi_X(S,N,O) &= \frac{S}{K_{S,X}+S} \cdot \frac{N}{K_{N,X}+N} \cdot \frac{O}{K_{O,X}+O},
\label{eq:phi_x_bacillus} \\[2pt]
\Phi_P(S,N,O) &= \frac{S}{K_{S,P}+S} \cdot \frac{N}{K_{N,P}+N} \cdot \frac{O}{K_{O,P}+O}.
\label{eq:phi_p_bacillus}
\end{align}$$ Values near 1 mean weak limitation; values near 0 mean
strong limitation. The multiplicative form encodes the assumption that
the resources are non-substitutable: running out of any one of them
stops the process, regardless of how much of the others remains.

The complete six-state system is $$\begin{align}
\frac{dX}{dt} &= \mu_e(t)\,\Phi_X(S,N,O)\,X
\label{eq:dxdt_bacillus} \\[4pt]
\frac{dP}{dt} &= q_e(t)\,\Phi_P(S,N,O)\,X
               - \left(k_{d,0}+k_{\mathrm{prot}}X\right)P
\label{eq:dpdt_bacillus} \\[4pt]
\frac{dS}{dt} &= - \left( \frac{\mu_e(t)\Phi_X(S,N,O)}{Y_{X/S}}
               + \frac{q_e(t)\Phi_P(S,N,O)}{Y_{P/S}} \right)X
\label{eq:dsdt_bacillus} \\[4pt]
\frac{dN}{dt} &= - \left( \frac{\mu_e(t)\Phi_X(S,N,O)}{Y_{X/N}}
               + \frac{q_e(t)\Phi_P(S,N,O)}{Y_{P/N}} \right)X
\label{eq:dndt_bacillus} \\[4pt]
\frac{dO}{dt} &= k_La(\alpha O_g-O)
               - \left( \frac{\mu_e(t)\Phi_X(S,N,O)}{Y_{X/O}}
               + \frac{q_e(t)\Phi_P(S,N,O)}{Y_{P/O}} \right)X
\label{eq:dodt_bacillus} \\[4pt]
\frac{dO_g}{dt} &= - \frac{k_LaV_l}{V_g}(\alpha O_g-O)
\label{eq:dogdt_bacillus}
\end{align}$$

Reading these biologically:
Eq. [\[eq:dxdt_bacillus\]](#eq:dxdt_bacillus){reference-type="eqref"
reference="eq:dxdt_bacillus"} says biomass grows at the effective rate,
throttled by whichever resource is scarcest.
Eq. [\[eq:dpdt_bacillus\]](#eq:dpdt_bacillus){reference-type="eqref"
reference="eq:dpdt_bacillus"} is the key *Bacillus* equation: product is
made in proportion to active biomass, and lost both to baseline
degradation ($k_{d,0}P$) *and* to a term proportional to biomass itself
($k_{\mathrm{prot}}XP$). That second term means the very thing that
makes product also destroys it, so a dense culture is not unambiguously
good.
Eqs. [\[eq:dsdt_bacillus\]](#eq:dsdt_bacillus){reference-type="eqref"
reference="eq:dsdt_bacillus"}--[\[eq:dndt_bacillus\]](#eq:dndt_bacillus){reference-type="eqref"
reference="eq:dndt_bacillus"} debit carbon and nitrogen for both growth
and production;
Eqs. [\[eq:dodt_bacillus\]](#eq:dodt_bacillus){reference-type="eqref"
reference="eq:dodt_bacillus"}--[\[eq:dogdt_bacillus\]](#eq:dogdt_bacillus){reference-type="eqref"
reference="eq:dogdt_bacillus"} are the standard two-phase oxygen
balance.

The model was simulated for induction times between 0 and 48 h,
recording for each the peak nanobody concentration, the final
concentration at harvest, final biomass and remaining resources.

::: {#tab:bacillus_parameters}
+-------------------------------+---------------------+-----------+-------------+
| **Symbol**                    | **Description**     | **Value** | **Unit**    |
+:==============================+:====================+:==========+:============+
| *Kinetic*                                                                     |
+-------------------------------+---------------------+-----------+-------------+
| $\mu_B$                       | Maximum specific    | 0.40      |  h          |
|                               | growth rate         |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $\beta_B$                     | Post-induction      | 0.10      | --          |
|                               | growth factor       |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $q_B$                         | Specific nanobody   | 2.00      | mg g h^−−1^ |
|                               | production rate     |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $k_{d,0}$                     | Baseline product    | 0.010     |  h          |
|                               | degradation rate    |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $k_{\mathrm{prot}}^{\dagger}$ | Biomass-associated  | 0.005     | l g h^−−1^  |
|                               | protease loss       |           |             |
|                               | coefficient         |           |             |
+-------------------------------+---------------------+-----------+-------------+
| *Monod constants*                                                             |
+-------------------------------+---------------------+-----------+-------------+
| $K_{S,X}$                     | Sugar Monod         | 0.10      | g l^−1^     |
|                               | constant, growth    |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $K_{N,X}^{\dagger}$           | Nitrogen Monod      | 0.05      | g l^−1^     |
|                               | constant, growth    |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $K_{O,X}$                     | Oxygen Monod        | 0.10      | mg l^−1^    |
|                               | constant, growth    |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $K_{S,P}$                     | Sugar Monod         | 0.10      | g l^−1^     |
|                               | constant,           |           |             |
|                               | production          |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $K_{N,P}^{\dagger}$           | Nitrogen Monod      | 0.05      | g l^−1^     |
|                               | constant,           |           |             |
|                               | production          |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $K_{O,P}$                     | Oxygen Monod        | 0.10      | mg l^−1^    |
|                               | constant,           |           |             |
|                               | production          |           |             |
+-------------------------------+---------------------+-----------+-------------+
| *Yields*                                                                      |
+-------------------------------+---------------------+-----------+-------------+
| $Y_{X/S}$                     | Biomass yield on    | 0.50      | g g^−1^     |
|                               | sugar               |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $Y_{X/N}^{\dagger}$           | Biomass yield on    | 4.00      | g g^−1^     |
|                               | nitrogen            |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $Y_{X/O}$                     | Biomass yield on    | 0.50      | g mg^−1^    |
|                               | oxygen              |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $Y_{P/S}$                     | Nanobody yield on   | 100       | mg g^−1^    |
|                               | sugar               |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $Y_{P/N}^{\dagger}$           | Nanobody yield on   | 800       | mg g^−1^    |
|                               | nitrogen            |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $Y_{P/O}$                     | Nanobody yield on   | 100       | mg mg^−1^   |
|                               | oxygen              |           |             |
+-------------------------------+---------------------+-----------+-------------+
| *Oxygen transfer and vessel*                                                  |
+-------------------------------+---------------------+-----------+-------------+
| $k_La$                        | Oxygen mass         | 0.30      |  h          |
|                               | transfer            |           |             |
|                               | coefficient         |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $\alpha$                      | Gas--liquid oxygen  | 0.03      | --          |
|                               | partition           |           |             |
|                               | coefficient         |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $V_l$                         | Liquid volume       | 1.00      | L           |
+-------------------------------+---------------------+-----------+-------------+
| $V_g$                         | Headspace volume    | 0.25      | L           |
+-------------------------------+---------------------+-----------+-------------+
| *Initial conditions*                                                          |
+-------------------------------+---------------------+-----------+-------------+
| $X_0$                         | Initial biomass     | 0.05      | g l^−1^     |
+-------------------------------+---------------------+-----------+-------------+
| $P_0$                         | Initial nanobody    | 0.00      | mg l^−1^    |
+-------------------------------+---------------------+-----------+-------------+
| $S_0$                         | Initial sugar       | 20.0      | g l^−1^     |
+-------------------------------+---------------------+-----------+-------------+
| $N_0^{\dagger}$               | Initial             | 5.00      | g l^−1^     |
|                               | nitrogen/amino-acid |           |             |
|                               | precursor pool      |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $O_0$                         | Initial dissolved   | 7.00      | mg l^−1^    |
|                               | oxygen              |           |             |
+-------------------------------+---------------------+-----------+-------------+
| $O_{g,0}$                     | Initial headspace   | 270.0     | mg l^−1^    |
|                               | oxygen              |           |             |
+-------------------------------+---------------------+-----------+-------------+

: Illustrative parameter values for the *Bacillus* dynamic model.
$^{\dagger}$ marks the two host-specific additions: nitrogen/amino-acid
limitation and protease-associated product loss.
:::

##### Parameter provenance. {#parameter-provenance.}

As for the yeast models, we state the status of these numbers
explicitly:

- **Literature-guided (structure and order of magnitude):** the model
  structure is literature-supported: Monod kinetics for nutrient-limited
  growth [@monod1949growth], $k_La$-based oxygen
  transfer [@garciaochoa2009oxygen], and the *Bacillus*-specific
  elements based on its use as a heterologous protein production host
  and on protease-related product
  loss [@schallmey2004bacillus; @cui2018bacillus]. The maximum growth
  rate $\mu_B = \SI{0.40}{\per\hour}$ was chosen as an approximate
  illustrative value consistent with reported *B. subtilis* growth
  studies [@dauner2001bacillus].

- **Assumed:** all Monod constants, yields, the protease coefficient
  $k_{\mathrm{prot}}$, transfer parameters and initial conditions.

- **Fitted/calibrated:** none.

Values were selected to produce biologically reasonable qualitative
behaviour and were guided by the growth--production trade-off expected
from FBA. The predicted optimal induction time is therefore
**model-dependent** and should be refined using experimental data or
FBA-derived parameter estimates before it is used as a process
set-point.

#### Result: dynamic production.

<figure id="fig:bacillus_multi_induction" data-latex-placement="H">
<img src="./Bacillus/bacillus_multi_induction.png"
style="width:95.0%" />
<figcaption>Biomass (left) and nanobody (right) trajectories under
different <em>Bacillus</em> induction strategies; the same colour
denotes the same induction time in both panels. Very early induction
(<span class="math inline"><em>t</em><sub><em>i</em></sub> = 0 h</span>)
produces little of either because there is no biomass to produce with.
Very late induction (<span
class="math inline"><em>t</em><sub><em>i</em></sub> = 24 h</span>, 40 h)
reaches maximum biomass but leaves no production window. The
simulation-predicted optimum under the illustrative parameter set, <span
class="math inline"><em>t</em><sub><em>i</em></sub><sup>*</sup> ≈ 6.5 h</span>,
gives the highest final nanobody concentration. Note also that the <span
class="math inline"><em>t</em><sub><em>i</em></sub> = 12 h</span>
trajectory <em>peaks</em> near 140 mg l<sup>−1</sup> around 28 h and
then declines, because product loss outruns production once resources
deplete, so peak titre and harvest titre are not the same
quantity.</figcaption>
</figure>

<figure id="fig:bacillus_supporting_results" data-latex-placement="H">
<figure id="fig:bacillus_resources">
<img src="./Bacillus/fig2_sugar_nitrogen.png" />
<figcaption>Carbon and nitrogen resource dynamics.</figcaption>
</figure>
<figure id="fig:bacillus_final_induction_scan">
<img src="./Bacillus/fig9_multiple_induction_comparison.png" />
<figcaption>Final nanobody yield versus induction time.</figcaption>
</figure>
<figure id="fig:bacillus_heatmap">
<img src="./Bacillus/fig8_heatmap_nanobody.png" />
<figcaption>Nanobody production landscape.</figcaption>
</figure>
<figcaption>Supporting <em>Bacillus</em> dynamic outputs. (a) Sugar is
driven to exhaustion by about 40 h while the nitrogen/amino-acid pool is
only partially consumed, so under this parameter set carbon, not
nitrogen, is the binding resource. (b) The induction-time scan is
sharply peaked at <span
class="math inline"><em>t</em><sub><em>i</em></sub> ≈ 6.5 h</span> and
collapses within a few hours either side, so the recommended operating
window is narrow. (c) Nanobody concentration across cultivation time and
induction time, showing a narrow high-yield ridge at early induction
times that shifts to slightly earlier induction as cultivation time is
extended.</figcaption>
</figure>

Three things come out of the dynamic model.

**Induction timing matters more than the idealised analysis suggests.**
The yield curve in
Fig. [20](#fig:bacillus_final_induction_scan){reference-type="ref"
reference="fig:bacillus_final_induction_scan"} is a sharp peak, not a
broad plateau: induction around 6.5 h--7 h gives the highest predicted
final titre, and missing it by a few hours costs most of the product.
That is a process-control requirement, not a modelling curiosity.

**Carbon is the dominant limiting resource under this parameter set**,
not nitrogen (Fig. [19](#fig:bacillus_resources){reference-type="ref"
reference="fig:bacillus_resources"}), even though nitrogen limitation
was the main reason for adding the $N(t)$ pool. That is a negative
result about our own extension and worth stating: the pool was sized
generously enough ($N_0 = \SI{5.00}{\gram\per\litre}$) that it never
became binding. Whether nitrogen matters in practice depends on a medium
composition we have not yet fixed.

**Peak and harvest titre diverge.** Because the protease term scales
with biomass, product accumulated early can be lost later
(Fig. [18](#fig:bacillus_multi_induction){reference-type="ref"
reference="fig:bacillus_multi_induction"}, right panel). This argues for
harvesting at the product peak rather than at a fixed end time, an
operational recommendation that neither the analytical model nor FBA
could have generated.

### Discussion {#sec:bac_discussion}

#### *B. subtilis* is the preferred chassis, and three independent objectives agree on it.

Growth rate, combined protein output and per-construct nanobody flux all
rank it above *S. cerevisiae* under oxygen limitation. That convergence
across different objective functions is a useful internal cross-check:
it is not an artefact of how we posed one optimisation problem.

::: {#tab:chassis_summary}
                              ***S. cerevisiae***   ***B. subtilis***    ***P. pastoris***
  -------------------------- --------------------- -------------------- -------------------
  Aerobic $\mu$ ( h)                0.4091                0.3186              0.5806
  Anaerobic $\mu$ ( h)               0.10                  0.22                 n/a
  Growth lost without              $-75\,\%$            $-29\,\%$               n/a
  $\mu$ at min viable ( h)          0.0917                0.0726              0.0744
  Combined flux at min              0.0035              **0.0050**            0.0016
  Best aerobic Nb flux              0.0076              **0.0423**              n/a
  Best anaerobic Nb flux            0.0015              **0.0310**              n/a
  Nb capacity lost without         $-80\,\%$        $\mathbf{-27\,\%}$          n/a

  : Chassis comparison summary. All values from this section and
  Sections [2.1.3](#sec:yeast_oxygen){reference-type="ref"
  reference="sec:yeast_oxygen"}--[2.1.5](#sec:pichia){reference-type="ref"
  reference="sec:pichia"}.
:::

#### The aerobic ranking is misleading, and that is the finding.

*P. pastoris* grows fastest aerobically and *S. cerevisiae* is the
conventional choice, but neither advantage survives the oxygen
restriction that defines our application. A team that selected a chassis
on aerobic benchmarks would have chosen wrongly. This is the clearest
case in our work of modeling changing a decision rather than confirming
one.

#### Construct choice.

Nb1_gbHSV is the marginally easier construct in both hosts and both
oxygen conditions. Where the two are otherwise interchangeable, prefer
it.

#### The gap-fill is a reusable deliverable in its own right.

An anaerobic-capable iBsu1147 requires DHORDnad and ASPOfum; both
corrections are literature-justified, and the corrected model is
packaged for reuse. This is also the one prediction in our Dry Lab work
that is directly and cheaply testable: growth on nitrate under strict
anaerobiosis, with and without pyrimidine and supplementation.

#### The honest caveats.

FBA ranks metabolic capacity, not protein quality, and a Gram-positive
host brings its own problems with disulfide-bonded fragments that these
models cannot see. The protease term in the dynamic model is a lumped
stand-in for the entire extracellular protease system. And the dynamic
model still runs on mostly assumed parameters, including a $\mu_B$ that
does not match this section's own FBA result. The chassis recommendation
rests on the FBA comparison, which is well grounded; the induction
timing rests on the dynamic model, which is not yet.

## Cyanobacteria: *Synechococcus elongatus* PCC 7942 {#sec:cyano}

### Design Goals {#sec:cyano_goals}

The two previous subsections assume a sugar feedstock. In a closed
habitat that assumption has to be earned: glucose is not a given, and
the only large-scale carbon input available is . This model answers
where the sugar comes from.

Cyanobacteria are photoautotrophs that produce sucrose directly from
photosynthesis. Other sugars can be produced phototrophically (glucose,
fructose, polysaccharides [@niederholtmeyer2010; @arias2021]), but
sucrose is the highest-yielding carbohydrate, and
Section [2.2.2](#sec:bac_carbon){reference-type="ref"
reference="sec:bac_carbon"} shows it costs our preferred host nothing
per carbon atom anaerobically. The obstacle is that cyanobacteria make
sucrose and then keep it: **they do not secrete it**.

The goals for this model were therefore:

1.  **Characterise the unmodified organism** and find out what actually
    limits it, rather than assuming it is simply because it is a
    photoautotroph.

2.  **Evaluate forced export**: engineer sucrose out of the cell with a
    heterologous transporter, enabling a co-culture with the production
    host.

3.  **Evaluate accumulation and recovery**: block the pathways that
    consume sucrose, let it build up intracellularly, and recover it by
    lysis in a separate culture.

4.  **Choose between them** on grounds the models can support.

Unlike the two host models, this one is not asked to make protein. Its
output is a flux that becomes another model's input.

### Nutrient Supply and Limitation {#sec:cyano_nutrients}

#### Method.

Before evaluating either export strategy we characterised the unmodified
aerobic PCC 7942 model (iMS837) [@santosmerino2023model]. We swept the /
uptake bound to locate the growth plateau, then used **shadow price
analysis** to identify which constraints were actually binding. A shadow
price is the marginal improvement in the objective per unit relaxation
of a constraint; a shadow price of zero means the constraint is not
binding and relaxing it buys nothing. We then relaxed each binding
constraint in turn and re-ran the analysis, following the limitation as
it moved from nutrient to nutrient.

Because each nutrient's requirement scales with the growth rate actually
achieved rather than with a fixed absolute quantity, breakpoints found
by relaxing one constraint at a time are not self-consistent: relieving
nitrogen raises the achievable growth rate, which raises the phosphate
requirement, and so on. We therefore refined the breakpoints by
**iterative joint optimisation** (coordinate descent across all three
constraints) until they converged.

#### Result: baseline and the binding constraint.

The default model grows at approximately 0.102  h, with / uptake capping
growth; the model's native bound on that uptake is 2.
Figure [23](#fig:co2_bounds){reference-type="ref"
reference="fig:co2_bounds"} shows optimal growth as a function of the
bound: it rises approximately linearly and plateaus around $\approx$
4.2 mmol  h^−−1^. Supported by experimental work in the
literature [@Abernathy2017], we raised the bound to 5.1 mmol  h^−−1^,
which with the model's inherited default photon, nitrogen and phosphate
bounds gives a baseline growth rate of 0.2191  h. This is the operating
point used for the rest of the cyanobacterial analysis.

<figure id="fig:co2_bounds" data-latex-placement="H">
<img src="./co2_hco3_bounds_bof.png" style="width:62.0%" />
<figcaption>Optimal growth rate of <em>S. elongatus</em> PCC 7942 as a
function of the / uptake bound. Growth saturates beyond approximately
4.2 mmol  h<sup>−−1</sup>; the habitat-analog operating point of
5.1 mmol  h<sup>−−1</sup> (green, giving 0.2191  h) sits just past the
knee, and the model’s native default bound of 2 sits well below
it.</figcaption>
</figure>

Shadow price analysis at this operating point produced a result we did
not expect.

::: {#tab:sp_baseline}
  **Reaction**            **Shadow price**
  ---------------- -----------------------
  EX_co2_e           $-8.00\times10^{-16}$
  EX_hco3_e           $3.27\times10^{-17}$
  EX_nh4_e                       $-0.1243$
  EX_no3_e                       $-0.1243$
  EX_photon650_e     $-6.18\times10^{-17}$

  : Shadow prices at the baseline operating point (/ bound
  5.1 mmol  h^−−1^, growth rate 0.2191  h), growth objective.
:::

Neither nor photon supply was binding; both returned shadow prices of
essentially zero, meaning more light or more carbon would not improve
growth at all. The true limiting resource was **nitrogen**, specifically
ammonium (`EX_nh4_e`), with a shadow price of $-0.1243$. Nitrate
(`EX_no3_e`) carried an identical shadow price, exactly as expected if
both nitrogen sources converge on the same downstream assimilation
pathway (GS-GOGAT) once inside the cell, a useful sanity check that the
dual solution is behaving sensibly.

#### Result: a three-stage co-limitation cascade.

Relaxing each constraint in turn revealed that the limitation does not
sit with one nutrient but moves:

- **Stage 1: nitrogen-limited.** Growth rose linearly from 0.2191  h to
  0.2619  h as the uptake bound was increased from the model default
  (0.0031 mmol  h^−−1^) to approximately 0.35 mmol  h^−−1^, with held at
  5.1. At 0.35 mmol  h^−−1^ the shadow price dropped to zero and became
  the new binding constraint.

- **Stage 2: carbon-limited.** With nitrogen relieved, growth continued
  rising linearly (shadow price constant at $-0.0257$) from 0.2619  h to
  0.4699  h as the / bound was increased from 5.1 to approximately
  15 mmol  h^−−1^. Growth stopped improving beyond / $= 9.5$ and
  $= 2.07$.

<!-- -->

- **Stage 3: phosphate-limited.** Phosphate (`EX_pi_e`) then emerged as
  a third constraint, with a shadow price of $-2.349$, an order of
  magnitude larger than either nitrogen or carbon. Growth plateaued at
  0.6343  h once the phosphate bound exceeded approximately
  0.2782 mmol  h^−−1^, with at about 3.425 and / at 12.728
  (Fig. [25](#fig:cpn_bof){reference-type="ref"
  reference="fig:cpn_bof"}).

<figure id="fig:cascade_panel" data-latex-placement="H">
<figure id="fig:cn_bof">
<img src="./CN_BOF.png" />
<figcaption>Carbon–nitrogen co-limitation surface.</figcaption>
</figure>
<figure id="fig:cpn_bof">
<img src="./CPN_increased_bof.png" />
<figcaption>Joint scaling of , and .</figcaption>
</figure>
<figure id="fig:cascade">
<img src="./limiting_factors_bounds.png" />
<figcaption>The cascade, stage by stage.</figcaption>
</figure>
<figcaption>Sequential nutrient co-limitation in <em>S. elongatus</em>
PCC 7942. (a) Growth rate over the <span class="math inline">×</span>
plane with phosphate held at the model default; the marked point is
where phosphate takes over as the binding constraint. (b) Growth as all
three bounds are scaled proportionally toward the converged solution,
showing the plateau. (c) The cascade summarised: 0.2191  h (baseline)
<span class="math inline">→</span> 0.2619  h (N relieved) <span
class="math inline">→</span> 0.499  h (N<span
class="math inline">+</span>C relieved) <span
class="math inline">→</span> 0.6343  h (N<span
class="math inline">+</span>C<span class="math inline">+</span>P
relieved).</figcaption>
</figure>

At convergence the model predicts a **maximum growth rate of
0.6274  h**, requiring

::: center
/ $\approx \num{12.22}$, $\approx \num{3.29}$, $\approx \num{0.27}$
mmol  h^−−1^,
:::

with photon supply (145   h^−−1^) and nitrate, sulfate, iron and
magnesium all remaining non-binding throughout
(Table [15](#tab:growth_shadow_prices){reference-type="ref"
reference="tab:growth_shadow_prices"}).

::: {#tab:growth_shadow_prices}
  **Reaction**         **Flux**      **Bound**          **Shadow price**  **Binding?**
  ---------------- ------------ -------------- ------------------------- --------------
  EX_co2_e           $-12.2203$     $-12.2203$   $-2.567 \times 10^{-2}$      Yes
  EX_hco3_e          $-12.2203$     $-12.2203$   $-2.567 \times 10^{-2}$      Yes
  EX_nh4_e            $-3.3000$      $-3.3000$               $\approx 0$       No
  EX_no3_e            $-1.7484$      $-1.7600$               $\approx 0$       No
  EX_so4_e            $-0.0855$   $-1000.0000$               $\approx 0$       No
  EX_pi_e             $-0.2671$      $-0.2671$               $\approx 0$       No
  EX_fe3_e            $-0.0010$      $-0.0010$               $\approx 0$       No
  EX_mg2_e            $-0.0070$   $-1000.0000$               $\approx 0$       No
  EX_photon650_e      $-0.0070$    $-145.0000$               $\approx 0$       No

  : Shadow price analysis for the growth objective at the converged
  nutrient-sufficient bounds (/ $= 12.2203$, $= 3.3$, $= 0.2671$
  mmol  h^−−1^). Growth rate $=$ 0.6274  h.
:::

#### A methodological negative result worth recording.

Shadow price analysis was reliable for *identifying* which constraints
were binding, but unreliable for *precisely locating* breakpoints near
the optimum, because of solution degeneracy: multiple alternate optimal
flux distributions give identical growth rates but different dual
values. All breakpoints reported above were therefore confirmed by
direct growth-rate sweeps rather than by looking for a shadow-price
zero-crossing. Any team using shadow prices to find limiting nutrients
should be aware of this failure mode.

#### Design consequence.

Supplying alone is not enough: nitrogen and phosphate become binding in
turn, and phosphate has by far the steepest shadow price. That
strengthens the case for using recovered urine as a nutrient source,
since it supplies nitrogen, and it raises **phosphate sourcing as an
unsolved design problem** the project needs an answer to.

### Exporting Sucrose {#sec:cyano_export}

#### Method.

Sucrose sits at a metabolic junction inside the cyanobacterial cell. It
can be held as an osmolyte, broken back down into hexoses and fed into
glycogen, or, with the right transporter, exported. The engineering
logic is to close off the first two routes while opening the third.

The transporter is CscB, the sucrose permease from *E. coli*, whose
incorporation into PCC 7942 has been experimentally
validated [@ducat2012; @santosmerino2023]. Its native reaction in
*E. coli* is a sucrose/ symport *into* the cell; in the cyanobacterial
context the high intracellular sucrose concentration reverses this,
giving effectively irreversible export of both sucrose and protons.

We added the CscB reaction to the model and then (i) mapped the
trade-off between sucrose export and biomass production by sweeping the
biomass flux constraint; (ii) selected candidate operating points and
fed the resulting sucrose fluxes into the yeast model
(Sec. [2.1.2](#sec:yeast_carbon){reference-type="ref"
reference="sec:yeast_carbon"}); and (iii) ran shadow price analysis with
*sucrose export* rather than growth as the objective, to find what
limits production rather than growth.

#### Result: the export--growth trade-off.

Sucrose export and biomass production compete for the same fixed carbon.
Figure [28](#fig:sucrose_vs_growth){reference-type="ref"
reference="fig:sucrose_vs_growth"} maps that trade-off directly: maximum
sucrose export falls approximately linearly as the biomass flux
constraint is raised.

<figure id="fig:sucrose_vs_growth" data-latex-placement="H">
<img src="./sucrose_vs_growth.png" style="width:62.0%" />
<figcaption>Sucrose excretion versus growth rate trade-off for
<em>S. elongatus</em> PCC 7942 carrying <em>cscB</em>, at / <span
class="math inline">=</span> 5.1 mmol  h<sup>−−1</sup>. The near-linear
relationship means that every unit of cyanobacterial growth is paid for
in sucrose not exported, which is what makes deliberate growth-capping a
usable control handle rather than simply a loss.</figcaption>
</figure>

#### Result: co-culture operating points.

At the high-growth end of the trade-off, maximum sucrose export is
0.234 mmol  h^−−1^ at a cyanobacterial biomass flux of 0.03, which
supports a 1:1 biomass ratio with the yeast partner
(Sec. [2.1.2](#sec:yeast_carbon){reference-type="ref"
reference="sec:yeast_carbon"}). A 1:1 ratio is not, however, a *stable*
operating point, because the cyanobacteria grow faster than the yeast
and the co-culture would drift over time. Capping cyanobacterial growth
lower moves the system along the trade-off curve in the direction we
want.

::: {#tab:coculture}
  --------------------------- -------------------- -------------------- ----------------------
  **Operating point**          **Cyano. biomass**   **Sucrose export**      **Resulting**
                                 **flux ( h)**      **(mmol  h^−−1^)**   **yeast $\mu$ ( h)**
  Max cyanobacterial growth           0.03                0.234                0.011132
  Growth-capped (preferred)          0.013              **0.8078**           **0.038429**
  --------------------------- -------------------- -------------------- ----------------------

  : Two candidate co-culture operating points. Capping cyanobacterial
  growth more aggressively releases substantially more sucrose and gives
  a faster-growing, more stable partner culture. Yeast growth rates from
  Table [3](#tab:yeast_on_sucrose){reference-type="ref"
  reference="tab:yeast_on_sucrose"}.
:::

At a biomass flux of 0.013 and a uptake of 5.1 mmol  h^−−1^, sucrose
secretion rises to 0.8078 mmol  h^−−1^, a $3.5\times$ increase over the
high-growth point, and the yeast partner reaches 0.038429  h. This is
the co-culture operating point we recommend.

#### Result: oxygen is the second product.

A co-culture supplies more than sugar. The oxygen flux of the
*cscB*-carrying cyanobacteria is 4.2305, and
Section [2.1.3](#sec:yeast_oxygen){reference-type="ref"
reference="sec:yeast_oxygen"} established that a small amount of oxygen
buys a disproportionate amount of metabolic capability. Supplying the
yeast with both sucrose and oxygen raises its growth rate to
0.175773  h, a **13-fold increase** over the strictly anaerobic baseline
of 0.0138  h.

This reframes the co-culture: it is not a feedstock workaround, it is a
partial solution to the oxygen problem as well.

#### Result: what limits export is not what limits growth.

::: {#tab:sucrose_shadow_prices}
  **Reaction**        **Flux**      **Bound**           **Shadow price**  **Binding?**
  ---------------- ----------- -------------- -------------------------- --------------
  EX_co2_e           $-5.1000$      $-5.1000$    $-8.333 \times 10^{-2}$      Yes
  EX_hco3_e          $-5.1000$      $-5.1000$    $-8.333 \times 10^{-2}$      Yes
  EX_nh4_e           $-0.0031$      $-0.0031$   $-1.055 \times 10^{-16}$       No
  EX_no3_e           $-0.1015$      $-1.7600$     $-0.000 \times 10^{0}$       No
  EX_so4_e           $-0.0018$   $-1000.0000$      $0.000 \times 10^{0}$       No
  EX_pi_e            $-0.0055$      $-0.2000$     $-0.000 \times 10^{0}$       No
  EX_fe3_e           $-0.0000$      $-0.0010$     $-0.000 \times 10^{0}$       No
  EX_mg2_e           $-0.0001$   $-1000.0000$      $0.000 \times 10^{0}$       No
  EX_photon650_e     $-0.0001$    $-145.0000$     $-0.000 \times 10^{0}$       No

  : Shadow price analysis for the sucrose production objective,
  habitat-analog bound (5.1 mmol  h^−−1^), biomass objective capped at
  0.013  h.
:::

Under the capped growth rate, the only binding constraint on sucrose
production is /, and increasing does increase sucrose output.

Comparing Table [17](#tab:sucrose_shadow_prices){reference-type="ref"
reference="tab:sucrose_shadow_prices"} with
Table [15](#tab:growth_shadow_prices){reference-type="ref"
reference="tab:growth_shadow_prices"} gives a clean and genuinely useful
dissociation: **sucrose export and biomass growth are governed by
different limiting resources**. Nutrient supplementation strategies such
as urine-derived nitrogen and phosphate sourcing matter a great deal for
growth optimisation but do not move the sucrose-production bottleneck at
all, which remains carbon/Calvin-cycle-limited regardless of nitrogen or
phosphate availability. Practically: if the goal is more sucrose, invest
in delivery, not in richer medium.

### Retaining Sucrose: the Knockout Strategy {#sec:cyano_knockouts}

#### Method.

The alternative to export is to stop the cell consuming its own sucrose
and let it accumulate. Two knockouts were the obvious targets:

1.  ***glgC*** (ADP-glucose pyrophosphorylase), which competes for the
    hexose phosphates that are the source of sucrose;

2.  ***invA***/SUCR (sucrose-hydrolysing enzyme), which breaks sucrose
    back down into glucose and fructose.

To let FBA optimise for accumulation rather than export, a sucrose sink
reaction had to be added to the model. We then tested additional
knockouts of competing pathways, performed single gene deletion analysis
across the genome, traced flux to locate the bottleneck, and ran flux
variability analysis (FVA) at fixed biomass flux 0.013  h and / uptake
5.1 mmol  h^−−1^ to screen for any gene whose deletion would *force*
higher sucrose flux.

#### Result.

Sucrose accumulation flux at a biomass flux capped at 0.013  h was
0.2895 mmol  h^−−1^ under habitat-analog light and constraints. Under
unlimited carbon and light, the theoretical maximum is
16.33 mmol  h^−−1^, with *and without* the relevant knockouts,
indicating substantial headroom accessible through bioreactor
optimisation rather than through genetics.

The knockouts, in other words, did essentially nothing:

- Additional knockouts of competing pathways yielded *identical* sucrose
  production fluxes, even under unlimited light and .

- Flux tracing located the bottleneck in Calvin cycle output,
  specifically the `f6p_c` pool available for sucrose synthesis.
  Increasing sucrose production therefore requires either enhanced
  fixation capacity or reduced biomass allocation, not elimination of
  competing pathways.

- Single gene deletion confirmed sucrose phosphate synthase/phosphatase
  as **essential**: knocking it out abolishes sucrose flux entirely.
  NDH-1 subunit genes each caused approximately a **53 % reduction** in
  sucrose flux. These are linked to the -concentrating mechanism,
  reconfirming from an entirely different direction that delivery is the
  primary constraint.

- The FVA screen found **no single gene candidate**: sucrose and growth
  remained uncoupled for every gene tested.

#### A negative result that teaches something about the method.

This appears to conflict with the literature. Published knockouts of
*invA*, *glgA*/*glgC* and *ggpS* report 15--300 % increases in
sucrose [@santosmerino2023; @ducat2012; @kirsch2018; @xu2013], but only
under salt-stress conditions.

Our interpretation is that the reported effects operate through
ion-dependent regulation, and regulatory mechanisms of that kind are
simply absent from stoichiometric FBA. Without the salt-stress
regulatory state, the model's optimal solution never routes flux through
the competing pathways in the first place, so knocking them out changes
nothing in silico. The knockouts are not wrong; the model cannot see
what makes them work.

This is a real limitation of the method rather than a failure of the
analysis: **GEM-based knockout screening cannot discover
regulation-dependent targets.** A knockout that only helps because it
changes how a cell responds to stress will look like a no-op to FBA.

### Discussion {#sec:cyano_discussion}

#### The two strategies give the same flux, so the choice is made on other grounds.

Under both scenarios (sucrose excreted via an introduced exporter, or
accumulated via knockout of consuming genes) the total sucrose flux the
model predicts is the same. FBA cannot separate them.

The literature makes the case for export. Cytosolic volume constrains
how much sucrose can be accumulated intracellularly, and the costs of
cyanobacterial cell recovery, lysis and processing would likely exceed
the economic value of the commodity products contained in the
cytosol [@prabha2022]. Secreting sugars into the supernatant for
collection has been proposed as the more viable strategy, and
cyanobacteria have been engineered to express heterologous transporters
capable of exporting lactate and
hexoses [@niederholtmeyer2010; @angermayr2012]. In a habitat, where
lysis-and-recovery hardware is mass and power that has to be launched,
this argument is if anything stronger than it is on Earth.

#### Our design decision.

Based on the literature and our own analysis, **CscB export combined
with sucrose phosphate synthase overexpression and *invA* knockout under
salt-stress induction**, if these are compatible, appears to be the most
robust route to obtaining sucrose from cyanobacteria. Export is chosen
for downstream-processing reasons; the *invA* knockout is retained on
literature grounds even though our own FBA cannot demonstrate its
benefit, precisely because we have identified *why* FBA cannot see it.

#### Where to invest engineering effort.

delivery and Calvin-cycle capacity, not competing-pathway knockouts.
Three independent lines of evidence converge on this: shadow prices
under a sucrose objective, flux tracing to the `f6p_c` pool, and the
NDH-1 single-deletion result. The gap between the habitat-analog flux
(0.2895 mmol  h^−−1^) and the unlimited-carbon theoretical maximum
(16.33 mmol  h^−−1^) is where the headroom is.

#### The supplier solves two problems, not one.

The strongest result in this subsection is not the sucrose flux but the
oxygen. The co-culture raises partner growth 13-fold over strict
anaerobiosis, which addresses the constraint that
Sections [2.1.3](#sec:yeast_oxygen){reference-type="ref"
reference="sec:yeast_oxygen"}
and [2.2.3](#sec:bac_oxygen){reference-type="ref"
reference="sec:bac_oxygen"} identify as decisive for both hosts.

#### The honest caveats.

The co-culture arithmetic assumes steady state and that all exported
sucrose reaches the partner organism; it ignores transfer losses,
spatial gradients, competition for shared nutrients, pH coupling and the
fact that the two organisms have different optimal conditions. The
accumulation result additionally assumes sucrose is continuously removed
by a sink reaction, which is why dynamic FBA would be needed for a
realistic picture. And an open design question follows directly from our
own results: could the oxygen supply be raised further by increasing the
cyanobacteria:host ratio above 1:1? More cyanobacteria means more and
faster partner growth, but our models cannot settle it.

# Wet Lab Experiments from the Results {#sec:wetlab}

We state this section conservatively. At the time of writing, no
experimental measurement generated by our own Wet Lab has been used as a
model input, and no model prediction has yet been tested experimentally
by our team. What exists is a set of literature- and database-derived
constraints flowing into the models, and a set of concrete, testable
recommendations flowing out of them.

## What went into the models

- **uptake bound.** The habitat-analog / bound of 5.1 mmol  h^−−1^ used
  throughout the cyanobacterial work is supported by published
  experimental measurements [@Abernathy2017], not chosen for
  convenience.

- **CscB feasibility.** The export strategy rests on the experimentally
  validated incorporation of CscB into
  PCC 7942 [@ducat2012; @santosmerino2023]. We are modelling a strain
  that has been built, not a hypothetical one.

- **Gap-fill reaction identity.** Both reactions added to iBsu1147 were
  accepted only after literature confirmation: dihydroorotate
  dehydrogenase as a constitutively NAD-dependent Class 1B
  enzyme [@dhod_class1b], and NadB's fumarate-linked mode by direct
  enzymatic characterisation of the purified *B. subtilis*
  protein [@nadb_fumarate]. A candidate that lacked such evidence
  (ASPDH) was rejected.

- **Anaerobic yeast protocol.** Applied from the Yeast9 authors' own
  published implementation rather than reconstructed by us.

- **Knockout expectations.** The 15--300 % sucrose increases reported
  under salt
  stress [@santosmerino2023; @ducat2012; @kirsch2018; @xu2013] are what
  allowed us to recognise our null in-silico result as a method
  limitation rather than as evidence against the knockouts.

## Experiments the models recommend

Each item is something the Wet Lab could act on directly. The first
three are the ones we would prioritise.

1.  **Build in *B. subtilis* first.** 5.5$\times$ higher theoretical
    aerobic production than yeast and a 27 % rather than 80 % loss going
    anaerobic (Table [13](#tab:chassis_summary){reference-type="ref"
    reference="tab:chassis_summary"}). If resources allow only one
    chassis to be built, this is it.

2.  **Test the anaerobic gap-fill directly.** Grow *B. subtilis* on
    nitrate under strict anaerobiosis, with and without pyrimidine and
    supplementation. This tests the specific model correction our Dry
    Lab proposed (Sec. [2.2.3.1](#sec:gapfill){reference-type="ref"
    reference="sec:gapfill"}) and would be a genuinely novel validation
    rather than a literature reproduction.

3.  **Run the co-culture at the growth-capped operating point.** Cap
    cyanobacterial biomass flux near 0.013  h rather than letting it
    grow maximally; the model predicts sucrose export rises from 0.234
    to 0.8078 mmol  h^−−1^ and the partner culture becomes more stable.

4.  **Prefer Nb1_gbHSV** where the two constructs are otherwise
    interchangeable, since it is consistently and systematically easier
    to produce in both hosts.

5.  **Do not over-engineer aeration.** A supply on the order of
    0.05 mmol  h^−−1^ keeps all three tested chassis well above their
    5 % viability thresholds. Worth testing directly, since the
    identical value across three organisms may be a grid artefact
    (Sec. [2.1.3](#sec:yeast_oxygen){reference-type="ref"
    reference="sec:yeast_oxygen"}).

6.  **Target delivery in the cyanobacteria**, not competing-pathway
    knockouts. Three independent analyses converge on the -concentrating
    mechanism as the leverage point.

7.  **Solve phosphate sourcing.** Growth is limited by nitrogen first,
    then carbon, then phosphate, with phosphate carrying by far the
    steepest shadow price ($-2.349$). Urine-derived nitrogen addresses
    the first constraint; phosphate is currently unassigned.

8.  **Induce early and harvest at the product peak**, not at a fixed
    endpoint, because product declines under protease loss once
    resources deplete
    (Fig. [18](#fig:bacillus_multi_induction){reference-type="ref"
    reference="fig:bacillus_multi_induction"}).

9.  **Test the ratio question.** Whether increasing the
    cyanobacteria:host ratio above 1:1 raises supply enough to
    accelerate the partner further is an open question raised by our own
    13-fold result and not answerable with the models as currently
    built.

## Validation available so far

In the absence of experimental data, the checks available to us were
internal. We record them rather than claim more:

- **Analytical limit checks.** All three limiting cases of
  Eq. [\[eq:tau_star\]](#eq:tau_star){reference-type="eqref"
  reference="eq:tau_star"} recover the biologically correct answer
  (Sec. [2.1.4](#sec:yeast_protein){reference-type="ref"
  reference="sec:yeast_protein"}).

- **Dual-solution sanity check.** and return identical shadow prices, as
  they must if both converge on GS-GOGAT
  (Sec. [2.3.2](#sec:cyano_nutrients){reference-type="ref"
  reference="sec:cyano_nutrients"}).

- **Convergent evidence for the cyanobacterial bottleneck.** Shadow
  prices under a sucrose objective, flux tracing to the `f6p_c` pool,
  and NDH-1 single-gene deletions all independently identify delivery as
  the constraint.

- **Agreement across three FBA objectives.** Growth rate, combined
  protein output and per-construct nanobody flux all rank *B. subtilis*
  above *S. cerevisiae* under oxygen limitation.

- **Independent reproduction of the iBsu1147 gap.** Two Dry Lab members
  independently identified the same two missing reactions, which is weak
  but real evidence that the gap is in the model rather than in a
  particular analysis script.

# Limitations and Future Directions {#sec:limitations}

## What these models do not capture

We list these in rough order of how much they constrain the conclusions.

#### No experimental validation yet.

No prediction on this page has been tested against our own data. Every
number should be read as a model output.

#### FBA measures metabolic capacity, not protein quality.

The chassis comparison ranks organisms by how much carbon, nitrogen and
energy they could route into a nanobody. It says nothing about folding,
disulfide-bond formation, post-translational modification, secretion
efficiency or solubility, exactly the areas where eukaryotic hosts are
usually preferred for antibody fragments. Read our chassis
recommendation as "*B. subtilis* has the metabolic headroom", not
"*B. subtilis* will make better nanobody".

#### Stoichiometric models cannot see regulation.

Demonstrated directly by the cyanobacterial knockout screen
(Sec. [2.3.4](#sec:cyano_knockouts){reference-type="ref"
reference="sec:cyano_knockouts"}). Any engineering target whose benefit
is regulatory will be invisible to this method.

#### FBA has no time axis; the ODEs have no metabolic detail.

The two model classes have complementary blind spots, and we have not
yet bridged them. Dynamic FBA (dFBA) is the obvious bridge and was not
attempted.

#### The dynamic model parameters are mostly assumed.

Only $\mu$ is described as FBA-derived, and that link is unverified.
Optimal induction times ($t_{\mathrm{i}}^* = \SI{32.7}{\hour}$ for the
analytical yeast model, $\approx \SI{6.5}{\hour}$ for *Bacillus*) are
therefore *model-dependent illustrations of a trade-off*, not process
set-points.

#### The co-culture arithmetic is idealised.

Steady state, perfect sucrose transfer, no spatial gradients, no
competition, no pH coupling.

#### The induction switch is instantaneous.

Both dynamic models assume the metabolic shift at $t_{\mathrm{i}}$ is
sharp relative to the cultivation time. Real inducible systems have
induction kinetics, leakiness and a lag.

#### Protease loss is a lumped term.

$k_{\mathrm{prot}}X P$ stands in for the entire *Bacillus* extracellular
protease system without modelling any protease explicitly.

#### Habitat conditions are represented only through bounds.

"Habitat-analog" here means a particular photon bound and a particular
bound. Temperature, pressure, radiation and gravity effects are entirely
absent.

#### Single-model reliance.

Each organism is represented by one published reconstruction;
model-to-model variation was not assessed.

## Future directions {#sec:future}

#### Feed cyanobacterial sucrose into the *Bacillus* model.

The calculation done for yeast
(Table [3](#tab:yeast_on_sucrose){reference-type="ref"
reference="tab:yeast_on_sucrose"}) has not been done for the chassis we
actually recommend. Both the models and the flux values already exist;
this is the cheapest missing piece of work in the whole Dry Lab and it
closes an obvious hole a judge will notice.

#### Close the loop with dFBA.

The highest-value next step. dFBA would let metabolism change over the
batch timecourse, testing whether the Monod-based approximation is
adequate or whether other limitations take over, and would replace the
currently weak GEM-to-ODE coupling with a real one.

#### Re-parameterise the dynamic models from the GEMs.

Replacing $\mu_B = \SI{0.40}{\per\hour}$ with the FBA-derived
0.3186  h/0.22  h, and deriving yields from the corresponding flux
distributions, would make the two model classes quantitatively
consistent.

#### Model the full closed loop.

We modelled cyanobacteria feeding sugar and oxygen to the host, but not
the host feeding back, even though we computed that output
(7.75 mmol  h^−−1^--9.23 mmol  h^−−1^) and separately showed that
increasing is the one thing that raises sucrose output. Both halves are
in hand.

#### Sensitivity analysis.

No formal sensitivity or uncertainty analysis was performed. Given how
many dynamic-model parameters are assumed, a global sensitivity analysis
would tell us which ones actually need experimental grounding, and which
do not, which is just as useful.

#### Add protein-quality constraints.

Resource-allocation or enzyme-constrained models (the *ecBSU1*
formulation is already available) would begin to capture the expression
burden that the $\beta$ parameter currently represents
phenomenologically.
