import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/human-integrated-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

// Converted from src/content/Human Integrated Practices - Wiki.docx. The
// "Closing the ORBIT" and "Conclusions" sections were left without body
// text in that source doc — kept as "Content coming soon" rather than
// invented, per .claude/RESPONSIBLE_AI_USE.md.
export default function HumanIntegratedPractices() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
