import { useMemo } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import education from "../../content/en/education.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {
  CloneStepper,
  Tabs,
  MultiplierScale,
  ModuleIcon,
  LmoCheck,
  ScoreTrack,
} from "./components/Interactive";
import { Principles, ProgramsGlance } from "./components/Overview";
import MoratoriumDialogue from "./components/MoratoriumDialogue";
import ThuwalHero from "./components/ThuwalHero";
import {
  FourDays,
  NameTag,
  Astrolabe,
  JeddahRoute,
  MicrobeMission,
  PhotoDeck,
} from "./components/ThuwalOutreach";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Kallpa's four course modules, presented as switchable tabs (see
// components/Interactive.jsx's <Tabs>) instead of four stacked ####
// subsections. Text is the Kallpa lead's final module write-up
// (kallpa-mentorship-adapted HTML, Oct 2026). One module per week, so the tabs are
// labelled by week with the module name shown as the panel's heading.
const KALLPA_MODULES = [
  {
    key: "m1",
    label: "Week 1",
    icon: <ModuleIcon name="dna" />,
    title: "GMO fundamentals",
    body: "In the first week, we began with the fundamentals of GMOs, establishing a knowledge base in molecular biology, genetic modification, artificial selection, and conventional breeding. The volunteers explored concepts related to DNA, the central dogma of molecular biology, genes, traits, gene expression, and the modification of genetic material, among others. Through exercises and visual aids, such as videos, we used examples to explain how genetic modification can produce specific changes in a DNA sequence, which can, in turn, lead to different outcomes. This session helped establish a common scientific foundation between the mentor and the mentees, ensuring that everyone acquired the necessary knowledge base for the subsequent sessions.",
    link: { href: "https://static.igem.wiki/teams/6341/wiki/content/public-engagement/kallpa-sessions/kallpa-session-1.pdf", label: "View session 1 slides" },
  },
  {
    key: "m2",
    label: "Week 2",
    icon: <ModuleIcon name="apple" />,
    title: "Biotechnology on the farm",
    body: "In the second week, we applied scientific principles to sectors of interest: agriculture and food production. Together, we explored various crop-modification techniques and the traits that can be altered, such as resistance to pests, tolerance to extreme environmental conditions, and other characteristics of agricultural importance. These environmental conditions were selected based on the specific climates of each of the target communities. To provide context, we focused on a crop of particular significance to local farming communities: the tomato. The volunteers studied and analyzed the microorganisms that cause diseases, their transmission mechanisms, and the symptoms of tomato plant diseases. Building on this, we introduced the role of greenhouses, a key tool that Kallpa Greenz constructs across various regions of Peru. This session allowed us to address the question: how can biological knowledge be used to solve a problem faced by a farmer? The volunteers identified several challenges, explored their potential causes, analyzed various strategies, and evaluated possible biotechnological solutions.",
    link: { href: "https://static.igem.wiki/teams/6341/wiki/content/public-engagement/kallpa-sessions/kallpa-session-2.pdf", label: "View session 2 slides" },
  },
  {
    key: "m3",
    label: "Week 3",
    icon: <ModuleIcon name="rocket" />,
    title: "Emerging technologies",
    body: "In the following session, we covered emerging technologies and new contexts for their application. Concepts such as gene editing and CRISPR were introduced. We also explored topics related to agriculture in controlled environments and examined case studies on food production in space.",
    link: { href: "https://static.igem.wiki/teams/6341/wiki/content/public-engagement/kallpa-sessions/kallpa-session-3.pdf", label: "View session 3 slides" },
  },
  {
    key: "m4",
    label: "Week 4",
    icon: <ModuleIcon name="justice" />,
    title: "Law, voices and ethics",
    body: "Finally, we examined various Peruvian laws and the organizations involved in decision-making regarding GMOs. We explored different perspectives through role-playing activities that represented consumers, farmers, indigenous communities, scientists, and other relevant groups. We also addressed farmers' rights, the regulation of genetically modified organisms (GMOs), and various ethical and social concerns. Ultimately, we provided the participants with the information and tools needed to evaluate these diverse perspectives and form their own informed opinions.",
    link: { href: "https://static.igem.wiki/teams/6341/wiki/content/public-engagement/kallpa-sessions/kallpa-session-4.pdf", label: "View session 4 slides" },
  },
];

// Kallpa post-mentorship survey (8 volunteers), reported 0–5 scores — one
// value per item, as the Kallpa lead specified (not ranges).
const KALLPA_SCIENCE_SCORES = [
  { label: "Clarity of CRISPR, CRISPRi, RNAi and GMO concepts", value: 4 },
  { label: "Ability to explain concepts to non-scientific audiences", value: 4 },
  { label: "Appropriateness of technical level", value: 4.5 },
  { label: "Relevance of real-world examples", value: 4 },
];

const KALLPA_FIELD_SCORES = [
  { label: "Explaining GMO benefits and risks in a balanced way", value: 4.25 },
  { label: "Answering questions about food safety", value: 3.75 },
  { label: "Discussing GMO regulation in Peru", value: 3.5 },
  { label: "Facilitating informed decision-making", value: 4 },
  { label: "Responding to concerns or distrust", value: 4 },
];

// Interactive blocks dropped into the Kallpa section at
// `<!-- kallpa:<name> -->` markers in education.md, so the markdown keeps
// control of where each one sits in the reading order.
const KALLPA_BLOCKS = {
  dialogue: (
    <>
      <MoratoriumDialogue />
      <LmoCheck />
    </>
  ),
  modules: (
    <>
      <h3>The four modules</h3>
      <Tabs items={KALLPA_MODULES} ariaLabel="Course modules" />
    </>
  ),
  science: <ScoreTrack title="Dimension 01 · Scientific understanding" items={KALLPA_SCIENCE_SCORES} />,
  field: <ScoreTrack title="Dimension 02 · Preparation for field communication" items={KALLPA_FIELD_SCORES} />,
  reach: <MultiplierScale />,
};

const SCHOOL_BLOCKS = {
  "thuwal-hero": <ThuwalHero />,
  days: <FourDays />,
  nametag: <NameTag />,
  astrolabe: <Astrolabe />,
  route: <JeddahRoute />,
  mission: <MicrobeMission />,
  deck: <PhotoDeck />,
};

// Splits rendered markdown at `<!-- <prefix>:<name> -->` markers and
// interleaves the matching blocks entry at each one.
function interleaveBlocks(html, blocks, prefix) {
  const parts = html.split(new RegExp(`<!--\\s*${prefix}:([\\w-]+)\\s*-->`));
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <div key={i}>{blocks[part]}</div>
    ) : (
      <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
    ),
  );
}

// Attaches rich per-section JSX (SectionedArticle/Article.jsx's `content`
// prop) to specific education.md sections by title, alongside their
// rendered markdown — see .claude/ARTICLE-STANDARDS.md on this pattern.
function withInteractiveContent(sections) {
  return sections.map((section) => {
    if (section.title === "Overview") {
      return { ...section, content: <Principles /> };
    }
    if (section.title === "Our programs at a glance") {
      return { ...section, content: <ProgramsGlance /> };
    }
    if (section.title === "Copy Paste Plants") {
      return { ...section, content: <CloneStepper /> };
    }
    if (section.title === "School outreach") {
      return {
        ...section,
        html: "",
        content: <>{interleaveBlocks(section.html, SCHOOL_BLOCKS, "school")}</>,
      };
    }
    if (section.title === "Kallpa Multiplier Mentorship (Peru)") {
      return {
        ...section,
        html: "",
        content: <>{interleaveBlocks(section.html, KALLPA_BLOCKS, "kallpa")}</>,
      };
    }
    return section;
  });
}

// Eyebrow echoes the nav trail ("Beyond the Lab" dropdown → "Education")
// the reader clicked.
const educationIntro = (
  <Masthead
    eyebrow={["Beyond the Lab", "Education"]}
    // TODO(humanize): AI-drafted deck sentence. The first clause
    // paraphrases this page's own opening paragraph; "a primary-school
    // cloning game" and "a four-module mentorship program for rural
    // farmers" are AI synthesis pulled from the Copy Paste Plants and
    // Kallpa Multiplier Mentorship sections further down the page, not a
    // quote — read this one closely before the page is final. See
    // .claude/TODO-HUMANIZE-COPY.md.
    deck={
      <>
        Synthetic biology barely exists in Saudi and wider MENA secondary curricula yet &mdash; our education
        work closes that gap in <b>Arabic and English</b>, from a primary-school cloning game to a four-module
        mentorship program for rural farmers.
      </>
    }
  />
);

export default function Education() {
  const sections = useMemo(() => withInteractiveContent(education), []);

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
        title="Education"
        intro={educationIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
        numbered
      />
    </PageWrapper>
  );
}
