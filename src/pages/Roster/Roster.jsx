import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Roster.module.scss";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import astronautPhoto from "../../assets/apollo17-eva.webp";

// Importing the specific flags used instead of 'flag-icons/css/flag-icons.min.css'
// — that stylesheet references every country's SVG (~140 files, ~4MB), which
// blew past GitLab's CI artifact size limit for a 12MB build. Only 9 are
// ever shown here. Source: flag-icons (MIT) — github.com/lipis/flag-icons
import flagCn from "../../assets/flags/cn.svg";
import flagCo from "../../assets/flags/co.svg";
import flagIn from "../../assets/flags/in.svg";
import flagKz from "../../assets/flags/kz.svg";
import flagPe from "../../assets/flags/pe.svg";
import flagSa from "../../assets/flags/sa.svg";
import flagSg from "../../assets/flags/sg.svg";
import flagTr from "../../assets/flags/tr.svg";
import flagUs from "../../assets/flags/us.svg";

const FLAGS = { cn: flagCn, co: flagCo, in: flagIn, kz: flagKz, pe: flagPe, sa: flagSa, sg: flagSg, tr: flagTr, us: flagUs };

function Flag({ code, width, height, marginInlineStart }) {
  if (!code || !FLAGS[code]) return null;
  return (
    <img
      src={FLAGS[code]}
      alt=""
      style={{ width, height, borderRadius: 3, verticalAlign: "middle", marginInlineStart, display: "inline-block", objectFit: "cover" }}
    />
  );
}

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
import hassan from "../../assets/roster/hassan.png";
import shahada from "../../assets/roster/shahada.png";
import raheema from "../../assets/roster/raheema.png";
import mafer from "../../assets/roster/mafer.png"

const members = [
  { name: "Jeremy Rodrigo Guerrero Alejos", roleKey: "dryLab", memberKey: "jeremy", photo: jeremy, countryCode: "pe" },
  { name: "Taiba Zeya", roleKey: "dryLab", memberKey: "taiba", photo: taiba, countryCode: "in" },
  { name: "Ammar Almarzooq", roleKey: "wiki", memberKey: "ammar", photo: ammar, countryCode: "sa" },
  { name: "Maria Camila Muñoz Vega", roleKey: "wetLab", memberKey: "mariaCamila", photo: maria, countryCode: "co"},
  { name: "Mariana Villegas", roleKey: "wetLab", memberKey: "mariana", photo: mariana, countryCode: "co" },
  { name: "Kexin Niu", roleKey: "dryLab", memberKey: "kexin", photo: kexin, countryCode: "cn" },
  { name: "Génesis Flores Arroyo", roleKey: "publicEngagement", memberKey: "genesis", photo: genesis, countryCode: "pe" },
  { name: "Sriharsha Chowdarapu", roleKey: "wetLab", memberKey: "sriharsha", photo: sriharsha, countryCode: "in" },
  { name: "Kevser Ciek", roleKey: "dryLab", memberKey: "kevser", photo: kevser, countryCode: "tr" },
  { name: "Shahad Hersi", roleKey: "publicEngagement", memberKey: "shahad", photo: shahad, countryCode: "sa" },
  { name: "Francesca Rivas Cuestas", roleKey: "wetLab", memberKey: "francesca", photo: francesca, countryCode: "pe" },
  { name: "Zeyad Muazzen", roleKey: "wetLab", memberKey: "zeyad", photo: zeyad, countryCode: "sa" },
  { name: "Ansal' Diassova", roleKey: "wetLab", memberKey: "ansal", photo: ansal, countryCode: "kz" },
  { name: "Nauryzbay Menlen", roleKey: "dryLab", memberKey: "nauryzbay", photo: nauryzbay, countryCode: "kz" },
  { name: "Nadia Houti", roleKey: "hardware", memberKey: "nadia", photo: nadia, countryCode: "sg" },
  { name: "Hassan Abuali", roleKey: "hardware", memberKey: "hassan", photo: hassan, countryCode: "sa" },
  { name: "Shahad Abdulomhssen", roleKey: "humanPractices", memberKey: "shahada", photo: shahada, countryCode: "sa" },
  { name: "Raheema Javid", roleKey: "publicEngagement", memberKey: "raheema", photo: raheema, countryCode: "us" },
  { name: "Maria Fernanda Gutierrez", roleKey: "humanPractices", memberKey: "mariaFernanda", photo: mafer, countryCode: "pe" },
];

// `photo` (apollo17-eva.webp — Apollo 17 CMP Ronald Evans on a trans-Earth-
// coast EVA, black space void keyed to transparent so it blends into the
// page's own --bg navy) is a one-off background for this page, same pattern
// as Sponsors.jsx's egress-2.webp: PageWrapper renders it `background-size:
// cover` and pinned `fixed`, filling the viewport with no edges showing.
export default function Roster() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(members[0]);

  return (
    <PageWrapper
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        photo: astronautPhoto,
        photoPosition: "center top",
        gradient,
      }}
    >
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
                <h2>
                  {selected.name}
                  <Flag code={selected.countryCode} width={33} height={24} marginInlineStart={24} />
                </h2>
                <h3>{t(`roster.roles.${selected.roleKey}`)}</h3>
                <p>{t(`roster.members.${selected.memberKey}.bio`)}</p>
                <Link
                  to={`/attributions?member=${encodeURIComponent(selected.name)}`}
                  className={styles.seeMore}
                >
                  {t("roster.seeMore")}
                </Link>
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

        {/* Responsive list view */}
        <div className={styles.listContainer}>
          {members.map((member) => (
            <div key={member.name} className={styles.listItem}>
              {member.photo ? (
                <img src={member.photo} className={styles.listPhoto} alt={member.name} />
              ) : (
                <div className={styles.listPhotoPlaceholder} />
              )}
              <div className={styles.listInfo}>
                <h2 className={styles.listName}>
                  {member.name}
                  <Flag code={member.countryCode} width={22} height={16} marginInlineStart={8} />
                </h2>
                <p className={styles.listRole}>{t(`roster.roles.${member.roleKey}`)}</p>
                <p className={styles.listBio}>{t(`roster.members.${member.memberKey}.bio`)}</p>
                <Link
                  to={`/attributions?member=${encodeURIComponent(member.name)}`}
                  className={styles.seeMore}
                >
                  {t("roster.seeMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="https://www.nasa.gov/image-detail/apollo-17-spacewalk-december-1972/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoCredit}
      >
        Apollo 17 EVA: NASA
      </a>
    </PageWrapper>
  );
}