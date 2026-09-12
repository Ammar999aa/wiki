// Sponsor logos are hosted on iGEM's asset server rather than bundled locally
// — see https://static.igem.wiki/teams/6341/wiki/sponsors/.
const SPONSOR_CDN = "https://static.igem.wiki/teams/6341/wiki/sponsors";
const nti       = `${SPONSOR_CDN}/nti.avif`;
const bese      = `${SPONSOR_CDN}/bese.avif`;
const lem       = `${SPONSOR_CDN}/lem.avif`;
const biomed    = `${SPONSOR_CDN}/biomed.avif`;
const bk        = `${SPONSOR_CDN}/bk.avif`;
const br        = `${SPONSOR_CDN}/br.avif`;
const gs        = `${SPONSOR_CDN}/gs.avif`;
const sg        = `${SPONSOR_CDN}/sg.avif`;
const idt       = `${SPONSOR_CDN}/idt.avif`;
const kaustigem = `${SPONSOR_CDN}/kaustigem.avif`;

// Single source of truth for sponsor logos/metadata, shared by the floating
// "Supported by" strip (./Sponsors.jsx, embedded on Home), the top-of-page
// carousel (../SponsorBanner/SponsorBanner.jsx), and the detail cards on the
// /sponsors page (src/pages/Sponsors/Sponsors.jsx). `description` is
// placeholder copy — real sponsor blurbs haven't been written yet; see
// RESPONSIBLE_AI_USE.md on not fabricating content on a sponsor's behalf.
//
// `smallInFooter`: BK and Baskin-Robbins are lower-tier sponsors, so
// ./Sponsors.jsx shrinks their logo — but only there. It's named for that
// one consumer on purpose: the /sponsors page and the carousel intentionally
// ignore it and render every logo at full, equal size.
//
// `visualScale`: every logo is fit to the same box height via `object-fit:
// contain`, but the source files themselves aren't trimmed to equal visual
// weight — some (BioMed, KAUST iGEM) bake in a lot of empty canvas around
// the mark, so at a matched box height their actual glyphs render smaller
// than sponsors whose source file is trimmed tight (BESE, GenScript, IDT,
// ...). This scales just the rendered `<img>` (via CSS transform, so it
// doesn't change layout) to compensate — measured by comparing each logo's
// content bounding box against the tightly-cropped ones, not eyeballed.
export const SPONSORS = [
  { id: "kaustigem", src: kaustigem, name: "KAUST iGEM",      nudge:  12, visualScale: 1.18, description: "Sponsor description coming soon." },
  { id: "nti",       src: nti,       name: "NTI",             nudge:   0, description: "Sponsor description coming soon." },
  { id: "bese",      src: bese,      name: "BESE",            nudge:  22, description: "Sponsor description coming soon." },
  { id: "biomed",    src: biomed,    name: "BioMed",          nudge:  30, visualScale: 1.25, description: "Sponsor description coming soon." },
  { id: "lem",       src: lem,       name: "LEM",             nudge:  -8, description: "Sponsor description coming soon." },
  { id: "gs",        src: gs,        name: "GS",              nudge:  -4, description: "Sponsor description coming soon." },
  { id: "idt",       src: idt,       name: "IDT",             nudge: -18, description: "Sponsor description coming soon." },
  { id: "sg",        src: sg,        name: "SnapGene",        nudge:  24, description: "Sponsor description coming soon." },
  { id: "bk",        src: bk,        name: "Burger King",     nudge: -14, smallInFooter: true, description: "Sponsor description coming soon." },
  { id: "br",        src: br,        name: "Baskin-Robbins",  nudge:  16, smallInFooter: true, description: "Sponsor description coming soon." },
];
