import { useState } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import styles from "./Panel.module.scss";

export default function Menu() {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div className={`${styles.container}  ${collapsed ? styles.collapsed : ""}`}>
            <LiquidGlass radius={0} color={[52, 52, 52]} opacity={0.25}>
                <div className={`${styles.contents}`}>
                    <button
                        type="button"
                        className={`${styles.arrow} ${collapsed ? styles.flipped : ""}`}
                        aria-collapsed={collapsed}
                        onClick={() => setCollapsed((v) => !v)}
                    >
                        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.75 46.5V19L29 32.75L42.75 46.5Z" fill="#E3E3E3" />
                        </svg>
                    </button>
                    <h2 className={styles.item}>Overview</h2>
                    <h2 className={styles.item}>Background</h2> 
                    <h2 className={`${styles.item} ${styles.selected}`}>Pectin Hydrogel</h2> 
                    <h2 className={styles.item}>Hydrogel Engineering</h2>
                    <h2 className={styles.item}>System Design</h2>
                    <h2 className={styles.item}> Experimental Validation</h2>
                    <h2 className={styles.item}>Applications</h2>
                </div>
            </LiquidGlass>
        </div>
    )
;
}

