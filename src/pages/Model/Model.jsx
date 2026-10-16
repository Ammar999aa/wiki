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
  ChecklistTable,
  Tier1Table,
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
      The world&rsquo;s largest sand desert holds microbes that survive UV, desiccation, thermal swing and
      anoxia daily. We built a five-layer <b>screening pipeline</b> that reads their metagenomes and returns
      a ranked, QC-flagged candidate set for synthesis. Then we spent a second campaign trying to break it,
      and it broke in four places. This page documents the pipeline, the audit, and what survived.
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
    title: "§01 What this is, and what it is not",
    id: "s1",
    content: (
      <>
        <div className={styles.col}>
          <Callout tone="accent" label="Scope, stated up front">
            <p>
              This page describes a <b>screening pipeline and its audit</b>. It is not a mechanistic model of a
              biological system, and the ranking function at its centre is a <b>heuristic</b>: six literature
              thresholds combined under hand-set weights, with no fitted parameters and no validation against
              measured expression or solubility outcomes. We say this here rather than letting a reader infer it
              in <SecRef n="6">§06</SecRef>.
            </p>
            <p>
              Two pieces of genuine statistical modelling do sit inside it, and they are the parts we would
              defend: the <b>depth-matched resampling null</b> that overturned our own conservation claim
              (<SecRef n="4">§04</SecRef>), and the <b>Dirichlet weight-sensitivity analysis</b> that showed one
              of our four category rankings carries no information at all (<SecRef n="7">§07</SecRef>). Both are
              models <i>of our own method&rsquo;s
              reliability</i> rather than of biology, and that is the honest description of them.
            </p>
          </Callout>
          <p className={styles.lede}>
            A metagenome is not a parts list. It is twenty thousand plausible open reading frames, most of which
            will never fold, never express, or never purify. The engineering question is narrow and unforgiving:
          </p>
          <Callout label="Design question">
            <p>
              Given only sequence data from an environment we cannot culture, which proteins are worth the cost
              of a synthesis order and a wet-lab slot?
            </p>
          </Callout>
          <p>
            Answering it by homology alone fails, because a BLAST hit tells you what a sequence <i>resembles</i>,
            not whether the molecule behind it is stable, small, chargeable, folded, or even complete. So the
            screen scores each candidate along five independent axes, each grounded in a different kind of
            evidence, and only then combines them.
          </p>
        </div>

        <CardGrid>
          <Card tag="Layer 1 · Identity" title="Annotation">
            Bakta gene calls cross-checked against independent eggNOG orthology. Disagreement is treated as
            disqualifying, not as noise.
          </Card>
          <Card tag="Layer 2 · Behaviour" title="Physicochemistry">
            Instability index, molecular weight, isoelectric point, GRAVY and aliphatic index: the properties
            that decide whether purification is cheap or impossible.
          </Card>
          <Card tag="Layer 3 · History" title="Conservation">
            Shannon entropy over depth-matched alignments, so that &ldquo;conserved&rdquo; means something other
            than &ldquo;we aligned a lot of sequences.&rdquo;
          </Card>
          <Card tag="Layer 4 · Form" title="Structure">
            ESMFold CA-pLDDT, calibrated against three solved crystal structures spanning three distinct fold
            families.
          </Card>
          <Card tag="Layer 5 · Provenance" title="Source quality">
            GTDB-Tk taxonomy plus CheckM completeness of the bin the gene came from. A perfect gene in a
            33%-complete bin is not a finding.
          </Card>
          <Card tag="Adversarial" title="Rigor review">
            Twelve audits run <i>against</i> our own output. Eight candidates and two headline claims did not
            survive; see <SecRef n="7">§07</SecRef>.
          </Card>
        </CardGrid>
      </>
    ),
  },

  {
    title: "§02 Pipeline: 1,221 samples to 45 molecules",
    id: "s2",
    content: (
      <>
        <div className={styles.col}>
          <p>
            Each stage is a filter with a rule we can state, rather than a judgement call. The steepest drop
            comes at functional triage. The most consequential is the last one, which removed candidates our own
            earlier report had promoted.
          </p>
        </div>

        <ChartPanel title="Attrition through the pipeline" sub="Bar length is log-scaled, because on a linear scale the last three stages are too small to see. Counts are exact.">
          <Funnel steps={FUNNEL} />
        </ChartPanel>
        <Caption n="Figure 1">
          Enrichment cultures (1,036) and isolate genomes (185) enter as one pool. The step from 53 to 45 is the
          July 2026 rigor review, documented in <SecRef n="7">§07</SecRef>.
        </Caption>

        <div className={styles.col}>
          <h3>What survives, by functional category</h3>
          <p>
            Four stress categories were carried forward. A fifth, covering kill-switch and toxin&ndash;antitoxin
            systems, was removed from the project by team decision before this version, on biosafety and framing
            grounds rather than for anything wrong with the data.
          </p>
        </div>

        <CategoryTable />
        <Caption n="Table 1">
          &ldquo;Ranking status&rdquo; records what the weight-sensitivity analysis in <SecRef n="7">§07</SecRef> says about trusting
          the within-category order. Three of the four categories carry a caveat.
        </Caption>

        <div className={styles.col}>
          <h3>Software</h3>
          <p>
            Nothing in this pipeline is our own code except the scoring layer and the audit scripts. The table
            below lists what each stage actually runs, and every tool is cited in <SecRef n="12">§12</SecRef>. Where we recorded a
            version, it is given; where the run predates our version logging, we say so instead of guessing.
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
    title: "§03 Physicochemical layer: will it survive a bench?",
    id: "s3",
    content: (
      <>
        <div className={styles.col}>
          <p>
            Every Tier-1 sequence goes through the <code>ProtParam</code> module of Biopython [<Cref n="6" />
            ]. Four of its outputs feed the composite score. Two others, GRAVY and the aliphatic index, are
            computed but deliberately left out of the score; we use them as consistency checks, for reasons the
            expandable note at the end of this section explains.
          </p>
          <h4>How the instability index is computed</h4>
          <p>
            Guruprasad, Reddy and Pandit [<Cref n="14" />] observed that certain dipeptides occur at measurably
            different frequencies in proteins with short <i>in vivo</i> half-lives than in stable ones. They
            assigned each of the 400 possible dipeptides a weight from that frequency difference. The index
            slides a two-residue window along the sequence, sums the weights, and normalises by length: II =
            (10/L) &middot; &Sigma; W<sub>DIPEP</sub>(x<sub>i</sub>x<sub>i+1</sub>), where L is the sequence
            length and W<sub>DIPEP</sub> is the Guruprasad dipeptide instability weight.
          </p>
          <p>
            The original study put the cutoff at 40: below it, a protein was predicted stable in <i>E.&nbsp;coli</i>
            . Two limits are worth stating plainly. The weights were fitted on a small set of proteins whose
            half-lives were known in 1990, and the index knows nothing about structure, so it cannot see a
            stabilising disulfide or a destabilising exposed loop. It is a cheap prior, not a measurement, which
            is why we cross-check it against the fold predictions in <SecRef n="5">§05</SecRef> rather than trusting it alone.
          </p>
          <h4>Why isoelectric point is worth 15% of the score</h4>
          <p>
            The reason is economic. Biopython computes pI by bisection on the Henderson&ndash;Hasselbalch charge
            sum, finding the pH at which the summed charge of the ionisable side chains and termini crosses zero.
            A protein whose pI sits below 5 or above 9 is far from neutral pH at working conditions, so it binds
            an ion-exchange column cleanly and can be captured without an affinity tag. No His-tag means no
            protease step and no leftover tag distorting the downstream assay. For a team with one summer and a
            shared FPLC, that difference decides whether a candidate gets characterised at all.
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

        <Details summary="Why desert proteins are not thermophilic proteins">
          <p>
            A reasonable prior is that desert organisms should yield thermostable proteins. Our data says
            otherwise, and the disagreement is informative. Thermophilic proteomes are marked by a high
            aliphatic index, meaning a large volume fraction of Ala, Val, Ile and Leu packing a rigid hydrophobic
            core. Our candidates&rsquo; aliphatic indices sit in the mesophilic range.
          </p>
          <p>
            The ecology explains it. Sand at depth buffers temperature far more than surface air does; what the
            resident organisms actually face is <i>water</i> stress and UV, not sustained heat. The proteome we
            recovered is a desiccation-and-radiation proteome: trehalose and ectoine biosynthesis, photolyases,
            cold-shock RNA chaperones. We report this as a negative result rather than suppressing it. Two
            caveats belong with it. The aliphatic index is not one of the six scored dimensions and is not in
            the candidate table below, so this observation is currently an assertion rather than a figure you
            can check; putting the per-candidate values on the page is on our list. And the comparison has no
            matched control proteome, so &ldquo;mesophilic range&rdquo; means &ldquo;against published reference
            ranges&rdquo;, not against a proteome we processed the same way.
          </p>
          <Callout tone="warn" label="A check that cannot fail">
            <p>
              An earlier version of this page offered a consistency argument here: that no candidate shows the
              contradictory signature of high pLDDT with a poor instability index, and that this supports the
              physicochemical predictions. <b>That argument is circular and we have withdrawn it.</b> Instability
              below 40 is an upstream filter, so every surviving candidate is under 40 by construction (the
              maximum in the final set is 39.65). The check had no way to fail. It is also why the dashed
              &ldquo;instability 40&rdquo; guide in Figure 2 has no data on its right-hand side, and why the
              stability dimension in <SecRef n="6">§06</SecRef> partly double-counts a threshold that was already applied before
              scoring.
            </p>
          </Callout>
        </Details>
      </>
    ),
  },

  {
    title: "§04 Conservation layer: and the claim it cost us",
    id: "s4",
    content: (
      <>
        <div className={styles.col}>
          <p>
            Conservation is the one axis that says something about biology rather than about handling. If a
            position has stayed the same across hundreds of divergent desert organisms, selection has been
            holding it there, and mutating it is likely to cost function.
          </p>
          <h4>How the statistic is built</h4>
          <p>
            Three steps, each with a reason. First, CD-HIT [<Cref n="4" />] collapses the family down to
            representatives at 90% identity. Its greedy incremental algorithm sorts sequences longest-first,
            makes the longest a cluster seed, and assigns each subsequent sequence to the first seed it matches
            above threshold, using short-word counting to skip most alignments outright. This step removes
            73&ndash;89% of the sequences in our families, and skipping it would be fatal: metagenomes oversample
            abundant organisms, so an unfiltered alignment measures who was abundant in the sand, not what
            selection preserved.
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

          <Callout tone="critical" label="Claim retracted">
            <p>
              Version 1 of this project reported <i>ibpAB</i> as the most conserved stress protein family at
              56&ndash;61%. That claim does not survive its own null model and has been withdrawn.
            </p>
          </Callout>

          <p>
            The failure is a statistical artefact, and any entropy-over-alignment pipeline is exposed to it.
            Column entropy depends on how many sequences went into the column. With 64 sequences you have 64
            chances to observe a substitution; with 226 you have 226. Real diversity that exists in both
            families will surface in the deep alignment and stay hidden in the shallow one, so the shallow
            family scores as more conserved for no biological reason at all. Our alignment depths range from 7
            to 230 sequences, roughly thirty-fold, which is more than enough to swamp the signal we were trying
            to measure.
          </p>
          <p>
            The fix is to compare families at equal depth. We subsample every family without replacement down to
            a common N (18 sequences for the enrichment set, 20 for the isolates, each set by the smallest
            usable family), recompute the statistic, and repeat 2,000 times to get a distribution rather than a
            point estimate. Sampling without replacement matters here: drawing duplicates would insert
            artificial agreement into a column and deflate its entropy.
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
                { label: "Raw (depth-confounded)", color: "var(--doc-faint)" },
                { label: "Depth-matched", color: "#0C8FBD" },
              ]}
            />
          }
        >
          <ConservationBars />
        </ChartPanel>
        <Caption n="Figure 3">
          <i>csp</i>&rsquo;s raw number was the most depressed of any family precisely because its alignment is
          the deepest we have (226 sequences); depth matching moves it from mid-pack to first and drops{" "}
          <i>ibpAB</i> to fourth of nineteen. <i>ibpAB</i> is still a genuinely conserved family and still holds
          the best predicted fold in the dataset at CA-pLDDT 98.6 &mdash; it is simply not the superlative.
        </Caption>

        <Details summary="Why the permutation test could not settle this">
          <p>
            Our first null model shuffles residues within alignment columns, preserving each column&rsquo;s
            amino-acid composition while destroying cross-column structure, and recomputes the statistic over
            1,000 permutations. Every family clears it at p &lt; 0.001, and 33 of the 37 testable rows saturate
            at the resolution floor with the null standard deviation rounding to zero.
          </p>
          <p>
            That is not the vindication it looks like. With twenty or more real, non-identical protein sequences,
            producing a near-unanimous column by chance under full row scrambling is combinatorially
            near-impossible, so <i>every</i> real alignment clears the bar regardless of how constrained the
            family actually is. The row-shuffle null is a valid <b>existence test</b> &mdash; &ldquo;this signal
            is not literal noise&rdquo; &mdash; and has <b>no resolving power for ranking families against each
            other</b>, which is exactly what the retracted claim needed. The matched-depth subsampling in Figure
            3 is the test that does have that power, and it is the one that overturned the result.
          </p>
          <p>
            One v1 conservation claim passed both tests unaltered, and it is the negative one: <i>relBE</i>{" "}
            really is the least conserved family we examined, last of nineteen in both datasets independently,
            though by a modest 2&ndash;10 point margin rather than a dramatic one.
          </p>
        </Details>
      </>
    ),
  },

  {
    title: "§05 Structure layer: calibrating what pLDDT means here",
    id: "s5",
    content: (
      <>
        <div className={styles.col}>
          <p>
            All 45 candidates were folded with ESMFold [<Cref n="7" />], 79 structures across both versions of
            the project, on the KAUST Ibex cluster.
          </p>
          <h4>Why a language model instead of AlphaFold</h4>
          <p>
            AlphaFold2 [<Cref n="8" />] builds its prediction from a multiple sequence alignment assembled by
            searching large sequence databases for homologs. ESMFold replaces that search with a protein
            language model, ESM-2, trained on unlabelled sequence; the evolutionary information AlphaFold reads
            out of an MSA is instead held in the model&rsquo;s internal representations, and a folding head reads
            structure directly from those. Lin and colleagues report accuracy somewhat below AlphaFold2 on
            well-covered proteins, in exchange for an order-of-magnitude speedup from dropping the search.
          </p>
          <p>
            That tradeoff suits our data. Many of these sequences come from uncultured desert organisms with few
            close relatives in public databases, so the MSA an AlphaFold run could assemble would be thin, and a
            thin MSA is where AlphaFold degrades. Running MSA-free removes a failure mode we would otherwise have
            had to characterise per candidate.
          </p>
          <h4>What the confidence number is</h4>
          <p>
            pLDDT is the model&rsquo;s predicted score on the lDDT-C&alpha; metric [<Cref n="9" />], which
            compares local interatomic distances between a model and a reference without superposing them. The
            network emits it per residue, on a 0&ndash;100 scale, and both AlphaFold and ESMFold write it into
            the B-factor column of the output PDB. We read the mean over C&alpha; atoms.
          </p>
          <Callout tone="warn" label="Method disambiguation">
            <p>
              Two pLDDT numbers exist for each of our proteins and they differ by roughly 13 points. The raw
              prediction tensor averages over all 37 atom slots per residue, most of which are padding for atoms
              a given residue does not have, which drags the mean down. The C&alpha; B-factor mean does not.{" "}
              <b>Every number on this page uses the C&alpha; method</b>, which is also the convention AlphaFold
              established [<Cref n="8" />]. We mention this because both numbers exist in our output files, and
              a reader comparing them without knowing which is which would find a contradiction that is not
              there.
            </p>
          </Callout>
          <h4>Calibration against solved structures</h4>
          <p>
            A confidence metric is only useful once you know what it predicts, and pLDDT bands published for
            AlphaFold do not automatically transfer to a different architecture on a different sequence
            distribution. So we ran the production pipeline, the same inference script and the same parser, on
            proteins whose structures have been solved, and measured C&alpha; RMSD against the deposited
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
                <Pill tone="good">Near-experimental</Pill>
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
                <Pill tone="good">Per-domain agreement</Pill>
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
          RecA is measured per domain because 1U94 captures a compressed helical filament form, so a whole-chain
          superposition would report inter-domain arrangement rather than fold accuracy. No structure has been
          solved for <i>E.&nbsp;coli</i> OtsB, so its RMSD runs against the <i>Salmonella</i> Typhimurium
          ortholog at 73.3% sequence identity; the 2.70&nbsp;Å figure therefore contains real evolutionary
          distance and is not pipeline error. All three support the <b>pLDDT &gt; 80</b> band the score uses.
        </Caption>

        <div className={styles.col}>
          <p>
            One detail from the CspA run is worth reporting. Only two residues came out below pLDDT 70, residues
            1 and 2, and residue 1 is the N-terminal methionine that gets cleaved post-translationally and is
            therefore absent from the crystallised construct. The model marked as uncertain precisely the region
            that does not exist in the real protein. We take that as grounds for reading a low-pLDDT terminus as
            a disorder signal rather than as a failed prediction, and it is why the flexible-region flags in our
            per-candidate output are worth looking at.
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
    title: "§06 The scoring rule: how we chose it, and what we locked",
    id: "s6",
    content: (
      <>
        <div className={styles.col}>
          <p className={styles.lede}>
            This section decides one thing and then stops deciding it. We compare candidate scoring rules
            against measured data once, here, and commit to a single rule. <b>Everything after this section
            uses that rule and no other.</b>
          </p>

          <h3>The six dimensions</h3>
          <p>
            Each dimension maps a raw measurement onto the interval [0, 1] through a step function, and the six
            sub-scores combine under a fixed weight vector.
          </p>
          <p>
            The step functions are not laziness. Each threshold is a published decision boundary: instability
            40 from Guruprasad [<Cref n="14" />], pLDDT 80 from the AlphaFold confidence bands [<Cref n="8" />]
            as re-checked against our own benchmark, and the tag-free pI windows from ion-exchange practice. A
            smooth interpolation between those points would imply we know the shape of the function between
            them, and we do not: S(x) = &Sigma; w<sub>d</sub> &middot; s<sub>d</sub>(x), where &Sigma; w
            <sub>d</sub> = 1.
          </p>
        </div>

        <DimensionTable />
        <Caption n="Table 4">The weight vector. It is set by hand, which is why the rest of this section exists.</Caption>

        <div className={styles.col}>
          <h3>Testing the weights against measured data</h3>
          <p>
            Hand-set weights are an assumption. We tested them without waiting for our own wet lab, by running
            the scoring rule over <b>eSOL</b> [<Cref n="31" />], which reports measured solubility for most of
            the <i>E.&nbsp;coli</i> proteome. Structure confidence came from AlphaFold DB [<Cref n="8" />]
            rather than our own ESMFold run, which the three benchmarks in <SecRef n="5">§05</SecRef> show agree
            to within 3 pLDDT points. The test covers the four dimensions carrying <b>80% of the weight</b>, on
            2,262 cytoplasmic proteins.
          </p>
          <p>
            The remaining 20% stays untested, and the reason is worth stating rather than hiding. Conservation
            and annotation do not exist to predict solubility; they exist to test whether the gene is real. A
            candidate can be perfectly soluble and still be a misannotated fragment, which is exactly the
            failure <SecRef n="7">§07</SecRef> caught four times. So <b>no solubility dataset can validate those
            two dimensions</b> &mdash; not eSOL, not a larger one. It is a mismatch of objective, not a gap we
            could have closed with more data. Testing them properly needs a set of genes with known-correct and
            known-wrong annotations, which we do not have.
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

        <div className={styles.col}>
          <Callout tone="critical" label="What the test found">
            <p>
              The score works, and it is beaten by the simplest possible alternative. Two causes, both
              measured. <b>The structure dimension carries 25% of the weight and is close to constant</b>:
              94.5% of these proteins clear pLDDT 80 and score 1.0, so the dimension separates almost nothing,
              and on its own it is slightly worse than chance. <b>The one dimension that does predict
              solubility, size, carries only 15%.</b> The rule dilutes its own best signal.
            </p>
          </Callout>

          <h3>Why we did not refit the weights</h3>
          <p>
            The obvious response is to reweight toward size. We tested that and rejected it, for a reason
            specific to metagenomic data.
          </p>
          <p>
            In eSOL every protein is a complete, real protein, so &ldquo;small&rdquo; means a small protein. In
            a metagenome assembly &ldquo;small&rdquo; often means <b>a gene broken by a contig break</b>. Across
            our candidates, molecular weight correlates with ORF completeness at &rho; = +0.144: the smaller a
            candidate, the likelier it is a fragment. Raising the size weight to 50% promotes a 6.0 kDa{" "}
            <i>uvrB</i> at <b>7% ORF completeness</b> and a 12.2 kDa <i>mutS</i> at <b>12%</b> into the top
            eight. A rule tuned on complete proteins rewards broken ones here.
          </p>
          <p>
            The second reason is that the score is not only a solubility predictor. Purifiability is in it for
            an economic reason, tag-free capture, which eSOL cannot evaluate at all; conservation and
            annotation are there to test whether the gene is real. Refitting everything to predict solubility
            would optimise a different objective from the one the rule exists to serve.
          </p>

          <h3>The locked rule</h3>
          <p>
            So the fix is not new weights. It is two <b>gates</b> applied before scoring, each derived from a
            failure the audits in <SecRef n="7">§07</SecRef> found, and each categorical rather than graded
            because the failures they catch are categorical.
          </p>
        </div>

        <ChartPanel
          title="Final scoring rule — used for every result on this page"
          sub="Two gates, then the unchanged six-dimension weighted score. No other rule appears after this section."
        >
          <Funnel steps={LOCKED_RULE_STEPS} scale="linear" />
        </ChartPanel>
        <Caption n="Figure 4">
          The gates reproduce by rule what <SecRef n="7">§07</SecRef> previously had to argue by hand. Gate 1
          removes every truncated <i>recA</i>, <i>mutS</i> and <i>uvr</i> call, leaving the four full-length{" "}
          <i>phrB</i> candidates as the DNA-repair set &mdash; which is exactly the manual recommendation the
          audit reached. Gate 2 removes the seven membrane subunits. The weights are untouched.
        </Caption>

        <div className={styles.col}>
          <Callout tone="good" label="What the locked rule changes, and what it does not">
            <p>
              <b>
                <i>cspC</i> remains the top candidate.
              </b>{" "}
              We re-ranked all 45 candidates under four different weightings, including the size-heavy one eSOL
              favours, and <i>cspC</i> is first under every one of them. The flagship does not depend on the
              weight choice.
            </p>
            <p>
              <b>The desiccation degeneracy survives every rule.</b> Those eight candidates have identical
              sub-scores on every dimension, so no reweighting and no gate separates them. They remain an
              unranked shortlist, and that is a property of the candidates rather than of the scoring.
            </p>
          </Callout>
          <p>
            Stability and structure together still carry half the weight. That is a deliberate choice with a
            consequence: the score is optimised for <i>expressibility</i>, not for biological novelty. A
            fascinating but aggregation-prone protein will rank below a boring, well-behaved one. That is
            correct for a rule whose output is a synthesis order, but it means the score should never be read
            as a measure of scientific interest.
          </p>
        </div>
      </>
    ),
  },

  {
    title: "§07 Breaking our own pipeline on purpose",
    id: "s7",
    content: (
      <>
        <div className={styles.col}>
          <p className={styles.lede}>
            Every threshold in the previous section was set by hand. That makes the ranking an assumption, and
            an assumption we had never tested. In July 2026 we ran twelve audits against our own candidate set,
            with the aim of finding out which of our results were artefacts. Several were.
          </p>
          <p>
            The audits ran in two rounds: seven adversarial checks, then five follow-ups closing the data gaps
            the first round exposed. By the end, 53 candidates had become 45, two headline claims were
            retracted, and one round-one verdict was itself overturned. What follows is the four tests that
            changed something; the full register is in the expandable table at the end of the section.
          </p>

          <h3>Test 1: does the ranking survive its own weights?</h3>
          <p>
            The question is whether the top candidate is a property of the data or a property of our weight
            choices. We attacked it two ways. First, one-at-a-time: perturb each of the six weights by
            &plusmn;10, &plusmn;20 and &plusmn;50%, rescale the remaining five to keep the vector summing to
            one, and re-rank. That is 36 runs per category, and it tells you which single dimension the ranking
            is most sensitive to.
          </p>
          <p>
            One-at-a-time perturbation misses interactions, though, so the second test samples the whole weight
            space at once. We draw 1,000 weight vectors from a Dirichlet distribution centred on the baseline.
            The Dirichlet is the natural choice because every draw from it is already a valid weight vector,
            non-negative and summing to one, so no rescaling step is needed and no corner of the simplex is
            unreachable. Its concentration parameter sets how far the draws stray from the baseline. For each
            draw we re-rank and record whether the original winner is still winning; the fraction that says yes
            is the P(Top-1) figure below.
          </p>
        </div>

        <ChartPanel
          title="P(Top-1 candidate survives weight perturbation)"
          sub="1,000 Dirichlet draws over the weight simplex. Bars are colour-coded by verdict and each also carries its verdict in text, so the colour is not the only signal."
          legend={
            <Legend
              items={[
                { label: "Trustworthy", color: "var(--doc-good)" },
                { label: "Fragile", color: "var(--doc-warn)" },
                { label: "Degenerate — number is meaningless", color: "var(--doc-critical)" },
              ]}
            />
          }
        >
          <SensitivityBars />
        </ChartPanel>
        <Caption n="Figure 5">
          Desiccation Resistance reaches P = 1.000 for the worst available reason. All eight of its candidates
          have identical sub-scores on every dimension, so no weight vector can separate them and the
          &ldquo;winner&rdquo; is whichever row happened to be listed first. The robustness number is perfect
          and carries no information.
        </Caption>

        <div className={styles.col}>
          <Callout tone="critical" label="Consequence">
            <p>
              The eight desiccation candidates are now presented as an <b>undifferentiated shortlist</b> rather
              than a ranked list. Anaerobic Respiration&rsquo;s top pick is reported as &ldquo;<i>narI</i> or
              the <i>frd</i> cluster&rdquo;, since it wins by 0.015 points and flips under four of the
              thirty-six single-weight perturbations.
            </p>
          </Callout>

          <h3>Test 2: are the genes actually complete?</h3>
          <p>
            Metagenome assembly breaks contigs wherever coverage runs out, and a gene caller will annotate
            whatever fragment sits on the broken contig with a confident family name. Nothing in the composite
            score notices. A 172-residue fragment of a 353-residue protein can score well on every dimension we
            measure, because a fragment of a stable protein is still stable-looking, and ESMFold will fold it
            confidently.
          </p>
          <p>
            So we added a dimension the score does not use but a reviewer would ask for: ORF completeness, the
            candidate&rsquo;s length as a percentage of the canonical full-length ortholog for its family, taken
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
          near full length. The <i>mutS</i>/<i>uvr</i>/<i>recA</i> spread is the DNA-repair fragmentation
          problem: 86% of that category&rsquo;s original candidates were truncated calls.
        </Caption>

        <div className={styles.col}>
          <h3>Test 3: does an independent method agree on gene identity?</h3>
          <p>
            Our two annotation tools reach a gene name by different routes. Bakta [<Cref n="1" />] assigns
            names by alignment-free matching against a curated protein database, optimised for speed and
            standardisation across a whole genome. eggNOG-mapper [<Cref n="2" />] places each sequence into a
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
              <td style={{ fontSize: 13.5 }}>eggNOG ortholog conflict; an unrelated SOS-response polymerase family</td>
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
                PFAM domains CarD_CdnL_TRCF, DEAD, Helicase_C and TRCF; a transcription-repair coupling factor
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
                InterProScan confirms a genuine GIY-YIG nuclease domain; the round-one regex screen was a false
                negative
              </td>
              <td><Pill tone="good">Restored</Pill></td>
            </tr>
          </tbody>
        </TableWrap>
        <Caption n="Table 6">
          The last row matters as much as the others. Round one screened for catalytic motifs with a regular
          expression, which called four <i>uvrC</i> candidates domain-negative. A proper InterProScan run found
          that three of those were false negatives, and that the fourth was truncated across a different
          C-terminal nuclease domain rather than missing one. Both round-one and round-two verdicts are shown,
          because an audit that only ever removes things has not been tested against itself.
        </Caption>

        <div className={styles.col}>
          <Callout tone="critical" label="The headline that broke">
            <p>
              Version 1 of this project named <b>DUF3494 as a novel bacterial ice-binding domain</b>, and it was
              the most quotable thing we had. It is gone. The sequence runs 1,349 aa against a family norm of
              150&ndash;300, has no independent eggNOG support at any evidence tier, and reads as a bacterial
              surface-adhesion repeat protein that happens to contain one DUF3494 domain hit. Calling that an
              antifreeze protein would have needed evidence we never had.
            </p>
          </Callout>

          <h3>Test 4: how good is the bin the gene came from?</h3>
          <p>
            This is the audit we should have run first. Most of these genes come from metagenome-assembled
            genomes, and a gene inherits the reliability of the bin it was called in. CheckM [<Cref n="11" />]
            estimates that reliability by looking for a set of marker genes expected to be present in single
            copy for the bin&rsquo;s lineage: the fraction found gives completeness, and markers found more than
            once give contamination. Extracting those numbers exposed the highest-risk candidate in the
            project, which was, at the time, our recommended DNA-repair pick.
          </p>

          <Callout tone="critical" label="Top pick withdrawn">
            <p>
              <code>OGEHGG_01321</code> (<i>recA</i>, composite 0.85) carries three independent problems at
              once. The ORF is <b>49% of full length</b>. Bakta flags it as a probable pseudogene. And its
              source bin is <b>33.7% CheckM-complete</b>, below even the 50% floor the MIMAG standard sets for
              calling a metagenome-assembled genome a low-quality draft [<Cref n="13" />]. The runner-up sits in
              a 48.6%-complete bin. Neither is usable as a headline result.
            </p>
            <p>
              <b>Replacement:</b> <i>phrB</i> (<code>MJNEPN_02265</code> and three siblings). All four are
              93&ndash;103% ORF-complete with clean bin quality, carry EC 4.1.99.3 as strong functional
              evidence, and fold at CA-pLDDT 88&ndash;92. The composite score is lower and the chance of it
              working is considerably higher. This is not a hand-picked exception: <SecRef n="6">Gate 1</SecRef>{" "}
              removes every truncated <i>recA</i>, <i>mutS</i> and <i>uvr</i> call on ORF completeness alone,
              and the four <i>phrB</i> candidates are simply what is left of the category once the rule runs.
            </p>
          </Callout>

          <h3>Test 5: what is the screen structurally unable to see?</h3>
          <p>
            The four tests above all ask whether a candidate is what we said it is. This one asks a different
            question: is there a property that decides whether a protein can be made at all, that our six
            dimensions have no way of representing? There is, and it disqualifies most of a category.
          </p>
          <Callout tone="critical" label="Blind spot found 2026-08-26 — integral membrane proteins">
            <p>
              <b>Seven of the eight Anaerobic Respiration candidates are polytopic integral membrane
              proteins.</b> <i>narI</i> is the membrane-embedded di-heme cytochrome <i>b</i> subunit of
              respiratory nitrate reductase; <i>frdC</i> and <i>frdD</i> are the membrane anchor subunits of
              fumarate reductase. Their GRAVY values run from <b>+0.49 to +1.04</b>, while every one of the
              other 37 candidates in the set is negative. Only <i>narJ</i>, a cytoplasmic molybdenum-cofactor
              assembly chaperone, is soluble.
            </p>
            <p>
              The screen scored them <b>0.71&ndash;0.81</b>, which ranks them above every <i>phrB</i>{" "}
              (0.515&ndash;0.62) and both <i>ibpA</i> candidates (0.605). In other words, after <i>cspC</i> the
              highest-scoring things this screen offers a wet lab are proteins that will not fold in a standard
              cytoplasmic expression host. GRAVY is computed for every candidate and then deliberately excluded
              from the score (<SecRef n="3">§03</SecRef>), so hydrophobicity carries exactly zero weight.
              Nothing else in the six dimensions correlates with membrane insertion: a membrane anchor is
              small, stable, confidently folded and well annotated, so it scores well on four dimensions at
              once.
            </p>
            <p>
              <b>Consequence.</b> This finding is what <SecRef n="6">Gate 2</SecRef> of the locked rule
              implements. Seven of the eight Anaerobic Respiration candidates do not pass it, so the category
              contributes one construct rather than eight. The sequences and annotations are real and stay in
              the published set; what changes is that they are no longer offered as targets for a first
              expression campaign. The gate is categorical rather than a seventh weighted dimension because the
              failure it catches is categorical, and <SecRef n="10">§10</SecRef> keeps it as a pre-registered
              prediction to be tested rather than a correction to be assumed.
            </p>
          </Callout>
        </div>

        <Details summary="Full audit register — all twelve tasks and their verdicts">
          <AuditTable />
          <p>
            Round one (A&ndash;G) audited evidence strength, ranking robustness, structure-pipeline accuracy,
            catalytic motifs, strain provenance, limitations, and the conservation null model. Round two
            (H&ndash;L) closed the data gaps round one exposed. Per-candidate QC covering EC/PFAM evidence tier,
            CheckM completeness and contamination, and pseudogene flags is compiled for all 53 candidates ever
            considered, including the eight that did not survive.
          </p>
        </Details>
      </>
    ),
  },

  {
    title: "§08 Candidate explorer",
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
    title: "§09 What the screen still cannot tell you",
    id: "s9",
    content: (
      <>
        <div className={styles.col}>
          <p>
            Four gaps remain open. Each needs new computation or new wet-lab work rather than better
            bookkeeping, so none of them will close on their own. We put them here rather than in a footnote
            because a reviewer will find them anyway.
          </p>
        </div>

        <CardGrid>
          <Card tag="Gap 1 · Taxonomy" title="Part of the assembly set never ran GTDB-Tk">
            Several long-read assembly batches carry Kraken2/NCBI taxonomy only. Fixing two mapping errors
            raised GTDB coverage from 49% to 61.3%, but the remaining batches need a fresh GTDB-Tk run before
            any phylogenetic-breadth claim can be said to cover them.
          </Card>
          <Card tag="Gap 2 · Bin quality" title="14 of the 45 have no CheckM data">
            Largely the same batches. Among the 31 that do have it, 10 fall below 90% completeness and 1
            exceeds 5% contamination. Counted across all 53 candidates ever considered, including the eight
            later removed, the figures are 17 without data, 11 below 90% and 2 over 5%. We can flag what we
            measured; we cannot vouch for what we did not.
          </Card>
          <Card tag="Gap 3 · Provenance" title="92% come from MAGs, not isolates">
            No physical strain exists for most candidates, and 21% rest on a single genome&rsquo;s evidence.{" "}
            <code>OGEHGG_01321</code> specifically needs re-assembly or PCR confirmation before anyone should
            trust it.
          </Card>
          <Card tag="Gap 4 · Function" title="Nothing here has been expressed">
            Every number on this page is a prediction. Stability, fold and purifiability are modelled and not
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
              all 16 candidates land within 90&ndash;111% of reference full length, and all 16 carry genuine
              EC-number evidence. Four <i>cspC</i> and four <i>phrB</i> candidates are clean on every axis we
              tested, including fold confidence.
            </p>
            <p>
              Two candidates that earlier drafts of this page called clean are not, and we would rather say so
              than let the label stand. The two full-length <i>ibpA</i> candidates are ORF-complete but fold at
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
    title: "§10 Experimental design: making the screen falsifiable",
    id: "s10",
    content: (
      <>
        <div className={styles.col}>
          <p className={styles.lede}>
            A screen that is never measured against an outcome stays a heuristic forever. The design below
            exists to end that. Its first purpose is not to characterise three interesting proteins; it is to
            produce <b>a measured outcome for enough candidates that the screen acquires a residual</b>, and
            only then to go deep on the ones that survive.
          </p>
          <p>
            Everything here is scoped to what a team with one FPLC, a plate reader and a summer can actually
            run. The expensive part is cloning 22 constructs once.
          </p>

          <h3>Tier 1 &mdash; Calibration set: 19 candidates, one plate</h3>
          <p>
            The 19 constructs are exactly the output of the locked rule in <SecRef n="6">§06</SecRef>: 45
            candidates, 26 through Gate 1, 19 through Gate 2. No separate selection was made for this
            experiment. Those 19 are the calibration set. They span the screen&rsquo;s full predicted range,
            from 0.515 to 0.940, which is what makes a correlation meaningful; testing only the top three would
            give three points at one end of the axis and no way to detect that the ranking is wrong.
          </p>
          <p>
            Small-scale autoinduction in <i>E.&nbsp;coli</i> BL21(DE3), 96-deep-well format, triplicate. Three
            readouts, each chosen because it maps onto a dimension the screen actually scored:
          </p>
          <ul>
            <li>
              <b>Soluble fraction</b> (soluble &divide; total by SDS-PAGE densitometry) tests the screen as a
              whole, and is the primary outcome variable.
            </li>
            <li>
              <b>T<sub>m</sub> by thermal shift</b> tests the <i>stability</i> dimension against the instability
              index directly. This is the one dimension carrying 25% of the weight whose input was fitted on
              1990-era data.
            </li>
            <li>
              <b>Single-step ion-exchange purity</b> (&gt;90% by gel, no affinity tag) tests the{" "}
              <i>purifiability</i> dimension. 16 of the 19 are predicted tag-free; the 3 <i>phrB</i> candidates
              with pI 6.4&ndash;7.3 are predicted to need a tag, and are the internal negative control for this
              readout.
            </li>
          </ul>
          <p>
            <b>Analysis.</b> Spearman &rho; between composite score and soluble yield; AUROC for the binary
            &ldquo;expressed solubly at all&rdquo;; and per-dimension partial correlations to find which of the
            six dimensions carries the signal and which are dead weight. Two baselines must be reported
            alongside, or the result means nothing: <b>pLDDT alone</b> and <b>instability alone</b>. If the
            composite does not beat both, the composite is not earning its complexity and we say so.
          </p>

          <Callout label="Control A · the degeneracy probe — built in, costs nothing extra">
            <p>
              Eight of the 19 are the Desiccation Resistance set, and all eight score <b>exactly 0.750</b> on
              every dimension (<SecRef n="7">§07</SecRef>). The screen cannot distinguish them even in
              principle. Any spread in their measured outcomes is therefore <b>variance the screen cannot
              explain</b>, measured directly. That number is the noise floor against which the Tier-1
              correlation has to be judged: if the eight identical-score candidates vary as much as the full
              0.515&ndash;0.940 range does, the ranking carries no information and no refit will save it.
            </p>
          </Callout>

          <Callout tone="critical" label="Control B · pre-registered negative prediction — declare before running">
            <p>
              The seven membrane candidates found in <SecRef n="7">§07</SecRef> score 0.71&ndash;0.81, above
              every <i>phrB</i> and both <i>ibpA</i>. <b>We predict, in advance, that all seven fail soluble
              cytoplasmic expression.</b> They are cloned and run in the same plate under the same protocol.
            </p>
            <p>
              Writing the prediction down before the experiment is the whole point. If they fail, the screen has
              a demonstrated, quantified blind spot and a hydrophobicity gate is a justified fix rather than a
              hunch. If they express, our reading of the annotation was wrong and the screen was right, which
              we would also have to report. Either way this converts an argument into a result, and it costs
              seven extra wells.
            </p>
          </Callout>
        </div>

        <Tier1Table />
        <Caption n="Table 8">
          The 19-construct calibration set, ordered by predicted score. The four <i>cspC</i> at 0.940 and the
          three tagged <i>phrB</i> at 0.515 anchor the two ends of the axis; the eight at 0.750 are Control A.
          Seven membrane constructs (Control B) and three <i>E.&nbsp;coli</i> reference orthologs are cloned
          alongside, giving 29 constructs in total.
        </Caption>

        <div className={styles.col}>
          <h3>Tier 2 &mdash; Functional characterisation, head to head</h3>
          <p>
            Only after Tier 1 reports do three candidates go forward for function, and the choice depends on
            what Tier 1 says. The design principle is that <b>every functional assay is run against the{" "}
            <i>E.&nbsp;coli</i> ortholog purified by the same protocol on the same day</b>. Without that paired
            reference, &ldquo;our desert variant is stable&rdquo; is a number with nothing to compare it to, and
            the project&rsquo;s entire premise &mdash; that desert variants outperform textbook ones &mdash;
            stays untested.
          </p>
        </div>

        <div className={styles.t2grid}>
          <div className={styles.t2card}>
            <div style={{ marginBottom: 12 }}>
              <Pill tone="good">First</Pill>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Candidate</span>
              <div className={styles.t2v}>
                <span className={styles.gene}>cspC</span>
                <br />
                <span className={styles.locus}>EJIGFF_03899</span>
                <div className={styles.sub}>
                  Instability &minus;1.8, pI 9.1, the only cation-exchange candidate in the set. Sibling{" "}
                  <code>FCEEAA_04582</code> as backup.
                </div>
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Paired reference</span>
              <div className={styles.t2v}>
                <i>E. coli</i> CspA
                <br />
                <span className={styles.locus}>P0A9X9 · 56.7% identity</span>
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Read-out</span>
              <div className={styles.t2v}>
                T<sub>m</sub> by differential scanning fluorimetry [<Cref n="29" />]; nucleic-acid melting
                activity on a fluorescent beacon substrate [<Cref n="23" />]; growth rescue of the
                cold-sensitive quadruple <i>csp</i> deletion strain BX04 at 15&ndash;25&deg;C [<Cref n="22" />]
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Decision rule</span>
              <div className={styles.t2v}>
                Desert variant must match or beat CspA on T<sub>m</sub> <i>and</i> rescue cold growth. Rescue
                without a T<sub>m</sub> gain still counts as a working part; a T<sub>m</sub> gain without
                rescue means we improved stability and broke function.
              </div>
            </div>
          </div>

          <div className={styles.t2card}>
            <div style={{ marginBottom: 12 }}>
              <Pill tone="good">Second</Pill>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Candidate</span>
              <div className={styles.t2v}>
                <span className={styles.gene}>phrB</span>
                <br />
                <span className={styles.locus}>MJNEPN_02265</span>
                <div className={styles.sub}>
                  Replaces the withdrawn <i>recA</i> pick. 93% ORF-complete, EC 4.1.99.3, clean bin.
                </div>
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Paired reference</span>
              <div className={styles.t2v}>
                <i>E. coli</i> Phr
                <br />
                <span className={styles.locus}>P00914 · gene phr</span>
                <div className={styles.sub}>
                  Our candidates are annotated <i>phrB</i> by Bakta; the <i>E.&nbsp;coli</i> locus is{" "}
                  <i>phr</i>. PhrB names a different protein in other genera.
                </div>
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Read-out</span>
              <div className={styles.t2v}>
                Photoreactivation of UV-damaged DNA: survival of a <i>phr</i>-deficient host after UV-C, with
                photoreactivating light versus a dark control [<Cref n="24" />]. Strain: Keio &Delta;<i>phr</i>{" "}
                JW0698 [<Cref n="30" />]
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Decision rule</span>
              <div className={styles.t2v}>
                The dark control is the experiment. Survival must rise with light and not without it; a
                light-independent gain is a UV-tolerance artefact, not photolyase activity.
              </div>
            </div>
          </div>

          <div className={styles.t2card}>
            <div style={{ marginBottom: 12 }}>
              <Pill tone="neutral">Third</Pill>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Candidate</span>
              <div className={styles.t2v}>
                <span className={styles.gene}>otsB / ectA</span>
                <br />
                <span className={styles.locus}>8-candidate shortlist</span>
                <div className={styles.sub}>
                  Best predicted folds (CA-pLDDT 83&ndash;96), on-thesis for arid-land use. Present as a
                  shortlist: the ranking inside it is degenerate.
                </div>
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Paired reference</span>
              <div className={styles.t2v}>
                <i>E. coli</i> OtsB
                <br />
                <span className={styles.locus}>P31678</span>
                <div className={styles.warnSub}>
                  No <i>E. coli</i> reference exists for <i>ectA</i>: K-12 has no ectoine pathway, which we
                  confirmed against UniProt. <i>Halomonas elongata</i> EctA [<Cref n="27" />] is the reference
                  to source instead.
                </div>
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Read-out</span>
              <div className={styles.t2v}>
                Malachite-green phosphate release from trehalose-6-phosphate, EC 3.1.3.12 (<i>otsB</i>) [
                <Cref n="25" />]; DTNB detection of CoA release, EC 2.3.1.178 (<i>ectA</i>) [<Cref n="28" />];
                specific activity per mg. Optional osmotic-rescue of Keio &Delta;<i>otsB</i> JW1886 [
                <Cref n="26" />, <Cref n="30" />]
              </div>
            </div>
            <div className={styles.t2f}>
              <span className={styles.t2l}>Decision rule</span>
              <div className={styles.t2v}>
                This arm exists to break the 0.750 tie. Whatever the activities are, the spread across eight
                identically-scored candidates is the number we report back to <SecRef n="6">§06</SecRef>.
              </div>
            </div>
          </div>
        </div>
        <Caption n="Figure 7">
          Ordered by confidence rather than by composite score: <i>otsB</i> outscores the others in its arm and
          still ranks third, because <SecRef n="7">§07</SecRef> showed that rank carries no information. The
          decision rules are written before the experiments deliberately, so that a result which contradicts
          our expectation is still interpretable rather than negotiable afterwards.
        </Caption>

        <div className={styles.col}>
          <Callout tone="critical" label="Sourcing risk that decides the timeline">
            <p>
              The genetic assays depend on deletion strains, and they are not equally easy to get. The{" "}
              <i>phr</i> and <i>otsB</i> arms are safe: <b>Keio JW0698</b> (&Delta;<i>phr</i>) and{" "}
              <b>JW1886</b> (&Delta;<i>otsB</i>) are catalogue strains that ship on request [<Cref n="30" />].
            </p>
            <p>
              <b>
                The <i>cspC</i> arm is the problem.
              </b>{" "}
              BX04, the quadruple &Delta;<i>cspA</i>&Delta;<i>cspB</i>&Delta;<i>cspE</i>&Delta;<i>cspG</i>{" "}
              strain that makes cold-growth rescue interpretable, is a lab strain with <b>no catalogue entry</b>{" "}
              at ATCC, CGSC or Addgene, and <b>no orderable equivalent exists</b>. It has to be requested from
              the originating lab or from a group that has published with it, and that request has a lead time
              we do not control. Since <i>cspC</i> is our flagship candidate, this single logistics item is the
              most likely reason the strongest arm of this design does not run.
            </p>
            <p>
              <b>Mitigation:</b> start the strain request now, and treat the <i>in vitro</i> readouts (T
              <sub>m</sub> and beacon melting) as the fallback for <i>cspC</i>. They test biophysics without
              testing physiology, which is weaker but not nothing. The same applies to <i>phr</i>: the
              orderable Keio strain is <i>uvrA</i><sup>+</sup>, so nucleotide excision repair will compress the
              light-versus-dark window that the assay depends on. Published work uses a <i>phr uvrA</i> double
              mutant for exactly that reason, and that strain is also lab-request only.
            </p>
          </Callout>

          <Callout tone="warn" label="Two conditions that will silently ruin a result">
            <p>
              <b>Glycine betaine masks the <i>otsB</i> phenotype.</b> The osmotic-sensitivity of <i>ots</i>{" "}
              mutants is rescued by exogenous betaine [<Cref n="26" />], so the complementation has to be
              scored on glucose minimal medium with high NaCl and <b>no betaine</b>. Rich medium will give a
              clean negative result that means nothing.
            </p>
            <p>
              <b>SYPRO Orange cannot be used with detergent.</b> If Control B&rsquo;s membrane constructs are
              ever followed up in detergent or a membrane mimetic, the dye-based thermal shift assay does not
              transfer; label-free nanoDSF is the alternative, and it needs the protein to contain tryptophan.
            </p>
          </Callout>

          <h3>What a wet-lab result feeds back</h3>
          <p>
            The screen has one calibration parameter it cannot set from sequence data: the weight vector in{" "}
            <SecRef n="6">§06</SecRef>. Every threshold in it comes from literature defaults, and{" "}
            <SecRef n="7">§07</SecRef> showed at least one category&rsquo;s ranking is sensitive to those
            defaults at the &plusmn;20% level. Tier 1 is designed to end that. With 19 measured outcomes we can
            fit the weights instead of asserting them, and report a residual.
          </p>
          <p>
            Three specific things change depending on what comes back, and we would rather commit to them now
            than decide afterwards:
          </p>
          <ol className={styles.col}>
            <li>
              <b>If the composite beats both single-dimension baselines</b>, the weights get refitted on the
              measured data and the screen stops being a heuristic. We report the fitted weights next to the
              hand-set ones so the difference is visible.
            </li>
            <li>
              <b>If it does not beat pLDDT alone</b>, we drop dimensions until the simpler model wins, and say
              plainly that five of the six were decoration. A screen that was falsified and then reduced is
              more useful to the next team than one that was never tested.
            </li>
            <li>
              <b>If Control B&rsquo;s membrane constructs fail as predicted</b>, a hydrophobicity gate goes in
              ahead of scoring rather than as a seventh weighted dimension, because the failure is categorical
              rather than graded. If they express, the gate does not go in and we retract{" "}
              <SecRef n="7">§07</SecRef>&rsquo;s Test 5.
            </li>
          </ol>
          <p>
            Control A is the reason the desiccation shortlist is worth running even though the screen cannot
            rank it. Eight candidates with identical predicted properties and different measured outcomes would
            tell us how much of the outcome the six dimensions never had access to, which is the one number
            that says whether refitting is worth doing at all.
          </p>
        </div>
      </>
    ),
  },

  {
    title: "§11 Contribution, and where the samples came from",
    id: "s11",
    content: (
      <>
        <div className={styles.col}>
          <p className={styles.lede}>
            A candidate list is a weak contribution. Any team with a cluster can produce one, it is stale the
            moment the databases move, and nobody can tell from the list which entries to distrust. The three
            things below are what we think are actually worth handing on.
          </p>

          <h3>1. A candidate set that carries its own doubts</h3>
          <p>
            The 45 candidates ship with the flags rather than without them: ORF completeness against the
            canonical ortholog, source-bin CheckM completeness and contamination, pseudogene calls,
            annotation-conflict status, and EC/PFAM evidence tier. All 53 candidates ever considered are
            included, the eight excluded ones among them, with the reason each was cut. A team reusing this can
            see at a glance that <i>phrB</i> is orderable and that the highest-scoring <i>recA</i> is a fragment
            in a 33.7%-complete bin, which the score alone would never tell them.
          </p>

          <h3>2. A checklist for auditing your own dry lab</h3>
          <p>
            This is the part we would most want another team to take. Each row below is a check that found a
            real error in our own output, is cheap to run, and is not specific to desert metagenomes or to
            stress proteins. Most iGEM dry-lab projects produce a ranked list and stop; none of these checks
            requires anything beyond what such a project already has.
          </p>
        </div>

        <ChecklistTable />
        <Caption n="Table 9">
          Every row cost us something: three of the six invalidated a result we had already published in an
          earlier report. That is the argument for running them <i>before</i> the wiki freeze rather than
          after.
        </Caption>

        <div className={styles.col}>
          <h3>3. Negative results, stated so others can avoid them</h3>
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
          <p>
            We state this prominently because it changes how the work should be judged. Credit for the sampling
            campaign and the assemblies belongs to the survey; what is ours to defend is the screening
            pipeline, the QC-flagged candidate set, and <SecRef n="7">§07</SecRef>.
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
        <Caption n="Table 10">
          Reported as it currently stands rather than as we intend it to stand. The survey&rsquo;s data
          repository is publicly readable, but its own documentation describes it as a <b>staging snapshot
          rather than a published release</b>, with a version freeze, per-file licences and a Zenodo DOI still
          pending. Development project identifiers exist in that tree; the survey states they are <b>not yet
          evidence that every sample and run is publicly retrievable</b>. We therefore cite the repository and
          the portal, and deliberately quote no DOI, no accession and no licence for the underlying reads until
          the survey deposits them. Claiming availability we cannot demonstrate would be worse than reporting
          the gap. Three rows are still red, and until they are green this pipeline is <b>not reproducible by
          anyone outside the team</b>, which for a dry-lab project is a real limitation and not a formality.
        </Caption>

        <div className={styles.col}>
          <Callout tone="warn" label="Every number on this page is recomputable">
            <p>
              Two scripts regenerate every derived figure on this page from the released tables and print the
              page value beside the recomputed one: one covers the candidate set, the QC denominators, the gate
              outputs, the reranking checks and the AlphaFold-versus-ESMFold offset (24 figures); the other
              regenerates the eSOL validation table. A provenance index maps every block on the page to the
              file it comes from, and states the three things that <i>cannot</i> be recomputed here: the
              survey&rsquo;s raw reads, which are staged publicly but not yet deposited as a citable release;
              the aliphatic-index values behind <SecRef n="3">§03</SecRef>&rsquo;s negative result; and the 20%
              of the weight eSOL could not test.
            </p>
          </Callout>
          <Callout tone="warn" label="What still has to happen before this counts as a contribution">
            <p>
              An honest availability section is not the same as an available dataset. To make this usable by
              another team we still owe: an <b>OSI licence</b> on the code, an archived <b>DOI</b> for the
              candidate tables and QC supplement, an <b>environment specification</b> so versions are pinned,
              and a <b>parameters table</b> covering every threshold, random seed, resampling N and the
              Dirichlet concentration parameter. Five of the nine tools in <SecRef n="2">Table 2</SecRef>{" "}
              currently show no recorded version, and no database release versions are recorded at all, which
              means the GTDB coverage figure in <SecRef n="9">§09</SecRef> is not reproducible even in
              principle.
            </p>
          </Callout>
        </div>
      </>
    ),
  },

  {
    title: "§12 References",
    id: "s12",
    content: (
      <>
        <div className={styles.col}>
          <p>
            Software citations are grouped first, then the methods and metrics the score is built from, then
            the structures used to calibrate it. Databases are cited separately from the tools that query them.
          </p>
        </div>
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
        <SectionedArticle title={pageTitle} intro={pageIntro} sections={sections} defaultSelected={sections[0]?.title} />
      </div>
    </PageWrapper>
  );
}
