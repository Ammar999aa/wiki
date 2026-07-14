import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";
import styles from "./Stub.module.scss";

export default function Stub({ title }) {
  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>
      <div className={styles.container}>
        <p className={styles.label}>Coming soon</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </PageWrapper>
  );
}
