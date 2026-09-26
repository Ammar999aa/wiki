// Copy for the page's custom components (QuestionMap, OrbitTimeline, JigsawTable).

export const orbitSteps = [
  {
    letter: "O",
    title: "Observe the Challenge",
    body: "Understand the healthcare, biological, and logistical challenges of space exploration.",
  },
  {
    letter: "R",
    title: "Reach Stakeholders",
    body: "Engage astronauts, researchers, space medicine specialists, industry, regulatory experts and communities.",
  },
  {
    letter: "B",
    title: "Build with Insights",
    body: "Translate stakeholder knowledge into concrete decisions for SHIHAB.",
  },
  {
    letter: "I",
    title: "Iterate Responsibly",
    body: "Reassess assumptions, limitations, risks and design choices as new perspectives emerge.",
  },
  {
    letter: "T",
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
