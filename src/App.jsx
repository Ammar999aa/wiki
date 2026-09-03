import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import SiteMark from "./components/SiteMark/SiteMark";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import { getPathMapping } from "./utils";
import styles from "./App.module.scss";

export default function App() {
  const pathMapping = getPathMapping();
  const { pathname } = useLocation();
  const title = pathMapping[pathname]?.title;

  useEffect(() => {
    // Hardcoded team identity — see vite.config.ts for why this doesn't read
    // import.meta.env.VITE_TEAM_NAME/VITE_TEAM_YEAR.
    document.title = `${title ? title + " · " : ""}kaust-ksa · iGEM 2026`;
  }, [title]);

  useEffect(() => {
    // Pages scroll the window (PageWrapper's wrapper has no overflow of its
    // own), and React Router doesn't reset that on navigation — without this
    // a new page opens at whatever scroll position the previous one left.
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <SiteMark />
        <Menu />
        <Footer />
      </div>
    </div>
  );
}
