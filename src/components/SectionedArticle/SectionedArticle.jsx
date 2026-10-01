import { useState, useRef, useEffect } from "react";
import Panel from "./Panel/Panel";
import Article from "./Article/Article";
import styles from "./SectionedArticle.module.scss";

export default function SectionedArticle({ sections, defaultSelected, title, panelHeader, intro }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState(defaultSelected || sections[0]?.title);
  const sectionRefs = useRef({});
  const progressFillRef = useRef(null);
  // Set while a panel click's smooth scroll is still animating there — the
  // scroll-position observer below would otherwise fire for every section
  // that passes through its band along the way, flickering the panel's
  // selection through them before settling on the clicked one. Cleared on
  // "scrollend" (with a timeout backstop for the case the target was
  // already in view, so the browser never fires one).
  const scrollLockRef = useRef(null);
  const scrollLockTimeoutRef = useRef(null);

  useEffect(() => {
    setSelected(sections[0]?.title);
  }, [sections]);

  // Document-level scroll progress — "how much of this article is left,"
  // in the accent amber so it reads as a meteor trail rather than a stock
  // loading bar. Tied to the whole document rather than just <Article>'s
  // own box: these routes are effectively one continuous read top to
  // bottom, so window scroll extent already is the article's extent.
  //
  // Driven by rAF straight onto the fill's own style, not a scroll listener
  // + React state — same idiom Home.jsx's ScrollEngine uses for anything
  // scroll-linked. A "scroll" event fires at the browser's discretion and,
  // paired with a CSS transition, visibly lags a beat behind the real
  // scrollbar; reading scrollTop once a frame keeps the bar glued to it.
  useEffect(() => {
    let rafId;
    const tick = () => {
      const el = progressFillRef.current;
      if (el) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? Math.min(100, Math.max(0, (h.scrollTop / max) * 100)) : 0;
        el.style.width = `${pct}%`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Reveal-on-scroll: each section fades/rises in once, the first time it
  // enters the viewport. The "pre-reveal" (hidden) class is added here, in
  // JS, right before the observer that clears it — never in plain CSS —
  // so a section a browser never gets to observe (JS error, no
  // IntersectionObserver support) simply stays in its normal, visible
  // state instead of being stuck invisible. Skipped entirely under
  // prefers-reduced-motion, same as SponsorBanner's marquee.
  //
  // Only sections that start below the fold get pre-hidden — whatever's
  // already on screen at load (the title, the opening paragraph on a short
  // page) renders at rest immediately instead of visibly fading in a beat
  // after paint, which read as the page flashing half-invisible rather
  // than a deliberate reveal.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const els = Object.values(sectionRefs.current).filter(Boolean);
    const belowFold = els.filter((el) => el.getBoundingClientRect().top >= window.innerHeight);
    belowFold.forEach((el) => el.classList.add(styles.preReveal));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    belowFold.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (index) => {
    const title = sections[index].title;
    setSelected(title);
    scrollLockRef.current = title;
    clearTimeout(scrollLockTimeoutRef.current);
    scrollLockTimeoutRef.current = setTimeout(() => {
      scrollLockRef.current = null;
    }, 1000);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const clearScrollLock = () => {
      scrollLockRef.current = null;
      clearTimeout(scrollLockTimeoutRef.current);
    };
    window.addEventListener("scrollend", clearScrollLock);
    return () => window.removeEventListener("scrollend", clearScrollLock);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSelected(entry.target.dataset.title);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className={styles.layout}>
        <div className={styles.progressRail} aria-hidden="true">
          <div className={styles.progressRailFill} ref={progressFillRef} />
        </div>
        <Panel
            items={sections.map((s) => s.title)}
            selected={selected}
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            onSelect={scrollTo}
            header={panelHeader || (title && <div className={styles.panelTitle}>{title}</div>)}
        />
        <Article
            title={title}
            intro={intro}
            sections={sections}
            sectionRefs={sectionRefs}
        />
    </div>
  );
}