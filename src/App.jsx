import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Project from "./pages/Project";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      <Menu></Menu>
    </div>
  );
}