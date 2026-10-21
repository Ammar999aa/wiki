import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/engineering-success.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Engineering" dropdown → "Engineering
// Success") the reader clicked, then two scope items. No stats strip: the
// deck is the overview.
const pageIntro = (
  <>
  <Masthead
    eyebrow={["Project", "Engineering Success", "Hardware, wet lab, dry lab"]}
    deck={
      <>
        The engineering cycles are the central practice of iGEM and synthetic biology in general. They
        provide a systematic framework for developing and improving biological systems. The process follows
        four iterative stages: Design, Build, Test, and Learn (DBTL). By repeatedly applying the DBTL
        framework, we can systematically improve our solutions and make evidence-based decisions throughout
        the engineering process.
      </>
    }
  />
  {/* Track picker: each card jumps to a superheading in the markdown
      ("# Hardware Cycles" etc.); the side panel then lists only that
      track's sections. Counts are of this page's own cards. */}
  <div className="card-grid row links">
    <div>
      <h4><a href="#hardware-cycles">Hardware Cycles</a></h4>
      <p>The bioreactor and its COMSOL simulations, plus filtration and fluid dispensing. 25 design iterations.</p>
    </div>
    <div>
      <h4><a href="#wet-lab-cycles">Wet Lab Cycles</a></h4>
      <p>Construct design, transformation, irradiation assays and culture conditions across three chassis.</p>
    </div>
    <div>
      <h4><a href="#dry-lab-cycles">Dry Lab Cycles</a></h4>
      <p>Metabolic model repair, a knockout strategy that did not work, and batch models for induction timing.</p>
    </div>
  </div>
  </>
);

export default function EngineeringSuccess() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Engineering Success"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
        numbered
      />
    </PageWrapper>
  );
}
