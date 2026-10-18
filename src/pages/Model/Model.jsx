import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import styles from "./Model.module.scss";
import { Callout, Card, CardGrid, Caption, ChartPanel, Details, Legend, Pill, SecRef, TableWrap } from "./components/Ui";
import Funnel from "./components/Funnel";
import ScatterChart from "./components/ScatterChart";
import OrfChart from "./components/OrfChart";
import { ConservationBars, SensitivityBars } from "./components/BarRows";
import Explorer from "./components/Explorer";
import References, { Cref } from "./components/References";
import {
  CategoryTable,
  DimensionTable,
  SoftwareTable,
  AuditTable,
} from "./components/Tables";
import { CATS, FUNNEL, LOCKED_RULE_STEPS } from "./data";
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
      The world&rsquo;s largest sand desert holds microbes that survive UV, desiccation, and very high and
      low temperatures daily. We built a five-layer <b>screening pipeline</b> that reads their metagenomes and returns
      a ranked candidate set for synthesis. This page documents the entire pipeline pipeline, then audit
      of the results, and the final output or the final candidates.
    </p>
    <div className={styles.statGrid}>
      <div className={styles.statCell}>
        <span className={styles.v}>1,221</span>
        <span className={styles.k}>Metagenomes</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.v}>20,962</span>
        <span className={styles.k}>Tier-1 hits</span>
      </div>
      <div className={`${styles.statCell} ${styles.hi}`}>
        <span className={styles.v}>45</span>
        <span className={styles.k}>Final candidates</span>
      </div>
      <div className={`${styles.statCell} ${styles.hi}`}>
        <span className={styles.v}>19</span>
        <span className={styles.k}>Synthesis-ready</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.v}>2,262</span>
        <span className={styles.k}>Validation proteins</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.v}>8</span>
        <span className={styles.k}>Candidates retracted</span>
      </div>
    </div>
  </>
);

const sections = [
  {
    title: "Overview of the pipeline",
    id: "s1",
    content: (
      <>
        <div className={styles.col}>
          <Callout tone="accent" label="Scope, stated up front">
            <p>
              This page describes a <b>screening pipeline and its audit step</b>. The ranking function at its
              center is a <b>heuristic</b> system combined under with hand picked weights, with no fitted
              parameters.
            </p>
            <p>
              On the other hand, for the filtering we use statistical modeling tools, these are: the{" "}
              <b>depth-matched resampling null</b>, and the <b>Dirichlet weight-sensitivity analysis</b>. Both
              are there to make our pipeline and filters reliable.
            </p>
          </Callout>
          <Callout label="Design question">
            <p>
              Given only sequence data from an environment we cannot culture, which proteins are worth the cost
              of a synthesis order and a wet-lab slot?
            </p>
          </Callout>
          <p>
            Answering it by homology alone is not the most reliable test, mainly because a BLAST hit tells you
            what a sequence <i>resembles</i>, not whether the molecule behind it is stable, small, chargeable,
            or folded. So the
            screen scores each candidate along five independent axes, each grounded in a different kind of
            evidence, and only then combines them.
          </p>
        </div>

        <CardGrid>
          <Card tag="Step 1 · Identity" title="Annotation">
            Bakta gene calls cross-checked against independent eggNOG orthology. Disagreement is treated as
            disqualifying.
          </Card>
          <Card tag="Step 2 · Behavior" title="Physicochemistry">
            Instability index, molecular weight, isoelectric point, GRAVY and aliphatic index: the properties
            that decide whether purification is cheap or impossible.
          </Card>
          <Card tag="Step 3 · History" title="Conservation">
            Shannon entropy over depth-matched alignments.
          </Card>
          <Card tag="Step 4 · Form" title="Structure">
            ESMFold CA-pLDDT, calibrated against three solved crystal structures spanning three distinct fold
            families.
          </Card>
          <Card tag="Step 5 · Provenance" title="Source quality">
            GTDB-Tk taxonomy plus CheckM completeness of the bin the gene came from.
          </Card>
          <Card tag="Adversarial" title="Rigor review">
            Twelve audits filter run <i>against</i> our own output.
          </Card>
        </CardGrid>
      </>
    ),
  },

  {
    title: "Pipeline: 1,221 samples to 45 molecules",
    id: "s2",
    content: (
      <>
        <ChartPanel title="Attrition through the pipeline" sub="Bar length is log-scaled, because on a linear scale the last three stages are too small to see. Counts are exact.">
          <Funnel steps={FUNNEL} />
        </ChartPanel>
        <Caption n="Figure 1">
          Enrichment cultures (1,036) and isolate genomes (185) enter as one pool.
        </Caption>

        <div className={styles.col}>
          <h3>What survives, by functional category</h3>
          <p>
            Four stress proteins were selected as possible candidates to be produced in the lab. A fifth,
            covering kill-switch and toxin&ndash;antitoxin systems, was removed from the project by team
            decision on biosafety and framing grounds.
          </p>
        </div>

        <CategoryTable />
        <Caption n="Table 1">
          &ldquo;Ranking status&rdquo; records what the weight-sensitivity analysis says.
        </Caption>

        <div className={styles.col}>
          <h3>Software</h3>
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
            Every Tier-1 sequence goes through the <code>ProtParam</code> module of Biopython [<Cref n="6" />
            ]. Four of its outputs feed the composite score. Two others, GRAVY and the aliphatic index, are
            computed but deliberately left out of the score; we use them as consistency checks.
          </p>
          <h4>How the instability index is computed</h4>
          <p>
            Guruprasad, Reddy and Pandit [<Cref n="14" />] observed that certain dipeptides occur at measurably
            different frequencies in proteins with short <i>in vivo</i> half-lives than in stable ones. They
            assigned each of the 400 possible dipeptides a weight from that frequency difference. The index
            slides a two residue window along the sequence, sums the weights, and normalises by length: II =
            (10/L) &middot; &Sigma; W<sub>DIPEP</sub>(x<sub>i</sub>x<sub>i+1</sub>), where L is the sequence
            length and W<sub>DIPEP</sub> is the Guruprasad dipeptide instability weight.
          </p>
          <p>
            The original study put the cutoff at 40: below it, a protein was predicted stable in <i>E.&nbsp;coli</i>
            . This method has its limitation of course, specially since their weights were fitted on a small set
            of proteins whose half-lives were known in 1990. It is a cheap first step, which is why we
            cross-check it against the fold predictions in the following steps rather than trusting it alone.
          </p>
          <h4>Why isoelectric point is worth 15% of the score</h4>
          <p>
            Biopython computes pI by bisection on the Henderson Hasselbalch charge sum. A protein whose pI sits below 5 or above 9 is far from neutral pH at working conditions, so it binds
            an ion-exchange column cleanly and can be captured without an affinity tag. No His-tag means no
            protease step and no leftover tag making the downstream assay more complex.
          </p>
        </div>

        <ChartPanel
          title="Stability against fold confidence — all 45 candidates"
          sub="Marker area ∝ molecular weight. Hover any point for the full record. The dashed guides mark the two decision thresholds the score uses: instability < 40 and CA-pLDDT > 80."
          legend={<Legend items={catLegend} />}
        >
          <ScatterChart />
        </ChartPanel>
        <Caption n="Figure 2">
          The upper-left quadrant is the target zone: stable and confidently folded. Cold-shock <i>csp</i>{" "}
          candidates cluster there at the extreme, one of them at a negative instability index (&minus;1.8),
          which is outside the range the Guruprasad scale was calibrated on and should be read as &ldquo;very
          stable&rdquo;, not as a physical quantity.
        </Caption>
      </>
    ),
  },

  {
    title: "Conservation step",
    id: "s4",
    content: (
      <>
        <div className={styles.col}>
          <h4>How the statistic works</h4>
          <p>
            This part has 3 steps. First, CD-HIT [<Cref n="4" />] collapses the family down to
            representatives at 90% identity. Its greedy incremental algorithm sorts sequences longest-first,
            makes the longest a cluster seed, and assigns each subsequent sequence to the first seed it matches
            above threshold, using short-word counting to skip most alignments outright. This step removes
            73&ndash;89% of the sequences in our families.
          </p>
          <p>
            Second, MAFFT [<Cref n="5" />] aligns the representatives. Third, we take each alignment column c,
            read off the frequency p<sub>a,c</sub> of each amino acid a in it, and compute Shannon entropy [
            <Cref n="17" />]. A column where every sequence agrees has entropy 0; a column drawing uniformly from
            all twenty residues approaches log&#8322;20 &asymp; 4.32 bits. We call a column conserved when its
            entropy falls below &tau; = 0.5 bits, and report the family statistic as the fraction of columns
            that qualify: H(c) = &minus;&Sigma; p<sub>a,c</sub> log&#8322; p<sub>a,c</sub>, Cons = |{"{c : H(c) < τ}"}| / C,
            where A = 20 amino acids, C = alignment columns, and &tau; is the entropy threshold.
          </p>

          <p>
            We subsample every family without replacement down to a common N (18 sequences for the enrichment
            set, 20 for the isolates, each set by the smallest usable family), recompute the statistic, and
            repeat 2,000 times to get a distribution.
          </p>
          <p>
            At matched depth the result inverts. <b>
              <i>csp</i>, not <i>ibpAB</i>, is the most conserved family
            </b>
            , in both datasets independently. We report the corrected numbers and leave the retracted ones on
            the page.
          </p>
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
        <Caption n="Figure 3">
          <i>csp</i>&rsquo;s raw number was the most depressed of any family precisely because its alignment is
          the deepest we have (226 sequences); depth matching moves it from mid pack to first and drops{" "}
          <i>ibpAB</i> to fourth of nineteen. <i>ibpAB</i> is still a genuinely conserved family and still holds
          the best predicted fold in the dataset at CA-pLDDT 98.6.
        </Caption>
      </>
    ),
  },

  {
    title: "Structure layer: calibrating what pLDDT means here",
    id: "s5",
    content: (
      <>
        <div className={styles.col}>
          <h4>Why a pLDDT instead of AlphaFold</h4>
          <p>
            AlphaFold2 [<Cref n="8" />] builds its prediction from a multiple sequence alignment assembled by
            searching large sequence databases for homologs. ESMFold replaces that search with a protein
            language model, ESM-2, trained on unlabelled sequence; the evolutionary information AlphaFold reads
            out of an MSA is instead held in the model&rsquo;s internal representations, and a folding head reads
            structure directly from those. Lin and colleagues report accuracy somewhat below AlphaFold2 on
            well covered proteins.
          </p>
          <h4>What the confidence number is</h4>
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
                PDB 1MJC · 2.0 Å [<Cref n="19" />]
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
                PDB 1U94 · 1.9 Å [<Cref n="20" />]
              </td>
              <td className={styles.num}>93.7</td>
              <td className={styles.num}>0.9&ndash;1.5 Å</td>
              <td>
                <Pill tone="good">Per domain agreement</Pill>
              </td>
            </tr>
            <tr>
              <td className={styles.gene}>OtsB</td>
              <td>HAD-like phosphatase</td>
              <td className={styles.locus}>
                PDB 6UPC · 2.51 Å [<Cref n="21" />]
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

        <div className={styles.col}>
          <p>
            One detail from the CspA run is worth reporting. Only two residues came out below pLDDT 70, residues
            1 and 2, and residue 1 is the N-terminal methionine that gets cleaved post translationally and is
            therefore absent from the crystallised construct. The model marked as uncertain precisely the region
            that does not exist in the real protein.
          </p>
          <p>
            CspA is also the closest thing we have to a positive control for the flagship candidate: the desert{" "}
            <i>cspC</i> shares its fold and 56.7% sequence identity, and scores 90.3 against CspA&rsquo;s 88.6.
          </p>
        </div>
      </>
    ),
  },

  {
    title: "The scoring rule: how we chose it, and what we locked",
    id: "s6",
    content: (
      <>
        <div className={styles.col}>
          <h3>The six dimensions</h3>
          <p>
            Each dimension maps a raw measurement onto the interval [0, 1] through a step function, and the six
            sub-scores combine under a fixed weight vector.
          </p>
          <p>
            Each threshold is a decision boundary: instability
            40 from Guruprasad [<Cref n="14" />], pLDDT 80 from the AlphaFold confidence bands [<Cref n="8" />]
            as re-checked against our own benchmark, and the tag-free pI windows from ion-exchange practice. A
            smooth interpolation between those points would imply we know the shape of the function between
            them, and we do not. S(x) = &Sigma; w<sub>d</sub> &middot; s<sub>d</sub>(x), where &Sigma; w
            <sub>d</sub> = 1.
          </p>
        </div>

        <DimensionTable />
        <Caption n="Table 4">The weight vector.</Caption>

        <div className={styles.col}>
          <h3>Testing the weights against measured data</h3>
          <p>
            We tested the weights, by running the scoring rule over <b>eSOL</b> [<Cref n="31" />], which reports measured solubility for most of
            the <i>E.&nbsp;coli</i> proteome. Structure confidence came from AlphaFold DB [<Cref n="8" />]
            rather than our own ESMFold run, which the three benchmarks in <SecRef n="5">§05</SecRef> show agree
            to within 3 pLDDT points. The test covers the four dimensions carrying <b>80% of the weight</b>, on
            2,262 cytoplasmic proteins.
          </p>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <th>Predictor</th>
              <th className={styles.num}>Spearman &rho;</th>
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
        <Caption n="Figure 4">
          The gates reproduce by rule what <SecRef n="7">§07</SecRef> previously had to argue by hand. Filter 1
          removes every truncated <i>recA</i>, <i>mutS</i> and <i>uvr</i> call, leaving the four full-length{" "}
          <i>phrB</i> candidates as the DNA-repair set. Step 2 removes the seven membrane subunits.
        </Caption>

        <div className={styles.col}>
          <p>
            Stability and structure together still carry half the weight. because the score is optimised for{" "}
            <i>expressibility</i> of the protein and its potential to produced in the lab.
          </p>
        </div>
      </>
    ),
  },

  {
    title: "Auditing our own code",
    id: "s7",
    content: (
      <>
        <div className={styles.col}>
          <p className={styles.lede}>
            Every threshold in the previous section was set by hand. In July 2026 we ran twelve audits against
            our own candidate set, with the aim of finding out which of our results were artefacts. Spoiler
            Alert, several were.
          </p>
          <p>
            The audits ran in two rounds: seven adversarial checks, then five follow ups closing the data gaps
            the first round exposed. By the end, 53 candidates had become 45.
          </p>

          <h3>Test 1: does the ranking survive its own weights?</h3>
          <p>
            The question is whether the top candidate is a property of the data or a property of our weight
            choices. We question it in two ways.
          </p>
          <p>
            First: perturb each of the six weights by &plusmn;10, &plusmn;20 and &plusmn;50%, rescale the
            remaining five to keep the vector summing to one, and re rank. That is 36 runs per category, and it tells you which single dimension the ranking
            is most sensitive to.
          </p>
          <p>
            Second: we draw 1000 weight vectors from a Dirichlet distribution centered on the baseline. The
            Dirichlet is the natural choice because every draw from it is already a valid weight vector. Its
            concentration parameter sets how far the draws stray from the baseline. For each draw we re rank
            and record whether the original winner is still winning; the fraction that says yes
            is the P(Top-1) figure below.
          </p>
        </div>

        <ChartPanel
          title="P(Top-1 candidate survives weight perturbation)"
          sub="1,000 Dirichlet draws over the weight simplex. Bars are color coded by verdict and each also carries its verdict in text, so the color is not the only signal."
          legend={
            <Legend
              items={[
                { label: "Trustworthy", color: "var(--doc-good)" },
                { label: "Fragile", color: "var(--doc-warn)" },
                { label: "Degenerate", color: "var(--doc-critical)" },
              ]}
            />
          }
        >
          <SensitivityBars />
        </ChartPanel>
        <Caption n="Figure 5">
          Desiccation Resistance reaches P = 1.000 for the worst available reason. All eight of its candidates
          have identical subscores on every dimension, so no weight vector can separate them and the
          &ldquo;winner&rdquo; is whichever row happened to be listed first. The robustness number is perfect
          and carries no information.
        </Caption>

        <div className={styles.col}>
          <Callout tone="critical" label="Consequence">
            <p>
              The eight desiccation candidates are now presented as an <b>undifferentiated shortlist</b> rather
              than a ranked list. Anaerobic Respiration&rsquo;s top pick is reported as &ldquo;<i>narI</i> or
              the <i>frd</i> cluster&rdquo;, since it wins by 0.015 points and flips under four of the 36
              single weight perturbations.
            </p>
          </Callout>

          <h3>Test 2: are the genes actually complete?</h3>
          <p>
            Metagenome assembly breaks contigs wherever coverage runs out, and a gene caller will annotate
            whatever fragment sits on the broken contig with a confident family name. A 172 residue
            fragment of a 353 residue protein can score well on every dimension we measure, because a fragment
            of a stable protein is still stable looking, and ESMFold will fold it
            confidently.
          </p>
          <p>
            So we added a dimension: ORF completeness, the candidate&rsquo;s length as a percentage of the
            canonical full length ortholog for its family, taken
            from <i>E.&nbsp;coli</i> K-12 where a reference exists. The result reframed an entire category.
          </p>
        </div>

        <ChartPanel
          title="ORF completeness by gene family"
          sub="Each mark is one candidate; the dashed line is full length. Below 60% a candidate cannot be ordered as a complete gene, whatever its score says."
          legend={<Legend items={catLegend} />}
        >
          <OrfChart />
        </ChartPanel>
        <Caption n="Figure 6">
          The <i>csp</i>, <i>phrB</i>, <i>otsB</i>, <i>ectA</i>, <i>nar</i> and <i>frd</i> families sit at or
          near full length. The <i>mutS</i>/<i>uvr</i>/<i>recA</i> spread is the DNA repair fragmentation
          problem: 86% of that category&rsquo;s original candidates were truncated calls.
        </Caption>

        <div className={styles.col}>
          <h3>Test 3: does an independent method agree on gene identity?</h3>
          <p>
            Our two annotation tools reach a gene name by different routes. Bakta [<Cref n="1" />] assigns
            names by alignment free matching against a curated protein database, optimised for speed and
            standardisation across a whole genome. eggNOG mapper [<Cref n="2" />] places each sequence into a
            precomputed orthologous group in the eggNOG hierarchy [<Cref n="3" />] and takes the name from the
            group&rsquo;s consensus. Because the routes are independent, a disagreement between them is
            informative.
          </p>
          <p>
            Our rule was to treat any disagreement as disqualifying rather than to adjudicate it. We are not in
            a position to decide which of two mature annotation tools is right about a sequence from an
            organism nobody has cultured, and a candidate whose identity is contested is not one to spend a
            synthesis order on. Four candidates went out this way, one of them only in round two. Where the
            question was about a catalytic domain rather than a gene name, we used InterProScan [<Cref n="12" />
            ], which scans against the member databases of InterPro and reports domain hits with their
            boundaries.
          </p>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <th>Locus</th>
              <th>Claimed</th>
              <th>Independent call</th>
              <th>Evidence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.locus}>KEICPA_01630</td>
              <td className={styles.gene}>DUF3494</td>
              <td>surface-adhesion repeat</td>
              <td style={{ fontSize: 13.5 }}>Zero eggNOG support; 1,349 aa against a 150&ndash;300 aa family norm</td>
              <td><Pill tone="critical">Excluded</Pill></td>
            </tr>
            <tr>
              <td className={styles.locus}>HCNMLP_0077</td>
              <td className={styles.gene}>uvrA</td>
              <td className={styles.gene}>polYB</td>
              <td style={{ fontSize: 13.5 }}>eggNOG ortholog conflict; an unrelated SOS response polymerase family</td>
              <td><Pill tone="critical">Excluded</Pill></td>
            </tr>
            <tr>
              <td className={styles.locus}>BACHFP_0094</td>
              <td className={styles.gene}>uvrA</td>
              <td className={styles.gene}>polYB</td>
              <td style={{ fontSize: 13.5 }}>eggNOG ortholog conflict</td>
              <td><Pill tone="critical">Excluded</Pill></td>
            </tr>
            <tr>
              <td className={styles.locus}>PNDHLD_0013</td>
              <td className={styles.gene}>uvrB</td>
              <td className={styles.gene}>mfd</td>
              <td style={{ fontSize: 13.5 }}>
                PFAM domains CarD_CdnL_TRCF, DEAD, Helicase_C and TRCF; a transcription repair coupling factor
              </td>
              <td><Pill tone="critical">Excluded</Pill></td>
            </tr>
            <tr>
              <td className={styles.locus}>4 × mutL</td>
              <td className={styles.gene}>mutL</td>
              <td className={styles.gene}>mutL fragment</td>
              <td style={{ fontSize: 13.5 }}>7&ndash;18% of the 615 aa full length; domain fragments rather than genes</td>
              <td><Pill tone="warn">Flagged</Pill></td>
            </tr>
            <tr>
              <td className={styles.locus}>3 × uvrC</td>
              <td className={styles.gene}>uvrC</td>
              <td className={styles.gene}>uvrC &#10003;</td>
              <td style={{ fontSize: 13.5 }}>
                InterProScan confirms a genuine GIY-YIG nuclease domain; the round one regex screen was a false
                negative
              </td>
              <td><Pill tone="good">Restored</Pill></td>
            </tr>
          </tbody>
        </TableWrap>
        <Caption n="Table 6">
          The last row matters as much as the others. Round one screened for catalytic motifs with a regular
          expression, which called four <i>uvrC</i> candidates domain negative. A proper InterProScan run found
          that three of those were false negatives, and that the fourth was truncated across a different
          C-terminal nuclease domain rather than missing one.
        </Caption>

        <div className={styles.col}>
          <h3>Test 4: how good is the bin the gene came from?</h3>
          <p>
            Most of these genes come from metagenome assembled genomes, and a gene inherits the reliability of the bin it was called in. CheckM [<Cref n="11" />]
            estimates that reliability by looking for a set of marker genes expected to be present in single
            copy for the bin&rsquo;s lineage: the fraction found gives completeness, and markers found more than
            once give contamination.
          </p>

          <Callout tone="critical" label="Top pick withdrawn">
            <p>
              <code>OGEHGG_01321</code> (<i>recA</i>, composite 0.85) carries three independent problems at
              once. The ORF is <b>49% of full length</b>. Bakta flags it as a probable pseudogene. And its
              source bin is <b>33.7% CheckM-complete</b>, below even the 50% floor the MIMAG standard sets for
              calling a metagenome-assembled genome a low quality draft [<Cref n="13" />]. The runner-up sits in
              a 48.6%-complete bin. Neither is usable as a headline result.
            </p>
            <p>
              <b>Replacement:</b> <i>phrB</i> (<code>MJNEPN_02265</code> and three siblings). All four are
              93&ndash;103% ORF complete with clean bin quality, carry EC 4.1.99.3 as strong functional
              evidence, and fold at CA-pLDDT 88&ndash;92. The composite score is lower and the chance of it
              working is considerably higher.
            </p>
          </Callout>

        </div>

        <Details summary="Full audit register: all twelve tasks and their verdicts">
          <AuditTable />
          <p>
            Round one (A-G) audited evidence strength, ranking robustness, structure pipeline accuracy,
            catalytic motifs, strain provenance, limitations, and the conservation null model. Round two
            (H-L) closed the data gaps round one exposed. Per candidate QC covering EC/PFAM evidence tier,
            CheckM completeness and contamination, and pseudogene flags is compiled for all 53 candidates ever
            considered, including the eight that did not survive.
          </p>
        </Details>
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
      </>
    ),
  },

  {
    title: "Limitations of our screening",
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
          <Card tag="Gap 4 · Function" title="Nothing here has been expressed">
            Every number on this page is a prediction. Stability, fold and purifiability are modeled and not
            measured, which is what separates a resource from a result.
          </Card>
        </CardGrid>

        <div className={styles.col}>
          <Callout tone="good" label="What is clean">
            <p>
              &ldquo;Clean&rdquo; here means one specific thing: <b>sequence-level completeness plus independent
              functional evidence</b>. It is not a claim about every axis, and the distinction matters.
            </p>
            <p>
              On that definition, the Anaerobic Respiration and Desiccation Resistance sets are fully clean:
              all 16 candidates land within 90% of reference full length, and all 16 carry genuine
              EC-number evidence. Four <i>cspC</i> and four <i>phrB</i> candidates are clean on every axis we
              tested, including fold confidence.
            </p>
            <p>
              Two candidates that earlier drafts of this page called clean are not, and we would rather say so
              than let the label stand. The two full length <i>ibpA</i> candidates are ORF complete but fold at
              CA-pLDDT 66.9 and 62.6, <b>below our own &gt;80 band</b>; they are complete, not confident.{" "}
              <code>IJEMCG_01450</code> (<i>recA</i>) has the strongest cross-genome support in the dataset,
              found in 89 carrier genomes across at least two genera, but it is a <b>32% ORF fragment at
              CA-pLDDT 60.5</b> and sits below the completeness line we drew in Figure 6. Best-attested by
              provenance is not the same as usable, and it should not have been written in a box labelled
              clean.
            </p>
          </Callout>
        </div>
      </>
    ),
  },

  {
    title: "Contribution, and where the samples came from",
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
        <Caption n="Table 8">
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
      </>
    ),
  },
];

// The page's actual headline (the reference implementation's <h1>) —
// "Model" alone is the nav/route label (see pages.js), not this.
const pageTitle = (
  <>
    Reading stress tolerance out of the <em style={{ fontStyle: "normal", color: "var(--accent)" }}>Empty&nbsp;Quarter</em>
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
