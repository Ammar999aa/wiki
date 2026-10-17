import { useEffect, useRef, useState } from "react";
import styles from "./StructureCanvas.module.scss";

// The interactive, rotatable 3D model itself: loads a structure and renders
// it, nothing around it. Callers supply the box it fills (and whatever
// caption the structure needs — every consumer must say whose data it is;
// see ProteinLibrary's StructureViewer and SectionedArticle's
// ArticleStructure, both of which label these as published reference
// structures rather than this team's own results).
//
// 3Dmol.js is loaded with a dynamic import, not a top-level one: at ~500KB
// minified it's the single biggest dependency in this app by far, and most
// visits never reach a structure at all. Splitting it into its own chunk
// means that cost is paid only by someone who actually sees one.
//
// `highlight` is a comma-separated chain list ("K,L"), not an array, so the
// load effect's dependencies stay stable across renders.
//
// Everything here is also gated on the viewer being *on screen*. An article
// page can hold half a dozen of these (see wetlab-design.md), and each one
// is a live WebGL context whose spin animation renders continuously — six
// of those running at once, most of them scrolled out of sight, made that
// page visibly janky to scroll. So a model is fetched only once it comes
// near the viewport, and spins only while it's actually visible; 3Dmol's
// render loop stops with the spin, which is what gives the time back.
export default function StructureCanvas({ file, color, pdbId, highlight, highlightColor }) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ready" | "error"
  const [onScreen, setOnScreen] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    // A margin so a model is already loaded by the time it's scrolled to,
    // rather than popping in blank.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotation yes, zoom no. 3Dmol binds its scroll-to-zoom handler on its own
  // canvas with {passive:false} and preventDefault()s the event, so a wheel
  // or trackpad scroll that happened to pass over a model ate the page's
  // scroll instead of moving it. Caught here in the capture phase on this
  // wrapper — a real ancestor of that canvas, so it always runs first — and
  // stopped before 3Dmol sees it. Nothing calls preventDefault, so the page
  // scrolls exactly as it does anywhere else.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const swallow = (e) => e.stopPropagation();
    frame.addEventListener("wheel", swallow, { capture: true, passive: true });
    return () => frame.removeEventListener("wheel", swallow, { capture: true });
  }, []);

  useEffect(() => {
    if (!file || !started) return undefined;
    let cancelled = false;
    const controller = new AbortController();
    setStatus("loading");

    (async () => {
      try {
        const [{ createViewer }, res] = await Promise.all([
          import("3dmol/build/3Dmol.es6-min.js"),
          fetch(file, { signal: controller.signal }),
        ]);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const { data: pdbText } = await res.json();
        if (cancelled || !containerRef.current) return;

        // backgroundAlpha (not an alpha channel tacked onto backgroundColor,
        // which 3Dmol's color parsing ignores) is what actually gets a
        // transparent canvas — without it the "transparent" background
        // renders as solid black regardless of what backgroundColor says,
        // which is what made this look like an opaque screen dropped onto
        // the card instead of the model sitting on the glass panel itself.
        const viewer = createViewer(containerRef.current, {
          backgroundColor: "#000000",
          backgroundAlpha: 0,
        });
        viewer.addModel(pdbText, "pdb");
        viewer.setStyle({}, { cartoon: { color: color || "spectrum" } });
        // In a complex, the chain the page is actually about can be a few
        // residues against something far bigger (the Dsup motif bound to a
        // whole nucleosome, say). `highlight` names those chains so they're
        // picked out — sticks as well as cartoon, since a short peptide's
        // cartoon ribbon is nearly invisible at this scale.
        // Kept as a string, not an array, so this effect's dependency is
        // stable: a fresh array prop on every render would re-run the whole
        // load.
        const chains = highlight?.split(",").map((c) => c.trim()).filter(Boolean);
        if (chains?.length) {
          const tint = highlightColor || "#FFD84D";
          viewer.setStyle(
            { chain: chains },
            { cartoon: { color: tint }, stick: { color: tint, radius: 0.25 } },
          );
        }
        viewer.zoomTo();
        viewer.render(); // one frame; the spin effect below drives the rest
        viewerRef.current = viewer;
        setStatus("ready");
      } catch (err) {
        if (!cancelled && err.name !== "AbortError") {
          console.error("StructureCanvas: failed to load", pdbId ?? file, err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
      // 3Dmol has no documented dispose() — dropping the container's own
      // content (about to happen anyway, this component is unmounting) is
      // enough to release the canvas/WebGL context with it.
      viewerRef.current?.spin(false);
      viewerRef.current = null;
    };
  }, [file, color, pdbId, started, highlight, highlightColor]);

  // Spin only while on screen: that's the render loop, so an off-screen
  // model costs nothing until it's scrolled back to.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (status !== "ready" || !viewer) return undefined;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (onScreen && !still) viewer.spin("y", 0.4);
    else viewer.spin(false);
    return () => viewer.spin(false);
  }, [onScreen, status]);

  return (
    <div ref={frameRef} className={styles.viewer}>
      <div ref={containerRef} className={styles.canvas} />
      {status === "loading" && <div className={styles.status}>Loading structure…</div>}
      {status === "error" && <div className={styles.status}>Couldn&rsquo;t load the structure.</div>}
    </div>
  );
}
