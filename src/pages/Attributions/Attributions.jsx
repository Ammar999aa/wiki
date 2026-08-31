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
const shahada   = `${ROSTER_CDN}/shahada.avif`;
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

export default function Attributions() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const defaultMember = searchParams.get("member") ?? undefined;

  const sections = [
    { heading: t("attributions.headings.students") },
    { title: "Ansal' Diassova",           photo: ansal,     role: t("attributions.ansal.role"),        department: t("attributions.ansal.department"),        content: memberContent(t, "ansal") },
    { title: "Ammar Almarzooq",            photo: ammar,     role: t("attributions.ammar.role"),        department: t("attributions.ammar.department"),        content: memberContent(t, "ammar") },
    { title: "Francesca Rivas Cuestas",    photo: francesca, role: t("attributions.francesca.role"),    department: t("attributions.francesca.department"),    content: memberContent(t, "francesca") },
    { title: "Génesis Flores Arroyo",      photo: genesis,   role: t("attributions.genesis.role"),      department: t("attributions.genesis.department"),      content: memberContent(t, "genesis") },
    { title: "Jeremy Rodrigo Guerrero Alejos", photo: jeremy, role: t("attributions.jeremy.role"),     department: t("attributions.jeremy.department"),       content: memberContent(t, "jeremy") },
    { title: "Taiba Zeya",                 photo: taiba,     role: t("attributions.taiba.role"),        department: t("attributions.taiba.department"),        content: memberContent(t, "taiba") },
    { title: "Maria Camila Muñoz Vega",    photo: maria,     role: t("attributions.mariaCamila.role"),  department: t("attributions.mariaCamila.department"),  content: memberContent(t, "mariaCamila") },
    { title: "Mariana Villegas",           photo: mariana,   role: t("attributions.mariana.role"),      department: t("attributions.mariana.department"),      content: memberContent(t, "mariana") },
    { title: "Kexin Niu",                  photo: kexin,     role: t("attributions.kexin.role"),        department: t("attributions.kexin.department"),        content: memberContent(t, "kexin") },
    { title: "Sriharsha Chowdarapu",       photo: sriharsha, role: t("attributions.sriharsha.role"),    department: t("attributions.sriharsha.department"),    content: memberContent(t, "sriharsha") },
    { title: "Kevser Ciek",                photo: kevser,    role: t("attributions.kevser.role"),       department: t("attributions.kevser.department"),       content: memberContent(t, "kevser") },
    { title: "Shahad Hersi",               photo: shahad,    role: t("attributions.shahad.role"),       department: t("attributions.shahad.department"),       content: memberContent(t, "shahad") },
    { title: "Zeyad Muazzen",              photo: zeyad,     role: t("attributions.zeyad.role"),        department: t("attributions.zeyad.department"),        content: memberContent(t, "zeyad") },
    { title: "Nauryzbay Menlen",           photo: nauryzbay, role: t("attributions.nauryzbay.role"),    department: t("attributions.nauryzbay.department"),    content: memberContent(t, "nauryzbay") },
    { title: "Nadia Houti",                photo: nadia,     role: t("attributions.nadia.role"),        department: t("attributions.nadia.department"),        content: memberContent(t, "nadia") },
    { title: "Hassan Abuali",              photo: hassan,    role: t("attributions.hassan.role"),       department: t("attributions.hassan.department"),       content: memberContent(t, "hassan") },
    { title: "Shahad Abdulomhssen",        photo: shahada,   role: t("attributions.shahada.role"),      department: t("attributions.shahada.department"),      content: memberContent(t, "shahada") },
    { title: "Raheema Javid",              photo: raheema,   role: t("attributions.raheema.role"),      department: t("attributions.raheema.department"),      content: memberContent(t, "raheema") },
    { title: "Maria Fernanda Gutierrez",   photo: mafer,     role: t("attributions.mariaFernanda.role"), department: t("attributions.mariaFernanda.department"), content: memberContent(t, "mariaFernanda") },
    { heading: t("attributions.headings.principalInvestigators") },
    { title: "Raik Grünberg", photo: null, role: t("attributions.raik.role"), department: t("attributions.raik.department"), content: memberContent(t, "raik") },
    { title: "Wayne Yang",    photo: null, role: t("attributions.wayne.role"), department: t("attributions.wayne.department"), content: memberContent(t, "wayne") },
  ];

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedPage sections={sections} defaultSelected={defaultMember} />
    </PageWrapper>
  );
}
