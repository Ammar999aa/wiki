import styles from "./Roster.module.scss";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import jeremy from "../../assets/roster/Jeremy.png";

export default function Roster() {
    return (
    <div>
      <div className={styles.title}>
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <h1>TEAM</h1>
        </LiquidGlass>
      </div>
      <div className={styles.card}>
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} className={styles.glass}>
            <div className={styles.content}>
                <img src={jeremy}/>
                <div>
                    <h2>Jeremy Rodrigo Guerrero</h2>
                    <h3>Dry Lab</h3>
                    <p>Jeremy is very serious about working with dry stuff in the dry lab. In his free time, Jeremy eats patacones. </p>
                </div>
            </div>
        </LiquidGlass>
      </div>
      <div className={styles.roster}>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
        <div className={styles.person}>
            <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
                <img src={jeremy} className={styles.icon}/>
            </LiquidGlass>
        </div>
      </div>
    </div>
    );
  }