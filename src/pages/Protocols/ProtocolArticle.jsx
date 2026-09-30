import { useEffect } from "react";
import styles from "./Protocols.module.scss";

// The full-page reading view a selected protocol swaps into (see
// Protocols.jsx) — a back arrow to return to the grid, the protocol's own
// rendered markdown body, and a prev/next pager through the flat protocol
// order at the bottom, so browsing a run of related protocols (e.g. every
// B. subtilis step) doesn't mean bouncing back to the grid each time.
export default function ProtocolArticle({ protocol, onBack, prev, next, onSelect }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBack]);

  return (
    <div className={styles.articlePage}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        <span aria-hidden="true">←</span> Back to protocols
      </button>

      <article className={styles.article}>
        <h1 className={styles.articleTitle}>{protocol.title}</h1>
        <div className={styles.detailBody} dangerouslySetInnerHTML={{ __html: protocol.html }} />
      </article>

      <nav className={styles.pager} aria-label="Protocol navigation">
        {prev ? (
          <button type="button" className={`${styles.pagerButton} ${styles.pagerPrev}`} onClick={() => onSelect(prev.title)}>
            <span className={styles.pagerArrow} aria-hidden="true">←</span>
            <span className={styles.pagerText}>
              <span className={styles.pagerLabel}>Previous</span>
              <span className={styles.pagerTitle}>{prev.title}</span>
            </span>
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button type="button" className={`${styles.pagerButton} ${styles.pagerNext}`} onClick={() => onSelect(next.title)}>
            <span className={styles.pagerText}>
              <span className={styles.pagerLabel}>Next</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </span>
            <span className={styles.pagerArrow} aria-hidden="true">→</span>
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
