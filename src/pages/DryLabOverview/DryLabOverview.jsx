import { useRef } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/dry-lab-overview.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ChartSlots from "./components/ChartSlots";
import { TooltipProvider } from "../../components/Tooltip/Tooltip";
import CHARTS from "./components/charts";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Dry Lab" dropdown → "Overview") the
// reader clicked — see the UI/UX audit finding on titles not confirming
// the nav label.
const pageIntro = (
  <Masthead
    eyebrow={["Dry Lab", "Overview", "Flux balance analysis", "Dynamic modelling"]}
    // Deck and stats are the team's own wording/numbers from the Dry Lab
    // write-up (src/assets/main.html); every stat is restated, sourced, in
    // the page body (Tables 2, 3, 5 and the gap-filling section).
    deck={
      <>
        We modelled three organisms to decide where SHIHAB should build its nanobody and what to feed it.{" "}
        <b>
          The conventional choice is the wrong one: under the oxygen restriction that defines a closed habitat,{" "}
          <i>Bacillus subtilis</i> out-produces yeast roughly fivefold and loses only a quarter of its capacity,
          where yeast loses four fifths.
        </b>{" "}
        A cyanobacterial partner supplies both the sugar and the oxygen that make either host viable.
      </>
    }
    stats={[
      { value: "5.5×", label: "Bacillus nanobody flux over yeast, aerobic", hi: true },
      { value: "−27% vs −80%", label: "Capacity lost without oxygen, Bacillus vs yeast", hi: true },
      { value: "13×", label: "Yeast growth with a cyanobacterial partner" },
      { value: "2", label: "Reactions added to repair iBsu1147" },
    ]}
  />
);

export default function DryLabOverview() {
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
            title="Dry Lab Overview"
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
