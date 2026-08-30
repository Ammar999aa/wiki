import { useState, useRef, useEffect } from "react";
import Panel from "./Panel/Panel";
import Article from "./Article/Article";
import styles from "./SectionedArticle.module.scss";

export default function SectionedArticle({ sections, defaultSelected, title, panelHeader }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState(defaultSelected || sections[0]?.title);
  const sectionRefs = useRef({});

  useEffect(() => {
    setSelected(sections[0]?.title);
  }, [sections]);

  const scrollTo = (index) => {
    setSelected(sections[index].title);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSelected(entry.target.dataset.title);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className={styles.layout}>
        <Panel
            items={sections.map((s) => s.title)}
            selected={selected}
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            onSelect={scrollTo}
            header={panelHeader}
        />
        <Article
            title={title}
            sections={sections}
            sectionRefs={sectionRefs}
            panelCollapsed={collapsed}
        />
    </div>
  );
}