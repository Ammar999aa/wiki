import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/bioreactor-modeling.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Dry Lab → Bioreactor Modeling (/bioreactor-modeling, see src/pages.js).
// Separate from Dry Lab → Modeling (/modeling, src/pages/Model), which
// covers the desert-metagenome candidate-screening pipeline — this page is
// the COMSOL bioreactor CFD model (fluid flow, gas-liquid mass transfer,
// growth kinetics), an unrelated Dry Lab effort. Still a draft (several
// sections pending), so kept at the markdown + SectionedArticle tier per
// .claude/ARTICLE-STANDARDS.md rather than built out as a bespoke page yet.
//
// Eyebrow echoes the nav trail ("Dry Lab" dropdown → "Modeling") the
// reader clicked, since the h1 below says "Bioreactor Modeling" instead —
// see the UI/UX audit finding on titles not confirming the nav label.
const pageIntro = (
  <Masthead
    eyebrow={["Dry Lab", "Modeling", "COMSOL CFD"]}
    // TODO(humanize): AI-drafted deck sentence, paraphrased from this
    // page's own "Why model a bioreactor at all?" section rather than
    // copied verbatim — needs a human rewrite before this page is final.
    // See .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        A 3D multiphysics model in <b>COMSOL Multiphysics</b> couples fluid flow, gas&ndash;liquid mass
        transfer and microbial growth kinetics to ask one question: can a bioreactor keep cells fed and
        oxygenated in microgravity?
      </>
    }
  />
);

export default function BioreactorModeling() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Bioreactor Modeling"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
