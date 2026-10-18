import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/project-description.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Project → Description (/project). Content lives in
// src/content/en/project-description.md, built from the team's draft in
// src/assets/Project description Draft/ and restructured to the team's
// later concept, src/assets/SHIHAB_Project_Description_Final_Concept.html
// (six research-direction cards, the production-workflow strip). The
// protein payload library that used to sit at this URL is now its own
// page, Project → Protein Library (/protein-library), linked from the
// "Protein payload library" card.
//
// Deck and stats are copied verbatim from that concept's hero: the lead
// paragraph, and its five-cell headline-number strip.
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
      { value: "3", label: "Microbial chassis" },
      { value: "19", label: "Stress-response gene candidates" },
      { value: "8", label: "Protein payloads in the proposed library" },
      { value: "1", label: "Bioreactor prototype" },
      { value: "30+", label: "IHP & public engagement activities" },
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
