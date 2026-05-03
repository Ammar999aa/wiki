import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sectionsEn from "../../content/en/human-practices.md";
import sectionsAr from "../../content/ar/human-practices.md";
import sectionsEs from "../../content/es/human-practices.md";
import sectionsFr from "../../content/fr/human-practices.md";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useLanguage } from "../../i18n/LanguageContext";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

const sectionsByLang = { en: sectionsEn, ar: sectionsAr, es: sectionsEs, fr: sectionsFr };

export default function HumanPractices() {
  const { lang } = useLanguage();
  const sections = sectionsByLang[lang] ?? sectionsEn;

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedArticle sections={sections} defaultSelected={sections[0]?.title} />
    </PageWrapper>
  );
}
