import { useRef } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/dry-lab-overview.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ChartSlots from "./components/ChartSlots";
import { TooltipProvider } from "./components/Tooltip";
import CHARTS from "./components/charts";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

export default function DryLabOverview() {
  const containerRef = useRef(null);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <TooltipProvider>
        <div ref={containerRef}>
          <SectionedArticle title="Dry Lab Overview" sections={sections} defaultSelected={sections[0]?.title} />
        </div>
        <ChartSlots containerRef={containerRef} charts={CHARTS} />
      </TooltipProvider>
    </PageWrapper>
  );
}
