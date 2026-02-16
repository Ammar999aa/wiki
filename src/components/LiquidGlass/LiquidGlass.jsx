import styles from "./LiquidGlass.module.scss";

export default function LiquidGlass({
  children,
  radius = 28,
  blur = 8,
  opacity = 0.15,
  color = [255, 255, 255], // default white tint
}) {
  const [r, g, b] = color;

  return (
    <div
      className={styles.liquidGlass}
      style={{
        "--radius": `${radius}px`,
        "--glass-blur": `${blur}px`,
        "--glass-opacity": opacity,
        "--glass-r": r,
        "--glass-g": g,
        "--glass-b": b,
      }}
    >
      {children}
    </div>
  );
}