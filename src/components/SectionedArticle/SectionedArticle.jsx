import { useState, useRef } from "react";
import Panel from "./Panel/Panel";
import Article from "./Article/Article";
import styles from "./SectionedArticle.module.scss";

export default function SectionedArticle({ sections, defaultSelected }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState(defaultSelected || sections[0]?.title);
  const sectionRefs = useRef({});

  const scrollTo = (index) => {
    setSelected(sections[index].title);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.layout}>
      <Panel
        items={sections.map((s) => s.title)}
        selected={selected}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onSelect={scrollTo}
      />
      <Article sections={sections} sectionRefs={sectionRefs} />
    </div>
  );
}