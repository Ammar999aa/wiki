import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import Dropdown from "../Dropdown/Dropdown";
import Pages from "../../pages.js";
import styles from "./Menu.module.scss";

// Same path data as src/assets/shihab-s.svg, inlined (rather than <img
// src="...">) so `fill="currentColor"` picks up .menuItem's hover/active
// color rules — an <img> can't respond to those.
function ShihabSMark({ className }) {
  return (
    <svg viewBox="5 51 101 103" className={className} aria-hidden="true">
      <g transform="translate(297,0) rotate(90)">
        <path
          fill="currentColor"
          d="m 148.48348,287.14615 c -0.081,-2e-5 -0.23136,-0.29032 -0.33406,-0.64512 -4.85511,-16.77256 -12.63624,-34.44308 -21.60605,-49.06613 -7.32184,-11.93647 -14.33795,-19.9151 -19.79011,-22.50512 -1.9511,-0.92684 -3.2917,-0.78794 -3.90879,0.40502 -0.40568,0.78433 -0.57319,2.58107 -0.39216,4.20649 0.39731,3.56686 1.43797,6.84953 4.25232,13.41369 2.75427,6.42408 3.92911,10.02711 4.82561,14.79933 0.35817,1.90672 0.39853,2.47583 0.3928,5.54011 -0.006,3.20436 -0.0312,3.50756 -0.40833,4.9134 -1.142,4.25726 -3.46023,6.74396 -6.74759,7.23799 -3.1368,0.47137 -7.387567,-1.32021 -11.679974,-4.92282 -6.660286,-5.58995 -13.064216,-14.18939 -18.32838,-24.61201 -3.595799,-7.11946 -6.553371,-14.86166 -8.048427,-21.06902 -0.467739,-1.94195 -0.442977,-2.46221 0.07008,-1.47158 0.604802,1.16796 2.728917,4.85055 3.852344,6.67889 5.398982,8.78649 10.932936,15.90509 16.816479,21.63194 5.438754,5.2939 10.730946,8.78396 13.638958,8.99455 0.87803,0.0635 1.01999,0.0342 1.29018,-0.26672 0.26027,-0.28994 0.30098,-0.53612 0.28521,-1.72468 -0.0344,-2.59808 -1.30642,-6.88382 -3.857684,-12.99822 -3.232015,-7.74595 -4.669174,-12.1318 -5.545761,-16.92437 -0.48397,-2.64606 -0.649816,-6.53744 -0.367248,-8.6171 0.826805,-6.08505 3.922878,-9.52211 8.808333,-9.7784 5.34967,-0.28064 11.66829,3.38684 17.57726,10.20231 9.53992,11.00336 19.30359,32.88288 25.20441,56.48065 2.11937,8.47553 4.43284,20.09697 4.00064,20.09692 z M 73.670957,209.57556 c -0.236528,-5.8e-4 -0.976431,-0.1307 -1.644251,-0.28922 -2.679437,-0.63583 -4.849867,-0.7915 -5.734623,-0.41134 -0.785712,0.33762 -1.671746,1.19995 -3.542602,3.44782 -0.965578,1.16015 -1.825004,2.10935 -1.909846,2.10935 -0.08999,-2e-5 -0.113303,-0.1631 -0.05588,-0.39155 0.723444,-2.88098 1.130809,-6.46498 0.852598,-7.50105 -0.213334,-0.79449 -0.75355,-1.34744 -3.769355,-3.85839 -1.0948,-0.91155 -1.95542,-1.71419 -1.91247,-1.78368 0.125845,-0.20354 0.662099,-0.15017 2.657497,0.26447 1.034091,0.2149 2.56768,0.42915 3.407989,0.47613 2.196222,0.12269 2.242209,0.0932 4.742854,-3.05481 1.132333,-1.42546 2.080189,-2.62019 2.106345,-2.65496 0.230377,-0.30636 0.180826,0.58417 -0.176623,3.17392 -0.467986,3.39059 -0.462724,4.57167 0.02341,5.25149 0.173523,0.24266 1.42789,1.43172 2.787442,2.64234 1.359582,1.21064 2.500184,2.2865 2.534753,2.39086 0.04031,0.12216 -0.09054,0.18934 -0.367253,0.18862 z"
        />
      </g>
    </svg>
  );
}

// Nav is derived from pages.js instead of a hand-maintained list, so a link
// can never point at a route that doesn't exist.
function toMenuItems(pages) {
  return pages
    .filter((item) => item.path !== "/" && !item.hidden)
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
            <Link
              to="/"
              className={`${styles.menuItem} ${styles.menuLogo} ${pathname === "/" ? styles.menuItemActive : ""}`}
              aria-label="Shihab — Home"
            >
              <ShihabSMark className={styles.menuLogoIcon} />
            </Link>
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
              <Link
                to="/"
                className={`${styles.mobileItem} ${styles.mobileLogo} ${pathname === "/" ? styles.menuItemActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <ShihabSMark className={styles.mobileLogoIcon} />
                Home
              </Link>
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
