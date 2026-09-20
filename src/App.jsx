import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState, Suspense } from "react";
import { flushSync } from "react-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import SiteMark from "./components/SiteMark/SiteMark";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import ChunkErrorBoundary, { RELOAD_FLAG } from "./components/ChunkErrorBoundary/ChunkErrorBoundary";
import { getPathMapping } from "./utils";
import styles from "./App.module.scss";

const supportsViewTransitions = typeof document !== "undefined" && !!document.startViewTransition;

export default function App() {
  const pathMapping = getPathMapping();
  const location = useLocation();
  // The location actually rendered by <Routes> — kept one tick behind
  // `location` so the swap can happen *inside* document.startViewTransition
  // (which needs a synchronous DOM mutation to snapshot old vs. new) rather
  // than immediately on click. Browsers without the API just get it set
  // straight away, with a plain CSS fade covering the cut — see
  // .routeFade below and ::view-transition-old/new(root) in index.scss.
  const [displayLocation, setDisplayLocation] = useState(location);
  const title = pathMapping[displayLocation.pathname]?.title;

  useEffect(() => {
    // Hardcoded team identity — see vite.config.ts for why this doesn't read
    // import.meta.env.VITE_TEAM_NAME/VITE_TEAM_YEAR.
    document.title = `${title ? title + " · " : ""}kaust-ksa · iGEM 2026`;
  }, [title]);

  useEffect(() => {
    // App rendering at all means ChunkErrorBoundary's one-time reload (if
    // it fired) actually recovered — clear its flag so a *different* future
    // stale-chunk hit (e.g. after the next deploy) can still trigger a
    // reload instead of being permanently suppressed for this tab's session.
    try {
      sessionStorage.removeItem(RELOAD_FLAG);
    } catch {
      // sessionStorage unavailable — nothing to clear.
    }
  }, []);

  useLayoutEffect(() => {
    // Pages scroll the window (PageWrapper's wrapper has no overflow of its
    // own), and React Router doesn't reset that on navigation — without this
    // a new page opens at whatever scroll position the previous one left.
    // A layout effect (not a plain effect) so it lands synchronously, in the
    // same flush the view transition below snapshots as the "new" state —
    // otherwise the old page would visibly jump-scroll before it fades out.
    window.scrollTo(0, 0);
  }, [displayLocation.pathname]);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsViewTransitions || reduceMotion) {
      setDisplayLocation(location);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setDisplayLocation(location));
    });
    // Navigating again before this transition settles (e.g. clicking two
    // nav links back to back) makes the browser skip it, which rejects
    // these promises with an InvalidStateError — expected under fast
    // navigation, not an error worth surfacing as an unhandled rejection.
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    transition.finished.catch(() => {});
  }, [location, displayLocation]);

  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <div key={displayLocation.pathname} className={supportsViewTransitions ? undefined : styles.routeFade}>
          {/* pages.js's components are React.lazy() (see its own comment) —
              this Suspense boundary covers the one-time fetch of a route's
              chunk the first time it's visited. Null fallback: the page
              background is portaled straight to <body> by PageWrapper, so
              there's already a fully painted backdrop underneath this gap
              rather than a blank flash. ChunkErrorBoundary sits outside it
              for the failure case that fallback doesn't cover — a chunk
              fetch that 404s after a new deploy replaces the old hashes. */}
          <ChunkErrorBoundary>
            <Suspense fallback={null}>
              <Routes location={displayLocation}>
                {Object.entries(pathMapping).map(([path, { title, component: Component }]) => (
                  <Route key={path} path={path} element={<Component title={title} />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ChunkErrorBoundary>
        </div>
        <SiteMark />
        <Menu />
        <Footer />
      </div>
    </div>
  );
}
