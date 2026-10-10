import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import styles from "./Dropdown.module.scss";

// The container stays mounted across nav items (Menu only unmounts it once
// the pointer leaves the whole bar), so switching from one dropdown item to
// another is a prop update, not a remount — the "burst" open animation only
// plays once, on that initial mount. `activeKey` identifies which item's
// menu is showing; when it changes we crossfade the item list instead of
// swapping it instantly, while `left`/`top` transition on their own via CSS
// so the panel slides to the new item's position.
//
// The panel's own box (width/height) also needs to resize smoothly instead
// of snapping the instant the item list changes — `items` is measured in a
// hidden clone as soon as it's known (before the crossfade swaps it in) so
// `boxSize` can start transitioning toward it immediately; LiquidGlass's own
// ResizeObserver then redraws its squircle clip-path to track the resize.
export default function Dropdown({ activeKey, items, x, y, onMouseEnter, onMouseLeave }) {
  const [displayItems, setDisplayItems] = useState(items);
  const [displayKey, setDisplayKey] = useState(activeKey);
  const [fading, setFading] = useState(false);
  const [boxSize, setBoxSize] = useState(null);
  const fadeTimeout = useRef(null);
  const measureRef = useRef(null);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    // getBoundingClientRect (fractional) rather than offsetWidth/Height
    // (integer) — truncating to a whole pixel here can land exactly on a
    // text-wrap threshold and make the real panel wrap where the unrounded
    // measurement wouldn't have. Round up, not to nearest, for the same
    // reason: rounding down can re-introduce that one-pixel-short wrap.
    const rect = el.getBoundingClientRect();
    setBoxSize({ width: Math.ceil(rect.width), height: Math.ceil(rect.height) });
  }, [items]);

  useEffect(() => {
    if (activeKey === displayKey) return;
    setFading(true);
    fadeTimeout.current = setTimeout(() => {
      setDisplayItems(items);
      setDisplayKey(activeKey);
      setFading(false);
    }, 140);
    return () => clearTimeout(fadeTimeout.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  return (
    <>
      <div
        className={styles.container}
        style={{ left: x, top: y }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} grain refract>
          <div
            className={styles.sizer}
            style={boxSize ? { width: boxSize.width, height: boxSize.height } : undefined}
          >
            <nav className={`${styles.dropdown} ${fading ? styles.dropdownFading : ""}`}>
              {displayItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={styles.dropdownItem}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </LiquidGlass>
      </div>
      {/* Offscreen clone of the upcoming item set, purely to measure its
          natural size ahead of the crossfade — never shown or interactive.
          Rendered as a sibling of `.container`, not inside it: `.container`
          carries the `dropdownBurst` scale animation, and getBoundingClientRect
          reflects ancestor transforms, so measuring from inside it would
          capture whatever mid-animation scale happens to be in effect. */}
      <div className={styles.measure} aria-hidden="true">
        <nav ref={measureRef} className={styles.dropdown}>
          {items.map((item) => (
            <span key={item.label} className={styles.dropdownItem}>
              {item.label}
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}