import { useEffect, useRef, useState } from "react";
import LiquidGlass from "../../../components/LiquidGlass/LiquidGlass";
import styles from "../Hardware.module.scss";

const igemLogo =
  "https://static.igem.wiki/teams/6341/wiki/content/hardware/igem-logo.avif";

// Interactive simulation of the bioreactor's touchscreen dashboard, ported
// from the team's page export (vanilla JS there, React state here). The LCD
// itself keeps the real screen's look (Figure 10); the controls around it use
// the site's own glass/violet/amber language instead of the export's beige
// mounting plate. Its "Try me" hint and caption live in hardware.md.
const RPM_MAX = 2000;
const RPM_STEP = 5;
const SWEEP = 150; // the knob turns -150deg..+150deg

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rpmToDeg = (v) => -SWEEP + (v / RPM_MAX) * SWEEP * 2;
const degToRpm = (d) =>
  clamp(
    Math.round((((d + SWEEP) / (SWEEP * 2)) * RPM_MAX) / RPM_STEP) * RPM_STEP,
    0,
    RPM_MAX,
  );
const pt = (r, d) => {
  const a = ((d - 90) * Math.PI) / 180;
  return [60 + r * Math.cos(a), 60 + r * Math.sin(a)];
};

// Setpoints are kept in tenths (of a degree / a pH unit) so +/- steps stay exact.
const LIMITS = {
  temp: { min: 180, max: 700, step: 5 },
  ph: { min: 0, max: 140, step: 2 },
};
const fmt1 = (t) => (t / 10).toFixed(1);

const TICKS = [];
for (let v = 0; v <= RPM_MAX; v += 100) {
  const major = v % 500 === 0;
  const d = rpmToDeg(v);
  TICKS.push({ v, major, a: pt(major ? 44 : 46, d), b: pt(52, d) });
}
const LBL0 = pt(58, rpmToDeg(0));
const LBL_MAX = pt(58, rpmToDeg(RPM_MAX));

function Dial({ rpm, deg, setDeg }) {
  const ref = useRef(null);
  const drag = useRef(null); // { last } while dragging
  const [dragging, setDragging] = useState(false);

  const angleOf = (e) => {
    const r = ref.current.getBoundingClientRect();
    return (
      (Math.atan2(
        e.clientY - (r.top + r.height / 2),
        e.clientX - (r.left + r.width / 2),
      ) *
        180) /
      Math.PI
    );
  };

  const onPointerDown = (e) => {
    drag.current = { last: angleOf(e) };
    setDragging(true);
    try {
      ref.current.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture is a nicety, not required
    }
    ref.current.focus({ preventScroll: true });
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    const a = angleOf(e);
    let d = a - drag.current.last;
    if (d > 180) d -= 360;
    else if (d < -180) d += 360;
    drag.current.last = a;
    setDeg((prev) => clamp(prev + d, -SWEEP, SWEEP));
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    setDeg((prev) => rpmToDeg(degToRpm(prev))); // snap the knob to the reported RPM
  };

  const setRpm = (v) => setDeg(rpmToDeg(clamp(v, 0, RPM_MAX)));
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 100 : RPM_STEP;
    const keys = {
      ArrowRight: rpm + step,
      ArrowUp: rpm + step,
      ArrowLeft: rpm - step,
      ArrowDown: rpm - step,
      PageUp: rpm + 100,
      PageDown: rpm - 100,
      Home: 0,
      End: RPM_MAX,
    };
    if (e.key in keys) {
      setRpm(keys[e.key]);
      e.preventDefault();
    }
  };

  let arc = "";
  if (deg > -SWEEP + 0.5) {
    const s0 = pt(40.5, -SWEEP);
    const e0 = pt(40.5, deg);
    arc = `M${s0[0].toFixed(2)} ${s0[1].toFixed(2)} A40.5 40.5 0 ${deg + SWEEP > 180 ? 1 : 0} 1 ${e0[0].toFixed(2)} ${e0[1].toFixed(2)}`;
  }

  return (
    <div
      ref={ref}
      className={`${styles.dial} ${dragging ? styles.dragging : ""}`}
      role="slider"
      tabIndex={0}
      aria-label="Motor speed in RPM"
      aria-valuemin={0}
      aria-valuemax={RPM_MAX}
      aria-valuenow={rpm}
      aria-valuetext={`${rpm} RPM`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <radialGradient id="dashKnobFace" cx="38%" cy="30%" r="80%">
            <stop offset="0" stopColor="#5a5e67" />
            <stop offset="0.6" stopColor="#25282e" />
            <stop offset="1" stopColor="#0d0e11" />
          </radialGradient>
        </defs>
        <g className={styles.dialTicks}>
          {TICKS.map(({ v, major, a, b }) => (
            <line
              key={v}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
            />
          ))}
          <text
            x={LBL0[0] + 2}
            y={LBL0[1] + 10}
            fontSize="8"
            textAnchor="middle"
          >
            0
          </text>
          <text
            x={LBL_MAX[0] - 2}
            y={LBL_MAX[1] + 10}
            fontSize="8"
            textAnchor="middle"
          >
            2000
          </text>
        </g>
        <path className={styles.dialArc} d={arc} />
        <g transform={`rotate(${deg.toFixed(2)} 60 60)`}>
          <circle
            cx="60"
            cy="60"
            r="35"
            fill="url(#dashKnobFace)"
            stroke="#000"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <circle
            cx="60"
            cy="60"
            r="29"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <line
            className={styles.dialPointer}
            x1="60"
            y1="35"
            x2="60"
            y2="47"
          />
        </g>
      </svg>
    </div>
  );
}

function Stepper({ name, label, value, onBump }) {
  const timers = useRef({});
  const stop = () => {
    clearTimeout(timers.current.hold);
    clearInterval(timers.current.repeat);
    timers.current = {};
  };
  useEffect(() => stop, []);

  const { min, max } = LIMITS[name];
  const button = (dir, symbol, ariaLabel) => (
    <button
      type="button"
      className={styles.stepBtn}
      aria-label={ariaLabel}
      disabled={dir > 0 ? value >= max : value <= min}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        onBump(name, dir);
        // hold to repeat
        timers.current.hold = setTimeout(() => {
          timers.current.repeat = setInterval(() => onBump(name, dir), 70);
        }, 380);
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onClick={(e) => {
        if (e.detail === 0) onBump(name, dir); // keyboard activation only
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {symbol}
    </button>
  );

  return (
    <div className={styles.stepper}>
      <span className={styles.ctlLabel}>{label}</span>
      <div className={styles.stepRow}>
        {button(-1, "−", `Decrease ${name === "temp" ? "temperature" : "pH"}`)}
        <div className={styles.lcdChip} aria-live="polite">
          {fmt1(value)}
        </div>
        {button(1, "+", `Increase ${name === "temp" ? "temperature" : "pH"}`)}
      </div>
    </div>
  );
}

export default function BioreactorDashboard() {
  const [deg, setDeg] = useState(rpmToDeg(300));
  const rpm = degToRpm(deg);

  const [pending, setPending] = useState({ temp: 350, ph: 70 });
  const [applied, setApplied] = useState({ temp: 350, ph: 70 });
  const [justApplied, setJustApplied] = useState(false);
  const [cur, setCur] = useState({ temp: 21.56, ph: 7.84 });
  const [runs, setRuns] = useState(0); // bumped by SET; the readings stay put until the first one

  const bump = (name, dir) => {
    const { min, max, step } = LIMITS[name];
    setPending((p) => ({
      ...p,
      [name]: clamp(p[name] + dir * step, min, max),
    }));
    setJustApplied(false);
  };

  // After SET, the current readings drift toward the new setpoints.
  useEffect(() => {
    if (runs === 0) return undefined;
    const target = { temp: applied.temp / 10, ph: applied.ph / 10 };
    const id = setInterval(() => {
      setCur((c) => {
        let done = true;
        const next = { ...c };
        for (const k of ["temp", "ph"]) {
          const diff = target[k] - c[k];
          if (Math.abs(diff) < 0.01) next[k] = target[k];
          else {
            next[k] = c[k] + diff * 0.06;
            done = false;
          }
        }
        if (done) clearInterval(id);
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [runs, applied]);

  const dirty = pending.temp !== applied.temp || pending.ph !== applied.ph;
  const status = dirty
    ? "Press SET to apply"
    : justApplied
      ? "Setpoints applied"
      : "";
  const caution = Math.abs(cur.temp - applied.temp / 10) > 1;
  const tempSet =
    applied.temp % 10 === 0 ? applied.temp / 10 : fmt1(applied.temp);

  return (
    <div className={styles.glassFigure}>
      <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} grain>
        <div className={styles.dash}>
          <div className={`${styles.dashSide} ${styles.dashDial}`}>
            <div className={styles.ctlLabel}>Motor speed</div>
            <Dial rpm={rpm} deg={deg} setDeg={setDeg} />
            <div className={styles.lcdChip}>{rpm} RPM</div>
            <div className={styles.dashHint}>Drag to turn</div>
          </div>

          <div className={styles.bezel}>
            <div className={styles.screen}>
              <div className={styles.screenTitle}>BIOREACTOR RUNNING</div>
              <div className={styles.screenRows}>
                <div className={styles.screenRow}>
                  <span>Temperature setpoint:</span>
                  <span>{tempSet} C</span>
                </div>
                <div className={styles.screenRow}>
                  <span>pH setpoint:</span>
                  <span>{fmt1(applied.ph)}</span>
                </div>
                <div className={styles.screenDivider} />
                <div className={styles.screenRow}>
                  <span>Current temperature:</span>
                  <span>{cur.temp.toFixed(2)} C</span>
                </div>
                <div className={styles.screenRow}>
                  <span>Current pH:</span>
                  <span>{cur.ph.toFixed(2)}</span>
                </div>
                <div className={styles.screenRow}>
                  <span>Motor RPM:</span>
                  <span>{rpm}</span>
                </div>
                <div className={styles.screenRow}>
                  <span>Current OD:</span>
                  <span>0.42</span>
                </div>
              </div>
              <div className={styles.cautionWrap}>
                <span
                  className={styles.caution}
                  style={{ visibility: caution ? "visible" : "hidden" }}
                >
                  Caution: Temperature &amp; pH out of range
                </span>
              </div>
              <img
                className={styles.screenLogo}
                src={igemLogo}
                alt="KAUST iGEM"
              />
            </div>
          </div>

          <div className={`${styles.dashSide} ${styles.dashSetpoints}`}>
            <div className={styles.ctlLabel}>Setpoints</div>
            <Stepper
              name="temp"
              label="Temp (°C)"
              value={pending.temp}
              onBump={bump}
            />
            <Stepper name="ph" label="pH" value={pending.ph} onBump={bump} />
            <button
              type="button"
              className={styles.setBtn}
              onClick={() => {
                setApplied({ ...pending });
                setJustApplied(true);
                setRuns((n) => n + 1);
              }}
            >
              SET
            </button>
            <div
              className={`${styles.setStatus} ${dirty ? styles.setStatusPending : ""}`}
              role="status"
            >
              {status}
            </div>
          </div>
        </div>
      </LiquidGlass>
      {/* The LCD's pixel font (src/styles/fonts.scss) is only used here, so
          its credit sits with it rather than in the Footer's typeface list. */}
      <p className={styles.fontCredit}>
        Screen typeface: Silkscreen by Jason Kottke, licensed under the{" "}
        <a
          href="https://openfontlicense.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          SIL Open Font License 1.1
        </a>
        .
      </p>
    </div>
  );
}
