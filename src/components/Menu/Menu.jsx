import LiquidGlass from "../LiquidGlass/LiquidGlass";
import styles from "./Menu.module.scss";

export default function Menu() {
  return <div className={styles.container}>
    <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
        <nav className={styles.menu}>
            <div>
                Project
            </div>
            <div>
                Wet Lab
            </div>
            <div>
                Dry Lab
            </div>
            <div>
                Human Practices
            </div>
            <div>
                Team
            </div>
            <div>
                Safety
            </div>
            <div>
                Engagement
            </div>
        </nav>
    </LiquidGlass>
  </div>
  
;
}