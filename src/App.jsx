import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
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
import Stub from "./pages/Stub/Stub";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/attributions" element={<Attributions />} />
          <Route path="/wetlab" element={<WetLab />} />
          <Route path="/drylab" element={<DryLab />} />
          <Route path="/human-practices" element={<HumanPractices />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/contribution" element={<Stub title="Contribution" />} />
          <Route path="/engineering" element={<Stub title="Engineering" />} />
          <Route path="/education" element={<Stub title="Education" />} />
          <Route path="/entrepreneurship" element={<Stub title="Entrepreneurship" />} />
          <Route path="/hardware" element={<Stub title="Hardware" />} />
          <Route path="/inclusivity" element={<Stub title="Inclusivity" />} />
          <Route path="/measurement" element={<Stub title="Measurement" />} />
          <Route path="/model" element={<Stub title="Model" />} />
          <Route path="/plant" element={<Stub title="Plant Synthetic Biology" />} />
          <Route path="/safety-and-security" element={<Stub title="Safety & Security" />} />
          <Route path="/software" element={<Stub title="Software" />} />
          <Route path="/sustainability" element={<Stub title="Sustainable Development" />} />
        </Routes>
        <Menu></Menu>
        <p className={styles.licenseBar}>
          <a
            href="https://gitlab.igem.org/2026/kaust-ksa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            gitlab.igem.org/2026/kaust-ksa
          </a>
          {" · Content licensed under "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY 4.0
          </a>
          {" · KAUST-KSA iGEM 2026"}
          {" · "}
          {"Typefaces: Inter, IBM Plex Sans Arabic, Aref Ruqaa — SIL Open Font License 1.1"}
        </p>
      </div>
    </div>
  );
}