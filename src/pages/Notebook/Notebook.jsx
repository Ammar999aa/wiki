import NotebookPdf from "./NotebookPdf";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import styles from "./Notebook.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// The notebook is the PDF — no article text, masthead or jump-nav panel
// around it, so this doesn't use SectionedArticle.
export default function Notebook() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.page}>
        <h1 className={styles.title}>Notebook</h1>
        {/* Echoes the nav trail ("Wet Lab" dropdown → "Notebook"), like the
            eyebrow Masthead gives the other pages. */}
        <p className={styles.eyebrow}>
          <span>Wet Lab</span>
          <span className={styles.eyebrowDot} />
          <span>Notebook</span>
        </p>
        <NotebookPdf />
      </div>
    </PageWrapper>
  );
}
