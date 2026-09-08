import styles from "../SectionedArticle.module.scss";

export default function ArticleBody({ title, intro, sections, sectionRefs, panelCollapsed }) {
  return (
    <div className={`${styles.article} ${panelCollapsed ? styles.articleShifted : ""}`}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
      {intro && <div className={styles.intro}>{intro}</div>}
      {sections.map((section, i) => (
        <div
          key={section.title}
          id={section.id}
          ref={(el) => (sectionRefs.current[i] = el)}
          data-title={section.title}
        >
          <h2>{section.title}</h2>
          {section.html && (
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          )}
          {section.content}
        </div>
      ))}
    </div>
  );
}