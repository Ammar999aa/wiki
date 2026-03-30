import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import Dropdown from "../Dropdown/Dropdown";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Menu.module.scss";

export default function Menu() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { label: t("menu.project"), to: "/project" },
    { label: t("menu.wetLab"), to: "/" },
    { label: t("menu.dryLab"), to: "/" },
    { label: t("menu.humanPractices"), to: "/" },
    {
      label: t("menu.team"),
      dropdown: [
        { label: t("menu.roster"), to: "/roster" },
        { label: t("menu.attributions"), to: "/attributions" },
        { label: t("menu.collaborations"), to: "/collaborations" },
        { label: t("menu.partnerships"), to: "/partnerships" },
      ],
    },
    { label: t("menu.safety"), to: "/" },
    { label: t("menu.engagement"), to: "/" },
  ];
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
  const itemRefs = useRef({});
  const closeTimeout = useRef(null);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, [cancelClose]);

  const handleMouseEnter = (item, index) => {
    cancelClose();
    if (!item.dropdown) {
      setActiveDropdown(null);
      return;
    }
    const el = itemRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      setDropdownPos({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
    setActiveDropdown(item);
  };

  return (
    <>
      <div
        className={styles.container}
        onMouseLeave={scheduleClose}
      >
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} glowMask="linear-gradient(to bottom, white, transparent 60%)">
          <nav className={styles.menu}>
            {menuItems.map((item, i) => {
              const isActive =
                (item.to && pathname.toLowerCase() === item.to.toLowerCase()) ||
                (item.dropdown?.some(
                  (child) => pathname.toLowerCase() === child.to.toLowerCase()
                ));
              return (
                <Link
                  key={item.label}
                  to={item.to ?? "#"}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onMouseEnter={() => handleMouseEnter(item, i)}
                  className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </LiquidGlass>
      </div>

      {activeDropdown?.dropdown && (
        <Dropdown
          items={activeDropdown.dropdown}
          x={dropdownPos.x}
          y={dropdownPos.y}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}
    </>
  );
}