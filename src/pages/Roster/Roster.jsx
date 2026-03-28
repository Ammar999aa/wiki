import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
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
  { name: "Jeremy Rodrigo Guerrero Alejos", roleKey: "dryLab", memberKey: "jeremy", photo: jeremy },
  { name: "Taiba Zeya", roleKey: "dryLab", memberKey: "taiba", photo: taiba },
  { name: "Ammar Almarzooq", roleKey: "wiki", memberKey: "ammar", photo: ammar },
  { name: "Maria Camila Muñoz Vega", roleKey: "wetLab", memberKey: "mariaCamila", photo: maria },
  { name: "Mariana Villegas", roleKey: "wetLab", memberKey: "mariana", photo: mariana },
  { name: "Kexin Niu", roleKey: "dryLab", memberKey: "kexin", photo: kexin },
  { name: "Génesis Flores Arroyo", roleKey: "publicEngagement", memberKey: "genesis", photo: genesis },
  { name: "Sriharsha Chowdarapu", roleKey: "wetLab", memberKey: "sriharsha", photo: sriharsha },
  { name: "Kevser Ciek", roleKey: "dryLab", memberKey: "kevser", photo: kevser },
  { name: "Shahad Hersi", roleKey: "publicEngagement", memberKey: "shahad", photo: shahad },
  { name: "Francesca Rivas Cuestas", roleKey: "wetLab", memberKey: "francesca", photo: francesca },
  { name: "Zeyad Muazzen", roleKey: "wetLab", memberKey: "zeyad", photo: zeyad },
  { name: "Ansal' Diassova", roleKey: "wetLab", memberKey: "ansal", photo: ansal },
  { name: "Nauryzbay Menlen", roleKey: "dryLab", memberKey: "nauryzbay", photo: nauryzbay },
  { name: "Nadia Houti", roleKey: "hardware", memberKey: "nadia", photo: nadia },
  { name: "Hanke Li", roleKey: "hardware", memberKey: "hanke", photo: hanke },
  { name: "Claudia Vidales", roleKey: "publicEngagement", memberKey: "claudia", photo: claudia },
  { name: "Raheema Javid", roleKey: "publicEngagement", memberKey: "raheema", photo: raheema },
  { name: "Maria Fernanda Gutierrez", roleKey: "dryLab", memberKey: "mariaFernanda", photo: null },
];

export default function Roster() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(members[0]);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.container}>
        <div className={styles.title}>
          <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <h1>{t("roster.title")}</h1>
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
                <h3>{t(`roster.roles.${selected.roleKey}`)}</h3>
                <p>{t(`roster.members.${selected.memberKey}.bio`)}</p>
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