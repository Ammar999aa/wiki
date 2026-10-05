import { useState, useMemo } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import education from "../../content/en/education.md";
import tawasolHackathon from "../../content/en/tawasol-hackathon.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { CloneStepper, Tabs, MultiplierScale, ModuleIcon, RolePlay, LmoCheck } from "./components/Interactive";
import { Principles, ProgramsGlance } from "./components/Overview";
import MoratoriumDialogue from "./components/MoratoriumDialogue";
import styles from "./Education.module.scss";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Kallpa's four course modules, pulled out of the markdown (education.md)
// and into data here so they can be presented as switchable tabs (see
// components/Interactive.jsx's <Tabs>) instead of four stacked ####
// subsections — the content itself is unchanged from what education.md
// used to contain inline. One module per week, so the tabs are labelled by
// week with the module name shown as the panel's heading.
const KALLPA_MODULES = [
  {
    key: "m1",
    label: "Week 1",
    icon: <ModuleIcon name="dna" />,
    title: "GMO fundamentals",
    body: "We built a foundation in molecular biology, genetic modification and conventional breeding, covering DNA, the central dogma, genes, traits, gene expression and how genetic material is modified. Through examples, exercises and visual aids, we explained how genetic modification can produce specific changes and why different modifications give different results. This session gave everyone a shared scientific language.",
  },
  {
    key: "m2",
    label: "Week 2",
    icon: <ModuleIcon name="apple" />,
    title: "Agriculture and food",
    body: "We applied those fundamentals to agriculture, exploring crop modification techniques and traits such as pest resistance and tolerance to extreme conditions. We focused on a crop that matters to local farming communities, the tomato. Volunteers analyzed the microorganisms that cause tomato diseases, how they spread, their symptoms and why they are hard to control. We then introduced greenhouses, which Kallpa Greenz builds across Peru. Together, volunteers worked through one question: how can we use biological knowledge to solve a problem a farmer actually faces?",
  },
  {
    key: "m3",
    label: "Week 3",
    icon: <ModuleIcon name="rocket" />,
    title: "Emerging technologies",
    body: "We expanded into gene editing and CRISPR, controlled-environment agriculture and food production in space, linking them to space biomanufacturing and the biological systems space missions depend on. This connected Kallpa's hydroponics work to our own project, SHIHAB.",
  },
  {
    key: "m4",
    label: "Week 4",
    icon: <ModuleIcon name="justice" />,
    title: "Law, ethics and society",
    body: "We examined the Peruvian laws and organizations involved in GMO decision-making. In role-playing activities, volunteers represented consumers, farmers, indigenous communities, scientists and other groups. We discussed farmers' rights, regulation, and ethical and social concerns, so participants could weigh these perspectives and form their own informed opinions.",
  },
];

// The role-play from Week 4 (Law, ethics and society): the question each
// role brings to the GMO debate. Shown after the module tabs.
const ROLE_PLAY_VOICES = [
  { key: "consumers", role: "Consumers", question: "Is it safe to eat? Will labels tell me what I am buying?" },
  { key: "farmers", role: "Farmers", question: "Will it protect my crops, cut costs, and keep my rights over seeds?" },
  { key: "indigenous", role: "Indigenous", question: "How does it affect our lands, seeds and traditional knowledge?" },
  { key: "scientists", role: "Scientists", question: "What does the evidence say, and how do we communicate the limits?" },
];

// Attaches rich per-section JSX (SectionedArticle/Article.jsx's `content`
// prop) to specific education.md sections by title, alongside their
// rendered markdown — see .claude/ARTICLE-STANDARDS.md on this pattern.
function withInteractiveContent(sections) {
  return sections.map((section) => {
    if (section.title === "Overview") {
      return { ...section, content: <Principles /> };
    }
    if (section.title === "Our Programs at a Glance") {
      return { ...section, content: <ProgramsGlance /> };
    }
    if (section.title === "Copy Paste Plants") {
      return { ...section, content: <CloneStepper /> };
    }
    if (section.title === "Kallpa Multiplier Mentorship (Peru)") {
      // The dialogue belongs right after the "Context" subsection, so the
      // rendered markdown is split at the next <h3> ("What We Identified")
      // and the rest is re-rendered after it.
      const firstH3 = section.html.indexOf("<h3");
      const splitAt = section.html.indexOf("<h3", firstH3 + 1);
      const cut = splitAt === -1 ? section.html.length : splitAt;
      return {
        ...section,
        html: section.html.slice(0, cut),
        content: (
          <>
            <MoratoriumDialogue />
            <LmoCheck />
            <div dangerouslySetInnerHTML={{ __html: section.html.slice(cut) }} />
            <MultiplierScale />
            <h3>The four modules</h3>
            <Tabs items={KALLPA_MODULES} ariaLabel="Course modules" />
            <RolePlay items={ROLE_PLAY_VOICES} />
          </>
        ),
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
      />
    </PageWrapper>
  );
}
