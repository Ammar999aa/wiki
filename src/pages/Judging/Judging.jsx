import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import Masthead from "../../components/SectionedArticle/Masthead/Masthead";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import styles from "./Judging.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";
// ISS long exposure, sky cut out and graded to sit on the #0A0A27 page.
const issPhoto = "https://static.igem.wiki/teams/6341/wiki/images/iss-long-exposure-graded.webp";
const medalImg = (tone) => `https://static.igem.wiki/teams/6341/wiki/content/judging/medal-${tone}.avif`;

// Medal criteria, from the team's judging page draft. Each criterion is a
// LiquidGlass card, which is why this page is JSX rather than markdown.
// `tint` is the medal's color as [r,g,b] for LiquidGlass; the same color
// is the --medal accent in Judging.module.scss.
const MEDALS = [
  {
    id: "bronze-medal",
    title: "Bronze Medal",
    tone: "bronze",
    tint: [224, 160, 122],
    criteria: [
      {
        title: "Competition Deliverables",
        text: "We have completed the necessary competition deliverables, such as our wiki, promotion video, presentation video, judging session, and judging form.",
        links: [{ label: "Promotion video", href: "/kaust-ksa/" }],
      },
      {
        title: "Project Attributions",
        text: "We have acknowledged contributions of all team members, PIs, mentors, sponsors, external contributors, etc. in our Attributions page.",
        links: [{ label: "Attributions Form", href: "/kaust-ksa/attributions" }],
      },
      {
        title: "Project Contributions",
        text: "We have documented the contributions we made for the iGEM community and synbio community in general in our Contributions page.",
        links: [{ label: "Contributions page", href: "/kaust-ksa/contribution" }],
      },
    ],
  },
  {
    id: "silver-medal",
    title: "Silver Medal",
    tone: "silver",
    tint: [203, 211, 222],
    criteria: [
      {
        title: "Engineering Success",
        text: "Throughout the competition, all aspects of our project have passed through numerous engineering cycle iterations (Design → Build → Test → Learn), which are documented in the Engineering Success page.",
        links: [{ label: "Engineering Success page", href: "/kaust-ksa/engineering" }],
      },
      {
        title: "Human Practices",
        text: "We engaged with diverse stakeholders to understand the broader societal implications of our project, incorporating their feedback into our project design and development, as documented on our Human Practices page.",
        links: [{ label: "Human Practices page", href: "/kaust-ksa/human-integrated-practices" }],
      },
    ],
  },
  {
    id: "gold-medal",
    title: "Gold Medal",
    tone: "gold",
    tint: [243, 207, 101],
    criteria: [
      {
        title: "Excellence in Synthetic Biology",
        text: "We would like to nominate ourselves for the following Special Awards:",
        groups: [
          { label: "1 · General Biological Engineering", items: ["New Improved Part OR Measurement"] },
          { label: "2 · Specializations", items: ["Integrated Human Practices", "Hardware"] },
        ],
        links: [
          { label: "Integrated Human Practices page", href: "/kaust-ksa/human-integrated-practices" },
          { label: "Hardware page", href: "/kaust-ksa/hardware" },
        ],
      },
    ],
  },
];

function Criterion({ n, criterion, tint }) {
  const { title, text, groups, links } = criterion;
  return (
    <LiquidGlass radius={28} color={tint} opacity={0.06} glowMask="linear-gradient(to bottom, white, transparent 60%)">
      <div className={`${styles.criterion} ${groups ? styles.stacked : ""}`}>
        <span className={styles.num}>{String(n).padStart(2, "0")}</span>
        <div className={styles.body}>
          <h4>{title}</h4>
          <p>{text}</p>
          {groups && (
            <div className={styles.groups}>
              {groups.map((g) => (
                <div key={g.label} className={styles.group}>
                  <span className={styles.groupLabel}>{g.label}</span>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.href + l.label} href={l.href}>
              {l.label} →
            </a>
          ))}
        </div>
      </div>
    </LiquidGlass>
  );
}

const sections = MEDALS.map((medal) => ({
  id: medal.id,
  title: medal.title,
  content: (
    <div className={`${styles.medal} ${styles[medal.tone]}`}>
      <img className={styles.badge} src={medalImg(medal.tone)} alt={medal.title} />
      <div className={styles.criteria}>
        {medal.criteria.map((c, i) => (
          <Criterion key={c.title} n={i + 1} criterion={c} tint={medal.tint} />
        ))}
      </div>
    </div>
  ),
}));

// Eyebrow echoes the nav label ("Judging", a top-level nav link).
const pageIntro = <Masthead eyebrow={["Judging"]} />;

export default function Judging() {
  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        photo: issPhoto,
        // Portrait image under `cover`: on wide screens only a band of it
        // shows, so aim that band at the horizon rather than the bottom.
        photoPosition: "center 62%",
        photoOpacity: 0.5,
        gradient,
      }}
    >
      <SectionedArticle title="Judging" intro={pageIntro} sections={sections} defaultSelected={sections[0].title} />
      <a
        href="https://www.nasa.gov/image-detail/amf-iss075e0144232/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoCredit}
      >
        Star trails above Earth: NASA/Anil Menon
      </a>
    </PageWrapper>
  );
}
