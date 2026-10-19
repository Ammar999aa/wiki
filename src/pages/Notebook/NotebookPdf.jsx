import { useState, useEffect } from "react";
import styles from "./Notebook.module.scss";

// The full lab notebook PDF is ~21 MB, over iGEM's per-file upload cap, so
// it's uploaded as three page-range parts (each a valid PDF on its own,
// each under 10 MB) and merged back into one document in the browser.
// static.igem.wiki sends `access-control-allow-origin: *`, which is what
// lets fetch() read them.
const BASE = "https://static.igem.wiki/teams/6341/wiki/notebook/notebook";
const PARTS = [1, 2, 3].map((n) => `${BASE}/lab-notebook-part-0${n}.pdf`);

export default function NotebookPdf() {
  const [state, setState] = useState({ status: "loading", done: 0 });

  useEffect(() => {
    let cancelled = false;
    let objectUrl;

    (async () => {
      try {
        const { PDFDocument } = await import("pdf-lib");
        let done = 0;
        const buffers = await Promise.all(
          PARTS.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
            const buf = await res.arrayBuffer();
            if (!cancelled) setState({ status: "loading", done: ++done });
            return buf;
          }),
        );
        const merged = await PDFDocument.create();
        // Shown in the browser viewer's toolbar instead of the blob URL's UUID.
        merged.setTitle("iGEM Lab Notebook", { showInWindowTitleBar: true });
        for (const buf of buffers) {
          const part = await PDFDocument.load(buf);
          const pages = await merged.copyPages(part, part.getPageIndices());
          pages.forEach((p) => merged.addPage(p));
        }
        const blob = new Blob([await merged.save()], { type: "application/pdf" });
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) setState({ status: "ready", url: objectUrl });
      } catch (err) {
        console.error(err);
        if (!cancelled) setState({ status: "error" });
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  if (state.status === "ready") {
    return (
      <div>
        <iframe className={styles.pdfFrame} src={state.url} title="iGEM Lab Notebook (PDF)" />
        <div className={styles.pdfActions}>
          <a href={state.url} target="_blank" rel="noopener noreferrer">
            Open in a new tab →
          </a>
          <a href={state.url} download="KAUST-iGEM-Lab-Notebook.pdf">
            Download PDF
          </a>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <p className={styles.pdfError}>
        Couldn't load the notebook. It's also available in three parts:{" "}
        {PARTS.map((url, i) => (
          <span key={url}>
            {i > 0 && ", "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              part {i + 1}
            </a>
          </span>
        ))}
        .
      </p>
    );
  }

  return (
    <p className={styles.pdfStatus} role="status">
      Loading notebook… {state.done}/{PARTS.length}
    </p>
  );
}
