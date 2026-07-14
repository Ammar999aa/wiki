# iGEM Wiki Compliance Audit — KAUST-KSA 2026

Audited against `requirements.md`. Every finding below is grounded in specific files and lines.

---

## CRITICAL — Must fix before Wiki Freeze

### 1. Google Fonts loaded from external CDN at runtime

**File:** `index.html`, lines 4–7

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
```

This fires live HTTP requests to `fonts.googleapis.com` and `fonts.gstatic.com` on every page load. These are external domains — not `igem.org`, `igem.wiki`, or `static.igem.wiki`. The requirement states all runtime dependencies must be hosted on iGEM infrastructure. If these domains change or go offline after freeze, the fonts — and therefore the visual design — disappear.

**Affected fonts:** Inter, IBM Plex Sans Arabic, Aref Ruqaa.

**Fix:** Download the font files (`.woff2`), place them in `public/fonts/` or upload to iGEM's CDN, and use `@font-face` declarations in the global SCSS instead of the Google Fonts `<link>` tags.

---

### 2. No `.gitlab-ci.yml` — CI/CD pipeline missing entirely

**File:** Does not exist anywhere in the repository.

The requirement states: *"Your repository must contain a working `.gitlab-ci.yml` that builds the site on every push to main."* Without it, the wiki is not built automatically, meaning the deployed version is either missing or is a manually uploaded artifact — which violates the "built from source, not uploaded as files" requirement.

**Fix:** Create a `.gitlab-ci.yml` that runs `npm ci && npm run build` and publishes the `dist/` output to GitLab Pages.

---

### 3. `LICENSE` file missing from repository root

**File:** Does not exist.

The requirement states the `LICENSE` file must not be modified or deleted, implying it must be present. Team-authored content must be released under CC-BY 4.0, and the license must be documented in the repository root.

**Fix:** Create `LICENSE` at the repo root containing the Creative Commons Attribution 4.0 International license text.

---

### 4. Footer missing CC-BY 4.0 license link

**File:** `src/components/Footer/Footer.jsx`

The footer currently contains only sponsor logos and a "Supported by" label. There is no license statement, no CC-BY 4.0 badge or link, and no legal text of any kind.

**Requirement:** *"The license link must appear in your wiki footer."*

**Fix:** Add a visible CC-BY 4.0 notice and link (e.g., `https://creativecommons.org/licenses/by/4.0/`) to the Footer component.

---

### 5. Footer missing GitLab repository link

**File:** `src/components/Footer/Footer.jsx`

The footer contains no link to the team's source repository.

**Requirement:** *"Your wiki footer must include a visible link to your team's GitLab repository (`gitlab.igem.org/2026/kaust-ksa`)."*

**Fix:** Add a link to `https://gitlab.igem.org/2026/kaust-ksa` in the Footer component.

---

### 6. Twelve required standard URL routes are missing

**File:** `src/App.jsx`

The iGEM rules require specific URL paths so judges can find documentation during the evaluation window. The following required routes are not defined:

| Required path | Status |
|---|---|
| `/contribution` | Missing |
| `/engineering` | Missing |
| `/education` | Missing |
| `/entrepreneurship` | Missing |
| `/hardware` | Missing |
| `/inclusivity` | Missing |
| `/measurement` | Missing |
| `/model` | Missing |
| `/plant` | Missing |
| `/safety-and-security` | Missing — only `/safety` exists |
| `/software` | Missing |
| `/sustainability` | Missing |

Only `/human-practices` from the full required list is present. Note that `/safety` exists but the required path for the Safety and Security Award is `/safety-and-security`.

**Fix:** Add each missing route to `App.jsx` with either a full page component or a redirect. The routes must resolve to real content before freeze.

---

## SERIOUS — Required for eligibility / legal compliance

### 7. `earth.webp` has no attribution or license

**Files:** `src/assets/earth.webp`, used in `src/pages/Home/Home.jsx` and `src/components/Footer/Footer.jsx`

This is a photograph of Earth. Its origin is completely undocumented — there is no comment in source files, no README entry, no attribution on any page. Earth photography is typically produced by NASA (which releases imagery under public domain) or by commercial satellite/stock photography providers (which are copyrighted). Without documentation, it is impossible to verify whether the image is legally usable.

**Fix:** Identify the source. If it is NASA imagery, add a caption/credit and note the public domain status. If it is from any other source, verify the license allows redistribution and add inline attribution per requirement §3.

---

### 8. Sponsor logos used without documented permission

**File:** `src/components/Footer/Footer.jsx`, `src/assets/sponsors/`

The following commercial trademark logos are embedded in the footer:

| File | Organization |
|---|---|
| `bk.png` | Burger King |
| `br.png` | Baskin-Robbins |
| `sg.png` | SnapGene |
| `nti.png` | NTI |
| `bese.png` | BESE |
| `lem.png` | LEM |
| `biomed.png` | BioMed |
| `gs.png` | GS |

**Requirement:** *"Logos of companies… none of these belong on your wiki without a written license."*

There is no documentation of written permission, sponsorship agreement, or license for any of these logos anywhere in the repository.

**Fix:** Obtain and document written permission from each sponsor authorizing use of their logo on the wiki. Store the documentation (email confirmation, signed agreement, etc.) and add a note in the Attributions page. Alternatively, replace logos with text-only sponsor credits.

---

### 9. `public/content-images/` assets have no attribution

**Files:** `public/content-images/hydrogel.png`, `public/content-images/solar-panels.jpg`

These images are served as static assets and presumably appear in page content. Their origin, license, and author are undocumented. The requirement states all third-party assets must credit their source and license inline.

**Fix:** Identify each image's source and license. Add inline captions with attribution, or replace with team-produced or clearly open-licensed alternatives.

---

### 10. No AI usage disclosure section

No page or section exists in the wiki that discloses AI tool usage.

The requirement mandates a dedicated section covering:
- Which models were used (name and version)
- What tasks they were used for
- How the output was reviewed

This applies even for infrastructure/build code and language polish — any AI-assisted work must be disclosed. The section must be accessible at a discoverable URL.

**Fix:** Create an AI usage disclosure section, either as part of the Attributions page or as a dedicated page.

---

## MODERATE — Should fix before freeze

### 11. Attributions page contains only placeholder text

**File:** `src/i18n/en.json` (all member entries)

The Attributions page renders correctly, but every single team member's task descriptions are placeholder text:

```json
"tasks": "Tasks description here.",
"specificTasks": "Specific tasks description here."
```

This applies to all 18 students and both PIs (20 entries total). The page structure exists but has no real content.

**Fix:** Replace all placeholder strings in `en.json` with real descriptions of each member's contributions before freeze.

---

### 12. Route case mismatch — potential 404s

**Files:** `src/App.jsx`, `src/components/Menu/Menu.jsx`

Routes are defined with capital letters:
- `App.jsx` line 25: `/Roster`
- `App.jsx` line 26: `/Attributions`

The Menu component links to lowercase versions. React Router handles this client-side and it works in the browser, but on a case-sensitive server (Linux/nginx, which iGEM's servers likely are) the paths `/roster` and `/attributions` would 404 if accessed directly.

**Fix:** Standardise all route paths to lowercase in both `App.jsx` and any navigation components, and update all internal `<Link to="...">` references accordingly.

---

## MINOR

### 13. README is the default Vite template

**File:** `README.md`

The README contains only Vite boilerplate about `@vitejs/plugin-react` and ESLint configuration. It has no project description, no team name, no build instructions, and no asset attribution section.

While not an iGEM eligibility requirement, a meaningful README is expected for a citable open-source project and is good practice for the "reproducible build" requirement.

**Fix:** Replace the README with project-specific content: team name, project overview, build instructions (`npm install && npm run build`), and a note on asset sources.

---

## Summary Table

| # | Violation | Severity |
|---|---|---|
| 1 | Google Fonts loaded from external CDN (`fonts.googleapis.com`) | Critical |
| 2 | `.gitlab-ci.yml` missing — no CI/CD pipeline | Critical |
| 3 | `LICENSE` file missing from repo root | Critical |
| 4 | Footer has no CC-BY 4.0 license link | Critical |
| 5 | Footer has no GitLab repository link | Critical |
| 6 | 12 of 13 required standard URL routes missing (incl. `/safety-and-security`) | Critical |
| 7 | `earth.webp` has no attribution or license documentation | Serious |
| 8 | 8 sponsor logos used without documented written permission | Serious |
| 9 | `public/content-images/` images have no attribution | Serious |
| 10 | No AI usage disclosure section | Serious |
| 11 | All 20 Attributions entries are placeholder text | Moderate |
| 12 | `/Roster` and `/Attributions` route capitalisation mismatch | Moderate |
| 13 | README is default Vite template with no project content | Minor |
