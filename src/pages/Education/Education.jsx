import { useState } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import tawasolHackathon from "../../content/en/tawasol-hackathon.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import styles from "./Education.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Education is a picker over several sub-articles, each its own full
// sectioned article (own ## table of contents). Add new entries here as
// more sub-articles are written.
const ARTICLES = [{ key: "tawasol-hackathon", title: "Tawasol Hackathon", sections: tawasolHackathon }];

export default function Education() {
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
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
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
