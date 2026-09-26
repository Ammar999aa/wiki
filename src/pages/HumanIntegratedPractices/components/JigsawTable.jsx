import { useEffect, useRef, useState } from "react";
import styles from "./JigsawTable.module.scss";

// 1600×900 board: 3 pieces on top, 2 on the bottom. Neighbours share the same
// seam objects so their edges meet at identical coordinates.
const W = 1600;
const H = 900;
const X1 = W / 3;
const X2 = (W * 2) / 3;
const XB = W / 2;
const YM = H / 2;

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const unit = (a) => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

// Knob control points in local (t, h): t along the seam, h along the normal.
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

const SEAM_SCALE = 1.1;

function buildSeam(A, B, normal, scale = SEAM_SCALE) {
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

// Walking a seam backwards needs reversed segments AND swapped control points.
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

const S12 = buildSeam([X1, 0], [X1, YM], [1, 0]);
const S23 = buildSeam([X2, 0], [X2, YM], [1, 0]);
const S14 = buildSeam([0, YM], [X1, YM], [0, -1]);
const S35 = buildSeam([X2, YM], [W, YM], [0, 1]);
const S45 = buildSeam([XB, YM], [XB, H], [-1, 0]);

const PIECE_D = [
  `M 0,0 L ${X1},0 ${seg(S12, true)} ${seg(S14, false)} Z`,
  `M ${X1},0 L ${X2},0 ${seg(S23, true)} L ${X1},${YM} ${seg(S12, false)} Z`,
  `M ${X2},0 L ${W},0 L ${W},${YM} ${seg(S35, false)} ${seg(S23, false)} Z`,
  `M 0,${YM} ${seg(S14, true)} L ${XB},${YM} ${seg(S45, true)} L 0,${H} Z`,
  `M ${XB},${YM} L ${X2},${YM} ${seg(S35, true)} L ${W},${H} L ${XB},${H} ${seg(S45, false)} Z`,
];

const PIECE_RECT = [
  { left: 0, top: 0, right: X1, bottom: YM },
  { left: X1, top: 0, right: X2, bottom: YM },
  { left: X2, top: 0, right: W, bottom: YM },
  { left: 0, top: YM, right: XB, bottom: H },
  { left: XB, top: YM, right: W, bottom: H },
];

const NUM_POS = PIECE_RECT.map((r) => [r.left + 40, r.top + 110]);
// Piece 2's title looks off-center next to piece 1's knob without this.
const TITLE_X_NUDGE = [0, 40, 0, 0, 0];
const CENTER = PIECE_RECT.map((r, i) => [(r.left + r.right) / 2 + TITLE_X_NUDGE[i], (r.top + r.bottom) / 2]);

const TITLE_MAX_CHARS = [20, 17, 17, 33, 32];
const TITLE_LINE_HEIGHT = 44;
const BACK_MAX_CHARS = TITLE_MAX_CHARS.map((n) => n * 2);
const BACK_LINE_HEIGHT = 27;
const BACK_SECTION_GAP = 16;

// Each piece scales/flips around its bounding-box center: half a knob away from
// its rectangle's center, on the side its outward knob sticks out. The pivot is
// passed explicitly because Firefox mishandles `transform-box: fill-box`.
const HALF_TAB = (KNOB.p2[1] * SEAM_SCALE) / 2;
const TAB_OFFSET = [
  [HALF_TAB, 0],
  [HALF_TAB, 0],
  [0, HALF_TAB],
  [0, -HALF_TAB],
  [-HALF_TAB, 0],
];
const PIVOT = PIECE_RECT.map((r, i) => [(r.left + r.right) / 2 + TAB_OFFSET[i][0], (r.top + r.bottom) / 2 + TAB_OFFSET[i][1]]);
const OPEN_SCALE = 1.55;
// "px" on an SVG element means viewBox units.
const PIECE_STYLE = PIVOT.map(([ox, oy]) => ({
  "--ox": `${ox}px`,
  "--oy": `${oy}px`,
  "--dx": `${W / 2 - ox}px`,
  "--dy": `${H / 2 - oy}px`,
  "--scale": OPEN_SCALE,
}));
// Must match the .piece transition duration in the CSS module.
const FLIP_MS = 700;

function wrapText(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
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

function backLines(item, maxChars) {
  const lines = [
    { text: "Learn", label: true },
    ...wrapText(item.learn.join(" "), maxChars).map((text) => ({ text })),
    { text: "Influence", label: true, gap: true },
    ...wrapText(item.influence.join(" · "), maxChars).map((text) => ({ text })),
  ];
  return lines.map((line, li) => ({ ...line, dy: li === 0 ? 0 : BACK_LINE_HEIGHT + (line.gap ? BACK_SECTION_GAP : 0) }));
}

export default function JigsawTable({ items }) {
  const [hovered, setHovered] = useState(null);
  // `active` outlives `expanded` by one animation so the closing piece keeps
  // its markup; `showBack` swaps faces at the animation's midpoint.
  const [active, setActive] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const handleToggle = (i) => {
    clearTimers();
    if (active === i && expanded) {
      setExpanded(false);
      timers.current.push(
        setTimeout(() => setShowBack(false), FLIP_MS / 2),
        setTimeout(() => setActive(null), FLIP_MS)
      );
      return;
    }
    setActive(i);
    setShowBack(false);
    setExpanded(true);
    timers.current.push(setTimeout(() => setShowBack(true), FLIP_MS / 2));
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(i);
    } else if (e.key === "Escape" && active === i && expanded) {
      handleToggle(i);
    }
  };

  // SVG ignores z-index, so the raised piece is moved to the end of the DOM.
  const onTop = active ?? hovered;
  const order = [...items.keys()].sort((a, b) => (a === onTop ? 1 : 0) - (b === onTop ? 1 : 0));

  return (
    <div className={styles.wrap}>
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Stakeholder groups — select a piece for details">
        {order.map((i) => {
          const item = items[i];
          const [nx, ny] = NUM_POS[i];
          const [cx, cy] = CENTER[i];
          const isActive = active === i;
          return (
            <g
              key={item.title}
              className={`${styles.piece} ${isActive && expanded ? styles.active : ""}`}
              style={PIECE_STYLE[i]}
              role="button"
              tabIndex={0}
              aria-expanded={isActive && expanded}
              aria-label={item.title}
              onClick={() => handleToggle(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
            >
              <path d={PIECE_D[i]} fill={`var(--piece-${i + 1})`} stroke="var(--surface)" strokeWidth="8" strokeLinejoin="round" />
              {isActive && showBack ? (
                <BackFace item={item} cx={cx} cy={cy} maxChars={BACK_MAX_CHARS[i]} />
              ) : (
                <FrontFace item={item} index={i} nx={nx} ny={ny} cx={cx} cy={cy} />
              )}
            </g>
          );
        })}
      </svg>
      <ul className={styles.srOnly}>
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>. Learn: {item.learn.join(" ")} Influence: {item.influence.join(", ")}.
          </li>
        ))}
      </ul>
    </div>
  );
}

function FrontFace({ item, index, nx, ny, cx, cy }) {
  const lines = wrapText(item.title, TITLE_MAX_CHARS[index]);
  const firstDy = -((lines.length - 1) * TITLE_LINE_HEIGHT) / 2;
  return (
    <>
      <text x={nx} y={ny} className={styles.pieceNum} fill="var(--text-light)">
        {String(index + 1).padStart(2, "0")}
      </text>
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className={styles.pieceTitle} fill="var(--text-light)">
        {lines.map((line, li) => (
          <tspan key={li} x={cx} dy={li === 0 ? firstDy : TITLE_LINE_HEIGHT}>
            {line}
          </tspan>
        ))}
      </text>
    </>
  );
}

function BackFace({ item, cx, cy, maxChars }) {
  const lines = backLines(item, maxChars);
  const totalHeight = lines.reduce((sum, l) => sum + l.dy, 0);
  return (
    // Counter-mirrors the text so it reads upright inside the flipped piece.
    <g transform={`translate(${cx} 0) scale(-1 1) translate(${-cx} 0)`}>
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className={styles.pieceBody} fill="var(--text-light)">
        {lines.map((line, li) => (
          <tspan key={li} x={cx} dy={li === 0 ? -totalHeight / 2 : line.dy} className={line.label ? styles.pieceLabel : undefined}>
            {line.text}
          </tspan>
        ))}
      </text>
    </g>
  );
}
