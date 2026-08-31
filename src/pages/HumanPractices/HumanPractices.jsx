import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/human-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import milkyWay from "../../assets/milky-way-center.webp";
import styles from "./HumanPractices.module.scss";

// `photo` (milky-way-center.webp — Spitzer infrared mosaic of the galactic
// core, no keying needed since it's already a full-frame starfield) is a
// faint one-off background, same `photo`/`gradient` stacking PageWrapper
// already does for Sponsors/Roster, just dialed down via `photoOpacity` so
// it doesn't fight with the article text.
export default function HumanPractices() {
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
      <SectionedArticle title="Human Practices" sections={sections} defaultSelected={sections[0]?.title} />

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
