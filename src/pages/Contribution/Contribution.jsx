import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/contribution.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Project" dropdown → "Contribution").
const pageIntro = (
  <Masthead
    eyebrow={["Project", "Contribution"]}
    deck="We believe that scientific progress thrives through collaboration, open access, and the sharing of knowledge. As part of our commitment to advancing synthetic biology, we developed and documented a range of tools, protocols, and resources to support future iGEM teams and contribute to the broader scientific community."
  />
);

export default function Contribution() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Contribution"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
