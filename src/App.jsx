import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import styles from "./App.module.scss";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";
import Roster from "./pages/Roster/Roster";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/Roster" element={<Roster />} />
        </Routes>
        <Menu></Menu>
      </div>
    </div>
  );
}