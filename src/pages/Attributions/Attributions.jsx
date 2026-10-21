import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedPage from "../../components/SectionedPage/SectionedPage";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Attributions.module.scss";
import { sponsors, collaborators, supporters, aiTools } from "./data";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";
// ISS long exposure over eastern China, sky cut out and graded to sit on the
// #0A0A27 page.
const issPhoto = "https://static.igem.wiki/teams/6341/wiki/images/iss-long-exposure-yellow-graded.webp";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/roster/.
const ROSTER_CDN = "https://static.igem.wiki/teams/6341/wiki/roster";
const jeremy    = `${ROSTER_CDN}/jeremy.avif`;
const taiba     = `${ROSTER_CDN}/taiba.avif`;
const ammar     = `${ROSTER_CDN}/ammar.avif`;
const maria     = `${ROSTER_CDN}/maria.avif`;
const mariana   = `${ROSTER_CDN}/mariana.avif`;
const kexin     = `${ROSTER_CDN}/kexin.avif`;
const genesis   = `${ROSTER_CDN}/genesis.avif`;
const sriharsha = `${ROSTER_CDN}/sriharsha.avif`;
const kevser    = `${ROSTER_CDN}/kevser.avif`;
const shahad    = `${ROSTER_CDN}/shahad.avif`;
const francesca = `${ROSTER_CDN}/francesca.avif`;
const zeyad     = `${ROSTER_CDN}/zeyad.avif`;
const ansal     = `${ROSTER_CDN}/ansal.avif`;
const nadia     = `${ROSTER_CDN}/nadia.avif`;
const hassan    = `${ROSTER_CDN}/hassan.avif`;
const raheema   = `${ROSTER_CDN}/raheema.avif`;
const mafer     = `${ROSTER_CDN}/mafer.avif`;
const shahada   = `${ROSTER_CDN}/shahada.avif`;
const noureldin = `${ROSTER_CDN}/noureldin.avif`;
const wayne     = `${ROSTER_CDN}/wayne.avif`;
const selena    = `${ROSTER_CDN}/selena.avif`;
const tehseen   = `${ROSTER_CDN}/tehseen.avif`;
const alejandra = `${ROSTER_CDN}/alejandra.avif`;
const raik      = `${ROSTER_CDN}/raik.avif`;
const samah     = `${ROSTER_CDN}/samah.avif`;
const jordi     = `${ROSTER_CDN}/jordi.avif`;
const yerlen    = `${ROSTER_CDN}/yerlen.avif`;
const kiran     = `${ROSTER_CDN}/kiran.avif`;

// The attribution form marks species names as *italic*; render those spans.
function inline(text) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

function memberContent(t, key) {
  return (
    <>
      <h3>{t("attributions.labels.tasks")}</h3>
      <p>{inline(t(`attributions.${key}.tasks`))}</p>
      <h3>{t("attributions.labels.specificTasks")}</h3>
      <p>{inline(t(`attributions.${key}.specificTasks`))}</p>
    </>
  );
}

function OrgTable({ rows }) {
  return (
    <div className={styles.tableScroll}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Relationship</th>
            <th>Tasks</th>
            <th>Specific tasks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, relationship, tasks, specific]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{type}</td>
              <td>{relationship}</td>
              <td>{tasks}</td>
              <td>{specific}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const orgSections = [
  { title: "Sponsors", content: <OrgTable rows={sponsors} /> },
  { title: "Collaborators & Advisors", content: <OrgTable rows={collaborators} /> },
  { title: "Supporters & Lab Staff", content: <OrgTable rows={supporters} /> },
  {
    title: "AI Usage",
    content: (
      <>
        {aiTools.map((tool) => (
          <div key={tool.name}>
            <h3>{tool.name}</h3>
            <h4>Tasks</h4>
            <p>{tool.tasks}</p>
            <h4>Specific tasks</h4>
            {tool.specific.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ))}
      </>
    ),
  },
];

// Same department grouping/order as the Roster page (src/pages/Roster/Roster.jsx's
// DEPARTMENT_LABELS/DEPARTMENT_ORDER) — kept in sync by hand since the two
// pages otherwise duplicate their own member/photo data independently. Each
// student's deptKey below matches their roleKey there.
const DEPARTMENT_LABELS = {
  wetLab: "Wet Lab",
  dryLab: "Dry Lab",
  humanPractices: "Human Practices",
  hardware: "Hardware",
  publicEngagement: "Public Engagement",
  wiki: "Wiki",
};
const DEPARTMENT_ORDER = Object.keys(DEPARTMENT_LABELS);

// `key` is the i18n key under `attributions.*` in src/i18n/en.json.
const students = [
  { key: "ansal",         title: "Ansal' Diassova",               photo: ansal,     deptKey: "wetLab" },
  { key: "francesca",     title: "Francesca Rivas Cuestas",        photo: francesca, deptKey: "wetLab" },
  { key: "mariana",       title: "Mariana Villegas",               photo: mariana,   deptKey: "wetLab" },
  { key: "sriharsha",     title: "Sriharsha Chowdarapu",           photo: sriharsha, deptKey: "wetLab" },
  { key: "mariaCamila",   title: "Maria Camila Muñoz Vega",        photo: maria,     deptKey: "wetLab" },
  { key: "zeyad",         title: "Zeyad Muazzen",                  photo: zeyad,     deptKey: "wetLab" },
  { key: "jeremy",        title: "Jeremy Rodrigo Guerrero Alejos", photo: jeremy,    deptKey: "dryLab" },
  { key: "taiba",         title: "Taiba Zeya",                     photo: taiba,     deptKey: "dryLab" },
  { key: "kexin",         title: "Kexin Niu",                      photo: kexin,     deptKey: "dryLab" },
  { key: "kevser",        title: "Kevser Civek",                    photo: kevser,    deptKey: "dryLab" },
  { key: "noureldin",     title: "Noureldin Rihan",                photo: noureldin, deptKey: "dryLab" },
  { key: "nadia",         title: "Nadia Houti",                    photo: nadia,     deptKey: "hardware" },
  { key: "hassan",        title: "Hassan Abuali",                  photo: hassan,    deptKey: "hardware" },
  { key: "shahad",        title: "Shahad Hersi",                   photo: shahad,    deptKey: "publicEngagement" },
  { key: "genesis",       title: "Génesis Arroyo",                 photo: genesis,   deptKey: "publicEngagement" },
  { key: "kiran",         title: "Kiran Ahmad",                    photo: kiran,     deptKey: "publicEngagement" },
  { key: "raheema",       title: "Raheema Javid",                  photo: raheema,   deptKey: "publicEngagement" },
  { key: "shahadAl",      title: "Shahad Al Abdulomhssen",         photo: shahada,   deptKey: "publicEngagement" },
  { key: "mariaFernanda", title: "Maria Fernanda Gutierrez",       photo: mafer,     deptKey: "humanPractices" },
  { key: "ammar",         title: "Ammar Almarzooq",                photo: ammar,     deptKey: "wiki" },
  { key: "yerlen",        title: "Yerlen Menglen",                 photo: yerlen,    deptKey: "wiki" },
];

// Same two PIs as on Roster, same photos.
const principalInvestigators = [
  { key: "raik", title: "Raik Grünberg", photo: raik },
  { key: "wayne", title: "Wayne Yang", photo: wayne },
];

// Same six advisors as on Roster, same order, same photos and preferred
// display names (src/assets/email-responses).
const advisors = [
  { key: "samah", title: "Samah Gadhoum", photo: samah },
  { key: "selena", title: "Selena Franchini", photo: selena },
  { key: "muhammadTehseen", title: "Muhammad Tehseen", photo: tehseen },
  { key: "alejandra", title: "Alejandra Rodríguez Llerena", photo: alejandra },
  { key: "jordi", title: "Jordi Pla-Mauri", photo: jordi },
];

export default function Attributions() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const defaultMember = searchParams.get("member") ?? undefined;

  const sections = DEPARTMENT_ORDER.flatMap((deptKey) => [
    { heading: DEPARTMENT_LABELS[deptKey] },
    ...students
      .filter((student) => student.deptKey === deptKey)
      .map((student) => ({
        title: student.title,
        photo: student.photo,
        role: t(`attributions.${student.key}.role`),
        department: DEPARTMENT_LABELS[student.deptKey],
        content: memberContent(t, student.key),
      })),
  ]);

  sections.push(
    { heading: t("attributions.headings.principalInvestigators") },
    ...principalInvestigators.map((pi) => ({
      title: pi.title,
      photo: pi.photo,
      role: t(`attributions.${pi.key}.role`),
      content: memberContent(t, pi.key),
    })),
    { heading: t("attributions.headings.advisors") },
    ...advisors.map((advisor) => ({
      title: advisor.title,
      photo: advisor.photo,
      role: t(`attributions.${advisor.key}.role`),
      content: memberContent(t, advisor.key),
    })),
    { heading: "Sponsors, Collaborators & AI" },
    ...orgSections
  );

  return (
    // navClearance off: on desktop the card scrolls inside itself (see
    // SectionedPage.module.scss), so the extra bottom room would only add
    // an empty page scroll.
    <PageWrapper
      navClearance={false}
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        photo: issPhoto,
        photoPosition: "center bottom",
        photoOpacity: 0.5,
        gradient,
      }}
    >
      <SectionedPage
        sections={sections}
        defaultSelected={defaultMember}
        footer={
          <a
            href="https://www.nasa.gov/image-detail/amf-iss075e0103388/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.photoCredit}
          >
            City lights of eastern China: NASA/Anil Menon
          </a>
        }
      />
    </PageWrapper>
  );
}
