import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import ArticleStructure from "./ArticleStructure";
import Lightbox from "../Lightbox/Lightbox";
import PersonModal from "../PersonModal/PersonModal";
import photoCarousel from "./photoCarousel";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// Where a person popup was when one of its links was followed, so Back can
// bring the reader to the same spot with the popup open again.
const RETURN_KEY = "person-modal-return";

function personFromCard(card, cardIndex) {
  const photos = [...card.querySelectorAll(".person-photo")].map((img) => {
    const style = {};
    ["--photo-x", "--photo-y", "--photo-zoom-y", "--photo-zoom"].forEach((prop) => {
      const value = img.style.getPropertyValue(prop);
      if (value) style[prop] = value.trim();
    });
    return { src: img.currentSrc || img.src, alt: img.alt, style };
  });
  return {
    cardIndex,
    name: card.querySelector(".person-name")?.textContent ?? "",
    photos,
    html: card.querySelector(".person-more")?.innerHTML ?? "",
  };
}
// A .popup-card (see SectionedArticle.module.scss) opens in the same popup,
// with its title in place of a name and no photo. Inside a
// `.popup-grid.sequence`, the cards are meant to be read in order, so the
// popup also carries the following card for its "Next" button.
function popupFromCard(card) {
  const next = card.closest(".popup-grid.sequence") ? card.nextElementSibling : null;
  const nextCard = next?.matches(".popup-card") ? next : null;
  return {
    cardIndex: -1,
    name: card.querySelector(".popup-title")?.textContent ?? "",
    photos: [],
    html: card.querySelector(".popup-more")?.innerHTML ?? "",
    nextCard,
    nextName: nextCard?.querySelector(".popup-title")?.textContent ?? "",
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

// A section's markdown HTML. Memoized so it only re-renders when the HTML
// itself changes: React 19 re-applies `innerHTML` whenever this element
// re-renders with a fresh `dangerouslySetInnerHTML` object, which happened
// on every scroll-driven panel update and wiped any DOM the effects below
// had built inside it (photoCarousel's carousel, opened <details>).
const SectionHtml = memo(function SectionHtml({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
});

export default function ArticleBody({ title, intro, sections, nums, sectionRefs, accentBold }) {
  const [zoomed, setZoomed] = useState(null); // { src, alt } | null
  const [person, setPerson] = useState(null); // personFromCard() + initialScroll | null
  const closePerson = useCallback(() => setPerson(null), []);
  const detailsAnims = useRef(new WeakMap());
  const articleRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const cardAt = (index) => articleRef.current?.querySelectorAll(".person-card")[index];

  // A same-page link inside the popup (a citation, "see Experimental
  // validation"): close the popup, then scroll to the target. The scroll
  // waits for the effect below, i.e. until the popup's own cleanup has
  // given the page its scrolling back (body overflow) — scrolling any
  // earlier gets cancelled.
  const pendingScroll = useRef(null);
  const followHashLink = (hash) => {
    const target = articleRef.current?.querySelector(`#${CSS.escape(hash.slice(1))}`);
    if (target) {
      history.pushState(null, "", hash);
      pendingScroll.current = target;
    }
    setPerson(null);
  };
  useEffect(() => {
    if (person || !pendingScroll.current) return;
    pendingScroll.current.scrollIntoView({ behavior: "smooth", block: "start" });
    pendingScroll.current = null;
  }, [person]);

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

    // A `.link-card`'s face is a link to another page of this site; its
    // "Read more" button opens the same popup a `.popup-card` does. Both sit
    // before the <img> zoom check below, so clicking a card's illustration
    // follows the link instead of opening the lightbox.
    const popup = e.target.closest(".popup-open, .link-card-more")?.closest(".popup-card, .link-card");
    if (popup) {
      setPerson(popupFromCard(popup));
      return;
    }

    const cardLink = e.target.closest("a.link-card-face");
    const cardHref = cardLink?.getAttribute("href");
    if (cardHref?.startsWith(`${BASE}/`) && e.button === 0 && !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
      e.preventDefault();
      navigate(cardHref.slice(BASE.length));
      return;
    }

    // A `.vector-tabs` button row (see SectionedArticle.module.scss):
    // show the `.vector-panel` sitting at the clicked button's own index
    // within the same `.vector-tabs`, hide its siblings. Index-matched
    // rather than keyed by a data attribute so the markdown can't drift
    // out of sync with itself.
    const tab = e.target.closest(".vector-tab");
    const tabs = tab?.closest(".vector-tabs");
    if (tab && tabs) {
      const buttons = [...tabs.querySelectorAll(":scope > .vector-tabs-bar > .vector-tab")];
      const panels = [...tabs.querySelectorAll(":scope > .vector-panel")];
      const index = buttons.indexOf(tab);
      buttons.forEach((b, i) => b.classList.toggle("is-active", i === index));
      panels.forEach((p, i) => p.classList.toggle("is-active", i === index));
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

  // Markdown's plain-text citation mark (`.cite`, see
  // SectionedArticle.module.scss). No hover tooltip for now — the earlier
  // per-element and delegated hover versions both left the tooltip stuck
  // open on these pages (Model's Cref, a real React element, never did), so
  // it's been removed until that's properly debugged.
  //
  // The click is handled here rather than left to the browser's native
  // `href="#ref-N"` navigation: on a long article already mounted (as
  // opposed to a fresh page load landing straight on the fragment), that
  // native jump was unreliable — confirmed in testing to silently no-op on
  // this page's content while the identical `target.scrollIntoView()` call
  // below always lands correctly. `history.pushState` keeps the URL (and
  // back button) behaving the way a real anchor click would. Delegated from
  // the article root so it survives the markdown HTML being re-rendered.
  useEffect(() => {
    const root = articleRef.current;
    if (!root) return undefined;

    const onCiteClick = (e) => {
      const cite = e.target instanceof Element ? e.target.closest(".cite") : null;
      const id = cite?.getAttribute("href")?.slice(1);
      const target = id ? root.querySelector(`#${CSS.escape(id)}`) : null;
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", cite.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    root.addEventListener("click", onCiteClick);
    return () => root.removeEventListener("click", onCiteClick);
  }, []);

  // A markdown page asks for an interactive 3D structure by leaving an
  // empty `<div class="structure-3d" data-structure="…">` placeholder;
  // each one gets an ArticleStructure portaled into it. Collected in an
  // effect (not during render) because the placeholders only exist once
  // the section HTML is in the DOM.
  const [structureHosts, setStructureHosts] = useState([]);
  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    setStructureHosts([...root.querySelectorAll(".structure-3d")]);
  }, [sections]);

  // `.photo-slider` rows become endless, auto-advancing carousels (see
  // photoCarousel.js). Rerun when the sections' HTML changes.
  useEffect(() => {
    const root = articleRef.current;
    if (!root) return undefined;
    const cleanups = [...root.querySelectorAll(".photo-slider")].map(photoCarousel);
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [sections]);

  return (
    <div ref={articleRef} className={accentBold ? `${styles.article} ${styles.accentBold}` : styles.article} onClick={onClick}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
      {intro && <div className={styles.intro}>{intro}</div>}
      {sections.map((section, i) => (
        <div
          key={section.title}
          id={section.id}
          ref={(el) => (sectionRefs.current[i] = el)}
          data-title={section.title}
        >
          {/* `nums` is optional and index-aligned (see SectionedArticle's
              `numbered` prop): the section number stays out of the title text so
              the jump-nav reads as a plain table of contents, and renders as its
              own mark here. */}
          <h2>
            {nums?.[i] && <span className={styles.secNum}>{nums[i]}</span>}
            {section.title}
          </h2>
          {section.html && <SectionHtml html={section.html} />}
          {section.content}
        </div>
      ))}
      {structureHosts.map((host, i) =>
        createPortal(
          <ArticleStructure
            structure={host.dataset.structure}
            pdb={host.dataset.pdb}
            label={host.dataset.label}
            color={host.dataset.color}
            highlight={host.dataset.highlight}
            highlightColor={host.dataset.highlightColor}
          />,
          host,
          `structure-${i}`,
        ),
      )}
      <Lightbox src={zoomed?.src} alt={zoomed?.alt} onClose={() => setZoomed(null)} />
      <PersonModal
        person={person}
        onClose={closePerson}
        onInternalLink={followPersonLink}
        onHashLink={followHashLink}
        onNext={(card) => setPerson(popupFromCard(card))}
      />
    </div>
  );
}