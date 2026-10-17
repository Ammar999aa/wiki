import { useEffect, useMemo, useRef, useState } from "react";
import ActivityIcon from "./ActivityIcons";
import styles from "./EngagementTabs.module.scss";

// "Engaging with society": three clickable cards on top, one shared content
// area underneath; clicking another card replaces what's shown below.
//
// The content stays in human-integrated-practices.md, one
// <div class="engage-panel" data-tab data-title data-sub> per activity, after
// the section's `data-slot="engagement"` marker. This component gets that
// HTML (see fillSlots in HumanIntegratedPractices.jsx) and splits it into
// tabs, so the panels keep every markdown class (.gallery, .card-grid, …)
// and Article.jsx's delegated handlers (lightbox, …) still work in them.

function parsePanels(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return [...doc.querySelectorAll(".engage-panel")].map((el) => ({
    id: el.dataset.tab,
    title: el.dataset.title,
    sub: el.dataset.sub,
    html: el.innerHTML,
  }));
}

// A photo that isn't on static.igem.wiki yet would show as a broken image:
// hide it, and hide its gallery/figure once nothing in it is left to show.
// Inline display (not the `hidden` attribute), since .gallery/.figure-grid set
// their own display and would override it.
function hideMissingImages(root) {
  const gone = (el) => el.style.display === "none";
  const hide = (img) => {
    img.style.display = "none";
    const figure = img.closest("figure");
    if (figure) figure.style.display = "none";
    const box = img.closest(".gallery, .figure-grid");
    if (box && [...box.querySelectorAll("img")].every(gone)) box.style.display = "none";
  };
  // The panel's images are lazy, so they'd only fail (and show an empty frame
  // first) once scrolled near. Probing each URL up front hides them right away.
  root.querySelectorAll("img").forEach((img) => {
    const probe = new Image();
    probe.onerror = () => hide(img);
    probe.src = img.currentSrc || img.src;
  });
}

export default function EngagementTabs({ html }) {
  const panels = useMemo(() => parsePanels(html), [html]);
  const [active, setActive] = useState(panels[0]?.id);
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const tabRefs = useRef({});

  useEffect(() => {
    if (bodyRef.current) hideMissingImages(bodyRef.current);
  }, [active]);

  // The "Who shaped SHIHAB" map's activity readouts ask for a tab by id.
  useEffect(() => {
    const open = (e) => {
      if (!panels.some((p) => p.id === e.detail)) return;
      setActive(e.detail);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("hip:open-engagement", open);
    return () => window.removeEventListener("hip:open-engagement", open);
  }, [panels]);

  // Arrow keys move between tabs, as in a native tab list.
  const onKeyDown = (e) => {
    const i = panels.findIndex((p) => p.id === active);
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = panels[(i + step + panels.length) % panels.length].id;
    select(next);
    tabRefs.current[next]?.focus();
  };

  // Switching tabs from deep inside a long panel would leave the reader in
  // the middle of the new one; bring its start back into view instead (only
  // when the panel's top has scrolled up under the pinned tabs).
  const select = (id) => {
    setActive(id);
    const body = bodyRef.current?.parentElement;
    const tabs = body?.previousElementSibling;
    if (body && tabs && body.getBoundingClientRect().top < tabs.getBoundingClientRect().bottom) {
      requestAnimationFrame(() => body.scrollIntoView({ block: "start" }));
    }
  };

  const index = panels.findIndex((p) => p.id === active);
  const panel = panels[index];
  if (!panel) return null;

  return (
    <div className={styles.engage} ref={rootRef}>
      <div className={styles.tabs} role="tablist" aria-label="Engagement activities" onKeyDown={onKeyDown}>
        {panels.map((p) => {
          const selected = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`engage-tab-${p.id}`}
              aria-selected={selected}
              aria-controls="engage-panel"
              tabIndex={selected ? 0 : -1}
              ref={(el) => (tabRefs.current[p.id] = el)}
              className={styles.tab}
              onClick={() => select(p.id)}
            >
              <ActivityIcon name={p.id} className={styles.tabIcon} />
              <span className={styles.tabTitle}>{p.title}</span>
              <span className={styles.tabSub}>{p.sub}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.body} role="tabpanel" id="engage-panel" aria-labelledby={`engage-tab-${panel.id}`}>
        <p className={styles.count}>
          {String(index + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
        </p>
        <div key={panel.id} ref={bodyRef} className={styles.panel} dangerouslySetInnerHTML={{ __html: panel.html }} />
      </div>
    </div>
  );
}
