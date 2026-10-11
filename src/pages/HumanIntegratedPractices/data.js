// Copy for the page's custom components (QuestionMap, OrbitTimeline, JigsawTable, ValuesCards, GlanceGrid).

// `icon` is the same round step icon the stakeholder cards use (static.igem.wiki/.../images/<icon>.avif).
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
    title: "Exploring the Unknown",
    target: "Exploring The Unknown",
    photo: "meetingall",
    body: "We started by asking our community about the challenges of living in space and investigating where biotechnology could make a meaningful contribution.",
  },
  {
    title: "Finding Our Direction",
    target: "Finding Our Direction",
    photo: "sarah-meeting",
    body: "We moved from the idea of resilient microorganisms to SHIHAB: a platform combining microbial resilience with on-demand therapeutic production.",
  },
  {
    title: "Listening to Astronauts & Space Medicine",
    target: "Listening to Astronauts & Space Medicine Experts",
    photo: "rayannah-meet",
    body: "Astronauts and healthcare experts helped us understand therapeutic needs, crew constraints, automation, product quality, and the importance of space-relevant validation.",
  },
  {
    title: "Engineering Microorganisms for Space",
    target: "Engineering Microorganisms for Space",
    photo: "luis-meeting",
    body: "Scientific experts informed our selection of B. subtilis and S. cerevisiae, resilience strategy, stress testing, and evaluation of molecular damage.",
  },
  {
    title: "From Concept to Implementation",
    target: "From Concept to Implementation",
    photo: "hardware",
    body: "We explored automation, monitoring, mission integration, biosafety, regulation, and progressive validation to understand what would be required to move SHIHAB beyond a laboratory proof of concept.",
  },
  {
    title: "Looking Back at Earth",
    target: "Looking Back at Earth",
    photo: "andrew-meeting",
    body: "Humanitarian perspectives helped us explore how SHIHAB's principles could translate to remote or disrupted settings while highlighting the importance of context, infrastructure, maintainability, and local needs.",
  },
  {
    title: "Engaging Society",
    target: "Engaging Society",
    photo: "pe-activity",
    body: "Our interactions with the public reinforced the importance of making synthetic biology and space biotechnology understandable and creating opportunities for people to question and discuss emerging technologies.",
  },
  {
    title: "Anticipating Our Impact",
    target: "Anticipating Our Impact",
    photo: "impact",
    body: "We considered SHIHAB's potential benefits alongside its risks, dependencies, limitations, and unresolved questions to identify what responsible future development would require.",
  },
  {
    title: "Closing the ORBIT",
    target: "Closing the ORBIT",
    photo: "closing",
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
  { id: "drylab", label: "Dry Lab & gene mining", path: "/dry-lab-overview" },
  { id: "roadmap", label: "Long-term roadmap", path: "/proposed-implementation" },
  { id: "safety", label: "Safety handbook", path: "/safety" },
  { id: "hardware", label: "Hardware", path: "/hardware" },
  { id: "modeling", label: "Modeling & dashboard", path: "/modeling" },
];

// `tone` matches the ValuesCards tones (see `data-tone` in the stylesheet).
export const shapedGroups = [
  { id: "astronauts", label: "Astronauts & medicine", tone: "violet" },
  { id: "microbes", label: "Microbiology", tone: "blue" },
  { id: "mission", label: "Mission & safety", tone: "green" },
  { id: "earth", label: "Humanitarian", tone: "amber" },
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
    parts: ["experiments", "drylab"],
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
    photos: [{ file: "incognito.svg" }],
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
];
