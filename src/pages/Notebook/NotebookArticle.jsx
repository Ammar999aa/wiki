import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
// Reused wholesale for panel chrome + article width/typography (headings,
// tables, .notebook-img-row, etc.) so this page matches Wet Lab/Dry Lab's
// look without duplicating that CSS — see SectionedArticle.module.scss.
import articleStyles from "../../components/SectionedArticle/SectionedArticle.module.scss";
import styles from "./Notebook.module.scss";

function slugify(text, index) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "section"}-${index}`;
}

const HTML_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
// marked() escapes raw text to valid HTML (e.g. "&" -> "&amp;"); the panel
// renders h.text as a plain React string, not HTML, so entities need
// decoding back or they'd show up literally ("Interpretation &amp; ...").
function decodeEntities(text) {
  return text.replace(/&(#?\w+);/g, (match, code) => HTML_ENTITIES[code] ?? match);
}

// Pulls the "**Date:**"/"**Dates:**" field straight out of a section's own
// logged content — never a re-derived or invented date, per
// .claude/RESPONSIBLE_AI_USE.md — and shows it verbatim (dd.mm, a range,
// "_(not recorded)_", whatever the entry actually says), rather than
// reparsing it into a normalized format the messy real formats in
// notebook.md (dd.mm, "07/06/2026", multi-organism date lists, "not
// recorded") can't be trusted to round-trip through correctly. Matches up
// to the *next* field label (or the paragraph's end) rather than the next
// "<" so it survives inline markup inside the date itself, e.g. the
// "_(not recorded)_" entries, which render as "<em>...</em>".
function extractDate(html) {
  if (!html) return null;
  const m = html.match(/<strong>Dates?:<\/strong>([\s\S]*?)(?:<strong>|<\/p>)/i);
  if (!m) return null;
  const text = decodeEntities(m[1].replace(/<[^>]+>/g, "")).trim();
  return text || null;
}

// Bakes id="..." attributes into the h3/h4/h5 tags of a section's raw HTML
// string, and returns the list of {id, text, level} alongside it. Ids must
// live in the HTML string itself, not be assigned by mutating the rendered
// DOM after the fact (el.id = ...) — dangerouslySetInnerHTML content can be
// re-painted by React independently of that mutation, silently dropping it,
// which is why panel clicks previously had no id to scroll to.
function addHeadingIds(html) {
  let i = 0;
  const subheadings = [];
  const withIds = html.replace(/<(h[345])>(.*?)<\/\1>/gs, (match, tag, inner) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, ""));
    const id = slugify(text, i++);
    subheadings.push({ id, text, level: Number(tag[1]) });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html: withIds, subheadings };
}

// One pill per experiment switches which section is shown (click-to-switch,
// not scroll); the side panel lists that section's own subheadings (h3/h4/h5)
// instead of the top-level experiment list, since the pills now cover that.
export default function NotebookArticle({ sections, title }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSub, setSelectedSub] = useState(null);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const articleRef = useRef(null);
  const switcherRef = useRef(null);
  // See SectionedArticle.jsx — suppresses the scroll-position observer
  // below while a panel click's smooth scroll is still animating, so the
  // selection doesn't flicker through every subheading it passes on the
  // way to the clicked one.
  const scrollLockRef = useRef(null);
  const scrollLockTimeoutRef = useRef(null);

  const active = sections[selectedIndex];
  const { html: contentHtml, subheadings } = useMemo(
    () => (active.html ? addHeadingIds(active.html) : { html: "", subheadings: [] }),
    [active]
  );
  // One date per section, in the same (already roughly chronological, as
  // logged) order sections.md lists them — read once here rather than
  // per-render inside the switcher below.
  const sectionDates = useMemo(() => sections.map((s) => extractDate(s.html)), [sections]);

  useEffect(() => {
    if (!switcherOpen) return;
    const onClickOutside = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) {
        setSwitcherOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [switcherOpen]);

  useEffect(() => {
    setSelectedSub(subheadings[0]?.id ?? null);
    articleRef.current?.scrollIntoView({ block: "start" });
  }, [selectedIndex, subheadings]);

  useEffect(() => {
    const clearScrollLock = () => {
      scrollLockRef.current = null;
      clearTimeout(scrollLockTimeoutRef.current);
    };
    window.addEventListener("scrollend", clearScrollLock);
    return () => window.removeEventListener("scrollend", clearScrollLock);
  }, []);

  useEffect(() => {
    if (!subheadings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setSelectedSub(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    subheadings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [subheadings]);

  const selectSub = useCallback((id) => {
    setSelectedSub(id);
    scrollLockRef.current = id;
    clearTimeout(scrollLockTimeoutRef.current);
    scrollLockTimeoutRef.current = setTimeout(() => {
      scrollLockRef.current = null;
    }, 1000);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={articleStyles.layout}>
      <div className={`${articleStyles.panelContainer} ${collapsed ? articleStyles.collapsed : ""}`}>
        {/* See Panel.jsx — glowMask fades cornerGlow's idle ring to the
            panel's upper third instead of hiding it outright; hovering
            swaps in the usual cursor-follow radial. */}
        <LiquidGlass
          radius={32}
          color={[0, 0, 0]}
          opacity={0.08}
          grain
          drift
          glowMask="linear-gradient(to bottom, white, transparent 60%)"
        >
          <div className={articleStyles.panelContents}>
            <button
              type="button"
              className={`${articleStyles.arrow} ${collapsed ? articleStyles.flipped : ""}`}
              aria-expanded={!collapsed}
              onClick={() => setCollapsed((v) => !v)}
            >
              <svg width="46" height="46" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.75 46.5V19L29 32.75L42.75 46.5Z" fill="#E3E3E3" />
              </svg>
            </button>
            <div className={articleStyles.panelHeader}>{active?.title}</div>
            {subheadings.length === 0 && (
              <p className={styles.panelEmpty}>No subsections in this entry.</p>
            )}
            {subheadings.map((h) => (
              <div
                key={h.id}
                className={`${styles.subItem} ${styles[`level${h.level}`] || ""} ${
                  h.id === selectedSub ? articleStyles.selected : ""
                }`}
                onClick={() => selectSub(h.id)}
              >
                {h.text}
              </div>
            ))}
          </div>
        </LiquidGlass>
      </div>

      <div className={articleStyles.article} ref={articleRef}>
        {title && <h1 className={articleStyles.pageTitle}>{title}</h1>}

        <div>
          <div className={styles.pillsBanner}>
            <div className={styles.switcher} ref={switcherRef}>
              <LiquidGlass radius={24} color={[0, 0, 0]} opacity={0.07}>
                <button
                  type="button"
                  className={styles.switcherTrigger}
                  aria-expanded={switcherOpen}
                  onClick={() => setSwitcherOpen((v) => !v)}
                >
                  <span className={styles.switcherLabel}>Browse experiments</span>
                  <span className={styles.switcherDivider} aria-hidden="true" />
                  <span className={styles.switcherValue}>{active.title}</span>
                  <svg
                    className={`${styles.switcherChevron} ${switcherOpen ? styles.switcherChevronOpen : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </LiquidGlass>

              {switcherOpen && (
                <div className={styles.switcherMenu}>
                  <LiquidGlass radius={24} color={[0, 0, 0]} opacity={0.25} grain>
                    {/* One dated entry per experiment, git-log style, in the
                        order the notebook itself logs them — reads faster
                        for "what happened when" than a flat name list did. */}
                    <div className={styles.timelineList}>
                      {sections.map((s, i) => (
                        <button
                          key={s.title}
                          type="button"
                          className={`${styles.timelineItem} ${i === selectedIndex ? styles.switcherItemActive : ""}`}
                          onClick={() => {
                            setSelectedIndex(i);
                            setSwitcherOpen(false);
                          }}
                        >
                          <span className={styles.timelineDate}>{sectionDates[i] || "date not logged"}</span>
                          <span className={styles.timelineTitle}>{s.title}</span>
                        </button>
                      ))}
                    </div>
                  </LiquidGlass>
                </div>
              )}
            </div>
          </div>

          <h2>{active.title}</h2>
          {contentHtml && <div dangerouslySetInnerHTML={{ __html: contentHtml }} />}
        </div>
      </div>
    </div>
  );
}
