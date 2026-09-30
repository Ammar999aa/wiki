import { useEffect, useRef } from "react";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import ProteinGlyph from "./ProteinGlyph";
import StructureViewer from "./StructureViewer";
import styles from "./ProteinLibrary.module.scss";

// The floating panel a selected protein opens into — a dimmed backdrop
// (this component's own root, click-to-close) that covers the whole grid,
// with the panel itself on top, rather than growing that card's tile in
// place and pushing its neighbors aside.
export default function ProteinDetail({ protein, onClose }) {
  const closeRef = useRef(null);
  const titleId = `protein-detail-title-${protein.id}`;

  // Land focus on the close button as soon as the panel mounts, so
  // keyboard users land somewhere inside the dialog rather than on
  // whatever's behind the backdrop.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.detailPanelWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ "--accent": protein.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.09} grain drift>
          <div className={styles.detailPanel}>
            <div className={styles.detailHeader}>
              <div className={styles.glyphWrap}>
                <ProteinGlyph variant={protein.glyph} color={protein.color} />
              </div>
              <div className={styles.headerText}>
                <h3 id={titleId} className={styles.name}>
                  {protein.name}
                </h3>
                <p className={styles.subtitle}>{protein.subtitle}</p>
              </div>
              {protein.tested && <span className={styles.testedBadge}>✓ TESTED</span>}
              <button ref={closeRef} type="button" className={styles.closeButton} onClick={onClose}>
                <span aria-hidden="true">×</span>
                <span className={styles.srOnly}>Close</span>
              </button>
            </div>

            <p className={styles.detailShortDesc}>{protein.shortDescription}</p>

            <div className={styles.detailBody}>
              <StructureViewer structure={protein.structure} color={protein.color} />

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
                <p className={styles.detailLabel}>Host organisms</p>
                <p className={styles.detailText}>{protein.host}</p>
              </div>

              <p className={styles.detailStatus}>{protein.status}</p>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
