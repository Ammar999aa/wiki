import StructureCanvas from "../../components/StructureCanvas/StructureCanvas";
import styles from "./ProteinLibrary.module.scss";

// Renders `protein.structure` (see proteins.js) as an interactive, rotatable
// 3D model — a real published structure, hosted on iGEM's asset server.
// Nothing renders at all when a protein has no `structure` entry, so most
// cards are unaffected — see proteins.js for which ones do and why. The
// model itself (3Dmol, dynamically imported) lives in the shared
// StructureCanvas, which the markdown-article viewer uses too.
export default function StructureViewer({ structure, color }) {
  if (!structure) return null;

  // Floated right rather than its own full-width section — Function/
  // Applications/Why below wrap around it in the freed-up space instead of
  // each getting pushed underneath a tall stacked block.
  return (
    <div className={styles.structureFloat}>
      <p className={styles.detailLabel}>Structure</p>
      <div className={styles.structureViewer}>
        <StructureCanvas file={structure.file} color={color} pdbId={structure.pdbId} />
      </div>
      {/* Unambiguous on purpose — this is published third-party data, cited
          for reference, never this team's own experimental or computational
          result. See .claude/RESPONSIBLE_AI_USE.md and the iGEM wiki rules
          on data figures. */}
      <p className={styles.structureCaption}>
        Published reference structure, not data from this team — {structure.label},{" "}
        <a
          href={`https://www.rcsb.org/structure/${structure.pdbId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          PDB {structure.pdbId}
        </a>
        , CC0.
      </p>
    </div>
  );
}
