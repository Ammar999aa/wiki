import { Link, useLocation } from "react-router-dom";
import shihabLogo from "../../assets/shihab-logo.svg?url";
import styles from "./SiteMark.module.scss";

// Small fixed wordmark in the top-left corner, present on every page except
// Home (which already features this same logo prominently in its hero — see
// Home.jsx's `wordmark`). The nav lives at the bottom of the screen
// (Menu.module.scss), so without this the top of every content page has no
// indication of which site you're on. Deliberately plain — no LiquidGlass
// panel — so it reads as a quiet corner mark rather than another chrome
// element competing with the page's own content.
export default function SiteMark() {
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  return (
    <Link to="/" className={styles.mark} aria-label="SHIHAB — Home">
      <img src={shihabLogo} alt="" className={styles.logo} />
    </Link>
  );
}
