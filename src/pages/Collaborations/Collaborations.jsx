import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/collaborations.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

// Hosted on iGEM's asset server rather than bundled locally.
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Team" dropdown → "Collaborations") the
// reader clicked.
const pageIntro = <Masthead eyebrow={["Team", "Collaborations"]} />;

export default function Collaborations() {
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
        title="Collaborations"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
