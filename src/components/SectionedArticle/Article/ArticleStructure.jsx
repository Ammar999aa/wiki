import StructureCanvas from "../../StructureCanvas/StructureCanvas";
import { structureFile } from "../../StructureCanvas/structures";
import styles from "../SectionedArticle.module.scss";

// The markdown-tier figure for a published 3D structure: what a plain
// `.md` page gets by writing an empty placeholder div (Article.jsx portals
// this into it), instead of embedding a rendered animation of the same
// model.
//
//   <div class="structure-3d"
//        data-structure="ffibp-4nu2"
//        data-pdb="4NU2"
//        data-label="FfIBP (Flavobacterium frigoris PS1)"></div>
//
// `data-structure` names a file on iGEM's asset server (see structures.js);
// `data-color` is optional and passed straight to 3Dmol ("spectrum" by
// default). In a complex, `data-highlight="K,L"` picks out the chains the
// section is actually about (`data-highlight-color` to override the amber).
export default function ArticleStructure({ structure, pdb, label, color, highlight, highlightColor }) {
  return (
    <figure className={styles.structureFigure}>
      <div className={styles.structureBox}>
        <StructureCanvas
          file={structureFile(structure)}
          color={color}
          pdbId={pdb}
          highlight={highlight}
          highlightColor={highlightColor}
        />
      </div>
      {/* Unambiguous on purpose, exactly as on the protein library page:
          this is published third-party data shown for reference, never this
          team's own experimental or computational result. See
          .claude/RESPONSIBLE_AI_USE.md and the iGEM wiki rules on data
          figures. */}
      <figcaption className={styles.structureNote}>
        Interactive model — drag to rotate. Published reference structure, not data
        from this team{label ? ` — ${label}` : null},{" "}
        <a href={`https://www.rcsb.org/structure/${pdb}`} target="_blank" rel="noopener noreferrer">
          PDB {pdb}
        </a>
        , CC0.
      </figcaption>
    </figure>
  );
}
