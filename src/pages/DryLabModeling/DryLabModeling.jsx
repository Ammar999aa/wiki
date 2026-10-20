import { useRef } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import rawSections from "../../content/en/dry-lab-modeling.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ChartSlots from "./components/ChartSlots";
import { TooltipProvider } from "../../components/Tooltip/Tooltip";
import CHARTS from "./components/charts";
import ResultScheme from "./components/ResultScheme";
import styles from "./DryLabModeling.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Keep plain section titles for navigation state and IDs; format only the label:
// the section name on the first line, the organism in italics on its own line.
const titleLabels = {
  "yeast-saccharomyces-cerevisiae": ["Yeast", "Saccharomyces cerevisiae"],
  "bacteria-bacillus-subtilis": ["Bacteria", "Bacillus subtilis"],
  // Optional third item: strain text set after the italic species name.
  "cyanobacteria-synechococcus-elongatus-pcc-7942": ["Cyanobacteria", "Synechococcus elongatus", " PCC\u00A07942"],
};

// Only the organism chips above each subsection heading are tinted:
// yeast purple, Bacillus yellow, Synechococcus blue.
const chipClasses = [
  [/<span class="chip">(<em>S\. cerevisiae<\/em>)<\/span>/g, styles.chipYeast],
  [/<span class="chip">(<em>B\. subtilis<\/em>)<\/span>/g, styles.chipBacillus],
  [/<span class="chip">(<em>S\. elongatus<\/em>)<\/span>/g, styles.chipCyano],
];

const tintChips = (html) =>
  chipClasses.reduce((out, [re, cls]) => out.replace(re, `<span class="chip ${cls}">$1</span>`), html);

const sections = rawSections.map((raw) => {
  const section = typeof raw.html === "string" ? { ...raw, html: tintChips(raw.html) } : raw;
  const label = titleLabels[section.id];
  if (!label) return section;
  const [name, organism, strain] = label;
  return {
    ...section,
    titleContent: (
      <>
        {name}
        <span className={styles.titleOrganism}>
          <em>{organism}</em>
          {strain}
        </span>
      </>
    ),
  };
});

// Eyebrow is the revised Model page's own ("Dry Lab · Model · …"). It no
// longer echoes the nav label ("Overview") — see the UI/UX audit finding
// on titles not confirming the nav label. The "Try me" scheme sits under
// the masthead, as it does in that page.
const pageIntro = (
  <>
    <Masthead
      eyebrow={["Dry Lab", "Model", "Flux balance analysis", "Dynamic modelling"]}
      // Introduction copied from the supplied model-page-drylab (3).html.
      deck={
        <>
          We modelled three organisms to decide where SHIHAB should build its nanobody and what to feed it. Under the oxygen restriction that defines a closed habitat, <b><em>Bacillus subtilis</em> out-produces yeast roughly threefold</b> provided nitrate is supplied and loses under half of its capacity, whereas yeast loses four fifths. A cyanobacterial partner supplies both the sugar and the oxygen that make either host viable.
        </>
      }
      stats={[
        { value: "3.4×", label: "Bacillus nanobody flux over yeast, anaerobic (nitrate supplied)", hi: true },
        { value: "−46% vs −82%", label: "capacity lost without oxygen, Bacillus vs yeast", hi: true },
        { value: "13×", label: "yeast growth with a cyanobacterial partner" },
        { value: "2", label: "reactions added to repair iBsu1147" },
      ]}
    />
    <ResultScheme />
    <p>SHIHAB asks whether a nanobody can be manufactured on demand inside a closed, resource-limited
habitat rather than shipped there pre-made. The habitat imposes three limits: oxygen cannot be
assumed abundant, glucose cannot be shipped indefinitely, and nitrogen must be recovered in a
closed loop.</p>
    <p>Three decisions needed answers that the experiment could not give us: which host to build in,
what and how to feed it, and when to switch production on. We built one genome-scale metabolic
model (GEM) per organism to answer the first two, and a dynamic layer of ordinary differential
equations (ODEs) to answer the third, because flux balance analysis (FBA) assumes a steady state
and cannot answer a timing question.</p>
  </>
);

export default function DryLabModeling() {
  const containerRef = useRef(null);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      {/* Kept at this level (SectionedArticle.jsx also wraps its own Article
          in the shared TooltipProvider) because ChartSlots renders its
          charts into portalled slots alongside the article, not inside it —
          they need a provider that's an ancestor of both. */}
      <TooltipProvider>
        <div ref={containerRef} className={styles.page}>
          <SectionedArticle
            title="Model"
            intro={pageIntro}
            sections={sections}
            defaultSelected={sections[0]?.title}
            numbered
          />
        </div>
        <ChartSlots containerRef={containerRef} charts={CHARTS} />
      </TooltipProvider>
    </PageWrapper>
  );
}
