import { Fragment } from "react";
import LiquidGlass from "../../LiquidGlass/LiquidGlass";
import styles from "../SectionedArticle.module.scss";

// `nums` is optional and index-aligned with `items`: section numbers for a
// numbered reference-style page, shown as their own mark so the title text
// itself stays a clean table-of-contents entry.
//
// `links` is optional too, index-aligned with `items`: a list of
// `{ label, href }` shown as small links under that entry (Judging lists
// each medal's pages this way). `linkTints` optionally colors each group:
// `[r, g, b]` per entry, exposed to the stylesheet as --link-tint.
export default function Panel({ items, nums, links, linkTints, selected, collapsed, onToggle, onSelect, header }) {
  return (
    <div className={`${styles.panelContainer} ${collapsed ? styles.collapsed : ""}`}>
      {/* cornerGlow defaults on and, with no cursor over the panel, falls
          back to this glowMask (see LiquidGlass.jsx's activeMask) — fades
          the idle glow out by the panel's own upper third instead of
          tracing the whole edge, same top-heavy treatment as the nav bar's
          own glass (Menu.jsx). Hovering swaps it for the cursor-follow
          radial mask as usual. */}
      <LiquidGlass
        radius={32}
        color={[0, 0, 0]}
        opacity={0.08}
        grain
        drift
        glowMask="linear-gradient(to bottom, white, transparent 60%)"
      >
        <div className={styles.panelContents}>
          <button
            type="button"
            className={`${styles.arrow} ${collapsed ? styles.flipped : ""}`}
            aria-expanded={!collapsed}
            onClick={onToggle}
          >
            <svg width="46" height="46" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.75 46.5V19L29 32.75L42.75 46.5Z" fill="#E3E3E3" />
            </svg>
          </button>
          {header && <div className={styles.panelHeader}>{header}</div>}
          {items.map((item, i) => (
            <Fragment key={item}>
              <h2
                className={`${styles.panelItem} ${item === selected ? styles.selected : ""}`}
                onClick={() => onSelect(i)}
              >
                {nums?.[i] && <span className={styles.panelItemNum}>{nums[i]}</span>}
                {item}
              </h2>
              {links?.[i]?.length > 0 && (
                <ul
                  className={styles.panelLinks}
                  style={linkTints?.[i] ? { "--link-tint": linkTints[i].join(", ") } : undefined}
                >
                  {links[i].map((l) => (
                    <li key={l.href + l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          ))}
        </div>
      </LiquidGlass>
    </div>
  );
}