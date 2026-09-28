import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
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
export default function BioreactorModeling() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle title="Bioreactor Modeling" sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
