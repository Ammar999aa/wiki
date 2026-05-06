import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import styles from "./App.module.scss";
import Home from "./pages/Home/Home";
import Roster from "./pages/Roster/Roster";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Roster" element={<Roster />} />
        </Routes>
      </div>
    </div>
  );
}