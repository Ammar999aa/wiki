import styles from "../Model.module.scss";
import { CONSERVATION_BARS, SENSITIVITY_BARS, STATUS_COLOR } from "../data";

// Figure 3 — raw vs. depth-matched conservation per family.
export function ConservationBars() {
  return (
    <div className={styles.bars}>
      {CONSERVATION_BARS.map((r) => (
        <div key={r.fam} className={styles.brow} style={{ gridTemplateColumns: "132px minmax(0,1fr) 82px" }}>
          <div>
            <span style={{ fontStyle: "italic", color: "white" }}>{r.fam}</span>
            <span style={{ fontFamily: "var(--doc-mono)", fontSize: 10, color: "var(--doc-faint)", marginLeft: 7 }}>
              n={r.n}
            </span>
            <div style={{ fontFamily: "var(--doc-mono)", fontSize: 10, color: "var(--doc-muted)", marginTop: 2 }}>
              {r.rank}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div className={styles.btrack}>
              <div className={styles.bfill} style={{ width: `${r.raw}%`, background: "var(--doc-faint)" }} />
            </div>
            <div className={styles.btrack}>
              <div className={styles.bfill} style={{ width: `${r.adj}%`, background: "#0C8FBD" }} />
            </div>
          </div>
          <div className={styles.bv} style={{ fontSize: 12, lineHeight: 1.35 }}>
            <span style={{ color: "var(--doc-muted)", fontWeight: 400 }}>{r.raw.toFixed(1)}%</span>
            <br />
            {r.adj.toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
}

// Figure 5 — P(top-1 candidate survives weight perturbation) per category.
export function SensitivityBars() {
  return (
    <div className={styles.bars}>
      {SENSITIVITY_BARS.map((r) => (
        <div
          key={r.cat}
          className={styles.brow}
          style={{ gridTemplateColumns: "minmax(150px,182px) minmax(0,1fr) 56px", alignItems: "start" }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 12.5, color: "white" }}>{r.cat}</div>
            <div style={{ fontFamily: "var(--doc-mono)", fontSize: 10, color: "var(--doc-muted)", marginTop: 2, fontStyle: "italic" }}>
              {r.pick}
            </div>
          </div>
          <div>
            <div className={styles.btrack} style={{ marginTop: 3 }}>
              <div className={styles.bfill} style={{ width: `${r.p * 100}%`, background: STATUS_COLOR[r.tone] }} />
            </div>
            <div style={{ fontFamily: "var(--doc-mono)", fontSize: 10.5, color: "var(--doc-muted)", marginTop: 5, lineHeight: 1.5 }}>
              {r.note}
            </div>
          </div>
          <div className={styles.bv} style={{ paddingTop: 1 }}>
            {r.p.toFixed(3)}
          </div>
        </div>
      ))}
    </div>
  );
}
