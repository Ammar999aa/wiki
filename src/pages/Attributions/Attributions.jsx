import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SectionedPage from "../../components/SectionedPage/SectionedPage";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

const sections = [
  { title: "Ansal' Diassova", content: <p>Content here</p> },
  { title: "Ammar Almarzooq", content: <p>Content here</p> },
  { title: "Francesca Rivas Cuestas", content: <p>Content here</p> },
  { title: "Génesis Flores Arroyo", content: <p>Content here</p> },
];

export default function Attributions() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <SectionedPage sections={sections} />
    </PageWrapper>
  );
}