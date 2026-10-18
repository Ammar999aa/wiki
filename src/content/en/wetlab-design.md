## Design Overview

In our project, we were working with **three different chassis**: _B. subtilis_, _P. pastoris_, and _S. cerevisiae_. We engineered these organisms using a combination of **genomic recombineering and episomal plasmids**, which allowed us to explore different strategies for stable and inducible heterologous gene expression.

<div class="photo-frame">

![Overview diagram of the three engineered chassis](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/wet-lab-diagrams-1.avif)

</div>

All three chassis were engineered to contain **Dsup** protein stably integrated into their genome for enhanced radiation resistance. Subsequently, the host cells were transformed to express a range of **protein payloads** that can be useful for astronauts during their space missions.

<div class="figure-grid single">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/wet-lab/wet-lab-diagrams-2-cropped.avif" alt="Protein payload production: a payload gene on a plasmid transformed into a cell carrying genomically integrated Dsup, producing antifreeze proteins, therapeutic nanobodies and fluorescent proteins"></figure>
</div>

Below, we describe each chassis, the genetic systems used for its engineering, and the proteins selected for recombinant expression.

## I. Chassis, Vectors, and Regulatory Parts

<div class="caption">

**Table 1.** Overview of chassis and vectors

</div>

<div class="table-wrap">
<table class="matrix-table">
<thead>
<tr><th></th><th colspan="3">Chassis</th></tr>
<tr><th scope="col">Components</th><th scope="col"><i>B. subtilis</i></th><th scope="col"><i>P. pastoris</i></th><th scope="col"><i>S. cerevisiae</i></th></tr>
</thead>
<tbody>
<tr><th scope="row">Vectors</th><td>pBS4S, pHT-ads</td><td>pPIC Z, pPICZα A</td><td>HO-poly-KanMX4-HO, pYES2</td></tr>
<tr><th scope="row">Promoters</th><td>PVeg, Pgrac</td><td>pAOX1</td><td>pGAL, pADH1, pTEF1</td></tr>
<tr><th scope="row">Terminators</th><td>rrnB T1 terminator + T7Te terminator</td><td>tAOX1</td><td>pCYC1</td></tr>
<tr><th scope="row">Selection markers</th><td>Spectinomycin, Chloramphenicol</td><td>Zeocin</td><td>G418, URA3</td></tr>
</tbody>
</table>
</div>

## Bacillus subtilis

<div class="callout">

<p class="callout-label">Chassis overview</p>

Bacillus subtilis is a Gram-positive, rod-shaped bacterium widely used as a model organism in molecular biology and synbio. Similarly to _E. coli_, _B. subtilis_ is relatively easy to cultivate. It grows rapidly under standard laboratory conditions, and there is a wide range of well-characterized genetic engineering tools available for this organism. However, unlike _E. coli_, it lacks an outer membrane, which facilitates the secretion of recombinant proteins. As a result, it is highly efficient and much easier to conduct downstream purification of the recombinant proteins. Heterologous proteins can be directed through the cytoplasmic membrane using N-terminal signal peptides (mostly via Sec-dependent secretion pathway). After translocation, signal peptides get cleaved off from the main protein.

_B. subtilis_ also offers flexibility for genetic engineering. It is a naturally competent bacteria, which means that it can take up extracellular DNA under appropriate physiological conditions much more readily compared to other cells. Moreover, homologous recombination is also highly efficient in this organism. Inducible promoters, such as IPTG inducible Pgrac, allow controlled expression of heterologous genes.

Another beneficial feature of _B. subtilis_ is its ability to form highly resistant endospores under unfavorable environmental conditions. These dormant structures exhibit incredible resistance to a wide range of environmental stresses, such as desiccation, heat, etc. After exposure to favorable conditions, spores will germinate and recover regular cellular activity. This feature is particularly useful for long-term storage during space missions.

Overall, _B. subtilis_ is a versatile bacterial chassis that combines rapid growth, variety of genetic engineering techniques, efficient protein secretion, and ability to form resilient endospores.

</div>

#### Expression vectors

<div class="vector-tabs">
<div class="vector-tabs-bar">
<button type="button" class="vector-tab is-active">pBS4S</button>
<button type="button" class="vector-tab">pHT-ads</button>
</div>

<div class="vector-panel is-active">

<div class="photo-frame light">

![pBS4S vector map with Dsup insertion](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/pbs4s-map.avif)

</div>

<div class="caption">

pBS4S vector map with Dsup insertion (via SnapGene)

</div>

- Integration vector designed for stable chromosomal insertion of recombinant DNA through homologous recombination
- Integrates into thrC locus of the _B. subtilis_ chromosome. The ThrC gene encodes threonine synthase. Hence, this locus is not essential under appropriate growth conditions when sufficient amounts of threonine are available for cells
- Spectinomycin resistance in _B. subtilis_; ampicillin resistance in _E. coli_ (shuttle vector that can be amplified in _E. coli_)
- Contains an rfp cassette enabling red/white colony screening in _E. coli_

#### PVeg Promoter

In our project, this particular vector was utilized for Dsup integration. Dsup was placed under pVeg, which is a strong, constitutive bacterial promoter that enables continuous gene expression without external induction <a class="cite" href="#ref-1">1</a>. We made this choice to ensure that our organisms are always protected from DNA damage, no matter the growth medium composition.

</div>

<div class="vector-panel">

<div class="photo-frame light">

![pHT-ads vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/pht-ads-map.avif)

</div>

<div class="caption">

pHT-ads vector map (via SnapGene)

</div>

- _E. coli_ – _B. subtilis_ shuttle expression vector derived from pHT01
- Maintained extrachromosomally (episomal plasmid)
- We utilized this vector for episomal expression of all of our payload proteins in Bacillus. This choice was made so that the payload proteins are expressed without permanent integration into the host chromosome, allowing greater flexibility in modifying or replacing expression constructs.
- Contains a strong IPTG-inducible Pgrac promoter
- LacI-mediated repression, which gets relieved after IPTG induction
- The payload genes were placed under a Pgrac promoter to enable controlled protein production, allowing cells to first accumulate sufficient biomass before initiating recombinant protein expression. This approach helps minimize the metabolic burden associated with premature protein production and allows us to acquire maximum amounts of the target protein.

</div>
</div>

## Pichia pastoris

<div class="callout">

<p class="callout-label">Chassis overview</p>

Pichia pastoris (Komagataella phaffii) is a methylotrophic yeast (eukaryotic) that can be easily cultivated similarly to _E. coli_, which makes it very useful as it combines relatively simple cultivation with a capacity for complex protein folding, disulfide bond formation, post-translational modification, and secretion. Hence, it can be a great alternative to traditional _E. coli_ based production for more complex proteins.

_P. pastoris_ also supports stable genomic integration of heterologous expression cassettes through homologous recombination. Integrative vectors, such as the ones we used in this project, are particularly easy to work with as they generate stable recombinant strains without relying on continuous maintenance of an episomal expression plasmid.

Another major advantage of this chassis is its secretory capacity. Heterologous proteins can be directed through the endoplasmic reticulum and Golgi using secretion signals. The most well-characterized example is α-mating-factor leader derived from _S. cerevisiae_. Because Pichia naturally secretes relatively limited amounts of endogenous protein, secretion can simplify downstream recovery and purification of recombinant products.

Overall, _P. pastoris_ is a highly robust eukaryotic chassis that supports high cell density growth, regulated recombinant expression, stable genome engineering, and efficient protein secretion.

</div>

#### Expression vectors

<div class="vector-tabs">
<div class="vector-tabs-bar">
<button type="button" class="vector-tab is-active">pPICZ A</button>
<button type="button" class="vector-tab">pPICZα A</button>
</div>

<div class="vector-panel is-active">

<div class="photo-frame light">

![pPICZ A vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/ppicz-a-map.avif)

</div>

<div class="caption">

pPICZ A vector map (via SnapGene)

</div>

- This vector is classified as a Shuttle vector, meaning that it contains pUC ori for propagation in _E. coli_
- Selection marker: Zeocin (25 ug/ml for _E. coli_, 100 ug/ml for _P. pastoris_)
- No ori for Pichia pastoris is present in this vector, as it is supposed to be integrated directly into the genome of the cell. The expression cassette contains the AOX1 promoter/5′ AOX1 sequence upstream of the MCS and the AOX1 transcription-termination region downstream. These sequences originate from the native AOX1 locus present in the genome of Pichia. Hence, the cassette provides homology between the introduced plasmid and the chromosome. For homologous recombination to occur, the DNA must be linearized, preferably in the AOX1 promoter.

</div>

<div class="vector-panel">

<div class="photo-frame light">

![pPICZα A vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/ppicz-a-a-map.avif)

</div>

<div class="caption">

pPICZα A vector map (via SnapGene)

</div>

- This backbone is based on pPICZ A sequence. However, in addition to the above, contains an α-factor secretion signal for export of the recombinant proteins out of the producing cell.
</div>
</div>

#### AOX1 Locus

The AOX1 (alcohol oxidase 1) locus is essential for methanol metabolism in _P. pastoris_. Aox1 is a peroxisomal enzyme that catalyzes the first step of methanol utilization by oxidizing methanol to formaldehyde while generating hydrogen peroxide.

The locus is widely utilized for recombinant protein production because AOX1-derived sequences can serve both as regulatory elements for transgene expression and as homology regions for genomic integration.

#### AOX1 Promoter

The AOX1 promoter (pAOX1) is a strong promoter inducible during growth on methanol. The transcription is repressed in the presence of more preferred carbon sources, such as glucose. Under such repressive conditions, basal promoter activity is very low.

Protein expression under pAOX1 consists of a glycerol growth phase, followed by a methanol induction phase. The glycerol stage is crucial for efficient biomass accumulation, which is important for achieving high protein yields. After cells are pelleted down, they are resuspended in methanol-containing media that activates the native methanol utilization pathway and strongly induces pAOX1. As a result, cellular resources get shifted toward recombinant protein production.

## Saccharomyces cerevisiae

<div class="callout">

<p class="callout-label">Chassis overview</p>

Saccharomyces cerevisiae is commonly known as baker's yeast. It is also a unicellular eukaryotic microorganism and one of the most extensively characterized model organisms in molecular biology and metabolic engineering. _S. cerevisiae_ was actively used for recombinant protein production and recombineering for decades as it combines rapid growth, a well-established synbio toolbox, and many other useful properties.

As a eukaryotic expression host, _S. cerevisiae_ exhibits an ability for complex protein folding, disulfide bond formation, post-translational modification, and secretion, enabling the production of proteins that can't be expressed correctly in bacterial cells.

Recombinant proteins can be either expressed intracellularly or secreted from the cells through, for instance, α-mating-factor leader.

A crucial advantage of _S. cerevisiae_ is its exceptionally efficient homologous recombination machinery that enables targeted genomic integration, gene deletion, pathway assembly, and other genome-engineering strategies. A large collection of well-characterized regulatory elements, selectable markers, and genome-editing tools is highly beneficial.

In general, _S. cerevisiae_ has a long history of use in food production, biotechnology, and fundamental research, making it one of the highly safe and efficient golden standard chassis.

</div>

#### Expression vectors

<div class="vector-tabs">
<div class="vector-tabs-bar">
<button type="button" class="vector-tab is-active">HO-poly-KanMX4-HO</button>
<button type="button" class="vector-tab">pYES2</button>
</div>

<div class="vector-panel is-active">

<div class="photo-frame light">

![HO-poly-KanMX4-HO vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/ho-poly-kanmx4-ho-map.avif)

</div>

<div class="caption">

HO-poly-KanMX4-HO vector map (via SnapGene)

</div>

- HO-poly-KanMX4-HO was designed for targeted insertion of heterologous DNA at the HO locus. The construct contains sequences homologous to the genomic HO region flanking a cloning region and the antibiotics resistance cassette, enabling stable chromosomal integration through homologous recombination.
- The HO locus encodes the HO endonuclease, which initiates mating-type switching by generating a site-specific double-strand break at the MAT locus. Since the majority of laboratory _S. cerevisiae_ strains are already defective in mating-type switching, and the HO locus is frequently used as a genomic integration site because disruption of HO is generally compatible with normal vegetative growth under standard laboratory conditions. Hence, this locus is characterised as a "safe harbor" region.
- It is a shuttle vector that can be replicated in _E. coli_ for plasmid amplification and selected using ampicillin (100 ug/ml).
- KanMX4 encodes an aminoglycoside phosphotransferase that confers resistance to G418 (geneticin) in _S. cerevisiae_. This enables selection of successful transformants without requiring particular auxotrophic agar plates.
- Architecture overview:

<div class="flow">
<span class="flow-node amber">HO left homology region</span>
<span class="flow-arrow">→</span>
<span class="flow-node">MCS</span>
<span class="flow-arrow">→</span>
<span class="flow-node accent">KanMX4</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">HO right homology region</span>
<span class="flow-arrow">→</span>
<span class="flow-node">AmpR</span>
<span class="flow-arrow">→</span>
<span class="flow-node">pUC ori</span>
</div>

#### TEF1 Promoter

As we used HO-poly-KanMX4-HO for Dsup integration, we decided to put GOI under a constitutively active promoter, pTEF1. It is a strong, constitutive promoter that was derived from the TEF1 gene, encoding translation elongation factor 1-alpha (eEF1A) <a class="cite" href="#ref-2">2</a>. It was important to add Dsup under the constitutive promoter to ensure that our organisms are always protected from radiation, without a need for a special inducer.

</div>

<div class="vector-panel">

<div class="photo-frame light">

![pYES2-HTH vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/pyes2-map.avif)

</div>

<div class="caption">

pYES2-HTH vector map (via SnapGene)

</div>

- pYES2 was designed for inducible heterologous gene expression in yeast.
- In this shuttle vector, selection in _E. coli_ also occurs using ampicillin.
- Unlike the above-mentioned backbones, pYES2 is an episomal plasmid. It contains a 2µ origin of replication, allowing autonomous episomal replication in _S. cerevisiae_. The recombinant expression cassette is maintained on a multicopy plasmid under appropriate selective conditions.
- In yeast, pYES2 contains the URA3 selectable marker, which complements ura3 auxotrophy and enables selection of plasmid-containing cells on medium lacking uracil. This makes the vector particularly suitable for strains such as INVSc1 (ura3-52) that we used for our project.
- We used this vector for our payloads production. We put each GOI under 2 different promoters for comparison:

</div>
</div>

#### GAL Promoter

Provides inducible expression in response to galactose. This promoter is characterized as a strong, tightly regulated promoter. The system relies on the galactose utilization pathway native to the yeast. The regulation is mediated via Gal4, Gal80, Gal3 regulatory network. In the absence of galactose, the transcriptional activator Gal4 is bound to upstream activating sequences (UAS) within the promoter, but its activation domain is inhibited by Gal80. In the presence of galactose, Gal3 binds galactose and ATP and interacts with Gal80, relieving Gal80-mediated inhibition of Gal4. Active Gal4 subsequently recruits the transcriptional machinery and strongly induces transcription from the promoter.

#### ADH1 Promoter (promoter swap)

The ADH1 promoter is a strong, constitutive promoter derived from the _S. cerevisiae_ The promoter exhibits the highest activity during fermentative growth on glucose, which is due to the physiological demand for alcohol dehydrogenase in ethanol production.

## II. Radiation resistance

<figure class="img-aside plain">
<img src="https://static.igem.wiki/teams/6341/wiki/content/wet-lab/tardigrades-1.avif" alt="Tardigrade">
</figure>

**Damage suppressor (Dsup)** is a chromatin-associated protein natively expressed in the _Ramazzottius varieornatus_ tardigrade. Tardigrades are microscopic invertebrates, which are classified as extremotolerants due to their substincial ability to survive severe environmental stresses, including desiccation and high levels of ionizing radiation. Dsup was discovered during genomic and proteomic characterization of _R. varieornatus_ as an abundant, highly basic nuclear protein capable of associating with DNA. Its identification provided evidence that, in addition to efficient stress-response and repair systems, tardigrades possess proteins capable of directly protecting their genetic material from damage.

<div class="structure-3d" data-structure="dsup-nucleosome-9d3k" data-pdb="9D3K" data-label="Two Dsup molecules in complex with the nucleosome open from both sides" data-color="#8aa0d0" data-highlight="K,L"></div>

#### Molecular Mechanism of DNA Protection

Dsup is a highly charged and largely intrinsically disordered protein that localizes to chromatin <a class="cite" href="#ref-3">3</a>. Previous research has demonstrated that it contains a positively charged C-terminal region. This domain is required for DNA association and for protection against radiation-induced DNA damage. More in-depth biochemical studies showed that Dsup preferentially associates with nucleosomes rather than free DNA, indicating that its physiological target is chromatin.

A conserved region within the C-terminal portion of Dsup resembles the nucleosome-binding motif of vertebrate high-mobility group N (HMGN) proteins. Disruption of this HMGN-like region substantially reduces nucleosome binding and correspondingly decreases DNA protection. More recent structural and biochemical work has further demonstrated that Dsup interacts multivalently with chromatin, including contacts with nucleosomal DNA, the H2A/H2B acidic patch, and H3/H4 histone tails <a class="cite" href="#ref-4">4</a>.

Following association with nucleosomes, the disordered regions of Dsup are proposed to form a protective environment around chromosomal DNA. This physical shielding reduces the accessibility of DNA to highly reactive species, particularly hydroxyl radicals. In vitro experiments have demonstrated that Dsup-bound chromatin is substantially more resistant to hydroxyl-radical-mediated DNA cleavage than unprotected chromatin.

#### Protection Against Ionizing Radiation and Oxidative Stress

Ionizing radiation damages cellular DNA through both direct and indirect mechanisms. Radiation can directly deposit energy into DNA, but a substantial fraction of biological damage arises indirectly through the radiolysis of intracellular water, which generates reactive oxygen species, including highly reactive hydroxyl radicals. These radicals can attack DNA bases and the deoxyribose backbone, producing base modifications and single- and double-strand breaks.

The protective function of Dsup was first demonstrated heterologously in human HEK293 cells <a class="cite" href="#ref-3">3</a>. Expression of _R. varieornatus_ Dsup reduced X-ray-induced DNA fragmentation and decreased markers of double-strand breaks. Dsup-expressing cells also exhibited improved proliferative capacity following irradiation.

The protective activity of Dsup is not limited to radiation itself. Ionizing radiation and oxidative stress converge mechanistically through the generation of reactive oxygen species (ROS), making protection against oxidative DNA damage particularly relevant to Dsup function.

Hydrogen peroxide (H₂O₂), for example, can generate highly reactive hydroxyl radicals through metal-catalyzed reactions. These radicals rapidly attack DNA and other cellular macromolecules. The original characterization of Dsup demonstrated that Dsup-expressing human cells exhibited substantially reduced DNA fragmentation following H₂O₂ exposure, indicating protection against ROS-mediated DNA damage <a class="cite" href="#ref-5">5</a>.

#### Improved Dsup

To further optimize Dsup-mediated protection in our engineered chassis, we quickly evaluated the protein's native nuclear localization signal (NLS) and its compatibility with the nuclear import machinery of our chassis. Since Dsup must primarily associate with chromatin and DNA to exhibit protective functions, efficient nuclear localization is critical for its ability to improve radiation resistance. However, since Dsup is native to tardigrades, its' NLS is not optimal for the organisms we selected. Hence, to address this, we designed an improved Dsup construct incorporating two tandem copies of the simian virus 40 (SV40) nuclear localization signal (2×SV40 NLS).

The SV40 NLS is a well-characterized, basic peptide sequence recognized by the eukaryotic nuclear import machinery, which further facilitates transport of associated proteins into the nucleus <a class="cite" href="#ref-6">6</a>. We selected a tandem NLS configuration to potentially enhance recognition by nuclear import receptors, since multiple NLS motifs can improve nuclear import efficiency in certain situations.

Through this modification, we aimed to evaluate whether enhanced nuclear localization could increase Dsup association with chromatin and consequently improve its protective activity against radiation-induced DNA damage in _P. pastoris_. In future works, we plan to test similar strategy for the rest of our chassis.

![Chromatin without Dsup, where radiation and oxidative stress cause damaged DNA, beside chromatin with Dsup, where DNA damage is reduced and survival improved](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/dsup-comparison.avif)

## III. Payload proteins

<div class="caption">

**Table 2.** Overview of payloads

</div>

<div class="table-wrap">
<table class="matrix-table marks">
<thead>
<tr><th></th><th scope="col"><i>B. subtilis</i></th><th scope="col"><i>P. pastoris</i></th><th scope="col"><i>S. cerevisiae</i></th></tr>
</thead>
<tbody>
<tr><th scope="row"></th><td colspan="3">Dsup (genomic integration)</td></tr>
<tr><th scope="row">Payloads</th><td colspan="3"></td></tr>
<tr><th scope="row">Nb1_gbHSV</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">Anti-PDL1 Nb</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">LeIBP (AFP)</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">FfIBP (AFP)</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">mCherry</th><td>-</td><td>+</td><td>+</td></tr>
<tr><th scope="row">GFPmut2</th><td>+</td><td>-</td><td>-</td></tr>
</tbody>
</table>
</div>

#### Nb1_gbHSV

<div class="structure-3d" data-structure="hsv-nanobody-9q9n" data-pdb="9Q9N" data-label="HSV-1 gB : Nb1_gbHSV complex"></div>

- Herpes simplex virus (HSV) is a common, contagious virus that causes recurring skin and mucosal lesions. This virus is a particularly relevant therapeutic target for long-duration space missions because of the increased risk of latent herpesvirus reactivation associated with spaceflight-induced immune dysregulation <a class="cite" href="#ref-7">7</a><a class="cite" href="#ref-8">8</a>
- Nb1_gbHSV is a highly potent, neutralizing single-domain antibody (nanobody) targeting glycoprotein B (gB) of herpes simplex viruses HSV-1 and HSV-2. It was characterized by Vollmer et al. (2025) in Nature <a class="cite" href="#ref-9">9</a>
- This nanobody exhibits exceptionally high binding affinity toward the prefusion conformation of gB, preventing the structural rearrangements required for viral membrane fusion
- Hence, Nb1_gbHSV could potentially be administered as an antiviral therapeutic to neutralize HSV-1 and HSV-2 by binding to viral glycoprotein B (gB), preventing membrane fusion and viral entry into host cells, thereby limiting the spread of infection
- We specifically chose to express nanobodies instead of antibodies. Unlike conventional antibodies, nanobodies consist of a single antigen-binding domain (VHH), making them easier and more cost-effective to produce in microbial expression systems. This and their potential for high-affinity to a specific antigen makes them particularly attractive for therapeutic applications and on-demand biomanufacturing during space missions

#### Anti-PDL1 Nanobody

<div class="structure-3d" data-structure="pdl1-nanobody-5dxw" data-pdb="5DXW" data-label="PD-L1 Nanobody (mouse PD-L1 reference structure)"></div>

- Another nanobody we incorporated into our payloads library is camelid-derived nanobody developed to recognize programmed death-ligand 1 (PD-L1)
- PD-L1 is a key immune checkpoint overexpressed in many tumors. The nanobody acts by binding PD-L1 and inhibiting its interaction with PD-1 receptors on T cells, potentially restoring antitumor immune activity <a class="cite" href="#ref-10">10</a>. Essentially, it disrupts inhibitory PD-1/PD-L1 signaling, which tumors frequently utilize to evade immune surveillance
- As space missions expose astronauts to cosmic radiation, which can cause DNA damage and potentially elevate long-term cancer risks <a class="cite" href="#ref-11">11</a><a class="cite" href="#ref-12">12</a>, nanobodies, such as anti-PD-L1 Nb, are therefore promising experimental immunotherapeutic payloads that could contribute to future personalized medical care during space exploration.

#### FfIBP

<div class="structure-3d" data-structure="ffibp-4nu2" data-pdb="4NU2" data-label="FfIBP (Flavobacterium frigoris PS1)"></div>

- FfIBP is naturally produced by the psychrophilic, gram-negative bacterium _Flavobacterium frigoris_ PS1, isolated from Antarctic sea ice
- FfIBP is a hyperactive ice-binding protein (IBP) and an antifreeze protein (AFP), involved in protecting organisms against freezing-associated damage
- This protein binds directly to ice crystals through a specialized ice-binding surface containing regularly arranged residues, including a T-A/G-X-T/N motif. The interaction inhibits ice crystal growth <a class="cite" href="#ref-13">13</a><a class="cite" href="#ref-14">14</a>
- FfIBP is particularly beneficial since it exhibits very high antifreeze activity at relatively low concentrations. For example, it showed approximately 2.5°C thermal hysteresis at 50 µM, which is around ten times higher than what was reported for LeIBP <a class="cite" href="#ref-15">15</a>
- We chose FfIBP as one of our payloads because of its potential applications for cryopreservation of cells and biological materials acquired during space missions, protection of various samples during repeated freeze-thaw cycles, preservation of temperature-sensitive products, and frozen-food processing. On-demand production of FfIBP could help reducing dependence on supplies transported from Earth and allow astronauts to safely collect variety of samples during their missions
- Since FfIBP is naturally secreted from _F. frigoris_, it contains a lipoprotein signal sequence (Sec/SPII):

<div class="photo-frame light">

![SignalP prediction for the FfIBP signal peptide](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/ffibp-signalp.avif)

</div>

<div class="caption">

Signal peptide prediction (via [SignalP 6.0](https://services.healthtech.dtu.dk/services/SignalP-6.0/))

</div>

Amino acid sequence:

<p class="seq"><span class="seq-signal">MKILKRIPVLAVLLVGLMTNCSND</span>SDSSSLSVANSTYETTALNSQKSSTDQPNSGSKSGQTLDLVNLGVAANFAILSKTGITDVYKSAITGDVGASPITGAAILLKCDEVTGTIFSVDAAGPACKITDASRLTTAVGDMQIAYDNAAGRLNPDFLNLGAGTIGGKTLTPGLYKWTSTLNIPTDITISGSSTDVWIFQVAGNLNMSSAVRITLAGGAQAKNIFWQTAGAVTLGSTSHFEGNILSQTGINMKTAASINGRMMAQTAVTLQMNTVTIPQ</p>

<p class="seq-key"><span class="seq-signal">Green</span> — signaling peptide for secretion</p>

In each of our constructs, we replaced this secretion signal with secretion signals native to our chassis (amyQ for Bacillus and a-factor secretion signal for two yeasts)

#### LeIBP

<div class="structure-3d" data-structure="leibp-3uyv" data-pdb="3UYV" data-label="LeIBP (Leucosporidium sp. AY30)"></div>

- LeIBP is naturally produced by the psychrophilic Arctic yeast _Leucosporidium_ sp. AY30 <a class="cite" href="#ref-16">16</a>
- It is another ice-binding protein (IBP), also classified as an antifreeze protein (AFP). Hence, it could be applied for the same purposes as FfIBP
- LeIBP binds to specific planes of ice crystals through an organized surface containing threonine, serine, and alanine residues, restricting further ice crystal growth
- Since LeIBP is naturally secreted from the arctic yeast, it contains a lipoprotein signal sequence (Sec/SPI):

<div class="photo-frame light">

![SignalP prediction for the LeIBP signal peptide](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/leibp-signalp.avif)

</div>

<div class="caption">

Signal peptide prediction (via [SignalP 6.0](https://services.healthtech.dtu.dk/services/SignalP-6.0/))

</div>

Amino acid sequence:

<p class="seq"><span class="seq-signal">MSLLSIITIGLAGLGGLVNG</span>QRDLSVELGVASNFAILAKAGISSVPDSAILGDIGVSPAAATYITGFGLTQDSSTTYATSPQVTGLIYAADYSTPTPNYLAAAVANAETAYNQAAGFVDPDFLELGAGELRDQTLVPGLYKWTSSVSVPTDLTFEGNGDATWVFQIAGGLSLADGVAFTLAGGANSTNIAFQVGDDVTVGKGAHFEGVLLAKRFVTLQTGSSLNGRVLSQTEVALQKATVNSPFVPAPEVVQKRSNARQWL</p>

<p class="seq-key"><span class="seq-signal">Green</span> — signaling peptide for secretion</p>

In each of our constructs, we replaced this secretion signal with secretion signals native to our chassis (amyQ for Bacillus and a-factor secretion signal for two yeasts)

#### mCherry

<div class="structure-3d" data-structure="mcherry-2h5q" data-pdb="2H5Q" data-label="mCherry"></div>

- mCherry is a widely used monomeric red fluorescent protein derived from _Discosoma_ sp. red fluorescent protein (DsRed) through directed evolution and protein engineering <a class="cite" href="#ref-17">17</a>
- Upon excitation with green-yellow light, the chromophore absorbs photons and emits lower-energy red light
- This protein was chosen by us because it is widely used as a fluorescent reporter for monitoring gene expression, protein localization, cellular imaging, etc
- In particular, aside from adding it to our payloads collection, we used mCherry to evaluate gene expression in our yeast constructs under different induction conditions
- We tried out not only intracellularly localized mCherry visualization but also extracellular secretion of mCherry

#### GFPmut2

<div class="structure-3d" data-structure="gfp-1ema" data-pdb="1EMA" data-label="GFP (Aequorea victoria)"></div>

- GFPmut2 is an engineered variant of green fluorescent protein (GFP) originally derived from the jellyfish _Aequorea victoria_
- This monomeric green fluorescent protein was optimized for significantly enhanced fluorescence and improved folding at physiological temperatures in bacterial expression systems <a class="cite" href="#ref-18">18</a>. Engineering took place through fluorescence-activated cell sorting (FACS)
- It contains three amino acid substitutions (S65A, V68L, and S72A) located near the chromophore
- Essentially, GFP absorbs blue light and emits green fluorescence through an autocatalytically formed chromophore
- We selected GFPmut2 as a model fluorescent payload to evaluate recombinant protein expression and demonstrate the production of functional proteins in _B. subtilis_

#### Polyhistidine Tag

<figure class="img-aside">
<img src="https://static.igem.wiki/teams/6341/wiki/content/wet-lab/nickel-resin.avif" alt="Nickel-agarose resin">
<figcaption class="caption">Image credit: Nickel-agarose resin image by Pdcook, licensed under CC BY-SA 3.0. Source: <a href="https://commons.wikimedia.org/wiki/File:Nickel_resin.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
</figure>

- All our payload constructs contain a polyhistidine (8xHis tag) to ease protein purification through Immobilized Metal Affinity Chromatography (IMAC). In particular, Ni-NTA (nickel-nitrilotriacetic acid) resin was used for affinity purification and also for Western Blots (protein immunoblot).

#### c-Myc Epitope Tag

<figure class="img-aside">
<img src="https://static.igem.wiki/teams/6341/wiki/content/wet-lab/western-blot.avif" alt="Western blot wet transfer system">
<figcaption class="caption">Image credit: Western blot wet transfer system image by Lilly M, licensed under CC BY-SA 3.0. Source: <a href="https://commons.wikimedia.org/wiki/File:Western_blot_wet_transfer_system_Criterion-02.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
</figure>

- Dsup constructs in all three of our chassis contained a c-myc tag, which is a short peptide epitope tag widely utilized for immunodetection and characterization of recombinant proteins. In particular, we used it for Western Blots

#### 3C Protease Cleavage Site — Site-Specific Removal of Fusion Tags

- Whenever His tag was present in our constructs, it was separated from the protein coding sequence by 3C protease cleavage site. Essentially, this is a short protease recognition sequence incorporated into recombinant fusion proteins
- It was originally derived from the recognition sequence of human rhinovirus 3C (HRV 3C) protease, a viral cysteine protease involved in processing viral polyproteins <a class="cite" href="#ref-19">19</a>. HRV 3C protease recognizes the specific amino acid residue sequence illustrated below <a class="cite" href="#ref-20">20</a> and hydrolyzes the peptide bond between glutamine (Q) and glycine (G). As a result, affinity tags, fusion proteins, and other fused peptides can get removed from the rest of the protein
- Recognition sequence:

<div class="photo-frame light">

![HRV 3C protease recognition sequence](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/hrv3c-site.avif)

</div>

<div class="caption">

where ↓ indicates the peptide bond cleaved by HRV 3C protease

</div>

## References

<ol class="ref-list">

<li id="ref-1"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5009755/" target="_blank" rel="noopener noreferrer">pmc.ncbi.nlm.nih.gov/articles/PMC5009755</a> — cited for the PVeg constitutive promoter.</li>
<li id="ref-2"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1538763/" target="_blank" rel="noopener noreferrer">pmc.ncbi.nlm.nih.gov/articles/PMC1538763</a> — cited for the TEF1 promoter and eEF1A.</li>
<li id="ref-3"><a href="https://www.nature.com/articles/ncomms12808" target="_blank" rel="noopener noreferrer">nature.com/articles/ncomms12808</a> — cited for Dsup's chromatin association and its protective effect in human HEK293 cells.</li>
<li id="ref-4"><a href="https://www.nature.com/articles/s41467-025-63652-3" target="_blank" rel="noopener noreferrer">nature.com/articles/s41467-025-63652-3</a> — cited for Dsup's multivalent interaction with chromatin.</li>
<li id="ref-5"><a href="https://elifesciences.org/articles/47682" target="_blank" rel="noopener noreferrer">elifesciences.org/articles/47682</a> — cited for reduced DNA fragmentation in Dsup-expressing cells after H₂O₂ exposure.</li>
<li id="ref-6"><a href="https://www.sciencedirect.com/science/article/pii/0092867484904574" target="_blank" rel="noopener noreferrer">sciencedirect.com/science/article/pii/0092867484904574</a> — cited for the SV40 nuclear localization signal.</li>
<li id="ref-7"><a href="https://www.nature.com/articles/s41526-017-0015-y" target="_blank" rel="noopener noreferrer">nature.com/articles/s41526-017-0015-y</a> — cited for latent herpesvirus reactivation during spaceflight.</li>
<li id="ref-8"><a href="https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2019.00016/full" target="_blank" rel="noopener noreferrer">frontiersin.org — Frontiers in Microbiology 10:00016</a> — cited for spaceflight-induced immune dysregulation and herpesvirus reactivation.</li>
<li id="ref-9"><a href="https://www.nature.com/articles/s41586-025-09438-5" target="_blank" rel="noopener noreferrer">nature.com/articles/s41586-025-09438-5</a> — Vollmer et al. (2025), cited for the characterization of Nb1_gbHSV.</li>
<li id="ref-10"><a href="https://aacrjournals.org/cancerimmunolres/article-abstract/10/6/713/699032/T-Cell-Mediated-Targeted-Delivery-of-Anti-PD-L1" target="_blank" rel="noopener noreferrer">aacrjournals.org — Cancer Immunology Research 10(6):713</a> — cited for the anti-PD-L1 nanobody and PD-1/PD-L1 blockade.</li>
<li id="ref-11"><a href="https://www.nasa.gov/directorates/esdmd/hhp/risk-of-radiation-carcinogenesis" target="_blank" rel="noopener noreferrer">NASA — Risk of Radiation Carcinogenesis</a> — cited for long-term cancer risk from spaceflight radiation exposure.</li>
<li id="ref-12"><a href="https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.83.1245" target="_blank" rel="noopener noreferrer">journals.aps.org — Reviews of Modern Physics 83:1245</a> — cited for cosmic radiation and DNA damage.</li>
<li id="ref-13"><a href="https://journals.iucr.org/paper?S1399004714000996" target="_blank" rel="noopener noreferrer">journals.iucr.org — S1399004714000996</a> — cited for FfIBP's ice-binding surface.</li>
<li id="ref-14"><a href="https://journals.iucr.org/paper?S1744309112020465" target="_blank" rel="noopener noreferrer">journals.iucr.org — S1744309112020465</a> — cited for FfIBP's ice-binding surface.</li>
<li id="ref-15"><a href="https://www.sciencedirect.com/science/article/pii/S0011224012001824" target="_blank" rel="noopener noreferrer">sciencedirect.com/science/article/pii/S0011224012001824</a> — cited for FfIBP's thermal hysteresis relative to LeIBP.</li>
<li id="ref-16"><a href="https://www.sciencedirect.com/science/article/pii/S0011224012000399" target="_blank" rel="noopener noreferrer">sciencedirect.com/science/article/pii/S0011224012000399</a> — cited for LeIBP and its psychrophilic Arctic yeast source.</li>
<li id="ref-17"><a href="https://www.nature.com/articles/nbt1037" target="_blank" rel="noopener noreferrer">nature.com/articles/nbt1037</a> — cited for mCherry's derivation from DsRed by directed evolution.</li>
<li id="ref-18"><a href="https://www.sciencedirect.com/science/article/pii/0378111995006850" target="_blank" rel="noopener noreferrer">sciencedirect.com/science/article/pii/0378111995006850</a> — cited for GFPmut2's engineering by FACS.</li>
<li id="ref-19"><a href="https://www.sciencedirect.com/science/article/pii/S0021925819388118" target="_blank" rel="noopener noreferrer">sciencedirect.com/science/article/pii/S0021925819388118</a> — cited for HRV 3C protease and viral polyprotein processing.</li>
<li id="ref-20"><a href="https://pubs.acs.org/acbcct/article/15/1/63/798177/Quantitative-Analysis-of-the-Substrate-Specificity" target="_blank" rel="noopener noreferrer">pubs.acs.org — Quantitative Analysis of the Substrate Specificity…</a> — cited for the HRV 3C recognition sequence.</li>

</ol>
