import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ProtocolCard from "./ProtocolCard";
import ProtocolArticle from "./ProtocolArticle";
import protocolSections from "../../content/en/protocols.md";
import styles from "./Protocols.module.scss";

const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

// Same fixed background photo as the Design/Payloads page (ProteinLibrary.jsx)
// — see its own comment for the asset path convention.
const milkyWay = "https://static.igem.wiki/teams/6341/wiki/images/milky-way-center.webp";
const PAGE_BACKGROUND = {
  color: "#0A0A27",
  image: bg,
  size: "1280px 1080px",
  photo: milkyWay,
  photoOpacity: 0.2,
  gradient,
};

// Groups mirror src/content/SHIHAB - Protocols.docx's own "Part N" divider
// pages — not a categorization we invented — so the page reads as the same
// document structure the wiki content came from. One heading below is
// renamed from the source doc ("Anaerobic Respiration" → "RNA & qPCR"): the
// source doc's own Part 5 divider keeps that label from an older draft, but
// its actual content (TRIzol extraction, RT-PCR/qPCR) has nothing to do with
// anaerobic respiration, so propagating it here would just mislabel the
// section on the public wiki. Each markdown `## ` title here must match a
// title in src/content/en/protocols.md exactly (see that file /
// plugins/markdown-sections.js for how titles become {title, html} entries);
// a typo here just silently drops that protocol from the page, so keep the
// two in sync by hand when protocols.md changes.
const PARTS = [
  {
    heading: "Part 1 — General protocols",
    titles: [
      "S. cerevisiae strain maintenance",
      "B. subtilis culturing and maintenance",
      "B. subtilis sporulation",
      "Agarose gel electrophoresis",
      "SDS-PAGE",
      "Coomassie staining",
      "Western blot",
      "Lyophilized plasmid revival",
    ],
  },
  {
    heading: "Part 2 — Transformations and recombineering",
    titles: [
      "S. cerevisiae transformation / recombineering (LiAc/PEG method)",
      "P. pastoris recombineering (electroporation)",
      "Electroporation cuvette cleaning procedure",
      "B. subtilis recombineering",
    ],
  },
  {
    heading: "Part 3 — UV-B, UV-C & X-ray radiation resistance",
    titles: ["UV-B / UV-C irradiation", "X-ray irradiation", "Comet assay (single-cell gel electrophoresis)"],
  },
  {
    heading: "Part 4 — Freezing resistance",
    titles: ["B. subtilis freezing/thawing", "S. cerevisiae freezing/thawing"],
  },
  {
    heading: "Part 5 — Viability assays",
    titles: [
      "Colony forming unit (CFU) assay (S. cerevisiae / Bacillus)",
      "FUN-1 viability assay (S. cerevisiae, P. pastoris)",
      "Resazurin viability assay (Bacillus)",
    ],
  },
  {
    heading: "Part 6 — RNA & qPCR",
    titles: ["RNA extraction with TRIzol", "RT-PCR / qPCR"],
  },
  {
    heading: "Part 7 — Purification",
    titles: [
      "P. pastoris payload expression",
      "Harvesting cells",
      "ÄKTA HisTrap purification",
      "B. subtilis nanobody expression",
      "S. cerevisiae galactose induction",
    ],
  },
  {
    heading: "Useful recipes",
    titles: ["Media & stock solution recipes"],
  },
];

// A short plain-text teaser for the card face — literal truncation of the
// protocol's own real opening text, not a written-from-scratch summary.
// marked() HTML-escapes the body text, so entities need decoding back
// (&quot; -> ", &amp; -> &, ...) after tags are stripped, or a title like
// `Nanobody expression and purification steps.pdf` shows up as literal
// `&quot;Nanobody...` in the card face.
const HTML_ENTITIES = { quot: '"', amp: "&", "#39": "'", apos: "'", lt: "<", gt: ">" };
function excerpt(html) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&(quot|amp|#39|apos|lt|gt);/g, (_, e) => HTML_ENTITIES[e])
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 130 ? `${text.slice(0, 130).trimEnd()}…` : text;
}

function buildParts() {
  const byTitle = new Map(protocolSections.map((s) => [s.title, s]));
  const grouped = PARTS.map(({ heading, titles }) => ({
    heading,
    protocols: titles.map((title) => byTitle.get(title)).filter(Boolean),
  }));
  // Anything in protocols.md not listed above (e.g. a future protocol added
  // to the source without updating PARTS) still shows up, under its own
  // group, rather than silently disappearing from the page.
  const known = new Set(PARTS.flatMap((p) => p.titles));
  const orphans = protocolSections.filter((s) => !known.has(s.title));
  return orphans.length ? [...grouped, { heading: "Other", protocols: orphans }] : grouped;
}

// A browsable grid of protocol tiles, grouped under the source PDF's own
// Part headings (matches the Design/Payloads page's card grid). Selecting
// one swaps the whole page for a full reading view (ProtocolArticle) with
// a back arrow and prev/next paging through the flat protocol order below —
// not a popup, since a 900-word protocol reads better as its own page than
// cramped into a modal.
//
// Selection is plain component state, not a URL search param: App.jsx's
// view-transition wrapper only re-syncs its rendered <Routes location> when
// the *pathname* changes (see its displayLocation effect), so a
// search-param-only navigation updates the address bar but never reaches
// this component's render — a real bug in that shared machinery, out of
// scope to fix here. Local state sidesteps it entirely.
export default function Protocols() {
  const parts = useMemo(buildParts, []);
  const flatProtocols = useMemo(() => parts.flatMap((part) => part.protocols), [parts]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const selectedIndex = flatProtocols.findIndex((p) => p.title === selectedTitle);
  const selected = selectedIndex >= 0 ? flatProtocols[selectedIndex] : null;

  const select = (title) => {
    setSelectedTitle(title);
  };

  // Land at the top of whichever view just became active — reading a new
  // article from mid-scroll, or landing back on the grid mid-article, both
  // read as broken otherwise.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selected]);

  if (selected) {
    return (
      <PageWrapper background={PAGE_BACKGROUND}>
        <ProtocolArticle
          protocol={selected}
          onBack={() => select(null)}
          prev={selectedIndex > 0 ? flatProtocols[selectedIndex - 1] : null}
          next={selectedIndex < flatProtocols.length - 1 ? flatProtocols[selectedIndex + 1] : null}
          onSelect={select}
        />
        <PhotoCredit />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper background={PAGE_BACKGROUND}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Wet Lab</p>
          <h1 className={styles.title}>Experiments &amp; Protocols</h1>
          <p className={styles.tagline}>Every protocol we run, organized the way we actually use it at the bench.</p>
        </header>

        {parts.map((part) => (
          <section key={part.heading} className={styles.partSection}>
            <h2 className={styles.partHeading}>{part.heading}</h2>
            <div className={styles.grid}>
              {part.protocols.map((protocol) => (
                <ProtocolCard
                  key={protocol.title}
                  protocol={protocol}
                  excerpt={excerpt(protocol.html)}
                  onSelect={() => select(protocol.title)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <PhotoCredit />
    </PageWrapper>
  );
}

// Same attribution convention as ProteinLibrary.module.scss's .photoCredit /
// Sponsors'/Home's own corner credit links — required alongside the photo
// itself, not optional styling.
function PhotoCredit() {
  return (
    <a
      href="https://science.nasa.gov/image-detail/ssc2006-02a-0/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.photoCredit}
    >
      Milky Way's center: NASA/JPL-Caltech
    </a>
  );
}
