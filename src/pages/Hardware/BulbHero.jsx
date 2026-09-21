import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Hardware.module.scss";

// Ported from src/content/hardware/shihab-bioreactor.html's scroll-jacked
// hero (three LED bulbs lighting up as the reader scrolls, tracked by a
// charge bar running underneath). Rendered through SectionedArticle's
// `intro` slot (see Hardware.jsx and the Model page's own pageIntro for the
// established pattern) rather than as a page-width hero above the article,
// since `.article` is what actually owns the scrollable column here — see
// the comment on BULB_COUNT below for how the pacing was rescaled to fit
// sitting on top of a full article instead of being the whole page.
//
// Logic is a straight port of the original's vanilla-JS scroll handlers,
// written directly onto refs' own styles/classList (rAF-driven, no React
// state) — the same idiom SectionedArticle.jsx's own progress rail and
// reveal-on-scroll already use here, for the same reason: a scroll-linked
// value re-rendering through React would visibly lag a frame behind the
// real scrollbar.
const BULB_COUNT = 3;
// A short hold after the last bulb lights, before the pin releases into the
// article's first section — just enough scroll room for the fully-lit state
// to register as a moment rather than instantly vanishing into the next
// section. Expressed as a fraction of one bulb's own "slot" of scroll
// (0.6 ≈ a bit over half a bulb's worth) rather than the reference file's
// full extra slots (BUFFER = 4 there), since this sits on top of a full
// article and a long hold would just be delay before real content.
const BUFFER = 0.6;
const SLOTS = BULB_COUNT + BUFFER;
// How dark the page (background, article — everything under the Menu/
// Footer chrome layer, via a fixed overlay stacked below them — see
// dimOverlay's portal target and z-index) goes at the very start of the
// sequence, before any bulb has power. 1 would go fully black and hide the
// headline entirely; this leaves just enough through that the page never
// reads as broken.
const MAX_DIM = 0.82;

export default function BulbHero() {
  const introRef = useRef(null);
  const pinWrapRef = useRef(null);
  const bulbRefs = useRef([]);
  const chargeFillRef = useRef(null);
  const chargeSparkRef = useRef(null);
  const dimRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      bulbRefs.current.forEach((b) => b?.classList.add(styles.lit));
      if (chargeFillRef.current) chargeFillRef.current.style.width = "100%";
      if (chargeSparkRef.current) chargeSparkRef.current.style.left = "100%";
      // No page-dimming for reduced-motion — it's a scroll-linked reveal
      // effect with no static equivalent, so the honest fallback is "never
      // dark" rather than a jarring dark screen with nothing animating it
      // back.
      if (dimRef.current) dimRef.current.style.opacity = "0";
      return undefined;
    }

    let rafId;

    function updateHeadline() {
      const el = introRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const s = window.scrollY;
      const holdEnd = vh * 0.15; // stays fully visible for the first bit of scrolling
      const fadeEnd = vh * 0.85; // fully gone just as the bulbs take over
      let p;
      if (s <= holdEnd) p = 0;
      else if (s >= fadeEnd) p = 1;
      else p = (s - holdEnd) / (fadeEnd - holdEnd);
      el.style.opacity = (1 - p).toFixed(3);
      el.style.transform = `translateY(${(-p * 60).toFixed(1)}px)`;
    }

    function updatePin() {
      const wrap = pinWrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      let progress = total > 0 ? scrolled / total : 0;
      progress = Math.max(0, Math.min(1, progress));

      // The bulbs finish lighting at progress = BULB_COUNT/SLOTS; the small
      // remainder is the hold. Map the charge fill to that same range so the
      // spark reaches the end exactly when the last bulb lights, instead of
      // continuing to creep through the hold.
      const lightRange = BULB_COUNT / SLOTS;
      const fillFraction = Math.min(1, progress / lightRange);
      const pct = `${(fillFraction * 100).toFixed(2)}%`;
      if (chargeFillRef.current) chargeFillRef.current.style.width = pct;
      if (chargeSparkRef.current) chargeSparkRef.current.style.left = pct;

      // Whole-page dim: only engages once the bulbs are actually reaching
      // the middle of the screen, never at the top of the page while the
      // headline is still showing. window.scrollY <= 0 is an explicit,
      // layout-independent guarantee of that — the very top of the page is
      // always fully bright no matter how tall the headline above the pin
      // ends up being. Past that, rect.top > 0 means the wrap hasn't
      // reached the viewport top yet (bulbs not centered/pinned yet) — fade
      // the dark in gradually over the last half screen of approach so it
      // reads as "arriving" rather than a hard cut, reaching full dark
      // exactly as the wrap pins. From there it hands off continuously
      // (both give 1 at rect.top = 0) to undimming as the bulbs power on,
      // via the same fillFraction the charge bar and bulbs key off.
      const approachStart = vh * 0.5;
      const dimFraction =
        window.scrollY <= 0
          ? 0
          : rect.top > 0
          ? 1 - Math.max(0, Math.min(1, rect.top / approachStart))
          : 1 - fillFraction;
      if (dimRef.current) dimRef.current.style.opacity = (MAX_DIM * dimFraction).toFixed(3);

      bulbRefs.current.forEach((b, i) => {
        if (!b) return;
        const threshold = (i + 1) / SLOTS;
        b.classList.toggle(styles.lit, progress >= threshold - 0.02);
      });
    }

    function tick() {
      updateHeadline();
      updatePin();
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Portaled into App.jsx's #app-content (a sibling of Menu/Footer, not
  // document.body) so it participates in that div's own stacking context
  // instead of bundling against it as one opaque unit — see the id's own
  // comment in App.jsx. `.article`/`.content` don't set `transform`, so
  // this position: fixed div still sizes against the true viewport despite
  // being nested deeper than document.body.
  const portalTarget = document.getElementById("app-content") || document.body;

  return (
    <div className={styles.bulbHero}>
      {createPortal(<div className={styles.dimOverlay} ref={dimRef} aria-hidden="true" />, portalTarget)}

      <div className={styles.heroIntro} ref={introRef}>
        <p>What if we could make medicine with the power it takes to light three LED bulbs?</p>
      </div>

      <div className={styles.bulbPinWrap} ref={pinWrapRef}>
        <div className={styles.bulbPinInner}>
          <div className={styles.bulbRow}>
            {Array.from({ length: BULB_COUNT }).map((_, i) => (
              <div className={styles.bulbUnit} key={i} ref={(el) => (bulbRefs.current[i] = el)}>
                <svg viewBox="0 0 40 64">
                  <path
                    className={styles.bulbGlass}
                    d="M20 2C10 2 3 9 3 19c0 7 4 11 7 15 2 2.5 3 5 3 8h14c0-3 1-5.5 3-8 3-4 7-8 7-15C37 9 30 2 20 2Z"
                  />
                  <path className={styles.bulbFilament} d="M14 20c2-3 10-3 12 0M14 24c2-3 10-3 12 0" />
                  <rect className={styles.bulbBase} x="13" y="42" width="14" height="14" rx="2" />
                </svg>
              </div>
            ))}
          </div>

          <div className={styles.chargeTrack}>
            <div className={styles.chargeFill} ref={chargeFillRef} />
            <div className={styles.chargeSpark} ref={chargeSparkRef} />
          </div>
          <p className={styles.heroCaption}>Keep scrolling — the SHIHAB Bioreactor runs on this little power.</p>
        </div>
      </div>
    </div>
  );
}
