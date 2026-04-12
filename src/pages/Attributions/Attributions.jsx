import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedPage from "../../components/SectionedPage/SectionedPage";
import { useLanguage } from "../../i18n/LanguageContext";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

export default function Attributions() {
  const { t } = useLanguage();

  const sections = [
    { heading: t("attributions.headings.students") },
    { title: "Ansal' Diassova", content: <p>{t("attributions.ansal.content")}</p> },
    { title: "Ammar Almarzooq", content: <p>{t("attributions.ammar.content")}</p> },
    { title: "Francesca Rivas Cuestas", content: <p>{t("attributions.francesca.content")}</p> },
    { title: "Génesis Flores Arroyo", content: <p>{t("attributions.genesis.content")}</p> },
    { heading: t("attributions.headings.principalInvestigators") },
    { title: "Raik Grünberg", content: <p>{t("attributions.raik.content")}</p> },
    { title: "Wayne Yang", content: <p>{t("attributions.wayne.content")}</p> },
  ];

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedPage sections={sections} />
    </PageWrapper>
  );
}