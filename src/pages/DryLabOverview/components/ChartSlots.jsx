import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Embeds interactive charts inline inside markdown-rendered prose without
// forking SectionedArticle/Article.jsx: the markdown (dry-lab-overview.md)
// marks each spot with an empty `<div data-chart="some-id"></div>` in place
// of the old `<img>`, and this portals the matching React chart into that
// exact node — so the chart lands mid-section, next to the same caption the
// image used to sit next to, instead of being stuck at the end of the
// section the way Article.jsx's own single `content` slot per section would
// place it.
//
// A one-time scan isn't enough: scrolling past a section boundary updates
// SectionedArticle's `selected` state, and that re-render causes React to
// fully tear down and rebuild every section's `dangerouslySetInnerHTML`
// subtree (confirmed via MutationObserver — matched remove/add counts on
// each scroll-triggered re-render), which replaces our slot <div>s with
// fresh, empty ones and orphans whatever was portaled into the old ones.
// A MutationObserver re-scans and re-portals whenever that happens, keyed
// off DOM node identity so it's a no-op once everything is already correct.
export default function ChartSlots({ containerRef, charts }) {
  const [slots, setSlots] = useState([]);
  const slotsRef = useRef([]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const rescan = () => {
      const found = Array.from(root.querySelectorAll("[data-chart]"))
        .map((el) => ({ el, id: el.getAttribute("data-chart") }))
        .filter(({ id }) => charts[id]);

      const prev = slotsRef.current;
      const sameLength = prev.length === found.length;
      const unchanged = sameLength && found.every((f, i) => prev[i].el === f.el && prev[i].id === f.id);
      if (unchanged) return;

      slotsRef.current = found;
      setSlots(found);
    };

    rescan();
    const observer = new MutationObserver(rescan);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [containerRef, charts]);

  return <>{slots.map(({ el, id }) => createPortal(charts[id], el, id))}</>;
}
