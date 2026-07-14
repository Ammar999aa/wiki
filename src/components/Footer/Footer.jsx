import styles from "./Footer.module.scss";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import earth  from "../../assets/earth.webp";
import nti    from "../../assets/sponsors/nti.png";
import bese   from "../../assets/sponsors/bese.png";
import lem    from "../../assets/sponsors/lem.png";
import biomed from "../../assets/sponsors/biomed.png";
import bk     from "../../assets/sponsors/bk.png";
import br     from "../../assets/sponsors/br.png";
import gs     from "../../assets/sponsors/gs.png";
import sg     from "../../assets/sponsors/sg.png";

const SPONSORS = [
  { id: "nti",    src: nti,    name: "NTI",             nudge:   0 },
  { id: "bese",   src: bese,   name: "BESE",            nudge:  22 },
  { id: "lem",    src: lem,    name: "LEM",             nudge:  -8 },
  { id: "biomed", src: biomed, name: "BioMed",          nudge:  30 },
  { id: "bk",     src: bk,     name: "Burger King",     nudge: -14 },
  { id: "br",     src: br,     name: "Baskin-Robbins",  nudge:  16 },
  { id: "gs",     src: gs,     name: "GS",              nudge:  -4 },
  { id: "sg",     src: sg,     name: "SnapGene",        nudge:  24 },
];

const ANIM = ["floatA", "floatB", "floatC", "floatD"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={earth} alt="" className={styles.earth} aria-hidden="true" />
      <p className={styles.label}>Supported by</p>
      <div className={styles.row}>
        {SPONSORS.map(({ id, src, name, nudge }, i) => (
          <div
            key={id}
            className={`${styles.slot} ${styles[ANIM[i % ANIM.length]]}`}
            style={{
              animationDelay: `${-(i * 1.15).toFixed(2)}s`,
              marginTop: `${nudge}px`,
            }}
          >
            <LiquidGlass radius={32} opacity={0.05} color={[255, 255, 255]}>
              <div className={styles.pill}>
                <img src={src} alt={name} className={styles.logo} />
              </div>
            </LiquidGlass>
          </div>
        ))}
      </div>
      <p className={styles.meta}>
        <a
          href="https://gitlab.igem.org/2026/kaust-ksa/"
          target="_blank"
          rel="noopener noreferrer"
        >
          gitlab.igem.org/2026/kaust-ksa
        </a>
        {" · "}
        Content licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>
        {" · "}
        {'"Twin Blue Marbles" — NASA image by Reto Stöckli, based on data from NASA and NOAA. '}
        <a
          href="https://science.nasa.gov/earth/earth-observatory/twin-blue-marbles-8108/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
        {" (public domain)"}
      </p>
    </footer>
  );
}
