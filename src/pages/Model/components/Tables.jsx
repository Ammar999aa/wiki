import styles from "../Model.module.scss";
import { TableWrap, Pill } from "./Ui";
import { Cref } from "./References";
import { CATS, DIMENSIONS, SOFTWARE, AUDIT_REGISTER, CHECKLIST, TIER1 } from "../data";

// Table 1 — one row per stress category.
export function CategoryTable() {
  return (
    <TableWrap>
      <thead>
        <tr>
          <th>Category</th>
          <th className={styles.num}>Candidates</th>
          <th className={styles.num}>Structures</th>
          <th className={styles.num}>GTDB-classified</th>
          <th>Gene families</th>
          <th>Ranking status</th>
        </tr>
      </thead>
      <tbody>
        {CATS.map((c) => (
          <tr key={c.key}>
            <td style={{ whiteSpace: "nowrap" }}>
              <i className={styles.swatch} style={{ background: c.color }} />
              {c.name}
            </td>
            <td className={styles.num}>{c.n}</td>
            <td className={styles.num}>{c.st}</td>
            <td className={styles.num}>{c.gtdb}</td>
            <td style={{ fontSize: 12, fontStyle: "italic" }}>{c.fams}</td>
            <td>
              <Pill tone={c.rc}>{c.rank}</Pill>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td className={styles.num}>45</td>
          <td className={styles.num}>45 / 45</td>
          <td className={styles.num}>33</td>
          <td>12 families</td>
          <td />
        </tr>
      </tfoot>
    </TableWrap>
  );
}

// Table 4 — the six scored dimensions and their weights.
export function DimensionTable() {
  return (
    <TableWrap>
      <thead>
        <tr>
          <th>Dimension</th>
          <th className={styles.num}>Weight</th>
          <th>Instrument</th>
          <th>Step function</th>
          <th>Rationale</th>
        </tr>
      </thead>
      <tbody>
        {DIMENSIONS.map((r) => (
          <tr key={r.dim}>
            <td style={{ fontWeight: 600, whiteSpace: "nowrap", color: "white" }}>{r.dim}</td>
            <td className={styles.num} style={{ fontWeight: 600, color: "var(--accent)" }}>
              {r.weight}
            </td>
            <td>{r.instrument}</td>
            <td style={{ fontFamily: "var(--doc-mono)", fontSize: 11.5, whiteSpace: "nowrap" }}>{r.step}</td>
            <td style={{ fontSize: 13.5 }}>{r.why}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

// Table 2 — what each pipeline stage actually runs.
export function SoftwareTable() {
  return (
    <TableWrap>
      <thead>
        <tr>
          <th>Stage</th>
          <th>Tool</th>
          <th>Version</th>
          <th>What it does here</th>
          <th className={styles.num}>Ref</th>
        </tr>
      </thead>
      <tbody>
        {SOFTWARE.map((r) => (
          <tr key={r.tool}>
            <td style={{ color: "var(--doc-muted)", whiteSpace: "nowrap" }}>{r.stage}</td>
            <td style={{ fontWeight: 600, whiteSpace: "nowrap", color: "white" }}>{r.tool}</td>
            <td
              style={{
                fontFamily: "var(--doc-mono)",
                fontSize: 11.5,
                whiteSpace: "nowrap",
                color: r.version === "not recorded" ? "var(--doc-faint)" : "rgba(255,255,255,0.75)",
              }}
            >
              {r.version}
            </td>
            <td style={{ fontSize: 13.5 }}>{r.desc}</td>
            <td className={styles.num} style={{ fontSize: 11.5, whiteSpace: "nowrap" }}>
              [{r.refs.map((n, i) => (
                <span key={n}>
                  {i > 0 && ", "}
                  <Cref n={n} />
                </span>
              ))}]
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

// Full audit register (inside the §07 expandable).
export function AuditTable() {
  return (
    <TableWrap>
      <thead>
        <tr>
          <th>ID</th>
          <th>Audit</th>
          <th>Outcome</th>
        </tr>
      </thead>
      <tbody>
        {AUDIT_REGISTER.map((r) => (
          <tr key={r.id}>
            <td style={{ fontFamily: "var(--doc-mono)", color: "var(--accent)", fontWeight: 600 }}>{r.id}</td>
            <td style={{ whiteSpace: "nowrap" }}>{r.audit}</td>
            <td style={{ fontSize: 13.5 }}>{r.outcome}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

// Table 9 — the transferable dry-lab audit checklist.
export function ChecklistTable() {
  return (
    <TableWrap>
      <thead>
        <tr>
          <th>Check</th>
          <th>What it asks</th>
          <th>What it caught here</th>
          <th className={styles.num}>Cost</th>
        </tr>
      </thead>
      <tbody>
        {CHECKLIST.map((r) => (
          <tr key={r.check}>
            <td style={{ fontWeight: 600, whiteSpace: "nowrap", color: "white" }}>{r.check}</td>
            <td style={{ fontSize: 13.5 }}>{r.asks}</td>
            <td style={{ fontSize: 13.5 }}>{r.caught}</td>
            <td className={styles.num}>
              <Pill tone={r.cost === "Low" ? "good" : "warn"}>{r.cost}</Pill>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

// Table 8 — the 19-construct Tier-1 calibration set.
export function Tier1Table() {
  return (
    <TableWrap>
      <thead>
        <tr>
          <th>Construct</th>
          <th>Gene</th>
          <th className={styles.num}>Predicted score</th>
          <th className={styles.num}>MW kDa</th>
          <th className={styles.num}>pI</th>
          <th className={styles.num}>Instab.</th>
          <th className={styles.num}>CA-pLDDT</th>
          <th>Capture</th>
          <th>Arm</th>
        </tr>
      </thead>
      <tbody>
        {TIER1.map((r) => {
          const capture = r.pi > 9 ? ["Cation exchange", "good"] : r.pi < 5 ? ["Anion exchange", "good"] : ["Needs a tag", "warn"];
          const arm = r.score === 0.75 ? ["Control A · degenerate", "neutral"] : ["Spread", "neutral"];
          return (
            <tr key={r.loc}>
              <td className={styles.locus}>{r.loc}</td>
              <td className={styles.gene}>{r.gene}</td>
              <td className={styles.num} style={{ fontWeight: 600 }}>
                {r.score.toFixed(3)}
              </td>
              <td className={styles.num}>{r.mw.toFixed(1)}</td>
              <td className={styles.num}>{r.pi.toFixed(2)}</td>
              <td className={styles.num}>{r.inst.toFixed(2)}</td>
              <td className={styles.num}>{r.plddt.toFixed(1)}</td>
              <td>
                <Pill tone={capture[1]}>{capture[0]}</Pill>
              </td>
              <td>
                <Pill tone={arm[1]}>{arm[0]}</Pill>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrap>
  );
}
