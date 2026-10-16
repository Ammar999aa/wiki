import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedPage.module.scss";

export default function Content({ section, footer }) {
  return (
    <div className={styles.content}>
      <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} grain drift>
        <div className={styles.contentInner}>
          <div className={styles.contentHeader}>
            {section.photo ? (
              <img src={section.photo} alt={section.title} className={styles.contentPhoto} />
            ) : section.photo === undefined ? null : (
              <div className={styles.contentPhotoPlaceholder} />
            )}
            <div className={styles.contentMeta}>
              <h2>{section.title}</h2>
              {(section.role || section.department) && (
                <p className={styles.contentRole}>
                  {section.role && <span className={styles.roleBadge}>{section.role}</span>}
                  {section.department && <span className={styles.deptBadge}>{section.department}</span>}
                </p>
              )}
            </div>
          </div>
          {section.html ? (
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          ) : (
            section.content
          )}
        </div>
      </LiquidGlass>
      {footer}
    </div>
  );
}
