import NotebookArticle from "./NotebookArticle";
import sections from "../../content/en/notebook.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

export default function Notebook() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <NotebookArticle title="Notebook" sections={sections} />
    </PageWrapper>
  );
}
