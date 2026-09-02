import { useEffect, useMemo, useRef, useState } from "react";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import Flag from "./Flag";
import { generateRows, layoutRows, stackBelow, boundingBox } from "./honeycombLayout";
import styles from "./Roster.module.scss";

// Design-space constants — the cluster is always laid out at this fixed
// size and then CSS-scaled down (never up, see the fit-to-viewport effect
// below) to whatever room it actually has, so the layout math only ever
// has to run once per item count.
const RADIUS = 70; // resting bubble radius (140px diameter)
// Gap between two bubbles resting side by side within one department's own
// line — kept deliberately smaller than DEPARTMENT_GAP/SATELLITE_GAP below,
// so the *within-department* spacing reads as tighter than the *between-
// group* spacing. SPACING itself (center-to-center) has to clear the two
// bubbles' combined radii (2*RADIUS) — that's the floor, not a target: a
// smaller number here doesn't mean "somewhat closer," it means the bubbles
// overlap, which is a real bug an earlier tuning pass shipped.
const WITHIN_DEPARTMENT_GAP = 26;
const SPACING = RADIUS * 2 + WITHIN_DEPARTMENT_GAP;
const PAD = RADIUS * 2.2; // margin around the lattice for the hover-grown bubble's extra size
// Every department here is a single horizontal line at this width. The PI
// cluster's own line uses a much higher ceiling (it never has enough
// people to hit it at today's roster size) so it stays one line too,
// rather than wrapping into a second internal line and eating extra
// vertical space the fit-to-viewport budget then has to claw back from
// every bubble's size.
const DEPARTMENT_MAX_PER_ROW = 6;
const PI_MAX_PER_ROW = 12;
// How wide one page-row of department lines is allowed to get before the
// next department wraps onto a new page-row below (see layoutRows) — this
// is what turns "six single-line departments" into a compact 2-3-row block
// instead of one very long strip.
const MAX_ROW_WIDTH = 1600;
// Extra space (beyond each line's own normal touching-neighbor distance —
// see layoutRows/stackBelow in honeycombLayout.js) between two
// departments sharing a page-row, and between the whole department block
// and the PI cluster below it. Noticeably bigger than WITHIN_DEPARTMENT_GAP
// (departments are still one team, just subdivided), and bigger again
// before PI (a genuinely different category). All three stay soft either
// way: same bubbles, same spacing, no divider line — the gap itself is the
// only boundary.
const DEPARTMENT_GAP = 40;
const SATELLITE_GAP = 58;
// Vertical gap between page-rows of departments — separate from (and
// bigger than) DEPARTMENT_GAP: it has to leave room for a department's own
// caption to sit clear of the row above it, not just clear of its
// horizontal neighbors, which needs a lot more headroom than a side-by-side
// seam does. The "+60" is sized for .sectionLabel's actual font — bump it
// if that font grows much further, or captions start clipping into the
// row above them again.
const PAGE_ROW_GAP = DEPARTMENT_GAP + 60;
const SIGMA = SPACING * 1.1; // how far the cursor's influence reaches
const MAX_SCALE = 0.2; // peak extra scale at the cursor (resting scale is 1)
const FOCUS_THRESHOLD = 0.55; // influence above which a bubble shows its name tag

// Vertical room reserved by everything else on the page above/below the
// cluster (Roster.module.scss's .page top padding + title block + bottom
// nav clearance) — used so the cluster scales to fit *height* too, not just
// width. An estimate, not a measurement: the brief is "the cluster always
// fits inside the viewport, never scrolled" for typical desktop window
// sizes, not a pixel-exact fit against every possible layout tweak.
const RESERVED_VIEWPORT_CHROME = 450;

// Top-center point of a set of design-space positions, in the same units —
// where a caption anchors.
function topCenterAnchor(positions) {
  if (!positions.length) return null;
  const xs = positions.map((p) => p.x);
  const minY = Math.min(...positions.map((p) => p.y));
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: minY };
}

// The whole team, laid out directly on the page as one fixed, cursor-
// reactive fisheye cluster — no card chrome, no pan/scroll. Each
// department is one horizontal line of bubbles (wrapping only if it has
// more than DEPARTMENT_MAX_PER_ROW people); those lines tile left-to-right and wrap
// onto further page-rows themselves once a row gets too wide (layoutRows),
// so six departments read as a compact 2-3-row block rather than one very
// long strip. The PI cluster gets its own line under the whole block, set
// apart by a noticeably bigger gap — a different category, not another
// subdivision of the team — plus a few empty slots, room to grow.
//
// Every bubble's own scale responds to cursor distance — near it, a firm
// zoom; further out, progressively less, then nothing — and it springs
// back via CSS transition once the cursor moves on. `kind: "empty"` filler
// bubbles ride the same physics but aren't clickable and never show a name
// tag.
export default function Honeycomb({ departments, piItems, onSelect }) {
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
  const satellitePositions = useMemo(() => {
    if (!piItems.length) return [];
    const local = generateRows(piItems.length, SPACING, PI_MAX_PER_ROW);
    return stackBelow(teamPositions, local, SATELLITE_GAP + SPACING);
  }, [teamPositions, piItems.length]);

  const items = useMemo(() => [...departments.flatMap((d) => d.items), ...piItems], [departments, piItems]);
  const positions = useMemo(() => [...teamPositions, ...satellitePositions], [teamPositions, satellitePositions]);
  const box = useMemo(() => boundingBox(positions, PAD), [positions]);

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
      const availableHeight = Math.max(280, window.innerHeight - RESERVED_VIEWPORT_CHROME);
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
              {item.countryCode && (
                <span className={styles.flagBadge}>
                  <Flag code={item.countryCode} width={20} height={15} />
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
