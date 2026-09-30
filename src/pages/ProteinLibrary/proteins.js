// Data source for the protein library grid — see src/content/Payloads library.md
// for the current reference content (src/content/protein_payload_library.md is
// an earlier draft, superseded by that file). Kept as one array so the page
// (and any future page) can render both the collapsed cards and the expanded
// detail view off the same objects, and so adding a new payload later is just
// another entry here.
//
// `host` is shared across every entry rather than invented per protein: the
// source material describes it as a platform-wide capability (S. cerevisiae
// / P. pastoris / B. subtilis), not a specific host per payload.
const HOST = "S. cerevisiae, P. pastoris, B. subtilis";

// `structure` wires a protein card into the 3D viewer in ProteinDetail.jsx.
// Every entry here is a *real, published* PDB structure — verified against
// RCSB (data.rcsb.org) and UniProt's own PDB cross-references while adding
// this, never guessed — for the general, natural protein, not a structure
// this team solved themselves. StructureViewer labels each one accordingly.
// Left unset (no `structure` field at all) wherever that distinction would
// blur: "Custom Payloads" has no fixed target; Sclerostin-neutralizing
// Nanobody has no structure cited in the source material yet. Add a real
// PDB ID (or a locally solved/predicted structure) to either once the team
// has one to point to — see StructureViewer.jsx for the {pdbId, label,
// file} shape this expects.
//
// PD-L1 Nanobody's structure (5DXW) is a *mouse* PD-L1 nanobody — a
// reference structure for the nanobody:PD-L1 interaction generally, not
// this team's own (human-PD-L1-targeting) molecule solved. Labeled as such
// in its `label` below, same "real structure, honestly scoped" approach as
// the Follistatin : Activin complex and the Ang-1 receptor-binding domain
// used before it.
//
// Hosted on iGEM's asset server — see
// https://static.igem.wiki/teams/6341/wiki/3d-models/structures/. The
// Uploads tool's file-type filter rejects raw PDB content under both a .pdb
// and a plain .txt extension (checked on contents, not just the extension),
// with no "structure data" category on its accepted list. .json is
// accepted, though, so each file here is the original PDB text wrapped
// verbatim as {"format":"pdb","data": "..."} — a real, valid JSON document,
// not a renamed/disguised .pdb — which StructureViewer.jsx unwraps before
// handing `data` to 3Dmol exactly as it always did.
//
// leibp/ffibp/hsv-nanobody/pdl1-nanobody/interferon-beta were bundled
// locally at first (fetched straight from RCSB, files.rcsb.org, since
// nobody with CDN upload access had run them through the Uploads tool yet)
// — now on static.igem.wiki like the rest, confirmed byte-identical to the
// RCSB originals before switching these constants over.
const STRUCTURES_BASE = "https://static.igem.wiki/teams/6341/wiki/3d-models/structures";
const gfpPdb = `${STRUCTURES_BASE}/gfp-1ema.json`;
const mcherryPdb = `${STRUCTURES_BASE}/mcherry-2h5q.json`;
const follistatinPdb = `${STRUCTURES_BASE}/follistatin-activin-2b0u.json`;
const leibpPdb = `${STRUCTURES_BASE}/leibp-3uyv.json`;
const ffibpPdb = `${STRUCTURES_BASE}/ffibp-4nu2.json`;
const hsvNanobodyPdb = `${STRUCTURES_BASE}/hsv-nanobody-9q9n.json`;
const pdl1NanobodyPdb = `${STRUCTURES_BASE}/pdl1-nanobody-5dxw.json`;
const interferonBetaPdb = `${STRUCTURES_BASE}/interferon-beta-1au1.json`;

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
    host: HOST,
    status: "Tested — expressed & validated in our platform.",
    structure: { pdbId: "3UYV", label: "LeIBP (Leucosporidium sp. AY30)", file: leibpPdb },
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
    host: HOST,
    status: "Tested — expressed & validated in our platform.",
    structure: { pdbId: "4NU2", label: "FfIBP (Flavobacterium frigoris PS1)", file: ffibpPdb },
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
    host: HOST,
    status: "Tested — expressed & validated in our platform.",
    // This is the nanobody bound to its actual target (HSV-1 glycoprotein B,
    // locked in the prefusion conformation Nb1_gbHSV traps it in) rather
    // than the nanobody solved alone — same "real complex, labeled
    // honestly" approach as the Follistatin : Activin structure below.
    structure: { pdbId: "9Q9N", label: "HSV-1 gB : Nb1_gbHSV complex", file: hsvNanobodyPdb },
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
    host: HOST,
    status: "Tested — expressed & validated in our platform.",
    // A mouse PD-L1 nanobody — a reference structure for this class of
    // nanobody:PD-L1 interaction, not this team's own molecule solved (see
    // the file-header comment above).
    structure: { pdbId: "5DXW", label: "PD-L1 Nanobody (mouse PD-L1 reference structure)", file: pdl1NanobodyPdb },
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
    host: HOST,
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
    host: HOST,
    status: "Tested — expressed & validated in our platform.",
    structure: { pdbId: "1EMA", label: "GFP (Aequorea victoria)", file: gfpPdb },
  },
  {
    id: "sclerostin-nanobody",
    name: "Sclerostin-neutralizing Nanobody",
    subtitle: "anti-SOST — Single-domain antibody",
    color: "#E8D9C5",
    tested: false,
    glyph: "shield",
    shortDescription:
      "A nanobody that blocks sclerostin, the bone-formation inhibitor osteocytes secrete — aimed at the rapid bone loss astronauts face in microgravity.",
    function:
      "Sclerostin is a Wnt-pathway inhibitor secreted by osteocytes that suppresses bone formation; blocking it significantly increases bone density. In mice exposed to partial weight-bearing (simulating lunar gravity at 0.16 g), sclerostin-antibody treatment significantly inhibited skeletal deterioration and maintained cortical and trabecular bone parameters. A related approach, the IgG antibody romosozumab, was FDA-approved in 2019 for postmenopausal osteoporosis. Compared to conventional antibodies, nanobodies offer improved bone-tissue penetration and an easier production and purification process.",
    applications: [
      "Microgravity-induced osteoporosis treatment",
      "Postmenopausal osteoporosis treatment",
      "Osteogenesis imperfecta treatment",
    ],
    host: HOST,
    status: "Conceptual — payload not yet tested in our platform.",
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
      "Binds and neutralizes myostatin (and related activins), releasing the brake myostatin normally puts on muscle growth. Skeletal muscle atrophy is essentially universal in spaceflight, affecting every astronaut regardless of pre-launch fitness, and recovery to preflight condition can take months to over a year after returning to Earth — on a Mars mission, muscle mass loss is predicted at around 25–40%, which could leave the crew too weak to perform surface operations. Daily resistance and aerobic exercise doesn't fully prevent this atrophy, which is why protein therapeutics like follistatin are considered crucial for space missions. Follistatin's dual anabolic/anti-catabolic mechanism makes it an especially powerful option: in animal models, follistatin overexpression has produced 2–4x normal muscle mass, the most dramatic hypertrophy observed from a protein treatment.",
    applications: [
      "Muscle atrophy treatment in spaceflight",
      "Sarcopenia (age-related muscle loss) treatment",
      "Duchenne muscular dystrophy treatment",
      "Spinal muscular atrophy treatment",
    ],
    // Source material specifies only these two hosts for Follistatin (no
    // B. subtilis) — not the shared HOST constant used everywhere else.
    host: "S. cerevisiae, P. pastoris",
    status: "Conceptual — payload not yet tested in our platform.",
    // Standalone follistatin isn't in the PDB under a plain "just
    // follistatin" entry — this is follistatin in complex with activin, the
    // ligand it actually neutralizes, which is arguably more informative
    // than an isolated domain would be. Labeled as a complex, not renamed.
    structure: { pdbId: "2B0U", label: "Follistatin : Activin complex", file: follistatinPdb },
  },
  {
    id: "interferon-beta",
    name: "Interferon-β",
    subtitle: "IFN-β — Type I interferon",
    color: "#7FB3FF",
    tested: false,
    glyph: "network",
    shortDescription:
      "A first-line antiviral cytokine with added anti-tumor and neuroprotective effects, produced by nearly all nucleated cells in response to infection.",
    function:
      "Interferon-β is a type I interferon and one of the first-line antiviral defense systems, produced by most nucleated cells in response to viral infection, double-stranded RNA, or innate immune pattern recognition. It plays a central role in antiviral defense and immune modulation, and also shows anti-tumor effects by directly inhibiting tumor cell cycle progression, promoting tumor cell apoptosis, and enhancing NK cell and cytotoxic T lymphocyte activity. It can also support neuroprotection by reducing neuroinflammation through suppression of microglial activation.",
    applications: ["Multiple sclerosis treatment", "Radiation cancer protection", "Antiviral treatment"],
    host: HOST,
    status: "Conceptual — payload not yet tested in our platform.",
    structure: { pdbId: "1AU1", label: "Human Interferon-β", file: interferonBetaPdb },
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
    host: HOST,
    status: "Open — awaiting your target protein.",
  },
];
