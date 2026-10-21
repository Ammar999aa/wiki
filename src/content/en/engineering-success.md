## The DBTL cycle

Our project went through numerous DBTL cycles throughout the year, with each iteration helping us improve our system. Below is a summary of each major cycle SHIHAB went through, grouped into three tracks.

<div class="flow">
<span class="flow-node accent">Design</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Build</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Test</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">Learn</span>
</div>

During the Design stage, ideas are developed and hypotheses are formulated based on scientific knowledge and project objectives. In the Build stage, these designs are translated into biological constructs, experimental setups or prototypes. The Test stage evaluates the performance of the system through experiments and data collection. Finally, in the Learn stage, the results are analyzed to identify successes, limitations and opportunities for improvement.

The insights gained are then used to inform the next design iteration, creating a continuous cycle of optimization. By repeatedly applying the DBTL framework, we can systematically refine our solutions and make evidence-based decisions throughout the engineering process.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image56.avif" alt="Diagram of the Design, Build, Test and Learn stages arranged as a repeating loop"></div><figcaption class="caption"><strong>Figure 1. Each pass through the loop sets up the next one: what we learn in one iteration becomes the design of the following one.</strong> The four stages of the Design–Build–Test–Learn framework.</figcaption></figure>
</div>

# Hardware Cycles

The bioreactor, with six cycles of [COMSOL simulation](#bioreactor-simulation) behind its rotor, and the two halves of the protein purification system, [filtration](#filtration-unit) and [fluid dispensing](#fluid-dispensing). Twenty-five design iterations in total.

## Bioreactor simulation

We used COMSOL Multiphysics 5.5 <a class="cite" href="#ref-1">1</a> to test each stirrer prototype. The three prototypes were first compared in 2D axisymmetric models, and what each model taught us led to the next prototype. Prototype 3, the one we chose, was then rebuilt as a full 3D model to validate and correct the 2D results, especially the analysis of the surface vortex. Adding air bubbles through a turbulent bubbly-flow model showed how gravity changes how long the air stays in the liquid. The final result is a set of rpm windows for the Earth, Mars and Moon operating modes of the bioreactor platform.

We judged each design by the possible engulfment of the paddles: the point at which the surface dip at the shaft reaches the top of the upper blade row and the rotor starts to pull in air.

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: A conventional bottom impeller in 2D</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We started in 2D because an axisymmetric model is cheap enough to sweep rpm and gravity quickly. Prototype 1 was a conventional design: a single large propeller at the bottom of the vessel. The question was whether it mixes the whole liquid and keeps the surface vortex away from the impeller.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image15.avif" alt="Streamline plot of the velocity field in the 2D model of Prototype 1: a large recirculation loop fills the upper part of the vessel and a smaller loop sits beside the propeller at the bottom"></div><figcaption class="caption"><strong>Figure 2. Prototype 1 concentrates its flow near the bottom of the vessel.</strong> Velocity-field streamlines from the 2D simulation of Prototype 1.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We built model 2B, a 2D axisymmetric laminar-flow model with swirl, in which the propeller is represented as a rotating paddle on the bottom. The paddle is large, about 65 mm in diameter, so the Reynolds number grows quickly with speed:

```
Re = ρ N D² / μ
```

At 200 rpm this gives about 13,000.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The model converged only up to 100 rpm. At 150 rpm the Reynolds number is already about 10,000, and we treated the failed speeds as missing outputs. At 100 rpm we followed air bubbles in Earth, Mars, Moon and transit gravity.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image30.avif" alt="Bubble positions in the 2D model of Prototype 1 at 100 rpm for Earth, Mars, Moon and transit gravity, each shown as a side slice of the vessel above a view from above"></div><figcaption class="caption"><strong>Figure 3. Bubbles in four gravities with Prototype 1.</strong> Side slice and view from above of the 2D model at 100 rpm, for Earth, Mars, Moon and transit gravity.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The flow concentrated near the bottom and left a slow region above the propeller. The large diameter also gave high Reynolds numbers and strong swirl at low rpm, so the model could not even reach the speeds we wanted to test. We needed a smaller rotor that could spread the velocity more uniformly.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Spreading the stirring over three blade rows</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

To stir the full height of the liquid instead of only the bottom, Prototype 2 placed three rows of large flat blades along the shaft.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image33.avif" alt="Streamline plot of the velocity field in the 2D model of Prototype 2: separate recirculation loops sit between and beside the three blade rows"></div><figcaption class="caption"><strong>Figure 4. Prototype 2 splits the liquid into separate circulation loops.</strong> Velocity-field streamlines from the 2D simulation of Prototype 2.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We kept the 2D axisymmetric approach and represented each blade row as a rotating ring on the shaft. The rotor diameter in this model was 45 mm.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The model converged up to 200 rpm. At 250 rpm the flow became unstable after about 68 s. We then followed the free surface in Earth, Mars and Moon gravity while sweeping the speed. At 153 rpm the dip at the shaft was 1.81 mm on Earth (7% of the margin), 4.78 mm on Mars (20%) and 10.94 mm on the Moon (45%).

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image50.avif" alt="Free-surface profiles of Prototype 2 at 165 rpm for Earth, Mars and Moon gravity, with the dip at the shaft deepening from Earth to Moon and a dashed engulfment line at the top blade row"></div><figcaption class="caption"><strong>Figure 5. Prototype 2 digs a deep vortex at modest speed, and the dip is deeper in Mars and Moon gravity.</strong> Free-surface profile against the engulfment level for each gravity.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The large flat blades split the liquid into separate circulation loops at each blade row and disturbed the liquid surface noticeably. They also dug a deep vortex at modest rpm, so on the Moon the rotor would reach engulfment at low speeds. This led us to smaller, tilted blades.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Cycle 3: Small tilted blades for a shallower vortex</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Prototype 3 uses three rows of four small blades, tilted 39° from horizontal, on a 29 mm rotor. The tilted blades should pump the liquid upward along the shaft while keeping the vortex shallow.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image4.avif" alt="Streamline plot of the velocity field in the 2D model of Prototype 3: four stacked recirculation loops with an upward stream along the shaft"></div><figcaption class="caption"><strong>Figure 6. Prototype 3 drives stacked recirculation loops with an upward stream along the shaft.</strong> Velocity-field streamlines from the 2D simulation of Prototype 3.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We built a 2D axisymmetric laminar-flow model with swirl, solved from 0 to 120 s with the speed ramped up over the first 4 s. A ring cannot be tilted in 2D, so the tilt entered only through the wall velocity imposed on the rings. This is a shortcut, since a ring cannot push liquid the way a real tilted blade does.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

<div class="table-wrap">

| Speed | Earth dip | Mars dip | Moon dip |
| --- | --- | --- | --- |
| 200 rpm | 0.32 mm | 0.85 mm | 1.95 mm |
| 400 rpm | 1.07 mm | 2.82 mm | 6.46 mm |

</div>

<div class="caption">

**Table 1. In the 2D model the surface dip grows with speed and is deeper in lower gravity.** Surface dip at the shaft for Prototype 3.

</div>

At 200 rpm the mean circulation speed was 24 mm/s and 9% of the liquid moved slower than 3 mm/s. The flow formed four stacked recirculation loops, with a strong upward stream along the shaft between rows 2 and 3.

We also released 100 µm air bubbles. On Earth about 99% left through the surface within about 5 s, while on the Moon only about 60% left. In transit, 90 to 97% reached the air column of radius 13.2 mm that forms around the axis.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Prototype 3 dispersed the bubbles best and kept the vortex shallow, so we chose to base our real prototype on this one. Two shortcuts remained: the tilt existed only as a wall velocity, and an axisymmetric model cannot represent discrete blades. Both needed checking in 3D.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span>Cycle 4: Validating Prototype 3 in 3D</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We rebuilt Prototype 3 in 3D with its real tilted blades and kept the 2D assumptions: a flat slip lid and gravity off. Any difference between 2D and 3D would then come from the blades themselves.

<div class="figure-grid" style="--fig-h: 260px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image72.avif" alt="Computational mesh of the Prototype 3 rotor in the 3D model"></div><figcaption class="caption"><strong>Figure 7. The mesh of Prototype 3.</strong> The rotor and the liquid around it in the 3D model.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image11.avif" alt="Sliced velocity field of the 3D simulation of Prototype 3"></div><figcaption class="caption"><strong>Figure 8. The velocity field of the 3D simulation.</strong> Sliced velocity field result.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We imported the rotor STEP file from CAD and checked it against the design: 29.0 mm diameter, Ø6 mm shaft, blades at 39.0° and 4.92 mm tall, and rows at 13.84, 43.84 and 73.84 mm with no stagger between them. From the CAD we confirmed that the lower blade edge leads during clockwise rotation, so the rotor pumps upward. The blades sit inside a rotating domain, a cylinder of radius 18 mm, joined to the stationary liquid with flow continuity. We solved laminar flow with a Frozen Rotor study.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The first solve diverged. We traced it to three causes: the iterative solver, constant damping and a crushed boundary-layer element at a blade root. Removing the boundary layers on the blades, switching to a direct solver with automatic Newton damping, and stepping the speed 0 → 1 → 2 → 5 → 10 → 25 rpm made every step converge. At 25 rpm the blade tips moved at 38 mm/s, as expected, which confirmed that the velocities are in the lab frame. We tried two mesh builds.

<div class="table-wrap">

| Mesh | Degrees of freedom | Solver |
| --- | --- | --- |
| Coarse | 66 k | Direct |
| A | 278 k | Direct |
| B | 543 k | Iterative (AMG), 5.4 GB |

</div>

<div class="caption">

**Table 2. Mesh B is the finest of the three, and the only one that needed an iterative solver.** The meshes compared in the 3D model.

</div>

Between meshes A and B at 100 rpm, the dip changed by 2 to 5%, the mean speed by 2%, the power by about 9% and the pumping per row by about 20%. A bug that removed the floor boundary layers first showed up as a 17% difference in the dip, which taught us that the floor layer matters. Mass was conserved within 3% through rows 1 and 2, but the error reached 20 to 30% above row 3, so we treat the flow there as qualitative only.

We then swept mesh B from 0 to 400 rpm (5.5 h of simulation):

<div class="table-wrap">

| Speed | Earth dip | Mars dip | Moon dip |
| --- | --- | --- | --- |
| 100 rpm | 0.41 mm | 1.07 mm | 2.45 mm |
| 150 rpm | 0.98 mm | 2.59 mm | 5.93 mm |
| 200 rpm | 1.80 mm (7%) | 4.76 mm (20%) | 10.9 mm (45%) |
| 250 rpm | 2.89 mm | 7.65 mm | 17.5 mm |
| 300 rpm | 4.25 mm | 11.2 mm | 25.7 mm (over the margin) |
| 350 rpm | 5.92 mm | 15.7 mm | 35.9 mm |
| 400 rpm | 7.91 mm (32%) | 20.9 mm (86%) | 47.9 mm |

</div>

<div class="caption">

**Table 3. In 3D the Moon runs out of margin first, between 250 and 300 rpm.** Surface dip at the shaft against speed and gravity. Percentages in brackets are the share of the margin the dip uses.

</div>

The dip grows roughly with rpm², as expected for a free-surface vortex in an unbaffled vessel <a class="cite" href="#ref-2">2</a><a class="cite" href="#ref-3">3</a>. The Moon reaches engulfment at about 290 rpm. On Earth and Mars engulfment lies beyond the simulated range, at about 680 and 430 rpm by extrapolation. The 3D dips are 5 to 7 times the 2D ones (1.80 against 0.32 mm on Earth at 200 rpm): the 2D rings turn the liquid only by friction, while real tilted blades push it and create much more swirl.

Between 100 and 400 rpm the Reynolds number of this model is 1,300 to 5,100, which is transitional for stirred vessels <a class="cite" href="#ref-4">4</a>, so the steady laminar model gives the average flow.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image45.avif" alt="3D free-surface and dip profiles of Prototype 3 from 50 to 400 rpm for Earth, Mars and Moon gravity, with an engulfment warning where the Moon dip reaches the blades"></div><figcaption class="caption"><strong>Figure 9. The same flow digs a deeper dip at lower gravity; the Moon reaches the blades at about 290 rpm.</strong> 3D free surface and dip profile from 50 to 400 rpm in Earth, Mars and Moon gravity, with the engulfment warning.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The 2D model was a little too optimistic about the vortex. In 3D the Moon reaches engulfment at about 290 rpm, so the Moon mode on the platform has to be capped and the 3D dips replace the 2D limits. We also conclude that Prototype 3 still mixes very evenly.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">5</span>Cycle 5: Adding air bubbles to the 3D model</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We added air to see how gravity changes where the bubbles go and how long they stay in the liquid. The air outlet sits around the last paddle ring at the bottom of the shaft.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

The air enters through a smooth ring source near the base of the shaft (r ≈ 9 mm, 2.5 mm above the floor). We avoided a small inlet face, because the sharp gas jet it creates commonly stops bubbly-flow models from converging. The bubbles are 100 µm in diameter and the air is at 37 °C (1.14 kg/m³). Their drag follows the Hadamard–Rybczynski law for small spherical bubbles <a class="cite" href="#ref-5">5</a>, with the slip velocity from a balance between pressure and drag. The top surface lets gas out while the liquid slides along it, and gravity is now on. We reused mesh A from the previous cycle.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We first solved laminar bubbly flow with a segregated solver. Starting directly at 10% of the planned air flow diverged, but ramping up from 1% worked, slowly. Gas collected on the blades: at 100 rpm the peak gas fraction was 5% at 1.3 mL/min, 23% at 6.4 mL/min and 62% at 12.8 mL/min, and 32 mL/min diverged, crashing the simulation. Faster rotation collected more gas (27% at 150 rpm and 6.4 mL/min). The bubbles are pushed into the low pressure behind the blades and float up against their undersides, which matches the gas cavities known to form on gassed impellers <a class="cite" href="#ref-4">4</a>. On the Moon at 6.4 mL/min the solution never settled: the errors cycled for 1,500 iterations, a sign of an unsteady gas build-up.

We then solved turbulent bubbly flow with the k-ε model. All 9 steps converged, and the air leaving through the surface matched the air going in within 1 to 2%. At 200 rpm and 6.4 mL/min:

<div class="table-wrap">

| Quantity | Earth | Mars | Moon |
| --- | --- | --- | --- |
| Average gas fraction | 0.19% | 0.56% | 1.35% |
| Air held in the liquid | 1.2 mL | 3.6 mL | 8.6 mL |
| Bubble residence time | 11 s | 34 s | 80 s |
| Peak gas fraction | 4.3% | 3.6% | 5.2% |
| Surface dip at the shaft | 1.15 mm | 3.2 mm | 7.4 mm |

</div>

<div class="caption">

**Table 4. Bubbles stay in the liquid roughly seven times longer on the Moon than on Earth.** Turbulent bubbly-flow results at 200 rpm and 6.4 mL/min of air.

</div>

The residence times match the time a 100 µm bubble needs to rise 100 mm in still liquid (13, 36 and 81 s). The flow carries the bubbles around but does not trap them.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image1.avif" alt="Bubble tracers in the 3D flow for Earth, Mars, Moon and transit gravity, each shown as a side view above a view from above"></div><figcaption class="caption"><strong>Figure 10. Weaker gravity keeps bubbles longer in the liquid.</strong> Bubble tracers in the 3D flow in Earth, Mars, Moon and transit gravity, side view and view from above. The tracers move in the steady average flow and illustrate how the air spreads.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The laminar and turbulent models bracket the real vessel, one with gas collecting at the blades and the other with evenly spread gas. Gravity sets the bubble residence time, which is about seven times longer on the Moon than on Earth. For the rpm limits we kept the laminar dips, as the safe side.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">6</span>Cycle 6: rpm windows for the Earth, Mars and Moon modes</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Rpm is the one control on the platform that acts on both the vortex and the bubble residence time. We combined the vortex results of Cycle 4 and the residence results of Cycle 5 into an rpm window for each gravity mode. For now, this considers oxygen only, comparing how long a bubble stays with how long it needs to hand over its oxygen <a class="cite" href="#ref-6">6</a>.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We wrote a Python script (`rpm_windows_P3.py`) with three criteria, all editable:

- **Mixing:** at most 1% of the liquid slower than 3 mm/s, which gives a lower limit of about 153 rpm. Gravity does not affect it.
- **Vortex:** the dip may use at most 50% of the 24.4 mm margin. Since the dip grows roughly with rpm², this sits about 30% below the engulfment speed.
- **Oxygen:** each bubble must stay long enough to hand over 95% of its O₂.

A bubble's O₂ relaxes toward equilibrium with the liquid with the time constant

```
τ_O₂ = (d / 6) · H_cc / k_L
```

where H<sub>cc</sub> ≈ 36.2 is the gas-to-liquid O₂ ratio at 37 °C <a class="cite" href="#ref-7">7</a>. We took k<sub>L</sub> from the Ranz–Marshall correlation <a class="cite" href="#ref-8">8</a> for a rigid interface, the conservative case for small bubbles <a class="cite" href="#ref-5">5</a>, with D<sub>O₂</sub> = 2.8×10⁻⁹ m²/s <a class="cite" href="#ref-9">9</a>:

```
Sh = 2 + 0.6 Re^½ Sc^⅓
```

This gives τ<sub>O₂</sub> = 3.8, 5.1 and 6.2 s on Earth, Mars and the Moon. Handing over 95% takes 3 τ<sub>O₂</sub>, so the residence time must be at least 11.5, 15.3 and 18.6 s.

For the residence time we fitted a simple model to the six COMSOL points, within 3.3%:

```
τ = a / v_rise − b / U(rpm)
```

with a = 100.6 mm (the liquid height) and b = 189 mm. The first term is the rise time through the liquid, set by gravity. The second is a shortcut taken by bubbles in the upward stream along the shaft, which shrinks as the liquid circulates faster. The circulation speed U(rpm) = 0.513·rpm − 16.9 mm/s comes from the turbulent runs and is extrapolated above 200 rpm.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

<div class="table-wrap">

| Mode | 100 rpm | 150 rpm | 200 rpm | 250 rpm | 300 rpm | 400 rpm |
| --- | --- | --- | --- | --- | --- | --- |
| Earth | 7.9 s (87%) | 10.3 s (93%) | 11.2 s (95%) | 11.7 s (95%) | 12.0 s (96%) | 12.4 s (96%) |
| Mars | 30.0 s | 32.3 s | 33.3 s | 33.8 s | 34.1 s | 34.5 s |
| Moon | 75.7 s | 78.1 s | 79.0 s | 79.5 s | 79.9 s | 80.2 s |

</div>

<div class="caption">

**Table 5. On Earth the bubble residence time depends on rpm; on Mars and the Moon it barely does.** Bubble residence time, with the share of O₂ handed over in brackets. On Mars and the Moon, about 100% of the O₂ is handed over at every speed.

</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Result</span><div class="iter-body">

<div class="table-wrap">

| Mode | rpm window | Setpoint | Dip (margin used) | Bubble residence | O₂ handed over | What sets the limits |
| --- | --- | --- | --- | --- | --- | --- |
| Earth | 225 to 400 | 300 rpm | 4.2 mm (17%) | 12.0 s | 96% | Low end: bubble residence. High end: tested range (dip only 32% of the margin at 400 rpm). |
| Mars | 155 to 310 | 220 rpm | 5.8 mm (24%) | 33.5 s | ≈100% | Low end: mixing. High end: vortex. |
| Moon | 155 to 210 | 180 rpm | 8.7 mm (36%) | 78.7 s | 100% | Low end: mixing. High end: vortex (engulfment at 293 rpm). |

</div>

<div class="caption">

**Table 6. Each gravity mode gets its own rpm window, and the Moon's is the narrowest.** The setpoint is the geometric mean of the window, rounded to 5 rpm, so it is equally far from both limits on the rpm² scale of the dip.

</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The same control has opposite needs, and gravity decides which side limits it. The dip grows roughly with rpm²/g, so the engulfment speed falls with √g: from about 680 rpm on Earth to 430 on Mars and 290 on the Moon. On Earth, going from 100 to 400 rpm lengthens the residence time from 7.9 to 12.4 s (+57%) and lifts the O₂ each bubble hands over from 87 to 96%, so rpm decides whether the bubbles are fully used.

On Mars and the Moon the rise is slower. The residence stays at about 33 and 79 s at any rpm, 2 to 4 times what is needed, so rpm is free to be set by the vortex. Earth wants rpm up, the Moon wants it down and Mars sits in between, which is why the platform needs gravity-specific modes. These windows supersede the earlier limits behind those modes.

On Mars and the Moon the bubbles also stay longer than useful at every speed, that is, after 25 and 31 s. rpm cannot shorten their time in the liquid; that would need other levers, such as the gas flow rate or the bubble size. For transit we suggest a moderate 100 to 150 rpm, while the real levers are in the design: a small gas volume and venting the air at the axis.

With clean bubbles, whose mobile interface follows penetration theory <a class="cite" href="#ref-10">10</a>, O₂ transfers about three times faster. The Earth low end then drops to the mixing limit (155 rpm), with a setpoint of 250 rpm, so the 225 rpm low end is the conservative case.

</div></div>
</div>

</div>

<div class="callout warn">

<p class="callout-label">Limitation of the bubble results</p>

The bubble results assume 100 µm bubbles and 6.4 mL/min of air (0.01 vessel volumes per minute); real sparger bubbles may be 1 to 3 mm and may arise faster. At this air flow the bubbles can supply at most about 5 mmol O₂ L⁻¹ h⁻¹, which still has to be compared with the culture's uptake <a class="cite" href="#ref-11">11</a>.

</div>

## Bioreactor

Eleven iterations took the bioreactor from a magnetic stirrer that would not stay centered to a compact, sensor-controlled unit that held an *Escherichia coli* culture for ten hours without intervention.

<div class="callout">

<p class="callout-label">Where the test data for these cycles lives</p>

The first nine iterations below are the design history; the measurements that validate the final build — temperature stability, pH response, growth curves and sterility checks — are reported on the [Hardware page](/kaust-ksa/hardware#experimental-validation).

</div>

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Iteration 1: Magnetic stirring</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

To keep the culture mixed without relying on gravity-driven convection, we first tried magnetic stirring, using a 3D-printed attachment on a glass rod that held a magnetic bead for stirring.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We 3D-printed the attachment and fitted it to a glass rod to hold the magnetic bead measuring 50 mm in length and 8 mm in diameter. The attachment has a small gap to allow for small size adjustments so that the magnet can be attached and detached.

<div class="figure-grid" style="--fig-h: 200px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image21.avif" alt="3D-printed attachment for holding the magnetic bead: a horizontal bar with a vertical socket on top and two split clips underneath"></div><figcaption class="caption"><strong>Figure 11. A 3D-printed attachment on a glass rod held the magnetic bead for stirring.</strong></figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image31.avif" alt="Side view of the attachment showing the split ring clip with a small gap"></div><figcaption class="caption"><strong>Figure 12. The attachment has a small gap so the magnet can be attached and detached.</strong> Side view.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The bead did not rotate about the central axis. Instead, it traveled around a radius, tracing an off-center circle rather than spinning in place, so the stirring was not centered in the vessel as intended.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Magnetic stirring with this arrangement could not give the stable, centered rotation we needed, so we went back to a motor-controlled rotor and redesigned how it is mounted.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Iteration 2: Enclosed motor and coupling</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We returned to our initial idea of a motor-controlled rotor, but built it so that the motor is fully enclosed in a housing and can be easily replaced if it breaks down. We also consulted Prof. Matteo Parsani (Computer, Electrical and Mathematical Science and Engineering Division, KAUST) on what to look out for in this iteration of the design, and as per his advice, we made sure future iterations of the bioreactor would allow for the motor and other components to be easily replaced should they fail. The motor is also kept out of contact with the culture: we increased the separation between motor and culture by adding an extra attachment that acts as a coupling between the rotor and the motor.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We 3D-printed the motor housing and the coupling attachment. The motor sits with a comfortable fit in the housing, and is further secured with four screws on the sides to prevent the motor from slipping in the housing. Though the motor is already non-contacting with the culture, we also redesigned the housing to cover the motor fully for enhanced protection from the culture.

<div class="figure-grid" style="--fig-h: 200px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image60.avif" alt="Previous motor housing: a transparent printed cylinder with a flange, with the back of the metal motor and its terminals sticking out past the flange"></div><figcaption class="caption"><strong>Figure 13. The first motor housing did not cover the motor fully.</strong> Previous housing.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image28.avif" alt="Redesigned motor housing: a transparent printed cylinder with a flange that fully covers the motor, with the shaft out of the front, screw holes on the side and wires leaving the back"></div><figcaption class="caption"><strong>Figure 14. The redesigned housing covers the motor fully.</strong> This gives the motor enhanced protection from the culture.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We ran the rotor at an rpm range of 30–1,200 and checked for its rotation and stability, as well as the ease of swapping the motor.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The coupling and enclosed housing let us keep the motor-driven rotor while isolating the motor from the culture and making the motor easy to service or replace. While mixing seemed fine on Earth, we knew we had to account for fluid behavior under microgravity conditions, which we explored in the next iteration.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Iteration 3: Rotor optimized for lower gravity</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We redesigned the rotor geometry so that mixing does not depend on gravity, using flow simulations to guide the changes.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We printed three rotor variants that differed in blade angle, blade count and height.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We first conducted a computational fluid dynamics (CFD) simulation on COMSOL Multiphysics <a class="cite" href="#ref-1">1</a> to obtain an initial idea of how the three geometries affect mixing. The three prototypes, and what each simulation taught us, are worked through in [Bioreactor simulation](#bioreactor-simulation).

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image74.avif" alt="Schematic cross-sections of the three rotor geometries in the vessel with their circulation patterns: one large propeller at the bottom with a slow region above, three rows of large flat blades with separate circulation loops, and three rows of small tilted blades with one large loop along the full height"></div><figcaption class="caption"><strong>Figure 15. Three rotor geometries produced different circulation patterns.</strong> Schematic cross-sections of the three rotor geometries and their circulation patterns.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

We chose the three-row small tilted-blade rotor (rotor diameter 29 mm, blades tilted 39°) because it gave the most uniform mixing of the three geometries. The single large propeller at the bottom mainly stirred the lower part of the vessel and left a slow region above it, while the large flat blades split the liquid into separate circulation loops at each blade row and disturbed the liquid surface noticeably. The small tilted blades instead drove one continuous circulation loop along the full height of the liquid, allowing for better circulation of oxygen throughout the medium while keeping the design compact.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span>Iteration 4: Integrating temperature control</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Now that we had settled the mixing, it was time to start integrating the sensors. We paired a flexible heating element (rated at 100 W) with a temperature sensor read by the Arduino microcontroller, which switches the heater on and off to hold the setpoint.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We fitted the 100 W heating element around our culture vessel (filled with ~400 mL water) and submerged the waterproof DS18B20 temperature sensor in the water.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image6.avif" alt="Red silicone flexible heating element labelled 300 mm by 120 mm, 12 V, 100 W, wrapped around the glass culture vessel with a multi-port cap on top"></div><figcaption class="caption"><strong>Figure 16. The 100 W heating element was too large for the vessel.</strong> The flexible heating element fitted around the culture vessel.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We tried to heat the water from a starting ambient temperature of ~20 °C to 34 °C.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

It was at this stage that we realized we had chosen a heating element of an unsuitable rating. Since it was rated at 100 W and 12 V, it required a current of ~8.3 A (which is pretty high) for optimal performance. However, this hugely increased power demand for our setup, and supplying the heating element with a much lower current of 1.5 A barely caused a temperature change. The heater was also a little too large for our culture vessel, causing air gaps in between the vessel and heater which reduced heating efficiency. We figured out that we would have to obtain a new heating element with lower power specifications, and proceeded to use a smaller 30 W heating element for the next iteration instead.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">5</span>Iteration 5: Improving temperature control</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We replaced the single 100 W heating element with two smaller 30 W heating elements, to lower the power demand and to fit the culture vessel better.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We attached two 30 W heaters, each measuring 15 × 5 cm (shown in orange in the image), which covered the circumference of the culture vessel. We also designed holders for the heaters to keep them in place, like a heating jacket.

<div class="figure-grid" style="--fig-h: 220px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image22.avif" alt="Render of the glass culture vessel with an orange band representing two 30 W heaters wrapped around its circumference"></div><figcaption class="caption"><strong>Figure 17. Two 30 W heaters cover the circumference of the vessel.</strong> The heaters are shown in orange.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image43.avif" alt="The bioreactor with the heater band wrapped around the glass vessel, held in the 3D-printed frame"></div><figcaption class="caption"><strong>Figure 18. The heater band on the bioreactor vessel.</strong> The bioreactor with the heater wrapped around the glass vessel.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We were able to raise the temperature of water from 18 °C to 47 °C.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The two 30 W heaters wrapped around the circumference of the vessel raised the water from 18 °C to 47 °C, well above the temperatures needed to culture *E. coli*, while drawing far less power than the 100 W element: both heaters together were supplied with just 1.5 A at 12 V (about 18 W in total). Covering the full circumference of the vessel gave even coverage, and the lower power draw made the system better suited to our energy-constrained design.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">6</span>Iteration 6: Fine-tuning temperature regulation</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We initially used a PID controller, written as code on the Arduino, to regulate the heating elements so that the temperature would approach the setpoint smoothly.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We implemented the PID loop on the Arduino, using the DS18B20 <a class="cite" href="#ref-12">12</a> temperature reading as the input and the heater power (PWM duty cycle, 0–255) as the output. The gains were set to Kp = 30, Ki = 0.5, Kd = 10 and the loop was updated once per second. After running into problems with this approach, we replaced it with a simple on/off controller that switches the heaters on when the temperature is below the setpoint and off when it reaches it.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The PID controller turned out to be overcomplicated for our setup, and delays in the response of the system arose. We then tested the much simpler on/off method, heating water from 18 °C to a setpoint of 36 °C. The water reached the setpoint in about 34 minutes and was then held there, as shown below. The detailed steady-state results are reported under [experimental validation](/kaust-ksa/hardware#experimental-validation) on the Hardware page.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image8.avif" alt="Line chart titled Bioreactor Temperature Profile with a 36 degrees C setpoint: temperature rises steadily from 18 degrees C to 36 degrees C over about 34 minutes, then holds flat for the rest of the 50-minute run"></div><figcaption class="caption"><strong>Figure 19. Simple on/off control held the temperature at the 36 °C setpoint.</strong> Water heated from 18 °C, reaching the setpoint after about 34 minutes and holding it for the remainder of the run.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Simple on/off control held the temperature within ±0.5 °C of the setpoint, which is more than precise enough for culturing *E. coli*. We realized we should have tested this much simpler method first: for a heated vessel, which responds slowly, PID control added complexity, tuning effort and delayed response without improving regulation. We therefore kept on/off control for the final design.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">7</span>Iteration 7: pH control</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We added a pH sensor and acid and base dispensing, controlled by the Arduino microcontroller, to keep the culture at its pH setpoint.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We integrated a pH sensor (typically used for continuous monitoring of aquarium pH) to the vessel and calibrated its output with the Arduino voltage reading. We also integrated water pumps which were to be used to dispense HCl and NaOH solutions to adjust the pH accordingly.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image51.avif" alt="Bioreactor prototype with the pH sensor installed through the lid of the glass vessel, below a 3D-printed electronics tray held up by four supports"></div><figcaption class="caption"><strong>Figure 20. The pH sensor was integrated into the prototype.</strong> Bioreactor prototype with the pH sensor installed.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We tested the pH regulation with actual acid and base solutions, adding acid and base to the culture medium and recording how the pH sensor responded. The results are reported under [experimental validation](/kaust-ksa/hardware#experimental-validation) on the Hardware page.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Calibrating the sensor output against the Arduino voltage reading allowed the Arduino to read the pH of the culture, and the pumps can dispense liquid on command from the Arduino. The tests with acid and base showed that the sensor follows sudden changes in pH and settles on its new value within about one to two minutes. We also worked out how much acid or base is needed to adjust the pH of a 500 mL culture.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">8</span>Iteration 8: Sterility and vessel design</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We chose a glass culture vessel that can be sterilized and made the non-autoclavable parts disposable or surface-sterilizable to ensure that the culture stays free of contamination.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We assembled the vessel with the 3D-printed lid consisting of six ports: four inlet ports for the dispensing of culture medium, acid/base for pH regulation, antifoam agent, and a gas inlet to supply oxygen to the broth; and two outlet ports, one for gas release to maintain internal gas pressure at ~1 atm, and another to transfer the final culture to the protein purification system. These ports were connected to sterilizable silicone tubing (inner diameter 2.5 mm) via luer lock connectors.

<div class="figure-grid" style="--cols: 3; --fig-h: 170px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image52.avif" alt="Render of the 3D-printed vessel lid, a disc with six threaded port connectors in the centre, a larger opening and a small opening for sensors, and slots around the edge"></div><figcaption class="caption"><strong>Figure 21. The 3D-printed lid has ports and sensor openings.</strong> The ports are threaded to fit luer lock connectors.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image32.avif" alt="Coil of clear silicone tubing in a plastic box"></div><figcaption class="caption"><strong>Figure 22. Silicone tubing connects the fluid lines.</strong> The tubing has a 2.5 mm inner diameter.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image66.avif" alt="Three clear plastic luer lock connectors with barbed tube ends"></div><figcaption class="caption"><strong>Figure 23. Plastic luer lock connectors join the tubing to the lid ports.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We first ran the whole setup with water to check the electrical components, then ran the bioreactor with an *E. coli* culture for 10 hours. It regulated temperature reliably and supported growth on its own. We also tested the sterilization procedure by incubating sterile LB in the vessel overnight, and it showed no contamination. The full results are reported under [experimental validation](/kaust-ksa/hardware#experimental-validation) on the Hardware page.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Testing with water first let us find electrical hazards before any culture was introduced. The vessel, six-port lid, tubing and connectors worked together as a complete, sterilizable system. Autoclaving sterilizes the glass vessel, and the parts that cannot be autoclaved are replaced or wiped with 70% ethanol.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">9</span>Iteration 9: Integration, controller and dashboard</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We combined the sensors and actuators on an Arduino Mega and added a touchscreen dashboard where the user sets the temperature, pH and motor speed, all in a compact enclosure. We initially planned to use a 16×2 LCD screen for the bioreactor, but realized that handling a larger touchscreen LCD on the dashboard might be more convenient for astronauts. A touchscreen also lets us display more information.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image75.avif" alt="Touchscreen LCD showing the SHIHAB Bioreactor welcome screen with the text Touch screen to start, wired to an Arduino on a breadboard"></div><figcaption class="caption"><strong>Figure 24. A touchscreen runs the dashboard.</strong> The LCD showing the SHIHAB welcome screen.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We wired and programmed the controller, built the dashboard interface and housed everything in a 3D-printed enclosure consisting of four removable supports and a compartment at the top for the electronics. The electronics compartment also has a removable lid for convenient troubleshooting should it be necessary.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image71.avif" alt="The assembled SHIHAB bioreactor: a 3D-printed base with the touchscreen and power switch, four supports holding the electronics tray at the top, and the glass vessel with the 3D-printed lid, rotor and heaters in the middle"></div><figcaption class="caption"><strong>Figure 25. The final bioreactor brings all components together in one compact unit.</strong> The assembled SHIHAB bioreactor.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We ran the full system for 10 hours again, for the final time, to check for any malfunctions. We found that everything worked as we planned. The sensors were responsive and managed to regulate the internal conditions of the culture chamber at the setpoint, and no overheating or failure of components was observed. However, we did notice a small issue, which was that after a few hours the LCD screen tended to go blank, even though the data was still being sent to the computer that we connected to the microcontroller for data acquisition (which was how we knew everything else was working as it should). After reading up on this issue, we suspected it could have been due to the higher current required to power the motors and heaters that was interfering with the signals being sent to the LCD.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

We were lucky to find that it was a simple fix that required separating the circuits of the high-current and low-current components to reduce their interference with each other. We did this for the final iteration of the bioreactor and managed to fix the issue of the LCD screen going blank.

This also showed us that a fault can appear only after several hours of running, so long full-system tests are necessary and short bench tests are not enough. Logging data to a computer in parallel with the display helped us tell a display fault apart from a system fault, and we would keep that logging in future versions.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">10</span>Iteration 10: Square motor housing and slot</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We redesigned the motor housing so that its top is a square part instead of the original circular part. This square part fits into a matching square slot in the top case of the bioreactor, the compartment that houses all of the electronics. A square part cannot turn inside a square slot, so the housing is held firmly in place and stays stationary even with the momentum of the motor rotating. The slot system is also more user-friendly than the previous version, in which the user had to screw the motor housing onto the bottom part of the electronics casing. We still included screw holes for extra security, should the user want that, or particularly for use in low-gravity settings.

<div class="figure-grid" style="--fig-h: 220px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image35.avif" alt="Top view of the square flange of the motor housing, showing the central circular opening and screw holes at the corners"></div><figcaption class="caption"><strong>Figure 26. The new housing has a square top.</strong> Top view of the square part, with its central opening and screw holes.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image48.avif" alt="Side view of the motor housing: a cylindrical body with a square flange at the top"></div><figcaption class="caption"><strong>Figure 27. The square part sits on a cylindrical body.</strong> Side view of the housing, with the square flange at the top.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We 3D-printed the new housing and the matching square slot in the top case of the electronics compartment. The motor sits inside the cylindrical body of the housing with its shaft coming out of the bottom, and the housing then drops into the slot from above. The square part has screw holes, so that screws and nuts can be added as an optional extra lock.

<div class="figure-grid" style="--fig-h: 240px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image46.avif" alt="The motor seated inside the printed housing, with two screws and nuts fitted through the square flange"></div><figcaption class="caption"><strong>Figure 28. The motor sits inside the new housing.</strong> The motor in its housing, with the two screws and nuts used for the optional lock.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image27.avif" alt="The empty square slot in the floor of the 3D-printed electronics compartment"></div><figcaption class="caption"><strong>Figure 29. The top case has a matching square slot.</strong> The empty slot in the floor of the electronics compartment.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We seated the motor housing in the slot and ran the motor, checking that the housing stayed stationary as the motor rotated. We also compared installing it with the previous version, in which the housing had to be screwed on, and fitted the optional screws to check that they could be used as an extra lock.

<div class="figure-grid" style="--fig-h: 240px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image25.avif" alt="Top view of the motor in its housing seated in the slot, with the motor wires leaving the compartment"></div><figcaption class="caption"><strong>Figure 30. The housing sits flush in the slot.</strong> Top view of the motor in its housing in the slot, with the motor wires leaving the compartment.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image19.avif" alt="Angled view of the motor in its housing seated in the slot of the top case"></div><figcaption class="caption"><strong>Figure 31. Seen from an angle.</strong> The motor in the slot of the top case.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The square slot holds the housing in place without tools, which makes the motor easier to install and replace than when the user had to screw the housing on. The screw holes remain available for users who want extra security, particularly in low-gravity settings.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image18.avif" alt="Close-up of the housing seated in the slot with two screws fitted through the square flange"></div><figcaption class="caption"><strong>Figure 32. Screws can still be added for extra security.</strong> Close-up of the housing in the slot with two screws fitted.</figcaption></figure>
</div>

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">11</span>Iteration 11: Hollow supports for wiring</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

For the last iteration, we made the four vertical supports of the bioreactor hollow. This reduces their weight, and it lets us put all of the wiring through the supports for a neater version of the prototype. With this, the wiring for the sensors and the components on the dashboard can be hidden from sight.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We 3D-printed the hollow supports and ran the wiring through them, so that the cables go from the components up to the electronics compartment inside the supports instead of hanging outside. One of the printed halves has an opening near its lower end that the wires can pass through.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image7.avif" alt="Two printed halves of a bioreactor support; the right one has an opening near the bottom for wires"></div><figcaption class="caption"><strong>Figure 33. The supports are hollow.</strong> Two printed support halves; the right one has an opening near the bottom for wires.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We assembled the bioreactor with the wiring routed through the supports and checked that the sensors and the dashboard components still worked and that the wiring was hidden from view.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image3.avif" alt="The assembled bioreactor with its hollow supports, with no wiring visible on the outside"></div><figcaption class="caption"><strong>Figure 34. Wiring runs through the supports.</strong> The assembled bioreactor with its hollow supports.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Hollow supports made the prototype lighter and neater, and kept the sensor and dashboard wiring out of sight without needing a separate cover.

</div></div>
</div>

</div>

<div class="iter final">
<h4 class="iter-title"><span class="iter-num">✓</span>Final bioreactor design</h4>

The SHIHAB bioreactor combines interchangeable glass vessels, a 3D-printed rotor and lid optimized for lower gravity, a stirring motor enclosed in an easily replaceable housing and coupled to the rotor so that it never touches the culture, two flexible heating elements, and temperature, pH and turbidity sensors on an Arduino Mega with a touchscreen dashboard. It measures 20 × 24 × 31 cm, weighs 2.2 kg and runs on a 30 W power supply.

</div>

## Filtration unit

Seven iterations turned a single clogging syringe filter into a modular, leak-free stack whose number of filtration stages the user can change without redesigning any part.

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Iteration 1: Passing culture through a fine filter</h4>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We initially tested filtering a sample mixture of food-grade *Saccharomyces cerevisiae* in distilled water (3.0 g yeast per 100 mL of water) through a fine filter (0.2 µm pore size) to perform an initial assessment of the feasibility of obtaining a clarified culture this way. The PVDF filter was fitted onto a syringe, which was repeatedly filled with the yeast mixture.

<div class="figure-grid" style="--fig-h: 200px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image14.avif" alt="Two syringe filters: one in its blue-topped sterile packaging and one labelled Target2 PVDF 0.2 micrometre"></div><figcaption class="caption"><strong>Figure 35. A PVDF syringe filter was used for the first filtration test.</strong> The filter has a 0.2 µm pore size.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image44.avif" alt="A graduated syringe with the PVDF 0.2 micrometre filter fitted on its tip"></div><figcaption class="caption"><strong>Figure 36. The filter was fitted onto a syringe that was repeatedly filled with the yeast mixture.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

As we expected, the filter was rapidly clogged even with a relatively small amount of culture being passed through it (~100 mL).

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

From this, we learned that a multi-stage filtration system was imperative to avoid clogging.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Iteration 2: Two-stage filtration</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We then built a two-stage filtration system comprising two modules that were meant to be attached together, before being passed to the 0.2 µm PVDF filter. Our idea was to fit a filter material in between the modules and connect these modules together.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We 3D-printed two modules: an inlet module and an outlet module. The outlet module was designed to hold a filter disc, with a coarse filter (500 µm) in the first stage before being passed to the second stage of filtration (0.2 µm). The modules were joined with a simple press-fit connection and secured with four small silicone bands, then connected to the final 0.2 µm filter from Iteration 1.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We passed 300 mL of *S. cerevisiae* culture through the system. The coarse first stage took up most of the cell mass, so the fine filter lasted longer than it did in Iteration 1. However, the space above the coarse filter filled with residue very quickly. Once that cake built up, flow slowed sharply and the first stage clogged. We also saw culture seeping out at the press-fit joints between modules.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image67.avif" alt="Gloved hand holding a 3D-printed module with a filter disc covered in a pale layer of yeast residue"></div><figcaption class="caption"><strong>Figure 37. Yeast residue accumulated on the filter.</strong> Residue left on the filter after passing the culture through.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Splitting filtration into stages helped, but each module needed much more room than we initially expected to hold residue before it started limiting flow. The press-fit connections were also not reliable enough to keep liquid contained.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Iteration 3: Increasing residue capacity</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

To stop the residue from clogging the stages, we redesigned the modules with a much larger internal chamber above each filter. The idea was that solids could settle and collect there instead of packing directly onto the filter surface. We also added an additional middle filter module to increase the number of filtration stages and make the jump between stages much smaller. The pore sizes of the three filtration stages are now 500 µm, 11 µm and 0.2 µm.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We printed new modules with chamber heights of 20 mm (previously 4 mm) and a wider internal diameter of 42 mm (previously 38 mm). We also opted for FDM 3D-printing with PLA instead of SLA printing with resin for more rapid manufacturing of the filtration modules, given that we were still in the early stages of prototyping.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The larger chambers greatly reduced clogging, and we could pass ~650 mL of culture before flow dropped noticeably. However, the system became bulky and heavy. It also held a large dead volume of liquid, which would mean losing product, and it was awkward to handle and assemble. The bigger press-fit joints also loosened more easily and still leaked.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Bigger chambers solved clogging but conflicted with one of our core requirements: compactness. Our hardware has to be compact and simple enough for a space environment, where volume and mass are tightly limited. We needed to find the smallest module size that still held enough residue.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span>Iteration 4: Balancing capacity and compactness</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We designed several module variants with different chamber volumes to find the best trade-off between residue capacity and overall size.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We printed four versions with chamber heights of 5, 10, 15 and 20 mm, keeping all other dimensions constant.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image73.avif" alt="Four 3D-printed filtration modules of increasing chamber height, shown side by side"></div><figcaption class="caption"><strong>Figure 38. We printed four module versions with chamber heights of 5, 10, 15 and 20 mm.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We ran the same volume of culture through each variant and recorded the volume filtered before flow dropped, along with the size and dead volume of each.

<div class="table-wrap">

| Chamber height (mm) | Chamber volume per module (mL) | Total module height (mm) | Dead volume per module (mL) | Volume filtered before flow dropped (mL) |
| --- | --- | --- | --- | --- |
| 5 | 6.9 | 13 | 4.1 | ~180 |
| 10 | 13.9 | 18 | 8.3 | ~390 |
| 15 | 20.8 | 23 | 12.4 | ~570 |
| 20 | 27.7 | 28 | 16.8 | ~650 |

</div>

<div class="caption">

**Table 7. Taller chambers hold more residue, but every millimetre of chamber height also costs module height and dead volume.** The 15 mm variant held enough residue to filter ~570 mL without clogging while staying ~25% smaller in chamber volume than the Iteration 3 design.

</div>

Leaking at the joints, however, was still a problem, and the press-fit modules sometimes sat slightly misaligned, which tilted the filters.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

We settled on module dimensions that balanced residue capacity against compactness. The next priority was a secure, aligned connection between modules.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">5</span>Iteration 5: Threaded connections</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We replaced the press-fit connections with screw threads, so the modules twist together. Threads give a tighter and more repeatable fit, keep the modules aligned, and let the filters be clamped evenly between modules.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We added threads (M42×3, class 6g, right-hand) to the ends of each module. Because tolerances matter for 3D-printed threads, we printed several test pairs to tune the clearance before printing full modules.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image64.avif" alt="Three 3D-printed filtration modules side by side, two with screw threads on one end"></div><figcaption class="caption"><strong>Figure 39. Threaded connections join the filtration modules.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The threaded modules screwed together firmly, stayed aligned, and were quick to assemble and take apart. Leaking was much lower than with press-fit, but small leaks still appeared at the interfaces when the system was under pressure or after repeated use.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Threads solved alignment and mechanical security, but plastic-on-plastic contact alone cannot form a fully liquid-tight seal. A dedicated sealing element was needed.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">6</span>Iteration 6: Adding gaskets</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We added gaskets between each pair of modules so that tightening the threads compresses the gasket and seals the joint.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We laser-cut gaskets using a CO₂ laser from silicone sheets to fit the interface between modules and adjusted the module geometry to include a seat for each gasket.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We ran 500 mL of culture through the fully assembled system at a flow rate of 240 mL/min. No leaking was observed at any of the joints, and we verified that the gaskets could keep their seal over at least 30 assembly and use cycles.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

With threads and gaskets together, the system was secure, aligned and leak-proof. At this point, however, the number of filtration stages was fixed by the design. We realized that different cultures, volumes or purity targets could require more or fewer stages.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">7</span>Iteration 7: Stackable middle module</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

To make the system adaptable and more user-friendly, we redesigned the middle module so it is identical on both ends. It has matching threads and gasket seats top and bottom, so any number of middle modules can be stacked between the inlet and outlet modules. Each added middle module adds another filtration stage, which lets us increase the number of filtration cycles as needed without redesigning any part.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We reprinted the middle module to have identical outer and inner threads on both ends so that it could be screwed onto either the inlet and outlet modules, or more of the middle modules.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image36.avif" alt="Three filtration modules screwed together into one assembled stack"></div><figcaption class="caption"><strong>Figure 40. Three modules screw together into one stack.</strong> Assembled three-module configuration.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

All stacked configurations assembled easily and stayed leak-free. Adding more stages improved clarity of the filtrate, while each stage held its share of the residue without clogging. The filtrate after three stages was surprisingly clear, giving us an initial indication that filtration was successful. More quantitative optical density measurements would further verify this result.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image61.avif" alt="Three centrifuge tubes held in a gloved hand: the left one cloudy with the initial yeast mixture, and the middle and right ones progressively clearer"></div><figcaption class="caption"><strong>Figure 41. More filtration stages gave clearer filtrate.</strong> Left to right: the initial yeast mixture; after two stages of filtration (500 µm and 11 µm pore size); after three stages (500 µm, 11 µm and 0.2 µm pore size).</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The stackable design gave us a modular system that can be scaled to the needs of a given run, using a single standardized part. This flexibility is especially valuable in space, where carrying one interchangeable part is simpler than carrying several specialized ones.

</div></div>
</div>

</div>

<div class="iter final">
<h4 class="iter-title"><span class="iter-num">✓</span>Final filtration design</h4>

Our final protein purification system is a modular, multi-stage filtration unit. It consists of an inlet module, an outlet module and any number of stackable middle modules, each housing a filter. Each module is sized to hold enough residue to avoid clogging while keeping the system as compact and simple as possible. Threaded connections keep the modules secure and aligned, and gaskets between them prevent leaking. Because the middle module is stackable, the number of filtration stages can be adjusted to match the culture and the level of clarification required. Any filter material of various pore sizes can be fitted into the filtration unit, as long as the diameter fits in the filtration module that is 42 mm in diameter, offering the user more flexibility in planning the most ideal setup for protein purification.

</div>

## Fluid dispensing

The second half of the purification system had to deliver measured volumes of liquid on command. Seven iterations took it from a choice between two pumping mechanisms to an automated syringe-pump array that fills, dispenses, clears its own tubing and routes the output to collection or waste without the user touching a valve.

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Iteration 1: Selecting the pumping mechanism</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Our purification system requires precise control over the volume of liquid delivered. During brainstorming, we considered two pumping mechanisms: a peristaltic pump and a syringe pump driven by a stepper motor and lead screw.

<div class="figure-grid" style="--fig-h: 230px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image26.avif" alt="CAD model of the peristaltic pump design, with one pump per reservoir"></div><figcaption class="caption"><strong>Figure 42. The peristaltic pump option used one pump per reservoir.</strong> CAD model of the peristaltic pump design.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image41.avif" alt="CAD model of the syringe pump design, with stepper motors driving lead screws that push the syringe plungers"></div><figcaption class="caption"><strong>Figure 43. The syringe pump option moves the plungers with stepper motors and lead screws.</strong> CAD model of the syringe pump design.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We modeled both options in CAD, with a peristaltic pump and a syringe pump for each reservoir, so that we could compare their size, complexity and parts.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

Our evaluation suggested that the peristaltic pump would require substantial tuning and calibration to achieve the desired accuracy and would be more expensive.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

We therefore selected the syringe pump mechanism because it offered greater flexibility for customization and a more affordable approach to controlling fluid delivery.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Iteration 2: Improving motor control</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We used an Arduino Uno to control the stepper motors, initially connecting each motor to an individual A4988 driver.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image47-new.avif" alt="An A4988 stepper motor driver board"></div><figcaption class="caption"><strong>Figure 44. The A4988 driver was the first driver we tried.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We replaced the A4988 drivers with TMC2209 drivers. We also incorporated a CNC shield to organize the drivers and wiring into a more compact assembly.

<div class="figure-grid" style="--fig-h: 230px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image58-new.avif" alt="A TMC2209 stepper motor driver board"></div><figcaption class="caption"><strong>Figure 45. The TMC2209 driver replaced the A4988.</strong></figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image55.avif" alt="A CNC shield with the stepper drivers plugged into it, keeping the wiring compact"></div><figcaption class="caption"><strong>Figure 46. The CNC shield keeps the drivers and wiring compact.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

In our setup, the A4988 configuration did not provide the reliability and positioning accuracy we needed. Replacing the A4988 drivers with TMC2209 drivers improved the observed motor performance.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The choice of motor driver had a large effect on how reliably and accurately the motors moved, so it is worth testing drivers early. The CNC shield also kept the drivers and wiring organized as the system grew.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Iteration 3: Establishing a reference position</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

The motion mechanism is inspired by the linear positioning systems used in 3D printers. Each stepper motor rotates a lead screw, moving the syringe plunger inward or outward depending on the direction of rotation. At startup, the controller needs a known reference position, or home position, from which to track subsequent movement.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We installed limit switches behind the syringes, slightly beyond their intended operating travel, to establish this reference. During homing, the mechanism moves toward the switch until it is activated, then moves away by a defined offset to align the plunger with the syringe's 60 mL mark.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image40.avif" alt="Limit switches mounted behind the syringes on the pump frame"></div><figcaption class="caption"><strong>Figure 47. Limit switches behind the syringes set the home position.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We measured and tested this offset to check the alignment of the home position.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image49.avif" alt="A syringe in the pump with its plunger aligned to the 60 mL graduation mark"></div><figcaption class="caption"><strong>Figure 48. At home, the plunger aligns with the syringe's 60 mL mark.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

A fixed home position gives the controller a consistent starting point, so every later movement of the plunger can be tracked from the same reference.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span>Iteration 4: Calibrating the dispensed volume</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We calibrated the mechanism to determine the motor rotation required to dispense 10 mL of liquid. Using the syringe's internal diameter, we calculated the plunger travel needed to displace this volume. We then converted that distance into motor rotations using the lead screw's axial travel per revolution.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We converted the calculated motor rotations into motor commands on the Arduino and used them to dispense liquid with the syringe pumps.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

These calculations provided an initial calibration, which we refined through repeated dispensing trials and visual checks of the delivered volume.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Calculation alone gave only a starting point, so the calibration had to be confirmed and refined by dispensing real liquid and checking the delivered volume.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">5</span>Iteration 5: Controlling syringe filling and dispensing</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Because the system uses syringes, each pump must alternate between drawing liquid from a reservoir and dispensing it toward the filter. To direct the flow during both operations, we used a T-connector and two check valves: an inlet valve between the reservoir and the syringe, and an outlet valve between the syringe and the filter.

During dispensing, the plunger moves inward, directing liquid through the outlet valve toward the filter. The inlet valve remains closed to prevent liquid from returning to the reservoir. During filling, the plunger retracts, drawing liquid from the reservoir through the inlet valve. The outlet valve remains closed to prevent liquid from being drawn backward through the filter.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We connected a T-connector and two check valves to each syringe, with the inlet valve on the reservoir side and the outlet valve on the filter side.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We ran the syringe pumps through filling and dispensing cycles to check that liquid moved in the intended direction only: from the reservoir into the syringe, and from the syringe toward the filter.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Check valves let each syringe pump alternate between filling and dispensing automatically, without the liquid flowing backward.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">6</span>Iteration 6: Clearing residual liquid with booster pumps</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

After the syringe pumps deliver the required volume, some liquid remains in the interconnected tubing. We incorporated booster pumps to move this residual liquid toward the filter, reducing the amount retained in the tubes.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

To support this process, we added an air inlet tube fitted with a check valve. The inlet allows air to replace the liquid as it leaves the tubing. Without this air supply, a vacuum could develop and restrict flow, limiting the booster pumps' ability to clear the remaining liquid.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We checked whether the booster pumps, together with the air inlet, moved the remaining liquid out of the tubing and toward the filter.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Clearing the tubing depends on air being able to enter as well as on the booster pumps: without an air inlet, a vacuum can limit how much residual liquid is cleared.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">7</span>Iteration 7: Automating fluid routing</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

The dispensed liquid must be directed either to a collection container or to waste, depending on whether it is needed. We therefore introduced separate flow paths controlled by valves. In the initial design, the Arduino prompted the user to open or close specific valves to select the appropriate path.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We then automated valve operation by integrating a servo motor to actuate the valve. The Arduino was programmed to control the servo.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image5.avif" alt="A servo motor mounted on a valve that switches the output between the collection and waste lines"></div><figcaption class="caption"><strong>Figure 49. A servo motor turns the valve between the collection and waste paths.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We tested the switching between the collection and waste paths, first with the user opening and closing the valves when prompted and then with the servo motor doing it automatically.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

This allows the system to switch between collection and waste paths automatically and reduces the need for manual intervention.

</div></div>
</div>

</div>

# Wet Lab Cycles

[Construct design](#construct-design), [transformation](#transforming-our-chassis), [irradiation assays](#irradiation-assays) and [culture conditions](#culture-conditions) across three chassis.

## Construct design

Before ordering a single plasmid, we iterated on the constructs themselves on paper. Four design decisions changed between our first draft and what we actually ordered: where Dsup is integrated, how it is tagged and targeted to the nucleus, how translation is terminated, and which promoter drives expression in *Saccharomyces cerevisiae*.

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Vector choice: episomal to integrative</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

Initially, all of our constructs were designed to be inserted into the episomal plasmids in each organism.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We designed all *Pichia pastoris* constructs in pPICZ A, all *Bacillus subtilis* constructs in pHT-ads, and all *S. cerevisiae* constructs in pYES2.

</div></div>
<div class="iter-row test"><span class="iter-label">Evaluation &amp; learning</span><div class="iter-body">

Instead of immediately ordering these plasmids, we consulted literature to evaluate whether this approach is optimal for our platform. We realized that it would be much more beneficial to have Dsup integrated into the genome of each of our chassis. That would give us a stable presence of this protein in all of our subsequently modified strains, which is essential for protection from irradiation. In addition, this approach is much more feasible than maintaining two different episomal plasmid types, one for Dsup and one for any payload.

</div></div>
<div class="iter-row learn"><span class="iter-label">Final design</span><div class="iter-body">

Dsup-related constructs were redesigned so that they are inserted into integrative vectors.

<div class="table-wrap">

| Chassis | Dsup-containing vector |
| --- | --- |
| *B. subtilis* | pBS4S |
| *P. pastoris* | pPICZ A |
| *S. cerevisiae* | HO-poly-KanMX4-HO |

</div>

<div class="caption">

**Table 8. Each chassis received Dsup through a vector that integrates at a safe harbor locus rather than an episomal plasmid.** We ensured that the vectors we selected target regions classified as "safe harbor" areas in each organism's chromosomes, so that normal cellular activities are not disrupted in recombineered cells.

</div>

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Dsup design: tagging and nuclear targeting</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

Dsup constructs were initially designed by taking the sequence of wild-type Rv_Dsup from *Ramazzottius varieornatus*. The sequences were codon optimized for each corresponding chassis.

</div></div>
<div class="iter-row test"><span class="iter-label">Evaluation &amp; learning</span><div class="iter-body">

After determining potential downstream experiments for phenotypic characterization of our engineered chassis and validation of Dsup expression, we recognized that incorporating a conventional epitope tag would facilitate protein detection and analysis, particularly through Western blotting. To determine the optimal position for the tag, we examined the structural characteristics of Dsup and the functional significance of its key regions. In particular, we were cautious about affecting domains involved in DNA and chromatin interactions.

To further optimize Dsup functionality, we evaluated the protein's native nuclear localization signal (NLS) and its role in directing Dsup to the nucleus. Since Dsup originates from the tardigrade *R. varieornatus*, we compared whether its native nuclear localization sequence is compatible with our chassis. This is particularly important for yeasts rather than *B. subtilis*, as the latter does not have a nucleus enclosed by a membrane, meaning that DNA is readily accessible without a need for a special signal. After determining the NLS with NLS Mapper, we identified that it might not provide optimal nuclear import efficiency in a heterologous yeast host. Hence, we built a hypothesis that addition of an NLS native to our yeast chassis will improve radiation protection capabilities.

<div class="figure-grid single wide">
<figure><div class="photo-frame light"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image23.avif" alt="NLS Mapper output for the Dsup sequence, with the predicted bipartite classical nuclear localization signal highlighted in red"></div><figcaption class="caption"><strong>Figure 50. The predicted classical NLS sits in a single short stretch of the Dsup sequence, which is what let us judge it as a candidate for replacement.</strong> NLS mapping of Dsup via <a href="https://nls-mapper.iab.keio.ac.jp/cgi-bin/NLS_Mapper_form.cgi" target="_blank" rel="noopener noreferrer">NLS Mapper</a>; the cNLS is highlighted in red.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Final design</span><div class="iter-body">

We redesigned our parts so that we have a Myc-tagged Dsup construct for each of the chassis, enabling more reliable detection and verification of Dsup expression. Based on the structural analysis, we selected the N-terminus for Myc-tag incorporation to minimize potential interference with Dsup's functional regions, which are located closer to the C-terminus. We also introduced a flexible peptide linker between the Myc tag and Dsup to reduce steric hindrance and promote independent accessibility of the epitope.

As for the NLS analysis, because it is crucial for Dsup to efficiently localize in the nucleus to potentially achieve maximum protective capacity through interactions with nuclear DNA and chromatin, we engineered an improved Dsup variant incorporating two copies of the well-characterized simian virus 40 (SV40) nuclear localization signal (2× SV40 NLS). The SV40 NLS is widely used to promote nuclear import in eukaryotic cells through recognition by the host's nuclear import machinery. By introducing a tandem NLS arrangement, we aimed to enhance nuclear targeting and increase the accumulation of Dsup in the nucleus of yeasts.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>General sequence iterations</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

Initially, each coding sequence (CDS) had one stop codon, and all payloads contained a 6His tag.

</div></div>
<div class="iter-row test"><span class="iter-label">Evaluation &amp; learning</span><div class="iter-body">

After studying the corresponding literature, we realized certain codons are quite "leaky" (high readthrough). For instance, UGA is considered the leakiest in *S. cerevisiae*, while UAA is generally considered the most efficient for ensuring translational termination and preventing readthrough <a class="cite" href="#ref-13">13</a>. Moreover, we learned that one stop codon is not always enough to halt translation correctly.

Although the difference between 6His and 8His tags may appear minor, the addition of two histidine residues can potentially improve protein binding affinity to nickel-based affinity chromatography resins, enhancing purification efficiency and protein recovery.

</div></div>
<div class="iter-row learn"><span class="iter-label">Final design</span><div class="iter-body">

Each CDS was redesigned to contain double stop codons for the genes of interest, with the most efficient stop codon combinations selected. Each payload was designed to contain an 8His tag.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span><i>S. cerevisiae</i> promoter choice</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

In our initial design for *S. cerevisiae*, we considered using a methanol-inducible promoter to establish a controllable protein expression system.

</div></div>
<div class="iter-row test"><span class="iter-label">Evaluation &amp; learning</span><div class="iter-body">

After studying our initial design proposal, we realized that, unlike methylotrophic yeasts such as *P. pastoris*, *S. cerevisiae* does not naturally have the methanol-responsive regulatory machinery, which means that additional genetic engineering would be necessary.

</div></div>
<div class="iter-row learn"><span class="iter-label">Final design</span><div class="iter-body">

To avoid unnecessary complexity and improve the reliability of our system, we revised our design to incorporate two alternative expression strategies: a galactose-inducible promoter (GAL1) using the pYES2 vector, and a constitutively active promoter (pADH1).

The galactose-inducible system allows temporal control over recombinant protein expression, which can be very advantageous when expressing potentially burdensome proteins, while the constitutive promoter enables continuous protein production without requiring an external inducer. By incorporating both strategies, we aimed to evaluate which of these two choices would be the most optimal one for production of our payload proteins.

Since pYES2 naturally comes with the GAL1 promoter, a promoter swap from pGAL1 to pADH1 had to be performed to get a duplicate of our payload constructs with a constitutively active promoter.

</div></div>
</div>

</div>

<div class="callout accent">

<p class="callout-label">Why these small changes are worth a cycle of their own</p>

Although these modifications may seem minor, they are among the fundamental principles of good synthetic biology practice. Even small, rationally designed changes can significantly influence protein expression, stability, localization and functionality, potentially transforming an inefficient expression system with low protein yields into a highly optimized and productive one.

</div>

## Transforming our chassis

Getting DNA into our chassis took more cycles than any other part of the wet lab. *B. subtilis* needed five, across two completely different delivery methods, before a single transformant appeared; *P. pastoris* needed one failure that turned out to be caused by the buffer rather than the protocol.

### <i>Bacillus subtilis</i> transformation

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: Natural competence with SPI and SPII media</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Our initial approach was to use the natural competence of *B. subtilis* to introduce our plasmids. We followed a protocol based on the *Bacillus* Handbook that uses two different media, SPI and SPII, to induce competence. In this method, cells are first grown in SPI medium until they begin transitioning out of exponential growth. This point, referred to as T0, is used to determine when the cells should be transferred to SPII medium for competence development. We expected that identifying this growth phase would allow us to prepare competent cells suitable for introducing our integrative plasmids.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We prepared SPI and SPII media and monitored the growth of *B. subtilis* by measuring OD<sub>600</sub> at regular intervals. Two parallel cultures were maintained, with one used for OD measurements and the other reserved for competence induction. Once the growth curve began deviating from exponential growth, cells were transferred into SPII medium. Following competence induction, the cells were harvested, concentrated and stored at −80 °C. We then attempted transformation using the pBS1C integrative plasmid and our episomal plasmid.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We successfully obtained a growth curve and identified the T0 point for our laboratory strain. However, the transformation itself was unsuccessful. Very few colonies appeared on the selective plates for the integrative plasmid, and none at all for the episomal vector, while the negative control remained free of growth as expected. Since the original protocol did not include a separate recovery step, we also tested an additional two-hour recovery in LB medium before plating. This did not improve the outcome.

<div class="figure-grid" style="--fig-h: 240px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image37.avif" alt="Line chart of optical density against time in hours, rising from 0.05 at 0 h to about 0.92 at 4.5 h, with the steepest rise between 2.5 and 4 h"></div><figcaption class="caption"><strong>Figure 51a. The growth curve gave us a clear T0, so the competence protocol was being followed at the right growth stage.</strong> OD<sub>600</sub> of <i>B. subtilis</i> in SPI medium, sampled every 30 minutes.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image2.avif" alt="Selective agar plate labelled pBS1C with spectinomycin, carrying fewer than ten scattered colonies of varying size"></div><figcaption class="caption"><strong>Figure 51b. Correct timing did not translate into transformants: only a handful of colonies appeared with the integrative plasmid.</strong> Selective plate from the pBS1C transformation.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Although we were able to identify the appropriate growth phase and prepare the cells according to the protocol, these conditions did not produce detectable transformants. We realized that successfully preparing cultures at the expected competence-induction stage did not necessarily mean that the resulting cells could be transformed efficiently. Since extending the recovery period did not resolve the issue, we decided to explore another method of DNA delivery: electroporation.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Electroporation as an alternative</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Following the unsuccessful natural competence experiments, we decided to try electroporation as an alternative method for introducing plasmid DNA into *B. subtilis*. Unlike natural transformation, electroporation uses an electrical pulse to temporarily increase cell membrane permeability and facilitate DNA uptake. We followed a protocol involving glycine and Tween 80 treatment to weaken the bacterial cell wall before preparing electrocompetent cells. Our aim was to determine whether electroporation could overcome the difficulties encountered with natural transformation.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We prepared electrocompetent *B. subtilis* 168 cells by growing them in LB medium containing sorbitol, followed by treatment with glycine and Tween 80. The cells were then washed with an ice-cold electroporation buffer containing sorbitol, mannitol and glycerol. We performed electroporation using the pHT-based episomal plasmid and tested two voltages, 2.0 and 2.1 kV, using a 1 mm cuvette. Following electroporation, the cells were recovered in an osmoprotective medium before plating on selective agar.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

During the first trial, we observed a time constant below 3.5 ms at 2.0 kV, which was lower than the expected range of approximately 4.5–5 ms. We therefore increased the voltage to 2.1 kV, expecting an improvement in the time constant. However, the result remained nearly unchanged. Neither condition produced transformants. Importantly, the cells from the negative control grew on non-selective LB agar, indicating that the cells remained viable after the electroporation procedure.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The survival of the cells suggested that the electrical pulse was not completely compromising cell viability. However, we still could not achieve successful transformation. We suspected that residual salts remaining after the washing steps might have affected the electrical properties of the cell suspension and contributed to the shorter time constants. Rather than immediately abandoning electroporation, we decided to repeat the experiment with greater attention to the washing steps.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Cycle 3: Improving electroporation conditions</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Our previous electroporation attempts produced shorter time constants than expected. We suspected that residual salts in the cell suspension might have contributed to this result. For the next attempt, we decided to focus on improving the washing of electrocompetent cells while maintaining the same general electroporation procedure. The goal was to obtain a time constant closer to the expected range and determine whether this would improve transformation.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We repeated the electrocompetent cell preparation using the same general approach. This time, we paid particular attention to the washing steps to reduce the possibility of residual salts remaining in the cell suspension. After preparing the electrocompetent cells, we performed electroporation again and recovered the cells before plating on a selective medium.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The modified preparation resulted in a time constant of approximately 4.7 ms, which was within the expected range. This was a clear improvement compared with our previous attempts, where the time constants remained below 3.5 ms. However, despite achieving the expected time constant, we still did not obtain transformants on the selective plates.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image20.avif" alt="Three agar plates after electroporation: two carrying heavy confluent growth and one with almost none"></div><figcaption class="caption"><strong>Figure 52. A time constant in the expected range still produced no transformants, which is what ruled the pulse itself out as the limiting step.</strong> Plates from the improved electroporation run.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Improving the washing procedure allowed us to achieve the expected electroporation time constant, but this did not translate into successful transformation. This showed us that obtaining an appropriate electrical pulse alone was not sufficient to ensure DNA uptake and recovery of transformants. Although electroporation remained a possible approach, further optimization would require investigating additional factors affecting transformation. Given the repeated failures, we decided to revisit natural competence using a different protocol rather than continuing to optimize electroporation.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span>Cycle 4: Returning to natural competence with SP medium</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

After several unsuccessful transformation attempts, we revisited natural competence using a simplified protocol based on the UoU method. Unlike our initial approach, which required preparing two different media and identifying the T0 point from the growth curve, this method uses a single SP medium for competence development. Another important difference was that plasmid DNA was added directly to the culture during competence development, followed by recovery in LB medium before antibiotic selection. We wanted to test whether this alternative approach would provide a more reliable method for transforming our *B. subtilis* strain.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We prepared SP medium containing the nutrients and salts required for competence development. An overnight culture of *B. subtilis* was diluted 1:50 into fresh SP medium, and plasmid DNA was added directly to the diluted culture. We tested the pBS1C integrative plasmid in both circular and linear forms, along with the episomal pHT-ads plasmid. The cultures were incubated for approximately 5.5 hours at 37 °C, followed by centrifugation and resuspension in fresh LB medium. After an additional 1.5-hour recovery period, the cells were plated on selective agar.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

For the first time, we successfully obtained transformants using natural competence. Colonies appeared on the selective plates, unlike our previous attempts using the SPI/SPII method and electroporation. We then performed additional screening of colonies obtained with the pBS1C plasmid. Since pBS1C targets the *amyE* locus, which is involved in starch hydrolysis, we used starch-containing agar plates followed by iodine staining to assess integration. The pHT-ads control showed a clear halo around the colonies, consistent with starch hydrolysis by cells with an intact *amyE* locus.

<div class="figure-grid" style="--fig-h: 250px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image63.avif" alt="Three selective agar plates labelled linear pBS1C, pBS1C and pHT-ads; the two pBS1C plates carry hundreds of colonies and the pHT-ads plate carries about a dozen"></div><figcaption class="caption"><strong>Figure 53a. Switching to SP medium turned a handful of colonies into hundreds.</strong> Selective plates from the SP-medium transformation, with pBS1C in linear and circular form and the episomal pHT-ads plasmid.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image59.avif" alt="Starch agar plate after iodine staining, viewed on a light box, with a stained orange-brown region around the streaked growth"></div><figcaption class="caption"><strong>Figure 53b. Iodine staining of starch plates is what let us read integration at <i>amyE</i> off a plate rather than by sequencing.</strong> Starch agar plate after iodine staining.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The SP-medium protocol finally allowed us to obtain transformants and provided a practical alternative to our earlier approaches. We also found this method easier to implement, as it did not require preparing and freezing competent cells in advance or continuously monitoring growth curves to identify the T0 point. The successful transformation encouraged us to adopt this method for introducing our project-specific constructs into *B. subtilis*. Our next step was to determine whether the same method could be used to generate strains carrying the genetic constructs required for our project.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">5</span>Cycle 5: Applying the method to our engineered chassis</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

After successfully establishing a working transformation procedure, we wanted to apply it to the genetic constructs developed for our project. One of our main objectives was to engineer *B. subtilis* to express Dsup, a DNA-protective protein, while also introducing episomal plasmids encoding different protein payloads. We therefore decided to use the SP-medium natural competence protocol to introduce the Dsup integrative construct designed in [construct design](#construct-design), and subsequently generate strains carrying additional expression plasmids.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We followed the optimized SP-medium transformation procedure to introduce the pBS4S plasmid carrying Dsup into *B. subtilis*. The transformation cultures were recovered in LB medium and plated on spectinomycin-containing agar for selection. The resulting colonies were restreaked onto fresh selective plates. A selected Dsup-containing strain was then used alongside wild-type *B. subtilis* for further transformations using episomal expression plasmids. These included constructs encoding GFPmut2, the antifreeze protein FfIBP and AmyQ-FfIBP, among others.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

Using the optimized transformation procedure, we successfully generated a Dsup-containing *B. subtilis* strain. Colonies were recovered on selective medium and restreaked for further use. The Dsup-containing strain was subsequently used to generate strains carrying additional episomal plasmids, allowing us to proceed with experiments involving reporter expression and protein production.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Establishing a working transformation protocol allowed us to move beyond testing DNA delivery methods and begin constructing the engineered strains required for our project. The SP-medium method became our preferred approach for transforming *B. subtilis*, replacing the earlier SPI/SPII and electroporation methods that had not produced transformants. Most importantly, this optimization allowed us to continue with the experimental characterization of our engineered bacterial chassis and the different protein payloads.

</div></div>
</div>

</div>

<div class="iter final">
<h4 class="iter-title"><span class="iter-num">✓</span>Overall learning and outcome</h4>

Establishing a reliable transformation method for *B. subtilis* required several rounds of troubleshooting and optimization. Our initial natural competence protocol allowed us to identify the expected growth phase for competence development, but did not result in successful transformation. Switching to electroporation also proved challenging: although improving our washing procedure helped us achieve the expected time constant, we still could not obtain transformants. Returning to natural competence with the SP-medium protocol finally gave us a working method, which we then used to introduce the genetic constructs required for our project.

These experiments highlighted the importance of testing alternative approaches rather than continuing to optimize a single method indefinitely. The final protocol provided a foundation for constructing and testing our engineered *B. subtilis* strains.

</div>

### <i>Pichia pastoris</i> electroporation

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Removing salts before the pulse</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

Our initial electroporation protocol for *P. pastoris* involved linearizing plasmid DNA using restriction enzymes, confirming successful linearization through agarose gel electrophoresis, washing electrocompetent *P. pastoris* cells twice with sterile ice-cold water, and proceeding directly to electroporation. Since the linearized DNA was intended for genomic integration, for which we need higher quantities of plasmid, we aimed to establish a simple and efficient transformation workflow with minimal DNA handling and sample loss.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We prepared our plasmid constructs for genomic integration by restriction enzyme digestion using mostly SacI-HF restriction enzyme (which cuts within the AOX1 promoter region) and NEB CutSmart buffer. Following linearization, we verified the expected DNA fragment sizes using 0.8% agarose gel electrophoresis. At the same time, cells were prepared for electroporation by washing them twice with ice-cold sterile water to reduce the ionic content of the cell suspension. The linearized DNA was then added directly to the electrocompetent cells without an additional purification step. To stop restriction digestion, prior to mixing DNA with cells, the reaction was stopped by heating the digestion mixture at 65 °C for 20 min to deactivate the enzyme, according to the seller's instructions.

<div class="figure-grid" style="--fig-h: 220px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image54.avif" alt="Electroporator unit on the bench with a cuvette in its chamber"></div><figcaption class="caption"><strong>Figure 54a. The electroporation setup.</strong></figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image17.avif" alt="Close-up of the electroporation cuvette holder and the instrument's control panel"></div><figcaption class="caption"><strong>Figure 54b. The cuvette chamber and controls.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

During electroporation, we observed electrical arcing (sparking), indicating excessive electrical conductivity in the electroporation mixture. After investigating the possible causes, we identified the restriction digestion buffer as the likely main contributor.

<div class="figure-grid" style="--fig-h: 260px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image42.avif" alt="Electroporator display showing an arc fault error message instead of a delivered pulse reading"></div><figcaption class="caption"><strong>Figure 55. The instrument reports the arc as a fault rather than a delivered pulse, so the sample never received the intended field.</strong> Error message observed due to electrical arcing.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image24.avif" alt="Electroporation cuvette seen from above at the moment of the pulse, with a bright orange flash of the arc between the electrodes"></div><figcaption class="caption"><strong>Figure 56. The arc is visible in the cuvette itself.</strong> Arcing in the electroporation cuvette upon initiation of the pulse delivery.</figcaption></figure>
</div>

NEB CutSmart buffer contains potassium acetate, Tris-acetate, magnesium acetate and bovine serum albumin (BSA). Potassium and magnesium salts particularly increase the ionic strength and conductivity of the DNA solution. When introduced into the electroporation cuvette, these ions can promote excessive current flow and electrical discharge, disrupting the electric pulse delivery and compromising cell viability.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

From this unsuccessful transformation attempt, we learned that even trace amounts of salts in the sample can lead to electrical arcing. We therefore concluded that an additional DNA purification step was necessary to remove restriction digestion buffer components before electroporation. Initially we wanted to avoid this step because DNA purification inevitably results in some sample loss. However, this just has to be considered when determining the initial amount of plasmid DNA used for linearization.

</div></div>
<div class="iter-row learn"><span class="iter-label">New design</span><div class="iter-body">

Based on these observations, we revised our electroporation workflow to incorporate a PCR cleanup step immediately after restriction enzyme digestion. This purification removes residual salts, enzymes and other reaction components, reducing the risk of electrical arcing during electroporation. To compensate for DNA losses during purification, we also increased the initial amount of plasmid DNA used for linearization to approximately 6–10 µg, aiming to recover at least 3–5 µg of purified linearized DNA for subsequent electroporation, as higher quantities of DNA are needed for efficient transformation if it involves genomic integration.

<div class="flow">
<span class="flow-node accent">Plasmid linearization</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Gel electrophoresis</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">PCR cleanup</span>
<span class="flow-arrow">→</span>
<span class="flow-node">NanoDrop quantification</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Electroporation</span>
</div>

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image70.avif" alt="Electroporator display showing a successfully delivered pulse with its voltage and time constant, instead of an arc fault"></div><figcaption class="caption"><strong>Figure 57. With the cleanup step added, the instrument delivers a complete pulse instead of arcing.</strong> Successful delivery of an electric pulse to the sample after incorporation of DNA cleanup.</figcaption></figure>
</div>

</div></div>
</div>

</div>

## Irradiation assays

Radiation resistance is the phenotype our whole Dsup strategy is meant to produce, so we had to be able to measure it before we could claim it. Two separate assays — X-ray and UV-C — each needed their own round of optimization before they could resolve a difference between strains.

### X-ray irradiation

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: Machine capability and initial dose range</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Our available irradiator, an XStrahl RS320 Cabinet, had previously been commissioned for mouse studies with a maximum documented dose of 10 Gy in 4 minutes, far below what we anticipated needing to observe lethality in yeast. Before running any experiments, we contacted Dr. Tim Devling, Commercial Director for Life Sciences at XStrahl, to determine whether the machine's stated limits were a hardware constraint or simply a protocol-specific recommendation.

Dr. Devling confirmed the 10 Gy per 4 min figure was a recommendation for mouse research, not a technical ceiling, and that irradiation time could simply be extended to reach higher doses, with a practical continuous-operation limit of ~70–90 min. He recommended reducing the focus-to-source distance (FSD) using a polystyrene block to raise the sample closer to the source, which would substantially increase the achievable dose rate. He also advised verifying the delivered dose empirically with a dosimeter, since the extrapolated dose-rate tables were based on the original commissioning geometry, not the modified setup we intended to use.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

Working with Usman, the machine's maintenance technician, we constructed a polystyrene sample riser to reduce the FSD and position samples as close to the radiation source as possible. We used a dosimeter to measure the delivered dose at the sample position and confirmed it against the expected value from the extrapolated lookup table before proceeding to irradiate biological samples.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We irradiated a first batch of yeast cultures across a dose series from 0 to 1,000 Gy, in 100 Gy increments.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

At the maximum tested dose of 1,000 Gy, cells remained viable. The dose range was insufficient to establish a lethal ceiling for wild-type yeast, meaning we could not yet distinguish a Dsup-driven survival advantage from baseline resistance. This motivated extending the dose range in the next cycle.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Extending the dose range</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Based on Cycle 1's result, we extended the maximum target dose to 2,000 Gy, using 200 Gy increments to resolve where lethality onset occurred without excessively increasing the number of conditions.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

The physical irradiation setup — polystyrene riser, verified FSD and dosimeter-confirmed dose rate — from Cycle 1 required no modification for this extension.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We repeated the irradiation series across the new 0–2,000 Gy range.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

During sample processing, we identified that the Eppendorf tubes used for irradiation did not contain sufficient headspace for gas exchange. Cells were precipitating within the tube over the course of longer irradiation runs, which risked introducing oxygen-deprivation stress as an extra variable independent of radiation dose, which would compromise the validity of any dose-response curve.

</div></div>
</div>

</div>

### UV irradiation

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: Finding a dose that kills</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We aimed to determine the dose at which cells die from UV exposure using a UV crosslinker. For our first cycle, we used a high dose to see whether we could completely prevent cell growth after high UV irradiation.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We added culture to an agar plate and spread it using a loop. We let the plate dry completely under an electric burner to avoid contamination before covering it and irradiating it using the UV crosslinker.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We irradiated the plate at 500 mJ/cm² for three time points: the negative control (0 min), 1 min and 5 min.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Irradiation prevented the cells from growing completely at the 1 min and 5 min time points, whereas the control cells grew normally as a lawn. This taught us that we can use an agar plate to test cell radiation resistance, as well as the high dose point at which the cells die.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Finding the survivability range</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We aimed to determine the low doses at which cells start to die from UV exposure using a UV crosslinker. The dose we used in our first cycle was successful but still too high; to accurately assess the resistance of our future engineered construct, we need to find the dose range at which cells start to die.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We prepared the agar plate similarly to Cycle 1, but this time we diluted our culture more to avoid the lawn pattern that we observed last time. To measure the low doses accurately, we used a hood UV-C lamp at a known intensity of 0.1 mW/cm²; we calculated our doses by multiplying the intensity by the irradiation time in seconds. This low intensity gives us a more controlled environment, allowing us to irradiate our sample at a low dose, which we could not do with the previous crosslinker.

<div class="figure-grid" style="--cols: 3; --fig-h: 170px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image65.avif" alt="Agar plate of unirradiated Bacillus subtilis showing dense confluent growth"></div><figcaption class="caption"><strong>Figure 58a. Mock.</strong> No irradiation.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image12.avif" alt="Agar plate of Bacillus subtilis after one minute of UV-C exposure, with visibly reduced growth"></div><figcaption class="caption"><strong>Figure 58b. Dose 1.</strong> One minute of UV-C.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image34.avif" alt="Agar plate of Bacillus subtilis after two minutes of UV-C exposure, with growth reduced further"></div><figcaption class="caption"><strong>Figure 58c. Dose 2.</strong> Two minutes of UV-C.</figcaption></figure>
</div>

<div class="caption">

**Figure 58. Growth falls off progressively between the mock and two minutes of UV-C, confirming the hood lamp works in the dose range the crosslinker could not reach.** UV-C irradiation results for *B. subtilis*.

</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We irradiated the plate at eight different doses: 0, 6, 12, 18, 24, 30, 90 and 180 mJ/cm².

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The hood irradiation effectively prevented cell growth; however, we ran into two problems. The number of colonies was too high, making it difficult to confirm how many cells died at the low doses, and the middle doses had some plate contamination. This was most likely because the hood was not entirely clean. Despite these setbacks, we compared the results from our good plates to what is known in the literature for *Bacillus* UV radiation resistance, and our results agreed with the literature.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image10.avif" alt="Composite figure headed UV-C energy used 0.1 mW per square centimetre, showing plates at 0, 6, 30, 90 and 180 mJ per square centimetre with growth decreasing across the series, plus an inset plate for the 12 to 24 mJ per square centimetre range"></div><figcaption class="caption"><strong>Figure 59. Growth drops away across the dose series, but the plates carry too many colonies to count survivors at the low doses — which is what sent us to a spot assay.</strong> Plates irradiated in the hood at 0.1 mW/cm², labelled by delivered dose; the inset covers the 12–24 mJ/cm² range.</figcaption></figure>
</div>

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Cycle 3: Spot assay for a countable readout</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

Using our findings from Cycles 1 and 2, we once again tried to optimize our radiation resistance protocol. This time, to address the high-colony problem, we used a spot assay to assess the effect of UV radiation. For accurate UV-C irradiation, we also found a new crosslinker that could be set to a specific dose in mJ/cm². This gave us an even higher level of control over the exact dose on each plate, as we do not need to calculate dose from intensity and we just need to enter our dose of interest.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

For the spot assay, we made six 1:5 serial dilutions for each dose. We started from an OD<sub>600</sub> of 1, diluted 5-fold, then took some of that and diluted it 5-fold again, and so on, six times.

<div class="table-wrap">

| Step | Dilution factor | Equivalent OD<sub>600</sub> |
| --- | --- | --- |
| 1 | 5× | 0.2 |
| 2 | 25× | 0.04 |
| 3 | 125× | 0.008 |
| 4 | 625× | 0.0016 |
| 5 | 3,125× | 0.00032 |
| 6 | 15,625× | 0.000064 |

</div>

<div class="caption">

**Table 9. Six 5-fold steps span more than four orders of magnitude, so at least one spot in every row lands in a countable range whatever the dose does.** Each dilution factor is the total dilution relative to the OD<sub>600</sub> = 1 starting suspension.

</div>

We ensured the plate was completely dry before aliquoting 4 µL of each dilution in a row, from highest to lowest. We performed this experiment using three independent cultures to form a biological triplicate.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We let the plate dry again after adding our dilution, then we irradiated the plate at six different doses: 0, 6, 12, 18, 24 and 30 mJ/cm².

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image38.avif" alt="Six Bacillus subtilis spot assay plates labelled 0, 6, 12, 18, 24 and 30 mJ per square centimetre; the number and size of spots falls across the series until almost none remain at 30"></div><figcaption class="caption"><strong>Figure 60. The spot assay resolves the dose at which <i>B. subtilis</i> starts to die, which neither earlier plating method could.</strong> Six 5-fold dilutions spotted per plate, one plate per dose, at 0 to 30 mJ/cm².</figcaption></figure>
</div>

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image53.avif" alt="Six Saccharomyces cerevisiae spot assay plates labelled 0, 6, 12, 18, 24 and 30 mJ per square centimetre, with spots fading across the series"></div><figcaption class="caption"><strong>Figure 61. The same assay reads out on <i>S. cerevisiae</i>, so one protocol covers both chassis.</strong> Spot assay for <i>S. cerevisiae</i> over the same 0 to 30 mJ/cm² dose series.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

This time, we accurately observed a clear reduction in colony size in the low dose samples, indicating reduced resistance due to UV-C radiation exposure. We also observed the exact dose at which the cells start to die. This gave us a good framework to test later on with our engineered construct.

</div></div>
</div>

</div>

## Culture conditions

Two assumptions about how to grow *P. pastoris* turned out to be worth testing rather than taking on faith: that more methanol means more protein, and that a darkening culture means dying cells.

### Methanol induction

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: Inducing at 1% methanol</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

In our initial experimental design, we aimed to optimize recombinant protein expression in *P. pastoris* using the methanol-inducible AOX1 promoter. Since methanol acts as both an inducer of the AOX1 promoter and a carbon source for yeast, we initially hypothesized that increasing its concentration would lead to the highest protein production. Based on this assumption, we selected 1% (v/v) methanol as our initial induction concentration and used mCherry as a fluorescent reporter to evaluate expression efficiency.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

We cultured recombinant *P. pastoris* expressing mCherry (IPC1 transformant) under the control of the AOX1 promoter and induced protein expression using 1% methanol.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

We observed relatively weak mCherry fluorescence, suggesting that the induction conditions might not be optimal.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Comparing 0.5% against 1%</h4>
<div class="iter-row design"><span class="iter-label">Modified design</span><div class="iter-body">

To investigate whether the methanol concentration was too high, we decided to design a new comparative experiment using two induction conditions: 0.5% and 1% (v/v) methanol.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

Recombinant cultures were induced with 0.5% and 1% methanol over two days, followed by a comparison of mCherry fluorescence using fluorescence microscopy.

<div class="figure-grid" style="--fig-h: 200px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image9.avif" alt="Fluorescence micrograph of IPC1 Pichia pastoris cells after two days of 0.5% methanol induction, showing bright red mCherry signal"></div><figcaption class="caption"><strong>Figure 62a. 0.5% methanol.</strong> Two days of induction.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image39.avif" alt="Fluorescence micrograph of IPC1 Pichia pastoris cells after two days of 1% methanol induction, showing weaker red mCherry signal"></div><figcaption class="caption"><strong>Figure 62b. 1% methanol.</strong> Two days of induction.</figcaption></figure>
</div>

<div class="caption">

**Figure 62. Halving the methanol concentration increased mCherry fluorescence rather than reducing it, overturning our starting assumption.** Fluorescence imaging of IPC1 mutants after two days of induction.

</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Contrary to our initial design, cultures induced with 0.5% methanol exhibited substantially stronger mCherry fluorescence than those induced with 1% methanol. This suggested that a higher methanol concentration negatively affected the overall fluorescence signal.

Our results demonstrated that methanol concentration can significantly affect the amount of payload we can obtain from AOX1-driven expression. Excessive concentrations of methanol can result in metabolic stress on the cells, because methanol metabolism generates potentially harmful intermediates such as formaldehyde and hydrogen peroxide. These metabolites can lead to oxidative stress.

</div></div>
</div>

</div>

<div class="iter final">
<h4 class="iter-title"><span class="iter-num">✓</span>Final methanol induction design</h4>

Based on these results, we selected 0.5% (v/v) methanol as the standard induction concentration for subsequent recombinant protein expression experiments in *P. pastoris*. All subsequent experiments resulted in good amounts of purified proteins, which means that this condition is satisfactory for our purposes.

</div>

### Adenine supplementation

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: Keeping the adenine auxotrophy</h4>
<div class="iter-row design"><span class="iter-label">Initial design</span><div class="iter-body">

We selected the PichiaPink strain as one of our recombinant protein production chassis. One of the reasons for this choice was its ADE2-deficient genetic background, which introduces an adenine auxotrophy. Since our other two chassis are also auxotrophic, we aimed to incorporate a similar genetic containment principle for *P. pastoris*.

The ADE2 gene encodes phosphoribosylaminoimidazole carboxylase, which is essential for de novo purine biosynthesis. Disruption of this gene prevents normal adenine biosynthesis and leads to the accumulation of upstream purine intermediates, which undergo oxidation and lead to pink pigmentation of this strain.

To preserve this auxotrophic phenotype, we selected the pPICZ A expression vector instead of the pPINK vector, since this vector does not complement the defective ADE2 gene, whereas the pPINK expression system can restore ADE2. By maintaining the adenine auxotrophy, we aimed to introduce an additional nutritional dependency that could potentially limit microbial survival in environments lacking sufficient available adenine.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

To acquire our payload protein production, we initially induced our cells with methanol for a few consecutive days. During this stage, we observed mild pink pigmentation, which was expected. The pigmentation did not interfere with routine cultivation or recombinant protein production. It was also present in colonies after they were grown on YPD agar for more than two days.

As we moved forward towards large-scale protein expression, we increased our culture volumes to approximately 250 mL to 1 L and extended methanol induction to approximately four days.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image68.avif" alt="Four microcentrifuge tubes of PichiaPink cell pellets labelled Uninduced, D1, D2 and D3: the pellet is pale yellow when uninduced and at day 1, brown at day 2 and dark brown at day 3"></div><figcaption class="caption"><strong>Figure 63. The cell pellet darkens with each day of methanol induction.</strong> PichiaPink transformed with IPD1 and induced with 0.5% methanol, uninduced and days 1 to 3.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Under prolonged conditions, we observed a dramatic change in the appearance of the cultures. Both the culture and the harvested cell pellets developed an intense dark brown coloration. Because of this, we became concerned that this discoloration could be associated with cell death, metabolic stress and other conditions that could negatively impair target protein production.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Checking whether the dark cultures were dying</h4>
<div class="iter-row design"><span class="iter-label">Modified design</span><div class="iter-body">

To evaluate whether this dark pigmentation leads to reduced viability of cells, we designed an experiment to assess cell viability.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

We assessed cell viability using a Countess automated cell counter combined with Trypan Blue staining, and by fluorescence microscopy. Despite the unusually dark appearance of the cultures, cell viability remained approximately 89%, suggesting that the pigmentation was not accompanied by extensive cell death under the tested conditions.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Cell morphology was also normal. We therefore hypothesized that the phenotype was primarily associated with the accumulation of purine biosynthetic intermediates rather than severe methanol-induced cytotoxicity.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Cycle 3: Supplementing adenine to lighten the cultures</h4>
<div class="iter-row design"><span class="iter-label">Modified design</span><div class="iter-body">

To confirm our hypothesis, we evaluated the culture color after supplying adenine, which should lower the accumulation of the pink pigment in cells.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

We grew smaller cultures in BMMY again, but this time, along with daily methanol feeding, we supplemented these samples with adenine at different concentrations (20–40 mg/L). The supplement was added either daily, once at the very beginning, or twice (induction day 0 and induction day 2).

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The cultures supplemented with 20 mg/L adenine were dark brown even when the supplement was added on every day of induction along with methanol, so that concentration was insufficient to substantially reduce the coloration.

When we increased the supplementation to 40 mg/L, the cultures became considerably lighter in color and more closely resembled our PichiaPink control expressing BSA from a pPINK-based vector, which complements the ADE2 deficiency. Daily supplementation improved the color the most.

Most importantly, cell viability and downstream recombinant protein purification remained satisfactory even for very dark samples, indicating that the pigmentation did not prevent successful protein production in our system.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image16.avif" alt="Five microcentrifuge tubes of PichiaPink pPINK_BSA cell pellets labelled Uninduced and D1 to D4, all pale cream"></div><figcaption class="caption"><strong>Figure 64. The control that complements ADE2 stays pale throughout induction.</strong> PichiaPink transformed with pPINK_BSA and induced with 0.5% methanol, uninduced and days 1 to 4.</figcaption></figure>
</div>

</div></div>
</div>

</div>

<div class="iter final">
<h4 class="iter-title"><span class="iter-num">✓</span>Final adenine supplementation design</h4>

We did not follow the adenine supplementation protocol strictly for our protein purification experiments. For future experiments, our final design incorporates daily 40 mg/L adenine supplementation into the cultivation strategy for ADE2-deficient PichiaPink strains carrying pPICZ A-based expression constructs.

This modification does not restore a functional *ADE2* gene; it masks the phenotype. Our engineered strains therefore retain their adenine-auxotrophic genotype, although the effectiveness of this nutritional dependency as an environmental biocontainment mechanism would require dedicated survival and escape-frequency testing.

</div>

# Dry Lab Cycles

[Computational models](#computational-models): repairing a published metabolic model, forcing sucrose export, a knockout strategy that did not work, and three batch models for when to induce.

## Computational models

Our dry lab ran six cycles. The first three used genome-scale metabolic models: one repaired a published model, one found a workable operating point for a sucrose-supplying co-culture, and one failed and told us something useful about the method rather than the biology. The last three moved to batch models that follow a culture over time, to ask when production should be switched on. The full modeling work, including the constraints shared by every simulation, is on the [Dry Lab Modeling](/kaust-ksa/model) page.

### Genome-scale metabolic models

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">1</span>Cycle 1: Repairing the anaerobic <i>B. subtilis</i> model</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

One of our chassis is *B. subtilis*, and in space we should ensure that the chassis works well anaerobically, so we used its genome-scale metabolic model (GEM) to model the chassis. We know that *B. subtilis* grows anaerobically through two pathways: nitrate respiration through the *narGHJI* operon, and mixed acid-butanediol fermentation.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

The published iBsu1147 model does not produce any biomass in the absence of oxygen, even though *B. subtilis* is known to grow anaerobically. This pointed to the presence of a gap in the model.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We first confirmed nitrate was being consumed, so the anaerobic respiration route itself was open and the failure lay downstream in biomass precursor synthesis. After searching one by one for which metabolites could be responsible for this, we switched to a more systematic approach of comparing every reaction active aerobically but dead anaerobically, and filtered specifically for ones that touch cytosolic oxygen. This gave us five reactions to look at. Three were expected to die without oxygen (O₂ transport and aerobic terminal oxidase). Two were genuine gaps with no anaerobic alternative in the model: ASPO6 (L-aspartate oxidase), an oxygen-dependent step in de novo NAD⁺ synthesis, and DHORDfum (dihydroorotate dehydrogenase), an oxygen-dependent step in pyrimidine synthesis. Despite its name, DHORDfum passes its electrons to oxygen in the published model, not to fumarate.

```
ASPO6:    L-aspartate + O₂ → iminoaspartate + H₂O₂ + H⁺
DHORDfum: (S)-dihydroorotate + O₂ → orotate + H₂O₂
```

Opening free exchanges for their products confirmed this: a free supply of NAD⁺ alone gave zero growth, a free supply of orotate alone gave zero, and both together restored growth to 0.22 h⁻¹ with the nitrate supply uncapped.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

To be able to open up the exchanges of these reactions, we needed to look up pathways and enzymes that would enable the exchanges anaerobically.

**DHORDnad as an alternative to DHORDfum.** The Kyoto Encyclopedia of Genes and Genomes (KEGG) gives DHORDnad (EC 1.3.1.14), which our model assigns to BSU15530 and BSU15540. This is not merely an anaerobic workaround: *B. subtilis* dihydroorotate dehydrogenase is natively a Class 1B enzyme that uses NAD⁺ as its physiological electron acceptor regardless of oxygen <a class="cite" href="#ref-14">14</a>.

**ASPOfum as an alternative to ASPO6.** Upon an initial search on KEGG, the obvious candidate was ASPDH, which we used initially. However, upon literature search, we realized that the ASPDH enzyme family is specific to archaea and thermophiles, with no evidence in *B. subtilis*. Upon further literature search, we found the fumarate-linked mode of NadB (BSU27870), supported by in vitro characterization of the purified protein <a class="cite" href="#ref-15">15</a>.

```
DHORDnad: (S)-dihydroorotate + NAD⁺ → orotate + NADH + H⁺
ASPOfum:  L-aspartate + fumarate → iminoaspartate + succinate + H⁺
```

</div></div>
<div class="iter-row learn"><span class="iter-label">Iterated design</span><div class="iter-body">

With the addition of the two reactions, DHORDnad and ASPOfum, the anaerobic model functioned at a rate of 0.22 h⁻¹. We thus applied the two confirmed corrections unconditionally to both model conditions, aerobic and anaerobic, since both represent constitutive enzyme capabilities, not regulatory switches. Finally, we packaged the model with the new reactions as a reusable function for downstream use.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image62.avif" alt="Bar chart titled Bacillus comparison of aerobic and anaerobic growth, with the aerobic bar at about 0.32 per hour and the anaerobic bar at 0.22 per hour"></div><figcaption class="caption"><strong>Figure 65. After the two repairs the model grows anaerobically at 0.22 h⁻¹ instead of not at all — about two-thirds of its aerobic rate, which is the behavior the organism is known for.</strong> Growth rate of the repaired <i>B. subtilis</i> model in aerobic and anaerobic conditions.</figcaption></figure>
</div>

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Sucrose export in <i>S. elongatus</i> PCC 7942</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

For supplying the carbon source in a closed loop, we suggested sucrose-producing cyanobacteria as the supplier. The cyanobacteria would also produce oxygen, providing microaerophilic conditions for the other chassis. However, *Synechococcus elongatus* PCC 7942 makes sucrose and does not secrete it.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

As a method of obtaining the sucrose from the cyanobacteria, we propose forcing export by adding an exporter gene to the model. We added the *cscB* gene, the *E. coli* sucrose permease whose expression in PCC 7942 has been validated experimentally <a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a>. CscB is natively a proton–sucrose symporter, but under high intracellular sucrose it can run in reverse, exporting sucrose to the medium.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

Does sucrose export cost growth? To find out, we swept the biomass constraint to map the export–growth trade-off and identify a reasonable operating point.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn and redesign</span><div class="iter-body">

Biomass and sucrose export are negatively linearly correlated, so growth had to be capped to increase sucrose export. Based on the trade-off, we sought a plausible point at which to cap growth. This also depends on the hypothetical co-culture dynamics, which we do not model explicitly. We tested the case with yeast (*S. cerevisiae*). The ratio of sucrose export by cyanobacteria to uptake by yeast was found to be 1:1.

We initially chose a cap of 0.03 h⁻¹ for cyanobacteria, but the sucrose export of 0.23 mmol·gDW⁻¹·h⁻¹ at that rate caused yeast to grow more slowly than cyanobacteria, meaning cyanobacteria would take over the culture.

We then re-capped cyanobacterial growth at 0.013 h⁻¹. This yielded a higher sucrose export of 0.81 mmol·gDW⁻¹·h⁻¹, a 3.5-fold increase, making yeast grow faster than cyanobacteria, at a rate of 0.038 h⁻¹.

In addition, considering that cyanobacteria produce oxygen — 4.23 mmol·gDW⁻¹·h⁻¹ at the capped growth rate — and assuming a co-culture model where we supply this oxygen to the anaerobic yeast, the growth of yeast further increases substantially, to 0.175 h⁻¹, about 13 times the anaerobic rate. We also see that the microaerophilic condition enhances nanobody and protein production in the yeast.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">3</span>Cycle 3: A knockout strategy that failed</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

The alternative to exporting sucrose is to stop the cell from consuming it and let it accumulate for recovery by lysis. We therefore tried knocking out genes that consume sucrose, with the first targets being *glgC* and *invA*, for which the literature reports increases of 15–300% <a class="cite" href="#ref-16">16</a><a class="cite" href="#ref-17">17</a><a class="cite" href="#ref-18">18</a><a class="cite" href="#ref-19">19</a>.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

We added a sucrose sink so flux balance analysis (FBA) could optimize for accumulation, tested further knockouts of competing pathways, traced flux to locate the bottleneck, ran single-gene deletion across the genome, and ran flux variability analysis (FVA) at a fixed biomass of 0.013 h⁻¹ to screen for any gene whose deletion would force sucrose flux upward.

</div></div>
<div class="iter-row test"><span class="iter-label">Result</span><div class="iter-body">

Accumulation flux under habitat-analogue light and carbon was 0.29 mmol·gDW⁻¹·h⁻¹. Under unlimited carbon and light the theoretical maximum is 16.3 mmol·gDW⁻¹·h⁻¹, with and without the knockouts alike. Single-gene deletion confirmed sucrose phosphate synthase (SPS) as essential, and each NDH-1 subunit, part of the CO₂-concentrating mechanism, cost about 53% of sucrose flux. The FVA screen returned no candidate at all: sucrose and growth stayed uncoupled for every gene tested.

Flux tracing put the bottleneck in Calvin-cycle output, specifically the fructose-6-phosphate pool available for sucrose synthesis. This suggests that increasing sucrose production requires either enhanced CO₂ fixation capacity or reduced biomass allocation, rather than elimination of competing pathways.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

Reading the literature further, we realized that the published knockouts (InvA, GlgA/GlgC, GgpS) report sucrose increases only under salt-stress conditions. Such regulatory mechanisms are absent from stoichiometric FBA, so GEM-based knockout screening cannot discover regulation-dependent pathways. We therefore decided not to spend wet lab effort here, and to prefer export over lysis on a launch-mass argument.

</div></div>
</div>

</div>

<div class="callout">

<p class="callout-label">What the failed knockout cycle does and does not show</p>

The flat sucrose flux across every knockout combination is a **limit of the method, not a result about the biology**. Stoichiometric FBA has no way to represent the salt-stress regulation through which the published knockouts are thought to act, so this cycle is evidence that the model cannot answer the question — not evidence that the knockouts do not work.

Two further limits apply to Cycle 2: the co-culture is sequential coupled FBA rather than a dynamic co-culture, and the operating point we chose depends on co-culture dynamics we do not model explicitly.

</div>

### Batch models of induction timing

Genome-scale models told us what to build and where. They are steady-state by construction, so they cannot say *when* to switch production on. The last three cycles use batch models that follow a culture over time instead.

<div class="iter-list">

<div class="iter">
<h4 class="iter-title"><span class="iter-num">4</span>Cycle 4: Timing induction and harvest in <i>B. subtilis</i></h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We understood through the GEMs what we need to build and where to build it, but flux balance analysis is steady-state by construction: it reports rates, not trajectories, and it gives no detail of a batch that starts, depletes its medium and is harvested. It therefore cannot answer the third decision: when to switch production on? This matters because overexpressing a nanobody burdens the host. Transcription and translation compete with growth, so an inducible promoter separates biomass accumulation from production. If we induce too early, there are too few cells to produce anything, whereas inducing too late leaves no time to produce it. We wanted a first estimate of where that optimum sits.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We built the simplest model that still contains the trade-off. Biomass grows exponentially at a rate that switches at the induction time t<sub>i</sub>, from μ to βμ, where β is the burden parameter (β = 0.50). Product accumulates in proportion to the active biomass and is lost first-order at a rate k<sub>d</sub>. Since nothing is limiting in this model version, it solves in closed form for the production-phase duration τ = T − t<sub>i</sub> that maximizes harvest titre:

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image13.avif" alt="The optimal production duration τ* equals one over (βμ plus k_d) times the natural log of (μ plus k_d) over ((1 minus β) times μ), and the optimal induction time t_i* equals T minus τ*"></div><figcaption class="caption"><strong>Figure 66. The optimum has a closed form in the growth rate, the burden and the degradation rate.</strong> Optimal production-phase duration τ* and induction time t<sub>i</sub>* for a batch of length T.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We tested the model against its own limits. With no burden (β → 1) the optimum runs to the whole batch, meaning a product that costs the cell nothing should be induced immediately. With complete growth arrest (β → 0) a finite optimum survives. With no degradation at all (k<sub>d</sub> → 0) the trade-off reduces to cell density against production time. For our parameters the model gives τ* = 15.25 h of a 48 h batch, so t<sub>i</sub>* = 32.7 h: induce late.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

That answer rests entirely on the assumption that the culture never runs out of anything, and a closed habitat is the opposite of that. Before treating 32.7 h as a recommendation, we put the same batch under resource limitation.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">5</span>Cycle 5: Peak titre and harvest titre are not the same</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

We asked the same question after adding the resources that a real batch runs out of.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

A five-state ODE model of *S. cerevisiae*: biomass, product, sugar, dissolved oxygen and a headspace oxygen reservoir. We used Monod terms for growth and production, and oxygen enters the liquid from the headspace through a transfer term with coefficient k<sub>L</sub>. The system was integrated with `scipy.integrate.solve_ivp` (RK45, rtol 1e-7, atol 1e-9), with every state floored at zero at each evaluation so the Monod terms stay well defined.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We swept the induction time across the batch and recorded the resulting titre. Peak nanobody falls monotonically from 0.238 mg L⁻¹ at t<sub>i</sub> = 0; there is no interior optimum at all. Sugar and dissolved oxygen are driven towards exhaustion in the second half of the batch, and both biomass and product stall.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image29.avif" alt="Line chart of maximum nanobody against induction time from 0 to 48 hours: the curve starts at about 0.24 and falls steadily, steepest between 24 and 32 hours, to almost zero by 48 hours"></div><figcaption class="caption"><strong>Figure 67. In the resource-limited yeast model, later induction only lowers the titre.</strong> Peak nanobody titre against induction time, falling monotonically from t<sub>i</sub> = 0.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The idealized model says that induction should be done late; the resource-limited one says that the batch can run out of things, and delaying only wastes substrate. We therefore read the induction time from the resource-unlimited model as an upper bound on how long one could wait. We kept both models on the page to show that the gap between them reveals which assumption is doing the work.

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">6</span>Cycle 6: Extending the model to <i>B. subtilis</i></h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

The same framework was applied to *B. subtilis*, with two features this host needs added. A nanobody is a protein, so its synthesis needs amino-acid precursors as well as carbon and energy: we added an explicit precursor pool. And *B. subtilis* secretes extracellular proteases that degrade heterologous product, so product loss carries a term proportional to biomass itself, (k<sub>d0</sub> + k<sub>prot</sub>·X)·P, rather than a simple first-order loss.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

A six-state model over a 72 h batch with β<sub>B</sub> = 0.10, with the induction time scanned across 97 points between 0 and 48 h.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The yield curve is a sharp peak at 6.5 h: missing it by a few hours costs most of the product. The protease term also separates two quantities that are the same in the yeast model: the t<sub>i</sub> = 12 h run peaks near 140 mg L⁻¹ around 28 h and then declines, so peak titre and harvest titre are different numbers.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering/image69.avif" alt="Line chart of final nanobody at harvest against induction time, with a sharp peak at 6.5 hours and a steep fall within a few hours on either side"></div><figcaption class="caption"><strong>Figure 68. Final nanobody at harvest peaks sharply at 6.5 h and collapses within a few hours either side.</strong> Final nanobody at harvest against induction time in the <i>B. subtilis</i> model.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

We sized the nitrogen pool generously (5.0 g L⁻¹) and it never became binding: sugar is exhausted by about 40 h while the nitrogen pool is only partly consumed. Under this parameter set, carbon limits this batch and not nitrogen, so the feature we added for realism changed nothing. Peak and harvest titre are different quantities, so the culture should be harvested at the product peak rather than at a fixed end time.

</div></div>
<div class="iter-row learn"><span class="iter-label">Iterated design</span><div class="iter-body">

We fixed the induction window at 6.5–7 h as the condition for the wet lab to test first, and packaged all three models with their parameters, solver settings and the expected output values in the public repository, so that every figure can be regenerated and checked.

</div></div>
</div>

</div>

<div class="callout warn">

<p class="callout-label">Illustrative parameters, not measurements</p>

The maximum specific growth rate is taken from the GEM work, while every other value in these three models is an illustrative setting. They demonstrate the induction-timing trade-off; the 6.5 h optimum should be refined against experimental data before it is used as a process set point.

</div>


#

## References

<ol class="ref-list">

<li id="ref-1">COMSOL AB (2019). <em>COMSOL Multiphysics®</em> v. 5.5, CFD Module. COMSOL AB, Stockholm, Sweden. <a href="https://www.comsol.com" target="_blank" rel="noopener noreferrer">https://www.comsol.com</a></li>
<li id="ref-2">Nagata S. <em>Mixing: Principles and Applications</em>. Wiley, New York, 1975.</li>
<li id="ref-3">Rieger F, Ditl P, Novák V. Vortex depth in mixed unbaffled vessels. <i>Chemical Engineering Science</i>, 34:397–403, 1979.</li>
<li id="ref-4">Paul EL, Atiemo-Obeng VA, Kresta SM (eds.). <em>Handbook of Industrial Mixing: Science and Practice</em>. Wiley-Interscience, Hoboken, 2004.</li>
<li id="ref-5">Clift R, Grace JR, Weber ME. <em>Bubbles, Drops, and Particles</em>. Academic Press, New York, 1978.</li>
<li id="ref-6">Garcia-Ochoa F, Gomez E. Bioreactor scale-up and oxygen transfer rate in microbial processes: an overview. <i>Biotechnology Advances</i>, 27(2):153–176, 2009. <a href="https://doi.org/10.1016/j.biotechadv.2008.10.006" target="_blank" rel="noopener noreferrer">doi:10.1016/j.biotechadv.2008.10.006</a></li>
<li id="ref-7">Sander R. Compilation of Henry's law constants (version 4.0) for water as solvent. <i>Atmospheric Chemistry and Physics</i>, 15:4399–4981, 2015.</li>
<li id="ref-8">Ranz WE, Marshall WR. Evaporation from drops, parts I and II. <i>Chemical Engineering Progress</i>, 48:141–146 and 173–180, 1952.</li>
<li id="ref-9">Cussler EL. <em>Diffusion: Mass Transfer in Fluid Systems</em>, 3rd ed. Cambridge University Press, Cambridge, 2009.</li>
<li id="ref-10">Higbie R. The rate of absorption of a pure gas into a still liquid during short periods of exposure. <i>Transactions of the AIChE</i>, 31:365–389, 1935.</li>
<li id="ref-11">Garcia-Ochoa F, Gomez E, Santos VE, Merchuk JC. Oxygen uptake rate in microbial processes: an overview. <i>Biochemical Engineering Journal</i>, 49(3):289–307, 2010. <a href="https://doi.org/10.1016/j.bej.2010.01.011" target="_blank" rel="noopener noreferrer">doi:10.1016/j.bej.2010.01.011</a></li>
<li id="ref-12">Maxim Integrated (now Analog Devices). <em>DS18B20: Programmable resolution 1-Wire digital thermometer</em> [Datasheet, Rev. 6, July 2019]. <a href="https://www.analog.com/en/products/ds18b20.html" target="_blank" rel="noopener noreferrer">https://www.analog.com/en/products/ds18b20.html</a></li>
<li id="ref-13">Mangkalaphiban K, He F, Ganesan R, et al. Transcriptome-wide investigation of stop codon readthrough in <i>Saccharomyces cerevisiae</i>. <i>PLoS Genetics</i>, 17(4):e1009538, 2021. <a href="https://doi.org/10.1371/journal.pgen.1009538" target="_blank" rel="noopener noreferrer">doi:10.1371/journal.pgen.1009538</a></li>
<li id="ref-14">Kahler AE, Nielsen FS, Switzer RL. Biochemical characterization of the heteromeric <i>Bacillus subtilis</i> dihydroorotate dehydrogenase and its isolated subunits. <i>Archives of Biochemistry and Biophysics</i>, 371(2):191–201, 1999. <a href="https://doi.org/10.1006/abbi.1999.1455" target="_blank" rel="noopener noreferrer">doi:10.1006/abbi.1999.1455</a></li>
<li id="ref-15">Marinoni I, Nonnis S, Monteferrante C, et al. Characterization of L-aspartate oxidase and quinolinate synthase from <i>Bacillus subtilis</i>. <i>The FEBS Journal</i>, 275(20):5090–5107, 2008. <a href="https://doi.org/10.1111/j.1742-4658.2008.06641.x" target="_blank" rel="noopener noreferrer">doi:10.1111/j.1742-4658.2008.06641.x</a></li>
<li id="ref-16">Ducat DC, Avelar-Rivas JA, Way JC, Silver PA. Rerouting carbon flux to enhance photosynthetic productivity. <i>Applied and Environmental Microbiology</i>, 78(8):2660–2668, 2012. <a href="https://doi.org/10.1128/AEM.07901-11" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.07901-11</a></li>
<li id="ref-17">Santos-Merino M, Yun L, Ducat DC. Cyanobacteria as cell factories for the photosynthetic production of sucrose. <i>Frontiers in Microbiology</i>, 14:1126032, 2023. <a href="https://doi.org/10.3389/fmicb.2023.1126032" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2023.1126032</a></li>
<li id="ref-18">Kirsch F, Klähn S, Hagemann M. Salt-regulated accumulation of the compatible solutes sucrose and glucosylglycerol in cyanobacteria and its biotechnological potential. <i>Frontiers in Microbiology</i>, 10:2139, 2019. <a href="https://doi.org/10.3389/fmicb.2019.02139" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2019.02139</a></li>
<li id="ref-19">Xu Y, Guerra LT, Li Z, Ludwig M, Dismukes GC, Bryant DA. Altered carbohydrate metabolism in glycogen synthase mutants of <i>Synechococcus</i> sp. strain PCC 7002: cell factories for soluble sugars. <i>Metabolic Engineering</i>, 16:56–67, 2013. <a href="https://doi.org/10.1016/j.ymben.2012.12.002" target="_blank" rel="noopener noreferrer">doi:10.1016/j.ymben.2012.12.002</a></li>

</ol>
