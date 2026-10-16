// Turns a markdown `.photo-slider` (a plain row of <img>s, see
// SectionedArticle.module.scss) into an endless carousel: the current photo
// centered with the edges of its neighbours showing, advancing on its own
// and wrapping from the last photo straight to the first (and back).
//
// The photos move inside a translated track rather than by scrolling the
// row, so the motion doesn't depend on the browser's smooth scrolling. One
// set of copies (aria-hidden) sits on each side of the real photos; after a
// slide lands on a copy the track jumps, without animating, to the same
// photo in the real set, so it can keep going in either direction forever.
//
// Moving it: prev/next arrow buttons, a horizontal trackpad swipe (wheel
// deltaX), or a touch/mouse drag. Autoplay waits a few seconds after any of
// those, stops in a background tab, and is off for readers with reduced
// motion. Returns a cleanup that
// restores the original markup.

const INTERVAL = 3500; // ms between automatic steps
const DURATION = 600; // ms per slide animation
const HOLD = 6000; // ms autoplay waits after the reader moves it
const SWIPE = 40; // px of drag / wheel travel that counts as a swipe

const icon = (d) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  prev: icon('<path d="m15 18-6-6 6-6"/>'),
  next: icon('<path d="m9 18 6-6-6-6"/>'),
};

export default function photoCarousel(slider) {
  const originals = [...slider.querySelectorAll(":scope > img")];
  const n = originals.length;
  if (n < 2) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const copy = (img) => {
    const clone = img.cloneNode(true);
    clone.alt = "";
    clone.setAttribute("aria-hidden", "true");
    return clone;
  };

  const track = document.createElement("div");
  track.className = "photo-slider-track";
  track.append(...originals.map(copy), ...originals, ...originals.map(copy));
  track.querySelectorAll("img").forEach((img) => (img.draggable = false));

  const button = (cls, label, svg) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `photo-slider-btn ${cls}`;
    b.setAttribute("aria-label", label);
    b.innerHTML = svg;
    return b;
  };
  const prevBtn = button("prev", "Previous photo", ICONS.prev);
  const nextBtn = button("next", "Next photo", ICONS.next);

  slider.append(track, prevBtn, nextBtn);
  slider.classList.add("is-carousel");

  let index = n; // first real photo
  let settle = 0;

  const place = (offset = 0) => {
    const slide = track.children[index];
    const x = slider.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2) + offset;
    track.style.transform = `translateX(${x}px)`;
  };

  const go = (to, animate = !reduced) => {
    index = to;
    track.style.transition = animate ? `transform ${DURATION}ms ease` : "none";
    place();
    clearTimeout(settle);
    // Landed on a copy: swap to the same photo in the real set, unanimated.
    settle = setTimeout(() => {
      if (index >= 2 * n || index < n) {
        index = (((index - n) % n) + n) % n + n;
        track.style.transition = "none";
        place();
      }
    }, animate ? DURATION + 20 : 0);
  };

  let heldUntil = 0;
  const step = (dir) => {
    heldUntil = Date.now() + HOLD;
    go(index + dir);
  };

  const timer = reduced
    ? 0
    : setInterval(() => {
        if (document.hidden || Date.now() < heldUntil) return;
        go(index + 1);
      }, INTERVAL);

  // Touch/mouse drag. touch-action: pan-y (CSS) leaves vertical page
  // scrolling to the browser and hands horizontal moves to these handlers.
  let startX = null;
  let moved = 0;
  const onDown = (e) => {
    if (e.button !== 0 || e.target.closest("button")) return;
    startX = e.clientX;
    moved = 0;
    track.style.transition = "none";
  };
  const onMove = (e) => {
    if (startX === null) return;
    moved = e.clientX - startX;
    if (Math.abs(moved) > 5 && !slider.hasPointerCapture(e.pointerId)) slider.setPointerCapture(e.pointerId);
    place(moved);
  };
  const onUp = () => {
    if (startX === null) return;
    startX = null;
    if (moved <= -SWIPE) step(1);
    else if (moved >= SWIPE) step(-1);
    else go(index);
  };

  // A horizontal trackpad swipe arrives as a burst of wheel events: one
  // step per burst, once enough sideways travel has built up.
  let wheelTravel = 0;
  let wheelStepped = false;
  let wheelEnd = 0;
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault(); // keep the browser's swipe-to-go-back out of it
    wheelTravel += e.deltaX;
    if (!wheelStepped && Math.abs(wheelTravel) > SWIPE) {
      wheelStepped = true;
      step(wheelTravel > 0 ? 1 : -1);
    }
    clearTimeout(wheelEnd);
    wheelEnd = setTimeout(() => {
      wheelTravel = 0;
      wheelStepped = false;
    }, 200);
  };

  const onClick = (e) => {
    const btn = e.target.closest(".photo-slider-btn");
    if (btn) {
      e.stopPropagation();
      step(btn === prevBtn ? -1 : 1);
      return;
    }
    // A drag shouldn't also count as a click that opens the Lightbox.
    if (Math.abs(moved) > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
    moved = 0;
  };

  slider.addEventListener("pointerdown", onDown);
  slider.addEventListener("pointermove", onMove);
  slider.addEventListener("pointerup", onUp);
  slider.addEventListener("pointercancel", onUp);
  slider.addEventListener("wheel", onWheel, { passive: false });
  slider.addEventListener("click", onClick, true);

  // Photo widths depend on the column (and images may still be loading).
  const ro = new ResizeObserver(() => go(index, false));
  ro.observe(slider);
  go(index, false);

  return () => {
    clearInterval(timer);
    clearTimeout(settle);
    clearTimeout(wheelEnd);
    ro.disconnect();
    slider.removeEventListener("pointerdown", onDown);
    slider.removeEventListener("pointermove", onMove);
    slider.removeEventListener("pointerup", onUp);
    slider.removeEventListener("pointercancel", onUp);
    slider.removeEventListener("wheel", onWheel);
    slider.removeEventListener("click", onClick, true);
    originals.forEach((img) => img.removeAttribute("draggable"));
    slider.append(...originals);
    track.remove();
    prevBtn.remove();
    nextBtn.remove();
    slider.classList.remove("is-carousel");
  };
}
