import LiquidGlass from "../LiquidGlass/LiquidGlass";
import styles from "./Dropdown.module.scss";

export default function Dropdown() {
  return <div className={styles.container}>
    <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
        <nav className={styles.dropdown}>
            <div>
                Roster
            </div>
            <div>
                Attributions
            </div>
            <div>
                Collaborations
            </div>
            <div>
                Partnerships
            </div>
        </nav>
    </LiquidGlass>
  </div>
  
;
}