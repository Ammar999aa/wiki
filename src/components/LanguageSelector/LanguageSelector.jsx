import { useState, useRef, useCallback } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./LanguageSelector.module.scss";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef(null);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  }, [cancelClose]);

  const currentLabel = LANGUAGES.find((l) => l.code === lang)?.label ?? "EN";

  return (
    <div
      className={styles.container}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <LiquidGlass radius={300} color={[0, 0, 0]} opacity={0.07}>
        <button className={styles.trigger} aria-label="Select language">
          {currentLabel}
        </button>
      </LiquidGlass>

      {open && (
        <div className={styles.dropdown}>
          <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
            <div className={styles.list}>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  className={`${styles.option} ${l.code === lang ? styles.active : ""}`}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </LiquidGlass>
        </div>
      )}
    </div>
  );
}
