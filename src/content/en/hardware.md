## Introduction

As human space exploration advances, longer-duration missions are becoming more commonplace. Astronauts on board require access to therapeutics to manage health conditions that may arise during their long-haul expeditions. While it is possible to transport pharmaceuticals aboard spacecraft prior to launch, predicting the full range of medical conditions that may arise during missions remains challenging. Maintaining an extensive inventory of medicines would substantially increase payload mass and hence mission costs as well. Thus, the ability to produce therapeutics on-demand during flight offers a more flexible and resource-efficient solution, particularly for long-haul expeditions.

We recognize that astronauts are not typically trained to handle complex biological protocols and equipment. Hence, with X, we designed a prototype of a biomanufacturing platform consisting of a bioreactor and protein purification system that is simple to use, compact, modular and highly automated. Astronauts would therefore only be required to transport the compact X, together with a small inventory of "pills", to begin the production of their medicine of choice aboard their spacecraft.

<div class="two-col-images">

![Inventory box of lyophilized "pill" cultures for the biomanufacturing platform](https://static.igem.wiki/teams/6341/wiki/content/hardware/pill-inventory-box.avif)

![CAD render of the assembled prototype: bioreactor and protein purification system housed in a compact case](https://static.igem.wiki/teams/6341/wiki/content/hardware/device-cad-render.avif)

</div>

This allows for on-demand, small-scale production of pharmaceuticals in space and remote areas without the need for extensive technical support or equipment, improving the accessibility to medicines where they are most needed.

## How It Works

### Pills

A compact inventory of lyophilized bacteria genetically engineered to produce specific nanobodies for different purposes. The user simply has to pick their pill of choice and place it in the bioreactor prior to the start of the reaction.

### Part I: Bioreactor

Once the pill has been added, the user enters the culture conditions and quantities of reagents on the interactive dashboard. The bioreactor automatically maintains the conditions at the set values via installed sensors and feedback controls that have been programmed into the system. This negates the need for the user to periodically check on the culture conditions.

Content coming soon.

<!-- Figure: interactive dashboard — no source image for this one; still to be produced. -->

**Temperature control:** Flowchart for temperature sensor → PID control → flexible heating element.

**pH control:** Flowchart for pH sensor → PID control → acid/base dispensing.

At the end of the reaction, the culture is then transferred via tubes and pumps to the protein purification system to obtain the nanobodies.

### Part II: Protein Purification System

At the end of the fermentation process, the broth containing the secreted proteins would be passed through the protein purification system (PPS) to obtain the purified nanobodies. The PPS consists of two main stages: filtration and affinity chromatography.

#### Filtration Unit

We designed a modular filtration unit that allows the user to choose the number of filtration stages that would be the most appropriate for the culture. This filtration unit is to be set up prior to the start of the purification process. To conduct multi-stage filtration – an ideal filtration method that maintains simplicity while avoiding clogging – the user places filter papers of decreasing pore sizes in each filter module, then connects the modules with gaskets in between to avoid leakage. The assembled filtration unit is then connected to the second part of the PPS.

Content coming soon.

<!-- Figure: filtration unit — no source image for this one; still to be produced. -->

#### Affinity Chromatography

The second part of the PPS consists of syringe pumps designed to dispense accurate volumes of the different buffers required for affinity chromatography, namely the equilibration buffer, the wash buffer, the elution buffer and the reconstitution buffer. Each syringe pump comprises of a sterile 60 mL syringe controlled by a stepper motor (?V DC) connected to a linear actuator to translate its rotary motion into linear actuation. These syringe pumps have been pre-calibrated to improve the accuracy of fluid dispensing. Each syringe pump is connected to both the storage bottle for each buffer as well as the affinity chromatography column, allowing for the appropriate amount of buffer to be collected from the storage bottle and dispensed into the column. The outlet of the column is connected to a dual-port connector: one for waste and one for a sterile collection vial for the final purified solution of nanobodies to be collected. After each buffer is dispensed, a negative pressure is applied at the waste port to draw the buffer out of the column, except for when the elution buffer is dispensed, in which case, the elute will be transported to the collection vial instead.

![Diagram of the affinity chromatography syringe pumps, buffer lines, and column](https://static.igem.wiki/teams/6341/wiki/content/hardware/purification-system-diagram.avif)

### Fluid Handling (in Microgravity Conditions)

Given the lower gravity experienced in Mars conditions (~0.33g), fluid is expected to behave differently from how they do on Earth. We address this by ensuring that fluid is transported in closed systems via tubes and pumps instead of relying on gravity.

### Sterilization

Content coming soon.

### Materials and Components

- Materials — compliant with NASA guidelines
- Sensors
- Actuators

## Testing

Content coming soon.

## Future of Hardware

Content coming soon.
