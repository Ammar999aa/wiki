import styles from "../Hardware.module.scss";

// Figure 6 — the automated workflow, ported unchanged from the team's page
// export. Its caption lives in hardware.md right after the slot. Colors are
// literal values because SVG presentation attributes can't read CSS custom
// properties (they're the --primary/--primary-300/--amber tokens).
const MONO = "ui-monospace, Menlo, Consolas, monospace";

export default function WorkflowDiagram() {
  return (
    <div className="panel">
      <div className="panel-title">Automated workflow</div>
      <div className={styles.workflowScroll}>
        <svg
          className={styles.workflow}
          viewBox="0 0 1040 280"
          role="img"
          aria-label="Diagram of the SHIHAB workflow: the user loads a pill, then the bioreactor ferments the culture under closed-loop sensor control, automatically transfers it by tubes and pumps to the purification system, which automatically produces the purified product — the only manual step is loading the pill."
        >
          <defs>
            <marker
              id="wf-arrow-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,216,77,0.85)" />
            </marker>
            <marker
              id="wf-arrow-purple"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="rgba(209,168,255,0.9)" />
            </marker>
          </defs>

          {/* feedback loop above the fermentation box: closed-loop sensor control */}
          <path
            d="M 400,130 C 400,50 330,50 330,130"
            fill="none"
            stroke="rgba(255,216,77,0.55)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            markerEnd="url(#wf-arrow-amber)"
          />
          <text
            x="365"
            y="40"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="10"
            letterSpacing="0.04em"
            fill="rgba(255,216,77,0.75)"
          >
            SENSORS + CONTROL LOOP
          </text>

          {/* stage 1: pill loaded (manual) */}
          <rect
            x="20"
            y="130"
            width="170"
            height="90"
            rx="16"
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(177,109,255,0.4)"
            strokeWidth="1.5"
          />
          <text
            x="105"
            y="168"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="15"
            fill="#D1A8FF"
          >
            Pill loaded
          </text>
          <text
            x="105"
            y="190"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="11"
            fill="rgba(255,255,255,0.55)"
          >
            manual step
          </text>

          {/* arrow 1: dashed, manual hand-off */}
          <line
            x1="190"
            y1="175"
            x2="266"
            y2="175"
            stroke="rgba(177,109,255,0.65)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            markerEnd="url(#wf-arrow-purple)"
          />

          {/* stage 2: fermentation (automated) */}
          <rect
            x="270"
            y="130"
            width="190"
            height="90"
            rx="16"
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(255,216,77,0.45)"
            strokeWidth="1.5"
          />
          <text
            x="365"
            y="168"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="15"
            fill="#FFD84D"
          >
            Fermentation
          </text>
          <text
            x="365"
            y="190"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="11"
            fill="rgba(255,255,255,0.55)"
          >
            closed-loop control
          </text>

          {/* arrow 2: solid, automated transfer */}
          <line
            x1="460"
            y1="175"
            x2="586"
            y2="175"
            stroke="rgba(255,216,77,0.7)"
            strokeWidth="1.5"
            markerEnd="url(#wf-arrow-amber)"
          />
          <text
            x="523"
            y="202"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="11"
            fill="rgba(255,216,77,0.85)"
          >
            tubes + pumps
          </text>

          {/* stage 3: purification (automated) */}
          <rect
            x="590"
            y="130"
            width="230"
            height="90"
            rx="16"
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(255,216,77,0.45)"
            strokeWidth="1.5"
          />
          <text
            x="705"
            y="168"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="15"
            fill="#FFD84D"
          >
            Purification
          </text>
          <text
            x="705"
            y="190"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="11"
            fill="rgba(255,255,255,0.55)"
          >
            filtration → chromatography
          </text>

          {/* arrow 3: solid, automated */}
          <line
            x1="820"
            y1="175"
            x2="896"
            y2="175"
            stroke="rgba(255,216,77,0.7)"
            strokeWidth="1.5"
            markerEnd="url(#wf-arrow-amber)"
          />
          <text
            x="858"
            y="202"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="11"
            fill="rgba(255,216,77,0.85)"
          >
            automated
          </text>

          {/* stage 4: purified product */}
          <rect
            x="900"
            y="130"
            width="120"
            height="90"
            rx="16"
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(177,109,255,0.4)"
            strokeWidth="1.5"
          />
          <text
            x="960"
            y="168"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="14"
            fill="#D1A8FF"
          >
            Purified
          </text>
          <text
            x="960"
            y="186"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="14"
            fill="#D1A8FF"
          >
            product
          </text>
        </svg>
      </div>
    </div>
  );
}
