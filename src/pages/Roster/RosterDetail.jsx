import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import Flag from "./Flag";
import styles from "./Roster.module.scss";

// The floating panel a selected roster bubble opens into — a dimmed,
// click-to-close backdrop (this component's own root) with the panel on
// top, same "grow a detail overlay instead of a permanent card" pattern as
// ProteinLibrary/ProteinDetail.jsx. `member.isTeamLead` (Roster.jsx —
// currently Ansal' and Francesca) additionally gets a small "Team Lead"
// badge next to their department role, the text counterpart to the gold
// tint/glow on their bubble out on the roster itself.
export default function RosterDetail({ member, onClose, t }) {
  const closeRef = useRef(null);
  const titleId = `roster-detail-title-${member.memberKey}`;

  // Land focus on the close button as soon as the panel mounts, so
  // keyboard users land somewhere inside the dialog rather than on
  // whatever's behind the backdrop.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.detailPanelWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.09}>
          <div className={styles.detailPanel}>
            <button ref={closeRef} type="button" className={styles.closeButton} onClick={onClose}>
              <span aria-hidden="true">×</span>
              <span className={styles.srOnly}>Close</span>
            </button>

            {member.photo ? (
              <img src={member.photo} className={styles.detailPhoto} alt={member.name} />
            ) : (
              <div className={styles.detailPhotoPlaceholder} />
            )}

            <div className={styles.bio}>
              <h2 id={titleId}>
                {member.name}
                <Flag code={member.countryCode} width={33} height={24} marginInlineStart={24} />
              </h2>
              <h3>
                {t(`roster.roles.${member.roleKey}`)}
                {member.isTeamLead && <span className={styles.leadBadge}>Team Lead</span>}
              </h3>
              <p>{t(`roster.members.${member.memberKey}.bio`)}</p>
              <Link to={`/attributions?member=${encodeURIComponent(member.name)}`} className={styles.seeMore}>
                {t("roster.seeMore")}
              </Link>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
