import { useState } from "react";
import Lightbox from "../Lightbox/Lightbox";
import styles from "../SectionedArticle.module.scss";

export default function ArticleBody({ title, intro, sections, sectionRefs }) {
  const [zoomed, setZoomed] = useState(null); // { src, alt } | null

  // One delegated handler on the whole article body, rather than wiring
  // every <img> individually — covers both markdown-rendered images
  // (section.html, dangerouslySetInnerHTML'd) and any hand-written JSX
  // images in a custom section.content, uniformly.
  const onClick = (e) => {
    if (e.target.tagName === "IMG") {
      setZoomed({ src: e.target.currentSrc || e.target.src, alt: e.target.alt });
    }
  };

  return (
    <div className={styles.article} onClick={onClick}>
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
      <Lightbox src={zoomed?.src} alt={zoomed?.alt} onClose={() => setZoomed(null)} />
    </div>
  );
}