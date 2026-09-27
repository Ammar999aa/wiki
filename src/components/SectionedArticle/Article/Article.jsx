import { useRef, useState } from "react";
import Lightbox from "../Lightbox/Lightbox";
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
  const detailsAnims = useRef(new WeakMap());

  // One delegated handler on the whole article body, rather than wiring
  // every <img>/<details> individually — covers both markdown-rendered
  // content (section.html, dangerouslySetInnerHTML'd) and any hand-written
  // JSX in a custom section.content, uniformly.
  const onClick = (e) => {
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
    <div className={styles.article} onClick={onClick}>
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
    </div>
  );
}