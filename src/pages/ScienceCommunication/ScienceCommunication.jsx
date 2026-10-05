import { useMemo } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import sections from "../../content/en/science-communication.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {
  AttendanceFunnel,
  CrewGenerator,
  Timeline,
  TermFlipCards,
} from "./components/Interactive";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Real reported WALL-E attendance (see science-communication.md's own
// prose for the same two numbers) — not illustrative.
const WALL_E_ATTENDANCE = [
  { label: "watched the film", value: 70 },
  { label: "stayed for the discussion", value: 50 },
];

const TAWASOL_TIMELINE = [
  { title: "Tawasol Hackathon", date: "August 28–30, with NYU Abu Dhabi iGEM" },
  { title: "Tawasol Summit", date: "September 27–28, virtual" },
  { title: "Public Showcase", date: "Planned for October 2026", next: true },
];

// Standard MSA terms, matching the Tawasol Summit's own term-standardization
// exercise (science-communication.md, "Day 2").
const ARABIC_TERMS = [
  { en: "Synthetic biology", ar: "البيولوجيا التركيبية" },
  { en: "Genetic engineering", ar: "الهندسة الوراثية" },
  { en: "Gene editing", ar: "تحرير الجينات" },
  { en: "DNA", ar: "الحمض النووي" },
  { en: "Plasmid", ar: "بلازميد" },
  { en: "Gene circuit", ar: "دائرة جينية" },
];

// Attaches rich per-section JSX (SectionedArticle/Article.jsx's `content`
// prop) to specific science-communication.md sections by title, alongside
// their rendered markdown — see .claude/ARTICLE-STANDARDS.md on this
// pattern (also used by Education.jsx).
function withInteractiveContent(baseSections) {
  return baseSections.map((section) => {
    if (section.title === "Movie Nights: Science Through Cinema") {
      return {
        ...section,
        content: (
          <>
            <h3>Try it yourself</h3>
            <div className="caption">
              <p>
                <strong>WALL-E attendance.</strong> Just over two thirds of the
                audience stayed on for the post-film discussion.
              </p>
            </div>
            <AttendanceFunnel rows={WALL_E_ATTENDANCE} />
            <CrewGenerator />
          </>
        ),
      };
    }
    if (section.title === "Tawasol: Uniting MENA iGEM Teams") {
      return {
        ...section,
        content: (
          <>
            <Timeline items={TAWASOL_TIMELINE} />
            <h3>Learn the Arabic terms</h3>
            <TermFlipCards terms={ARABIC_TERMS} />
          </>
        ),
      };
    }
    return section;
  });
}

// Eyebrow echoes the nav trail ("Beyond the Lab" dropdown → "Science
// Communication") the reader clicked.
const pageIntro = (
  <Masthead
    eyebrow={["Beyond the Lab", "Science Communication"]}
    // TODO(humanize): AI-drafted deck sentence, a close paraphrase of
    // this page's own opening paragraph rather than copied verbatim —
    // needs a human rewrite before this page is final. See
    // .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        Synthetic biology mostly stays inside labs and journals, in English &mdash; our science communication
        work brings it into everyday conversation in <b>Arabic and English</b>, through film, podcasts and
        social media, and unites MENA iGEM teams through the Tawasol Initiative.
      </>
    }
  />
);

export default function ScienceCommunication() {
  const enrichedSections = useMemo(() => withInteractiveContent(sections), []);

  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        gradient,
      }}
    >
      <SectionedArticle
        title="Science Communication"
        intro={pageIntro}
        sections={enrichedSections}
        defaultSelected={enrichedSections[0]?.title}
      />
    </PageWrapper>
  );
}
