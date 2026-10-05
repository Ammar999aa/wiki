import { orbitSteps } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

const ICON_BASE = "https://static.igem.wiki/teams/6341/wiki/images";

export default function OrbitTimeline() {
  return (
    <div className={styles.orbitTimeline}>
      {orbitSteps.map((step) => (
        <div className={styles.orbitStep} key={step.letter}>
          <img className={styles.orbitIcon} src={`${ICON_BASE}/${step.icon}.avif`} alt="" />
          <div className={styles.orbitBody}>
            <h4>
              <span className={styles.orbitLetter}>{step.letter}</span> — {step.title}
            </h4>
            <p>{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
