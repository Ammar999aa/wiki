import { useEffect, useRef, useState } from "react";
import styles from "./PhotoDeck.module.scss";

// A deck of photos stacked like prints: click, swipe or the arrows to send
// the top one to the back. Auto-advances while on screen and not hovered.
// First built for the Education page's Jeddah session photos (Genesis's
// School Outreach mockup), shared so the landing page can use the same deck.
//
// photos: [{ src, alt, title?, sub? }]. With titles, the top photo's
// title/sub sit between the arrows; without, a "2 / 3" counter does.
// compact: smaller arrows set closer under the deck, for tight layouts.

const cx = (...names) => names.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function PhotoDeck({ photos, className, compact = false, interval = 6500 }) {
  const [order, setOrder] = useState(photos.map((_, i) => i));
  const [flying, setFlying] = useState(null);
  const busy = useRef(false);
  const hovered = useRef(false);
  const deckRef = useRef(null);
  const startX = useRef(null);

  const next = () => {
    if (busy.current) return;
    busy.current = true;
    setFlying(order[0]);
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setFlying(null);
      setTimeout(() => (busy.current = false), 500);
    }, 380);
  };
  const prev = () => {
    if (busy.current) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };

  // Auto-advance while on screen and not hovered.
  const nextRef = useRef(next);
  nextRef.current = next;
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const id = setInterval(() => {
      const el = deckRef.current;
      if (!el || hovered.current || document.hidden) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0 && r.left < window.innerWidth && r.right > 0) nextRef.current();
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  const top = photos[order[0]];
  return (
    <div className={cx(styles.deckWrap, compact && styles.compact, className)}>
      <div
        ref={deckRef}
        className={styles.deck}
        role="button"
        tabIndex={0}
        aria-label="Next photo"
        onClick={next}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            next();
          }
        }}
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current !== null && Math.abs(e.clientX - startX.current) > 50) {
            e.stopPropagation();
            if (e.clientX < startX.current) next();
            else prev();
          }
          startX.current = null;
        }}
      >
        {photos.map(({ src, alt, title }, i) => {
          const p = order.indexOf(i);
          return (
            <div
              key={src}
              className={cx(styles.card, p === 0 && styles.cardTop, flying === i && styles.cardFly)}
              style={{ "--p": p, zIndex: 10 - p }}
            >
              <img src={src} alt={alt ?? title} loading="lazy" />
            </div>
          );
        })}
      </div>
      <div className={styles.deckControls}>
        <button type="button" aria-label="Previous photo" onClick={prev}>
          ‹
        </button>
        <div className={styles.deckCap} aria-live="polite">
          {top.title ? (
            <>
              <b>{top.title}</b>
              <span>{top.sub}</span>
            </>
          ) : (
            <span className={styles.deckCount}>
              {order[0] + 1} / {photos.length}
            </span>
          )}
        </div>
        <button type="button" aria-label="Next photo" onClick={next}>
          ›
        </button>
      </div>
    </div>
  );
}
