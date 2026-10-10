import { useEffect, useRef } from "react";
import { isLowPerf } from "../../utils/perfMode";
import styles from "./AmbientMeteors.module.scss";

// A quiet, low-rate echo of Home's meteor field (Home.jsx's <Starfield>)
// for every other page — PageWrapper's bg.svg tile already draws the
// static star texture, so this only adds the occasional streak, not a
// second star layer. Deliberately not wired to Home's ScrollEngine
// singleton: that object's meteorRate/meteorRGB are driven by Home's own
// scroll narrative (the "medicine" reveal turns meteors amber-bright,
// etc.) and don't mean anything on a page with no such story — this just
// picks one constant, quiet rate instead, so the rest of the site still
// feels like "synthetic biology in space" past the landing page without
// re-telling Home's story.
//
// Rendered by PageWrapper itself (`ambientMeteors` prop, default on) —
// Home opts out since it already renders the richer <Starfield/>.
export default function AmbientMeteors({ rgb = "255,216,77" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (isLowPerf()) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let meteors = [];
    let W = 0, H = 0, dpr = 1, rafId = 0, timerId;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      const speed = 3.5 + Math.random() * 2.5;
      const slope = 0.4 + Math.random() * 0.3;
      meteors.push({
        x: Math.random() * W * 0.8 + W * 0.05,
        y: Math.random() * H * 0.35 - H * 0.05,
        vx: speed, vy: speed * slope,
        len: 110 + Math.random() * 90, w: 1.2 + Math.random() * 0.9,
        dur: 46 + Math.random() * 18, life: 0,
      });
    }

    // One streak roughly every 7–13s — a whisper next to Home's hero rate
    // (a burst every ~2–3.5s), so it reads as ambient, not a beat. The
    // canvas only animates while a streak is actually on screen (about a
    // second); between streaks there's no rAF loop at all, rather than
    // clearing an empty full-screen canvas 60 times a second for nothing.
    // A low-performance flag set mid-visit (utils/perfMode.js measures the
    // first scrolls) stops new streaks from being scheduled.
    function schedule(delay) {
      timerId = setTimeout(() => {
        if (isLowPerf()) return;
        // Skipped in a background tab (rAF is paused there), so streaks
        // don't pile up and all fire at once when the tab comes back.
        if (!document.hidden) spawn();
        if (!rafId && meteors.length) rafId = requestAnimationFrame(draw);
        schedule(7000 + Math.random() * 6000);
      }, delay);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let i = meteors.length - 1; i >= 0; i--) {
        const s = meteors[i];
        s.life += 1; s.x += s.vx; s.y += s.vy;
        const prog = s.life / s.dur;
        const fade = prog < 0.18 ? prog / 0.18 : 1 - (prog - 0.18) / 0.82;
        const a = Math.max(0, fade) * 0.55; // dimmer peak than Home's — ambient, not a hero beat
        const tailX = s.x - s.len, tailY = s.y - s.len * (s.vy / s.vx);
        const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        g.addColorStop(0, `rgba(${rgb},${(0.9 * a).toFixed(3)})`);
        g.addColorStop(0.4, `rgba(${rgb},${(0.35 * a).toFixed(3)})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.strokeStyle = g; ctx.lineWidth = s.w; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tailX, tailY); ctx.stroke();
        ctx.beginPath(); ctx.arc(s.x, s.y, s.w * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${(0.85 * a).toFixed(3)})`; ctx.fill();
        if (prog >= 1 || s.x - s.len > W + 40 || tailY > H + 40) meteors.splice(i, 1);
      }

      rafId = meteors.length ? requestAnimationFrame(draw) : 0;
    }

    window.addEventListener("resize", resize);
    resize();
    // First streak arrives soon after landing on the page, not instantly.
    schedule(1500 + Math.random() * 2500);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [rgb]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
