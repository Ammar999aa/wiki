import styles from "./Home.module.scss";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div>
      <div className={styles.title}>
        <h1>{t("home.introducing")}</h1>
        <h1 className={styles.astra}>A.S.T.R.A</h1>
      </div>
    </div>
  );
}