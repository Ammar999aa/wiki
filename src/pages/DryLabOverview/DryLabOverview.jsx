import { useRef } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/dry-lab-overview.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ChartSlots from "./components/ChartSlots";
import { TooltipProvider } from "./components/Tooltip";
import CHARTS from "./components/charts";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Dry Lab" dropdown → "Overview") the
// reader clicked — see the UI/UX audit finding on titles not confirming
// the nav label.
const pageIntro = (
  <Masthead
    eyebrow={["Dry Lab", "Overview"]}
    // TODO(humanize): AI-drafted deck sentence, paraphrased from this
    // page's own "The problem" section rather than copied verbatim —
    // needs a human rewrite before this page is final. See
    // .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        Can a nanobody be manufactured <b>on demand</b> inside a closed, resource-limited habitat instead of
        shipped there pre-made? This page covers the problem a Mars-analog life-support loop poses, and the
        modeling approach built to answer it.
      </>
    }
  />
);

export default function DryLabOverview() {
  const containerRef = useRef(null);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
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
