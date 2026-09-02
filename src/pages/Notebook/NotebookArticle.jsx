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

  const active = sections[selectedIndex];
  const { html: contentHtml, subheadings } = useMemo(
    () => (active.html ? addHeadingIds(active.html) : { html: "", subheadings: [] }),
    [active]
  );

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
    if (!subheadings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={articleStyles.layout}>
      <div className={`${articleStyles.panelContainer} ${collapsed ? articleStyles.collapsed : ""}`}>
        <LiquidGlass radius={0} color={[52, 52, 52]} opacity={0.25}>
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

      <div
        className={`${articleStyles.article} ${collapsed ? articleStyles.articleShifted : ""}`}
        ref={articleRef}
      >
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
                  <LiquidGlass radius={24} color={[0, 0, 0]} opacity={0.25}>
                    <div className={styles.switcherList}>
                      {sections.map((s, i) => (
                        <button
                          key={s.title}
                          type="button"
                          className={`${styles.switcherItem} ${i === selectedIndex ? styles.switcherItemActive : ""}`}
                          onClick={() => {
                            setSelectedIndex(i);
                            setSwitcherOpen(false);
                          }}
                        >
                          {s.title}
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
