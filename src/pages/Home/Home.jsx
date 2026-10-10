import { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Sponsors from "../../components/Sponsors/Sponsors";
import SponsorBanner from "../../components/SponsorBanner/SponsorBanner";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import EarthGlobe, { LAT0, LON0, DISK_FILL, projectGlobe } from "../../components/EarthGlobe/EarthGlobe";
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
// this same purple (--bg) takes over before the rocket slide appears —
// a cinematic transition rather than a cut. Tuned together; see the phase
// comments in EarthLayer for how they overlap in scroll-unit terms.
const EXIT_SPIN_TURNS = 3;                      // full extra rotations by the top of the grow phase
const EXIT_ROLL_MAX_RAD = (55 * Math.PI) / 180;  // max axis tilt by the top of the grow phase

// Pulled from the shared sponsor data (not re-imported as a raw asset) so
// there's still one source of truth for the logo file and its
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
// (slides 1–9). Two pre-existing sections that weren't part of that brief —
// a standalone "On-demand medicine. Anywhere." tagline and a nanobody
// production beat — were dropped rather than kept as unlisted extras.

// ── Scroll engine ─────────────────────────────────────────────────────────────

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const between = (p, a, b) => clamp01((p - a) / (b - a));
const smoothstep = (t) => t * t * (3 - 2 * t);

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
        const inView = y + window.innerHeight > el.offsetTop && y < end;
        if (inView === lastViewRef.current) return;
        lastViewRef.current = inView;
        cb.current(peak, inView);
        return;
      }
      const p = clamp01((y - el.offsetTop) / (window.innerHeight * range));
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
      const units = (y - el.offsetTop) / window.innerHeight;
      if (!doneRef.current && units >= el.offsetHeight / window.innerHeight + latchAfter) doneRef.current = true;
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

function HeroSection() {
  const ref = useRef(null);
  const latinRef = useRef(null);
  const arabicRef = useRef(null);
  const copyRef = useRef(null);

  useScene(ref, 1.7, (p) => {
    // Logo -> Arabic wordmark crossfade starts almost as soon as scrolling
    // begins (old 0.30-0.72 range read as "too late"), but stays stretched
    // out to about two-thirds of the pinned hero scene rather than finishing
    // by p=0.35 — an earlier attempt compressed it into the first third,
    // which left a long dead stretch (p≈0.35→0.84) with no visible motion
    // before the copy fade-out kicks in, reading as scrolling suddenly
    // doing nothing rather than as an earlier transition.
    if (latinRef.current) latinRef.current.style.opacity = 1 - between(p, 0.05, 0.55);
    if (arabicRef.current) {
      const fo = between(p, 0.15, 0.65);
      arabicRef.current.style.opacity = fo;
      arabicRef.current.style.transform = `scale(${lerp(0.82, 1, fo)})`;
    }
    if (copyRef.current) {
      copyRef.current.style.transform = `translateY(${-p * 50}px)`;
      copyRef.current.style.opacity = 1 - between(p, 0.84, 1);
    }
  }, 0.7); // static pose: Arabic wordmark in, copy still visible

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
            <span className={styles.subGloss}>شهاب</span> &mdash; Arabic for &lsquo;shooting star.&rsquo;{" "}
            <div><strong className={styles.heroSubHighlight}>On-demand medicine, engineered for anywhere.</strong></div>
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
// 200dvh section, Orbit: range 1.5 over a 275dvh section starting right
// after Hero's 200dvh) so Earth's motion stays in sync with each section's
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
    // to the rocket slide reads as a cut on a wipe rather than Earth just
    // shrinking off the corner. `growEase` (smooth both ends) drives
    // position/scale/opacity; the spin and roll below reuse the same
    // 3.15→3.8 span but with their own ease-IN curves (slow→fast), so
    // everything starts together but visibly accelerates independently —
    // that's what reads as "spinning faster and faster" rather than at a
    // constant rate.
    //
    // The whole sequence (grow through purple-out below) is deliberately
    // kept inside heroOrbitRef's own height (Hero 200dvh + Orbit 275dvh =
    // 4.75 units) and finishes by ~4.45 — the rocket slide's own StatementSection
    // starts fading in almost as soon as its section is reached (~4.75, right
    // after this group ends), so any part of this animation still running
    // past that point would mean the rocket slide visibly arriving while
    // Earth is still mid-wipe instead of after it's done. The ~0.3-unit gap
    // between 4.45 and 4.75 is a deliberate short settle, not dead scroll —
    // Orbit's own section height was sized to match (see .orbitSection).
    const growT = between(units, 3.15, 4.2);
    const growEase = smoothstep(growT);
    const left = lerp(79, 85, q) + growEase * (40 - 85);
    const top = lerp(50, 78, q) + growEase * (48 - 78) - scrollAway;
    const scale = lerp(1, 1.35, q) + growEase * (4.5 - 1.35);
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

// ── Generic single-statement beat (slides 2, 4, 6) ────────────────────────────

function StatementSection({ range = 1.2, tag, decor, className = "", children }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useScene(ref, range, (p) => {
    if (innerRef.current) {
      innerRef.current.style.opacity = Math.min(between(p, 0.05, 0.35), 1 - between(p, 0.7, 1));
      innerRef.current.style.transform = `translateY(${lerp(30, -30, p)}px)`;
    }
  }, 0.5); // static pose: fully in, centered

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

// Bruce McCandless II's untethered MMU spacewalk (STS-41-B) — floats beside
// slide 4's statement with a slow, continuous tilt/wobble (CSS-driven, not
// scroll-tied, unlike the rest of this file's motion) so it reads as
// drifting in zero-g rather than as a static cutout photo.
// Purely decorative now — its attribution lives in the fixed SlideAttributions
// bar above the nav (see Home()), not anchored to the image itself.
function AstronautDecor() {
  return (
    <div className={styles.astronautDecor} aria-hidden="true">
      <img
        src={astronautMmu}
        alt=""
        className={styles.astronautImg}
      />
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

  useScrollUnits(groupRef, (units, isStatic) => {
    const el = rocketRef.current;
    if (!el) return;
    // Static (after the first pass): the launch already happened — stays gone.
    if (isStatic) { el.style.opacity = 0; return; }
    // Slides up from below as slide 2 opens; holds at a fixed spot while
    // slide 2's text is on screen, then launches shortly after that text has
    // fully faded out (which happens at unit 1.2, when the pin ends) rather
    // than waiting almost a full extra viewport-height of idle scroll.
    const REST_TOP = 56;
    const entryP = between(units, 0, 0.35);
    const exitP = between(units, 1.3, 1.9);
    const exitEase = exitP * exitP; // ease-in — starts slow, accelerates away
    const entryDrop = (1 - entryP) * 75; // starts well below the viewport
    const exitShoot = exitEase * 140; // rockets up past the top edge
    const top = REST_TOP + entryDrop - exitShoot;
    const scale = lerp(1, 0.7, exitP);
    // Opacity settles in fast (well before the slide-up finishes) rather
    // than tracking entryP 1:1, so it doesn't look like a dim ghost easing
    // in — it's solid well before it reaches its resting position.
    el.style.opacity = Math.min(1, entryP * 3) * (1 - exitP);
    // `left` is static in CSS and never touched here — like .earthWrap,
    // this runs every animation frame, so keeping it to `transform`/
    // `opacity` only avoids a per-frame layout+repaint on a large,
    // drop-shadowed element (see EarthLayer for the same fix).
    el.style.transform = `translate3d(0, calc(${top}vh - 50%), 0) scale(${scale})`;
  });

  return (
    <div
      className={styles.rocketLayer}
      ref={rocketRef}
      style={{ backgroundImage: `url("${rocketLaunch}")`, opacity: 0 }}
      aria-hidden="true"
    />
  );
}

// Photo attributions for slides 2 and 4 (rocket, astronaut) — fixed to the
// viewport just above the nav dock rather than anchored to each asset, so
// the credit reads in one stable spot instead of drifting/rotating with the
// graphic it's crediting. Each link fades in/out on exactly the same
// schedule as its own slide's statement text (see StatementSection's
// identical p-based formula), so it's only present while that slide — and
// the asset it credits — is actually on screen. Earth's own credit is
// intentionally exempt (see .earthCredit in EarthLayer): it's anchored to
// the globe itself, which (unlike the rocket/astronaut) is on/near-screen
// across several slides rather than one, so a single fixed "current slide"
// credit doesn't fit it.
function SlideAttributions({ rocketRef, astronautRef }) {
  const rocketLinkRef = useRef(null);
  const astronautLinkRef = useRef(null);

  // Static: the rocket itself is gone (see RocketLayer), so its credit is
  // too; the astronaut stays put in its slide, so its credit shows whenever
  // that slide is on screen.
  useScene(rocketRef, 1.2, (p) => {
    const el = rocketLinkRef.current;
    if (!el) return;
    const o = Math.min(between(p, 0.05, 0.35), 1 - between(p, 0.7, 1));
    el.style.opacity = o;
    el.style.pointerEvents = o > 0.05 ? "auto" : "none";
  });

  useScene(astronautRef, 1.2, (p, inView) => {
    const el = astronautLinkRef.current;
    if (!el) return;
    const o = inView !== undefined ? +inView : Math.min(between(p, 0.05, 0.35), 1 - between(p, 0.7, 1));
    el.style.opacity = o;
    el.style.pointerEvents = o > 0.05 ? "auto" : "none";
  });

  return (
    <div className={styles.slideAttribution}>
      <a
        ref={rocketLinkRef}
        href="https://www.nasa.gov/image-detail/amf-sts129-s-092/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.slideAttributionLink}
        style={{ opacity: 0 }}
      >
        Atlantis, STS-129: NASA/Kenny Allen
      </a>
      <a
        ref={astronautLinkRef}
        href="https://images.nasa.gov/details/s84-27017"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.slideAttributionLink}
        style={{ opacity: 0 }}
      >
        Bruce McCandless II, STS-41-B: NASA
      </a>
    </div>
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
    text: "On long-duration missions, replacement medicines may take months to arrive — or may be impossible to deliver.",
    credit: { url: "https://images.nasa.gov/details/PIA03276", label: "Mars: NASA/JPL/MSSS", title: "Mars at Ls 357°: Tharsis — NASA ID PIA03276 — NASA/JPL/Malin Space Science Systems" },
  },
  {
    planet: neptunePlanet,
    Ico: IcoBroken,
    title: "Crews cannot carry everything they might need",
    text: "Spacecraft have limited mass and storage capacity, making it difficult to stock every medicine for every possible medical emergency.",
    credit: { url: "https://images.nasa.gov/details/PIA02210", label: "Neptune: NASA/JPL", title: "Neptune, imaged by Voyager 2 — NASA ID PIA02210 — NASA/JPL" },
  },
  {
    planet: jupiterPlanet,
    Ico: IcoDecay,
    title: "Medicines do not last forever",
    text: "During long-term storage, some medicines can degrade and lose stability or effectiveness.",
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
    // actually on screen — same fade-in/out formula and anchor spot as
    // SlideAttributions uses for the rocket/astronaut slides, just driven by
    // this section's own p instead of a second useScene subscription, and
    // showing all three credits at once (rocket/astronaut are on separate
    // slides so only ever show one at a time; these three discs are all
    // visible together).
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
        {/* Same pill as the "Our Solution" tag (StatementSection). */}
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

// ── Solution + scenarios (slide 7) ─────────────────────────────────────────────
// The "Our Solution" statement and the without/with-SHIHAB scenario share one
// pinned slide: the statement fades in first, then the scenario builds under it.
// (Used to be two slides.) ───────────────────────────────────────────────────────

const B_SUBTILIS_PROTEINS = ["Chaperone A", "Repair B"];
const S_CEREVISIAE_PROTEINS = ["Stress C"];
const STRESSORS = ["Radiation", "Microgravity", "Temperature fluctuations"];

function ScenarioOrganism({ type, orgRef, markRef, proteins, protRef }) {
  return (
    <div className={styles.orgWrap}>
      <div className={`${styles.organism} ${styles[type]}`} ref={orgRef}>
        <span className={styles.orgMark} ref={markRef}>
          <svg className={styles.orgMarkIconX} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
          <svg className={styles.orgMarkIconV} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 12 9 18 20 6" />
          </svg>
        </span>
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
  const statementRef = useRef(null);

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
      markEl.classList.toggle(styles.orgMarkX, isDead);
      markEl.classList.toggle(styles.orgMarkV, isAlive);
    }
  };

  useScene(ref, 2.2, (p) => {
    if (statementRef.current) {
      const o = between(p, 0.0, 0.1);
      statementRef.current.style.opacity = o;
      statementRef.current.style.transform = `translateY(${lerp(22, 0, o)}px)`;
    }
    const labelsOp = between(p, 0.10, 0.22);
    const orgsOp   = between(p, 0.22, 0.38);
    const stressOp = between(p, 0.38, 0.52);
    const protOp   = between(p, 0.52, 0.64);
    const outOp    = between(p, 0.66, 0.80);
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
        <div className={styles.scenarioStatement} ref={statementRef} style={{ opacity: 0 }}>
          <span className={styles.tag}>
            <span className={styles.tagDot} />
            Our Solution
          </span>
          <p className={styles.scenarioLine}>
            We <em>engineer</em> resilient microbial systems &mdash;{" "}
            <span className={styles.vio}>B. subtilis</span> and <span className={styles.vio}>S. cerevisiae</span>{" "}
            &mdash; that <em>thrive under space stressors</em>.
          </p>
        </div>

        <div className={styles.scenarioPanels}>

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
  {
    n: "01", t: "The Project", d: "How SHIHAB engineers medical autonomy for deep-space missions — the full scientific rationale.",
    to: "/project", feature: true,
    img: "https://static.igem.wiki/teams/6341/wiki/images/project-card.avif", pos: "center 22%",
    credit: { url: "https://images.nasa.gov/details/iss040e089385", title: "Earth observation from the ISS, Expedition 40 — NASA ID iss040e089385" },
  },
  {
    n: "02", t: "Wet Lab", d: "Strain engineering, assays, and protein expression.",
    to: "/wetlab",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/wetlab.avif",
  },
  {
    n: "03", t: "Dry Lab", d: "Modelling, bioinformatics, and circuit design.",
    to: "/drylab",
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
    to: "/safety",
    img: "https://static.igem.wiki/teams/6341/wiki/images/team/safety.avif",
  },
  {
    n: "07", t: "Public Engagement", d: "Bringing space biology to the public.",
    to: "/engagement",
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
  const rocketGroupRef = useRef(null);
  const astronautGroupRef = useRef(null);

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
      <RocketLayer groupRef={rocketGroupRef} />
      <SlideAttributions rocketRef={rocketGroupRef} astronautRef={astronautGroupRef} />
      <div ref={rocketGroupRef}>
        <StatementSection decor={<PlanetDecor />}>
          Future missions may last for <em>month or even years</em>. Every medicine must{" "}
          <em>survive the journey</em>, remain effective, and be available when needed.
        </StatementSection>
      </div>
      <ProblemSection />
      <StatementSection>
        The <em>farther</em> we travel, the <em>less</em> we can depend on Earth.
      </StatementSection>
      <div ref={astronautGroupRef}>
        <StatementSection decor={<AstronautDecor />} className={styles.statementRight}>
          What if, instead of <em>carrying</em> every medicine, astronauts carried the{" "}
          <em>ability to make them</em>?
        </StatementSection>
      </div>
      <RevealSection />
      <ScenarioSection />
      <CapabilitiesSection />
      <OutroSection />
      <ExploreSection />
      <Sponsors />
    </PageWrapper>
  );
}
