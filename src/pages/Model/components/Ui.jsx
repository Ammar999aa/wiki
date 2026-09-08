// Small shared building blocks for the Model page's sections — a callout
// box, a card grid, a status pill, a table shell and an expandable details
// block. Kept together in one file since none of these is more than a
// handful of lines; the bigger, single-purpose pieces (charts, explorer,
// funnel, references) each get their own file.
import styles from "../Model.module.scss";

// In-page cross-reference, e.g. <SecRef n="07">§07</SecRef> → jumps to the
// section whose id is "s07".
export function SecRef({ n, children }) {
  return <a href={`#s${n}`}>{children}</a>;
}

export function Callout({ tone, label, children }) {
  return (
    <div className={`${styles.note} ${tone ? styles[tone] : ""}`}>
      {label && <span className={styles.noteLabel}>{label}</span>}
      {children}
    </div>
  );
}

export function CardGrid({ children }) {
  return <div className={styles.cardGrid}>{children}</div>;
}

export function Card({ tag, title, children }) {
  return (
    <div className={styles.card}>
      {tag && <span className={styles.cardTag}>{tag}</span>}
      {title && <h5>{title}</h5>}
      <p>{children}</p>
    </div>
  );
}

export function Pill({ tone = "neutral", children }) {
  return <span className={`${styles.pill} ${styles[tone] || ""}`}>{children}</span>;
}

export function TableWrap({ children }) {
  return (
    <div className={styles.bleed}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>{children}</table>
      </div>
    </div>
  );
}

export function Caption({ n, children }) {
  return (
    <p className={styles.cap}>
      <b>{n}.</b> {children}
    </p>
  );
}

export function Details({ summary, children }) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{summary}</summary>
      <div className={styles.detBody}>{children}</div>
    </details>
  );
}

export function ChartPanel({ title, sub, legend, children }) {
  return (
    <div className={styles.bleed}>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}>{title}</span>
            {legend}
          </div>
          {sub && <p className={styles.panelSub}>{sub}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

export function Legend({ items }) {
  return (
    <div className={styles.legend}>
      {items.map((it) => (
        <span key={it.label} className={styles.item}>
          <i className={styles.swatch} style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}
