## Overview

We developed a comprehensive measurement framework to evaluate radiation resistance, genomically integrated Dsup-mediated protection, and recombinant protein production in our engineered microbial chassis. Through extensive optimization, repeated measurements, appropriate experimental controls, and openly shared methodologies, we aimed to share a reliable and reusable framework for studying radiation resistance and evaluating performance of engineered radiation-resistant microbial chassis.

We adapted an X-ray irradiation machine from the Animal Facility for our cell culture irradiation experiments.

<div class="figure-grid single wide" style="max-width: 640px;">
<figure>
<div class="figure-grid" style="--cols: 2;">
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/idk.avif" alt="Close-up of cell culture tubes held beneath the X-ray source on top of a block of Styrofoam, lit by the machine's red alignment lasers" loading="lazy"></div>
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/idk2.avif" alt="Inside the irradiator cabinet, a shaped Styrofoam adapter standing on a wire rack beneath the X-ray source, with red alignment lasers running down its sides" loading="lazy"></div>
</div>
<figcaption class="caption"><strong>Figure 1.</strong> Our improvised experimental setup, featuring a Styrofoam adapter repurposed from the reagent’s original delivery packaging to accommodate and position cell culture samples during irradiation.</figcaption>
</figure>
</div>

## Key points

Our project demonstrates a comprehensive and reproducible approach to evaluating radiation resistance in genetically engineered microbial chassis, combining multiple complementary measurement techniques, systematic experimental optimization, and quantitative comparisons across different radiation conditions.

<div class="card-grid stack">

<div>

#### Systematic characterization

A major focus of our work was the systematic characterization of radiation resistance conferred by Dsup expression in _Bacillus subtilis_ and _Pichia pastoris_. We evaluated cellular responses to two different types of radiation, ultraviolet (UV) and X-ray irradiation, using three complementary approaches: spot assays to assess growth and survival, resazurin reduction assays to quantify cellular metabolic activity, and OD₆₀₀ time-course measurements to monitor post-irradiation growth dynamics. In addition, rather than immediately comparing engineered and wild-type strains, we first performed extensive preliminary experiments using wild-type cells to establish suitable irradiation conditions, identify informative radiation doses, and optimize our measurement protocols.

</div>

<div>

#### Improved Dsup variant

Our characterization extended beyond evaluating wild-type Dsup performance. We also engineered an improved Dsup variant (enhanced nuclear localization) and quantitatively compared its protective performance against the original protein in _P. pastoris_.

</div>

<div>

#### Genomic integration

One important aspect of our work was the evaluation of Dsup expression as a genomically integrated system. While previous studies have frequently employed episomal expression systems, which may result in elevated protein expression due to increased plasmid copy numbers, we investigated whether a single genomically integrated copy of Dsup could provide measurable radiation protection. Our results demonstrated improved radiation tolerance in engineered _B. subtilis_ and _P. pastoris_, supporting the feasibility of using stable genomic integration rather than relying on multicopy episomal expression.

</div>

<div>

#### Protein production

We also quantitatively compared the production and purification of the antifreeze protein FfIBP in wild-type and Dsup-expressing _B. subtilis_. The comparable protein recovery observed between the two strains suggested that genomic integration and constitutive expression of Dsup did not substantially compromise recombinant protein production under our experimental conditions. This measurement was particularly important for validating the practical applicability of our engineered chassis, demonstrating that radiation protection could potentially be introduced without sacrificing their primary biomanufacturing function.

</div>

<div>

#### Shared with the community

Lastly, we aimed to ensure that our measurements would be valuable not only for our own project but also for the broader community. We documented our experimental methods, optimization strategies, and workflows in a comprehensive laboratory handbook. We also submitted our genetic parts and plasmid designs to the iGEM Registry, making our engineering approaches accessible to other teams. By sharing detailed protocols, experimental conditions, and characterization results, we hope to enable future iGEM teams to reproduce, validate, and further improve upon our work.

</div>

</div>

## Why radiation resistance matters

SHIHAB aims to enable on-demand biomanufacturing during future space missions by using engineered microorganisms as biological production hosts. However, the feasibility of this approach depends not only on the microorganisms' ability to produce therapeutic and other functional proteins, but also on their capacity to maintain viability, growth, and metabolic activity under space-related environmental stresses.

Outside Earth’s atmosphere, the space radiation field includes solar energetic particles and galactic cosmic rays, which can induce DNA damage, impair cellular functions, and reduce microbial survival. To investigate the radiation tolerance of our microbial chassis, we conducted controlled irradiation experiments using two different radiation sources: X-rays, which induce ionization and associated cellular damage, and UV-C radiation, which primarily causes photochemical DNA damage. Although these laboratory exposures do not fully reproduce the radiation environment encountered during space missions, they provide a controlled framework for evaluating microbial stress resistance and assessing the potential protective effects of our genetic modifications <a class="cite" href="#ref-1">1</a><a class="cite" href="#ref-2">2</a>.

## Why Dsup

Damage suppressor protein (Dsup) was first characterized in the tardigrade _Ramazzottius varieornatus_. Work in heterologous cells associated Dsup with improved resistance to X-ray-induced DNA damage; subsequent biochemical studies showed that Dsup can associate with nucleosomes and protect DNA from hydroxyl radicals <a class="cite" href="#ref-3">3</a><a class="cite" href="#ref-4">4</a>. This offers a rationale for testing Dsup as a protective genetic component, although its mechanism and localization may differ substantially between a bacterium and yeast.

<div class="callout accent">

<p class="callout-label">Our working hypothesis</p>

At matched starting densities and verified doses, Dsup-expressing strains will retain more colony-forming capacity and/or metabolic activity than appropriate control strains following irradiation.

</div>

## How we assessed radiation resistance

To evaluate how our microorganisms respond to radiation, we used different assays to measure their ability to survive, recover, grow, and maintain metabolic activity after exposure. Each method provides different information about the effects of radiation.

<div class="table-wrap">

| Readout                   | What it actually measures                                | How we interpret the results                                                                                                                         |
| ------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Serial-dilution spot assay | Ability to proliferate and produce visible colonies after exposure | Shows how radiation affects cell survival and allows us to compare the relative resistance of different strains.                                    |
| OD₆₀₀ time course         | Culture turbidity / net density change during recovery   | Helps us determine whether cultures continue growing, maintain their density, or show a reduction in density after exposure.                         |
| Resazurin reduction       | Intracellular reducing/metabolic activity                | Indicates whether cells remain metabolically active after irradiation, but does not directly measure their ability to reproduce.                     |
| FUN-1 staining            | Yeast fluorescence and vacuolar/metabolic state          | Provides additional information about yeast cell condition after radiation exposure, although the experimental results are not fully reported.       |

</div>

## Our microbial chassis and radiation conditions

We worked with three microbial chassis: _Bacillus subtilis_, _Pichia pastoris_, and _Saccharomyces cerevisiae_. We compared unmodified strains with strains engineered to express Dsup, a tardigrade-derived protein associated with protection against DNA damage. Depending on the organism, we used UV-C and X-ray irradiation to evaluate cellular responses under controlled conditions.

<div class="table-wrap">

| Microorganism       | Culture condition                           | Experiment setup                                                                                                                                       |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _B. subtilis_       | LB medium, 37 °C, approximately 185–250 rpm  | Wild-type and Dsup-expressing strains; evaluated using UV-C and X-ray irradiation                                                                      |
| _P. pastoris_       | YPD medium, 30 °C, approximately 200 rpm     | WT Dsup, modified Dsup, and control strains; compared using UV-C irradiation.                                                                          |
| _S. cerevisiae_     | YPD medium, 30 °C, approximately 200 rpm     | Dsup constructs generated; X-ray resistance investigated in preliminary experiments, without a conclusive comparison between wild-type and Dsup-expressing strains. |

</div>

## Experiments/Methods

<details class="details">
<summary class="details-summary">Organism-specific parameters</summary>

<div class="details-body">

Before working with this protocol take into consideration the next depending on the microorganism you are using. Note that the target exponential-phase OD₆₀₀ changes depending on the microorganism you are growing.

<div class="table-wrap">

| Parameter                                           | _Bacillus subtilis_     | _Saccharomyces cerevisiae_ | _Pichia pastoris_        |
| --------------------------------------------------- | ----------------------- | -------------------------- | ------------------------ |
| Type                                                | Gram-positive bacterium | Budding yeast              | Methylotrophic yeast     |
| Growth medium                                       | LB broth                | YPD broth                  | YPD broth (or BMGY)      |
| Incubation temperature                              | 37 °C                   | 30 °C                      | 30 °C                    |
| Shaking                                             | 250 rpm                 | 200 rpm                    | 200 rpm                  |
| Solid medium (plating)                              | LB agar                 | YPD agar                   | YPD agar                 |
| Starter (overnight) time                            | 12–16 h                 | 24–36 h                    | 24–36 h                  |
| Approx. generation time                             | ~30 min                 | ~90 min                    | ~120 min                 |
| Target exponential (mid-log) OD₆₀₀                  | **0.4–0.6**           | **0.4–0.6**              | **0.6–1.0**            |
| Late-log / harvest OD₆₀₀ (dye assays)               | 0.8–1.0               | 0.8–1.0                  | 0.8–1.0                |
| Working density for resazurin                       | OD₆₀₀ ≈ 0.2             | OD₆₀₀ ≈ 0.2                | OD₆₀₀ ≈ 0.2              |
| Approx. inoculum per 25 mL (mid-log in ~2.5 h)      | ~50 µL                  | ~250 µL                    | ~400 µL                  |
| Colony incubation time                              | 24–48 h                 | 24–48 h                    | 48–72 h                  |
| X-ray LD₅₀ (literature, vegetative)                 | ~200–400 Gy             | ~50–80 Gy                  | ~50–100 Gy (est.)        |
| Suggested X-ray dose range                          | 0–2,000 Gy             | 0–2,000 Gy                | 0–2,000 Gy              |
| Relative UV-C sensitivity                           | Most resistant          | Intermediate               | Least resistant          |

</div>

<div class="caption">

**Table 1.** Culture and radiation parameters for each organism. These values define every downstream step; adjust only this table when switching organisms.

</div>

</div>

</details>

<details class="details">
<summary class="details-summary">X-ray and UV irradiation tests</summary>

<div class="details-body">

#### Stage 1 — Culture preparation

**Starter (overnight) culture**

1. Inoculate a single colony (or a scrape of glycerol stock) into 3–5 mL of the organism’s medium.
2. Cap loosely for gas exchange. For _B. subtilis_, use a flask at least 5× the liquid volume, as it is strictly aerobic and needs vigorous aeration.
3. Incubate at the organism’s temperature and shaking speed for the starter time in Table 1 (12–16 h for _B. subtilis_; 24–36 h for the yeasts).

**Subculture to exponential (log) phase**

The assay requires actively dividing cells, not a saturated overnight. Dilute the overnight into fresh, pre-warmed medium by one of two equivalent routes:

- By ratio: a 1:10 dilution (1 mL overnight + 9 mL medium) is a reliable default for the yeasts.
- By calculated inoculum: to reach mid-log in ~2.5 h in 25 mL, use the inoculum in Table 1 (~50 µL _B. subtilis_, ~250 µL _S. cerevisiae_, ~400 µL _P. pastoris_).

1. Incubate under standard conditions. Measure OD₆₀₀ every 1 h (every 2–3 h from the 6 h mark for slow growers).
2. Harvest when the OD₆₀₀ enters the organism’s target window (Table 1): 0.4–0.6 for _B. subtilis_ and _S. cerevisiae_; 0.6–1.0 for _P. pastoris_. For dye assays needing late-log cells, continue to OD 0.8–1.0.
3. If several strains of one organism are compared, wait until all reach the window before harvesting, so every strain is irradiated at an equivalent physiological state.

**Standardizing cell number before treatment**

1. Record the final OD₆₀₀ of each culture in the tube immediately before use.
2. Normalize all strains to the same OD₆₀₀ by diluting the denser ones with fresh medium (use the lowest common OD as the reference).
3. Where a concentrated suspension is needed, harvest by centrifugation (4,000 × g, ~15 min, RT; yeasts tolerate 1,500 × g, 5 min) and resuspend the pellet in a smaller volume of fresh medium.
4. Confirm the normalized OD₆₀₀ once more before distributing to treatment tubes or plates.

#### Stage 2 — Radiation treatment

Run a graded dose series plus an unirradiated mock control handled identically (same tubes, same time out of the incubator) but not exposed. X-ray and UV-C treatments can run in parallel on the same batch of cells.

**X-ray irradiation**

**Instrument:** Xstrahl RS320 (or an equivalent cabinet irradiator). Fix the rack geometry and sample position for every run, and verify the delivered dose with a dosimeter at the sample position before quoting absolute doses.

1. Distribute the normalized exponential-phase suspension into 2 mL screw-cap tubes, 1.2 mL per tube, leaving ~0.8 mL of headspace for gas exchange during long exposures. Use one tube per dose per strain, plus the mock.
2. Load the tubes into the support rack at the calibrated position.
3. Deliver the dose series, deriving each run time from the current calibration (dose = dose rate × time).
4. Use the dose series in Table 2. The machine cannot run for more than 70 min continuously; pause for 15 min between runs, so longer doses are split into batches.

<div class="table-wrap">

| Dose (Gy) | Time (min) | Batched time (min) |
| --------- | ---------- | ------------------ |
| 0         | 0          |                    |
| 500       | 35.75      |                    |
| 1000      | 71.5       |                    |
| 1500      | 107.25     | 71.5 + 35.75       |
| 2000      | 143        | 71.5 + 71.5        |

</div>

<div class="caption">

**Table 2.** _X-ray dose series and the corresponding exposure times, with a batched schedule for doses that exceed the 70-minute limit._

</div>

5. Proceed to the viability assays below.

**Operating the Xstrahl irradiator**

1. Turn the key to "Power".
2. Enter your credentials and log in.
3. Preheat the machine; choose the long warm-up (600 s).
4. Turn the key to the ray icon.
5. Switch on the X-ray by pressing the green "X-ray On" button.
6. When warm-up finishes, turn the key off.
7. Position your sample at the chosen distance from the source, using the machine’s lasers to center the samples.
8. Set the dose and source-to-surface distance (SSD) using the calibration values in Table 3.

<div class="table-wrap">

| SSD (mm) | Dose rate (Gy/min) |
| -------- | ------------------ |
| 13       | 5.59               |
| 18       | 3.01               |
| 23       | 1.89               |
| 28       | 1.29               |
| 33       | 0.95               |
| 38       | 0.71               |

</div>

<div class="caption">

**Table 3.** _Dose-rate calibration as a function of source-to-surface distance (SSD) for the Xstrahl irradiator._

</div>

9. Turn the key to the ray icon and press the green button.

   **Note:** _Record the last value reported by the machine._

10. In the dosimeter menu, enter the dose rate under "Measured dose" (e.g. 5.59) and the last machine value under "Integral Dose" (e.g. 5.04). Turn the key to the "~" position, press Calculate, then Reset; turn the key back to the ray icon and press the green button again.
11. Return to the X-ray menu and repeat until the value matches the dose rate, or is up to 0.1 Gy higher (e.g. between 5.59 and 5.69).
12. Repeat for every tray position.
13. Once calibrated, place the tray in the third position (SSD = 23 mm).
14. Turn off the timer (in the X-ray menu).
15. Turn on the dose setting and enter the desired dose.
16. Place the cells in the middle of the tray, one at a time.
17. Close the door, turn the key to the ray icon, press the green button and wait (higher doses require longer exposures).
18. Turn the power to "N" each time you open the door, then repeat.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/image1.avif" alt="Touchscreen control panel of the Xstrahl X-ray irradiator showing kV, mA, minutes and seconds fields, door open and close buttons, and the key switch, X-ray on/off, door stop, reset and emergency stop buttons below" loading="lazy"></div><figcaption class="caption"><strong>Figure 2.</strong> Control panel of the Xstrahl X-ray irradiator, showing the dose, exposure-time and door controls referenced in the operating procedure.</figcaption></figure>
</div>

**UV-C irradiation**

**Instrument:** UV-C crosslinker (254 nm). Verify the delivered dose with a radiometer at each platform position; an apparent dip at the highest nominal settings usually reflects uneven delivery rather than biology. Dose can be expressed in mJ/cm² or J/m² (1 mJ/cm² = 10 J/m²). Two formats are used.

_(a) Liquid-suspension format - for resazurin / FUN-1 readouts_

1. Normalize the cultures to equal density and pellet (6,000 rpm, 3 min); resuspend each in 2 mL of PBS (or keep in medium).
2. Transfer the full 2 mL suspension to a sterile Petri dish (same dish type and volume for every sample, to keep the path length constant).
3. Expose to the target UV-C dose with the lid off.
4. Immediately recover the suspension into a sterile tube. For DNA-damage endpoints, proceed with no recovery; for viability, allow the defined recovery/read window.

_(b) Agar spot-plate format - for CFU / spot-dilution readout_

1. From an OD₆₀₀ ≈ 1 suspension, prepare a 1:10 serial dilution series.
2. Spot 4 µL of each dilution onto an agar plate, one plate per dose.
3. Dry the spots completely, then irradiate each plate at its dose; leave the 0-dose plate under normal light.
4. Incubate overnight at the organism’s temperature.

<div class="table-wrap">

| Nominal dose (mJ/cm²) | Equivalent (J/m²) |
| --------------------- | ----------------- |
| 0 (mock)              | 0                 |
| 6                     | 60                |
| 12                    | 120               |
| 18                    | 180               |
| 24                    | 240               |
| 30                    | 300               |

</div>

<div class="caption">

**Table 4.** _UV-C dose series, given as nominal fluence and its equivalent in J/m²._

</div>

<div class="callout">

<p class="callout-label">Note</p>

Ensure you have enough cells for both the viability assays and sample collection. A convenient per-tube allocation (1.2 mL at OD ≈ 0.8): 20 µL for plating, 100 µL (×3 wells) for FUN-1 or resazurin, and optionally 500 µL each frozen at −80 °C for RNA and protein.

</div>

</div>

</details>

<details class="details">
<summary class="details-summary">Neutral bacterial comet assay</summary>

<div class="details-body">

#### Part 1: Cell preparation and treatment

1. Grow bacterial cultures to a similar growth stage and normalize all samples to the same OD₆₀₀.
2. Pellet the cells at 6,000 rpm for 3 min.
3. Discard the supernatant and resuspend the pellet in 1 ml PBS.
4. Expose the samples to the required UV-C doses, including an untreated control.
5. Immediately transfer the cell suspension after irradiation and proceed directly with the comet assay.

#### Part 2: Cell embedding

Prepare 0.7% low-melting-point agarose containing:

- Lysozyme: 0.5 mg/ml
- RNase A: 5 µg/ml

1. Keep the agarose mixture molten at approximately 37 °C.
2. Mix 10 µL bacterial suspension with 500 µL agarose mixture.
3. Add 50 µL of the cell-containing agarose onto slides previously coated with 1% agarose.
4. Place a coverslip over the agarose and solidify at 4 °C for 10 min.

#### Part 3: Cell wall digestion and top agarose layer

1. Incubate the slides at 37 °C for 30 min with the coverslip in place.
2. Carefully remove the coverslip.
3. Add 150 µL of 0.7% LMP agarose as the top protective layer.
4. Solidify at 4 °C for 10 min.

#### Part 4: Cell lysis

Use lysis buffer containing:

- 2.5 M NaCl
- 100 mM EDTA
- 10 mM Tris base
- 0.01% SDS
- 1% Triton X-100

1. Keep the slides horizontal and fully immersed in cold lysis buffer.
2. Incubate for 1 h at 4 °C.

#### Part 5: Neutralization

1. Wash the slides with 400 mM Tris, pH 7.5.
2. Perform 3 washes of 5 min each using fresh buffer.

#### Part 6: Electrophoresis

Use electrophoresis buffer containing:

- 300 mM sodium acetate
- 100 mM Tris-HCl
- pH 9.0

1. Place the slides horizontally in the electrophoresis tank.
2. Pre-incubate in cold electrophoresis buffer for 20 min at 4 °C.
3. Run electrophoresis at 12 V for 50 min at 4 °C.

#### Part 7: Post-electrophoresis wash and dehydration

1. Wash the slides once with 400 mM Tris, pH 7.5.
2. Dehydrate in 100% ethanol for 30 min.
3. Transfer to 70% ethanol for 30 min.
4. Air-dry the slides completely.

#### Part 8: SYBR Green staining and imaging

1. Prepare SYBR Green I at 1:10,000 dilution in TE buffer.
2. Stain the slides for 20 min at room temperature in the dark.
3. Wash twice with ddH₂O for 10 min each.
4. Image using a fluorescence microscope with a GFP/FITC-compatible filter.
5. Keep exposure, gain and magnification constant between samples.
6. Compare DNA fragmentation using comet/tail length or overall DNA dispersion.

</div>

</details>

<details class="details">
<summary class="details-summary">FUN-1 ratiometric live/dead assay</summary>

<div class="details-body">

Metabolically active cells convert diffuse green cytosolic FUN-1 into red-orange cylindrical intravacuolar structures (CIVS); dead cells remain diffuse green. Viability is the red/(red + green) ratio. This assay is best suited to yeasts.

1. Use the glucose/HEPES staining buffer, not PBS - phosphate reduces staining efficiency.
2. Take 100 µL of irradiated cells per sample; pellet (10,000 × g, 5 min) and discard the supernatant.
3. Resuspend each pellet in 650 µL of FUN-1 master mix (10 µM FUN-1 in staining buffer). Mix by gentle pipetting - do not vortex. Target ~10⁶-10⁷ cells/mL.
4. Aliquot 200 µL into three wells per sample in a black, clear-bottom 96-well plate.
5. Incubate for 30 min at 30 °C in the dark with gentle agitation, inverting the tubes gently every 5–10 min to keep cells in suspension.
6. Read fluorescence from the bottom, dual-wavelength. Dead (green): excitation 485 nm / emission 530 nm. Live (red): excitation 485 nm / emission 620 nm. Read height 80–85% of well depth; gain/PMT 60–70%; ≥10 flashes per well; 30 °C. Read every 10 min for 1 h if kinetic.
7. Analysis: subtract the dye-plus-inhibitor control wells; per well, the red/green ratio = Red RFU / Green RFU; % viability = Red / (Red + Green) × 100. Average the triplicates and plot % viability against dose.

</div>

</details>

<details class="details">
<summary class="details-summary">Resazurin metabolic-reduction assay (kinetic)</summary>

<div class="details-body">

Viable, metabolically active cells reduce blue resazurin to pink resorufin; the rate and extent track viability. Over-reduction continues to a colorless product, so very dense or active cultures saturate quickly - keep the density low enough to resolve the kinetics.

1. Dilute the cells to the working density OD₆₀₀ ≈ 0.2. This is chosen so that reduction is slow enough for treated and untreated samples to separate within the read window; higher densities turn pink within seconds and mask the dose effect.
2. Add 100 µL of each suspension to a 96-well plate in triplicate.
3. Include controls: a no-cell blank (100 µL medium) and a medium-plus-resazurin blank (100 µL medium + 20 µL working resazurin), in triplicate. The final resazurin concentration is 0.015% w/v. Pipette gently to avoid bubbles and start the clock (t = 0).
4. Read kinetically at the organism’s temperature. Fluorescence: excitation 545 nm / emission 590 nm, gain ~65–70%. Absorbance: 570 nm and 600 nm (dual-wavelength allows the % dye reduction to be computed). Our experiments used absorbance mode in treated, translucent 96-well culture plates.
5. Read every 15 min. A full plateau run takes up to 6 h (24 cycles); for a treated-versus-control comparison, a 1 h window is usually sufficient and more practical.
6. Analysis: subtract the blank; compute the % reduction from the 570/600 nm absorbances; compare the initial slope (first 15–20 min) rather than the endpoint if any well approaches saturation.

</div>

</details>

<details class="details">
<summary class="details-summary">CFU / spot-dilution plating (clonogenic)</summary>

<div class="details-body">

This is the reference measure of survival: the ability to divide and form colonies.

1. From each treated sample, prepare a consistent 10-fold dilution series (undiluted, 10⁻¹, 10⁻², 10⁻³, 10⁻⁴) in fresh medium. Apply the same dilutions to every sample and dose, not only the mock.
2. Either spread 100 µL on agar, or spot small volumes (4–10 µL) of each dilution in a row.
3. Incubate at the organism’s temperature for its colony time (Table 1): 24–48 h for _B. subtilis_ and _S. cerevisiae_, or 48–72 h for _P. pastoris_.
4. Analysis: count plates with 30–300 colonies; CFU/mL = colonies × dilution factor ÷ plated volume. Survival fraction = CFU(irradiated) / CFU(mock). For spot assays, score the number of dilutions still showing growth (each spot = one 10-fold step).

</div>

</details>

## Results

<details class="details">
<summary class="details-summary">Wild type strains measurements and optimizations</summary>

<div class="details-body">

Overall, we initially focused on optimizing X-ray and UV irradiation protocols for wild-type, unmodified _S. cerevisiae_, _P. pastoris_, and _B. subtilis_ cells. We performed an extensive set of preliminary experiments to systematically determine the most suitable irradiation doses, initial cell seeding densities, optical densities at the time of irradiation, etc. Multiple radiation doses and exposure conditions were evaluated to identify optimal experimental ranges that would produce measurable, dose-dependent effects without completely compromising cell viability. Each optimization stage involved repeated measurements and experimental replicates. The details can be found in the <a href="/kaust-ksa/notebook">Lab Notebook</a> page.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-1.avif" alt="Photographs of agar plates in three rows, Bacillus subtilis, Pichia pastoris and Saccharomyces cerevisiae, each shown at UV-C doses of 0, 6, 12, 18, 24 and 30 mJ/cm² from left to right" loading="lazy"></div><figcaption class="caption"><strong>Figure 3.</strong> UV-C dose series in unmodified <i>B. subtilis</i>, <i>P. pastoris</i> and <i>S. cerevisiae</i>. Ten-fold serial dilutions of three independent cultures per organism were spotted onto agar, dried completely and irradiated at 0, 6, 12, 18, 24 and 30 mJ/cm², equivalent to 0 to 300 J/m². Plates were incubated overnight at the organism’s growth temperature. Photograph taken by the team.</figcaption></figure>
</div>

Dose-dependent inhibition was observed in all three organisms, and this series defined the UV-C working range used in the subsequent comparisons between wild-type and Dsup-expressing strains.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-2.avif" alt="Two Petri dishes of Saccharomyces cerevisiae spotted on YPD agar, the first labeled Mock, 200 Gy and 400 Gy and the second 1000 Gy, 800 Gy and 600 Gy" loading="lazy"></div><figcaption class="caption"><strong>Figure 4.</strong> X-ray dose series in unmodified <i>S. cerevisiae</i>. Serial dilutions were spotted onto YPD agar after irradiation at 0 (mock), 200, 400, 600, 800 and 1000 Gy and incubated until colonies were visible.</figcaption></figure>
</div>

Growth remained essentially unchanged up to 400 Gy. From 600 Gy the concentrated spots begin to lose definition, and at 1000 Gy they resolve into discrete colonies rather than confluent growth, the first clear indication of reduced survival.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-3.avif" alt="Two columns of spot dilution strips of Pichia pastoris, one strip per X-ray dose; the left column covers Mock to 800 Gy and 1600 to 2000 Gy, the right column covers Mock to 2000 Gy in 200 Gy steps" loading="lazy"></div><figcaption class="caption"><strong>Figure 5.</strong> X-ray dose series in unmodified <i>P. pastoris</i>. (A) Initial run (left), which did not include 1000 to 1400 Gy. (B) Repetition covering the complete dose range (right), performed to define the transition. Serial dilutions were spotted onto YPD agar after irradiation from 0 (mock) to 2000 Gy and incubated until colonies were visible.</figcaption></figure>
</div>

Both runs show the same behavior: confluent growth at mock and 200 Gy, a progressive shift from confluent to granular and then to discrete colonies between 400 and 800 Gy, and the sharpest change around 1200 Gy. From 1400 Gy the decline continues, and by 1800 to 2000 Gy only sparse growth remains at the lowest dilution, although survivors are still detectable at the highest dose.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-4.avif" alt="Spot dilution strips of Bacillus subtilis, one strip per X-ray dose from Mock to 2000 Gy in 200 Gy steps" loading="lazy"></div><figcaption class="caption"><strong>Figure 6.</strong> X-ray dose series in unmodified <i>B. subtilis</i>. Serial dilutions were spotted onto agar after irradiation from 0 (mock) to 2000 Gy in 200 Gy steps and incubated until colonies were visible.</figcaption></figure>
</div>

Growth is retained across the full dilution series up to 600 Gy. Between 800 and 1200 Gy the spots progressively break up and the more dilute ones drop out, marking a steady dose-dependent loss of viability. Beyond that the decline is sharp: three spots remain at 1400 and 1600 Gy, a single spot at 1800 Gy, and no growth at any dilution at 2000 Gy. Each spot corresponds to a ten-fold dilution, so the loss of one spot is approximately a one log reduction in viable cells. Complete inactivation at 2000 Gy made _B. subtilis_ the most sensitive of the three chassis under these conditions.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-5.avif" alt="Photograph of a 96-well plate with resazurin added to Bacillus subtilis cultures in columns 1 to 3, cells without dye in columns 4 to 6, and a no-cell blank in row B; the wells shift from blue-purple at OD600 0.2 to pink at higher densities" loading="lazy"></div><figcaption class="caption"><strong>Figure 7.</strong> Optimization of the working cell density for the resazurin assay in <i>B. subtilis</i>. Cultures were adjusted to OD₆₀₀ of 0.2, 0.4, 0.6, 0.8 and 1.0 and incubated with resazurin (columns 1 to 3), alongside cells without dye (columns 4 to 6) and a no-cell blank of medium plus resazurin (row B). Photograph taken by the team.</figcaption></figure>
</div>

At OD₆₀₀ 0.2 only part of the dye is reduced and the wells remain blue to purple. From 0.4 the color shifts to pink and is already saturated at 0.6, with no visible difference between 0.6, 0.8 and 1.0 after the same incubation. Densities of 0.6 and above reduce all the available dye within the incubation window, leaving no range in which treated and untreated samples can separate. OD₆₀₀ 0.2 was therefore selected as the working density for the irradiation experiments.

</div>

</details>

<details class="details">
<summary class="details-summary">Genomic integration of Dsup</summary>

<div class="details-body">

We were then able to successfully integrate Dsup-related constructs into specific safe harbor sites for our three chassis. Subsequently, we were working with the following constructs for our downstream experiments, including western blotting to confirm expression of Dsup in each chassis:

<div class="table-wrap">

| Plasmid ID | Insert                         |
| ---------- | ------------------------------ |
| IPD1       | Dsup (_P. pastoris_)           |
| IPD2       | 2x SV40 NLS Dsup (_P. pastoris_) |
| IPD3       | Myc-tagged Dsup (_P. pastoris_) |
| ISD1       | Dsup (_S. cerevisiae_)         |
| ISD2       | 2x SV40 NLS Dsup (_S. cerevisiae_) |
| ISD3       | Myc-tagged Dsup (_S. cerevisiae_) |
| IBD1       | Myc-tagged Dsup (_B. subtilis_) |

</div>

</div>

</details>

<details class="details">
<summary class="details-summary">Radiation resistance evaluation of Dsup</summary>

<div class="details-body">

After obtaining the engineered strains, using the framework we developed with unmodified strains, we performed the same irradiation tests to evaluate the comparison of radiation resistance performance in Dsup vs Wt samples.

<div class="figure-grid single wide">
<figure>
<div class="photo-frame" style="margin-bottom: 12px;"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-6-1.avif" alt="Two line charts of OD600 normalized to T=0 over 60 minutes after X-ray doses of 0, 500, 1000, 1500 and 2000 Gy: panel A wild type, panel B Dsup" loading="lazy"></div>
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-6.avif" alt="Two line charts against X-ray dose in Gy comparing wild type and Dsup: panel C percentage dye reduction, panel D percentage cell viability, both one hour after adding dye" loading="lazy"></div>
<figcaption class="caption"><strong>Figure 8.</strong> Metabolic activity and growth of wild-type and Dsup-expressing <i>B. subtilis</i> after X-ray irradiation. (A, B) OD₆₀₀ over the hour after irradiation, normalized to the first reading, for wild type (A) and Dsup (B). (C) Percentage of resazurin reduced one hour after adding the dye, at 0, 500, 1000, 1500 and 2000 Gy. (D) The same data as viability relative to the unirradiated control of each strain.</figcaption>
</figure>
</div>

Both readouts point the same way. Dye reduction drops with dose in both strains, and from 1000 Gy the two separate, with Dsup keeping 85 to 89% reduction against 71 to 75% in wild type, which works out as 87 to 91% viability against 76 to 80%. The growth curves show the same split. The unirradiated controls grow over the hour, 2.3-fold in wild type and 2.7-fold in Dsup, and every irradiated culture is strongly held back, but they do not end up in the same place. From 1000 Gy the wild-type cultures finish below the density they started at, between 0.70 and 0.87 of it, while the Dsup cultures finish at or slightly above theirs, between 1.01 and 1.35. A culture that ends below where it started has not simply stopped dividing, it has lost material. The plate reader shakes continuously and stops only to take each reading, so the cells are not settling to the bottom of the well, and the most likely explanation is that part of the irradiated wild-type population broke open during the hour. On that reading the difference between the strains is not only in how much they grow but in how many cells stay intact.

<div class="figure-grid single wide">
<figure>
<div class="photo-frame" style="margin-bottom: 12px;"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-7-1.avif" alt="Two line charts of OD600 normalized to T=0 over 60 minutes after UV-C doses of 0, 60, 120, 180, 240 and 300 J/m²: panel A wild type, panel B Dsup" loading="lazy"></div>
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-7.avif" alt="Two line charts against UV radiation dose comparing wild type and Dsup: panel C percentage dye reduction, panel D percentage cell viability, both one hour after adding dye" loading="lazy"></div>
<figcaption class="caption"><strong>Figure 9.</strong> Response of wild-type and Dsup-expressing <i>B. subtilis</i> to UV-C at 0 to 300 J/m². (A, B) OD₆₀₀ over the hour after irradiation, normalized to the first reading, for wild type (A) and Dsup (B). (C) Resazurin reduction and (D) viability relative to each strain’s unirradiated control, one hour after adding the dye.</figcaption>
</figure>
</div>

Dsup stays above wild type at every dose, and the growth curves separate most clearly at 60 J/m², where Dsup reaches 2.02 times its starting density against 1.55 for wild type. Reduction above 100% in the two lowest wild-type doses and across the whole Dsup series shows that the dye had passed the linear range of the assay before the one hour read. We can therefore rank the strains at each dose but not quantify the difference between them. The Dsup curve in particular sits against the ceiling of the assay and no longer responds to dose. We corrected this in the following replicate by adjusting the number of cells added to each well, which slowed the reaction enough for it to stay within the linear range across the reading window.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-8.avif" alt="Line chart of percentage viability against time in seconds for wild-type S. cerevisiae and the ISD1, ISD2 and ISD3 Dsup strains, each with FUN-1 staining" loading="lazy"></div><figcaption class="caption"><strong>Figure 10.</strong> FUN-1 staining of wild-type <i>S. cerevisiae</i> and three Dsup constructs: ISD1 (Dsup), ISD2 (Dsup carrying a tandem SV40 nuclear localization signal) and ISD3 (Myc-tagged Dsup). Viability is the red to total fluorescence ratio, followed over 80 minutes.</figcaption></figure>
</div>

The ratio sits between 27 and 41% for every strain. All four fall over the first 20 to 30 minutes and then flatten or drift back up, and they separate into two groups, with ISD2 and ISD3 between 33 and 41% and wild type and ISD1 between 27 and 31%. None of this can be interpreted, because FUN-1 reports metabolically active cells as red intravacuolar structures and the ratio should therefore rise as the staining develops rather than fall, and a culture in exponential growth should not read as roughly 70% dead. Part of the problem was the plate: the first run was done in a clear plate, which is not suitable for fluorescence. We repeated it in a black plate with a translucent bottom and the curves did not improve, which points instead to the reader settings, most likely the excitation and emission pairs the assay needs, 485/530 nm for the green signal from dead cells and 485/620 nm for the red from live ones. FUN-1 is a good readout for yeasts and we think the reader settings are solvable with a bit more time at the instrument. However, for this project the resazurin assay was already giving us a clean dose response, so we decided using that one.

<div class="figure-grid single wide">
<figure>
<div class="figure-grid" style="--cols: 2;">
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-9-a.avif" alt="Line chart of OD600 normalized to T=0 over 60 minutes for wild-type B. subtilis at UV-C doses of 0 to 300 J/m², second replicate; the curves swing widely" loading="lazy"></div>
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-9-b.avif" alt="Line chart of OD600 normalized to T=0 over 60 minutes for Dsup B. subtilis at UV-C doses of 0 to 300 J/m², second replicate; the curves are ordered by dose" loading="lazy"></div>
</div>
<div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-9-c.avif" alt="Spot dilution plates of B. subtilis wild type (top) and Dsup (bottom), three technical replicates each, at 0, 60, 120, 180, 240 and 300 J/m², with the fraction of dilutions showing growth marked beside every row" loading="lazy"></div>
<figcaption class="caption"><strong>Figure 11.</strong> Second biological replicate of the UV-C comparison between wild-type and Dsup-expressing <i>B. subtilis</i>. (A, B) OD₆₀₀ over the hour after irradiation, normalized to the first reading, for wild type (A) and Dsup (B) at 0 to 300 J/m². (C) Spot dilution assay for both strains, three technical replicates each, with the fraction of dilutions showing growth marked on every row.</figcaption>
</figure>
</div>

The Dsup curves are ordered by dose, with the unirradiated control reaching 2.94 times its starting density and every irradiated condition between 1.07 and 1.62. The wild-type curves are not interpretable in this replicate, since those wells sat within 0.004 of the blank at 600 nm and the readings swing widely as a result. Matching the number of active cells between strains when setting up the plate is the part of the resazurin protocol that still needs work.

The spot assay is independent of that, because the plates are diluted separately from the same stock, and it gives the clearest comparison here. Both strains keep the full dilution series through 60 J/m². At 120 J/m² Dsup still grows through all six dilutions in the three replicates, with large and well defined spots along most of the row, while wild type has dropped to four or five and its spots have broken into smaller, scattered colonies. From 180 J/m² the two converge at around three dilutions and the scatter between replicates widens.

Dsup is therefore the strain that holds up better over this range. At 120 J/m² it keeps its plating efficiency intact while wild type loses one to two orders of magnitude of viable cells. The advantage does not extend across the whole series, since from 180 J/m² the two are indistinguishable, so the difference shows up most clearly in the middle of the range, where the assay still has resolution.

</div>

</details>

<details class="details">
<summary class="details-summary">Improved nuclear localization Dsup</summary>

<div class="details-body">

In addition, for _P. pastoris_, we were able to perform these measurements for the Improved Dsup, the construct that should have enhanced nuclear localization due to the presence of tandem SV40 nuclear localization signal sequence.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-10.avif" alt="Spot dilution plates of P. pastoris Dsup, the nanobody control strain and IPD2, three technical replicates each, at 0, 60, 120, 180, 240 and 300 J/m², with the fraction of dilutions showing growth marked beside every row" loading="lazy"></div><figcaption class="caption"><strong>Figure 12.</strong> UV-C dose response of <i>P. pastoris</i> expressing Dsup, the improved variant IPD2, and the nanobody-producing control strain. Spot dilution assay, three technical replicates per strain, with the fraction of dilutions showing growth marked on every row.</figcaption></figure>
</div>

The fractions separate the control from the two Dsup strains. In two of the three control replicates the strain reaches five or six dilutions without irradiation and declines steadily to three or four by 240 J/m², a loss of two to three orders of magnitude, while both Dsup strains hold all six dilutions over the same range. What the fractions do not separate is Dsup from IPD2, which sit at six out of six through almost the entire series, and there the informative difference is how well the colonies grow within each row. At the lowest doses the first four or five spots of every row are confluent, and that boundary moves toward the concentrated end as the dose rises. It moves fastest in the control, whose spots break into separate colonies by the third or fourth position from 120 J/m². Dsup holds its confluent region further along, and IPD2 further still: at 240 and 300 J/m² the IPD2 rows keep around three large confluent spots while Dsup is down to one or two and the control to one. Judged by how much growth survives rather than by how many dilutions give any growth at all, IPD2 performs best, Dsup second and the control last, and the two Dsup constructs only separate at the top of the range.

</div>

</details>

<details class="details">
<summary class="details-summary">Dsup effects on protein production</summary>

<div class="details-body">

Lastly, we evaluated the effects of having Dsup integrated into the genome of _B. subtilis_ on production of one of our payload proteins - antifreeze protein FfIBP:

We compared whether the expression of Dsup influenced recombinant FfIBP production by assessing protein expression levels in Dsup-expressing and unmodified _B. subtilis_ strains.

IPTG induction was followed by sample preparation and ÄKTA HisTrap affinity chromatography purification (see <a href="#handbooks">Protein Expression and ÄKTA Purification Handbook</a> below).

We determined that introducing radiation-protective machinery into our microbial chassis does not negatively affect its protein production capacity, helping us confirm the compatibility of enhanced radiation resistance with efficient biomanufacturing.

The figures below demonstrate the purification results of antifreeze protein FfIBP from unmodified _B. subtilis_ (Figures 13–14) and _B. subtilis_ engineered to contain Dsup integrated into its chromosome (Figures 15–16).

The UV absorbance signal at 280 nm (blue line) can be used to estimate protein concentrations in the eluent, as proteins absorb UV light at this wavelength primarily due to the presence of aromatic amino acids, particularly tryptophan and tyrosine. Therefore, higher absorbance values generally indicate higher protein concentrations, allowing us to monitor protein elution and identify protein-rich fractions during purification.

<div class="figure-grid" style="--cols: 1;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-11.avif" alt="HisTrap chromatogram of secreted FfIBP from wild-type B. subtilis over the full run, showing UV 280, conductivity and concentration B traces against volume in ml" loading="lazy"></div><figcaption class="caption"><strong>Figure 13.</strong> HisTrap Chromatography of secreted FfIBP from <i>B. subtilis</i> (full)</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-12.avif" alt="HisTrap chromatogram of secreted FfIBP from wild-type B. subtilis zoomed in on the elution, with peaks labeled 721.70 and 745.40" loading="lazy"></div><figcaption class="caption"><strong>Figure 14.</strong> HisTrap Chromatography of secreted FfIBP from <i>B. subtilis</i> (zoomed in)</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-13.avif" alt="HisTrap chromatogram of secreted FfIBP from B. subtilis recombineered with Dsup over the full run, showing UV 280, conductivity and concentration B traces against volume in ml" loading="lazy"></div><figcaption class="caption"><strong>Figure 15.</strong> HisTrap Chromatography of secreted FfIBP from <i>B. subtilis</i> recombineered with Dsup (full)</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/figure-14.avif" alt="HisTrap chromatogram of secreted FfIBP from B. subtilis recombineered with Dsup zoomed in on the elution, with peaks labeled 786.99 and 811.78" loading="lazy"></div><figcaption class="caption"><strong>Figure 16.</strong> HisTrap Chromatography of secreted FfIBP from <i>B. subtilis</i> recombineered with Dsup (zoomed in)</figcaption></figure>
</div>

</div>

</details>

The details of results can be found in the <a href="/kaust-ksa/results">Results</a> and <a href="/kaust-ksa/notebook">Lab Notebook</a> pages.

## Handbooks

To make our measurements methods, optimized protocols, and practical knowledge accessible to the broader synthetic biology community, we developed a series of comprehensive laboratory handbooks. Our goal was not only to document our own experimental work but also to enable future iGEM teams and researchers to reproduce our methods, build upon our findings, and avoid common experimental challenges. By openly sharing our protocols and optimization strategies, we aim to promote reproducibility, transparency, and knowledge exchange within the scientific community, ensuring that our contributions remain useful beyond the duration of our project.

We optimized experimental workflows for evaluating microbial resistance to UV and X-ray irradiation in _B. subtilis_, _S. cerevisiae_, and _P. pastoris_. Our protocols cover sample preparation, irradiation conditions, viability assays (resazurin, FUN-1 staining, and colony-forming unit assays), and comet assays. Throughout the project, we identified key challenges and practical considerations when performing radiation resistance experiments across these three chassis. To support future iGEM teams, we developed two complementary resources you can access above.

We compiled a practical handbook covering recombinant protein expression, secretion, and purification. Other iGEMers and scientists can use the handbook to facilitate their research related to any kind of protein purification in similar settings. We also provide guidance on preparing buffers for ÄKTA immobilized metal affinity chromatography (IMAC) and various other recommendations, such as notes on storing purified proteins.

<div class="figure-grid" style="--cols: 2; max-width: 640px; margin-inline: auto;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/image2.avif" alt="Cover of the Radiation resistance testing Handbook, with the SHIHAB logo on a white background with purple waves" loading="lazy"></div><figcaption class="caption"><strong>Figure 17.</strong> <a href="https://static.igem.wiki/teams/6341/wiki/content/measurement/handbooks-for-measurements/radiation-resistance-testing-handbook.pdf" target="_blank" rel="noopener noreferrer">Radiation resistance testing Handbook</a> (PDF).</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/measurement/image3.avif" alt="Cover of the Protein expression and ÄKTA purification Handbook, with the SHIHAB logo on a white background with purple waves" loading="lazy"></div><figcaption class="caption"><strong>Figure 18.</strong> <a href="https://static.igem.wiki/teams/6341/wiki/content/measurement/handbooks-for-measurements/practical-protein-expression-and-a-kta-purification-handbookk.pdf" target="_blank" rel="noopener noreferrer">Protein expression and ÄKTA purification Handbook</a> (PDF).</figcaption></figure>
</div>

## Limitations and future improvements

Although our experiments provided promising evidence of enhanced radiation resistance in Dsup-expressing _B. subtilis_ and _P. pastoris_, we recognize several limitations in our current measurement approaches. To further strengthen the reliability, reproducibility, and biological relevance of our findings, we have identified several directions for future improvement.

<div class="card-grid stack">

<div>

#### 1. Direct Quantification of Radiation-Induced DNA Damage

One of the major limitations of our current experimental framework is that our measurements primarily assess cellular growth, metabolic activity, and survival rather than DNA damage directly. Although spot assays, resazurin reduction assays, and OD₆₀₀ measurements provide valuable information about cellular responses to irradiation, they can’t independently establish whether Dsup protects genomic DNA from radiation-induced damage.

To address this limitation, we plan to implement the comet assay (single-cell gel electrophoresis), which enables the quantification of DNA damage at the individual cell level. We have already worked on adapting and optimizing the experimental protocol for our microbial chassis (can be found in the <a href="/kaust-ksa/experiments">Experiments Page</a>) and aim to perform these measurements in future experiments. Quantification of parameters such as tail length and percentage of DNA in the comet tail would allow us to compare DNA damage between wild-type, Dsup-expressing, and improved Dsup-expressing strains following irradiation.

</div>

<div>

#### 2. Increasing Biological Replicates and Statistical Robustness

Although our irradiation experiments were performed repeatedly, further independent biological replicates are necessary to strengthen the statistical reliability of our conclusions.

</div>

<div>

#### 3. Further Optimization and Standardization of Existing Measurement Protocols

While we successfully established working protocols for UV and X-ray irradiation experiments, several methodological improvements could further increase measurement precision and reproducibility. For example, we aim to standardize how cultures are adjusted to the working cell density, so that the resazurin absorbance measurements retain the range needed to distinguish irradiated from unirradiated cultures in every strain.

</div>

<div>

#### 4. Further Characterization of Dsup and Improved Dsup Variants

Although our experiments demonstrated promising improvements in radiation tolerance following Dsup expression, the molecular mechanisms underlying these observations require further investigation.

In particular, we aim to investigate the subcellular localization of Dsup and its improved variants in _P. pastoris_. Fluorescence microscopy and protein localization studies could help determine whether the introduced nuclear localization signals successfully enhance Dsup accumulation within the nucleus. Additionally, we plan to investigate the improved Dsup variant in _S. cerevisiae_ as well.

</div>

</div>

## References

<ol class="ref-list">

<li id="ref-1"><a href="https://www.nasa.gov/hrp/hazard-space-radiation/" target="_blank" rel="noopener noreferrer">NASA — Hazard: Space Radiation</a></li>
<li id="ref-2"><a href="https://www.nasa.gov/reference/about-the-space-radiation-element/" target="_blank" rel="noopener noreferrer">NASA — About the Space Radiation Element</a></li>
<li id="ref-3"><a href="https://www.nature.com/articles/ncomms12808" target="_blank" rel="noopener noreferrer">Nature Communications — article ncomms12808</a></li>
<li id="ref-4"><a href="https://elifesciences.org/articles/47682" target="_blank" rel="noopener noreferrer">eLife — article 47682</a></li>

</ol>
