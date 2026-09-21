## Medicine can't always wait for resupply

As human space exploration advances, longer-duration missions are becoming more common. Astronauts on board need access to therapeutics that can manage health conditions arising mid-flight. Pharmaceuticals can be loaded before launch, but predicting the full range of conditions a crew might face over months or years is difficult, and carrying an extensive inventory of medicine adds payload mass, and with it, cost.

Producing therapeutics on demand, during the mission itself, offers a more flexible and resource-efficient alternative, especially for long-haul expeditions where resupply isn't an option.

Astronauts aren't trained to run complex biological protocols. So we built the SHIHAB Bioreactor: a biomanufacturing platform (a bioreactor paired with a protein purification system) designed to be simple, compact, modular, and highly automated. The crew only needs to bring the compact unit itself, along with a small inventory of "pills," to begin producing their medicine of choice on board.

<div class="two-col-images">

<div class="photo-frame">

![CAD render of the assembled prototype: bioreactor and protein purification system housed in a compact case](https://static.igem.wiki/teams/6341/wiki/content/hardware/device-cad-render.avif)

</div>

<div class="photo-frame">

![Inventory box of lyophilized "pill" cultures for the biomanufacturing platform](https://static.igem.wiki/teams/6341/wiki/content/hardware/pill-inventory-box.avif)

</div>

</div>

The result is on-demand, small-scale pharmaceutical production in space and in remote areas on Earth, without extensive technical support or equipment, putting medicine within reach where it's needed most.

## Two systems, one pill

<span class="chip">Pills</span>

A compact inventory of lyophilized bacteria, each engineered to produce a specific nanobody for a different therapeutic purpose. The crew picks the pill they need and loads it into the bioreactor before the reaction begins.

<span class="chip amber">Part I: Bioreactor</span>

Once the pill is loaded, the user sets the culture conditions and reagent quantities on an interactive dashboard. From there, onboard sensors and feedback controls hold those conditions steady on their own, so no one needs to check in on the culture as it grows.

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

<div class="panel">
<div class="panel-title">Temperature control loop</div>
<div class="flow">

<span class="flow-node amber">Temperature sensor</span>
<span class="flow-arrow">→</span>
<span class="flow-node">PID control</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">Flexible heating element</span>

</div>
</div>

<div class="panel">
<div class="panel-title">pH control loop</div>
<div class="flow">

<span class="flow-node accent">pH sensor</span>
<span class="flow-arrow">→</span>
<span class="flow-node">PID control</span>
<span class="flow-arrow">→</span>
<span class="flow-node accent">Acid / base dispensing</span>

</div>
</div>

At the end of the reaction, the culture is transferred by tubes and pumps to the protein purification system to recover the nanobodies.

<span class="chip amber">Part II: Protein purification system</span>

Once fermentation is complete, the broth containing the secreted proteins passes through the protein purification system to yield the purified nanobodies. The system has two stages: filtration, then affinity chromatography.

### Filtration unit

A modular design lets the user choose how many filtration stages suit the culture. Filter papers of decreasing pore size sit in each module, connected by gaskets to prevent leakage, a multi-stage approach that stays simple while avoiding clogs.

<div class="card-grid compact">

<div>

#### Stage 1
Coarse filter

</div>

<div>

#### Stage 2
Medium filter

</div>

<div>

#### Stage 3
Fine filter

</div>

</div>

### Affinity chromatography

Syringe pumps dispense precise volumes of each buffer: equilibration, wash, elution, and reconstitution. Each pump pairs a sterile 60 mL syringe with a stepper-motor-driven linear actuator, pre-calibrated for accurate dispensing.

<div class="flow">

<span class="flow-node">Buffer store</span>
<span class="flow-arrow">→</span>
<span class="flow-node accent">Column</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">Waste / collection</span>

</div>

After each buffer runs through, negative pressure at the waste port draws it out of the column, except during elution, when the eluate is routed to a sterile collection vial instead.

<div class="photo-frame">

![Diagram of the affinity chromatography syringe pumps, buffer lines, and column](https://static.igem.wiki/teams/6341/wiki/content/hardware/purification-system-diagram.avif)

</div>

## Built for lower gravity

On Mars, gravity is roughly a third of Earth's, about 0.33*g*, so fluid behaves differently than it does in a terrestrial lab. Rather than relying on gravity to move liquid through the system, every fluid path in the SHIHAB Bioreactor runs through closed tubing and pumps, keeping fluid handling consistent regardless of the gravity environment it's operating in.

## Hardware, sensing, and sterility

<div class="card-grid">

<div>

#### Sterilization
Keeping the culture and purification path free of contamination throughout the run.

</div>

<div>

#### Materials
Components selected to meet NASA material guidelines for spaceflight hardware.

</div>

<div>

#### Sensors
Temperature and pH sensors feed the feedback loops that keep culture conditions stable.

</div>

<div>

#### Actuators
Heating elements, acid/base dispensers, and stepper-motor syringe pumps carry out each control loop.

</div>

</div>

## Validation in progress

<div class="callout warn">

<p class="callout-label">Where we are right now</p>

We're currently testing the bioreactor and purification system as an integrated platform. Results will be added here as they come in.

</div>

## A pill, a bioreactor, and a medicine wherever it's needed

The next iterations of SHIHAB aim to expand the pill library, tighten the hardware footprint further, and push the platform toward flight-ready reliability, so that producing medicine on demand becomes as routine, off-world or off-grid, as taking it.
