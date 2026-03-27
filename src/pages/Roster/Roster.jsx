import { useState } from "react";
import styles from "./Roster.module.scss";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

import jeremy from "../../assets/roster/jeremy.png";
import taiba from "../../assets/roster/taiba.png";
import ammar from "../../assets/roster/ammar.png";
import genesis from "../../assets/roster/genesis.png";
import kexin from "../../assets/roster/kexin.png";
import maria from "../../assets/roster/maria.png";
import mariana from "../../assets/roster/mariana.png";
import sriharsha from "../../assets/roster/sriharsha.png";
import kevser from "../../assets/roster/kevser.png";
import shahad from "../../assets/roster/shahad.png";
import francesca from "../../assets/roster/francesca.png";
import nauryzbay from "../../assets/roster/nauryzbay.png";
import ansal from "../../assets/roster/ansal.png";
import zeyad from "../../assets/roster/zeyad.png";
import nadia from "../../assets/roster/nadia.png";
import hanke from "../../assets/roster/hanke.png";
import claudia from "../../assets/roster/claudia.png";
import raheema from "../../assets/roster/raheema.png";

const members = [
  { name: "Jeremy Rodrigo Guerrero Alejos", role: "Dry Lab", bio: "Background in bioengineering with main focus on bioinformatics, analysis of transcriptomics and proteomics data. Some of my skills include: Python, Nextflow, and R. Participated and won previously the iGEM Design League. Background in bioengineering with main focus on bioinformatics, analysis of transcriptomics and proteomics data. Some of my skills include: Python, Nextflow, and R. Participated and won previously the iGEM Design League. Background in bioengineering with main focus on bioinformatics, analysis of transcriptomics and proteomics data. Some of my skills include: Python, Nextflow, and R. Participated and won previously the iGEM Design League.", photo: jeremy },
  { name: "Taiba Zeya", role: "Dry Lab", bio: "Bio coming soon.", photo: taiba },
  { name: "Ammar Almarzooq", role: "Wiki", bio: "Background in computer science with software engineering experience, specializing in fronted web development and user experience design.", photo: ammar },
  { name: "Maria Camila Muñoz Vega", role: "Wet Lab", bio: "Bio coming soon.", photo: maria },
  { name: "Mariana Villegas", role: "Wet Lab", bio: "Bio coming soon.", photo: mariana },
  { name: "Kexin Niu", role: "Dry Lab", bio: "Bio coming soon.", photo: kexin },
  { name: "Génesis Flores Arroyo", role: "Public Engagement", bio: "Bio coming soon.", photo: genesis },
  { name: "Sriharsha Chowdarapu", role: "Wet Lab", bio: "Bio coming soon.", photo: sriharsha },
  { name: "Kevser Ciek", role: "Dry Lab", bio: "Bio coming soon.", photo: kevser },
  { name: "Shahad Hersi", role: "Public Engagement", bio: "Background in biology with clinical and infectious disease research experience as well as teaching and project coordination experience.", photo: shahad },
  { name: "Francesca Rivas Cuestas", role: "Wet Lab", bio: "Background in bioengineering with experience in biochemistry (protein expression in bacteria, insect and mammalian cells, and purification), biophysical (MST), and bioimaging assays (fluorescence and confocal microscopy).", photo: francesca },
  { name: "Zeyad Muazzen", role: "Wet Lab", bio: "Bio coming soon.", photo: zeyad },
  { name: "Ansal' Diassova", role: "Wet Lab", bio: "Background in synthetic biology and materials science with experience in drug delivery, molecular biology techniques (flow cytometry, cytotoxicity assays, etc), protein expression in mammalian and bacterial cells, genetic engineering, and biochemistry. iGEM team lead in 2024.", photo: ansal },
  { name: "Nauryzbay Menlen", role: "Dry Lab", bio: "Background in economics with experience in data science analytics and predictive modelling.", photo: nauryzbay },
  { name: "Nadia Houti", role: "Hardware", bio: "Background in mechanical engineering with wet lab experience in cell culture and hydrogel synthesis, and experience in prototyping and design.", photo: nadia },
  { name: "Hanke Li", role: "Hardware", bio: "Bio coming soon.", photo: hanke },
  { name: "Claudia Vidales", role: "Public Engagement", bio: "Bio coming soon.", photo: claudia },
  { name: "Raheema Javid", role: "Public Engagement", bio: "Bio coming soon.", photo: raheema },
  { name: "Maria Fernanda Gutierrez", role: "Drylab", bio: "Bio coming soon.", photo: null },
];

export default function Roster() {
  const [selected, setSelected] = useState(members[0]);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.container}>
        <div className={styles.title}>
          <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <h1>TEAM</h1>
          </LiquidGlass>
        </div>

        <div className={styles.card}>
          <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <div className={styles.content}>
              {selected.photo ? (
                <img src={selected.photo} alt={selected.name} />
              ) : (
                <div className={styles.placeholder} />
              )}
              <div className={styles.bio}>
                <h2>{selected.name}</h2>
                <h3>{selected.role}</h3>
                <p>{selected.bio}</p>
              </div>
            </div>
          </LiquidGlass>
        </div>

        <div className={styles.roster}>
          {members.map((member) => (
            <div
              key={member.name}
              className={`${styles.person} ${member === selected ? styles.selected : ""}`}
              onClick={() => setSelected(member)}
            >
              <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                {member.photo ? (
                  <img src={member.photo} className={styles.icon} alt={member.name} />
                ) : (
                  <div className={styles.iconPlaceholder} />
                )}
              </LiquidGlass>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}