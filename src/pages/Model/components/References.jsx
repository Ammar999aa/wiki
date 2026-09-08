import { Fragment } from "react";
import styles from "../Model.module.scss";
import { REFERENCES } from "../data";

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

// Inline citation link, e.g. Cref(6) → "[6]" pointing at #ref6.
export function Cref({ n }) {
  return (
    <a className={styles.cref} href={`#ref${n}`}>
      {n}
    </a>
  );
}
