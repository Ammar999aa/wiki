import { useEffect, useRef, useState } from "react";
import styles from "./ThuwalOutreach.module.scss";
import SharedPhotoDeck from "../../../components/PhotoDeck/PhotoDeck";

// The interactive pieces of Genesis's School Outreach mockup ("summer
// outreach.html"), ported to React. Each is placed at a
// `<!-- school:<name> -->` marker in education.md by Education.jsx; the
// prose around them stays in the markdown. Wording inside the widgets is
// hers, verbatim, unless a comment says otherwise.

const IMG = "https://static.igem.wiki/teams/6341/wiki/content/public-engagement/";

const cx = (...names) => names.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// True once the element has scrolled into view (never resets), for the
// one-shot entrance animations.
function useSeen(ref, threshold = 0.2) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
}

// A palm silhouette (120×170 viewBox), stroked in currentColor.
function PalmShape({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 170" aria-hidden="true">
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

// Pill toggle group shared by the name tag, the survey dots and the
// mission tabs.
function Segmented({ options, value, onChange, label }) {
  return (
    <div className={styles.seg} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          className={cx(value === o.value && styles.segOn)}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// --- Making it happen: four days as Najdi windows --------------------

const DAYS = [
  ["Monday", "October 12"],
  ["Monday", "October 19"],
  ["Wednesday", "October 21"],
  ["Monday", "October 26"],
];

const STEPS = [
  ["Lecture", "An introduction to KAUST, our iGEM team and synthetic biology, with a before-and-after knowledge check."],
  ["Workshop", "Design your own microbe to help astronauts on a space mission."],
  ["Lab tours", "Two groups tour the Nanofabrication Core Lab and the Robotics Lab."],
  ["Lunch", "Lunch at the Campus Diner with our team and volunteers."],
];

// A Najdi mud-brick house (80×124 viewBox): a saw-tooth parapet along the
// roof, trim bands, and the region's triangular windows, which light up.
const WINDOWS = ["M14 38H34L24 64Z", "M46 38H66L56 64Z", "M26 74H54L40 100Z"];

export function FourDays() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const [lit, setLit] = useState(0);
  const [day, setDay] = useState(null);
  const [step, setStep] = useState(0);
  const playToken = useRef(0);

  const playDay = async (n) => {
    const t = ++playToken.current;
    setDay(n);
    for (let i = 0; i < STEPS.length; i++) {
      if (t !== playToken.current) return;
      setStep(i);
      await new Promise((r) => setTimeout(r, reducedMotion() ? 0 : 900));
    }
  };

  // Light the windows one by one, then open day 1.
  useEffect(() => {
    if (!seen) return undefined;
    const still = reducedMotion();
    const timers = DAYS.map((_, i) => setTimeout(() => setLit(i + 1), still ? 0 : 500 + i * 450));
    timers.push(setTimeout(() => playDay(0), still ? 0 : 500 + DAYS.length * 450));
    return () => timers.forEach(clearTimeout);
  }, [seen]);

  useEffect(() => () => playToken.current++, []);

  return (
    <div ref={ref} className={styles.fourDays}>
      <div className={styles.days}>
        {DAYS.map(([weekday, date], n) => (
          <button
            key={date}
            type="button"
            className={cx(styles.day, n < lit && styles.dayLit, day === n && styles.dayOpen)}
            aria-label={`Day ${n + 1}, ${weekday} ${date}`}
            aria-pressed={day === n}
            onClick={() => playDay(n)}
          >
            <svg viewBox="0 0 80 124" aria-hidden="true">
              <path d="M0 14L8 6L16 14L24 6L32 14L40 6L48 14L56 6L64 14L72 6L80 14V124H0Z" fill="#6a4c33" />
              <path d="M0 28H80M0 108H80" stroke="#f1e6cc" strokeOpacity=".35" />
              {WINDOWS.map((d) => (
                <path key={d} d={d} className={styles.pane} />
              ))}
            </svg>
            <b>Day {n + 1}</b>
            <small>{date}</small>
          </button>
        ))}
      </div>

      {day !== null && (
        <div className={styles.dayPanel}>
          <div className={styles.dayNum}>
            <span className={styles.mono}>Day</span>
            <b>{day + 1}</b>
            <small>of 4</small>
            <div className={styles.chips}>
              <span className={styles.chipY}>
                {DAYS[day][0]} · {DAYS[day][1]}
              </span>
              <span className={styles.chip}>{day === 3 ? "Scheduled" : "Four-hour program"}</span>
            </div>
          </div>
          <div>
            <div className={styles.stepper} style={{ "--q": step }}>
              <i className={styles.stepProgress} />
              {STEPS.map(([name], i) => (
                <button
                  key={name}
                  type="button"
                  className={cx(styles.stepNode, i < step && styles.stepDone, i === step && styles.stepOn)}
                  onClick={() => {
                    playToken.current++;
                    setStep(i);
                  }}
                >
                  <b aria-hidden="true">{i + 1}</b>
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <p className={styles.stepDesc} aria-live="polite">
              {STEPS[step][1]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- What we did: the Mars / Earth name tag --------------------------

const PLANETS = {
  Earth: ["#1d4f9a", "radial-gradient(circle at 30% 30%, #7cc7ff, #14407a 60%, #1d7a45)"],
  Mars: ["#8a2f16", "radial-gradient(circle at 30% 30%, #f08a5d, #7a2b14)"],
};

export function NameTag() {
  return (
    <div className={styles.tags}>
      {Object.entries(PLANETS).map(([planet, [bd, pl]], i) => (
        <div key={planet} className={styles.tagWrap}>
          <div className={styles.lanyard} aria-hidden="true" />
          <div className={styles.badge} style={{ "--bd": bd, "--pl": pl, "--i": i }}>
            <i aria-hidden="true" />
            <b>{planet}</b>
            <small>name tag</small>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Divider: the astrolabe ------------------------------------------

const STARS = [
  ["Altair", "النسر الطائر", "the flying eagle"],
  ["Vega", "النسر الواقع", "the falling eagle"],
  ["Aldebaran", "الدبران", "the follower"],
];
const STAR_PATHS = [
  "M236 90l3 7 8 3-8 3-3 7-3-7-8-3 8-3z",
  "M92 70l3 7 8 3-8 3-3 7-3-7-8-3 8-3z",
  "M104 214l3 7 8 3-8 3-3 7-3-7-8-3 8-3z",
];

export function Astrolabe() {
  const [star, setStar] = useState(null);
  return (
    <div className={styles.divider}>
      <svg className={styles.astro} viewBox="0 0 300 300" role="img" aria-label="An astrolabe">
        <circle cx="150" cy="150" r="142" fill="none" stroke="#FFD84D" strokeWidth="2" />
        <circle cx="150" cy="150" r="118" fill="rgba(167,139,250,.06)" stroke="#a78bfa" />
        <g stroke="#FFD84D" strokeWidth="1.2">
          {Array.from({ length: 72 }, (_, i) => (
            <line
              key={i}
              x1="150"
              y1={i % 6 ? 12 : 6}
              x2="150"
              y2={i % 6 ? 18 : 22}
              transform={`rotate(${i * 5} 150 150)`}
            />
          ))}
        </g>
        <circle cx="150" cy="150" r="70" fill="none" stroke="#a78bfa" strokeDasharray="3 5" />
        <circle cx="168" cy="132" r="64" fill="none" stroke="#FFD84D" opacity=".6" />
        <path d="M150 8V292M8 150H292" stroke="#a78bfa" opacity=".4" />
        <path d="M150 150L240 92" stroke="#FFD84D" strokeWidth="2" />
        {STAR_PATHS.map((d, k) => (
          <path key={d} d={d} className={cx(styles.star, star === k && styles.starOn)} />
        ))}
        <circle cx="150" cy="150" r="6" fill="#FFD84D" />
      </svg>
      <div className={styles.starButtons}>
        {STARS.map(([name], i) => (
          <button
            key={name}
            type="button"
            aria-pressed={star === i}
            className={cx(star === i && styles.segOn)}
            onClick={() => setStar(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className={styles.starCap} aria-live="polite">
        {star === null ? (
          "Stars carry Arabic names. Tap one."
        ) : (
          <>
            {STARS[star][0]} comes from{" "}
            <b lang="ar" dir="rtl">
              {STARS[star][1]}
            </b>{" "}
            “{STARS[star][2]}”
          </>
        )}
      </p>
    </div>
  );
}

// --- Jeddah: the route down the Red Sea coast ------------------------

const ROUTE = "M266 86C292 130 300 170 286 220S240 296 250 342";
const ROUTE_INFO = {
  t: (
    <>
      <b>Thuwal</b>, home of KAUST and the Thuwal community, where the program began.
    </>
  ),
  j: (
    <>
      <b>Jeddah</b>, about 80 km south: 58 middle school students at Zahrat Al Sahra International School.
    </>
  ),
};

function RouteMarker({ k, x, y, label, delay, onPick }) {
  return (
    <g
      className={styles.marker}
      tabIndex={0}
      role="button"
      aria-label={label}
      onClick={() => onPick(k)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(k);
        }
      }}
    >
      <circle className={styles.ping} cx={x} cy={y} r="12" style={{ animationDelay: delay }} />
      <circle cx={x} cy={y} r="7" fill="#FFD84D" />
      <text x={x - 22} y={y + 7} textAnchor="end" fill="#ece8fa" fontSize="20" fontWeight="700">
        {label}
      </text>
      <circle className={styles.markerHit} cx={x} cy={y} r="18" fill="transparent" />
    </g>
  );
}

export function JeddahRoute() {
  const [info, setInfo] = useState(null);
  return (
    <div className={styles.routeWrap}>
      <svg
        className={styles.route}
        viewBox="0 0 440 400"
        role="img"
        aria-label="A bus driving from Thuwal to Jeddah along the Red Sea coast"
      >
        <path className={styles.wave} d="M10 90q13-9 26 0t26 0t26 0t26 0" />
        <path className={cx(styles.wave, styles.waveB)} d="M30 190q13-9 26 0t26 0t26 0t26 0" />
        <path className={styles.wave} d="M10 290q13-9 26 0t26 0t26 0t26 0" />
        <path className={cx(styles.wave, styles.waveB)} d="M50 360q13-9 26 0t26 0t26 0" />
        <path d="M250 0C220 90 290 150 240 230S210 330 250 400H440V0Z" fill="#1c1240" />
        <path d="M250 0C220 90 290 150 240 230S210 330 250 400" fill="none" stroke="#a78bfa" opacity=".5" />
        <svg x="372" y="8" width="42" height="60" viewBox="0 0 120 170" style={{ color: "#3d2a82" }}>
          <PalmShape />
        </svg>
        <svg x="384" y="270" width="40" height="57" viewBox="0 0 120 170" style={{ color: "#3d2a82" }}>
          <PalmShape />
        </svg>
        <svg x="342" y="296" width="30" height="42" viewBox="0 0 120 170" style={{ color: "#3d2a82" }}>
          <PalmShape />
        </svg>
        <path d={ROUTE} fill="none" stroke="#2a1d52" strokeWidth="16" strokeLinecap="round" />
        <path d={ROUTE} fill="none" stroke="#3c2d73" strokeWidth="12" strokeLinecap="round" />
        <path id="thuwal-route" className={styles.routeDash} d={ROUTE} />
        <RouteMarker k="t" x={266} y={86} label="Thuwal" delay="0s" onPick={setInfo} />
        {/* The KAUST Beacon with its turning light */}
        <path d="M300 30l-9 36h18z" fill="rgba(40,26,80,.8)" stroke="#ead7b2" strokeWidth="1.2" />
        <path d="M294 52h12M296 42h8" stroke="#ead7b2" strokeWidth="1" />
        <g className={styles.beaconBeam}>
          <path d="M300 30L372 6V54Z" fill="rgba(255,226,140,.32)" />
        </g>
        <circle cx="300" cy="30" r="3.5" fill="#fff6c8" />
        <RouteMarker k="j" x={250} y={342} label="Jeddah" delay="1.3s" onPick={setInfo} />
        {/* The school */}
        <g transform="translate(286 346)">
          <rect x="0" y="0" width="30" height="36" fill="#6a4c33" />
          <path d="M0 0l5-5l5 5l5-5l5 5l5-5l5 5" fill="#6a4c33" />
          <rect x="4" y="6" width="9" height="12" fill="#ffd978" />
          <rect x="17" y="6" width="9" height="12" fill="#ffd978" />
          <path d="M4 12h9M17 12h9M8.5 6v12M21.5 6v12" stroke="#3a2414" strokeWidth="1" />
          <rect x="11" y="24" width="8" height="12" fill="#3a2414" />
        </g>
        {/* The bus */}
        <g>
          <g className={styles.bus}>
            <rect x="-8" y="-10.5" width="5" height="3" rx="1" fill="#1a1230" />
            <rect x="6" y="-10.5" width="5" height="3" rx="1" fill="#1a1230" />
            <rect x="-8" y="7.5" width="5" height="3" rx="1" fill="#1a1230" />
            <rect x="6" y="7.5" width="5" height="3" rx="1" fill="#1a1230" />
            <rect x="-18" y="-8" width="36" height="16" rx="4" fill="#FFD84D" stroke="#fff6c8" strokeWidth=".8" />
            <rect x="-13" y="-6" width="5" height="12" rx="1" fill="#2a1d52" />
            <rect x="-6" y="-6" width="5" height="12" rx="1" fill="#2a1d52" />
            <rect x="1" y="-6" width="5" height="12" rx="1" fill="#2a1d52" />
            <rect x="11" y="-6.2" width="5" height="12.4" rx="1.8" fill="#7cc7ff" opacity=".9" />
            <circle cx="18" cy="-5" r="1.5" fill="#fff6c8" />
            <circle cx="18" cy="5" r="1.5" fill="#fff6c8" />
          </g>
          {!reducedMotion() && (
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#thuwal-route" />
            </animateMotion>
          )}
        </g>
      </svg>
      <p className={styles.routeInfo} aria-live="polite">
        {info ? ROUTE_INFO[info] : "Tap Thuwal or Jeddah."}
      </p>
    </div>
  );
}

// --- Jeddah: the Space bioengineers mission console ------------------

const AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
const SHORT = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", "*": "Stop", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly" };
const FULL = { F: "phenylalanine", L: "leucine", S: "serine", Y: "tyrosine", "*": "a stop signal", C: "cysteine", W: "tryptophan", P: "proline", H: "histidine", Q: "glutamine", R: "arginine", I: "isoleucine", M: "methionine", T: "threonine", N: "asparagine", K: "lysine", V: "valine", A: "alanine", D: "aspartate", E: "glutamate", G: "glycine" };
const BASE_INDEX = { T: 0, C: 1, A: 2, G: 3 };
const BASES = "TCAG";
const translate = (c) => AA[16 * BASE_INDEX[c[0]] + 4 * BASE_INDEX[c[1]] + BASE_INDEX[c[2]]];

const LEAD = "GTCC";
const TRAIL = "CGGA";
const ORIGINAL = ["ATG", "TTT", "AAA", "TGA"];

const MISSION_TEXT = {
  learn: "How DNA carries the instructions for every living organism.",
  crack: "Read the microbe’s DNA and find the hidden gene.",
  edit: "Rewrite the DNA so the microbe produces a protein that saves the mission.",
};

// Horizontal double helix: rungs run top to bottom and the two strands
// cross over each other along the x axis.
function Helix() {
  return (
    <svg className={styles.helix} viewBox="0 0 240 200" role="img" aria-label="A turning DNA double helix">
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} style={{ "--i": i }}>
          <rect className={styles.helixRung} x={i * 20 + 14} y="56" width="2.4" height="88" rx="1.2" fill="rgba(236,232,250,.4)" />
          <circle className={styles.helixA} cx={i * 20 + 15} cy="100" r="6" fill="#a78bfa" />
          <circle className={styles.helixB} cx={i * 20 + 15} cy="100" r="6" fill="#FFD84D" />
        </g>
      ))}
    </svg>
  );
}

function GeneReader({ mode }) {
  const [codons, setCodons] = useState(ORIGINAL);
  const [chain, setChain] = useState([]);
  const [active, setActive] = useState(null); // chip index under the ribosome
  const [flash, setFlash] = useState(null);
  const [shakeIdx, setShakeIdx] = useState(null);
  const [message, setMessage] = useState("");
  const runToken = useRef(0);
  const running = useRef(false);
  const chipRefs = useRef([]);
  const rowRef = useRef(null);
  const [ribo, setRibo] = useState(null); // {left, top}

  const idleMessage =
    mode === "edit"
      ? "Click a codon to rewrite its last letter, then watch the protein change."
      : "Press “Read the gene”, or click any codon to see what it codes for.";

  const reset = () => {
    runToken.current++;
    running.current = false;
    setCodons(ORIGINAL);
    setChain([]);
    setActive(null);
    setRibo(null);
    setMessage(idleMessage);
  };

  // Switching tabs starts the console over, as in the mockup.
  useEffect(() => {
    reset();
    const token = runToken; // a counter, not a DOM node
    return () => {
      token.current++;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const pointAt = (k) => {
    const el = chipRefs.current[k];
    if (!el) return;
    setRibo({ left: el.offsetLeft + el.offsetWidth / 2 - 45, top: el.offsetTop - 26 });
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms));

  const readGene = async (seq, fast) => {
    if (running.current && !fast) return;
    const t = ++runToken.current;
    running.current = true;
    // Resolves true only if this read ran to the end (not cancelled by a
    // reset, a tab switch or a newer read).
    setChain([]);
    const pace = fast ? 280 : 750;
    const all = seq.join("") + TRAIL;
    const n = Math.floor(all.length / 3);
    let stopped = false;
    let noStart = false;
    setMessage("The ribosome is reading…");
    pointAt(0);
    await sleep(pace * 0.6);
    if (t !== runToken.current) return false;
    for (let k = 0; k < n && !stopped; k++) {
      if (t !== runToken.current) return false;
      const codon = all.slice(k * 3, k * 3 + 3);
      const chip = Math.min(k + 1, 5);
      setActive(chip);
      pointAt(chip);
      await sleep(pace);
      if (t !== runToken.current) return false;
      const a = translate(codon);
      if (k === 0 && codon !== "ATG") {
        setMessage("No ATG yet, so the ribosome never starts.");
        noStart = true;
        break;
      }
      if (a === "*") {
        setChain((c) => [...c, { stop: true, k }]);
        stopped = true;
        setMessage("STOP: the protein is finished, ready to work on the mission.");
      } else {
        setChain((c) => [...c, { name: SHORT[a], k }]);
      }
    }
    if (t !== runToken.current) return false;
    if (!stopped && !noStart) {
      setMessage("No stop signal! The ribosome runs off the end of the gene and the protein never finishes.");
    }
    setActive(null);
    setRibo(null);
    running.current = false;
    return true;
  };

  const clickCodon = (i) => {
    if (running.current && mode !== "edit") return;
    if (mode === "edit") {
      if (running.current) return;
      if (i === 0) {
        setShakeIdx(i);
        setTimeout(() => setShakeIdx(null), 400);
        setMessage("ATG is the START signal, so it stays. Try another codon.");
        return;
      }
      const old = codons[i];
      const next = old.slice(0, 2) + BASES[(BASES.indexOf(old[2]) + 1) % 4];
      const seq = codons.map((c, k) => (k === i ? next : c));
      setCodons(seq);
      const a = translate(old);
      const z = translate(next);
      // The mockup showed this line and then immediately overwrote it with
      // the read-out; here it's shown once the re-read finishes instead.
      readGene(seq, true).then((done) => {
        if (done) {
          setMessage(
            `${old} → ${next}: ${a === z ? `same amino acid (${SHORT[z]}), a silent change.` : `now ${FULL[z]} instead of ${FULL[a]}.`}`,
          );
        }
      });
      return;
    }
    const a = translate(codons[i]);
    setMessage(
      i === 0
        ? "ATG tells the cell where to start reading, and it codes for methionine."
        : `${codons[i]} codes for ${FULL[a]}${a === "*" ? ": the ribosome stops here." : "."}`,
    );
    setFlash(i);
    setTimeout(() => setFlash(null), 900);
  };

  const chips = [{ text: LEAD, dim: true }, ...codons.map((c, i) => ({ text: c, i })), { text: TRAIL, dim: true }];

  return (
    <div>
      <div ref={rowRef} className={styles.seqRow}>
        <div
          className={cx(styles.ribo, ribo && styles.riboOn)}
          style={ribo ? { left: ribo.left, top: ribo.top } : undefined}
          aria-hidden="true"
        >
          ribosome ▾
        </div>
        {chips.map((c, k) => {
          const a = c.dim ? null : translate(c.text);
          const label = c.dim ? "" : c.i === 0 ? "start" : a === "*" ? "stop" : SHORT[a];
          return (
            <button
              key={k}
              ref={(el) => (chipRefs.current[k] = el)}
              type="button"
              disabled={c.dim}
              className={cx(
                styles.codon,
                c.dim && styles.codonDim,
                !c.dim && c.i === 0 && styles.codonStart,
                !c.dim && c.i > 0 && a === "*" && styles.codonStop,
                mode === "edit" && !c.dim && styles.codonEdit,
                (active === k || flash === c.i) && !c.dim && styles.codonOn,
                active === k && c.dim && styles.codonOn,
                shakeIdx === c.i && !c.dim && styles.codonNo,
              )}
              onClick={() => !c.dim && clickCodon(c.i)}
            >
              {c.text}
              <small>{label}</small>
            </button>
          );
        })}
      </div>
      <div className={styles.chain} aria-live="polite">
        {chain.length === 0 && <span className={styles.chainEmpty}>your protein will appear here, one amino acid at a time</span>}
        {chain.map((b, idx) =>
          b.stop ? (
            <div key={idx} className={cx(styles.bead, styles.beadStop)}>
              <svg viewBox="0 0 20 40" aria-hidden="true">
                <path d="M10 0V8" stroke="#FFD84D" strokeWidth="2" />
                <circle cx="10" cy="10" r="4" fill="#FFD84D" />
                <path d="M5 14h10l-1 22h-8z" fill="#a78bfa" />
                <path d="M7 36v4M10 36v4M13 36v4" stroke="#FFD84D" strokeWidth="1.5" />
              </svg>
              <b>STOP</b>
            </div>
          ) : (
            <div key={idx} className={styles.bead}>
              <i className={styles.aminoAcid} style={{ "--k": b.k % 2 }} aria-hidden="true" />
              <b>{b.name}</b>
            </div>
          ),
        )}
      </div>
      <p className={styles.geneMsg}>{message}</p>
      <div className={styles.geneBar}>
        <button type="button" className={styles.btn} onClick={() => readGene(codons, false)}>
          ▶ Read the gene
        </button>
        <button type="button" className={cx(styles.btn, styles.btnGhost)} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export function MicrobeMission() {
  const [mode, setMode] = useState("learn");
  return (
    <div className={styles.mission}>
      <Segmented
        label="Mission step"
        value={mode}
        onChange={setMode}
        options={[
          { value: "learn", label: "Learn" },
          { value: "crack", label: "Crack the Code" },
          { value: "edit", label: "Genetic Modification" },
        ]}
      />
      <div className={styles.console}>
        <p className={styles.missionText}>{MISSION_TEXT[mode]}</p>
        {mode === "learn" ? (
          <>
            <Helix />
            <div className={styles.bases}>
              <span>
                <b style={{ color: "#a78bfa" }}>A</b>adenine
              </span>
              <span>
                <b style={{ color: "#FFD84D" }}>T</b>thymine
              </span>
              <span>
                <b style={{ color: "#a78bfa" }}>C</b>cytosine
              </span>
              <span>
                <b style={{ color: "#FFD84D" }}>G</b>guanine
              </span>
            </div>
          </>
        ) : (
          <GeneReader mode={mode} />
        )}
      </div>
    </div>
  );
}

// --- Jeddah: a deck of session photos --------------------------------

const DECK = [
  ["jeddah-biomission-in-space.avif", "Biomission in Space", "The mission begins"],
  ["jeddah-decode-a-gene.avif", "Let’s decode a gene together", "Reading DNA, one triplet at a time"],
  ["jeddah-space-bioengineers.avif", "Space bioengineers", "Learn · Crack the code · Genetic modification"],
  ["jeddah-classroom.avif", "Our sponsors", "Thank you for making it possible"],
];

export function PhotoDeck() {
  return (
    <SharedPhotoDeck
      className={styles.deckWrap}
      photos={DECK.map(([file, title, sub]) => ({ src: IMG + file, title, sub }))}
    />
  );
}
