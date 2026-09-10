# Notes for AI assistants

Read **[README.md](README.md)** first — it covers the stack, where to edit
(`src/contents/*`, `src/pages.ts`), the `yarn` commands, and the iGEM asset rules
(images via the uploads tool, videos from iGEM servers, no external CDNs).

## Responsible & honest use
@.claude/RESPONSIBLE_AI_USE.md

## Design system
Read this before creating or restyling a page — it covers tokens, the
`PageWrapper`/`LiquidGlass` primitives, the three page archetypes (stub,
markdown-driven, custom), and how `pages.js` wires up routing + nav.
@.claude/DESIGN.md

## Article formatting standards
Read this before writing a substantial, data-heavy article page (long-form,
multiple figures/tables, quantitative claims) — it distills what makes the
Model page (`src/pages/Model/`, `/modeling`) read as far more polished than
a plain markdown article, and gives a checklist for reproducing that.
@.claude/ARTICLE-STANDARDS.md

## Guardrails
- Don't change `LICENSE` or the `Footer` component's license notice + GitLab
  repository link (both required on every page for judging).
- `.gitlab-ci.yml` works as-is; change it only if you know what you're doing —
  any build/deploy issues that result are the team's responsibility.