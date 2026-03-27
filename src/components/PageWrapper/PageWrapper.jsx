import { createPortal } from "react-dom";
import styles from "./PageWrapper.module.scss";

export default function PageWrapper({
  children,
  scrollable = true,
  fixed = true,
  background = {},
  className = "",
}) {
  const { color, image, size, gradient } = background;

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
          {gradient && (
            <div
              className={`${styles.overlay} ${fixed ? styles.fixed : styles.absolute}`}
              style={{ backgroundImage: `url("${gradient}")` }}
            />
          )}
        </div>,
        document.body
      )}
      <div className={`${styles.wrapper} ${scrollable ? "" : styles.noScroll} ${className}`}>
        {children}
      </div>
    </>
  );
}