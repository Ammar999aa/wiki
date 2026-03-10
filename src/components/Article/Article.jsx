import styles from "./Article.module.scss";

export default function Article ({children}) {
    return (
    <div className={styles.article}>
        {children}
    </div>
)
}