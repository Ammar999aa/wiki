import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import rawSections from "../../content/en/human-integrated-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import StakeholderPuzzle from "./components/StakeholderPuzzle";
import QuestionMap from "./components/QuestionMap";
import OrbitTimeline from "./components/OrbitTimeline";
import JigsawTable from "./components/JigsawTable";
import { stakeholderGroups } from "./data.js";

const jigsawItems = stakeholderGroups.map((g) => ({ title: g.name, body: g.learn.join(" ") }));

// Three sections need real interactivity/visual structure (the founding
// questions mind-map, the ORBIT step timeline, the clickable stakeholder
// puzzle) that plain markdown can't provide, so their JSX content is
// appended after the markdown-rendered intro paragraph for that same
// section — same pattern as the Model page's `content` prop on Article.jsx.
// For "Our ORBIT Framework" this means the timeline renders below the
// static ORBIT graphic already in the markdown, not instead of it.
//
// JigsawTable is appended below the existing StakeholderPuzzle purely for
// side-by-side review while the two designs are being compared. Once a
// direction is picked, drop whichever component isn't kept.
const CONTENT_BY_TITLE = {
  "Understanding Our Impact and Responsibility": <QuestionMap />,
  "Our ORBIT Framework": <OrbitTimeline />,
  "Defining Our Stakeholders": (
    <>
      <StakeholderPuzzle />
      <JigsawTable items={jigsawItems} />
    </>
  ),
};

const sections = rawSections.map((section) =>
  CONTENT_BY_TITLE[section.title] ? { ...section, content: CONTENT_BY_TITLE[section.title] } : section
);

export default function HumanIntegratedPractices() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Human Integrated Practices"
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
