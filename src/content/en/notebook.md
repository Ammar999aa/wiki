## Overview

> **iGEM Lab Notebook**

**Project Title:** Synthetic Hosts for In situ Healthcare and Autonomous Biomanufacturing (SHIHAB)

**Supervisor/PI:** Prof. Wayne Yang, Dr. Raik Grunberg

**Lab:** 2-3740

### Summary

#### Week 1

1)  LB and YPD agar and broth preparations, preparation of agar plates


## Experiment #1

**Date:** 20.05
**Title of Experiment:** Media preparation

### Methods

1.  LB broth: 500 ml MilliQ + 12.5 gram

2.  LB agar: 500 ml MilliQ + 18.5 gram

3.  YPD broth: 500 ml MilliQ + 25 gram

4.  YPD agar: 500 ml MilliQ + 25 gram + 10 gram agar

5.  Pored 12 LB agar and 14 YPD agar plates

### Summary

#### Week 2

1)  X ray irradiation

- S.cerevisiae, P. pastoris, B.subtilis

- Liquid culture → PBS → Animal core facilities lab

2)  UV irradiation

- S.cerevisiae, P. pastoris, B.subtilis

- Liquid culture → PBS → Prof Mo Li’s lab

3)  Live/Dead Assay - Yeasts

- S.cerevisiae, P. pastoris

- Liquid culture → FUN-1 dye → Fluorescent Microscopy

4)  Live/Dead Assay - Bacteria

- B.subtilis

- Liquid culture → resazurin dye → Plate reader/Fluorescent Microscopy


## Experiment #2

**Dates:** 2-4 June
**Title of Experiment:** X-ray irradiation

### Part 1: Cultures of the Cells

*Bacillus subtilis* was cultured in Lysogeny Broth (LB) at 37 °C with orbital shaking at 250 rpm. *Saccharomyces cerevisiae* and *Pichia pastoris* were cultured in Yeast Extract-Peptone-Dextrose (YPD) broth at 30 °C with orbital shaking at 200 rpm.

Overnight starter cultures were prepared by inoculating a single colony into 5 mL of the respective medium and incubating under the conditions described above for 12–16 hours (*B. subtilis*) or 24–36 hours (both yeasts).

The following morning, subcultures were prepared in 25 mL of fresh medium. The inoculation volume from each overnight culture was calculated individually for each organism based on its literature generation time, such that all cultures would reach mid-exponential phase simultaneously after 2.5 hours of incubation (Table 1). Growth was monitored by measuring optical density at 600 nm (OD600).

**Table 1.** Literature generation times, growth conditions, and inoculation parameters for each organism.

|  |  |  |  |  |  |
|:--:|----|----|----|----|----|
| **Organism** | **Medium** | **Temperature** | **Generation time** | **Target OD600 (mid-log)** | **Approx. inoculum (in 25 mL)** |
| **B. subtilis** | **LB broth** | **37 °C** | **~30 min** | **0.4 – 0.6** | **~50 µL** |
| **S. cerevisiae** | **YPD broth** | **30 °C** | **~90 min** | **0.4 – 0.6** | **~250 µL** |
| **P. pastoris** | **YPD broth** | **30 °C** | **~120 min** | **0.6 – 1.0** | **~400 µL** |

Generation times based on Harwood (1992) for *B. subtilis*; Sherman (2002) for *S. cerevisiae*; and Invitrogen/Thermo Fisher Scientific (2010) for *P. pastoris*.

### Part 2: Preparation of Samples

After 2.5 hours of incubation, the 25 mL cultures were harvested by centrifugation at 4,000 rpm for 15 minutes at room temperature. The supernatant was discarded and the cell pellet was resuspended in 5 mL of fresh medium, yielding a 5-fold concentrated cell suspension.

Five 1 mL aliquots of the concentrated suspension were distributed into individual 2 mL microcentrifuge tubes, obtaining five independent samples per organism. Each sample was designated to receive a different X-ray radiation dose (10, 20, 30, 40, or 50 Gy), as described in the following section.

### Part 3: X-ray Irradiation

Irradiation was performed using an Xstrahl RS320 X-ray irradiator. Microcentrifuge tubes were placed in a dedicated support rack at the distance specified in the instrument's standard protocol to ensure consistent dosimetry across samples.

As a single 10 Gy protocol (4-minute run) was the only pre-configured setting available at the time of the experiment, samples intended for higher nominal doses were exposed to multiple consecutive repetitions of this protocol: 1 cycle for 10 Gy, 2 cycles for 20 Gy, 3 cycles for 30 Gy, 4 cycles for 40 Gy, and 5 cycles for 50 Gy. After each 10 Gy cycle was completed, the corresponding tube was removed from the irradiator, so that each sample received only its designated number of cycles.

It should be noted that, according to information provided by the instrument operator, the relationship between irradiation time and absorbed dose in the RS320 is not linear. Therefore, repeating the 10 Gy protocol multiple times does not guarantee a proportional accumulation of dose, and the actual doses received by samples designated as 20, 30, 40, and 50 Gy cannot be confirmed. These values should be interpreted as nominal doses only. For future experiments, it will be necessary to contact the manufacturer to determine whether doses above 10 Gy can be reliably achieved with this instrument and, if so, which parameters must be adjusted to do so.

### Part 4: Post-irradiation Plating and Colony Counting

Following irradiation, each sample was plated onto solid medium to assess cell survival. Serial dilutions were performed as needed, and aliquots were spread onto LB agar plates (*B. subtilis*) or YPD agar plates (*S. cerevisiae* and *P. pastoris*). Plates were incubated at their respective growth temperatures (37 °C for *B. subtilis*; 30 °C for both yeasts) for 24–48 hours (*B. subtilis* and *S. cerevisiae*) or 48–72 hours (*P. pastoris*) until colonies were visible.

Colony-forming units (CFUs) were counted for each plate and normalized to the unirradiated control (0 Gy, no radiation cycles) to calculate relative survival at each nominal dose. The number of colonies observed in irradiated samples was compared to that of the control to determine the effect of ionizing radiation on cell viability for each organism.

**Results:** Across all three organisms, a mild but progressive decrease in colony counts was observed with increasing nominal dose (Figure 1–3). No complete sterilization was achieved at any dose tested, and all irradiated samples yielded clearly visible colonies.

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig1.avif" alt="Figure 1. B. subtilis colonies on LB agar after X-ray irradiation: mock, 10, 20, 30, 40 Gy (left to right)" style="width:25.7%" loading="lazy" />

**Figure 1.** B. subtilis colonies on LB agar. From left to right: mock diluted, 10 Gy undiluted, 20 Gy undiluted, 30 Gy undiluted, 40 Gy undiluted. A slight progressive reduction in colony density is visible at higher nominal doses.

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig2.avif" alt="Figure 2. P. pastoris colonies on YPD agar after X-ray irradiation: mock undiluted, mock 1:1000, 10, 20, 30, 40 Gy" style="width:20.2%" loading="lazy" />

**Figure 2.** P. pastoris colonies on YPD agar. From left to right: mock undiluted, mock 1:1000 dilution, 10 Gy, 20 Gy, 30 Gy, 40 Gy. The diluted mock control shows well-isolated colonies for reference counting. Colony density decreases modestly with increasing dose.

<div class="notebook-img-row"><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig3a.avif" alt="Figure 3A. S. cerevisiae colonies, mock undiluted" style="width:15.8%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig3b.avif" alt="Figure 3B. S. cerevisiae colonies, mock 1:1000 dilution" style="width:15.8%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig3c.avif" alt="Figure 3C. S. cerevisiae colonies, 10 Gy" style="width:15.8%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig3d.avif" alt="Figure 3D. S. cerevisiae colonies, 20 Gy" style="width:15.8%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig3e.avif" alt="Figure 3E. S. cerevisiae colonies, 30 Gy" style="width:16.1%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp02-fig3f.avif" alt="Figure 3F. S. cerevisiae colonies, 40 Gy" style="width:15.4%" loading="lazy" /></div>

**Figure 3.** *S. cerevisiae* colonies on YPD agar. From left to right: mock undiluted, mock 1:1000 dilution, 10 Gy, 20 Gy, 30 Gy, 40 Gy. Progressive but mild reduction in CFUs is observed with increasing nominal dose.

The observed mild reduction in colony-forming units across all three organisms at nominal doses of 10–40 Gy is consistent with the known radiation resistance profiles of these microorganisms reported in the literature. As shown in Table 3, the doses tested in this experiment fall substantially below the estimated LD<sup>50</sup> for all three organisms, which explains why only subtle effects on survival were detected.


**Table 2.** Literature-reported lethal dose estimates for the three organisms used in this study. LD50 = dose lethal to 50% of the population; LD100 = dose required for complete inactivation. Values correspond to vegetative cells unless otherwise noted.

<table>
<tbody>
<tr>
<td>Organism</td>
<td>LD50 (vegetative cells)</td>
<td>LD100 / complete inactivation</td>
<td>Cell form</td>
<td>Reference</td>
</tr>
<tr>
<td>B. subtilis</td>
<td>~200–400 Gy (X-ray)</td>
<td>&gt;1,000 Gy (vegetative); spore D10 = 1.5–3.8 kGy</td>
<td>Vegetative / spore</td>
<td>Thayer 2004; Dunn et al. 2018</td>
</tr>
<tr>
<td>S. cerevisiae</td>
<td>~50–80 Gy (X-ray)</td>
<td>&gt;400 Gy (repair-proficient strains)</td>
<td>Vegetative (diploid)</td>
<td>Kiefer 1986; Mi et al. 2018</td>
</tr>
<tr>
<td>P. pastoris</td>
<td>~50–100 Gy (estimated)</td>
<td>Not established; similar to S. cerevisiae</td>
<td>Vegetative</td>
<td>Estimated from Kiefer 1986; Gladyshev 2017</td>
</tr>
</tbody>
</table>


The most sensitive organism in this study is expected to be *S. cerevisiae*, for which X-ray doses of 40 Gy have been reported to reduce colony-forming ability by 50–90% depending on the repair capacity of the strain.<sup>1</sup> This is consistent with the slight reduction observed in *S. cerevisiae* plates at 40 Gy in the present experiment. *P. pastoris* is expected to show similar sensitivity given its shared eukaryotic DNA repair machinery and comparable genome ploidy.


In contrast, *B. subtilis* vegetative cells are considerably more resistant, with D<sup>10</sup> values (dose required to reduce the population by one log cycle) typically below 1 kGy.<sup>2</sup> The almost unchanged colony counts for *B. subtilis* across all doses tested are therefore expected: a maximum dose of 40 Gy represents less than 5% of the estimated LD<sup>50</sup> for this organism.

### Future Improvements

**Dosimetry.** The primary limitation is the inability to verify the doses actually delivered above 10 Gy. Contact with the Xstrahl manufacturer is required to determine whether the RS320 can be configured to deliver doses above 10 Gy in a single run, and which instrument parameters (tube voltage, current, filter, distance) must be adjusted.


**Dose range.** Based on the literature LD<sup>50</sup> values summarized in Table 2, future experiments should target a dose range of 50–500 Gy to capture meaningful survival curves for all three organisms.


**Quantitative CFU counting.** Serial dilutions should be performed consistently for all samples and doses, not only for the mock control, to obtain precise CFU/mL values that can be converted to survival fractions (SF = CFU<sub>irradiated</sub> / CFU<sub>mock</sub>).


**Biological replicates.** A minimum of three independent biological replicates per organism per dose is recommended to enable statistical analysis of survival differences.


## Experiment #3

**Dates:** #07/06/2026
**Title of Experiment:** UV irradiation

### Methods

1- Culture Preparation

B.subtilis, S.cerevisiae, and P.pastoris cultures were stored overnight in 4C, and were used for the UV irradiation experiment

2- UV-C Irradiation

Culture was diluted to an OD below 0.6 and allowed to grow in a shaking incubator at 30C with 220 Rpm shaking back to an OD within 0.6 to 1, then culture was diluted 10 times in fresh medium before transferring 300 ul to 3 agar plates for 3 different time point (0, 1, 2 min). Immediately after drying, the plates for time point 1 and 2 min were irradiated with 5 kj/cm2 for their respective time the control 0 min plate was left under normal light, finally, all plates were incubated at 30C overnight to allow colonies to grow.

### Results

<div class="notebook-img-row">A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig1a.avif" alt="Figure 1A. B. subtilis, UV mock" style="width:28.6%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig1b.avif" alt="Figure 1B. B. subtilis, UV dose 1 (1 min)" style="width:30.2%" loading="lazy" />C)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig1c.avif" alt="Figure 1C. B. subtilis, UV dose 2 (2 min)" style="width:29.0%" loading="lazy" /></div>

**Figure 1.** UVC irradiation results for B.subtilis A) Mock B) Dose 1 (1 min) C) Dose 2 (2 min)

<div class="notebook-img-row">A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig2a.avif" alt="Figure 2A. S. cerevisiae, UV mock" style="width:31.5%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig2b.avif" alt="Figure 2B. S. cerevisiae, UV dose 1 (1 min)" style="width:29.5%" loading="lazy" />C)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig2c.avif" alt="Figure 2C. S. cerevisiae, UV dose 2 (2 min)" style="width:28.9%" loading="lazy" /></div>

**Figure 2.** UVC irradiation results for S.cerevisiae A) Mock B) Dose 1 (1 min) C) Dose 2 (2 min)

<div class="notebook-img-row">A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig3a.avif" alt="Figure 3A. P. pastoris, UV mock" style="width:30.9%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig3b.avif" alt="Figure 3B. P. pastoris, UV dose 1 (1 min)" style="width:29.3%" loading="lazy" />C)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-fig3c.avif" alt="Figure 3C. P. pastoris, UV dose 2 (2 min)" style="width:29.1%" loading="lazy" /></div>

**Figure 3.** UVC irradiation results for P.pastoris A) Mock B) Dose 1 (1 min) C) Dose 2 (2 min)

### Future Improvements

- Try out lower doses to achieve LD50, instead of complete sterilization

**Dates:** #13/07/2026
**Title of Experiment:** UV irradiation Optimized protocol

### Methods

#### Culture Preparation

Culture media were prepared fresh using LB Agar or YPD broth + Agar powder, then were inoculated with ether glycerol stock for Basullius or primary plate for ceravesia and pichia and left to grow at 30 degrees with shaking at 220 rpm overnight. Cultures were prepared in three replicates for each microorganism.

#### UV-C Irradiation

Six agar plates were prepared for each of the six doses: 0, 6, 12, 18, 24, 30 mJ/cm∧-2. Each culture was diluted to an OD600 of 1 then serially diluted by a factor of 5 for 6 variable: 5X, 25X, 125X, 625X, 3,125X, 15,625. Then 4 µl of each dilution was added to an agar plate in order of dilution from highest to lowest so that each of the six plates would contain the serial dilution of each replicate culture. The aliquot was allowed to dry completely under an electric burner then irradiated for its corresponding dose and incubated overnight at 30C.

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-protocol1.avif" alt="Optimized UV-C protocol: dilution series plates, set 1" style="width:100.0%" loading="lazy" />

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp03-protocol2.avif" alt="Optimized UV-C protocol: dilution series plates, set 2" style="width:100.0%" loading="lazy" />



## Experiment #4

**Dates:** 05.06
**Title of Experiment:** FUN-1 staining

### Methods

Live cells: convert FUN-1 → red/orange cylindrical intravacuolar structures (CIVS)

Dead cells: remain diffuse yellow-green fluorescence

1.  Grow yeast to late log phase (usually 10^7-10^8 cells/mL) at 30 °C in YPD broth

2.  Add 50 µL of the yeast culture to 1 mL of sterile, 0.2 µm–filtered water containing 2% D-(+)-glucose and PBS in a microfuge tube

3.  Concentrate by centrifugation for 5 minutes in a microcentrifuge at 10,000 × g

4.  Remove the supernatant and resuspend the pellet in 1 mL of sterile, 0.2 µm–filtered water containing 2% D-(+)-glucose and PBS

5.  Combine a yeast cell suspension (10^6 cell/mL) with FUN 1 cell stain (Final concentration - 10 µM)

6.  Mix gently

7.  Incubate at 30°C in the dark for 30 minutes, preferably with shaking

8.  Trap 5 µL of the stained yeast suspension between a slide and 18 mm × 18 mm coverslip

9.  Observe in a fluorescence microscope

S.cerevisiae cell count - 1.61 * 10^6/mL (98% live)

P. pastoris cell count - 1.05 * 10^4/mL (33% live)

→ 1 ml each one

1 µL of 10 mM FUN-1 stock

999 µL of your staining buffer/media/PBS

### Notes

- Before using: Allow reagents to warm to room temperature and centrifuge briefly before opening the vials (about 3 min at 10,000 × g).

- Before refreezing, seal all vials tightly. When stored properly, these stock solutions are stable for at least one year.

- For plate reader: ~485 nm excitation/~530 nm emission (green) and ~485 nm excitation/~620 nm emission (red)

### Results

<div class="notebook-img-row"><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp04-fig1a.avif" alt="Figure 1A. FUN-1 fluorescence microscopy" style="width:43.7%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp04-fig1b.avif" alt="Figure 1B. FUN-1 fluorescence microscopy" style="width:43.9%" loading="lazy" /></div>

**Figure 1.** Fluorescence microscopy results

### Short Conclusions

- Seeding density of cells needs to be increased

- Only green dead cells were observed

### Future Improvements

- Increase cell density to 10^7

- Use mounting media

- Include different groups

## Experiment #5

**Dates:** #070626
**Title of Experiment:** Plasmid vector transformation in E.coli

### Methods

#### E.coli Transformation

Mach1 competent cells were used for the transformation. Frozen cell stock was thawed on ice then 1 ul of each plasmid was added to six different E.coli tubes. Cells were heat shocked for exactly 30 seconds then were put immediately on ice for 5 min. Then 900 ul of lb were added to each tube and the cells were allowed to grow in an incubator for 1 hr at 37C. Lastly, cells were diluted 100 times before adding to an LB agar with Ampicillin (AMP) (0.1 mg/ml), spread with glass beads and incubated at 37C overnight.

#### Plasmid Mini-Prep Using QIAprep Miniprep

Cell colonies were picked from each agar plate and inoculated in 4 ml LB with AMP, the LB cultures were allowed to grow overnight at 37C. Next day plasmid purification was done using the QIAprep Miniprep kit. The plasmid purification was conducted based on the protocol provided in the kit (“Plasmid DNA Purification Using the QIAprep Spin Miniprep Kit and a Microcentrifuge”[https://kirschner.med.harvard.edu/files/protocols/QIAGEN_QIAprepMiniprepKit_EN.pdf](https://kirschner.med.harvard.edu/files/protocols/QIAGEN_QIAprepMiniprepKit_EN.pdf))

### Results

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp05-fig1.avif" alt="Figure 1. Nanodrop concentration/purity of six plasmid vectors, first and second elutions" style="width:100.0%" loading="lazy" />

**Figure 1.** Concentration and purity of the all six plasmid vector right panel showing the first elution total volume of the elution was 100µl. This elution was used to aliquot 4 µg to ship to genescript singapore. Left panel showing the second elution with a total volume of 50 µl.

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp05-fig2.avif" alt="Figure 2. Agarose gel of the first elution set of plasmid vectors" style="width:100.0%" loading="lazy" />

**Figure 2.** Agarose gel run of the first elution set of the plasmid vectors.


### Summary

#### Week 3

1)  Glycerol stock preparation

2)  Make sure Pichia is pink

3)  Create B.subtilis cells

4)  Mock transformation of B.subtilis (Chl)

5)  Mock transformation of P.pastoris

6)  Mock transformation of S.cerevisiae

7)  UVC radiation protocol optimization (ISS radiation - max)

- Send an email to the X ray machine company

- Read Dry Lab Genes report → Meet dry lab → Make a choice (radiation resistance genes)

- Safety Form writing

- Fill out vectors form for HSE

- Engineering cycles/Project description writing


## Experiment #6

**Dates:** 11.06, 15.06
**Title of Experiment:** Glycerol stocks preparation

### Methods

Day 1

1.  Prepare LB broth: 500 ml MilliQ + 12.5 gram

2.  Prepare 50% glycerol stock: 50 mL glycerol + 50 mL water

3.  Autoclave both solutions

Day 2

1.  Dilute 100 mg/ml ampicillin stock to 100 ug/ml by pipetting 200 ul from the stock to 200 ml LB media

2.  Prepare 4 ml of LB (100 ug/ml ampicillin) and inoculate a single colony from the E.coli plates

3.  Grow overnight (12-16 h) in a shaking incubator set to 220 rpm, 37 C

4.  Measure OD600nm:

**Table 1.** Results of spectrophotometric measurements for overnight E.coli cultures

|        |                   |         |
|:-------|-------------------|---------|
| Sample | Plasmid           | OD600nm |
| #1    | HO-Poly-KanMX4-HO | 1.176   |
| #2    | pYES2-HTH         | 1.269   |
| #3    | pHT-ads           | 1.039   |
| #4    | pBS4S             | 1.846   |
| #5    | pBS2E             | 1.507   |
| #6    | pBS1C             | 1.834   |

5.  Dilute cells to about OD600nm = 0.1 (50-80 minutes)

6.  Grow cells to OD600nm = 0.6

7.  Mix 500 µL overnight culture with 500 µL sterile 50% glycerol (Final glycerol concentration: 25%) in a new cryovial

8.  Mix by inverting the tube

9.  Snap freeze using liquid nitrogen

10. Store at -80C


## Experiment #7

**Dates:** 30.06-07.07
**Title of Experiment:** S.cerevisiae MOCK transformation

### Part 1: Competent Cells Preparation

1.  Inoculated 10 ml of YPD with a single colony of from S. cerevisiae starter plate

2.  Grew the sample overnight at 28-30°C in a shaking incubator (200-300 rpm)

3.  Determined the OD600 (~4.0)

4.  Diluted cells from the overnight culture to an OD600 of 0.3 in a total volume of 10 ml of YPD

5.  Grew the cells for 1.5-2 h at 28-30°C in a shaking incubator until the OD600 reached 0.7.

6.  Pelleted the cells by centrifugation at 1500 rpm for 8 minutes at RT

7.  Discarded the supernatant

8.  Resuspended in sterile milliQ dH2O

9.  Pelleted the cells by centrifugation at 1500 rpm for 8 minutes at RT

10. Discarded the supernatant

11. Resuspended the cell pellet in 3 ml of sterile 1x TE/LiAc solution (10 mM Tris-HCl, 1 mM EDTA + 100 mM LiAc):

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td><strong>10X TE recipe:</strong></td>
</tr>
<tr>
<td><p>100 mM Tris, 10 mM EDTA</p>
<ol type="1">
<li><p>For 100 ml, dissolve 1.21 g of Tris-HCl and 0.37 g of EDTA in 90 ml of deionized water</p></li>
<li><p>Adjust the pH to 8.0 with Na-OH and bring the volume up to 100 ml</p></li>
<li><p>Filter-sterilize and store at room temperature</p></li>
</ol></td>
</tr>
</tbody>
</table>


<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td><strong>10X LiAc recipe:</strong></td>
</tr>
<tr>
<td><p>1 M Lithium Acetate</p>
<ol type="1">
<li><p>For 100 ml, dissolve 10.2 g of lithium acetate in 90 ml of deionized water</p></li>
<li><p>Adjust pH to 7.5 with dilute HCl and bring up the volume to 100 ml</p></li>
<li><p>Filter-sterilize and store at room temperature.</p></li>
</ol></td>
</tr>
</tbody>
</table>

12. Divided the sample into 15 cryovials, filling each vial with 200 ul of competent cells

13. Put the cryovials into a styrofoam rack and slowly froze in an -80C freezer

### Part 2: Restriction Digestion with NdeI

**Table 1.** Restriction digestion reaction overview

|                     |                 |
|:--------------------|-----------------|
| **Component**       | **Volume**      |
| DNA                 | 6.0 µL (1.6 ug) |
| 10× CutSmart Buffer | 5.0 µL          |
| NdeI                | 1.1 µL          |
| Nuclease-free water | 38.0 µL         |
| **Total**           | **50.0 µL**     |

1.  Set up restriction digestion at 37 C for 1.5 h

2.  In the meantime, prepare 0.8% agarose gel (50 ml, 0.4 g of agarose, 2.5 ul of 10 mg/ml EtBr)

3.  Heat inactivate the reaction by incubating for 20 min at 65 C

4.  On the agarose gel, load:

> **Lane 1:** 1 kb DNA ladder
>
> **Lane 2:** Undigested plasmid (control) - 0.5 µL (135 ng) + 2.0 µL 6× loading dye + 9.5 µL nuclease free water
>
> **Lane 3:** NdeI-digested plasmid - 3.4 µL (~110 ng) + 2.0 µL 6× loading dye + 6.6 µL nuclease free water

5.  Run the gel at 120 V for 40 min (should be extended to 50-60 min next time)

6.  Prepared and filter sterilized 10 ml 50% PEG 3350

### Part 3: G418 Selection Plates Preparation

1.  Prepared fresh YPD agar

2.  Thawed G418 on ice

3.  Prepared the following selection plates:

3 plates with 200 ug/ml G418 (75 ml)

3 plates with 300 ug/ml G418 (75 ml)

3 plates with 400 ug/ml G418 (75 ml)

> = 225 ml YPD

### Part 4: Heat Shock Transformation

1.  For each transformation, thaw one tube of competent cells at room temperature and aliquot 50 µl into a sterile microcentrifuge tube, or use 50 µl of fresh competent cells.

2.  Add 1.6 µg of vector DNA to the competent cells.

3.  Add ~360 µl of transformation mix, consisting of:

- 240 µl PEG 3350 [50% (w/v)]

- 36 µl LiAc (1.0 M, 10x stock)

- 50 µl salmon sperm single-stranded DNA (10.0 mg/ml) boiled for 10 min at 95 C

- 46.6 µl plasmid DNA

Mix DNA and salmon sperm ssDNA first → add the competent cells → add the rest of the components


<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td><strong>50% (w/v) PEG 3350 recipe:</strong></td>
</tr>
<tr>
<td><ol type="1">
<li><p>Dissolve 50 g of PEG 3350 in ~ 30 mL of ddH₂O using heat and a stir bar until fully dissolved.</p></li>
<li><p>Adjust volume to 100 mL</p></li>
<li><p>Filter-sterilize and store at room temperature.</p></li>
</ol></td>
</tr>
</tbody>
</table>

4.  Incubate the transformation reactions for 30 min at 30°C, 200 rpm

5.  Add molecular biology-grade DMSO to a final concentration of 10% (42 µl), mix by gentle inversion

6.  Heat shock for 15-30 min at 42 °C (30 min was used this time)

7.  Chill on ice for 2 min

8.  Centrifuge for 15 sec at 14000 rpm

9.  Remove the supernatant

10. Add 1 ml of YPD (or YPAD if using the yeast strain L40) to each tube.

11. Incubate the cells in a 30°C shaker for 1 hour to allow expression of antibiotic resistance.

12. After the 1 hour recovery time, pellet the cells by centrifugation at 3000 x g for 5 minutes at room temperature.

13. Discard the supernatant

14. Resuspend the cell pellet in 1 ml of YPD broth

15. Using a sterile spreader, plate the entire transformation on appropriate plates containing antibiotics (250 ul - 3 plates [200 ug/ml G418 #1, 300 ug/ml G418 #1, 400 ug/ml G418 #1], 120 ul - 2 plates [200 ug/ml G418 #2, 300 ug/ml G418 #2])

16. Incubate the plates for 2 to 4 days at 30°C. Each transformation should yield approximately 100 colonies depending on the strain you are using.

### Results

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp07-fig1.avif" alt="Figure 1. HO-Poly-KanMX4-HO restriction digestion gel (NdeI)" style="width:61.8%" loading="lazy" />

**Figure 1.** HO-Poly-KanMX4-HO restriction digestion results: Lane 1 - 1kb plus ladder, Lane 2 - control uncut plasmid, Lane 3 - plasmid cut with NdeI

<div class="notebook-img-row">1)  <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp07-fig2a.avif" alt="Figure 2A. 200 ug/mL G418 plate, 250 uL cells" style="width:37.7%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp07-fig2b.avif" alt="Figure 2B. 200 ug/mL G418 plate, 120 uL cells" style="width:38.1%" loading="lazy" /></div>

<div class="notebook-img-row">C\) <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp07-fig2c.avif" alt="Figure 2C. 300 ug/mL G418 plate, 250 uL cells" style="width:39.4%" loading="lazy" /> D) <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp07-fig2d.avif" alt="Figure 2D. 300 ug/mL G418 plate, 120 uL cells" style="width:37.8%" loading="lazy" /></div>

E\) <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp07-fig2e.avif" alt="Figure 2E. 400 ug/mL G418 plate, 250 uL cells" style="width:38.3%" loading="lazy" />

**Figure 2.** HO-Poly-KanMX4-HO S.cerevisiae recombineering results: A) 200 ug/ml G418 plate after 2 days of incubation (250 ul cells), B) 200 ug/ml G418 plate after 2 days of incubation (120 ul cells), C) 300 ug/ml G418 plate after 2 days of incubation (250 ul cells), D) 300 ug/ml G418 plate after 2 days of incubation (120 ul cells), E) 400 ug/ml G418 plate after 2 days of incubation (250 ul cells)



## Experiment #8

**Dates:** 04.07-13.07
**Title of Experiment:** E.coli transformation → minipreps → P.pastoris electroporation

### Methods

### Part I: Media Preparation

1.  Prepare 500 ml of fresh YPD agar and YPD broth

2.  Divide YPD agar into 2 bottles: 150 ml and 350 ml

3.  Pour plates:

- YPD agar plates - ~25 ml media into 10 plates (250 ml)

- YPD agar + Zeocin plates

1.  After warming up the media, cool it to 50-60°C before adding Zeocin.

2.  Stock concentration - 100 mg/ml, working concentration - 100 µg/mL

3.  Pour 5 plates (25 ml * 5 = 125 ml ~ 130 ml)

**Note:** Zeocin is sensitive to pH; ensure your medium is adjusted between 6.5 and 8.0, as acidic conditions inactivate the drug.

4.  Prepare 1M sorbitol

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td><strong>Sobitol (1 M) recipe</strong></td>
</tr>
<tr>
<td><ol type="1">
<li><p>Weigh 18.2 g of Sorbitol</p></li>
<li><p>Add 100 ml of MilliQ H2O</p></li>
<li><p>Autoclave-sterilize and store at room temperature. Stock solutions are stable for up to 6 months at 20°C</p></li>
</ol></td>
</tr>
</tbody>
</table>

### Part II: Plasmid Amplification

#### Step 1: E.coli Transformation

1.  Thaw competent E.coli cells on ice for 10-15 mins

2.  Add 1-10 ng of plasmid DNA to 100 ul cells

3.  Incubate for 30 min on ice

4.  Heat shock at 42 C for 30-45 seconds

5.  Immediately place the tube on ice for 2 - 5 min

6.  Add 900 ul S.O.C media

7.  Recover for 1h at 37 C @ 225 rpm

8.  Dilute cells in the following manner: 100 uL of S.O.C/cells + 900 uL S.O.C.

9.  Plate 100 uL of dilution on to LB Agar with appropriate antibiotics (25 ug/ml Zeocin)

**Note:** NaCl concentration in the media should not exceed 5 g/L for Zeocin plates

10. Incubate at 37°C overnight (12-16 hours)

#### Step 2: Qiagen Miniprep

1.  Centrifuge 5 ml of overnight culture at 13,000 × g for 5 min

2.  Discard the supernatant completely

3.  Resuspend the pellet in 250 µL Buffer P1 and transfer to an Eppendorf tube

4.  Add 250 µL Buffer P2, mix gently by inverting 4-6 times

5.  Neutralize WITH 350 µL Buffer N3, immediately mix by inverting 4-6 times. A white precipitate will form

6.  Centrifuge the sample for 10 min at 13,000 × g

7.  Transfer 800 µL of the supernatant to a QIAprep spin column.

8.  Centrifuge for 30-60 seconds at 13,000 × g

9.  Discard the flow-through

10. Wash with 500 µL Buffer PB, centrifuge for 30-60 seconds at 13,000 × g, and discard the flow-through

11. Wash with 750 µL Buffer PE, centrifuge for 30-60 seconds at 13,000 × g, and discard the flow-through

12. Centrifuge for additional 1 min to remove all the buffers

13. Transfer the column to a clean Eppendorf tube

14. Apply the 50 µL of nuclease-free water or elution buffer directly to the center of the membrane

15. Let stand for 1 minute

16. Centrifuge for 1 min at 13,000 × g

17. Collect the purified plasmid DNA

18. Nanodrop to determine the yield

#### Step 3: Agarose Gel Electrophoresis

1.  Prepare 0.8% agarose gel (50 ml, 0.4 g of agarose, 2.5 ul of 10 mg/ml EtBr)

2.  On the agarose gel, load:

> **Lane 1:** 1 kb DNA ladder
>
> **Other lanes:** Plasmid x µL (~100 ng) + 2.0 µL 6× loading dye + x µL nuclease free water (total V = 12 µL)

3.  Run the gel at 120 V for 50 min

#### Step 4: Glycerol Stock Preparation

1.  Prepare 5 ml of LB containing 25 ug/ml zeocin and inoculate a single colony from the transformed E.coli plates

2.  Grow overnight (12-16 h) in a shaking incubator set to 220 rpm, 37 C

3.  Measure OD600nm:

**Table 1.** Results of spectrophotometric measurements for overnight E.coli cultures

|                    |         |         |
|--------------------|---------|---------|
| Sample             | Plasmid | OD600nm |
| #1                | IPD1    | 0.824   |
| #2 (for miniprep) | IPD1    | 0.670   |
| #3                | IPD2    | 0.826   |
| #4 (for miniprep) | IPD2    | 0.922   |
| #5                | IPD3    | 0.759   |
| #6 (for miniprep) | IPD3    | 0.831   |

4.  Dilute cells to about OD600nm = 0.1

**Table 2.** Dilution calculations

|          |            |                 |                     |              |
|----------|------------|-----------------|---------------------|--------------|
| Sample   | Initial OD | Culture to take | Fresh medium to add | Final volume |
| 1 (IPD1) | 0.824      | 0.728 mL        | 5.272 mL            | 6.0 mL       |
| 2 (IPD2) | 0.826      | 0.726 mL        | 5.274 mL            | 6.0 mL       |
| 3 (IPD3) | 0.759      | 0.790 mL        | 5.21 mL             | 6.0 mL       |

5.  Grow cells to OD600nm = 0.6 (Took 1.5 hr)

6.  Mix 500 µL overnight culture with 500 µL sterile 50% glycerol (Final glycerol concentration: 25%) in a new cryovial

7.  Mix by inverting the tube

8.  Snap freeze via liquid nitrogen

9.  Store at -80 C freezer

### Part III: Restriction Digestion

1.  Mix the reagents in the following manner:

**Table 1.** Restriction digestion reaction overview

|                     |                 |
|---------------------|-----------------|
| **Component**       | **Volume**      |
| DNA                 | 6.0 µL (1.6 ug) |
| 10× CutSmart Buffer | 5.0 µL          |
| SacI                | 1.1 µL          |
| Nuclease-free water | 38.0 µL         |
| **Total**           | **50.0 µL**     |

2.  Set up restriction digestion at 37 C for 30 min

**Note:** SacI-HF is a restriction enzyme that cuts DNA. It is a Time-Saver qualified enzyme from New England Biolabs. It digests substrate DNA in 5 to 15 minutes. You can also leave it to digest overnight without damaging the DNA

**Note:** SacI-HF® (high-fidelity restriction enzyme) requires an incubation temperature of 37°C for optimal DNA digestion and should be heat-inactivated at 65°C for 20 minutes

7.  Heat inactivate the reaction by incubating for 20 min at 65 C

8.  Run 0.8% agarose gel at 120 V for 50 min

### Part IV: Electroporation Transformation

#### Step 1

1.  Inoculate 1 colony in 125 ml sterile flask (10 ml of YPD media). You can make 2-3 colonies for quicker growth. Incubating 190 rpm 30C for 1-2 days. This is starter culture

#### Step 2

1.  Inoculate 1 ml of starter culture in 1 L flask with 100 ml YPD media. Grow the culture for 1-2 days.

2.  Next day transfer cells in 2 - 50 ml sterile centrifuge tubes. Centrifuge 4C 1500 g for 5 minutes (2 min enough). Resuspend pellets in each tube with ice cold water (fill the tube and mix gently – washing the pellets) – then centrifuge the cells, remove water and wash the 2d time – centrifuge and remove the water.

3.  Resuspend pellets in 10 ml of sterile ice cold sorbitol (1M). Centrifuge and remove supernatant

4.  Resuspend the pellets in ~3 ml of sorbitol

**Note:** the cell pellet was very very dense

5.  Keep the cells on ice and use the same day for the transformation

#### Step 3

Transformation by electroporation

> \- 3 ug of linearized plasmid (IPD1 #1)
>
> \- YPDS media (for recovery)
>
> \- Selection plates (w/Zeocin in our case)
>
> \- Electroporation cuvettes and device

1.  Mix 80 ul freshly prepared cells with 5 ug of linearized plasmid and transfer to ice -cold electroporation cuvette

2.  Incubate 5 min on ice

3.  Pulse the cells in an electroporator. We used E.coli option 3 on BioRad electroporator

4.  Immediately after pulsing the cells add 1 ml of ice-cold YPDS media to the cuvette and mix by pipetting up and down

5.  Incubate the cells for at least for 3.4 h at 30 C without shaking (directly in the cuvette). You can incubate up to 12h

6.  Spread the cells on selection plates and incubate 30C for 3 days

### Results

**Table 1.** Miniprep results

|           |            |               |                    |
|:----------|------------|---------------|--------------------|
| Sample ID | Identifier | Concentration | Total DNA in 50 µL |
| IPD1      | #1        | 68.7 ng/µL    | 3.44 µg (- 2 µg)   |
| IPD1      | #2        | 22.6 ng/µL    | 1.13 µg            |
| IPD1      | #3        | 24.2 ng/µL    | 1.21 µg            |
| IPD1      | #4        | 133.2 ng/µL   | 6.67 µg            |
| IPD1      | #5        | 116.4 ng/µL   | 5.82 µg            |
| IPD2      | #1        | 102.4 ng/µL   | 5.12 µg (- 2 µg)   |
| IPD2      | #2        | 37.9 ng/µL    | 1.90 µg            |
| IPD2      | #3        | 36.5 ng/µL    | 1.83 µg            |
| IPD2      | #4        | 80.2 ng/µL    | 4.01 µg            |
| IPD2      | #5        | 101.5 ng/µL   | 5.07 µg (- 3 µg)   |
| IPD3      | #1        | 74.7 ng/µL    | 3.74 µg            |
| IPD3      | #2        | 30.4 ng/µL    | 1.52 µg            |
| IPD3      | #3        | 32.5 ng/µL    | 1.63 µg            |
| IPD3      | #4        | 103.3 ng/µL   | 5.16 µg (- 2 µg)   |
| IPD3      | #5        | 90.2 ng/µL    | 4.51 µg (- 3 µg)   |

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp08-fig1.avif" alt="Figure 1. Agarose gel, miniprep samples #1" style="width:84.3%" loading="lazy" />

**Figure 1.** Agarose gel results of miniprep samples #1

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp08-fig2.avif" alt="Figure 2. Agarose gel, miniprep samples #4 and #5" style="width:100.0%" loading="lazy" />

**Figure 2.** Agarose gel results of miniprep samples #4 & 5

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp08-fig3.avif" alt="Figure 3. Agarose gel, SacI restriction digestion" style="width:46.6%" loading="lazy" />

**Figure 3.** Agarose gel results of SacI restriction digestion

<div class="notebook-img-row">A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp08-fig4a.avif" alt="Figure 4A. P. pastoris IPD1 transformants, 100 uL" style="width:47.7%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp08-fig4b.avif" alt="Figure 4B. P. pastoris IPD1 transformants, 200 uL" style="width:45.8%" loading="lazy" /></div>

C)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp08-fig4c.avif" alt="Figure 4C. P. pastoris IPD1 transformants, 250 uL" style="width:45.1%" loading="lazy" />

**Figure 4.** P.pastoris transformants (IPD1) on YPD + 100 ug/ml zeocin plates: A) 100 ul B) 200 ul C) 250 ul


### Conclusion

Successful transformation of P.pastoris with IPD1, with integration of our gene of interest (wt Dsup) into AOX locus.

## Experiment #9

**Dates:** 02.07-04.07 (Sacharomicces serevisae); 12.07-14.07 (Pichia Pastoris); 23.07-25.07 (Repetition Pichia Patoris); 24.07-26.07 (Bacillus subtilis)
**Title of Experiment:** X-ray radiation resistance up to 2000 Gy for Sacharomicces serevisae, Pichia Pastoris and Bacillus subtilis.

**Assay and readout.** Survival was assessed by spot-dilution rather than absolute colony counts. Each strain was serially diluted 10-fold and spotted across the plate, so growth runs from concentrated on the left to highly diluted on the right. The informative metric is how far along the dilution series growth persists: if irradiation reduces the surviving population, growth drops out one spot earlier than in the mock control, and because each spot represents a 10-fold dilution, the loss of one spot corresponds to roughly a 1-log₁₀ reduction in viable cells.<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp09-spots-scerevisiae-1.avif" alt="S. cerevisiae spot-dilution series" style="width:39.1%" loading="lazy" />

**Sacharomicces serevisae:** Growth remains essentially unchanged from Mock through 400 Gy: the concentrated spots are large and near-confluent, and the terminal spot is retained across all three conditions, indicating little to no loss in viable titre over this range. At 600 and 800 Gy the highest-density spots still trend toward confluence, with only a modest reduction in colony size and spot definition, the surviving fraction is still high. The first clear signature of damage appears at 1000 Gy, where the spots become distinctly discrete and separated rather than confluent, consistent with a reduced but still substantial surviving population.

The main limitation is the dose ceiling. Because 1000 Gy produces only a mild effect, the true inactivation threshold for *S. cerevisiae* lies above the range tested here, and no endpoint (D₁₀ or LD) can be assigned. Within the compared organisms, this is the most radioresistant strain, but its curve was never taken far enough to capture the steep decline.

<div class="notebook-img-row"><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp09-spots-scerevisiae-2.avif" alt="S. cerevisiae spot-dilution series, continued" style="width:49.2%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp09-spots-ppastoris.avif" alt="P. pastoris spot-dilution series" style="width:41.9%" loading="lazy" /></div>

**Pichia Pastoris and the replicate experiment to obtain the full range of doses:** Both the initial run and the repetition show the same overall behaviour, and the repetition (with the full dose series) defines the transition more clearly. Mock and 200 Gy give confluent growth at the concentrated spots, indicating high viable density. From 400 to 800 Gy there is a consistent shift from confluent to granular and then discrete colonies, visible even at the more concentrated spots, so the surviving fraction is declining steadily across this range rather than only at the dilute end.

The repetition places the sharpest change around 1200 Gy, where growth collapses to essentially a single confluent spot followed by granular material. From 1400 to 2000 Gy the decline continues: by 1800–2000 Gy only sparse growth remains at the lowest dilution, with no growth at the higher dilutions. Survivors are still detectable at 2000 Gy, but at a heavily reduced fraction. The two runs are consistent in shape, which supports the reproducibility of this dose-response.

This places *P. pastoris* at an intermediate position, clearly more sensitive than *S. cerevisiae*, but retaining a small surviving population even at the top dose.

**Bacillus subtilis:** This is the clearest series to read, since each dose can be scored by how many spots still show growth. Full growth across all spots persists through 400 Gy. From 600 to 1200 Gy the spots progressively break up and the most dilute ones start dropping out, marking a steady dose-dependent loss of viability. Beyond that the decline is sharp: only two to three spots remain at 1400–1600 Gy, a single spot at 1800 Gy, and no growth at any dilution at 2000 Gy, complete inactivation. This makes *B. subtilis* the most sensitive of the three.<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp09-spots-bsubtilis.avif" alt="B. subtilis spot-dilution series" style="width:34.2%" loading="lazy" />

## Experiment #10

**Dates:** 12.08 (Bacillus subtilis)
**Title of Experiment:** Testing Resazurin Viability Assay in Bacillus subtilis after UV irradiation.

### Part 1: Optimization of Cell Density and Kinetic Window for Resazurin Assay

#### Objective

Determine the optimal cell density and establish kinetics of untreated Bacillus subtilis reducing resazurin, to define the time window for measuring post-radiation treatment effects in Part 2.

#### Materials

- *Bacillus subtilis* culture (overnight, 37°C)

- Luria-Bertani (LB) broth

- Resazurin sodium salt powder

- Phosphate-buffered saline (PBS) or commercial PBS powder

- 96-well black plate (for fluorescence) or clear plate (for both fluorescence and absorbance)

- Plate reader capable of:

  - Fluorescence: 545 nm excitation / 590 nm emission

  - Absorbance: OD 600

  - Temperature control (37°C)

  - Kinetic reads at timed intervals

#### Methods

0.15 OD

##### Step 0A: PBS Preparation (if not commercially available)

**If starting from PBS powder packets (10x concentrate):**

1.  **Prepare 1x PBS (working solution):**

    - Dilute 10x PBS stock 1:10 with distilled water

    - Example: 100 mL of 10x PBS + 900 mL distilled water = 1 L of 1x PBS

    - Mix thoroughly

2.  **If making PBS from individual salts (for detailed control):**

    - Dissolve in 1 L distilled water:

      - **NaCl:** 8.0 g

      - **KCl:** 0.2 g

      - **Na₂HPO₄:** 1.44 g

      - **KH₂PO₄:** 0.24 g

    - Mix thoroughly until fully dissolved

    - **Adjust pH to 7.4** using pH meter:

      - Use 1 M HCl to lower pH (if too high)

      - Use 1 M NaOH to raise pH (if too low)

3.  **Sterilization:**

    - **Autoclave:** 121°C, 15 psi, 20 minutes (preferred method)

    - **OR Filter sterilize:** Pass through 0.22 µm filter into sterile container

    - **OR Purchase pre-sterilized PBS** (easiest option)

4.  **Storage:**

    - Store at **room temperature (20–25°C)** in sealed, sterile container

    - Stable for **several months** when properly sealed

    - Discard if contamination or cloudiness appears

**If using commercial PBS (pre-made, ready-to-use):**

- Simply use as-is from the bottle

- Verify pH is 7.4 on label

- Store according to manufacturer instructions

##### Step 0B: Resazurin Stock Solution Preparation (One-time)

**Prepare once and store:**

1.  **Weigh resazurin sodium salt powder:** 15 mg

2.  **Dissolve in:** 10 mL PBS (prepared in Step 0A, pH 7.4)

    - Final concentration: **0.15% w/v** (10x concentrated stock)

3.  **Mixing:**

    - Dissolve thoroughly by vortexing or stirring for 2–3 minutes

    - Solution should appear **bright blue**

4.  **Filter sterilization:**

    - Pass through 0.22 µm syringe filter into sterile container to ensure sterility

5.  **Storage:**

    - Store at **4°C in the dark** (resazurin is light-sensitive)

    - Stable for **4–8 weeks** when protected from light

    - Do NOT freeze

##### Step 0C: Working Resazurin Solution (Fresh per Experiment)

**Prepare immediately before each experiment:**

1.  **Mix:** 1 mL of concentrated resazurin stock (from Step 0B) + 9 mL PBS

    - Final concentration: **0.015% w/v** (diluted 1:10)

> I only need 1mL so,
>
> 100uL of concentrated resazurin stock (from Step 0B) + 900uL of PBS
>
> Final concentration: **0.015% w/v** (diluted 1:10)

2.  **Mix thoroughly**

3.  **Quality check:**

    - Solution should be **bright blue** and **clear**

4.  **Use immediately** (do not store—prepare fresh for each experiment)

##### Step 1: Culture Preparation

1.  Dilute overnight *Bacillus subtilis* culture to OD₆₀₀ = 0.1 in fresh LB broth

2.  Grow at 37°C with shaking (200 rpm) until OD₆₀₀ = 1.0

3.  Measure final OD₆₀₀ to confirm exponential phase

##### Step 2: Serial Dilutions

Prepare five bacterial suspensions with different densities in a total volume of 500 µL each:

|              |                |                 |                  |
|:------------:|----------------|-----------------|------------------|
| **Dilution** | **Media (µL)** | **Sample (µL)** | **Target OD₆₀₀** |
|      1       | 400            | 100             | 0.2              |
|      2       | 300            | 200             | 0.4              |
|      3       | 200            | 300             | 0.6              |
|      4       | 100            | 400             | 0.8              |
|  Undiluted   | 0              | 500             | ~1.0             |

Measure OD₆₀₀ of each dilution to confirm actual densities.

##### Step 3: Plate Setup

1.  Add **100 µL** of each bacterial suspension to the wells of a 96-well plate in **triplicate** (15 wells total for 5 densities)

2.  Add **100 µL LB media + 20 µL working resazurin solution** to three additional wells as **negative control** (media + resazurin only)

3.  Seal or cover plate to prevent evaporation

##### Step 4: Resazurin Addition

1.  Add **20 µL of working resazurin solution (0.015% w/v in PBS)** to each well containing bacteria (10% of initial volume)

2.  Gently pipette to mix (avoid bubbles)

3.  **Start kinetic measurements immediately** (t = 0)

##### Step 5: Kinetic Measurements

Set plate reader to measure every **15 minutes for 6 hours** (24 cycles). Maintain plate at **37°C** throughout.

**Read 1: Fluorescence**

- Excitation: 545 nm

- Emission: 590 nm

- Gain: Start at 65–70% (adjust if signal too weak or saturated)

**Read 2: Absorbance (OD 600)**

- Wavelength: 600 nm

#### Data Analysis

For each cell density and both measurements:

1.  **Plot kinetic curves:**

    - Time (hours) vs. Fluorescence (RFU)

    - Time (hours) vs. OD₆₀₀

2.  **Identify plateau phase** for each density:

    - Time to reach 50% of maximum fluorescence

    - Time to reach 100% of maximum fluorescence (plateau)

    - Plateau height (absolute fluorescence value)

3.  **Subtract background:**

    - Calculate mean fluorescence and OD₆₀₀ of media-only wells (negative control)

    - Subtract from all sample wells

4.  **Calculate kinetic parameters:**

    - **Lag time:** Time until fluorescence rises above baseline

    - **Slope:** Rate of resazurin reduction (RFU/hour) during exponential phase

    - **Plateau time:** Time when fluorescence stabilizes

    - **Maximum fluorescence:** Peak RFU value

#### Interpretation & Selection Criteria

**Choose the optimal cell density for Part 2 based on:**

- [x] Clear, strong signal rise above background by 30–60 minutes

- [x] Plateau occurring between hours 4–6 (not hours 2–3)

- [x] Smooth, interpretable kinetic curve with minimal noise

- [x] OD₆₀₀ and fluorescence rise **together** (confirming metabolic activity correlates with biomass)

- [x] Sufficient signal-to-noise ratio for detecting treatment effects

**Expected outcome:** OD 0.3–0.5 will likely provide the best kinetic window, but empirical data will determine the optimal density.

<div class="notebook-img-row"><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10-fig1.avif" alt="Image as embedded in the source document at this point (appears to be an unrelated gel photo)" style="width:22.8%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10-fig2.avif" alt="Image as embedded in the source document at this point (appears to be an unrelated gel photo)" style="width:25.2%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10-fig3.avif" alt="Image as embedded in the source document at this point (appears to be unrelated BSA tube photos)" style="width:47.0%" loading="lazy" /></div>

*Note: the images embedded at this point in the source document do not appear to match this section's content (they show unrelated gel and tube photos) — worth checking against the original notebook.*

## Experiment #11

**Dates:** 22-24.08 (Bacillus subtilis)
**Title of Experiment:** Dry lab experiments - growing curves of bacillus in different concentrations of glucose and sucrose.

### Protocol to Prepare the Medium for Bacillus and Yeast

|  |  |  |
|----|----|----|
| **Type** | **Purpose** | **Contains its own carbon?** |
| Rich (pre-culture) | Grow the inoculum quickly and healthily | Yes (peptides) |
| Defined base, no sugar (used for the experiment) | What the sugar gets added to | No |
| Sugar stock | Carbon source that is varied | — |

### 1. A few rules on sterilizing

These apply throughout, so it's worth having them in mind before starting:

> • The salts can go in the autoclave (121 °C for 15–20 min).
>
> • The sugars never go in with anything else. Filter them (0.22 µm) or autoclave them on their own. Otherwise you get the Maillard reaction, which browns the medium and leaves inhibitory compounds behind.
>
> • Anything heat-sensitive gets filtered (0.22 µm) and added at the end. That means the vitamins (thiamine, the YNB), the trace elements, and the amino acids.
>
> • Don't autoclave concentrated phosphates and Mg together, they precipitate. That's why the Mg is kept on its own and added afterward.
>
> • Do the mixing sterile and at room temperature (in the cabinet or by the flame), and use MilliQ or deionized water.

### 2. Rich media for the pre-cultures

*These are just for growing up the inoculum. Once it's grown you wash it twice in 0.9% NaCl and move it over to the defined medium.*

**LB Miller, for B. subtilis (Invitrogen Luria Broth Base, Cat. 12795-027):**

|                                |                     |               |
|--------------------------------|---------------------|---------------|
| **Preparation**                | **Amount (100 mL)** | **Sterilize** |
| Dissolve powder, adjust pH 7.0 | 2.5 g (at 25 g/L)* | Autoclave     |

**YPD, for S. cerevisiae and P. pastoris (Sigma Y1375, the bottle says 50 g/L):**

|                                 |                     |               |
|---------------------------------|---------------------|---------------|
| **Preparation**                 | **Amount (100 mL)** | **Sterilize** |
| Dissolve powder, adjust pH ~6.5 | 5 g (at 50 g/L)     | Autoclave     |

### 3. Defined medium for B. subtilis: Spizizen 2× (no sugar)

This is the Spizizen minimal medium from Anagnostopoulos & Spizizen (J. Bacteriol. 81:741–746, 1961). We make it as a 2× concentrated base of just the salts, and dilute it down by half when we put the working medium together.

**The 2× base is salts only and goes in the autoclave. For 300 mL of the 2× stock:**

|  |  |
|----|----|
| **Component** | **Amount (300 mL of 2×)** |
| Ammonium sulfate [(NH₄)₂SO₄] | 1.2 g |
| Dipotassium phosphate / potassium phosphate dibasic [K₂HPO₄] | 8.4 g |
| Monopotassium phosphate / potassium phosphate monobasic [KH₂PO₄] | 3.6 g |
| Trisodium citrate dihydrate [Na₃C₆H₅O₇·2H₂O] | 0.6 g |

*Dissolve the salts in water, take the pH to about 7.0, bring it up to 300 mL and autoclave. The phosphates end up buffering the medium near pH 7, which is handy.*

**The supplements stay separate. They're filtered and added when you assemble the medium, not put through the autoclave:**

> • Tryptophan, around 50 mg/L. This one isn't optional, strain 168 can't make its own tryptophan, so it simply won't grow without it. A 5 mg/mL filtered stock works; add 1 mL per 100 mL of final medium.
>
> • Magnesium sulfate heptahydrate (MgSO₄·7H₂O) to a final 0.2 g/L. Make a 100× stock (20 g/L), filter it, and add 1 mL per 100 mL.
>
> • Trace elements and iron (as Fe-citrate). Worth adding, plain Spizizen tends to grow poorly and only reach an OD of about 0.1–0.2. These are two separate filtered 100× solutions; recipes are in the table below.
>
> • Thiamine hydrochloride (vitamin B1) is optional and just helps growth a little. Filter it too.

**Supplement stock preparation:**

|  |  |  |  |  |
|----|----|----|----|----|
| **Supplement** | **Stock** | **Preparation** | **Sterilize** | **Add to medium** |
| Tryptophan | 5 mg/mL | 50 mg in 10 mL water | Filter (store dark, 4 °C) | 10 mL/L → 50 mg/L |
| Magnesium sulfate heptahydrate [MgSO₄·7H₂O] | 100× (20 g/L) | 0.2 g in 10 mL water | Filter | 10 mL/L → 0.2 g/L |
| Trace element solution | 100× | See composition below | Filter (store 4 °C) | 10 mL/L |
| Fe-citrate solution | 100× | 30 mg FeSO₄·7H₂O (iron(II) sulfate heptahydrate) + 0.225 g trisodium citrate, bring to 225 mL | Filter (make fresh, store dark) | 10 mL/L |
| Thiamine hydrochloride (vitamin B1) | 1 mg/mL | 10 mg in 10 mL water | Filter (store dark, 4 °C) | 1 mL/L → 1 mg/L (optional) |

**Trace element solution (100×), scaled to 250 mL from the SubtiWiki per-liter Spizizen recipe:**

|  |  |
|----|----|
| **Component** | **Amount (per 250 mL of 100× stock)** |
| Calcium chloride [CaCl₂] (or CaCl₂·2H₂O, 0.184 g) | 0.1375 g |
| Manganese(II) chloride tetrahydrate [MnCl₂·4H₂O] | 0.025 g |
| Zinc sulfate heptahydrate [ZnSO₄·7H₂O] (substituted for ZnCl₂) | 0.090 g |
| Copper(II) sulfate pentahydrate [CuSO₄·5H₂O] (substituted for CuCl₂) | 0.0121 g (≈12.1 mg) |
| Cobalt(II) chloride hexahydrate [CoCl₂·6H₂O] | 0.015 g |

*Dissolve everything in deionized water, filter (0.22 µm), and keep it at 4 °C in the dark. You add 10 mL/L to the final medium, and 250 mL will last for about 25 L.*

### 4. Defined medium for the yeasts: YNB (no sugar)

We're using Invitrogen Yeast Nitrogen Base (the Pichia-tested one), without amino acids and with ammonium sulfate. It's already a defined base (salts, vitamins, trace elements, ammonium) with no carbohydrate in it, so all we do is add the sugar.

**Concentrated stock (for 25 mL):**

|  |  |
|----|----|
| **Preparation** | **Amount** |
| Dissolve YNB (warm gently ~45 °C), FILTER 0.22 µm (do not autoclave) | 3.35 g in 25 mL (= 134 g/L) |

Store at 4 °C and use within ~2 months. A single 134 g/L stock serves both yeasts, changing the dilution:

|               |               |                           |
|---------------|---------------|---------------------------|
| **Organism**  | **Final YNB** | **Dilution from 134 g/L** |
| S. cerevisiae | 6.7 g/L       | 1:20                      |
| P. pastoris   | 13.4 g/L      | 1:10                      |

### 5. Sugar stocks (glucose and sucrose)

|           |              |                         |                          |
|-----------|--------------|-------------------------|--------------------------|
| **Sugar** | **Prepared** | **Actual final volume** | **Actual concentration** |
| Glucose   | 25 g         | ~61 mL                  | ≈ 410 g/L                |
| Sucrose   | 12.5 g       | ~34 mL                  | ≈ 368 g/L                |

**Worth remembering for later, when you measure sugar: sucrose is a non-reducing sugar, so the DNS assay won't pick it up unless you hydrolyze it first (with acid or invertase).**

### 6. Putting the working medium together (with sugar)

For each aliquot of base, add enough sugar stock to hit the concentration you want, then top up to volume with sterile water. The amount of sugar to add is (C_target × V_final) / C_stock, where C_stock is the real concentration of that sugar, not the nominal one.

**Glucose stock (≈ 410 g/L), volume to add per 25 mL of final medium:**

|                          |                               |
|--------------------------|-------------------------------|
| **Target concentration** | **Glucose stock (for 25 mL)** |
| 1 g/L                    | 0.061 mL (61 µL)              |
| 2.5 g/L                  | 0.152 mL (152 µL)             |
| 5 g/L                    | 0.305 mL (305 µL)             |
| 10 g/L                   | 0.610 mL (610 µL)             |
| 20 g/L                   | 1.220 mL                      |

**Sucrose stock (≈ 368 g/L), volume to add per 25 mL of final medium:**

|                          |                               |
|--------------------------|-------------------------------|
| **Target concentration** | **Sucrose stock (for 25 mL)** |
| 1 g/L                    | 0.068 mL (68 µL)              |
| 2.5 g/L                  | 0.170 mL (170 µL)             |
| 5 g/L                    | 0.340 mL (340 µL)             |
| 10 g/L                   | 0.679 mL (679 µL)             |
| 20 g/L                   | 1.359 mL                      |

### 7. A ready-to-go 1.5× base (so you only add sugar)

To save time on the day of the experiment, it's worth making a complete 1.5× base ahead of time with all the supplements already in it and no sugar yet. Then all that's left is to mix the 1.5× base, the sugar stock and some sterile water. The base works out to two-thirds of the final volume (the final volume divided by 1.5).

**Spizizen 1.5× complete base, for 50 mL (enough for 75 mL of final medium):**

|                                  |                    |
|----------------------------------|--------------------|
| **Component (from your stocks)** | **Volume**         |
| 2× Spizizen salt base            | 37.5 mL            |
| MgSO₄ (100× stock)               | 0.75 mL            |
| Trace element solution (100×)    | 0.75 mL            |
| Fe-citrate solution (100×)       | 0.75 mL            |
| Tryptophan (5 mg/mL)             | 0.75 mL            |
| Thiamine hydrochloride (1 mg/mL) | 0.075 mL           |
| Sterile water                    | to 50 mL (~9.4 mL) |

*Put it together sterile and at room temperature, and keep it at 4 °C in the dark. Try to use it within a week or two. Before you rely on it, leave an aliquot in the incubator for a day or two to check nothing grows in it.*

**YNB 1.5× complete base, for 50 mL (enough for 75 mL of final medium):**

|                                  |                   |                 |
|----------------------------------|-------------------|-----------------|
| **Component**                    | **S. cerevisiae** | **P. pastoris** |
| YNB (134 g/L stock)              | 3.75 mL           | 7.5 mL          |
| Amino acids (if strain requires) | as needed         | His if GS115    |
| Sterile water                    | to 50 mL          | to 50 mL        |

*Take it to about pH 5.5–6.0, and store and check it the same way.*

**For the glucose run, here's how it comes together per 5 mL of final medium (glucose stock ≈ 410 g/L):**

|                          |               |                   |                   |
|--------------------------|---------------|-------------------|-------------------|
| **Target concentration** | **1.5× base** | **Glucose stock** | **Sterile water** |
| 1 g/L                    | 3.33 mL       | 12 µL             | 1.65 mL           |
| 2.5 g/L                  | 3.33 mL       | 30 µL             | 1.63 mL           |
| 5 g/L                    | 3.33 mL       | 61 µL             | 1.60 mL           |
| 10 g/L                   | 3.33 mL       | 122 µL            | 1.55 mL           |
| 20 g/L                   | 3.33 mL       | 244 µL            | 1.42 mL           |

*The base is always the final volume over 1.5 (that two-thirds again, and it doesn't change), and the water is just whatever's left after the base and sugar. Mix it sterile and cold, then fill the wells. 5 mL gets you about 25 wells at 200 µL, or 8–9 at 500 µL, so scale up if a condition needs more than that.*

### 8. Preparing and standardizing the inoculum

The point of washing the pre-culture is to get rid of the carbon it drags along from the rich medium, both leftover sugar and peptides, and then to set it to a known OD so every well starts around OD₆₀₀ 0.05. Washing in sugar-free base is really what keeps the glucose concentration in the wells honest.

> 1\. Grow the pre-culture (LB for B. subtilis, YPD for the yeast) and pull a known volume into a tube.
>
> 2\. Spin it down at 4000 × g for 6 min (that's the max our centrifuge does) and pour off the supernatant, which is the old rich medium and everything it carried over.
>
> 3\. Resuspend the pellet in the same volume of sugar-free base (Spizizen or YNB without any sugar).
>
> 4\. Do the spin and resuspend once more, so two washes in total.
>
> 5\. Resuspend the final pellet in sugar-free base and read the OD₆₀₀.
>
> 6\. Set it to OD₆₀₀ 0.5 by diluting with more sugar-free base — the cell volume you need is V_final × 0.5 / OD_measured, then top up to V_final. For example, from an OD of 3.11, to make 4 mL of inoculum you'd take 0.64 mL of washed cells and 3.36 mL of base.
>
> 7\. Then inoculate: 100 µL of that OD-0.5 inoculum plus 900 µL of working medium gives you 1 mL sitting at OD₆₀₀ 0.05.

### 9. Keeping the lid from fogging, and sterilizing the plate

This follows Rogers et al. (Bio-protocol 4410), which is the reference to cite. There are really two separate things going on here: the Triton stops the lid from fogging up, and the ethanol and UV sterilize the plate.

**For the anti-fogging solution (10% Triton X-100 in ethanol):**

> 1\. Mix 1 mL Triton X-100 + 9 mL ethanol (= 10 mL).
>
> 2\. Pour 10 mL onto the inner face of a new lid; incubate 15 s at room temperature.
>
> 3\. Discard the Triton. Air-dry in the cabinet before use.

**Plate sterilization (in parallel):**

> 1\. Fill each well with 100% ethanol (~1 mL/well for a 24-well plate; the paper uses 400 µL in a 96-well plate) and incubate 15 min.
>
> 2\. Discard the ethanol from the wells and the Triton from the lid; air-dry in the cabinet 30 min.
>
> 3\. Turn on the cabinet's UV light and disinfect wells and lid for 15 min.

*If your 24-well plates already come sterile (the Sterilin ones do), you can skip the ethanol and UV step entirely and just do the Triton treatment on the lid.*

24 well-plates-Bacillus-glucose: benzonase

<div class="notebook-img-row"><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11-24well-a.avif" alt="24-well plate, B. subtilis + glucose, panel A" style="width:56.0%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11-24well-b.avif" alt="24-well plate, B. subtilis + glucose, panel B" style="width:29.0%" loading="lazy" /></div>

96 well-plates-Bacillus-sucrose-glucose:

<div class="notebook-img-row"><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11-96well-a.avif" alt="96-well plate, B. subtilis sucrose/glucose, panel A" style="width:55.8%" loading="lazy" /><img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11-96well-b.avif" alt="96-well plate, B. subtilis sucrose/glucose, panel B" style="width:27.1%" loading="lazy" /></div>

<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11-growth-curves.avif" alt="Well-level OD600 growth curves, glucose/sucrose, 24-well and 96-well formats" style="width:100.0%" loading="lazy" />

## Experiment #10 (P.pastoris electroporation)

*Note: this experiment is again numbered "10" in the source notebook — an earlier, unrelated entry also used that number.*

**Dates:** _(not recorded)_
**Title of Experiment:** P.pastoris electroporation (IPC1, IPC2, IPD2, IPD3, IPAL1, IPAF2)

#### Step 1: Competent P.pastoris Preparation

1.  Inoculate 1 ml of starter culture in 1 L flask with 100 ml YPD media. Grow the culture overnight

2.  Next day transfer cells in 2 - 50 ml sterile centrifuge tubes. Centrifuge 4C 1500 g for 5 minutes (2 min enough). Resuspend pellets in each tube with ice cold water (fill the tube and mix gently – washing the pellets) – then centrifuge the cells, remove water and wash the 2d time – centrifuge and remove the water.

3.  Resuspend pellets in 10 ml of sterile ice cold sorbitol (1M). Centrifuge and remove supernatant

4.  Resuspend the pellets in ~1 ml of sorbitol

5.  Keep the cells on ice and use the same day for the transformation

#### Step 2: Restriction Digestion

1.  

#### Step 3: PCR Clean Up

1.  

#### Step 4: Electroporation

Transformation by electroporation

> \- 1-2 ug of linearized plasmid
>
> \- YPDS media (for recovery)
>
> \- Selection plates (100 ug/ml Zeocin)
>
> \- Electroporation cuvettes and device

1.  Mix 80 ul freshly prepared cells with 1-2 ug of linearized plasmid and transfer to ice -cold electroporation cuvette

2.  Incubate 5 min on ice

3.  Pulse the cells in an electroporator. We used E.coli option 3 on BioRad electroporator

7.  Immediately after pulsing the cells add 1 ml of ice-cold YPDS media to the cuvette and mix by pipetting up and down

8.  Incubate the cells for at least for 3.4 h at 30 C without shaking (directly in the cuvette). You can incubate up to 12h

9.  Spread the cells on selection plates and incubate 30C for 3 days

### Results

Initially, electroporation failed as a spark appeared MOJHUIGO

<div class="notebook-img-row">A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10dup-fig2a.avif" alt="Figure 2A. P. pastoris recombineering, IPC2" style="width:45.7%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10dup-fig2b.avif" alt="Figure 2B. P. pastoris recombineering, IPD3" style="width:43.6%" loading="lazy" /></div>

<div class="notebook-img-row">C\) <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10dup-fig2c.avif" alt="Figure 2C. P. pastoris recombineering, IPAL1" style="width:46.1%" loading="lazy" />D) <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp10dup-fig2d.avif" alt="Figure 2D. P. pastoris recombineering, IPAF1" style="width:44.5%" loading="lazy" /></div>

**Figure 2.** P.pastoris recombineering results: A) IPC2 B) IPD3 C) IPAL1 D) IPAF1

## Experiment #11 (S.cerevisiae recombineering)

*Note: this experiment is again numbered "11" in the source notebook — an earlier, unrelated entry also used that number.*

**Dates:** 07.08 - 08.08
**Title of Experiment:** S.cerevisiae recombineering transformation (ISD1, ISD2, ISD3)

### Part 1: Restriction Digestion with NdeI

Table 1. Restriction digestion reaction overview

|  |  |
|----|----|
| **Component** | **Volume** |
| DNA | 6.0 µL (1.6 ug) |
| 10× CutSmart Buffer | 5.0 µL |
| NdeI | 1.1 µL |
| Nuclease-free water | 38.0 µL |
| **Total** | **50.0 µL** |

1.  Set up restriction digestion at 37 C for 1.5 h

2.  In the meantime, prepare 0.8% agarose gel (50 ml, 0.4 g of agarose, 2.5 ul of 10 mg/ml EtBr)

3.  Heat inactivate the reaction by incubating for 20 min at 65 C

4.  On the agarose gel, load:

> **Lane 1:** 1 kb DNA ladder
>
> **Lane 2:**
>
> **Lane 3:**

5.  Run the gel at 120 V for 50 min

### Part 2: Heat Shock Transformation

1.  For each transformation, thaw one tube of competent cells at room temperature and aliquot 50 µl into a sterile microcentrifuge tube

2.  Add 1.5 µg of vector DNA to the competent cells.

3.  Add ~360 µl of transformation mix, consisting of:

- 240 µl PEG 3350 [50% (w/v)]

- 36 µl LiAc (1.0 M, 10x stock)

- 50 µl salmon sperm single-stranded DNA (10.0 mg/ml) boiled for 10 min at 95 C

- 46.6 µl plasmid DNA

Mix DNA and salmon sperm ssDNA first → add the competent cells → add the rest of the components

4.  Incubate the transformation reactions for 30 min at 30°C, 200 rpm

5.  Add molecular biology-grade DMSO to a final concentration of 10% (42 µl), mix by gentle inversion

6.  Heat shock for 15-30 min at 42 °C (30 min was used this time)

7.  Chill on ice for 2 min

8.  Centrifuge for 15 sec at 14000 rpm

9.  Remove the supernatant

10. Add 1 ml of YPD (or YPAD if using the yeast strain L40) to each tube.

11. Incubate the cells in a 30°C shaker for 1 hour to allow expression of antibiotic resistance

12. After the 1 hour recovery time, pellet the cells by centrifugation at 3000 x g for 5 minutes at room temperature.

13. Discard the supernatant

14. Resuspend the cell pellet in 1 ml of YPD broth

15. Using a sterile spreader, plate the entire transformation on appropriate plates containing antibiotics (200 ug/ml G418)

16. Incubate the plates for 2 to 4 days at 30°C


### Results

**Figure 1.** HO-Poly-KanMX4-HO restriction digestion results: Lane 1 - 1kb plus ladder, Lane 2 - control uncut plasmid, Lane 3 - plasmid cut with NdeI

<div class="notebook-img-row">A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11dup-fig2a.avif" alt="Figure 2A. S. cerevisiae recombineering, ISD1" style="width:47.0%" loading="lazy" />B)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11dup-fig2b.avif" alt="Figure 2B. S. cerevisiae recombineering, ISD2" style="width:45.0%" loading="lazy" /></div>

C\) <img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp11dup-fig2c.avif" alt="Figure 2C. S. cerevisiae recombineering, ISD3" style="width:46.0%" loading="lazy" />

**Figure 2.** Dsup-related S.cerevisiae recombineering results: A) ISD1 B) ISD2 C) ISD3


## Experiment #12

**Dates:** 26.08-28.08
**Title of Experiment:** S.cerevisiae episomal transformation (SC1, SC2, SC3, SAF2, SAL2)

### Part 1: Heat Shock Transformation

1.  For each transformation, thaw one tube of competent cells at room temperature and aliquot 50 µl into a sterile microcentrifuge tube

2.  Add 1 µg of vector DNA to the competent cells

**Note:** While you can get positive colonies with as little as 10 ng to 25 ng, using around 1 µg ensures a high colony count. Increasing the amount past 1 µg does not significantly increase the number of transformants because efficiency stops increasing linearly.

3.  Add ~360 µl of transformation mix, consisting of:

- 240 µl PEG 3350 [50% (w/v)]

- 36 µl LiAc (1.0 M, 10x stock)

- 50 µl salmon sperm single-stranded DNA (10.0 mg/ml) boiled for 10 min at 95 C

- 46.6 µl plasmid DNA

Mix DNA and salmon sperm ssDNA first → add the competent cells → add the rest of the components

4.  Incubate the transformation reactions for 30 min at 30°C, 200 rpm

5.  Add molecular biology-grade DMSO to a final concentration of 10% (42 µl), mix by gentle inversion

6.  Heat shock for 15-30 min at 42 °C (30 min was used this time)

7.  Chill on ice for 2 min

8.  Centrifuge for 15 sec at 14000 rpm

9.  Remove the supernatant

10. Add 1 ml of YPD (or YPAD if using the yeast strain L40) to each tube.

11. Incubate the cells in a 30°C shaker for 30 min

12. Using a sterile spreader, plate the entire transformation on Sc-Ura agar plates

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr>
<td><strong>Sc-Ura agar recipe</strong></td>
</tr>
<tr>
<td><p>For 1 L media:</p>
<ol type="1">
<li><p>Add 6.7 g of YNB w/ Ammonium Sulfate (w/o amino acids)</p></li>
<li><p>Add 1.92 g of -Ura Mix</p></li>
<li><p>Add 20 g bacto agar (2% w/v) for solid plate support</p></li>
<li><p>Add 900 ml MilliQ water and autoclave the mixture</p></li>
<li><p>Once the mixture cools down, add 2% (w/v) D-glucose from a filter-sterilized solution (Ex: If stock is 20%, add 100 ml)</p></li>
<li><p>Pour the plates</p></li>
</ol></td>
</tr>
</tbody>
</table>

13. Incubate the plates for 3-4 days at 30°C


### Results

**Figure 1.** S.cerevisiae payloads episomal transformation results after 3 days of incubation: A) 250 ul of ISC1, B) 100 ul of ISC1, C) 250 ul of ISC2, D) 100 ul of ISC2, E) 250 ul of ISC3, F) 100 ul of ISC3, G) 250 ul of SAF2, H) 100 ul of SAF2, I) 250 ul of SAL2, J) 100 ul of SAL2



## Experiment #13

**Dates:** _(not recorded)_
**Title of Experiment:** P.pastoris methanol induction of IPD1 and IPD2

### Part 1: 0.5% Methanol Induction

1.  Using a single colony inoculate from the plate in 20 ml of BMGY and grow at 30C overnight - for 1 day

2.  Centrifuge the cells at 1500 rpm for 5 min

3.  Resuspend the pellet with 20-50 ml BMMY and transfer in sterile flasks

4.  Feed cells with 0.5% methanol every day for 1-4 days

### Part 2: 1% Methanol Induction

Same as above, but feed cells with 1% methanol instead

### Part 2: Sample Collection

1.  Take 1 ml of cell culture from the following samples: wt, uninduced, and every day of induction

2.  Centrifuge at max speed, 4C, 10 min

3.  Discard the supernatant

4.  Store pellets at -80C

### Part 3: SDS-PAGE

1.  Use 10 ul of the cell pellet sample and dilute it with 100 ul of milliQ water

2.  Add SDS sample dye to dilute it to 1x (Ex: for 4x dye, add 33.5 ul to the gel sample)

### Results

**Figure 1.** Visual representation of the ce A) 0.5% methanol induction for 2 days B) 1% methanol induction for 2 days


## Experiment #14

**Dates:** _(not recorded)_
**Title of Experiment:** P.pastoris methanol induction of IPC1 and IPBSA

### Part 1: 0.5% Methanol Induction

### Part 2: Sample Collection

### Part 3: SDS-PAGE of the IPBSA Sample

### Part 4: Fluorescent Microscopy of the IPC1 Sample

### Results

A)<img src="https://static.igem.wiki/teams/6341/wiki/notebook/exp14-fig1a.avif" alt="Figure 1A. IPC1 mutants, 0.5% methanol induction, 2 days (panel B was never embedded in the source document)" style="width:56.7%" loading="lazy" /> B)

**Figure 1.** Fluorescent imaging of IPC1 mutants after A) 0.5% methanol induction for 2 days B) 1% methanol induction for 2 days

Fluorescence microscopy confirmed that induction with 0.5% (v/v) methanol yielded noticeably higher fluorescence intensity in the transformed mutants compared to induction with 1.0% (v/v) methanol. Hence, for the further experiments, 0.5% concentration was used for induction of other constructs.

The detection of intracellular mCherry fluorescence confirms successful expression of the target fusion protein. The expression cassette was driven by the standard methanol-inducible AOX1 promoter ( pAOX1 ) and terminated by the AOX1 transcription terminator. These regulatory elements are widely utilized for industrial protein production in Pichia pastoris . The construct encodes a codon-optimized mCherry variant, which contains a C-terminal 3C protease recognition site followed by a 6x His tag. Because expression was directly verified via fluorescence imaging, western blot was considered unnecessary for this plasmid.

Furthermore, the cells retained their characteristic overall morphology with no apparent signs of cellular stress or lysis. This indicates that the observed color alteration of the culture medium following induction did not compromise cell viability, as was hypothesized initially.

Following a five-day methanol induction (0.5%–1.0% v/v), a distinct phenotypic divergence was observed: cultures transformed with a BSA control maintained standard clarity, whereas those harboring pPICZ-based constructs exhibited progressive dark red-brown discoloration in both the broth and cell pellet. Although toxicity from the strong pAOX1 cassette was initially suspected, automated cell counting and microscopy confirmed stable cell density, intact morphology, and high viability across all conditions, ruling out promoter-mediated cell death. Instead, the discoloration stems from the ade2 -deficient genetic background of the PichiaPink host; unlike the BSA construct which utilized a pPINK vector carrying functional ADE2 complementation (yielding white cells), the pPICZ vector leaves the strain auxotrophic, leading to the vacuolar accumulation of phosphoribosylaminoimidazole (AIR). Under prolonged induction, elevated peroxisomal reactive oxygen species (ROS) and ambient aeration promote the oxidative polymerization of these purine precursors into brown pigments. Consequently, while 5-day post-induction BSA samples are being prepared for SDS-PAGE analysis to evaluate protein yield, subsequent pPICZ cultures will be supplemented with exogenous adenine to suppress metabolic flux through the truncated purine pathway and eliminate pigment formation.

## Experiment #15

**Dates:** September 1st, 26
**Title of Experiment:** FUN-1 staining and Radiation treatment

**5 Treatments × 4 Cell Types with Protein, RNA, Plating, and Viability Analysis**

### Experiment Overview

This protocol describes how to grow S. cerevisiae (4 cell types: WT, M1, M2, M3) to late log phase, expose cells to ionizing radiation (Mock, 500Gy, 1000Gy, 1500Gy, 2000Gy), and assess cell viability using FUN-1 dye staining in a 96-well plate reader. Cells will also be harvested for RNA extraction, protein extraction, and dilution plating.

### Key Parameters

|  |  |
|----|----|
| **Cell types** | WT, M1, M2, M3 (separate cultures, 7 mL each) |
| **Overnight cultures dilution** | 1:10 into fresh YPD |
| **Target late log density** | OD600 ≈ 0.8-1.0 |
| **Tube type for irradiation** | 2 mL sterile Eppendorf tubes |
| **Volume per irradiation tube** | 1.2 mL (leaves 0.8 mL headspace for 6h irradiation) |
| **Total cells per tube** | ~9.6 × 10^6 cells |
| **Irradiation duration** | 6 hours |
| **Post-irradiation recovery** | 15 minutes at 30°C |
| **Number of irradiation tubes** | 20 total (4 cell types × 5 treatments) |
| **FUN-1 readout** | 96-well plate reader (100 µL per well, triplicates = 300 µL per sample) |

### Phase 1: Culture Preparation (Day 1)

#### Step 1.1: Prepare Overnight Culture

1.  **Timeline:** 16-18 hours before dilution (Evening Day 1)

> **Materials needed:** 4 cell type starter cultures (WT, M1, M2, M3), YPD broth, 4 × 50 mL Erlenmeyer flasks or culture tubes

2.  Label 4 flasks: "WT overnight", "M1 overnight", "M2 overnight", "M3 overnight"

3.  Add 3 mL of sterile YPD broth to each flask

4.  Inoculate each flask with its corresponding cell type (single colony from plate or small inoculum)

5.  Cap loosely (allow gas exchange)

6.  Incubate overnight at 30°C with shaking at 200 rpm for 16-18 hours

7.  Check cultures the next morning (should reach OD600 ≈ 0.8)

### Phase 2: Day Culture Preparation (Morning Day 2)

#### Step 2.1: Prepare Day Cultures with 1:10 Dilution

1.  Timeline: 12-14 hours before irradiation (typically 8:00 AM)

> **Materials needed:** Overnight cultures (OD600 ≈ 0.8), sterile YPD broth, 4 × 100 mL Erlenmeyer flasks, spectrophotometer for OD measurement

2.  1:10 dilution calculation:

<table style="width:95%;">
<colgroup>
<col style="width: 47%" />
<col style="width: 47%" />
</colgroup>
<tbody>
<tr>
<td><blockquote>
<p>Overnight culture (at OD 0.8)</p>
</blockquote></td>
<td>1 mL per cell type</td>
</tr>
<tr>
<td><blockquote>
<p>Fresh YPD broth</p>
</blockquote></td>
<td>9 mL per cell type</td>
</tr>
<tr>
<td><blockquote>
<p>Final volume</p>
</blockquote></td>
<td>10 mL per cell type</td>
</tr>
<tr>
<td><blockquote>
<p>Starting OD of day culture</p>
</blockquote></td>
<td><blockquote>
<p>0.08</p>
</blockquote></td>
</tr>
</tbody>
</table>

3.  Measure OD600 of each overnight culture (should be OD 0.8-1.0)

4.  Label 4 fresh flasks: "WT day", "M1 day", "M2 day", "M3 day"

5.  Pour 9 mL of sterile YPD broth into each flask

6.  Add 1 mL of each overnight culture to its corresponding day culture flask (1:10 dilution)

7.  Gently swirl to mix

8.  Cap loosely and incubate at 30°C with shaking at 200 rpm

9.  Set timer for ~10-12 hours growth

#### Step 2.2: Monitor Growth (Every 2-3 Hours Starting at 6h)

1.  Every 2-3 hours starting at 6h, measure OD600 of all 4 cultures

2.  Record measurements (track WT, M1, M2, M3 separately)

3.  Expected progression: 0h = OD ~0.08 → 6h = ~0.2-0.3 → 10h = ~0.6-0.8

4.  STOP shaking when all cultures reach OD 0.8-1.0 (late log phase)

5.  If strains grow at different rates, wait until all reach OD 0.8 before harvesting

### Phase 3: Cell Harvesting & Irradiation Tube Preparation

1.  Label 20 sterile 2 mL Eppendorf tubes and add 1200uL of cell suspension in each of themL

> For 4 cell types (WT, M1, M2, M3): 5 treatments × 4 strains = 20 tubes total
>
> Each tube receives 1.2 mL cells (9.6 × 10^6 cells), leaving 0.8 mL headspace

2.  Irradiate Cells

> **Mock tubes (WT, M1, M2, M3):** No irradiation (sham treatment)
>
> **500 tubes (WT, M1, M2, M3)**
>
> **1000 Gy tubes (WT, M1, M2, M3)**
>
> **1500 Gy tubes (WT, M1, M2, M3)**
>
> **2000 Gy tubes (WT, M1, M2, M3)**

3.  Recovery Incubation: 15 minutes after irradiation

4.  Transfer all 20 tubes to a 30°C water bath or incubator

5.  Divide Cells for Downstream Analysis. IMPORTANT: Perform all sampling within 20 minutes to maintain consistency

|  |  |  |  |
|----|----|----|----|
| **Analysis Type** | **Volume (µL)** | **Cells (approx.)** | **Storage/Use** |
| **Plating (dilution series)** | 20 | 1.6 × 10^5 | Use immediately |
| **FUN-1 Viability (96-well plate)** | 100 | 2.4 × 10^6 | Use immediately |
| **RNA Extraction** | 500 | 4.0 × 10^6 | Freeze at -80°C in RNA lysis buffer |
| **Protein Extraction** | 500 | 2.8 × 10^6 | Freeze at -80°C or use immediately |

6.  Prepare Dilution Series (Per Sample)

7.  YPD agar plates

8.  You have 20 µL per treatment. Prepare serial dilutions for each sample:

|               |                      |                |                           |
|---------------|----------------------|----------------|---------------------------|
| **Dilution**  | **Cells added (µL)** | **Media (µL)** | **Final dilution factor** |
| **Undiluted** |                      | 0              | **10^0**                  |
| **10^-1**     | 100 from undiluted   |                | **10^-1**                 |
| **10^-2**     | 100 from 10^-1       |                | **10^-2**                 |
| **10^-3**     | 100 from 10^-2       |                | **10^-3**                 |
| **10^-4**     | 100 from 10^-3       |                | **10^-4**                 |

9.  Plate 100 µL from each dilution on YPD agar plates

10. Label plates with cell type, treatment, dilution, and date

11. Incubate agar plates at 30°C for 24-48 hours

### Phase 7: FUN-1 Viability Staining for 96-Well Plate Reader

### Preparation of 10 mL Na-HEPES 1 M (pH 7.2)

**Molecular weight: Na-HEPES = 260.29 g/mol**

#### Calculation

- For 1 M × 10 mL = 10 mmol

- Need: 2.6 g Na-HEPES

#### Steps

1.  Weigh out 2.6 g Na-HEPES powder (use analytical balance)

2.  Add to ~8 mL sterile distilled water in a clean beaker

3.  Stir until completely dissolved

4.  Check pH with pH meter - should be around 7.2 already

5.  If needed, adjust pH:

    - Too low: Add drop of 1 M NaOH

    - Too high: Add drop of 1 M HCl

6.  Transfer to sterile 10 mL tube/bottle

7.  Make up to 10 mL with sterile water

8.  Sterilize: 0.2 µm filter sterilize into sterile container (OR autoclave)

### Storage

- Temperature: Room temperature OR 4°C

- Container: Sterile, sealed tube

- Light: Protect from direct light

- Stability: 6-12 months at room temperature, longer at 4°C

- Check pH before use

### Phase 6: FUN-1 Plate Reader Assay (96-Well)

#### Step 6.1: Prepare Staining Buffer (Base)

For **25 mL staining buffer:**

- **24.25 mL** sterile 0.2 µm-filtered water

- **0.5 mL** D-glucose 20% stock (= 2% final, ≈410 g/L)

- **0.25 mL** Na-HEPES 1 M pH 7.2 (= 10 mM final)

**NOTE:** Do NOT use PBS. Phosphate decreases staining efficiency.

2.  Cap and invert 5 times (do NOT vortex)

3.  Allow to equilibrate to room temperature

4.  Can store at 4°C for 1 week if not used immediately

5.  Prepare FUN-1 Master Mix (for all 20 samples + 5 extra). Master Mix Calculation:

<table style="width:95%;">
<colgroup>
<col style="width: 47%" />
<col style="width: 47%" />
</colgroup>
<tbody>
<tr>
<td><blockquote>
<p>Staining buffer</p>
</blockquote></td>
<td>24,975 µL (≈25 mL)</td>
</tr>
<tr>
<td><blockquote>
<p>FUN-1 10 mM stock</p>
</blockquote></td>
<td>25 µL</td>
</tr>
<tr>
<td><blockquote>
<p>Final concentration</p>
</blockquote></td>
<td><ol type="1">
<li><p>10 µM</p></li>
</ol></td>
</tr>
</tbody>
</table>

6.  Remove FUN-1 stock from -20°C, warm to room temperature (~5 min)

7.  Centrifuge FUN-1 vial briefly (3 min, 10,000 × g)

8.  Cap and invert gently 8-10 times to mix (do NOT vortex)

9.  Keep at room temperature in dark (wrap in foil)

10. Use within 30 minutes

#### Step 6.3: Concentrate Cells and Aliquot FUN-1 Master Mix

1.  Take 100 µL of irradiated cells per sample

2.  Transfer each to a sterile microcentrifuge tube

3.  Centrifuge all 20 tubes at 10,000 × g for 5 minutes

4.  Discard supernatant from all tubes

5.  Add exactly 650 µL of FUN-1 master mix to each cell pellet (20 tubes)

6.  Gently resuspend each by pipetting up/down 4-5 times (do NOT vortex)

7.  Aliquot 200uL in each well Black 96-well plate (clear bottom), multichannel pipette

Stain samples at 30 min in dark at 30°C with agitation. Mixing every 5-10 minutes, gently invert all tubes 4-5 times (keep cells in suspension)

9.  Cover plate with adhesive seal

10. 33\. WAIT 30 MINUTES at room temperature in dark before reading

11. Subsequently incubate the plates at 30°C on a rotating shaker (300 rpm) and read every 10 minutes for 1 hour.

12. 12\. Calculate the red/green fluorescence ratio for each well by first subtracting the fluorescence of the wells containing dye and inhibitor (average of rows F and G) at each time point.

#### Step 6.6: Configure Plate Reader

Settings:

|                    |                 |               |
|--------------------|-----------------|---------------|
| Measurement        | Excitation (nm) | Emission (nm) |
| DEAD cells (green) | 485             | 530           |
| LIVE cells (red)   | 485             | 620           |

> 34\. Set to fluorescence mode (dual-wavelength)
>
> 35\. Read height: 80-85% well depth (bottom)
>
> 36\. Gain/PMT voltage: 60-70% (optimize per background)
>
> 37\. Averaging: minimum 10 flashes per well
>
> 38\. Temperature: 30°C if reader has temperature control

#### Step 6.7: Run Plate Reader & Analyze

> 39\. Load 96-well plate (after 30 min rest)
>
> 40\. Read fluorescence (RFU) for all wells at 530 nm (green) and 620 nm (red)
>
> 41\. Export data as CSV/Excel
>
> 42\. Calculate per sample: Red/Green fluorescence ratio = (Red RFU) / (Green RFU)
>
> 43\. Calculate % viability = (Red) / (Red + Green) × 100
>
> 44\. Average 3 replicates for each treatment
>
> 45\. Plot % viability for each cell type across 5 doses (Mock, 500Gy, 1000Gy, 1500Gy, 2000Gy)

### Summary: Cell Allocation per Tube

**For each of 20 irradiation tubes (1.2 mL at OD 0.8 ≈ 9.6 × 10^6 cells):**

|  |  |  |  |
|----|----|----|----|
| **Experiment** | **Volume (µL)** | **Cells** | **Step reference** |
| **Plating (dilution series)** | **20** | **1.6 × 10^5** | **Phase 6** |
| **FUN-1 (96-well, 100 µL/well × 3 replicates)** | **300** | **2.4 × 10^6** | **Phase 7-8** |
| **RNA extraction** | **500** | **4.0 × 10^6** | **Phase 9.1** |
| **Protein extraction** | **350** | **2.8 × 10^6** | **Phase 9.2** |
| **TOTAL USED** | **1170** | **9.6 × 10^6** | **—** |
|  |  |  |  |
