import { useState, useMemo } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import education from "../../content/en/education.md";
import tawasolHackathon from "../../content/en/tawasol-hackathon.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { CloneStepper, Tabs, MultiplierScale } from "./components/Interactive";
import styles from "./Education.module.scss";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Kallpa's four course modules, pulled out of the markdown (education.md)
// and into data here so they can be presented as switchable tabs (see
// components/Interactive.jsx's <Tabs>) instead of four stacked ####
// subsections — the content itself is unchanged from what education.md
// used to contain inline.
const KALLPA_MODULES = [
  {
    key: "m1",
    label: "1. GMO fundamentals",
    body: "We built a foundation in molecular biology, genetic modification and conventional breeding, covering DNA, the central dogma, genes, traits, gene expression and how genetic material is modified. Through examples, exercises and visual aids, we explained how genetic modification can produce specific changes and why different modifications give different results. This session gave everyone a shared scientific language.",
  },
  {
    key: "m2",
    label: "2. Agriculture and food",
    body: "We applied those fundamentals to agriculture, exploring crop modification techniques and traits such as pest resistance and tolerance to extreme conditions. We focused on a crop that matters to local farming communities, the tomato. Volunteers analyzed the microorganisms that cause tomato diseases, how they spread, their symptoms and why they are hard to control. We then introduced greenhouses, which Kallpa Greenz builds across Peru. Together, volunteers worked through one question: how can we use biological knowledge to solve a problem a farmer actually faces?",
  },
  {
    key: "m3",
    label: "3. Emerging technologies",
    body: "We expanded into gene editing and CRISPR, controlled-environment agriculture and food production in space, linking them to space biomanufacturing and the biological systems space missions depend on. This connected Kallpa's hydroponics work to our own project, SHIHAB.",
  },
  {
    key: "m4",
    label: "4. Law, ethics and society",
    body: "We examined the Peruvian laws and organizations involved in GMO decision-making. In role-playing activities, volunteers represented consumers, farmers, indigenous communities, scientists and other groups. We discussed farmers' rights, regulation, and ethical and social concerns, so participants could weigh these perspectives and form their own informed opinions.",
  },
];

// Attaches rich per-section JSX (SectionedArticle/Article.jsx's `content`
// prop) to specific education.md sections by title, alongside their
// rendered markdown — see .claude/ARTICLE-STANDARDS.md on this pattern.
function withInteractiveContent(sections) {
  return sections.map((section) => {
    if (section.title === "Copy Paste Plants") {
      return { ...section, content: <CloneStepper /> };
    }
    if (section.title === "Kallpa Multiplier Mentorship (Peru)") {
      return {
        ...section,
        content: (
          <>
            <MultiplierScale />
            <h3>The four modules</h3>
            <Tabs items={KALLPA_MODULES} ariaLabel="Course modules" />
          </>
        ),
      };
    }
    return section;
  });
}

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
        sections={article.sections}
        defaultSelected={article.sections[0]?.title}
        panelHeader={picker}
      />
    </PageWrapper>
  );
}
