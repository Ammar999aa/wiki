import { useRef, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Footer from "../../components/Footer/Footer";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import earth from "../../assets/earth.webp";

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
  const earthRef = useRef(null);
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
    if (earthRef.current) {
      const ty = -150 * p * ScrollEngine.motion;
      const sc = lerp(1, 1.12, p);
      earthRef.current.style.transform = `translate(-50%, -50%) translateY(${ty}px) scale(${sc})`;
    }
  });

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.heroSticky}>

        {/* Earth */}
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

        {/* Signature streaks */}
        <div className={styles.heroStreaks} aria-hidden="true">
          <span className={`${styles.streak} ${styles.s1}`} />
          <span className={`${styles.streak} ${styles.s2}`} />
        </div>

        {/* Copy */}
        <div className={styles.heroCopy} ref={copyRef}>
          <span className={styles.heroEyebrow}>iGEM · Synthetic Biology in Space</span>
          <div className={styles.wordmark}>
            <h1 className={styles.wordmarkLatin} ref={latinRef}>Shihab</h1>
            <h1 className={styles.wordmarkArabic} ref={arabicRef} dir="rtl" lang="ar" style={{ opacity: 0 }}>شهاب</h1>
          </div>
          <p className={styles.heroSub}>
            <span className={styles.subGloss}>شهاب</span> &mdash; Arabic for &lsquo;shooting star.&rsquo; On-demand medicine, engineered for anywhere.
          </p>
          <div className={styles.heroTelemetry}>
            <span>PLATFORM <b>B. subtilis · S. cerevisiae</b></span>
            <span>OUTPUT <b>Therapeutic nanobodies</b></span>
            <span>ENV <b>Microgravity-rated</b></span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Tagline ───────────────────────────────────────────────────────────────────

function TaglineSection() {
  const ref = useRef(null);
  const pRef = useRef(null);

  useScene(ref, 1, (p) => {
    if (pRef.current) {
      pRef.current.style.opacity = Math.min(between(p, 0.05, 0.35), 1 - between(p, 0.7, 1));
      pRef.current.style.transform = `translateY(${lerp(30, -30, p)}px)`;
    }
  });

  return (
    <section className={styles.tagline} ref={ref}>
      <p ref={pRef} style={{ opacity: 0 }}>
        On-demand medicine.<br /><span className={styles.accentText}>Anywhere.</span>
      </p>
    </section>
  );
}

// ── Orbit diagram ─────────────────────────────────────────────────────────────

const ORBITS = [
  { key: "food",     label: "Food",     r: 66,  angle: 0,   th: 0.20 },
  { key: "water",    label: "Water",    r: 108, angle: 90,  th: 0.38 },
  { key: "safety",   label: "Safety",   r: 150, angle: 180, th: 0.55 },
  { key: "medicine", label: "Medicine", r: 192, angle: 270, th: 0.70, hl: true },
];

function orbitPos(r, a) {
  const rad = (a * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function OrbitSection() {
  const ref = useRef(null);
  const ringRefs = useRef([]);
  const nodeRefs = useRef([]);

  useScene(ref, 1.5, (p) => {
    ORBITS.forEach((o, i) => {
      const rp = clamp01((p - (o.th - 0.06)) / 0.12);
      const ip = clamp01((p - o.th) / 0.10);
      const ring = ringRefs.current[i];
      const node = nodeRefs.current[i];
      if (ring) {
        ring.style.opacity = rp;
        ring.style.transform = `translate(-50%,-50%) scale(${lerp(0.25, 1, rp)})`;
      }
      if (node) {
        const { x, y } = orbitPos(o.r, o.angle);
        node.style.opacity = ip;
        node.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(${lerp(0.6, 1, ip)})`;
      }
    });
  });

  return (
    <section className={styles.orbitSection} ref={ref}>
      <div className={styles.orbitSticky}>
        <p className={styles.bigLine} style={{ maxWidth: 560 }}>
          Astronauts depend on a fragile chain of essentials —{" "}
          <span className={styles.vio}>including medicine.</span>
        </p>
        <div className={styles.orbitDiagram}>
          <div className={styles.orbitCore} />
          {ORBITS.map((o, i) => (
            <div
              key={"r" + o.key}
              ref={(el) => (ringRefs.current[i] = el)}
              className={styles.orbitRingWrapper}
              style={{ width: o.r * 2, height: o.r * 2, opacity: 0, transform: "translate(-50%,-50%) scale(0.25)" }}
            >
              <div className={`${styles.orbitRing} ${o.hl ? styles.medicineRing : ""}`} />
            </div>
          ))}
          {ORBITS.map((o, i) => (
            <div
              key={"n" + o.key}
              ref={(el) => (nodeRefs.current[i] = el)}
              className={styles.orbitNode}
              style={{ opacity: 0 }}
            >
              <span className={`${styles.orbitPin} ${o.hl ? styles.medicinePin : ""}`} />
              <small className={`${styles.orbitNodeLabel} ${o.hl ? styles.medicineLabelHighlight : ""}`}>{o.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Planets / phrases ─────────────────────────────────────────────────────────

const PLANET_PHRASES = [
  {
    key: "p1",
    content: <>Future missions will operate in <span className={styles.vio}>isolated, extreme environments.</span></>,
    inAt: 0.00, outAt: 0.30,
  },
  {
    key: "p2",
    content: <>Traditional drug supply chains <em>cannot</em> reach deep space.</>,
    inAt: 0.32, outAt: 0.62,
  },
  {
    key: "p3",
    content: "Medical autonomy becomes essential for mission success.",
    inAt: 0.64, outAt: null,
  },
];

function PlanetsSection() {
  const ref = useRef(null);
  const phraseRefs = useRef([]);

  useScene(ref, 2.0, (p) => {
    PLANET_PHRASES.forEach((s, i) => {
      const fadeIn  = clamp01((p - s.inAt) / 0.09);
      const fadeOut = s.outAt != null ? clamp01((s.outAt - p) / 0.06) : 1;
      const el = phraseRefs.current[i];
      if (el) {
        el.style.opacity = Math.min(fadeIn, fadeOut);
        el.style.transform = `translateY(${lerp(18, 0, fadeIn)}px)`;
      }
    });
  });

  return (
    <section className={styles.planetsSection} ref={ref}>
      <div className={styles.planetsSticky}>
        <div className={`${styles.planet} ${styles.p1}`} />
        <div className={`${styles.planet} ${styles.p2}`} />
        <div className={`${styles.planet} ${styles.p3}`} />
        <div className={`${styles.planet} ${styles.p4}`} />
        <div className={`${styles.planet} ${styles.p5}`} />
        <div className={styles.phraseStack}>
          {PLANET_PHRASES.map((s, i) => (
            <p
              key={s.key}
              className={styles.bigLine}
              style={{ opacity: 0 }}
              ref={(el) => (phraseRefs.current[i] = el)}
            >
              {s.content}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reveal ────────────────────────────────────────────────────────────────────

function RevealSection() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const astraRef = useRef(null);
  const arRef = useRef(null);

  useScene(ref, 1.2, (p) => {
    if (labelRef.current) labelRef.current.style.opacity = Math.min(between(p, 0.0, 0.15), 1 - between(p, 0.75, 0.95));
    if (astraRef.current) {
      const o = between(p, 0.25, 0.45);
      astraRef.current.style.opacity = o;
      astraRef.current.style.transform = `scale(${lerp(0.72, 1, between(p, 0.25, 0.6))})`;
    }
    if (arRef.current) arRef.current.style.opacity = between(p, 0.42, 0.6);
  });

  return (
    <section className={styles.revealSection} ref={ref}>
      <div className={styles.revealSticky}>
        <p className={styles.revealLabel} ref={labelRef} style={{ opacity: 0 }}>Our answer &mdash;</p>
        <h2 className={styles.revealAstra} ref={astraRef} style={{ opacity: 0 }}>Shihab</h2>
        <p className={styles.revealAr} ref={arRef} dir="rtl" lang="ar" style={{ opacity: 0 }}>شهاب</p>
      </div>
    </section>
  );
}

// ── Briefing ──────────────────────────────────────────────────────────────────

const BRIEFING = [
  {
    tag: "Context",
    content: <>Medicines can be produced on demand using <span className={styles.vio}>engineered biological systems.</span></>,
    inAt: 0.00, outAt: 0.30,
  },
  {
    tag: "Problem",
    content: <>But biology is <em>not</em> naturally adapted to function in space conditions.</>,
    inAt: 0.32, outAt: 0.62,
  },
  {
    tag: "Solution",
    content: <>We engineer resilient microbial systems — <span className={styles.vio}>B. subtilis</span> and <span className={styles.vio}>S. cerevisiae</span> — that thrive under space stressors.</>,
    inAt: 0.64, outAt: null,
  },
];

function BriefingSection() {
  const ref = useRef(null);
  const itemRefs = useRef([]);

  useScene(ref, 2.0, (p) => {
    BRIEFING.forEach((s, i) => {
      const fadeIn  = clamp01((p - s.inAt) / 0.09);
      const fadeOut = s.outAt != null ? clamp01((s.outAt - p) / 0.06) : 1;
      const el = itemRefs.current[i];
      if (el) {
        el.style.opacity = Math.min(fadeIn, fadeOut);
        el.style.transform = `translateY(${lerp(20, 0, fadeIn)}px)`;
      }
    });
  });

  return (
    <section className={styles.briefingSection} ref={ref}>
      <div className={styles.briefingSticky}>
        <div className={styles.briefingStack}>
          {BRIEFING.map((s, i) => (
            <div
              key={s.tag}
              className={styles.briefingItem}
              style={{ opacity: 0 }}
              ref={(el) => (itemRefs.current[i] = el)}
            >
              <span className={styles.tag}>
                <span className={styles.tagDot} />
                {s.tag}
              </span>
              <p className={styles.bigLine}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

const B_SUBTILIS_PROTEINS = ["Chaperone A", "Repair B"];
const S_CEREVISIAE_PROTEINS = ["Stress C"];
const STRESSORS = ["Radiation", "Microgravity", "Extreme temp."];

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
  const surviveRef = useRef(null);
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
    if (surviveRef.current) surviveRef.current.style.opacity = survOp;

    setOrg(bDeadRef.current, bDeadMarkRef.current, outOp > 0.01, false);
    setOrg(yDeadRef.current, yDeadMarkRef.current, outOp > 0.01, false);
    setOrg(bAliveRef.current, bAliveMarkRef.current, survOp > 0.01, false);
    setOrg(yAliveRef.current, yAliveMarkRef.current, survOp > 0.01, false);
  });

  return (
    <section className={styles.scenarioSection} ref={ref}>
      <div className={styles.scenarioSticky}>

        {/* Without Shihab */}
        <div className={styles.scenario}>
          <p className={styles.scenarioLabel} ref={labelARef} style={{ opacity: 0 }}>Without Shihab</p>
          <div className={styles.organisms} ref={orgsARef} style={{ opacity: 0 }}>
            <ScenarioOrganism type="bacteria" orgRef={bDeadRef} markRef={bDeadMarkRef} />
            <ScenarioOrganism type="yeast"    orgRef={yDeadRef} markRef={yDeadMarkRef} />
          </div>
          <div className={styles.stressors} ref={stressARef} style={{ opacity: 0 }}>
            {STRESSORS.map((s) => <span key={s} className={styles.stressor}>{s}</span>)}
          </div>
        </div>

        <div className={styles.scenarioDivider} />

        {/* With Shihab */}
        <div className={styles.scenario}>
          <p className={`${styles.scenarioLabel} ${styles.scenarioLabelShihab}`} ref={labelBRef} style={{ opacity: 0 }}>With Shihab</p>
          <div className={styles.organisms} ref={orgsBRef} style={{ opacity: 0 }}>
            <ScenarioOrganism type="bacteria" orgRef={bAliveRef} markRef={bAliveMarkRef} proteins={B_SUBTILIS_PROTEINS} protRef={prot1Ref} />
            <ScenarioOrganism type="yeast"    orgRef={yAliveRef} markRef={yAliveMarkRef} proteins={S_CEREVISIAE_PROTEINS} protRef={prot2Ref} />
          </div>
          <div className={styles.stressors} ref={stressBRef} style={{ opacity: 0 }}>
            {STRESSORS.map((s) => <span key={s} className={styles.stressor}>{s}</span>)}
          </div>
          <p className={styles.survive} ref={surviveRef} style={{ opacity: 0 }}>Medicine produced. ✓</p>
        </div>

      </div>
    </section>
  );
}

// ── Nanobody ──────────────────────────────────────────────────────────────────

function NanobodySection() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const orgsRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  useScene(ref, 1.5, (p) => {
    if (textRef.current) textRef.current.style.opacity = between(p, 0.0, 0.2);
    if (orgsRef.current) orgsRef.current.style.opacity = between(p, 0.2, 0.4);
    const pop = between(p, 0.4, 0.6);
    if (p1Ref.current) p1Ref.current.style.opacity = pop;
    if (p2Ref.current) p2Ref.current.style.opacity = pop;
  });

  return (
    <section className={styles.nanobodySection} ref={ref}>
      <div className={styles.nanobodySticky}>
        <p className={styles.bigLine} ref={textRef} style={{ opacity: 0, maxWidth: 720 }}>
          Our system produces <span className={styles.nanoEmph}>therapeutic nanobodies</span> on demand.
        </p>
        <div className={styles.nanobodyOrganisms} ref={orgsRef} style={{ opacity: 0 }}>
          <div className={styles.nanoWrap}>
            <div className={styles.particles} ref={p1Ref} style={{ opacity: 0 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.particle} style={{ animationDelay: `${i * 0.32}s` }} />
              ))}
            </div>
            <div className={`${styles.organism} ${styles.bacteria} ${styles.supercharged}`} />
            <small className={styles.orgLabel}>B. subtilis</small>
          </div>
          <div className={styles.nanoWrap}>
            <div className={styles.particles} ref={p2Ref} style={{ opacity: 0 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.particle} style={{ animationDelay: `${i * 0.32 + 0.16}s` }} />
              ))}
            </div>
            <div className={`${styles.organism} ${styles.yeast} ${styles.supercharged}`} />
            <small className={styles.orgLabel}>S. cerevisiae</small>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Capabilities ──────────────────────────────────────────────────────────────

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
        <p className={styles.bigLine} ref={textRef} style={{ opacity: 0, maxWidth: 680 }}>
          Shihab is <em>scalable</em>, <em>programmable</em>, and <em>adaptable</em> to mission needs.
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

// ── Explore ───────────────────────────────────────────────────────────────────

const EXPLORE_CARDS = [
  { n: "01", t: "The Project",      d: "How Shihab engineers medical autonomy for deep-space missions — the full scientific rationale.", to: "/project",          feature: true },
  { n: "02", t: "Wet Lab",          d: "Strain engineering, assays, and protein expression.",                                           to: "/wetlab" },
  { n: "03", t: "Dry Lab",          d: "Modelling, bioinformatics, and circuit design.",                                                to: "/drylab" },
  { n: "04", t: "Human Practices",  d: "How real-world voices shaped the work.",                                                        to: "/human-practices" },
  { n: "05", t: "Team",             d: "Meet the people behind the mission.",                                                           to: "/Roster" },
  { n: "06", t: "Safety",           d: "Biosafety and responsible design.",                                                             to: "/safety" },
  { n: "07", t: "Engagement",       d: "Bringing space biology to the public.",                                                         to: "/engagement" },
  { n: "08", t: "Attributions",     d: "Who did what, and our collaborators.",                                                          to: "/Attributions" },
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
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <Starfield />
      <HeroSection />
      <TaglineSection />
      <OrbitSection />
      <PlanetsSection />
      <RevealSection />
      <BriefingSection />
      <ScenarioSection />
      <NanobodySection />
      <CapabilitiesSection />
      <ExploreSection />
      <Footer />
    </PageWrapper>
  );
}
