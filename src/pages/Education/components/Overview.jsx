import { useEffect, useRef, useState } from "react";
import styles from "./Overview.module.scss";

// Animated versions of Education's opening two blocks, the four principles
// card grid and the "Our Programs at a Glance" ladder, attached to their
// sections via Education.jsx's withInteractiveContent(). The wording is the
// same as the markdown blocks they replace; only the presentation is new.

const cx = (...names) => names.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// True while the element is on screen, so the looping illustrations below
// only run (and only start their first pass) when someone can see them.
function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

// Same tile as a markdown `.card-grid` card, with an illustration panel
// between its title and text.
function PrincipleCard({ title, viz, children }) {
  return (
    <div className={styles.card}>
      <h4>{title}</h4>
      <div className={styles.viz} aria-hidden="true">
        {viz}
      </div>
      <p>{children}</p>
    </div>
  );
}

// --- 1. Arabic-first: Arabic phrases typed out, not translated in --------

const ARABIC_WORDS = ["علم الأحياء", "نستنسخ النباتات", "نبني ونجرّب", "تعلّم بلغتك"];

function useTyping(active) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return undefined;
    let w = 0;
    let i = 0;
    let deleting = false;
    let t;
    if (reducedMotion()) {
      setText(ARABIC_WORDS[0]);
      t = setInterval(() => {
        w = (w + 1) % ARABIC_WORDS.length;
        setText(ARABIC_WORDS[w]);
      }, 2500);
      return () => clearInterval(t);
    }
    const tick = () => {
      const word = ARABIC_WORDS[w];
      setText(word.slice(0, i));
      if (!deleting && i === word.length) {
        deleting = true;
        t = setTimeout(tick, 1500);
        return;
      }
      if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % ARABIC_WORDS.length;
      }
      i += deleting ? -1 : 1;
      t = setTimeout(tick, deleting ? 45 : 110);
    };
    tick();
    return () => clearTimeout(t);
  }, [active]);
  return text;
}

function ArabicViz({ active }) {
  const text = useTyping(active);
  return (
    <>
      <div className={styles.arabic} lang="ar" dir="rtl">
        <span>{text}</span>
        <span className={styles.caret} />
      </div>
      <span className={cx(styles.vizChip, styles.vizChipOld)}>translated later</span>
      <span className={cx(styles.vizChip, styles.vizChipNew)}>designed in Arabic</span>
    </>
  );
}

// --- 2. Hands-on: do → build → decide stacks three blocks, then a flag ----

function HandsOnViz({ active }) {
  const [step, setStep] = useState(0); // 0 empty, 1–3 blocks, 4 flag
  useEffect(() => {
    if (!active) return undefined;
    let timers = [];
    const run = () => {
      timers.forEach(clearTimeout);
      setStep(0);
      timers = [
        ...[1, 2, 3].map((k) => setTimeout(() => setStep(k), 500 + (k - 1) * 800)),
        setTimeout(() => setStep(4), 3000),
        setTimeout(run, 6200),
      ];
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <>
      <div className={styles.verbs}>
        {["do", "build", "decide"].map((v, k) => (
          <span key={v} className={cx(step === k + 1 && styles.on, step === 4 && k === 2 && styles.on)}>
            {v}
          </span>
        ))}
      </div>
      <div className={styles.stack}>
        <svg className={cx(styles.flag, step >= 4 && styles.on)} width="14" height="22" viewBox="0 0 14 22">
          <path d="M2 21V2" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 3h10l-3 4 3 4H2z" className={styles.fillAmber} />
        </svg>
        {[1, 2, 3].map((k) => (
          <div key={k} className={cx(styles.block, styles[`b${k}`], step >= k && styles.on)} />
        ))}
      </div>
      <svg className={styles.pointer} viewBox="0 0 24 24">
        <path d="M4 3l7 17 2.5-7L21 10.5z" fill="white" stroke="#0A0A27" strokeWidth="1.2" />
      </svg>
    </>
  );
}

// --- 3. Tailored: cycles through the audiences the programs serve --------

const AUDIENCES = [
  {
    label: "Elementary",
    icon: (
      <>
        <path d="M24 42V22" />
        <path d="M24 28c-8 0-12-5-12-12 8 0 12 5 12 12z" />
        <path d="M24 24c0-6 4-10 11-10 0 7-4 10-11 10z" />
      </>
    ),
  },
  {
    label: "High school",
    icon: (
      <>
        <path d="M19 6h10M21 6v12L10 38a3 3 0 0 0 3 4h22a3 3 0 0 0 3-4L27 18V6" />
        <path d="M15 31h18" />
      </>
    ),
  },
  {
    label: "Mentors",
    icon: (
      <>
        <path d="M14 6c0 12 20 12 20 24s-20 12-20 12" />
        <path d="M34 6c0 12-20 12-20 24" />
        <path d="M17 12h14M17 24h14M17 36h14" />
      </>
    ),
  },
  {
    label: "Policy",
    icon: (
      <>
        <path d="M12 6h18l8 8v28H12z" />
        <path d="M30 6v8h8" />
        <path d="M18 24h14M18 30h14M18 36h8" />
      </>
    ),
  },
];

function TailoredViz({ active }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => setIndex((k) => (k + 1) % AUDIENCES.length), 2000);
    return () => clearInterval(t);
  }, [active]);

  return (
    <>
      <div className={styles.audiences}>
        {AUDIENCES.map((a, j) => (
          <div key={a.label} className={cx(styles.audience, j === index && styles.on)}>
            <svg viewBox="0 0 48 48">{a.icon}</svg>
            <small>{a.label}</small>
          </div>
        ))}
      </div>
      <div className={styles.bar}>
        <i style={{ left: `${index * (100 / AUDIENCES.length)}%` }} />
      </div>
    </>
  );
}

// --- 4. Built to multiply: one node branches into three, then nine ------

const ROOT = { x: 150, y: 22 };
const LVL2 = [50, 150, 250].map((x) => ({ x, y: 72 }));
const LVL3 = LVL2.flatMap((p) => [-26, 0, 26].map((d) => ({ x: p.x + d, y: 128, p })));

function MultiplyViz({ active }) {
  const [growth, setGrowth] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => setGrowth((g) => g + 1), 7000);
    return () => clearInterval(t);
  }, [active]);

  if (!active && growth === 0) return null;
  const delay = (s) => ({ animationDelay: `${s}s` });

  return (
    <svg key={growth} className={styles.tree} viewBox="0 0 300 150">
      {LVL2.map((n, i) => (
        <line key={`l2-${i}`} className={styles.treeLine} x1={ROOT.x} y1={ROOT.y} x2={n.x} y2={n.y} style={delay(0.5 + i * 0.12)} />
      ))}
      {LVL3.map((n, i) => (
        <line key={`l3-${i}`} className={styles.treeLine} x1={n.p.x} y1={n.p.y} x2={n.x} y2={n.y} style={delay(1.4 + i * 0.08)} />
      ))}
      <circle className={cx(styles.pulse, styles.fillPrimary)} cx={ROOT.x} cy={ROOT.y} r="9" />
      <circle className={cx(styles.node, styles.fillPrimary)} cx={ROOT.x} cy={ROOT.y} r="9" />
      {LVL2.map((n, i) => (
        <circle key={`n2-${i}`} className={cx(styles.node, styles.fillBlue)} cx={n.x} cy={n.y} r="7" style={delay(0.8 + i * 0.12)} />
      ))}
      {LVL3.map((n, i) => (
        <circle key={`n3-${i}`} className={cx(styles.node, styles.fillAmber)} cx={n.x} cy={n.y} r="4.5" style={delay(1.7 + i * 0.08)} />
      ))}
    </svg>
  );
}

export function Principles() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className={styles.principles}>
      <PrincipleCard title="Arabic-first" viz={<ArabicViz active={inView} />}>
        We design materials in Arabic from the start, rather than translating them as an afterthought.
      </PrincipleCard>
      <PrincipleCard title="Hands-on" viz={<HandsOnViz active={inView} />}>
        Every program asks learners to do, build or decide something, not just listen.
      </PrincipleCard>
      <PrincipleCard title="Tailored to the audience" viz={<TailoredViz active={inView} />}>
        From elementary students cloning plants to undergraduates writing policy, each program meets learners
        where they are.
      </PrincipleCard>
      <PrincipleCard title="Built to multiply" viz={<MultiplyViz active={inView} />}>
        We train mentors and volunteers who carry the material further than our own team could reach.
      </PrincipleCard>
    </div>
  );
}

// --- Programs at a glance ------------------------------------------------

const s = styles;

const PROGRAMS = [
  {
    id: "copy-paste-plants",
    title: "Copy Paste Plants",
    audience: "Elementary students and families",
    icon: (
      <>
        <g className={s.sway}>
          <path className={cx(s.s, s.blue)} d="M34 88V48" />
          <path className={cx(s.s, s.blue)} d="M34 62c-14 0-20-9-20-20 14 0 20 9 20 20z" />
          <path className={cx(s.s, s.blue)} d="M34 52c0-12 8-18 20-18 0 12-8 18-20 18z" />
        </g>
        <g className={s.paste}>
          <path className={cx(s.s, s.blue, s.dash)} d="M86 88V48" />
          <path className={cx(s.s, s.blue, s.dash)} d="M86 62c-14 0-20-9-20-20 14 0 20 9 20 20z" />
          <path className={cx(s.s, s.blue, s.dash)} d="M86 52c0-12 8-18 20-18 0 12-8 18-20 18z" />
        </g>
        <path className={s.s} d="M52 94h16" opacity=".5" />
      </>
    ),
  },
  {
    id: "school-outreach",
    title: "School Outreach",
    audience: "Secondary school students",
    icon: (
      <>
        {[0, 1, 2].map((k) => (
          <circle key={k} className={cx(s.s, s.ripple)} cx="60" cy="60" r="18" style={{ animationDelay: `${k}s` }} />
        ))}
        <path className={s.s} d="M36 90V56l24-16 24 16v34z" />
        <path className={s.s} d="M52 90V72h16v18" />
        <path className={cx(s.s, s.amber)} d="M60 40V16" />
        <path className={cx(s.fillAmber, s.wave)} d="M60 17h16l-5 6 5 6H60z" />
      </>
    ),
  },
  {
    id: "summer-mentorship-program",
    title: "Summer Mentorship",
    audience: "High school and undergraduates",
    icon: (
      <>
        <g className={s.rays}>
          <path className={cx(s.s, s.amber)} d="M60 8v10M60 82v10M10 50h10M100 50h10M24 14l7 7M89 79l7 7M96 14l-7 7M31 79l-7 7" />
        </g>
        <circle className={s.fillAmber} cx="60" cy="50" r="17" />
        <g className={s.grow}>
          <path className={cx(s.s, s.blue)} d="M60 94V74" />
          <path className={cx(s.s, s.blue)} d="M60 80c-9 0-13-5-13-12 9 0 13 5 13 12z" />
          <path className={cx(s.s, s.blue)} d="M60 76c0-8 5-12 13-12 0 8-5 12-13 12z" />
        </g>
      </>
    ),
  },
  {
    id: "tawasol-hackathon",
    title: "Tawasol Hackathon",
    audience: "Grades 10–12 and undergraduates",
    icon: (
      <>
        <path className={s.s} d="M24 70L60 24l38 46M24 70h74" opacity=".55" />
        <circle className={cx(s.fillPrimary, s.beat)} cx="60" cy="24" r="9" />
        <circle className={cx(s.fillBlue, s.beat)} cx="24" cy="70" r="9" style={{ animationDelay: ".5s" }} />
        <circle className={cx(s.fillAmber, s.beat)} cx="98" cy="70" r="9" style={{ animationDelay: "1s" }} />
        <circle className={s.fillBlue} r="3.5">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M24 70L60 24" />
        </circle>
        <circle className={s.fillAmber} r="3.5">
          <animateMotion dur="2.4s" begin=".8s" repeatCount="indefinite" path="M60 24L98 70" />
        </circle>
        <circle className={s.fillPrimary} r="3.5">
          <animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite" path="M98 70H24" />
        </circle>
      </>
    ),
  },
  {
    id: "kallpa-multiplier-mentorship-peru",
    title: "Kallpa Mentorship",
    audience: "Youth volunteers who teach rural farmers",
    icon: (
      <>
        {[0, 1.6].map((d) => (
          <circle key={d} className={cx(s.s, s.blue, s.spread)} cx="60" cy="52" r="16" style={{ animationDelay: `${d}s` }} />
        ))}
        <circle className={s.fillPrimary} cx="60" cy="52" r="14" />
        <circle className={cx(s.fillBlue, s.appear)} cx="16" cy="22" r="7" />
        <circle className={cx(s.fillAmber, s.appear)} cx="104" cy="22" r="7" />
        <circle className={cx(s.fillAmber, s.appear)} cx="14" cy="84" r="7" style={{ animationDelay: ".2s" }} />
        <circle className={cx(s.fillBlue, s.appear)} cx="106" cy="84" r="7" style={{ animationDelay: ".2s" }} />
        <path className={cx(s.s, s.dash)} d="M47 44L22 26M73 44L98 26M47 60L20 80M73 60L100 80" opacity=".6" />
      </>
    ),
  },
];

// Same jump as the old markdown `.ladder` links, but scrolled explicitly —
// see Article.jsx's .cite handler for why the native #fragment jump isn't
// relied on inside an already-mounted article.
function jumpTo(e, id) {
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  history.pushState(null, "", `#${id}`);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

// The markdown `.ladder` (rising cards, each a jump link to its section),
// plus an icon per program and a slider along the axis that steps through
// the programs in order — pausing on whichever card the reader hovers.
export function ProgramsGlance() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!inView || hovering) return undefined;
    const t = setInterval(() => setActive((k) => (k + 1) % PROGRAMS.length), 2600);
    return () => clearInterval(t);
  }, [inView, hovering]);

  return (
    <div ref={ref}>
      <div className={styles.stairs}>
        {PROGRAMS.map((p, j) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className={cx(styles.program, j === active && styles.active)}
            style={{ "--h": `${230 + j * 34}px` }}
            onClick={(e) => jumpTo(e, p.id)}
            onPointerEnter={() => {
              setHovering(true);
              setActive(j);
            }}
            onPointerLeave={() => setHovering(false)}
            onFocus={() => setActive(j)}
          >
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 120 100">{p.icon}</svg>
            </span>
            <b>{p.title}</b>
            <span className={styles.audienceLabel}>{p.audience}</span>
          </a>
        ))}
      </div>
      <div className={styles.journey}>
        <div className={styles.track} style={{ "--k": active }} aria-hidden="true">
          <b />
          <i />
        </div>
        <span>First encounter</span>
        <span>Teaching others</span>
      </div>
    </div>
  );
}
