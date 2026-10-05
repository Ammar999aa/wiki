import { useLayoutEffect, useRef } from "react";
import ArticleBody from "../../components/SectionedArticle/Article/Article";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ChartSlots from "../DryLabOverview/components/ChartSlots";
import sections from "../../content/en/example-article.md";
import GrowthChart from "./components/GrowthChart";
import styles from "./ExampleArticle.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// A worked example of the team's wiki authoring conventions (the "Wiki
// Authoring Conventions" doc): a fictional E. coli growth-curve article
// that uses every convention once, with yellow `.author-note` boxes in the
// left margin explaining each choice. Hidden route — reference material
// for authors, not wiki content; remove before the wiki freeze.
//
// Uses ArticleBody directly instead of SectionedArticle, so there's no
// jump-nav side panel: the margin it would occupy holds the notes instead.

const CHARTS = { "growth-curves": <GrowthChart /> };

const pageIntro = (
  <>
    <aside className="author-note">
      <b>Title.</b> On a real page the title is the nav label, word for word, so the reader knows they landed where
      they clicked.
    </aside>
    <div className="callout warn">
      <p className="callout-label">Example only</p>
      <p>
        This page shows the team&rsquo;s authoring conventions applied to one article. The experiment, the person
        interviewed and every number are invented for illustration; the references are real.
      </p>
    </div>
    <aside className="author-note">
      <b>Eyebrow.</b> Starts with the nav trail (category, then page), followed by at most two scope items: here an
      organism and a method.
    </aside>
    <Masthead
      eyebrow={["Example", "Example Article", "E. coli K-12", "Plate-reader growth curves"]}
      deck={
        <>
          We measured how fast <i>E.&nbsp;coli</i> grows at 25, 30 and 37&nbsp;°C. Growth was{" "}
          <b>2.6 times faster at 37&nbsp;°C than at 25&nbsp;°C</b>, and a two-parameter model fitted to the three
          rates predicts a growth rate we can now test at 33&nbsp;°C.
        </>
      }
      stats={[
        { value: "2.6×", label: "Faster at 37 °C than 25 °C", hi: true },
        { value: "25 min", label: "Doubling time at 37 °C", hi: true },
        { value: "9", label: "Growth curves" },
        { value: "1", label: "Claim retracted" },
      ]}
    />
    <aside className="author-note">
      <b>Answers at the top.</b> The deck says what we did, what we found and the key number, with one bold phrase.
      The stat grid repeats only numbers that appear, sourced, in the body, and highlights two of them. A judge gets
      the result without scrolling. A results page answers the judging question &ldquo;what did the experiment
      show?&rdquo;, so that is what the deck says.
    </aside>
  </>
);

export default function ExampleArticle() {
  const containerRef = useRef(null);
  const sectionRefs = useRef({});

  // Desktop: each note sits in the left margin, level with the block it
  // explains (the element just before it, or the figure before a caption),
  // pushed down if it would overlap the note above. Below 1025px the notes
  // are ordinary in-flow boxes (see the stylesheet), so nothing to place.
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const desktop = window.matchMedia("(min-width: 1025px)");

    const place = () => {
      const notes = [...root.querySelectorAll(".author-note")];
      notes.forEach((note) => (note.style.top = ""));
      if (!desktop.matches) return;
      let bottom = -Infinity;
      for (const note of notes) {
        let anchor = note.previousElementSibling;
        if (anchor?.classList.contains("author-note")) anchor = null;
        if (anchor?.classList.contains("caption")) anchor = anchor.previousElementSibling ?? anchor;
        const wanted = anchor ? anchor.offsetTop : note.offsetTop;
        const top = Math.max(wanted, bottom + 12);
        note.style.top = `${top}px`;
        bottom = top + note.offsetHeight;
      }
    };

    place();
    // The article itself, not `root`: ArticleBody's `.article` is
    // absolutely positioned, so `root` never grows with the content.
    // Catches late layout shifts too (images loading, the chart portal).
    const resize = new ResizeObserver(place);
    resize.observe(root.firstElementChild);
    desktop.addEventListener("change", place);
    return () => {
      resize.disconnect();
      desktop.removeEventListener("change", place);
    };
  }, []);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div ref={containerRef} className={styles.page}>
        <ArticleBody title="Example Article" intro={pageIntro} sections={sections} sectionRefs={sectionRefs} />
      </div>
      <ChartSlots containerRef={containerRef} charts={CHARTS} />
    </PageWrapper>
  );
}
