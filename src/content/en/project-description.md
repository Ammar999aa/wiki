## Medicine beyond Earth

<div class="aside-row">

<figure class="img-aside">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/astronaut-medkits.webp" alt="Astronaut aboard the International Space Station with medical kits" loading="lazy">
<figcaption class="caption">ISS medical supplies. Image credit: <a href="https://www.nasa.gov/ochmo/" target="_blank" rel="noopener noreferrer">NASA</a> (public domain)</figcaption>
</figure>

Missions such as NASA's Expedition 75 and future lunar exploration initiatives highlight the growing role of astronauts in conducting scientific research beyond Earth <a class="cite" href="#ref-1">1</a>,<a class="cite" href="#ref-2">2</a>. Today, astronauts aboard the International Space Station (ISS) have access to medical supplies containing medications for various anticipated health conditions. These can be replenished through cargo missions, and evacuation to Earth in case of a serious medical emergency remains possible. However, greater distances and longer mission durations will make these support systems difficult to rely on as exploration extends toward the Moon, Mars, and beyond <a class="cite" href="#ref-3">3</a>,<a class="cite" href="#ref-4">4</a>.

</div>

<div class="popup-grid three">

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg></span><span class="popup-face"><span class="popup-title">Limited resupply</span><span class="popup-desc">Replacement medications may be difficult or impossible to deliver.</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

On the ISS, medical supplies can be replaced through resupply missions. For exploration missions farther from Earth, however, replacement medications may take months to arrive or may not be available at all. Astronauts will need to rely more heavily on the resources they carry at launch, making medical planning and onboard autonomy increasingly important <a class="cite" href="#ref-3">3</a>.

</div>
</div>

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/></svg></span><span class="popup-face"><span class="popup-title">Protein stability</span><span class="popup-desc">Long storage periods and spaceflight conditions present pharmaceutical quality challenges.</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Although medications stored aboard the ISS have generally remained usable, some studies have identified stability concerns for particular pharmaceuticals. As missions extend over several years, prolonged storage combined with spaceflight-specific environmental conditions (ionizing radiation, altered gravity, and temperature fluctuations) may increase the difficulty of ensuring consistent pharmaceutical quality and effectiveness <a class="cite" href="#ref-4">4</a>,<a class="cite" href="#ref-5">5</a>.

</div>
</div>

<div class="popup-card">
<button type="button" class="popup-open"><span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></span><span class="popup-face"><span class="popup-title">Storage and medical needs</span><span class="popup-desc">Limited spacecraft capacity makes it difficult to prepare for every condition.</span><span class="popup-hint">Tap to read more</span></span></button>
<div class="popup-more">

Every kilogram and cubic centimeter aboard a spacecraft matters. Medical supplies must compete with other essential resources for limited mass and storage capacity. At the same time, it is impossible to predict every illness, injury, or medical complication astronauts may encounter. Carrying sufficient quantities of every potentially necessary medication would be impractical, requiring careful decisions about which treatments to prioritize <a class="cite" href="#ref-3">3</a>,<a class="cite" href="#ref-6">6</a>.

</div>
</div>

</div>

<div class="callout accent question">

The farther we travel, <span class="hl">the less we can depend entirely on Earth.</span>

</div>

## Six contributions, one system

We developed SHIHAB to explore a new approach to space healthcare, where astronauts could produce selected biologics on demand rather than relying completely on conventional pharmaceutical supplies. In this regard, we aim to give astronauts greater independence from Earth-based infrastructure during long-duration missions.

**One system, six interconnected research contributions.** Choose a research direction to reveal our approach and the corresponding technical pages.

### Wet lab

<div class="link-grid">

<div class="link-card">
<a class="link-card-face" href="/kaust-ksa/design"><span class="popup-num">1</span><span class="popup-face"><span class="popup-title">3 microbial chassis</span><span class="popup-desc"><i>B. subtilis</i>, <i>S. cerevisiae</i>, <i>P. pastoris</i></span><img class="popup-art" src="https://static.igem.wiki/teams/6341/wiki/content/project-description/organisms.avif" alt="Illustration of microorganisms" loading="lazy"><span class="link-card-go">Wet lab design →</span></span></a>
<button type="button" class="link-card-more">Read more +</button>
<div class="popup-more">

#### Engineering microorganisms for space

Our approach focuses on engineering microbial hosts capable of functioning under space-associated environmental stressors, including ionizing radiation, oxidative stress, and temperature fluctuations. We selected _Bacillus subtilis_, _Saccharomyces cerevisiae_, and _Pichia pastoris_ as promising chassis due to their established applications in biotechnology.

We also propose preserving the microorganisms in compact formats, such as lyophilized preparations or spores where biologically appropriate, until needed for protein production. Developing these robust and resilient hosts is intended to support biomanufacturing under challenging environmental conditions.

<p><a class="person-link-btn" href="/kaust-ksa/design">Wet lab design →</a> <a class="person-link-btn" href="/kaust-ksa/results">Wet lab results →</a></p>

</div>
</div>

<div class="link-card">
<a class="link-card-face" href="/kaust-ksa/results"><span class="popup-num">2</span><span class="popup-face"><span class="popup-title">Radiation resistance</span><span class="popup-desc">Dsup integration · UV and X-ray testing</span><img class="popup-art" src="https://static.igem.wiki/teams/6341/wiki/content/project-description/tardigrades.avif" alt="Illustration of a tardigrade" loading="lazy"><span class="link-card-go">Wet lab results →</span></span></a>
<button type="button" class="link-card-more">Read more +</button>
<div class="popup-more">

#### Investigating radiation resistance

To improve resilience, we genomically integrated **Dsup**, a DNA-associated protein found in tardigrades that has demonstrated protective effects against radiation-induced DNA damage and oxidative stress. Our experimental investigations include UV and X-ray irradiation with viability assessment to study microbial stress responses.

Genetic integration and radiation-testing activities should be distinguished from a demonstrated increase in resistance; strain-specific results are documented in our Wet Lab Results.

<p><a class="person-link-btn" href="/kaust-ksa/results">Wet lab results →</a> <a class="person-link-btn" href="/kaust-ksa/design">Wet lab design →</a></p>

</div>
</div>

<div class="link-card">
<a class="link-card-face" href="/kaust-ksa/protein-library"><span class="popup-num">3</span><span class="popup-face"><span class="popup-title">Protein payload library</span><span class="popup-desc">Nanobodies · Antifreeze proteins · Reporters</span><img class="popup-art" src="https://static.igem.wiki/teams/6341/wiki/content/project-description/proteins.avif" alt="Illustration of protein structures" loading="lazy"><span class="link-card-go">Explore protein library →</span></span></a>
<button type="button" class="link-card-more">Read more +</button>
<div class="popup-more">

#### A library of protein payloads

Our engineered microorganisms are intended to function as biological factories capable of producing therapeutic proteins and other valuable biomolecules for space applications. To explore this potential, we developed a library of protein payloads with applications in astronaut health, scientific research, and biotechnology.

Our library includes therapeutic nanobodies such as **anti-PD-L1** and **Nb1_gbHSV**, targeting immune checkpoint pathways and herpes simplex virus, respectively; antifreeze proteins from the Antarctic bacterium _Flavobacterium frigoris_ and Arctic yeast _Leucosporidium_ sp. AY30, with potential applications in cryopreservation; and fluorescent reporters including **GFP** and **mCherry** to evaluate expression systems.

Future work could expand the library to additional therapeutic candidates, including molecules associated with muscle atrophy and bone loss. Selection for the library does not imply that every payload has been experimentally produced or purified.

<p><a class="person-link-btn" href="/kaust-ksa/protein-library">Explore protein library →</a></p>

</div>
</div>

</div>

### Dry lab

<div class="link-grid">

<div class="link-card">
<a class="link-card-face" href="/kaust-ksa/hardware"><span class="popup-num">4</span><span class="popup-face"><span class="popup-title">COMSOL bioreactor model</span><span class="popup-desc">We developed a COMSOL Multiphysics model to simulate and optimize the operating conditions of our bioreactor, supporting the design of an efficient and reliable space biomanufacturing platform.</span><span class="link-card-go">Explore Hardware →</span></span></a>
</div>

<div class="link-card">
<a class="link-card-face" href="/kaust-ksa/model"><span class="popup-num">5</span><span class="popup-face"><span class="popup-title">Growth-condition modeling</span><span class="popup-desc">Carbon and nitrogen sources · Metabolic models · COMSOL</span><span class="link-card-go">Explore Modeling →</span></span></a>
<button type="button" class="link-card-more">Read more +</button>
<div class="popup-more">

#### Modeling growth and reactor conditions

The dry-lab team explored biological production capacity through constraint-based metabolic modeling, including the effects of nutrient availability and different carbon and nitrogen sources. Investigations included glucose and sucrose conditions.

Computational fluid-dynamics (CFD) simulations in COMSOL examined mixing, circulation, gas distribution, and rotor geometries under gravity-related constraints, helping inform bioreactor design decisions. These analyses evaluate modeled capabilities rather than experimentally proving production performance in space.

<p><a class="person-link-btn" href="/kaust-ksa/model">Explore Modeling →</a> <a class="person-link-btn" href="/kaust-ksa/hardware">Hardware page →</a></p>

</div>
</div>

</div>

### Hardware

<div class="link-grid">

<div class="link-card">
<a class="link-card-face" href="/kaust-ksa/hardware"><span class="popup-num">6</span><span class="popup-face"><span class="popup-title">Portable biomanufacturing</span><span class="popup-desc">Bioreactor · Monitoring · Induction · Purification</span><img class="popup-art" src="https://static.igem.wiki/teams/6341/wiki/content/project-description/suitcase.avif" alt="Illustration of a compact biomanufacturing platform in a case" loading="lazy"><span class="link-card-go">Explore Hardware →</span></span></a>
<button type="button" class="link-card-more">Read more +</button>
<div class="popup-more">

#### From biological production to automation

Efficient expression and purification of proteins require more than engineering the chassis. Microorganisms must grow under controlled favorable conditions, payload production must be monitored and induced, and the resulting molecules must be recovered and purified. Performing these steps manually would place additional demands on astronauts, whose time and resources are limited. Establishing a conventional laboratory with centrifuges, purification instruments, and other equipment inside a spacecraft would also be challenging and costly.

To address this, we designed a compact, **autonomous biomanufacturing platform** integrating a bioreactor and automated downstream purification system. Designed with spaceflight constraints in mind, the platform aims to minimize crew intervention through sensor-based monitoring, automated control of cultivation conditions, induction of protein expression, and purification of resulting biologics.

<p><a class="person-link-btn" href="/kaust-ksa/hardware">Explore Hardware →</a></p>

</div>
</div>

</div>

<div class="panel">
<div class="panel-title"><span>Production workflow · five stages</span><span>Proposed</span></div>
<ol class="process-strip">
<li><svg viewBox="0 0 48 48" class="process-ico" aria-hidden="true"><g transform="rotate(-40 24 24)"><path d="M16 24v-6a8 8 0 0 1 16 0v6z" class="pi-light"/><path d="M16 24v6a8 8 0 0 0 16 0v-6z" class="pi-main"/><circle cx="21" cy="29" r="1.7" class="pi-light"/><circle cx="26.5" cy="32" r="1.7" class="pi-light"/></g></svg><span class="process-label"><span class="process-num">1</span>Preserve</span><span class="process-desc">Freeze-dried microbes or spores</span></li>
<li><svg viewBox="0 0 48 48" class="process-ico" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="7" class="pi-frame"/><rect x="13" y="13" width="22" height="7.5" rx="2.5" class="pi-light"/><rect x="13" y="24" width="9.5" height="11" rx="2.5" class="pi-amber"/><rect x="25.5" y="24" width="9.5" height="11" rx="2.5" class="pi-main"/></svg><span class="process-label"><span class="process-num">2</span>Select</span><span class="process-desc">Choose the strain for your protein</span></li>
<li><svg viewBox="0 0 48 48" class="process-ico" aria-hidden="true"><path d="M9 8h30M12 8v32M36 8v32M8 40h32M24 4v22" class="pi-line"/><rect x="16" y="14" width="16" height="22" rx="5" class="pi-line"/><path d="M16 26h16v5a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5z" class="pi-main"/><circle cx="24" cy="26.5" r="2.4" class="pi-light"/></svg><span class="process-label"><span class="process-num">3</span>Grow</span><span class="process-desc">Activate and grow in the bioreactor</span></li>
<li><svg viewBox="0 0 48 48" class="process-ico" aria-hidden="true"><circle cx="16" cy="18" r="7" class="pi-blue"/><circle cx="29" cy="16" r="6.5" class="pi-main"/><circle cx="35" cy="28" r="6.5" class="pi-main"/><circle cx="14" cy="31" r="6" class="pi-blue"/><circle cx="24.5" cy="28" r="7.5" class="pi-light"/></svg><span class="process-label"><span class="process-num">4</span>Produce</span><span class="process-desc">Secrete therapeutic proteins</span></li>
<li><svg viewBox="0 0 48 48" class="process-ico" aria-hidden="true"><rect x="18.5" y="4" width="11" height="5.5" rx="1.8" class="pi-light"/><path d="M18 9.5h12v4.5l3.5 4.5V38a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4V18.5l3.5-4.5z" class="pi-line"/><path d="M17.5 24h13v13.5a2.5 2.5 0 0 1-2.5 2.5h-8a2.5 2.5 0 0 1-2.5-2.5z" class="pi-main"/><path d="M24 27.5c2 2.6 3 4.2 3 5.4a3 3 0 0 1-6 0c0-1.2 1-2.8 3-5.4z" class="pi-light"/></svg><span class="process-label"><span class="process-num">5</span>Purify</span><span class="process-desc">Recover and purify the product</span></li>
</ol>
</div>

## Shaping SHIHAB together

<div class="photo-slider">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/meetingall.avif" alt="Integrated Human Practices: exploring the unknown" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/sarah-meeting.avif" alt="Integrated Human Practices: finding our direction" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/rayannah-meet.avif" alt="Integrated Human Practices: listening to astronauts and space medicine" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/luis-meeting.avif" alt="Integrated Human Practices: engineering microorganisms for space" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/andrew-meeting.avif" alt="Integrated Human Practices: looking back at Earth" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/pe-activity.avif" alt="Integrated Human Practices: engaging society" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/pe-activity-1.avif" alt="Public engagement event audience in front of a stage screen" loading="lazy">
<img src="https://static.igem.wiki/teams/6341/wiki/content/project-description/impact.avif" alt="Integrated Human Practices: anticipating our impact" loading="lazy">
</div>

Developing SHIHAB required us to look beyond the laboratory and understand the people, environments, and communities our technology could eventually serve. Through our <a href="/kaust-ksa/human-practices">Integrated Human Practices</a>, we engaged with astronauts, space medicine professionals, scientists, industry representatives, and regulatory experts, whose perspectives helped us reconsider our priorities, identify limitations, and guide decisions throughout the project's development.

But responsible innovation also requires involving society in discussions about emerging biotechnologies. Through the **Tawasol Hackathon**, 186 students explored biosafety, public trust, ethics, and accountability. The **Tawasol Summit** brought together iGEM teams from four countries to discuss regional perceptions of synthetic biology, while our collaboration with **Kallpa Greenz in Peru** explored community concerns surrounding genetic engineering and supported educational initiatives for rural communities. Alongside these initiatives, our **Space Academy and mentorship activities** aimed to make space science and biotechnology more accessible, encouraging the next generation to explore, question, and contribute to scientific innovation.

**Our efforts gave us an important lesson: responsible innovation requires more than technological progress.** It also relies on education, open dialogue, and the active participation of the communities that emerging technologies may one day impact.

<p><a class="person-link-btn" href="/kaust-ksa/human-practices">Explore Integrated Human Practices →</a> <a class="person-link-btn" href="/kaust-ksa/education">Explore Education →</a></p>

## Biomanufacturing beyond boundaries

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

</div>

### Looking ahead

Realizing this vision will require further advances in microbial preservation, reliable protein production, automated purification, product quality control, and system validation under relevant spaceflight conditions. SHIHAB represents an early step toward exploring how these capabilities could work together.

<div class="callout accent">

Our vision is a future in which access to biological therapeutics is no longer defined solely by <span class="hl">distance from Earth</span> or proximity to conventional pharmaceutical infrastructure.

</div>

## References

<ol class="ref-list">

<li id="ref-1"><a href="https://www.nasa.gov/mission/expedition-75/" target="_blank" rel="noopener noreferrer">NASA — Expedition 75</a></li>
<li id="ref-2"><a href="https://www.nasa.gov/mission/gateway/" target="_blank" rel="noopener noreferrer">NASA — Gateway</a></li>
<li id="ref-3"><a href="https://ntrs.nasa.gov/citations/20250000722" target="_blank" rel="noopener noreferrer">NASA Technical Reports Server — Medical supply research</a></li>
<li id="ref-4"><a href="https://www.nasa.gov/reference/medical-operations-and-clinical-care/" target="_blank" rel="noopener noreferrer">NASA — Medical operations and clinical care</a></li>
<li id="ref-5"><a href="https://www.nasa.gov/directorates/esdmd/hhp/risk-of-ineffective-or-toxic-medications-during-long-duration-exploration-spaceflight/" target="_blank" rel="noopener noreferrer">NASA — Risk of ineffective or toxic medications during long-duration exploration spaceflight</a></li>
<li id="ref-6"><a href="https://www.nasa.gov/general/nasas-integrated-medical-model-imm/" target="_blank" rel="noopener noreferrer">NASA — Integrated Medical Model (IMM)</a></li>

</ol>
