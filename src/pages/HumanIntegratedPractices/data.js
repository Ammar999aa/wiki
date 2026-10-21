// Copy for the page's custom components (QuestionMap, OrbitTimeline, JigsawTable, ValuesCards, GlanceGrid).

// `icon` is the same round step icon the stakeholder cards use (the global .step-icon in styles/index.scss).
export const orbitSteps = [
  {
    letter: "O",
    icon: "observe",
    title: "Observe the Challenge",
    body: "Understand the healthcare, biological, and logistical challenges of space exploration.",
  },
  {
    letter: "R",
    icon: "reach",
    title: "Reach Stakeholders",
    body: "Engage astronauts, researchers, space medicine specialists, industry, regulatory experts and communities.",
  },
  {
    letter: "B",
    icon: "build",
    title: "Build with Insights",
    body: "Translate stakeholder knowledge into concrete decisions for SHIHAB.",
  },
  {
    letter: "I",
    icon: "iterate",
    title: "Iterate Responsibly",
    body: "Reassess assumptions, limitations, risks and design choices as new perspectives emerge.",
  },
  {
    letter: "T",
    icon: "translate",
    title: "Translate the Impact",
    body: "Extend what we learn beyond the laboratory, toward space exploration, Earth applications, and society.",
  },
];

export const foundingQuestions = [
  { tag: "Need", text: "What do astronauts actually need?" },
  { tag: "Feasibility", text: "Would producing therapeutics in space be feasible and safe?" },
  { tag: "Scale", text: "What would it take for such a system to move beyond the laboratory?" },
  { tag: "Voice", text: "Who should have a voice in shaping it?" },
];

export const stakeholderGroups = [
  {
    name: "Astronauts & Space Medicine",
    learn: [
      "What medical problems matter?",
      "How are medicines currently managed?",
      "What would astronauts actually trust or use?",
    ],
    influence: ["Therapeutic choice", "Usability", "Autonomy", "Safety requirements"],
  },
  {
    name: "Scientists & Technical Experts",
    learn: [
      "Which organisms could work under space-associated stresses?",
      "Which microorganisms and toolkits can be used for our purpose?",
      "What are the major limitations of our research?",
    ],
    influence: ["Host selection", "Stress engineering", "Experimental design", "Testing"],
  },
  {
    name: "Regulatory, Safety & Ethics",
    learn: [
      "How could an engineered microorganism producing a therapeutic be safely used?",
      "What regulations apply?",
    ],
    influence: ["Containment", "Biosafety", "Quality controls", "Responsible design and production"],
  },
  {
    name: "Humanitarian Context",
    learn: [
      "Could decentralized biomanufacturing be useful where medicine supply chains are disrupted?",
      "What additional requirements would these environments introduce?",
    ],
    influence: ["Disaster-zone application", "Broader accessibility to our platform", "Remote deployment"],
  },
  {
    name: "Community",
    learn: [
      "What does society understand about space biotechnology?",
      "What knowledge gaps, concerns or misconceptions exist?",
    ],
    influence: ["Educational materials", "Communication strategy", "Space Academy"],
  },
];

// `tone` picks the card's accent colour in ValuesCards (see `data-tone` in the stylesheet).
export const values = [
  {
    name: "Autonomy",
    tone: "violet",
    body: "SHIHAB was conceived for environments where continuous external support cannot always be guaranteed. We therefore aimed to reduce dependence on resupply, resources, and continuous human intervention while maintaining appropriate monitoring and control.",
  },
  {
    name: "Adaptability",
    tone: "blue",
    body: "The needs and constraints of SHIHAB will change depending on where and how it is used. We aimed to develop a platform that could adapt its biological components, therapeutic outputs, and operation to different environments and user needs.",
  },
  {
    name: "Responsibility",
    tone: "amber",
    body: "Working with engineered microorganisms to produce therapeutics requires careful consideration of safety, quality, containment, and potential consequences. We committed to recognizing the limits of our work, considering risks alongside benefits, and identifying the validation and oversight required before future deployment.",
  },
  {
    name: "Accessibility",
    tone: "green",
    body: "For SHIHAB to create meaningful impact, the people who may eventually interact with it should be able to understand, operate, maintain, and participate in shaping the technology. Accessibility therefore includes usability and local capacity, as well as access to information and opportunities to engage with the science behind the project.",
  },
];

// "Our IHP Journey at a Glance" tiles. `target` is the exact heading text the tile
// scrolls to (a "##" section or a "###" subsection). `photo` is a file in
// static.igem.wiki/.../content/human-integrated-practices/journey-map/; until it is uploaded
// the tile falls back to its gradient.
export const glanceTiles = [
  {
    title: "Exploring the unknown",
    target: "Exploring the unknown",
    photo: "meetingall",
    body: "We started by asking our community about the challenges of living in space and investigating where biotechnology could make a meaningful contribution.",
  },
  {
    title: "Finding our direction",
    target: "Finding our direction",
    photo: "sarah-meeting",
    body: "We moved from the idea of resilient microorganisms to SHIHAB: a platform combining microbial resilience with on-demand therapeutic production.",
  },
  {
    title: "Listening to astronauts and space medicine",
    target: "Listening to astronauts and space medicine experts",
    photo: "rayannah-meet",
    body: "Astronauts and healthcare experts helped us understand therapeutic needs, crew constraints, automation, product quality, and the importance of space-relevant validation.",
  },
  {
    title: "Engineering microorganisms for space",
    target: "Engineering microorganisms for space",
    photo: "luis-meeting",
    body: "Scientific experts informed our selection of B. subtilis and S. cerevisiae, resilience strategy, stress testing, and evaluation of molecular damage.",
  },
  {
    title: "From concept to implementation",
    target: "From concept to implementation",
    photo: "hardware",
    body: "We explored automation, monitoring, mission integration, biosafety, regulation, and progressive validation to understand what would be required to move SHIHAB beyond a laboratory proof of concept.",
  },
  {
    title: "Looking back at Earth",
    target: "Looking back at Earth",
    photo: "andrew-meeting",
    body: "Humanitarian perspectives helped us explore how SHIHAB's principles could translate to remote or disrupted settings while highlighting the importance of context, infrastructure, maintainability, and local needs.",
  },
  {
    title: "Engaging with society",
    target: "Engaging with society",
    photo: "pe-activity",
    body: "Our interactions with the public reinforced the importance of making synthetic biology and space biotechnology understandable and creating opportunities for people to question and discuss emerging technologies.",
  },
  {
    title: "Anticipating our impact",
    target: "Anticipating our impact",
    photo: "impact",
    body: "We considered SHIHAB's potential benefits alongside its risks, dependencies, limitations, and unresolved questions to identify what responsible future development would require.",
  },
  {
    title: "Closing the ORBIT",
    target: "Closing the ORBIT",
    body: "We learned that responsible design requires balancing autonomy, adaptability, responsibility, and accessibility, and that these priorities must continue to be revisited as new evidence and perspectives emerge.",
  },
];

// "Who shaped SHIHAB" orbit map (ShapedByMap). Built only from the stakeholder
// cards already on this page:
// - `parts` are the wiki pages each card's own "→" buttons link to;
// - `changed` is copied verbatim from that card's Iterate step ("…" marks a cut);
// - `card` is the card's exact <h4 class="person-name"> text, used to find it;
// - `photos` reuse each card's photo and crop (--photo-x/-y/-zoom/-zoom-y).
// `topic` is a short label for what we asked them about, written for this map.
export const shapedParts = [
  { id: "payload", label: "Payload library", path: "/design" },
  { id: "experiments", label: "Wet-lab experiments", path: "/experiments" },
  { id: "drylab", label: "Dry Lab", path: "/model" },
  { id: "roadmap", label: "Long-term roadmap", path: "/proposed-implementation" },
  { id: "safety", label: "Safety handbook", path: "/safety-and-security" },
  { id: "hardware", label: "Hardware", path: "/hardware" },
  { id: "modeling", label: "Modeling & dashboard", path: "/hardware" },
];

// `tone` matches the ValuesCards tones (see `data-tone` in the stylesheet).
export const shapedGroups = [
  { id: "astronauts", label: "Astronauts & medicine", tone: "violet" },
  { id: "microbes", label: "Microbiology", tone: "blue" },
  { id: "mission", label: "Mission & safety", tone: "green" },
  { id: "earth", label: "Humanitarian", tone: "amber" },
  { id: "society", label: "Engaging society", tone: "rose" },
];

export const shapedPeople = [
  {
    id: "starr",
    group: "astronauts",
    lines: ["Starr Corbin"],
    card: "Starr Corbin",
    topic: "Astronaut healthcare",
    photos: [{ file: "starr.avif", x: "55%", y: "26%", zoom: 2.6 }],
    parts: ["payload"],
    changed:
      "Through this exploration, Spaceflight-Associated Neuro-ocular Syndrome (SANS) and carcinogenesis emerged as relevant health risks to consider, and we added potential therapeutics addressing these conditions to our list of possible payloads for SHIHAB.",
  },
  {
    id: "vergos-chandrashekhar",
    group: "astronauts",
    lines: ["Konstantinos Vergos", "& Akshay Chandrashekhar"],
    card: "Konstantinos Vergos & Dr. Akshay Chandrashekhar",
    topic: "Space medicine",
    photos: [
      { file: "konstantinos.avif", x: "45%", zoom: 1.4 },
      { file: "akshay.avif", zoom: 1.3 },
    ],
    parts: ["modeling", "payload"],
    changed:
      "The convergence of their feedback made microgravity a clear component of our validation strategy. Before progressing toward experimental platforms such as parabolic flights, we began investigating how altered gravity could affect our system through COMSOL simulations.",
  },
  {
    id: "barnawi",
    group: "astronauts",
    lines: ["Rayyanah Barnawi"],
    card: "Rayyanah Barnawi",
    topic: "Research aboard the ISS",
    photos: [{ file: "rayannah.avif", x: "37%", zoomY: "2%", zoom: 1.6 }],
    parts: ["hardware"],
    changed:
      "Based on these insights, we decided that developing a hardware system would be an important part of SHIHAB.",
  },
  {
    id: "rosado",
    group: "microbes",
    lines: ["Alexandre Rosado"],
    card: "Prof. Alexandre Rosado",
    topic: "Choosing a chassis",
    photos: [{ file: "rosado.avif" }],
    parts: ["experiments", "roadmap"],
    changed:
      "Based on these considerations, we first selected <em>Bacillus subtilis</em> and <em>Saccharomyces cerevisiae</em> as our main chassis. We also began planning experiments to compare their resistance to UV exposure.",
  },
  {
    id: "mason",
    group: "microbes",
    lines: ["Christopher E. Mason"],
    card: "Dr. Christopher E. Mason",
    topic: "Dsup & DNA damage",
    photos: [{ file: "mason.avif" }],
    parts: ["experiments"],
    changed:
      "Following Dr. Mason's feedback, we moved forward with Dsup as one of the protective genes in our chassis-engineering strategy. We also incorporated the Comet assay into our experimental workflow …",
  },
  {
    id: "zea",
    group: "microbes",
    lines: ["Luis Zea"],
    card: "Dr. Luis Zea",
    topic: "Microbes in spaceflight",
    photos: [{ file: "luis.avif" }],
    parts: ["drylab"],
    changed:
      "We also began investigating alternative nutrient sources and media-recycling strategies that could reduce dependence on supplies transported from Earth.",
  },
  {
    id: "washington",
    group: "microbes",
    lines: ["Kimberly Washington", "Deep Space Biology"],
    card: "Deep Space Biology — Kimberly Washington",
    topic: "Feasibility for space missions",
    photos: [{ file: "kimberly.avif" }],
    // Not tied to one part of the project: beams to SHIHAB at the centre.
    parts: [],
    changed:
      "Her insights guided us toward a more integrated biological and engineering approach, with greater attention to operational requirements and measurable performance.",
  },
  {
    id: "glowe",
    group: "mission",
    lines: ["Savi Glowe", "BIOASTRA"],
    card: "BIOASTRA — Savi Glowe",
    topic: "The path to spaceflight",
    photos: [{ file: "savi.avif" }],
    parts: ["roadmap"],
    changed: "Savi's feedback became the starting point for developing a long-term pathway for SHIHAB.",
  },
  {
    id: "alharbi",
    group: "mission",
    lines: ["Sarah Al Harbi"],
    card: "Sarah Al Harbi",
    topic: "Mission integration",
    // No photo of Sarah, so the map shows a person outline in its place.
    icon: "person",
    parts: ["modeling", "hardware"],
    changed:
      "Sarah's feedback influenced both our dry-lab and hardware development. To reduce the need for continuous crew supervision, our dry-lab team developed a monitoring dashboard …",
  },
  {
    id: "hse",
    group: "mission",
    lines: ["KAUST HSE"],
    card: "Health, Safety & Environment (HSE) at KAUST",
    topic: "Biosafety",
    photos: [{ file: "rodion.avif" }],
    parts: ["safety", "hardware"],
    changed:
      "Their feedback directly informed our Safety Handbook, including hazard identification, risk assessment, containment failure, accidental exposure, environmental release, and emergency response. It also shaped our Hardware manual …",
  },
  {
    id: "mian",
    group: "mission",
    lines: ["Junaid Mian"],
    card: "Junaid Mian",
    topic: "Regulation & product development",
    photos: [{ file: "junaid.avif" }],
    parts: ["roadmap"],
    changed:
      "He also encouraged us to prioritize therapeutics based on the medical conditions astronauts are likely to face during specific missions, rather than selecting products solely for their ease of production.",
  },
  {
    id: "alahmadi",
    group: "astronauts",
    lines: ["Wijdan Al-Ahmadi"],
    card: "Dr. Wijdan Al-Ahmadi",
    topic: "Feasibility & automation",
    photos: [{ file: "wijdan.avif" }],
    parts: ["hardware"],
    changed:
      "Although we eventually moved away from oxygen production to focus on therapeutic biomanufacturing, her recommendations continued to influence SHIHAB's development, particularly our emphasis on automation, monitoring, product quality, and space-relevant validation.",
  },
  {
    id: "macleod",
    group: "earth",
    lines: ["Andrew Macleod"],
    card: "Andrew Macleod",
    topic: "Humanitarian response",
    photos: [{ file: "andrew.avif" }],
    parts: ["hardware"],
    changed:
      "We incorporated disaster response and remote healthcare as a second application context when evaluating SHIHAB. … This reinforced the importance of designing SHIHAB to be portable, resource-efficient, safe, and increasingly autonomous.",
  },
  {
    id: "kessler",
    group: "earth",
    lines: ["Rachel Kessler"],
    card: "Rachel Kessler",
    topic: "Humanitarian deployment",
    photos: [{ file: "kessler.avif" }],
    parts: ["hardware"],
    changed:
      "Rachel's feedback led us to define a new principle for SHIHAB's humanitarian application: design for a specific context, not for an abstract “disaster zone.”",
  },
  {
    id: "grant",
    group: "earth",
    lines: ["Jonathan Grant"],
    card: "Jonathan Grant",
    topic: "Remote & humanitarian settings",
    photos: [{ file: "grant.avif" }],
    // Not tied to one part of the project: beams to SHIHAB at the centre.
    parts: [],
    changed:
      "His feedback helped us move away from treating remote healthcare as a single application and toward more context-specific deployment scenarios, where local needs, resources, and societal considerations would guide future development.",
  },
  // The three "Engaging with society" activities. Not people, so they get an
  // icon instead of a photo (`icon` names a glyph in ShapedByMap.jsx), and
  // `tab` is the EngagementTabs tab their readout button opens. `changed`
  // quotes each activity's "How this informed SHIHAB" text.
  {
    id: "mentorship",
    kind: "activity",
    group: "society",
    lines: ["Mentorship Program"],
    card: "KAUST iGEM Summer Mentorship Program",
    topic: "Understanding the next generation of scientists",
    icon: "mentorship",
    tab: "mentorship",
    parts: [],
    changed:
      "The responses helped us recognize the importance of explaining not only what our technology aims to achieve, but also the biological principles that make it possible.",
  },
  {
    id: "tawasol",
    kind: "activity",
    group: "society",
    lines: ["Tawasol Hackathon"],
    card: "Tawasol Hackathon & Policy Showcase",
    topic: "Who should govern SHIHAB?",
    icon: "tawasol",
    tab: "tawasol",
    parts: [],
    changed:
      "The hackathon highlighted three priorities for SHIHAB's future development: remote quality assurance, operational accountability, and healthcare integration.",
  },
  {
    id: "academy",
    kind: "activity",
    group: "society",
    lines: ["Space Academy"],
    card: "Space Academy",
    topic: "What does the public know about space biology?",
    icon: "academy",
    tab: "academy",
    parts: ["hardware"],
    changed:
      "Based on this and our stakeholders’ interviews, we decided to account for power consumption, payload mass, and available resources when designing SHIHAB's bioreactor.",
  },
];

// "Building a path to space" roadmap cards (RoadmapCards). Text from the team's
// "Wiki modifications" doc; `photo` is a file in
// static.igem.wiki/.../content/human-integrated-practices/.
export const roadmapSteps = [
  {
    title: "Ground validation",
    subtitle: "Build and characterize the chassis",
    photo: "lab.avif",
    points: [
      "Engineer and characterize microbial chassis.",
      "Validate therapeutic expression and purification.",
      "Assess protein identity, activity and stability.",
      "Evaluate biocontainment strategies.",
      "Develop and optimize bioreactor and monitoring systems.",
    ],
  },
  {
    title: "Space-relevant validation",
    subtitle: "Ensure robustness in space conditions",
    photo: "validation.avif",
    points: [
      "Test resistance to radiation and oxidative stress.",
      "Evaluate microbial performance using microgravity analogs.",
      "Conduct experiments in planetary simulation chambers.",
      "Assess long-term culture stability and productivity.",
      "Explore parabolic flight testing.",
    ],
  },
  {
    title: "Integrated system validation",
    subtitle: "Demonstrate end-to-end production and quality control",
    photo: "bioreactor.avif",
    points: [
      "Identify therapeutic needs and establish validated production protocols.",
      "Integrate microbial growth, induction, production, and purification.",
      "Validate automated monitoring, process control, and human oversight.",
      "Assess containment, system failures, and operational safety.",
      "Verify therapeutic identity, purity, potency, and safety through appropriate quality-control testing.",
      "Evaluate reproducibility, power consumption, maintenance, and operator training.",
    ],
  },
  {
    title: "Pre-flight qualification",
    subtitle: "Validate safety, reliability and regulatory compliance",
    photo: "people.avif",
    points: [
      "Finalize flight-compatible hardware and containment systems.",
      "Conduct payload hazard and safety assessments.",
      "Verify launch and spacecraft compatibility.",
      "Establish operating, maintenance, and emergency procedures.",
      "Address pharmaceutical quality requirements and applicable regulatory approvals.",
      "Coordinate qualification with relevant spaceflight authorities and partners.",
    ],
  },
  {
    title: "LEO demonstration",
    subtitle: "Test autonomous operation in space",
    photo: "leo.avif",
    points: [
      "Demonstrate small-scale biomanufacturing in Low Earth Orbit (LEO).",
      "Monitor microbial growth, stability, and productivity.",
      "Evaluate production under microgravity and space radiation.",
      "Assess the identity, quality, and function of space-produced proteins.",
      "Compare space-produced and Earth-produced products.",
      "Evaluate autonomous operation and required crew intervention.",
    ],
  },
  {
    title: "Space missions",
    subtitle: "Enable sustained biomanufacturing",
    photo: "system.avif",
    points: [
      "Validate extended autonomous operation and system reliability.",
      "Demonstrate consistent production of selected therapeutics.",
      "Increase resource independence and recycling.",
      "Adapt the platform to mission-specific constraints.",
      "Assess long-term chassis stability and containment.",
      "Address planetary protection and mission-specific regulatory requirements.",
    ],
  },
];

// "From values to design" flip cards (Anticipating our impact). Same values and
// tones as `values` above; text from the team's "Wiki modifications" doc.
export const designValues = [
  {
    name: "Autonomy",
    tone: "violet",
    subtitle: "Reducing external dependence",
    heard:
      "Spaceflight experts emphasized minimizing astronaut intervention, while humanitarian perspectives highlighted the importance of operating without continuous technical support.",
    influence:
      "We prioritized bioreactor automation, real-time monitoring, and considerations for simplified maintenance.",
  },
  {
    name: "Adaptability",
    tone: "blue",
    subtitle: "Responding to different needs",
    heard:
      "Scientific experts stressed the importance of balancing microbial resilience with engineering feasibility, while humanitarian specialists helped us identify the different requirements of potential deployment environments.",
    influence:
      "We selected engineerable microbial chassis and considered modularity and flexibility across biological components and applications.",
  },
  {
    name: "Responsibility",
    tone: "amber",
    subtitle: "Designing with safety in mind",
    heard:
      "Stakeholders raised concerns about biological containment, monitoring, product quality, and regulatory requirements.",
    influence:
      "We incorporated layered biosafety considerations, risk assessment, and progressive validation into our development strategy.",
  },
  {
    name: "Accessibility",
    tone: "green",
    subtitle: "Making biotechnology usable and understandable",
    heard:
      "Humanitarian experts pointed to local infrastructure and maintenance limitations, while our community engagement revealed the importance of accessible scientific communication.",
    influence:
      "We considered usability and maintainability in future applications and created opportunities for communities to learn about and discuss synthetic biology.",
  },
];
