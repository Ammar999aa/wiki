import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import rawSections from "../../content/en/hardware.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import BulbHero from "./BulbHero";
import BioreactorModel from "./BioreactorModel";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./Hardware.module.scss";

// The 3D model is a real React component (needs a bundled asset import and
// a dynamic import of model-viewer), not something markdown can express —
// so it's attached here as a `content` override on the section it belongs
// under (Article.jsx renders `section.content` after that section's
// markdown), rather than authored inline in hardware.md like the page's
// other rich blocks (.panel/.dash/.chip). See ARTICLE-STANDARDS.md for this
// `content`-prop extension point.
const sections = rawSections.map((section) =>
  section.title === "Two systems, one pill" ? { ...section, content: <BioreactorModel /> } : section,
);

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
      <SectionedArticle
        title="Hardware"
        intro={<BulbHero />}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />

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
