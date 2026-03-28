import { useState } from "react";
import Panel from "./Panel/Panel";
import Content from "./Content/Content";
import styles from "./SectionedPage.module.scss";

export default function SectionedPage({ sections, defaultSelected }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState(defaultSelected || sections[0]?.title);

  const activeSection = sections.find((s) => s.title === selected) || sections[0];

  return (
    <div className={styles.layout}>
      <Panel
        items={sections.map((s) => s.title)}
        selected={selected}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onSelect={(index) => setSelected(sections[index].title)}
      />
      <Content
        section={activeSection}
        panelCollapsed={collapsed}
      />
    </div>
  );
}