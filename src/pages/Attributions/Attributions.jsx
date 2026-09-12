import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedPage from "../../components/SectionedPage/SectionedPage";
import { useLanguage } from "../../i18n/LanguageContext";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

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
const nauryzbay = `${ROSTER_CDN}/nauryzbay.avif`;
const nadia     = `${ROSTER_CDN}/nadia.avif`;
const hassan    = `${ROSTER_CDN}/hassan.avif`;
const raheema   = `${ROSTER_CDN}/raheema.avif`;
const mafer     = `${ROSTER_CDN}/mafer.avif`;

function memberContent(t, key) {
  return (
    <>
      <h3>{t("attributions.labels.tasks")}</h3>
      <p>{t(`attributions.${key}.tasks`)}</p>
      <h3>{t("attributions.labels.specificTasks")}</h3>
      <p>{t(`attributions.${key}.specificTasks`)}</p>
    </>
  );
}

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
  { key: "kevser",        title: "Kevser Ciek",                    photo: kevser,    deptKey: "dryLab" },
  { key: "nauryzbay",     title: "Nauryzbay Menlen",                photo: nauryzbay, deptKey: "dryLab" },
  { key: "nadia",         title: "Nadia Houti",                    photo: nadia,     deptKey: "hardware" },
  { key: "hassan",        title: "Hassan Abuali",                  photo: hassan,    deptKey: "hardware" },
  { key: "shahad",        title: "Shahad Hersi",                   photo: shahad,    deptKey: "publicEngagement" },
  { key: "genesis",       title: "Génesis Flores Arroyo",          photo: genesis,   deptKey: "publicEngagement" },
  { key: "raheema",       title: "Raheema Javid",                  photo: raheema,   deptKey: "publicEngagement" },
  { key: "mariaFernanda", title: "Maria Fernanda Gutierrez",       photo: mafer,     deptKey: "humanPractices" },
  { key: "ammar",         title: "Ammar Almarzooq",                photo: ammar,     deptKey: "wiki" },
];

// Same two PIs as on Roster — no photo asset for either there either.
const principalInvestigators = [
  { key: "raik", title: "Raik Grünberg" },
  { key: "wayne", title: "Wayne Yang" },
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
      photo: null,
      role: t(`attributions.${pi.key}.role`),
      content: memberContent(t, pi.key),
    }))
  );

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedPage sections={sections} defaultSelected={defaultMember} />
    </PageWrapper>
  );
}
