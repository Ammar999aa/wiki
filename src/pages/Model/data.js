// Data behind the Model / screening-pipeline page. Ported verbatim from the
// reference implementation handed off in src/content/model-page.html — see
// src/content/README-FOR-WIKI.md for the porting notes. Every number here is
// sourced from that document; don't round, retype, or "clean up" any of it —
// ask before changing a number or a hedged sentence (same rule the handoff
// doc states).

// Categorical hues drawn from the site's own palette (.claude/DESIGN.md) —
// violet is --primary-600 (#9A58E6) itself; blue and rose are cyan/magenta
// steps of the same family the nebula background gradient uses
// (src/assets/gradient.svg: #090927/#724A92); gold sits next to --accent
// without reusing it, since amber is reserved sitewide as the one warm
// "highlight" color (this page's own "hi" stat cells and flag pills), not
// a plain series color. First tried the reference palette's stock 8 hues
// (blue/yellow/magenta/green) — technically cleaner but read as generic
// dataviz colors dropped onto the page rather than colors that belong to
// it, hence this brand-anchored set instead.
//
// Validated with the dataviz skill's validator against this page's dark
// surface (#0A0A27), all-pairs mode (the scatter/strip charts show all
// four categories at once): every hard gate clears. The one WARN — violet
// vs. blue, CVD ΔE 8.0 (deutan), right at the legal floor — is why every
// chart here also carries secondary encoding (legend, tooltip, and text
// labels always name the category; color is never the only signal).
export const CATS = [
  { key: "Cold", name: "Cold Stress", color: "#0C8FBD", n: 8, st: "8 / 8", gtdb: 6,
    fams: "csp, ibpAB", rank: "Robust (P = 0.998)", rc: "good" },
  { key: "DNA", name: "UV/radiation resistance", color: "#B8791F", n: 21, st: "21 / 21", gtdb: 13,
    fams: "recA, uvrA/B/C, mutS, phrB", rank: "Robust rank", rc: "warn" },
  { key: "Anaerobic", name: "Anaerobic Respiration", chip: "Anaerobic", color: "#D4547E", n: 8, st: "8 / 8", gtdb: 8,
    fams: "nitrate red., fumarate red.", rank: "Fragile (P = 0.593)", rc: "warn" },
  { key: "Desiccation", name: "Desiccation Resistance", chip: "Desiccation", color: "#9A58E6", n: 8, st: "8 / 8", gtdb: 6,
    fams: "ectoine, trehalose", rank: "Degenerate; no ranking", rc: "critical" },
];
export const CIDX = Object.fromEntries(CATS.map((c, i) => [c.key, i]));
export const catOf = (key) => CATS[CIDX[key]];

// [locus, gene, phylum, organism, mwKda, pI, instability, caPlddt,
//  conservationPct, score, orfPct, category, flag]
export const F = {
  loc: 0, gene: 1, phy: 2, org: 3, mw: 4, pi: 5, inst: 6, plddt: 7,
  cons: 8, score: 9, orf: 10, cat: 11, flag: 12,
};

export const CANDIDATES = [
  ["FCEEAA_04582", "cspC", "Bacillota", "Paenibacillus_B aquistagni", 7.2, 4.72, 5.99, 90.6, 36.6, 0.94, 94, "Cold", ""],
  ["KJFHJC_02548", "cspC", "Bacillota_A", "Lacrimispora amygdalina_A", 7.1, 4.75, 1.52, 89.7, 36.6, 0.94, 93, "Cold", ""],
  ["KJFHJC_04270", "cspC", "Bacillota_A", "Lacrimispora amygdalina_A", 7.3, 4.84, 6.31, 90.0, 36.6, 0.94, 96, "Cold", ""],
  ["EJIGFF_03899", "cspC", "Pseudomonadota", "Cupriavidus pauculus", 7.3, 9.10, -1.82, 90.3, 36.6, 0.94, 96, "Cold", ""],
  ["FMCNHN_02954", "ibpA", "—", "unclassified", 7.3, 9.30, 36.88, 71.5, 56.9, 0.72, 47, "Cold", "47% ORF"],
  ["JIGFNP_0059", "ibpA", "—", "unclassified", 9.6, 5.65, 24.21, 72.3, 56.9, 0.715, 63, "Cold", "63% ORF"],
  ["FEFCII_02476", "ibpA", "Actinomycetota", "Rhodococcus equi", 16.6, 4.85, 30.47, 66.9, 56.9, 0.605, 111, "Cold", ""],
  ["EELILG_00140", "ibpA", "Bacteroidota", "Petrimonas sp002356435", 16.3, 4.91, 35.35, 62.6, 56.9, 0.605, 104, "Cold", ""],

  ["OGEHGG_01321", "recA", "Bacteroidota", "Acetobacteroides sp.", 18.9, 9.38, 24.20, 85.2, 33.9, 0.85, 49, "DNA", "49% ORF · pseudo · bin 33.7%"],
  ["IMPCGL_00194", "recA", "Bacillota_A", "Acetoanaerobium noterae", 20.4, 9.40, 23.48, 87.0, 33.9, 0.85, 51, "DNA", "51% ORF · bin 48.6%"],
  ["MDGCGF_05015", "mutS", "—", "unclassified", 26.4, 4.65, 21.74, 86.1, 16.5, 0.81, 28, "DNA", "28% ORF"],
  ["IGKDHG_03969", "uvrC", "—", "unclassified", 31.1, 9.22, 24.94, 90.7, 26.2, 0.75, 44, "DNA", "44% ORF · domain OK"],
  ["AGLHGJ_02831", "mutS", "Bacillota_A", "Clostridium sp.", 12.2, 6.29, 18.30, 80.7, 16.5, 0.72, 12, "DNA", "12% ORF"],
  ["MDGCGF_04237", "uvrC", "—", "unclassified", 28.1, 9.05, 35.81, 93.5, 26.2, 0.71, 39, "DNA", "39% ORF · domain OK"],
  ["HNJJAK_02069", "mutS", "Pseudomonadota", "Ochrobactrum sp006345815", 24.1, 5.47, 20.79, 86.8, 16.5, 0.705, 25, "DNA", "25% ORF"],
  ["OJFILE_011385", "uvrC", "Pseudomonadota", "Escherichia coli", 22.2, 7.63, 21.83, 92.3, 26.2, 0.705, 31, "DNA", "31% ORF"],
  ["MKOHDO_00868", "recA", "—", "unclassified", 17.2, 9.36, 14.83, 64.7, 33.9, 0.675, 44, "DNA", "44% ORF"],
  ["PBDMHO_02264", "mutS", "Pseudomonadota", "Stappia indica_A", 38.8, 4.98, 34.43, 88.0, 16.5, 0.65, 42, "DNA", "42% ORF"],
  ["IGKDHG_03054", "uvrB", "—", "unclassified", 52.8, 4.99, 37.48, 84.6, 29.9, 0.65, 68, "DNA", "68% ORF"],
  ["OPINBK_05041", "uvrA", "Pseudomonadota", "Pannonibacter sp.", 29.4, 5.50, 38.95, 91.2, 32.9, 0.645, 29, "DNA", "29% ORF"],
  ["DDPLBO_00005", "uvrA", "—", "unclassified", 22.2, 6.16, 32.49, 89.2, 32.9, 0.645, 21, "DNA", "21% ORF"],
  ["IJEMCG_01450", "recA", "Bacillota", "Bacillus paralicheniformis", 12.8, 4.67, 39.65, 60.5, 33.9, 0.62, 32, "DNA", "32% ORF · 89 carrier genomes"],
  ["MJNEPN_02265", "phrB", "—", "unclassified", 49.9, 4.97, 33.41, 90.8, 19.7, 0.62, 93, "DNA", ""],
  ["DCCOJF_0708", "uvrB", "—", "unclassified", 6.0, 5.23, 18.79, 50.9, 29.9, 0.575, 7, "DNA", "7% ORF"],
  ["JMLLCE_01790", "uvrB", "Bacillota_A", "Eubacterium_O aggregans", 33.5, 4.90, 38.60, 78.8, 29.9, 0.575, 44, "DNA", "44% ORF"],
  ["DDPONI_03681", "uvrC", "Bacillota", "Bacillus_A pacificus", 15.1, 7.81, 22.35, 65.8, 32.2, 0.54, 21, "DNA", "21% ORF · domain OK"],
  ["JONGHJ_02396", "phrB", "Pseudomonadota", "Pannonibacter sp.", 54.3, 6.40, 37.01, 91.8, 19.7, 0.515, 103, "DNA", ""],
  ["IKAEFD_01270", "phrB", "Pseudomonadota", "Providencia rettgeri_D", 55.1, 7.30, 39.64, 88.8, 19.7, 0.515, 102, "DNA", ""],
  ["LHCKBH_03134", "phrB", "Pseudomonadota", "Pannonibacter sp.", 54.3, 6.60, 35.08, 91.4, 19.7, 0.515, 103, "DNA", ""],

  ["KDPOLD_03231", "narI", "Pseudomonadota", "Marinobacter sp029264995", 25.4, 9.94, 22.04, 90.1, 21.5, 0.81, 100, "Anaerobic", "Not weight-robust"],
  ["OMLBPC_00431", "frdC", "Pseudomonadota", "Morganella morganii", 14.8, 9.67, 37.21, 87.7, 43.0, 0.795, 101, "Anaerobic", ""],
  ["IKAEFD_00287", "frdC", "Pseudomonadota", "Providencia rettgeri_D", 14.9, 9.87, 25.65, 87.6, 43.0, 0.795, 102, "Anaerobic", ""],
  ["PALKJD_01611", "frdD", "Bacillota", "Bacillus_A paranthracis", 13.1, 9.04, 38.59, 82.2, 43.0, 0.795, 102, "Anaerobic", ""],
  ["PALKJD_01612", "frdC", "Bacillota", "Bacillus_A paranthracis", 14.8, 9.94, 37.46, 88.7, 43.0, 0.795, 102, "Anaerobic", ""],
  ["OMLBPC_00264", "narI", "Pseudomonadota", "Morganella morganii", 25.3, 9.82, 34.41, 88.9, 21.5, 0.71, 100, "Anaerobic", ""],
  ["IKAEFD_00507", "narI", "Pseudomonadota", "Providencia rettgeri_D", 25.7, 9.84, 33.42, 88.9, 21.5, 0.71, 100, "Anaerobic", ""],
  ["IKAEFD_00508", "narJ", "Pseudomonadota", "Providencia rettgeri_D", 27.5, 4.58, 35.82, 85.3, 21.5, 0.71, 102, "Anaerobic", ""],

  ["HJGENA_00690", "otsB", "Actinomycetota", "Microbacterium sp001866135", 28.7, 4.64, 37.94, 96.3, 40.8, 0.75, 100, "Desiccation", "Rank degenerate"],
  ["DOEECF_00197", "otsB", "Pseudomonadota", "Ochrobactrum sp006345815", 28.1, 4.88, 34.86, 94.9, 40.8, 0.75, 98, "Desiccation", "Rank degenerate"],
  ["PIHCGA_01600", "otsB", "Actinomycetota", "Microbacterium sp001426925", 28.1, 4.56, 38.58, 92.0, 40.8, 0.75, 100, "Desiccation", "Rank degenerate"],
  ["LEIIJB_03335", "otsB", "Actinomycetota", "Arthrobacter sp.", 29.4, 4.81, 33.96, 96.0, 40.8, 0.75, 105, "Desiccation", "Rank degenerate"],
  ["FEFCII_02160", "ectA", "Actinomycetota", "Rhodococcus equi", 19.5, 4.89, 32.89, 83.2, 38.2, 0.75, 90, "Desiccation", "Rank degenerate"],
  ["DJKOGP_04264", "ectA", "Actinomycetota", "Rhodococcus equi", 19.5, 4.80, 33.37, 84.5, 38.2, 0.75, 90, "Desiccation", "Rank degenerate"],
  ["IKLJFA_02022", "ectA", "—", "unclassified", 21.4, 4.79, 35.12, 93.5, 38.2, 0.75, 99, "Desiccation", "Rank degenerate"],
  ["GMIJIG_03406", "ectA", "—", "unclassified", 19.5, 4.89, 35.30, 83.8, 38.2, 0.75, 90, "Desiccation", "Rank degenerate"],
];

// Loci that fail Gate 2 (GRAVY > 0): the integral-membrane subunits found in
// §07 Test 5.
export const MEMBRANE = [
  "KDPOLD_03231", "OMLBPC_00431", "IKAEFD_00287", "PALKJD_01611",
  "PALKJD_01612", "OMLBPC_00264", "IKAEFD_00507",
];

export function gateStatus(row) {
  if (row[F.orf] < 90) return { label: "Gate 1", tone: "critical", reason: "ORF < 90%" };
  if (MEMBRANE.indexOf(row[F.loc]) !== -1) return { label: "Gate 2", tone: "critical", reason: "membrane" };
  return { label: "Synthesis-ready", tone: "good", reason: "" };
}

export const FUNNEL = [
  { n: 1221, lab: "Desert metagenomes", meth: "1,036 enrichment + 185 isolate", unit: "samples" },
  { n: 20962, lab: "Tier-1 stress-gene calls", meth: "Bakta + eggNOG functional validation", unit: "ORFs" },
  { n: 79, lab: "Structures predicted", meth: "CD-HIT 90% → MAFFT → ESMFold v1 on Ibex", unit: "folds" },
  { n: 53, lab: "Ranked candidates (v2)", meth: "6-dimension composite score", unit: "candidates" },
  { n: 45, lab: "After rigor review", meth: "12-part audit, 8 removed", unit: "candidates", hi: true },
];

export const LOCKED_RULE_STEPS = [
  { n: 45, lab: "Annotated candidate set", meth: "published with QC flags, nothing hidden", unit: "candidates" },
  { n: 26, lab: "Gate 1 · ORF completeness ≥ 90%", meth: "removes contig-break fragments", unit: "pass", gate: true },
  { n: 19, lab: "Gate 2 · GRAVY ≤ 0", meth: "removes integral membrane subunits", unit: "pass", gate: true },
  { n: 19, lab: "Six-dimension weighted score", meth: "weights unchanged — ranks within the gated set", unit: "ranked", hi: true },
];

export const DIMENSIONS = [
  { dim: "Stability", weight: "25%", instrument: "BioPython instability index", step: "<10 → 1.0 · <25 → 0.7 · <40 → 0.3", why: "Predicts whether the protein survives expression at all" },
  { dim: "Structure", weight: "25%", instrument: "ESMFold CA-pLDDT", step: ">80 → 1.0 · >70 → 0.7 · >50 → 0.3", why: "Calibrated against three solved structures (Table 3)" },
  { dim: "Size", weight: "15%", instrument: "BioPython molecular weight", step: "<15 kDa → 1.0 · <30 kDa → 0.7", why: "Small proteins express and purify more cheaply" },
  { dim: "Purifiability", weight: "15%", instrument: "BioPython isoelectric point", step: "pI < 5 or > 9 → 1.0", why: "Enables tag-free ion-exchange capture" },
  { dim: "Conservation", weight: "10%", instrument: "CD-HIT → MAFFT → Shannon entropy", step: ">50% → 1.0 · >30% → 0.7 · >15% → 0.3", why: "Family-level; raw column entropy, NOT the depth-matched value (see §04)" },
  { dim: "Annotation", weight: "10%", instrument: "eggNOG COG / KEGG", step: "KEGG → 1.0 · COG → 0.7", why: "Independent confirmation of gene identity" },
];

export const SOFTWARE = [
  { stage: "Annotation", tool: "Bakta", version: "not recorded", desc: "Gene calling and gene name assignment across all 1,221 assemblies", refs: ["1"] },
  { stage: "Annotation", tool: "eggNOG-mapper", version: "2.1.12", desc: "Independent orthology assignment, COG/KEGG/EC terms, used to cross-check Bakta", refs: ["2", "3"] },
  { stage: "Redundancy", tool: "CD-HIT", version: "not recorded", desc: "Collapses each gene family to representatives at 90% identity", refs: ["4"] },
  { stage: "Alignment", tool: "MAFFT", version: "v7", desc: "Multiple sequence alignment of the representatives", refs: ["5"] },
  { stage: "Properties", tool: "Biopython ProtParam", version: "not recorded", desc: "MW, pI, instability index, GRAVY, aliphatic index", refs: ["6"] },
  { stage: "Structure", tool: "ESMFold", version: "v1", desc: "MSA-free structure prediction; CA-pLDDT read from the output B-factors", refs: ["7", "8", "9"] },
  { stage: "Taxonomy", tool: "GTDB-Tk", version: "not recorded", desc: "Assigns source-organism lineage to the bins candidates came from", refs: ["10", "16"] },
  { stage: "Bin quality", tool: "CheckM", version: "v1", desc: "Marker-gene completeness and contamination for each source bin", refs: ["11", "12"] },
  { stage: "Domains", tool: "InterProScan", version: "5.61", desc: "Catalytic-domain confirmation where a gene-name call was contested", refs: ["13"] },
];

export const AUDIT_REGISTER = [
  { id: "A", audit: "Evidence-strength audit", outcome: "DUF3494 excluded; 2 uvrA identity conflicts found; ORF completeness column added" },
  { id: "B", audit: "Weight-sensitivity analysis", outcome: "Desiccation ranking shown degenerate; Anaerobic top pick shown fragile" },
  { id: "C", audit: "ESMFold benchmark on CspA", outcome: "CA RMSD 1.13 Å vs PDB 1MJC; two conflicting pLDDT methods reconciled" },
  { id: "D", audit: "Catalytic motif screen", outcome: "4 uvrC candidates flagged — later overturned by task J" },
  { id: "E", audit: "Strain provenance", outcome: "92% MAG-derived, 21% single-genome evidence; disclosed" },
  { id: "F", audit: "Limitations section", outcome: "Consolidated; back-filled with both rounds' results" },
  { id: "G", audit: "Conservation null model", outcome: "ibpAB superlative retracted; csp confirmed most conserved" },
  { id: "H", audit: "EC / PFAM re-audit", outcome: "46 emapper files recovered; uvrB/mfd conflict found and excluded" },
  { id: "I", audit: "GTDB taxonomy extension", outcome: "Coverage 49% → 61.3%; two data bugs fixed; long-read gap identified" },
  { id: "J", audit: "uvrC InterProScan check", outcome: "3 of 4 round-one flags were regex false negatives — candidates restored" },
  { id: "K", audit: "ESMFold benchmark extension", outcome: "recA and otsB added; pLDDT > 80 band confirmed across three folds" },
  { id: "L", audit: "Pseudogene & CheckM audit", outcome: "28% carry pseudo flags; DNA-repair top pick found in a 33.7%-complete bin" },
];

export const CHECKLIST = [
  { check: "ORF completeness", asks: "Is the gene a complete gene, or a contig-break fragment wearing a family name?", caught: "24 of 28 DNA-repair candidates truncated; 4 mutL at 7–18% removed", cost: "Low" },
  { check: "Two-annotator identity check", asks: "Do two independent annotation methods agree on what this gene is?", caught: "4 candidates excluded on Bakta/eggNOG ortholog conflict", cost: "Low" },
  { check: "Weight sensitivity", asks: "Does the ranking survive perturbing the weights you chose by hand?", caught: "One category shown fully degenerate; another flips under 4 of 36 perturbations", cost: "Medium" },
  { check: "Depth-matched conservation", asks: "Are you comparing conservation across alignments of different depth?", caught: "Retracted the project's ibpAB superlative; csp is the real answer", cost: "Medium" },
  { check: "Source-bin quality", asks: "How complete is the MAG the gene was called in?", caught: "Top pick found in a 33.7%-complete bin, below the MIMAG floor", cost: "Low" },
  { check: "Hydrophobicity gate", asks: "Can your score tell an integral membrane protein from a soluble one?", caught: "7 of 8 in one category are membrane subunits, scored 0.71–0.81", cost: "Low" },
];

export const TIER1 = [
  { loc: "KJFHJC_04270", gene: "cspC", score: 0.940, mw: 7.3, pi: 4.84, inst: 6.31, plddt: 90.0 },
  { loc: "KJFHJC_02548", gene: "cspC", score: 0.940, mw: 7.1, pi: 4.75, inst: 1.52, plddt: 89.7 },
  { loc: "FCEEAA_04582", gene: "cspC", score: 0.940, mw: 7.2, pi: 4.72, inst: 5.99, plddt: 90.6 },
  { loc: "EJIGFF_03899", gene: "cspC", score: 0.940, mw: 7.3, pi: 9.10, inst: -1.82, plddt: 90.3 },
  { loc: "HJGENA_00690", gene: "otsB", score: 0.750, mw: 28.7, pi: 4.64, inst: 37.94, plddt: 96.3 },
  { loc: "LEIIJB_03335", gene: "otsB", score: 0.750, mw: 29.4, pi: 4.81, inst: 33.96, plddt: 96.0 },
  { loc: "DOEECF_00197", gene: "otsB", score: 0.750, mw: 28.1, pi: 4.88, inst: 34.86, plddt: 94.9 },
  { loc: "PIHCGA_01600", gene: "otsB", score: 0.750, mw: 28.1, pi: 4.56, inst: 38.58, plddt: 92.0 },
  { loc: "IKLJFA_02022", gene: "ectA", score: 0.750, mw: 21.4, pi: 4.79, inst: 35.12, plddt: 93.5 },
  { loc: "DJKOGP_04264", gene: "ectA", score: 0.750, mw: 19.5, pi: 4.80, inst: 33.37, plddt: 84.5 },
  { loc: "GMIJIG_03406", gene: "ectA", score: 0.750, mw: 19.5, pi: 4.89, inst: 35.30, plddt: 83.8 },
  { loc: "FEFCII_02160", gene: "ectA", score: 0.750, mw: 19.5, pi: 4.89, inst: 32.89, plddt: 83.2 },
  { loc: "IKAEFD_00508", gene: "narJ", score: 0.710, mw: 27.5, pi: 4.58, inst: 35.82, plddt: 85.3 },
  { loc: "MJNEPN_02265", gene: "phrB", score: 0.620, mw: 49.9, pi: 4.97, inst: 33.41, plddt: 90.8 },
  { loc: "FEFCII_02476", gene: "ibpA", score: 0.605, mw: 16.6, pi: 4.85, inst: 30.47, plddt: 66.9 },
  { loc: "EELILG_00140", gene: "ibpA", score: 0.605, mw: 16.3, pi: 4.91, inst: 35.35, plddt: 62.6 },
  { loc: "LHCKBH_03134", gene: "phrB", score: 0.515, mw: 54.3, pi: 6.60, inst: 35.08, plddt: 91.4 },
  { loc: "JONGHJ_02396", gene: "phrB", score: 0.515, mw: 54.3, pi: 6.40, inst: 37.01, plddt: 91.8 },
  { loc: "IKAEFD_01270", gene: "phrB", score: 0.515, mw: 55.1, pi: 7.30, inst: 39.64, plddt: 88.8 },
];

export const CONSERVATION_BARS = [
  { fam: "csp", raw: 36.6, adj: 85.9, n: 226, rank: "rank 1 / 19" },
  { fam: "ibpAB", raw: 56.9, adj: 65.9, n: 64, rank: "rank 4 / 19" },
  { fam: "relBE", raw: 14.5, adj: 32.0, n: 48, rank: "rank 19 / 19" },
];

export const SENSITIVITY_BARS = [
  { cat: "Cold Stress", pick: "cspC · FCEEAA_04582", p: 0.998, tone: "good", note: "Weight-robust; 0 of 36 perturbations flip it" },
  { cat: "DNA Repair / UV", pick: "recA · OGEHGG_01321", p: 0.977, tone: "warn", note: "Rank robust, but the candidate itself is unusable (§07)" },
  { cat: "Anaerobic Respiration", pick: "narI · KDPOLD_03231", p: 0.593, tone: "warn", note: "Fragile; flips in 4 of 36, wins by 0.015" },
  { cat: "Desiccation", pick: "otsB · HJGENA_00690", p: 1.000, tone: "critical", note: "Degenerate; all 8 scores identical, order is file order" },
];

export const REFERENCES = [
  { g: "Software", a: "Schwengers O, Jelonek L, Dieckmann MA, Beyvers S, Blom J, Goesmann A", t: "Bakta: rapid and standardized annotation of bacterial genomes via alignment-free sequence identification", j: "Microbial Genomics 7(11):000685", y: 2021, d: "10.1099/mgen.0.000685" },
  { a: "Cantalapiedra CP, Hernández-Plaza A, Letunic I, Bork P, Huerta-Cepas J", t: "eggNOG-mapper v2: functional annotation, orthology assignments, and domain prediction at the metagenomic scale", j: "Molecular Biology and Evolution 38(12):5825–5829", y: 2021, d: "10.1093/molbev/msab293" },
  { a: "Huerta-Cepas J, Szklarczyk D, Heller D, et al.", t: "eggNOG 5.0: a hierarchical, functionally and phylogenetically annotated orthology resource based on 5090 organisms and 2502 viruses", j: "Nucleic Acids Research 47(D1):D309–D314", y: 2019, d: "10.1093/nar/gky1085" },
  { a: "Fu L, Niu B, Zhu Z, Wu S, Li W", t: "CD-HIT: accelerated for clustering the next-generation sequencing data", j: "Bioinformatics 28(23):3150–3152", y: 2012, d: "10.1093/bioinformatics/bts565" },
  { a: "Katoh K, Standley DM", t: "MAFFT multiple sequence alignment software version 7: improvements in performance and usability", j: "Molecular Biology and Evolution 30(4):772–780", y: 2013, d: "10.1093/molbev/mst010" },
  { a: "Cock PJA, Antao T, Chang JT, et al.", t: "Biopython: freely available Python tools for computational molecular biology and bioinformatics", j: "Bioinformatics 25(11):1422–1423", y: 2009, d: "10.1093/bioinformatics/btp163" },
  { a: "Lin Z, Akin H, Rao R, et al.", t: "Evolutionary-scale prediction of atomic-level protein structure with a language model", j: "Science 379(6637):1123–1130", y: 2023, d: "10.1126/science.ade2574" },
  { a: "Jumper J, Evans R, Pritzel A, et al.", t: "Highly accurate protein structure prediction with AlphaFold", j: "Nature 596(7873):583–589", y: 2021, d: "10.1038/s41586-021-03819-2" },
  { a: "Mariani V, Biasini M, Barbato A, Schwede T", t: "lDDT: a local superposition-free score for comparing protein structures and models using distance difference tests", j: "Bioinformatics 29(21):2722–2728", y: 2013, d: "10.1093/bioinformatics/btt473" },
  { a: "Chaumeil P-A, Mussig AJ, Hugenholtz P, Parks DH", t: "GTDB-Tk v2: memory friendly classification with the genome taxonomy database", j: "Bioinformatics 38(23):5315–5316", y: 2022, d: "10.1093/bioinformatics/btac672" },
  { a: "Parks DH, Imelfort M, Skennerton CT, Hugenholtz P, Tyson GW", t: "CheckM: assessing the quality of microbial genomes recovered from isolates, single cells, and metagenomes", j: "Genome Research 25(7):1043–1055", y: 2015, d: "10.1101/gr.186072.114" },
  { a: "Jones P, Binns D, Chang H-Y, et al.", t: "InterProScan 5: genome-scale protein function classification", j: "Bioinformatics 30(9):1236–1240", y: 2014, d: "10.1093/bioinformatics/btu031" },
  { g: "Standards", a: "Bowers RM, Kyrpides NC, Stepanauskas R, et al. (Genome Standards Consortium)", t: "Minimum information about a single amplified genome (MISAG) and a metagenome-assembled genome (MIMAG) of bacteria and archaea", j: "Nature Biotechnology 35(8):725–731", y: 2017, d: "10.1038/nbt.3893" },
  { g: "Methods and metrics", a: "Guruprasad K, Reddy BVB, Pandit MW", t: "Correlation between stability of a protein and its dipeptide composition: a novel approach for predicting in vivo stability of a protein from its primary sequence", j: "Protein Engineering 4(2):155–161", y: 1990, d: "10.1093/protein/4.2.155" },
  { a: "Shannon CE", t: "A mathematical theory of communication", j: "Bell System Technical Journal 27(3):379–423", y: 1948, d: "10.1002/j.1538-7305.1948.tb01338.x" },
  { g: "Databases", a: "Parks DH, Chuvochina M, Rinke C, Mussig AJ, Chaumeil P-A, Hugenholtz P", t: "GTDB: an ongoing census of bacterial and archaeal diversity through a phylogenetically consistent, rank normalized and complete genome-based taxonomy", j: "Nucleic Acids Research 50(D1):D785–D794", y: 2022, d: "10.1093/nar/gkab776" },
  { g: "Calibration structures", a: "Schindelin H, Jiang W, Inouye M, Heinemann U", t: "Crystal structure of CspA, the major cold shock protein of Escherichia coli", j: "PNAS 91(11):5119–5123 · PDB 1MJC, 2.0 Å", y: 1994, d: "10.1073/pnas.91.11.5119" },
  { a: "Xing X, Bell CE", t: "Crystal structures of Escherichia coli RecA in a compressed helical filament", j: "Journal of Molecular Biology 342(5):1471–1485 · PDB 1U94, 1.9 Å", y: 2004, d: "10.1016/j.jmb.2004.07.091" },
  { a: "Harvey CM, O'Toole KH, Liu C, Mariano P, Dunaway-Mariano D, Allen KN", t: "Structural analysis of binding determinants of Salmonella typhimurium trehalose-6-phosphate phosphatase using ground-state complexes", j: "Biochemistry 59(35):3247–3257 · PDB 6UPC, 2.51 Å", y: 2020, d: "10.1021/acs.biochem.0c00317" },
  { g: "Validation data", a: "Niwa T, Ying B-W, Saito K, Jin W, Takada S, Ueda T, Taguchi H", t: "Bimodal protein solubility distribution revealed by an aggregation analysis of the entire ensemble of Escherichia coli proteins", j: "PNAS 106(11):4201–4206 · the eSOL dataset", y: 2009, d: "10.1073/pnas.0811922106" },
];

export const STATUS_COLOR = {
  good: "var(--doc-good)",
  warn: "var(--doc-warn)",
  critical: "var(--doc-critical)",
  neutral: "var(--doc-muted)",
};
