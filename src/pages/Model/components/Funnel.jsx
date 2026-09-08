import styles from "../Model.module.scss";

// Attrition funnel: bar length is log-scaled against the largest step (the
// same "linear would make the last stages invisible" reasoning as the
// reference page), unless a step is flagged `gate`, which instead scales
// linearly against the funnel's first step — used by the locked-rule figure
// where the drop is small enough that log-scaling would flatten it.
export default function Funnel({ steps, scale = "log" }) {
  const ref =
    scale === "log"
      ? Math.max(...steps.map((s) => Math.log10(s.n)))
      : Math.max(...steps.map((s) => s.n));
  return (
    <div className={styles.funnel}>
      {steps.map((s, i) => {
        const raw = scale === "log" ? Math.log10(s.n) / ref : s.n / ref;
        const pct = Math.max(scale === "log" ? 2 : 6, raw * 100);
        const barClass = s.hi ? styles.hi : s.gate ? styles.gate : "";
        return (
          <div className={styles.fstep} key={s.lab}>
            <div className={styles.fbarWrap}>
              <div className={styles.flab}>
                <span className={styles.st}>{String(i + 1).padStart(2, "0")}</span>
                <span>{s.lab}</span>
                <span className={styles.meth}>{s.meth}</span>
              </div>
              <div className={`${styles.fbar} ${barClass}`} style={{ width: `${pct.toFixed(1)}%` }} />
            </div>
            <div className={styles.fcnt}>
              {s.n.toLocaleString()}
              <small>{s.unit}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
