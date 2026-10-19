import { useEffect, useRef, useState } from "react";
import styles from "./HardwareAnimation.module.scss";
import { DURATION, captionAt, startFluidAnimation } from "./engine";

// Nadia's animated walkthrough of the fluid system (bioreactor → filtration →
// syringe pumps → column → vial), as a box on the landing page. engine.js
// holds her renderer; this file is the box around it: lazy loading, the
// caption, the progress bar and the buttons.

// Shrunk losslessly to fit the 10 MB upload limit (outputs/landing-uploads/
// weld_glb.py); same Float32/Uint32 layout the engine reads.
const MODEL_URL = "https://static.igem.wiki/teams/6341/wiki/content/home/hardware-animation.glb";

// One download per page load, however often the box remounts.
let modelPromise = null;
const loadModel = () =>
  (modelPromise ??= fetch(MODEL_URL).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.arrayBuffer();
  }).catch((err) => {
    modelPromise = null;
    throw err;
  }));

const cx = (...names) => names.filter(Boolean).join(" ");

function IcoPlay() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4l10 6-10 6z" fill="currentColor" /></svg>;
}
function IcoPause() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 4h3.5v12H5zM11.5 4H15v12h-3.5z" fill="currentColor" /></svg>;
}
function IcoRestart() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 9.5a5.5 5.5 0 1 0 1.8-4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5.8 2.6v3.2H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoCamera() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 7.5h2.5L7 5.5h6l1.5 2H17v8H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="10" cy="11.3" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IcoExpand({ on }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={on ? "M8 3v5H3M12 3v5h5M8 17v-5H3M12 17v-5h5" : "M3 8V3h5M17 8V3h-5M3 12v5h5M17 12v5h-5"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HardwareAnimation({ className, title }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const barRef = useRef(null);
  const ctlRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | nowebgl | error
  const [playing, setPlaying] = useState(
    () => !(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );
  const [auto, setAuto] = useState(true);
  const [cap, setCap] = useState(null);
  const [full, setFull] = useState(false);
  const fsEnabled = typeof document !== "undefined" && document.fullscreenEnabled;

  // Fetch the model (7.6 MB) only once the box is close to the screen,
  // horizontally too: on the landing page it waits off to the right until
  // "Our Solution" slides to its second part.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStatus("loading");
        loadModel()
          .then((glb) => {
            if (cancelled || !canvasRef.current) return;
            let lastCap = null;
            const ctl = startFluidAnimation(canvasRef.current, glb, {
              playing,
              onAutoChange: setAuto,
              onFrame: (t) => {
                if (barRef.current) barRef.current.style.width = `${(100 * t) / DURATION}%`;
                const c = captionAt(t);
                if (c !== lastCap) {
                  lastCap = c;
                  setCap(c);
                }
              },
            });
            if (!ctl) return setStatus("nowebgl");
            ctlRef.current = ctl;
            setStatus("ready");
          })
          .catch((err) => {
            console.error("HardwareAnimation: failed to load the model", err);
            if (!cancelled) setStatus("error");
          });
      },
      { rootMargin: "300% 150%" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      ctlRef.current?.destroy();
      ctlRef.current = null;
    };
    // `playing` is only the starting state; the buttons drive it after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const togglePlay = () => {
    ctlRef.current?.setPlaying(!playing);
    setPlaying(!playing);
  };
  const restart = () => {
    ctlRef.current?.restart();
    setPlaying(true);
  };
  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen().catch(() => {});
  };

  const message = {
    idle: "",
    loading: "Loading the 3D model…",
    nowebgl: "Your browser could not start WebGL, so the 3D view is unavailable.",
    error: "The 3D model could not be loaded.",
  }[status];
  const ready = status === "ready";

  return (
    <figure
      className={cx(styles.anim, full && styles.full, className)}
      ref={wrapRef}
    >
      <div className={styles.stage}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          role="img"
          aria-label="Animated 3D walkthrough of SHIHAB's fluid system: culture flows from the bioreactor through filtration, syringe pumps push four buffers through the chromatography column, and the eluted protein is collected in a vial."
        />
        {title && <p className={styles.title}>{title}</p>}
        {message && <p className={styles.status}>{message}</p>}
        {ready && cap && (
          <div className={styles.cap} aria-live="polite">
            <b>{cap[2]}</b>
            <span>{cap[3]}</span>
          </div>
        )}
        <div className={styles.bar} aria-hidden="true"><i ref={barRef} /></div>
      </div>
      <figcaption className={styles.controls}>
        <button type="button" onClick={togglePlay} disabled={!ready} aria-label={playing ? "Pause" : "Play"} title={playing ? "Pause" : "Play"}>
          {playing ? <IcoPause /> : <IcoPlay />}
        </button>
        <button type="button" onClick={restart} disabled={!ready} aria-label="Restart" title="Restart">
          <IcoRestart />
        </button>
        <button
          type="button"
          onClick={() => ctlRef.current?.setAuto(true)}
          disabled={!ready || auto}
          aria-label="Return to the guided camera"
          title={auto ? "Guided camera (drag the view to look around)" : "Return to the guided camera"}
        >
          <IcoCamera />
        </button>
        {fsEnabled && (
          <button type="button" onClick={toggleFull} aria-label={full ? "Exit full screen" : "Full screen"} title={full ? "Exit full screen" : "Full screen"}>
            <IcoExpand on={full} />
          </button>
        )}
        <span className={styles.note}>Illustrative flow, not measured data</span>
      </figcaption>
    </figure>
  );
}
