import styles from "./Footer.module.scss";

// Hardcoded rather than read from import.meta.env.VITE_TEAM_*: a GitLab
// CI/CD variable outside this repo's control overrides the committed .env
// value at build time (see vite.config.ts). Team identity is a fixed fact
// about this deployment, so hardcoding it here guarantees the required
// license + repo link (requirements.md §3, §4) can't silently go wrong.
//
// MUST mention the license AND link to the team wiki's repository on
// gitlab.igem.org — required on every page for judging (requirements.md §3, §4).
export default function Footer() {
  const teamYear = "2026";
  const teamName = "kaust-ksa";
  const teamSlug = "kaust-ksa";

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
      {" · "}
      {"Flag icons: "}
      <a
        href="https://github.com/lipis/flag-icons"
        target="_blank"
        rel="noopener noreferrer"
      >
        flag-icons
      </a>
      {" (MIT)"}
    </p>
  );
}
