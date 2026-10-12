import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "./PersonModal.module.scss";

// The "See more" popup for a markdown .person-card — same look as the Roster
// page's RosterDetail. Portalled to <body> so no article box can clip it.
// Also opens a .popup-card's content (no photo, its title as the name).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function PersonModal({ person, onClose, onInternalLink, onHashLink, onNext }) {
  const closeRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!person) return undefined;
    closeRef.current?.focus({ preventScroll: true });
    if (bodyRef.current) bodyRef.current.scrollTop = person.initialScroll ?? 0;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [person, onClose]);

  // Links to other pages of this site navigate in-app (not a full reload), so
  // the article can remember this spot and restore it on Back.
  const onBodyClick = (e) => {
    const link = e.target.closest("a[href]");
    const href = link?.getAttribute("href");
    if (href?.startsWith("#") && onHashLink) {
      e.preventDefault();
      onHashLink(href);
      return;
    }
    if (!href?.startsWith(`${BASE}/`) || link.target || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onInternalLink(href.slice(BASE.length), bodyRef.current?.scrollTop ?? 0);
  };

  if (!person) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panelWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby="person-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.09} grain>
          <div className={styles.panel}>
            <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            {person.photos.length > 0 && (
              <div className={styles.photos}>
                {person.photos.map((photo) => (
                  <img key={photo.src} src={photo.src} alt={photo.alt} className={styles.photo} style={photo.style} />
                ))}
              </div>
            )}
            <div className={styles.bio}>
              <h2 id="person-modal-title" className={person.photos.length ? undefined : styles.titleOnly}>
                {person.name}
              </h2>
              <div ref={bodyRef} className={styles.body} onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: person.html }} />
              {person.nextCard && onNext && (
                <button type="button" className={styles.next} onClick={() => onNext(person.nextCard)}>
                  <span className={styles.nextLabel}>Next</span>
                  <span>{person.nextName}</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>,
    document.body
  );
}
