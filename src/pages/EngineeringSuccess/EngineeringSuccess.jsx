import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/engineering-success.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Eyebrow echoes the nav trail ("Engineering" dropdown → "Engineering
// Success") the reader clicked, then two scope items.
//
// Every stat below is a count of this page's own iteration cards, so it
// can't drift from the body: 11 + 7 + 7 hardware iterations, the five
// B. subtilis transformation cycles, and the three dry lab cycles.
const pageIntro = (
  <Masthead
    eyebrow={["Engineering", "Engineering Success", "Design–Build–Test–Learn", "Hardware, wet lab, dry lab"]}
    deck={
      <>
        SHIHAB went through dozens of Design–Build–Test–Learn cycles across hardware, wet lab and dry lab.{" "}
        <b>Most of what we kept came from something that failed first</b> &mdash; magnetic stirring, PID
        control, two transformation methods and a knockout strategy were all abandoned before the working
        version appeared.
      </>
    }
    stats={[
      { value: "25", label: "Hardware iterations", hi: true },
      { value: "11", label: "Bioreactor iterations" },
      { value: "5", label: "Transformation cycles", hi: true },
      { value: "3", label: "Dry lab cycles" },
      { value: "3", label: "Chassis engineered" },
    ]}
  />
);

export default function EngineeringSuccess() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Engineering Success"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
        numbered
      />
    </PageWrapper>
  );
}
