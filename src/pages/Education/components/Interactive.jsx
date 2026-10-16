import { useState } from "react";
import AnimatedSwap from "../../../components/AnimatedSwap/AnimatedSwap";
import styles from "./Interactive.module.scss";

// Walks a reader through the same three steps children took at the Copy
// Paste Plants booth — supplements the section's prose recap rather than
// replacing it (see education.md).
const CLONE_STEPS = [
  {
    title: "Get your plant",
    body: "Choose a healthy pothos vine with plenty of leaves. This is the parent plant you will copy.",
  },
  {
    title: "Make the cut",
    body: "Cut a piece of stem just below a node, the small bump where a leaf joins the stem. New roots grow from the node.",
  },
  {
    title: "Watch it grow",
    body: "Place the cutting in water. Over the next few weeks, roots appear and a new plant grows, an exact genetic copy of its parent.",
  },
];

// Three overlaid <g> stages sharing one 180x200 viewBox, toggled by opacity
// exactly like the original mockup's SVG — colors adjusted from its paper
// (light) background to read against this site's dark one (the near-black
// cut-line and mid-slate scissor strokes in particular needed lightening).
function CloneIllustration({ step }) {
  return (
    <svg className={styles.stepperSvg} viewBox="0 0 180 200" aria-hidden="true">
      <g
        className={styles.stepperStage}
        style={{ opacity: step === 0 ? 1 : 0 }}
      >
        <path d="M60 150 h60 l-8 40 h-44z" fill="#C9764A" />
        <path
          d="M90 150 C90 110 70 90 60 60 M90 150 C92 115 110 95 125 70 M90 150 C88 120 90 90 92 50"
          stroke="#2F6B3A"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M60 60 c-16-4-22 10-10 18 c10 4 14-6 10-18z M125 70 c14-8 24 4 14 14 c-8 6-16-2-14-14z M92 50 c-8-14 6-24 12-12 c4 10-4 16-12 12z M74 96 c-16 2-16 16-2 16 c10-2 8-12 2-16z"
          fill="#4E9A58"
        />
      </g>
      <g
        className={styles.stepperStage}
        style={{ opacity: step === 1 ? 1 : 0 }}
      >
        <path
          d="M40 150 C60 120 80 100 110 70"
          stroke="#2F6B3A"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M110 70 c10-14 26-6 18 8 c-6 8-16 4-18-8z M80 100 c-4-16 12-20 14-8 c0 10-8 12-14 8z"
          fill="#4E9A58"
        />
        <circle cx="62" cy="126" r="4" fill="#A8703D" />
        <path
          d="M40 160 l24-24"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <path
          d="M30 172 l14-10 m-6 14 l10-14"
          stroke="#9698B8"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g
        className={styles.stepperStage}
        style={{ opacity: step === 2 ? 1 : 0 }}
      >
        <path
          d="M62 80 h56 v100 a8 8 0 0 1-8 8 h-40 a8 8 0 0 1-8-8z"
          fill="#DCEBF5"
          stroke="#8FB3C9"
          strokeWidth="2"
        />
        <path d="M62 105 h56" stroke="#8FB3C9" strokeWidth="2" />
        <path
          d="M90 170 C90 130 92 90 96 40"
          stroke="#2F6B3A"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M96 40 c10-14 26-6 18 8 c-6 8-16 4-18-8z M92 70 c-12-8-24 4-12 12 c8 4 14-4 12-12z"
          fill="#4E9A58"
        />
        <path
          d="M90 170 c-8 4-14 10-18 16 M90 170 c6 6 10 10 16 14 M90 170 c0 8 -2 12 -4 16"
          stroke="#E8D7B0"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function CloneStepper() {
  const [step, setStep] = useState(0);
  const current = CLONE_STEPS[step];

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>Try it: clone a pothos in three steps</p>
      <div className={styles.stepperLayout}>
        <CloneIllustration step={step} />
        <div>
          <div
            className={styles.stepperNav}
            role="tablist"
            aria-label="Cloning steps"
          >
            {CLONE_STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === step}
                aria-label={`Step ${i + 1}: ${s.title}`}
                className={`${styles.stepDot} ${i === step ? styles.stepDotOn : ""}`}
                onClick={() => setStep(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <AnimatedSwap
            swapKey={step}
            className={styles.stepBody}
            aria-live="polite"
          >
            <h4>{current.title}</h4>
            <p>{current.body}</p>
          </AnimatedSwap>
        </div>
      </div>
    </div>
  );
}

// Generic tab group shared by any section with several parallel,
// substantial sub-topics a reader may want to switch between rather than
// scroll through all of (currently: Kallpa's four course modules). Items:
// [{ key, label, body, icon?, title? }] — `icon` and `title` render as a
// header row above the body in the panel (the pill itself stays text-only).
export function Tabs({ items, ariaLabel }) {
  const [active, setActive] = useState(items[0]?.key);
  const current = items.find((it) => it.key === active) || items[0];

  return (
    <div className={styles.try}>
      <div className={styles.tabList} role="tablist" aria-label={ariaLabel}>
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            role="tab"
            aria-selected={it.key === active}
            className={`${styles.tab} ${it.key === active ? styles.tabOn : ""}`}
            onClick={() => setActive(it.key)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <AnimatedSwap
        swapKey={active}
        className={styles.tabPanel}
        role="tabpanel"
        aria-live="polite"
      >
        {(current.icon || current.title) && (
          <div className={styles.tabHead}>
            {current.icon && <span className={styles.tabIcon}>{current.icon}</span>}
            {current.title && <h4>{current.title}</h4>}
          </div>
        )}
        <p>{current.body}</p>
      </AnimatedSwap>
    </div>
  );
}

// "Is it an LMO?" check for the Kallpa section's Context (also the Session 4
// challenge): pick how a plant was modified, see how Peru classifies it — the same rule the Context prose
// and the Mateo/Rosa dialogue state (Law No. 31.111 vs. the 2026 resolution).
const LMO_OPTIONS = [
  {
    key: "foreign",
    label: "Foreign DNA added",
    lmo: true,
    verdict: "Classified as LMO",
    reason: "Foreign DNA is introduced, so it falls under the moratorium (Law 31.111).",
  },
  {
    key: "crispr",
    label: "Own gene edited (CRISPR)",
    lmo: false,
    verdict: "Not classified as an LMO",
    reason: "Its own gene is modified or silenced with no exogenous DNA, so it is exempt under the 2026 resolution.",
  },
  // Third case from the Kallpa Session 4 challenge ("Is it an LMO under
  // the new rule?" — a native potato improved by traditional crossing).
  {
    key: "crossing",
    label: "Traditional crossing",
    lmo: false,
    verdict: "Not an LMO",
    reason: "A native variety improved by traditional crossing between varieties is conventional breeding, not an LMO.",
  },
];

export function LmoCheck() {
  const [picked, setPicked] = useState(null);
  const current = LMO_OPTIONS.find((o) => o.key === picked);

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>Try it: Is it an LMO?</p>
      <div className={styles.lmoOptions} role="group" aria-label="How was the plant modified?">
        {LMO_OPTIONS.map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={o.key === picked}
            className={`${styles.voice} ${o.key === picked ? styles.voiceOn : ""}`}
            onClick={() => setPicked(o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <AnimatedSwap swapKey={picked ?? "none"} aria-live="polite">
        {current ? (
          <div className={`${styles.lmoResult} ${current.lmo ? styles.lmoYes : styles.lmoNo}`}>
            <p className={styles.lmoVerdict}>{current.verdict}</p>
            <p>{current.reason}</p>
          </div>
        ) : (
          <p className={styles.lmoHint}>Pick how the plant was modified to see how Peru classifies it.</p>
        )}
      </AnimatedSwap>
    </div>
  );
}

// Kallpa Session 3's "decision scale": the reader sorts each statement
// about a GM crop into benefit or risk and watches the beam tip. The
// statements are the session's own discussion prompts, not claims the page
// makes about any real crop.
const SCALE_CLAIMS = [
  "Yields 30% more using the same amount of water.",
  "It could cross with native varieties in the area.",
  "It might need fewer pesticides.",
  "Seeds could have an owner: what about the farmer's own seed?",
];

const BEAM = 110;

export function DecisionScale() {
  const [picks, setPicks] = useState({});
  const benefits = Object.values(picks).filter((v) => v === "benefit").length;
  const risks = Object.values(picks).filter((v) => v === "risk").length;
  // Positive tilt drops the right (Risk) pan. The pans hang from the beam
  // ends but are translated, not rotated, so they stay level.
  const tilt = Math.max(-14, Math.min(14, (risks - benefits) * 5));
  const cos = Math.cos((tilt * Math.PI) / 180);
  const sin = Math.sin((tilt * Math.PI) / 180);
  const pick = (i, v) => setPicks((p) => ({ ...p, [i]: p[i] === v ? undefined : v }));

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>Session 3 activity: the decision scale</p>
      <svg className={styles.scaleSvg} viewBox="0 -8 320 140" aria-hidden="true">
        <path className={styles.scaleStand} d="M160 30 L144 112 H176 Z" />
        <line className={styles.scaleStand} x1="124" y1="114" x2="196" y2="114" />
        <line
          className={styles.scaleBeam}
          x1={160 - BEAM}
          y1="30"
          x2={160 + BEAM}
          y2="30"
          style={{ transform: `rotate(${tilt}deg)` }}
        />
        <circle className={styles.scalePivot} cx="160" cy="30" r="4" />
        {[
          { side: -1, heavy: benefits > risks },
          { side: 1, heavy: risks > benefits },
        ].map(({ side, heavy }) => (
          <g
            key={side}
            className={`${styles.scalePan} ${heavy ? styles.scalePanHeavy : ""}`}
            style={{ transform: `translate(${160 + side * BEAM * cos}px, ${30 + side * BEAM * sin}px)` }}
          >
            <path d="M0 0 L-26 34 M0 0 L26 34" />
            <path d="M-32 34 H32 Q0 56 -32 34 Z" />
          </g>
        ))}
        <text className={styles.scaleLegend} x={160 - BEAM} y="126">
          Benefit <tspan>{benefits}</tspan>
        </text>
        <text className={styles.scaleLegend} x={160 + BEAM} y="126">
          Risk <tspan>{risks}</tspan>
        </text>
      </svg>
      <ul className={styles.scaleClaims}>
        {SCALE_CLAIMS.map((c, i) => (
          <li key={c}>
            <span>{c}</span>
            <span className={styles.scaleButtons} role="group" aria-label="Benefit or risk?">
              {["benefit", "risk"].map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={picks[i] === v}
                  className={`${styles.voice} ${picks[i] === v ? styles.voiceOn : ""}`}
                  onClick={() => pick(i, v)}
                >
                  {v === "benefit" ? "Benefit" : "Risk"}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.lmoHint} aria-live="polite">
        {benefits + risks === 0
          ? "Benefit or risk? Choose for each statement and see where your scale tips."
          : `Your scale: ${benefits} benefit${benefits === 1 ? "" : "s"}, ${risks} risk${risks === 1 ? "" : "s"}.`}
      </p>
    </div>
  );
}

// One marker per item on a 0–max track (Kallpa evidence-of-impact scores).
// Reported survey results, so each value is printed beside its label too.
// Items: [{ label, value }].
export function ScoreTrack({ title, items, max = 5 }) {
  return (
    <div className={styles.try}>
      {title && <p className={styles.tryLabel}>{title}</p>}
      <div className={styles.scoreRows}>
        {items.map((it) => (
          <div key={it.label} className={styles.scoreRow}>
            <div className={styles.scoreLabel}>
              <span>{it.label}</span>
              <b>
                {it.value} / {max}
              </b>
            </div>
            <div className={styles.scoreTrack}>
              {Array.from({ length: max + 1 }, (_, i) => (
                <i key={i} className={styles.scoreTick} style={{ left: `${(i / max) * 100}%` }} />
              ))}
              <span className={styles.scoreFill} style={{ width: `${(it.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className={styles.scoreAxis} aria-hidden="true">
          {Array.from({ length: max + 1 }, (_, i) => (
            <span key={i} style={{ left: `${(i / max) * 100}%` }}>
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Line icons for the Kallpa module tab panels (24×24 viewBox, stroked in
// currentColor so the badge they sit in sets their color).
const MODULE_ICON_PATHS = {
  // Double helix: two crossing strands plus base-pair rungs.
  dna: (
    <>
      <path d="M6 2c0 5 12 5 12 10S6 17 6 22" />
      <path d="M18 2c0 5-12 5-12 10s12 5 12 10" />
      <path d="M7.5 4h9M7 12h10M7.5 20h9" />
    </>
  ),
  apple: (
    <>
      <path d="M12 7.5c-1.5-1.2-3-1.5-4.5-1.2C4.8 6.9 3.8 10 4.4 13c.8 4 3.2 7.5 5.3 7.5 1 0 1.4-.5 2.3-.5s1.3.5 2.3.5c2.1 0 4.5-3.5 5.3-7.5.6-3-.4-6.1-3.1-6.7-1.5-.3-3 0-4.5 1.2z" />
      <path d="M12 7.5c0-2 .8-3.6 2.5-4.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.5c3 2.2 4.5 5.5 4.5 9.5v4h-9v-4c0-4 1.5-7.3 4.5-9.5z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M7.5 12.5 5 15v3.5l2.5-2.5M16.5 12.5 19 15v3.5L16.5 16" />
      <path d="M10.5 19v2.5M13.5 19v2.5" />
    </>
  ),
  // Scales of justice.
  justice: (
    <>
      <path d="M12 3v17M8 20.5h8M5 6.5h14" />
      <path d="M5 6.5 2.5 12.5a2.5 2.5 0 0 0 5 0z" />
      <path d="M19 6.5l-2.5 6a2.5 2.5 0 0 0 5 0z" />
    </>
  ),
};

export function ModuleIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {MODULE_ICON_PATHS[name]}
    </svg>
  );
}

// Kallpa's reported reach (education.md, "Our reach"): 8 trained volunteers
// reached 180 farmers in 3 communities. The sliders open on those numbers
// and only switch to the "illustration" caveat once the reader moves away
// from them, so the reported result and the what-if never get confused
// (per .claude/MARKDOWN-COMPONENTS.md's "pending states are honest"
// guardrail, applied to any number that isn't a reported result).
const KALLPA_REACH = {
  volunteers: 8,
  farmers: 180,
  communities: ["Central Amazon", "Valle del Nilo community", "Caraz"],
};
// Whole farmers per volunteer, rounded (180 / 8 = 22.5 → 23), so the
// sliders can land exactly on the reported state.
const KALLPA_PER_VOLUNTEER = Math.round(KALLPA_REACH.farmers / KALLPA_REACH.volunteers);
// Above this, one dot stands for several farmers.
const MAX_DOTS = 400;

export function MultiplierScale() {
  const [volunteers, setVolunteers] = useState(KALLPA_REACH.volunteers);
  const [perVolunteer, setPerVolunteer] = useState(KALLPA_PER_VOLUNTEER);
  const reported = volunteers === KALLPA_REACH.volunteers && perVolunteer === KALLPA_PER_VOLUNTEER;
  // The reported total is the real count, not volunteers × the rounded average.
  const total = reported ? KALLPA_REACH.farmers : volunteers * perVolunteer;
  const unit = Math.max(1, Math.ceil(total / MAX_DOTS));
  const dotCount = Math.round(total / unit);

  const reset = () => {
    setVolunteers(KALLPA_REACH.volunteers);
    setPerVolunteer(KALLPA_PER_VOLUNTEER);
  };

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>See how a multiplier model scales</p>
      <div className={styles.multControls}>
        <label htmlFor="mult-volunteers">
          Volunteers we train:{" "}
          <output htmlFor="mult-volunteers">{volunteers}</output>
          <input
            id="mult-volunteers"
            type="range"
            min="1"
            max="30"
            value={volunteers}
            onChange={(e) => setVolunteers(Number(e.target.value))}
          />
        </label>
        <label htmlFor="mult-reach">
          Farmers each volunteer reaches:{" "}
          <output htmlFor="mult-reach">{perVolunteer}</output>
          <input
            id="mult-reach"
            type="range"
            min="1"
            max="30"
            value={perVolunteer}
            onChange={(e) => setPerVolunteer(Number(e.target.value))}
          />
        </label>
      </div>
      <div className={styles.multFlow} aria-hidden="true">
        <span className={styles.multNode}>KAUST iGEM</span>
        <span className={styles.multArrow}>&rarr;</span>
        <span className={`${styles.multNode} ${styles.multNodeAccent}`}>
          {volunteers} {volunteers === 1 ? "volunteer" : "volunteers"}
        </span>
        <span className={styles.multArrow}>&rarr;</span>
        <div className={styles.multDots}>
          {Array.from({ length: dotCount }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      <p className={styles.multTotal} aria-live="polite">
        <strong>{total}</strong> farmers reached, from one course
        {unit > 1 && <span className={styles.multUnit}>● = {unit} farmers</span>}
      </p>
      {reported && (
        <div className={styles.multComms}>
          <span className={styles.multCommsLabel}>Communities reached</span>
          {KALLPA_REACH.communities.map((c) => (
            <span key={c} className={styles.multComm}>
              {c}
            </span>
          ))}
        </div>
      )}
      <div className={styles.multFoot}>
        <p className={`${styles.multNote} ${reported ? styles.multNoteReported : ""}`}>
          {reported
            ? `Our reported results: ${KALLPA_REACH.volunteers} volunteers reached ${KALLPA_REACH.farmers} farmers in ${KALLPA_REACH.communities.length} communities (about ${KALLPA_PER_VOLUNTEER} farmers each, on average). Move the sliders to explore how the model could scale.`
            : "An illustration of how the model scales, not our reported results."}
        </p>
        {!reported && (
          <button type="button" className={styles.multReset} onClick={reset}>
            &#8634; Back to our results
          </button>
        )}
      </div>
    </div>
  );
}
