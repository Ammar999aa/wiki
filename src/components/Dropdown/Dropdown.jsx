import { Link } from "react-router-dom";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import styles from "./Dropdown.module.scss";

export default function Dropdown({ items, x, y, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={styles.container}
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
        <nav className={styles.dropdown}>
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={styles.dropdownItem}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </LiquidGlass>
    </div>
  );
}