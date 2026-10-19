## Radiation resistance tests

<div class="chip-row">
<span class="chip">Wet Lab · Protocols</span>
<span class="chip amber"><i>B. subtilis</i></span>
<span class="chip amber"><i>S. cerevisiae</i></span>
<span class="chip amber"><i>P. pastoris</i></span>
</div>

We optimized experimental workflows for evaluating microbial resistance to UV and X-ray irradiation for the following three organisms: *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Pichia pastoris*. The protocol collection includes sample preparation, irradiation conditions, subsequent viability assays (resazurin, FUN-1 dye, and colony-forming unit (CFU) assays), and comet assays.

<div class="panel">
<div class="panel-title"><span>Workflow covered by the protocols</span><span>3 chassis</span></div>
<div class="flow">
<span class="flow-node">Sample preparation</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">UV / X-ray irradiation</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Viability assays: Resazurin, FUN-1, CFU</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Comet assay</span>
</div>
</div>

Throughout this project, we were able to identify and highlight the main aspects and challenges of performing these experiments for the above-mentioned chassis. By sharing our optimized protocols, observations, and recommendations, we hope to provide future iGEM teams with a reproducible framework for evaluating radiation resistance of their genetically engineered/wild-type microorganisms.

## Protein expression and ÄKTA purification handbook

<div class="chip-row">
<span class="chip">Wet Lab · Handbook</span>
<span class="chip amber"><i>P. pastoris</i></span>
<span class="chip amber"><i>B. subtilis</i></span>
</div>

We developed a practical handbook covering recombinant protein expression, secretion, and purification in *P. pastoris* and *B. subtilis*. Other iGEMers and scientists can use the handbook to facilitate their research related to any kind of protein purification in similar settings.

<div class="panel">
<div class="panel-title"><span>Step-by-step guidance in the handbook</span><span>Expression → purification</span></div>
<div class="flow">
<span class="flow-node">Transformation</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Cell culture preparation</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Induction</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Secreted protein sample preparation</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">ÄKTA HisTrap purification</span>
</div>
</div>

We also provide guidance on preparing buffers for ÄKTA immobilized metal affinity chromatography (IMAC) and various other recommendations, such as notes on storing purified proteins.

<div class="figure-grid single">
<figure><div class="photo-frame"><img src="https://static.igem.wiki/teams/6341/wiki/content/contribution/handbook.avif" alt="Cover of the Practical Protein Expression and ÄKTA Purification Handbook for P. pastoris and B. subtilis, showing an ÄKTA pure chromatography system"></div><figcaption class="caption"><strong>Figure 1. Cover of our Practical Protein Expression and ÄKTA Purification Handbook for <i>P. pastoris</i> and <i>B. subtilis</i>.</strong></figcaption></figure>
</div>

## Safety handbook

<div class="chip-row">
<span class="chip">Wet Lab · Handbook</span>
<span class="chip amber"><i>P. pastoris</i></span>
<span class="chip amber"><i>S. cerevisiae</i></span>
<span class="chip amber"><i>B. subtilis</i></span>
</div>

We developed a biosafety handbook for safe handling and genetic engineering of *P. pastoris*, *S. cerevisiae*, and *B. subtilis* in laboratory settings. The handbook contains specific safety considerations, waste management, safe handling, etc. We hope that it will help future iGEM teams implement responsible laboratory practices and integrate biosafety considerations into their lab work.

See how these practices fit into SHIHAB as a whole on our <a href="/kaust-ksa/safety-and-security">Safety</a> page.

## Gene mining pipeline

<div class="chip-row">
<span class="chip">Dry Lab · Software</span>
</div>

Our contribution is the analysis and filtration pipeline from the genome database of the Empty Quarter samples. We worked on the scoring layer and the scripts that audit the output of the filtration step, looking for mistakes. These filtration and auditing layers are packaged as a reusable workflow that other dry lab teams can use.

<div class="panel">
<div class="panel-title"><span>Pipeline</span><span>Reusable workflow</span></div>
<div class="flow">
<span class="flow-node">Empty Quarter genome database</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Filtration</span>
<span class="flow-arrow">→</span>
<span class="flow-node">Scoring layer</span>
<span class="flow-arrow">→</span>
<span class="flow-node amber">Audit scripts</span>
</div>
</div>

When we ran the audit scripts, 53 candidates became 45:

<div class="stat-grid">
<div><strong>53</strong><span>Candidates before the audit</span></div>
<div class="hi"><strong>45</strong><span>Candidates after the audit</span></div>
</div>

<div class="card-grid row">

<div>

#### *recA*

The audit caught our own recommended DNA-repair pick: *recA* at composite 0.85 is 49% of full length, and was flagged as a probable pseudogene.

</div>

<div>

#### DUF3494

The audit layer highlighted our most quotable claim, a DUF3494 ice-binding domain, which is really a 1,349 aa surface-adhesion protein with no independent eggNOG support.

</div>

</div>

The full pipeline and its results are on our <a href="/kaust-ksa/software">Software</a> page.

## GEM models

<div class="chip-row">
<span class="chip">Dry Lab · Model</span>
<span class="chip amber"><i>B. subtilis</i></span>
</div>

What we can hand to other teams is the repaired *Bacillus* genome-scale metabolic model (GEM).

<div class="two-col-tracks">

<div>

#### iBsu1147 as published

Produces no biomass at all without oxygen, which is a gap in the model itself, since the organism can survive with anaerobic respiration.

</div>

<div>

#### Our repair

We traced the gap to two oxygen-dependent steps and gave them electron acceptors *B. subtilis* uses.

</div>

</div>

The two reactions and how we found them are described in <a href="/kaust-ksa/model#gapfill">the gap-filling section</a> of our Modeling page.

## Replicable mentorship framework

<div class="chip-row">
<span class="chip">Education · Framework</span>
</div>

We developed a structured and replicable mentorship program framework to help future iGEM teams establish and manage their own educational programs. To make the program easily adaptable, we compiled a comprehensive set of resources, including:

<div class="chip-row">
<span class="chip amber">Mentor guidelines</span>
<span class="chip amber">Week-by-week curriculum</span>
<span class="chip amber">Student onboarding materials</span>
<span class="chip amber">Entry &amp; exit feedback forms</span>
</div>

The feedback forms assess participants' learning experiences and progress. All materials are openly available for future teams to access, modify, and implement in their own mentorship programs. With this work, we aim to promote accessibility of synthetic biology education.

Read about the programs themselves on our <a href="/kaust-ksa/education">Education</a> page.

## Regulatory landscape

<div class="chip-row">
<span class="chip">Human Practices · Analysis</span>
</div>

We developed a regulatory analysis to help future iGEM teams understand the requirements and challenges involved in translating synthetic biology innovations beyond the laboratory. Using SHIHAB as a case study, we explored:

<div class="chip-row">
<span class="chip amber">Biosafety oversight</span>
<span class="chip amber">Pharmaceutical development &amp; manufacturing</span>
<span class="chip amber">FDA &amp; SFDA pathways</span>
<span class="chip amber">Biological systems in space</span>
</div>

<div class="callout">

<p class="callout-label">Beyond conventional manufacturing</p>

Our analysis also examined existing regulatory gaps and emerging challenges associated with decentralized therapeutic production, where conventional manufacturing facilities and quality-control infrastructure may not be available.

</div>

Read the full analysis on our <a href="/kaust-ksa/human-practices">Integrated Human Practices</a> page.
