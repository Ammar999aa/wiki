## Overview: Building Research for the Future

<div class="callout accent">

SHIHAB began with a simple question: What are astronauts missing?

</div>

At first, this question felt distant from the research we encounter in our everyday lives. But as we explored the challenges of human spaceflight, we realized that the future we were imagining is no longer science fiction. Space agencies around the world are preparing for missions that will take humans farther from Earth [[1]](#ref-1) and for longer periods than ever before. Behind these missions are not only explorers, but scientists working to expand our understanding of life: from how the human body adapts to space to how biological systems respond to environments beyond Earth [[2]](#ref-2).

<div class="callout warn">

As scientists ourselves, this changed the way we saw the problem. If astronauts are helping us push the boundaries of research, how can research help them?

</div>

<span class="hl">This question became the foundation of SHIHAB and of our Integrated Human Practices (IHP).</span> Developing a system for on-demand biomanufacturing in space requires much more than engineering microorganisms in the laboratory. It requires understanding the people who may use it, the environments in which it must operate, the regulations that could govern it, and the broader consequences of introducing such a technology.

Through more than 30 activities and stakeholder engagements, we explored SHIHAB from multiple perspectives, learning from astronauts, space medicine specialists, researchers, industry representatives, regulatory experts, and the wider community. Their experiences helped us question our assumptions, identify limitations, and make decisions about the biological design, hardware, safety, implementation, and communication of our project.

These conversations also pushed us to look beyond space. <span class="hl">The need for local and reliable access to therapeutics is not unique to astronauts.</span> Remote communities, disaster-affected regions, and other settings with disrupted or limited supply chains can face similar challenges in accessing essential medicines. What began as a question about medical autonomy beyond Earth therefore became a broader exploration of how decentralized biomanufacturing could contribute to healthcare both in space and on Earth.

Our Human Practices journey was not separate from SHIHAB, it became part of how we built it. By continuously connecting stakeholder needs, scientific evidence, societal perspectives, and our own experimental work, we aimed to transform an ambitious idea into a more responsible, relevant, and realistic solution.

## Understanding Our Impact and Responsibility

For most of our team, applying research to space exploration was entirely new territory. As we began developing SHIHAB, we quickly realized that working in an unfamiliar and rapidly evolving field also came with a significant responsibility. This meant that before moving into design decisions, we first had to ground ourselves in the realities of space healthcare and the constraints of the environment we were working toward. We needed to understand the context in which our ideas could operate, recognize the limitations of our own expertise, and consider the risks and consequences our decisions could have.

Our first questions soon led to many others.

## Exploring The Unknown

**What do we think the problem is?**

Our journey began before SHIHAB had a name or a defined solution. As a team with little previous experience in space research, we started from curiosity rather than certainty. Instead of assuming which challenges would be most important for future human space exploration, we began by brainstorming as a team and opening the same question to our KAUST community.

<div class="callout accent">

<p class="callout-label">The question we put to KAUST</p>

When you think about living in space, what is the biggest challenge humans will face?

</div>

<div class="two-col-images">

<div class="crop-frame" style="--crop-ratio: 900 / 675;">

![KAUST GEM team members at their outreach booth, collecting survey answers from the community](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/booth-outreach.avif)

</div>

<div class="crop-frame" style="--crop-ratio: 900 / 675; --crop-pos: 50% 30%;">

![Whiteboard covered in sticky-note responses to the team's outreach survey questions](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/whiteboard-survey.avif)

</div>

</div>

The responses reflected many of the questions we had been discussing ourselves: **Oxygen, food, water, radiation, and medicine.** We therefore turned to scientific literature, reports, and previous research in space biology to understand these challenges more deeply and determine where our background in synthetic biology could make a meaningful contribution.

<details class="details">
<summary class="details-summary">Oxygen</summary>

Oxygen is essential not only for sustaining life but also for supporting medical care and, in future planetary missions, potentially contributing to propulsion and other mission operations. On the International Space Station (ISS), oxygen is already generated by splitting water through electrolysis [[3]](#ref-3). However, these systems still face limitations related to power consumption, equipment complexity, maintenance, and operation in microgravity, where gas bubbles do not separate from liquids as they do on Earth. Recent research has therefore explored alternative approaches to make electrolysis more efficient and reliable under reduced-gravity conditions [[4]](#ref-4).

As missions travel further from Earth and become increasingly self-sufficient, continuously transporting consumable resources becomes progressively less practical. This has motivated the development of In Situ Resource Utilization (ISRU): producing essential resources from materials available at the destination [[5]](#ref-5). On Mars, one potential resource is perchlorate, a widespread component of the Martian regolith that is toxic to humans and problematic for agriculture. Even so, it is rich in oxygen. This dual nature has inspired research into whether perchlorate could be transformed from an environmental hazard into a local feedstock for oxygen production [[6]](#ref-6).

</details>

<details class="details">
<summary class="details-summary">Food</summary>

Food in space must provide more than enough calories. It needs to remain safe, nutritious, palatable, and varied while meeting strict limitations in mass, volume, storage, and preparation. On the International Space Station (ISS), astronauts rely largely on prepackaged foods that are ready to eat or prepared through simple heating or rehydration [[7]](#ref-7). For long-duration missions to destinations such as Mars, however, regular resupply will no longer be practical. NASA estimates that exploration food systems may need to maintain their safety and nutritional value. Over long storage periods, food quality can decline and important nutrients can degrade, while packaging and stored food also represent a substantial mass and volume burden [[8]](#ref-8).

Future missions may need to complement stored food with more Earth-independent production systems. Current research is exploring approaches ranging from growing fresh crops to using microorganisms to produce specific nutrients on demand [[9]](#ref-9).

</details>

<details class="details">
<summary class="details-summary">Water</summary>

Water is another critical resource for sustaining human life beyond Earth, where continuously transporting supplies from Earth becomes increasingly restrictive as missions become longer and more distant. For this reason, spacecraft already rely on recycling. On the International Space Station (ISS), the Water Recovery System collects wastewater (including urine and moisture) and processes it through multiple purification steps before returning clean water for crew use [[3]](#ref-3).

Similar to oxygen, for long-term planetary exploration, it would be necessary to use the resources already available at the destination. As an example, Mars contains large reservoirs of water in the form of surface and subsurface ice [[10]](#ref-10). Yet availability does not mean accessibility. Martian regolith contains perchlorate salts which are toxic to humans and represent a challenge for using local resources for drinking, agriculture, and other life-support needs. Interestingly, this has attracted synthetic biology approaches. The 2025 iGEM TU Darmstadt team explored engineering *Bacillus subtilis* to degrade perchlorates as a potential strategy for treating locally sourced Martian water [[11]](#ref-11).

</details>

<details class="details">
<summary class="details-summary">Radiation</summary>

On Earth, the atmosphere and magnetic field provide substantial protection from space radiation. As astronauts travel beyond low-Earth orbit toward destinations such as the Moon and Mars, this protection decreases, increasing their exposure to ionizing radiation. It can interact with biological tissues and damage cellular components, including DNA, raising concerns about both immediate and long-term health effects [[12]](#ref-12).

One of these concerns is radiation-induced carcinogenesis. NASA's Human Research Program currently identifies increased cancer morbidity or mortality from space-radiation exposure as an active human-system risk. Importantly, this challenge becomes particularly relevant for exploration. For Mars planetary missions lasting approximately 730–1224 days, NASA classifies the long-term carcinogenesis risk as requiring mitigation [[13]](#ref-13).

Yet radiation protection remains complex. NASA continues to investigate knowledge gaps related to effective shielding, individual and tissue-specific susceptibility, radiation dose and quality, monitoring, and biological countermeasures.

</details>

<details class="details">
<summary class="details-summary">Medicine</summary>

Current spaceflight medical systems rely on carefully selected pharmaceutical formularies designed around anticipated medical events, while considering constraints such as storage, mass, volume, expiration dates, and opportunities for resupply [[14]](#ref-14). This approach is feasible in low-Earth orbit, where resupply and emergency return remain possible, but these possibilities become increasingly limited during long-duration exploration missions.

Shelf life emerged as a particularly important challenge. Future exploration missions may last between one and five years, while many medications have expiration periods shorter than the mission itself. In addition, the long-term physical and chemical stability of many pharmaceuticals under the spaceflight environment remains insufficiently characterized. Factors such as radiation, altered atmospheric conditions, temperature and humidity, and prolonged storage could affect pharmaceutical quality. NASA therefore continues to investigate the risk that medications could lose active ingredients or accumulate degradation products during long-duration missions [[15]](#ref-15) [[17]](#ref-17) [[18]](#ref-18). Distance from Earth introduces an additional constraint: medications that are consumed, expire, or degrade may not be easily replaced.

These limitations have motivated research into alternatives to carrying every pharmaceutical from Earth. Among the approaches currently being investigated are improved storage and packaging, drug repurposing, and on-demand pharmaceutical production in space [[16]](#ref-16).

</details>

### Finding Our Direction

As we explored these different challenges, oxygen initially caught our attention. Its importance for sustaining human life, together with emerging approaches for producing it locally, made us curious about how biology could contribute to greater autonomy during space exploration. However, conversations within our team and with our PIs encouraged us to look beyond a single resource and think more broadly about <span class="hl">where synthetic biology could make a distinctive contribution</span>.

<div class="two-col-images">

<div class="crop-frame" style="--crop-ratio: 16 / 9;">

![KAUST GEM team discussing SHIHAB's direction around a laptop](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/team-huddle-1.avif)

</div>

<div class="crop-frame" style="--crop-ratio: 16 / 9;">

![KAUST GEM team meeting with collaborators to shape the project's direction](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/team-huddle-2.avif)

</div>

</div>

Looking across the solutions we had encountered, we noticed a recurring element:

<div class="callout warn">

Microorganisms could serve as biological factories for producing valuable resources beyond Earth.

</div>

This shifted our perspective. Before deciding what we wanted microorganisms to produce, perhaps we first needed to understand how to make them reliable producers under the challenging conditions associated with space.

Our first direction therefore became the development of **more resilient microbial hosts**. We began exploring how microorganisms could be engineered to better tolerate space-associated stresses, particularly radiation and other environmental constraints that could compromise their growth and productivity. But a resilient microorganism is a platform, not yet a solution. This brought us back to an important question:

<div class="callout accent">

If we could engineer microorganisms capable of functioning under these conditions, what should they produce?

</div>

We returned to the challenges identified during our initial exploration and reconsidered where such a platform could have the greatest relevance. **Medicine** stood out. Unlike resources with established regenerative systems, access to therapeutics during long-duration missions remains constrained by factors such as shelf life, storage, mission duration, and limited opportunities for resupply. This gave our biological platform a purpose: rather than carrying every therapeutic that might be needed, **what if astronauts could carry the biological capacity to produce therapeutics on demand?**

From the intersection of these two ideas, SHIHAB began to take shape:

<div class="flow">

<span class="flow-node amber">Resilient microbial hosts</span>
<span class="flow-arrow">+</span>
<span class="flow-node amber">On-demand therapeutic production</span>
<span class="flow-arrow">→</span>
<span class="flow-node">SHIHAB</span>

</div>

## Our ORBIT Framework

To guide this process, we developed the ORBIT framework, a continuous cycle connecting stakeholder engagement with project development:

![The ORBIT framework: Observe, Reach, Build, Iterate, Translate](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/orbit-framework-graphic.avif)

Rather than following these steps only once, ORBIT became an iterative process. New insights generated new questions, new questions connected us with new stakeholders, and those interactions continuously shaped the direction of SHIHAB.

## Defining Our Stakeholders

As SHIHAB evolved, we identified the people and communities who could inform, challenge, evaluate, regulate, use, or be affected by our solution. We grouped our stakeholders according to the perspective they brought to the project and asked two questions for each group:

<div class="card-grid compact">

<div>

#### Learn
What do we need to learn from them?

</div>

<div>

#### Influence
How could their perspective influence SHIHAB?

</div>

</div>

## References

1. <span id="ref-1"></span>[NASA — Humans in Space](https://www.nasa.gov/humans-in-space/)
2. <span id="ref-2"></span>[NASA — Living in Space](https://www.nasa.gov/humans-in-space/living-in-space/)
3. <span id="ref-3"></span>[NASA — Environmental Control and Life Support Systems (ECLSS)](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/)
4. <span id="ref-4"></span>[Nature Chemistry — Electrolysis under reduced gravity](https://www.nature.com/articles/s41557-025-01890-0)
5. <span id="ref-5"></span>[NASA — In Situ Resource Utilization (ISRU)](https://www.nasa.gov/mission/in-situ-resource-utilization-isru/)
6. <span id="ref-6"></span>[PNAS — Perchlorate as an oxygen feedstock](https://www.pnas.org/doi/10.1073/pnas.2008613117)
7. <span id="ref-7"></span>[NASA — Space Food Systems](https://www.nasa.gov/directorates/esdmd/hhp/space-food-systems/)
8. <span id="ref-8"></span>[NASA — Space Food Fact Sheet](https://www.nasa.gov/wp-content/uploads/2015/05/167750main_fs_spacefood508c.pdf)
9. <span id="ref-9"></span>[NASA — What is Bionutrients?](https://www.nasa.gov/general/what-is-bionutrients/)
10. <span id="ref-10"></span>[BBC News — Ice on Mars](https://www.bbc.com/news/articles/czxl849j77ko)
11. <span id="ref-11"></span>[iGEM 2025 TU Darmstadt — Description](https://2025.igem.wiki/tudarmstadt/description)
12. <span id="ref-12"></span>[NASA — Space Radiation Miniseries](https://www.nasa.gov/hrp/radiation/space-radiation-miniseries/)
13. <span id="ref-13"></span>[NASA Human Research Roadmap — Risk of Radiation Carcinogenesis](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96)
14. <span id="ref-14"></span>[NASA OCHMO — Pharmaceutical Care](https://www.nasa.gov/wp-content/uploads/2026/01/ochmo-mtb-012-pharmaceutical-care.pdf)
15. <span id="ref-15"></span>[NASA — ExMC Strategy for Drug Stability](https://ntrs.nasa.gov/api/citations/20240001489/downloads/ExMC%20Strat%20for%20Drug%20Stability%20-%20May%202024%20final%201.pdf)
16. <span id="ref-16"></span>[NASA — An Astropharmacy](https://www.nasa.gov/general/an-astropharmacy/)
17. <span id="ref-17"></span>[NASA Ames — Laboratory of Countermeasures Development](https://www.nasa.gov/ames/space-biosciences/laboratory-of-countermeasures-development/)
18. <span id="ref-18"></span>[PubMed — 21479701](https://pubmed.ncbi.nlm.nih.gov/21479701/)
