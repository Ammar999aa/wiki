import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedPage.module.scss";

export default function Content({ section }) {
  return (
    <div className={styles.content}>
      <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
        <div className={styles.contentInner}>
          <h2>{section.title}</h2>
          {section.html ? (
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          ) : (
            section.content
          )}
        </div>
      </LiquidGlass>
    </div>
  );
}