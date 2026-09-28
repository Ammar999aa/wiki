import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/wetlab.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

export default function WetLab() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle title="Wet Lab" sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
