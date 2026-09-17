import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedPage.module.scss";

// Mirrors SectionedArticle/Panel/Panel.jsx's collapse/arrow pattern, but
// flipped: this panel sits on the inline-end (right) edge instead of the
// inline-start edge, so the collapse direction and the arrow glyph are both
// mirrored versions of that component's.
export default function Panel({ items, selected, collapsed, onToggle, onSelect }) {
  return (
    <div className={`${styles.panelContainer} ${collapsed ? styles.collapsed : ""}`}>
      <LiquidGlass radius={0} color={[52, 52, 52]} opacity={0.25} grain drift>
        <div className={styles.panelContents}>
          <button
            type="button"
            className={`${styles.arrow} ${collapsed ? styles.flipped : ""}`}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Show attributions list" : "Hide attributions list"}
            onClick={onToggle}
          >
            <svg width="46" height="46" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.25 19V46.5L37 32.75L23.25 19Z" fill="#E3E3E3" />
            </svg>
          </button>
          {items.map((item) =>
            item.heading ? (
              <p key={item.heading} className={styles.panelHeading}>
                {item.heading}
              </p>
            ) : (
              <h3
                key={item.title}
                className={`${styles.panelItem} ${item.title === selected ? styles.selected : ""}`}
                onClick={() => onSelect(item.title)}
              >
                {item.title}
              </h3>
            )
          )}
        </div>
      </LiquidGlass>
    </div>
  );
}
