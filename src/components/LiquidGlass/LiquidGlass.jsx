import styles from "./LiquidGlass.module.scss";

export default function LiquidGlass({ children }) {
  return <div className={styles.liquidGlass}>{children}</div>;
}
