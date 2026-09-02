// Pure position math for the team honeycomb (see Honeycomb.jsx) — no React,
// no DOM, so it's cheap to compute once and easy to reason about on its own.

const SQRT3 = Math.sqrt(3);

// Returns `count` {x, y} positions (in px, centered on the origin): a
// single horizontal row when `count <= maxPerRow`, wrapping onto further
// rows beyond that — a department reads as one clean line of bubbles (the
// common case, every department here is well under `maxPerRow`) while a
// bigger group (the PI cluster, with its empty "room to grow" slots) still
// wraps sanely instead of running off arbitrarily wide. Wrapped rows
// stagger by half a `spacing` and stack at hex row-height (spacing*√3/2),
// so if a group *does* wrap, the two rows nest into each other honeycomb-style
// instead of just stacking as a plain grid.
export function generateRows(count, spacing, maxPerRow) {
  const rowCount = Math.max(1, Math.ceil(count / maxPerRow));
  const points = [];
  let remaining = count;
  for (let r = 0; r < rowCount; r++) {
    const itemsInRow = Math.min(maxPerRow, remaining);
    remaining -= itemsInRow;
    const offset = r % 2 === 1 ? spacing / 2 : 0;
    const rowWidth = (itemsInRow - 1) * spacing;
    for (let c = 0; c < itemsInRow; c++) {
      points.push({
        x: c * spacing + offset - rowWidth / 2,
        y: r * spacing * (SQRT3 / 2),
      });
    }
  }
  // Re-center vertically now that the total row count (and so total
  // height) is known — each row above was placed top-down from y=0.
  const ys = points.map((p) => p.y);
  const midY = (Math.min(...ys) + Math.max(...ys)) / 2;
  return points.map((p) => ({ x: p.x, y: p.y - midY }));
}

function rawBBox(positions) {
  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

// Tiles a list of already-generated shapes (each its own array of {x,y},
// centered wherever `generateRows` left it) left to right, wrapping onto a
// new line once a row would exceed `maxRowWidth` — the same idea as CSS
// flex-wrap, so e.g. six single-line department clusters end up two or
// three lines deep instead of one impossibly wide strip. Each line is
// centered as its own row, and the stack of lines is centered as a block.
//
// Returns `{ positions, rowOf }`: `positions[i]` is shape `i` translated
// into its final spot in the combined layout; `rowOf[i]` is which line it
// landed on, 0-indexed — callers use this to anchor a caption above *that*
// line's own top edge rather than the whole block's (lines further down
// the page sit far below the top line, so one shared top would strand
// their captions in mid-air over a different group entirely).
//
// `rowGap` (vertical, between page-rows) is deliberately a separate
// parameter from `gap` (horizontal, between groups sharing a page-row) —
// it needs enough headroom to fit each row's own caption underneath the
// row above without the two crowding each other, which is usually a lot
// more slack than the horizontal seam between neighbors needs.
export function layoutRows(shapes, gap, rowGap, maxRowWidth) {
  const dims = shapes.map(rawBBox);
  const rows = [];
  let current = [];
  let currentWidth = 0;
  shapes.forEach((_, i) => {
    const w = dims[i].maxX - dims[i].minX;
    const addedWidth = current.length ? gap + w : w;
    if (current.length && currentWidth + addedWidth > maxRowWidth) {
      rows.push(current);
      current = [];
      currentWidth = 0;
    }
    current.push(i);
    currentWidth += current.length === 1 ? w : gap + w;
  });
  if (current.length) rows.push(current);

  const rowHeights = rows.map((idxs) => Math.max(...idxs.map((i) => dims[i].maxY - dims[i].minY)));
  let cursorY = 0;
  const rowCenterY = rowHeights.map((h) => {
    const center = cursorY + h / 2;
    cursorY += h + rowGap;
    return center;
  });
  const totalHeight = cursorY - rowGap;

  const positions = new Array(shapes.length);
  const rowOf = new Array(shapes.length);
  rows.forEach((idxs, rowIndex) => {
    const rowWidth = idxs.reduce((sum, i, k) => sum + (dims[i].maxX - dims[i].minX) + (k > 0 ? gap : 0), 0);
    let cursorX = -rowWidth / 2;
    idxs.forEach((i) => {
      const w = dims[i].maxX - dims[i].minX;
      const shapeMidX = (dims[i].minX + dims[i].maxX) / 2;
      const shapeMidY = (dims[i].minY + dims[i].maxY) / 2;
      const targetCenterX = cursorX + w / 2;
      const targetCenterY = rowCenterY[rowIndex] - totalHeight / 2;
      const tx = targetCenterX - shapeMidX;
      const ty = targetCenterY - shapeMidY;
      positions[i] = shapes[i].map((p) => ({ x: p.x + tx, y: p.y + ty }));
      rowOf[i] = rowIndex;
      cursorX += w + gap;
    });
  });
  return { positions, rowOf };
}

// Centers `shape` horizontally under `abovePositions` and places it `gap`
// below their lowest point — used for the PI cluster, which always gets
// its own line under the whole department block rather than competing for
// a spot in the wrapped grid above (see the bigger gap that implies:
// distance itself marks it as a different kind of group, not just another
// department).
export function stackBelow(abovePositions, shape, gap) {
  const above = rawBBox(abovePositions);
  const local = rawBBox(shape);
  const aboveMidX = (above.minX + above.maxX) / 2;
  const localMidX = (local.minX + local.maxX) / 2;
  const tx = aboveMidX - localMidX;
  const ty = above.maxY + gap - local.minY;
  return shape.map((p) => ({ x: p.x + tx, y: p.y + ty }));
}

// Bounding box of a set of positions, padded out by `pad` on every side.
// Callers use this to size the container that holds the (absolutely
// positioned) circles — `pad` needs to cover how far the fisheye effect can
// scale/push a circle past its resting position, or growth clips at the edge.
export function boundingBox(positions, pad) {
  const { minX, maxX, minY, maxY } = rawBBox(positions);
  return { minX: minX - pad, minY: minY - pad, width: maxX - minX + 2 * pad, height: maxY - minY + 2 * pad };
}
