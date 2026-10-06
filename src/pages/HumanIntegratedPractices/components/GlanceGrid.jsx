import { glanceTiles } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

const PHOTO_BASE = "https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices/journey-map";

// Same slug rule as plugins/markdown-sections.js, which gives each "##" section's wrapper its id.
function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// "##" sections are found by id; "###" subsections have none, so match the heading text.
// Not "h2" by text: the side panel's entries are h2s with the same titles and would match first.
function jumpTo(target) {
  const el =
    document.getElementById(slugify(target)) ||
    [...document.querySelectorAll("h3")].find((h) => h.textContent.trim() === target);
  if (!el) return;
  el.style.scrollMarginTop = "100px";
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function GlanceGrid() {
  return (
    <div className={styles.glance}>
      <div className={styles.glanceGrid}>
        {/* Tiles 1/4/7, 2/5/8 and 3/6/9 share a column so a hovered tile can take
            height from the others in its column. `order` keeps reading order
            1..9 where the columns dissolve (narrow screens). */}
        {[0, 1, 2].map((col) => (
          <div className={styles.glanceCol} key={col}>
            {glanceTiles.map((tile, i) =>
              i % 3 !== col ? null : (
                <button
                  type="button"
                  key={tile.title}
                  className={styles.glanceTile}
                  style={{ order: i, ...(tile.photo ? { "--tile-photo": `url(${PHOTO_BASE}/${tile.photo}.avif)` } : {}) }}
                  onClick={() => jumpTo(tile.target)}
                >
                  <span className={styles.glanceNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.glanceArrow} aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M6 16L16 6M16 6H8M16 6v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className={styles.glanceText}>
                    <span className={styles.glanceTitle}>{tile.title}</span>
                    <span className={styles.glanceBody}>{tile.body}</span>
                  </span>
                  <span className={styles.glanceGlow} />
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
