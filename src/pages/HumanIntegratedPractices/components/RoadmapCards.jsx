import { useState } from "react";
import { roadmapSteps } from "../data.js";
import styles from "./RoadmapCards.module.scss";

const PHOTO_BASE =
  "https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices";

// "Building a path to space": one photo card per roadmap stage, styled like the
// Home page's explore cards. Clicking a card dims its photo, lifts the title and
// reveals that stage's steps one after another. Cards open independently.
export default function RoadmapCards() {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={styles.roadmap}>
      <ol className={styles.grid}>
        {roadmapSteps.map((step, i) => {
          const isOpen = open.has(i);
          const detailsId = `roadmap-step-${i + 1}`;
          return (
            // The whole card is clickable; the button inside gives keyboard and
            // screen-reader access, and its click bubbles up to this handler.
            <li
              key={step.title}
              className={`${styles.card} ${isOpen ? styles.open : ""}`}
              style={{ "--img": `url(${PHOTO_BASE}/${step.photo})` }}
              onClick={() => toggle(i)}
            >
              <span className={styles.bg} aria-hidden="true" />
              <button
                type="button"
                className={styles.head}
                aria-expanded={isOpen}
                aria-controls={detailsId}
              >
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.icon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className={styles.title}>{step.title}</span>
                <span className={styles.subtitle}>{step.subtitle}</span>
              </button>
              <div
                id={detailsId}
                className={styles.details}
                aria-hidden={!isOpen}
              >
                <div className={styles.detailsInner}>
                  <ul className={styles.list}>
                    {step.points.map((point, pi) => (
                      <li
                        key={point}
                        className={styles.point}
                        style={{ "--i": pi }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
