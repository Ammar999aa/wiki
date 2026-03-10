import styles from "./Project.module.scss";
import Panel from "../../components/Panel/Panel";
import Article from "../../components/Article/Article"
import hydrogel from "../../assets/hydrogel.png";

export default function Project() {
    return (
    <div>
        <Panel/>
        <Article>
            <h2>Pectin Hydrogel</h2>
            <h3>Hydrogel composition</h3>
            <h4>3.1 Chemical Composition</h4>
            <ul>
                <li>Pectin is a natural, anionic polysaccharide primarily composed of α-(1→4)-linked D-galac-turonic acid units, extracted mainly from citrus peels and apple pomace. In aqueous environments, pectin can form hydrogels through physical or ionic crosslinking, making it attractive for biomedical, pharmaceutical, and food applications.</li>
                <li>Generally brittle compared to alginate. Mechanical reinforcement possible via: Blending (ex: gelatin, chitosan) or Nanofillers (cellulose nanocrystals, nanoparticles)</li>
                <li>High water uptake capacity due to hydrophilic carboxyl groups (important for drugs encapsulation)</li>
                <li>Exhibits viscoelastic behavior</li>
                <li>Typically, nanometer scale pores → permits diffusion of water and small molecules. Diffusion rate decreases with: Increased crosslinking and Higher pectin concentration</li>
                <li>Non-toxic, biocompatible, and biodegradable. Degraded enzymatically by pectinases or hydrolytically. Used widely for oral, colon and wound dressing drug delivery </li>
                <li>Stable under physiological temperature, sensitive to EDTA</li>
                <img src={hydrogel} alt="Hydrogel"/>
            </ul>
        </Article>
    </div>
    );
}