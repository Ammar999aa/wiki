import styles from "../Model.module.scss";
import { CANDIDATES, F, catOf } from "../data";
import { useTooltip } from "./Tooltip";

const FAMS = ["csp", "ibpA", "recA", "mutS", "uvrA", "uvrB", "uvrC", "phrB", "narI/narJ", "frdC/frdD", "otsB", "ectA"];

function famOf(gene) {
  if (gene === "cspC") return "csp";
  if (gene === "narI" || gene === "narJ") return "narI/narJ";
  if (gene === "frdC" || gene === "frdD") return "frdC/frdD";
  return gene;
}

// Figure 6 — ORF completeness strip plot by gene family, one mark per
// candidate, jittered within its family band so overlapping candidates
// stay distinguishable.
export default function OrfChart() {
  const { show, hide } = useTooltip();

  const W = 860;
  const H = 380;
  const m = { t: 14, r: 18, b: 74, l: 52 };
  const x0 = m.l;
  const x1 = W - m.r;
  const y0 = H - m.b;
  const y1 = m.t;
  const Y = (v) => y0 - (Math.min(v, 115) / 115) * (y0 - y1);
  const band = (x1 - x0) / FAMS.length;

  return (
    <div className={styles.chartScroll}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Strip plot of ORF completeness percentage by gene family across 45 candidates"
      >
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line className={styles.gridline} x1={x0} y1={Y(t)} x2={x1} y2={Y(t)} />
            <text className={styles.axl} x={x0 - 10} y={Y(t) + 3.5} textAnchor="end">
              {t}%
            </text>
          </g>
        ))}
        <line className={styles.refline} x1={x0} y1={Y(100)} x2={x1} y2={Y(100)} />
        <rect x={x0} y={Y(60)} width={x1 - x0} height={y0 - Y(60)} fill="var(--doc-critical)" opacity={0.08} />
        <text
          className={styles.axl}
          x={x1 - 6}
          y={Y(60) - 7}
          textAnchor="end"
          style={{ fill: "var(--doc-critical)", opacity: 0.85 }}
        >
          below 60% — not orderable as a complete gene
        </text>
        <text className={styles.axl} x={x1 - 6} y={Y(100) - 7} textAnchor="end" style={{ fill: "var(--doc-faint)" }}>
          full length
        </text>
        <line className={styles.axline} x1={x0} y1={y0} x2={x1} y2={y0} />
        <text
          className={styles.axl}
          transform={`translate(13,${(y0 + y1) / 2}) rotate(-90)`}
          textAnchor="middle"
          style={{ letterSpacing: ".12em" }}
        >
          ORF COMPLETENESS
        </text>

        {FAMS.map((f, fi) => {
          const cx = x0 + band * (fi + 0.5);
          const rows = CANDIDATES.filter((r) => famOf(r[F.gene]) === f);
          return (
            <g key={f}>
              <text
                className={styles.axl}
                x={cx}
                y={y0 + 17}
                textAnchor="end"
                transform={`rotate(-38,${cx},${y0 + 17})`}
                style={{ fontStyle: "italic", fontSize: 11 }}
              >
                {f}
              </text>
              {rows.map((r, ri) => {
                const jitter = rows.length === 1 ? 0 : (ri / (rows.length - 1) - 0.5) * Math.min(band * 0.52, 26);
                const cat = catOf(r[F.cat]);
                return (
                  <circle
                    key={r[F.loc]}
                    className={styles.dot}
                    cx={(cx + jitter).toFixed(1)}
                    cy={Y(r[F.orf]).toFixed(1)}
                    r={5.5}
                    fill={cat.color}
                    fillOpacity={0.88}
                    onMouseMove={(e) =>
                      show(
                        e,
                        <>
                          <span className={styles.tt}>
                            <i>{r[F.gene]}</i> · {r[F.loc]}
                          </span>
                          <div className={styles.tr}>
                            <span>ORF complete</span>
                            <span>{r[F.orf]}%</span>
                          </div>
                          <div className={styles.tr}>
                            <span>Length</span>
                            <span>{r[F.mw].toFixed(1)} kDa</span>
                          </div>
                          <div className={styles.tr}>
                            <span>CA-pLDDT</span>
                            <span>{r[F.plddt].toFixed(1)}</span>
                          </div>
                          {r[F.flag] && (
                            <div className={styles.tr} style={{ marginTop: 5 }}>
                              <span style={{ color: "var(--doc-critical)" }}>Flag</span>
                              <span style={{ color: "var(--doc-critical)" }}>{r[F.flag]}</span>
                            </div>
                          )}
                        </>
                      )
                    }
                    onMouseLeave={hide}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
