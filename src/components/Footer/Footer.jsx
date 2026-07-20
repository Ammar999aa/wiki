import { stringToSlug } from "../../utils/stringToSlug.js";
import styles from "./Footer.module.scss";

// MUST mention the license AND link to the team wiki's repository on
// gitlab.igem.org — required on every page for judging (requirements.md §3, §4).
export default function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR;
  const teamName = import.meta.env.VITE_TEAM_NAME;
  const teamSlug = stringToSlug(teamName);

  return (
    <p className={styles.licenseBar}>
      <a
        href={`https://gitlab.igem.org/${teamYear}/${teamSlug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        gitlab.igem.org/{teamYear}/{teamSlug}
      </a>
      {" · Content licensed under "}
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        CC BY 4.0
      </a>
      {" · "}
      {teamName} iGEM {teamYear}
      {" · "}
      {"Typefaces: Inter, IBM Plex Sans Arabic, Aref Ruqaa — SIL Open Font License 1.1"}
    </p>
  );
}
