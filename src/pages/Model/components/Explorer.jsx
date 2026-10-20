import { useMemo, useState } from "react";
import styles from "../Model.module.scss";
import { CANDIDATES, CATS, F, catOf, gateStatus } from "../data";

const COLUMNS = [
  { key: "mw", label: "MW kDa" },
  { key: "pi", label: "pI" },
  { key: "inst", label: "Instab." },
  { key: "plddt", label: "CA-pLDDT" },
  { key: "orf", label: "ORF %" },
  { key: "score", label: "Score" },
];

// Table 6 — every surviving candidate, filterable by category and by
// synthesis-ready/flagged status, sortable on any numeric column.
export default function Explorer() {
  const [cat, setCat] = useState("all");
  const [readyOnly, setReadyOnly] = useState(false);
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [sortKey, setSortKey] = useState("plddt");
  const [sortDir, setSortDir] = useState("desc");

  const rows = useMemo(() => {
    let out = CANDIDATES.filter((r) => {
      if (cat !== "all" && r[F.cat] !== cat) return false;
      if (flaggedOnly && !r[F.flag]) return false;
      if (readyOnly && gateStatus(r).tone !== "good") return false;
      return true;
    });
    const k = F[sortKey];
    const sgn = sortDir === "desc" ? -1 : 1;
    out = [...out].sort((a, b) => sgn * (a[k] - b[k]));
    return out;
  }, [cat, readyOnly, flaggedOnly, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const activeLabel = COLUMNS.find((c) => c.key === sortKey)?.label;

  return (
    <div className={styles.bleed}>
      <div className={styles.tools}>
        <button
          type="button"
          className={styles.chip}
          aria-pressed={cat === "all"}
          onClick={() => setCat("all")}
        >
          All 45
        </button>
        {CATS.map((c) => (
          <button
            key={c.key}
            type="button"
            className={styles.chip}
            aria-pressed={cat === c.key}
            onClick={() => setCat(c.key)}
          >
            <i className={styles.swatch} style={{ background: c.color }} />
            {c.chip ?? c.name} · {c.n}
          </button>
        ))}
        <span className={styles.toolsSpacer} />
        <button
          type="button"
          className={styles.chip}
          aria-pressed={readyOnly}
          onClick={() => setReadyOnly((v) => !v)}
        >
          Synthesis-ready only · 19
        </button>
        <button
          type="button"
          className={styles.chip}
          aria-pressed={flaggedOnly}
          onClick={() => setFlaggedOnly((v) => !v)}
        >
          Flagged only
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gene</th>
              <th>Locus</th>
              <th>Source organism</th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className={`${styles.num} ${styles.sortable}`}
                  data-dir={sortKey === c.key ? sortDir : undefined}
                  onClick={() => toggleSort(c.key)}
                >
                  {c.label}
                </th>
              ))}
              <th>Locked rule</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const c = catOf(r[F.cat]);
              const sev = r[F.orf] < 60 ? "cr" : r[F.flag] ? "wn" : "";
              const g = gateStatus(r);
              return (
                <tr key={r[F.loc]}>
                  <td className={styles.gene}>
                    <i className={styles.swatch} style={{ background: c.color }} />
                    {r[F.gene]}
                  </td>
                  <td className={styles.locus}>{r[F.loc]}</td>
                  <td className={styles.org}>{r[F.org]}</td>
                  <td className={styles.num}>{r[F.mw].toFixed(1)}</td>
                  <td className={styles.num}>{r[F.pi].toFixed(2)}</td>
                  <td className={styles.num}>{r[F.inst].toFixed(1)}</td>
                  <td className={`${styles.num} ${styles.barCell}`}>
                    <span>{r[F.plddt].toFixed(1)}</span>
                    <span className={styles.mini}>
                      <i style={{ width: `${((r[F.plddt] - 45) / 55) * 100}%`, background: c.color }} />
                    </span>
                  </td>
                  <td className={`${styles.num} ${styles.barCell}`}>
                    <span>{r[F.orf]}</span>
                    <span className={styles.mini}>
                      <i
                        style={{
                          width: `${Math.min(100, r[F.orf])}%`,
                          background: r[F.orf] < 60 ? "var(--doc-critical)" : "var(--doc-good)",
                        }}
                      />
                    </span>
                  </td>
                  <td className={styles.num} style={{ fontWeight: 600 }}>
                    {r[F.score].toFixed(3)}
                  </td>
                  <td>
                    <span className={`${styles.pill} ${styles[g.tone]}`}>
                      {g.tone === "good" ? g.label : `Fails ${g.label}`}
                    </span>
                    {g.reason && (
                      <div style={{ fontFamily: "var(--doc-mono)", fontSize: 9.5, color: "var(--doc-muted)", marginTop: 3 }}>
                        {g.reason}
                      </div>
                    )}
                  </td>
                  <td>
                    {r[F.flag] ? (
                      <span className={`${styles.pill} ${styles[sev || "nu"]}`}>{r[F.flag]}</span>
                    ) : (
                      <span className={`${styles.pill} ${styles.ok}`}>clean</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.cap}>
        <b>Table 6.</b> Showing {rows.length} of 45 candidates, sorted by {activeLabel} (
        {sortDir === "desc" ? "high to low" : "low to high"}). Flags come from the §07 audits: ORF completeness,
        pseudogene calls, source-bin CheckM completeness, and ranking degeneracy. Clean means no audit raised
        anything.
      </p>
    </div>
  );
}
