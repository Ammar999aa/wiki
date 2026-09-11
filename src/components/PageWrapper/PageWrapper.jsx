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
  const { color, image, size, gradient, photo, photoPosition, photoOpacity } = background;

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
              className={`${styles.photo} ${fixed ? styles.fixed : styles.absolute}`}
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