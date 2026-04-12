import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedPage.module.scss";

export default function Panel({ items, selected, onSelect }) {
  return (
    <div className={styles.panelContainer}>
      <LiquidGlass radius={0} color={[52, 52, 52]} opacity={0.25}>
        <div className={styles.panelContents}>
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
