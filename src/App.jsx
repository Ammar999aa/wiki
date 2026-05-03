import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import styles from "./App.module.scss";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";
import Roster from "./pages/Roster/Roster";
import Attributions from "./pages/Attributions/Attributions";
import WetLab from "./pages/WetLab/WetLab";
import DryLab from "./pages/DryLab/DryLab";
import HumanPractices from "./pages/HumanPractices/HumanPractices";
import Safety from "./pages/Safety/Safety";
import Engagement from "./pages/Engagement/Engagement";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/Roster" element={<Roster />} />
          <Route path="/Attributions" element={<Attributions />} />
          <Route path="/wetlab" element={<WetLab />} />
          <Route path="/drylab" element={<DryLab />} />
          <Route path="/human-practices" element={<HumanPractices />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/engagement" element={<Engagement />} />
        </Routes>
        <Menu></Menu>
      </div>
    </div>
  );
}