## Design Overview

In our project, we were working with **three different chassis**: _B. subtilis_, _P. pastoris_, and _S. cerevisiae_. We engineered these organisms using a combination of **genomic recombineering and episomal plasmids**, which allowed us to explore different strategies for stable and inducible heterologous gene expression.

All three chassis were engineered to contain **Dsup** protein stably integrated into their genome for enhanced radiation resistance. Subsequently, the host cells were transformed to express a range of **protein payloads** that can be useful for astronauts during their space missions.

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
<tr><th scope="row">Promoters</th><td>…</td><td>pAOX1</td><td>pGAL, pADH1</td></tr>
<tr><th scope="row">Terminators</th><td>…</td><td>tAOX1</td><td>pCYC1</td></tr>
<tr><th scope="row">Selection markers</th><td>Spectinomycin, Chloramphenicol</td><td>Zeocin</td><td>G418, URA3</td></tr>
</tbody>
</table>
</div>

## Bacillus subtilis

<div class="callout warn">

<p class="callout-label">Where we are right now</p>

The _B. subtilis_ chassis overview, promoters and terminators are still being written — the source document carries them as placeholders. This section will be filled in as the text is finalised.

</div>

#### Chassis overview

…

#### Expression vectors

- pBS4S
- pHT-ads

## Pichia pastoris

#### Chassis overview

Pichia pastoris (Komagataella phaffii) is a methylotrophic yeast widely used as a chassis for recombinant protein production, especially in industry. Pichia is a eukaryotic microorganism that can be easily cultivated similarly to _E. coli_, which makes it particularly useful as it combines relatively simple cultivation with cellular machinery for protein folding, disulfide bond formation, post-translational modification, and secretion. Hence, it can be a great alternative to traditional _E. coli_ based production for more complex proteins.

_P. pastoris_ also supports stable genomic integration of heterologous expression cassettes through homologous recombination. Integrative vectors, such as the ones we used in this project, are particularly easy to work with as they generate stable recombinant strains without relying on continuous maintenance of an episomal expression plasmid.

Another major advantage of this chassis is its secretory capacity. Heterologous proteins can be directed through the endoplasmic reticulum and Golgi using secretion signals. The most well-characterized example is α-mating-factor leader derived from _S. cerevisiae_. Because Pichia naturally secretes relatively limited amounts of endogenous protein, secretion can simplify downstream recovery and purification of recombinant products.

Overall, _P. pastoris_ is a highly robust eukaryotic chassis that supports high cell density growth, regulated recombinant expression, stable genome engineering, and efficient protein secretion.

#### Expression vectors

<span class="chip">pPICZ A</span>

<div class="photo-frame">

![pPICZ A vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/image3.avif)

</div>

<div class="caption">

pPICZ A vector map (via SnapGene)

</div>

- Cytosolic protein expression
- Architecture overview:

<div class="flow">
<span class="flow-node amber">5′ AOX1 region</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">AOX1 promoter</span>
<span class="flow-arrow">→</span>
<span class="flow-node">MCS</span>
<span class="flow-arrow">→</span>
<span class="flow-node">c-Myc</span>
<span class="flow-arrow">→</span>
<span class="flow-node">6×His</span>
<span class="flow-arrow">→</span>
<span class="flow-node">STOP</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">AOX1 transcription terminator</span>
</div>

- This vector is classified as a Shuttle vector, meaning that it contains pUC ori for propagation in _E. coli_
- Selection marker: Zeocin (25 ug/ml for _E. coli_, 100 ug/ml for _P. pastoris_)
- No ori for Pichia pastoris is present in this vector, as it is supposed to be integrated directly into the genome of the cell. The expression cassette contains the AOX1 promoter/5′ AOX1 sequence upstream of the MCS and the AOX1 transcription-termination region downstream. These sequences originate from the native AOX1 locus present in the genome of Pichia. Hence, the cassette provides homology between the introduced plasmid and the chromosome. For homologous recombination to occur, the DNA must be linearized, preferably in the AOX1 promoter.

<span class="chip">pPICZα A</span>

<div class="photo-frame">

![pPICZα A vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/image5.avif)

</div>

<div class="caption">

pPICZα A vector map (via SnapGene)

</div>

- This backbone is based on pPICZ A sequence. However, in addition to the above, contains an α-factor secretion signal for export of the recombinant proteins out of the producing cell.
- Architecture overview:

<div class="flow">
<span class="flow-node amber">5′ AOX1 region</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">AOX1 promoter</span>
<span class="flow-arrow">→</span>
<span class="flow-node accent">α-factor secretion signal</span>
<span class="flow-arrow">→</span>
<span class="flow-node">MCS</span>
<span class="flow-arrow">→</span>
<span class="flow-node">c-Myc</span>
<span class="flow-arrow">→</span>
<span class="flow-node">6×His</span>
<span class="flow-arrow">→</span>
<span class="flow-node">STOP</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">AOX1 transcription terminator</span>
</div>

#### AOX1 Locus

The AOX1 (alcohol oxidase 1) locus is a crucial component of methanol metabolism in Pichia pastoris. AOX1 encodes alcohol oxidase 1 (Aox1). This is a peroxisomal enzyme that catalyzes the first step of methanol utilization by oxidizing methanol to formaldehyde while generating hydrogen peroxide. During growth on methanol, Aox1 constitutes a major fraction of cellular protein, reflecting the exceptionally strong transcriptional activation of the AOX1 gene.

The locus is widely exploited for recombinant protein production because AOX1-derived sequences can serve both as regulatory elements for transgene expression and as homology regions for genomic integration. _K. phaffii_ also contains AOX2, which encodes a second alcohol oxidase but contributes substantially less to overall alcohol oxidase activity under typical methanol-growth conditions.

#### AOX1 Promoter

The AOX1 promoter (pAOX1) is a strong promoter inducible during growth on methanol. Typically, 0.5-1% concentrations are used for a good balance between high levels of protein production and cellular toxicity of methanol. The transcription is repressed in the presence of more preferred carbon sources, such as glucose. Under such repressive conditions, basal promoter activity is very low.

Protein expression under pAOX1 consists of a glycerol growth phase, followed by a methanol induction phase. The glycerol stage is crucial for efficient biomass accumulation, which is important for achieving high protein yields. After cells are pelleted down, they are resuspended in methanol-containing media that activates the native methanol utilization pathway and strongly induces pAOX1. As a result, cellular resources get shifted toward recombinant protein production.

## Saccharomyces cerevisiae

#### Chassis overview

Saccharomyces cerevisiae is commonly known as baker's yeast. It is also a unicellular eukaryotic microorganism and one of the most extensively characterized model organisms in molecular biology and metabolic engineering. _S. cerevisiae_ was actively used for recombinant protein production and recombineering for decades as it combines rapid growth, a well-established synbio toolbox, and many other useful properties.

As a eukaryotic expression host, _S. cerevisiae_ possesses cellular machinery for protein folding, disulfide-bond formation, post-translational modification, and secretion, enabling the production of proteins that may be difficult to express correctly in bacterial systems.

Recombinant proteins can be either expressed intracellularly or secreted from the cells through, for instance, α-mating-factor leader.

A crucial advantage of _S. cerevisiae_ is its exceptionally efficient homologous recombination machinery that enables targeted genomic integration, gene deletion, pathway assembly, and other genome-engineering strategies. A large collection of characterized promoters, terminators, selectable markers, plasmids, and genome-editing tools further enables precise control over heterologous gene expression.

In general, _S. cerevisiae_ has a long history of use in food production, biotechnology, and fundamental research, making it one of the highly safe and efficient golden standard chassis.

#### Expression vectors

<span class="chip">HO-poly-KanMX4-HO</span>

<div class="photo-frame">

![HO-poly-KanMX4-HO vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/image1.avif)

</div>

<div class="caption">

HO-poly-KanMX4-HO vector map (via SnapGene)

</div>

- Cytosolic protein expression
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

<span class="chip">pYES2</span>

<div class="photo-frame">

![pYES2 vector map](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/image2.avif)

</div>

<div class="caption">

pYES2 vector map (via SnapGene)

</div>

- pYES2 was designed for inducible heterologous gene expression in yeast.
- In this shuttle vector, selection in _E. coli_ also occurs using ampicillin.
- Unlike the above-mentioned backbones, pYES2 is an episomal plasmid. It contains a 2µ origin of replication, allowing autonomous episomal replication in _S. cerevisiae_. The recombinant expression cassette is maintained on a multicopy plasmid under appropriate selective conditions.
- In yeast, pYES2 contains the URA3 selectable marker, which complements ura3 auxotrophy and enables selection of plasmid-containing cells on medium lacking uracil. This makes the vector particularly suitable for strains such as INVSc1 (ura3-52) that we used for our project.

#### GAL Promoter

The GAL regulatory system provides inducible expression in response to galactose. This promoter is characterized as a strong, tightly regulated promoter. The system relies on the galactose utilization pathway native to the yeast. The regulation is mediated via Gal4, Gal80, Gal3 regulatory network. In the absence of galactose, the transcriptional activator Gal4 is bound to upstream activating sequences (UAS) within the promoter, but its activation domain is inhibited by Gal80. In the presence of galactose, Gal3 binds galactose and ATP and interacts with Gal80, relieving Gal80-mediated inhibition of Gal4. Active Gal4 subsequently recruits the transcriptional machinery and strongly induces transcription from the promoter.

#### ADH1 Promoter (promoter swap)

The ADH1 promoter is a strong, constitutive promoter derived from the _S. cerevisiae_ ADH1 gene, which encodes alcohol dehydrogenase I. pADH1 is commonly utilized in yeast genetic engineering to drive continuous heterologous gene expression without requiring the addition of an external inducer. The promoter exhibits the highest activity during fermentative growth on glucose, which is due to the physiological demand for alcohol dehydrogenase in ethanol production.

## II. Radiation resistance

**Damage suppressor (Dsup)** is a chromatin-associated protein natively expressed in the _Ramazzottius varieornatus_ tardigrade. Tardigrades are microscopic invertebrates, which are classified as extremotolerants due to their substincial ability to survive severe environmental stresses, including desiccation and high levels of ionizing radiation. Dsup was discovered during genomic and proteomic characterization of _R. varieornatus_ as an abundant, highly basic nuclear protein capable of associating with DNA. Its identification provided evidence that, in addition to efficient stress-response and repair systems, tardigrades possess proteins capable of directly protecting their genetic material from damage.

<div class="photo-frame">

![Dsup model](https://static.igem.wiki/teams/6341/wiki/content/wet-lab/image4.avif)

</div>

<div class="caption">

Dsup model

</div>

#### Molecular Mechanism of DNA Protection

Dsup is a highly charged and largely intrinsically disordered protein that localizes to chromatin. Previous research has demonstrated that it contains a positively charged C-terminal region. This domain is required for DNA association and for protection against radiation-induced DNA damage. More in-depth biochemical studies showed that Dsup preferentially associates with nucleosomes rather than free DNA, indicating that its physiological target is chromatin.

A conserved region within the C-terminal portion of Dsup resembles the nucleosome-binding motif of vertebrate high-mobility group N (HMGN) proteins. Disruption of this HMGN-like region substantially reduces nucleosome binding and correspondingly decreases DNA protection. More recent structural and biochemical work has further demonstrated that Dsup interacts multivalently with chromatin, including contacts with nucleosomal DNA, the H2A/H2B acidic patch, and H3/H4 histone tails.

Following association with nucleosomes, the disordered regions of Dsup are proposed to form a protective environment around chromosomal DNA. This physical shielding reduces the accessibility of DNA to highly reactive species, particularly hydroxyl radicals. In vitro experiments have demonstrated that Dsup-bound chromatin is substantially more resistant to hydroxyl-radical-mediated DNA cleavage than unprotected chromatin.

#### Protection Against Ionizing Radiation and Oxidative Stress

Ionizing radiation damages cellular DNA through both direct and indirect mechanisms. Radiation can directly deposit energy into DNA, but a substantial fraction of biological damage arises indirectly through the radiolysis of intracellular water, which generates reactive oxygen species, including highly reactive hydroxyl radicals. These radicals can attack DNA bases and the deoxyribose backbone, producing base modifications and single- and double-strand breaks.

The protective function of Dsup was first demonstrated heterologously in human HEK293 cells. Expression of _R. varieornatus_ Dsup reduced X-ray-induced DNA fragmentation and decreased markers of double-strand breaks. Dsup-expressing cells also exhibited improved proliferative capacity following irradiation.

The protective activity of Dsup is not limited to radiation itself. Ionizing radiation and oxidative stress converge mechanistically through the generation of reactive oxygen species (ROS), making protection against oxidative DNA damage particularly relevant to Dsup function.

Hydrogen peroxide (H₂O₂), for example, can generate highly reactive hydroxyl radicals through metal-catalyzed reactions. These radicals rapidly attack DNA and other cellular macromolecules. The original characterization of Dsup demonstrated that Dsup-expressing human cells exhibited substantially reduced DNA fragmentation following H₂O₂ exposure, indicating protection against ROS-mediated DNA damage.

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
<tr><th scope="row"></th><td colspan="3">Dsup</td></tr>
<tr><th scope="row">Payloads</th><td colspan="3"></td></tr>
<tr><th scope="row">Nb1_gbHSV</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">PDL1 Nb</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">LeIBP (AFP)</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">FfIBP (AFP)</th><td>+</td><td>+</td><td>+</td></tr>
<tr><th scope="row">mCherry</th><td>-</td><td>+</td><td>+</td></tr>
<tr><th scope="row">GFP</th><td>+</td><td>-</td><td>-</td></tr>
</tbody>
</table>
</div>
