import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/hardware.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

// Converted from src/content/iGEM Hardware Wiki.docx. Internal author notes
// ("consult wet lab to write", "insert image of filtration unit", etc.) were
// stripped rather than published; prose gaps they marked are left as
// "Content coming soon" instead, per .claude/RESPONSIBLE_AI_USE.md. The doc's
// 3 embedded images are uploaded via iGEM's uploads tool and referenced from
// static.igem.wiki in hardware.md, per README.md's asset rules.
export default function Hardware() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
