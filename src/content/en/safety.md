## Overview

Our system employs three engineered chassis (*Saccharomyces cerevisiae*, *Pichia pastoris*, and *Bacillus subtilis*) to produce various recombinant proteins. Hence, safety regulations related to the corresponding laboratory activities were thoroughly implemented throughout this project’s design and development. Moreover, biosafety was also a central part of our hardware design, ensuring that the microbial organisms cannot escape the contained environment and can be efficiently sterilized at the end of protein production. All experimental work is conducted at KAUST under Biosafety Level 1 (BSL-1) containment. No human pathogens, toxin-encoding genes, or other parts not listed in the white list were used in this project.

## Chassis organisms

<div class="card-grid stack">

<div>

#### *Saccharomyces cerevisiae* (baker's yeast)

<div class="figure-grid single">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/safety/s-cerevisiae-sem.avif" alt="Saccharomyces cerevisiae cells under a scanning electron microscope"><figcaption class="caption"><strong>Figure 1. <i>S. cerevisiae</i> under a scanning electron microscope.</strong> Image: Mogana Das Murtey and Patchamuthu Ramasamy, <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC BY 3.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Saccharomyces_cerevisiae_SEM.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption></figure>
</div>

_S. cerevisiae_ is classified as **Risk Group 1** by the World Health Organization and is on the U.S. FDA's Generally Recognized as Safe (GRAS) list. It is one of the most extensively studied eukaryotic model organisms, with a centuries-long history of safe use in food, beverage, and pharmaceutical manufacturing. Our strain is based on a standard laboratory background (INVSc1) further attenuated through auxotrophic engineering (see below). _S. cerevisiae_ does not sporulate under standard laboratory conditions and is not pathogenic to healthy humans, animals, or plants.

</div>

<div>

#### *Pichia pastoris* (*Komagataella phaffii*)

<div class="figure-grid single">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/safety/p-pastoris.avif" alt="Pichia pastoris GS115 cells under a microscope"><figcaption class="caption"><strong>Figure 2. <i>P. pastoris</i> GS115 cells under a microscope.</strong> Image: Jianguo Zhang and Taiyu Liu, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Pichia_pastoris_(Zhang_2017).jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption></figure>
</div>

_P. pastoris_ is classified as **Risk Group 1** and is widely used in industrial and pharmaceutical biotechnology for the production of recombinant proteins, including FDA-approved ones. It is non-pathogenic, non-sporulating under laboratory conditions, and has no known toxin-producing capability. Our _P. pastoris_ strain is based on the GS115 or X-33 background, modified to be auxotrophic.

</div>

<div>

#### *Bacillus subtilis*

<div class="figure-grid single">
<figure><img src="https://static.igem.wiki/teams/6341/wiki/content/safety/b-subtilis.avif" alt="Bacillus subtilis cells from a liquid culture under a phase-contrast microscope"><figcaption class="caption"><strong>Figure 3. <i>B. subtilis</i> from a liquid culture, phase contrast, 1,000×.</strong> Image: Kookaburra at German Wikipedia, public domain, via <a href="https://commons.wikimedia.org/wiki/File:Bacillus_subtilis_(2).jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.</figcaption></figure>
</div>

_B. subtilis_ is classified as **Risk Group 1** and is a GRAS organism commonly used in industrial enzyme and compound production. We use a non-pathogenic, laboratory-adapted strain (168). Strain 168 is also auxotrophic to prevent survival outside the controlled bioreactor environment.

</div>

</div>

## Containment strategies

<ol class="goals">

<li>

### Auxotrophic containment

All three chassis organisms in our platform are rendered **auxotrophic**. Auxotrophy means that an organism can’t produce a specific organic compound needed for its growth, making it incapable of growing without an external supply of specific nutrients. In the lab, we can readily supply these nutrients during media preparation. However, they are not readily available in natural environments, which leads to a strong containment barrier, ensuring that our chassis will only be able to proliferate within the bioreactor. Auxotrophic markers in our project include:

<div class="table-wrap">

| Organism                 | Auxotrophic markers             | Nutrient requirements                  |
| :----------------------- | :------------------------------ | :------------------------------------- |
| *S. cerevisiae* INVSc1   | *his3Δ1*, *leu2*, *trp1-289*, *ura3-52* | Histidine, leucine, tryptophan, uracil |
| *P. pastoris* PichiaPink | *ade2Δ*                         | Adenine                                |
| *B. subtilis* 168        | *trpC2*                         | Tryptophan                             |

</div>

</li>
<li>

### Bioreactor physical containment

Our protein production platform operates within closed, integrated bioreactor hardware. Hence, the cell culture will be physically contained within a sealed culture vessel that has no open-air contact during the protein payload expression stage. The bioreactor has a dedicated sterilization module, which can pass ethanol and bleach through the system once the cells must be discarded. As a result, no living organisms, culture media, or biological waste will leave the bioreactor without prior sterilization. The culture vessel, tubing, and connectors are all autoclavable, ensuring that further sterilization stages can be implemented.

</li>
<li>

### Genetic kill switch

While our current platform relies on auxotrophic containment and physical sterilization as primary safety barriers, the major next step that we are working on is to implement kill switches into each of the engineered chassis. Our planned approach includes a toxin-antitoxin system, in which an inducible toxin gene is suppressed only in the presence of a synthetic, non-natural inducer molecule supplied in the bioreactor medium. Once the inducer is removed, the toxin will lead to apoptosis of the host cell.

</li>

</ol>

## Laboratory safety practices

![HSE committee members with the team during the lab inspection](https://static.igem.wiki/teams/6341/wiki/content/safety/hse-lab-inspection.avif)

<div class="caption">

**Figure 4. Health, Safety and Environment (HSE) committee members with our team during the lab inspection.**

</div>

All team members completed mandatory KAUST biosafety training before beginning experimental work. Wet lab members completed additional safety training required to work with genetically modified organisms (GMOs), irradiation devices, recombinant DNA / dual-use research, etc.

Our team is supported by two principal investigators with expertise in synthetic biology and molecular biology, as well as two experienced laboratory managers. In addition, we have access to the KAUST HSE team, which provides guidance on biosafety, risk assessment, and safe laboratory practices. If any hazards or unexpected risks arise during the project, we would immediately consult these experts to assess the situation and implement appropriate mitigation measures.

Our project is conducted in accordance with the biosafety and biosecurity policies of the Kingdom of Saudi Arabia and King Abdullah University of Science and Technology (KAUST). At the institutional level, all work involving different laboratory activities, including GMO, is governed by the regulations of the KAUST HSE department and is subject to oversight by the Institutional Biosafety and Bioethics Committee (IBEC). Our lab regularly passes the HSE lab safety inspections required for all KAUST labs.

All work is performed in a BSL-1 certified laboratory with personal protective equipment (gloves, lab coat, eye protection) at all times. All biological waste is autoclaved before disposal. Biohazards, sharps, and chemical waste disposal follows KAUST HSE guidelines. Emergency response protocols are posted at all lab entrances. The laboratories are equipped with proper microbiological workstations, chemical storage, emergency eyewash stations, safety showers, fire extinguishers, spill response materials, etc. Laboratory access is restricted to authorized personnel who have completed the required safety training, and our work is performed under the supervision of experienced principal investigators and laboratory managers.

<div class="two-col-images">

![KAUST laboratory benches](https://static.igem.wiki/teams/6341/wiki/content/safety/kaust-lab-benches.avif)

![KAUST laboratory fume hood and safety signage](https://static.igem.wiki/teams/6341/wiki/content/safety/kaust-lab-fume-hood.avif)

</div>

<div class="caption">

**Figure 5. Our laboratory.**

</div>

## Laboratory safety handbook

To promote safe laboratory practices and responsible handling of genetically modified microorganisms, we developed a Laboratory Safety Handbook.

The handbook was based on KAUST Health, Safety, and Environment (HSE) guidelines and includes general laboratory biosafety practices, personal protective equipment (PPE), emergency procedures, biological and chemical waste management, decontamination methods, and equipment safety. We also incorporated organism-specific biosafety considerations for our three chassis: *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Pichia pastoris*.

We hope this resource will help future iGEM teams establish safer laboratory workflows.

<iframe class="pdf-viewer" src="https://static.igem.wiki/teams/6341/wiki/content/safety/safety-handbook-kaust-ksa-igem.pdf" title="KAUST-KSA iGEM Laboratory Safety Handbook (PDF)" loading="lazy"></iframe>

<p><a class="person-link-btn" href="https://static.igem.wiki/teams/6341/wiki/content/safety/safety-handbook-kaust-ksa-igem.pdf" target="_blank" rel="noopener noreferrer">Open PDF in a new tab →</a></p>
