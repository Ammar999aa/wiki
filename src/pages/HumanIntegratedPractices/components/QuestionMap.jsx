import { foundingQuestions } from "../data.js";
import styles from "../HumanIntegratedPractices.module.scss";

export default function QuestionMap() {
  return (
    <>
      <div className={styles.questionMap}>
        {foundingQuestions.map((q, i) => (
          <div className={styles.questionRow} key={q.tag}>
            <div className={styles.questionConnector} aria-hidden="true" />
            <div className={styles.questionBubble} data-tone={i % 2 === 0 ? "primary" : "accent"}>
              <p>{q.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p>
        Each question helped us identify knowledge gaps and guided us toward people whose expertise
        and experiences could challenge our assumptions and inform our decisions.
      </p>
      <p>
        Our goal was therefore not simply to showcase SHIHAB or seek validation. We wanted to
        establish meaningful dialogues capable of changing the way we thought about the problem and,
        when necessary, the project itself. Each engagement was selected with a purpose, bringing
        perspectives from different disciplines and communities into the development of SHIHAB.
      </p>
    </>
  );
}
