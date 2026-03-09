import { useState, useRef, useCallback } from "react";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./Menu.module.scss";

const menuItems = [
  { label: "Project" },
  { label: "Wet Lab" },
  { label: "Dry Lab" },
  { label: "Human Practices" },
  {
    label: "Team",
    dropdown: ["Roster", "Attributions", "Collaborations", "Partnerships"],
  },
  { label: "Safety" },
  { label: "Engagement" },
];

export default function Menu() {
  const [activeDropdown, setActiveDropdown] = useState(null);
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
        <LiquidGlass radius={40} color={[0, 0, 0]} opacity={0.07}>
          <nav className={styles.menu}>
            {menuItems.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => (itemRefs.current[i] = el)}
                onMouseEnter={() => handleMouseEnter(item, i)}
                className={styles.menuItem}
              >
                {item.label}
              </div>
            ))}
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