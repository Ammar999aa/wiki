import NotebookArticle from "./NotebookArticle";
import sections from "../../content/en/notebook.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

export default function Notebook() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <NotebookArticle title="Notebook" sections={sections} />
    </PageWrapper>
  );
}
