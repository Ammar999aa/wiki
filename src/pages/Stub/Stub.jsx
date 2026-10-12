import PageWrapper from "../../components/PageWrapper/PageWrapper";
import styles from "./Stub.module.scss";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";

export default function Stub({ title }) {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      {/* React hoists this into <head> and removes it on unmount. Unwritten
          page: keep it out of search results until it has content. */}
      <meta name="robots" content="noindex" />
      <div className={styles.container}>
        <p className={styles.label}>Coming soon</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </PageWrapper>
  );
}
