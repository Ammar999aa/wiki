## Why model a bioreactor at all?

We spent months designing bacterial and yeast chassis that can survive a trip to space. A chassis is only half the problem. Whatever we engineer still has to grow inside a physical vessel, and that vessel has to work in an environment with near zero gravity, and with a limited source of energy and mass.

The main objective with this model can be summarize in the following question:
Can we actually build a bioreactor with the correct geometry and parts that can keep our cells fed and oxygenated in microgravity?

That question is hard to answer experimentally, because we cannot easily turn gravity off. It is, however, exactly the kind of question computational fluid dynamics exists for. So we built a 3D multiphysics model in **COMSOL Multiphysics 5.5** that couples fluid flow, gas liquid mass transfer and microbial growth kinetics, and we used it to test different versions of the bioreactor.

### Why Computational Fluid Dynamics (CFD) and not a simple Ordinary Differential Equation (ODE) model

The usual way to model a batch fermentation is a handful of ordinary differential equations describing biomass, substrate and product over time. That approach assumes the vessel is **perfectly mixed** — every cell sees the same glucose and the same dissolved oxygen at every instant.

On the ground, in a well-stirred vessel, that assumption is close enough to true. In microgravity it is the assumption most likely to break. Without buoyancy there is no natural convection, gas bubbles do not rise, and a sparged bubble that would normally travel up through the liquid in a second may simply sit where it was released. Mixing stops being a background detail and becomes _the_ design variable.

A CFD model resolves concentration in space, so it can show us an oxygen-starved pocket behind a baffle or a dead zone at the base of the vessel. A well-mixed ODE model cannot, by construction. That is the entire justification for the extra complexity, and it is the standard we hold the model to: **if the answer would have been the same from an ODE, the CFD was not worth running.**

## Model 1 — Baseline stirred vessel

### Design goals

This first model is our reference case. Before comparing geometries, we needed one configuration we trust and understand end to end. Concretely, we wanted it to answer three things:

1. Does a single paddle impeller at 100 rpm homogenise the medium on a timescale much shorter than the growth timescale? (If yes, later designs only have to _not be worse_.)
2. Is oxygen transfer across the flat headspace interface fast enough to keep up with respiration for a full 24-hour batch?
3. Where, spatially, does the culture first become limited — and by what?

### Geometry and domains

<div class="callout warn">

<p class="callout-label">Figure pending</p>

The computational-domain diagram (four domains: bulk liquid, rotating impeller zone, gas headspace, and the vessel wall, separated by a flat gas–liquid interface Γ) will be added here once the exported render is available.

</div>

A few deliberate simplifications are worth stating up front, because they define what this model can and cannot tell us:

<div class="table-wrap">

|Simplification|What it buys us|What it costs us|
|---|---|---|
|Flat, rigid gas–liquid interface|No free-surface tracking; a steady flow solution exists|No vortex, no sloshing, no surface deformation — and in microgravity, surface tension would in reality dominate the shape|
|Single lumped biomass species|Five transport equations instead of dozens|No population structure, no plasmid loss, no segregated behaviour|
|Headspace aeration only (no sparging)|No two-phase flow model needed|Almost certainly underestimates achievable oxygen transfer|
|Solutes do not alter density or viscosity|One-way coupling: flow → transport, never the reverse|Invalid at high biomass, where broth viscosity rises|

</div>

### Parameters

Base-case parameter set. Values marked † are the ones we consider least well constrained and flag again in the Discussion.

#### Geometry and operation

<div class="table-wrap">

|Name|Expression|Description|
|---|---|---|
|`d_port`|`5[mm]`|Port inner diameter|
|`A_port`|`pi*(d_port/2)^2`|Cross-sectional area of one port|
|`D_imp`|`65.6[mm]`|Impeller blade sweep diameter|
|`omega_rot`|`100[rpm]`|Stirrer speed|
|`N_rot`|`omega_rot`|Stirrer speed in rev/s, for Reynolds number †|
|`omega_rad`|`2*pi*omega_rot`|Angular velocity, used by `RotatingWall`|
|`T_op`|`310.15[K]`|Operating temperature, 37 °C|
|`p_ref`|`1[atm]`|Reference pressure|
|`Q_gas`|`100[ml/min]`|Gas sweep volumetric flow|
|`v_gas_in`|`Q_gas/A_port`|Gas inlet velocity, derived|
|`v_liq_in`|`0.001[m/s]`|Liquid inlet velocity|
|`t_batch`|`24[h]`|Batch run duration|

</div>

#### Fluid properties

<div class="table-wrap">

|Name|Expression|Description|
|---|---|---|
|`rho_medium`|`1010[kg/m^3]`|Medium density|
|`mu_medium`|`1.1e-3[Pa*s]`|Medium dynamic viscosity|
|`rho_gas`|`1.13[kg/m^3]`|Headspace air density at 37 °C|
|`mu_gas`|`1.9e-5[Pa*s]`|Headspace air viscosity at 37 °C|
|`Re_imp`|`rho_medium*N_rot*D_imp^2/mu_medium`|Impeller Reynolds number|

</div>

#### Growth kinetics

<div class="table-wrap">

|Name|Expression|Description|
|---|---|---|
|`mu_max`|`0.5[1/h]`|Maximum specific growth rate|
|`K_S`|`2.8[mol/m^3]`|Monod half-saturation constant, carbon source|
|`K_O2`|`0.005[mol/m^3]`|Monod half-saturation constant, oxygen|
|`Y_XS`|`81[g/mol]`|Biomass yield per mol substrate|
|`Y_XO2`|`32[g/mol]`|Biomass yield per mol O₂|
|`alpha_P`|`0.2`|Luedeking–Piret growth-associated coefficient|
|`beta_P`|`0.01[1/h]`|Luedeking–Piret non-growth-associated coefficient|
|`RQ`|`1.0`|Respiratory quotient, mol CO₂ per mol O₂|
|`m_O2`|`0.02[mol/g/h]`|Maintenance oxygen demand †|

</div>

#### Transport and interfacial properties

<div class="table-wrap">

|Name|Expression|Description|
|---|---|---|
|`M_X`, `M_P`|`1[g/mol]`|Nominal molar masses, biomass and product|
|`M_S`|`180[g/mol]`|Molar mass of glucose|
|`D_S`|`6.7e-10[m^2/s]`|Glucose diffusivity in water, 37 °C|
|`D_X`|`1e-11[m^2/s]`|Biomass diffusivity|
|`D_P`|`5e-10[m^2/s]`|Product diffusivity in water|
|`D_O2`|`2.9e-9[m^2/s]`|O₂ diffusivity in water, 37 °C|
|`D_CO2`|`2.4e-9[m^2/s]`|CO₂ diffusivity in water, 37 °C|
|`D_O2_gas`|`2.1e-5[m^2/s]`|O₂ diffusivity in air, 37 °C|
|`D_CO2_gas`|`1.7e-5[m^2/s]`|CO₂ diffusivity in air, 37 °C|
|`kL_O2`|`3e-5[m/s]`|Liquid-side transfer coefficient, O₂ †|
|`kL_CO2`|`2.5e-5[m/s]`|Liquid-side transfer coefficient, CO₂ †|
|`H_O2`|`38`|Dimensionless Henry constant, O₂ (c_gas/c_liq, 37 °C)|
|`H_CO2`|`1.6`|Dimensionless Henry constant, CO₂ (37 °C)|

</div>

#### Composition and initial state

<div class="table-wrap">

|Name|Expression|Description|
|---|---|---|
|`c_tot_gas`|`p_ref/(8.314[J/mol/K]*T_op)`|Total molar gas concentration at operating conditions|
|`y_O2_in`|`0.21`|Inlet gas O₂ mole fraction, ambient air|
|`y_CO2_in`|`4.2e-4`|Inlet gas CO₂ mole fraction, ambient air|
|`cO2_G0`|`y_O2_in*c_tot_gas`|Inlet and initial headspace O₂|
|`cCO2_G0`|`y_CO2_in*c_tot_gas`|Inlet and initial headspace CO₂|
|`cO2_L0`|`cO2_G0/H_O2`|Initial dissolved O₂, in Henry equilibrium|
|`cCO2_L0`|`cCO2_G0/H_CO2`|Initial dissolved CO₂, in Henry equilibrium|
|`cS0`|`55.6[mol/m^3]`|Initial carbon source, ≈10 g/L glucose|
|`cX0`|`100[mol/m^3]`|Inoculum biomass, ≈0.1 g/L|
|`cP0`|`0[mol/m^3]`|Initial product concentration|

</div>

### The physics, one layer at a time

#### 1. Flow

Both fluids are treated as incompressible and Newtonian, and both are solved in steady state.

**Liquid domain** Ω_L (bulk liquid plus rotating zone):

$$\rho_L (\mathbf{u}_L \cdot \nabla)\mathbf{u}_L = \nabla \cdot \left[ -p_L \mathbf{I} + \mu_L \left( \nabla \mathbf{u}_L + (\nabla \mathbf{u}_L)^T \right) \right], \qquad \nabla \cdot \mathbf{u}_L = 0$$

**Headspace** Ω_G, identical form with gas properties:

$$\rho_G (\mathbf{u}_G \cdot \nabla)\mathbf{u}_G = \nabla \cdot \left[ -p_G \mathbf{I} + \mu_G \left( \nabla \mathbf{u}_G + (\nabla \mathbf{u}_G)^T \right) \right], \qquad \nabla \cdot \mathbf{u}_G = 0$$

_Why steady?_ The stirrer runs at constant speed and the gas sweep is constant, so the velocity field settles within seconds — negligible against a 24-hour batch. Solving once and reusing the result is what makes the full batch affordable.

_Why two separate flow problems?_ The liquid and the gas share the interface Γ but exchange no momentum across it: Γ is a zero-shear, impermeable wall for both. This is a real approximation, not a formality. It is defensible here because the gas is ~900× less dense than the liquid and drives essentially no motion in it, but it does mean any surface-shear-driven mixing is absent from the model.

#### 2. Species transport

**Liquid**, for each _i_ ∈ {S, X, P, O₂, CO₂}:

$$\frac{\partial c_i}{\partial t} + \mathbf{u}_L \cdot \nabla c_i = \nabla \cdot (D_i \nabla c_i) + R_i$$

**Headspace**, for _j_ ∈ {O₂, CO₂}, with no reaction term:

$$\frac{\partial c_j^G}{\partial t} + \mathbf{u}_G \cdot \nabla c_j^G = \nabla \cdot (D_j^G \nabla c_j^G)$$

Because solutes are assumed not to change density or viscosity, flow influences transport but transport never influences flow. That one-way coupling is what permits the **frozen-flow scheme**: compute **u**_L and **u**_G once, hold them fixed, and integrate only the transport equations through time.

#### 3. Growth kinetics

A double-Monod specific growth rate, limited by both carbon source and dissolved oxygen:

$$\mu = \mu_{max} \cdot \frac{c_S}{K_S + c_S} \cdot \frac{c_{O_2}}{K_{O_2} + c_{O_2}}$$

with source terms

$$R_X = \mu c_X, \qquad R_S = -\frac{\mu c_X}{Y_{X/S}}, \qquad R_P = \left( \alpha \mu + \beta \right) c_X$$

$$R_{O_2} = -\left( \frac{\mu}{Y_{X/O_2}} + m_{O_2} \right) c_X, \qquad R_{CO_2} = RQ \left( \frac{\mu}{Y_{X/O_2}} + m_{O_2} \right) c_X$$

Product formation uses the **Luedeking–Piret** form, which covers growth-associated (α) and non-growth-associated (β) production in one expression. Oxygen consumption carries a maintenance term so that respiration continues when growth is substrate-limited, and CO₂ production is tied to oxygen consumption through the respiratory quotient, with RQ = 1 assuming purely respiratory metabolism.

The important consequence: because μ is evaluated pointwise, **these are local rates**. A cell in an oxygen-poor pocket grows more slowly than a cell near the interface. That heterogeneity is the thing we built the model to see.

#### 4. Interfacial mass transfer

At Γ, for _k_ ∈ {O₂, CO₂}, the molar flux into the liquid is

$$N_k = k_{L,k} \left( \frac{c_k^G}{H_k} - c_k \right)$$

applied equal and opposite on the two sides:

$$-\mathbf{n} \cdot \mathbf{N}_k \big|_{\Omega_L} = N_k, \qquad -\mathbf{n} \cdot \mathbf{N}_k \big|_{\Omega_G} = -N_k$$

This is **two-film theory with the liquid-side film controlling**, which is the standard assumption for sparingly soluble gases: oxygen's resistance to transfer sits almost entirely in the thin stagnant liquid layer, not the gas layer.

The driving force is the departure from Henry's-law equilibrium, where c_k^G/H_k is the dissolved concentration that _would_ exist in equilibrium with the local gas composition. Note that concentration is genuinely **discontinuous** across Γ — for oxygen at 37 °C the gas-side value exceeds the equilibrium liquid-side value by a factor of 38. That discontinuity is why two separate transport interfaces are required rather than one continuous field, and the equal-and-opposite pairing is what conserves mass between them.

#### 5. Initial conditions

$$c_S(0) = c_{S0}, \quad c_X(0) = c_{X0}, \quad c_P(0) = 0$$

$$c_{O_2}(0) = \frac{c_{O_2}^{G,0}}{H_{O_2}}, \qquad c_{CO_2}(0) = \frac{c_{CO_2}^{G,0}}{H_{CO_2}}$$

The dissolved gases are set _in Henry equilibrium with the inlet gas_ rather than specified independently. This gives exactly zero interfacial flux at t = 0, so the first thing the solver sees is biology, not an artificial start-up transient.

### Boundary conditions

The whole boundary set in one table:

<div class="table-wrap">

|Boundary|Flow|Species|
|---|---|---|
|Vessel and headspace walls|**u** = 0|**n**·**N** = 0|
|Stirrer surfaces|**u** = (−ω y, ω x, 0)|**n**·**N** = 0|
|Gas inlet|**u** = −v_in **n**|c_j = c_j^{G,0}|
|Gas outlet|p = 0|convective outflow|
|Interface Γ|**u**·**n** = 0, zero shear|flux as above|
|Rotating-zone pairs|**u**, p continuous|c continuous|

</div>

Node by node, with the reasoning:

**Laminar Flow (`spf`) — liquid, domains 2 and 3**

<div class="table-wrap">

|Node|Where|Imposes|Why|
|---|---|---|---|
|`Wall 1`|default|No slip, **u** = 0|Bottle wall and closed liquid ports. A viscous fluid does not move relative to a solid surface.|
|`RotatingWall`|`ShaftSurface`|**u** = (−ω·y, ω·x, 0)|Rigid-body rotation about z. This is the _only_ energy input to the system — all mixing originates here.|
|`FreeSurfaceSlip`|`FreeSurface_L`|**u·n** = 0, zero shear|A real gas–liquid interface carries no shear stress, and this also prevents liquid leaving the domain.|
|`Flow Continuity`|rotating-zone pairs|**u**, _p_ continuous|Form Assembly disconnects touching domains by default; this reconnects them. Its absence caused the identical-failure-at-every-ω signature we chased in the first baseline.|

</div>

**Laminar Flow 2 (`spf2`) — headspace, domain 4**

<div class="table-wrap">

|Node|Where|Imposes|Why|
|---|---|---|---|
|`Wall`|default|No slip|Headspace wall, cap, shaft above the liquid|
|`Inlet`|`GasInlet`|Normal inflow, `v_gas_in`|Continuous air sweep|
|`Outlet`|`GasOutlet`|_p_ = 0|Lets gas leave without over-constraining|
|Slip wall|`FreeSurface_G`|Zero shear|Gas-side mirror of the liquid condition|

</div>

**Transport of Diluted Species (`tds`) — liquid, 5 species**

<div class="table-wrap">

|Node|Where|Imposes|Why|
|---|---|---|---|
|`No Flux 1`|default|**N·n** = 0|Nothing crosses the wall, shaft, or closed ports|
|`Initial Values`|domain|`cS0`, `cX0`, `cP0`, `cO2_L0`, `cCO2_L0`|Gas species in Henry equilibrium, so no spurious t = 0 flux|
|`Continuity`|rotating-zone pairs|_c_ continuous|Species must cross the rotating-zone boundary just as momentum does|
|_(pending)_ `Flux`|`FreeSurface_L`|**N** = k_L(c* − c)|Oxygen in, CO₂ out|

</div>

**Transport of Diluted Species 2 (`tds2`) — headspace, 2 species**

<div class="table-wrap">

|Node|Where|Imposes|Why|
|---|---|---|---|
|`No Flux 1`|default|Zero flux|Headspace walls|
|`Inflow`|`GasInlet`|`cO2_G0`, `cCO2_G0`|Fresh air composition entering|
|`Outflow`|`GasOutlet`|Convective outflow only|Species leave at whatever concentration they reached — no value imposed|
|_(pending)_ `Flux`|`FreeSurface_G`|Equal and opposite to the `tds` flux|Conserves mass across Γ|

</div>

Because the geometry is built as an **assembly** rather than a union, coincident boundaries between the impeller sub-domain and the bulk liquid are disconnected by default. The continuity pairs are what restore the physical connection. This is the single most common way a COMSOL rotating-machinery model fails silently, so it is worth checking first if a result looks impossibly uniform.

### Solver strategy

<div class="callout warn">

<p class="callout-label">Content coming soon</p>

This section will describe the segregated/direct solver settings and convergence criteria used for the coupled flow and species-transport problem.

</div>

### Results

<div class="callout warn">

<p class="callout-label">Content coming soon</p>

Results from the baseline stirred-vessel run will be added here once available.

</div>

### Discussion

Five things we already know are weak, listed honestly because a model page that claims no limitations is not believed:

<div class="callout warn">

<p class="callout-label">1. The Reynolds number says this may not be laminar</p>

With ρ = 1010 kg/m³, N = 100 rpm ≈ 1.67 s⁻¹, D = 65.6 mm and μ = 1.1 mPa·s, Re ≈ 6.6 × 10³. For a stirred tank, Re > ~10⁴ is fully turbulent and Re < ~10 is laminar; 6.6 × 10³ sits squarely in the transitional regime. A Laminar Flow interface will still converge and still produce a smooth, plausible-looking velocity field — it will simply be wrong, and it will underestimate mixing. **Action:** run the same case with the k–ε turbulence model and compare mixing time. If they disagree, report the turbulent result.

</div>

<div class="callout warn">

<p class="callout-label">2. There is a unit bug in N_rot</p>

It is defined as `N_rot = omega_rot` with `omega_rot = 100[rpm]`, but the description says rev/s. COMSOL will handle the unit conversion internally, so `Re_imp` is probably fine — but the definition should read `omega_rot` explicitly converted, so that nobody reading the parameter table has to guess. Rename or re-express it.

</div>

<div class="callout critical">

<p class="callout-label">3. m_O2 is almost certainly two orders of magnitude too high</p>

A maintenance coefficient of 0.02 mol O₂ per gram of biomass per hour implies that 1 g/L of cells consumes 20 mol O₂ m⁻³ h⁻¹. Saturated dissolved oxygen at 37 °C is about 0.2 mol/m³. Literature values for _E. coli_ maintenance are nearer 10⁻⁴–10⁻³ mol g⁻¹ h⁻¹. Unless this is deliberate, the model will predict oxygen collapse driven entirely by a typo. **Check this before running anything else.**

</div>

<div class="callout accent">

<p class="callout-label">4. Headspace-only aeration is a very small oxygen supply</p>

k_L = 3 × 10⁻⁵ m/s across a flat interface of area _A_ gives a k_La of roughly k_L·(A/V) — for a typical bottle that is on the order of 1–5 h⁻¹, an order of magnitude below what a sparged lab fermenter achieves. This may well be the real, physical conclusion of the study (headspace aeration is not enough, we need sparging or a membrane), which would be a genuinely useful result — but it should be stated as a finding, not left as a hidden consequence of a parameter choice.

</div>

<div class="callout critical">

<p class="callout-label">5. The model does not currently contain gravity</p>

This is the most important gap, because low gravity is the premise of the whole project. In the incompressible Navier–Stokes form written above, gravity appears only as a hydrostatic pressure term and is absorbed into _p_; with no density variation and no free-surface deformation, **a 1 g and a 0 g simulation would produce identical results.** To actually model microgravity you need at least one of:

- a **buoyancy term** with a temperature- or concentration-dependent density (Boussinesq), so that natural convection can exist at 1 g and vanish at 0 g;
- a **deformable free surface** with surface tension, since in microgravity the Bond number collapses and capillary forces set the interface shape;
- **two-phase flow** if bubbles are involved, since bubble rise velocity is the single thing microgravity most obviously removes.

Adding the first of these is the cheapest and gives you the headline comparison the project needs: **1 g versus 0 g, same geometry, same cells.** Right now the page argues microgravity matters and then presents a model in which it cannot.

</div>

#### Sensitivity analysis

Once the base case is trusted, run a parametric sweep over the parameters you trust least — `mu_max`, `K_O2`, `kL_O2`, `m_O2` — at ±50%, and report how much the final biomass moves. This separates "the model says X" from "the model says X, and X is robust to the numbers we guessed."

## Model 2 — Alternative geometries

### Design goals

<div class="callout warn">

<p class="callout-label">Content coming soon</p>

State here which geometries you are comparing and why each is a candidate — e.g. paddle impeller vs. rotating-wall vessel vs. membrane-aerated bag — and what metric decides the winner. Define the metric **before** showing results: e.g. _the design with the highest minimum dissolved oxygen at 24 h, subject to a mixing time under 60 s._

</div>

### Results

<div class="callout warn">

<p class="callout-label">Content coming soon</p>

A single comparison table across designs, same columns for every design, is worth more than three pages of individual write-ups:

</div>

<div class="table-wrap">

|Design|Mixing time (s)|Mean shear (s⁻¹)|Min. dissolved O₂ (mol/m³)|Final biomass (g/L)|Power in (W)|
|---|---|---|---|---|---|
|Paddle impeller (baseline)|—|—|—|—|—|
|—|—|—|—|—|—|

</div>

### Discussion

<div class="callout warn">

<p class="callout-label">Content coming soon</p>

</div>

## What the modelling changed

<div class="callout warn">

<p class="callout-label">Content coming soon — this is the section judges weight most heavily</p>

Two short subsections, in the Munich style:

**Dry lab impact.** Which design decision did the model actually make? Name it. "We ran three impeller geometries and chose X because Y" is a result; "the model informed our design" is not.

**Wet lab impact.** What did the model predict, and what did the experiment show? Include the case where they disagreed — a model that was wrong in an interesting way and then corrected is stronger evidence of real modelling work than a model that was right about everything.

</div>

## References

<div class="callout warn">

<p class="callout-label">Content coming soon — the easiest gap to close</p>

Cite at minimum:

- the source of every kinetic parameter (μ_max, K_S, K_O2, Y_X/S, Y_X/O2, m_O2) — for each row of the parameter table, a reader should be able to find where the number came from;
- diffusivity and Henry-constant sources at 37 °C;
- the two-film theory and Luedeking–Piret original papers;
- COMSOL Multiphysics 5.5, with version and module list.

A practical way to do this on the wiki: add a **Source** column to the parameter tables rather than a separate reference list. It doubles as a credibility signal and it stops readers from having to cross-reference.

</div>
