import styles from "../SectionedArticle.module.scss";

export default function ArticleBody({ sections, sectionRefs }) {
  return (
    <div className={styles.article}>
      {sections.map((section, i) => (
        <div key={section.title} ref={(el) => (sectionRefs.current[i] = el)}>
          <h2>{section.title}</h2>
          {section.content}
        </div>
      ))}
    </div>
  );
}