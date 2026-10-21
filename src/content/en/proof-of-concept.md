## Preserve

### Recovering engineered cells from spores

<span class="chip">Wet lab point of view</span>

#### Objective

To investigate whether genetically modified *Bacillus subtilis* can be recovered from spores and retain its ability to produce recombinant proteins.

#### Achievement

We recovered genetically modified *B. subtilis* from spores and demonstrated that the resulting cultures could grow and produce GFP as a model recombinant protein.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/preserve-spore-recovery-gfp.avif" alt="A smartphone photo of B. subtilis taken through a microscope eyepiece, beside two charts: absorbance at OD600 and GFP fluorescence over time, each for Bacillus with IPTG, Bacillus without IPTG and plain LB, with the moment IPTG was added marked" loading="lazy"><figcaption class="caption"><strong>Figure 1. Cells recovered from spores grew and expressed GFP after induction.</strong> Microscopic image of <i>B. subtilis</i> captured using a smartphone through the microscope eyepiece. The plots show bacterial growth before and after IPTG induction, alongside GFP fluorescence intensity as an indicator of protein expression.</figcaption></figure>
</div>

## Select

### Exploring three microbial production platforms

<span class="chip">Wet lab point of view</span>

#### Objective

To investigate microbial platforms suitable for recombinant protein production and potential operation under challenging environmental conditions.

#### Achievement

We explored different chassis to assess their fitness for SHIHAB. We worked with three microbial chassis: *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Pichia pastoris*. These organisms offer complementary characteristics, for example, *B. subtilis* is a bacterial host with secretion capabilities and the ability to form resistant spores; *S. cerevisiae* and *P. pastoris* are eukaryotic hosts with established applications in recombinant protein production.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/select-three-chassis-plates.avif" alt="Three agar plates side by side, labeled Bacillus subtilis, Pichia pastoris and Saccharomyces cerevisiae" loading="lazy"><figcaption class="caption"><strong>Figure 2. All three candidate chassis grew on their standard media.</strong> <i>B. subtilis</i> on LB agar, <i>P. pastoris</i> and <i>S. cerevisiae</i> on YPD agar.</figcaption></figure>
</div>

### Genomic integration of Dsup

#### Objective

To develop a genomic integration strategy using homologous recombination, targeting selected chromosomal loci specific to each chassis.

#### Achievement

We verified Dsup expression using western blot with an anti-Myc antibody. SDS-PAGE analysis detected a DSUP-MYC band at approximately 43 kDa in mutant *S. cerevisiae* and *B. subtilis* transformants, confirming expression of the tagged construct. Wild-type controls showed no corresponding band.

Radiation resistance was subsequently tested by exposing engineered and wild-type cells to UV radiation at different doses using a UV crosslinker. Wild-type cells served as the negative control.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/select-dsup-western-blots.avif" alt="Western blots with an arrow marking Dsup-Myc at about 43 kDa: an upper blot with B. subtilis and S. cerevisiae wild-type and mutant lanes, and a lower blot with P. pastoris mutant and wild-type lanes, beside an agar plate of colonies" loading="lazy"><figcaption class="caption"><strong>Figure 3. The Dsup-Myc band appears in the mutants and not in the wild-type controls.</strong> Western blot detection of Myc-tagged Dsup in the three microbial chassis: <i>B. subtilis</i>, <i>S. cerevisiae</i>, and <i>P. pastoris</i>. The accompanying agar plate shows a representative example of microbial growth.</figcaption></figure>
</div>

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/select-uv-spot-dilution.avif" alt="Spot dilution assay plates for B. subtilis WT and Dsup, three replicates each, one row per UV dose from 0 to 300 J/m², with the number of dilutions showing growth written at the end of every row" loading="lazy"><figcaption class="caption"><strong>Figure 4.</strong> Example of spot dilution assay for <i>B. subtilis</i> WT and Dsup after UV irradiation at 0, 60, 120, 180, 240 and 300 J/m². Each row corresponds to one dose and each spot to a ten-fold dilution, with three technical replicates per strain. The fraction at the end of each row gives the number of dilutions showing growth.</figcaption></figure>
</div>

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/select-uv-growth-curves.avif" alt="Two line charts of normalized OD600 over 60 minutes, one for wild-type and one for Dsup B. subtilis, with one line per UV dose from 0 to 300 J/m²" loading="lazy"><figcaption class="caption"><strong>Figure 5.</strong> Normalized OD₆₀₀ of wild-type (WT) and Dsup-expressing <i>B. subtilis</i> over 60 minutes following UV irradiation at doses of 0, 60, 120, 180, 240, and 300 J/m². Measurements were performed without resazurin and normalized to the initial OD₆₀₀ at t = 0.</figcaption></figure>
</div>

## Grow

### Building and testing a compact bioreactor

<span class="chip amber">Hardware point of view</span>

#### Objective

- To design, assemble, and experimentally evaluate a prototype capable of acting autonomously, incorporating environmental monitoring, mixing, temperature regulation, and automated control.

#### Achievements

1. The assembled bioreactor incorporated temperature and pH sensors, a motor-driven stirring mechanism, electronic control components, and a touchscreen interface. The final prototype measured approximately 20 × 24 × 31 cm, weighed 2.2 kg, and used a 30 W power supply.
2. We evaluated the bioreactor's temperature-control performance by heating water from 18 °C to a target of 36 °C. The system reached the setpoint in approximately 34 minutes and maintained a steady-state temperature of 35.97 °C (standard deviation ≈ 0.03 °C), demonstrating stable thermal regulation under tested conditions.
3. We investigated the system's ability to detect pH changes by introducing acidic and basic solutions. The sensor responded and stabilized within approximately 1-2 minutes. pH monitoring was demonstrated; automated correction to a specified setpoint remains a separate capability requiring further validation.
4. We performed a 10-hour experiment using *Escherichia coli*. Growth was monitored by optical density at 600 nm. The culture exhibited a characteristic growth profile and reached an OD600 of approximately 0.49.

<div class="figure-grid single wide">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/hardware/desert-test.webp" alt="The real SHIHAB set-up on a folding table in the desert: the bioreactor, syringe pumps and tubing, with sand dunes behind" loading="lazy"></div><figcaption class="caption"><strong>Figure 6. We took SHIHAB to the desert!</strong> The real set-up, with the bioreactor and the syringe pumps, tested out on the dunes, exactly the kind of remote place it is built for.</figcaption></figure>
</div>

<div data-slot="temp-chart"></div>

<div class="caption">

**Figure 7. The temperature reached 36 °C and was then held steady.** Full temperature profile of the water, heated from 18 °C to the setpoint with simple on/off control.

</div>

<div data-slot="ph-chart"></div>

<div class="caption">

**Figure 8. The pH sensor tracked the changes caused by adding acid and base.** Response of the pH sensor to sudden changes in pH.

</div>

<div data-slot="growth-chart"></div>

<div class="caption">

**Figure 9. *E. coli* grew in a sigmoidal curve to an OD₆₀₀ of about 0.49 over 10 hours.** Growth curve from the SHIHAB bioreactor, obtained via periodic blank-corrected OD₆₀₀ measurements.

</div>

## Produce

### IPTG induction optimization in *B. subtilis*

#### Objective

To optimize recombinant protein expression in *B. subtilis* and evaluate whether genomic integration of Dsup affects bacterial growth and protein production.

#### Achievement

We tested different IPTG concentrations in wild-type and Dsup-expressing *B. subtilis* strains carrying a GFP construct. Both strains showed comparable growth and GFP expression, indicating that Dsup integration did not substantially interfere with recombinant protein production under the tested conditions. We identified 2 mM IPTG as the optimal working concentration for subsequent payload expression experiments, based on fluorescence intensity and expression rate.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/produce-iptg-gfp-bsubtilis.avif" alt="Two line charts of GFP fluorescence over about 13 hours, one for B. subtilis WT with GFP and one for B. subtilis WT::Dsup with GFP, each with one line per IPTG concentration from 0 to 10 mM plus a no-bacteria control" loading="lazy"><figcaption class="caption"><strong>Figure 10. The two strains reached comparable GFP levels at each IPTG concentration.</strong> GFP fluorescence following IPTG induction in wild-type (WT) and Dsup-expressing <i>B. subtilis</i>. Fluorescence increased rapidly during the first few hours after induction, followed by a slower, approximately linear increase over time, suggesting that Dsup expression does not significantly interfere with plasmid-based recombinant protein expression.</figcaption></figure>
</div>

### mCherry expression optimization in *P. pastoris*

#### Objective

To optimize methanol-induced recombinant protein expression in *P. pastoris* and evaluate intracellular and extracellular production using mCherry as a fluorescent reporter.

#### Achievement

We expressed mCherry in *P. pastoris* using methanol induction and identified 0.5% methanol as the preferred concentration, producing stronger fluorescence than 1%. Time-course experiments showed the greatest fluorescence increase during the first 24 hours, followed by continued accumulation over four days. We also tested an mCherry construct containing an α-factor secretion signal, which showed approximately twofold higher fluorescence than the non-fluorescent control, providing preliminary evidence supporting further investigation of extracellular protein production.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/produce-mcherry-ppastoris.avif" alt="A fluorescence microscopy image of P. pastoris cells glowing orange with a 10 micrometer scale bar, beside a bar chart of relative fluorescence units for Blank, IPD3 and IPC2" loading="lazy"><figcaption class="caption"><strong>Figure 11. The IPC2 mutant fluoresced above both the blank and IPD3.</strong> Fluorescence microscopy images of IPC1 mutants and relative fluorescence units (RFU) measured in IPC2 mutants of <i>P. pastoris</i>, following induction with 0.5% methanol for 48 hours.</figcaption></figure>
</div>

## Purify

### Recombinant production of therapeutic and functional payloads

#### Objective

To purify protein targets, including:

- Nanobodies targeting herpes simplex virus glycoprotein B and PD-L1, reflecting possible future applications in space-related healthcare
- Antifreeze proteins FfIBP and LeIBP, as candidates for low-temperature protection and biological preservation

#### Achievement

We performed recombinant protein production experiments for *P. pastoris* and *B. subtilis*. Expression was assessed through SDS-PAGE, fluorescence imaging, and functional assays where applicable.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/purify-nb1-ffibp-sds-page.avif" alt="Two Coomassie-stained gels: a Nb1 gbHSV lane with a band near 40 kDa, and an FfIBP gel with lanes FT1, FT2 and 1 to 4, showing bands near 30 kDa in lanes 3 and 4" loading="lazy"><figcaption class="caption"><strong>Figure 12. Both payloads eluted as bands at their expected sizes.</strong> SDS-PAGE analysis of purified recombinant proteins: Coomassie-stained gel of secreted Nb1_gbHSV nanobody purified from <i>P. pastoris</i> using HisTrap affinity chromatography; and SDS-PAGE gel of secreted FfIBP following purification using the ÄKTA HisTrap system.</figcaption></figure>
</div>

To learn further about our experiments and outcomes, go to our [Notebook](/kaust-ksa/notebook) or [Results](/kaust-ksa/results) page.

### Developing downstream protein-recovery components

<span class="chip amber">Hardware point of view</span>

#### Objective

- To develop modular filtration and automate liquid-handling components intended to support downstream protein recovery.

#### Achievements

1. We investigated a multi-step filtration design using filters with pore sizes of 500 µm, 11 µm, and 0.2 µm. Through successive design iterations, we addressed challenges involving leakage, clogging, and fluid handling. The final gasket-sealed assembly processed 500 mL of culture at 240 mL/min without observed leakage at module joints. Successive filtration stages produced visibly clearer filtrate, showing mechanical and operational viability.
2. We developed a syringe-pump-based system for automated buffer delivery and liquid routing during protein purification. The design incorporated stepper motors, syringe mechanisms, limit switches, and flow routing components. Tests investigated liquid dispensing, filling cycles, syringe positioning, and routing between collection and waste pathways.

<div class="figure-grid single wide">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/proof-of-concept/new/purify-syringe-pump-filtration.avif" alt="Three photos side by side: a CAD model of the syringe pump with four reservoir bottles, stepper motors and lead screws; limit switches mounted on a perforated bracket behind the syringes; and three centrifuge tubes held in a gloved hand, the left cloudy and the other two progressively clearer" loading="lazy"><figcaption class="caption"><strong>Figure 13. Each filtration stage left the filtrate visibly clearer.</strong> Left to right: CAD model of the syringe pump design; the limit switches behind the syringes that set the home position; the initial yeast mixture, after two stages of filtration, and after three stages of filtration.</figcaption></figure>
</div>

## Further exploration

### Identifying suitable microbial chassis

<span class="chip">Dry lab point of view</span>

#### Objective

To compare microbial production capabilities under different oxygen conditions.

<div class="callout warn">

<p class="callout-label">Achievement in progress</p>

We used genome-scale metabolic models and flux balance analysis (FBA). Our simulations predicted that *B. subtilis* could retain more nanobody-production capacity than *S. cerevisiae* when oxygen was limited and nitrate was supplied. These are model predictions; they have not yet been tested experimentally.

</div>

<div class="stat-grid">
<div class="hi"><strong>≈3.4×</strong><span>Maximum predicted nanobody production flux in <i>B. subtilis</i>, relative to <i>S. cerevisiae</i> (tested constraints)</span></div>
<div><strong>~46%</strong><span>Predicted production capacity lost when oxygen was removed: <i>B. subtilis</i></span></div>
<div><strong>~82%</strong><span>Predicted production capacity lost when oxygen was removed: yeast</span></div>
</div>

These results suggest *B. subtilis* as a promising chassis under oxygen-limited conditions.

### Investigating resource-sharing microbial systems

#### Objective

To investigate whether SHIHAB could reduce dependence on externally supplied resources.

<div class="callout warn">

<p class="callout-label">Achievement in progress</p>

We modeled a possible partnership with *Synechococcus elongatus* PCC 7942. This cyanobacterium was assessed as a potential source of sucrose and oxygen for the production chassis. Simulations suggested that adjusting cyanobacterial growth allocation could increase predicted sucrose export and improve partner organism growth. These findings support further exploration of resource-sharing systems; they do not demonstrate an experimentally operating co-culture.

</div>

## Next steps

Our proof of concept demonstrates the functionality of SHIHAB's individual components. We investigated microbial genetic engineering and recombinant protein production, built and tested a controlled cultivation platform, developed downstream-processing components, and used computational tools to guide future improvements.

The next major milestone is integrating these components into a fully functional biomanufacturing system. This involves cultivating our engineered microbial chassis inside the automated bioreactor, producing our target protein payload, and recovering it through the integrated purification unit. Demonstrating this complete workflow will be essential to validate SHIHAB as a unified platform rather than a collection of independently tested components.

Further work will focus on:

- Evaluating long-term bioreactor operation and control-system reliability.
- Validating the biological performance of engineered SHIHAB chassis under relevant environmental stresses.
- Assessing the quality and functionality of the recovered protein payloads while implementing appropriate biosafety measures.
- Experimentally testing computational predictions related to oxygen limitation, and co-culture resource supply.

SHIHAB represents a step toward adaptable biomanufacturing for environments where conventional production and supply systems may be difficult to sustain.
