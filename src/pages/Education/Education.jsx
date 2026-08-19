import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/tawasol-hackathon.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

// Content is Tawasol (the KAUST x NYUAD policy hackathon) for now — swap in
// dedicated Education content when it's written; see src/content/en/tawasol-hackathon.md.
export default function Education() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
