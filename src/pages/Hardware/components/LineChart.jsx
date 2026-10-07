import { useState } from "react";
import { useTooltip } from "../../../components/Tooltip/Tooltip";
import styles from "../Hardware.module.scss";

// Small hand-built SVG line chart shared by the Hardware page's validation
// figures (temperature, pH, growth) — same no-library approach as Model's
// charts (see .claude/ARTICLE-STANDARDS.md §7), ported from the team's page
// export. Hover snaps a crosshair to the nearest measurement and shows it in
// the site's shared tooltip (SectionedArticle already wraps every section in
// a TooltipProvider).
const W = 760;
const H = 400;
const M = { l: 56, r: 20, t: 16, b: 52 };
const IW = W - M.l - M.r;
const IH = H - M.t - M.b;

export default function LineChart({
  points, // [[x, y], ...] in data units (after xOf)
  xOf = (p) => p[0],
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  yTickFormat = (v) => v,
  xLabel,
  yLabel,
  fit, // optional (x) => y; drawn as the line instead of joining the points
  setpoint, // optional { y, label }
  dotR, // draw every point as a dot of this radius
  tip, // (point) => tooltip content
  ariaLabel,
}) {
  const { show, hide } = useTooltip();
  const [active, setActive] = useState(-1);
  const [x0, x1] = xDomain;
  const [y0, y1] = yDomain;
  const X = (v) => M.l + ((v - x0) / (x1 - x0)) * IW;
  const Y = (v) => M.t + IH - ((v - y0) / (y1 - y0)) * IH;

  let d = "";
  if (fit) {
    for (let i = 0; i <= 200; i++) {
      const t = x0 + (i / 200) * (x1 - x0);
      d += `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(fit(t)).toFixed(1)}`;
    }
  } else {
    points.forEach((p, i) => {
      d += `${i ? "L" : "M"}${X(xOf(p)).toFixed(1)},${Y(p[1]).toFixed(1)}`;
    });
  }

  const onMove = (e) => {
    const r = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    let best = 0;
    let bd = Infinity;
    points.forEach((p, i) => {
      const dd = Math.abs(X(xOf(p)) - x);
      if (dd < bd) {
        bd = dd;
        best = i;
      }
    });
    setActive(best);
    show(e, tip(points[best]));
  };

  const onLeave = () => {
    setActive(-1);
    hide();
  };

  const a = active >= 0 ? points[active] : null;

  return (
    <div className={styles.chart} role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {yTicks.map((v) => (
          <g key={`y${v}`}>
            <line
              className={styles.gridline}
              x1={M.l}
              x2={W - M.r}
              y1={Y(v)}
              y2={Y(v)}
            />
            <text
              className={styles.tick}
              x={M.l - 10}
              y={Y(v) + 4}
              textAnchor="end"
            >
              {yTickFormat(v)}
            </text>
          </g>
        ))}
        {xTicks.map((v) => (
          <g key={`x${v}`}>
            <line
              className={`${styles.gridline} ${styles.gridlineV}`}
              x1={X(v)}
              x2={X(v)}
              y1={M.t}
              y2={M.t + IH}
            />
            <text
              className={styles.tick}
              x={X(v)}
              y={M.t + IH + 20}
              textAnchor="middle"
            >
              {v}
            </text>
          </g>
        ))}
        <line
          className={styles.axis}
          x1={M.l}
          x2={W - M.r}
          y1={M.t + IH}
          y2={M.t + IH}
        />
        <text
          className={styles.axisTitle}
          x={M.l + IW / 2}
          y={H - 8}
          textAnchor="middle"
        >
          {xLabel}
        </text>
        <text
          className={styles.axisTitle}
          transform={`translate(14,${M.t + IH / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          {yLabel}
        </text>

        {setpoint && (
          <>
            <line
              className={styles.setpoint}
              x1={M.l}
              x2={W - M.r}
              y1={Y(setpoint.y)}
              y2={Y(setpoint.y)}
            />
            <text
              className={styles.setpointLabel}
              x={M.l + 8}
              y={Y(setpoint.y) - 7}
            >
              {setpoint.label}
            </text>
          </>
        )}

        <path className={styles.line} d={d} />

        {dotR &&
          points.map((p, i) => (
            <circle
              key={i}
              className={styles.dot}
              cx={X(xOf(p))}
              cy={Y(p[1])}
              r={i === active ? dotR + 2 : dotR}
            />
          ))}

        {a && (
          <>
            <line
              className={styles.crosshair}
              x1={X(xOf(a))}
              x2={X(xOf(a))}
              y1={M.t}
              y2={M.t + IH}
            />
            {!dotR && (
              <circle
                className={styles.dot}
                cx={X(xOf(a))}
                cy={Y(a[1])}
                r={5}
              />
            )}
          </>
        )}

        <rect
          x={M.l}
          y={M.t}
          width={IW}
          height={IH}
          fill="transparent"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={onLeave}
        />
      </svg>
    </div>
  );
}
