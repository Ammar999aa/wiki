import { Fragment } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import rawSections from "../../content/en/hardware.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import HardwareAnimation from "../Home/HardwareAnimation/HardwareAnimation";
import BioreactorModel from "./BioreactorModel";
import BioreactorDashboard from "./components/BioreactorDashboard";
import WorkflowDiagram from "./components/WorkflowDiagram";
import { GrowthChart, PhChart, TempChart } from "./components/ValidationCharts";
import styles from "./Hardware.module.scss";
const gradient =
  "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Real React components (the 3D model, the dashboard simulation, the charts)
// can't be written in markdown, but they belong mid-section, between
// paragraphs and captions that do live in hardware.md. So hardware.md marks
// each one's spot with an empty `<div data-slot="name"></div>`, and the
// section's HTML is split at those markers here, with the matching component
// rendered in between. Everything else on the page, captions included, stays
// in hardware.md where it can be edited as plain text.
const SLOTS = {
  workflow: WorkflowDiagram,
  dashboard: BioreactorDashboard,
  model: BioreactorModel,
  "temp-chart": TempChart,
  "ph-chart": PhChart,
  "growth-chart": GrowthChart,
};
const SLOT_RE = /<div data-slot="([\w-]+)"><\/div>\n?/;

function withSlots(section) {
  if (!SLOT_RE.test(section.html)) return section;
  // split() with a capture group alternates [html, slotName, html, slotName, html, ...]
  const parts = section.html.split(new RegExp(SLOT_RE.source, "g"));
  const content = parts.map((part, i) => {
    if (i % 2 === 0)
      return part.trim() ? (
        <div key={i} dangerouslySetInnerHTML={{ __html: part }} />
      ) : null;
    const Slot = SLOTS[part];
    if (!Slot) throw new Error(`hardware.md: unknown data-slot "${part}"`);
    return <Slot key={i} />;
  });
  return { ...section, html: null, content: <Fragment>{content}</Fragment> };
}

const sections = rawSections.map(withSlots);

// Hosted on iGEM Video Universe (video.igem.org), as wiki videos must be.
const DESERT_VIDEO_ID = "czwcZyskQpAkvMVoSaGwVr";
const userManual =
  "https://static.igem.wiki/teams/6341/wiki/content/hardware/hardware-user-manual.pdf";

// Hosted on iGEM's asset server rather than bundled locally.
const desertMedia = "https://static.igem.wiki/teams/6341/wiki/content/hardware";

// Figures 1 to 5 sit between the title and the first section, so they go
// through the `intro` slot rather than hardware.md,
// whose content always starts under a section heading.
function TopFigures() {
  return (
    <>
      <div className="figure-grid single wide">
        <HardwareAnimation title="Overview of prototype: animated walkthrough" />
        <div className="caption">
          <strong>Figure 1. The whole system runs the purification sequence step by step.</strong>{" "}
          Interactive animation of the 3D model of the set-up laid out in its carry case: the bioreactor
          runs, culture passes to the filtration unit, the four buffers are drawn into the syringes, then
          the equilibration buffer, wash buffer, filtrate, elution buffer (to the collection vial) and
          reconstitution buffer pass through the column in turn. Drag to take over the camera, and use
          Pause and Restart to control playback. The flow is an illustration of the sequence, not
          measured data.
        </div>
      </div>
      <div className="figure-grid single wide">
        <figure>
          <h3 className={styles.desertTitle}>We took SHIHAB to the desert!</h3>
          <div className={styles.desertVideo}>
            <iframe
              src={`https://video.igem.org/videos/embed/${DESERT_VIDEO_ID}?autoplay=1&loop=1&muted=1`}
              title="We took SHIHAB to the desert: the real set-up tested on the dunes"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <figcaption className="caption">
            <strong>Figure 2.</strong> The real set-up, with the bioreactor and the syringe pumps, tested
            out on the dunes, exactly the kind of remote place it is built for.
          </figcaption>
        </figure>
      </div>
      <p>
        To put “anywhere” to the test, we took SHIHAB out of the lab and into the desert. With a folding
        table, a laptop and a bit of sunset, the team set up the bioreactor and fluid dispensing system
        on the dunes, far from any bench.
      </p>
      <div className="figure-grid" style={{ "--cols": 2, "--fig-h": "320px", "--fig-fit": "cover" }}>
        <figure>
          <div className="photo-frame">
            <img
              src={`${desertMedia}/desert-pic-1.avif`}
              alt="Part of the KAUST-KSA team with the SHIHAB bioreactor and fluid dispensing system set up on a folding table in the dunes"
              loading="lazy"
            />
          </div>
          <figcaption className="caption">
            <strong>Figure 3. Part of the KAUST-KSA team and SHIHAB, a long way from the lab.</strong> The
            bioreactor and fluid dispensing system are set up on a folding table in the dunes.
          </figcaption>
        </figure>
        <figure>
          <div className="photo-frame">
            <img
              src={`${desertMedia}/desert-pic-2.avif`}
              alt="Team members and principal investigators in the desert during a break between setting up and tearing down the SHIHAB prototype"
              loading="lazy"
            />
          </div>
          <figcaption className="caption">
            <strong>Figure 4. A little break between setup and teardown.</strong> Our PIs were just as
            excited over the prototype working as they were about driving over countless dunes!
          </figcaption>
        </figure>
      </div>
      <div className="figure-grid single wide">
        <figure>
          <div className="photo-frame">
            <img
              src={`${desertMedia}/desert-pic-3.avif`}
              alt="Sunset over the desert set-up as the sun dips behind the hills"
              loading="lazy"
            />
          </div>
          <figcaption className="caption">
            <strong>Figure 5. Sunset over the setup.</strong> The sun dips behind the hills as the day’s
            work wraps up. Next stop: Paris!!!
          </figcaption>
        </figure>
      </div>
      <p>
        The SHIHAB platform can be easily set up and operated anywhere by referring to our{" "}
        <a href={userManual} target="_blank" rel="noopener noreferrer">
          Hardware User Manual
        </a>
        .
      </p>
    </>
  );
}

export default function Hardware() {
  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        gradient,
      }}
    >
      <SectionedArticle
        title="Hardware"
        intro={
          <>
            {/* Hardware is a flat nav entry, so its nav trail is the one item. */}
            <Masthead eyebrow={["Hardware"]} />
            <TopFigures />
          </>
        }
        sections={sections}
        defaultSelected={sections[0]?.title}
        numbered
        accentBold
      />
    </PageWrapper>
  );
}
