import { useRef, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Sponsors from "../../components/Sponsors/Sponsors";
import SponsorBanner from "../../components/SponsorBanner/SponsorBanner";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import { SPONSORS } from "../../components/Sponsors/sponsorsData";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import shihabLogo from "../../assets/shihab-logo.svg?url";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/images/.
const earth = "https://static.igem.wiki/teams/6341/wiki/images/earth.webp";

// Pulled from the shared sponsor data (not re-imported as a raw asset) so
// there's still one source of truth for the logo file and its
// `visualScale` padding correction — see sponsorsData.js. KAUST iGEM is
// *us*, not a third-party sponsor, so in the Hero eyebrow line below it
// literally replaces the word "iGEM" (rather than being just one of ten
// logos scrolling past, which it also still is further down the page).
const kaustIgem = SPONSORS.find((s) => s.id === "kaustigem");
const rocketLaunch = "https://static.igem.wiki/teams/6341/wiki/images/rocket-launch.webp";

// Section-by-section narrative below follows src/content/landing_page_content.md
// (slides 1–9). Two pre-existing sections that weren't part of that brief —
// a standalone "On-demand medicine. Anywhere." tagline and a nanobody
// production beat — were dropped rather than kept as unlisted extras.

// ── Scroll engine ─────────────────────────────────────────────────────────────

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const between = (p, a, b) => clamp01((p - a) / (b - a));

const _subs = new Set();
const ScrollEngine = {
  motion: 1,
  meteorRGB: "255,216,77",
  meteorRate: 1.1,
  _lastY: 0,
  add(fn) {
    _subs.add(fn);
    try { fn(this._lastY, performance.now()); } catch (e) {}
    return () => _subs.delete(fn);
  },
  run() {
    this._lastY = window.scrollY || 0;
    const t = performance.now();
    for (const fn of _subs) { try { fn(this._lastY, t); } catch (e) {} }
  },
};

function useScene(ref, range, onUpdate) {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;
  useEffect(() => {
    return ScrollEngine.add((y) => {
      const el = ref.current;
      if (!el) return;
      const p = clamp01((y - el.offsetTop) / (window.innerHeight * range));
      cb.current(p);
    });
  }, []);
}

// Like useScene, but hands back raw "viewport-heights scrolled past ref"
// instead of a single 0–1 progress — for elements (like EarthLayer) whose
// motion spans more than one section, each with its own phase.
function useScrollUnits(ref, onUpdate) {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;
  useEffect(() => {
    return ScrollEngine.add((y) => {
      const el = ref.current;
      if (!el) return;
      cb.current((y - el.offsetTop) / window.innerHeight);
    });
  }, []);
}

// ── Starfield canvas ──────────────────────────────────────────────────────────

function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [], meteors = [], nextShoot = 1400;
    let W = 0, H = 0, dpr = 1, rafId;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function buildStars() {
      const count = Math.round((W * H) / 5200);
      stars = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        stars.push({
          x: Math.random() * W, y: Math.random() * (H * 2.4),
          z: depth, r: 0.35 + depth * 1.5,
          base: 0.25 + depth * 0.65, tw: Math.random() * Math.PI * 2,
          tws: 0.6 + Math.random() * 1.6,
          hue: Math.random() < 0.12 ? (Math.random() < 0.5 ? "210,170,255" : "150,200,255") : "255,255,255",
        });
      }
    }

    function spawnMeteor() {
      const speed = 4.5 + Math.random() * 3.5;
      const slope = 0.4 + Math.random() * 0.3;
      meteors.push({
        x: Math.random() * W * 0.8 + W * 0.05,
        y: Math.random() * H * 0.42 - H * 0.06,
        vx: speed, vy: speed * slope,
        len: 140 + Math.random() * 120, w: 1.6 + Math.random() * 1.3,
        dur: 42 + Math.random() * 18, life: 0,
        rgb: ScrollEngine.meteorRGB,
      });
    }

    function drawStars(t, scrollY) {
      ctx.clearRect(0, 0, W, H);
      const m = ScrollEngine.motion;
      for (const s of stars) {
        const par = scrollY * (0.04 + s.z * 0.16) * m;
        let y = (s.y - par) % (H * 2.4);
        if (y < 0) y += H * 2.4;
        if (y > H + 4) continue;
        const tw = 0.6 + 0.4 * Math.sin(t * 0.001 * s.tws + s.tw);
        const a = s.base * tw;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${a.toFixed(3)})`;
        ctx.fill();
        if (s.z > 0.82) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.hue},${(a * 0.18).toFixed(3)})`;
          ctx.fill();
        }
      }
      const rate = ScrollEngine.meteorRate;
      if (rate > 0.04 && t > nextShoot && m > 0.05) {
        const burst = rate > 1.6 && Math.random() < 0.45 ? 2 : 1;
        for (let b = 0; b < burst; b++) spawnMeteor();
        nextShoot = t + (2000 + Math.random() * 3400) / rate;
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const s = meteors[i];
        s.life += 1; s.x += s.vx; s.y += s.vy;
        const prog = s.life / s.dur;
        const fade = prog < 0.18 ? prog / 0.18 : 1 - (prog - 0.18) / 0.82;
        const a = Math.max(0, fade);
        const tailX = s.x - s.len, tailY = s.y - s.len * (s.vy / s.vx);
        const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        g.addColorStop(0, `rgba(${s.rgb},${(0.95 * a).toFixed(3)})`);
        g.addColorStop(0.4, `rgba(${s.rgb},${(0.38 * a).toFixed(3)})`);
        g.addColorStop(1, `rgba(${s.rgb},0)`);
        ctx.strokeStyle = g; ctx.lineWidth = s.w; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tailX, tailY); ctx.stroke();
        ctx.beginPath(); ctx.arc(s.x, s.y, s.w * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb},${(0.9 * a).toFixed(3)})`; ctx.fill();
        ctx.beginPath(); ctx.arc(s.x, s.y, s.w * 4.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb},${(0.16 * a).toFixed(3)})`; ctx.fill();
        if (prog >= 1 || s.x - s.len > W + 40 || tailY > H + 40) meteors.splice(i, 1);
      }
    }

    function rafLoop(t) {
      drawStars(t, window.scrollY || 0);
      ScrollEngine.run();
      rafId = requestAnimationFrame(rafLoop);
    }

    const onScroll = () => ScrollEngine.run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.starCanvas} />;
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef(null);
  const latinRef = useRef(null);
  const arabicRef = useRef(null);
  const copyRef = useRef(null);

  useScene(ref, 1.7, (p) => {
    if (latinRef.current) latinRef.current.style.opacity = 1 - between(p, 0.30, 0.60);
    if (arabicRef.current) {
      const fo = between(p, 0.42, 0.72);
      arabicRef.current.style.opacity = fo;
      arabicRef.current.style.transform = `scale(${lerp(0.82, 1, fo)})`;
    }
    if (copyRef.current) {
      copyRef.current.style.transform = `translateY(${-p * 50}px)`;
      copyRef.current.style.opacity = 1 - between(p, 0.84, 1);
    }
  });

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.heroSticky}>

        {/* Signature streaks */}
        <div className={styles.heroStreaks} aria-hidden="true">
          <span className={`${styles.streak} ${styles.s1}`} />
          <span className={`${styles.streak} ${styles.s2}`} />
        </div>

        {/* Copy */}
        <div className={styles.heroCopy} ref={copyRef}>
          <div className={styles.heroEyebrow}>
            <img
              src={kaustIgem.src}
              alt="KAUST iGEM"
              className={styles.eyebrowLogo}
              style={{ transform: `scale(${kaustIgem.visualScale})` }}
            />
            <span>&middot; Synthetic Biology in Space</span>
          </div>
          <div className={styles.wordmark}>
            <h1 className={styles.wordmarkLatin} ref={latinRef}>
              <img src={shihabLogo} alt="SHIHAB" className={styles.wordmarkLogo} />
            </h1>
            <h1 className={styles.wordmarkArabic} ref={arabicRef} dir="rtl" lang="ar" style={{ opacity: 0 }}>شهاب</h1>
          </div>
          <p className={styles.heroSub}>
            <span className={styles.subGloss}>شهاب</span> &mdash; Arabic for &lsquo;shooting star.&rsquo; On-demand medicine, engineered for anywhere.
          </p>
          <div className={styles.heroTelemetry}>
            <span>PLATFORM <b>S. cerevisiae · B. subtilis · P. pastoris</b></span>
            <span>OUTPUT <b>Therapeutic proteins</b></span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Earth (persists across Hero + Orbit, slides 0–1) ──────────────────────────

// Fixed to the viewport rather than nested/sticky inside Hero, so it can
// stay on screen across two separate scroll-pinned sections instead of
// un-pinning the moment Hero's own sticky box ends. `groupRef` points at a
// plain wrapper spanning Hero + Orbit; phase boundaries below mirror those
// two sections' own `useScene(ref, range, …)` calls (Hero: range 1.7 over a
// 200dvh section, Orbit: range 1.5 over a 260dvh section starting right
// after Hero's 200dvh) so Earth's motion stays in sync with each section's
// own reveal pacing instead of drifting out of step with it.
function EarthLayer({ groupRef }) {
  const earthRef = useRef(null);

  useScrollUnits(groupRef, (units) => {
    const el = earthRef.current;
    if (!el) return;
    // One continuous drift spanning Hero → early Orbit (not "up through
    // Hero, then reverse into the corner") — by the time Orbit's own
    // content starts revealing, Earth is already docked bottom-right.
    // Once Orbit is mostly done, it keeps drifting the same direction
    // straight off-screen past the corner, rather than fading in place.
    const q = clamp01(units / 2.3);
    // Orbit's own essentials-row reveal (useScene range 1.5, last item fully
    // in by p≈0.72) finishes at units≈3.08 — start the exit drift after
    // that, not overlapping it, using raw scroll units so it isn't capped
    // by orbitP maxing out at 1.
    const exitP = between(units, 3.15, 4.4);
    const left = lerp(79, 85, q) + exitP * 60;
    const top = lerp(50, 78, q) + exitP * 60;
    const scale = lerp(1, 1.35, q) * lerp(1, 0.7, exitP);
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.transform = `translate(-50%, -50%) scale(${scale})`;
  });

  return (
    <>
      <div className={styles.earthWrap} ref={earthRef}>
        <div className={styles.earthGlow} />
        <div className={styles.earthAtmo} />
        <div className={styles.earthImg} style={{ backgroundImage: `url("${earth}")` }} />
        <div className={styles.earthSheen} />
      </div>
      <a
        href="https://science.nasa.gov/earth/earth-observatory/twin-blue-marbles-8108/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.earthCredit}
      >
        Earth: NASA (Reto Stöckli / NASA·NOAA), public domain
      </a>
    </>
  );
}

// ── Generic single-statement beat (slides 2, 4, 6) ────────────────────────────

function StatementSection({ range = 1.2, tag, decor, className = "", children }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useScene(ref, range, (p) => {
    if (innerRef.current) {
      innerRef.current.style.opacity = Math.min(between(p, 0.05, 0.35), 1 - between(p, 0.7, 1));
      innerRef.current.style.transform = `translateY(${lerp(30, -30, p)}px)`;
    }
  });

  return (
    <section className={styles.tagline} ref={ref}>
      <div className={`${styles.taglineSticky} ${className}`}>
        {decor}
        <div className={styles.statementInner} ref={innerRef} style={{ opacity: 0 }}>
          {tag && (
            <span className={styles.tag}>
              <span className={styles.tagDot} />
              {tag}
            </span>
          )}
          <p className={styles.bigLine}>{children}</p>
        </div>
      </div>
    </section>
  );
}

const PLANET_KEYS = ["p1", "p2", "p3", "p4", "p5"];

function PlanetDecor() {
  return (
    <div className={styles.planetDecor} aria-hidden="true">
      {PLANET_KEYS.map((k) => (
        <div key={k} className={`${styles.planet} ${styles[k]}`} />
      ))}
    </div>
  );
}

// Shuttle Atlantis departing Earth — the launch reads as the mission itself
// leaving. Fixed to the viewport (like EarthLayer) rather than nested inside
// slide 2's sticky box, so it isn't cropped by that box's `overflow: hidden`.
// Slides in as slide 2 opens and shoots away as slide 2 hands off to slide 3.
// `groupRef` points at slide 2's own wrapper.
function RocketLayer({ groupRef }) {
  const rocketRef = useRef(null);

  useScrollUnits(groupRef, (units) => {
    const el = rocketRef.current;
    if (!el) return;
    // Slides up from below as slide 2 opens; holds at a fixed spot for the
    // whole of slide 2 (2.2 units) — no motion in between, just entry and
    // exit — then shoots straight up and out, continuing the launch, right
    // as slide 2 hands off to slide 3.
    const REST_LEFT = 8;
    const REST_TOP = 56;
    const entryP = between(units, 0, 0.35);
    const exitP = between(units, 2.15, 2.75);
    const exitEase = exitP * exitP; // ease-in — starts slow, accelerates away
    const entryDrop = (1 - entryP) * 75; // starts well below the viewport
    const exitShoot = exitEase * 140; // rockets up past the top edge
    const left = REST_LEFT;
    const top = REST_TOP + entryDrop - exitShoot;
    const scale = lerp(1, 0.7, exitP);
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    // Opacity settles in fast (well before the slide-up finishes) rather
    // than tracking entryP 1:1, so it doesn't look like a dim ghost easing
    // in — it's solid well before it reaches its resting position.
    el.style.opacity = Math.min(1, entryP * 3) * (1 - exitP);
    el.style.transform = `translateY(-50%) scale(${scale})`;
  });

  return (
    <>
      <div
        className={styles.rocketLayer}
        ref={rocketRef}
        style={{ backgroundImage: `url("${rocketLaunch}")`, opacity: 0 }}
        aria-hidden="true"
      />
      <a
        href="https://www.nasa.gov/image-detail/amf-sts129-s-092/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.rocketCredit}
      >
        Atlantis, STS-129: NASA/Kenny Allen
      </a>
    </>
  );
}

// ── Essentials row (slide 1) ────────────────────────────────────────────────────

function IcoOxygen({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="15" cy="20" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="27" cy="20" r="9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IcoWater({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 6c7 9 11 15.5 11 20.5a11 11 0 1 1-22 0C9 21.5 13 15 20 6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IcoSafety({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 5 33 11v10c0 8-5.5 13-13 16-7.5-3-13-8-13-16V11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoFood({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 14c-5-6-13-3-13 4 0 8 7 15 13 15s13-7 13-15c0-7-8-10-13-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M20 14c0-3 1.5-5.5 4-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IcoMedicine({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="9" y="16" width="22" height="8" rx="4" transform="rotate(-30 20 20)" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="24" x2="24" y2="16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const ESSENTIALS = [
  { key: "oxygen",   label: "Oxygen",   Ico: IcoOxygen },
  { key: "water",    label: "Water",    Ico: IcoWater },
  { key: "safety",   label: "Safety",   Ico: IcoSafety },
  { key: "food",     label: "Food",     Ico: IcoFood },
  { key: "medicine", label: "Medicine", Ico: IcoMedicine, hl: true },
];

function OrbitSection() {
  const ref = useRef(null);
  const itemRefs = useRef([]);

  useScene(ref, 1.5, (p) => {
    ESSENTIALS.forEach((_, i) => {
      const o = clamp01((p - (0.12 + i * 0.11)) / 0.16);
      const el = itemRefs.current[i];
      if (el) {
        el.style.opacity = o;
        el.style.transform = `translateY(${lerp(26, 0, o)}px)`;
      }
    });
  });

  return (
    <section className={styles.orbitSection} ref={ref}>
      <div className={styles.orbitSticky}>
        <p className={`${styles.bigLine} ${styles.orbitLine}`} style={{ maxWidth: 480 }}>
          Astronauts depend on a fragile chain of <em>essentials.</em>
        </p>
        <div className={styles.essentialsRow}>
          {ESSENTIALS.map(({ key, label, Ico, hl }, i) => (
            <div
              key={key}
              className={styles.essentialItem}
              ref={(el) => (itemRefs.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <LiquidGlass radius={44} blur={10} opacity={hl ? 0.12 : 0.06} color={hl ? [255, 216, 77] : [255, 255, 255]}>
                <div className={`${styles.essentialBubble} ${hl ? styles.essentialBubbleHl : ""}`}>
                  <Ico className={styles.essentialIco} />
                </div>
              </LiquidGlass>
              <small className={`${styles.essentialLabel} ${hl ? styles.medicineLabelHighlight : ""}`}>{label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Problem cards (slide 3) ───────────────────────────────────────────────────

function IcoCargo({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 5 34 12v16L20 35 6 28V12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 12l14 7 14-7M20 19v16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IcoDecay({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M10 6h20M10 34h20M12 6c0 8 6 9 8 9s8-1 8-9M12 34c0-8 6-9 8-9s8 1 8 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IcoBroken({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M14 26a8 8 0 0 1 0-12l3-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M26 14a8 8 0 0 1 0 12l-3 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 23l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

const PROBLEMS = [
  { Ico: IcoCargo, text: "Every medicine must be carried onboard or resupplied from home." },
  { Ico: IcoDecay, text: "Long storage and spaceflight conditions may affect some medicines." },
  { Ico: IcoBroken, text: "Replacement medicines may be slow, costly, or impossible to deliver." },
];

function ProblemSection() {
  const ref = useRef(null);
  const kickerRef = useRef(null);
  const cardRefs = useRef([]);

  useScene(ref, 1.8, (p) => {
    if (kickerRef.current) kickerRef.current.style.opacity = between(p, 0.0, 0.18);
    PROBLEMS.forEach((_, i) => {
      const o = clamp01((p - (0.22 + i * 0.13)) / 0.16);
      const el = cardRefs.current[i];
      if (el) {
        el.style.opacity = o;
        el.style.transform = `translateY(${lerp(28, 0, o)}px)`;
      }
    });
  });

  return (
    <section className={styles.problemSection} ref={ref}>
      <div className={styles.problemSticky}>
        <span className={styles.kicker} ref={kickerRef} style={{ opacity: 0 }}>However&hellip;</span>
        <div className={styles.problemGrid}>
          {PROBLEMS.map(({ Ico, text }, i) => (
            <div
              key={text}
              className={styles.problemCard}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <Ico className={styles.capIco} />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reveal (slide 5) ───────────────────────────────────────────────────────────

function RevealSection() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const logoRef = useRef(null);
  const arRef = useRef(null);
  const glossRef = useRef(null);

  useScene(ref, 1.4, (p) => {
    if (labelRef.current) labelRef.current.style.opacity = Math.min(between(p, 0.0, 0.12), 1 - between(p, 0.85, 1));
    if (logoRef.current) {
      const o = between(p, 0.18, 0.38);
      logoRef.current.style.opacity = o;
      logoRef.current.style.transform = `scale(${lerp(0.72, 1, between(p, 0.18, 0.5))})`;
    }
    if (arRef.current) {
      const o = between(p, 0.42, 0.6);
      arRef.current.style.opacity = o;
      arRef.current.style.transform = `scale(${lerp(0.82, 1, o)})`;
    }
    if (glossRef.current) glossRef.current.style.opacity = between(p, 0.62, 0.82);
  });

  return (
    <section className={styles.revealSection} ref={ref}>
      <div className={styles.revealSticky}>
        <p className={styles.revealLabel} ref={labelRef} style={{ opacity: 0 }}>KAUST iGEM presents</p>
        <img src={shihabLogo} alt="Shihab" className={styles.revealLogo} ref={logoRef} style={{ opacity: 0 }} />
        <p className={styles.revealAr} ref={arRef} dir="rtl" lang="ar" style={{ opacity: 0 }}>شهاب</p>
        <p className={styles.revealGloss} ref={glossRef} style={{ opacity: 0 }}>
          Arabic for &lsquo;shooting star.&rsquo;
        </p>
      </div>
    </section>
  );
}

// ── Scenarios (slide 7) ───────────────────────────────────────────────────────

const B_SUBTILIS_PROTEINS = ["Chaperone A", "Repair B"];
const S_CEREVISIAE_PROTEINS = ["Stress C"];
const STRESSORS = ["Radiation", "Microgravity", "Temperature fluctuations"];

function ScenarioOrganism({ type, orgRef, markRef, proteins, protRef }) {
  return (
    <div className={styles.orgWrap}>
      <div className={`${styles.organism} ${styles[type]}`} ref={orgRef}>
        <span className={styles.orgMark} ref={markRef} />
      </div>
      {proteins && (
        <div className={styles.proteins} ref={protRef} style={{ opacity: 0 }}>
          {proteins.map((p) => <span key={p} className={styles.protein}>{p}</span>)}
        </div>
      )}
      <small className={styles.orgLabel}>{type === "bacteria" ? "B. subtilis" : "S. cerevisiae"}</small>
    </div>
  );
}

function ScenarioSection() {
  const ref = useRef(null);

  const labelARef = useRef(null), labelBRef = useRef(null);
  const orgsARef = useRef(null), orgsBRef = useRef(null);
  const stressARef = useRef(null), stressBRef = useRef(null);
  const prot1Ref = useRef(null), prot2Ref = useRef(null);
  const outcomeARef = useRef(null), outcomeBRef = useRef(null);
  const bDeadRef = useRef(null), bDeadMarkRef = useRef(null);
  const yDeadRef = useRef(null), yDeadMarkRef = useRef(null);
  const bAliveRef = useRef(null), bAliveMarkRef = useRef(null);
  const yAliveRef = useRef(null), yAliveMarkRef = useRef(null);

  const setOrg = (orgEl, markEl, isDead, isAlive) => {
    if (!orgEl) return;
    orgEl.classList.toggle(styles.dead, isDead);
    orgEl.classList.toggle(styles.alive, isAlive);
    if (markEl) {
      markEl.textContent = isDead ? "✕" : isAlive ? "✓" : "";
      markEl.className = `${styles.orgMark}${isDead ? " " + styles.orgMarkX : isAlive ? " " + styles.orgMarkV : ""}`;
    }
  };

  useScene(ref, 2.2, (p) => {
    const labelsOp = between(p, 0.00, 0.15);
    const orgsOp   = between(p, 0.15, 0.32);
    const stressOp = between(p, 0.32, 0.48);
    const protOp   = between(p, 0.48, 0.62);
    const outOp    = between(p, 0.65, 0.80);
    const survOp   = between(p, 0.80, 0.92);

    if (labelARef.current) labelARef.current.style.opacity = labelsOp;
    if (labelBRef.current) labelBRef.current.style.opacity = labelsOp;
    if (orgsARef.current) orgsARef.current.style.opacity = orgsOp;
    if (orgsBRef.current) orgsBRef.current.style.opacity = orgsOp;
    if (stressARef.current) stressARef.current.style.opacity = stressOp;
    if (stressBRef.current) stressBRef.current.style.opacity = stressOp;
    if (prot1Ref.current) prot1Ref.current.style.opacity = protOp;
    if (prot2Ref.current) prot2Ref.current.style.opacity = protOp;
    if (outcomeARef.current) outcomeARef.current.style.opacity = outOp;
    if (outcomeBRef.current) outcomeBRef.current.style.opacity = survOp;

    setOrg(bDeadRef.current, bDeadMarkRef.current, outOp > 0.01, false);
    setOrg(yDeadRef.current, yDeadMarkRef.current, outOp > 0.01, false);
    setOrg(bAliveRef.current, bAliveMarkRef.current, false, survOp > 0.01);
    setOrg(yAliveRef.current, yAliveMarkRef.current, false, survOp > 0.01);
  });

  return (
    <section className={styles.scenarioSection} ref={ref}>
      <div className={styles.scenarioSticky}>

        {/* Without SHIHAB */}
        <div className={styles.scenario}>
          <p className={styles.scenarioLabel} ref={labelARef} style={{ opacity: 0 }}>Without SHIHAB</p>
          <div className={styles.organisms} ref={orgsARef} style={{ opacity: 0 }}>
            <ScenarioOrganism type="bacteria" orgRef={bDeadRef} markRef={bDeadMarkRef} />
            <ScenarioOrganism type="yeast"    orgRef={yDeadRef} markRef={yDeadMarkRef} />
          </div>
          <div className={styles.stressors} ref={stressARef} style={{ opacity: 0 }}>
            {STRESSORS.map((s) => <span key={s} className={styles.stressor}>{s}</span>)}
          </div>
          <p className={styles.outcome} ref={outcomeARef} style={{ opacity: 0 }}>
            Reduced viability and productivity.
          </p>
        </div>

        <div className={styles.scenarioDivider} />

        {/* With SHIHAB */}
        <div className={styles.scenario}>
          <p className={`${styles.scenarioLabel} ${styles.scenarioLabelShihab}`} ref={labelBRef} style={{ opacity: 0 }}>With SHIHAB</p>
          <div className={styles.organisms} ref={orgsBRef} style={{ opacity: 0 }}>
            <ScenarioOrganism type="bacteria" orgRef={bAliveRef} markRef={bAliveMarkRef} proteins={B_SUBTILIS_PROTEINS} protRef={prot1Ref} />
            <ScenarioOrganism type="yeast"    orgRef={yAliveRef} markRef={yAliveMarkRef} proteins={S_CEREVISIAE_PROTEINS} protRef={prot2Ref} />
          </div>
          <div className={styles.stressors} ref={stressBRef} style={{ opacity: 0 }}>
            {STRESSORS.map((s) => <span key={s} className={styles.stressor}>{s}</span>)}
          </div>
          <p className={`${styles.outcome} ${styles.survive}`} ref={outcomeBRef} style={{ opacity: 0 }}>
            Resilient cells capable of producing biologics.
          </p>
        </div>

      </div>
    </section>
  );
}

// ── Capabilities (slide 8) ─────────────────────────────────────────────────────

function IcoArrow({ className }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M6 16L16 6M16 6H8M16 6v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoScalable({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M6 14V6h8M34 26v8h-8M6 6l11 11M34 34L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoProgrammable({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M14 11L6 20l8 9M26 11l8 9-8 9M22 8l-4 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoAdaptable({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M33 14a14 14 0 1 0 1.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 6v9h-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CAPABILITIES = [
  { Ico: IcoScalable,     label: "Scalable",     desc: "Production scales to whatever the mission demands — from a single dose to a full crew supply." },
  { Ico: IcoProgrammable, label: "Programmable", desc: "Genetic circuits are retargeted to express new therapeutics without rebuilding the platform." },
  { Ico: IcoAdaptable,    label: "Adaptable",    desc: "Engineered to keep operating across the environmental extremes of long-duration spaceflight." },
];

function CapabilitiesSection() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const tileRefs = useRef([]);

  useScene(ref, 1.8, (p) => {
    if (textRef.current) textRef.current.style.opacity = between(p, 0.0, 0.18);
    CAPABILITIES.forEach((_, i) => {
      const o = clamp01((p - (0.22 + i * 0.13)) / 0.16);
      const el = tileRefs.current[i];
      if (el) {
        el.style.opacity = o;
        el.style.transform = `translateY(${lerp(28, 0, o)}px)`;
      }
    });
  });

  return (
    <section className={styles.capSection} ref={ref}>
      <div className={styles.capSticky}>
        <p
          className={`${styles.bigLine} ${styles.capStatement}`}
          ref={textRef}
          style={{ opacity: 0, maxWidth: "min(680px, 92vw)" }}
        >
          SHIHAB is <em>scalable</em>, <em>programmable</em>, and <em>adaptable</em> to mission needs.
        </p>
        <div className={styles.capTiles}>
          {CAPABILITIES.map(({ Ico, label, desc }, i) => (
            <div
              key={label}
              className={styles.capTile}
              ref={(el) => (tileRefs.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <span className={styles.capIdx}>0{i + 1}</span>
              <Ico className={styles.capIco} />
              <strong>{label}</strong>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Outro (slide 9) ────────────────────────────────────────────────────────────

function OutroSection() {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const logoRef = useRef(null);

  useScene(ref, 1.4, (p) => {
    const o = between(p, 0.18, 0.55);
    if (logoRef.current) {
      logoRef.current.style.opacity = o;
      logoRef.current.style.transform = `scale(${lerp(0.68, 1, between(p, 0.18, 0.7))})`;
    }
    if (glowRef.current) glowRef.current.style.opacity = between(p, 0.3, 0.7) * 0.9;
  });

  return (
    <section className={styles.outroSection} ref={ref}>
      <div className={styles.outroSticky}>
        <div className={styles.outroGlow} ref={glowRef} style={{ opacity: 0 }} aria-hidden="true" />
        <img src={shihabLogo} alt="SHIHAB" className={styles.outroLogo} ref={logoRef} style={{ opacity: 0 }} />
      </div>
    </section>
  );
}

// ── Explore ───────────────────────────────────────────────────────────────────

const EXPLORE_CARDS = [
  { n: "01", t: "The Project",      d: "How SHIHAB engineers medical autonomy for deep-space missions — the full scientific rationale.", to: "/project",          feature: true },
  { n: "02", t: "Wet Lab",          d: "Strain engineering, assays, and protein expression.",                                           to: "/wetlab" },
  { n: "03", t: "Dry Lab",          d: "Modelling, bioinformatics, and circuit design.",                                                to: "/drylab" },
  { n: "04", t: "Human Practices",  d: "How real-world voices shaped the work.",                                                        to: "/human-practices" },
  { n: "05", t: "Team",             d: "Meet the people behind the mission.",                                                           to: "/roster" },
  { n: "06", t: "Safety",           d: "Biosafety and responsible design.",                                                             to: "/safety" },
  { n: "07", t: "Engagement",       d: "Bringing space biology to the public.",                                                         to: "/engagement" },
  { n: "08", t: "Attributions",     d: "Who did what, and our collaborators.",                                                          to: "/attributions" },
];

function ExploreSection() {
  return (
    <section className={styles.exploreSection}>
      <div className={styles.exploreHead}>
        <span className={styles.kicker}>Explore the mission</span>
        <h2>Eight chapters, one&nbsp;system.</h2>
      </div>
      <div className={styles.exploreGrid}>
        {EXPLORE_CARDS.map((c) => (
          <Link key={c.n} to={c.to} className={`${styles.xcard} ${c.feature ? styles.xcardFeature : ""}`}>
            <span className={styles.xnum}>{c.n}</span>
            <span className={styles.xarrow}><IcoArrow /></span>
            <div className={styles.xbody}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
            <span className={styles.glowline} />
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroOrbitRef = useRef(null);
  const rocketGroupRef = useRef(null);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SponsorBanner />
      <Starfield />
      <EarthLayer groupRef={heroOrbitRef} />
      <div ref={heroOrbitRef}>
        <HeroSection />
        <OrbitSection />
      </div>
      <RocketLayer groupRef={rocketGroupRef} />
      <div ref={rocketGroupRef}>
        <StatementSection decor={<PlanetDecor />}>
          Future missions will take astronauts away from Earth for <em>months&mdash;or years</em>.
        </StatementSection>
      </div>
      <ProblemSection />
      <StatementSection>
        What if <em>astronauts</em> could make the <em>biologics</em> they need?
      </StatementSection>
      <RevealSection />
      <StatementSection tag="Our Solution">
        We <em>engineer</em> resilient microbial systems &mdash;{" "}
        <span className={styles.vio}>B. subtilis</span> and <span className={styles.vio}>S. cerevisiae</span>{" "}
        &mdash; that <em>thrive under space stressors</em>.
      </StatementSection>
      <ScenarioSection />
      <CapabilitiesSection />
      <OutroSection />
      <ExploreSection />
      <Sponsors />
    </PageWrapper>
  );
}
