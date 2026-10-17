import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import AmbientMeteors from "../AmbientMeteors/AmbientMeteors";
import styles from "./PageWrapper.module.scss";

export default function PageWrapper({
  children,
  scrollable = true,
  fixed = true,
  background = {},
  className = "",
  // On by default so the space atmosphere doesn't stop at Home — Home
  // passes false since it already renders its own richer <Starfield/>
  // (full star field + scroll-driven meteor rate), and doubling that up
  // here would just layer a second meteor stream on top of it.
  ambientMeteors = true,
  // On by default: gives every page --nav-clearance of extra scroll room
  // below its content so the fixed Menu/Footer bar can't strand the page's
  // tail underneath itself. Home passes false — its own closing section
  // (Sponsors) already reserves that same clearance itself (see its
  // padding-bottom comment), so this would just stack a second, unwanted
  // gap of blank background under it.
  navClearance = true,
}) {
  // `photoFade` (optional, a share of the screen height, e.g. 0.3): once the
  // reader has scrolled that far, the photo fades out in one short CSS
  // transition (and back in near the top). Deliberately not tied to every
  // scroll frame: frosted-glass panels blur what's behind them, so a
  // continuously changing photo forces that blur to be redrawn on every
  // frame, which made scrolling lag.
  // `photoClassName` (optional): a page's own class on the photo layer, for
  // placement CSS can't express inline (e.g. media queries).
  const { color, image, size, gradient, photo, photoPosition, photoOpacity, photoFade, photoClassName } = background;
  const photoRef = useRef(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!photo || !photoFade || !el) return undefined;
    const start = String(photoOpacity ?? 1);
    let hidden = null;
    const update = () => {
      const past = window.scrollY > window.innerHeight * photoFade;
      if (past === hidden) return; // only touch the style when it flips
      hidden = past;
      el.style.opacity = past ? "0" : start;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [photo, photoFade, photoOpacity]);

  const bgStyle = {
    ...(color && { backgroundColor: color }),
    ...(image && {
      backgroundImage: `url("${image}")`,
      backgroundRepeat: "repeat",
      backgroundSize: size || "auto",
    }),
  };

  return (
    <>
      {createPortal(
        <div className={`${styles.bg} ${fixed ? styles.fixed : styles.absolute}`} style={bgStyle}>
          {photo && (
            <div
              ref={photoRef}
              className={`${styles.photo} ${photoFade ? styles.photoFades : ""} ${fixed ? styles.fixed : styles.absolute} ${photoClassName || ""}`}
              style={{
                backgroundImage: `url("${photo}")`,
                backgroundPosition: photoPosition || "center",
                ...(photoOpacity != null && { opacity: photoOpacity }),
              }}
            />
          )}
          {gradient && (
            <div
              className={`${styles.overlay} ${fixed ? styles.fixed : styles.absolute}`}
              style={{ backgroundImage: `url("${gradient}")` }}
            />
          )}
          {ambientMeteors && <AmbientMeteors />}
        </div>,
        document.body
      )}
      <div
        className={`${styles.wrapper} ${scrollable ? "" : styles.noScroll} ${
          navClearance ? "" : styles.noClearance
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
}