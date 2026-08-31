import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/human-integrated-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./HumanIntegratedPractices.module.scss";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/images/.
const milkyWay = "https://static.igem.wiki/teams/6341/wiki/images/milky-way-center.webp";

// Converted from src/content/Human Integrated Practices - Wiki.docx. The
// "Closing the ORBIT" and "Conclusions" sections were left without body
// text in that source doc — kept as "Content coming soon" rather than
// invented, per .claude/RESPONSIBLE_AI_USE.md.
//
// `photo` (milky-way-center.webp — Spitzer infrared mosaic of the galactic
// core, no keying needed since it's already a full-frame starfield) is a
// faint one-off background, same `photo`/`gradient` stacking PageWrapper
// already does for Hardware/HumanPractices, dialed to the same photoOpacity.
export default function HumanIntegratedPractices() {
  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        photo: milkyWay,
        photoOpacity: 0.35,
        gradient,
      }}
    >
      <SectionedArticle title="Human Integrated Practices" sections={sections} defaultSelected={sections[0]?.title} />

      <a
        href="https://science.nasa.gov/image-detail/ssc2006-02a-0/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoCredit}
      >
        Milky Way's center: NASA/JPL-Caltech
      </a>
    </PageWrapper>
  );
}
