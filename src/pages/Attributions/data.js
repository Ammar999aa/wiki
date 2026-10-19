// Transcribed from the team's final iGEM Attribution Form
// (outputs/Final Attribution Form.md). Kept as plain data so the page file
// stays about structure; wording is the form's own.

// [name, institution type, relationship, tasks, specific tasks]
export const sponsors = [
  ["National Transformation Institute (NTI)", "Academic", "Sponsor", "Fundraising", "Financial support"],
  ["Biological and Environmental Sciences and Engineering (BESE) division", "Academic", "Sponsor", "Fundraising", "Financial support"],
  ["Biomedical Science division", "Academic", "Sponsor", "Fundraising", "Financial support"],
  ["Lab Equipment Management (LEM)", "Academic", "Sponsor", "Fundraising", "Laboratory equipment and material support"],
  ["Prof. Sami Al-Ghamdi, Urban Labs", "Academic", "Sponsor / External Advisor", "Fundraising", "Sponsored the Thuwal Science Pioneers Program including student transport, connected us with Campus & Community Outreach and other stakeholders, and guided our outreach events"],
  ["Burger King", "Industry", "Sponsor", "Fundraising", "Food vouchers for Public Engagement activities"],
  ["Baskin-Robbins", "Industry", "Sponsor", "Fundraising", "Food vouchers for Public Engagement activities"],
];

export const collaborators = [
  ["KFUPM iGEM", "Academic", "Collaborator", "Public Engagement", "Collaboration in Space Academy and the TAWASOL Summit and Showcase"],
  ["NYUAD iGEM", "Academic", "Collaborator", "Public Engagement", "Collaboration in TAWASOL Hackathon and TAWASOL Summit and Showcase"],
  ["AFCM iGEM", "Academic", "Collaborator", "Public Engagement", "Collaboration in the TAWASOL Summit and Showcase"],
  ["Al Nahrain iGEM", "Academic", "Collaborator", "Public Engagement", "Presented at the Mentorship Program Lecture Series & Collaboration in the TAWASOL Summit and Showcase"],
  ["NIS-Medeu iGEM", "Academic", "Collaborator", "Public Engagement", "Collaborated on BioAccelerator program for high school students, iGEM Forum, and Mentorship activities"],
  ["Dr. Venu Kas, KAUST Academy", "Academic", "Advisor", "Public Engagement", "Connected us with Hackathon participants from KAUST Academy and provided resources for the closing ceremony"],
  ["Dr. Obaid Younossi, Policy Institute", "Academic", "Advisor", "Public Engagement", "Mentored us on modeling policy scenarios for the Hackathon"],
];

export const supporters = [
  ["Stefan T. Arold", "Academic", "Supporter", "Wet Lab, Other", "Generously provided various reagents and AKTA purification system access; Facilitated iGEM Lab space acquisition through administrative negotiations; Supported us throughout the KAUST IBEC/HSE approval processes"],
  ["Manuel Aranda", "Academic", "Supporter", "Wet Lab", "Generously provided UV irradiation machine"],
  ["Yasmin Khalifa", "Academic", "Other", "Wet Lab", "Placed all reagents orders for us, placed orders for hardware materials and parts, managed deliveries, helped us manage our finances, helped us to prepare for HSE safety inspections, practically acted as our lab manager"],
  ["Huma Khurram", "Academic", "Other", "Wet Lab", "Lab manager of Prof. Arold’s lab, supported us in terms of acquiring consumables and reagents needed during experiments"],
  ["Zolzaya Togookhuu", "Academic", "Other", "Wet Lab", "Lab manager of Prof. Gadhoum’s lab, supported us in terms of acquiring equipment, consumables, and reagents to establish our lab"],
  ["Prof. Robert Hoehndorf", "Academic", "", "Dry Lab", "Provided data from the Empty Quarter to generate the gene-mining pipeline"],
  ["HSE (Health, Safety and Environment)", "Academic", "", "Wet Lab", "Provided valuable guidance in safety, future steps for SHIHAB implementation, and executed regular lab inspections."],
];

export const aiTools = [
  {
    name: "Claude Code (Claude Opus 5, Claude Sonnet)",
    tasks: "Wiki Coding, Visualization, Software, Background Research, Writing",
    specific: [
      "Modeling: code debugging; Drylab: feedback on direction.",
      "Wiki: coding and debugging React components and styles; converting static figure images into interactive HTML/SVG charts; accessibility, mobile layout and performance fixes; formatting plain text content into wiki components (no new claims or data); writing internal codebase documentation; checking pages against iGEM wiki requirements. All output was reviewed and tested by the wiki lead before committing.",
    ],
  },
  {
    name: "ChatGPT-6.1 Sol Light",
    tasks: "Visualization, Writing",
    specific: ["Generation and improvement of resolution in images for wiki pages, reviewing and editing grammar of documents and wiki pages."],
  },
];
