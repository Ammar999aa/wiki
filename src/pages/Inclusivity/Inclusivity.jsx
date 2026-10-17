import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import rawSections from "../../content/en/inclusivity.md";
import WorldMap from "./components/WorldMap";
import Voices from "./components/Voices";
import styles from "./Inclusivity.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";
// The team photo behind the page, dimmed over the dark page colour (and the
// usual gradient) so the white body text stays readable on top of it; it
// fades out as the reader scrolls into the page.
const teamPhoto = "https://static.igem.wiki/teams/6341/wiki/images/team/team.avif";

// Rendered after each section's markdown, keyed by section title.
const CONTENT_BY_TITLE = {
  "An international team in Saudi Arabia": <WorldMap />,
};

// Components placed mid-section, where the markdown has
// <div data-slot="name"></div>. The section's HTML is split at the marker.
const SLOTS = {
  voices: <Voices />,
};

function fillSlots(section) {
  const match = section.html?.match(/<div data-slot="([\w-]+)"><\/div>/);
  if (!match || !SLOTS[match[1]]) return section;
  const before = section.html.slice(0, match.index);
  const after = section.html.slice(match.index + match[0].length);
  return {
    ...section,
    html: before,
    content: (
      <>
        {SLOTS[match[1]]}
        <div dangerouslySetInnerHTML={{ __html: after }} />
        {section.content}
      </>
    ),
  };
}

const sections = rawSections
  .map((section) => (CONTENT_BY_TITLE[section.title] ? { ...section, content: CONTENT_BY_TITLE[section.title] } : section))
  .map(fillSlots);

// Eyebrow echoes the nav trail ("Team" dropdown → "Inclusivity").
const pageIntro = <Masthead eyebrow={["Team", "Inclusivity"]} />;

export default function Inclusivity() {
  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        photo: teamPhoto,
        photoPosition: "center 40%",
        photoOpacity: 0.3,
        photoFade: 0.3, // fades out once the reader scrolls past ~30% of a screen
        photoClassName: styles.teamPhoto, // keeps everyone clear of the side panel
        gradient,
      }}
    >
      <SectionedArticle
        title="Inclusivity"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
