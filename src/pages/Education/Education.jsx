import { useState, useMemo } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import education from "../../content/en/education.md";
import tawasolHackathon from "../../content/en/tawasol-hackathon.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {
  CloneStepper,
  Tabs,
  MultiplierScale,
  ModuleIcon,
  LmoCheck,
  DecisionScale,
  ScoreTrack,
} from "./components/Interactive";
import { Principles, ProgramsGlance } from "./components/Overview";
import MoratoriumDialogue from "./components/MoratoriumDialogue";
import ThuwalHero from "./components/ThuwalHero";
import {
  FourDays,
  PhotoGarland,
  NameTag,
  Astrolabe,
  JeddahRoute,
  MicrobeMission,
  PhotoDeck,
} from "./components/ThuwalOutreach";
import styles from "./Education.module.scss";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Kallpa's four course modules, presented as switchable tabs (see
// components/Interactive.jsx's <Tabs>) instead of four stacked ####
// subsections. Text is the Kallpa lead's final module write-up
// (kallpa-mentorship HTML, Oct 2026). One module per week, so the tabs are
// labelled by week with the module name shown as the panel's heading.
const KALLPA_MODULES = [
  {
    key: "m1",
    label: "Week 1",
    icon: <ModuleIcon name="dna" />,
    title: "GMO fundamentals",
    body: "In the first week, we began with the fundamentals of GMOs, establishing a foundation in molecular biology, genetic modification and conventional breeding. Volunteers learned concepts related to DNA, the central dogma of molecular biology, genes, traits, gene expression and the modification of genetic material. Through examples, exercises and visual aids, we explained how genetic modification can produce specific changes and why different modifications can yield different results. This initial session allowed us to establish a common scientific language and communication channel.",
  },
  {
    key: "m2",
    label: "Week 2",
    icon: <ModuleIcon name="apple" />,
    title: "Biotechnology on the farm",
    body: "In the second week, we took those scientific fundamentals and applied them to the agricultural and food sectors. We explored various crop modification techniques and the traits that can be altered, such as pest resistance, tolerance to extreme environmental conditions and other characteristics of agricultural interest. To provide context, we focused on a crop of particular importance to local farming communities: the tomato. Volunteers analyzed the microorganisms that cause disease, transmission methods, symptoms, and the reasons why certain diseases are difficult to control. Building on this, we introduced the role of greenhouses, a key tool that Kallpa Greenz constructs in various regions across Peru. This session enabled us to address the question: how can we use biological knowledge to solve a problem faced by a farmer? The volunteers identified the problem, understood its cause, analyzed strategies and evaluated biotechnological solutions.",
  },
  {
    key: "m3",
    label: "Week 3",
    icon: <ModuleIcon name="rocket" />,
    title: "Emerging technologies",
    body: "In a subsequent session, the scope was expanded to include emerging technologies and new application contexts. Concepts such as gene editing and CRISPR were introduced. We also explored topics related to controlled-environment agriculture and food production in space. We linked these concepts to space biomanufacturing, examining biological systems and other products essential for space missions.",
  },
  {
    key: "m4",
    label: "Week 4",
    icon: <ModuleIcon name="justice" />,
    title: "Law, voices and ethics",
    body: "Finally, we examined the various Peruvian laws and organizations involved in decision-making regarding GMOs. We explored different perspectives through role-playing activities representing consumers, farmers, indigenous communities, scientists and other relevant groups. We also addressed farmers' rights, GMO regulation, and ethical and social concerns. Ultimately, we provided the participants with the information and tools needed to evaluate these diverse perspectives and form their own informed opinions.",
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
  scale: <DecisionScale />,
  science: <ScoreTrack title="Dimension 01 · Scientific understanding" items={KALLPA_SCIENCE_SCORES} />,
  field: <ScoreTrack title="Dimension 02 · Preparation for field communication" items={KALLPA_FIELD_SCORES} />,
  reach: <MultiplierScale />,
};

const SCHOOL_BLOCKS = {
  "thuwal-hero": <ThuwalHero />,
  days: <FourDays />,
  garland: <PhotoGarland />,
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
// the reader clicked. Only the main Education sub-article gets one —
// Tawasol Hackathon is reached from inside this page's own picker, not
// from the nav, so there's no nav label for it to confirm.
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

// Education is a picker over several sub-articles, each its own full
// sectioned article (own ## table of contents). The main Education article
// is first, so it's the default tab; Tawasol Hackathon is kept as a second,
// non-default tab for its own deeper dive (Education's own "## Tawasol
// Hackathon" section already summarizes it and points here). Add new
// entries here as more sub-articles are written.
export default function Education() {
  const ARTICLES = useMemo(
    () => [
      {
        key: "education",
        title: "Education",
        intro: educationIntro,
        sections: withInteractiveContent(education),
      },
      {
        key: "tawasol-hackathon",
        title: "Tawasol Hackathon",
        sections: tawasolHackathon,
      },
    ],
    [],
  );
  const [selectedKey, setSelectedKey] = useState(ARTICLES[0].key);
  const article = ARTICLES.find((a) => a.key === selectedKey) || ARTICLES[0];

  const picker = (
    <div className={styles.picker}>
      <p className={styles.pickerLabel}>Education</p>
      {ARTICLES.map((a) => (
        <h3
          key={a.key}
          className={`${styles.pickerItem} ${a.key === selectedKey ? styles.selected : ""}`}
          onClick={() => setSelectedKey(a.key)}
        >
          {a.title}
        </h3>
      ))}
    </div>
  );

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
        key={article.key}
        title={article.title}
        intro={article.intro}
        sections={article.sections}
        defaultSelected={article.sections[0]?.title}
        panelHeader={picker}
        // Both tabs render through this one call, so number only the long
        // article: the Tawasol tab is short enough to read without them.
        numbered={article.sections.length >= 9}
      />
    </PageWrapper>
  );
}
