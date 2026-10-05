import { Fragment } from "react";
import styles from "../Model.module.scss";
import { REFERENCES } from "../data";
import { useTooltip } from "../../../components/Tooltip/Tooltip";

export default function References() {
  return (
    <ol className={styles.refs}>
      {REFERENCES.map((r, i) => (
        <Fragment key={i}>
          {r.g && <li className={styles.refgroup}>{r.g}</li>}
          <li className={styles.ref} id={`ref${i + 1}`}>
            <span className={styles.rn}>[{i + 1}]</span>
            <span>
              <span className={styles.ra}>{r.a}</span>{" "}
              <span className={styles.rt}>{r.t}.</span>{" "}
              <span className={styles.rj}>
                {r.j} ({r.y}).
              </span>{" "}
              <a className={styles.rd} href={`https://doi.org/${r.d}`} target="_blank" rel="noopener noreferrer">
                doi:{r.d}
              </a>
            </span>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

// Inline citation link, e.g. Cref(6) → "[6]" pointing at #ref6. Hovering
// (or focusing, for keyboard users) shows the full reference in a floating
// tag via the shared tooltip — reading REFERENCES directly rather than the
// rendered #ref{n} DOM node, since the full author/title/journal fields are
// already structured data here (SectionedArticle's plain-markdown citation
// mark, `.cite`, instead reads its target node's rendered HTML — see
// Article.jsx — because markdown references don't have that structure).
export function Cref({ n }) {
  const { show, hide } = useTooltip();
  const r = REFERENCES[n - 1];

  // A FocusEvent (keyboard Tab) has no clientX/clientY the way a
  // MouseEvent does, so it anchors the tooltip to the link's own
  // bounding box instead of a cursor position.
  const onMove = (e) => {
    if (!r) return;
    const node = (
      <>
        <span className={styles.tt}>{r.a}</span>
        <div>{r.t}</div>
        <div>
          {r.j} ({r.y})
        </div>
      </>
    );
    if (typeof e.clientX === "number") {
      show(e, node);
    } else {
      const rect = e.target.getBoundingClientRect();
      show({ clientX: rect.left, clientY: rect.bottom + 6 }, node);
    }
  };

  // Scrolls itself instead of depending on the browser's native
  // `href="#refN"` navigation — see Article.jsx's `.cite` click handler for
  // why: that native jump was confirmed unreliable on an already-mounted
  // long article page, while scrollIntoView() here always lands correctly.
  const onClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(`ref${n}`);
    if (!target) return;
    hide();
    history.pushState(null, "", `#ref${n}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a
      className={styles.cref}
      href={`#ref${n}`}
      onMouseMove={onMove}
      onMouseLeave={hide}
      onFocus={onMove}
      onBlur={hide}
      onClick={onClick}
    >
      {n}
    </a>
  );
}
