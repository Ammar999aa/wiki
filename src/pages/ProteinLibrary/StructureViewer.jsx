import { useEffect, useRef, useState } from "react";
import styles from "./ProteinLibrary.module.scss";

// Renders `protein.structure` (see proteins.js) as an interactive, rotatable
// 3D model — a real published structure, bundled locally (see proteins.js
// for why this isn't on static.igem.wiki instead). Nothing renders at all
// when a protein has no `structure` entry, so most cards are unaffected —
// see proteins.js for which ones do and why.
//
// 3Dmol.js is loaded with a dynamic import, not a top-level one: at ~500KB
// minified it's the single biggest dependency in this app by far, and
// almost every visit to this page will never open a card that has a
// structure. Splitting it into its own chunk means that cost is paid only
// by someone who actually opens one.
export default function StructureViewer({ structure, color }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  useEffect(() => {
    if (!structure) return undefined;
    let cancelled = false;
    let viewer = null;
    const controller = new AbortController();

    (async () => {
      try {
        const [{ createViewer }, res] = await Promise.all([
          import("3dmol/build/3Dmol.es6-min.js"),
          fetch(structure.file, { signal: controller.signal }),
        ]);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        // structure.file now points at a .json wrapper ({format, data}), not
        // a raw .pdb — see proteins.js for why — so unwrap it here rather
        // than treating the response body itself as PDB text.
        const { data: pdbText } = await res.json();
        if (cancelled || !containerRef.current) return;

        // backgroundAlpha (not an alpha channel tacked onto backgroundColor,
        // which 3Dmol's color parsing ignores) is what actually gets a
        // transparent canvas — without it the "transparent" background
        // renders as solid black regardless of what backgroundColor says,
        // which is what made this look like an opaque screen dropped onto
        // the card instead of the model sitting on the glass panel itself.
        viewer = createViewer(containerRef.current, { backgroundColor: "#000000", backgroundAlpha: 0 });
        viewer.addModel(pdbText, "pdb");
        viewer.setStyle({}, { cartoon: { color: color || "spectrum" } });
        viewer.zoomTo();
        viewer.render();
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          viewer.spin("y", 0.4);
        }
        setStatus("ready");
      } catch (err) {
        if (!cancelled && err.name !== "AbortError") {
          console.error("StructureViewer: failed to load", structure.pdbId, err);
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
      viewer?.spin(false);
    };
  }, [structure, color]);

  if (!structure) return null;

  // Floated right rather than its own full-width section — Function/
  // Applications/Why below wrap around it in the freed-up space instead of
  // each getting pushed underneath a tall stacked block.
  return (
    <div className={styles.structureFloat}>
      <p className={styles.detailLabel}>Structure</p>
      <div className={styles.structureViewer}>
        <div ref={containerRef} className={styles.structureCanvas} />
        {status === "loading" && <div className={styles.structureStatus}>Loading structure…</div>}
        {status === "error" && (
          <div className={styles.structureStatus}>Couldn&rsquo;t load the structure.</div>
        )}
      </div>
      {/* Unambiguous on purpose — this is published third-party data, cited
          for reference, never this team's own experimental or computational
          result. See .claude/RESPONSIBLE_AI_USE.md and the iGEM wiki rules
          on data figures. */}
      <p className={styles.structureCaption}>
        Published reference structure, not data from this team — {structure.label},{" "}
        <a
          href={`https://www.rcsb.org/structure/${structure.pdbId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          PDB {structure.pdbId}
        </a>
        .
      </p>
    </div>
  );
}
