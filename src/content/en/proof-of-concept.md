## Select

### Identifying suitable microbial chassis

<span class="chip">Dry lab point of view</span>

#### Objective

To compare microbial production capabilities under different oxygen conditions.

#### Achievement

We used genome-scale metabolic models and flux balance analysis (FBA). Our simulations predicted that *B. subtilis* could retain more nanobody-production capacity than *S. cerevisiae* when oxygen was limited and nitrate was supplied.

<div class="stat-grid">
<div class="hi"><strong>≈3.4×</strong><span>Maximum predicted nanobody production flux in <i>B. subtilis</i>, relative to <i>S. cerevisiae</i> (tested constraints)</span></div>
<div><strong>~46%</strong><span>Predicted production capacity lost when oxygen was removed: <i>B. subtilis</i></span></div>
<div><strong>~82%</strong><span>Predicted production capacity lost when oxygen was removed: yeast</span></div>
</div>

These results suggest *B. subtilis* as a promising chassis under oxygen-limited conditions.

## Engineer

### Exploring three microbial production platforms

<span class="chip">Wet lab point of view</span>

#### Objective

To investigate microbial platforms suitable for recombinant protein production and potential operation under challenging environmental conditions.

#### Achievement

We explored different chassis to assess their fitness for SHIHAB. We worked with three microbial chassis: *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Pichia pastoris*. These organisms offer complementary characteristics, for example, *B. subtilis* is a bacterial host with secretion capabilities and the ability to form resistant spores; *S. cerevisiae* and *P. pastoris* are eukaryotic hosts with established applications in recombinant protein production.

<div class="figure-grid" style="--cols: 3; --fig-h: 300px; --fig-fit: cover;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig1-bsubtilis-lb-agar.avif" alt="Colonies of B. subtilis on an LB agar plate" loading="lazy"></div><figcaption class="caption"><strong>Figure 1.</strong> <i>B. subtilis</i> on LB agar.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig2-ppastoris-ypd-agar.avif" alt="P. pastoris growing on a YPD agar plate" loading="lazy"></div><figcaption class="caption"><strong>Figure 2.</strong> <i>P. pastoris</i> growth on YPD agar.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig3-scerevisiae-ypd-agar.avif" alt="S. cerevisiae colonies on a YPD agar plate" loading="lazy"></div><figcaption class="caption"><strong>Figure 3.</strong> <i>S. cerevisiae</i> colonies on YPD agar.</figcaption></figure>
</div>

### Genomic integration of Dsup

#### Objective

To develop a genomic integration strategy using homologous recombination, targeting selected chromosomal loci specific to each chassis.

#### Achievement

We verified Dsup expression using western blot with an anti-Myc antibody. SDS-PAGE analysis detected a DSUP-MYC band at approximately 43 kDa in mutant *S. cerevisiae* and *B. subtilis* transformants, confirming successful expression of the tagged construct. Wild-type controls showed no corresponding band.

Radiation resistance was subsequently tested by exposing engineered and wild-type cells to UV radiation at different doses using a UV crosslinker. Wild-type cells served as the negative control.

<div class="figure-grid">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig4a-ppastoris-dsup-transformants.avif" alt="P. pastoris transformants on a YPD plate with 100 µg/ml zeocin, containing WT Dsup" loading="lazy"></div></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig4b-scerevisiae-dsup-recombineering.avif" alt="S. cerevisiae recombineering results for WT Dsup" loading="lazy"></div></figure>
</div>

<div class="caption">

**Figure 4.** A. *P. pastoris* transformants on YPD + 100 ug/ml zeocin plates containing WT Dsup. B. *S. cerevisiae* recombineering results for WT Dsup.

</div>

<div class="figure-grid single">
<figure><div class="photo-frame light"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig5-dsup-myc-western-blot.avif" alt="Western blot membrane showing detection of Myc-tagged Dsup in wild-type and mutant B. subtilis" loading="lazy"></div><figcaption class="caption"><strong>Figure 5.</strong> Example of antibody Detection of Myc tagged Dsup in wild type and mutant <i>B. subtilis</i></figcaption></figure>
</div>

<div class="chip-row">
<span class="chip amber">Rows, top to bottom</span>
<span class="chip">Mock (0 J/m²)</span>
<span class="chip">60 J/m²</span>
<span class="chip">120 J/m²</span>
<span class="chip">180 J/m²</span>
<span class="chip">240 J/m²</span>
<span class="chip">300 J/m²</span>
</div>

<span class="chip">Wild-type</span>

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig6-spot-dilution-wt.avif" alt="Spot dilution assay plates of wild-type B. subtilis after UV irradiation, one row per dose, with the number of dilutions showing growth written at the end of each row" loading="lazy"></div></figure>
</div>

<span class="chip">Dsup</span>

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig6-spot-dilution-dsup.avif" alt="Spot dilution assay plates of Dsup-expressing B. subtilis after UV irradiation, one row per dose, with the number of dilutions showing growth written at the end of each row" loading="lazy"></div></figure>
</div>

<div class="caption">

**Figure 6. Example of spot dilution assay for *B. subtilis* WT and Dsup after UV irradiation at 0, 60, 120, 180, 240 and 300 J/m².** Each row corresponds to one dose and each spot to a ten-fold dilution, with three technical replicates per strain. The fraction at the end of each row gives the number of dilutions showing growth.

</div>

## Produce

### Recombinant production of therapeutic and functional payloads

#### Objective

To purify protein targets, including:

- Nanobodies targeting herpes simplex virus glycoprotein B and PD-L1, reflecting possible future applications in space-related healthcare
- Antifreeze proteins FfIBP and LeIBP, as candidates for low-temperature protection and biological preservation

#### Achievement

We performed recombinant protein production experiments for *P. pastoris* and *B. subtilis*. Expression was assessed through SDS-PAGE, fluorescence imaging, and functional assays where applicable.

<div class="figure-grid single wide">
<figure><div class="photo-frame light"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig7-nb1-ghsv-coomassie.avif" alt="Coomassie-stained SDS-PAGE gel of His-trap purified secreted Nb1_gbHSV from Pichia" loading="lazy"></div><figcaption class="caption"><strong>Figure 7.</strong> Coomassie staining of His-trap purified secreted Nb1_gbHSV from <i>Pichia</i>.</figcaption></figure>
</div>

<div class="figure-grid">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig8-ffibp-sds-page-a.avif" alt="SDS-PAGE gel of secreted FfIBP from the ÄKTA HisTrap purification: flow-through, wash and elution lanes 1 to 4, with bands near 30 kDa in lanes 3 and 4" loading="lazy"></div></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/fig8-ffibp-sds-page-b.avif" alt="SDS-PAGE gel of secreted FfIBP from the ÄKTA HisTrap purification, lanes 5 to 10, with a band near 30 kDa in lane 5" loading="lazy"></div></figure>
</div>

<div class="caption">

**Figure 8.** SDS-PAGE gel of secreted FfIBP AKTA HisTrap purification

</div>

To learn further about our experiments and outcomes, go to our [Notebook](/kaust-ksa/notebook) or [Results](/kaust-ksa/results) page.

## Control

### Building and testing a compact bioreactor

#### Objective

- To design, assemble, and experimentally evaluate a prototype capable of acting autonomously, incorporating environmental monitoring, mixing, temperature regulation, and automated control.

#### Achievements

1. The assembled bioreactor incorporated temperature and pH sensors, a motor-driven stirring mechanism, electronic control components, and a touchscreen interface. The final prototype measured approximately 20 × 24 × 31 cm, weighed 2.2 kg, and used a 30 W power supply.
2. We evaluated the bioreactor's temperature-control performance by heating water from 18 °C to a target of 36 °C. The system reached the setpoint in approximately 34 minutes and maintained a steady-state temperature of 35.97 °C (standard deviation ≈ 0.03 °C), demonstrating stable thermal regulation under tested conditions.
3. We investigated the system's ability to detect pH changes by introducing acidic and basic solutions. The sensor responded and stabilized within approximately 1-2 minutes. pH monitoring was demonstrated; automated correction to a specified setpoint remains a separate capability requiring further validation.
4. We performed a 10-hour experiment using *Escherichia coli*. Growth was monitored by optical density at 600 nm. The culture exhibited a characteristic growth profile and reached an OD600 of approximately 0.49.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/hardware/desert-test.webp" alt="The real SHIHAB set-up on a folding table in the desert: the bioreactor, syringe pumps and tubing, with sand dunes behind" loading="lazy"></div><figcaption class="caption"><strong>Figure 9. We took SHIHAB to the desert!</strong> The real set-up, with the bioreactor and the syringe pumps, tested out on the dunes, exactly the kind of remote place it is built for.</figcaption></figure>
</div>

<div data-slot="temp-chart"></div>

<div class="caption">

**Figure 10. The temperature reached 36 °C and was then held steady.** Full temperature profile of the water, heated from 18 °C to the setpoint with simple on/off control.

</div>

<div data-slot="ph-chart"></div>

<div class="caption">

**Figure 11. The pH sensor tracked the changes caused by adding acid and base.** Response of the pH sensor to sudden changes in pH.

</div>

<div data-slot="growth-chart"></div>

<div class="caption">

**Figure 12. *E. coli* grew in a sigmoidal curve to an OD₆₀₀ of about 0.49 over 10 hours.** Growth curve from the SHIHAB bioreactor, obtained via periodic blank-corrected OD₆₀₀ measurements.

</div>

### Developing downstream protein-recovery components

#### Objective

- To develop modular filtration and automate liquid-handling components intended to support downstream protein recovery.

#### Achievements

1. We investigated a multi-step filtration design using filters with pore sizes of 500 µm, 11 µm, and 0.2 µm. Through successive design iterations, we addressed challenges involving leakage, clogging, and fluid handling. The final gasket-sealed assembly processed 500 mL of culture at 240 mL/min without observed leakage at module joints. Successive filtration stages produced visibly clearer filtrate, showing mechanical and operational viability.
2. We developed a syringe-pump-based system for automated buffer delivery and liquid routing during protein purification. The design incorporated stepper motors, syringe mechanisms, limit switches, and flow routing components. Tests investigated liquid dispensing, filling cycles, syringe positioning, and routing between collection and waste pathways.

<div class="figure-grid" style="--cols: 3; --fig-h: 260px; --fig-fit: contain;">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/filtration-filtrate-tubes.avif" alt="Three centrifuge tubes held in a gloved hand: the left one cloudy with the initial yeast mixture, and the middle and right ones progressively clearer" loading="lazy"></div><figcaption class="caption"><strong>Figure 13. More filtration stages gave clearer filtrate.</strong> Left to right: initial yeast mixture, after two stages of filtration, after three stages of filtration.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/syringe-pump-cad.avif" alt="CAD model of the syringe pump option: four reservoir bottles on a frame with stepper motors and lead screws mounted on wooden side supports" loading="lazy"></div><figcaption class="caption"><strong>Figure 14. The syringe pump option moves the plungers with stepper motors and lead screws.</strong> CAD model of the syringe pump design.</figcaption></figure>
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/syringe-pump-prototype.avif" alt="Two limit switches mounted on a perforated metal bracket behind the syringes, next to a lead screw and the 3D-printed plunger holders" loading="lazy"></div><figcaption class="caption"><strong>Figure 15. Limit switches behind the syringes set the home position.</strong></figcaption></figure>
</div>

## Explore

### Investigating resource-sharing microbial systems

#### Objective

To investigate whether SHIHAB could reduce dependence on externally supplied resources.

<div class="callout warn">

<p class="callout-label">Achievement in progress</p>

We modeled a possible partnership with *Synechococcus elongatus* PCC 7942. This cyanobacterium was assessed as a potential source of sucrose and oxygen for the production chassis. Simulations suggested that adjusting cyanobacterial growth allocation could increase predicted sucrose export and improve partner organism growth. These findings support further exploration of resource-sharing systems; they do not demonstrate an experimentally operating co-culture.

</div>

### Discovering new stress-resistance candidates

#### Objective

To develop a computational screening pipeline to investigate stress-associated proteins from harsh environments on Earth.

<div class="callout warn">

<p class="callout-label">Achievement in progress</p>

Using 1,221 metagenomic datasets, the pipeline identified 20,962 initial stress-associated gene calls from Rub’ al Khali desert. We combined functional annotation, physicochemical characterization, conservation analysis, structural prediction, and source quality assessment to prioritize candidates. After screening and auditing, 45 candidates remained, of which 19 met our final sequence-level criteria for synthesis prioritization. These candidates have not yet been experimentally expressed or validated; their selection represents computational prioritization, not proof of biological function.

</div>

## Next steps

We investigated microbial genetic engineering and recombinant protein production, built and tested a controlled cultivation platform, developed downstream-processing components, and used computational tools to guide future improvements.

Although our results establish important components of SHIHAB, several requirements remain before the platform can be considered ready for practical deployment. The most critical next step is demonstrating the complete production workflow using an engineered SHIHAB chassis inside the automated bioreactor, followed by recovery and functional characterisation of the target recombinant protein. Additional work is required to:

- Evaluate long-term bioreactor operation and control-system reliability
- Validate biological performance of SHIHAB chassis under relevant environmental stresses
- Assess product quality and implement appropriate biosafety measures
- Experimentally test computational predictions on oxygen limitation, co-culture resource supply, and desert-derived stress-protection proteins

SHIHAB represents a step toward adaptable biomanufacturing for environments where conventional production and supply systems may be difficult to sustain.
