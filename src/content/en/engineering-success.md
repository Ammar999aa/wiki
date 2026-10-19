## The DBTL cycle

Engineering cycles are the central practice of iGEM and of synthetic biology in general: a systematic framework for developing and improving biological systems. The process follows four iterative stages.

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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image24.avif" alt="Diagram of the Design, Build, Test and Learn stages arranged as a repeating loop"></div><figcaption class="caption"><strong>Figure 1. Each pass through the loop sets up the next one: what we learn in one iteration becomes the design of the following one.</strong> The four stages of the Design–Build–Test–Learn framework.</figcaption></figure>
</div>

Our project went through numerous DBTL cycles throughout the year, with each iteration helping us improve our system. Below is a summary of each major cycle SHIHAB went through, grouped into three tracks.

<div class="card-grid row">

<div>

#### Hardware

The bioreactor and the two halves of the protein purification system — [filtration](#filtration-unit) and [fluid dispensing](#fluid-dispensing). Twenty-five design iterations in total.

</div>

<div>

#### Wet lab

[Construct design](#construct-design), [transformation](#transforming-our-chassis), [irradiation assays](#irradiation-assays) and [culture conditions](#culture-conditions) across three chassis.

</div>

<div>

#### Dry lab

[Metabolic models](#metabolic-models): repairing a published model, forcing sucrose export, and a knockout strategy that did not work.

</div>

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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image15.avif" alt="3D-printed attachment for holding the magnetic bead: a horizontal bar with a vertical socket on top and two split clips underneath"></div><figcaption class="caption"><strong>Figure 2. A 3D-printed attachment on a glass rod held the magnetic bead for stirring.</strong></figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image23.avif" alt="Side view of the attachment showing the split ring clip with a small gap"></div><figcaption class="caption"><strong>Figure 3. The attachment has a small gap so the magnet can be attached and detached.</strong> Side view.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image49.avif" alt="Previous motor housing: a transparent printed cylinder with a flange, with the back of the metal motor and its terminals sticking out past the flange"></div><figcaption class="caption"><strong>Figure 4. The first motor housing did not cover the motor fully.</strong> Previous housing.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image22.avif" alt="Redesigned motor housing: a transparent printed cylinder with a flange that fully covers the motor, with the shaft out of the front, screw holes on the side and wires leaving the back"></div><figcaption class="caption"><strong>Figure 5. The redesigned housing covers the motor fully.</strong> This gives the motor enhanced protection from the culture.</figcaption></figure>
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

We first conducted a computational fluid dynamics (CFD) simulation on COMSOL Multiphysics <a class="cite" href="#ref-1">1</a> to obtain an initial idea of how the three geometries affect mixing.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image60.avif" alt="Schematic cross-sections of the three rotor geometries in the vessel with their circulation patterns: one large propeller at the bottom with a slow region above, three rows of large flat blades with separate circulation loops, and three rows of small tilted blades with one large loop along the full height"></div><figcaption class="caption"><strong>Figure 6. Three rotor geometries produced different circulation patterns.</strong> Schematic cross-sections of the three rotor geometries and their circulation patterns.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image4.avif" alt="Red silicone flexible heating element labelled 300 mm by 120 mm, 12 V, 100 W, wrapped around the glass culture vessel with a multi-port cap on top"></div><figcaption class="caption"><strong>Figure 7. The 100 W heating element was too large for the vessel.</strong> The flexible heating element fitted around the culture vessel.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image16.avif" alt="Render of the glass culture vessel with an orange band representing two 30 W heaters wrapped around its circumference"></div><figcaption class="caption"><strong>Figure 8. Two 30 W heaters cover the circumference of the vessel.</strong> The heaters are shown in orange.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image35.avif" alt="The bioreactor with the heater band wrapped around the glass vessel, held in the 3D-printed frame"></div><figcaption class="caption"><strong>Figure 9. The heater band on the bioreactor vessel.</strong> The bioreactor with the heater wrapped around the glass vessel.</figcaption></figure>
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

We implemented the PID loop on the Arduino, using the DS18B20 <a class="cite" href="#ref-2">2</a> temperature reading as the input and the heater power (PWM duty cycle, 0–255) as the output. The gains were set to Kp = 30, Ki = 0.5, Kd = 10 and the loop was updated once per second. After running into problems with this approach, we replaced it with a simple on/off controller that switches the heaters on when the temperature is below the setpoint and off when it reaches it.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

The PID controller turned out to be overcomplicated for our setup, and delays in the response of the system arose. We then tested the much simpler on/off method, heating water from 18 °C to a setpoint of 36 °C. The water reached the setpoint in about 34 minutes and was then held there, as shown below. The detailed steady-state results are reported under [experimental validation](/kaust-ksa/hardware#experimental-validation) on the Hardware page.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image6.avif" alt="Line chart titled Bioreactor Temperature Profile with a 36 degrees C setpoint: temperature rises steadily from 18 degrees C to 36 degrees C over about 34 minutes, then holds flat for the rest of the 50-minute run"></div><figcaption class="caption"><strong>Figure 10. Simple on/off control held the temperature at the 36 °C setpoint.</strong> Water heated from 18 °C, reaching the setpoint after about 34 minutes and holding it for the remainder of the run.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image41.avif" alt="Bioreactor prototype with the pH sensor installed through the lid of the glass vessel, below a 3D-printed electronics tray held up by four supports"></div><figcaption class="caption"><strong>Figure 11. The pH sensor was integrated into the prototype.</strong> Bioreactor prototype with the pH sensor installed.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image42.avif" alt="Render of the 3D-printed vessel lid, a disc with six threaded port connectors in the centre, a larger opening and a small opening for sensors, and slots around the edge"></div><figcaption class="caption"><strong>Figure 12. The 3D-printed lid has ports and sensor openings.</strong> The ports are threaded to fit luer lock connectors.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image25.avif" alt="Coil of clear silicone tubing in a plastic box"></div><figcaption class="caption"><strong>Figure 13. Silicone tubing connects the fluid lines.</strong> The tubing has a 2.5 mm inner diameter.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image55.avif" alt="Three clear plastic luer lock connectors with barbed tube ends"></div><figcaption class="caption"><strong>Figure 14. Plastic luer lock connectors join the tubing to the lid ports.</strong></figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image61.avif" alt="Touchscreen LCD showing the SHIHAB Bioreactor welcome screen with the text Touch screen to start, wired to an Arduino on a breadboard"></div><figcaption class="caption"><strong>Figure 15. A touchscreen runs the dashboard.</strong> The LCD showing the SHIHAB welcome screen.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We wired and programmed the controller, built the dashboard interface and housed everything in a 3D-printed enclosure consisting of four removable supports and a compartment at the top for the electronics. The electronics compartment also has a removable lid for convenient troubleshooting should it be necessary.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image58.avif" alt="The assembled SHIHAB bioreactor: a 3D-printed base with the touchscreen and power switch, four supports holding the electronics tray at the top, and the glass vessel with the 3D-printed lid, rotor and heaters in the middle"></div><figcaption class="caption"><strong>Figure 16. The final bioreactor brings all components together in one compact unit.</strong> The assembled SHIHAB bioreactor.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image27.avif" alt="Top view of the square flange of the motor housing, showing the central circular opening and screw holes at the corners"></div><figcaption class="caption"><strong>Figure 17. The new housing has a square top.</strong> Top view of the square part, with its central opening and screw holes.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image39.avif" alt="Side view of the motor housing: a cylindrical body with a square flange at the top"></div><figcaption class="caption"><strong>Figure 18. The square part sits on a cylindrical body.</strong> Side view of the housing, with the square flange at the top.</figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We 3D-printed the new housing and the matching square slot in the top case of the electronics compartment. The motor sits inside the cylindrical body of the housing with its shaft coming out of the bottom, and the housing then drops into the slot from above. The square part has screw holes, so that screws and nuts can be added as an optional extra lock.

<div class="figure-grid" style="--fig-h: 240px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image37.avif" alt="The motor seated inside the printed housing, with two screws and nuts fitted through the square flange"></div><figcaption class="caption"><strong>Figure 19. The motor sits inside the new housing.</strong> The motor in its housing, with the two screws and nuts used for the optional lock.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image21.avif" alt="The empty square slot in the floor of the 3D-printed electronics compartment"></div><figcaption class="caption"><strong>Figure 20. The top case has a matching square slot.</strong> The empty slot in the floor of the electronics compartment.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We seated the motor housing in the slot and ran the motor, checking that the housing stayed stationary as the motor rotated. We also compared installing it with the previous version, in which the housing had to be screwed on, and fitted the optional screws to check that they could be used as an extra lock.

<div class="figure-grid" style="--fig-h: 240px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image19.avif" alt="Top view of the motor in its housing seated in the slot, with the motor wires leaving the compartment"></div><figcaption class="caption"><strong>Figure 21. The housing sits flush in the slot.</strong> Top view of the motor in its housing in the slot, with the motor wires leaving the compartment.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image13.avif" alt="Angled view of the motor in its housing seated in the slot of the top case"></div><figcaption class="caption"><strong>Figure 22. Seen from an angle.</strong> The motor in the slot of the top case.</figcaption></figure>
</div>

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The square slot holds the housing in place without tools, which makes the motor easier to install and replace than when the user had to screw the housing on. The screw holes remain available for users who want extra security, particularly in low-gravity settings.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image12.avif" alt="Close-up of the housing seated in the slot with two screws fitted through the square flange"></div><figcaption class="caption"><strong>Figure 23. Screws can still be added for extra security.</strong> Close-up of the housing in the slot with two screws fitted.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image5.avif" alt="Two printed halves of a bioreactor support; the right one has an opening near the bottom for wires"></div><figcaption class="caption"><strong>Figure 24. The supports are hollow.</strong> Two printed support halves; the right one has an opening near the bottom for wires.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We assembled the bioreactor with the wiring routed through the supports and checked that the sensors and the dashboard components still worked and that the wiring was hidden from view.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image2.avif" alt="The assembled bioreactor with its hollow supports, with no wiring visible on the outside"></div><figcaption class="caption"><strong>Figure 25. Wiring runs through the supports.</strong> The assembled bioreactor with its hollow supports.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image10.avif" alt="Two syringe filters: one in its blue-topped sterile packaging and one labelled Target2 PVDF 0.2 micrometre"></div><figcaption class="caption"><strong>Figure 26. A PVDF syringe filter was used for the first filtration test.</strong> The filter has a 0.2 µm pore size.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image36.avif" alt="A graduated syringe with the PVDF 0.2 micrometre filter fitted on its tip"></div><figcaption class="caption"><strong>Figure 27. The filter was fitted onto a syringe that was repeatedly filled with the yeast mixture.</strong></figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image56.avif" alt="Gloved hand holding a 3D-printed module with a filter disc covered in a pale layer of yeast residue"></div><figcaption class="caption"><strong>Figure 28. Yeast residue accumulated on the filter.</strong> Residue left on the filter after passing the culture through.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image59.avif" alt="Four 3D-printed filtration modules of increasing chamber height, shown side by side"></div><figcaption class="caption"><strong>Figure 29. We printed four module versions with chamber heights of 5, 10, 15 and 20 mm.</strong></figcaption></figure>
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

**Table 1. Taller chambers hold more residue, but every millimetre of chamber height also costs module height and dead volume.** The 15 mm variant held enough residue to filter ~570 mL without clogging while staying ~25% smaller in chamber volume than the Iteration 3 design.

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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image53.avif" alt="Three 3D-printed filtration modules side by side, two with screw threads on one end"></div><figcaption class="caption"><strong>Figure 30. Threaded connections join the filtration modules.</strong></figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image28.avif" alt="Three filtration modules screwed together into one assembled stack"></div><figcaption class="caption"><strong>Figure 31. Three modules screw together into one stack.</strong> Assembled three-module configuration.</figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

All stacked configurations assembled easily and stayed leak-free. Adding more stages improved clarity of the filtrate, while each stage held its share of the residue without clogging. The filtrate after three stages was surprisingly clear, giving us an initial indication that filtration was successful. More quantitative optical density measurements would further verify this result.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image50.avif" alt="Three centrifuge tubes held in a gloved hand: the left one cloudy with the initial yeast mixture, and the middle and right ones progressively clearer"></div><figcaption class="caption"><strong>Figure 32. More filtration stages gave clearer filtrate.</strong> Left to right: the initial yeast mixture; after two stages of filtration (500 µm and 11 µm pore size); after three stages (500 µm, 11 µm and 0.2 µm pore size).</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image20.avif" alt="CAD model of the peristaltic pump design, with one pump per reservoir"></div><figcaption class="caption"><strong>Figure 33. The peristaltic pump option used one pump per reservoir.</strong> CAD model of the peristaltic pump design.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image33.avif" alt="CAD model of the syringe pump design, with stepper motors driving lead screws that push the syringe plungers"></div><figcaption class="caption"><strong>Figure 34. The syringe pump option moves the plungers with stepper motors and lead screws.</strong> CAD model of the syringe pump design.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image38.avif" alt="An A4988 stepper motor driver board"></div><figcaption class="caption"><strong>Figure 35. The A4988 driver was the first driver we tried.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

We replaced the A4988 drivers with TMC2209 drivers. We also incorporated a CNC shield to organize the drivers and wiring into a more compact assembly.

<div class="figure-grid" style="--fig-h: 230px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image47.avif" alt="A TMC2209 stepper motor driver board"></div><figcaption class="caption"><strong>Figure 36. The TMC2209 driver replaced the A4988.</strong></figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image45.avif" alt="A CNC shield with the stepper drivers plugged into it, keeping the wiring compact"></div><figcaption class="caption"><strong>Figure 37. The CNC shield keeps the drivers and wiring compact.</strong></figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image32.avif" alt="Limit switches mounted behind the syringes on the pump frame"></div><figcaption class="caption"><strong>Figure 38. Limit switches behind the syringes set the home position.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We measured and tested this offset to check the alignment of the home position.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image40.avif" alt="A syringe in the pump with its plunger aligned to the 60 mL graduation mark"></div><figcaption class="caption"><strong>Figure 39. At home, the plunger aligns with the syringe's 60 mL mark.</strong></figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image3.avif" alt="A servo motor mounted on a valve that switches the output between the collection and waste lines"></div><figcaption class="caption"><strong>Figure 40. A servo motor turns the valve between the collection and waste paths.</strong></figcaption></figure>
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

**Table 2. Each chassis received Dsup through a vector that integrates at a safe harbor locus rather than an episomal plasmid.** We ensured that the vectors we selected target regions classified as "safe harbor" areas in each organism's chromosomes, so that normal cellular activities are not disrupted in recombineered cells.

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
<figure><div class="photo-frame light"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image17.avif" alt="NLS Mapper output for the Dsup sequence, with the predicted bipartite classical nuclear localization signal highlighted in red"></div><figcaption class="caption"><strong>Figure 41. The predicted classical NLS sits in a single short stretch of the Dsup sequence, which is what let us judge it as a candidate for replacement.</strong> NLS mapping of Dsup via <a href="https://nls-mapper.iab.keio.ac.jp/cgi-bin/NLS_Mapper_form.cgi" target="_blank" rel="noopener noreferrer">NLS Mapper</a>; the cNLS is highlighted in red.</figcaption></figure>
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

After studying the corresponding literature, we realized certain codons are quite "leaky" (high readthrough). For instance, UGA is considered the leakiest in *S. cerevisiae*, while UAA is generally considered the most efficient for ensuring translational termination and preventing readthrough <a class="cite" href="#ref-3">3</a>. Moreover, we learned that one stop codon is not always enough to halt translation correctly.

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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image29.avif" alt="Line chart of optical density against time in hours, rising from 0.05 at 0 h to about 0.92 at 4.5 h, with the steepest rise between 2.5 and 4 h"></div><figcaption class="caption"><strong>Figure 42a. The growth curve gave us a clear T0, so the competence protocol was being followed at the right growth stage.</strong> OD<sub>600</sub> of <i>B. subtilis</i> in SPI medium, sampled every 30 minutes.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image1.avif" alt="Selective agar plate labelled pBS1C with spectinomycin, carrying fewer than ten scattered colonies of varying size"></div><figcaption class="caption"><strong>Figure 42b. Correct timing did not translate into transformants: only a handful of colonies appeared with the integrative plasmid.</strong> Selective plate from the pBS1C transformation.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image14.avif" alt="Three agar plates after electroporation: two carrying heavy confluent growth and one with almost none"></div><figcaption class="caption"><strong>Figure 43. A time constant in the expected range still produced no transformants, which is what ruled the pulse itself out as the limiting step.</strong> Plates from the improved electroporation run.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image52.avif" alt="Three selective agar plates labelled linear pBS1C, pBS1C and pHT-ads; the two pBS1C plates carry hundreds of colonies and the pHT-ads plate carries about a dozen"></div><figcaption class="caption"><strong>Figure 44a. Switching to SP medium turned a handful of colonies into hundreds.</strong> Selective plates from the SP-medium transformation, with pBS1C in linear and circular form and the episomal pHT-ads plasmid.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image48.avif" alt="Starch agar plate after iodine staining, viewed on a light box, with a stained orange-brown region around the streaked growth"></div><figcaption class="caption"><strong>Figure 44b. Iodine staining of starch plates is what let us read integration at <i>amyE</i> off a plate rather than by sequencing.</strong> Starch agar plate after iodine staining.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image44.avif" alt="Electroporator unit on the bench with a cuvette in its chamber"></div><figcaption class="caption"><strong>Figure 45a. The electroporation setup.</strong></figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image11.avif" alt="Close-up of the electroporation cuvette holder and the instrument's control panel"></div><figcaption class="caption"><strong>Figure 45b. The cuvette chamber and controls.</strong></figcaption></figure>
</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

During electroporation, we observed electrical arcing (sparking), indicating excessive electrical conductivity in the electroporation mixture. After investigating the possible causes, we identified the restriction digestion buffer as the likely main contributor.

<div class="figure-grid" style="--fig-h: 260px;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image34.avif" alt="Electroporator display showing an arc fault error message instead of a delivered pulse reading"></div><figcaption class="caption"><strong>Figure 46. The instrument reports the arc as a fault rather than a delivered pulse, so the sample never received the intended field.</strong> Error message observed due to electrical arcing.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image18.avif" alt="Electroporation cuvette seen from above at the moment of the pulse, with a bright orange flash of the arc between the electrodes"></div><figcaption class="caption"><strong>Figure 47. The arc is visible in the cuvette itself.</strong> Arcing in the electroporation cuvette upon initiation of the pulse delivery.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image57.avif" alt="Electroporator display showing a successfully delivered pulse with its voltage and time constant, instead of an arc fault"></div><figcaption class="caption"><strong>Figure 48. With the cleanup step added, the instrument delivers a complete pulse instead of arcing.</strong> Successful delivery of an electric pulse to the sample after incorporation of DNA cleanup.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image54.avif" alt="Agar plate of unirradiated Bacillus subtilis showing dense confluent growth"></div><figcaption class="caption"><strong>Figure 49a. Mock.</strong> No irradiation.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image9.avif" alt="Agar plate of Bacillus subtilis after one minute of UV-C exposure, with visibly reduced growth"></div><figcaption class="caption"><strong>Figure 49b. Dose 1.</strong> One minute of UV-C.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image26.avif" alt="Agar plate of Bacillus subtilis after two minutes of UV-C exposure, with growth reduced further"></div><figcaption class="caption"><strong>Figure 49c. Dose 2.</strong> Two minutes of UV-C.</figcaption></figure>
</div>

<div class="caption">

**Figure 49. Growth falls off progressively between the mock and two minutes of UV-C, confirming the hood lamp works in the dose range the crosslinker could not reach.** UV-C irradiation results for *B. subtilis*.

</div>

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We irradiated the plate at eight different doses: 0, 6, 12, 18, 24, 30, 90 and 180 mJ/cm².

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The hood irradiation effectively prevented cell growth; however, we ran into two problems. The number of colonies was too high, making it difficult to confirm how many cells died at the low doses, and the middle doses had some plate contamination. This was most likely because the hood was not entirely clean. Despite these setbacks, we compared the results from our good plates to what is known in the literature for *Bacillus* UV radiation resistance, and our results agreed with the literature.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image8.avif" alt="Composite figure headed UV-C energy used 0.1 mW per square centimetre, showing plates at 0, 6, 30, 90 and 180 mJ per square centimetre with growth decreasing across the series, plus an inset plate for the 12 to 24 mJ per square centimetre range"></div><figcaption class="caption"><strong>Figure 50. Growth drops away across the dose series, but the plates carry too many colonies to count survivors at the low doses — which is what sent us to a spot assay.</strong> Plates irradiated in the hood at 0.1 mW/cm², labelled by delivered dose; the inset covers the 12–24 mJ/cm² range.</figcaption></figure>
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

**Table 3. Six 5-fold steps span more than four orders of magnitude, so at least one spot in every row lands in a countable range whatever the dose does.** Each dilution factor is the total dilution relative to the OD<sub>600</sub> = 1 starting suspension.

</div>

We ensured the plate was completely dry before aliquoting 4 µL of each dilution in a row, from highest to lowest. We performed this experiment using three independent cultures to form a biological triplicate.

</div></div>
<div class="iter-row test"><span class="iter-label">Test</span><div class="iter-body">

We let the plate dry again after adding our dilution, then we irradiated the plate at six different doses: 0, 6, 12, 18, 24 and 30 mJ/cm².

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image30.avif" alt="Six Bacillus subtilis spot assay plates labelled 0, 6, 12, 18, 24 and 30 mJ per square centimetre; the number and size of spots falls across the series until almost none remain at 30"></div><figcaption class="caption"><strong>Figure 51. The spot assay resolves the dose at which <i>B. subtilis</i> starts to die, which neither earlier plating method could.</strong> Six 5-fold dilutions spotted per plate, one plate per dose, at 0 to 30 mJ/cm².</figcaption></figure>
</div>

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image43.avif" alt="Six Saccharomyces cerevisiae spot assay plates labelled 0, 6, 12, 18, 24 and 30 mJ per square centimetre, with spots fading across the series"></div><figcaption class="caption"><strong>Figure 52. The same assay reads out on <i>S. cerevisiae</i>, so one protocol covers both chassis.</strong> Spot assay for <i>S. cerevisiae</i> over the same 0 to 30 mJ/cm² dose series.</figcaption></figure>
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
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image7.avif" alt="Fluorescence micrograph of IPC1 Pichia pastoris cells after two days of 0.5% methanol induction, showing bright red mCherry signal"></div><figcaption class="caption"><strong>Figure 53a. 0.5% methanol.</strong> Two days of induction.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image31.avif" alt="Fluorescence micrograph of IPC1 Pichia pastoris cells after two days of 1% methanol induction, showing weaker red mCherry signal"></div><figcaption class="caption"><strong>Figure 53b. 1% methanol.</strong> Two days of induction.</figcaption></figure>
</div>

<div class="caption">

**Figure 53. Halving the methanol concentration increased mCherry fluorescence rather than reducing it, overturning our starting assumption.** Fluorescence imaging of IPC1 mutants after two days of induction.

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

We assessed cell viability using a Countess automated cell counter combined with Trypan Blue staining. Despite the unusually dark appearance of the cultures, cell viability remained approximately 89%, suggesting that the pigmentation was not accompanied by extensive cell death under the tested conditions.

</div></div>
</div>

</div>

<div class="callout warn">

<p class="callout-label">What is still missing from this cycle</p>

The Learn stage and the final design for the adenine supplementation cycle have not been written yet. The viability measurement above is the only result recorded for it so far; the conclusion drawn from it, and whether it changes how we culture *P. pastoris*, will be added here once the team has settled them.

</div>

## Metabolic models

Our dry lab ran three cycles against genome-scale metabolic models: one that repaired a published model, one that found a workable operating point for a sucrose-supplying co-culture, and one that failed and told us something useful about the method rather than the biology. The full modeling work, including the constraints shared by every simulation, is on the [Dry Lab Modeling](/kaust-ksa/modeling) page.

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

**DHORDnad as an alternative to DHORDfum.** The Kyoto Encyclopedia of Genes and Genomes (KEGG) gives DHORDnad (EC 1.3.1.14), which our model assigns to BSU15530 and BSU15540. This is not merely an anaerobic workaround: *B. subtilis* dihydroorotate dehydrogenase is natively a Class 1B enzyme that uses NAD⁺ as its physiological electron acceptor regardless of oxygen <a class="cite" href="#ref-4">4</a>.

**ASPOfum as an alternative to ASPO6.** Upon an initial search on KEGG, the obvious candidate was ASPDH, which we used initially. However, upon literature search, we realized that the ASPDH enzyme family is specific to archaea and thermophiles, with no evidence in *B. subtilis*. Upon further literature search, we found the fumarate-linked mode of NadB (BSU27870), supported by in vitro characterization of the purified protein <a class="cite" href="#ref-5">5</a>.

```
DHORDnad: (S)-dihydroorotate + NAD⁺ → orotate + NADH + H⁺
ASPOfum:  L-aspartate + fumarate → iminoaspartate + succinate + H⁺
```

</div></div>
<div class="iter-row learn"><span class="iter-label">Iterated design</span><div class="iter-body">

With the addition of the two reactions, DHORDnad and ASPOfum, the anaerobic model functioned at a rate of 0.22 h⁻¹. We thus applied the two confirmed corrections unconditionally to both model conditions, aerobic and anaerobic, since both represent constitutive enzyme capabilities, not regulatory switches. Finally, we packaged the model with the new reactions as a reusable function for downstream use.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/engineering-success/image51.avif" alt="Bar chart titled Bacillus comparison of aerobic and anaerobic growth, with the aerobic bar at about 0.32 per hour and the anaerobic bar at 0.22 per hour"></div><figcaption class="caption"><strong>Figure 54. After the two repairs the model grows anaerobically at 0.22 h⁻¹ instead of not at all — about two-thirds of its aerobic rate, which is the behavior the organism is known for.</strong> Growth rate of the repaired <i>B. subtilis</i> model in aerobic and anaerobic conditions.</figcaption></figure>
</div>

</div></div>
</div>

<div class="iter">
<h4 class="iter-title"><span class="iter-num">2</span>Cycle 2: Sucrose export in <i>S. elongatus</i> PCC 7942</h4>
<div class="iter-row design"><span class="iter-label">Design</span><div class="iter-body">

For supplying the carbon source in a closed loop, we suggested sucrose-producing cyanobacteria as the supplier. The cyanobacteria would also produce oxygen, providing microaerophilic conditions for the other chassis. However, *Synechococcus elongatus* PCC 7942 makes sucrose and does not secrete it.

</div></div>
<div class="iter-row build"><span class="iter-label">Build</span><div class="iter-body">

As a method of obtaining the sucrose from the cyanobacteria, we propose forcing export by adding an exporter gene to the model. We added the *cscB* gene, the *E. coli* sucrose permease whose expression in PCC 7942 has been validated experimentally <a class="cite" href="#ref-6">6</a><a class="cite" href="#ref-7">7</a>. CscB is natively a proton–sucrose symporter, but under high intracellular sucrose it can run in reverse, exporting sucrose to the medium.

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

The alternative to exporting sucrose is to stop the cell from consuming it and let it accumulate for recovery by lysis. We therefore tried knocking out genes that consume sucrose, with the first targets being *glgC* and *invA*, for which the literature reports increases of 15–300% <a class="cite" href="#ref-6">6</a><a class="cite" href="#ref-7">7</a><a class="cite" href="#ref-8">8</a>.

</div></div>
<div class="iter-row build"><span class="iter-label">Build &amp; test</span><div class="iter-body">

We added a sucrose sink so flux balance analysis (FBA) could optimize for accumulation, tested further knockouts of competing pathways, traced flux to locate the bottleneck, ran single-gene deletion across the genome, and ran flux variability analysis (FVA) at a fixed biomass of 0.013 h⁻¹ to screen for any gene whose deletion would force sucrose flux upward.

</div></div>
<div class="iter-row test"><span class="iter-label">Result</span><div class="iter-body">

Accumulation flux under habitat-analogue light and carbon was 0.29 mmol·gDW⁻¹·h⁻¹. Under unlimited carbon and light the theoretical maximum is 16.3 mmol·gDW⁻¹·h⁻¹, with and without the knockouts alike. There was no change in sucrose flux in any combination, even under unlimited light and carbon; the cap stays at 16.3 mmol·gDW⁻¹·h⁻¹. The bottleneck was traced to the Calvin-cycle fructose-6-phosphate pool, SPS is essential, and NDH-1 subunits cost about 53%.

</div></div>
<div class="iter-row learn"><span class="iter-label">Learn</span><div class="iter-body">

The literature knockouts act through salt-stress regulation, which stoichiometric FBA cannot represent. We therefore decided not to spend wet lab effort here, and to prefer export over lysis on a launch-mass argument.

</div></div>
</div>

</div>

<div class="callout">

<p class="callout-label">What the failed knockout cycle does and does not show</p>

The flat sucrose flux across every knockout combination is a **limit of the method, not a result about the biology**. Stoichiometric FBA has no way to represent the salt-stress regulation through which the published knockouts are thought to act, so this cycle is evidence that the model cannot answer the question — not evidence that the knockouts do not work.

Two further limits apply to Cycle 2: the co-culture is sequential coupled FBA rather than a dynamic co-culture, and the operating point we chose depends on co-culture dynamics we do not model explicitly.

</div>

## References

<div class="callout warn">

<p class="callout-label">One source we could not resolve</p>

The source document for this page cites a fourth reference, "Xu et al., 2013", for the sucrose increases reported in the knockout literature. We could not match it to a specific paper, so it is not listed below rather than guessed at. The three references we could resolve are cited in its place.

</div>

<ol class="ref-list">

<li id="ref-1">COMSOL AB. <em>COMSOL Multiphysics®</em> [Computer software]. <a href="https://www.comsol.com" target="_blank" rel="noopener noreferrer">https://www.comsol.com</a></li>
<li id="ref-2">Maxim Integrated (now Analog Devices). <em>DS18B20: Programmable resolution 1-Wire digital thermometer</em> [Datasheet, Rev. 6, July 2019]. <a href="https://www.analog.com/en/products/ds18b20.html" target="_blank" rel="noopener noreferrer">https://www.analog.com/en/products/ds18b20.html</a></li>
<li id="ref-3">Mangkalaphiban K, He F, Ganesan R, et al. Transcriptome-wide investigation of stop codon readthrough in <i>Saccharomyces cerevisiae</i>. <i>PLoS Genetics</i>, 17(4):e1009538, 2021. <a href="https://doi.org/10.1371/journal.pgen.1009538" target="_blank" rel="noopener noreferrer">doi:10.1371/journal.pgen.1009538</a></li>
<li id="ref-4">Kahler AE, Nielsen FS, Switzer RL. Biochemical characterization of the heteromeric <i>Bacillus subtilis</i> dihydroorotate dehydrogenase and its isolated subunits. <i>Archives of Biochemistry and Biophysics</i>, 371(2):191–201, 1999. <a href="https://doi.org/10.1006/abbi.1999.1455" target="_blank" rel="noopener noreferrer">doi:10.1006/abbi.1999.1455</a></li>
<li id="ref-5">Marinoni I, Nonnis S, Monteferrante C, et al. Characterization of L-aspartate oxidase and quinolinate synthase from <i>Bacillus subtilis</i>. <i>The FEBS Journal</i>, 275(20):5090–5107, 2008. <a href="https://doi.org/10.1111/j.1742-4658.2008.06641.x" target="_blank" rel="noopener noreferrer">doi:10.1111/j.1742-4658.2008.06641.x</a></li>
<li id="ref-6">Ducat DC, Avelar-Rivas JA, Way JC, Silver PA. Rerouting carbon flux to enhance photosynthetic productivity. <i>Applied and Environmental Microbiology</i>, 78(8):2660–2668, 2012. <a href="https://doi.org/10.1128/AEM.07901-11" target="_blank" rel="noopener noreferrer">doi:10.1128/AEM.07901-11</a></li>
<li id="ref-7">Santos-Merino M, Yun L, Ducat DC. Cyanobacteria as cell factories for the photosynthetic production of sucrose. <i>Frontiers in Microbiology</i>, 14:1126032, 2023. <a href="https://doi.org/10.3389/fmicb.2023.1126032" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2023.1126032</a></li>
<li id="ref-8">Kirsch F, Klähn S, Hagemann M. Salt-regulated accumulation of the compatible solutes sucrose and glucosylglycerol in cyanobacteria and its biotechnological potential. <i>Frontiers in Microbiology</i>, 10:2139, 2019. <a href="https://doi.org/10.3389/fmicb.2019.02139" target="_blank" rel="noopener noreferrer">doi:10.3389/fmicb.2019.02139</a></li>

</ol>
