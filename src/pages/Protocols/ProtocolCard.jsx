import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import styles from "./Protocols.module.scss";

// One uniform grid tile — always the same size. Clicking swaps the page
// into the full ProtocolArticle reading view (see Protocols.jsx) — the
// grid never renders alongside a selection, so there's no "active" tile
// state to track here.
export default function ProtocolCard({ protocol, excerpt, onSelect }) {
  return (
    <article className={styles.card}>
      <LiquidGlass radius={28} color={[0, 0, 0]} opacity={0.07}>
        <button type="button" className={styles.cardButton} onClick={onSelect}>
          <h3 className={styles.cardName}>{protocol.title}</h3>
          <p className={styles.cardExcerpt}>{excerpt}</p>
        </button>
      </LiquidGlass>
    </article>
  );
}
