import { useLayoutEffect, useRef } from "react";

const DURATION_MS = 260;

// Crossfades a container's height + opacity whenever `swapKey` changes, so
// swapping in a new child of a different size (a tab's body text, a
// stepper's step, a randomized result) morphs smoothly instead of the box
// instantly snapping to its new height — most noticeable when the old and
// new text are very different lengths. Mirrors the Web Animations API
// technique SectionedArticle/Article.jsx already uses for its .details
// expand/collapse: a plain CSS `transition` can't interpolate between two
// `height: auto` values, so this measures the real before/after pixel
// heights itself and drives the animation explicitly.
export default function AnimatedSwap({
  swapKey,
  children,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const prevHeight = useRef(null);
  const prevKey = useRef(swapKey);
  const animRef = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const endHeight = el.getBoundingClientRect().height;

    if (prevKey.current === swapKey) {
      // First mount, or a re-render that didn't actually change the swap
      // key (e.g. a parent re-render) — just keep the height reference
      // fresh, nothing to animate.
      prevHeight.current = endHeight;
      return;
    }

    const startHeight = prevHeight.current ?? endHeight;
    prevKey.current = swapKey;
    prevHeight.current = endHeight;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    animRef.current?.cancel();
    animRef.current = el.animate(
      [
        { height: `${startHeight}px`, opacity: 0.35 },
        { height: `${endHeight}px`, opacity: 1 },
      ],
      { duration: DURATION_MS, easing: "ease" },
    );
  }, [swapKey]);

  return (
    <div
      ref={ref}
      className={className}
      // boxSizing: border-box is load-bearing, not cosmetic — the animated
      // `height` keyframes below are border-box values (measured via
      // getBoundingClientRect, which always includes padding/border). On a
      // target with its own padding/border (e.g. CrewGenerator's `.badge`)
      // and the browser's content-box default, the same px value would be
      // read as *content* height, so the element renders padding/border
      // taller than intended for the whole animation — visibly ballooning
      // past its real size before snapping back once the animation ends
      // and this element returns to sizing itself normally.
      style={{ overflow: "hidden", boxSizing: "border-box" }}
      {...rest}
    >
      {children}
    </div>
  );
}
