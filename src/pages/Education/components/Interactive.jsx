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

// "Is it an LMO?" check for the Kallpa section's Context: pick how a plant
// was modified, see how Peru classifies it — the same rule the Context prose
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

// "Pick a voice" selector for the Week 4 role-play: one button per role,
// the chosen role's question shown as a pull quote below. Items:
// [{ key, role, question }].
export function RolePlay({ items }) {
  const [active, setActive] = useState(items[0]?.key);
  const current = items.find((it) => it.key === active) || items[0];

  return (
    <div className={styles.try}>
      <p className={styles.tryLabel}>Role-play: pick a voice</p>
      <div className={styles.voiceList} role="tablist" aria-label="Role-play voices">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            role="tab"
            aria-selected={it.key === active}
            className={`${styles.voice} ${it.key === active ? styles.voiceOn : ""}`}
            onClick={() => setActive(it.key)}
          >
            {it.role}
          </button>
        ))}
      </div>
      <AnimatedSwap
        swapKey={active}
        className={styles.voiceQuote}
        role="tabpanel"
        aria-live="polite"
      >
        <p>{current.question}</p>
        <span>{current.role}</span>
      </AnimatedSwap>
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

// Illustrative only — not a reported result. Shows how training a handful
// of Kallpa volunteers multiplies into farmers reached, exactly the logic
// the "multiplier model" paragraph above it describes, but it computes
// volunteers × farmers-per-volunteer live rather than asserting one fixed
// number (see the .multNote caveat, required per
// .claude/MARKDOWN-COMPONENTS.md's "pending states are honest" guardrail —
// this isn't a pending state, but the same honesty principle applies to
// any number that isn't a reported result).
export function MultiplierScale() {
  const [volunteers, setVolunteers] = useState(10);
  const [perVolunteer, setPerVolunteer] = useState(8);
  const total = volunteers * perVolunteer;
  const dotCount = Math.min(total, 400);

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
            max="40"
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
            max="20"
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
      </p>
      <p className={styles.multNote}>
        An illustration of how the model scales, not our reported results.
      </p>
    </div>
  );
}
