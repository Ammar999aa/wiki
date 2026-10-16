import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/contribution.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Project" dropdown → "Contribution"). Deck
// summarises the sections below; every stat also appears in the body
// (section count, the chassis the wet-lab resources cover, and the gene
// mining audit's 53 → 45).
const pageIntro = (
  <Masthead
    eyebrow={["Project", "Contribution"]}
    deck={
      <>
        What we're leaving for future teams: <strong>wet-lab protocols and handbooks</strong>,{" "}
        <strong>reusable dry-lab tools</strong>, a <strong>mentorship framework</strong>, and a{" "}
        <strong>regulatory analysis</strong>, all built while developing SHIHAB.
      </>
    }
    stats={[
      { value: "7", label: "Resources for future teams" },
      { value: "3", label: "Chassis covered in the lab resources" },
      { value: "53 → 45", label: "Gene candidates after our audit", hi: true },
    ]}
  />
);

export default function Contribution() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Contribution"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
