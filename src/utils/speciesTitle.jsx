// Species names in italics inside a plain-text title (wiki authoring
// conventions: "italicize species even in headings"). Section titles come
// out of the markdown-sections plugin as plain strings, because they also
// serve as ids, nav-state keys and exact-match lookups (Protocols' PARTS),
// so `*B. subtilis*` can't be written into a `## ` line itself. Pages pass
// the plain title through this for display only, e.g. as a section's
// `titleContent` or a card heading. DryLabModeling formats its own
// organism headings and doesn't use this.
const SPECIES = /((?:Bacillus|Saccharomyces|Pichia|Komagataella|Escherichia|Synechococcus|[BSPEK]\.) [a-z]{3,})/;

export function speciesTitle(title) {
  const parts = title.split(SPECIES);
  if (parts.length === 1) return title;
  // split() with a capture group puts each match at the odd indices.
  return parts.map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

// For a SectionedArticle `sections` array: adds `titleContent` (heading and
// jump-nav label) to every section whose title names a species.
export function withSpeciesTitles(sections) {
  return sections.map((section) =>
    SPECIES.test(section.title) ? { ...section, titleContent: speciesTitle(section.title) } : section
  );
}
