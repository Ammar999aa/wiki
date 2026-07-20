import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import { getPathMapping } from "./utils";
import styles from "./App.module.scss";

export default function App() {
  const pathMapping = getPathMapping();
  const { pathname } = useLocation();
  const title = pathMapping[pathname]?.title;

  useEffect(() => {
    document.title = `${title ? title + " · " : ""}${import.meta.env.VITE_TEAM_NAME} · iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <Routes>
          {Object.entries(pathMapping).map(([path, { title, component: Component }]) => (
            <Route key={path} path={path} element={<Component title={title} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Menu />
        <Footer />
      </div>
    </div>
  );
}
