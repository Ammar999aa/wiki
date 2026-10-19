import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import styles from "./Tooltip.module.scss";

// Shared fixed-position hover tooltip — one context/provider instead of
// every consumer (a chart, an in-text citation mark) managing its own
// floating box. Originally written for Model's scatter/strip charts and
// duplicated near-verbatim for Dry Lab Modeling's charts; extracted here so
// both of those and SectionedArticle's citation marks (see Article.jsx)
// share one implementation and one visual language instead of a third copy.
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

  // Clamp to the viewport once the tooltip's real size is known — flips to
  // the other side of the cursor (or anchor point) instead of overflowing.
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

export function useTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("useTooltip must be used within a TooltipProvider");
  return ctx;
}
