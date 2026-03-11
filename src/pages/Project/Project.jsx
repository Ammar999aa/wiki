import SectionedArticle from "../../components/SectionedArticle/SectionedArticle";
import hydrogel from "../../assets/hydrogel.png";

const sections = [
  { title: "Overview", content: null },
  { title: "Background", content: null },
  {
    title: "Pectin Hydrogel",
    content: (
      <>
        <h3>Hydrogel composition</h3>
        <h4>3.1 Chemical Composition</h4>
        <ul>
          <li>Pectin is a natural, anionic polysaccharide primarily composed of α-(1→4)-linked D-galac-turonic acid units, extracted mainly from citrus peels and apple pomace. In aqueous environments, pectin can form hydrogels through physical or ionic crosslinking, making it attractive for biomedical, pharmaceutical, and food applications.</li>
          <li>Generally brittle compared to alginate. Mechanical reinforcement possible via: Blending (ex: gelatin, chitosan) or Nanofillers (cellulose nanocrystals, nanoparticles)</li>
          <li>High water uptake capacity due to hydrophilic carboxyl groups (important for drugs encapsulation)</li>
          <li>Exhibits viscoelastic behavior</li>
          <li>Typically, nanometer scale pores → permits diffusion of water and small molecules. Diffusion rate decreases with: Increased crosslinking and Higher pectin concentration</li>
          <li>Non-toxic, biocompatible, and biodegradable. Degraded enzymatically by pectinases or hydrolytically. Used widely for oral, colon and wound dressing drug delivery</li>
          <li>Stable under physiological temperature, sensitive to EDTA</li>
          <img src={hydrogel} alt="Hydrogel" />
        </ul>
      </>
    ),
  },
  { title: "Hydrogel Engineering", content: null },
  { title: "System Design", content: null },
  { title: "Experimental Validation", content: null },
  { title: "Applications", content: null },
];

export default function Project() {
  return <SectionedArticle sections={sections} defaultSelected="Pectin Hydrogel" />;
}