import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/measurement.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";
// Hosted on iGEM's asset server rather than bundled locally.
const overview = "https://static.igem.wiki/teams/6341/wiki/content/measurement/overview-photoroom.avif";

const pageIntro = (
  <>
    <Masthead
      eyebrow={["Wet Lab", "Measurement"]}
      deck={
        <>
          A measurement framework for <strong>radiation resistance</strong>, genomically integrated{" "}
          <strong>Dsup-mediated protection</strong> and recombinant protein production in our engineered microbial
          chassis.
        </>
      }
    />
    <img
      src={overview}
      alt="Measurement framework overview: wild-type and Dsup-expressing microbial chassis (B. subtilis, S. cerevisiae, P. pastoris) are exposed to UV or X-ray radiation, then assessed with four complementary readouts: serial-dilution spot assay, OD600 time course, resazurin reduction assay and FUN-1 staining."
      style={{ display: "block", width: "100%", maxWidth: 960, margin: "1.5rem auto 2.5rem" }}
    />
  </>
);

export default function Measurement() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Measurement"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
