import { Fragment } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import rawSections from "../../content/en/hardware.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import BulbHero from "./BulbHero";
import BioreactorModel from "./BioreactorModel";
import BioreactorDashboard from "./components/BioreactorDashboard";
import WorkflowDiagram from "./components/WorkflowDiagram";
import { GrowthChart, PhChart, TempChart } from "./components/ValidationCharts";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Real React components (the 3D model, the dashboard simulation, the charts)
// can't be written in markdown, but they belong mid-section, between
// paragraphs and captions that do live in hardware.md. So hardware.md marks
// each one's spot with an empty `<div data-slot="name"></div>`, and the
// section's HTML is split at those markers here, with the matching component
// rendered in between. Everything else on the page, captions included, stays
// in hardware.md where it can be edited as plain text.
const SLOTS = {
  workflow: WorkflowDiagram,
  dashboard: BioreactorDashboard,
  model: BioreactorModel,
  "temp-chart": TempChart,
  "ph-chart": PhChart,
  "growth-chart": GrowthChart,
};
const SLOT_RE = /<div data-slot="([\w-]+)"><\/div>\n?/;

function withSlots(section) {
  if (!SLOT_RE.test(section.html)) return section;
  // split() with a capture group alternates [html, slotName, html, slotName, html, ...]
  const parts = section.html.split(new RegExp(SLOT_RE.source, "g"));
  const content = parts.map((part, i) => {
    if (i % 2 === 0)
      return part.trim() ? (
        <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
      ) : null;
    const Slot = SLOTS[part];
    if (!Slot) throw new Error(`hardware.md: unknown data-slot "${part}"`);
    return <Slot key={i} />;
  });
  return { ...section, html: null, content: <Fragment>{content}</Fragment> };
}

const sections = rawSections.map(withSlots);

export default function Hardware() {
  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        gradient,
      }}
    >
      <SectionedArticle
        title="Hardware"
        intro={<BulbHero />}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
