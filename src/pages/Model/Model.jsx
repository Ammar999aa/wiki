import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import styles from "./Model.module.scss";
import { Callout, Card, CardGrid, Caption, ChartPanel, Eq, Legend, Pill, TableWrap } from "./components/Ui";
import Funnel from "./components/Funnel";
import ScatterChart from "./components/ScatterChart";
import { ConservationBars } from "./components/BarRows";
import Explorer from "./components/Explorer";
import References, { Cref } from "./components/References";
import {
  CategoryTable,
  DimensionTable,
  SoftwareTable,
} from "./components/Tables";
import { CATS, LOCKED_RULE_STEPS } from "./data";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Dry Lab → Modeling (/modeling, see src/pages.js). Ports the reference
// implementation handed off in src/content/model-page.html — see
// src/content/README-FOR-WIKI.md for the porting notes this follows, and
// ./data.js for where every number here comes from. Reskinned onto the
// site's own dark violet design system per .claude/DESIGN.md rather than
// keeping the reference page's separate light theme; content, hedging and
// retracted claims are carried over unchanged. Built on SectionedArticle for
// the shared scroll/jump-nav shell (the reference page's own <nav
// class="rail"> is dropped in favour of it, per the porting notes) with each
// section's rich content (charts, tables, the candidate explorer) passed
// through the `content` prop Article.jsx grew for this page.
const catLegend = CATS.map((c) => ({ label: c.name, color: c.color }));

// Masthead — sits between the <h1> and the first section's own heading
// (rendered via SectionedArticle's `intro` slot), matching where the
// reference implementation's <header class="mast"> sat relative to its
// first numbered section.
const pageIntro = (
  <>
    {/* First two tokens are the nav trail ("Dry Lab" dropdown → "Software") the reader actually
        clicked — the h1 below is a stylized headline that never says
        either word, so the eyebrow is what confirms the nav label. See
        the UI/UX audit finding on titles not confirming the nav label. */}
    <p className={styles.eyebrow}>
      <span>Dry Lab</span>
      <span className={styles.dot} />
      <span>Software</span>
      <span className={styles.dot} />
      <span>Screening pipeline &amp; audit</span>
      <span className={styles.dot} />
      <span>Rub&nbsp;al&nbsp;Khali</span>
      <span className={styles.dot} />
      <span>v2.1 · rigor-reviewed</span>
    </p>
    <p className={styles.deck}>
      For this part of the project, we search, screen, analyse and filter the genomic data obtain from <b>Rub' al Khali</b> or the Empty Quarter the world's largest continuous sand desert. This location has been marked as Mars analog, so we wanted to find if the bacteria that evolved for surviving such harsh conditions would also have improve genes that we can use for our chassis. Our focus was on genes with functionality on radiation resistance and desiccation.
    </p>
    <p className={styles.deck}>
      We focused on building a five-layer <b>screening pipeline</b> that reads a database with their genomes and returns a ranked candidate list for the wetlab team to try it.
    </p>
    <p className={styles.deck}>
      The data were provided by the Bio-Ontology Research Group (BORG). The complete pipeline is not described on this page, as it is part of an ongoing PhD research project at King Abdullah University of Science and Technology (KAUST).
    </p>
    <div className={styles.statGrid}>
      <div className={styles.statCell}>
        <span className={styles.v}>1,221</span>
        <span className={styles.k}>Metagenomes</span>
      </div>
      <div className={`${styles.statCell} ${styles.hi}`}>
        <span className={styles.v}>45</span>
        <span className={styles.k}>Final candidates</span>
      </div>
      <div className={`${styles.statCell} ${styles.hi}`}>
        <span className={styles.v}>19</span>
        <span className={styles.k}>Synthesis-ready</span>
      </div>
    </div>
  </>
);

const sections = [
  {
    title: "Overview of the Pipeline",
    id: "s1",
    content: (
      <>
        <div className={styles.col}>
          <Callout tone="yellow" label="Design question">
            <p>
              Using only the sequence data from different bacteria in the specific environment, How can we find
              which proteins are worth testing in the lab for improve functionality on radiation resistance and
              desiccation?
            </p>
          </Callout>
        </div>

        <CardGrid>
          <Card tag="Step 1 · Identity" title="Annotation">
            Bakta gene calls cross-checked against independent eggNOG orthology.
          </Card>
          <Card tag="Step 2 · Behaviour" title="Physicochemistry">
            obtaining Instability index, molecular weight, isoelectric point, GRAVY and aliphatic index
          </Card>
          <Card tag="Step 3 · History" title="Conservation">
            Shannon entropy over depth-matched alignments.
          </Card>
          <Card tag="Step 4 · Form" title="Structure">
            ESMFold CA-pLDDT, calibrated against three solved crystal structures spanning three distinct fold
            families.
          </Card>
          <Card tag="Step 5 · Origin" title="Source quality">
            GTDB-Tk taxonomy plus CheckM completeness of the bin the gene came from.
          </Card>
        </CardGrid>
      </>
    ),
  },

  {
    title: "Describing the Pipeline",
    id: "s2",
    content: (
      <>
        <div className={styles.col}>
          <h3>What survives, by functional category</h3>
          <p>
            At the begging of the project we selected some stress protection proteins as possible candidates to
            be produced in the lab. We used these specific proteins as samples to what we wanted to find from
            the genomic database.
          </p>
        </div>

        <CategoryTable />
        <Caption n="Table 1">
          &quot;Ranking status&quot; records what the weight-sensitivity analysis says.
        </Caption>

        <div className={styles.col}>
          <h3>Tools used</h3>
          <p>
            The table below lists what each stage runs, and every tool is cited in the bibliography.
          </p>
        </div>

        <SoftwareTable />
        <Caption n="Table 2">
          Databases carry their own citations separately from the tools that query them, so eggNOG-mapper and
          the eggNOG orthology resource are listed as two references rather than one.
        </Caption>
      </>
    ),
  },

  {
    title: "Physicochemical step",
    id: "s3",
    content: (
      <>
        <div className={styles.col}>
          <p>
            Every sequence goes through the <code>ProtParam</code> module of Biopython [<Cref n="6" />]. Four of
            its outputs feed the composite score.
          </p>
          <h4>How the instability index is computed</h4>
          <p>
            Guruprasad, Reddy and Pandit [<Cref n="14" />] observed that certain dipeptides occur at measurably
            different frequencies in proteins with short <i>in vivo</i> half-lives than in stable ones. They
            assigned each of the 400 possible dipeptides a weight from that frequency difference. The index
            slides a two residue window along the sequence, sums the weights, and normalises by length:
          </p>
          <Eq
            tex={String.raw`\mathrm{II} = \frac{10}{L}\sum_{i=1} W_{\mathrm{DIPEP}}(x_i x_{i+1})`}
            note={
              <>
                L = sequence length &middot; W<sub>DIPEP</sub> = Guruprasad dipeptide instability weight
              </>
            }
          />
        </div>

        <ChartPanel
          title="Stability against fold confidence — all 45 candidates"
          sub="Marker area ∝ molecular weight. Hover any point for the full record. The dashed guides mark the two decision thresholds the score uses: instability < 40 and CA-pLDDT > 80."
          legend={<Legend items={catLegend} />}
        >
          <ScatterChart />
        </ChartPanel>
        <Caption n="Figure 1">
          The upper-left quadrant is the target zone: stable and confidently folded. Cold-shock <i>csp</i>{" "}
          candidates cluster there at the extreme, one of them at a negative instability index (&minus;1.8),
          which is outside the range the Guruprasad scale was calibrated on and should be read as &ldquo;very
          stable&rdquo;, not as a physical quantity.
        </Caption>
      </>
    ),
  },

  {
    title: "Conservation Step",
    id: "s4",
    content: (
      <>
        <div className={styles.col}>
          <p>
            This part has 3 steps. First, CD-HIT [<Cref n="4" />] collapses the family down to representatives
            at 90% identity. Its greedy incremental algorithm sorts sequences longest-first, makes the longest a
            cluster seed, and assigns each subsequent sequence to the first seed it matches above threshold,
            using short-word counting to skip most alignments outright. This step removes 73&ndash;89% of the
            sequences in our families.
          </p>
          <p>
            Second, MAFFT [<Cref n="5" />] aligns the representatives. Third, we take each alignment column{" "}
            <code>c</code>, read off the frequency <code>
              p<sub>a,c</sub>
            </code>{" "}
            of each amino acid <code>a</code> in it, and compute Shannon entropy [<Cref n="15" />]. We call a column conserved when its entropy falls below &tau; = 0.5 bits, and
            report the family statistic as the fraction of columns that qualify.
          </p>
          <Eq
            tex={String.raw`H(c) = -\sum_{a \in A} p_{a,c} \log_2 p_{a,c} \qquad \mathrm{Cons} = \frac{\left|\{\, c : H(c) < \tau \,\}\right|}{C}`}
            note="A = 20 amino acids · C = alignment columns · τ = entropy threshold"
          />
        </div>

        <ChartPanel
          title="Conservation before and after depth matching"
          sub="Percent of alignment columns below the entropy threshold. Enrichment dataset, all 19 families subsampled to N = 18 sequences; the isolate dataset at N = 20 reproduces the same ordering."
          legend={
            <Legend
              items={[
                { label: "Raw (depth confounded)", color: "var(--doc-faint)" },
                { label: "Depth matched", color: "#0C8FBD" },
              ]}
            />
          }
        >
          <ConservationBars />
        </ChartPanel>
        <Caption n="Figure 2">
          <i>csp</i>&rsquo;s raw number was the most depressed of any family precisely because its alignment is
          the deepest we have (226 sequences); depth matching moves it from mid pack to first and drops{" "}
          <i>ibpAB</i> to fourth of nineteen. <i>ibpAB</i> is still a genuinely conserved family and still holds
          the best predicted fold in the dataset at CA-pLDDT 98.6.
        </Caption>
      </>
    ),
  },

  {
    title: "Structure layer",
    id: "s5",
    content: (
      <>
        <div className={styles.col}>
          <p>
            pLDDT is the model&rsquo;s predicted score on the lDDT-C&alpha; metric [<Cref n="9" />], which
            compares local interatomic distances between a model and a reference without superposing them. The
            network emits it per residue, on a 0 to 100 scale, and both AlphaFold and ESMFold write it into
            the B factor column of the output PDB.
          </p>
          <h4>Calibration against solved structures</h4>
          <p>
            A confidence metric is only useful once you know what it predicts, and pLDDT bands published for
            AlphaFold do not automatically transfer to a different architecture on a different sequence
            distribution. So we ran the production pipeline, on proteins whose structures have been solved, and measured C&alpha; RMSD against the deposited
            coordinates. The three were chosen to span the folds our candidates actually occupy rather than to
            be easy.
          </p>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <th>Benchmark protein</th>
              <th>Fold family</th>
              <th>Reference structure</th>
              <th className={styles.num}>CA-pLDDT</th>
              <th className={styles.num}>CA RMSD</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.gene}>
                CspA <span style={{ fontStyle: "normal", color: "var(--doc-muted)" }}>(E. coli)</span>
              </td>
              <td>OB-fold cold-shock</td>
              <td className={styles.locus}>
                PDB 1MJC · 2.0 Å [<Cref n="17" />]
              </td>
              <td className={styles.num}>88.6</td>
              <td className={styles.num}>1.13 Å</td>
              <td>
                <Pill tone="good">Near experimental</Pill>
              </td>
            </tr>
            <tr>
              <td className={styles.gene}>
                RecA <span style={{ fontStyle: "normal", color: "var(--doc-muted)" }}>(E. coli)</span>
              </td>
              <td>RecA/RAD51 ATPase</td>
              <td className={styles.locus}>
                PDB 1U94 · 1.9 Å [<Cref n="18" />]
              </td>
              <td className={styles.num}>93.7</td>
              <td className={styles.num} style={{ whiteSpace: "nowrap" }}>0.9&ndash;1.5 Å</td>
              <td>
                <Pill tone="good">Per domain agreement</Pill>
              </td>
            </tr>
            <tr>
              <td className={styles.gene}>OtsB</td>
              <td>HAD-like phosphatase</td>
              <td className={styles.locus}>
                PDB 6UPC · 2.51 Å [<Cref n="19" />]
              </td>
              <td className={styles.num}>95.4</td>
              <td className={styles.num}>2.70 Å</td>
              <td>
                <Pill tone="warn">Homolog only</Pill>
              </td>
            </tr>
          </tbody>
        </TableWrap>
        <Caption n="Table 3">
          RecA is measured per domain because 1U94 captures a compressed helical filament form, so a whole chain
          superposition would report interdomain arrangement rather than fold accuracy. No structure has been
          solved for <i>E.&nbsp;coli</i> OtsB, so its RMSD runs against the <i>Salmonella</i> Typhimurium
          ortholog at 73.3% sequence identity; the 2.70&nbsp;Å figure therefore contains real evolutionary
          distance. All three support the <b>pLDDT &gt; 80</b> band the score uses.
        </Caption>
      </>
    ),
  },

  {
    title: "The scoring rule",
    id: "s6",
    content: (
      <>
        <div className={styles.col}>
          <p>
            The threshold of the filter are the following: instability 40 from Guruprasad [<Cref n="14" />],
            pLDDT 80 from the AlphaFold confidence bands [<Cref n="8" />], and the tag-free pI windows from
            ion-exchange practice.
          </p>
          <Eq tex={String.raw`S(x) = \sum_{d \in D} w_d \, s_d(x) \qquad \text{where} \qquad \sum_d w_d = 1`} />
        </div>

        <DimensionTable />
        <Caption n="Table 4">The weight vector.</Caption>

        <div className={styles.col}>
          <h3>Testing the weights against measured data</h3>
          <p>
            We tested the weights, by running the scoring rule over <b>eSOL</b> [<Cref n="20" />], which
            reports measured solubility for most of the <i>E.&nbsp;coli</i> proteome. Structure confidence came
            from AlphaFold DB [<Cref n="8" />] rather than our own ESMFold run, which the three benchmarks show
            agree to within 3 pLDDT points. The test covers the four dimensions carrying <b>80% of the
            weight</b>, on 2,262 cytoplasmic proteins.
          </p>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <th>Predictor</th>
              <th className={styles.num}>Spearman <span style={{ textTransform: "none" }}>&rho;</span></th>
              <th className={styles.num}>AUROC</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Our score (4 testable dimensions)</td>
              <td className={styles.num} style={{ fontWeight: 600, color: "white" }}>+0.370</td>
              <td className={styles.num} style={{ fontWeight: 600, color: "white" }}>0.728</td>
              <td><Pill tone="good">Predicts solubility</Pill></td>
            </tr>
            <tr>
              <td>Instability index alone</td>
              <td className={styles.num}>+0.098</td>
              <td className={styles.num}>0.563</td>
              <td><Pill tone="neutral">Beaten by our score</Pill></td>
            </tr>
            <tr>
              <td>CA-pLDDT alone</td>
              <td className={styles.num}>&minus;0.048</td>
              <td className={styles.num}>0.478</td>
              <td><Pill tone="critical">No better than chance</Pill></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Molecular weight alone</td>
              <td className={styles.num} style={{ fontWeight: 600, color: "white" }}>+0.416</td>
              <td className={styles.num} style={{ fontWeight: 600, color: "white" }}>0.756</td>
              <td><Pill tone="critical">Beats our score</Pill></td>
            </tr>
          </tbody>
        </TableWrap>
        <Caption n="Table 5">
          n = 2,262. The paired difference against molecular weight is &minus;0.047 with a 95% bootstrap
          interval of [&minus;0.087, &minus;0.008], which excludes zero: our score is <b>significantly worse
          than sorting on size</b>. Molecular weight was not one of the two baselines we registered in advance;
          we added it during analysis, which makes the test harder to pass rather than easier, and we disclose
          it for that reason.
        </Caption>

        <ChartPanel
          title="Final scoring rule"
          sub="Two filters, and then the unchanged six dimension weighted score."
        >
          <Funnel steps={LOCKED_RULE_STEPS} scale="linear" />
        </ChartPanel>
      </>
    ),
  },

  {
    title: "Candidate explorer",
    id: "s8",
    content: (
      <>
        <div className={styles.col}>
          <p>
            All 45 surviving candidates, with the numbers the screen actually used and the flags the audits
            actually raised. Filter by category, sort by any column. Rows carrying a completeness or bin-quality
            problem are marked, since a high composite score is not a clearance.
          </p>
        </div>
        <Explorer />
        <div className={styles.col}>
          <p>
            You can find the final list of candidates in:{" "}
            <a
              href="https://drive.google.com/drive/folders/1ZowDMbPG67-O4QWe9MUvPDpL4C521kLt?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Drive folder
            </a>
          </p>
        </div>
      </>
    ),
  },

  {
    title: "Limitations of our Screening",
    id: "s9",
    content: (
      <>
        <CardGrid>
          <Card tag="Gap 1 · Taxonomy" title="Part of the assembly set never ran GTDB-Tk">
            Several long-read assembly batches carry Kraken2/NCBI taxonomy only. Fixing two mapping errors
            raised GTDB coverage from 49% to 61.3%, but the remaining batches need a fresh GTDB-Tk run before
            any phylogenetic-breadth claim can be said to cover them.
          </Card>
          <Card tag="Gap 2 · Bin quality" title="14 of the 45 have no CheckM data">
            Largely the same batches. Among the 31 that do have it, 10 fall below 90% completeness and 1
            exceeds 5% contamination. Counted across all 53 candidates ever considered, including the eight
            later removed, the figures are 17 without data, 11 below 90% and 2 over 5%.
          </Card>
          <Card tag="Gap 3 · Provenance" title="92% come from MAGs, not isolates">
            No physical strain exists for most candidates, and 21% rest on a single genome&rsquo;s evidence.{" "}
            <code>OGEHGG_01321</code> specifically needs reassembly or PCR confirmation before anyone should
            trust it.
          </Card>
        </CardGrid>
      </>
    ),
  },


  {
    title: "Contribution and where the samples came from",
    id: "s10",
    content: (
      <>
        <div className={styles.col}>
          <h3>1. Negative results, stated so others can avoid them</h3>
          <p>
            Four failures here are reusable, and none of them is specific to this project. Raw alignment
            conservation cannot be compared across families of different depth. A hand-weighted score can be
            perfectly robust and still carry no information, if its inputs are degenerate. A consistency check
            applied downstream of the filter that guarantees it can never fail. And a physicochemical screen
            with no hydrophobicity term will rank integral membrane proteins near the top and hand them to a
            wet lab that cannot express them.
          </p>

          <h3>Provenance of the metagenomes</h3>
          <p>
            The 1,221 metagenomes analysed here were <b>not generated by this iGEM team</b>. They come from an
            ongoing Rub&rsquo; al-Khali microbial ecology survey carried out by the Bio-Ontology Research Group
            at KAUST, and the survey&rsquo;s own findings on biogeography, soil-position structure and
            environmental association are reported separately by that group. Our contribution begins downstream
            of their sampling and assembly: functional mining, candidate prioritisation, and the audit of that
            prioritisation.
          </p>

          <h3>Availability</h3>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Where</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Survey project portal</td>
              <td>
                <a href="https://rubalkhali.science/" target="_blank" rel="noopener noreferrer">
                  rubalkhali.science
                </a>
              </td>
              <td><Pill tone="warn">Live, development resource</Pill></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Survey analysis code</td>
              <td>
                <a
                  href="https://github.com/bio-ontology-research-group/empty-quarter-ecology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bio-ontology-research-group/empty-quarter-ecology
                </a>
              </td>
              <td><Pill tone="good">Public · MIT</Pill></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Survey data &amp; knowledge graph</td>
              <td>
                <a
                  href="https://github.com/bio-ontology-research-group/empty-quarter-ecology-data"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bio-ontology-research-group/empty-quarter-ecology-data
                </a>
              </td>
              <td><Pill tone="warn">Public staging snapshot</Pill></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Archived, citable release of that data</td>
              <td>Awaiting the survey&rsquo;s own release gates</td>
              <td><Pill tone="critical">Not yet deposited</Pill></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Our candidate set + QC supplement</td>
              <td>To be released with this wiki</td>
              <td><Pill tone="critical">Pending</Pill></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, color: "white" }}>Our screening &amp; audit code</td>
              <td>To be released with this wiki</td>
              <td><Pill tone="critical">Pending</Pill></td>
            </tr>
          </tbody>
        </TableWrap>
        <Caption n="Table 7">
          Reported as it currently stands rather than as we intend it to stand. The survey&rsquo;s data
          repository is publicly readable, but its own documentation describes it as a <b>staging snapshot
          rather than a published release</b>.
        </Caption>
      </>
    ),
  },

  {
    title: "References",
    id: "s11",
    content: (
      <>
        <References />
        <p className={styles.pageNote}>
          <b>Model · Dry Lab.</b> Empty Quarter metagenome survey: 1,036 enrichment cultures and 185 isolate
          genomes, 45 prioritised protein candidates.
          <br />
          Structure prediction was run on the Ibex cluster at KAUST; we thank the KAUST Supercomputing Core
          Laboratory for the allocation.
          <br />
          Every figure on this page is drawn from the released candidate tables. Retracted claims are shown
          rather than deleted, and both round-one and round-two audit verdicts are reported.
        </p>
      </>
    ),
  },
];

// The page's actual headline (the reference implementation's <h1>) —
// "Model" alone is the nav/route label (see pages.js), not this.
const pageTitle = (
  <>
    Bioprospecting key genes from Saudi Arabia's <em style={{ fontStyle: "normal", color: "var(--accent)" }}>Empty&nbsp;Quarter</em>
  </>
);

export default function Model() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      {/* No TooltipProvider here — SectionedArticle.jsx now wraps its own
          Article in the shared one (../../components/Tooltip/Tooltip.jsx),
          which covers both this page's charts and Cref's hover preview
          below, since both render inside a section's `content`. */}
      <div className={styles.doc}>
        <SectionedArticle
          title={pageTitle}
          intro={pageIntro}
          sections={sections}
          defaultSelected={sections[0]?.title}
          numbered
        />
      </div>
    </PageWrapper>
  );
}
