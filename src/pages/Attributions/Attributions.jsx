import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedPage from "../../components/SectionedPage/SectionedPage";
import { useLanguage } from "../../i18n/LanguageContext";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

import ansal from "../../assets/roster/ansal.png";
import ammar from "../../assets/roster/ammar.png";
import francesca from "../../assets/roster/francesca.png";
import genesis from "../../assets/roster/genesis.png";

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

  const sections = [
    { heading: t("attributions.headings.students") },
    {
      title: "Ansal' Diassova",
      photo: ansal,
      role: t("attributions.ansal.role"),
      department: t("attributions.ansal.department"),
      content: memberContent(t, "ansal"),
    },
    {
      title: "Ammar Almarzooq",
      photo: ammar,
      role: t("attributions.ammar.role"),
      department: t("attributions.ammar.department"),
      content: memberContent(t, "ammar"),
    },
    {
      title: "Francesca Rivas Cuestas",
      photo: francesca,
      role: t("attributions.francesca.role"),
      department: t("attributions.francesca.department"),
      content: memberContent(t, "francesca"),
    },
    {
      title: "Génesis Flores Arroyo",
      photo: genesis,
      role: t("attributions.genesis.role"),
      department: t("attributions.genesis.department"),
      content: memberContent(t, "genesis"),
    },
    { heading: t("attributions.headings.principalInvestigators") },
    {
      title: "Raik Grünberg",
      photo: null,
      role: t("attributions.raik.role"),
      department: t("attributions.raik.department"),
      content: memberContent(t, "raik"),
    },
    {
      title: "Wayne Yang",
      photo: null,
      role: t("attributions.wayne.role"),
      department: t("attributions.wayne.department"),
      content: memberContent(t, "wayne"),
    },
  ];

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedPage sections={sections} />
    </PageWrapper>
  );
}
