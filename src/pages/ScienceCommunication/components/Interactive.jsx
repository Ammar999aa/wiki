import { useState } from "react";
import AnimatedSwap from "../../../components/AnimatedSwap/AnimatedSwap";
import styles from "./Interactive.module.scss";

// Visualizes the one real number pair the WALL-E writeup already states in
// prose (70 watched, 50 stayed for the discussion) as two proportional
// bars instead of leaving it buried in a sentence — see
// .claude/ARTICLE-STANDARDS.md §3 on showing a number rather than only
// asserting it. Both counts are real reported attendance, not illustrative.
export function AttendanceFunnel({ rows }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div
      className={styles.funnel}
      aria-label={rows.map((r) => `${r.value} ${r.label}`).join(", ")}
    >
      {rows.map((r, i) => (
        <div className={styles.funnelRow} key={r.label}>
          <div className={styles.funnelBarTrack}>
            <div
              className={`${styles.funnelBarFill} ${i === 1 ? styles.funnelBarFill2 : ""}`}
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
          <span className={styles.funnelLabel}>
            {r.value} {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// A lighthearted replica of the actual door mechanic from the WALL-E movie
// night (see event structure above): attendees really were sorted into
// one of these three crews and roles. Draws client-side; no attendance
// record is implied or stored.
const CREWS = ["Biobuilders", "Plant Rescue", "Green Galaxy"];
const ROLES = ["Robot Engineer", "Space Pilot", "Plant Scientist"];

export function CrewGenerator() {
  const [assignment, setAssignment] = useState(null);

  const assign = () => {
    const crew = CREWS[Math.floor(Math.random() * CREWS.length)];
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];
    setAssignment({ crew, role });
  };

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>Join a crew, just like our guests did</p>
      <div className={styles.crew}>
        <button type="button" className={styles.crewBtn} onClick={assign}>
          {assignment ? "Assign a new crew" : "Assign my crew"}
        </button>
        <AnimatedSwap
          swapKey={
            assignment ? `${assignment.crew}-${assignment.role}` : "empty"
          }
          className={`${styles.badge} ${assignment ? styles.badgeFilled : ""}`}
          aria-live="polite"
        >
          <span className={styles.badgeCrew}>{assignment?.crew || "Crew"}</span>
          <span className={styles.badgeRole}>{assignment?.role || "Role"}</span>
        </AnimatedSwap>
      </div>
    </div>
  );
}

// items: [{ title, date, next? }] — `next` marks the one upcoming/planned
// stage with a dashed marker instead of a solid one, same "honest pending
// state" idiom as a .callout.warn (see MARKDOWN-COMPONENTS.md).
export function Timeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((it) => (
        <li
          key={it.title}
          className={`${styles.timelineItem} ${it.next ? styles.timelineNext : ""}`}
        >
          <span className={styles.timelineTitle}>{it.title}</span>
          <span className={styles.timelineDate}>{it.date}</span>
        </li>
      ))}
    </ol>
  );
}

// Tap-to-flip Arabic glossary cards — a small, real instance of exactly
// the kind of term standardization work Tawasol goal #1 describes
// ("co-create accessible, standardized ... glossaries ... in Arabic").
// terms: [{ en, ar }]
export function TermFlipCards({ terms }) {
  const [flipped, setFlipped] = useState(() => new Set());

  const toggle = (en) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(en)) next.delete(en);
      else next.add(en);
      return next;
    });
  };

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>
        How do you say it in Arabic? Tap a card to flip it
      </p>
      <div className={styles.terms}>
        {terms.map((t) => {
          const isFlipped = flipped.has(t.en);
          return (
            <button
              key={t.en}
              type="button"
              className={`${styles.term} ${isFlipped ? styles.termFlipped : ""}`}
              aria-pressed={isFlipped}
              onClick={() => toggle(t.en)}
            >
              <span className={styles.termInner}>
                <span className={styles.termFace}>{t.en}</span>
                <span className={styles.termBack} lang="ar">
                  {t.ar}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
