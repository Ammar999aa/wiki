import { useState } from "react";
import Panel from "./Panel/Panel";
import Content from "./Content/Content";
import styles from "./SectionedPage.module.scss";

export default function SectionedPage({ sections, defaultSelected }) {
  const [collapsed, setCollapsed] = useState(true);
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
      <Content
        section={activeSection}
        panelCollapsed={collapsed}
      />
    </div>
  );
}