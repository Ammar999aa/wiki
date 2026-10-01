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

### What do we think the problem is?

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

<div class="details-body">

Oxygen is essential not only for sustaining life but also for supporting medical care and, in future planetary missions, potentially contributing to propulsion and other mission operations. On the International Space Station (ISS), oxygen is already generated by splitting water through electrolysis [[3]](#ref-3). However, these systems still face limitations related to power consumption, equipment complexity, maintenance, and operation in microgravity, where gas bubbles do not separate from liquids as they do on Earth. Recent research has therefore explored alternative approaches to make electrolysis more efficient and reliable under reduced-gravity conditions [[4]](#ref-4).

As missions travel further from Earth and become increasingly self-sufficient, continuously transporting consumable resources becomes progressively less practical. This has motivated the development of In Situ Resource Utilization (ISRU): producing essential resources from materials available at the destination [[5]](#ref-5). On Mars, one potential resource is perchlorate, a widespread component of the Martian regolith that is toxic to humans and problematic for agriculture. Even so, it is rich in oxygen. This dual nature has inspired research into whether perchlorate could be transformed from an environmental hazard into a local feedstock for oxygen production [[6]](#ref-6).

</div>

</details>

<details class="details">
<summary class="details-summary">Food</summary>

<div class="details-body">

Food in space must provide more than enough calories. It needs to remain safe, nutritious, palatable, and varied while meeting strict limitations in mass, volume, storage, and preparation. On the International Space Station (ISS), astronauts rely largely on prepackaged foods that are ready to eat or prepared through simple heating or rehydration [[7]](#ref-7). For long-duration missions to destinations such as Mars, however, regular resupply will no longer be practical. NASA estimates that exploration food systems may need to maintain their safety and nutritional value. Over long storage periods, food quality can decline and important nutrients can degrade, while packaging and stored food also represent a substantial mass and volume burden [[8]](#ref-8).

Future missions may need to complement stored food with more Earth-independent production systems. Current research is exploring approaches ranging from growing fresh crops to using microorganisms to produce specific nutrients on demand [[9]](#ref-9).

</div>

</details>

<details class="details">
<summary class="details-summary">Water</summary>

<div class="details-body">

Water is another critical resource for sustaining human life beyond Earth, where continuously transporting supplies from Earth becomes increasingly restrictive as missions become longer and more distant. For this reason, spacecraft already rely on recycling. On the International Space Station (ISS), the Water Recovery System collects wastewater (including urine and moisture) and processes it through multiple purification steps before returning clean water for crew use [[3]](#ref-3).

Similar to oxygen, for long-term planetary exploration, it would be necessary to use the resources already available at the destination. As an example, Mars contains large reservoirs of water in the form of surface and subsurface ice [[10]](#ref-10). Yet availability does not mean accessibility. Martian regolith contains perchlorate salts which are toxic to humans and represent a challenge for using local resources for drinking, agriculture, and other life-support needs. Interestingly, this has attracted synthetic biology approaches. The 2025 iGEM TU Darmstadt team explored engineering *Bacillus subtilis* to degrade perchlorates as a potential strategy for treating locally sourced Martian water [[11]](#ref-11).

</div>

</details>

<details class="details">
<summary class="details-summary">Radiation</summary>

<div class="details-body">

On Earth, the atmosphere and magnetic field provide substantial protection from space radiation. As astronauts travel beyond low-Earth orbit toward destinations such as the Moon and Mars, this protection decreases, increasing their exposure to ionizing radiation. It can interact with biological tissues and damage cellular components, including DNA, raising concerns about both immediate and long-term health effects [[12]](#ref-12).

One of these concerns is radiation-induced carcinogenesis. NASA's Human Research Program currently identifies increased cancer morbidity or mortality from space-radiation exposure as an active human-system risk. Importantly, this challenge becomes particularly relevant for exploration. For Mars planetary missions lasting approximately 730–1224 days, NASA classifies the long-term carcinogenesis risk as requiring mitigation [[13]](#ref-13).

Yet radiation protection remains complex. NASA continues to investigate knowledge gaps related to effective shielding, individual and tissue-specific susceptibility, radiation dose and quality, monitoring, and biological countermeasures.

</div>

</details>

<details class="details">
<summary class="details-summary">Medicine</summary>

<div class="details-body">

Current spaceflight medical systems rely on carefully selected pharmaceutical formularies designed around anticipated medical events, while considering constraints such as storage, mass, volume, expiration dates, and opportunities for resupply [[14]](#ref-14). This approach is feasible in low-Earth orbit, where resupply and emergency return remain possible, but these possibilities become increasingly limited during long-duration exploration missions.

Shelf life emerged as a particularly important challenge. Future exploration missions may last between one and five years, while many medications have expiration periods shorter than the mission itself. In addition, the long-term physical and chemical stability of many pharmaceuticals under the spaceflight environment remains insufficiently characterized. Factors such as radiation, altered atmospheric conditions, temperature and humidity, and prolonged storage could affect pharmaceutical quality. NASA therefore continues to investigate the risk that medications could lose active ingredients or accumulate degradation products during long-duration missions [[15]](#ref-15) [[17]](#ref-17) [[18]](#ref-18). Distance from Earth introduces an additional constraint: medications that are consumed, expire, or degrade may not be easily replaced.

These limitations have motivated research into alternatives to carrying every pharmaceutical from Earth. Among the approaches currently being investigated are improved storage and packaging, drug repurposing, and on-demand pharmaceutical production in space [[16]](#ref-16).

</div>

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

This led us to consider whether we could develop a microbial platform specifically adapted for space applications. Our first direction therefore focused on developing more resilient microbial chassis. We began exploring how microorganisms could be engineered to better tolerate space-associated stresses, particularly radiation and other environmental conditions that could compromise cellular function and production performance.

At this stage, resilience was the central goal of our platform. However, through discussions with our PIs, we were encouraged to think further. If we were developing microorganisms capable of functioning under these challenging conditions, could we use that capability to produce something important for astronauts?

This brought us back to the challenges identified during our initial exploration. Among them, access to medicines presented an interesting opportunity for microbial biomanufacturing. During long-duration missions, pharmaceutical availability can be constrained by limited storage capacity, shelf life, mission duration, and reduced opportunities for resupply. This gave our platform a more specific purpose. Instead of relying exclusively on medicines manufactured and stored on Earth, **could resilient microorganisms provide astronauts with the capacity to produce selected therapeutics on demand?**

From the intersection of these two ideas, SHIHAB began to take shape:

<div class="flow">

<span class="flow-node amber">Resilient microbial hosts</span>
<span class="flow-arrow">+</span>
<span class="flow-node amber">On-demand therapeutic production</span>
<span class="flow-arrow">→</span>
<span class="flow-node">SHIHAB</span>

</div>

## Our ORBIT Framework

To guide our process, we developed the ORBIT framework, a continuous cycle connecting stakeholder engagement with project development:

![The ORBIT framework: Observe, Reach, Build, Iterate, Translate](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/orbit-framework-graphic.avif)

Rather than following these steps only once, ORBIT became an iterative process. New insights generated new questions, new questions connected us with new stakeholders, and those interactions continuously shaped the direction of SHIHAB.

## Defining Our Stakeholders

As SHIHAB evolved, we identified the people and communities who could inform, challenge, evaluate, regulate, use, or be affected by our solution. We grouped our stakeholders according to the perspective they brought to the project and asked two questions for each group. Click the pieces below to explore.

<div class="card-grid compact">

<div>

#### <span class="hl">Learn</span>
What do we need to learn from them?

</div>

<div>

#### <span class="hl">Influence</span>
How could their perspective influence SHIHAB?

</div>

</div>

## Listening to Astronauts & Space Medicine Experts

### What does healthcare really require beyond Earth?

Our initial research identified access to medicines as a potential challenge for long-duration space missions. Limitations in pharmaceutical shelf life, storage, and resupply suggested that producing therapeutics on demand could contribute to greater medical autonomy [[17]](#ref-17)[[18]](#ref-18). However, literature alone could not tell us what astronauts actually need, how healthcare is currently managed in space, or what would be required to operate a biological production system in this environment.

To better understand these questions, we spoke with professionals whose experiences covered different aspects of human health and research in space: astronaut operations, space medicine, astronaut healthcare, and aerospace medicine. Through these conversations, we explored the medical needs of astronauts, the resources currently available to them, the practical limitations of conducting biological experiments in space, and the conditions our microorganisms would eventually need to withstand.

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/starr.avif" alt="Starr Corbin" style="--photo-x: 55%; --photo-y: 26%; --photo-zoom: 2.6;">
<h4 class="person-name">Starr Corbin</h4>
<p>Our discussion with Starr Corbin, a registered nurse with experience in human factors and aerospace research, helped us move from understanding medicine as a general challenge to examining the actual healthcare needs and resources available to astronauts. Her clinical perspective allowed us to explore what medical care looks like when crews operate in a remote and resource-limited environment.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>We wanted to explore what health problems astronauts may face during spaceflight and how these conditions are currently managed. In particular, we wanted to learn what medical resources are available to astronauts.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Starr gave us a closer look at how medical care is supported during spaceflight, showing us the medical kits and equipment available to crews, and the different environmental and physiological challenges that can affect astronaut health. Importantly, she introduced us to NASA’s Human Research Roadmap, which organizes the major human health and performance risks associated with space exploration. This gave us a resource through which we could investigate these risks systematically rather than selecting a therapeutic based only on our initial assumptions.</p>
<figure class="person-figure"><img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/starr-medical-kits.avif" alt="Screenshot from our call with Starr Corbin showing astronaut medical kit contents"><figcaption>Medical kit contents Starr showed us during our call. Photos courtesy of NASA.</figcaption></figure>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>From this conversation, we learned that healthcare in space cannot be approached only by considering the common diseases and medical conditions we encounter on Earth. Astronauts are exposed to additional risks associated with the space environment, including microgravity, radiation, decompression, altered day-night cycles, and the challenges of operating in a remote and resource-limited area.</p>
<p>The Human Research Roadmap therefore became an important resource for identifying these space-specific health risks and understanding where new medical countermeasures could be valuable.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Based on Starr's guidance, we used the NASA Human Research Roadmap to explore the health risks associated with spaceflight and identify areas where new medical countermeasures could be valuable. After this, we had a new question: What could SHIHAB produce that would actually address astronaut health needs?</p>
<p>Through this exploration, Spaceflight-Associated Neuro-ocular Syndrome (SANS) and carcinogenesis emerged as relevant health risks to consider, and we added potential therapeutics addressing these conditions to our list of possible payloads for SHIHAB.</p>
<p><a class="person-link-btn" href="/kaust-ksa/design">Go to page →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Starr’s perspective shifted our therapeutic selection from being primarily production-driven to need-driven. The next step was therefore to connect the health challenges identified through the roadmap with therapeutics that could realistically be produced using a microbial platform.</p>
</div>
</div>

<div class="person-card">
<div class="person-photos">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/konstantinos.avif" alt="Konstantinos Vergos" style="--photo-x: 45%; --photo-zoom: 1.4;">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/akshay.avif" alt="Dr. Akshay Chandrashekhar" style="--photo-zoom: 1.3;">
</div>
<h4 class="person-name">Konstantinos Vergos &amp; Dr. Akshay Chandrashekhar</h4>
<p>Space medicine focuses on maintaining human health, safety, and performance during spaceflight. We therefore approached Konstantinos Vergos and Dr. Akshay Chandrashekhar to hear how our idea aligned with their experience, what limitations we might be overlooking, and what conditions would eventually need to be considered if such a system were intended for space. Their feedback went further than we expected, influencing how we thought about microgravity validation, the functionality of our produced therapeutics, and even what SHIHAB could produce.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>At this stage, we had a biological concept, but we were looking at it primarily from our own synthetic-biology perspective. We wanted to challenge that view by asking people familiar with human health and research under spaceflight conditions: What are we overlooking when we think about producing medicines in space?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Konstantinos helped us understand how medical needs are currently addressed aboard the ISS, including the use of common medications such as analgesics, decongestants, and sleep aids. Drawing from his experience with parabolic flights, he also emphasized that strong ground-based validation should precede experimental testing under microgravity.</p>
<p>Dr. Akshay highlighted muscle and bone loss as important health challenges during long-duration spaceflight. He also emphasized that producing a therapeutic would not be sufficient on its own; its structure, quality, and biological function would need to be verified.</p>
<p>Both experts also encouraged us to look beyond protein therapeutics. Depending on astronaut medical needs, small molecules and other microbial products could also be valuable outputs for in-space biomanufacturing.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>Their feedback expanded our definition of validation. SHIHAB would need to demonstrate more than microbial survival. The chassis must remain functional, the production system must operate reliably, and the resulting therapeutic must retain its expected quality and biological function. We also understood that this evidence would need to be built progressively, from ground-based experiments toward microgravity and eventually spaceflight conditions.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>The convergence of their feedback made microgravity a clear component of our validation strategy. Before progressing toward experimental platforms such as parabolic flights, we began investigating how altered gravity could affect our system through COMSOL simulations.</p>
<p><a class="person-link-btn" href="/kaust-ksa/modeling">Go to page →</a></p>
<p>Their medical perspectives also influenced the development of our payload library. In particular, the discussion around muscle and bone loss encouraged us to investigate therapeutics related to these challenges and add them to our list of potential payloads for SHIHAB.</p>
<p><a class="person-link-btn" href="/kaust-ksa/design">Go to page →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>These conversations made us more curious about what would come after ground-based and microgravity validation. If SHIHAB were eventually intended for a real spaceflight experiment, what safety requirements, regulations, testing standards, and approvals would need to be considered?</p>
</div>
</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/rayannah.avif" alt="Rayyanah Barnawi" style="--photo-x: 37%; --photo-zoom-y: 2%; --photo-zoom: 1.6;">
<h4 class="person-name">Rayyanah Barnawi</h4>
<p>Our conversation with Rayyanah Barnawi, Saudi Arabia's first female astronaut and a biomedical researcher, provided an operational perspective on how a biological production system would need to function beyond the laboratory. Her experience conducting scientific research aboard the ISS helped us consider constraints that were not immediately apparent from literature alone.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>Conducting biological experiments in space involves constraints that are difficult to fully understand from literature alone. Given Rayyanah’s experience as both an astronaut and biomedical researcher, we wanted to learn about the practical limitations of performing experiments in space and the factors that should be considered when designing a biological system for this environment.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Through her experience conducting biomedical research aboard the ISS, Rayyanah introduced us to several practical aspects of performing experiments in space. She highlighted the importance of automation, particularly as astronauts have limited time to manually operate experiments, and encouraged us to consider the infrastructure already available aboard spacecraft.</p>
<p>She also raised several considerations for our future experiments and system design, including limited power availability, restrictions on materials and electronic components, preservation methods that minimize energy consumption, and the possibility of using equipment already available aboard spacecraft for product analysis. She also encouraged us to look beyond the ISS and consider the specifications of future commercial space stations.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>Her perspective made us realize that producing a therapeutic in space would require more than engineering the microorganism itself. The biological process would eventually need to be integrated into a system capable of supporting its operation while accounting for the practical constraints of spaceflight.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Based on these insights, we decided that developing a hardware system would be an important part of SHIHAB. Rather than considering only how microorganisms could produce therapeutics, we began thinking about how the complete process could eventually be contained, operated, and controlled.</p>
<p>Rayyanah's comments also gave us some of our first design considerations. Power consumption became particularly important, as energy is a limited resource during spaceflight. This encouraged us to consider whether energy-intensive processes, such as maintaining microorganisms frozen, could be reduced or replaced by alternatives such as dormant spores. We also began considering automation to reduce the amount of astronaut intervention required, as well as the power requirements and compatibility of the different components incorporated into the system.</p>
<p>Finally, her comments about restrictions on materials and electronic components aboard the ISS encouraged us to investigate which components could realistically be used in a space environment and to consider the requirements of both current and future space stations as the hardware developed.</p>
<p><a class="person-link-btn" href="/kaust-ksa/hardware">Go to page →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>This first conversation expanded SHIHAB from primarily a biological idea toward a biomanufacturing system. It also gave us our first set of practical considerations (power, automation, preservation, and component compatibility) that would guide the early development of our hardware and be further explored through subsequent stakeholder interactions.</p>
</div>
</div>

### What did we learn?

These conversations changed our understanding of the problem. Access to medicines was relevant, but producing a therapeutic was only one part of the challenge. We also needed to consider what astronauts may actually require, how the system would operate within the limitations of a spacecraft, and whether our microorganisms could remain functional and reliable under space-relevant conditions.

## Engineering Microorganisms for Space

### Which microorganisms should we use?

We identified several potential chassis, including *Escherichia coli*, *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Deinococcus radiodurans* [[19]](#ref-19)[[20]](#ref-20). Each offered different advantages: some are well-established platforms for biotechnology with extensive genetic engineering tools, while others attracted our attention because of their remarkable ability to withstand harsh environmental conditions.

However, natural resilience alone would not necessarily make an organism suitable for SHIHAB. We also needed to consider genetic tractability, the availability of established engineering tools, feasibility of working with the organism at KAUST, and previous evidence supporting its use in space-related research or biomanufacturing. With several possible organisms and different trade-offs to consider, we sought guidance from experts in extremophiles, microbial biotechnology, and astrobiology to help us determine which chassis would provide the most suitable starting point for SHIHAB.

In parallel, we explored extremotolerant organisms as potential sources of protective mechanisms that could be introduced into our chassis. Tardigrades were particularly interesting because of their ability to enter cryptobiotic states and tolerate stresses such as severe dehydration and high levels of radiation. Some tardigrade species have even survived direct exposure to the space environment while in a desiccated state. Reports of tardigrade species along the Arabian Gulf coast of Saudi Arabia also made them particularly interesting within our regional context [[21]](#ref-21).

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
19. <span id="ref-19"></span>[NASA — Bionutrients](https://www.nasa.gov/ames/space-biosciences/bioengineering-branch/bionutrients/)
20. <span id="ref-20"></span>[Frontiers in Microbiology — Proteomic and Metabolomic Profiling of Deinococcus radiodurans Recovering After Exposure to Simulated Low Earth Orbit Vacuum Conditions](https://pmc.ncbi.nlm.nih.gov/articles/PMC6501615/)
21. <span id="ref-21"></span>[Hydrobiologia — The ‘Hyena Female’ of Tardigrades and Descriptions of Two New Species of Megastygarctides from Saudi Arabia](https://link.springer.com/article/10.1007/s10750-005-1409-5)
