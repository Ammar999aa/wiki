import { useState } from "react";
import { values } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

// Four colour-coded cards; click (or Enter/Space) flips one to read its description.
export default function ValuesCards() {
  const [flipped, setFlipped] = useState(() => new Set());
  const toggle = (name) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <div className={styles.valuesGrid}>
      {values.map((v) => {
        const isFlipped = flipped.has(v.name);
        return (
          <button
            type="button"
            key={v.name}
            className={styles.valueCard}
            data-tone={v.tone}
            data-flipped={isFlipped}
            aria-pressed={isFlipped}
            onClick={() => toggle(v.name)}
          >
            <span className={styles.valueInner}>
              <span className={`${styles.valueFace} ${styles.valueFront}`} aria-hidden={isFlipped}>
                <span className={styles.valueName}>{v.name}</span>
                <span className={styles.valueHint}>Click to flip</span>
              </span>
              <span className={`${styles.valueFace} ${styles.valueBack}`} aria-hidden={!isFlipped}>
                <span className={styles.valueBackTitle}>{v.name}</span>
                <span className={styles.valueText}>{v.body}</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
