import { useEffect, useRef } from "react";
import styles from "../DryLabOverview.module.scss";
import { useChartTooltip } from "./Tooltip";

const W = 560;
const H = 340;
const M = { t: 10, r: 10, b: 44, l: 52 };

// Violet (low) -> tertiary blue (mid) -> amber (high), matching the site's
// own token colors rather than a generic viridis-style scale.
function colorAt(t) {
  const stops = [
    [62, 39, 84], // --primary-900
    [63, 111, 175], // --tertiary-500
    [255, 216, 77], // --amber
  ];
  const seg = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(seg));
  const f = seg - i;
  const [r0, g0, b0] = stops[i];
  const [r1, g1, b1] = stops[i + 1];
  const r = Math.round(r0 + (r1 - r0) * f);
  const g = Math.round(g0 + (g1 - g0) * f);
  const b = Math.round(b0 + (b1 - b0) * f);
  return `rgb(${r},${g},${b})`;
}

// Canvas-drawn heatmap (grid can run into the thousands of cells for the
// finer ODE sweeps, too many for individual SVG <rect> elements to stay
// smooth) with an SVG axis/hover overlay on top.
// `matrix`: value[yIndex][xIndex]; `xValues`/`yValues`: axis tick values,
// one per column/row.
export default function Heatmap({
  matrix,
  xValues,
  yValues,
  xLabel,
  yLabel,
  valueLabel,
  formatX = (v) => v.toFixed(0),
  formatY = (v) => v.toFixed(0),
  formatV = (v) => v.toFixed(3),
  marker, // { x, y, label }
  height = H,
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const { show, hide } = useChartTooltip();

  const x0 = M.l, x1 = W - M.r, y0 = height - M.b, y1 = M.t;
  const nx = xValues.length, ny = yValues.length;

  let vmin = Infinity, vmax = -Infinity;
  for (const row of matrix) for (const v of row) { if (v < vmin) vmin = v; if (v > vmax) vmax = v; }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = x1 - x0, ch = y0 - y1;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cellW = cw / nx, cellH = ch / ny;
    for (let yi = 0; yi < ny; yi++) {
      for (let xi = 0; xi < nx; xi++) {
        const v = matrix[yi][xi];
        const t = vmax > vmin ? (v - vmin) / (vmax - vmin) : 0;
        ctx.fillStyle = colorAt(t);
        // row 0 = lowest y-value; canvas y grows downward, so flip.
        ctx.fillRect(xi * cellW, ch - (yi + 1) * cellH, cellW + 0.5, cellH + 0.5);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix, nx, ny, height]);

  const onMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const scale = W / rect.width;
    const px = (e.clientX - rect.left) * scale;
    const py = (e.clientY - rect.top) * scale;
    if (px < x0 || px > x1 || py < y1 || py > y0) return hide();
    const xi = Math.min(nx - 1, Math.max(0, Math.floor(((px - x0) / (x1 - x0)) * nx)));
    const yi = Math.min(ny - 1, Math.max(0, Math.floor(((y0 - py) / (y0 - y1)) * ny)));
    show(
      e,
      <>
        <span className={styles.tipTitle}>
          {xLabel} = {formatX(xValues[xi])}, {yLabel} = {formatY(yValues[yi])}
        </span>
        <div className={styles.tipRow}>
          <span>{valueLabel}</span>
          <span>{formatV(matrix[yi][xi])}</span>
        </div>
      </>
    );
  };

  const xTickIdx = [0, Math.round((nx - 1) * 0.25), Math.round((nx - 1) * 0.5), Math.round((nx - 1) * 0.75), nx - 1];
  const yTickIdx = [0, Math.round((ny - 1) * 0.25), Math.round((ny - 1) * 0.5), Math.round((ny - 1) * 0.75), ny - 1];
  const Xp = (xi) => x0 + ((xi + 0.5) / nx) * (x1 - x0);
  const Yp = (yi) => y0 - ((yi + 0.5) / ny) * (y0 - y1);

  return (
    <div className={styles.heatRow}>
      <div className={styles.chartScroll} style={{ flex: 1 }} ref={wrapRef}>
        <svg className={styles.chartSvg} viewBox={`0 0 ${W} ${height}`} role="img" aria-label={`Heatmap of ${valueLabel}`}>
          <foreignObject x={x0} y={y1} width={x1 - x0} height={y0 - y1}>
            <canvas ref={canvasRef} />
          </foreignObject>

          {yTickIdx.map((yi) => (
            <text key={`y${yi}`} className={styles.axl} x={x0 - 8} y={Yp(yi) + 3.5} textAnchor="end">
              {formatY(yValues[yi])}
            </text>
          ))}
          {xTickIdx.map((xi) => (
            <text key={`x${xi}`} className={styles.axl} x={Xp(xi)} y={y0 + 18} textAnchor="middle">
              {formatX(xValues[xi])}
            </text>
          ))}
          <line className={styles.axline} x1={x0} y1={y0} x2={x1} y2={y0} />
          <line className={styles.axline} x1={x0} y1={y0} x2={x0} y2={y1} />

          {marker && (
            <>
              <circle cx={x0 + ((marker.x - xValues[0]) / (xValues[nx - 1] - xValues[0])) * (x1 - x0)}
                      cy={y0 - ((marker.y - yValues[0]) / (yValues[ny - 1] - yValues[0])) * (y0 - y1)}
                      r={5.5} className={styles.dot} fill="#FFD84D" />
            </>
          )}

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

          <rect x={x0} y={y1} width={x1 - x0} height={y0 - y1} fill="transparent"
                onMouseMove={onMove} onMouseLeave={hide} style={{ cursor: "crosshair" }} />
        </svg>
      </div>
      <div className={styles.colorbar}>
        <div
          className={styles.colorbarSwatch}
          style={{ background: `linear-gradient(to top, ${colorAt(0)}, ${colorAt(0.5)}, ${colorAt(1)})` }}
        />
        <span className={styles.colorbarLabel}>{valueLabel}</span>
      </div>
    </div>
  );
}
