## Radiation Resistance Tests

We optimized experimental workflows for evaluating microbial resistance to UV and X-ray irradiation for the three following organisms: *B. subtilis*, *S. cerevisiae*, and *P. pastoris*. The protocols collection include sample preparation, irradiation conditions, subsequent viability assays (Resazurin, FUN-1 dye, and Colony Forming Unit assays), and comet assays. Throughout this project, we were able to identify and highlight main important aspects and challenges of performing these experiments for the above-mentioned chassis. By sharing our optimized protocols, observations, and recommendations, we hope to provide future iGEM teams with a reproducible framework for evaluating radiation resistance of their genetically engineered/wild-type microorganisms.

## Protein Expression and ÄKTA Purification Handbook

We developed a practical handbook covering recombinant protein expression, secretion, and purification in *P. pastoris* and *B. subtilis*. The handbook provides step by step guidance on transformations, cell culture preparation, induction conditions, secreted protein sample preparation, and ÄKTA HisTrap system usage. We also provide guidance on buffers' preparation for ÄKTA IMAC and various other recommendations, such as purified proteins storage notes. Other iGEMers and scientists can use the handbook to facilitate their research related to any kind of protein purification in similar settings.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/contribution/handbook.avif" alt="Cover of the Practical Protein Expression and ÄKTA Purification Handbook for P. pastoris and B. subtilis, showing an ÄKTA pure chromatography system"></div><figcaption class="caption"><strong>Figure 1.</strong> Cover of our Practical Protein Expression and ÄKTA Purification Handbook for <i>P. pastoris</i> and <i>B. subtilis</i>.</figcaption></figure>
</div>

## Safety Handbook

We developed a biosafety handbook for safe handling and genetic engineering of *P. pastoris*, *S. cerevisiae*, and *B. subtilis* in laboratory settings. The handbook contains specific safety considerations, waste management, safe handling, etc. We hope that it will help future iGEM teams implement responsible laboratory practices and integrate biosafety considerations into their lab works.

## Gene Mining Pipeline

Our contribution is the analysis and filtration pipeline from the genome database of the empty quarter samples. We worked on the scoring layer and the scripts that audits the output of the filtration step looking for mistakes. When we ran them, 53 candidates became 45. They caught our own recommended DNA-repair pick, recA at composite 0.85, which is 49% of full length, flagged as a probable pseudogene. The audit layer highlighted our most quotable claim, a DUF3494 ice-binding domain, which is really a 1,349 aa surface-adhesion protein with no independent eggNOG support. These filtration and auditing layers are packaged as a reusable workflow that other Drylab teams can use.

## GEM Models

What we can hand to other teams is the repaired *Bacillus* model. iBsu1147 as published produces no biomass at all without oxygen, which is a gap in the model itself since the organism can survive with anaerobic respiration, and we traced it to two oxygen-dependent steps and gave them electron acceptors *B. subtilis* uses.

## Replicable Mentorship Framework

We developed a structured and replicable mentorship program framework to help future iGEM teams establish and manage their own educational programs. To make the program easily adaptable, we compiled a comprehensive set of resources, including mentor guidelines, a week-by-week curriculum, student onboarding materials, entry and exit feedback forms to assess participants' learning experiences and progress, and more! All materials are openly available for future teams to access, modify, and implement in their own mentorship programs. With this work, we aim to promote accessibility of synthetic biology education.

## Regulatory Landscape

We developed a regulatory analysis to help future iGEM teams understand the requirements and challenges involved in translating synthetic biology innovations beyond the laboratory. Using SHIHAB as a case study, we explored biosafety oversight, pharmaceutical development and manufacturing requirements, FDA and SFDA regulatory pathways, and additional considerations for biological systems operating in space.

Our analysis also examined existing regulatory gaps and emerging challenges associated with decentralized therapeutic production, where conventional manufacturing facilities and quality-control infrastructure may not be available.

Read the full analysis on our <a href="/kaust-ksa/human-integrated-practices">Integrated Human Practices</a> page.
