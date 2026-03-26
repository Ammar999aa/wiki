import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import sections from "../../content/example-article.md";

export default function Project() {
  return <SectionedArticle sections={sections} defaultSelected="Pectin Hydrogel" />;
}