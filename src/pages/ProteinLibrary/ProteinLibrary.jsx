import { useEffect, useState, Fragment } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import ProteinCard from "./ProteinCard";
import ProteinDetail from "./ProteinDetail";
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

// Wired into the nav as Wet Lab → Design (/design), see src/pages.js. See
// src/content/library_page.md for the design brief this was built from,
// src/content/protein_payload_library.md for the source content, and
// .claude/DESIGN.md for the site-wide visual system this was brought in
// line with (every elevated surface — info bar, cards, workflow panel —
// now goes through the shared LiquidGlass primitive instead of hand-rolled
// rgba glass, matching how Sponsors/Roster build their cards).
//
// Grid tiles (ProteinCard) are all one fixed size and never resize.
// Selecting one opens its full write-up (ProteinDetail) as a floating
// panel over a backdrop that covers the whole grid, instead of growing
// that tile in place and pushing its neighbors aside.
export default function ProteinLibrary() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = PROTEINS.find((p) => p.id === selectedId) || null;

  const close = () => setSelectedId(null);

  // Escape closes from anywhere on the page, and the grid behind the
  // backdrop shouldn't scroll while a detail panel covers it.
  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Protein Payload Library</p>
          <h1 className={styles.title}>Our Protein Payload Library</h1>
          <p className={styles.tagline}>On-demand production. Modular. Versatile. For a better tomorrow.</p>
        </header>

        <div className={styles.infoBar}>
          <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <div className={styles.infoBarInner}>
              {INFO_BAR.map((item) => (
                <div key={item.title} className={styles.infoItem}>
                  <p className={styles.infoTitle}>{item.title}</p>
                  {item.detail && <p className={styles.infoDetail}>{item.detail}</p>}
                </div>
              ))}
            </div>
          </LiquidGlass>
        </div>

        <div className={styles.grid}>
          {PROTEINS.map((protein) => (
            <ProteinCard
              key={protein.id}
              protein={protein}
              active={selectedId === protein.id}
              onSelect={() => setSelectedId(protein.id)}
            />
          ))}
        </div>

        <footer className={styles.workflow}>
          <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <div className={styles.workflowInner}>
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
            </div>
          </LiquidGlass>
        </footer>
      </div>

      {selected && <ProteinDetail protein={selected} onClose={close} />}
    </PageWrapper>
  );
}
