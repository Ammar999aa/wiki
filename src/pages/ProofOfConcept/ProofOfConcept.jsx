import { Fragment } from "react";
import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import rawSections from "../../content/en/proof-of-concept.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { GrowthChart, PhChart, TempChart } from "../Hardware/components/ValidationCharts";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// The three bioreactor validation charts are the Hardware page's own
// components (same data, same hover tooltips), not screenshots. Like
// hardware.md, proof-of-concept.md marks each one's spot with an empty
// `<div data-slot="name"></div>` and the section's HTML is split there,
// with the chart rendered in between. Captions stay in the markdown.
const SLOTS = {
  "temp-chart": TempChart,
  "ph-chart": PhChart,
  "growth-chart": () => <GrowthChart tableNumber={1} />,
};
const SLOT_RE = /<div data-slot="([\w-]+)"><\/div>\n?/;

function withSlots(section) {
  if (!SLOT_RE.test(section.html)) return section;
  // split() with a capture group alternates [html, slotName, html, slotName, html, ...]
  const parts = section.html.split(new RegExp(SLOT_RE.source, "g"));
  const content = parts.map((part, i) => {
    if (i % 2 === 0) return part.trim() ? <div key={i} dangerouslySetInnerHTML={{ __html: part }} /> : null;
    const Slot = SLOTS[part];
    if (!Slot) throw new Error(`proof-of-concept.md: unknown data-slot "${part}"`);
    return <Slot key={i} />;
  });
  return { ...section, html: null, content: <Fragment>{content}</Fragment> };
}

const sections = rawSections.map(withSlots);

// The opening paragraphs sit in the intro slot, right under the masthead:
// the markdown sections start at "Select" and anything before a "##"
// heading is not rendered.
const pageIntro = (
  <>
    <Masthead
      eyebrow={["Wet Lab", "Proof of Concept"]}
    />
    <p>
      Space environments present challenges that terrestrial organisms are not naturally adapted to withstand,
      including intense radiation, microgravity, extreme temperatures, and limited resources. For biomanufacturing to
      become feasible beyond Earth, microbial chassis must be resilient enough to maintain growth and protein production
      under these demanding conditions. To address this challenge, we engineered microbial chassis with stress-resistance
      genes and established a genomic integration workflow across three microbial hosts. In parallel, we developed a
      compact bioreactor prototype designed to regulate culture conditions, alongside a downstream purification system
      for recovering protein payloads. We also established a computational gene-mining pipeline that identified 19
      candidate stress-resistance proteins from the Rub’ al Khali (Empty Quarter), one of the world's most extreme desert
      environments.
    </p>
    <p>
      We established a foundation for developing more resilient and autonomous microbial biomanufacturing systems. Our
      workflows, computational tools, and hardware designs provide starting points for future iGEM teams exploring
      related projects.
    </p>
  </>
);

export default function ProofOfConcept() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle
        title="Proof of Concept"
        intro={pageIntro}
        sections={sections}
        defaultSelected={sections[0]?.title}
      />
    </PageWrapper>
  );
}
