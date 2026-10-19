import { useEffect, useState } from "react";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
const bioreactorGlb = "https://static.igem.wiki/teams/6341/wiki/3d-models/bioreactor.glb";
import styles from "./Hardware.module.scss";

// Interactive 3D render of the bioreactor stand (frame, motor/stirrer
// assembly, and vessel) exported from CAD. `bioreactor.glb` is NOT the CAD
// export as delivered — the team's raw `.usdz` uses USD's reference-arc
// instancing (each part's geometry is authored once, then placed by a
// separate Xform with its own transform), which `<model-viewer>` doesn't
// resolve since it only renders glTF/GLB in its WebGL view, never USDZ. A
// converter that doesn't walk USD composition grabs the raw part geometry
// straight from the library defs and skips the placement transform,
// rendering every part stacked at local-space origin instead of assembled.
// `bioreactor.glb` was regenerated from the `.usdz` with Pixar's own USD
// Python bindings (resolving every reference arc, then baking each part's
// world transform into its vertices) rather than a shallow parser, to
// avoid exactly that failure mode.
//
// @google/model-viewer is dynamic-imported (a custom element that
// registers itself on load) rather than a top-level import — same
// rationale as StructureViewer's dynamic 3Dmol.js import: it's a large
// dependency only this one page needs, so it shouldn't cost every other
// route a bigger shared chunk.
// Figure 5's caption lives in hardware.md, right after this component's
// `data-slot="model"` marker (see Hardware.jsx).
export default function BioreactorModel() {
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setStatus("ready");
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("BioreactorModel: failed to load model-viewer", err);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    // The site's own frosted-glass primitive (nav/cards/roster tiles — see
    // .claude/DESIGN.md) rather than the flatter `.panel` markdown block
    // the rest of hardware.md uses for its raw-HTML panels: this is a real
    // component, not authored inline in markdown, so it isn't tied to that
    // shared vocabulary the way BioreactorModel's caller (Hardware.jsx)
    // still is for everything else on the page.
    <div className={styles.glassFigure}>
      <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} grain drift>
        <div className={styles.modelPanelInner}>
          <div className={styles.modelViewerWrap}>
            {status === "ready" && (
              // model-viewer's own attributes (kebab-case, per its
              // custom-element API), not DOM/React props.
              <model-viewer
                src={bioreactorGlb}
                alt="Interactive 3D CAD model of the SHIHAB bioreactor: a glass bottle vessel with rotor, held by four supports under the electronics tray"
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate={!reducedMotion}
                shadow-intensity="1"
                exposure="1"
                camera-orbit="35deg 75deg 105%"
              />
            )}
            {status === "loading" && <div className={styles.modelStatus}>Loading 3D model…</div>}
            {status === "error" && (
              <div className={styles.modelStatus}>Couldn&rsquo;t load the 3D model.</div>
            )}
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}
