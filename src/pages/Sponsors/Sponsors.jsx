import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import { SPONSORS } from "../../components/Sponsors/sponsorsData";
import styles from "./Sponsors.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/images/.
const gemini4Eva = "https://static.igem.wiki/teams/6341/wiki/images/gemini4-eva.webp";

// Extra size correction for this page's larger logo cards only — kept
// separate from sponsorsData.js's shared `visualScale` (which the Home
// floating strip and top-of-page banner also read) so enlarging logos here
// doesn't change their size anywhere else, same reasoning as that file's
// `smallInFooter` flag being scoped to a single consumer. LEM's source file
// is a small icon mark with no wordmark, so even at a matched box height it
// reads noticeably lighter than the wordmark-style logos next to it here;
// nudge it up to match. Multiplies on top of any shared `visualScale`.
const DETAIL_SCALE = { lem: 1.35 };

// Standalone /sponsors page required by pages.md's Team category. Loosely
// modelled on other iGEM teams' sponsors pages (intro blurb → jump links →
// one write-up per sponsor) rather than the bare logo row this page used to
// be. Sponsor blurbs are placeholder copy — see
// src/components/Sponsors/sponsorsData.js and RESPONSIBLE_AI_USE.md.
//
// Doesn't render the floating-logo <SponsorsSection /> (still used on Home)
// below the grid — it's the same logos as the cards above, just animated
// and unlabelled, so it was pure redundancy here rather than adding anything.
//
// `photo` (gemini4-eva.webp — an Ed White Gemini 4 EVA shot, black space void
// keyed to transparent so it blends into the page's own --bg navy) is a
// one-off background for this page: PageWrapper renders it `background-size:
// cover` and pinned `fixed` like the rest of the background stack, so it
// fills the viewport with no edges showing rather than scrolling with content.
export default function Sponsors() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", photo: gemini4Eva, gradient }}>
      <div className={styles.heading}>
        <p className={styles.label}>Team</p>
        <h1>Sponsors</h1>
        <p className={styles.intro}>
          This iGEM project would not have been possible without the support of our sponsors.
          Full write-ups for each sponsor are coming soon — for now, here's who's backing the mission.
        </p>
      </div>

      <nav className={styles.toc} aria-label="Jump to sponsor">
        {SPONSORS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={styles.tocItem}>
            {s.name}
          </a>
        ))}
      </nav>

      <div className={styles.grid}>
        {SPONSORS.map((s) => {
          const scale = (DETAIL_SCALE[s.id] ?? 1) * (s.visualScale ?? 1);
          return (
            <div key={s.id} id={s.id} className={styles.card}>
              <LiquidGlass radius={32} color={[0, 0, 0]} opacity={0.28}>
                <div className={styles.cardInner}>
                  <div className={styles.logoBox}>
                    <img
                      src={s.src}
                      alt={s.name}
                      className={styles.logo}
                      style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
                    />
                  </div>
                  <h2 className={styles.cardName}>{s.name}</h2>
                </div>
              </LiquidGlass>
            </div>
          );
        })}
      </div>

      <a
        href="https://www.nasa.gov/image-detail/egress-2/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoCredit}
      >
        Ed White spacewalk: NASA, public domain
      </a>
    </PageWrapper>
  );
}
