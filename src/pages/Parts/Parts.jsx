import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import rawSections from "../../content/en/parts.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { withSpeciesTitles } from "../../utils/speciesTitle";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow's first two tokens are the nav trail ("Wet Lab" dropdown →
// "Parts") the reader actually clicked, per .claude/ARTICLE-STANDARDS.md.
//
// No deck: the opening paragraphs are regular paragraphs, kept in the
// intro slot (right under the masthead) because the markdown sections start
// at the first organism and anything before a "##" heading is not rendered.
const sections = withSpeciesTitles(rawSections);

const pageIntro = (
  <>
    <Masthead eyebrow={["Wet Lab", "Parts", "Three chassis"]} />
    <p>
      As part of our project, we designed a collection of basic and composite
      parts for use in three different microbial systems:{" "}
      <i>Bacillus subtilis, Pichia pastoris, and Saccharomyces cerevisiae</i>.
      These parts were designed to support different aspects of our project,
      including improving cellular stress tolerance, producing antifreeze
      proteins, and expressing recombinant proteins.
    </p>
    <p>
      Our basic parts include the damage suppressor protein (Dsup), ice-binding
      proteins (FfIBP and LeIBP), (Nb1_gbHSV and nb PDL1) nanobodies, and
      fluorescent reporter proteins such as GFP and mCherry. We also designed
      and included several regulatory elements, secretion signals, epitope tags,
      and plasmid backbones to support protein expression in the different
      hosts.
    </p>
    <p>
      Below, we have organized our parts for each organism, along with their
      corresponding iGEM Registry IDs. Detailed descriptions and sequence
      information for each part can be found through the linked Registry pages.
    </p>
  </>
);

export default function Parts() {
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
        title="Parts"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
