import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./ThuwalHero.module.scss";

// Intro card for School Outreach's Thuwal Science Pioneers Program, ported
// from Genesis's "summer outreach.html" mockup: the KAUST Beacon (a
// hexagonal-lattice tower) sweeps a light beam across a row of date palms,
// follows the cursor, and sends a "signal" when clicked. Placed at the
// `<!-- school:thuwal-hero -->` marker in education.md.

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Her mockup's rotating signal messages, verbatim.
const MESSAGES = [
  "Signal sent → Thuwal",
  "Signal received ← Jeddah",
  "Science is calling ✦",
  "النور من ثُول",
  "Door open: come see our labs",
];

// Palm positions from the mockup; `small` ones hide on narrow cards.
const PALMS = [
  { side: "left", at: "2%", h: 230, delay: "0s" },
  { side: "left", at: "11%", h: 150, delay: "-2s", small: true },
  { side: "left", at: "41%", h: 130, delay: "-3.5s", small: true },
  { side: "right", at: "2%", h: 210, delay: "-1s" },
  { side: "right", at: "9%", h: 140, delay: "-4s", small: true },
];

const GLOBE_LIGHTS = [
  ["40%", "1.5%", "0s"],
  ["44%", "2.8%", "-1s"],
  ["47%", "1.2%", "-2s"],
  ["52%", "3%", "0s"],
  ["36%", "3.4%", "-1.4s"],
  ["56%", "1.8%", "-0.6s"],
];

// Small seeded PRNG so the lattice's hand-drawn jitter is the same on every
// render (the mockup used Math.random, which would reshuffle per mount).
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The tower outline (narrow top, flared base) and the irregular hex
// lattice clipped to it, in a 260×600 viewBox.
function beaconPaths() {
  const w = (t) => 8 + 102 * Math.pow(t, 2.4);
  const left = [];
  const right = [];
  for (let t = 0; t <= 1.001; t += 0.02) {
    const y = (24 + t * 572).toFixed(1);
    left.push(`${(130 - w(t)).toFixed(1)} ${y}`);
    right.unshift(`${(130 + w(t)).toFixed(1)} ${y}`);
  }
  const outline = [...left, ...right].map((p, i) => (i ? "L" : "M") + p).join("") + "Z";

  const rand = mulberry32(6341);
  let lattice = "";
  let y = 24;
  let rows = 0;
  while (y < 598) {
    const t = (y - 24) / 572;
    const s = 3.2 + Math.pow(t, 1.7) * 30;
    const h = Math.sqrt(3) * s;
    const hw = w(t) + h;
    const off = (rows % 2) * (h / 2);
    for (let x = 130 - hw + off; x < 130 + hw; x += h) {
      const cx = x + (rand() - 0.5) * s * 0.25;
      const cy = y + (rand() - 0.5) * s * 0.2;
      for (let k = 0; k < 6; k++) {
        const an = (Math.PI / 3) * k + Math.PI / 6;
        lattice +=
          (k ? "L" : "M") +
          (cx + s * 0.92 * Math.cos(an)).toFixed(1) +
          " " +
          (cy + s * 0.92 * Math.sin(an)).toFixed(1);
      }
      lattice += "Z";
    }
    y += s * 1.5;
    rows++;
  }
  return { outline, lattice };
}

function Palm({ palm, palmRef }) {
  const pos = { [palm.side]: palm.at, "--h": `${palm.h}px`, "--d": palm.delay };
  return (
    <svg
      ref={palmRef}
      className={`${styles.palm} ${palm.small ? styles.palmSmall : ""}`}
      style={pos}
      viewBox="0 0 120 170"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M60 168C57 130 64 100 60 66" strokeWidth="7" />
        <path d="M60 66C38 34 16 38 4 68" strokeWidth="3.6" />
        <path d="M60 66C40 52 20 62 10 92" strokeWidth="3.2" />
        <path d="M60 66C48 30 30 14 6 14" strokeWidth="3.4" />
        <path d="M60 66C82 34 104 38 116 68" strokeWidth="3.6" />
        <path d="M60 66C80 52 100 62 110 92" strokeWidth="3.2" />
        <path d="M60 66C72 30 90 14 114 14" strokeWidth="3.4" />
        <path d="M60 66C60 40 58 22 56 2" strokeWidth="3.4" />
      </g>
    </svg>
  );
}

export default function ThuwalHero() {
  const uid = useId().replace(/:/g, "");
  const { outline, lattice } = useMemo(beaconPaths, []);
  const heroRef = useRef(null);
  const beamRef = useRef(null);
  const tipRef = useRef(null);
  const ringsRef = useRef(null);
  const palmRefs = useRef([]);
  const motion = useRef({ ang: -10, target: null, spin: 0, visible: false });
  const [message, setMessage] = useState(null);
  const msgIndex = useRef(0);
  const msgTimer = useRef(null);

  const rings = () => {
    const g = ringsRef.current;
    if (!g) return;
    for (let i = 0; i < 3; i++) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", 130);
      c.setAttribute("cy", 14);
      c.setAttribute("r", 10);
      c.setAttribute("class", styles.ring);
      g.appendChild(c);
      if (!c.animate || reducedMotion()) {
        c.remove();
        continue;
      }
      c.animate(
        [
          { transform: "scale(1)", opacity: 0.9 },
          { transform: "scale(30)", opacity: 0 },
        ],
        { duration: 2800, delay: i * 380, easing: "cubic-bezier(.2,.6,.3,1)", fill: "backwards" },
      ).onfinish = () => c.remove();
    }
  };

  const signal = () => {
    rings();
    motion.current.spin = 360;
    setMessage(MESSAGES[msgIndex.current++ % MESSAGES.length]);
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMessage(null), 2600);
  };

  useEffect(() => {
    const hero = heroRef.current;
    const still = reducedMotion();
    const m = motion.current;

    const io = new IntersectionObserver(([e]) => (m.visible = e.isIntersecting));
    io.observe(hero);

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      const l = tipRef.current.getBoundingClientRect();
      m.target =
        (Math.atan2(e.clientX - (l.left + l.width / 2), -(e.clientY - (l.top + l.height / 2))) * 180) /
          Math.PI -
        7;
    };
    const onLeave = () => (m.target = null);
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    let raf;
    const frame = () => {
      if (m.visible) {
        if (!still) {
          if (m.spin > 0) {
            const s = Math.min(m.spin, 16);
            m.ang += s;
            m.spin -= s;
          } else if (m.target !== null) {
            const d = ((((m.target - m.ang + 180) % 360) + 360) % 360) - 180;
            m.ang += d * 0.08;
          } else m.ang += 0.3;
        }
        beamRef.current.style.transform = `rotate(${m.ang}deg)`;
        // The beam lights every palm it sweeps across.
        const l = tipRef.current.getBoundingClientRect();
        const tx = l.left + l.width / 2;
        const ty = l.top + l.height / 2;
        const bc = (((m.ang + 7) % 360) + 360) % 360;
        palmRefs.current.forEach((p) => {
          if (!p) return;
          const r = p.getBoundingClientRect();
          const a =
            ((Math.atan2(r.left + r.width / 2 - tx, -(r.top + r.height * 0.4 - ty)) * 180) / Math.PI + 360) % 360;
          const dd = Math.abs(((((a - bc + 180) % 360) + 360) % 360) - 180);
          p.classList.toggle(styles.palmLit, dd < 11);
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const ambient = setInterval(() => {
      if (m.visible && !still) rings();
    }, 9000);

    return () => {
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      clearInterval(ambient);
      clearTimeout(msgTimer.current);
    };
  }, []);

  return (
    <div ref={heroRef} className={styles.hero}>
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.globe} aria-hidden="true">
        {GLOBE_LIGHTS.map(([left, top, delay]) => (
          <i key={left + top} style={{ left, top, animationDelay: delay }} />
        ))}
      </div>
      <div className={styles.shore} aria-hidden="true">
        {PALMS.map((p, i) => (
          <Palm key={i} palm={p} palmRef={(el) => (palmRefs.current[i] = el)} />
        ))}
      </div>

      <div className={styles.beacon}>
        <div ref={beamRef} className={styles.beam} />
        <div className={`${styles.signal} ${message ? styles.signalOn : ""}`} role="status">
          {message}
        </div>
        <svg
          className={styles.tower}
          viewBox="0 0 260 600"
          role="button"
          tabIndex={0}
          aria-label="The KAUST Beacon. Click to send a signal"
          onClick={signal}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              signal();
            }
          }}
        >
          <defs>
            <clipPath id={`${uid}-clip`}>
              <path d={outline} />
            </clipPath>
            <linearGradient id={`${uid}-sweep`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="150">
              <stop offset="0" stopColor="#fff6c8" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff6c8" />
              <stop offset="1" stopColor="#fff6c8" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="0 650"
                to="0 -160"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <radialGradient id={`${uid}-base`} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#FFD84D" stopOpacity=".5" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${uid}-halo`} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#fff6c8" stopOpacity=".95" />
              <stop offset=".35" stopColor="#FFD84D" stopOpacity=".45" />
              <stop offset="1" stopColor="#FFD84D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="130" cy="590" rx="170" ry="30" fill={`url(#${uid}-base)`} />
          <g clipPath={`url(#${uid}-clip)`}>
            <rect width="260" height="600" fill="rgba(40,26,80,.55)" />
            <path d={lattice} fill="none" stroke="#ead7b2" strokeWidth="1.1" />
            <path d={lattice} fill="none" stroke={`url(#${uid}-sweep)`} strokeWidth="2.2" />
          </g>
          <circle className={styles.halo} cx="130" cy="14" r="46" fill={`url(#${uid}-halo)`} />
          <g ref={ringsRef} />
          <path
            ref={tipRef}
            className={styles.tip}
            d="M130 -2L133.5 10L146 14L133.5 18L130 30L126.5 18L114 14L126.5 10Z"
            fill="#fff6c8"
          />
        </svg>
      </div>

      <div className={styles.text}>
        <div className={styles.eyebrow}>KAUST iGEM · Thuwal, Saudi Arabia</div>
        <h3 id="thuwal-science-pioneers-program" className={styles.title}>
          Thuwal Science Pioneers Program
        </h3>
        <div className={styles.arabic} lang="ar" dir="rtl">
          برنامج رواد العلوم في ثُول
        </div>
        <div className={styles.audience}>
          For <b>Thuwal middle and high school students</b>
        </div>
        <div className={styles.chips}>
          <span>Science</span>
          <span>Space</span>
          <span>Synthetic biology</span>
        </div>
      </div>
    </div>
  );
}
