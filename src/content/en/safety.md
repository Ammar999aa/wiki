# Safety

## Overview

Our system employs three engineered chassis (Saccharomyces cerevisiae, Pichia pastoris, and Bacillus subtilis) to produce various recombinant proteins. Hence, safety regulations related to the corresponding laboratory activities were thoroughly implemented throughout this project’s design and development. Moreover, biosafety was also a central part of our hardware design, ensuring that the microbial organisms cannot escape the contained environment and can be efficiently sterilized at the end of protein production. All experimental work is conducted at KAUST under Biosafety Level 1 (BSL-1) containment. No human pathogens, toxin-encoding genes, or other parts not listed in the white list were used in this project.

## Chassis Organisms

### **Saccharomyces cerevisiae (Baker's Yeast)**

![Saccharomyces cerevisiae](https://static.igem.wiki/teams/6341/wiki/content/safety/image1.avif)

_S. cerevisiae_ is classified as **Risk Group 1** by the World Health Organization and is on the U.S. FDA's Generally Recognized as Safe (GRAS) list. It is one of the most extensively studied eukaryotic model organisms with a centuries-long history of safe use in food, beverage, and pharmaceutical manufacturing. Our strain is based on a standard laboratory background (INVSc1) further attenuated through auxotrophic engineering (see below). _S. cerevisiae_ does not sporulate under standard laboratory conditions and is not pathogenic to healthy humans, animals, or plants.

### **Pichia pastoris (Komagataella phaffii)**

![Pichia pastoris (Komagataella phaffii)](https://static.igem.wiki/teams/6341/wiki/content/safety/image2.avif)

_P. pastoris_ is classified as **Risk Group 1** and is widely used in industrial and pharmaceutical biotechnology for the production of recombinant proteins, including FDA-approved ones. It is non-pathogenic, non-sporulating under laboratory conditions, and has no known toxin-producing capability. Our _P. pastoris_ strain is based on the GS115 or X-33 background, modified to be auxotrophic.

### **Bacillus subtilis**

![Bacillus subtilis](https://static.igem.wiki/teams/6341/wiki/content/safety/image3.avif)

_B. subtilis_ is classified as **Risk Group 1** and is a GRAS organism commonly used in industrial enzyme and compound production. We use non-pathogenic, laboratory-adapted strain (168). 168 strain is also auxotrophic to prevent survival outside the controlled bioreactor environment.

## Containment Strategies

![Schematic summary of the project containment layers](https://static.igem.wiki/teams/6341/wiki/content/safety/image4.avif)

_Schematic summary of our containment layers strategy_

### **Auxotrophic Containment**

All three chassis organisms in our platform are rendered **auxotrophic**. Auxotrophy means that an organism can’t produce a specific organic compound needed for its growth, making them incapable of growing without the external supply of specific nutrients. In the lab, we can readily supply these nutrients during media preparation. However, they are not readily available in natural environments, which leads to a strong containment barrier, ensuring that our chassis will only be able to proliferate within the bioreactor. Auxotrophic markers in our project include:

| Organism                 | Auxotrophic markers             | Nutrient requirements                  |
| :----------------------- | :------------------------------ | :------------------------------------- |
| _S. cerevisiae INVSc1_   | his3Δ1, leu2, trp1-289, ura3-52 | Histidine, leucine, tryptophan, uracil |
| _P. pastoris PichiaPink_ | ade2Δ                           | Adenine                                |
| _B. subtilis 168_        | trpC2                           | Tryptophan                             |

### **Bioreactor Physical Containment**

Our protein production platform operates within a closed, integrated bioreactor hardware. Hence, the cell culture will be physically contained within a sealed culture vessel that lacks any open air contacts during protein payload expression stage. The bioreactor has a dedicated sterilization module, which can pass ethanol and bleach through the system once the cells must be discarded. As a result, no living organisms, culture media, or biological waste will leave the bioreactor without prior sterilization. The culture vessel, tubing, and connectors are all autoclavable, ensuring that further sterilization stages can be implemented.

### **Genetic Kill Switch**

While our current platform relies on auxotrophic containment and physical sterilization as primary safety barriers, the major next step that we are working on is to implement Kill Switches into each of the engineered chassis. Our planned approach includes a toxin-antitoxin system, in which an inducible toxin gene is suppressed only in the presence of a synthetic, non-natural inducer molecule supplied in the bioreactor medium. Once the inducer is removed, the toxin will lead to apoptosis of the host cell.

## Laboratory Safety Practices

All team members completed mandatory KAUST biosafety training before beginning experimental work. Wet lab members completed additional safety trainings required to work with Genetically Modified Organisms (GMO), irradiation devices, recombinant DNA / dual-use research, etc.

Our team is supported by two principal investigators with expertise in synthetic biology and molecular biology, as well as two experienced laboratory managers. In addition, we have access to the KAUST Health, Safety and Environment (HSE) team, which provides guidance on biosafety, risk assessment, and safe laboratory practices. If any hazards or unexpected risks arise during the project, we would immediately consult these experts to assess the situation and implement appropriate mitigation measures.

Our project is conducted in accordance with the biosafety and biosecurity policies of the Kingdom of Saudi Arabia and King Abdullah University of Science and Technology (KAUST). At the institutional level, all work involving different laboratory activities, including GMO, is governed by the regulations of KAUST HSE department and is subject to oversight by the Institutional Biosafety and Bioethics Committee (IBEC). Our lab regularly passes HSE Lab Safety Inspections required for all KAUST labs.

All work is performed in a BSL-1 certified laboratory with personal protective equipment (gloves, lab coat, eye protection) at all times. All biological waste is autoclaved before disposal. Biohazards, sharps, and chemical waste disposal follows KAUST HSE guidelines. Emergency response protocols are posted at all lab entrances. The laboratories are equipped with proper microbiological workstations, chemical storages, emergency eyewash stations, safety showers, fire extinguishers, spill response materials, etc. Laboratory access is restricted to authorized personnel who have completed the required safety training, and our work is performed under the supervision of experienced principal investigators and laboratory managers.
