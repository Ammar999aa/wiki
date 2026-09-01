import { SPONSORS } from "../Sponsors/sponsorsData";
import styles from "./SponsorBanner.module.scss";

// Top-of-page sponsor strip for Home. `position: absolute` (not fixed, not
// in normal flow) — it overlays the very top of the page on load without
// pushing Hero's content down a scroll's worth, but it's anchored to
// PageWrapper's in-flow wrapper (not the viewport), so it scrolls away with
// the page like any other content instead of staying pinned like the fixed
// nav (Menu.jsx). Deliberately not a LiquidGlass card here — no rounded
// corners, no drop-shadow, no cursor-follow glow — it's a flat-width strip
// whose tint/blur dissolves into the page via `.fade`'s mask-image rather
// than sitting in a distinct chrome panel like the nav. This is separate
// from ../Sponsors/Sponsors.jsx, the independently-floating logo bubbles
// further down Home: that one is a static "wall", this one is a
// continuously scrolling marquee.
//
// Loop mechanic: SPONSORS is rendered twice back-to-back into one flex
// track, then the whole track is animated exactly -50% on a linear loop
// (see .track/@keyframes scroll in the stylesheet) — since the two halves
// are identical, the seam where it resets is invisible. The second half is
// aria-hidden so screen readers only hear each sponsor once.
export default function SponsorBanner() {
  const track = [...SPONSORS, ...SPONSORS];

  return (
    <section className={styles.banner} aria-label="Our sponsors">
      <div className={styles.fade} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.label}>Supported&nbsp;by</p>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.viewport}>
          <div className={styles.track}>
            {track.map(({ id, src, name, small }, i) => {
              const isDup = i >= SPONSORS.length;
              return (
                <div
                  key={`${id}-${i}`}
                  className={`${styles.tile} ${isDup ? styles.dup : ""}`}
                  aria-hidden={isDup || undefined}
                >
                  <img
                    src={src}
                    alt={isDup ? "" : name}
                    className={`${styles.logo} ${small ? styles.logoSmall : ""}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
