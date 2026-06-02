import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Footer from "./components/Footer/Footer";
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
        <Footer />
      </div>
    </div>
  );
}