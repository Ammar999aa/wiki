import styles from "./Sponsors.module.scss";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import { SPONSORS } from "./sponsorsData";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/images/.
const earth = "https://static.igem.wiki/teams/6341/wiki/images/earth.webp";

// Ported from the wiki repo's original Footer sponsor block. Kept as its own
// component (rather than folded into ../Footer) because Footer is the
// required every-page license notice + GitLab repo link (see CLAUDE.md) —
// this only renders where it's explicitly mounted. Logo/name data lives in
// ./sponsorsData.js (named to not collide with Sponsors.jsx on case-insensitive
// filesystems), shared with the detail cards on src/pages/Sponsors/Sponsors.jsx.

const ANIM = ["floatA", "floatB", "floatC", "floatD"];

// Visual order for this floating strip only — independent of SPONSORS' own
// array order, which drives the /sponsors page TOC/grid and the carousel
// loop instead. BK and Baskin-Robbins (the two `smallInFooter` sponsors)
// are grouped at the end here so the wrap lands them next to each other in
// the bottom row; SnapGene moves up out of the last slot to make room.
const FOOTER_ORDER = ["nti", "bese", "lem", "kaustigem", "sg", "biomed", "gs", "idt", "twist", "urbanlab", "bk", "br"];
const FOOTER_SPONSORS = FOOTER_ORDER.map((id) => SPONSORS.find((s) => s.id === id));

export default function Sponsors() {
  return (
    <section className={styles.sponsors}>
      <img src={earth} alt="" className={styles.earth} aria-hidden="true" />
      <a
        href="https://science.nasa.gov/earth/earth-observatory/twin-blue-marbles-8108/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.earthCredit}
      >
        Earth: NASA (Reto Stöckli / NASA·NOAA), public domain
      </a>
      <p className={styles.label}>Supported by</p>
      <div className={styles.row}>
        {FOOTER_SPONSORS.map(({ id, src, name, nudge, smallInFooter, visualScale }, i) => (
          <div
            key={id}
            className={`${styles.slot} ${styles[ANIM[i % ANIM.length]]}`}
            style={{
              animationDelay: `${-(i * 1.15).toFixed(2)}s`,
              marginTop: `${nudge}px`,
            }}
          >
            <LiquidGlass radius={32} opacity={0.05} color={[255, 255, 255]}>
              <div className={`${styles.pill} ${smallInFooter ? styles.pillSmall : ""}`}>
                <img
                  src={src}
                  alt={name}
                  className={`${styles.logo} ${smallInFooter ? styles.logoSmall : ""}`}
                  style={visualScale ? { transform: `scale(${visualScale})` } : undefined}
                />
              </div>
            </LiquidGlass>
          </div>
        ))}
      </div>
    </section>
  );
}
