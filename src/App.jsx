import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import Panel from "./components/Panel/Panel";
import Dropdown from "./components/Dropdown/Dropdown";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <Panel></Panel>
      <Menu></Menu>
    </div>
  );
}