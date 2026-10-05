import { growthCurves, TEMP_COLORS } from "../data";
import styles from "../ExampleArticle.module.scss";

const W = 640;
const H = 360;
const M = { t: 14, r: 18, b: 44, l: 52 };
const X_DOMAIN = [0, 8]; // h
const Y_DOMAIN = [0, 1.4]; // OD600
const X_TICKS = [0, 2, 4, 6, 8];
const Y_TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4];

// Figure 3 of the example article: mean OD600 ± SD per temperature. Uses
// the markdown system's own `.panel`/`.panel-title` classes (global, see
// MARKDOWN-COMPONENTS.md) so it reads as the same kind of surface as the
// page's other figures; portalled into `<div data-chart="growth-curves">`
// by ChartSlots.
export default function GrowthChart() {
  const x0 = M.l, x1 = W - M.r, y0 = H - M.b, y1 = M.t;
  const X = (v) => x0 + ((v - X_DOMAIN[0]) / (X_DOMAIN[1] - X_DOMAIN[0])) * (x1 - x0);
  const Y = (v) => y0 - ((v - Y_DOMAIN[0]) / (Y_DOMAIN[1] - Y_DOMAIN[0])) * (y0 - y1);
  const { t, series } = growthCurves;

  return (
    <div className="panel">
      <div className="panel-title">
        <span>Growth curves · illustrative data</span>
        <span className={styles.legend}>
          {series.map((s) => (
            <span key={s.temp} className={styles.legendItem}>
              <i className={styles.swatch} style={{ background: TEMP_COLORS[s.temp] }} />
              {s.temp} °C
            </span>
          ))}
        </span>
      </div>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Line chart of OD600 against time at 25, 30 and 37 °C"
      >
        {Y_TICKS.map((v) => (
          <g key={`y${v}`}>
            <line className={styles.gridline} x1={x0} x2={x1} y1={Y(v)} y2={Y(v)} />
            <text className={styles.axl} x={x0 - 8} y={Y(v) + 3.5} textAnchor="end">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {X_TICKS.map((v) => (
          <text key={`x${v}`} className={styles.axl} x={X(v)} y={y0 + 18} textAnchor="middle">
            {v}
          </text>
        ))}
        <line className={styles.axline} x1={x0} x2={x1} y1={y0} y2={y0} />
        <line className={styles.axline} x1={x0} x2={x0} y1={y0} y2={y1} />

        {series.map((s) => {
          const color = TEMP_COLORS[s.temp];
          const d = t.map((tv, i) => `${i === 0 ? "M" : "L"}${X(tv).toFixed(1)},${Y(s.mean[i]).toFixed(1)}`).join("");
          return (
            <g key={s.temp}>
              <path d={d} fill="none" stroke={color} strokeWidth={2} />
              {t.map((tv, i) => (
                <g key={tv}>
                  <line
                    x1={X(tv)}
                    x2={X(tv)}
                    y1={Y(s.mean[i] - s.sd[i])}
                    y2={Y(s.mean[i] + s.sd[i])}
                    stroke={color}
                    strokeWidth={1.25}
                  />
                  <circle cx={X(tv)} cy={Y(s.mean[i])} r={3} fill={color} />
                </g>
              ))}
            </g>
          );
        })}

        <text className={styles.axl} x={(x0 + x1) / 2} y={H - 6} textAnchor="middle">
          Time (h)
        </text>
        <text className={styles.axl} transform={`translate(13,${(y0 + y1) / 2}) rotate(-90)`} textAnchor="middle">
          OD600 (blank-subtracted)
        </text>
      </svg>
    </div>
  );
}
