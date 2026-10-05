import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MoratoriumDialogue.module.scss";

// Animated two-character conversation restating the Kallpa section's
// "Context" subsection (education.md): Law No. 31.111's LMO moratorium and
// Ministerial Resolution No. D000068-2026-MINAM-DM's CRISPR exemption. Every
// line paraphrases that prose and adds no new claim, so if the Context text
// changes, update LINES to match. Ported from a standalone HTML mockup
// (src/content/peru-moratorium-dialogue.html) into the Education page's
// `.try` panel style and the site's color tokens.
//
// [speaker, text, inset shown alongside the line (or null)]
const LINES = [
  ["m", "Rosa, did you hear? Peru just approved a new resolution about gene-edited plants.", null],
  ["r", "Gene-edited? But we already have a moratorium on GMOs, right?", null],
  ["m", "Yes, under Law No. 31.111. It legally restricts the entry, cultivation and production of Living Modified Organisms, or LMOs.", "law"],
  ["r", "Brazil and Paraguay grow lots of transgenic crops. Why is Peru so different?", null],
  ["m", "Peru chose strong opposition, to protect its agrobiodiversity and organic gastronomy.", null],
  ["r", "That makes sense. So what changed?", null],
  ["m", "In April 2026, Peru approved Ministerial Resolution No. D000068-2026-MINAM-DM. If a plant is edited with CRISPR to modify or silence one of its own genes, with no foreign DNA added, it is not classified as an LMO.", "crispr"],
  ["r", "So it would be exempt from the moratorium?", null],
  ["m", "Exactly. It could potentially be grown commercially.", null],
  ["r", "Then let's learn how it works before we decide what to think.", null],
];

const NAMES = { m: "Mateo", r: "Rosa" };

const TYPE_MS = 26; // per character
const POP_MS = 350; // bubble pop-in before typing starts
const holdMs = (text) => 1500 + text.length * 14; // pause after a line finishes

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function Mateo() {
  return (
    <svg viewBox="0 0 160 260" role="img" aria-label="Mateo, a young Peruvian student">
      <rect x="46" y="120" width="68" height="110" rx="26" fill="#6b4fd6" />
      <path d="M46 150h68M46 170h68" stroke="#e86a8a" strokeWidth="6" />
      <path d="M50 195h60" stroke="#f2c14e" strokeWidth="5" />
      <rect x="56" y="225" width="18" height="30" rx="8" fill="#2a1d4a" />
      <rect x="86" y="225" width="18" height="30" rx="8" fill="#2a1d4a" />
      <g className={styles.arm}>
        <rect x="108" y="128" width="16" height="58" rx="8" fill="#6b4fd6" />
        <circle cx="116" cy="190" r="9" fill="#d29b73" />
      </g>
      <rect x="68" y="104" width="24" height="24" fill="#d29b73" />
      <circle cx="80" cy="82" r="32" fill="#d29b73" />
      <path d="M46 78c0-34 20-44 34-44s34 10 34 44c-10-10-22-14-34-14s-24 4-34 14z" fill="#e86a8a" />
      <path d="M48 70c10-8 20-12 32-12s22 4 32 12" stroke="#f2c14e" strokeWidth="5" fill="none" />
      <path d="M44 80v34l14-6V82zM116 80v34l-14-6V82z" fill="#f2c14e" />
      <path d="M44 96l14-5M116 96l-14-5" stroke="#6b4fd6" strokeWidth="4" />
      <circle cx="80" cy="30" r="7" fill="#f2c14e" />
      <g className={styles.blink}>
        <circle cx="68" cy="86" r="3.5" fill="#1a1030" />
        <circle cx="92" cy="86" r="3.5" fill="#1a1030" />
      </g>
      <ellipse className={styles.mouth} cx="80" cy="102" rx="7" ry="4" fill="#5a1f33" />
    </svg>
  );
}

function Rosa() {
  return (
    <svg viewBox="0 0 160 260" role="img" aria-label="Rosa, a Peruvian farmer">
      <path d="M40 150h80l16 90H24z" fill="#d94f7c" />
      <path d="M30 200h100M26 222h108" stroke="#f2c14e" strokeWidth="6" />
      <path d="M34 212h92" stroke="#3fb7a8" strokeWidth="5" />
      <rect x="44" y="118" width="72" height="50" rx="22" fill="#3fb7a8" />
      <path d="M44 140h72" stroke="#fff" strokeWidth="4" strokeDasharray="6 5" />
      <rect x="36" y="128" width="16" height="58" rx="8" fill="#3fb7a8" />
      <circle cx="44" cy="190" r="9" fill="#c98e69" />
      <g className={styles.arm}>
        <rect x="108" y="128" width="16" height="58" rx="8" fill="#3fb7a8" />
        <circle cx="116" cy="190" r="9" fill="#c98e69" />
      </g>
      <rect x="68" y="102" width="24" height="24" fill="#c98e69" />
      <path
        d="M46 80c-8 30-4 60-14 84M114 80c8 30 4 60 14 84"
        stroke="#1a1030"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="32" cy="168" r="6" fill="#f2c14e" />
      <circle cx="128" cy="168" r="6" fill="#f2c14e" />
      <circle cx="80" cy="80" r="31" fill="#c98e69" />
      <path d="M48 70c0-16 14-24 32-24s32 8 32 24c-10-8-20-10-32-10s-22 2-32 10z" fill="#1a1030" />
      <ellipse cx="80" cy="46" rx="50" ry="13" fill="#f2f0fa" />
      <path d="M44 46h72" stroke="#d94f7c" strokeWidth="5" />
      <path d="M50 40q30-22 60 0" fill="#f2f0fa" />
      <path d="M52 38h56" stroke="#B16DFF" strokeWidth="4" />
      <g className={styles.blink}>
        <circle cx="68" cy="84" r="3.5" fill="#1a1030" />
        <circle cx="92" cy="84" r="3.5" fill="#1a1030" />
      </g>
      <ellipse className={styles.mouth} cx="80" cy="100" rx="7" ry="4" fill="#5a1f33" />
    </svg>
  );
}

// SVG fill/stroke are presentation attributes and can't read CSS custom
// properties, so the token hexes are written out: #B16DFF = --primary,
// #FFD84D = --accent/--amber (see src/styles/index.scss).
function LawInset() {
  return (
    <>
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <path
          d="M60 8l40 14v26c0 18-16 26-40 32C36 74 20 66 20 48V22z"
          fill="none"
          stroke="#B16DFF"
          strokeWidth="4"
        />
        <text x="60" y="52" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">
          LMO
        </text>
      </svg>
      <span>Law No. 31.111</span>
      <small>Moratorium</small>
    </>
  );
}

function CrisprInset() {
  return (
    <>
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <path d="M10 40c20-34 30 34 50 0s30-34 50 0" stroke="#B16DFF" strokeWidth="4" fill="none" />
        <path d="M10 40c20 34 30-34 50 0s30 34 50 0" stroke="#fff" strokeWidth="4" fill="none" opacity=".6" />
        <rect className={styles.editBox} x="48" y="22" width="24" height="36" rx="6" fill="none" stroke="#FFD84D" strokeWidth="3" />
      </svg>
      <span>CRISPR edit of its own gene</span>
      <small>No foreign DNA</small>
    </>
  );
}

const INSETS = { law: LawInset, crispr: CrisprInset };

// Twinkling stars + drifting particles, only animated while the stage is on
// screen (and frozen under prefers-reduced-motion).
function useStarfield(canvasRef, active) {
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return undefined;
    const cx = cv.getContext("2d");
    const still = prefersReducedMotion();
    let W = 0;
    let H = 0;
    let stars = [];
    let t = 0;
    let raf = 0;

    const size = () => {
      const d = window.devicePixelRatio || 1;
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * d;
      cv.height = H * d;
      cx.setTransform(d, 0, 0, d, 0, 0);
      stars = Array.from({ length: 90 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.7,
        r: Math.random() * 1.3 + 0.3,
        p: Math.random() * 6,
      }));
    };

    const frame = () => {
      cx.clearRect(0, 0, W, H);
      if (!still) t += 0.02;
      cx.fillStyle = "#fff";
      stars.forEach((s) => {
        cx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t + s.p));
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, 7);
        cx.fill();
      });
      for (let k = 0; k < 6; k++) {
        const x = (k * 0.19 * W + t * 14 * (k % 2 ? 1 : -1) + W * 2) % W;
        const y = H * 0.55 + Math.sin(t * 1.2 + k) * H * 0.06 - k * 4;
        cx.globalAlpha = 0.45;
        cx.fillStyle = k % 2 ? "#FFD84D" : "#B16DFF";
        cx.beginPath();
        cx.ellipse(x, y, 6, 3, t + k, 0, 7);
        cx.fill();
      }
      cx.fillStyle = "#fff";
      if (active && !still) raf = requestAnimationFrame(frame);
    };

    size();
    frame();
    const ro = new ResizeObserver(() => {
      size();
      if (!active || still) frame();
    });
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef, active]);
}

export default function MoratoriumDialogue() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [line, setLine] = useState(-1); // -1 = not started yet
  const [chars, setChars] = useState(0);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);

  useStarfield(canvasRef, inView);

  // Characters slide in the first time the stage scrolls into view; the
  // conversation starts once they've arrived.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) setStarted(true);
      },
      { threshold: [0, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((n) => {
    setLine(n);
    setChars(prefersReducedMotion() ? LINES[n][1].length : 0);
    setDone(false);
  }, []);

  useEffect(() => {
    if (!started || line !== -1) return undefined;
    const id = setTimeout(() => go(0), 1100);
    return () => clearTimeout(id);
  }, [started, line, go]);

  // Typewriter + auto-advance. One timer at a time; pausing just stops
  // scheduling the next one.
  useEffect(() => {
    if (line < 0 || paused || done) return undefined;
    const text = LINES[line][1];
    let id;
    if (chars < text.length) {
      id = setTimeout(() => setChars((c) => c + 1), chars === 0 ? POP_MS : TYPE_MS);
    } else if (line < LINES.length - 1) {
      id = setTimeout(() => go(line + 1), holdMs(text));
    } else {
      setDone(true);
    }
    return () => clearTimeout(id);
  }, [line, chars, paused, done, go]);

  const replay = () => {
    setPaused(false);
    go(0);
  };

  const current = line >= 0 ? LINES[line] : null;
  const speaker = current?.[0];
  const talking = current && chars < current[1].length && !paused;
  const Inset = current?.[2] ? INSETS[current[2]] : null;

  return (
    <div className={styles.dialogue}>
      <p className={styles.label}>Two Peruvians, one new rule</p>

      <div ref={stageRef} className={`${styles.stage} ${started ? styles.on : ""}`}>
        <canvas ref={canvasRef} className={styles.sky} aria-hidden="true" />
        <svg className={styles.mountains} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
          <path
            className={styles.ridgeBack}
            d="M0 200V120l90-60 80 50 110-90 120 100 90-50 130 80 100-70 120 90 90-50 60 40v80z"
          />
          <path
            className={styles.ridgeFront}
            d="M0 200v-40l120-30 130 40 170-50 160 40 140-30 160 40 120-20v50z"
          />
        </svg>

        <div
          className={`${styles.ch} ${styles.mateo} ${speaker === "m" ? styles.speaking : ""} ${
            talking && speaker === "m" ? styles.talk : ""
          }`}
        >
          <Mateo />
          <span className={styles.name}>Mateo</span>
        </div>
        <div
          className={`${styles.ch} ${styles.rosa} ${speaker === "r" ? styles.speaking : ""} ${
            talking && speaker === "r" ? styles.talk : ""
          }`}
        >
          <Rosa />
          <span className={styles.name}>Rosa</span>
        </div>

        {Inset && (
          <div key={current[2]} className={styles.inset} aria-hidden="true">
            <Inset />
          </div>
        )}

        {current && (
          <div
            key={line}
            className={`${styles.bubble} ${speaker === "m" ? styles.left : styles.right}`}
            aria-hidden="true"
          >
            <b>{NAMES[speaker]}</b>
            {current[1].slice(0, chars)}
            {!done && <span className={styles.cursor} />}
          </div>
        )}
        {/* Screen readers get each whole line once, not one character at a time. */}
        <p className={styles.srOnly} aria-live="polite">
          {current ? `${NAMES[speaker]}: ${current[1]}` : ""}
        </p>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={() => setPaused((p) => !p)} disabled={!current || done}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button type="button" className={styles.btn} onClick={replay} disabled={!current}>
          Replay
        </button>
        <div className={styles.progress} role="group" aria-label="Jump to line">
          {LINES.map(([s], i) => (
            <button
              key={i}
              type="button"
              aria-label={`Line ${i + 1} (${NAMES[s]})`}
              aria-current={i === line ? "step" : undefined}
              className={`${styles.seg} ${i <= line ? styles.segDone : ""}`}
              onClick={() => {
                setStarted(true);
                go(i);
              }}
            />
          ))}
        </div>
      </div>

      <details className="details">
        <summary className="details-summary">Read the full conversation</summary>

        <div className="details-body">
          <dl className={styles.transcript}>
            {LINES.map(([s, text], i) => (
              <div key={i}>
                <dt>{NAMES[s]}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </details>
    </div>
  );
}
