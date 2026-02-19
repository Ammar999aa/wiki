import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import LiquidGlass from "./components/LiquidGlass/LiquidGlass";
import Menu from "./components/Menu/Menu";
import Panel from "./components/Panel/Panel";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <LiquidGlass>
        <div style={{ padding: "40px", color: "white" }}>
          Liquid Glass Content
        </div>
      </LiquidGlass>
      <Panel></Panel>
      <Menu></Menu>
    </div>
  );
}