import { Link } from "react-router-dom";
import PageWrapper from "../PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.container}>
        <p className={styles.label}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <Link to="/" className={styles.home}>Back to home</Link>
      </div>
    </PageWrapper>
  );
}
