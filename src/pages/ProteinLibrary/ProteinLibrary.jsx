import { useState, Fragment } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ProteinCard from "./ProteinCard";
import { PROTEINS } from "./proteins";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./ProteinLibrary.module.scss";

const INFO_BAR = [
  { title: "Produced in Engineered Microbes", detail: "S. cerevisiae, P. pastoris, B. subtilis" },
  { title: "Designed for Modularity & Safety", detail: "Kill switches, Auxotrophy" },
  { title: "Versatile Delivery Platforms", detail: "MOFs, Hydrogels, etc." },
  { title: "Applications in Health, Space, & Beyond", detail: null },
];

const WORKFLOW_STEPS = ["Design", "Clone", "Express", "Purify", "Deliver", "Make an Impact"];

// Not linked from the nav yet — reachable directly at /proteinLibrary. See
// src/content/library_page.md for the design brief this was built from and
// src/content/protein_payload_library.md for the source content.
export default function ProteinLibrary() {
  const [selectedId, setSelectedId] = useState(null);

  const toggle = (id) => setSelectedId((current) => (current === id ? null : id));

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Protein Payload Library</p>
          <h1 className={styles.title}>Our Protein Payload Library</h1>
          <p className={styles.tagline}>On-demand production. Modular. Versatile. For a better tomorrow.</p>
        </header>

        <div className={styles.infoBar}>
          {INFO_BAR.map((item) => (
            <div key={item.title} className={styles.infoItem}>
              <p className={styles.infoTitle}>{item.title}</p>
              {item.detail && <p className={styles.infoDetail}>{item.detail}</p>}
            </div>
          ))}
        </div>

        <div
          className={`${styles.grid} ${selectedId ? styles.hasSelected : ""}`}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectedId(null);
          }}
        >
          {PROTEINS.map((protein) => (
            <ProteinCard
              key={protein.id}
              protein={protein}
              expanded={selectedId === protein.id}
              dimmed={selectedId !== null && selectedId !== protein.id}
              onToggle={() => toggle(protein.id)}
            />
          ))}
        </div>

        <footer className={styles.workflow}>
          <h2 className={styles.workflowTitle}>From Design to Delivery</h2>
          <div className={styles.workflowSteps}>
            {WORKFLOW_STEPS.map((step, i) => (
              <Fragment key={step}>
                <span className={styles.step}>{step}</span>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className={styles.arrow} aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <p className={styles.workflowTagline}>One platform. Many payloads. Limitless impact.</p>
          <p className={styles.legend}>
            <strong>&#10003; TESTED</strong> — Successfully expressed and validated in our platform.
          </p>
        </footer>
      </div>
    </PageWrapper>
  );
}
