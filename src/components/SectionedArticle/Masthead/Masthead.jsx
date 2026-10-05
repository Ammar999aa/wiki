import { Fragment } from "react";
import styles from "../SectionedArticle.module.scss";

// Shared masthead — an eyebrow line plus a one-sentence deck, sitting in
// SectionedArticle's `intro` slot between the <h1> and the first section's
// own heading. Generalizes the pattern Model.jsx/Model.module.scss
// introduced (see .claude/ARTICLE-STANDARDS.md "A masthead that states
// scope before the prose starts") so every archetype-2 page can use it
// without each one re-inventing its own eyebrow/deck styling.
//
// `eyebrow` is an array of strings/nodes rendered dot-separated; its first
// item should be the nav trail the reader actually clicked through (e.g.
// ["Dry Lab", "Overview"]) so the eyebrow doubles as confirmation of the
// nav label, not just metadata — see ARTICLE-STANDARDS.md §1 and the UI/UX
// audit finding "Page title doesn't confirm the nav label the reader
// clicked."
//
// `stats` (optional) is the headline-number grid from Model's masthead:
// [{ value: "25 min", label: "Doubling time at 37 °C", hi: true }, ...].
// 3–6 cells, `hi` on at most two — every number must also appear, sourced,
// in the page body.
export default function Masthead({ eyebrow, deck, stats }) {
  return (
    <div className={styles.masthead}>
      {eyebrow?.length > 0 && (
        <p className={styles.mastheadEyebrow}>
          {eyebrow.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && <span className={styles.mastheadDot} />}
              <span>{item}</span>
            </Fragment>
          ))}
        </p>
      )}
      {deck && <p className={styles.mastheadDeck}>{deck}</p>}
      {stats?.length > 0 && (
        <div className={styles.mastheadStats}>
          {stats.map((stat) => (
            <div key={stat.label} className={`${styles.mastheadStat} ${stat.hi ? styles.mastheadStatHi : ""}`}>
              <span className={styles.mastheadStatValue}>{stat.value}</span>
              <span className={styles.mastheadStatLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
