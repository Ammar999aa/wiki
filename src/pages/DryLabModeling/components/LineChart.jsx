import { useMemo, useRef } from "react";
import styles from "../DryLabModeling.module.scss";
import { useTooltip } from "../../../components/Tooltip/Tooltip";

const W = 640;
const H = 360;
const M = { t: 14, r: 18, b: 44, l: 52 };

function niceTicks(domain, count = 5) {
  const [lo, hi] = domain;
  const span = hi - lo || 1;
  const step = span / (count - 1);
  return Array.from({ length: count }, (_, i) => lo + step * i);
}

// A multi-series SVG line chart shared by every continuous-curve figure on
// this page (induction-time trajectories, sweeps, resource depletion, ...).
// `series`: [{ label, color, x: [...], y: [...], dashed? }]
// `vLines`: [{ x, label, color? }] vertical reference lines (e.g. an
//   induction time or an optimum), drawn full chart height.
// `hLines`: [{ y, label, color? }] horizontal reference lines (e.g. a
//   viability threshold), drawn full chart width.
// `points`: [{ x, y, color, label }] highlighted markers (e.g. a peak).
export default function LineChart({
  series,
  xDomain,
  yDomain,
  xLabel,
  yLabel,
  xTicks,
  yTicks,
  vLines = [],
  hLines = [],
  points = [],
  formatX = (v) => v.toFixed(0),
  formatY = (v) => v.toFixed(2),
  height = H,
}) {
  const { show, hide } = useTooltip();
  const svgRef = useRef(null);

  const xd = xDomain ?? [Math.min(...series.flatMap((s) => s.x)), Math.max(...series.flatMap((s) => s.x))];
  const yd = yDomain ?? [0, Math.max(...series.flatMap((s) => s.y)) * 1.08];

  const x0 = M.l, x1 = W - M.r, y0 = height - M.b, y1 = M.t;
  const X = (v) => x0 + ((v - xd[0]) / (xd[1] - xd[0] || 1)) * (x1 - x0);
  const Y = (v) => y0 - ((v - yd[0]) / (yd[1] - yd[0] || 1)) * (y0 - y1);

  const xt = xTicks ?? niceTicks(xd, 5);
  const yt = yTicks ?? niceTicks(yd, 5);

  const paths = useMemo(
    () =>
      series.map((s) => ({
        ...s,
        d: s.x.map((xv, i) => `${i === 0 ? "M" : "L"}${X(xv).toFixed(1)},${Y(s.y[i]).toFixed(1)}`).join(""),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [series, xd[0], xd[1], yd[0], yd[1], height]
  );

  const onMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const xv = xd[0] + ((px - x0) / (x1 - x0)) * (xd[1] - xd[0]);
    if (xv < xd[0] || xv > xd[1]) return;

    const rows = series.map((s) => {
      let lo = 0;
      for (let i = 1; i < s.x.length; i++) if (Math.abs(s.x[i] - xv) < Math.abs(s.x[lo] - xv)) lo = i;
      return { label: s.label, color: s.color, y: s.y[lo], x: s.x[lo] };
    });

    show(
      e,
      <>
        <span className={styles.tipTitle}>{xLabel} = {formatX(rows[0].x)}</span>
        {rows.map((r) => (
          <div className={styles.tipRow} key={r.label}>
            <span>
              <i className={styles.swatch} style={{ background: r.color, display: "inline-block", width: 7, height: 7, marginRight: 5 }} />
              {r.label}
            </span>
            <span>{formatY(r.y)}</span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.chartScroll}>
      <svg
        ref={svgRef}
        className={styles.chartSvg}
        viewBox={`0 0 ${W} ${height}`}
        role="img"
        aria-label={`Line chart of ${yLabel} vs ${xLabel}`}
      >
        {yt.map((t) => (
          <g key={`y${t}`}>
            <line className={styles.gridline} x1={x0} y1={Y(t)} x2={x1} y2={Y(t)} />
            <text className={styles.axl} x={x0 - 8} y={Y(t) + 3.5} textAnchor="end">
              {formatY(t)}
            </text>
          </g>
        ))}
        {xt.map((t) => (
          <text key={`x${t}`} className={styles.axl} x={X(t)} y={y0 + 18} textAnchor="middle">
            {formatX(t)}
          </text>
        ))}
        <line className={styles.axline} x1={x0} y1={y0} x2={x1} y2={y0} />
        <line className={styles.axline} x1={x0} y1={y0} x2={x0} y2={y1} />

        {vLines.map((v) => (
          <g key={v.label}>
            <line className={styles.refline} x1={X(v.x)} y1={y0} x2={X(v.x)} y2={y1} stroke={v.color} />
            <text className={`${styles.axl} ${styles.reflabel}`} x={X(v.x) + 5} y={y1 + 10} textAnchor="start">
              {v.label}
            </text>
          </g>
        ))}

        {hLines.map((hl) => (
          <g key={hl.label}>
            <line className={styles.refline} x1={x0} y1={Y(hl.y)} x2={x1} y2={Y(hl.y)} stroke={hl.color} />
            <text className={`${styles.axl} ${styles.reflabel}`} x={x1 - 5} y={Y(hl.y) - 5} textAnchor="end">
              {hl.label}
            </text>
          </g>
        ))}

        {paths.map((s) => (
          <path key={s.label} className={s.dashed ? styles.lineDashed : styles.line} d={s.d} stroke={s.color} />
        ))}

        {points.map((p) => (
          <circle key={p.label} className={styles.dot} cx={X(p.x)} cy={Y(p.y)} r={5} fill={p.color} />
        ))}

        <text className={styles.axl} x={(x0 + x1) / 2} y={height - 6} textAnchor="middle" style={{ letterSpacing: ".08em" }}>
          {xLabel}
        </text>
        <text
          className={styles.axl}
          transform={`translate(13,${(y0 + y1) / 2}) rotate(-90)`}
          textAnchor="middle"
          style={{ letterSpacing: ".08em" }}
        >
          {yLabel}
        </text>

        <rect
          className={styles.hitArea}
          x={x0}
          y={y1}
          width={x1 - x0}
          height={y0 - y1}
          onMouseMove={onMove}
          onMouseLeave={hide}
        />
      </svg>
    </div>
  );
}
