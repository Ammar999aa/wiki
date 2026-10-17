import { voices } from "../data.js";
import styles from "../Inclusivity.module.scss";

// "Bringing different disciplines into synthetic biology": team members
// introduce their own backgrounds, each a portrait over a speech bubble.
export default function Voices() {
  return (
    <ul className={styles.voices}>
      {voices.map((v) => (
        <li key={v.name} className={styles.voice}>
          <img className={styles.voicePhoto} src={v.photo} alt={`Portrait of ${v.name}`} loading="lazy" />
          <blockquote className={styles.voiceQuote}>
            <p className={styles.voiceText}>“{v.quote}”</p>
          </blockquote>
          <p className={styles.voiceName}>{v.name}</p>
        </li>
      ))}
    </ul>
  );
}
