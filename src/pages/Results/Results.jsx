import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/results.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Every stat below is also stated in the body: the three chassis and the
// four purified payloads come from the Summary section, the nine P. pastoris
// constructs from Table 1.
const pageIntro = (
  <Masthead
    eyebrow={["Wet Lab", "Results"]}
    deck={
      <>
        We engineered <strong>three microbial chassis</strong> for enhanced stress resilience and
        produced a range of <strong>recombinant proteins useful for space missions</strong>.
      </>
    }
    stats={[
      { value: "3", label: "Chassis engineered" },
      { value: "9", label: "P. pastoris constructs integrated" },
      { value: "4", label: "Payload proteins purified", hi: true },
    ]}
  />
);

export default function Results() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Results"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
