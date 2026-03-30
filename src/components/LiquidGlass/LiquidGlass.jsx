import { useRef, useLayoutEffect, useState } from "react";
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
  glowMask = null,   // CSS mask-image string — controls which sides/corners glow is visible on
}) {
  const [r, g, b] = color;
  const ref = useRef(null);
  const [squircleState, setSquircleState] = useState({ clipPath: "", pathD: "", circle: null });

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

  const hasGlow = cornerGlow && (squircleState.pathD || squircleState.circle);

  return (
    <div
      ref={ref}
      className={`${styles.liquidGlass} ${hasGlow ? styles.noGlowPseudo : ""}`}
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
      {hasGlow && (
        <svg
          aria-hidden="true"
          className={styles.glowSvg}
          style={glowMask ? { maskImage: glowMask, WebkitMaskImage: glowMask } : undefined}
        >
          {squircleState.pathD ? (
            <>
              <path
                d={squircleState.pathD}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="12"
                style={{ filter: "blur(5px)" }}
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
                style={{ filter: "blur(5px)" }}
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
