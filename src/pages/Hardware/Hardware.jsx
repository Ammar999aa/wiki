import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/en/hardware.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./Hardware.module.scss";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/images/.
const milkyWay = "https://static.igem.wiki/teams/6341/wiki/images/milky-way-center.webp";

// Converted from src/content/iGEM Hardware Wiki.docx. Internal author notes
// ("consult wet lab to write", "insert image of filtration unit", etc.) were
// stripped rather than published; prose gaps they marked are left as
// "Content coming soon" instead, per .claude/RESPONSIBLE_AI_USE.md. The doc's
// 3 embedded images are uploaded via iGEM's uploads tool and referenced from
// static.igem.wiki in hardware.md, per README.md's asset rules.
//
// `photo` (milky-way-center.webp — Spitzer infrared mosaic of the galactic
// core, no keying needed since it's already a full-frame starfield) is a
// faint one-off background, same `photo`/`gradient` stacking PageWrapper
// already does for Sponsors/Roster, just dialed down via `photoOpacity` so
// it doesn't fight with the article text.
export default function Hardware() {
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
      <SectionedArticle title="Hardware" sections={sections} defaultSelected={sections[0]?.title} />

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
