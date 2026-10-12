## Project overview

As humanity prepares for longer and more ambitious space missions, ensuring astronauts' health and well-being becomes increasingly important. Missions such as NASA's Expedition 75 and future exploration initiatives around the Moon highlight the growing role of astronauts in conducting scientific research beyond Earth <a class="cite" href="#ref-1">1</a>,<a class="cite" href="#ref-2">2</a>. However, as missions extend farther from our planet, crews will face new challenges, including limited access to medical supplies and increasingly difficult resupply operations.

<div class="callout accent question">

How can synthetic biology help support astronauts during long-duration space missions?

</div>

<div class="popup-grid three sequence">

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-num">1</span><span class="popup-face"><span class="popup-title">Engineering microorganisms for space</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Our initial approach focused on engineering microorganisms capable of functioning under space-associated environmental stressors. We selected *Bacillus subtilis*, *Saccharomyces cerevisiae*, and *Pichia pastoris* as promising microbial chassis due to their established applications in biotechnology.

To explore strategies for improving resilience, we integrated Dsup in our chassis, a DNA-associated protein found in tardigrades that can protect against radiation-induced damage. Inspired by Saudi Arabia's Rub' al Khali desert, our dry-lab team also developed a gene-mining pipeline that identified 19 candidate genes associated with stress responses, including DNA repair, cold-shock adaptation, and desiccation tolerance.

Our objective was to develop microbial hosts with the potential to support reliable biological production under challenging environmental conditions.

</div>
</div>

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-num">2</span><span class="popup-face"><span class="popup-title">A library of protein payloads</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

<p><span class="hl">Astronauts rely on medications transported from Earth, which may become increasingly difficult to replenish during longer missions.</span></p>

We explored whether our engineered microorganisms could function as biological factories, producing therapeutic proteins and other biologics directly in space. We designed a library of protein payloads with potential applications in astronaut health and biotechnology. Our selection included therapeutic candidates such as nanobodies targeting infectious diseases and pathways associated with bone loss and muscle wasting.

<p><a class="person-link-btn" href="/kaust-ksa/protein-library">Our Protein Library →</a></p>

</div>
</div>

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-num">3</span><span class="popup-face"><span class="popup-title">From biological production to automation</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Producing biologics requires more than a resilient microbial host. Microorganisms must grow under controlled conditions, their production must be monitored and induced, and the resulting biomolecules must be recovered and purified. Performing these steps manually would place additional demands on astronauts, whose time and resources are already limited. To address this, we envisioned a compact, autonomous biomanufacturing platform integrating engineered microorganisms with a bioreactor and automated downstream purification. Designed with spaceflight constraints in mind, the system aims to minimize crew intervention through sensor-based monitoring, automated control of cultivation conditions, induction of protein production, and purification of the resulting biologics.

</div>
</div>

</div>

## Medicine beyond Earth

On the International Space Station (ISS), astronauts have access to medical kits containing medications for a range of anticipated health conditions. These supplies can be replenished through cargo missions, and emergency evacuation to Earth remains possible. However, future missions to the Moon, Mars, and beyond will operate under very different conditions. Greater distances, longer mission durations, and limited opportunities for resupply will make it increasingly difficult to ensure that astronauts have access to safe and effective medications throughout their journey <a class="cite" href="#ref-3">3</a>,<a class="cite" href="#ref-4">4</a>.

<div class="popup-grid three">

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg></span><span class="popup-face"><span class="popup-title">Limited resupply</span><span class="popup-desc">Replacement medicines may be difficult or impossible to deliver.</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

On the ISS, medical supplies can be replaced through resupply missions. For exploration missions farther from Earth, however, replacement medications may take months to arrive or may not be available at all. Astronauts will need to rely more heavily on the resources they carry at launch, making medical planning and onboard autonomy increasingly important <a class="cite" href="#ref-3">3</a>.

</div>
</div>

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/></svg></span><span class="popup-face"><span class="popup-title">Medicine stability</span><span class="popup-desc">Long storage periods present pharmaceutical quality challenges.</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Although medications stored aboard the ISS have generally remained usable, some studies have identified stability concerns for particular pharmaceuticals. As missions extend over several years, prolonged storage combined with spaceflight-specific environmental conditions (ionizing radiation, altered gravity, and temperature fluctuations) may increase the difficulty of ensuring consistent pharmaceutical quality and effectiveness <a class="cite" href="#ref-4">4</a>,<a class="cite" href="#ref-5">5</a>.

</div>
</div>

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></span><span class="popup-face"><span class="popup-title">Storage and medical needs</span><span class="popup-desc">Limited capacity makes it difficult to prepare for every condition.</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Every kilogram and cubic centimeter aboard a spacecraft matters. Medical supplies must compete with other essential resources for limited mass and storage capacity. At the same time, it is impossible to predict every illness, injury, or medical complication astronauts may encounter. Carrying sufficient quantities of every potentially necessary medication would be impractical, requiring careful decisions about which treatments to prioritize <a class="cite" href="#ref-3">3</a>,<a class="cite" href="#ref-6">6</a>.

</div>
</div>

</div>

The farther astronauts travel from Earth, the more difficult it becomes to depend exclusively on medicines manufactured, stored, and transported from our planet. Ensuring access to healthcare during future exploration missions may therefore require new approaches that complement conventional pharmaceutical supplies and give astronauts greater independence from Earth-based infrastructure.

## Rethinking space healthcare

<span class="hl">In-situ biomanufacturing offers a different approach.</span> Rather than depending exclusively on a fixed inventory of finished pharmaceuticals, biological production systems could enable the manufacture of selected therapeutic molecules during a mission.

<!-- "How SHIHAB works / Our solution" goes here. In the draft it is still
     only the iGEM template prompts (green placeholders), so it isn't
     rendered yet — see ProjectdescriptionDraft.html. -->

## Beyond the lab: Shaping SHIHAB together

Developing SHIHAB required us to look beyond the laboratory and understand the people, environments, and communities our technology could eventually serve. Through our <a href="/kaust-ksa/human-integrated-practices">Integrated Human Practices</a>, we engaged with astronauts, space medicine professionals, scientists, industry representatives, and regulatory experts, whose perspectives helped us reconsider our priorities, identify limitations, and guide decisions throughout the project's development.

But responsible innovation also requires involving society in discussions about emerging biotechnologies. Through the Tawasol Hackathon, 186 students explored biosafety, public trust, ethics, and accountability. The Tawasol Summit brought together iGEM teams from four countries to discuss regional perceptions of synthetic biology, while our collaboration with Kallpa Greenz in Peru explored community concerns surrounding genetic engineering and supported educational initiatives for rural communities. Alongside these initiatives, our Space Academy and mentorship activities aimed to make space science and biotechnology more accessible, encouraging the next generation to explore, question, and contribute to scientific innovation.

<div class="callout accent">

Our efforts gave us an important lesson, responsible innovation requires more than technological progress. It also relies on education, open dialogue, and the active participation of the communities that emerging technologies may one day impact.

</div>

## Our vision

What started as an exploration of microbial resilience evolved into a broader vision of making biological production possible in environments where conventional pharmaceutical supply chains are difficult to maintain.

<div class="card-grid stack">

<div>

#### Beyond Earth

As human exploration extends toward the Moon, Mars, and beyond, the ability to maintain crew health with fewer resources from Earth will become increasingly important. We envision a future in which astronauts could access a library of preserved microbial production strains, selecting the biological payload they need and using a shared manufacturing platform to produce it during their mission. Such a system could complement conventional medical supplies, offering greater flexibility in responding to healthcare needs while reducing dependence on transporting every therapeutic product in its finished form.

</div>

<div>

#### Back on Earth

Although SHIHAB was conceived for space exploration, the challenges it addresses are not exclusive to space. Remote communities, disaster-affected regions, and locations with limited pharmaceutical infrastructure can also experience difficulties accessing essential medicines.

The principles behind compact, modular, and automated biomanufacturing could eventually support decentralized production systems capable of manufacturing selected biologics closer to where they are needed. By exploring these possibilities, SHIHAB connects the challenges of space exploration with opportunities to improve access to biotechnology on Earth.

</div>

<div>

#### Looking ahead

Realizing this vision will require further advances in microbial preservation, reliable protein production, automated purification, product quality control, and system validation under relevant spaceflight conditions. SHIHAB represents an early step toward exploring how these capabilities could work together.

</div>

</div>

<div class="callout accent">

Our vision is a future in which access to biological therapeutics is no longer defined solely by distance from Earth or proximity to conventional pharmaceutical infrastructure.

</div>

## References

<ol class="ref-list">

<li id="ref-1"><a href="https://www.nasa.gov/mission/expedition-75/" target="_blank" rel="noopener noreferrer">https://www.nasa.gov/mission/expedition-75/</a></li>
<li id="ref-2"><a href="https://www.nasa.gov/mission/gateway/" target="_blank" rel="noopener noreferrer">https://www.nasa.gov/mission/gateway/</a></li>
<li id="ref-3"><a href="https://ntrs.nasa.gov/citations/20250000722" target="_blank" rel="noopener noreferrer">https://ntrs.nasa.gov/citations/20250000722</a></li>
<li id="ref-4"><a href="https://www.nasa.gov/reference/medical-operations-and-clinical-care/" target="_blank" rel="noopener noreferrer">https://www.nasa.gov/reference/medical-operations-and-clinical-care/</a></li>
<li id="ref-5"><a href="https://www.nasa.gov/directorates/esdmd/hhp/risk-of-ineffective-or-toxic-medications-during-long-duration-exploration-spaceflight/" target="_blank" rel="noopener noreferrer">https://www.nasa.gov/directorates/esdmd/hhp/risk-of-ineffective-or-toxic-medications-during-long-duration-exploration-spaceflight/</a></li>
<li id="ref-6"><a href="https://www.nasa.gov/general/nasas-integrated-medical-model-imm/" target="_blank" rel="noopener noreferrer">https://www.nasa.gov/general/nasas-integrated-medical-model-imm/</a></li>

</ol>
