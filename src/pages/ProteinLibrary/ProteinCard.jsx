import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import ProteinGlyph from "./ProteinGlyph";
import styles from "./ProteinLibrary.module.scss";

// One uniform grid tile — always the same size, never resizes on selection.
// Clicking opens the full write-up in <ProteinDetail>, a floating overlay
// (see ProteinLibrary.jsx) that covers the grid instead of growing this
// tile in place and reflowing its neighbors.
export default function ProteinCard({ protein, active, onSelect }) {
  return (
    <article className={`${styles.card} ${active ? styles.active : ""}`} style={{ "--accent": protein.color }}>
      <LiquidGlass radius={32} color={[0, 0, 0]} opacity={0.07}>
        <button
          type="button"
          className={styles.cardHeader}
          onClick={onSelect}
          aria-haspopup="dialog"
          aria-expanded={active}
        >
          {/* Badge + toggle moved to their own row below, instead of
              sharing the icon/name row — sharing it left name+subtitle so
              little width that long subtitles like "anti-HSV —
              Single-domain antibody" were cut off almost immediately. */}
          <div className={styles.headerTop}>
            <div className={styles.glyphWrap}>
              <ProteinGlyph variant={protein.glyph} color={protein.color} />
            </div>
            <div className={styles.headerText}>
              <h3 className={styles.cardName}>{protein.cardName ?? protein.name}</h3>
              <p className={styles.cardSubtitle}>{protein.subtitle}</p>
            </div>
          </div>
          <div className={styles.headerMeta}>
            {protein.tested && <span className={styles.testedBadge}>✓ TESTED</span>}
            <span className={styles.toggleIcon} aria-hidden="true">
              +
            </span>
          </div>
        </button>

        <p className={styles.shortDesc}>{protein.shortDescription}</p>
      </LiquidGlass>
    </article>
  );
}
