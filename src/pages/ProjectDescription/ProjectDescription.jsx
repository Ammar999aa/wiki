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
// Deck is copied verbatim from the draft's opening paragraph; stats are the
// draft's headline-number strip, with labels from the team's comment on it.
const intro = (
  <Masthead
    eyebrow={["Project", "Description"]}
    deck={
      <>
        <strong>SHIHAB</strong> (Synthetic Hosts for In-situ Healthcare and Autonomous Biomanufacturing) explores a new
        approach to space healthcare by combining resilient microbial hosts with a compact, autonomous platform for
        biological production and purification. Our goal is to enable the on-demand production of selected biologics
        during long-duration space missions, supporting greater medical autonomy beyond Earth.
      </>
    }
    stats={[
      { value: "3", label: "Engineered microbial chassis" },
      { value: "19", label: "Stress-response gene candidates" },
      { value: "8", label: "Protein payloads" },
      { value: "1", label: "Bioreactor prototype" },
      { value: "30+", label: "IHP & Public Engagement" },
    ]}
  />
);

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
