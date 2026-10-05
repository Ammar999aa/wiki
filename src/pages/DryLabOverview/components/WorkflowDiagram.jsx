import styles from "../DryLabOverview.module.scss";

// Figure 1 of the Dry Lab Overview: how the three chassis models relate.
// Laid out as HTML (a 5-column grid: host · link · supplier · gap · host)
// rather than one scaled SVG so the box text stays readable on phones,
// where it collapses into a single column instead of shrinking.
//
// Each box jumps to its organism's `##` section (ids from
// plugins/markdown-sections.js's slugify()). scrollIntoView rather than a
// native fragment jump for the same reason Article.jsx's `.cite` handler
// gives: the native jump silently no-ops on this long, already-mounted
// article.
function jump(e) {
  const id = e.currentTarget.getAttribute("href").slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  history.pushState(null, "", `#${id}`);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Node({ href, name, species, role, className = "" }) {
  return (
    <a href={href} onClick={jump} className={`${styles.wfNode} ${className}`}>
      <b>{name}</b>
      <i>{species}</i>
      <span>{role}</span>
    </a>
  );
}

export default function WorkflowDiagram() {
  return (
    <div className="panel">
      <div className="panel-title">
        <span>Three chassis models and how they relate</span>
      </div>
      <div className={styles.wf}>
        <div className={`${styles.wfBox} ${styles.wfQuestion}`}>
          Can a nanobody be produced in a closed, oxygen- and carbon-limited habitat?
        </div>

        <div className={styles.wfDown} style={{ gridColumn: 1 }} />
        <div className={styles.wfDown} style={{ gridColumn: 3 }} />
        <div className={styles.wfDown} style={{ gridColumn: 5 }} />

        <Node
          href="#chassis-models-yeast-saccharomyces-cerevisiae"
          name="Yeast"
          species="S. cerevisiae"
          role="Candidate host"
          className={styles.wfYeast}
        />
        <div className={styles.wfLink}>
          <span>
            sucrose
            <br />+ O₂
          </span>
          <i aria-hidden="true" />
        </div>
        <Node
          href="#chassis-models-cyanobacteria-synechococcus-elongatus"
          name="Cyanobacteria"
          species="S. elongatus PCC 7942"
          role="The supplier"
          className={styles.wfCyano}
        />
        <Node
          href="#chassis-models-bacteria-bacillus-subtilis"
          name="Bacteria"
          species="B. subtilis"
          role="Candidate host"
          className={styles.wfBact}
        />

        <div className={styles.wfDown} style={{ gridColumn: 1 }} />
        <div className={styles.wfDown} style={{ gridColumn: 3 }} />
        <div className={styles.wfDown} style={{ gridColumn: 5 }} />

        <a
          href="#wet-lab-experiments-from-the-results"
          onClick={jump}
          className={`${styles.wfBox} ${styles.wfOutcome}`}
        >
          <b>Chassis choice + feedstock strategy + operating window</b>
          <span>→ Wet Lab experiments</span>
        </a>
      </div>
    </div>
  );
}
