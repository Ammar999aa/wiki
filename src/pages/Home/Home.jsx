import { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Sponsors from "../../components/Sponsors/Sponsors";
import SponsorBanner from "../../components/SponsorBanner/SponsorBanner";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import EarthGlobe, { LAT0, LON0, DISK_FILL, projectGlobe } from "../../components/EarthGlobe/EarthGlobe";
import PhotoDeck from "../../components/PhotoDeck/PhotoDeck";
import HardwareAnimation from "./HardwareAnimation/HardwareAnimation";
import { SPONSORS } from "../../components/Sponsors/sponsorsData";
const shihabLogo = "https://static.igem.wiki/teams/6341/wiki/svg-assets/shihab-logo.svg";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// iGEM Video Universe never approved the animated render as an mp4 (see
// .claude/requirements.md §1), so EarthLayer below renders it live in WebGL
// instead — same shader, same day/night cycle, just driven by three static
// textures instead of a baked video file. All hosted on iGEM's asset server.
const earthDay = "https://static.igem.wiki/teams/6341/wiki/3d-models/earth/earth-day.avif";
const earthClouds = "https://static.igem.wiki/teams/6341/wiki/3d-models/earth/earth-clouds.avif";
const earthLights = "https://static.igem.wiki/teams/6341/wiki/3d-models/earth/earth-lights.avif";
// Shown instead if WebGL is unavailable or a texture fails to load.
const earthFallback = "https://static.igem.wiki/teams/6341/wiki/images/earth-animated.webp";

// Thuwal, Saudi Arabia (KAUST's location) — used to keep the .sparkle marker
// pinned to this actual point on the globe as EarthLayer spins it slightly
// on scroll, rather than a hand-tuned screen position that only lines up
// when the camera sits exactly at (LAT0, LON0).
const THUWAL_LAT = (22.2853 * Math.PI) / 180;
const THUWAL_LON = (39.1028 * Math.PI) / 180;
// Max additional camera rotation applied as the user scrolls through the
// Earth's on-screen lifespan (see EarthLayer's useScrollUnits) — kept small
// so it reads as a subtle drift, not an obvious spin.
const SCROLL_SPIN_MAX_RAD = (26 * Math.PI) / 180;
// Leaving Hero/Orbit (see EarthLayer's "grow" phase below): instead of
// shrinking away, the globe grows to fill the screen while accelerating
// into a multi-turn spin and an axis tilt (roll), then a full-bleed wipe in
// this same purple (--bg) takes over before the next slide appears —
// a cinematic transition rather than a cut. Tuned together; see the phase
// comments in EarthLayer for how they overlap in scroll-unit terms.
// The globe rests big and centred right (the pre-Sept 2026 look), then lifts
// and shrinks while the hero's process strip is up, to clear it, and eases
// back onto its usual path as the hero scrolls away (EarthLayer).
const EARTH_LIFT_DY = 20; // vh
const EARTH_LIFT_SCALE = 0.76; // factor
// Hero scroll progress over which the strip rises in (HeroSection), and the
// same span in EarthLayer's units (hero useScene range 1.7).
const HERO_STRIP_P = [0.06, 0.4];
const HERO_STRIP_UNITS = HERO_STRIP_P.map((p) => p * 1.7);
const EXIT_SPIN_TURNS = 3;                      // full extra rotations by the top of the grow phase
const EXIT_ROLL_MAX_RAD = (55 * Math.PI) / 180;  // max axis tilt by the top of the grow phase

// Pulled from the shared sponsor data (not re-imported as a raw asset) so
// there's still one source of truth for the logo file and its
// `visualScale` padding correction — see sponsorsData.js. KAUST iGEM is
// *us*, not a third-party sponsor, so in the Hero eyebrow line below it
// literally replaces the word "iGEM" (rather than being just one of ten
// logos scrolling past, which it also still is further down the page).
// `visualScale` padding correction — see sponsorsData.js. KAUST iGEM is
// *us*, not a third-party sponsor, so in the Hero eyebrow line below it
// literally replaces the word "iGEM" (rather than being just one of ten
// logos scrolling past, which it also still is further down the page).
const kaustIgem = SPONSORS.find((s) => s.id === "kaustigem");
const rocketLaunch = "https://static.igem.wiki/teams/6341/wiki/images/rocket-launch.webp";
const milkyWay = "https://static.igem.wiki/teams/6341/wiki/images/milky-way-center.webp";
const astronautMmu = "https://static.igem.wiki/teams/6341/wiki/images/astronaut-large.avif";

// Circular-cropped, colour-graded to a shared palette so the three read as
// one set rather than three raw NASA textures — see ProblemSection below.
const marsPlanet = "https://static.igem.wiki/teams/6341/wiki/images/mars.webp";
const jupiterPlanet = "https://static.igem.wiki/teams/6341/wiki/images/jupiter.webp";
const neptunePlanet = "https://static.igem.wiki/teams/6341/wiki/images/neptune.webp";

// Section-by-section narrative below follows src/content/landing_page_content.md
// (slides 1–9), with the September 2026 landing brief's changes on top (hero,
// Our Solution's two parts sliding sideways, the hardware media, the outro's
// promotion video). Two pre-existing sections that weren't part of that brief —
// a standalone "On-demand medicine. Anywhere." tagline and a nanobody
// production beat — were dropped rather than kept as unlisted extras.

// ── Scroll engine ─────────────────────────────────────────────────────────────

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const between = (p, a, b) => clamp01((p - a) / (b - a));
const smoothstep = (t) => t * t * (3 - 2 * t);

// One "viewport height" for scroll math, matching the svh unit the scroll
// sections are sized in (Home.module.scss). window.innerHeight changes as a
// mobile address bar shows/hides, which used to make every scene's progress
// jump mid-scroll; 100svh doesn't. Measured off a hidden probe element and
// cached, re-read only on resize.
let _vh = 0;
let _vhProbe = null;
function viewportH() {
  if (!_vh) {
    if (!_vhProbe) {
      _vhProbe = document.createElement("div");
      _vhProbe.style.cssText = "position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none";
      document.body.appendChild(_vhProbe);
      window.addEventListener("resize", () => { _vh = 0; });
    }
    _vh = _vhProbe.offsetHeight || window.innerHeight;
  }
  return _vh;
}

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

// Animations play once. A scene animates normally on the first pass, then
// latches "static" the first time its section has scrolled completely out
// of view past the top — chosen as the latch point so the switch is never
// on screen. From then on it's pinned to `peak` (the progress at which its
// content is fully revealed), so scrolling back up shows the content sitting
// still instead of replaying the reveal/fade-out in reverse. Static calls
// pass `inView` as the second arg for the fixed-position credits, which
// have no section of their own to scroll away with; they're deduped on it
// since `peak` itself never changes.
function useScene(ref, range, onUpdate, peak = 1) {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;
  const doneRef = useRef(false);
  const lastViewRef = useRef(null);
  useEffect(() => {
    return ScrollEngine.add((y) => {
      const el = ref.current;
      if (!el) return;
      const end = el.offsetTop + el.offsetHeight;
      if (!doneRef.current && y >= end) doneRef.current = true;
      if (doneRef.current) {
        const inView = y + viewportH() > el.offsetTop && y < end;
        if (inView === lastViewRef.current) return;
        lastViewRef.current = inView;
        cb.current(peak, inView);
        return;
      }
      const p = clamp01((y - el.offsetTop) / (viewportH() * range));
      cb.current(p);
    });
  }, []);
}

// Like useScene, but hands back raw "viewport-heights scrolled past ref"
// instead of a single 0–1 progress — for elements (like EarthLayer) whose
// motion spans more than one section, each with its own phase. Same
// play-once latch as useScene (second arg `isStatic`), but the callback
// keeps receiving live units so a fixed-position layer can still scroll
// away with its section; `latchAfter` (viewport-heights past the end of
// ref) delays the latch for a layer that overhangs its section.
function useScrollUnits(ref, onUpdate, latchAfter = 0) {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;
  const doneRef = useRef(false);
  useEffect(() => {
    return ScrollEngine.add((y) => {
      const el = ref.current;
      if (!el) return;
      const vh = viewportH();
      const units = (y - el.offsetTop) / vh;
      if (!doneRef.current && units >= el.offsetHeight / vh + latchAfter) doneRef.current = true;
      cb.current(units, doneRef.current);
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

    // A mobile address bar showing/hiding fires "resize" with only the
    // height changed, mid-scroll — re-randomizing the stars then made the
    // whole field visibly reshuffle under the reader. Stars are only rebuilt
    // when the width changes (rotation, a real window resize); a height-only
    // change just resizes the canvas and keeps the existing field.
    function resize() {
      const widthChanged = window.innerWidth !== W;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (widthChanged || !stars.length) buildStars();
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

    // No separate "scroll" listener driving ScrollEngine.run() — the rAF
    // loop above already calls it unconditionally every frame and reads
    // window.scrollY fresh each time, so a scroll-event-triggered call never
    // has newer data than the next frame would supply anyway. It only
    // doubled the per-scene offsetTop reads + style writes (13 scenes) on
    // every frame while actively scrolling, which is exactly when that
    // extra main-thread work is most likely to read as jank.
    window.addEventListener("resize", resize);
    resize();
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.starCanvas} />;
}

// ── Hero ──────────────────────────────────────────────────────────────────────
// Sept 2026 landing brief: tagline, one-line lead and two buttons under the
// wordmark, then the five-step process strip across the bottom of the screen.
// The hero opens on the wordmark and copy alone; the first scroll raises the
// strip into view while the copy shrinks up out of its way.

// Two-tone step icons, coloured through the .pi* classes (Home.module.scss).
function IcoPreserve({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g transform="rotate(-40 24 24)">
        <path d="M16 24v-6a8 8 0 0 1 16 0v6z" className={styles.piLight} />
        <path d="M16 24v6a8 8 0 0 0 16 0v-6z" className={styles.piMain} />
        <circle cx="21" cy="29" r="1.7" className={styles.piLight} />
        <circle cx="26.5" cy="32" r="1.7" className={styles.piLight} />
      </g>
    </svg>
  );
}

function IcoSelect({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="8" y="8" width="32" height="32" rx="7" className={styles.piFrame} />
      <rect x="13" y="13" width="22" height="7.5" rx="2.5" className={styles.piLight} />
      <rect x="13" y="24" width="9.5" height="11" rx="2.5" className={styles.piAmber} />
      <rect x="25.5" y="24" width="9.5" height="11" rx="2.5" className={styles.piMain} />
    </svg>
  );
}

function IcoGrow({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M9 8h30M12 8v32M36 8v32M8 40h32M24 4v22" className={styles.piLine} />
      <rect x="16" y="14" width="16" height="22" rx="5" className={styles.piLine} />
      <path d="M16 26h16v5a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5z" className={styles.piMain} />
      <circle cx="24" cy="26.5" r="2.4" className={styles.piLight} />
    </svg>
  );
}

function IcoProduce({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="16" cy="18" r="7" className={styles.piBlue} />
      <circle cx="29" cy="16" r="6.5" className={styles.piMain} />
      <circle cx="35" cy="28" r="6.5" className={styles.piMain} />
      <circle cx="14" cy="31" r="6" className={styles.piBlue} />
      <circle cx="24.5" cy="28" r="7.5" className={styles.piLight} />
    </svg>
  );
}

function IcoPurify({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="18.5" y="4" width="11" height="5.5" rx="1.8" className={styles.piLight} />
      <path d="M18 9.5h12v4.5l3.5 4.5V38a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4V18.5l3.5-4.5z" className={styles.piLine} />
      <path d="M17.5 24h13v13.5a2.5 2.5 0 0 1-2.5 2.5h-8a2.5 2.5 0 0 1-2.5-2.5z" className={styles.piMain} />
      <path d="M24 27.5c2 2.6 3 4.2 3 5.4a3 3 0 0 1-6 0c0-1.2 1-2.8 3-5.4z" className={styles.piLight} />
    </svg>
  );
}

const PROCESS_STEPS = [
  { label: "Preserve", desc: "Freeze-dried microbes or spores", Ico: IcoPreserve },
  { label: "Select", desc: "Choose the strain for your protein", Ico: IcoSelect },
  { label: "Grow", desc: "Activate and grow in the bioreactor", Ico: IcoGrow },
  { label: "Produce", desc: "Secrete therapeutic proteins", Ico: IcoProduce },
  { label: "Purify", desc: "Recover and purify the product", Ico: IcoPurify },
];

function HeroSection() {
  const ref = useRef(null);
  const stickyRef = useRef(null);
  const latinRef = useRef(null);
  const arabicRef = useRef(null);
  const copyRef = useRef(null);
  const processRef = useRef(null);
  // How far the copy moves up and how much it shrinks to sit above the
  // strip, and how far below the screen the strip starts. Measured from
  // layout (transforms don't affect offsetTop/offsetHeight).
  const fitRef = useRef({ lift: 0, scale: 1, drop: 0 });
  const lastP = useRef(0);

  const apply = (p) => {
    lastP.current = p;
    const { lift, scale, drop } = fitRef.current;
    const e = smoothstep(between(p, ...HERO_STRIP_P));
    const out = 1 - between(p, 0.84, 1);
    // A slow upward drift, only once the strip is in, so the lifted copy
    // keeps its top margin while the hero is pinned.
    const drift = Math.max(0, p - HERO_STRIP_P[1]) * 40;
    // Logo -> Arabic wordmark crossfade starts almost as soon as scrolling
    // begins and is done within the first quarter of the pinned hero scene
    // (about 0.4 screens of scroll), well before the copy fades out. It was
    // stretched to p = 0.65 and read as arriving too late.
    if (latinRef.current) latinRef.current.style.opacity = 1 - between(p, 0.02, 0.2);
    if (arabicRef.current) {
      const fo = between(p, 0.06, 0.26);
      arabicRef.current.style.opacity = fo;
      arabicRef.current.style.transform = `scale(${lerp(0.82, 1, fo)})`;
    }
    if (copyRef.current) {
      copyRef.current.style.transform = `translateY(${lift * e - drift}px) scale(${lerp(1, scale, e)})`;
      copyRef.current.style.opacity = out;
    }
    if (processRef.current) {
      processRef.current.style.transform = `translateY(${drop * (1 - e) - drift}px)`;
      // Fades a little ahead of the copy, as the hero scrolls it up over the
      // globe.
      processRef.current.style.opacity = e * (1 - between(p, 0.72, 0.9));
    }
  };

  useEffect(() => {
    const sticky = stickyRef.current;
    const copy = copyRef.current;
    const strip = processRef.current;
    if (!sticky || !copy || !strip) return undefined;
    const measure = () => {
      const h = sticky.clientHeight;
      const top = Math.min(56, Math.max(28, h * 0.06)); // the sponsor banner has scrolled off by now
      const gap = Math.max(16, Math.min(40, h * 0.035));
      const avail = strip.offsetTop - gap - top;
      const fits = copy.offsetTop + copy.offsetHeight + gap <= strip.offsetTop;
      const scale = fits ? 1 : Math.max(0.55, Math.min(1, avail / copy.offsetHeight));
      const lift = fits ? 0 : top + Math.max(0, (avail - copy.offsetHeight * scale) / 2) - copy.offsetTop;
      fitRef.current = { lift, scale, drop: h - strip.offsetTop + 24 };
      apply(lastP.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sticky);
    ro.observe(copy);
    ro.observe(strip);
    return () => ro.disconnect();
  }, []);

  // Unlike the other slides, the hero isn't play-once: it always follows the
  // scroll, so scrolling back to the top restores the opening view (logo,
  // no strip) instead of a frozen end pose that the globe doesn't match.
  useScrollUnits(ref, (units) => apply(clamp01(units / 1.7)));

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.heroSticky} ref={stickyRef}>

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
            <span className={styles.subGloss}>شهاب</span> &mdash; Arabic for &lsquo;shooting star.&rsquo;
          </p>
          <h2 className={styles.heroTagline}>
            Biologics on demand, <em>engineered for space.</em>
          </h2>
          <p className={styles.heroLead}>
            We designed three radiation-resistant microbial chassis, a compact bioreactor and an integrated
            purification system for extraterrestrial protein production.
          </p>
          {/* One line that rolls between the two readouts every few seconds;
              the third row repeats the first so the roll loops seamlessly. */}
          <div className={styles.heroTelemetry}>
            <div className={styles.telemetryRoll}>
              <span>PLATFORM <b><i>S. cerevisiae</i> · <i>B. subtilis</i> · <i>P. pastoris</i></b></span>
              <span>OUTPUT <b>Therapeutic proteins</b></span>
              <span aria-hidden="true">PLATFORM <b><i>S. cerevisiae</i> · <i>B. subtilis</i> · <i>P. pastoris</i></b></span>
            </div>
          </div>
          <div className={styles.heroCtas}>
            <a className={styles.ctaPrimary} href="#our-solution" onClick={goToSolution}>
              Learn more <span aria-hidden="true">&rarr;</span>
            </a>
            <Link className={styles.ctaGhost} to="/project">Project Description</Link>
          </div>
        </div>

        <div className={styles.heroProcess} ref={processRef}>
          <p className={styles.heroPlatform}>A platform built for space to produce biologics on demand.</p>
          <ol className={styles.processStrip}>
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.label} className={styles.processStep}>
                <step.Ico className={styles.processIco} />
                <span className={styles.processLabel}>
                  <span className={styles.processNum}>{i + 1}</span>
                  {step.label}
                </span>
                <span className={styles.processDesc}>{step.desc}</span>
              </li>
            ))}
          </ol>
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
// 200svh section, Orbit: range 1.5 over a 275svh section starting right
// after Hero's 200svh) so Earth's motion stays in sync with each section's
// own reveal pacing instead of drifting out of step with it.
function EarthLayer({ groupRef }) {
  const earthRef = useRef(null);
  const globeRef = useRef(null);
  const sparkleRef = useRef(null);
  const wipeRef = useRef(null);
  const [earthSettled, setEarthSettled] = useState(false);
  // Read once — scroll-tied rotation is still scroll-triggered motion, so it
  // stays off under prefers-reduced-motion like the rest of EarthGlobe's
  // animation (see that component's own reduceMotion handling). The grow/
  // move/fade below stays on even under reduced motion, matching how the
  // old shrink-and-drift exit it replaced was never gated either — only the
  // spin/roll rotation (the part closer to actual motion sickness) is new
  // enough here that it gets the explicit opt-out.
  const reduceMotionRef = useRef(null);
  if (reduceMotionRef.current === null) {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  // Tracks whether .earthWrap is currently `display:none` so the write below
  // only happens on the one frame the state actually flips, not every frame
  // for the rest of the page — see the comment where it's used.
  const hiddenRef = useRef(false);

  // Latched static (see useScrollUnits) only once the docked globe below
  // would itself be off-screen, since it overhangs Orbit's bottom edge.
  useScrollUnits(groupRef, (liveUnits, isStatic) => {
    const el = earthRef.current;
    if (!el) return;
    // Static: the opening drift from Hero into the Orbit dock (0→3.15)
    // still plays every time — it's the one exception to play-once — but
    // the globe then holds at that docked pose instead of running the exit
    // cinematic again, and is carried up off-screen with Orbit's content
    // once its sticky box unpins (2 + 1.75 = 3.75 units), as if part of the
    // page.
    const units = isStatic ? Math.min(liveUnits, 3.15) : liveUnits;
    const scrollAway = isStatic ? Math.max(0, liveUnits - 3.75) * 100 : 0;
    // One continuous drift spanning Hero → all of Orbit (not "up through
    // Hero, then reverse into the corner") — by the time Orbit's own
    // content starts revealing, Earth is essentially docked bottom-right.
    // `q` is eased (smoothstep) rather than a hard clamp so it keeps
    // gently settling into the corner for the rest of the hold instead of
    // sitting dead-still — a flat, unmoving Earth for most of a full
    // scroll section reads as the animation freezing.
    const q = smoothstep(clamp01(units / 3.15));
    // Orbit's own essentials-row reveal (useScene range 1.5, last item fully
    // in by p≈0.72) finishes at units≈3.08 — the cinematic exit below starts
    // right after that, not overlapping it, using raw scroll units so it
    // isn't capped by orbitP maxing out at 1. Eased to start from zero
    // velocity, matching `q`'s zero velocity at the same 3.15 handoff —
    // pairing an eased approach with a linear departure was a hard speed
    // jump (coast to a near-stop, then instantly snap to full speed), which
    // read as the drift getting stuck and then teleporting rather than
    // continuing smoothly.
    //
    // Replaces the old shrink-and-drift-off-bottom-right exit with a bigger
    // beat: the globe grows to dominate the screen while accelerating into
    // a multi-turn spin and an axis tilt, then a full-bleed wipe in the
    // page's own background color covers it and fades away, so the handoff
    // to the next slide reads as a cut on a wipe rather than Earth just
    // shrinking off the corner. `growEase` (smooth both ends) drives
    // position/scale/opacity; the spin and roll below reuse the same
    // 3.15→3.8 span but with their own ease-IN curves (slow→fast), so
    // everything starts together but visibly accelerates independently —
    // that's what reads as "spinning faster and faster" rather than at a
    // constant rate.
    //
    // The whole sequence (grow through purple-out below) is deliberately
    // kept inside heroOrbitRef's own height (Hero 200svh + Orbit 275svh =
    // 4.75 units) and finishes by ~4.45 — the next slide (ProblemSection)
    // starts fading in almost as soon as its section is reached (~4.75, right
    // after this group ends), so any part of this animation still running
    // past that point would mean that slide visibly arriving while
    // Earth is still mid-wipe instead of after it's done. The ~0.3-unit gap
    // between 4.45 and 4.75 is a deliberate short settle, not dead scroll —
    // Orbit's own section height was sized to match (see .orbitSection).
    const growT = between(units, 3.15, 4.2);
    const growEase = smoothstep(growT);
    const left = lerp(79, 85, q) + growEase * (40 - 85);
    // Lifts and shrinks while the hero's process strip is up (Sept 2026
    // hero), so it clears the strip; back on the usual path by units 2.
    const lift = smoothstep(between(units, ...HERO_STRIP_UNITS)) * (1 - smoothstep(between(units, 1, 2)));
    const top = lerp(50, 78, q) - lift * EARTH_LIFT_DY + growEase * (48 - 78) - scrollAway;
    const scale = lerp(1, 1.35, q) * lerp(1, EARTH_LIFT_SCALE, lift) + growEase * (4.5 - 1.35);
    // `left`/`top` stay untouched (see .earthWrap) — this callback runs
    // every animation frame regardless of whether the value actually
    // changed, and writing to layout properties (even to an unchanged
    // value) forces a style recalc + layout pass on this large, blurred,
    // box-shadowed element every single frame. `transform` alone is
    // compositor-only work, which is what was actually causing the
    // stutter reported when Earth is moving/exiting.
    el.style.transform = `translate3d(calc(${left}vw - 50%), calc(${top}vh - 50%), 0) scale(${scale})`;

    // Fades out as the purple wipe (below) takes over, so by the time it's
    // fully covered there's nothing left to reveal once the wipe clears —
    // reversible like everything else here, so scrolling back up before the
    // wipe completes brings Earth back rather than leaving it stuck hidden.
    // Starts well before growT=1 (4.2) and finishes covering it at 4.0 — the
    // globe should disappear into the wipe mid-spin (growT≈0.81 there), not
    // finish the whole spin fully exposed and only then get covered.
    const purpleIn = smoothstep(between(units, 3.6, 4.0));
    // Held fully opaque for a short stretch (4.0→4.1) before fading away
    // over a shorter span than the fade-in took — "quickly fades away" per
    // the brief, relative to the fade-in above.
    const purpleOut = smoothstep(between(units, 4.1, 4.45));
    if (wipeRef.current) wipeRef.current.style.opacity = String(purpleIn * (1 - purpleOut));
    el.style.opacity = String(1 - purpleIn);
    // Once the wipe has fully cleared, Earth is long since invisible but
    // .earthWrap is still sitting on-screen at a huge scale (left/top/scale
    // above saturate rather than reset past growT=1) — left rendering, its
    // IntersectionObserver would report it as visible for the rest of the
    // page and EarthGlobe would keep drawing a multi-thousand-pixel canvas
    // nobody can see. Pull it out of layout instead, and only touch
    // `display` on the one frame this actually flips (see hiddenRef above)
    // so scrolling through the rest of the page isn't forcing a style
    // recalc on it every frame for nothing.
    const hide = isStatic ? liveUnits > 5.3 : purpleOut >= 1;
    if (hide !== hiddenRef.current) {
      el.style.display = hide ? "none" : "";
      hiddenRef.current = hide;
    }

    if (!reduceMotionRef.current) {
      // A small clockwise nudge over the span the globe is gently on screen
      // for (q's 0→3.15 plus the pre-exit hold), increasing the camera's
      // longitude is what reads as clockwise for a disk tilted this way
      // (verified in-browser; the opposite sign spun it counterclockwise).
      // On top of that, the exit's own spin (several full turns, eased IN —
      // cubic, so it visibly accelerates rather than spinning at a constant
      // rate) and a roll (axis tilt, quadratic ease-in so it lags the spin
      // slightly) share growT's 3.15→3.8 span above.
      const spinT = clamp01(units / 4.4);
      const exitSpin = Math.pow(growT, 3) * EXIT_SPIN_TURNS * 2 * Math.PI;
      const scrollLon = spinT * SCROLL_SPIN_MAX_RAD + exitSpin;
      const roll = Math.pow(growT, 2) * EXIT_ROLL_MAX_RAD;
      globeRef.current?.setScrollLon(scrollLon);
      globeRef.current?.setRoll(roll);
      // Re-project Thuwal's real coordinates at the camera's current
      // longitude so the sparkle rides along with the globe's surface
      // instead of sitting at a screen position only correct at scrollLon=0
      // — then rotate that by -roll too (roll is a screen-space rotation
      // applied after the projection, so undoing it is how the sparkle
      // follows the same texel through the tilt instead of drifting off it).
      const proj = projectGlobe(LAT0, LON0 + scrollLon, THUWAL_LAT, THUWAL_LON);
      if (sparkleRef.current) {
        // null when Thuwal has spun around to the far side of the globe
        // (expected during the multi-turn exit spin) — hidden via
        // `visibility` rather than left alone, since `.sparkleActive`'s own
        // twinkle keyframes would otherwise override any opacity we set
        // here on the very next frame.
        sparkleRef.current.style.visibility = proj ? "visible" : "hidden";
        if (proj) {
          const cr = Math.cos(roll), sr = Math.sin(roll);
          const sx = proj.x * cr + proj.y * sr;
          const sy = -proj.x * sr + proj.y * cr;
          sparkleRef.current.style.left = `${50 + sx * DISK_FILL * 50}%`;
          sparkleRef.current.style.top = `${50 - sy * DISK_FILL * 50}%`;
        }
      }
    }
  }, 0.6);

  return (
    <>
      <div className={styles.earthWrap} ref={earthRef}>
        <div className={styles.earthGlow} />
        <div className={styles.earthAtmo} />
        <EarthGlobe
          ref={globeRef}
          className={styles.earthImg}
          dayUrl={earthDay}
          cloudsUrl={earthClouds}
          lightsUrl={earthLights}
          fallbackSrc={earthFallback}
          onSettled={() => setEarthSettled(true)}
        />
        <div className={styles.earthSheen} />
        {/* Base left/top below are the scrollLon=0 resting position — a
            fallback for the instant before the scroll engine's first run,
            which immediately overrides them (see projectGlobe above) and
            keeps the dot locked to Thuwal as EarthGlobe spins on scroll.
            Only twinkles once the intro spin has eased to a stop — it would
            read as misplaced while the globe is still spinning past it. */}
        <div ref={sparkleRef} className={`${styles.sparkle} ${earthSettled ? styles.sparkleActive : ""}`} />
        {/* Positioned relative to the globe itself (earthWrap), not the
            viewport — moves/scales with it instead of sitting pinned over
            whatever happens to be at a fixed screen corner (previously the
            bottom nav dock). Three separate credits, one per composited
            data source — see the render's own description for why a single
            "NASA, public domain" line stopped being accurate once city
            lights + a separate cloud layer were added on top of the base
            Blue Marble surface. */}
        <p className={styles.earthCredit}>
          Earth:{" "}
          <a href="https://earthobservatory.nasa.gov/features/BlueMarble/BlueMarble.php" target="_blank" rel="noopener noreferrer">
            NASA Blue Marble (Stöckli)
          </a>
          {" · "}
          <a href="https://svs.gsfc.nasa.gov/2916/" target="_blank" rel="noopener noreferrer">
            Earth at Night (Mayhew/Simmon)
          </a>
          {" · clouds: "}
          <a href="https://www.shadedrelief.com/natural3/pages/clouds.html" target="_blank" rel="noopener noreferrer">
            Natural Earth (Patterson)
          </a>
          {" — public domain, rendered visualization"}
        </p>
      </div>
      {/* Full-bleed wipe for the exit cinematic above — a sibling of
          .earthWrap, not a child, so it never inherits that element's own
          transform (it must stay pinned edge-to-edge regardless of where
          the giant globe currently is). Opacity driven entirely by the
          purpleIn/purpleOut above. */}
      <div className={styles.earthWipe} ref={wipeRef} />
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

function OrbitSection({ groupRef }) {
  const ref = useRef(null);
  const itemRefs = useRef([]);
  const stickyRef = useRef(null);

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

  // Separate from the reveal-in above (whose own `p` saturates at 1 well
  // before this point — see useScene) because this needs heroOrbitRef's
  // absolute scroll position, not this section's own 0–1 progress: it has
  // to fade out in step with EarthLayer's grow phase (units 3.15→4.2,
  // itself keyed to the same groupRef) so the headline/essentials row is
  // gone before the globe grows large enough to sit on top of them, not
  // just sitting there fully opaque underneath it. Starts at 3.1, just after
  // the reveal-in above finishes (~3.08) — any earlier and the last item
  // would still be fading in while the whole group started fading out.
  useScrollUnits(groupRef, (units, isStatic) => {
    if (stickyRef.current) stickyRef.current.style.opacity = isStatic ? "1" : String(1 - smoothstep(between(units, 3.1, 3.5)));
  });

  return (
    <section className={styles.orbitSection} ref={ref}>
      <div className={styles.orbitSticky} ref={stickyRef}>
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

// ── Problem cards / planets (slide 3) ─────────────────────────────────────────
// Desktop illustrates each problem with one of the three graded planet
// stills (mars/jupiter/venus — see the constants above), copy centered
// directly over the disc; the mapping is just left-to-right array order, not
// a scientific correspondence between planet and problem. Mobile keeps the
// original icon+title+text glass cards instead — shrinking the planet
// circles further to fit phone width stopped being legible, so both markups
// render and CSS (`.planetGrid`/`.problemGrid`, see Home.module.scss) shows
// whichever one fits the viewport rather than picking in JS.

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

// Neptune sits in the middle slot (Venus's old photo replaced with it) —
// Jupiter moved to the last slot to make room, Mars stays first.
const PROBLEMS = [
  {
    planet: marsPlanet,
    Ico: IcoCargo,
    title: "Resupply is limited",
    text: "On long-duration missions, replacement medicines may take months to arrive or may be impossible to deliver.",
    credit: { url: "https://images.nasa.gov/details/PIA03276", label: "Mars: NASA/JPL/MSSS", title: "Mars at Ls 357°: Tharsis — NASA ID PIA03276 — NASA/JPL/Malin Space Science Systems" },
  },
  {
    planet: neptunePlanet,
    Ico: IcoDecay,
    title: "Medicines do not last forever",
    text: "During long-term storage, some medicines can degrade and lose stability or effectiveness.",
    credit: { url: "https://images.nasa.gov/details/PIA02210", label: "Neptune: NASA/JPL", title: "Neptune, imaged by Voyager 2 — NASA ID PIA02210 — NASA/JPL" },
  },
  {
    planet: jupiterPlanet,
    Ico: IcoBroken,
    title: "Crews cannot carry everything they might need",
    text: "Spacecraft have limited mass and storage capacity, making it difficult to stock every medicine for every possible medical emergency.",
    credit: { url: "https://images.nasa.gov/details/PIA00343", label: "Jupiter: NASA/JPL/USGS", title: "Jupiter, from Voyager imagery — NASA ID PIA00343 — NASA/JPL/USGS" },
  },
];

// One quadratic-Bezier swoop per planet (`from` = where it pops in, `via` =
// control point that bows the path, final point is always (0,0) — its
// resting slot; `bank` = its own rotation at t=0, easing to level by the
// time it lands) — a genuinely different compass direction per planet
// (dropping from above, sweeping in from the side, rising from a corner)
// rather than a mirrored left/right pair, so the three arrivals read as
// distinct trajectories, not the same swoop flipped.
const PLANET_ARCS = [
  // Mars: sweeps in diagonally from the upper-left, curving down and
  // rightward into place — was a straight overhead drop, changed to a
  // shallower diagonal so it reads more distinctly from Jupiter's
  // lower-left rise.
  { from: { x: -220, y: -140 }, via: { x: -170, y: 30 }, bank: -20 },
  // Neptune: sweeps in low from the right, arcing up and over the top of
  // its slot before settling.
  { from: { x: 210, y: 30 }, via: { x: 70, y: -110 }, bank: 14 },
  // Jupiter: rises in from the lower-left corner, curving up and right.
  { from: { x: -130, y: 160 }, via: { x: 40, y: 50 }, bank: -11 },
];

function ProblemSection() {
  const ref = useRef(null);
  const kickerRef = useRef(null);
  const introRef = useRef(null);
  const attributionRef = useRef(null);
  const planetRefs = useRef([]);
  const flareRefs = useRef([]);
  const pulseRefs = useRef([]);
  const textRefs = useRef([]);
  const cardRefs = useRef([]);

  useScene(ref, 1.8, (p, inView) => {
    if (kickerRef.current) kickerRef.current.style.opacity = between(p, 0.0, 0.12);
    if (introRef.current) introRef.current.style.opacity = between(p, 0.04, 0.2);
    // Fixed above the nav dock, visible only while this slide's planets are
    // actually on screen, driven by this section's own p, and showing all
    // three credits at once (these three discs are all visible together).
    if (attributionRef.current) {
      const o = inView !== undefined ? +inView : Math.min(between(p, 0.2, 0.4), 1 - between(p, 0.9, 1));
      attributionRef.current.style.opacity = `${o}`;
      attributionRef.current.style.pointerEvents = o > 0.05 ? "auto" : "none";
    }
    PROBLEMS.forEach((_, i) => {
      const start = 0.26 + i * 0.13;

      // Mobile card (old design): single fade + rise, unchanged from before
      // the planet redesign.
      const o = clamp01((p - start) / 0.16);
      const cardEl = cardRefs.current[i];
      if (cardEl) {
        cardEl.style.opacity = o;
        cardEl.style.transform = `translateY(${lerp(28, 0, o)}px)`;
      }

      // Desktop planet: cinematic arrival instead of a straight fade/drift.
      //  1. The disc pops in already large and out of focus — as if close to
      //     the camera — then arcs (not a straight line: PLANET_ARCS below is
      //     a quadratic Bezier per index, each bowing a different way so the
      //     row doesn't read as three identical swoops) into its slot while
      //     shrinking to size and racking into focus, banking slightly into
      //     the turn like it's actually flying rather than just easing.
      //  2. A bright warp-flare flashes at the moment it pops in and is gone
      //     well before the disc lands — the "just arrived" beat.
      //  3. Once the disc has mostly landed, a brief violet glow pulses
      //     behind the caption right as it fades up, giving the caption's
      //     own arrival a small beat instead of just appearing.
      const planetP = clamp01((p - start) / 0.14);
      const textP = clamp01((p - (start + 0.08)) / 0.14);
      const ease = smoothstep(planetP);

      const planetEl = planetRefs.current[i];
      if (planetEl) {
        // Fast pop-in (opacity), independent of the slower eased arc/scale/
        // focus below — reads as "suddenly there", then travelling.
        planetEl.style.opacity = `${smoothstep(between(planetP, 0, 0.2))}`;

        const arc = PLANET_ARCS[i];
        const mt = 1 - ease;
        const ax = mt * mt * arc.from.x + 2 * mt * ease * arc.via.x;
        const ay = mt * mt * arc.from.y + 2 * mt * ease * arc.via.y;
        const scale = lerp(1.55, 1, ease);
        const blur = lerp(5, 0, ease);
        const rot = lerp(arc.bank, 0, ease);
        planetEl.style.filter = `blur(${blur}px)`;
        planetEl.style.transform = `translate(${ax}px, ${ay}px) scale(${scale}) rotate(${rot}deg)`;
      }

      const flareEl = flareRefs.current[i];
      if (flareEl) {
        const flareIn = smoothstep(between(planetP, 0, 0.1));
        const flareOut = 1 - smoothstep(between(planetP, 0.1, 0.45));
        const flare = flareIn * flareOut;
        flareEl.style.opacity = `${flare}`;
        flareEl.style.transform = `scale(${lerp(0.6, 1.6, flareIn)})`;
      }

      const pulseEl = pulseRefs.current[i];
      if (pulseEl) {
        const pulseIn = smoothstep(between(textP, 0, 0.12));
        const pulseOut = 1 - smoothstep(between(textP, 0.12, 0.55));
        const pulse = pulseIn * pulseOut;
        pulseEl.style.opacity = `${pulse}`;
        pulseEl.style.transform = `scale(${lerp(0.7, 1.3, pulseIn)})`;
      }

      const textEl = textRefs.current[i];
      if (textEl) {
        textEl.style.opacity = textP;
        // Centered in the disc (see .planetText) — the translate(-50%,-50%)
        // half is the centering itself, not part of the reveal motion, so it
        // has to be re-applied every frame alongside the rise offset rather
        // than living in a static CSS rule.
        textEl.style.transform = `translate(-50%, calc(-50% + ${lerp(14, 0, textP)}px))`;
      }
    });
  }, 0.85); // static pose: all three planets landed, captions in, flares/pulses spent

  return (
    <section className={styles.problemSection} ref={ref}>
      <div className={styles.problemSticky}>
        {/* Same pill as the "Our Solution" tag. */}
        <span className={styles.tag} ref={kickerRef} style={{ opacity: 0 }}>
          <span className={styles.tagDot} />
          The challenge
        </span>
        <p className={styles.problemIntro} ref={introRef} style={{ opacity: 0 }}>
          Medicine is different from many other essentials: once it is used, degraded, or missing, replacing it may
          not be simple.
        </p>

        {/* Desktop */}
        <div className={styles.planetGrid}>
          {PROBLEMS.map(({ planet, title, text }, i) => (
            <div
              key={title}
              className={styles.planetCard}
              ref={(el) => (planetRefs.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <div className={styles.planetSheen} aria-hidden="true" />
              <img src={planet} alt="" className={styles.planetImg} />
              <div className={styles.planetScrim} aria-hidden="true" />
              <div
                className={styles.planetPulse}
                ref={(el) => (pulseRefs.current[i] = el)}
                aria-hidden="true"
              />
              <div
                className={styles.planetText}
                ref={(el) => (textRefs.current[i] = el)}
                style={{ opacity: 0, transform: "translate(-50%, -50%)" }}
              >
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
              <div
                className={styles.planetFlare}
                ref={(el) => (flareRefs.current[i] = el)}
                style={{ opacity: 0 }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Mobile (old design) */}
        <div className={styles.problemGrid}>
          {PROBLEMS.map(({ Ico, title, text }, i) => (
            <div
              key={title}
              className={styles.problemCard}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <Ico className={styles.capIco} />
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed above the nav dock, desktop-only (see .planetAttribution's
          media query) — mobile shows the icon cards above, not these
          photos, so there's nothing to credit there. */}
      <div className={styles.planetAttribution} ref={attributionRef} style={{ opacity: 0 }}>
        {PROBLEMS.map(({ title, credit }) =>
          credit ? (
            <a
              key={title}
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.planetAttributionLink}
              title={credit.title}
            >
              {credit.label}
            </a>
          ) : null
        )}
      </div>
    </section>
  );
}

// ── Reveal (slide 5) ───────────────────────────────────────────────────────────

function RevealSection() {
  const ref = useRef(null);
  const bgRef = useRef(null);
  const labelRef = useRef(null);
  const logoRef = useRef(null);
  const arRef = useRef(null);
  const glossRef = useRef(null);

  // Slide's pin duration was stretched from 1.4 to 1.8 viewport-heights
  // purely to give the backdrop more room to hold and fade out slowly;
  // every other element's breakpoints below are scaled by 1.4/1.8 so their
  // absolute on-screen timing is unchanged from before the stretch.
  useScene(ref, 1.8, (p, inView) => {
    // Backdrop: eases up quickly from the very start of the slide (unchanged
    // absolute pace), holds at its (subtle) peak for a long stretch, then
    // eases back out slowly near the end — `smoothstep` rounds off both
    // edges so the in/out never feels like a hard snap. Drifts upward a
    // handful of pixels the whole time, a slow parallax rather than
    // anything tied to the fade.
    // Static (after the first pass): the galaxy backdrop is gone for good —
    // it's part of the initial reveal only, not the slide's resting state.
    if (bgRef.current && inView !== undefined) {
      bgRef.current.style.opacity = 0;
    } else if (bgRef.current) {
      const envelope = Math.min(smoothstep(between(p, 0, 0.17)), 1 - smoothstep(between(p, 0.78, 1)));
      bgRef.current.style.opacity = envelope * 0.3;
      bgRef.current.style.transform = `translateY(${lerp(16, -16, p)}px)`;
    }
    if (labelRef.current) labelRef.current.style.opacity = Math.min(between(p, 0.0, 0.09), 1 - between(p, 0.66, 0.78));
    if (logoRef.current) {
      const o = between(p, 0.14, 0.3);
      logoRef.current.style.opacity = o;
      logoRef.current.style.transform = `scale(${lerp(0.72, 1, between(p, 0.14, 0.39))})`;
    }
    if (arRef.current) {
      const o = between(p, 0.33, 0.47);
      arRef.current.style.opacity = o;
      arRef.current.style.transform = `scale(${lerp(0.82, 1, o)})`;
    }
    if (glossRef.current) glossRef.current.style.opacity = between(p, 0.48, 0.64);
  }, 0.65); // static pose: backdrop at its hold, label + logo + Arabic + gloss all in

  return (
    <section className={styles.revealSection} ref={ref}>
      <div className={styles.revealSticky}>
        <div
          className={styles.revealBg}
          ref={bgRef}
          style={{ opacity: 0, backgroundImage: `url(${milkyWay})` }}
          aria-hidden="true"
        />
        <p className={styles.revealLabel} ref={labelRef} style={{ opacity: 0 }}>KAUST iGEM presents</p>
        <img src={shihabLogo} alt="SHIHAB" className={styles.revealLogo} ref={logoRef} style={{ opacity: 0 }} />
        <p className={styles.revealAr} ref={arRef} dir="rtl" lang="ar" style={{ opacity: 0 }}>شهاب</p>
        <p className={styles.revealGloss} ref={glossRef} style={{ opacity: 0 }}>
          Arabic for &lsquo;shooting star.&rsquo;
        </p>
      </div>
    </section>
  );
}

const solDsup = "https://static.igem.wiki/teams/6341/wiki/images/dsup.avif";
const solOrganisms = "https://static.igem.wiki/teams/6341/wiki/images/organisms.avif";
const solVial = "https://static.igem.wiki/teams/6341/wiki/images/vial.avif";

const homeImg = "https://static.igem.wiki/teams/6341/wiki/content/home/";
const HARDWARE_PHOTOS = [
  { src: `${homeImg}hardware-desert-setup.avif`, alt: "Setting up the SHIHAB prototype on a folding table in the desert" },
  { src: `${homeImg}bioreactor-prototype.avif`, alt: "The SHIHAB bioreactor prototype on a lab bench, its screen reading “Welcome, SHIHAB Bioreactor”" },
  { src: `${homeImg}hardware-desert-team.avif`, alt: "A group standing behind the SHIHAB prototype in the desert" },
];

// Stands in for a video that isn't on iGEM's video server yet. Swap it for
// the video.igem.org embed once it is (wiki videos must come from there).
function VideoPlaceholder({ title, className = "" }) {
  return (
    <figure className={`${styles.videoSlot} ${className}`}>
      <div className={styles.videoBox}>
        <span className={styles.videoPlay} aria-hidden="true">
          <svg viewBox="0 0 20 20"><path d="M7 5l8 5-8 5z" fill="currentColor" /></svg>
        </span>
        <span className={styles.videoSoon}>Video coming soon</span>
      </div>
      <figcaption className={styles.videoCap}>{title}</figcaption>
    </figure>
  );
}

// A video.igem.org (PeerTube) embed, 16:9, in the same figure/caption frame as
// VideoPlaceholder.
function VideoEmbed({ id, title, className = "" }) {
  return (
    <figure className={`${styles.videoSlot} ${className}`}>
      <div className={styles.videoFrame}>
        <iframe
          src={`https://video.igem.org/videos/embed/${id}`}
          title={title}
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <figcaption className={styles.videoCap}>{title}</figcaption>
    </figure>
  );
}

// ── Our Solution (slides 7–8) ─────────────────────────────────────────────────
// One pinned slide in two parts. Scrolling slides part 1 out to the left and
// part 2 in from the right while the "Our Solution" tag stays where it is,
// instead of scrolling down to a second slide (Sept 2026 brief). Part 1: the
// three-step chassis story. Part 2: the platform, shown through the hardware
// video, photos and Nadia's animation, then four short steps and a bar of
// design principles. Up to 900px wide the two parts simply stack and scroll
// (see .solutionSection in Home.module.scss).

const SOL_RANGE = 3.6; // viewport-heights of pin; .solutionSection is 460svh
const SOL_SLIDE = [0.34, 0.5]; // progress over which the parts swap
const SOL_PART_P = [0.3, 0.9]; // where each part is fully on screen

const SOLUTION_STRESSORS = ["Radiation", "Microgravity", "Temperature fluctuations"];
const SOLUTION_CHASSIS = ["B. subtilis", "S. cerevisiae", "P. pastoris"];

const SYSTEM_STEPS = [
  { title: "Grow", text: "Automatically maintain optimal culture conditions." },
  { title: "Monitor", text: "Track temperature, OD, and pH in real time." },
  { title: "Induce", text: "Trigger protein production at the target OD." },
  { title: "Purify", text: "Automatically recover and purify the secreted protein." },
];

const SYSTEM_PRINCIPLES = ["Low power", "Minimal crew time", "Closed system", "Compact and modular"];

// Jumps to a part of the slide (hero "Learn more", the part dots). Lands
// where that part is fully revealed rather than at the section's top edge,
// where nothing has faded in yet.
function scrollToSolutionPart(part) {
  const el = document.getElementById("our-solution");
  if (!el) return;
  // Stacked (narrow screens), the section isn't pinned and is only as tall as its content.
  const pinned = el.offsetHeight > viewportH() * SOL_RANGE;
  const top = el.offsetTop + (pinned ? viewportH() * SOL_RANGE * SOL_PART_P[part] : 0);
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}

function goToSolution(e) {
  e.preventDefault();
  scrollToSolutionPart(0);
}

function SolutionSection() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const p1Refs = useRef([]);
  const p2Refs = useRef([]);
  const [part, setPart] = useState(0);
  const partRef = useRef(0);

  // Reveals play once (see useScene); part 1's finish before the swap,
  // part 2's after it.
  useScene(ref, SOL_RANGE, (p) => {
    p1Refs.current.forEach((el, i) => {
      if (!el) return;
      const o = clamp01((p - (i === 0 ? 0 : 0.06 + i * 0.05)) / 0.08);
      el.style.opacity = o;
      el.style.transform = `translateY(${lerp(22, 0, o)}px)`;
    });
    p2Refs.current.forEach((el, i) => {
      if (!el) return;
      const o = clamp01((p - (0.5 + i * 0.035)) / 0.07);
      el.style.opacity = o;
      el.style.transform = `translateY(${lerp(22, 0, o)}px)`;
    });
  });

  // The swap itself is navigation, not a reveal, so it never latches: it
  // follows the scroll position both ways, every time.
  useScrollUnits(ref, (units) => {
    const s = smoothstep(between(units / SOL_RANGE, SOL_SLIDE[0], SOL_SLIDE[1]));
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${-50 * s}%, 0, 0)`;
    const now = s > 0.5 ? 1 : 0;
    if (now !== partRef.current) {
      partRef.current = now;
      setPart(now);
    }
  });

  const p1 = (i) => (el) => (p1Refs.current[i] = el);
  const p2 = (i) => (el) => (p2Refs.current[i] = el);
  const hidden = { opacity: 0 };

  return (
    <section className={styles.solutionSection} ref={ref} id="our-solution">
      <div className={styles.solutionSticky}>
        <div className={styles.solTagRow}>
          <span className={styles.tag}>
            <span className={styles.tagDot} />
            Our Solution
          </span>
          <div className={styles.solDots}>
            {["Resilient chassis", "Autonomous platform"].map((label, i) => (
              <button
                key={label}
                type="button"
                className={part === i ? styles.solDotOn : ""}
                aria-label={`Part ${i + 1}: ${label}`}
                aria-current={part === i ? "true" : undefined}
                onClick={() => scrollToSolutionPart(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.solViewport}>
          <div className={styles.solTrack} ref={trackRef}>

            <div className={styles.solPart}>
              <div className={`${styles.solHead} ${styles.solReveal}`} ref={p1(0)} style={hidden}>
                <h2 className={styles.solTitle}>
                  <span className={styles.vio}>SHIHAB</span> enables <em>on-demand biologics</em> production in space
                </h2>
                <p className={styles.solLead}>
                  We use recombineering to stably integrate protective genes such as Dsup, strengthening our chassis
                  against space-related stressors and enabling reliable protein production.
                </p>
              </div>

              <div className={styles.solSteps}>
                <div className={`${styles.solStep} ${styles.solReveal}`} ref={p1(1)} style={hidden}>
                  <h3><span className={styles.solNum}>1</span>Recombineering</h3>
                  <img className={`${styles.solImg} ${styles.solImgMid}`} src={solDsup} alt="DNA with a Dsup gene cassette integrated" />
                  <p>Stably integrate protective genes such as Dsup (Damage suppressor) into our chassis.</p>
                </div>

                <span className={styles.solArrow} aria-hidden="true">→</span>

                <div className={`${styles.solStep} ${styles.solReveal}`} ref={p1(2)} style={hidden}>
                  <h3><span className={styles.solNum}>2</span>Resilient chassis</h3>
                  <img className={styles.solImg} src={solOrganisms} alt="B. subtilis, S. cerevisiae and P. pastoris" />
                  <div className={styles.solNames}>
                    {SOLUTION_CHASSIS.map((n) => <span key={n}>{n}</span>)}
                  </div>
                  <div className={styles.stressors}>
                    {SOLUTION_STRESSORS.map((x) => <span key={x} className={styles.stressor}>{x}</span>)}
                  </div>
                  <p>Engineered chassis with enhanced tolerance to space conditions.</p>
                </div>

                <span className={styles.solArrow} aria-hidden="true">→</span>

                <div className={`${styles.solStep} ${styles.solReveal}`} ref={p1(3)} style={hidden}>
                  <h3><span className={styles.solNum}>3</span>Protein production</h3>
                  <img className={`${styles.solImg} ${styles.solImgTall} ${styles.solImgMid}`} src={solVial} alt="A vial of purified protein" />
                  <p>Enables production of high-value proteins for space applications.</p>
                </div>
              </div>
            </div>

            <div className={styles.solPart}>
              <div className={`${styles.solHead} ${styles.solReveal}`} ref={p2(0)} style={hidden}>
                <h2 className={styles.solTitle}>
                  SHIHAB is an <em>autonomous biomanufacturing</em> platform
                </h2>
                <p className={styles.solLead}>
                  We integrate engineered microorganisms, a modular bioreactor, and automated purification to produce
                  high-value proteins when and where they are needed.
                </p>
              </div>

              <div className={styles.sysMedia}>
                <div className={`${styles.sysVideo} ${styles.solReveal}`} ref={p2(1)} style={hidden}>
                  <VideoPlaceholder title="Hardware demo" />
                </div>
                <div className={`${styles.sysPhotos} ${styles.solReveal}`} ref={p2(2)} style={hidden}>
                  <PhotoDeck photos={HARDWARE_PHOTOS} className={styles.sysDeck} compact />
                </div>
                <div className={`${styles.sysAnim} ${styles.solReveal}`} ref={p2(3)} style={hidden}>
                  <HardwareAnimation />
                </div>
              </div>

              <ol className={styles.sysBlocks}>
                {SYSTEM_STEPS.map(({ title, text }, i) => (
                  <li key={title} className={`${styles.sysBlock} ${styles.solReveal}`} ref={p2(4 + i)} style={hidden}>
                    <h3><span className={styles.solNum}>{i + 1}</span>{title}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>

              <ul className={`${styles.sysBar} ${styles.solReveal}`} ref={p2(8)} style={hidden}>
                {SYSTEM_PRINCIPLES.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Capabilities (slide 9) ─────────────────────────────────────────────────────

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
  { Ico: IcoScalable,     label: "Scalable",     desc: "Production scales to whatever the mission demands, from a single dose to a full crew supply." },
  { Ico: IcoProgrammable, label: "Programmable", desc: "Genetic circuits are retargeted to express new therapeutics without rebuilding the platform." },
  { Ico: IcoAdaptable,    label: "Adaptable",    desc: "Engineered to keep operating across the environmental extremes of long-duration spaceflight." },
];

function CapabilitiesSection() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const tileRefs = useRef([]);
  const rocketRef = useRef(null);
  const creditRef = useRef(null);

  useScene(ref, 1.8, (p, inView) => {
    if (textRef.current) textRef.current.style.opacity = between(p, 0.0, 0.18);
    CAPABILITIES.forEach((_, i) => {
      const o = clamp01((p - (0.22 + i * 0.13)) / 0.16);
      const el = tileRefs.current[i];
      if (el) {
        el.style.opacity = o;
        el.style.transform = `translateY(${lerp(28, 0, o)}px)`;
      }
    });
    // Shuttle Atlantis rises in beside the statement, holds while the tiles
    // come in, then launches off the top (ease-in) as the slide ends.
    const rise = smoothstep(between(p, 0, 0.3));
    const launch = between(p, 0.8, 1);
    if (rocketRef.current) {
      rocketRef.current.style.opacity = between(p, 0, 0.1) * (1 - launch);
      rocketRef.current.style.transform =
        `translateY(${(1 - rise) * 60 - launch * launch * 120}vh) scale(${lerp(1, 0.7, launch)})`;
    }
    if (creditRef.current) {
      const o = inView !== undefined ? +inView : Math.min(between(p, 0.05, 0.3), 1 - between(p, 0.8, 0.95));
      creditRef.current.style.opacity = o;
      creditRef.current.style.pointerEvents = o > 0.05 ? "auto" : "none";
    }
  }, 0.75); // static pose: tiles in, rocket resting

  return (
    <section className={styles.capSection} ref={ref}>
      <div className={styles.capSticky}>
        <div className={styles.capRocket} ref={rocketRef} style={{ opacity: 0 }} aria-hidden="true">
          <img src={rocketLaunch} alt="" />
        </div>
        <div className={styles.capBody}>
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
      </div>
      <div className={styles.slideAttribution}>
        <a
          ref={creditRef}
          href="https://www.nasa.gov/image-detail/amf-sts129-s-092/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.slideAttributionLink}
          style={{ opacity: 0 }}
        >
          Atlantis, STS-129: NASA/Kenny Allen
        </a>
      </div>
    </section>
  );
}

// ── Outro (slide 9) ────────────────────────────────────────────────────────────
// The promotion video, in place of the SHIHAB logo that used to close the
// story (Sept 2026 brief), embedded from video.igem.org.

function OutroSection() {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const videoRef = useRef(null);
  const astronautRef = useRef(null);
  const creditRef = useRef(null);

  useScene(ref, 1.4, (p, inView) => {
    const o = between(p, 0.18, 0.55);
    if (videoRef.current) {
      videoRef.current.style.opacity = o;
      videoRef.current.style.transform = `scale(${lerp(0.86, 1, between(p, 0.18, 0.7))})`;
    }
    // Drifts in from the left a beat before the video settles.
    const a = smoothstep(between(p, 0.1, 0.5));
    if (astronautRef.current) {
      astronautRef.current.style.opacity = a;
      astronautRef.current.style.transform = `translateX(${lerp(-60, 0, a)}px)`;
    }
    if (glowRef.current) glowRef.current.style.opacity = between(p, 0.3, 0.7) * 0.9;
    if (creditRef.current) {
      const c = inView !== undefined ? +inView : between(p, 0.15, 0.45);
      creditRef.current.style.opacity = c;
      creditRef.current.style.pointerEvents = c > 0.05 ? "auto" : "none";
    }
  });

  return (
    <section className={styles.outroSection} ref={ref}>
      <div className={styles.outroSticky}>
        <div className={styles.outroGlow} ref={glowRef} style={{ opacity: 0 }} aria-hidden="true" />
        {/* Bruce McCandless II's untethered MMU spacewalk (STS-41-B), with a
            slow idle tilt (CSS, not scroll-tied) so it reads as drifting. */}
        <div className={styles.outroAstronaut} ref={astronautRef} style={{ opacity: 0 }} aria-hidden="true">
          <img src={astronautMmu} alt="" className={styles.astronautImg} />
        </div>
        <div className={styles.outroVideo} ref={videoRef} style={{ opacity: 0 }}>
          <VideoEmbed id="6401ff7a-dd94-4b0e-8c4c-f694614c1176" title="SHIHAB promotion video" />
        </div>
      </div>
      <div className={styles.slideAttribution}>
        <a
          ref={creditRef}
          href="https://images.nasa.gov/details/s84-27017"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.slideAttributionLink}
          style={{ opacity: 0 }}
        >
          Bruce McCandless II, STS-41-B: NASA
        </a>
      </div>
    </section>
  );
}

// ── Explore ───────────────────────────────────────────────────────────────────

const EXPLORE_CARDS = [
  {
    n: "01", t: "The Project", d: "How SHIHAB engineers medical autonomy for deep-space missions — the full scientific rationale.",
    to: "/project", feature: true,
    img: "https://static.igem.wiki/teams/6341/wiki/images/project-card.avif", pos: "center 22%",
    credit: { url: "https://images.nasa.gov/details/iss040e089385", title: "Earth observation from the ISS, Expedition 40 — NASA ID iss040e089385" },
  },
  {
    n: "02", t: "Wet Lab", d: "Strain engineering, assays, and protein expression.",
    to: "/design",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/wetlab.avif",
  },
  {
    n: "03", t: "Dry Lab", d: "Modelling, bioinformatics, and circuit design.",
    to: "/model",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/drylab.avif",
  },
  {
    n: "04", t: "Hardware", d: "The bioreactor stand, electronics, and physical build.",
    to: "/hardware",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/hardware.avif",
  },
  {
    n: "05", t: "Team", d: "Meet the people behind the mission.",
    to: "/roster",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/team.avif",
  },
  {
    n: "06", t: "Safety", d: "Biosafety and responsible design.",
    to: "/safety-and-security",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/safety.avif",
  },
  {
    n: "07", t: "Public Engagement", d: "Bringing space biology to the public.",
    to: "/education",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/public-engagement.avif",
  },
  {
    n: "08", t: "Human Practices", d: "How real-world voices shaped the work.",
    to: "/human-practices",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/integrated-practices.avif", pos: "center 78%",
  },
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
          <Link
            key={c.n}
            to={c.to}
            className={`${styles.xcard} ${c.feature ? styles.xcardFeature : ""} ${c.img ? styles.xcardPhoto : ""}`}
            style={c.img ? { "--xcard-img": `url(${c.img})`, "--xcard-pos": c.pos || "center" } : undefined}
          >
            <span className={styles.xnum}>{c.n}</span>
            <span className={styles.xarrow}><IcoArrow /></span>
            <div className={styles.xbody}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
            {c.credit && (
              <button
                type="button"
                className={styles.xcredit}
                title={c.credit.title}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(c.credit.url, "_blank", "noopener,noreferrer");
                }}
              >
                Photo: NASA
              </button>
            )}
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

  return (
    // ambientMeteors off — <Starfield/> below already renders Home's own,
    // richer meteor field; PageWrapper's would just double it up.
    // navClearance off — Sponsors (the last section below) already reserves
    // its own clearance for the fixed Menu/Footer bar via its
    // padding-bottom, so PageWrapper's would just add a second, unwanted
    // gap of blank background under it.
    <PageWrapper
      background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}
      ambientMeteors={false}
      navClearance={false}
    >
      <SponsorBanner />
      <Starfield />
      <EarthLayer groupRef={heroOrbitRef} />
      <div ref={heroOrbitRef}>
        <HeroSection />
        <OrbitSection groupRef={heroOrbitRef} />
      </div>
      <ProblemSection />
      <RevealSection />
      <SolutionSection />
      <CapabilitiesSection />
      <OutroSection />
      <ExploreSection />
      <Sponsors />
    </PageWrapper>
  );
}
