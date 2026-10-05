import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import rawSections from "../../content/en/human-integrated-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import QuestionMap from "./components/QuestionMap";
import OrbitTimeline from "./components/OrbitTimeline";
import JigsawTable from "./components/JigsawTable";
import ValuesCards from "./components/ValuesCards";
import GlanceGrid from "./components/GlanceGrid";
import { stakeholderGroups } from "./data.js";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

const jigsawItems = stakeholderGroups.map((g) => ({ title: g.name, learn: g.learn, influence: g.influence }));

// Rendered after each section's markdown, keyed by section title.
const CONTENT_BY_TITLE = {
  "Our IHP Journey at a Glance": <GlanceGrid />,
  "Understanding Our Impact and Responsibility": <QuestionMap />,
  "Our Values": <ValuesCards />,
  "Our ORBIT Framework": <OrbitTimeline />,
  "Defining Our Stakeholders": <JigsawTable items={jigsawItems} />,
};

const sections = rawSections.map((section) =>
  CONTENT_BY_TITLE[section.title] ? { ...section, content: CONTENT_BY_TITLE[section.title] } : section
);

export default function HumanIntegratedPractices() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Integrated Human Practices"
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
