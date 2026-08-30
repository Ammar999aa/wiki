import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/drylab.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

export default function DryLab() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle title="Dry Lab" sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
