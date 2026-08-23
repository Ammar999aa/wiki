import ProteinGlyph from "./ProteinGlyph";
import styles from "./ProteinLibrary.module.scss";

export default function ProteinCard({ protein, expanded, dimmed, onToggle }) {
  const detailId = `protein-detail-${protein.id}`;

  return (
    <article
      className={`${styles.card} ${expanded ? styles.expanded : ""} ${dimmed ? styles.dimmed : ""}`}
      style={{ "--accent": protein.color }}
    >
      <button
        type="button"
        className={styles.cardHeader}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailId}
      >
        <div className={styles.glyphWrap}>
          <ProteinGlyph variant={protein.glyph} color={protein.color} />
        </div>
        <div className={styles.headerText}>
          <h3 className={styles.name}>{protein.name}</h3>
          <p className={styles.subtitle}>{protein.subtitle}</p>
        </div>
        {protein.tested && <span className={styles.testedBadge}>✓ TESTED</span>}
        <span className={styles.toggleIcon} aria-hidden="true">
          {expanded ? "×" : "+"}
        </span>
      </button>

      <p className={styles.shortDesc}>{protein.shortDescription}</p>

      <div id={detailId} className={styles.detailWrap}>
        <div className={styles.detailInner}>
          <div className={styles.detailSection}>
            <p className={styles.detailLabel}>Function</p>
            <p className={styles.detailText}>{protein.function}</p>
          </div>

          <div className={styles.detailSection}>
            <p className={styles.detailLabel}>Applications</p>
            <ul className={styles.detailList}>
              {protein.applications.map((app) => (
                <li key={app}>{app}</li>
              ))}
            </ul>
          </div>

          <div className={styles.detailSection}>
            <p className={styles.detailLabel}>Why it matters</p>
            <p className={styles.detailText}>{protein.why}</p>
          </div>

          <div className={styles.detailGrid}>
            <div>
              <p className={styles.detailLabel}>Host organisms</p>
              <p className={styles.detailText}>{protein.host}</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Delivery</p>
              <p className={styles.detailText}>{protein.delivery}</p>
            </div>
          </div>

          <p className={styles.detailStatus}>{protein.status}</p>
        </div>
      </div>
    </article>
  );
}
