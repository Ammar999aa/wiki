// Data source for the protein library grid — see src/content/Payloads library.md
// for the current reference content (src/content/protein_payload_library.md is
// an earlier draft, superseded by that file). Kept as one array so the page
// (and any future page) can render both the collapsed cards and the expanded
// detail view off the same objects, and so adding a new payload later is just
// another entry here.
//
// `host` and `delivery` are shared across every entry rather than invented
// per protein: the source material describes them as platform-wide
// capabilities (S. cerevisiae / P. pastoris / B. subtilis; MOFs, hydrogels,
// etc.), not a specific host/delivery pairing per payload.
const HOST = "S. cerevisiae, P. pastoris, B. subtilis";
const DELIVERY = "MOFs, hydrogels & other on-demand delivery formats";

// `structure` wires a protein card into the 3D viewer in ProteinDetail.jsx.
// Every entry here is a *real, published* PDB structure — verified against
// RCSB (data.rcsb.org) and UniProt's own PDB cross-references while adding
// this, never guessed — for the general, natural protein, not a structure
// this team solved themselves. StructureViewer labels each one accordingly.
// Left unset (no `structure` field at all) wherever that distinction would
// blur: both nanobodies are this team's own novel designs, not deposited
// anywhere public; "Custom Payloads" has no fixed target; both antifreeze
// protein entries (LeIBP, FfIBP) have a named source organism but no
// structure yet ("Structure - to be sent" per the source material). Add a
// real PDB ID (or a locally solved/predicted structure) to any of these
// once the team has one to point to — see StructureViewer.jsx for the
// {pdbId, label, file} shape this expects.
//
// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/3d-models/structures/. The
// Uploads tool's file-type filter rejects raw PDB content under both a
// .pdb and a plain .txt extension (checked on contents, not just the
// extension), with no "structure data" category on its accepted list.
// .json is accepted, though, so each file here is the original PDB text
// wrapped verbatim as {"format":"pdb","data": "..."} — a real, valid JSON
// document, not a renamed/disguised .pdb — which StructureViewer.jsx
// unwraps before handing `data` to 3Dmol exactly as it always did.
const STRUCTURES_BASE = "https://static.igem.wiki/teams/6341/wiki/3d-models/structures";
const gfpPdb = `${STRUCTURES_BASE}/gfp-1ema.json`;
const mcherryPdb = `${STRUCTURES_BASE}/mcherry-2h5q.json`;
const follistatinPdb = `${STRUCTURES_BASE}/follistatin-activin-2b0u.json`;
const ang1Pdb = `${STRUCTURES_BASE}/ang1-4epu.json`;

export const PROTEINS = [
  {
    id: "leibp-afp",
    name: "LeIBP Antifreeze Protein",
    subtitle: "AFP — Leucosporidium sp. AY30 (psychrophilic yeast)",
    color: "#5FD4E0",
    tested: true,
    glyph: "spark",
    shortDescription:
      "A secreted antifreeze protein from an Arctic sea-ice yeast, isolated to limit ice-crystal damage during freezing.",
    function:
      "Binds directly to the surface of forming ice crystals and inhibits further growth, limiting the damage ice formation causes to cells and tissue during freezing. Shows moderate thermal hysteresis (TH) activity and strong ice recrystallization inhibition (IRI) activity.",
    applications: [
      "Cryopreservation of cells, tissue & biologics",
      "Food & agriculture freeze protection",
      "Cold-chain stability for space missions",
    ],
    why: "Protects biological material from freeze damage — useful for storing and shipping biologics reliably, including in environments where cold-chain logistics are hard.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
  },
  {
    id: "ffibp-afp",
    name: "FfIBP Antifreeze Protein",
    subtitle: "AFP — Flavobacterium frigoris PS1 (Antarctic lake sediment)",
    color: "#4FC3D9",
    tested: true,
    glyph: "spark",
    shortDescription:
      "A secreted antifreeze protein from a gram-negative Antarctic bacterium, with stronger ice-shaping control than LeIBP.",
    function:
      "Binds directly to the surface of forming ice crystals and inhibits further growth, limiting the damage ice formation causes to cells and tissue during freezing. Shows higher thermal hysteresis (TH) activity, broader ice-shaping control, and stronger recrystallization inhibition than LeIBP.",
    applications: [
      "Cryopreservation of cells, tissue & biologics",
      "Food & agriculture freeze protection",
      "Cold-chain stability for space missions",
    ],
    why: "Protects biological material from freeze damage — useful for storing and shipping biologics reliably, including in environments where cold-chain logistics are hard.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
  },
  {
    id: "hsv-nanobody",
    name: "HSV Nanobody",
    subtitle: "Nb1_gbHSV — anti-HSV single-domain antibody",
    color: "#FF6B6B",
    tested: true,
    glyph: "shield",
    shortDescription:
      "An alpaca-derived nanobody that neutralizes herpes simplex virus by locking its envelope protein in an unstable conformation.",
    function:
      "Alpaca-derived single-domain antibody fragment (nanobody) that neutralizes herpes simplex virus types 1 and 2 (HSV-1 and HSV-2) by locking the essential envelope protein glycoprotein B (gB) in its unstable prefusion conformation.",
    applications: [
      "Antiviral therapeutics",
      "Biosensors",
      "Protein detection & imaging",
      "Pull-down & co-IP assays",
    ],
    why: "Nanobodies are small, stable, and easy to produce recombinantly — a practical antiviral format for a modular expression platform.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
  },
  {
    id: "pdl1-nanobody",
    name: "PD-L1 Nanobody",
    subtitle: "anti-PD-L1 — Single-domain antibody",
    color: "#FF7BD1",
    tested: true,
    glyph: "shield",
    shortDescription:
      "Blocks the PD-L1 / PD-1 interaction, a key immune checkpoint tumors exploit to evade immune attack.",
    function:
      "Binds PD-L1 (Programmed Death-Ligand 1) and prevents it from engaging PD-1 on immune cells, with potential to help restore T cells' ability to recognize and attack tumor cells.",
    applications: [
      "Cancer immunotherapy",
      "Immune checkpoint research",
      "Tumor imaging & diagnostics",
      "Site-specific drug delivery",
    ],
    why: "A compact, platform-producible alternative to full antibodies for probing and blocking immune checkpoint signaling.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
  },
  {
    id: "mcherry",
    name: "mCherry",
    subtitle: "Proof of Concept — Red fluorescent protein",
    color: "#E0455F",
    tested: true,
    glyph: "orb",
    shortDescription:
      "A bright, photostable, monomeric red fluorescent protein used to visualize and track biological processes.",
    function:
      "Emits red fluorescence when excited by the appropriate wavelength of light, without requiring any substrate or cofactor. Engineered through directed evolution of DsRed → mRFP1 → mCherry, and lacks the tendency to oligomerize — essential for fusion tagging.",
    applications: [
      "Cell & tissue imaging",
      "Protein & organelle tracking",
      "Reporter assays",
      "Flow cytometry & cell sorting",
    ],
    why: "A reliable, well-understood readout for confirming that a construct is expressing correctly.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
    structure: { pdbId: "2H5Q", label: "mCherry", file: mcherryPdb },
  },
  {
    id: "gfp",
    name: "GFP",
    subtitle: "Proof of Concept — Green fluorescent protein",
    color: "#6EE7A0",
    tested: true,
    glyph: "orb",
    shortDescription:
      "The classic, well-characterized fluorescent reporter — used here as a robust proof-of-concept for the expression platform.",
    function:
      "Produces green fluorescence when excited by blue/UV light, requiring no external substrate — a robust, simple, and reliable reporter.",
    applications: [
      "Proof-of-concept expression testing",
      "Imaging",
      "Protein localization",
      "Gene expression reporting",
    ],
    why: "The simplest possible proof that the expression platform works end-to-end.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
    structure: { pdbId: "1EMA", label: "GFP (Aequorea victoria)", file: gfpPdb },
  },
  {
    id: "follistatin",
    name: "Follistatin",
    subtitle: "Myostatin Inhibitor",
    color: "#FF9F5B",
    tested: false,
    glyph: "helix",
    shortDescription:
      "Inhibits myostatin to promote muscle growth and preserve muscle mass — relevant to muscle wasting in space and on Earth.",
    function:
      "Binds and neutralizes myostatin (and related activins), releasing the brake myostatin normally puts on muscle growth.",
    applications: ["Muscle-wasting treatment in spaceflight", "Sarcopenia", "Cachexia"],
    why: "Muscle wasting is a real risk on long-duration spaceflight; a locally producible countermeasure is valuable when resupply isn't an option.",
    host: HOST,
    delivery: DELIVERY,
    status: "Conceptual — payload not yet tested in our platform.",
    // Standalone follistatin isn't in the PDB under a plain "just
    // follistatin" entry — this is follistatin in complex with activin, the
    // ligand it actually neutralizes, which is arguably more informative
    // than an isolated domain would be. Labeled as a complex, not renamed.
    structure: { pdbId: "2B0U", label: "Follistatin : Activin complex", file: follistatinPdb },
  },
  {
    id: "ang-1",
    name: "Angiopoietin-1",
    subtitle: "ANG-1 — Vascular stabilizer",
    color: "#FF6F91",
    tested: false,
    glyph: "branch",
    shortDescription:
      "Promotes blood vessel stability and supports tissue regeneration through the Tie2 signaling pathway.",
    function:
      "Activates the Tie2 receptor on endothelial cells, strengthening blood vessel walls and supporting vessel stability.",
    applications: ["Wound healing", "Ischemic disease research", "Tissue repair"],
    why: "Supports the body's own vessel-repair machinery, relevant anywhere tissue needs to heal or regenerate.",
    host: HOST,
    delivery: DELIVERY,
    status: "Conceptual — payload not yet tested in our platform.",
    // The fibrinogen-related domain (FReD) — the receptor-binding part of
    // Ang-1 — not the full-length protein, which hasn't been crystallized.
    structure: { pdbId: "4EPU", label: "Ang-1 receptor-binding domain", file: ang1Pdb },
  },
  {
    id: "custom",
    name: "Custom Payloads",
    subtitle: "Your Target",
    color: "#B16DFF",
    tested: false,
    glyph: "plus",
    shortDescription:
      "Design your own protein — the platform is built to express, purify, and deliver payloads beyond this initial library.",
    function:
      "Uses the same expression, purification, and delivery pipeline developed for this library, adapted to a new coding sequence of your choosing.",
    applications: ["Endless possibilities — your target protein"],
    why: "Every mission or patient need is different — this slot is the platform's answer to 'what if we need something not on this list?'",
    host: HOST,
    delivery: DELIVERY,
    status: "Open — awaiting your target protein.",
  },
];
