import styles from "../DryLabModeling.module.scss";

// A small categorical bar chart (aerobic vs anaerobic growth rate, the
// nutrient-cascade stages) — plain HTML/CSS rather than SVG since it's just
// N flat-topped bars, no axes or continuous curve to draw.
export default function BarChart({ bars, unit = "", maxY, formatValue = (v) => v.toFixed(4), largeLabels = false }) {
  const max = maxY ?? Math.max(...bars.map((b) => b.value)) * 1.15;
  return (
    <div className={largeLabels ? `${styles.barChart} ${styles.barChartLargeLabels}` : styles.barChart}>
      {bars.map((b) => (
        <div className={styles.barCol} key={b.label}>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ height: `${Math.max(2, (b.value / max) * 100)}%`, background: b.color }}
            >
              <div className={styles.barValue} style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)" }}>
                {formatValue(b.value)}
                {unit}
              </div>
            </div>
          </div>
          <div className={styles.barLabel}>{b.label}</div>
        </div>
      ))}
    </div>
  );
}
