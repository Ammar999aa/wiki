import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/project-description.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Project → Description (/project). Content lives in
// src/content/en/project-description.md, built from the team's draft in
// src/assets/Project description Draft/. The protein payload library that
// used to sit at this URL is now its own page, Project → Protein Library
// (/protein-library), linked from the "A library of protein payloads" card.
//
// Eyebrow only, no deck: the deck would be new copy, and the page's own
// opening paragraph already does that job.
const intro = <Masthead eyebrow={["Project", "Description"]} />;

export default function ProjectDescription() {
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
        title="Project Description"
        intro={intro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
