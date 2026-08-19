import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SponsorsSection from "../../components/Sponsors/Sponsors";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./Sponsors.module.scss";

// Standalone /sponsors page required by pages.md's Team category. Reuses the
// same Sponsors component embedded at the bottom of Home — the logos and
// their nudge/animation config live in one place either way.
export default function Sponsors() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.heading}>
        <p className={styles.label}>Team</p>
        <h1>Sponsors</h1>
      </div>
      <SponsorsSection />
    </PageWrapper>
  );
}
