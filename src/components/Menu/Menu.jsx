import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import Dropdown from "../Dropdown/Dropdown";
import Pages from "../../pages.js";
import styles from "./Menu.module.scss";

// Nav is derived from pages.js instead of a hand-maintained list, so a link
// can never point at a route that doesn't exist.
function toMenuItems(pages) {
  return pages
    .filter((item) => item.path !== "/")
    .map((item) =>
      item.folder
        ? { label: item.name, dropdown: item.folder.map((page) => ({ label: page.name, to: page.path })) }
        : { label: item.name, to: item.path }
    );
}

export default function Menu() {
  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);

  const menuItems = toMenuItems(Pages);

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
      {/* Desktop menu bar */}
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

      {/* Mobile hamburger button */}
      <div className={styles.mobileContainer}>
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07} glowMask="linear-gradient(to bottom, white, transparent 60%)">
          <button
            type="button"
            className={styles.hamburgerBtn}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <line x1="6" y1="6" x2="22" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="22" y1="6" x2="6" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <line x1="4" y1="8" x2="24" y2="8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="4" y1="14" x2="24" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="4" y1="20" x2="24" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </LiquidGlass>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className={styles.mobilePanelContainer}>
          <LiquidGlass radius={32} color={[0, 0, 0]} opacity={0.07}>
            <nav className={styles.mobileMenu}>
              {menuItems.map((item) => {
                if (item.dropdown) {
                  const isGroupActive = item.dropdown.some(
                    (child) => pathname.toLowerCase() === child.to.toLowerCase()
                  );
                  const isExpanded = expandedGroup === item.label;
                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        className={`${styles.mobileGroupBtn} ${isGroupActive ? styles.menuItemActive : ""}`}
                        onClick={() => setExpandedGroup(isExpanded ? null : item.label)}
                        aria-expanded={isExpanded}
                      >
                        {item.label}
                        <svg
                          className={`${styles.groupChevron} ${isExpanded ? styles.groupChevronOpen : ""}`}
                          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                        >
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {isExpanded && item.dropdown.map((child) => {
                        const isActive = pathname.toLowerCase() === child.to.toLowerCase();
                        return (
                          <Link
                            key={child.label}
                            to={child.to}
                            className={`${styles.mobileItem} ${styles.mobileSubItem} ${isActive ? styles.menuItemActive : ""}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
                const isActive = item.to && pathname.toLowerCase() === item.to.toLowerCase();
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`${styles.mobileItem} ${isActive ? styles.menuItemActive : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </LiquidGlass>
        </div>
      )}
    </>
  );
}
