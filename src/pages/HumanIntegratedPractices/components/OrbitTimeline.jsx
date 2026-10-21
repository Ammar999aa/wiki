import { orbitSteps } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

export default function OrbitTimeline() {
  return (
    <div className={styles.orbitTimeline}>
      {orbitSteps.map((step) => (
        <div className={styles.orbitStep} key={step.letter}>
          <span className={`${styles.orbitIcon} step-icon step-${step.icon}`} aria-hidden="true" />
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
