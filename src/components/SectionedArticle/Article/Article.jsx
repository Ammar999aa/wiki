import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lightbox from "../Lightbox/Lightbox";
import PersonModal from "../PersonModal/PersonModal";

// Where a person popup was when one of its links was followed, so Back can
// bring the reader to the same spot with the popup open again.
const RETURN_KEY = "person-modal-return";

function personFromCard(card, cardIndex) {
  const img = card.querySelector(".person-photo");
  const photoStyle = {};
  ["--photo-x", "--photo-y", "--photo-zoom"].forEach((prop) => {
    const value = img?.style.getPropertyValue(prop);
    if (value) photoStyle[prop] = value.trim();
  });
  return {
    cardIndex,
    name: card.querySelector(".person-name")?.textContent ?? "",
    photo: img?.currentSrc || img?.src,
    photoStyle,
    html: card.querySelector(".person-more")?.innerHTML ?? "",
  };
}
import styles from "../SectionedArticle.module.scss";

const DETAILS_ANIM_MS = 350;

// Native <details>/<summary> toggling can't be smoothed with a plain CSS
// transition on .details-body's max-height/opacity — confirmed by forcing a
// multi-second transition duration in devtools and watching it still snap
// instantly regardless. Current Chromium applies the open/close style change
// without an intermediate rendered frame to interpolate from, so there's
// nothing for a CSS transition to animate between. Driving it explicitly
// with the Web Animations API (below) sidesteps that entirely and works the
// same way in every browser that implements .animate().
function toggleDetails(details, body, anims) {
  anims.get(details)?.cancel();

  const opening = !details.open;
  const startHeight = body.getBoundingClientRect().height;
  const startPadding = parseFloat(getComputedStyle(body).paddingBottom) || 0;
  if (opening) details.open = true; // flips the +/- glyph immediately; body is always laid out (see .details-body's display override) so scrollHeight is measurable either way
  const endHeight = opening ? body.scrollHeight : 0;
  const endPadding = opening ? 14 : 0;

  const anim = body.animate(
    [
      { maxHeight: `${startHeight}px`, paddingBottom: `${startPadding}px`, opacity: opening ? 0 : 1 },
      { maxHeight: `${endHeight}px`, paddingBottom: `${endPadding}px`, opacity: opening ? 1 : 0 },
    ],
    { duration: DETAILS_ANIM_MS, easing: "ease" },
  );
  anims.set(details, anim);
  anim.onfinish = () => {
    anims.delete(details);
    if (!opening) details.open = false; // deferred so the glyph stays "–" until the collapse actually finishes
  };
}

export default function ArticleBody({ title, intro, sections, sectionRefs }) {
  const [zoomed, setZoomed] = useState(null); // { src, alt } | null
  const [person, setPerson] = useState(null); // personFromCard() + initialScroll | null
  const closePerson = useCallback(() => setPerson(null), []);
  const detailsAnims = useRef(new WeakMap());
  const articleRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const cardAt = (index) => articleRef.current?.querySelectorAll(".person-card")[index];

  const followPersonLink = (path, modalScroll) => {
    try {
      sessionStorage.setItem(
        RETURN_KEY,
        JSON.stringify({
          key: location.key,
          path: location.pathname,
          cardIndex: person.cardIndex,
          cardTop: cardAt(person.cardIndex)?.getBoundingClientRect().top ?? 0,
          modalScroll,
        }),
      );
    } catch {
      // sessionStorage unavailable — Back just won't restore the spot.
    }
    setPerson(null);
    navigate(path);
  };

  // Coming back (via Back) to the history entry a person-popup link was
  // followed from: put the card where it was on screen and reopen the popup.
  // App scrolls every new page to the top in a layout effect; this passive
  // effect runs after it. Images loading later can still shift the page, so
  // the card is re-aligned on article resizes for a few seconds.
  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(RETURN_KEY));
    } catch {
      return undefined;
    }
    if (!saved || saved.key !== location.key || saved.path !== location.pathname) return undefined;
    sessionStorage.removeItem(RETURN_KEY);

    if (!cardAt(saved.cardIndex)) return undefined;
    // Looked up fresh each time: the article's HTML can be re-rendered.
    const align = () => {
      const card = cardAt(saved.cardIndex);
      if (card) window.scrollBy(0, card.getBoundingClientRect().top - saved.cardTop);
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(articleRef.current);
    const stop = setTimeout(() => observer.disconnect(), 3000);
    setPerson({ ...personFromCard(cardAt(saved.cardIndex), saved.cardIndex), initialScroll: saved.modalScroll });
    return () => {
      observer.disconnect();
      clearTimeout(stop);
    };
    // Only on mount: this page's entry is either the one to restore or not.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // One delegated handler on the whole article body, rather than wiring
  // every <img>/<details> individually — covers both markdown-rendered
  // content (section.html, dangerouslySetInnerHTML'd) and any hand-written
  // JSX in a custom section.content, uniformly.
  const onClick = (e) => {
    // A .person-card's "See more" button opens its hidden .person-more
    // content in a popup, with the card's photo and name.
    const card = e.target.closest(".person-more-btn")?.closest(".person-card");
    if (card) {
      setPerson(personFromCard(card, [...articleRef.current.querySelectorAll(".person-card")].indexOf(card)));
      return;
    }

    if (e.target.tagName === "IMG") {
      setZoomed({ src: e.target.currentSrc || e.target.src, alt: e.target.alt });
      return;
    }

    const summary = e.target.closest(".details-summary");
    const details = summary?.closest("details");
    const body = details?.querySelector(":scope > .details-body");
    if (details && body) {
      e.preventDefault(); // stop the native (unanimated) toggle; toggleDetails drives it instead
      toggleDetails(details, body, detailsAnims.current);
    }
  };

  return (
    <div ref={articleRef} className={styles.article} onClick={onClick}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
      {intro && <div className={styles.intro}>{intro}</div>}
      {sections.map((section, i) => (
        <div
          key={section.title}
          id={section.id}
          ref={(el) => (sectionRefs.current[i] = el)}
          data-title={section.title}
        >
          <h2>{section.title}</h2>
          {section.html && (
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          )}
          {section.content}
        </div>
      ))}
      <Lightbox src={zoomed?.src} alt={zoomed?.alt} onClose={() => setZoomed(null)} />
      <PersonModal person={person} onClose={closePerson} onInternalLink={followPersonLink} />
    </div>
  );
}