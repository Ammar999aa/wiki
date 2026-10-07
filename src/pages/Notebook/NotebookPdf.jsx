import { useState, useEffect } from "react";
import styles from "./Notebook.module.scss";

// The full lab notebook PDF is ~13.6 MB, over iGEM's 3 MB per-file upload
// cap, so it's uploaded as page-range parts (each a valid PDF on its own)
// and merged back into one document in the browser. static.igem.wiki sends
// `access-control-allow-origin: *`, which is what lets fetch() read them.
const BASE = "https://static.igem.wiki/teams/6341/wiki/notebook/notebook";
const PARTS = [1, 2, 3, 4, 5].map((n) => `${BASE}/lab-notebook-part-0${n}.pdf`);

// Loaded on click, not on page load: nobody pays the download (or pdf-lib's
// bundle) unless they actually ask for the PDF.
export default function NotebookPdf() {
  const [state, setState] = useState({ status: "idle" });

  useEffect(() => () => state.url && URL.revokeObjectURL(state.url), [state.url]);

  async function load() {
    setState({ status: "loading", done: 0 });
    try {
      const { PDFDocument } = await import("pdf-lib");
      let done = 0;
      const buffers = await Promise.all(
        PARTS.map(async (url) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
          const buf = await res.arrayBuffer();
          setState({ status: "loading", done: ++done });
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
      setState({ status: "ready", url: URL.createObjectURL(blob) });
    } catch (err) {
      console.error(err);
      setState({ status: "error" });
    }
  }

  if (state.status === "ready") {
    return (
      <div className={styles.pdf}>
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

  return (
    <div className={styles.pdf}>
      <button type="button" className={styles.pdfButton} onClick={load} disabled={state.status === "loading"}>
        {state.status === "loading"
          ? `Loading notebook… ${state.done}/${PARTS.length}`
          : "View the full lab notebook (PDF, 13.6 MB)"}
      </button>
      {state.status === "error" && (
        <p className={styles.pdfError}>
          Couldn't load the PDF. The parts are also available individually:{" "}
          {PARTS.map((url, i) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              {i + 1}
            </a>
          )).reduce((acc, el) => (acc.length ? [...acc, ", ", el] : [el]), [])}
        </p>
      )}
    </div>
  );
}
