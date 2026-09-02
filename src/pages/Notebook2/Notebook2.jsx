import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/notebook.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

// The original one-scroll layout (side panel lists every experiment,
// content is one continuous page) kept alongside the tabbed /notebook
// for comparison — same content (src/content/en/notebook.md), same
// images, just the pre-pills presentation.
export default function Notebook2() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle title="Notebook" sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
