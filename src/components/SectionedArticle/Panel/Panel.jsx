import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedArticle.module.scss";

export default function Panel({ items, selected, collapsed, onToggle, onSelect }) {
  return (
    <div className={`${styles.panelContainer} ${collapsed ? styles.collapsed : ""}`}>
      <LiquidGlass radius={0} color={[52, 52, 52]} opacity={0.25}>
        <div className={styles.panelContents}>
          <button
            type="button"
            className={`${styles.arrow} ${collapsed ? styles.flipped : ""}`}
            aria-expanded={!collapsed}
            onClick={onToggle}
          >
            <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.75 46.5V19L29 32.75L42.75 46.5Z" fill="#E3E3E3" />
            </svg>
          </button>
          {items.map((item, i) => (
            <h2
              key={item}
              className={`${styles.panelItem} ${item === selected ? styles.selected : ""}`}
              onClick={() => onSelect(i)}
            >
              {item}
            </h2>
          ))}
        </div>
      </LiquidGlass>
    </div>
  );
}