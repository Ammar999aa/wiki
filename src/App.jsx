import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useState, Suspense } from "react";
import { flushSync } from "react-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import SiteMark from "./components/SiteMark/SiteMark";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import ChunkErrorBoundary, { RELOAD_FLAG } from "./components/ChunkErrorBoundary/ChunkErrorBoundary";
import { getPathMapping } from "./utils";
import { SITE_URL } from "./site";
import { Stub } from "./pages";
import styles from "./App.module.scss";

const supportsViewTransitions = typeof document !== "undefined" && !!document.startViewTransition;

export default function App() {
  // Stable across renders (pages.js's route list is static) — needed as a
  // real dependency now that the transition effect below reads it directly
  // to preload a route's chunk; a fresh object every render would re-run
  // that effect on every unrelated re-render instead of just on navigation.
  const pathMapping = useMemo(() => getPathMapping(), []);
  const location = useLocation();
  // The location actually rendered by <Routes> — kept one tick behind
  // `location` so the swap can happen *inside* document.startViewTransition
  // (which needs a synchronous DOM mutation to snapshot old vs. new) rather
  // than immediately on click. Browsers without the API just get it set
  // straight away, with a plain CSS fade covering the cut — see
  // .routeFade below and ::view-transition-old/new(root) in index.scss.
  const [displayLocation, setDisplayLocation] = useState(location);
  const title = pathMapping[displayLocation.pathname]?.title;

  const pathname = displayLocation.pathname;

  useEffect(() => {
    // Hardcoded team identity — see vite.config.ts for why this doesn't read
    // import.meta.env.VITE_TEAM_NAME/VITE_TEAM_YEAR. Home gets the bare site
    // name rather than "Home · …" — it's what the search result should say.
    const page = title && pathname !== "/" ? title + " · " : "";
    document.title = `${page}SHIHAB · KAUST-KSA iGEM 2026`;
  }, [title, pathname]);

  useEffect(() => {
    // Search snippet: the page's own `description` from pages.js, else the
    // site-wide one index.html shipped with (read once, before any route
    // overwrites it).
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.dataset.fallback ??= meta.content;
      meta.content = pathMapping[pathname]?.description ?? meta.dataset.fallback;
    }

    // Canonical URL, so Google folds duplicate routes (e.g. /bioreactor-modeling
    // → /modeling) into one result: the first path in pages.js that renders
    // the same component. Stub is shared by every unwritten page, so those
    // each stay their own canonical. Unknown paths (NotFound) get none.
    const component = pathMapping[pathname]?.component;
    const canonicalPath = !component
      ? null
      : component === Stub
        ? pathname
        : Object.keys(pathMapping).find((p) => pathMapping[p].component === component);
    let link = document.querySelector('link[rel="canonical"]');
    if (!canonicalPath) {
      link?.remove();
      return;
    }
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = SITE_URL + (canonicalPath === "/" ? "/" : canonicalPath);
  }, [pathname, pathMapping]);

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

    // Preload the target route's chunk *before* swapping displayLocation.
    // Without this, the swap below makes the new route's lazy() component
    // suspend, Suspense's null fallback renders instead, and the crossfade
    // (View Transition or the plain CSS .routeFade) plays against that
    // blank fallback — finishing well before the chunk actually arrives, so
    // the real page content then just pops in untransitioned. Preloading
    // first means both transition paths animate between two fully-rendered
    // pages instead. `preload` re-runs pages.js's lazyWithPreload() import
    // factory, which resolves near-instantly here if <Link>-hover/whatever
    // already warmed it, or otherwise does the actual one-time fetch.
    let cancelled = false;
    const target = pathMapping[location.pathname];
    const preload = target?.component?.preload?.() ?? Promise.resolve();

    preload.catch(() => {}).then(() => {
      // A second navigation landed before this one's chunk finished — let
      // the newer effect run's own preload/swap own the transition instead
      // of this stale one clobbering it.
      if (cancelled) return;

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
    });

    return () => {
      cancelled = true;
    };
  }, [location, displayLocation, pathMapping]);

  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div
        className={styles.content}
        // Stable portal target for content that needs to sit *below* Menu/
        // Footer in stacking order (both z-index 11/12) but above ordinary
        // page content — see BulbHero.jsx's dim overlay. `.content` itself
        // establishes its own stacking context (position: relative +
        // z-index), so anything portaled to document.body instead would be
        // compared against `.content` as one bundled unit and couldn't sit
        // "between" its children.
        id="app-content"
      >
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
