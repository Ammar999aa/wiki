import { useEffect, useMemo, useRef, useState } from "react";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import Flag from "./Flag";
import { generateRows, layoutRows, stackAbove, boundingBox } from "./honeycombLayout";
import styles from "./Roster.module.scss";

// Design-space constants — the cluster is always laid out at this fixed
// size and then CSS-scaled down (never up, see the fit-to-viewport effect
// below) to whatever room it actually has, so the layout math only ever
// has to run once per item count.
const RADIUS = 60; // resting bubble radius (120px diameter)
// Gap between two bubbles resting side by side within one department's own
// line — kept deliberately smaller than DEPARTMENT_GAP/SATELLITE_GAP below,
// so the *within-department* spacing reads as tighter than the *between-
// group* spacing. SPACING itself (center-to-center) has to clear the two
// bubbles' combined radii (2*RADIUS) — that's the floor, not a target: a
// smaller number here doesn't mean "somewhat closer," it means the bubbles
// overlap, which is a real bug an earlier tuning pass shipped.
//
// RADIUS/WITHIN_DEPARTMENT_GAP/DEPARTMENT_GAP/SATELLITE_GAP were all
// trimmed down a notch together when the Team Leaders line (Roster.jsx's
// teamLeaders) was added, to give that extra line of vertical room back
// without shrinking the whole cluster more aggressively on shorter
// viewports.
const WITHIN_DEPARTMENT_GAP = 22;
const SPACING = RADIUS * 2 + WITHIN_DEPARTMENT_GAP;
// Every department here is a single horizontal line at this width. Team
// Leaders and the PI cluster (LEADER_MAX_PER_ROW/PI_MAX_PER_ROW) use a much
// higher ceiling each — neither ever has enough people to hit it at
// today's roster size — so both stay one line too, rather than wrapping
// into a second internal line and eating extra vertical space the
// fit-to-viewport budget then has to claw back from every bubble's size.
const DEPARTMENT_MAX_PER_ROW = 6;
const PI_MAX_PER_ROW = 12;
const LEADER_MAX_PER_ROW = 12;
// How wide one page-row of department lines (or the Team Leaders + PI row)
// is allowed to get before the next group wraps onto a new page-row below
// (see layoutRows) — this is what turns "six single-line departments" into
// a compact 2-row block instead of one very long strip.
const MAX_ROW_WIDTH = 1600;
// Extra horizontal space (beyond each line's own normal touching-neighbor
// distance — see layoutRows in honeycombLayout.js) between two departments
// sharing a page-row. Noticeably bigger than WITHIN_DEPARTMENT_GAP
// (everyone in a department line is still one team, just subdivided).
// SATELLITE_GAP is the same idea but for the seam *inside* the top row,
// between Team Leaders and PI specifically — bigger again, since PI is a
// genuinely different category, not just another line of the team. Both
// stay soft either way: same bubbles, same spacing, no divider line — the
// gap itself is the only boundary. Neither is used for the vertical seam
// between the top row and the department block below it — see
// PAGE_ROW_GAP just below, which is what that (and every other
// line-to-line) seam actually needs.
const DEPARTMENT_GAP = 34;
const SATELLITE_GAP = 50;
// Vertical gap between one line and the next — page-rows of departments,
// and the top row (Team Leaders + PI) down to the department block below
// it (see stackAbove below). Separate from (and bigger than) DEPARTMENT_GAP:
// it has to leave room for a caption to sit clear of the line above it (and
// that line's own flag badges, which hang slightly past each bubble's
// bottom edge — see .flagBadge in Roster.module.scss), not just clear of
// horizontal neighbors, which needs a lot more headroom than a side-by-side
// seam does. The "+60" is sized for .sectionLabel's actual font — bump it
// if that font grows much further, or captions start crowding the line
// above them again.
const PAGE_ROW_GAP = DEPARTMENT_GAP + 60;
const SIGMA = SPACING * 1.1; // how far the cursor's influence reaches
const MAX_SCALE = 0.2; // peak extra scale at the cursor (resting scale is 1)
const FOCUS_THRESHOLD = 0.55; // influence above which a bubble shows its name tag

// Margin around the lattice for the hover-grown bubble's extra size — a
// resting-edge bubble can grow to RADIUS * (1 + MAX_SCALE), plus a little
// slack for its flag badge/focus outline. Left/right/bottom only ever butt
// up against empty space, so this is all they need.
const PAD_SIDES = RADIUS * (1 + MAX_SCALE) + 20;
// The top edge additionally has to clear the very first row's own
// .sectionLabel floating above it — the same "+60" PAGE_ROW_GAP already
// uses for exactly this (a label between two stacked rows), reused here
// since it's the same label, same font, same clearance need.
const PAD_TOP = PAD_SIDES + 60;

// Bare breathing room between the cluster's bottom edge and the fixed nav
// bar's real (measured, not guessed — see the effect below) top edge.
const NAV_CLEARANCE = 24;
// Fallback if the nav bar isn't found in the DOM for some reason — a rough
// guess so the cluster still renders sanely rather than crashing, not
// something to hand-tune.
const RESERVED_BELOW_FALLBACK = 200;

// Top-center point of a set of design-space positions, in the same units —
// where a caption anchors.
function topCenterAnchor(positions) {
  if (!positions.length) return null;
  const xs = positions.map((p) => p.x);
  const minY = Math.min(...positions.map((p) => p.y));
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: minY };
}

// The whole team, laid out directly on the page as one fixed, cursor-
// reactive fisheye cluster — no card chrome, no pan/scroll. Team Leaders
// and the PI cluster share one line together at the very top (tiled
// left-to-right via layoutRows, same mechanism the department rows below
// use, then the whole row pinned above the department block via
// stackAbove) — a real line of its own, not a row either group shares with
// any department. They keep their own captions and PI keeps its own warm
// tint (see `isPi` further down) — set apart from each other by
// SATELLITE_GAP and from the department block by DEPARTMENT_GAP, no hard
// divider either way. Each department below that top row is one horizontal
// line of bubbles (wrapping only if it has more than
// DEPARTMENT_MAX_PER_ROW people); those lines tile left-to-right and wrap
// onto further page-rows themselves once a row gets too wide (layoutRows),
// so six departments read as a compact 2-row block rather than one very
// long strip.
//
// Every bubble's own scale responds to cursor distance — near it, a firm
// zoom; further out, progressively less, then nothing — and it springs
// back via CSS transition once the cursor moves on. `kind: "empty"` filler
// bubbles ride the same physics but aren't clickable and never show a name
// tag.
export default function Honeycomb({ leaderItems, departments, piItems, onSelect }) {
  const outerRef = useRef(null);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [mouse, setMouse] = useState(null); // {x,y} in design-space px, or null at rest
  const lastFocusRef = useRef(null);
  const rafRef = useRef(null);

  // Each department's own single line (or two, if it ever grows past
  // DEPARTMENT_MAX_PER_ROW), then tiled into a wrapped block of page-rows.
  const { positions: departmentBlobs, rowOf } = useMemo(() => {
    const shapes = departments.map((dept) => generateRows(dept.items.length, SPACING, DEPARTMENT_MAX_PER_ROW));
    return layoutRows(shapes, DEPARTMENT_GAP + SPACING, PAGE_ROW_GAP + SPACING, MAX_ROW_WIDTH);
  }, [departments]);

  const teamPositions = useMemo(() => departmentBlobs.flat(), [departmentBlobs]);

  // Team Leaders + PI, described as two named groups so the row-tiling
  // below (and the caption/position split after it) stays generic instead
  // of hardcoding "leaders first, then PI." Either can be empty (piItems
  // has been in the past, via PI_EMPTY_SLOT_COUNT in Roster.jsx) without
  // leaving a gap where an empty group would have sat.
  const topGroups = useMemo(() => {
    const groups = [];
    if (leaderItems.length) groups.push({ key: "leaders", count: leaderItems.length, maxPerRow: LEADER_MAX_PER_ROW });
    if (piItems.length) groups.push({ key: "pi", count: piItems.length, maxPerRow: PI_MAX_PER_ROW });
    return groups;
  }, [leaderItems.length, piItems.length]);

  // Team Leaders and PI tiled left-to-right into one page-row, same
  // mechanism the department block's own rows use (layoutRows) — then that
  // whole row pinned above the department block via stackAbove, computed
  // from teamPositions (not the other way around) so this row never
  // reflows the departments themselves, only where it sits relative to
  // them.
  const { positions: topBlobs } = useMemo(() => {
    const shapes = topGroups.map((g) => generateRows(g.count, SPACING, g.maxPerRow));
    return layoutRows(shapes, SATELLITE_GAP + SPACING, PAGE_ROW_GAP + SPACING, MAX_ROW_WIDTH);
  }, [topGroups]);
  const topPositions = useMemo(() => {
    const local = topBlobs.flat();
    // PAGE_ROW_GAP, not DEPARTMENT_GAP — this seam is vertical (one line to
    // the line below it, same as one department page-row to the next) and
    // needs the same caption + flag-badge clearance those already budget
    // for; DEPARTMENT_GAP is sized for a horizontal in-row seam only and
    // left the "Wet Lab" caption crowding Team Leaders' flag badges above
    // it.
    return local.length ? stackAbove(teamPositions, local, PAGE_ROW_GAP + SPACING) : [];
  }, [teamPositions, topBlobs]);

  // Split the translated top row back into its two groups (same order as
  // topGroups/topBlobs) so each can be rendered/captioned on its own.
  const topPositionsByGroup = useMemo(() => {
    const map = {};
    let cursor = 0;
    topGroups.forEach((g) => {
      map[g.key] = topPositions.slice(cursor, cursor + g.count);
      cursor += g.count;
    });
    return map;
  }, [topGroups, topPositions]);
  const leaderPositions = topPositionsByGroup.leaders ?? [];
  const satellitePositions = topPositionsByGroup.pi ?? [];

  const items = useMemo(
    () => [...leaderItems, ...departments.flatMap((d) => d.items), ...piItems],
    [leaderItems, departments, piItems]
  );
  const positions = useMemo(
    () => [...leaderPositions, ...teamPositions, ...satellitePositions],
    [leaderPositions, teamPositions, satellitePositions]
  );
  const box = useMemo(() => boundingBox(positions, { top: PAD_TOP, sides: PAD_SIDES }), [positions]);

  // Each department's caption, horizontally centered over its own line but
  // sharing its *page-row's* top Y with whichever other departments landed
  // on the same row — a short department sitting next to a taller one
  // would otherwise get a caption anchored mid-cluster, overlapping its
  // neighbor. Departments further down the wrapped block (a different
  // page-row) get their own, lower, shared top instead of colliding with
  // row one's captions above them.
  const departmentLabels = useMemo(() => {
    if (!teamPositions.length) return [];
    const rowTops = new Map();
    departmentBlobs.forEach((blob, i) => {
      const row = rowOf[i];
      const top = Math.min(...blob.map((p) => p.y));
      rowTops.set(row, Math.min(rowTops.get(row) ?? Infinity, top));
    });
    return departments.map((dept, i) => {
      const anchor = topCenterAnchor(departmentBlobs[i]);
      return { key: dept.key, label: dept.label, anchor: anchor && { x: anchor.x, y: rowTops.get(rowOf[i]) } };
    });
  }, [departments, departmentBlobs, rowOf, teamPositions]);
  const leaderLabel = useMemo(() => topCenterAnchor(leaderPositions), [leaderPositions]);
  const satelliteLabel = useMemo(() => topCenterAnchor(satellitePositions), [satellitePositions]);

  // Shrink (never enlarge) the whole cluster to fit both the width its
  // container actually has and a fixed vertical budget — the lattice
  // itself is always computed at the fixed design size above, so fitting
  // it is one CSS transform instead of a relayout.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return undefined;
    const update = () => {
      const availableWidth = el.offsetWidth;
      // Real measured space above the cluster (title block + .page's own
      // top padding, whatever they actually render as at this breakpoint)
      // rather than a guessed constant — this runs before the page has any
      // reason to have scrolled, so clientRect.top + the current scroll is
      // the cluster's stable position in the page's flow.
      const reservedAbove = el.getBoundingClientRect().top + window.scrollY;
      // Real measured position of the fixed nav bar's top edge, same idea
      // as reservedAbove — the exact nav footprint on whatever this
      // browser/window actually is, rather than a guessed constant that's
      // either too tight (overlaps it) or too generous (shrinks the
      // cluster for no reason) depending on browser chrome we can't see.
      const navTop = document.querySelector("[data-nav-bar]")?.getBoundingClientRect().top;
      const reservedBelow =
        navTop != null ? Math.max(0, window.innerHeight - navTop) + NAV_CLEARANCE : RESERVED_BELOW_FALLBACK;
      const availableHeight = Math.max(280, window.innerHeight - reservedAbove - reservedBelow);
      setScale(Math.min(1, availableWidth / box.width, availableHeight / box.height));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [box.width, box.height]);

  const handleMouseMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    // rect is the already-scaled stage, so undoing `scale` here recovers
    // the same design-space units the layout itself is expressed in.
    const x = (e.clientX - rect.left) / scale + box.minX;
    const y = (e.clientY - rect.top) / scale + box.minY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setMouse({ x, y }));
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setMouse(null);
  };

  // One influence value per bubble, driven purely by distance from the
  // cursor in design-space — reused for scale and stacking order so both
  // read as one consistent "zoom" effect.
  const rendered = items.map((item, i) => {
    const p = positions[i];
    let influence = 0;
    if (mouse) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy) || 1;
      influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
    }
    const bubbleScale = 1 + MAX_SCALE * influence;
    return { item, p, influence, bubbleScale };
  });

  // The single highest-influence real person (never an empty slot) above
  // FOCUS_THRESHOLD, i.e. whichever bubble the cursor is currently "on."
  const focused = rendered.reduce(
    (best, cur) => (cur.item.kind !== "empty" && cur.influence > (best?.influence ?? FOCUS_THRESHOLD) ? cur : best),
    null
  );

  // Keep the name tag's last known content/position around while it fades
  // out, instead of popping empty the instant the cursor moves off — only
  // its opacity (driven by `focused` directly, not this) needs to react
  // immediately. A ref written during render (rather than a state update in
  // an effect) keeps this live for as long as `focused` stays truthy —
  // otherwise the tag would freeze at its first frame of focus instead of
  // tracking the bubble's position/scale for as long as it stays focused.
  if (focused) lastFocusRef.current = focused;
  const tag = focused || lastFocusRef.current;

  return (
    <div ref={outerRef} className={styles.honeycombOuter} style={{ height: box.height * scale }}>
      <div
        ref={stageRef}
        className={styles.honeycombStage}
        style={{ width: box.width, height: box.height, transform: `scale(${scale})` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {rendered.map(({ item, p, bubbleScale }) => {
          const isEmpty = item.kind === "empty";
          // The PI cluster's bubbles (real and empty alike) carry a faint
          // warm tint instead of the team departments' neutral black glass —
          // DESIGN.md's one warm accent color, used this sparingly, is
          // exactly for a cue like this: felt without a hard-edged badge.
          const isPi = item.group === "pi";
          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.node} ${isEmpty ? styles.nodeEmpty : ""}`}
              style={{
                left: p.x - box.minX - RADIUS,
                top: p.y - box.minY - RADIUS,
                width: RADIUS * 2,
                height: RADIUS * 2,
                transform: `scale(${bubbleScale})`,
                zIndex: Math.round(bubbleScale * 100),
              }}
              // Not `disabled` — a disabled form control swallows pointer
              // events before they can bubble, which would leave a "dead
              // spot" in the fisheye wherever the cursor crosses an empty
              // slot. tabIndex/aria-hidden are enough to keep it out of the
              // keyboard/AT experience; there's simply no onClick to fire.
              tabIndex={isEmpty ? -1 : 0}
              aria-haspopup={isEmpty ? undefined : "dialog"}
              aria-label={isEmpty ? undefined : item.name}
              aria-hidden={isEmpty || undefined}
              onClick={isEmpty ? undefined : () => onSelect(item)}
            >
              <LiquidGlass radius={300} color={isPi ? [255, 216, 77] : [0, 0, 0]} opacity={isPi ? 0.05 : 0.07}>
                {isEmpty || !item.photo ? (
                  <div className={styles.nodeIconPlaceholder} />
                ) : (
                  <img src={item.photo} className={styles.nodeIcon} alt="" />
                )}
              </LiquidGlass>
              {/* Sibling of LiquidGlass, not a child of it — LiquidGlass
                  clips its contents to the bubble's circle, which would cut
                  off a badge meant to overlap the bottom edge. */}
              {/* Badge chip itself (.flagBadge) stays at its small,
                  unscaled padding/radius on purpose — only the flag inside
                  it grows. */}
              {item.countryCode && (
                <span className={styles.flagBadge}>
                  <Flag code={item.countryCode} width={28} height={20} />
                </span>
              )}
            </button>
          );
        })}

        {tag && (
          <div
            className={styles.nodeTag}
            style={{
              left: tag.p.x - box.minX,
              top: tag.p.y - box.minY - RADIUS * tag.bubbleScale - 10,
              opacity: focused ? 1 : 0,
            }}
          >
            {tag.item.name}
          </div>
        )}

        {leaderLabel && (
          <div
            className={styles.sectionLabel}
            style={{ left: leaderLabel.x - box.minX, top: leaderLabel.y - box.minY - RADIUS - 18 }}
          >
            Team Leaders
          </div>
        )}

        {departmentLabels.map(
          ({ key, label, anchor }) =>
            anchor && (
              <div
                key={key}
                className={styles.sectionLabel}
                style={{ left: anchor.x - box.minX, top: anchor.y - box.minY - RADIUS - 18 }}
              >
                {label}
              </div>
            )
        )}

        {satelliteLabel && (
          <div
            className={styles.sectionLabel}
            style={{ left: satelliteLabel.x - box.minX, top: satelliteLabel.y - box.minY - RADIUS - 18 }}
          >
            Principal Investigators
          </div>
        )}
      </div>
    </div>
  );
}
