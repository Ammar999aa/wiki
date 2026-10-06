import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
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

// Sections kept in the markdown but hidden for now, to be revisited. Remove a
// title from this list to show that section again.
const HIDDEN_TITLES = ["Our IHP Journey at a Glance"];

const sections = rawSections
  .filter((section) => !HIDDEN_TITLES.includes(section.title))
  .map((section) =>
    CONTENT_BY_TITLE[section.title] ? { ...section, content: CONTENT_BY_TITLE[section.title] } : section
  );

// Eyebrow echoes the nav trail ("Beyond the Lab" dropdown → "Integrated
// Human Practices") the reader clicked.
const pageIntro = (
  <Masthead
    eyebrow={["Beyond the Lab", "Integrated Human Practices"]}
    // TODO(humanize): AI-drafted deck sentence. The first clause quotes
    // this page's own opening callout; the second clause ("how should
    // that shape...") is AI synthesis of the stakeholder/ORBIT content
    // further down the page, not a quote — read this one closely before
    // the page is final. See .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        SHIHAB&rsquo;s human-practices work started from one question: <b>what are astronauts missing</b>{" "}
        &mdash; and how should that shape who we build with and what we build for them?
      </>
    }
  />
);

export default function HumanIntegratedPractices() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Integrated Human Practices"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
