import { useState } from "react";
import { values } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

// Four colour-coded cards; click (or Enter/Space) flips one to read its description.
// `items` defaults to the "Our values" cards; "From values to design" passes
// `designValues`, whose cards add a subtitle on the front and, on the back,
// what stakeholders said plus how it influenced SHIHAB.
export default function ValuesCards({ items = values }) {
  const [flipped, setFlipped] = useState(() => new Set());
  const toggle = (name) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <div className={styles.valuesGrid}>
      {items.map((v, i) => {
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
                <span className={styles.valueNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.valueName}>{v.name}</span>
                {v.subtitle && <span className={styles.valueSubtitle}>{v.subtitle}</span>}
                <span className={styles.valueHint}>Click to flip</span>
              </span>
              <span className={`${styles.valueFace} ${styles.valueBack}`} aria-hidden={!isFlipped}>
                <span className={styles.valueBackTitle}>{v.name}</span>
                {v.body ? (
                  <span className={styles.valueText}>{v.body}</span>
                ) : (
                  <>
                    <span className={`${styles.valueText} ${styles.valueHeard}`}>{v.heard}</span>
                    <span className={`${styles.valueText} ${styles.valueInfluence}`}>
                      <strong>How it influenced SHIHAB:</strong> {v.influence}
                    </span>
                  </>
                )}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
