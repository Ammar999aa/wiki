import styles from "../Model.module.scss";
import { CANDIDATES, F, catOf } from "../data";
import { useTooltip } from "../../../components/Tooltip/Tooltip";

// Figure 2 — instability index vs. CA-pLDDT for all 45 candidates, marker
// area ∝ molecular weight, with the two decision thresholds the score uses
// (instability < 40, pLDDT > 80) drawn as dashed guides.
export default function ScatterChart() {
  const { show, hide } = useTooltip();

  const W = 860;
  const H = 430;
  const m = { t: 16, r: 16, b: 52, l: 58 };
  const x0 = m.l;
  const x1 = W - m.r;
  const y0 = H - m.b;
  const y1 = m.t;
  const xd = [-6, 44];
  const yd = [45, 100];
  const X = (v) => x0 + ((v - xd[0]) / (xd[1] - xd[0])) * (x1 - x0);
  const Y = (v) => y0 - ((v - yd[0]) / (yd[1] - yd[0])) * (y0 - y1);

  const ordered = [...CANDIDATES].sort((a, b) => b[F.mw] - a[F.mw]);

  return (
    <div className={styles.chartScroll}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Scatter plot of instability index against CA-pLDDT for 45 candidates, coloured by stress category"
      >
        {[50, 60, 70, 80, 90, 100].map((t) => (
          <g key={`y${t}`}>
            <line className={styles.gridline} x1={x0} y1={Y(t)} x2={x1} y2={Y(t)} />
            <text className={styles.axl} x={x0 - 10} y={Y(t) + 3.5} textAnchor="end">
              {t}
            </text>
          </g>
        ))}
        {[0, 10, 20, 30, 40].map((t) => (
          <text key={`x${t}`} className={styles.axl} x={X(t)} y={y0 + 18} textAnchor="middle">
            {t}
          </text>
        ))}
        <line className={styles.axline} x1={x0} y1={y0} x2={x1} y2={y0} />

        <line className={styles.refline} x1={X(40)} y1={y1} x2={X(40)} y2={y0} />
        <text className={styles.axl} x={X(40) - 7} y={y1 + 12} textAnchor="end" style={{ fill: "var(--doc-faint)" }}>
          instability 40
        </text>
        <line className={styles.refline} x1={x0} y1={Y(80)} x2={x1} y2={Y(80)} />
        <text className={styles.axl} x={x1 - 4} y={Y(80) - 7} textAnchor="end" style={{ fill: "var(--doc-faint)" }}>
          pLDDT 80
        </text>

        <text className={styles.axl} x={(x0 + x1) / 2} y={H - 12} textAnchor="middle" style={{ letterSpacing: ".12em" }}>
          INSTABILITY INDEX &nbsp;&rarr;&nbsp; less stable
        </text>
        <text
          className={styles.axl}
          transform={`translate(15,${(y0 + y1) / 2}) rotate(-90)`}
          textAnchor="middle"
          style={{ letterSpacing: ".12em" }}
        >
          CA-pLDDT &nbsp;&rarr;&nbsp; more confident
        </text>

        {ordered.map((r) => {
          const rad = 4.5 + Math.sqrt(r[F.mw]) * 0.95;
          const cat = catOf(r[F.cat]);
          return (
            <circle
              key={r[F.loc]}
              className={styles.dot}
              cx={X(r[F.inst]).toFixed(1)}
              cy={Y(r[F.plddt]).toFixed(1)}
              r={rad.toFixed(1)}
              fill={cat.color}
              fillOpacity={0.85}
              onMouseMove={(e) =>
                show(
                  e,
                  <>
                    <span className={styles.tt}>
                      <i>{r[F.gene]}</i> · {r[F.loc]}
                    </span>
                    <div className={styles.tr}>
                      <span>Organism</span>
                      <span>{r[F.org]}</span>
                    </div>
                    <div className={styles.tr}>
                      <span>MW</span>
                      <span>{r[F.mw].toFixed(1)} kDa</span>
                    </div>
                    <div className={styles.tr}>
                      <span>pI</span>
                      <span>{r[F.pi].toFixed(2)}</span>
                    </div>
                    <div className={styles.tr}>
                      <span>Instability</span>
                      <span>{r[F.inst].toFixed(1)}</span>
                    </div>
                    <div className={styles.tr}>
                      <span>CA-pLDDT</span>
                      <span>{r[F.plddt].toFixed(1)}</span>
                    </div>
                    <div className={styles.tr}>
                      <span>ORF complete</span>
                      <span>{r[F.orf]}%</span>
                    </div>
                    <div className={styles.tr}>
                      <span>Composite</span>
                      <span>{r[F.score].toFixed(3)}</span>
                    </div>
                    {r[F.flag] && (
                      <div className={styles.tr} style={{ marginTop: 5, color: "var(--doc-critical)" }}>
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
      </svg>
    </div>
  );
}
