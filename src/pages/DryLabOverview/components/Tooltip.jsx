import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import styles from "../DryLabOverview.module.scss";

// One shared fixed-position tooltip for every chart on the page, shown/hidden
// via context instead of each chart managing its own — same idiom as the
// Model page's Tooltip.jsx.
const TooltipContext = createContext(null);

export function TooltipProvider({ children }) {
  const [content, setContent] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const elRef = useRef(null);

  const show = useCallback((e, node) => {
    setContent(node);
    setPos({ x: e.clientX + 16, y: e.clientY + 16 });
  }, []);

  const hide = useCallback(() => setContent(null), []);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el || !content) return;
    const r = el.getBoundingClientRect();
    setPos((p) => {
      let { x, y } = p;
      if (x + r.width > window.innerWidth - 12) x = x - r.width - 32;
      if (y + r.height > window.innerHeight - 12) y = y - r.height - 32;
      return x === p.x && y === p.y ? p : { x, y };
    });
  }, [content]);

  return (
    <TooltipContext.Provider value={{ show, hide }}>
      {children}
      <div
        ref={elRef}
        className={`${styles.tip} ${content ? styles.visible : ""}`}
        style={{ left: pos.x, top: pos.y }}
        role="status"
        aria-live="polite"
      >
        {content}
      </div>
    </TooltipContext.Provider>
  );
}

export function useChartTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("useChartTooltip must be used within a TooltipProvider");
  return ctx;
}
