import { useState } from "react";
import Panel from "./Panel/Panel";
import Content from "./Content/Content";
import styles from "./SectionedPage.module.scss";

// The member list panel is always open on desktop — it's the page's primary
// navigation (unlike SectionedArticle's jump-nav, hiding it by default would
// hide the whole point of the page), and a desktop viewport has room to
// spare for it. The collapse-to-edge-tab arrow only renders below the
// 1024px breakpoint (see SectionedPage.module.scss), where an always-open
// ~280px panel would swallow the screen; `collapsed` starts true there so
// it opens as an overlay on demand. Read once on mount — the user's own
// toggle afterward takes over.
function getDefaultCollapsed() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
}

// `footer` (optional) renders under the content card, e.g. a background
// photo credit — the full-height panel covers the usual bottom-right
// corner spot on this layout.
export default function SectionedPage({ sections, defaultSelected, footer }) {
  const [collapsed, setCollapsed] = useState(getDefaultCollapsed);
  const firstSelectable = sections.find((s) => !s.heading);
  const [selected, setSelected] = useState(defaultSelected || firstSelectable?.title);

  const activeSection = sections.find((s) => !s.heading && s.title === selected) || firstSelectable;

  return (
    <div className={styles.layout}>
      <Panel
        items={sections}
        selected={selected}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onSelect={(title) => setSelected(title)}
      />
      {/* Keyed so the card remounts per member — its inner scroll (see
          SectionedPage.module.scss) starts at the top, not where the last
          member's profile was left. */}
      <Content key={activeSection?.title} section={activeSection} footer={footer} />
    </div>
  );
}