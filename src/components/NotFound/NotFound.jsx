import { Link } from "react-router-dom";
import PageWrapper from "../PageWrapper/PageWrapper";
import styles from "./NotFound.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

export default function NotFound() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      {/* React hoists this into <head> and removes it on unmount. The
          server answers 200 for every path, so this is the only signal
          to Google that an unknown URL isn't a real page. */}
      <meta name="robots" content="noindex" />
      <div className={styles.container}>
        <p className={styles.label}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <Link to="/" className={styles.home}>Back to home</Link>
      </div>
    </PageWrapper>
  );
}
