import styles from "./LiquidGlass.module.scss";

export default function LiquidGlass({ children, radius = 28 }) {
  return (
    <div
      className={styles.liquidGlass}
      style={{ "--radius": `${radius}px` }}
    >
      {children}
    </div>
  );
}