import { useState } from "react";
import { stakeholderGroups } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

export default function StakeholderPuzzle() {
  const [selected, setSelected] = useState(0);
  const [asTable, setAsTable] = useState(false);
  const group = stakeholderGroups[selected];

  if (asTable) {
    return (
      <div className={styles.puzzleWrap}>
        <button type="button" className={styles.puzzleToggle} onClick={() => setAsTable(false)}>
          View as puzzle
        </button>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Stakeholder group</th>
                <th>What we need to learn from them</th>
                <th>How it could influence SHIHAB</th>
              </tr>
            </thead>
            <tbody>
              {stakeholderGroups.map((g) => (
                <tr key={g.name}>
                  <td>{g.name}</td>
                  <td>
                    {g.learn.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </td>
                  <td>{g.influence.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.puzzleWrap}>
      <button type="button" className={styles.puzzleToggle} onClick={() => setAsTable(true)}>
        View as table
      </button>
      <div className={styles.puzzleGrid} role="tablist" aria-label="Stakeholder groups">
        {stakeholderGroups.map((g, i) => (
          <button
            type="button"
            key={g.name}
            role="tab"
            aria-selected={i === selected}
            className={`${styles.puzzlePiece} ${styles[`piece${i}`]} ${i === selected ? styles.selected : ""}`}
            onClick={() => setSelected(i)}
          >
            <span className={styles.puzzleName}>{g.name}</span>
          </button>
        ))}
        {/* Decorative interlocking tabs — a circle straddling each internal
            seam, matching the piece styling, so it reads as a puzzle nub
            without needing complementary notches on each piece (same
            technique as https://stackoverflow.com/a/64694601). */}
        <span className={`${styles.puzzleTab} ${styles.tabTop1}`} aria-hidden="true" />
        <span className={`${styles.puzzleTab} ${styles.tabTop2}`} aria-hidden="true" />
        <span className={`${styles.puzzleTab} ${styles.tabBottom}`} aria-hidden="true" />
        <span className={`${styles.puzzleTab} ${styles.tabMid1}`} aria-hidden="true" />
        <span className={`${styles.puzzleTab} ${styles.tabMid2}`} aria-hidden="true" />
      </div>
      <div className="two-col-tracks">
        <div>
          <h4>What we need to learn from {group.name}</h4>
          <ul>
            {group.learn.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>How it could influence SHIHAB</h4>
          <ul>
            {group.influence.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
