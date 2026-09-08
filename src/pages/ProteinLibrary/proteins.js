// Data source for the protein library grid — see src/content/protein_payload_library.md
// for the original reference content. Kept as one array so the page (and any
// future page) can render both the collapsed cards and the expanded detail
// view off the same objects, and so adding a new payload later is just
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
// anywhere public; "Custom Payloads" has no fixed target; the antifreeze
// protein entry doesn't specify which AFP type/isoform, and picking one
// would misrepresent it as more specific than the actual content is. Add a
// real PDB ID (or a locally solved/predicted structure) to any of these
// once the team has one to point to — see StructureViewer.jsx for the
// {pdbId, label, file} shape this expects.
//
// Bundled locally rather than hosted on static.igem.wiki — per the iGEM
// wiki rules, static assets are technically supposed to go through the
// Uploads tool instead of being committed as source, and that was tried
// first here. The Uploads tool's file-type filter rejects this content
// under both a .pdb and a plain .txt extension, with no accepted type left
// to try it as, so this falls back to the same local-asset convention
// every other image on this site already uses (see DESIGN.md's own note
// on that same gap). Revisit if the team finds a type the tool will take.
import gfpPdb from "../../assets/structures/gfp-1ema.pdb?url";
import mcherryPdb from "../../assets/structures/mcherry-2h5q.pdb?url";
import il10Pdb from "../../assets/structures/il10-2h24.pdb?url";
import follistatinPdb from "../../assets/structures/follistatin-activin-2b0u.pdb?url";
import ang1Pdb from "../../assets/structures/ang1-4epu.pdb?url";
import insulinPdb from "../../assets/structures/insulin-4fka.pdb?url";

export const PROTEINS = [
  {
    id: "afp",
    name: "Antifreeze Proteins",
    subtitle: "AFPs — Ice-binding protein",
    color: "#5FD4E0",
    tested: true,
    glyph: "spark",
    shortDescription:
      "Prevent ice crystal growth and enhance freeze tolerance — built for cryopreservation, food, agriculture, and space applications.",
    function:
      "Bind directly to the surface of forming ice crystals and inhibit further growth (the 'adsorption–inhibition' mechanism), limiting the damage ice formation causes to cells and tissue during freezing.",
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
    subtitle: "anti-HSV — Single-domain antibody",
    color: "#FF6B6B",
    tested: true,
    glyph: "shield",
    shortDescription:
      "Binds HSV antigens and neutralizes viral entry — a compact antiviral therapeutic candidate.",
    function:
      "A single-domain antibody fragment (nanobody) that binds Herpes Simplex Virus surface antigens, blocking the virus's ability to enter and infect host cells.",
    applications: ["Antiviral therapeutics", "Diagnostic & research reagents"],
    why: "Nanobodies are small, stable, and easy to produce recombinantly — a practical antiviral format for a modular expression platform.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
  },
  {
    id: "pdl1-nanobody",
    name: "PD-L1 Nanobody",
    subtitle: "anti-PD-L1 — Immune checkpoint blocker",
    color: "#FF7BD1",
    tested: true,
    glyph: "shield",
    shortDescription:
      "Blocks the PD-L1 / PD-1 interaction, a key immune checkpoint tumors exploit to evade immune attack.",
    function:
      "Binds PD-L1 and prevents it from engaging PD-1 on immune cells, with potential to help restore the immune system's ability to recognize and attack tumor cells.",
    applications: ["Cancer immunotherapy", "Immune checkpoint research"],
    why: "A compact, platform-producible alternative to full antibodies for probing and blocking immune checkpoint signaling.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
  },
  {
    id: "mcherry",
    name: "mCherry",
    subtitle: "Fluorescent Protein — Monomeric red",
    color: "#E0455F",
    tested: true,
    glyph: "orb",
    shortDescription:
      "A bright, photostable, monomeric red fluorescent protein used to visualize and track biological processes.",
    function:
      "Emits red fluorescence when excited by the appropriate wavelength of light, without requiring any substrate or cofactor.",
    applications: ["Live-cell & tissue imaging", "Protein / organelle tracking", "Reporter assays"],
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
      "Produces green fluorescence when excited by blue/UV light, requiring no external substrate — a simple, reliable readout of gene expression.",
    applications: ["Proof-of-concept expression testing", "Imaging", "Expression control / calibration"],
    why: "The simplest possible proof that the expression platform works end-to-end.",
    host: HOST,
    delivery: DELIVERY,
    status: "Tested — expressed & validated in our platform.",
    structure: { pdbId: "1EMA", label: "GFP (Aequorea victoria)", file: gfpPdb },
  },
  {
    id: "il-10",
    name: "Interleukin-10",
    subtitle: "IL-10 — Anti-inflammatory cytokine",
    color: "#7FB3FF",
    tested: false,
    glyph: "network",
    shortDescription:
      "An anti-inflammatory cytokine that modulates immune response, with relevance to autoimmune and inflammatory conditions.",
    function:
      "Suppresses pro-inflammatory signaling and dampens excessive immune activation, helping regulate the scale of an immune response.",
    applications: ["Autoimmune disease research", "Inflammation modulation"],
    why: "A natural 'brake' on inflammation — useful wherever an overactive immune response is the problem.",
    host: HOST,
    delivery: DELIVERY,
    status: "Conceptual — payload not yet tested in our platform.",
    structure: { pdbId: "2H24", label: "Human IL-10", file: il10Pdb },
  },
  {
    id: "insulin",
    name: "Insulin",
    subtitle: "Preproinsulin — Metabolic hormone",
    color: "#FFD84D",
    tested: false,
    glyph: "hex",
    shortDescription:
      "The precursor form of the hormone that regulates blood glucose levels — a foundational therapeutic protein for metabolic disease.",
    function:
      "Once processed into its mature form, insulin signals cells to take up glucose from the bloodstream, regulating blood sugar levels.",
    applications: ["Diabetes treatment", "Metabolic disorder research"],
    why: "One of the most widely needed therapeutic proteins in the world — a benchmark for on-demand biologic production.",
    host: HOST,
    delivery: DELIVERY,
    status: "Conceptual — payload not yet tested in our platform.",
    structure: { pdbId: "4FKA", label: "Human insulin", file: insulinPdb },
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
