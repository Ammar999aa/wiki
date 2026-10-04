import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/safety.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow's first two tokens are the nav trail ("Project" dropdown →
// "Safety") the reader actually clicked, per .claude/ARTICLE-STANDARDS.md
// and the UI/UX audit finding on titles not confirming the nav label.
const pageIntro = (
  <Masthead
    eyebrow={["Project", "Safety", "BSL-1"]}
    // TODO(humanize): AI-drafted deck sentence, paraphrased from this
    // page's own opening paragraph rather than copied verbatim — needs a
    // human rewrite before this page is final. See .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        Three engineered chassis &mdash; <i>S.&nbsp;cerevisiae</i>, <i>P.&nbsp;pastoris</i> and{" "}
        <i>B.&nbsp;subtilis</i> &mdash; run under <b>Biosafety Level 1 containment</b>, with hardware
        designed so the organisms can&rsquo;t escape and can be sterilized at the end of production.
      </>
    }
  />
);

export default function Safety() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle title="Safety" intro={pageIntro} sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
