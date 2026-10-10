import data from "../data";
import ChartPanel, { Legend } from "./ChartPanel";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Heatmap from "./Heatmap";
import WorkflowDiagram from "./WorkflowDiagram";
import styles from "../DryLabOverview.module.scss";

const VIOLET = "#B16DFF";
const BLUE = "#3F6FAF";
const AMBER = "#FFD84D";
const GREEN = "#0ca30c";
const RED = "#d03b3b";
const MUTED = "rgba(255,255,255,0.45)";

const INDUCTION_COLORS = [BLUE, GREEN, AMBER, RED, VIOLET];

function fmt(n, d = 2) {
  return (v) => v.toFixed(d);
}

// ---- Yeast ODE (Model 1 / Model 2) -----------------------------------
function YeastModel1() {
  const d = data["yeast-model1-induction-times"];
  const mk = (key, yLabel, formatY) => (
    <LineChart
      series={d.series.map((s, i) => ({
        label: s.tI === d.tIStar ? `t_i* = ${s.tI.toFixed(1)} h` : `t_i = ${s.tI.toFixed(0)} h`,
        color: INDUCTION_COLORS[i],
        x: d.t,
        y: s[key],
        dashed: s.tI === d.tIStar,
      }))}
      xLabel="Time (h)"
      yLabel={yLabel}
      xDomain={[0, 48]}
      xTicks={[0, 12, 24, 36, 48]}
      formatX={fmt(0)}
      formatY={formatY}
    />
  );
  const legend = (
    <Legend
      items={d.series.map((s, i) => ({
        label: s.tI === d.tIStar ? `t_i*=${s.tI.toFixed(1)}h` : `${s.tI.toFixed(0)}h`,
        color: INDUCTION_COLORS[i],
        dashed: s.tI === d.tIStar,
      }))}
    />
  );
  return (
    <ChartPanel title="Model 1 — analytical induction sweep" legend={legend}>
      <div className={styles.chartPair}>
        <div>
          <p className={styles.statLine}>Biomass, X(t)</p>
          {mk("biomass", "Biomass X(t) (g/L)", fmt(1))}
        </div>
        <div>
          <p className={styles.statLine}>Nanobody, P(t)</p>
          {mk("nanobody", "Nanobody P(t) (mg/L)", fmt(0))}
        </div>
      </div>
    </ChartPanel>
  );
}

function YeastConstitutiveVsInducible() {
  const d = data["yeast-constitutive-vs-inducible"];
  return (
    <ChartPanel
      title="Constitutive vs. optimally-timed induction"
      legend={
        <Legend
          items={[
            { label: "Constitutive (t_i=0)", color: VIOLET },
            { label: `Inducible (t_i*=${d.tIStar.toFixed(1)}h)`, color: GREEN },
          ]}
        />
      }
    >
      <LineChart
        series={[
          { label: "Constitutive: t_i=0", color: VIOLET, x: d.t, y: d.pConst },
          { label: `Inducible: t_i*=${d.tIStar.toFixed(1)}h`, color: GREEN, x: d.t, y: d.pInd },
        ]}
        vLines={[{ x: d.tIStar, label: "optimal induction", color: AMBER }]}
        xLabel="Time (h)"
        yLabel="Nanobody, P(t) (mg/L)"
        xDomain={[0, 48]}
        xTicks={[0, 12, 24, 36, 48]}
        formatX={fmt(0)}
        formatY={fmt(0)}
      />
    </ChartPanel>
  );
}

function YeastResourceSimulation() {
  const d = data["yeast-resource-simulation"];
  const series = [
    { key: "X", label: "Biomass", color: BLUE },
    { key: "P", label: "Nanobody", color: RED },
    { key: "S", label: "Sugar", color: GREEN },
    { key: "O", label: "Dissolved O2", color: AMBER },
    { key: "Og", label: "Headspace O2", color: VIOLET },
  ];
  return (
    <ChartPanel
      title="Model 2 — resource-depleting run (t_ind = 10 h)"
      sub="All states normalized to their own maximum."
      legend={<Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />}
    >
      <LineChart
        series={series.map((s) => ({ label: s.label, color: s.color, x: d.t, y: d[s.key] }))}
        vLines={[{ x: d.tInd, label: "induction", color: MUTED }]}
        xLabel="Time (h)"
        yLabel="Normalized value"
        xDomain={[0, 72]}
        xTicks={[0, 12, 24, 36, 48, 60, 72]}
        yDomain={[0, 1.05]}
        formatX={fmt(0)}
        formatY={fmt(1)}
      />
    </ChartPanel>
  );
}

function YeastInductionScan() {
  const d = data["yeast-induction-scan"];
  return (
    <ChartPanel title="Peak nanobody yield vs. induction time">
      <LineChart
        series={[{ label: "Peak P", color: RED, x: d.inductionTimes, y: d.maxP }]}
        points={[{ x: d.peakTI, y: d.peakP, label: "peak", color: AMBER }]}
        xLabel="Induction time (h)"
        yLabel="Maximum nanobody P"
        xDomain={[0, 48]}
        xTicks={[0, 12, 24, 36, 48]}
        formatX={fmt(0)}
        formatY={fmt(2)}
      />
      <p className={styles.statLine}>
        Peak <b>{d.peakP.toFixed(3)}</b> at t_i = <b>{d.peakTI.toFixed(1)} h</b>
      </p>
    </ChartPanel>
  );
}

function YeastYieldLossHeatmap() {
  const d = data["yeast-yield-loss-heatmap"];
  return (
    <ChartPanel title="Nanobody P(t) over varying induction times">
      <Heatmap
        matrix={d.matrix}
        xValues={d.tEval}
        yValues={d.inductionTimes}
        xLabel="Time (h)"
        yLabel="Induction time (h)"
        valueLabel="Nanobody P(t)"
        formatX={fmt(0)}
        formatY={fmt(0)}
        formatV={fmt(2)}
      />
    </ChartPanel>
  );
}

// ---- Bacillus ODE ------------------------------------------------------
function BacillusFig2() {
  const d = data["bacillus-fig2-sugar-nitrogen"];
  return (
    <ChartPanel
      title="Carbon and nitrogen resources (t_ind = 10 h)"
      legend={<Legend items={[{ label: "Sugar S", color: BLUE }, { label: "Nitrogen/AA pool N", color: AMBER }]} />}
    >
      <LineChart
        series={[
          { label: "Sugar S (g/L)", color: BLUE, x: d.t, y: d.S },
          { label: "Nitrogen / AA pool N (g/L)", color: AMBER, x: d.t, y: d.N },
        ]}
        vLines={[{ x: d.tInd, label: "induction", color: MUTED }]}
        xLabel="Time (h)"
        yLabel="Concentration (g/L)"
        xDomain={[0, 72]}
        xTicks={[0, 12, 24, 36, 48, 60, 72]}
        formatX={fmt(0)}
        formatY={fmt(1)}
      />
    </ChartPanel>
  );
}

function BacillusFig6() {
  const d = data["bacillus-fig6-final-nanobody"];
  return (
    <ChartPanel title="Final nanobody at harvest vs. induction time">
      <LineChart
        series={[{ label: "Final P(T)", color: BLUE, x: d.inductionTimes, y: d.finalP }]}
        vLines={[{ x: d.bestT, label: `optimal t_i=${d.bestT.toFixed(1)}h`, color: RED }]}
        xLabel="Induction time (h)"
        yLabel="Final nanobody at harvest (mg/L)"
        xDomain={[0, 48]}
        xTicks={[0, 12, 24, 36, 48]}
        formatX={fmt(0)}
        formatY={fmt(0)}
      />
      <p className={styles.statLine}>
        Optimum <b>{d.bestT.toFixed(1)} h</b>, peak <b>{Math.max(...d.finalP).toFixed(1)} mg/L</b>
      </p>
    </ChartPanel>
  );
}

function BacillusFig8() {
  const d = data["bacillus-fig8-heatmap"];
  return (
    <ChartPanel title="Heatmap of P(t) across induction times">
      <Heatmap
        matrix={d.matrix}
        xValues={d.tEval}
        yValues={d.inductionTimes}
        xLabel="Cultivation time (h)"
        yLabel="Induction time (h)"
        valueLabel="Nanobody P(t) (mg/L)"
        formatX={fmt(0)}
        formatY={fmt(0)}
        formatV={fmt(1)}
      />
    </ChartPanel>
  );
}

function BacillusFig9() {
  const d = data["bacillus-fig9-multi-induction"];
  const mk = (key, yLabel, formatY) => (
    <LineChart
      series={d.series.map((s, i) => ({
        label: s.tI === d.bestT ? `t_i*=${s.tI.toFixed(1)}h` : `t_i=${s.tI.toFixed(0)}h`,
        color: INDUCTION_COLORS[i],
        x: s.t,
        y: s[key],
        dashed: s.tI === d.bestT,
      }))}
      xLabel="Time (h)"
      yLabel={yLabel}
      xDomain={[0, 72]}
      xTicks={[0, 12, 24, 36, 48, 60, 72]}
      formatX={fmt(0)}
      formatY={formatY}
    />
  );
  const legend = (
    <Legend
      items={d.series.map((s, i) => ({
        label: s.tI === d.bestT ? `t_i*=${s.tI.toFixed(1)}h` : `${s.tI.toFixed(0)}h`,
        color: INDUCTION_COLORS[i],
        dashed: s.tI === d.bestT,
      }))}
    />
  );
  return (
    <ChartPanel title="Multiple induction-time comparison" legend={legend}>
      <div className={styles.chartPair}>
        <div>
          <p className={styles.statLine}>Biomass, X(t)</p>
          {mk("biomass", "Biomass X (g/L)", fmt(1))}
        </div>
        <div>
          <p className={styles.statLine}>Nanobody, P(t)</p>
          {mk("nanobody", "Nanobody P (mg/L)", fmt(0))}
        </div>
      </div>
    </ChartPanel>
  );
}

// ---- O2 viability sweeps (yeast / bacillus / pichia) -----------------
// `d.anaerobicNitrateGrowth` (Bacillus only) adds the anaerobic-with-nitrate
// growth rate as a reference line; the swept curve itself has no nitrate.
// Stacked rather than a chartPair: side by side, each SVG scales to half the
// column and its axis text shrinks to ~6px.
function O2SweepPanel({ title, d }) {
  const nitrate = d.anaerobicNitrateGrowth != null;
  const hLines = [{ y: d.viabilityThreshold, label: `5% viability (${d.viabilityThreshold.toFixed(4)})`, color: AMBER }];
  if (nitrate) {
    hLines.push({ y: d.anaerobicNitrateGrowth, label: `anaerobic + nitrate (${d.anaerobicNitrateGrowth.toFixed(4)})`, color: MUTED });
  }
  const vLines = [{ x: d.minViableO2, label: `min viable O2 = ${d.minViableO2.toFixed(3)}`, color: VIOLET }];
  return (
    <ChartPanel title={title}>
      <div className={styles.chartStack}>
        <div>
          <p className={styles.statLine}>Growth rate vs. O2 uptake</p>
          <LineChart
            series={[{ label: nitrate ? "Growth rate, no nitrate" : "Growth rate", color: BLUE, x: d.o2, y: d.growth }]}
            hLines={hLines}
            vLines={vLines}
            xLabel="O2 uptake (mmol/gDW/h)"
            yLabel="Growth rate (h⁻¹)"
            formatX={fmt(2)}
            formatY={fmt(3)}
            height={300}
          />
        </div>
        <div>
          <p className={styles.statLine}>CO2 secretion vs. O2 uptake</p>
          <LineChart
            series={[{ label: "CO2 secretion", color: GREEN, x: d.o2, y: d.co2 }]}
            vLines={vLines}
            xLabel="O2 uptake (mmol/gDW/h)"
            yLabel="CO2 secretion (mmol/gDW/h)"
            formatX={fmt(2)}
            formatY={fmt(1)}
            height={300}
          />
        </div>
      </div>
      {nitrate ? (
        <p className={styles.statLine}>
          Max growth <b>{d.maxGrowth.toFixed(4)} h⁻¹</b>; at zero O2 uptake, no nitrate: growth{" "}
          <b>{d.growth[0].toFixed(4)} h⁻¹</b>, CO2 <b>{d.co2[0].toFixed(4)} mmol/gDW/h</b>.
        </p>
      ) : (
        <p className={styles.statLine}>
          Max growth <b>{d.maxGrowth.toFixed(4)} h⁻¹</b>; at the minimum viable O2 uptake (
          <b>{d.minViableO2.toFixed(4)}</b>): growth <b>{d.growthAtMin.toFixed(4)} h⁻¹</b>, CO2{" "}
          <b>{d.co2AtMin.toFixed(4)} mmol/gDW/h</b>.
        </p>
      )}
    </ChartPanel>
  );
}

function CombinedProductionPanel({ title, d }) {
  return (
    <ChartPanel title={title}>
      <LineChart
        series={[{ label: "Combined GFP + nanobody flux", color: RED, x: d.o2, y: d.combined }]}
        vLines={[{ x: d.minViableO2, label: "min viable O2", color: AMBER }]}
        xLabel="O2 uptake (mmol/gDW/h)"
        yLabel="Combined production flux (mmol/gDW/h)"
        formatX={fmt(2)}
        formatY={fmt(4)}
      />
      <p className={styles.statLine}>
        Combined flux at the minimum viable O2 uptake: <b>{d.productionAtMin.toFixed(4)} mmol/gDW/h</b>
      </p>
    </ChartPanel>
  );
}

function NanobodyByConstructBars({ title, d }) {
  const bars = d.constructs.flatMap((c) => [
    { label: `${c.name} (aerobic)`, value: c.aerobic, color: BLUE },
    { label: `${c.name} (anaerobic)`, value: c.anaerobic, color: RED },
  ]);
  return (
    <ChartPanel title={title}>
      <BarChart bars={bars} unit=" mmol/gDW/h" formatValue={fmt(4)} />
    </ChartPanel>
  );
}

function YeastO2Sweep() {
  return <O2SweepPanel title="S. cerevisiae — O2 requirement and CO2 output" d={data["yeast-o2-sweep"]} />;
}
function YeastCombinedProductionSweep() {
  return (
    <CombinedProductionPanel
      title="S. cerevisiae — combined GFP + nanobody flux vs. O2"
      d={data["yeast-combined-production-vs-o2"]}
    />
  );
}
function YeastNanobodyByConstruct() {
  return <NanobodyByConstructBars title="S. cerevisiae — maximum nanobody flux by construct" d={data["yeast-nanobody-by-construct"]} />;
}

function BacillusO2Sweep() {
  return <O2SweepPanel title="B. subtilis — O2 requirement and CO2 output" d={data["bacillus-o2-sweep"]} />;
}
function BacillusCombinedProductionSweep() {
  return (
    <CombinedProductionPanel
      title="B. subtilis — combined GFP + nanobody flux vs. O2"
      d={data["bacillus-combined-production-vs-o2"]}
    />
  );
}
function BacillusNanobodyByConstruct() {
  return <NanobodyByConstructBars title="B. subtilis — maximum nanobody flux by construct" d={data["bacillus-nanobody-by-construct"]} />;
}

function PichiaO2Sweep() {
  return <O2SweepPanel title="P. pastoris — O2 requirement and CO2 output" d={data["pichia-o2-sweep"]} />;
}
function PichiaCombinedProductionSweep() {
  return (
    <CombinedProductionPanel
      title="P. pastoris — combined GFP + nanobody flux vs. O2"
      d={data["pichia-combined-production-vs-o2"]}
    />
  );
}

// ---- GEM bar charts ------------------------------------------------
function YeastAerobicAnaerobic() {
  const d = data["yeast-aerobic-anaerobic"];
  return (
    <ChartPanel title="Yeast — aerobic vs. anaerobic growth">
      <BarChart
        bars={[
          { label: "Aerobic", value: d.aerobic, color: BLUE },
          { label: "Anaerobic", value: d.anaerobic, color: RED },
        ]}
        unit=" h⁻¹"
      />
    </ChartPanel>
  );
}

function BacillusAerobicAnaerobic() {
  const d = data["bacillus-aerobic-anaerobic"];
  return (
    <ChartPanel title="Bacillus — aerobic vs. anaerobic growth">
      <BarChart
        bars={[
          { label: "Aerobic", value: d.aerobic, color: BLUE },
          // Nitrate respiration, not fermentation: the anaerobic bar is the
          // EX_no3_e >= -10 run (see data.js's note on this key).
          { label: "Anaerobic (+ nitrate)", value: d.anaerobic, color: RED },
        ]}
        unit=" h⁻¹"
      />
    </ChartPanel>
  );
}

function BacillusGlucoseVsSucrose() {
  const d = data["bacillus-glucose-vs-sucrose"];
  const mk = (aerKey, anaerKey) =>
    ["glucose", "sucrose"].flatMap((sugar) => {
      const name = sugar === "glucose" ? "Glucose" : "Sucrose";
      return [
        { label: `${name} aerobic`, value: d[sugar][aerKey], color: BLUE },
        { label: `${name} anaerobic`, value: d[sugar][anaerKey], color: RED },
      ];
    });
  return (
    <ChartPanel
      title="B. subtilis — glucose vs. sucrose"
      sub="Uptake 5 mmol/gDW/h; 6 C per glucose, 12 C per sucrose."
      legend={<Legend items={[{ label: "Aerobic", color: BLUE }, { label: "Anaerobic", color: RED }]} />}
    >
      <div className={styles.chartPair}>
        <div>
          <p className={styles.statLine}>Total growth rate (h⁻¹)</p>
          <BarChart bars={mk("aerobic", "anaerobic")} formatValue={fmt(4)} />
        </div>
        <div>
          <p className={styles.statLine}>Growth per mmol carbon (h⁻¹ / mmol C)</p>
          <BarChart bars={mk("aerobicPerC", "anaerobicPerC")} formatValue={fmt(5)} />
        </div>
      </div>
    </ChartPanel>
  );
}

// ---- Cyanobacteria GEM sweeps ------------------------------------------
function CyanoCo2Hco3() {
  const d = data["cyano-co2-hco3-bounds"];
  return (
    <ChartPanel title="Growth rate vs. CO2/HCO3 uptake bound">
      <LineChart
        series={[{ label: "Growth rate", color: BLUE, x: d.co2Values, y: d.growthRates }]}
        vLines={[
          { x: d.marsCO2, label: "Mars-analog bound", color: GREEN },
          { x: d.defaultCO2, label: "model default", color: MUTED },
        ]}
        points={[{ x: d.marsCO2, y: d.growthAtMars, label: "Mars", color: GREEN }]}
        xLabel="CO2/HCO3 uptake bound (mmol/gDW/h)"
        yLabel="Growth rate (h⁻¹)"
        formatX={fmt(1)}
        formatY={fmt(2)}
      />
      <p className={styles.statLine}>
        At the Mars-analog bound (5.1): <b>{d.growthAtMars.toFixed(4)} h⁻¹</b>
      </p>
    </ChartPanel>
  );
}

function CyanoCnBof() {
  const d = data["cyano-cn-bof"];
  return (
    <ChartPanel title="C×N co-limitation of growth" sub="Phosphate held at model default (PI = 0.2).">
      <Heatmap
        matrix={d.grid}
        xValues={d.co2Range}
        yValues={d.nh4Range}
        xLabel="CO2/HCO3 bound (mmol/gDW/h)"
        yLabel="NH4 bound (mmol/gDW/h)"
        valueLabel="Growth rate (h⁻¹)"
        formatX={fmt(1)}
        formatY={fmt(1)}
        formatV={fmt(3)}
        marker={{ x: d.elbowCO2, y: d.elbowNH4 }}
      />
      <p className={styles.statLine}>
        Plateau <b>{d.maxGrowth.toFixed(4)} h⁻¹</b> reached from CO2=<b>{d.elbowCO2.toFixed(2)}</b>, NH4=<b>{d.elbowNH4.toFixed(2)}</b>
      </p>
    </ChartPanel>
  );
}

function CyanoLimitingFactors() {
  const d = data["cyano-limiting-factors"];
  return (
    <ChartPanel title="Sequential nutrient co-limitation cascade" sub="Mars-analog photon bound held at 145 mmol/gDW/h throughout.">
      <BarChart
        bars={d.stages.map((s, i) => ({ label: s, value: d.values[i], color: [BLUE, AMBER, GREEN][i] }))}
        unit=" h⁻¹"
      />
    </ChartPanel>
  );
}

function CyanoCpnIncreased() {
  const d = data["cyano-cpn-increased"];
  return (
    <ChartPanel
      title="Growth rate as CO2, NH4 and PI are increased simultaneously"
      sub="Bounds scaled proportionally toward the converged targets."
    >
      <div className={styles.chartStack}>
        <LineChart
          series={[{ label: "Growth rate", color: GREEN, x: d.scaleFactors, y: d.growthRates }]}
          vLines={[{ x: d.plateauScale, label: `plateau (scale=${d.plateauScale.toFixed(2)})`, color: RED }]}
          xLabel="Scale factor (1.0 = converged bounds)"
          yLabel="Growth rate (h⁻¹)"
          xDomain={[0, 1.5]}
          formatX={fmt(2)}
          formatY={fmt(2)}
          height={220}
        />
        <LineChart
          series={[
            { label: `CO2/HCO3 (target=${d.co2Target.toFixed(2)})`, color: BLUE, x: d.scaleFactors, y: d.scaleFactors.map((s) => s * d.co2Target) },
            { label: `NH4 (target=${d.nh4Target.toFixed(2)})`, color: AMBER, x: d.scaleFactors, y: d.scaleFactors.map((s) => s * d.nh4Target) },
            { label: `PI (target=${d.piTarget.toFixed(2)})`, color: VIOLET, x: d.scaleFactors, y: d.scaleFactors.map((s) => s * d.piTarget) },
          ]}
          vLines={[{ x: d.plateauScale, label: "", color: RED }]}
          xLabel="Scale factor"
          yLabel="Uptake bound (mmol/gDW/h)"
          xDomain={[0, 1.5]}
          formatX={fmt(2)}
          formatY={fmt(1)}
          height={220}
        />
      </div>
      <Legend
        items={[
          { label: "Growth rate", color: GREEN },
          { label: "CO2/HCO3", color: BLUE },
          { label: "NH4", color: AMBER },
          { label: "PI", color: VIOLET },
        ]}
      />
    </ChartPanel>
  );
}

function CyanoSucroseVsGrowth() {
  const d = data["cyano-sucrose-vs-growth"];
  return (
    <ChartPanel title="Sucrose secretion vs. growth trade-off" sub="iMS837 + cscB, S. elongatus PCC 7942 (CO2/HCO3 = 5.1 mmol/gDW/h).">
      <LineChart
        series={[{ label: "Max sucrose export", color: AMBER, x: d.biomassNorm, y: d.sucroseFluxes }]}
        xLabel="Biomass flux (fraction of max achievable growth)"
        yLabel="Max sucrose export flux (mmol/gDW/h)"
        xDomain={[0, 1]}
        formatX={fmt(1)}
        formatY={fmt(2)}
      />
    </ChartPanel>
  );
}

// Map of data-chart slot id (see dry-lab-overview.md) -> rendered chart.
const CHARTS = {
  workflow: <WorkflowDiagram />,
  "yeast-model1-induction-times": <YeastModel1 />,
  "yeast-constitutive-vs-inducible": <YeastConstitutiveVsInducible />,
  "yeast-resource-simulation": <YeastResourceSimulation />,
  "yeast-induction-scan": <YeastInductionScan />,
  "yeast-yield-loss-heatmap": <YeastYieldLossHeatmap />,
  "bacillus-fig2-sugar-nitrogen": <BacillusFig2 />,
  "bacillus-fig6-final-nanobody": <BacillusFig6 />,
  "bacillus-fig8-heatmap": <BacillusFig8 />,
  "bacillus-fig9-multi-induction": <BacillusFig9 />,
  "yeast-aerobic-anaerobic": <YeastAerobicAnaerobic />,
  "bacillus-aerobic-anaerobic": <BacillusAerobicAnaerobic />,
  "bacillus-glucose-vs-sucrose": <BacillusGlucoseVsSucrose />,
  "yeast-o2-sweep": <YeastO2Sweep />,
  "yeast-combined-production-vs-o2": <YeastCombinedProductionSweep />,
  "yeast-nanobody-by-construct": <YeastNanobodyByConstruct />,
  "bacillus-o2-sweep": <BacillusO2Sweep />,
  "bacillus-combined-production-vs-o2": <BacillusCombinedProductionSweep />,
  "bacillus-nanobody-by-construct": <BacillusNanobodyByConstruct />,
  "pichia-o2-sweep": <PichiaO2Sweep />,
  "pichia-combined-production-vs-o2": <PichiaCombinedProductionSweep />,
  "cyano-co2-hco3-bounds": <CyanoCo2Hco3 />,
  "cyano-cn-bof": <CyanoCnBof />,
  "cyano-limiting-factors": <CyanoLimitingFactors />,
  "cyano-cpn-increased": <CyanoCpnIncreased />,
  "cyano-sucrose-vs-growth": <CyanoSucroseVsGrowth />,
};

export default CHARTS;
