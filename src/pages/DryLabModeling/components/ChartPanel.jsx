import styles from "../DryLabModeling.module.scss";

// Bordered glass card for one chart, reusing the markdown system's own
// `.panel`/`.panel-title` classes (see MARKDOWN-COMPONENTS.md) so a chart
// reads as the same kind of surface as any other figure on this page —
// those classes are plain global strings here (not a CSS-module import)
// since they're defined as `:global(.panel)` scoped under SectionedArticle's
// `.article` wrapper, and every chart slot renders as a descendant of it.
export default function ChartPanel({ title, sub, legend, children }) {
  return (
    <div className="panel">
      <div className="panel-title">
        <span>{title}</span>
        {legend}
      </div>
      {sub && <p className={styles.statLine} style={{ marginTop: -8, marginBottom: 14 }}>{sub}</p>}
      {children}
    </div>
  );
}

export function Legend({ items }) {
  return (
    <div className={styles.legend}>
      {items.map((it) => (
        <span key={it.label} className={styles.legendItem}>
          <i
            className={it.dashed ? styles.swatchLine : styles.swatch}
            style={{ background: it.dashed ? "none" : it.color, borderTop: it.dashed ? `2px dashed ${it.color}` : "none" }}
          />
          {it.label}
        </span>
      ))}
    </div>
  );
}
