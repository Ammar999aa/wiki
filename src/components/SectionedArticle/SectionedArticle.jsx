import { useState, useRef, useEffect } from "react";
import Panel from "./Panel/Panel";
import Article from "./Article/Article";
import { TooltipProvider } from "../Tooltip/Tooltip";
import styles from "./SectionedArticle.module.scss";

// `numbered`: show a section number ("01", "02", …) beside each heading and
// jump-nav entry. Worth it only on a page long enough that a reader loses
// their place, and where other parts of the page refer back to a section by
// number (see Model/`/software`, whose SecRef marks read "§05"). On a short
// page the numbers are noise, so this stays opt-in.
//
// The numbers come from each section's position, never from a hand-written
// field: a manual number silently goes stale the moment a section is moved
// or inserted, which is also why the authoring conventions ban writing one
// into the heading text itself.
export default function SectionedArticle({ sections, defaultSelected, title, panelHeader, panelLinks, panelLinkTints, intro, numbered, accentBold }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState(defaultSelected || sections[0]?.title);
  // Index-aligned with `sections`; undefined entries render nothing, so an
  // unnumbered page costs nothing here.
  const nums = numbered ? sections.map((_, i) => String(i + 1).padStart(2, "0")) : undefined;
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
  //
  // Written as a scaleX transform, and only when the value actually changes:
  // setting `width` every frame forced a layout pass 60 times a second even
  // while the page sat still, and a transform is composited without one.
  useEffect(() => {
    let rafId;
    let lastScale = -1;
    const tick = () => {
      const el = progressFillRef.current;
      if (el) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const scale = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
        if (scale !== lastScale) {
          el.style.transform = `scaleX(${scale})`;
          lastScale = scale;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Opening a page at a #hash (a link from another page, e.g. Science
  // Communication → /education#tawasol-hackathon): the browser's own jump
  // runs before this lazily-loaded article exists, and App resets scroll to
  // the top on every route, so do the jump here. Photos above the target
  // keep loading and pushing it down, so it's re-aligned on resizes for a
  // few seconds — until the reader scrolls themselves. Runs before the
  // reveal effect below, so sections already on screen after the jump are
  // never pre-hidden.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return undefined;

    const align = () => target.scrollIntoView({ block: "start" });
    align();
    const observer = new ResizeObserver(align);
    observer.observe(document.body);
    const stop = () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const timer = setTimeout(stop, 4000);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return stop;
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

  // Superheadings (see plugins/markdown-sections.js): sections may carry a
  // `group`. The active group is the one the selected section belongs to, so
  // it is none (all collapsed) while an ungrouped section (intro, references)
  // is being read.
  const activeGroup = sections.find((s) => s.title === selected)?.group;

  // What the panel lists, in page order: every ungrouped section, a row for
  // each superheading (always shown), and the sections under a superheading
  // only while that group is the active one. The article itself always shows
  // everything; only the panel collapses.
  const entries = [];
  sections.forEach((s, i) => {
    if (s.superheading) entries.push({ group: s.group, id: s.superheading.id });
    if (!s.group || s.group === activeGroup) entries.push({ index: i });
  });

  const scrollToGroup = (entry) => {
    const first = sections.findIndex((s) => s.group === entry.group);
    setSelected(sections[first].title);
    scrollLockRef.current = sections[first].title;
    clearTimeout(scrollLockTimeoutRef.current);
    scrollLockTimeoutRef.current = setTimeout(() => {
      scrollLockRef.current = null;
    }, 1000);
    document.getElementById(entry.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.layout}>
        <div className={styles.progressRail} aria-hidden="true">
          <div className={styles.progressRailFill} ref={progressFillRef} />
        </div>
        <Panel
            items={entries.map((e) => (e.group ? e.group : sections[e.index].title))}
            nums={nums && entries.map((e) => (e.group ? undefined : nums[e.index]))}
            groups={entries.map((e) => !!e.group)}
            activeGroup={activeGroup}
            links={panelLinks}
            linkTints={panelLinkTints}
            selected={selected}
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            onSelect={(j) => (entries[j].group ? scrollToGroup(entries[j]) : scrollTo(entries[j].index))}
            header={panelHeader || (title && <div className={styles.panelTitle}>{title}</div>)}
        />
        {/* Wraps Article only, not Panel — the jump-nav panel never shows a
            tooltip, and this is also what makes useTooltip() available to
            any section's own rich `content` JSX (e.g. Model's charts),
            not just markdown-rendered citation marks. */}
        <TooltipProvider>
          <Article
              title={title}
              intro={intro}
              sections={sections}
              nums={nums}
              sectionRefs={sectionRefs}
              accentBold={accentBold}
          />
        </TooltipProvider>
    </div>
  );
}