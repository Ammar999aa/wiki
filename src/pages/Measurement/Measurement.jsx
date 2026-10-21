import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/measurement.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

const pageIntro = (
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
