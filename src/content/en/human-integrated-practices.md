## Overview: Building research for the future

<div class="callout accent">

SHIHAB began with a simple question: What are astronauts missing?

</div>

At first, this question felt distant from the research we encounter in our everyday lives. But as we explored the challenges of human spaceflight, we realized that the future we were imagining is no longer science fiction. Space agencies around the world are preparing for missions that will take humans farther from Earth <a class="cite" href="#ref-1">1</a> and for longer periods than ever before. Behind these missions are not only explorers, but scientists working to expand our understanding of life: from how the human body adapts to space to how biological systems respond to environments beyond Earth <a class="cite" href="#ref-2">2</a>.

<div class="callout warn">

As scientists ourselves, this changed the way we saw the problem. If astronauts are helping us push the boundaries of research, how can research help them?

</div>

<span class="hl">This question became the foundation of SHIHAB and of our Integrated Human Practices (IHP).</span> Developing a system for on-demand biomanufacturing in space requires much more than engineering microorganisms in the laboratory. It requires understanding the people who may use it, the environments in which it must operate, the regulations that could govern it, and the broader consequences of introducing such a technology.

Through more than 30 activities and stakeholder engagements, we explored SHIHAB from multiple perspectives, learning from astronauts, space medicine specialists, researchers, industry representatives, regulatory experts, and the wider community. Their experiences helped us question our assumptions, identify limitations, and make decisions about the biological design, hardware, safety, implementation, and communication of our project.

These conversations also pushed us to look beyond space. <span class="hl">The need for local and reliable access to therapeutics is not unique to astronauts.</span> Remote communities, disaster-affected regions, and other settings with disrupted or limited supply chains can face similar challenges in accessing essential medicines. What began as a question about medical autonomy beyond Earth therefore became a broader exploration of how decentralized biomanufacturing could contribute to healthcare both in space and on Earth.

Our Human Practices journey was not separate from SHIHAB, it became part of how we built it. By continuously connecting stakeholder needs, scientific evidence, societal perspectives, and our own experimental work, we aimed to transform an ambitious idea into a more responsible, relevant, and realistic solution.

## Understanding our impact and responsibility

For most of our team, applying research to space exploration was entirely new territory. As we began developing SHIHAB, we quickly realized that working in an unfamiliar and rapidly evolving field also came with a significant responsibility. This meant that before moving into design decisions, we first had to ground ourselves in the realities of space healthcare and the constraints of the environment we were working toward. We needed to understand the context in which our ideas could operate, recognize the limitations of our own expertise, and consider the risks and consequences our decisions could have.

Our first questions soon led to many others.

## Our values

For SHIHAB, scientific progress is meaningful only when it responds to real needs and is developed with careful consideration of the people, environments, and systems it may affect. A technically successful platform could still have limited value if it requires resources that are unavailable, cannot adapt to its deployment environment, introduces unacceptable risks, or remains inaccessible to the people expected to use it. For us, designing responsibly therefore meant asking not only whether SHIHAB could work, but what it should prioritize and under which conditions its use could create meaningful benefit. Four values became central to our approach.

## Exploring the unknown

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

Oxygen is essential not only for sustaining life but also for supporting medical care and, in future planetary missions, potentially contributing to propulsion and other mission operations. On the International Space Station (ISS), oxygen is already generated by splitting water through electrolysis <a class="cite" href="#ref-3">3</a>. However, these systems still face limitations related to power consumption, equipment complexity, maintenance, and operation in microgravity, where gas bubbles do not separate from liquids as they do on Earth. Recent research has therefore explored alternative approaches to make electrolysis more efficient and reliable under reduced-gravity conditions <a class="cite" href="#ref-4">4</a>.

As missions travel further from Earth and become increasingly self-sufficient, continuously transporting consumable resources becomes progressively less practical. This has motivated the development of In Situ Resource Utilization (ISRU): producing essential resources from materials available at the destination <a class="cite" href="#ref-5">5</a>. On Mars, one potential resource is perchlorate, a widespread component of the Martian regolith that is toxic to humans and problematic for agriculture. Even so, it is rich in oxygen. This dual nature has inspired research into whether perchlorate could be transformed from an environmental hazard into a local feedstock for oxygen production <a class="cite" href="#ref-6">6</a>.

</div>

</details>

<details class="details">
<summary class="details-summary">Food</summary>

<div class="details-body">

Food in space must provide more than enough calories. It needs to remain safe, nutritious, palatable, and varied while meeting strict limitations in mass, volume, storage, and preparation. On the International Space Station (ISS), astronauts rely largely on prepackaged foods that are ready to eat or prepared through simple heating or rehydration <a class="cite" href="#ref-7">7</a>. For long-duration missions to destinations such as Mars, however, regular resupply will no longer be practical. NASA estimates that exploration food systems may need to maintain their safety and nutritional value. Over long storage periods, food quality can decline and important nutrients can degrade, while packaging and stored food also represent a substantial mass and volume burden <a class="cite" href="#ref-8">8</a>.

Future missions may need to complement stored food with more Earth-independent production systems. Current research is exploring approaches ranging from growing fresh crops to using microorganisms to produce specific nutrients on demand <a class="cite" href="#ref-9">9</a>.

</div>

</details>

<details class="details">
<summary class="details-summary">Water</summary>

<div class="details-body">

Water is another critical resource for sustaining human life beyond Earth, where continuously transporting supplies from Earth becomes increasingly restrictive as missions become longer and more distant. For this reason, spacecraft already rely on recycling. On the International Space Station (ISS), the Water Recovery System collects wastewater (including urine and moisture) and processes it through multiple purification steps before returning clean water for crew use <a class="cite" href="#ref-3">3</a>.

Similar to oxygen, for long-term planetary exploration, it would be necessary to use the resources already available at the destination. As an example, Mars contains large reservoirs of water in the form of surface and subsurface ice <a class="cite" href="#ref-10">10</a>. Yet availability does not mean accessibility. Martian regolith contains perchlorate salts which are toxic to humans and represent a challenge for using local resources for drinking, agriculture, and other life-support needs. Interestingly, this has attracted synthetic biology approaches. The 2025 iGEM TU Darmstadt team explored engineering *Bacillus subtilis* to degrade perchlorates as a potential strategy for treating locally sourced Martian water <a class="cite" href="#ref-11">11</a>.

</div>

</details>

<details class="details">
<summary class="details-summary">Radiation</summary>

<div class="details-body">

On Earth, the atmosphere and magnetic field provide substantial protection from space radiation. As astronauts travel beyond low-Earth orbit toward destinations such as the Moon and Mars, this protection decreases, increasing their exposure to ionizing radiation. It can interact with biological tissues and damage cellular components, including DNA, raising concerns about both immediate and long-term health effects <a class="cite" href="#ref-12">12</a>.

One of these concerns is radiation-induced carcinogenesis. NASA's Human Research Program currently identifies increased cancer morbidity or mortality from space-radiation exposure as an active human-system risk. Importantly, this challenge becomes particularly relevant for exploration. For Mars planetary missions lasting approximately 730–1224 days, NASA classifies the long-term carcinogenesis risk as requiring mitigation <a class="cite" href="#ref-13">13</a>.

Yet radiation protection remains complex. NASA continues to investigate knowledge gaps related to effective shielding, individual and tissue-specific susceptibility, radiation dose and quality, monitoring, and biological countermeasures.

</div>

</details>

<details class="details">
<summary class="details-summary">Medicine</summary>

<div class="details-body">

Current spaceflight medical systems rely on carefully selected pharmaceutical formularies designed around anticipated medical events, while considering constraints such as storage, mass, volume, expiration dates, and opportunities for resupply <a class="cite" href="#ref-14">14</a>. This approach is feasible in low-Earth orbit, where resupply and emergency return remain possible, but these possibilities become increasingly limited during long-duration exploration missions.

Shelf life emerged as a particularly important challenge. Future exploration missions may last between one and five years, while many medications have expiration periods shorter than the mission itself. In addition, the long-term physical and chemical stability of many pharmaceuticals under the spaceflight environment remains insufficiently characterized. Factors such as radiation, altered atmospheric conditions, temperature and humidity, and prolonged storage could affect pharmaceutical quality. NASA therefore continues to investigate the risk that medications could lose active ingredients or accumulate degradation products during long-duration missions <a class="cite" href="#ref-15">15</a> <a class="cite" href="#ref-17">17</a> <a class="cite" href="#ref-18">18</a>. Distance from Earth introduces an additional constraint: medications that are consumed, expire, or degrade may not be easily replaced.

These limitations have motivated research into alternatives to carrying every pharmaceutical from Earth. Among the approaches currently being investigated are improved storage and packaging, drug repurposing, and on-demand pharmaceutical production in space <a class="cite" href="#ref-16">16</a>.

</div>

</details>

### Finding our direction

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

## Our ORBIT framework

To guide our process, we developed the ORBIT framework, a continuous cycle connecting stakeholder engagement with project development:

![The ORBIT framework: Observe, Reach, Build, Iterate, Translate](https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/orbit-framework-graphic.avif)

Rather than following these steps only once, ORBIT became an iterative process. New insights generated new questions, new questions connected us with new stakeholders, and those interactions continuously shaped the direction of SHIHAB.

## Mapping our end users and stakeholders

As SHIHAB evolved, we sought to understand who could use our technology, who would benefit from it, and whose perspectives should guide its development. We identified people and communities who could inform, challenge, evaluate, regulate, or be affected by our solution.

### Identifying our end users

<div class="end-users">
<div class="end-user space">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/astronaut.avif" alt="An astronaut seen through a spacecraft window">
<div class="end-user-body">
<p class="end-user-title">Space Missions</p>
<p class="end-user-sub">Astronauts and Mission Crews</p>
<p>Astronauts would be the primary beneficiaries of SHIHAB in space, with crew members potentially operating or supervising the system. Limited resupply, storage capacity, and crew time make autonomy, reliable monitoring, and safety essential design considerations.</p>
</div>
</div>
<div class="end-user earth">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/remote-area.avif" alt="A healthcare worker with patients in a remote community">
<div class="end-user-body">
<p class="end-user-title">Earth Applications</p>
<p class="end-user-sub">Remote and Resource-Limited Communities</p>
<p>In remote or disaster-affected settings, trained healthcare personnel or local operators could manage SHIHAB, while patients and communities would benefit from its therapeutic outputs. These applications would require adaptability to local healthcare needs, available infrastructure, and maintenance capacity.</p>
</div>
</div>
</div>

### Defining our stakeholders

We grouped our stakeholders according to the perspective they brought to the project and asked two questions for each group. Click the pieces below to explore the five groups and their contributions to our project.

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

## Listening to astronauts and space medicine experts

### What does healthcare really require beyond Earth?

Our initial research identified access to medicines as a potential challenge for long-duration space missions. Limitations in pharmaceutical shelf life, storage, and resupply suggested that producing therapeutics on demand could contribute to greater medical autonomy <a class="cite" href="#ref-17">17</a><a class="cite" href="#ref-18">18</a>. However, literature alone could not tell us what astronauts actually need, how healthcare is currently managed in space, or what would be required to operate a biological production system in this environment.

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
<p><a class="person-link-btn" href="/kaust-ksa/protein-library">Payload library →</a></p>
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
<p><a class="person-link-btn" href="/kaust-ksa/modeling">Bioreactor modeling →</a></p>
<p>Their medical perspectives also influenced the development of our payload library. In particular, the discussion around muscle and bone loss encouraged us to investigate therapeutics related to these challenges and add them to our list of potential payloads for SHIHAB.</p>
<p><a class="person-link-btn" href="/kaust-ksa/protein-library">Payload library →</a></p>
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
<p><a class="person-link-btn" href="/kaust-ksa/hardware">Hardware design →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>This first conversation expanded SHIHAB from primarily a biological idea toward a biomanufacturing system. It also gave us our first set of practical considerations (power, automation, preservation, and component compatibility) that would guide the early development of our hardware and be further explored through subsequent stakeholder interactions.</p>
</div>
</div>

### What did we learn?

These conversations changed our understanding of the problem. Access to medicines was relevant, but producing a therapeutic was only one part of the challenge. We also needed to consider what astronauts may actually require, how the system would operate within the limitations of a spacecraft, and whether our microorganisms could remain functional and reliable under space-relevant conditions.

## Engineering microorganisms for space

### Which microorganisms should we use?

We identified several potential chassis, including *Escherichia coli*, *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Deinococcus radiodurans* <a class="cite" href="#ref-19">19</a><a class="cite" href="#ref-20">20</a>. Each offered different advantages: some are well-established platforms for biotechnology with extensive genetic engineering tools, while others attracted our attention because of their remarkable ability to withstand harsh environmental conditions.

However, natural resilience alone would not necessarily make an organism suitable for SHIHAB. We also needed to consider genetic tractability, the availability of established engineering tools, feasibility of working with the organism at KAUST, and previous evidence supporting its use in space-related research or biomanufacturing. With several possible organisms and different trade-offs to consider, we sought guidance from experts in extremophiles, microbial biotechnology, and astrobiology to help us determine which chassis would provide the most suitable starting point for SHIHAB.

In parallel, we explored extremotolerant organisms as potential sources of protective mechanisms that could be introduced into our chassis. Tardigrades were particularly interesting because of their ability to enter cryptobiotic states and tolerate stresses such as severe dehydration and high levels of radiation. Some tardigrade species have even survived direct exposure to the space environment while in a desiccated state. Reports of tardigrade species along the Arabian Gulf coast of Saudi Arabia also made them particularly interesting within our regional context <a class="cite" href="#ref-21">21</a>.

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/rosado.avif" alt="Prof. Alexandre Rosado">
<h4 class="person-name">Prof. Alexandre Rosado</h4>
<p>To guide our chassis selection, we met with Professor Alexandre Rosado, a microbial ecologist at KAUST whose research focuses on extremophiles, microbial biotechnology, and astrobiology. Professor Rosado helped us evaluate our initial candidates from both a biological and practical perspective. Our discussion covered the advantages of working with established model organisms, the challenges associated with less-characterized extremophiles, and how his laboratory's collection of stress-resistant isolates and planetary simulation facilities could support the experimental development of SHIHAB.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>We had identified possible organisms, but each presented different advantages and limitations. Should we prioritize natural resistance to extreme conditions, or genetic tractability and the ability to engineer the traits we needed?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Professor Rosado explained that extremophiles could provide valuable models for understanding microbial survival under harsh conditions. His laboratory maintains isolates collected from extreme environments, including bacteria, fungi, and yeasts with resistance to stresses such as high radiation and perchlorate exposure. However, he highlighted that natural resistance does not make an organism the best chassis for engineering. Working with less-established extremophiles, including <em>Deinococcus</em>, could introduce additional challenges related to genetic tools, protocols, and the requirements for bringing new organisms into KAUST.</p>
<p>In this regard, he supported the use of <em>Bacillus subtilis</em> and <em>Saccharomyces cerevisiae</em> as suitable starting chassis. Both are well-characterized organisms with established genetic tools and previous use in astrobiology research.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>Instead of beginning with the most extreme organism we could find, we could start from microorganisms that were properly characterized and genetically tractable, and then use synthetic biology to introduce or strengthen the traits required for our application.</p>
<p>Professor Rosado's extremophile collection also gave us another possibility. Rather than using extremophiles as our main chassis, they could serve as references or positive controls when evaluating the stress resistance of our engineered organisms.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Based on these considerations, we first selected <em>Bacillus subtilis</em> and <em>Saccharomyces cerevisiae</em> as our main chassis. We also began planning experiments to compare their resistance to UV exposure.</p>
<p><a class="person-link-btn" href="/kaust-ksa/experiments">UV radiation experiments →</a></p>
<p>Importantly, Professor Rosado also offered us access to his group's planetary simulation chamber, which can reproduce selected Mars- and Moon-relevant atmospheric conditions. Although time constraints prevented us from using the chamber during the iGEM season, this opportunity introduced a next step for validating SHIHAB under more representative environmental conditions.</p>
<p><a class="person-link-btn" href="/kaust-ksa/proposed-implementation">See long-term roadmap →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Selecting our chassis gave us a starting point, but introduced a new question. If <em>B. subtilis</em> and <em>S. cerevisiae</em> were not selected because they were already the most resistant organisms, how could we make them more resilient? This moved our focus from chassis selection to chassis engineering and guided our next search for genes and biological mechanisms that could improve resistance to the stresses we wanted SHIHAB to withstand.</p>
</div>
</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/mason.avif" alt="Dr. Christopher E. Mason">
<h4 class="person-name">Dr. Christopher E. Mason</h4>
<p>After selecting our initial chassis, our next question was how we could make them more resilient to space-related stresses. To explore this, we met with Dr. Christopher E. Mason from Weill Cornell Medicine, whose research combines genomics, computational biology, synthetic biology, and human spaceflight research. Of particular interest to us was his group's research on Dsup (Damage suppressor), a protein originally identified in tardigrades. Previous work involving Dr. Mason demonstrated the potential of Dsup to reduce radiation-associated damage when expressed in human cells, while subsequent studies have shown that Dsup expression can also reduce oxidative DNA damage in <em>Saccharomyces cerevisiae</em>.</p>
<p>Our conversation therefore focused on how protective genes such as Dsup could be incorporated into our chassis, how we should evaluate whether these modifications were effective, and what additional considerations would be necessary when developing genetically engineered microorganisms for space applications.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>Having selected <em>B. subtilis</em> and <em>S. cerevisiae</em> as our initial chassis, we needed to determine which genetic modifications could increase their resilience and how we could demonstrate that those modifications were working.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Dr. Mason reviewed our proposed genetic modifications and experimental protocols, providing feedback on both our engineering and characterization strategies. In particular, he supported our use of Dsup as a strategy for increasing cellular protection against DNA damage.</p>
<p>He also emphasized that evaluating resilience should go beyond measuring growth or survival. To directly investigate DNA damage following stress exposure, he recommended incorporating the Comet assay into our experiments.</p>
<p>Beyond resilience, he discussed the importance of genetic characterization and biocontainment. He recommended sequencing our engineered strains to confirm their modifications and raised the possibility of using established kill-switch systems as an additional safety measure.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>Tardigrades had already attracted our attention as a source of stress-resistance mechanisms, and Dsup showed how a protective gene from an extremotolerant organism could potentially be transferred into our selected microbial chassis to enhance their resilience.</p>
<p>Importantly, we also recognized that survival alone would not demonstrate protection. Cells could remain viable while still accumulating molecular damage, making direct assessment of DNA damage an important complement to our growth and survival experiments.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Following Dr. Mason's feedback, we moved forward with Dsup as one of the protective genes in our chassis-engineering strategy. We also incorporated the Comet assay into our experimental workflow, following his recommendation, to directly assess DNA damage after stress exposure alongside our growth and survival measurements.</p>
<p><a class="person-link-btn" href="/kaust-ksa/experiments">Comet assay and experiments →</a></p>
<p>Dsup also influenced how we thought about finding additional protective genes. If a resistance mechanism from an extremotolerant organism such as a tardigrade could be transferred into a microbial chassis, could other organisms adapted to extreme environments contain useful resistance mechanisms as well? This idea contributed to our dry-lab gene-mining approach, in which we searched for potential stress-resistance genes from extremophiles.</p>
<p>Saudi Arabia provided an especially relevant environment for this exploration. The Rub' al Khali (Empty Quarter) represents an extreme desert ecosystem where organisms experience conditions such as intense heat, desiccation, and high solar exposure. This motivated us to investigate organisms adapted to local extreme environments as potential sources of genes that could strengthen our engineered chassis.</p>
<p><a class="person-link-btn" href="/kaust-ksa/software">Gene mining (Dry Lab) →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Dsup raised a broader question for us: if useful protective genes can be found in extremotolerant organisms, what other resistance mechanisms could we discover?</p>
</div>
</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/luis.avif" alt="Dr. Luis Zea">
<h4 class="person-name">Dr. Luis Zea</h4>
<p>As our chassis engineering strategy developed, we spoke with Dr. Luis Zea from the University of Colorado Boulder, whose research focuses on how microorganisms behave during spaceflight and how biological systems can support future space exploration. His experience includes multiple spaceflight experiments and the NASA Deep Space Radiation Genomics experiment aboard Artemis I.</p>
<p>Our conversation challenged two aspects of SHIHAB: which stresses our microorganisms should be engineered to withstand, and how dependent our biomanufacturing system would remain on supplies from Earth.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>We had begun engineering our chassis for greater resilience, but we wanted to understand whether we were targeting the most relevant biological stresses and what limitations could prevent an autonomous biomanufacturing system from operating during long-duration missions.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Dr. Zea challenged our initial emphasis on radiation-induced DNA damage and encouraged us to pay greater attention to oxidative stress when evaluating microbial resilience in space.</p>
<p>He also identified another limitation: culture media and reagents. Carrying sufficient growth media for repeated production cycles would maintain SHIHAB's dependence on Earth, while stored media and reagents can introduce stability and shelf-life constraints. He encouraged us to consider whether nutrients could instead be recycled or obtained from resources already available during a mission.</p>
<p>Additionally, he emphasized the importance of redundancy. Rather than depending completely on a single organism or production pathway, future biomanufacturing systems could benefit from multiple organisms or complementary biological capabilities.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>His feedback made us reassess two assumptions. First, resilience should not be defined only by protection against direct DNA damage; oxidative stress also needs to be considered in our engineering and testing strategy.</p>
<p>Second, producing therapeutics on demand would not provide true autonomy if the microorganisms still depended on a continuous supply of growth media and reagents from Earth. Resource availability therefore became part of the biological design problem.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>The oxidative-stress feedback initially made us question our selection of Dsup. However, when we returned to the literature, we found evidence that Dsup can also protect against oxidative stress: its expression in <em>S. cerevisiae</em> has been shown to reduce oxidative DNA damage and improve survival under chronic oxidative conditions <a class="cite" href="#ref-22">22</a>.</p>
<p>We also began investigating alternative nutrient sources and media-recycling strategies that could reduce dependence on supplies transported from Earth. This expanded SHIHAB beyond the question of how to make microorganisms resilient toward how they could be sustained during repeated production cycles.</p>
<p><a class="person-link-btn" href="/kaust-ksa/dry-lab-overview">Dry Lab overview →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>This conversation pushed us to think about resource independence: Could SHIHAB use resources already available during a mission instead of carrying everything required for biomanufacturing from Earth?</p>
<p>This opened a new direction for the project focused on alternative carbon and nutrient sources, resource recycling, and eventually closing parts of the biomanufacturing loop.</p>
</div>
</div>

<div class="person-card map-only">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/kimberly.avif" alt="Kimberly Washington">
<h4 class="person-name">Deep Space Biology — Kimberly Washington</h4>
<p>We consulted Kimberly Washington to strengthen SHIHAB's scientific approach and assess its feasibility for real space missions. She encouraged us to draw on existing NASA research and address practical considerations such as hardware integration, system cleaning, production time, cost, and component availability. She also highlighted the importance of automation, real-time monitoring, biosafety, power efficiency, and understanding microbial responses to space-related stresses.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<p>We consulted Kimberly Washington to strengthen SHIHAB's scientific approach and assess its feasibility for real space missions. She encouraged us to draw on existing NASA research and address practical considerations such as hardware integration, system cleaning, production time, cost, and component availability. She also highlighted the importance of automation, real-time monitoring, biosafety, power efficiency, and understanding microbial responses to space-related stresses.</p>
<p>Her insights guided us toward a more integrated biological and engineering approach, with greater attention to operational requirements and measurable performance. She also introduced us to potential collaborators across the space-biotechnology sector, helping us identify additional stakeholders in space hardware, pharmaceutical manufacturing, and mission implementation.</p>
</div>
</div>

### What did we learn?

Throughout these conversations, our understanding of microbial resilience became more complete. This shaped how we approached the engineering and characterization of *B. subtilis* and *S. cerevisiae*, including the use of protective mechanisms such as Dsup and complementary methods to evaluate cellular damage. We also began to see that biological resilience alone would not make SHIHAB autonomous. Even a robust microorganism would remain dependent on Earth if its growth and production required a continuous supply of media and reagents. This introduced nutrient sourcing and resource reuse as additional considerations for reducing SHIHAB's dependence on Earth-based supplies.

With our biological strategy taking shape, our attention turned to another essential question: what safety, containment, and regulatory requirements would SHIHAB need to meet before an engineered microbial system could eventually be used in space?

## From concept to implementation

### What would it take to bring SHIHAB to space?

By this point, we had explored the biological aspect of SHIHAB, from selecting and engineering our microbial chassis to understanding some of the constraints of conducting biological work aboard the ISS. But developing a system on Earth is only the first step.

Our ground-based experiments allowed us to begin testing SHIHAB, but they could not reproduce all the conditions the system would encounter during spaceflight. Through our conversations with Konstantinos Vergos and Dr. Akshay Chandrashekhar, we learned about the importance of microgravity studies in space research and the progressive validation that is often required before reaching actual spaceflight experiments. Professor Rosado's planetary simulation chamber offered a way to test SHIHAB under selected Mars- and Moon-relevant environmental conditions. However, microgravity remained an important condition that we could not reproduce with our available facilities. This made us look beyond the experiments we could perform during the iGEM season and consider the validation steps that would follow.

These discussions allowed us to identify steps that were outside the scope of our current project but would be necessary for its future development. Rather than treating these limitations as the end of our work, we used them to build a long-term roadmap for SHIHAB. The roadmap connects what we could test on Earth with the additional validation required to move progressively toward spaceflight.

<div class="callout warn">

Although we could not complete every step ourselves, documenting this pathway also gave our work a broader purpose: to provide future iGEM teams and researchers interested in space biotechnology with a clearer starting point for moving a biological project from the laboratory toward space.

</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/savi.avif" alt="Savi Glowe">
<h4 class="person-name">BIOASTRA — Savi Glowe</h4>
<p>Savi Glowe, CEO of BIOASTRA, helped us look beyond our current experiments and consider the evidence SHIHAB would need before progressing toward a spaceflight demonstration. Our discussion covered the long-term stability of engineered microorganisms, therapeutic validation, regulatory considerations, and how biological technologies can move progressively from ground testing toward space.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>Our experiments provided an initial way to evaluate the resilience and performance of our engineered microorganisms on Earth. But, we knew that short-term ground experiments could not tell us whether the strains would remain stable and functional throughout a long-duration mission. We wanted to understand: What evidence would SHIHAB need before progressing from ground-based experiments toward testing in space?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Savi drew our attention to the long-term stability of engineered microorganisms, including the possibility that strains could accumulate mutations or change during prolonged use. She also emphasized that microbial resilience alone would not be enough. SHIHAB would eventually need to demonstrate that the chassis remains stable, the biomanufacturing system operates reliably, and the intended therapeutic is produced correctly and retains its expected function.</p>
<p>She also described development toward spaceflight as a progressive process, beginning with evidence generated on Earth and advancing through increasingly representative testing environments. For early space-based validation, she identified Low Earth Orbit (LEO) as an important testing environment before moving toward more distant missions.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>This gave us a different perspective on what it means for SHIHAB to be ready for space. Our current experiments could provide important initial evidence, but they represented only one stage of a much longer validation process.</p>
<p>We began to see readiness as a combination of several requirements: chassis stability, reliable production, therapeutic quality and function, system performance, and validation under increasingly representative conditions. Each of these would need to be addressed before SHIHAB could progress toward spaceflight testing.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Savi's feedback became the starting point for developing a long-term pathway for SHIHAB. Since many of the requirements she raised extended beyond our expertise and what we could test during the iGEM season, we sought additional perspectives from people working in areas such as microgravity research, biosafety, regulation, and spaceflight implementation.</p>
<p>Instead of defining this pathway from our own assumptions, we used these subsequent conversations to identify the steps and requirements that would eventually form our long-term roadmap.</p>
<p><a class="person-link-btn" href="/kaust-ksa/proposed-implementation">See long-term roadmap →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Her feedback also left us with questions that could not be answered through biological experiments alone. If SHIHAB successfully passed ground-based validation, what would allow it to move to the next stage? Who determines whether an engineered biological system is safe enough for testing in a space environment, and what requirements would need to be met?</p>
</div>
</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/incognito.svg" alt="Sarah Al Harbi">
<h4 class="person-name">Sarah Al Harbi</h4>
<p>We met with Sarah Al Harbi, whose experience managing projects at the Saudi Space Agency gave us a mission-level perspective on SHIHAB. While our work had focused primarily on biological performance and validation, Sarah introduced another layer of requirements: integration into an actual space mission.</p>
<p>She highlighted that preparing an experiment for space involves more than demonstrating that the system works. Power availability, spacecraft compatibility, astronaut time, launch conditions, material restrictions, regulatory approvals, and the scientific justification for conducting the experiment in space can all influence whether and how a system can be deployed.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>Our initial concept was an autonomous bioreactor capable of producing therapeutics during space missions, avoiding the dependence on pharmaceutical resupply from Earth. However, our design was mainly focusing on what happened inside the bioreactor. We had not fully considered what would happen around it. How could the system receive power? Where should we install it? How much intervention does it require? Could its components be approved for flight?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Sarah explained that a space bioreactor cannot be designed independently from the vehicle or platform carrying it. Power availability, location, materials, hardware, and payload interfaces would all need to be compatible with the spacecraft. She emphasized that materials and components intended for flight may be subject to specific restrictions and approval requirements.</p>
<p>She also highlighted astronaut time as an important constraint. A biological production system should require minimal crew intervention, making automation, monitoring, and on-demand operation important considerations for its design.</p>
<p>Sarah also noted the value of selecting microorganisms that have already been studied in space, since previous experiments can provide useful information about their behavior under spaceflight conditions.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>Sarah's feedback refined what autonomy meant for SHIHAB. Automating therapeutic production was only one part of it; the system would also need to operate with limited resources, minimal astronaut intervention, and within the constraints of its spacecraft.</p>
<p>Her comments on microorganisms also supported our previous chassis selection. Our research and earlier expert discussions had already led us toward well-characterized organisms with previous spaceflight studies, and her perspective reinforced the relevance of this choice for future deployment.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Sarah's feedback influenced both our dry-lab and hardware development. To reduce the need for continuous crew supervision, our dry-lab team developed a monitoring dashboard that simulates how astronauts could remotely follow key bioreactor parameters, including temperature, pH, and microbial growth. This would allow users to check the status of a production cycle without remaining physically next to the bioreactor throughout the process.</p>
<p><a class="person-link-btn" href="/kaust-ksa/modeling">Monitoring dashboard →</a></p>
<p>Moreover, our hardware team incorporated these considerations into our initial prototype, implementing what was feasible with the resources available during the iGEM season while identifying the improvements needed for future space deployment. This helped define priorities for future iterations, including autonomous operation, real-time monitoring, energy efficiency, environmental control, and compatibility with spacecraft infrastructure.</p>
<p><a class="person-link-btn" href="/kaust-ksa/hardware">Hardware prototype →</a></p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Sarah's perspective introduced another layer to our roadmap: even a validated biological system would still need to meet the requirements of a real space mission.</p>
<p>This led us to explore what happens between having a functional prototype and receiving permission to fly it: What safety requirements apply? Which materials and biological components are permitted? What approvals are needed? And how is an experiment prepared and integrated for spaceflight?</p>
</div>
</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/rodion.avif" alt="KAUST Health, Safety &amp; Environment representative">
<h4 class="person-name">Health, Safety &amp; Environment (HSE) at KAUST</h4>
<p>Engineering microorganisms for SHIHAB also meant taking responsibility for what could happen if something went wrong. Accidental exposure, containment failure, improper disposal, or unintended release all had to be considered alongside the intended function of our system.</p>
<p>To examine these risks systematically, we consulted representatives from KAUST Health, Safety and Environment (HSE). Their perspective helped us connect our biological and hardware choices with established approaches to biosafety, risk assessment, and containment.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>Until this point, most of our safety measures came from standard laboratory practices. SHIHAB, however, is intended to keep engineered microorganisms inside an enclosed bioreactor and could eventually operate outside the controlled conditions of a laboratory.</p>
<p>We wanted to determine whether our existing approach was sufficient and how safety should be incorporated into the system itself. How can we build multiple layers of protection into SHIHAB to minimize biological risk?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>HSE introduced us to the hierarchy of controls as a structured way to manage biological risk. We presented the safeguards we were already considering for SHIHAB, including kill switches, auxotrophy, and an enclosed bioreactor, and discussed how these measures fit within different layers of protection.</p>
<p>They also highlighted the importance of hazard identification, risk assessment, SOPs, training, sterilization, appropriate handling and disposal, and emergency preparedness. For our hardware, the enclosed bioreactor represents an engineering control, while biological safeguards and operational procedures provide additional layers of protection.</p>
<p>HSE explained that field testing, such as experiments in Saudi Arabia's Empty Quarter, would require additional planning and authorization, including institutional oversight, a field safety plan, emergency procedures, and permits coordinated with the relevant authorities. As SHIHAB progresses further toward therapeutic production and deployment, additional organizations and regulatory bodies, such as the Saudi Food and Drug Authority (SFDA), would also become relevant.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>This helped us understand that there is no single safety framework that covers every stage of SHIHAB. The requirements depend on what we are testing, where the experiment takes place, and how close the system is to its intended application.</p>
<p>A laboratory experiment, a field test, therapeutic production, and an eventual spaceflight experiment would therefore involve different levels of oversight, documentation, and approval.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>We used HSE's recommendations to reorganize our safety strategy around the hierarchy of controls and identify areas that required more detailed documentation. Their feedback directly informed our Safety Handbook, including hazard identification, risk assessment, containment failure, accidental exposure, environmental release, and emergency response. It also shaped our Hardware manual, where we incorporated procedures for safe operation, sterilization, handling, and actions to follow in case of spills or other unexpected events.</p>
<p><a class="person-link-btn" href="/kaust-ksa/safety">Safety manual →</a> <a class="person-link-btn" href="/kaust-ksa/hardware">Hardware manual →</a></p>
<p>We also incorporated these requirements into our long-term planning, distinguishing between what would be required for laboratory work, future field testing, and later stages of deployment.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Moving toward therapeutic production and spaceflight would involve other authorities, standards, and approval processes. This led us to investigate the next part of our roadmap: How does an engineered biological system progress from institutional approval to regulatory clearance and, eventually, authorization for spaceflight?</p>
</div>

</div>

<div class="person-card map-only">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/wijdan.avif" alt="Dr. Wijdan Al-Ahmadi">
<h4 class="person-name">Dr. Wijdan Al-Ahmadi</h4>
<p>During the early stages of our project, we consulted Dr. Wijdan Al-Ahmadi to assess the feasibility of our initial concept, which included oxygen production for space applications. She raised important questions about bioreactor size, production capacity, oxygen quality, and the practical challenges of operating such a system on Mars. She also emphasized the importance of automation to minimize astronaut intervention and recommended prototype testing under Mars-analog conditions.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<p>During the early stages of our project, we consulted Dr. Wijdan Al-Ahmadi to assess the feasibility of our initial concept, which included oxygen production for space applications. She raised important questions about bioreactor size, production capacity, oxygen quality, and the practical challenges of operating such a system on Mars. She also emphasized the importance of automation to minimize astronaut intervention and recommended prototype testing under Mars-analog conditions.</p>
<p>Her feedback helped us recognize the operational limitations of our initial approach. Although we eventually moved away from oxygen production to focus on therapeutic biomanufacturing, her recommendations continued to influence SHIHAB's development, particularly our emphasis on automation, monitoring, product quality, and space-relevant validation.</p>
<p><a class="person-link-btn" href="/kaust-ksa/hardware">Hardware design →</a></p>
</div>
</div>

<div class="person-card map-only">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/junaid.avif" alt="Junaid Mian">
<h4 class="person-name">Junaid Mian</h4>
<p>We consulted Junaid Mian to understand the regulatory and product-development requirements for bringing SHIHAB closer to real-world implementation. For Earth-based applications, he highlighted the importance of production yield, scalability, and the regulatory responsibilities associated with manufacturing therapeutics.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<p>We consulted Junaid Mian to understand the regulatory and product-development requirements for bringing SHIHAB closer to real-world implementation. For Earth-based applications, he highlighted the importance of production yield, scalability, and the regulatory responsibilities associated with manufacturing therapeutics.</p>
<p>For space applications, he emphasized the need to consider FDA and NASA requirements, including biosafety, containment, and Chemistry, Manufacturing, and Controls (CMC). He also encouraged us to prioritize therapeutics based on the medical conditions astronauts are likely to face during specific missions, rather than selecting products solely for their ease of production.</p>
<p><a class="person-link-btn" href="/kaust-ksa/proposed-implementation">See long-term roadmap →</a></p>
</div>
</div>

### Navigating the regulatory landscape

Across our conversations with experts in space medicine, spaceflight, biosafety, and biotechnology, one message repeatedly emerged: demonstrating that SHIHAB works in the laboratory is only the first step. Moving toward real-world use would require progressive validation, safety assessment, manufacturing control, and regulatory approval as the platform advances from research to biological production and, eventually, spaceflight.

This led us to examine the regulatory landscape surrounding SHIHAB. With guidance from PharmD. Alejandra Rodríguez Llerena, our mentor, we explored the requirements that could become relevant at each stage of the platform's development. Our analysis covered biosafety oversight of the engineered microorganisms, classification of the different protein payloads, pharmaceutical development and manufacturing requirements, FDA and SFDA regulatory pathways, and the additional safety and licensing requirements associated with biological payloads and in-space biomanufacturing.

We also looked beyond today's requirements to examine how this regulatory environment is evolving. This included emerging U.S. biosafety policies, Saudi and international space-sector regulation, new approaches to in-orbit pharmaceutical manufacturing, and the longer-term space-law considerations that could become relevant if SHIHAB moves beyond low Earth orbit.

<details class="details">
<summary class="details-summary">Explore our regulatory analysis</summary>

<div class="details-body">

<iframe class="pdf-viewer" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/regulations.pdf" title="SHIHAB regulatory analysis (PDF)" loading="lazy"></iframe>

<p><a class="person-link-btn" href="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/regulations.pdf" target="_blank" rel="noopener noreferrer">Open PDF in a new tab →</a></p>

</div>

</details>

### Building a path to space

Each conversation revealed a different part of what it would take to bring SHIHAB closer to space. Astronauts and space medicine experts helped us understand the healthcare needs and operational constraints of spaceflight. Scientists and technical experts informed our approach to microbial resilience, chassis selection, and space-relevant testing, while other stakeholders introduced considerations around system integration, mission operations, biosafety, and containment.

These discussions, together with our regulatory analysis, also made clear that demonstrating biological production would not be sufficient for clinical application. SHIHAB would require validated production protocols, reliable monitoring, product-specific quality-control testing, appropriate human oversight, and regulatory authorization to ensure that any therapeutic produced could eventually be used safely.

We combined these insights with our experimental work to develop a **long-term roadmap** for SHIHAB, outlining the steps from our current proof of concept through progressively more representative biological, technical, and safety validation toward eventual biomanufacturing in space. Click on each card to explore more.

<div data-slot="roadmap"></div>

### What did we learn?

Our conversations showed us that moving SHIHAB beyond the laboratory will require much more than demonstrating that the biological system works. Progressive validation, reliable and autonomous hardware, biosafety and containment, regulatory approval, and compatibility with the operational constraints of spaceflight all need to be considered as the project develops.

Our current work represents only the beginning of SHIHAB's development. By bringing together perspectives from medicine, biology, engineering, safety, regulation, and spaceflight, we gained a clearer understanding of what we could address during this iGEM season and what will still be required for SHIHAB to progress responsibly toward future space applications.

## Looking back at Earth

### Could a system designed for space be useful on Earth?

SHIHAB was designed around the constraints of spaceflight: limited resupply, restricted infrastructure, limited crew time, and the need for autonomous operation. Yet many of these challenges felt familiar to us. Our team brings together members from different countries and backgrounds, and we have seen how access to healthcare can become difficult when resources, infrastructure, or reliable supply chains are limited. Remote communities, humanitarian emergencies, and disaster-affected regions can face some of the same logistical challenges that influenced SHIHAB's design, even though the environments and healthcare needs are very different.

We did not want to assume that a system developed for space would automatically be appropriate for these settings. To understand the realities of healthcare delivery during humanitarian emergencies, we spoke with Andrew Macleod and Rachel Kessler, whose experiences in emergency response gave us two complementary perspectives on what implementation on Earth could require.

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/andrew.avif" alt="Andrew Macleod">
<h4 class="person-name">Andrew Macleod</h4>
<p>To explore whether SHIHAB's principles could be relevant beyond space, we spoke with Andrew Macleod, whose experience in humanitarian and emergency response gave us insight into healthcare delivery when infrastructure and supply chains are disrupted. His experience during the 2005 Pakistan earthquake and other emergencies helped us examine what producing therapeutics closer to the point of need would actually require.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>SHIHAB was primarily designed for environments where conventional pharmaceutical supply chains may be difficult to rely on, with spaceflight as our main application. After recognizing parallels with challenges we had seen in resource-limited settings on Earth, we asked: Could a similar approach be useful when access to medicines is disrupted by disasters, remoteness, or damaged infrastructure?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Andrew explained that access to therapeutics during emergencies is not simply a question of whether a medicine exists. Vaccines, antibiotics, antivenoms, and treatments for infectious diseases may become urgently needed, while damaged infrastructure, transportation constraints, disrupted cold chains, limited electricity or clean water, and shortages of trained healthcare personnel can make their delivery difficult.</p>
<p>He asked us to consider the complete journey of a therapeutic:</p>
<ul><li>How does it reach the affected area?</li><li>Does it require refrigeration?</li><li>How much space and weight does it occupy?</li><li>Who can operate the system and administer the final product?</li><li>What happens when roads, electricity, or clean water are unavailable?</li></ul>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>His perspective showed us that producing a therapeutic locally addresses only one part of the problem. For SHIHAB to have value in humanitarian settings, the system itself would need to function under the same resource constraints affecting medicine delivery.</p>
<p>This made portability, resource efficiency, reduced cold-chain dependence, water and electricity requirements, biosafety, waste disposal, and the level of medical expertise required for operation important considerations for an Earth-based application. Andrew also made us consider that the therapeutic priorities would be different from those identified for astronauts.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>We incorporated disaster response and remote healthcare as a second application context when evaluating SHIHAB. Interestingly, many of the requirements were similar to those we had already encountered when designing for space: resources are limited, resupply may be difficult, infrastructure cannot always be assumed, and the system should require minimal external support. This reinforced the importance of designing SHIHAB to be portable, resource-efficient, safe, and increasingly autonomous.</p>
<p><a class="person-link-btn" href="/kaust-ksa/hardware">Hardware design →</a></p>
<p>We also considered different scales of deployment, from centralized units supporting a humanitarian response to smaller systems transported closer to affected communities. Andrew helped us identify the stakeholders that would be essential for such implementation, including national governments, local healthcare providers, NGOs, WHO, UNICEF, and organizations operating directly in refugee camps and disaster zones.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Andrew's input and experience helped us recognize a central principle for SHIHAB: remote environments on Earth and space share a common challenge and that the usual pharmaceutical supply chain cannot always be assumed to be available. This insight expanded our project from asking “How can we produce therapeutics in space?” to a bigger question: “How can we produce and distribute therapeutic products in places that conventional supply chains cannot reliably reach?”</p>
</div>
</div>

<div class="person-card">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/kessler.avif" alt="Rachel Kessler">
<h4 class="person-name">Rachel Kessler</h4>
<p>After identifying disaster response and remote healthcare as potential applications, we spoke with Rachel Kessler to examine what deploying a technology like SHIHAB in humanitarian settings would actually require. Her experience challenged us to look beyond the general category of a “disaster zone” and consider the conditions of each individual setting.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/observe.avif" alt="">Observe</h3>
<p>We had found similarities between some constraints in space and those encountered during humanitarian emergencies. However, treating all remote and disaster-affected environments as similar use cases risked overlooking major differences between them.</p>
<p>Could SHIHAB realistically be deployed in the same way across different countries and emergencies, and would an advanced biomanufacturing system remain practical where infrastructure and technical support are limited?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/reach.avif" alt="">Reach</h3>
<p>Rachel explained that humanitarian healthcare must be understood within the specific context of each region. In parts of Europe, established transportation and medical infrastructure may allow technologies to be deployed relatively quickly, although extensive legislation can introduce additional regulatory requirements. In conflict-affected or resource-limited regions, the challenges may be very different, including damaged infrastructure, limited electricity, difficulties maintaining a cold chain, restricted physical space, and logistical barriers to transporting supplies.</p>
<p>She discussed situations ranging from earthquakes and conflicts to refugee settings and infectious disease outbreaks, showing us that healthcare priorities also vary depending on the location and type of emergency. Needs may include childhood vaccines, measles vaccination, malaria prevention and treatment, or other essential therapeutics, but there is no single set of products that would be appropriate for every setting.</p>
<p>Rachel also introduced factors we had not initially considered, particularly community trust and misinformation. A technically effective healthcare technology may still have limited impact if communities do not trust it or if the way it is introduced does not fit existing social structures. In some settings, a system perceived as overly complex or unfamiliar could be more difficult to adopt. This introduced another important design question for us: How could we balance technological sophistication with a system that remains familiar, simple, and easy to use?</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/build.avif" alt="">Build</h3>
<p>A single system could not simply be transferred between humanitarian settings; it would need to be adaptable to the infrastructure, resources, and needs of each context. This influenced how we thought about the bioreactor. Automation and advanced components could be valuable, but they should not make the system unnecessarily difficult to operate, maintain, or repair. Modularity, interchangeability, and local maintainability therefore became important considerations. If one component fails, it should not require replacing the entire system or relying on specialized external support.</p>
<p>Rachel also highlighted that implementation would depend on a wider network of stakeholders, including national health authorities, WHO, UNICEF, the International Red Cross, NGOs, local healthcare providers, and the communities themselves.</p>
<p>That last point connected strongly with something we had observed through our own activities in the Arab region. Our Saudi team members recognized that synthetic biology and related technologies are still unfamiliar to many people in their communities. This made community engagement another important part of responsible implementation. People should have opportunities to understand emerging technologies before they are expected to interact with or accept them.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/iterate.avif" alt="">Iterate</h3>
<p>Rachel's feedback led us to define a new principle for SHIHAB's humanitarian application: design for a specific context, not for an abstract “disaster zone.”</p>
<p>We initially planned to visit local villages and speak directly with community members to better understand their needs, available infrastructure, and perceptions of a technology like SHIHAB. However, we were unable to conduct these visits during the iGEM season. Because community perspectives should not be assumed, we recognize this as an important step that future teams exploring humanitarian applications should investigate further.</p>
<p>As a starting point, we developed a hardware manual designed to make the system and its operation understandable to potential users, reflecting the importance of accessibility and local capacity highlighted during our conversation with Rachel.</p>
<p><a class="person-link-btn" href="/kaust-ksa/hardware">Hardware manual →</a></p>
<p>We also translated our focus on community participation into our Education activities. We prioritized lectures and activities for Arab audiences, particularly because members of our team from the region felt that their communities have had fewer opportunities to participate in conversations around synthetic biology and emerging biotechnologies. Our goal was to provide an accessible entry point into these topics and give participants knowledge they could discuss and share within their own communities.</p>
<h3 class="person-step"><img src="https://static.igem.wiki/teams/6341/wiki/images/translate.avif" alt="">Translate</h3>
<p>Earth applications should be developed with communities, healthcare providers, and humanitarian organizations involved from the beginning, so that the technology responds to locally identified needs instead of assumptions made outside the deployment context.</p>
</div>
</div>

<div class="person-card map-only">
<img class="person-photo" src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/grant.avif" alt="Jonathan Grant">
<h4 class="person-name">Jonathan Grant</h4>
<p>We consulted Jonathan Grant to explore SHIHAB's potential applications in remote and humanitarian settings on Earth. He emphasized the importance of distinguishing between isolated communities and disaster-response scenarios, as each presents different healthcare needs and operational constraints. He also suggested considering environments such as ships, Antarctica, and submarines, while raising questions about affordability, accessibility, and how users would determine which therapeutics to produce.</p>
<button type="button" class="person-more-btn">See more</button>
<div class="person-more">
<p>We consulted Jonathan Grant to explore SHIHAB's potential applications in remote and humanitarian settings on Earth. He emphasized the importance of distinguishing between isolated communities and disaster-response scenarios, as each presents different healthcare needs and operational constraints. He also suggested considering environments such as ships, Antarctica, and submarines, while raising questions about affordability, accessibility, and how users would determine which therapeutics to produce.</p>
<p>He recommended conducting a PESTLE analysis to assess political, economic, social, technological, and environmental factors, including regulation, public trust, and potential misuse. His feedback helped us move away from treating remote healthcare as a single application and toward more context-specific deployment scenarios, where local needs, resources, and societal considerations would guide future development.</p>
</div>
</div>

### What did we learn?

The same principles that are important in space (autonomy, resource efficiency, portability, and reduced dependence on external supply chains) could also be valuable in remote and disaster-affected settings. However, our conversations with Andrew and Rachel showed us that applying these principles on Earth requires consideration of the therapeutics needed, available infrastructure, local healthcare priorities, maintenance capacity, and community perspectives.

Importantly, an Earth application would not remove the regulatory considerations we had already explored. Because SHIHAB would still involve engineered microorganisms and therapeutic production, relevant biosafety, pharmaceutical quality, manufacturing, and approval requirements would continue to apply, although the specific pathway would depend on the product and where the system is deployed.

## Engaging with society

<div class="callout warn">

How does society perceive our technology?

</div>

SHIHAB proposes a different approach to healthcare. But how would people respond to this technology? Would they trust the medicines it produces? What concerns might arise about biosafety, accountability, or its use beyond space missions?

We engage with communities from various countries and backgrounds through three initiatives, inviting them to question technology, share their concerns, and explore its potential repercussions. Their perspectives helped us identify key considerations for the responsible development of SHIHAB, particularly regarding public trust, safety, and accessibility, while also shaping how we communicate our project and approach its future implementation.

<div data-slot="engagement"></div>

<div class="engage-panel" data-tab="mentorship" data-title="Mentorship Program" data-sub="Understanding future scientists">

### Understanding the next generation of scientists

For SHIHAB to have an impact beyond the laboratory, people must first understand the science behind it. But how familiar are younger generations with synthetic biology, and what challenges do they face when exploring its applications?

To investigate these questions, we launched the KAUST iGEM Summer Mentorship Program, connecting students with researchers through an accessible, nine-week learning experience.

### Where students started

Before the program began, we invited mentees to complete an entry questionnaire exploring their familiarity with synthetic biology, research interests, learning goals, and challenges. We received 48 responses, providing a baseline for understanding participants' experiences. According to our program evaluation, 52% of mentees had no prior exposure to synthetic biology, highlighting the importance of introducing the field to students who may not otherwise encounter it. Students also mentioned having difficulties understanding scientific literature, developing research ideas, connecting theoretical knowledge with practical applications, and communicating scientific concepts.

<div class="callout accent">

These findings were important to SHIHAB. Our project combines microbial engineering, therapeutic production, and space biotechnology, topics that can be difficult to understand without a foundation in biology. The responses helped us recognize the importance of explaining not only what our technology aims to achieve, but also the biological principles that make it possible.

</div>

### The mentorship experience

Participants explored the fundamentals of biology, synthetic biology, and the applications of microorganisms in healthcare and other fields. As the program progressed, we introduced space biology and the potential for using modified microorganisms to address challenges in extreme environments, linking these concepts to the scientific motivation that underpins SHIHAB.

In addition to scientific training, participants received guidance on conducting research, navigating academic paths, and engaging in science outreach. They were encouraged to identify real-world problems, develop their own project proposals, and discuss their ideas with their mentors.

We did not want to present presenting synthetic biology as a collection of unfamiliar techniques, our goal was for students to understand how biological engineering can contribute to solving problems of societal relevance.

Check our program: <a href="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/kaust-igem-mentorship-fellowship-program-summer-schedule-2026.pdf" target="_blank" rel="noopener noreferrer">KAUST iGEM Mentorship Fellowship Program: Summer Schedule 2026</a>

### Measuring our impact

Our mentorship program brought together 53 accepted mentees and 25 mentors, with 48 mentees remaining engaged, achieving a 91% retention rate. By operating entirely online, we aimed to make scientific mentorship more accessible, regardless of students' geographic location.

<div class="gallery">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/5d08608b-88e4-4076-9d30-b6f205f994c3.avif" alt="KAUST iGEM Summer Mentorship Program" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/img-5384.avif" alt="KAUST iGEM Summer Mentorship Program" loading="lazy">
</div>

By the end of our program, 78% reported gaining new knowledge about synthetic biology, demonstrating the value of making this field more accessible to students from different backgrounds. The experience gave participants opportunities to interact with researchers, explore potential academic paths, and become more confident in their abilities. This was reflected in the feedback we received during mentorship sessions and through our program evaluation. As one mentee shared:

> “It built my self-confidence, and I met remarkable people and learned amazing new scientific things.”

The program concluded with the Future Bioengineers Showcase, where participants presented their own problem-and-solution concepts, moving from learning scientific principles to exploring how biotechnology could address real-world challenges.

<div class="gallery">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/img-5442.avif" alt="Future Bioengineers Showcase" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/img-5439.avif" alt="Future Bioengineers Showcase" loading="lazy">
</div>

<div class="panel">
<div class="panel-title"><span>How this informed SHIHAB</span></div>

The mentees' initial knowledge gaps brought attention to two considerations for SHIHAB's future development and societal implementation:

<div class="card-grid row">

<div>

#### Public understanding and acceptance

The need to make microbial therapeutic production understandable to potential users, including how engineered microorganisms are used and what safeguards would be necessary.

</div>

<div>

#### Accessibility and implementation

The importance of considering communities with limited exposure to biotechnology when developing educational resources and future user-facing guidance.

</div>

</div>

</div>

</div>

<div class="engage-panel" data-tab="tawasol" data-title="Tawasol Hackathon" data-sub="Exploring responsible governance">

### Why we organized it

Our regulatory analysis helped us identify the requirements SHIHAB would need to meet before real-world deployment. Yet, we recognized that meeting regulatory requirements would not be enough to ensure its safe and responsible implementation. We also needed to consider public trust, accountability, and how the technology could be integrated into healthcare systems operating in remote environments. For this, we co-organized the Tawasol Hackathon & Policy Showcase with NYU Abu Dhabi iGEM from August 28-30, 2026. The event brought together 186 high school and undergraduate students across 50 teams, challenging them to examine the societal, ethical, and regulatory implications of emerging synthetic biology technologies. We invited them to identify SHIHAB’s weaknesses and propose solutions.

### Who should govern SHIHAB?

Participants selected one of two research projects: SHIHAB, focused on on-demand biomanufacturing in isolated environments, or DUNELOCK, focused on engineered microorganisms for desert sand stabilization.

For SHIHAB, we presented a future deployment scenario in a Zero-Reach environment, such as a lunar research station or a remote community cut off from medical supply chains. Teams were asked to develop a policy and operational framework addressing four challenges:

<div class="card-grid">

<div>

#### Safety & Biocontainment

How could the safety and quality of medicines produced on-site be verified when conventional laboratory oversight is unavailable?

</div>

<div>

#### Public Trust & Health Impact

What would make people trust medicines produced by engineered microorganisms, and how should informed consent be addressed?

</div>

<div>

#### Integration & Liability

Who should be responsible for production failures or incorrect doses, and how could SHIHAB integrate with existing healthcare systems?

</div>

<div>

#### Sustainability & Long-Term Impact

How could SHIHAB contribute to healthcare accessibility in isolated communities, and what limitations might affect its long-term implementation?

</div>

</div>

### New perspectives from student proposals

During the first day, teams examined their assigned technology and submitted a problem statement. On the second day, they worked with mentors from KAUST and NYU Abu Dhabi to develop a policy whitepaper of up to five pages, covering safety, public trust, liability, and long-term impact. Selected teams then presented five-minute pitches and defended their proposals during questions from an independent judging panel.

The SHIHAB submissions revealed specific challenges that could affect future deployment. Several teams questioned how therapeutic identity, potency, dosage accuracy, and contamination could be verified without access to a conventional laboratory. Others examined whether remote monitoring and digital production records could support regulatory oversight, particularly when communication with Earth is limited.

Accountability was another recurring concern. Participants considered how responsibility should be divided among platform developers, operators, healthcare professionals, and mission organizations if a production failure or incorrect dose harmed a patient. Some teams also raised questions about microbial genetic stability during prolonged operation, while others explored informed consent and public confidence in medicines manufactured by engineered organisms.

<div class="gallery">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/7d1baf7d-91ec-408a-8337-a4b9f9bfd53d.avif" alt="Tawasol Hackathon & Policy Showcase" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/img-4775.avif" alt="Tawasol Hackathon & Policy Showcase" loading="lazy">
</div>

<div class="panel">
<div class="panel-title"><span>How this informed SHIHAB</span></div>

The hackathon highlighted three priorities for SHIHAB's future development:

<div class="card-grid stack">

<div>

#### Remote quality assurance

Establish procedures for verifying therapeutic identity, potency, purity, and dose accuracy, supported by traceable production records and remote monitoring.

</div>

<div>

#### Operational accountability

Define responsibilities for system operation, therapeutic authorization, quality-control decisions, and emergency responses when production fails.

</div>

<div>

#### Healthcare integration

Consider how SHIHAB could operate within existing medical and regulatory structures, including informed consent, professional oversight, and deployment in isolated communities on Earth.

</div>

</div>

</div>

</div>

<div class="engage-panel" data-tab="academy" data-title="Space Academy" data-sub="Making space biology accessible">

### What does the public know about space biology?

We conducted the Mission Beyond Earth: Space Biology Survey, collecting 92 responses from high school students, university students, educators, and other participants. Although most respondents were aware that spaceflight could affect astronaut health, their familiarity with synthetic biology and its applications varied considerably.

Our findings revealed several insights:

- 57% had either never heard of synthetic biology or had heard the term without understanding it well.
- 51% had not previously heard about producing medicines using engineered microorganisms or were unsure whether it was possible.
- 55% believed astronauts would need to carry all their medicines from Earth before a mission, highlighting an opportunity to introduce on-demand biomanufacturing.

<!-- Charts generated from "Mission Beyond Earth: Space Biology Survey (Responses).xlsx" (92 responses); shares are of all respondents. -->
<div class="chart-grid">
<figure class="bar-chart">
<figcaption><span class="bar-chart-q">If astronauts needed medicine during a mission to the Moon or Mars, how do you think they would obtain it?</span><span class="bar-chart-n">92 responses</span></figcaption>
<table role="table">
<thead><tr role="row"><th role="columnheader" scope="col">Answer</th><th role="columnheader" scope="col">Responses</th><th role="columnheader" scope="col">Share of respondents</th></tr></thead>
<tbody>
<tr role="row" style="--pct: 55.4"><th role="rowheader" scope="row">Bring all medicines from Earth before the mission.</th><td role="cell">51</td><td role="cell">55.4%</td></tr>
<tr role="row" style="--pct: 30.4"><th role="rowheader" scope="row">Produce medicines during the mission.</th><td role="cell">28</td><td role="cell">30.4%</td></tr>
<tr role="row" style="--pct: 13.0"><th role="rowheader" scope="row">Receive additional supplies from Earth.</th><td role="cell">12</td><td role="cell">13.0%</td></tr>
<tr role="row" style="--pct: 1.1"><th role="rowheader" scope="row">I don&#x27;t know.</th><td role="cell">1</td><td role="cell">1.1%</td></tr>
</tbody>
</table>
</figure>
<figure class="bar-chart">
<figcaption><span class="bar-chart-q">Before today, had you heard about producing medicines using engineered microorganisms?</span><span class="bar-chart-n">92 responses</span></figcaption>
<table role="table">
<thead><tr role="row"><th role="columnheader" scope="col">Answer</th><th role="columnheader" scope="col">Responses</th><th role="columnheader" scope="col">Share of respondents</th></tr></thead>
<tbody>
<tr role="row" style="--pct: 48.9"><th role="rowheader" scope="row">Yes</th><td role="cell">45</td><td role="cell">48.9%</td></tr>
<tr role="row" style="--pct: 45.7"><th role="rowheader" scope="row">No</th><td role="cell">42</td><td role="cell">45.7%</td></tr>
<tr role="row" style="--pct: 5.4"><th role="rowheader" scope="row">Not sure</th><td role="cell">5</td><td role="cell">5.4%</td></tr>
</tbody>
</table>
</figure>
<figure class="bar-chart">
<figcaption><span class="bar-chart-q">How important do you think biotechnology will be for future space exploration? (1 being &quot;Not important at all&quot; and 5 &quot;Extremely important&quot;)</span><span class="bar-chart-n">92 responses</span></figcaption>
<table role="table">
<thead><tr role="row"><th role="columnheader" scope="col">Answer</th><th role="columnheader" scope="col">Responses</th><th role="columnheader" scope="col">Share of respondents</th></tr></thead>
<tbody>
<tr role="row" style="--pct: 1.1"><th role="rowheader" scope="row">1 (Not important at all)</th><td role="cell">1</td><td role="cell">1.1%</td></tr>
<tr role="row" style="--pct: 3.3"><th role="rowheader" scope="row">2</th><td role="cell">3</td><td role="cell">3.3%</td></tr>
<tr role="row" style="--pct: 3.3"><th role="rowheader" scope="row">3</th><td role="cell">3</td><td role="cell">3.3%</td></tr>
<tr role="row" style="--pct: 28.3"><th role="rowheader" scope="row">4</th><td role="cell">26</td><td role="cell">28.3%</td></tr>
<tr role="row" style="--pct: 64.1"><th role="rowheader" scope="row">5 (Extremely important)</th><td role="cell">59</td><td role="cell">64.1%</td></tr>
</tbody>
</table>
</figure>
<figure class="bar-chart">
<figcaption><span class="bar-chart-q">Which of the following topics would you be most interested in learning about? (Select up to 2)</span><span class="bar-chart-n">92 responses</span></figcaption>
<table role="table">
<thead><tr role="row"><th role="columnheader" scope="col">Answer</th><th role="columnheader" scope="col">Responses</th><th role="columnheader" scope="col">Share of respondents</th></tr></thead>
<tbody>
<tr role="row" style="--pct: 43.5"><th role="rowheader" scope="row">Space exploration</th><td role="cell">40</td><td role="cell">43.5%</td></tr>
<tr role="row" style="--pct: 33.7"><th role="rowheader" scope="row">Human health in space</th><td role="cell">31</td><td role="cell">33.7%</td></tr>
<tr role="row" style="--pct: 30.4"><th role="rowheader" scope="row">Synthetic biology</th><td role="cell">28</td><td role="cell">30.4%</td></tr>
<tr role="row" style="--pct: 30.4"><th role="rowheader" scope="row">Genetic engineering</th><td role="cell">28</td><td role="cell">30.4%</td></tr>
<tr role="row" style="--pct: 19.6"><th role="rowheader" scope="row">Producing medicines in space</th><td role="cell">18</td><td role="cell">19.6%</td></tr>
<tr role="row" style="--pct: 19.6"><th role="rowheader" scope="row">Microorganisms and biotechnology</th><td role="cell">18</td><td role="cell">19.6%</td></tr>
<tr role="row" style="--pct: 10.9"><th role="rowheader" scope="row">Careers in space biotechnology</th><td role="cell">10</td><td role="cell">10.9%</td></tr>
</tbody>
</table>
</figure>
</div>

Participants expressed strong interest in space exploration, human health, and biotechnology. With this, we design Space Academy, a free online educational series connecting space exploration with biology, technology, and society. We wanted participants to understand the broader scientific challenges that make technologies like ours relevant.

### Exploring space through different perspectives

We designed Space Academy as an interdisciplinary journey, bringing together researchers, entrepreneurs, and students to explore six complementary perspectives:

<div class="table-wrap">

| Session | Speaker | Focus |
| --- | --- | --- |
| Understanding space missions | Lielka N. Caballa | Space exploration and mission challenges |
| Human health in spaceflight | Gwendolyn Starr Corbin | Astronaut health, safety, and human performance |
| Can we engineer life? | KAUST x KFUPM iGEM | Synthetic biology and genetic engineering |
| Starting your space journey | Kimberly Washington | Careers, entrepreneurship, and opportunities in the space sector |
| The off-world pharmacy | Junaid Mian | Biotechnology and pharmaceutical innovation in space |
| From Earth extremes to space agriculture | Davi Souza | Food production, automation, and agriculture in extreme environments |

</div>

<div class="gallery">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/noelia2.avif" alt="Space Academy session" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/talk2.avif" alt="Space Academy session" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/talk4.avif" alt="Space Academy session" loading="lazy">
</div>

### The Final Mission: Putting knowledge into action

We concluded Space Academy with The Final Mission, an interactive competition that challenged participants to apply their knowledge to a realistic space exploration scenario.

In Mission: Lunar Horizon, six astronauts were conducting a six-month research mission at a lunar base in 2040 when unexpected challenges threatened their safety and operations. The participating teams focused on three problems: infectious diseases, water-system crisis, and food-system failure.

Each team developed a scientifically grounded solution and presented a five-minute pitch explaining how it would work under spaceflight constraints, including limited power, resources, crew time, and resupply opportunities.

<div class="gallery">
<img src="https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/final-mission.avif" alt="The Final Mission: Mission Lunar Horizon" loading="lazy">
</div>

<div class="panel">
<div class="panel-title"><span>How this informed SHIHAB</span></div>

Our initial survey revealed limited awareness of space biology, motivating us to introduce its importance through Space Academy. The talks helped us identified three considerations for our project:

<div class="card-grid stack">

<div>

#### Mission-driven design

Throughout the talks, speakers emphasized the importance of considering spacecraft limitations when developing technologies for space. Based on this and our stakeholders’ interviews, we decided to account for power consumption, payload mass, and available resources when designing SHIHAB's bioreactor.

</div>

<div>

#### Healthcare integration

Discussions on astronaut health and space pharmaceuticals made us realize that producing medicines is only one part of healthcare. SHIHAB could also consider diagnosis, prevention, medicine storage, and how treatments would be used by astronauts.

</div>

<div>

#### Making space biotechnology accessible

Participants' enthusiasm showed us that many people are interested in space research but may see it as a field beyond their reach. We want to make SHIHAB understandable to people from different backgrounds and encouraging their participation in discussions about its future applications.

</div>

</div>

</div>

</div>

## Anticipating our impact

### From values to design

Our conversations with stakeholders helped us translate our four guiding values into practical design priorities.

<div data-slot="design-values"></div>

Most importantly, these values made us recognize areas requiring further development. While some considerations inform our current design approach, others remain priorities for future validation and implementation. By knowing this distinction, <span class="hl">we aim to ensure that SHIHAB's development remains transparent, responsive to stakeholder feedback and grounded in the needs of its intended users.</span>

### Opportunities, risks, and responsibilities

SHIHAB was developed with the goal of increasing access to therapeutic production in environments where conventional pharmaceutical supply chains may be difficult to rely on. However, a technology intended to operate in challenging environments can also introduce new risks, dependencies, and uncertainties. Understanding these potential impacts is essential to guiding SHIHAB's future deployment, particularly in terms of biological and therapeutic validation, safety, resource requirements, and accessibility. By examining both the opportunities and risks, we identified what our current work has addressed and where additional research, testing, and engagement will be needed.

<div class="table-wrap">

| Potential benefit | Challenge to consider | Where we stand |
| --- | --- | --- |
| Produce therapeutics closer to where they are needed | The produced therapeutic may not meet appropriate quality, safety, or functional requirements | We investigated regulatory requirements and incorporated progressive therapeutic validation into our long-term roadmap. However, therapeutic quality, functionality, and safety would still require extensive experimental validation before deployment. |
| Reduce dependence on Earth during spaceflight | The system could remain dependent on media, reagents, energy, maintenance, or replacement components | We incorporated resource dependence into our design considerations by examining the nutrients and materials required to sustain microbial production and exploring opportunities to reduce reliance on externally supplied resources. However, we did not conduct a complete resource or lifecycle analysis of the integrated system. |
| Operate under space-relevant performance | Ground performance may not represent behavior under microgravity, radiation, launch conditions, or long-duration operation. | We incorporated space-relevant stress testing and altered-gravity simulations, but direct microgravity and spaceflight validation remain future steps. |
| Use engineered microorganisms outside conventional laboratories | Accidental exposure, containment failure, or environmental release could create biosafety concerns. | With KAUST HSE, we structured our approach around multiple layers of containment, risk assessment, sterilization, procedures, and future biocontainment strategies. |
| Reduce the need for continuous human intervention | Greater automation can increase technical complexity and create new failure points. | We considered monitoring and automation in our hardware design, but we have not performed comprehensive reliability, redundancy, or failure-mode analysis. |
| Extend the platform to humanitarian settings | A technology design without local input may be inappropriate, difficult to maintain, or poorly accepted. | We treated Earth deployment as context-specific and identified direct engagement with communities and local healthcare stakeholders as necessary for future development. However, we were unable to conduct this direct community engagement during this iGEM season. |
| Enable decentralized therapeutic production | Access could remain unequal if systems depend on specialized expertise or proprietary infrastructure. | We considered accessibility and maintainability, but we have not conducted the economic, access, or equity analyses required to understand this fully. |

</div>

## Closing the ORBIT

ORBIT helped us move from questioning and listening to building, iterating, and translating what we learned into the development of SHIHAB. But this process also showed us that responsible design does not always lead to a single or obvious solution. Different stakeholders brought different priorities, and improving one aspect of the project could introduce limitations elsewhere. Responsible design therefore became a process of balancing what SHIHAB could achieve with what its users, environments, and applications would require.

These decisions changed how we understood the values we introduced at the beginning of our Human Practices journey. Autonomy, adaptability, responsibility, and accessibility cannot always be maximized at the same time. Greater autonomy can introduce complexity. Greater biological capability requires stronger consideration of containment. Adaptability must still preserve reliability and safety. A technologically sophisticated system may have limited value if the people expected to use it cannot operate, maintain, or access it.

<div class="callout warn">

The appropriate design depends on who will use it, where it will operate, what it needs to produce, and which risks and constraints are present in that environment.

</div>

Our Human Practices journey helped us recognize the boundaries of our current work and the questions that remain unresolved. New evidence, environments, and perspectives may challenge the assumptions behind the decisions we made today, making continued reflection an essential part of responsible development. This is why closing the ORBIT does not mean reaching the end. We must continue to Observe emerging challenges, Reach the people who understand and experience them, Build with what we learn, Iterate as new evidence challenges our decisions, and Translate those insights into responsible action. **ORBIT is not a destination. It is a continuous cycle that can guide SHIHAB beyond this iGEM season.**

## References

<ol class="ref-list">

<li id="ref-1"><a href="https://www.nasa.gov/humans-in-space/" target="_blank" rel="noopener noreferrer">NASA — Humans in Space</a></li>
<li id="ref-2"><a href="https://www.nasa.gov/humans-in-space/living-in-space/" target="_blank" rel="noopener noreferrer">NASA — Living in Space</a></li>
<li id="ref-3"><a href="https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/" target="_blank" rel="noopener noreferrer">NASA — Environmental Control and Life Support Systems (ECLSS)</a></li>
<li id="ref-4"><a href="https://www.nature.com/articles/s41557-025-01890-0" target="_blank" rel="noopener noreferrer">Nature Chemistry — Electrolysis under reduced gravity</a></li>
<li id="ref-5"><a href="https://www.nasa.gov/mission/in-situ-resource-utilization-isru/" target="_blank" rel="noopener noreferrer">NASA — In Situ Resource Utilization (ISRU)</a></li>
<li id="ref-6"><a href="https://www.pnas.org/doi/10.1073/pnas.2008613117" target="_blank" rel="noopener noreferrer">PNAS — Perchlorate as an oxygen feedstock</a></li>
<li id="ref-7"><a href="https://www.nasa.gov/directorates/esdmd/hhp/space-food-systems/" target="_blank" rel="noopener noreferrer">NASA — Space Food Systems</a></li>
<li id="ref-8"><a href="https://www.nasa.gov/wp-content/uploads/2015/05/167750main_fs_spacefood508c.pdf" target="_blank" rel="noopener noreferrer">NASA — Space Food Fact Sheet</a></li>
<li id="ref-9"><a href="https://www.nasa.gov/general/what-is-bionutrients/" target="_blank" rel="noopener noreferrer">NASA — What is Bionutrients?</a></li>
<li id="ref-10"><a href="https://www.bbc.com/news/articles/czxl849j77ko" target="_blank" rel="noopener noreferrer">BBC News — Ice on Mars</a></li>
<li id="ref-11"><a href="https://2025.igem.wiki/tudarmstadt/description" target="_blank" rel="noopener noreferrer">iGEM 2025 TU Darmstadt — Description</a></li>
<li id="ref-12"><a href="https://www.nasa.gov/hrp/radiation/space-radiation-miniseries/" target="_blank" rel="noopener noreferrer">NASA — Space Radiation Miniseries</a></li>
<li id="ref-13"><a href="https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96" target="_blank" rel="noopener noreferrer">NASA Human Research Roadmap — Risk of Radiation Carcinogenesis</a></li>
<li id="ref-14"><a href="https://www.nasa.gov/wp-content/uploads/2026/01/ochmo-mtb-012-pharmaceutical-care.pdf" target="_blank" rel="noopener noreferrer">NASA OCHMO — Pharmaceutical Care</a></li>
<li id="ref-15"><a href="https://ntrs.nasa.gov/api/citations/20240001489/downloads/ExMC%20Strat%20for%20Drug%20Stability%20-%20May%202024%20final%201.pdf" target="_blank" rel="noopener noreferrer">NASA — ExMC Strategy for Drug Stability</a></li>
<li id="ref-16"><a href="https://www.nasa.gov/general/an-astropharmacy/" target="_blank" rel="noopener noreferrer">NASA — An Astropharmacy</a></li>
<li id="ref-17"><a href="https://www.nasa.gov/ames/space-biosciences/laboratory-of-countermeasures-development/" target="_blank" rel="noopener noreferrer">NASA Ames — Laboratory of Countermeasures Development</a></li>
<li id="ref-18"><a href="https://pubmed.ncbi.nlm.nih.gov/21479701/" target="_blank" rel="noopener noreferrer">PubMed — 21479701</a></li>
<li id="ref-19"><a href="https://www.nasa.gov/ames/space-biosciences/bioengineering-branch/bionutrients/" target="_blank" rel="noopener noreferrer">NASA — Bionutrients</a></li>
<li id="ref-20"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6501615/" target="_blank" rel="noopener noreferrer">Frontiers in Microbiology — Proteomic and Metabolomic Profiling of *Deinococcus radiodurans* Recovering After Exposure to Simulated Low Earth Orbit Vacuum Conditions</a></li>
<li id="ref-21"><a href="https://link.springer.com/article/10.1007/s10750-005-1409-5" target="_blank" rel="noopener noreferrer">Hydrobiologia — The ‘Hyena Female’ of Tardigrades and Descriptions of Two New Species of Megastygarctides from Saudi Arabia</a></li>
<li id="ref-22"><a href="https://www.nature.com/articles/s41467-025-63652-3" target="_blank" rel="noopener noreferrer">Nature Communications — Multivalent binding of the tardigrade Dsup protein to chromatin promotes yeast survival and longevity upon exposure to oxidative damage</a></li>

</ol>
