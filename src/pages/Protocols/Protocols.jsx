import { useEffect, useMemo, useRef, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Panel from "../../components/SectionedArticle/Panel/Panel";
import panelStyles from "../../components/SectionedArticle/SectionedArticle.module.scss";
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

// Groups mirror the "Part N" divider pages of the team's protocols document
// (outputs/Experiments (Protocols) Wiki.pdf), not a categorization we
// invented — so the page reads as the same document structure the wiki
// content came from. The source numbers two consecutive parts "Part 3"
// (radiation, freezing) and then counts on from there; they are numbered
// sequentially here instead. Each protocol there is a size-20 underlined
// title, so sub-blocks the source nests inside one (Coomassie staining
// inside SDS-PAGE, RT-PCR / qPCR inside RNA extraction) stay inside that
// protocol's article rather than becoming cards of their own. Each markdown
// `## ` title here must match a title in src/content/en/protocols.md exactly
// (see that file / plugins/markdown-sections.js for how titles become
// {title, html} entries); a typo here just silently drops that protocol from
// the page, so keep the two in sync by hand when protocols.md changes.
const PARTS = [
  {
    heading: "Part 1 — General protocols",
    titles: [
      "S. cerevisiae strain maintenance",
      "B. subtilis culturing and maintenance",
      "B. subtilis sporulation",
      "Agarose gel electrophoresis",
      "SDS-PAGE",
      "Western blot",
      "Lyophilized plasmid revival",
      "RNA extraction with TRIzol",
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
    titles: ["Organism-specific parameters", "X-ray and UV irradiation tests", "Neutral bacterial comet assay"],
  },
  {
    heading: "Part 4 — Freezing resistance",
    titles: [
      "E. coli freeze-thaw survival assay using purified AFPs",
      "B. subtilis freezing/thawing",
      "S. cerevisiae freezing/thawing",
    ],
  },
  {
    heading: "Part 5 — Viability assays",
    titles: [
      "FUN-1 ratiometric live/dead assay",
      "Resazurin metabolic-reduction assay (kinetic)",
      "CFU / spot-dilution plating (clonogenic)",
    ],
  },
  {
    heading: "Part 6 — Purification",
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

// "Part 3 — UV-B, …" → a numbered jump-nav entry ("03" + "UV-B, …"); a heading
// with no "Part N —" prefix (Useful recipes, Other) is listed unnumbered.
function panelEntry(heading) {
  const m = heading.match(/^Part (\d+) — (.+)$/);
  return m ? { num: m[1].padStart(2, "0"), label: m[2] } : { num: undefined, label: heading };
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
  const panelEntries = useMemo(() => parts.map((p) => ({ ...panelEntry(p.heading), heading: p.heading })), [parts]);
  const flatProtocols = useMemo(() => parts.flatMap((part) => part.protocols), [parts]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const selectedIndex = flatProtocols.findIndex((p) => p.title === selectedTitle);
  const selected = selectedIndex >= 0 ? flatProtocols[selectedIndex] : null;

  const select = (title) => {
    setSelectedTitle(title);
  };

  // Jump-nav rail over the grid view (the shared SectionedArticle Panel):
  // lists each Part, highlights the one in view, and scrolls to one on click.
  // Same scroll-spy + click-lock idiom as SectionedArticle.jsx — the lock
  // stops the observer flickering the highlight through every Part a smooth
  // scroll passes on its way to the clicked one.
  const [activePart, setActivePart] = useState(parts[0]?.heading);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const partRefs = useRef([]);
  const scrollLockRef = useRef(false);
  const scrollLockTimeoutRef = useRef(null);

  useEffect(() => {
    if (selected) return undefined;
    const clearLock = () => {
      scrollLockRef.current = false;
      clearTimeout(scrollLockTimeoutRef.current);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActivePart(entry.target.dataset.heading);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    partRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener("scrollend", clearLock);
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", clearLock);
      clearTimeout(scrollLockTimeoutRef.current);
    };
  }, [selected, parts]);

  const jumpToPart = (index) => {
    setActivePart(parts[index].heading);
    scrollLockRef.current = true;
    clearTimeout(scrollLockTimeoutRef.current);
    // "scrollend" clears the lock; this backstop covers a target already in
    // view, where the browser never fires one.
    scrollLockTimeoutRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, 1000);
    partRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    setPanelCollapsed(true);
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
      <Panel
        items={panelEntries.map((e) => e.label)}
        nums={panelEntries.map((e) => e.num)}
        selected={panelEntries.find((e) => e.heading === activePart)?.label}
        collapsed={panelCollapsed}
        onToggle={() => setPanelCollapsed((v) => !v)}
        onSelect={jumpToPart}
        header={<div className={panelStyles.panelTitle}>Experiments &amp; Protocols</div>}
      />
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Wet Lab</p>
          <h1 className={styles.title}>Experiments &amp; Protocols</h1>
          <p className={styles.tagline}>Every protocol we run, organized the way we actually use it at the bench.</p>
        </header>

        {parts.map((part, i) => (
          <section
            key={part.heading}
            ref={(el) => (partRefs.current[i] = el)}
            data-heading={part.heading}
            className={styles.partSection}
          >
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
