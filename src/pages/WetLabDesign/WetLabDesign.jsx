import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/wetlab-design.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow's first two tokens are the nav trail ("Wet Lab" dropdown →
// "Design") the reader actually clicked, per .claude/ARTICLE-STANDARDS.md.
//
// No deck: the source document's own three opening paragraphs (the
// "Design Overview" section) already read as the lede, and a deck here
// would either duplicate one of those sentences verbatim or invent a
// sentence the team never wrote.
const pageIntro = <Masthead eyebrow={["Wet Lab", "Design", "Three chassis"]} />;

export default function WetLabDesign() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle title="Design" intro={pageIntro} sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
