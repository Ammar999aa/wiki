# i18n — restoring translations

This project supported en/ar/es/fr, but non-English translations were stripped to keep the wiki English-only while the team is still writing and revising content. The scaffolding was removed, not redesigned — restoring it is mostly reversing a deletion, not rebuilding a system.

## What was removed

- `src/i18n/ar.json`, `es.json`, `fr.json` — translated UI strings, keyed identically to `src/i18n/en.json`
- `src/content/ar/`, `es/`, `fr/` — translated article markdown (`project.md`, `wetlab.md`, `drylab.md`, `human-practices.md`, `safety.md`, `engagement.md`, `example-article.md`)
- `src/components/LanguageSelector/` — the language-switcher dropdown, previously rendered in `App.jsx` just above `<Routes>`
- Multi-locale logic in `src/i18n/LanguageContext.jsx`: a `TRANSLATIONS = { en, ar, es, fr }` map, `lang` state persisted to `localStorage` under key `"astra-lang"`, and `document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"`
- Per-page `sectionsByLang` lookups in `src/pages/{Project,WetLab,DryLab,Safety,HumanPractices,Engagement}/*.jsx`, each of which picked a markdown import by `lang` with an English fallback

**Note on `src/content/en/example-article.md`:** this was AI-generated placeholder copy (a generic solar-energy article) that the Project page used before real content existed. It has since been deleted outright — including the English version — and `Project.jsx` now renders `<Stub title="Project" />` like the other not-yet-written pages. Don't restore `example-article.md` as part of bringing translations back; it was never real content. When the Project page gets real English content, write fresh `project.md`-style markdown (see the `WetLab`/`DryLab`/etc. pages for the pattern: a markdown import passed to `SectionedArticle`), then translate *that*.

## How to restore

1. Find the commit that deleted the files (`git log --diff-filter=D --oneline -- src/i18n/ar.json`) and restore them from its parent:
   `git checkout <that-commit>^ -- src/i18n/ar.json src/i18n/es.json src/i18n/fr.json src/content/ar src/content/es src/content/fr src/components/LanguageSelector`
2. Rewrite `LanguageContext.jsx` to reintroduce the `TRANSLATIONS` map, `lang` state + `localStorage` persistence, `setLang`, and the RTL `dir` toggle — the pre-removal version is the one you just restored from git history above, so diff against it rather than reinventing it.
3. Re-add `<LanguageSelector />` to `App.jsx`.
4. In each content page, reintroduce the `sectionsByLang` map (English import + the newly-restored `ar`/`es`/`fr` imports) and select by `lang`, falling back to `en`.

## Before re-enabling a locale

- Every key in `en.json` must exist in the restored `ar.json`/`es.json`/`fr.json` — a missing key falls back to English mid-sentence, which reads as broken, not as a smaller gap.
- Translations must be real and reviewed, not machine-translated filler. Don't flip the switcher back on just to make it functional — partial or unreviewed translations are worse than English-only on a published wiki.
- Arabic is RTL: sanity-check layout once `ar.json` is live again. Grep for `direction: rtl` / `dir="rtl"` in `.scss`/`.jsx` files for places that already assume a text direction.
