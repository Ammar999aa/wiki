import styles from "../SectionedArticle.module.scss";

export default function ArticleBody({ sections, sectionRefs, panelCollapsed }) {
  return (
    <div className={`${styles.article} ${panelCollapsed ? styles.articleShifted : ""}`}>
      {sections.map((section, i) => (
        <div key={section.title} ref={(el) => (sectionRefs.current[i] = el)}>
          <h2>{section.title}</h2>
          {section.content}
        </div>
      ))}
    </div>
  );
}