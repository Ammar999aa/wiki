import { useRef, useState } from "react";
import styles from "./JigsawTable.module.scss";

// Board geometry — a 16:9 rectangle (viewBox 0 0 1600 900) cut into 5
// pieces (3 across the top row at y 0–450, 2 wider ones across the bottom
// row at y 450–900). Only 5 of the internal seams carry a jigsaw knob;
// every other edge (including all of piece 2's bottom edge) is a straight
// cut. Constants below are shared by every piece that touches them, so
// neighbouring pieces always meet at bit-identical coordinates — the only
// way to guarantee no gaps/overlaps between pieces drawn independently.
const W = 1600;
const H = 900;
const X1 = W / 3; // 533.33... — seam between pieces 1/2
const X2 = (W * 2) / 3; // 1066.66... — seam between pieces 2/3
const XB = W / 2; // 800 — seam between pieces 4/5
const YM = H / 2; // 450 — row boundary

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l];
};
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

// Local (t, h) control points for the knob: t runs along the seam from
// the knob's centre, h runs outward along `normal`. Spec-given points.
const KNOB = {
  start: [-30, 0],
  c1a: [-18, 4],
  c1b: [-14, 20],
  p1: [-24, 36],
  c2a: [-40, 58],
  c2b: [-38, 92],
  p2: [0, 92],
  c3a: [38, 92],
  c3b: [40, 58],
  p3: [24, 36],
  c4a: [14, 20],
  c4b: [18, 4],
  end: [30, 0],
};

// Returns the seam from A to B as a line–4×cubic–line segment list, in
// global board coordinates. `normal` is the world-space unit vector the
// knob bulges toward (independent of which piece later walks the seam in
// which direction).
function buildSeam(A, B, normal, scale = 1.1) {
  const dir = unit(sub(B, A));
  const m = mid(A, B);
  const T = ([t, h]) => [m[0] + dir[0] * t * scale + normal[0] * h * scale, m[1] + dir[1] * t * scale + normal[1] * h * scale];
  const pStart = T(KNOB.start);
  const p1 = T(KNOB.p1);
  const p2 = T(KNOB.p2);
  const p3 = T(KNOB.p3);
  const pEnd = T(KNOB.end);
  return [
    { type: "L", from: A, to: pStart },
    { type: "C", from: pStart, c1: T(KNOB.c1a), c2: T(KNOB.c1b), to: p1 },
    { type: "C", from: p1, c1: T(KNOB.c2a), c2: T(KNOB.c2b), to: p2 },
    { type: "C", from: p2, c1: T(KNOB.c3a), c2: T(KNOB.c3b), to: p3 },
    { type: "C", from: p3, c1: T(KNOB.c4a), c2: T(KNOB.c4b), to: pEnd },
    { type: "L", from: pEnd, to: B },
  ];
}

// Emits the path commands for a seam, assuming the pen is already at the
// segment list's start point (A for forward, B for backward — reversing
// both segment order AND each cubic's control-point order, the only way
// to trace the identical physical curve the other way).
function seg(segments, forward) {
  if (forward) {
    return segments
      .map((s) => (s.type === "L" ? `L ${s.to[0]} ${s.to[1]}` : `C ${s.c1[0]} ${s.c1[1]} ${s.c2[0]} ${s.c2[1]} ${s.to[0]} ${s.to[1]}`))
      .join(" ");
  }
  return [...segments]
    .reverse()
    .map((s) => (s.type === "L" ? `L ${s.from[0]} ${s.from[1]}` : `C ${s.c2[0]} ${s.c2[1]} ${s.c1[0]} ${s.c1[1]} ${s.from[0]} ${s.from[1]}`))
    .join(" ");
}

// The 5 seams that get knobs. Everything else drawn below is a plain `L`.
const S12 = buildSeam([X1, 0], [X1, YM], [1, 0]); // 1→2, +x
const S23 = buildSeam([X2, 0], [X2, YM], [1, 0]); // 2→3, +x
const S14 = buildSeam([0, YM], [X1, YM], [0, -1]); // 4→1, -y
const S35 = buildSeam([X2, YM], [W, YM], [0, 1]); // 3→5, +y
const S45 = buildSeam([XB, YM], [XB, H], [-1, 0]); // 5→4, -x

const PIECE_D = [
  `M 0,0 L ${X1},0 ${seg(S12, true)} ${seg(S14, false)} Z`,
  `M ${X1},0 L ${X2},0 ${seg(S23, true)} L ${X1},${YM} ${seg(S12, false)} Z`,
  `M ${X2},0 L ${W},0 L ${W},${YM} ${seg(S35, false)} ${seg(S23, false)} Z`,
  `M 0,${YM} ${seg(S14, true)} L ${XB},${YM} ${seg(S45, true)} L 0,${H} Z`,
  `M ${XB},${YM} L ${X2},${YM} ${seg(S35, true)} L ${W},${H} L ${XB},${H} ${seg(S45, false)} Z`,
];

// Each piece's own rectangle (ignoring the knob bumps), used for both the
// corner number badge and the centered title.
const PIECE_RECT = [
  { left: 0, top: 0, right: X1, bottom: YM },
  { left: X1, top: 0, right: X2, bottom: YM },
  { left: X2, top: 0, right: W, bottom: YM },
  { left: 0, top: YM, right: XB, bottom: H },
  { left: XB, top: YM, right: W, bottom: H },
];

const NUM_POS = PIECE_RECT.map((r) => [r.left + 40, r.top + 110]);
// Nudge piece 2's title right — its centered wrap otherwise sits visibly
// left-of-center next to the knob poking in from piece 1.
const TITLE_X_NUDGE = [0, 40, 0, 0, 0];
const CENTER = PIECE_RECT.map((r, i) => [(r.left + r.right) / 2 + TITLE_X_NUDGE[i], (r.top + r.bottom) / 2]);

// Rough available-width-in-characters per piece at the 38px/700 title
// size, derived from each piece's own width — the three top pieces are
// much narrower than the two bottom ones, and real stakeholder-group
// names ("Regulatory, Safety & Ethics") run well past a single line at
// that width without this.
const TITLE_MAX_CHARS = [20, 17, 17, 33, 32];
const TITLE_LINE_HEIGHT = 44;
// Body text on the flipped-back face is smaller than the title, so more
// characters fit per line — same per-piece width ratio as TITLE_MAX_CHARS.
const BODY_MAX_CHARS = TITLE_MAX_CHARS.map((n) => Math.round(n * 1.7));
const BODY_LINE_HEIGHT = 30;

// The "open" position every piece animates toward on click: dead center
// of the board. Translating by (targetCenter - ownCenter) moves a piece's
// center there regardless of how much it's simultaneously being scaled —
// scaling happens around the piece's own center (transform-origin), so
// that center point never itself drifts from the scale alone.
const BOARD_CENTER = [W / 2, H / 2];
const OPEN_TRANSLATE = CENTER.map(([cx, cy]) => [BOARD_CENTER[0] - cx, BOARD_CENTER[1] - cy]);
const OPEN_SCALE = 1.7;
// Must match the .piece transform-transition duration in the CSS module —
// the content swap (front title <-> back body) is timed to land at this
// animation's halfway point, when the piece is edge-on (scaleY crossing
// zero) and the swap itself is least noticeable.
const FLIP_MS = 700;

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const DEFAULT_ITEMS = [
  { title: "Placeholder title one", body: "Placeholder body copy describing this stakeholder group goes here." },
  { title: "Placeholder title two", body: "Placeholder body copy describing this stakeholder group goes here." },
  { title: "Placeholder title three", body: "Placeholder body copy describing this stakeholder group goes here." },
  { title: "Placeholder title four", body: "Placeholder body copy describing this stakeholder group goes here." },
  { title: "Placeholder title five", body: "Placeholder body copy describing this stakeholder group goes here." },
];

export default function JigsawTable({ items = DEFAULT_ITEMS }) {
  const [hovered, setHovered] = useState(null);
  // `active` is the piece currently mid-animation (opening OR closing) —
  // it stays set through the whole close so the piece keeps rendering its
  // enlarged/mirrored markup while it animates back, not just while open.
  // `expanded` is what actually toggles the CSS transform: true = at the
  // board's center, scaled up, mirrored over the x-axis; false animates it
  // back to its normal in-grid position/orientation. `showBack` is which
  // face's text is rendered, flipped independently so the swap can be
  // timed to the transform animation's halfway point (see FLIP_MS below).
  const [active, setActive] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const handleToggle = (i) => {
    clearTimers();
    if (active === i && expanded) {
      // Closing: un-mirror the transform now (it animates back over
      // FLIP_MS), and swap the text back to the front face at the
      // animation's midpoint — the same edge-on moment used when opening.
      setExpanded(false);
      timers.current.push(
        setTimeout(() => setShowBack(false), FLIP_MS / 2),
        setTimeout(() => setActive(null), FLIP_MS)
      );
      return;
    }
    // Opening (from rest, or switching straight from another open piece).
    setActive(i);
    setShowBack(false);
    setExpanded(true);
    timers.current.push(setTimeout(() => setShowBack(true), FLIP_MS / 2));
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(i);
    } else if (e.key === "Escape" && active === i) {
      handleToggle(i);
    }
  };

  // SVG paints strictly in DOM order — `z-index` on a plain <g> isn't
  // reliably respected across browsers, so a piece early in `items` could
  // still get painted UNDER a later one on hover/open even with a higher
  // z-index. Moving the hovered/active piece to the end of the render
  // order is what actually guarantees it paints on top, regardless of
  // which piece it is. Positions/paths are unaffected — only paint order.
  const onTop = active ?? hovered;
  const order = [...items.keys()].sort((a, b) => (a === onTop ? 1 : 0) - (b === onTop ? 1 : 0));

  return (
    <div className={styles.wrap}>
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Five-piece jigsaw table of stakeholder groups">
        {order.map((i) => {
          const item = items[i];
          const [nx, ny] = NUM_POS[i];
          const [cx, cy] = CENTER[i];
          const isActive = active === i;
          const isBack = isActive && showBack;
          const [dx, dy] = OPEN_TRANSLATE[i];
          // CSS custom properties feeding translate() need a unit — bare
          // numbers make the whole transform invalid (and silently
          // dropped). "px" on an SVG element resolves in that element's
          // own user-space coordinates (the viewBox units), not screen
          // pixels, which is exactly the space dx/dy were computed in.
          const pieceStyle = isActive ? { "--dx": `${dx}px`, "--dy": `${dy}px`, "--scale": OPEN_SCALE } : undefined;
          const titleLines = wrapText(item.title, TITLE_MAX_CHARS[i]);
          // Center the whole wrapped block vertically on the piece by
          // starting half its total height above the piece's own center.
          const firstLineDy = -((titleLines.length - 1) * TITLE_LINE_HEIGHT) / 2;
          const bodyLines = isBack ? wrapText(item.body, BODY_MAX_CHARS[i]) : [];
          const bodyFirstDy = -((bodyLines.length - 1) * BODY_LINE_HEIGHT) / 2;
          return (
            <g
              key={item.title}
              className={`${styles.piece} ${isActive && expanded ? styles.active : ""}`}
              style={pieceStyle}
              role="button"
              tabIndex={0}
              aria-pressed={isActive && expanded}
              aria-label={`${item.title} — show details`}
              onClick={() => handleToggle(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered((h) => (h === i ? null : h))}
            >
              <path d={PIECE_D[i]} fill={`var(--piece-${i + 1})`} stroke="var(--surface)" strokeWidth="8" strokeLinejoin="round" />
              {isBack ? (
                <g className={styles.backFace}>
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className={styles.pieceBody} fill="var(--text-light)">
                    {bodyLines.map((line, li) => (
                      <tspan key={line} x={cx} dy={li === 0 ? bodyFirstDy : BODY_LINE_HEIGHT}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              ) : (
                <>
                  <text x={nx} y={ny} className={styles.pieceNum} fill="var(--text-light)">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className={styles.pieceTitle} fill="var(--text-light)">
                    {titleLines.map((line, li) => (
                      <tspan key={line} x={cx} dy={li === 0 ? firstLineDy : TITLE_LINE_HEIGHT}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
      <ul className={styles.srOnly}>
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>: {item.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
