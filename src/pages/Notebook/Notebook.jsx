import NotebookArticle from "./NotebookArticle";
import NotebookPdf from "./NotebookPdf";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/notebook.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Wet Lab" dropdown → "Notebook") the
// reader clicked.
const pageIntro = (
  <Masthead
    eyebrow={["Wet Lab", "Notebook"]}
    // TODO(humanize): AI-drafted deck sentence, built from this page's own
    // project-title line and its Experiment #1 (media preparation) entry
    // rather than copied verbatim — needs a human rewrite before this page
    // is final. See .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        The dated, chronological lab log behind <b>SHIHAB</b> &mdash; Synthetic Hosts for In&nbsp;situ
        Healthcare and Autonomous Biomanufacturing &mdash; from the first media prep through every experiment
        that followed.
      </>
    }
  />
);

const intro = (
  <>
    {pageIntro}
    <NotebookPdf />
  </>
);

export default function Notebook() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <NotebookArticle title="Notebook" intro={intro} sections={sections} />
    </PageWrapper>
  );
}
