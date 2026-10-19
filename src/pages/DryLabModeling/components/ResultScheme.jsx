import { useEffect, useRef, useState } from "react";
import BarChart from "./BarChart";
import { Legend } from "./ChartPanel";
import SCHEME_SVG from "./schemeSvg";
import PANELS from "./schemePanels";
import data from "../data";
import styles from "../DryLabModeling.module.scss";

// "Try me" scheme from the team's revised Model page: a drawing of the four
// modelled organisms with labelled results; selecting a label (or one of
// the buttons underneath) opens that result in a panel below, linking to
// the section that covers it. The drawing and the panel text are copied
// verbatim (schemeSvg.js, schemePanels.js); the mini charts reuse this
// page's BarChart with the numbers the source panels plot.

const AMBER = "#FFD84D";
const VIOLET = "#B16DFF";
const LIGHT_VIOLET = "#D1A8FF";
const fmt = (d) => (v) => v.toFixed(d);

const O2_LEGEND = (
  <Legend
    items={[
      { label: "With oxygen", color: AMBER },
      { label: "Without oxygen", color: VIOLET },
    ]}
  />
);

const CHARTS = {
  "k-gapfill": {
    unit: " h⁻¹",
    format: fmt(2),
    bars: [
      { label: "Published model", value: 0, color: VIOLET },
      { label: "Corrected model", value: 0.14, color: VIOLET },
    ],
  },
  "k-bac-nb": {
    unit: " mmol/gDW/h",
    format: fmt(5),
    bars: [
      { label: "B. subtilis", value: 0.022, color: VIOLET },
      { label: "S. cerevisiae", value: 0.00654, color: VIOLET },
    ],
  },
  "k-bac-o2": {
    legend: O2_LEGEND,
    unit: " h⁻¹",
    format: fmt(2),
    bars: [
      { label: "B. subtilis", value: 0.32, color: AMBER },
      { label: "B. subtilis ", value: 0.14, color: VIOLET },
      { label: "S. cerevisiae", value: 0.41, color: AMBER },
      { label: "S. cerevisiae ", value: 0.11, color: VIOLET },
    ],
  },
  "k-sucrose": {
    legend: O2_LEGEND,
    unit: "",
    format: fmt(5),
    caption: "growth rate / mmol C",
    bars: [
      { label: "Glucose", value: 0.01064, color: AMBER },
      { label: "Glucose ", value: 0.0046, color: VIOLET },
      { label: "Sucrose", value: 0.00749, color: AMBER },
      { label: "Sucrose ", value: 0.00464, color: VIOLET },
    ],
  },
  "k-induction-b": {
    stats: [
      { value: "6.5", unit: "h", label: "Induction time with the highest final concentration" },
      { value: "72", unit: "h", label: "Cultivation time" },
      { value: "45", unit: "h", label: "Sugar depleted, precursors still available" },
    ],
  },
  "k-yst-nb": {
    legend: O2_LEGEND,
    unit: "",
    format: fmt(5),
    caption: "mmol/gDW/h",
    bars: data["yeast-nanobody-by-construct"].constructs.flatMap((c) => [
      { label: c.name, value: c.aerobic, color: AMBER },
      { label: `${c.name} `, value: c.anaerobic, color: VIOLET },
    ]),
  },
  "k-yst-o2": {
    unit: " h⁻¹",
    format: fmt(3),
    bars: [
      { label: "Aerobic (O₂ 10)", value: 0.41, color: VIOLET },
      { label: "Lowest tested (O₂ 0.0503)", value: 0.092, color: VIOLET },
      { label: "Anaerobic (O₂ 0)", value: 0.11, color: VIOLET },
    ],
  },
  "k-partner": {
    unit: " h⁻¹",
    format: fmt(3),
    bars: data["yeast-partner-supply"].conditions.map((c) => ({ label: c.label, value: c.growth, color: VIOLET })),
  },
  "k-pastoris": {
    legend: (
      <Legend
        items={[
          { label: "P. pastoris", color: LIGHT_VIOLET },
          { label: "S. cerevisiae", color: AMBER },
        ]}
      />
    ),
    unit: " h⁻¹",
    format: fmt(3),
    bars: [
      { label: "Maximum aerobic", value: 0.58, color: LIGHT_VIOLET },
      { label: "Maximum aerobic ", value: 0.41, color: AMBER },
      { label: "At low-oxygen point", value: 0.074, color: LIGHT_VIOLET },
      { label: "At low-oxygen point ", value: 0.092, color: AMBER },
    ],
  },
  "k-cyano-n": {
    stats: [
      { value: "≈0", label: "Reported shadow price for CO₂, bicarbonate and light" },
      { value: "−0.124", label: "Reported shadow price for ammonium and nitrate" },
      { value: "0.219", unit: "1/h", label: "Predicted baseline growth rate" },
    ],
  },
  "k-export": {
    unit: " mmol/gDW/h",
    format: fmt(2),
    bars: [
      { label: "Maximum growth", value: 0.23, color: VIOLET },
      { label: "Reduced growth", value: 0.81, color: VIOLET },
    ],
  },
  "k-knockouts": {
    stats: [
      { value: "0.29", label: "Predicted sucrose accumulation under the selected conditions (mmol/gDW/h)" },
      { value: "16.3", label: "Without carbon and light restrictions (mmol/gDW/h)" },
      { value: "0", label: "Deletions that forced higher sucrose production" },
    ],
  },
};

function PanelChart({ spec }) {
  if (!spec) return null;
  if (spec.stats) {
    return (
      <div className={styles.schemeStats}>
        {spec.stats.map((s) => (
          <div key={s.label} className={styles.schemeStat}>
            <span className={styles.schemeStatValue}>
              {s.value}
              {s.unit && <small>{" " + s.unit}</small>}
            </span>
            <span className={styles.schemeStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
      {spec.legend}
      <BarChart bars={spec.bars} unit={spec.unit} formatValue={spec.format} />
      {spec.caption && <p className={styles.schemeChartCaption}>{spec.caption}</p>}
    </>
  );
}

export default function ResultScheme() {
  const [current, setCurrent] = useState(null);
  const svgRef = useRef(null);
  const panelRef = useRef(null);
  const panel = PANELS.find((p) => p.key === current);

  // Mirror the open result onto the drawing's labels (the SVG is static markup).
  useEffect(() => {
    svgRef.current?.querySelectorAll(".hs").forEach((g) => {
      g.classList.toggle("active", g.getAttribute("data-hs") === current);
    });
  }, [current]);

  useEffect(() => {
    if (!current) return undefined;
    const onKey = (e) => e.key === "Escape" && setCurrent(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current]);

  // Labels on the drawing toggle; the index buttons always open (as in the source).
  const open = (key, toggle = true) => {
    setCurrent((prev) => (toggle && prev === key ? null : key));
    requestAnimationFrame(() => {
      const r = panelRef.current?.getBoundingClientRect();
      if (r && (r.top < 0 || r.bottom > window.innerHeight)) {
        panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  };

  const hotspotKey = (e) => e.target.closest?.(".hs")?.getAttribute("data-hs");
  const onSvgClick = (e) => {
    const key = hotspotKey(e);
    if (key) open(key);
  };
  const onSvgKeyDown = (e) => {
    const key = hotspotKey(e);
    if (key && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open(key);
    }
  };

  const readSection = (e) => {
    const target = document.getElementById(panel.target);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", `#${panel.target}`);
  };

  return (
    <div className={styles.scheme}>
      <p className={styles.schemeFigCaption}>
        <strong>Figure 1. Schematic summarising one question, three models, one recommendation.</strong> Each host
        model was asked the same questions about oxygen supply, feedstock and production timing, independently of
        the others. The supplier model produces a sucrose and oxygen flux that is used directly as an uptake bound
        in the yeast model; the remaining links were either calculated separately or identified. Solid arrow: the
        supplier's computed fluxes were used directly as uptake bounds in the yeast model. Dashed arrows: related
        calculations that were run separately or links identified. Every result shown here is developed in the
        section indicated.
      </p>

      <p className={styles.schemeHint}>
        <span className={styles.schemeTryTag}>Try me</span>
        <span>
          Select any label on the scheme to open that result underneath, then follow the link through to the
          section that covers it.
        </span>
      </p>


      <div className={styles.schemeFrame}>
        <div
          ref={svgRef}
          className={styles.schemeScroll}
          onClick={onSvgClick}
          onKeyDown={onSvgKeyDown}
          dangerouslySetInnerHTML={{ __html: SCHEME_SVG }}
        />
      </div>

      <div
        ref={panelRef}
        className={styles.schemePanel}
        role="region"
        aria-live="polite"
        aria-label="Selected modelling result"
        hidden={!panel}
      >
        {panel && (
          <>
            <button type="button" className={styles.schemeClose} aria-label="Close this result" onClick={() => setCurrent(null)}>
              ×
            </button>
            <div className={styles.schemePanelGrid}>
              <div>
                <div className={styles.schemeOrg} dangerouslySetInnerHTML={{ __html: panel.org }} />
                <h3 className={styles.schemeTitle} dangerouslySetInnerHTML={{ __html: panel.title }} />
                <p className={styles.schemeTake} dangerouslySetInnerHTML={{ __html: panel.take }} />
                <a className={styles.schemeMore} href={`#${panel.target}`} onClick={readSection}>
                  Read this section
                </a>
              </div>
              <div className={styles.schemeChart}>
                <PanelChart spec={CHARTS[panel.key]} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.schemeIndex}>
        <span className={styles.schemeIndexLabel}>Every result on the scheme</span>
        {PANELS.map((p) => (
          <button
            type="button"
            key={p.key}
            className={p.key === current ? styles.schemeIndexActive : undefined}
            onClick={() => open(p.key, false)}
            dangerouslySetInnerHTML={{ __html: p.title }}
          />
        ))}
      </div>

      <p className={styles.schemeNote}>
        Overview of the three chassis and the cyanobacterial supplier. Each label marks a result reported below;
        the sections themselves follow in order.
      </p>
    </div>
  );
}
