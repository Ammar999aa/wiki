import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TeamPhotos.module.scss";

// Same team photos the landing page's Explore cards use as backgrounds
// (Home.jsx's EXPLORE_CARDS) — reused here until dedicated team-page shots
// are uploaded. Captions are those cards' own titles, not new claims.
const IMG = "https://static.igem.wiki/teams/6341/wiki/images/team";
const PHOTOS = [
  { src: `${IMG}/team.avif`, caption: "The team", alt: "The full team posing together on a bench" },
  { src: `${IMG}/wetlab.avif`, caption: "Wet Lab", alt: "Wet Lab members in gloves reviewing a protocol in the lab" },
  { src: `${IMG}/drylab.avif`, caption: "Dry Lab", alt: "Dry Lab members with laptops in a library" },
  { src: `${IMG}/hardware.avif`, caption: "Hardware", alt: "Hardware members wiring the bioreactor stand at a lab bench" },
  { src: `${IMG}/safety.avif`, caption: "Safety", alt: "Team members in the lab playfully pulling lab coats over their heads" },
  { src: `${IMG}/public-engagement.avif`, caption: "Public Engagement", alt: "Team members reading a planetary science book together on a sofa" },
  { src: `${IMG}/integrated-practices.avif`, caption: "Human Practices", alt: "Team members behind an outreach table with a 'Vote here' box" },
];

// How many photos show in the fanned stack beside the title — the rest are
// only in the gallery, so the stack stays small enough to fit the title
// row's height and never pushes the honeycomb down.
const STACK_COUNT = 3;

// A small, tilted stack of real team photos pinned beside the page title.
// It's absolutely positioned (see .stack), so it takes no layout space and
// the honeycomb's fit-to-viewport sizing (Honeycomb.jsx) is unaffected —
// it's showing actual photos, not a text link, that makes it obvious.
// Clicking opens a full-screen gallery.
export default function TeamPhotos() {
  const [index, setIndex] = useState(null);

  return (
    <>
      <button
        type="button"
        className={styles.stack}
        onClick={() => setIndex(0)}
        aria-haspopup="dialog"
        aria-label={`View team photos (${PHOTOS.length})`}
      >
        <span className={styles.cards}>
          {PHOTOS.slice(0, STACK_COUNT)
            .reverse()
            .map((photo, i) => (
              <img key={photo.src} src={photo.src} alt="" className={styles.card} style={{ "--i": STACK_COUNT - 1 - i }} />
            ))}
        </span>
        <span className={styles.label}>
          Team photos <span className={styles.count}>{PHOTOS.length}</span>
        </span>
      </button>

      {index != null && <Gallery index={index} setIndex={setIndex} onClose={() => setIndex(null)} />}
    </>
  );
}

function Gallery({ index, setIndex, onClose }) {
  const go = useCallback(
    (delta) => setIndex((i) => (i + delta + PHOTOS.length) % PHOTOS.length),
    [setIndex]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  const photo = PHOTOS[index];

  // Portalled to document.body (same as Lightbox.jsx) so it sits above the
  // fixed nav bar and the page's own stacking contexts.
  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Team photos">
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        ×
      </button>

      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <img key={photo.src} src={photo.src} alt={photo.alt} className={styles.image} />
        <figcaption className={styles.caption}>
          <span>{photo.caption}</span>
          <span className={styles.counter}>
            {index + 1} / {PHOTOS.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous photo"
      >
        ‹
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next photo"
      >
        ›
      </button>

      <div className={styles.thumbs} onClick={(e) => e.stopPropagation()}>
        {PHOTOS.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className={`${styles.thumb} ${i === index ? styles.thumbActive : ""}`}
            onClick={() => setIndex(i)}
            aria-label={p.caption}
            aria-current={i === index || undefined}
          >
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
