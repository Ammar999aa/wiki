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
