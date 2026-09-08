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
      <div className={`${styles.wrapper} ${scrollable ? "" : styles.noScroll} ${className}`}>
        {children}
      </div>
    </>
  );
}