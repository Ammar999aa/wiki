// Low-performance mode: sets `data-perf="low"` on <html> on machines that
// can't keep scrolling smooth, so CSS can drop the expensive effects
// (LiquidGlass's backdrop blur — see its stylesheet) and canvas animations
// can skip their loops (`isLowPerf()`, e.g. AmbientMeteors).
//
// There's no CSS media query for "slow device", so this combines:
//   1. `?perf=low` / `?perf=high` in the URL — a manual override for
//      testing (remembered, like the measured result below);
//   2. a remembered result from an earlier visit (localStorage);
//   3. `prefers-reduced-transparency` — the visitor explicitly asked for
//      fewer translucent surfaces (Chromium-based browsers only, for now);
//   4. otherwise, a measurement: frame times while the visitor scrolls,
//      since scrolling is when the glass panels cost the most. If more
//      than a third of those frames miss ~40fps, the machine is flagged
//      and the result remembered for next time.

const STORAGE_KEY = "perfMode";
const SAMPLE_FRAMES = 45;
const SCROLL_GAP_MS = 150;
const SLOW_FRAME_MS = 25;
const SLOW_SHARE = 1 / 3;

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage blocked (private window, etc.) — just re-measure next visit.
  }
}

function apply(mode) {
  if (mode === "low") document.documentElement.dataset.perf = "low";
  else delete document.documentElement.dataset.perf;
}

export function isLowPerf() {
  return document.documentElement.dataset.perf === "low";
}

// Only frames painted while the page is actually scrolling count (within
// SCROLL_GAP_MS of a scroll event), collected across as many scrolls as it
// takes — a single wheel tick followed by an idle page would otherwise
// measure the idle page and wrongly record a fast machine.
function measureWhileScrolling() {
  const deltas = [];
  let lastScroll = 0;
  let last = null;
  let running = false;

  const finish = () => {
    window.removeEventListener("scroll", onScroll);
    const slow = deltas.filter((d) => d > SLOW_FRAME_MS).length;
    const mode = slow / deltas.length > SLOW_SHARE ? "low" : "high";
    store(mode);
    apply(mode);
  };

  const tick = (t) => {
    if (t - lastScroll > SCROLL_GAP_MS || document.visibilityState !== "visible") {
      running = false;
      last = null;
      return;
    }
    if (last !== null) deltas.push(t - last);
    last = t;
    if (deltas.length >= SAMPLE_FRAMES) {
      running = false;
      finish();
      return;
    }
    requestAnimationFrame(tick);
  };

  function onScroll() {
    lastScroll = performance.now();
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

export function initPerfMode() {
  const param = new URLSearchParams(window.location.search).get("perf");
  if (param === "low" || param === "high") {
    store(param);
    apply(param);
    return;
  }

  const stored = readStored();
  if (stored === "low" || stored === "high") {
    apply(stored);
    return;
  }

  if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) {
    apply("low");
    return;
  }

  measureWhileScrolling();
}
