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
  "yeast-pichia-pastoris": ["Yeast", "Pichia pastoris"],
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
      // Introduction from DRAFT_WIKI_OCTOBER-1.pdf.
      deck={
        <>
          We modeled three organisms to help decide which host SHIHAB should use for protein production and what to feed it. We evaluated growth under oxygen restriction to see whether protein production could be adapted to a closed habitat with limited oxygen supply. Under these conditions, <b><em>Bacillus subtilis</em> is predicted to out-produce yeast roughly threefold</b> as long as nitrate is supplied and loses under half of its growth capacity, whereas yeast loses 80%. A cyanobacterial partner could supply both the sugar and the oxygen that would make either host viable.
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
    <p>We focused on determining if the biologics can be manufactured on demand inside a closed,
resource limited habitat. We built our models considering the different constraints that space
travel will impose: oxygen, sugar and nitrogen limitation.</p>
    <p>This leads to three questions: Which host is best? What and how should it be fed? When is the
optimal time to switch production on? We built one genome-scale metabolic model (GEM) per organism
to answer the first two, and a dynamic layer of ordinary differential equations (ODEs) to answer
the third question, because flux balance analysis (FBA) assumes a steady state and cannot answer a
timing question.</p>
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
            title="Metabolic Model"
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
