import { useRef, useLayoutEffect, useEffect, useState, useCallback } from "react";
import styles from "./LiquidGlass.module.scss";

function squirclePath(w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  const c = r * 0.75;
  return [
    `M ${r} 0`,
    `L ${w - r} 0`,
    `C ${w - r + c} 0 ${w} ${r - c} ${w} ${r}`,
    `L ${w} ${h - r}`,
    `C ${w} ${h - r + c} ${w - r + c} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `C ${r - c} ${h} 0 ${h - r + c} 0 ${h - r}`,
    `L 0 ${r}`,
    `C 0 ${r - c} ${r - c} 0 ${r} 0`,
    "Z",
  ].join(" ");
}

export default function LiquidGlass({
  children,
  radius = 28,
  blur = 8,
  opacity = 0.15,
  color = [255, 255, 255],
  cornerGlow = true,
  glowMask = null,
  grain = false,
  drift = false,
  refract = false,
}) {
  const [r, g, b] = color;
  const ref = useRef(null);
  const [squircleState, setSquircleState] = useState({ clipPath: "", pathD: "", circle: null });
  const glowRef = useRef(null);
  const moveRafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const isCircle =
        radius >= Math.min(w, h) / 2 &&
        Math.max(w, h) / Math.min(w, h) <= 1.2;
      if (isCircle) {
        const cr = Math.min(w, h) / 2;
        setSquircleState({ clipPath: "circle(50% at 50% 50%)", pathD: "", circle: { cx: w / 2, cy: h / 2, cr } });
      } else {
        const pathD = squirclePath(w, h, radius);
        setSquircleState({ clipPath: `path('${pathD}')`, pathD, circle: null });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius]);

  // cornerGlow defaults on and nothing in the codebase turns it off, so this
  // runs on every glass panel on every page — nav, dropdowns, every card,
  // every one of Honeycomb's/ProteinCard's many repeated tiles. rAF-gated
  // (same idiom as Menu.jsx's own mousemove listener) so a fast mouse or a
  // high-poll-rate mouse can't drive more than one re-render per frame —
  // native mousemove fires far more often than the screen repaints, and the
  // glow only ever gets seen at the display's refresh rate anyway. The mask
  // is written straight onto the glow <svg>'s style rather than through
  // React state, so following the cursor never re-renders the panel (and
  // its whole child tree) — React leaves the inline mask alone on later
  // renders as long as the `glowMask` prop itself doesn't change.
  const setGlowMask = useCallback((mask) => {
    const svg = glowRef.current;
    if (!svg) return;
    svg.style.maskImage = mask || "";
    svg.style.webkitMaskImage = mask || "";
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (moveRafRef.current) return;
    const { clientX, clientY } = e;
    moveRafRef.current = requestAnimationFrame(() => {
      moveRafRef.current = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      setGlowMask(`radial-gradient(circle at ${x}% ${y}%, white 0%, transparent 55%)`);
    });
  }, [setGlowMask]);

  const handleMouseLeave = useCallback(() => {
    if (moveRafRef.current) {
      cancelAnimationFrame(moveRafRef.current);
      moveRafRef.current = null;
    }
    setGlowMask(glowMask);
  }, [setGlowMask, glowMask]);

  const hasGlow = cornerGlow && (squircleState.pathD || squircleState.circle);

  return (
    <div
      ref={ref}
      className={`${styles.liquidGlass} ${refract ? styles.refract : ""} ${hasGlow ? styles.noGlowPseudo : ""}`}
      onMouseMove={hasGlow ? handleMouseMove : undefined}
      onMouseLeave={hasGlow ? handleMouseLeave : undefined}
      style={{
        "--glass-blur": `${blur}px`,
        "--glass-opacity": opacity,
        "--glass-r": r,
        "--glass-g": g,
        "--glass-b": b,
        clipPath: squircleState.clipPath,
      }}
    >
      {children}
      {drift && <div className={styles.drift} aria-hidden="true" />}
      {grain && (
        <svg aria-hidden="true" className={styles.grain}>
          <rect width="100%" height="100%" filter="url(#glassGrain)" />
        </svg>
      )}
      {hasGlow && (
        <svg
          ref={glowRef}
          aria-hidden="true"
          className={styles.glowSvg}
          style={{
            maskImage: glowMask || undefined,
            WebkitMaskImage: glowMask || undefined,
          }}
        >
          {squircleState.pathD ? (
            <>
              <path
                d={squircleState.pathD}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="12"
                filter="url(#glowBlur)"
              />
              <path
                d={squircleState.pathD}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
            </>
          ) : (
            <>
              <circle
                cx={squircleState.circle.cx}
                cy={squircleState.circle.cy}
                r={squircleState.circle.cr}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="12"
                filter="url(#glowBlur)"
              />
              <circle
                cx={squircleState.circle.cx}
                cy={squircleState.circle.cy}
                r={squircleState.circle.cr}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
            </>
          )}
        </svg>
      )}
    </div>
  );
}
