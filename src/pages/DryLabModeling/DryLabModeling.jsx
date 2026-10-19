import { useRef } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/dry-lab-modeling.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ChartSlots from "./components/ChartSlots";
import { TooltipProvider } from "../../components/Tooltip/Tooltip";
import CHARTS from "./components/charts";
import ResultScheme from "./components/ResultScheme";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow is the revised Model page's own ("Dry Lab · Model · …"). It no
// longer echoes the nav label ("Overview") — see the UI/UX audit finding
// on titles not confirming the nav label. The "Try me" scheme sits under
// the masthead, as it does in that page.
const pageIntro = (
  <>
    <Masthead
      eyebrow={["Dry Lab", "Model", "Flux balance analysis", "Dynamic modeling"]}
      // Deck and stats are the team's own wording/numbers from the revised
      // Model page (src/assets/model-page-drylab2.html); every stat is
      // restated, sourced, in the page body (the Bacillus and yeast nanobody
      // tables, the partner-supply table and the gap-filling section).
      deck={
        <>
          We modeled three organisms to decide where SHIHAB should build its nanobody and what to feed it. We
          found surprising results: under the oxygen restriction that defines a closed habitat,{" "}
          <b>
            <i>Bacillus subtilis</i> out produces yeast roughly threefold
          </b>{" "}
          provided nitrate is supplied. Also, we included a possible cyanobacterial partner to test if it can
          supply both the sugar and the oxygen as co-culture.
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
        <div ref={containerRef}>
          <SectionedArticle
            title="Modeling"
            intro={pageIntro}
            sections={sections}
            defaultSelected={sections[0]?.title}
          />
        </div>
        <ChartSlots containerRef={containerRef} charts={CHARTS} />
      </TooltipProvider>
    </PageWrapper>
  );
}
