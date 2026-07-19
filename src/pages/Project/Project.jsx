import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/example-article.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

export default function Project() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}