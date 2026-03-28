import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedPage.module.scss";

export default function Panel({ items, selected, onSelect }) {
  return (
    <div className={styles.panelContainer}>
      <LiquidGlass radius={0} color={[52, 52, 52]} opacity={0.25}>
        <div className={styles.panelContents}>
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