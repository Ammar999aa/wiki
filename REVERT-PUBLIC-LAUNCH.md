# Reverting the Public Launch Restrictions

This file documents the changes made to limit the public-facing site to only the **Home** and **Roster** pages while content was still being prepared. Follow the steps below to restore the full site.

---

## What was changed

### 1. `src/App.jsx`
- Removed the `Menu` import and `<Menu>` component from the render.
- Removed imports for all pages except `Home` and `Roster`.
- Removed all routes except `/` and `/Roster`.

### 2. `src/pages/Home/Home.jsx`
- Replaced the three-card `NavigationCards` section (Project Description, Team Roster, Attributions) with a single "Team Roster" card.

### 3. `src/App.jsx` — language selector removed
- Removed the `LanguageSelector` import and `<LanguageSelector />` from the render.

### 4. `src/pages/Roster/Roster.jsx` + `Roster.module.scss` — back link added
- Added a fixed "← A.S.T.R.A" link at the bottom center of the Roster page linking back to `/`.
- Added the `.backLink` style to `Roster.module.scss`.

---

## How to revert

### Step 1 — Restore `src/App.jsx`

Replace the file contents with:

```jsx
import { Routes, Route } from "react-router-dom";
import LiquidGlassFilter from "./components/LiquidGlassFilter/LiquidGlassFilter";
import Menu from "./components/Menu/Menu";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import styles from "./App.module.scss";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";
import Roster from "./pages/Roster/Roster";
import Attributions from "./pages/Attributions/Attributions";
import WetLab from "./pages/WetLab/WetLab";
import DryLab from "./pages/DryLab/DryLab";
import HumanPractices from "./pages/HumanPractices/HumanPractices";
import Safety from "./pages/Safety/Safety";
import Engagement from "./pages/Engagement/Engagement";

export default function App() {
  return (
    <div className={styles.page}>
      <LiquidGlassFilter />
      <div className={styles.content}>
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/Roster" element={<Roster />} />
          <Route path="/Attributions" element={<Attributions />} />
          <Route path="/wetlab" element={<WetLab />} />
          <Route path="/drylab" element={<DryLab />} />
          <Route path="/human-practices" element={<HumanPractices />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/engagement" element={<Engagement />} />
        </Routes>
        <Menu></Menu>
      </div>
    </div>
  );
}
```

### Step 2 — Restore the navigation cards in `src/pages/Home/Home.jsx`

Find the `NavigationCards` function and replace it with:

```jsx
const NAV_CARDS = [
  { emoji: "🔬", title: "Project Description", subtitle: "The science behind A.S.T.R.A.", to: "/project" },
  { emoji: "👥", title: "Team Roster",         subtitle: "Meet the people behind the mission.", to: "/Roster" },
  { emoji: "📋", title: "Attributions",        subtitle: "Contributions and acknowledgements.", to: "/Attributions" },
];

function NavigationCards() {
  return (
    <div className={styles.navSection}>
      <p className={styles.navHeading}>Explore the wiki</p>
      <div className={styles.navCards}>
        {NAV_CARDS.map(({ emoji, title, subtitle, to }) => (
          <Link key={to} to={to} className={styles.navCardLink}>
            <LiquidGlass radius={24} color={[0, 0, 0]} opacity={0.07}>
              <div className={styles.navCard}>
                <span className={styles.navEmoji}>{emoji}</span>
                <strong className={styles.navTitle}>{title}</strong>
                <p className={styles.navSubtitle}>{subtitle}</p>
              </div>
            </LiquidGlass>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### Step 3 — Restore the language selector in `src/App.jsx`

Add the import near the top:
```jsx
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
```

And add `<LanguageSelector />` back inside the render, just before `<Routes>`:
```jsx
<LanguageSelector />
<Routes>
```

### Step 4 — Remove the back link from the Roster

In `src/pages/Roster/Roster.jsx`, remove:
```jsx
<Link to="/" className={styles.backLink}>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  A.S.T.R.A
</Link>
```

In `src/pages/Roster/Roster.module.scss`, remove the `.backLink` rule block.

---

## Notes

- All page components (`WetLab`, `DryLab`, `HumanPractices`, `Safety`, `Engagement`, `Project`, `Attributions`) and their markdown content files were **not deleted** — they are still present in the codebase and will work immediately once the routes are restored.
- The `Menu` and `LanguageSelector` components were not deleted and will work immediately once re-added to `App.jsx`.
