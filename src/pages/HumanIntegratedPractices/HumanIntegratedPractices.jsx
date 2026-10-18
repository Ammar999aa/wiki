import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import rawSections from "../../content/en/human-integrated-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import QuestionMap from "./components/QuestionMap";
import OrbitTimeline from "./components/OrbitTimeline";
import JigsawTable from "./components/JigsawTable";
import ValuesCards from "./components/ValuesCards";
import ShapedByMap from "./components/ShapedByMap";
import RoadmapCards from "./components/RoadmapCards";
import EngagementTabs from "./components/EngagementTabs";
import { stakeholderGroups, designValues } from "./data.js";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

const jigsawItems = stakeholderGroups.map((g) => ({ title: g.name, learn: g.learn, influence: g.influence }));

// Rendered after each section's markdown, keyed by section title.
const CONTENT_BY_TITLE = {
  "Understanding our impact and responsibility": <QuestionMap />,
  "Our values": <ValuesCards />,
  "Our ORBIT framework": <OrbitTimeline />,
  "Mapping our end users and stakeholders": <JigsawTable items={jigsawItems} />,
};

// Sections kept in the markdown but hidden for now, to be revisited. Remove a
// title from this list to show that section again.
const HIDDEN_TITLES = [];

// Components placed mid-section, where the markdown has
// <div data-slot="name"></div>. The section's HTML is split at the marker.
// A function slot is handed the HTML after the marker and renders it itself
// (EngagementTabs turns the .engage-panel blocks there into tabs).
const SLOTS = {
  roadmap: <RoadmapCards />,
  "design-values": <ValuesCards items={designValues} />,
  engagement: (after) => <EngagementTabs html={after} />,
};

function fillSlots(section) {
  const match = section.html?.match(/<div data-slot="([\w-]+)"><\/div>/);
  if (!match || !SLOTS[match[1]]) return section;
  const [before, after] = [section.html.slice(0, match.index), section.html.slice(match.index + match[0].length)];
  const slot = SLOTS[match[1]];
  return {
    ...section,
    html: before,
    content: (
      <>
        {typeof slot === "function" ? (
          slot(after)
        ) : (
          <>
            {slot}
            <div dangerouslySetInnerHTML={{ __html: after }} />
          </>
        )}
        {section.content}
      </>
    ),
  };
}

const sections = rawSections
  .filter((section) => !HIDDEN_TITLES.includes(section.title))
  .map((section) =>
    CONTENT_BY_TITLE[section.title] ? { ...section, content: CONTENT_BY_TITLE[section.title] } : section
  )
  .map(fillSlots);

// Eyebrow echoes the nav trail ("Beyond the Lab" dropdown → "Integrated
// Human Practices") the reader clicked. The map of experts sits right under
// the deck, before the first section.
const pageIntro = (
  <>
    <Masthead
      eyebrow={["Beyond the Lab", "Integrated Human Practices"]}
      deck={
        <>
          Our Integrated Human Practices connected SHIHAB with the people and needs behind its development. Through
          more than 30 activities, we turned diverse perspectives into meaningful decisions across our biological
          research, system engineering, and safety strategies. From astronaut healthcare to humanitarian applications
          and public engagement, our journey helped us understand the opportunities, responsibilities, and challenges
          of bringing SHIHAB into the real world.
        </>
      }
    />
    <ShapedByMap />
  </>
);

export default function HumanIntegratedPractices() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Integrated Human Practices"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
        numbered
      />
    </PageWrapper>
  );
}
