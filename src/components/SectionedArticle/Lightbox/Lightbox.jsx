import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Lightbox.module.scss";

// Full-screen click-to-zoom overlay for a single article image. Portalled to
// document.body (same pattern as PageWrapper's background) so it escapes
// <Article>'s `position: absolute` box and any section's stacking context
// rather than being clipped by them.
export default function Lightbox({ src, alt, onClose }) {
  // <Lightbox> is always mounted by Article.jsx (src is null until an image
  // is clicked), so this effect must no-op while closed — otherwise it
  // locks page scroll from the moment the article renders, not just while
  // the overlay is actually open.
  useEffect(() => {
    if (!src) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    // Lock page scroll while the overlay is open — this is a routes-are-one-
    // long-scroll site (SectionedArticle drives its progress rail off
    // document scroll), so leaving it unlocked would scroll the article
    // underneath the overlay.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  if (!src) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={alt || "Zoomed image"}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        ×
      </button>
      <img
        src={src}
        alt={alt || ""}
        className={styles.image}
        // Stop the click from bubbling to the backdrop so clicking the
        // image itself doesn't immediately close the overlay it just opened.
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}
