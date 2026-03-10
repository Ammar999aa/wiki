import styles from "./Home.module.scss";

export default function Home() {
    return (
    <div>
      <div className={styles.title}>
        <h1>Introducing</h1>
        <h1 className={styles.astra}>A.S.T.R.A</h1>
      </div>
    </div>
    );
  }