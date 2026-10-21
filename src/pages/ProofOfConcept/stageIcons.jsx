// The five production-workflow icons, copied from project-description.md's
// `.process-strip` panel (itself the markdown form of Home's processStrip).
// They live here as JSX rather than as raw SVG in proof-of-concept.md so the
// strip at the top of this page and the icon on each section heading draw
// from one source. The `.pi-*` tone classes are global
// (SectionedArticle.module.scss, scoped to `.article`) — an SVG `fill` is a
// presentation attribute and can't reference a custom property.
//
// Two icons have no counterpart in the five-stage strip: the page's last two
// sections aren't production stages, so they get their own icons in the same
// two-tone language (a compass for the work still being explored, a flag for
// the milestones ahead) rather than being the only headings without one.

// Keyed by the slugified `##` heading of the section the icon belongs to
// (see plugins/markdown-sections.js); each value is the inside of a
// `viewBox="0 0 48 48"` svg, which ProofOfConcept.jsx wraps.
export const STAGE_ICONS = {
  preserve: (
    <g transform="rotate(-40 24 24)">
      <path d="M16 24v-6a8 8 0 0 1 16 0v6z" className="pi-light" />
      <path d="M16 24v6a8 8 0 0 0 16 0v-6z" className="pi-main" />
      <circle cx="21" cy="29" r="1.7" className="pi-light" />
      <circle cx="26.5" cy="32" r="1.7" className="pi-light" />
    </g>
  ),
  select: (
    <>
      <rect x="8" y="8" width="32" height="32" rx="7" className="pi-frame" />
      <rect x="13" y="13" width="22" height="7.5" rx="2.5" className="pi-light" />
      <rect x="13" y="24" width="9.5" height="11" rx="2.5" className="pi-amber" />
      <rect x="25.5" y="24" width="9.5" height="11" rx="2.5" className="pi-main" />
    </>
  ),
  grow: (
    <>
      <path d="M9 8h30M12 8v32M36 8v32M8 40h32M24 4v22" className="pi-line" />
      <rect x="16" y="14" width="16" height="22" rx="5" className="pi-line" />
      <path d="M16 26h16v5a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5z" className="pi-main" />
      <circle cx="24" cy="26.5" r="2.4" className="pi-light" />
    </>
  ),
  produce: (
    <>
      <circle cx="16" cy="18" r="7" className="pi-blue" />
      <circle cx="29" cy="16" r="6.5" className="pi-main" />
      <circle cx="35" cy="28" r="6.5" className="pi-main" />
      <circle cx="14" cy="31" r="6" className="pi-blue" />
      <circle cx="24.5" cy="28" r="7.5" className="pi-light" />
    </>
  ),
  purify: (
    <>
      <rect x="18.5" y="4" width="11" height="5.5" rx="1.8" className="pi-light" />
      <path
        d="M18 9.5h12v4.5l3.5 4.5V38a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4V18.5l3.5-4.5z"
        className="pi-line"
      />
      <path
        d="M17.5 24h13v13.5a2.5 2.5 0 0 1-2.5 2.5h-8a2.5 2.5 0 0 1-2.5-2.5z"
        className="pi-main"
      />
      <path d="M24 27.5c2 2.6 3 4.2 3 5.4a3 3 0 0 1-6 0c0-1.2 1-2.8 3-5.4z" className="pi-light" />
    </>
  ),
  "further-exploration": (
    <>
      <circle cx="24" cy="24" r="16" className="pi-frame" />
      <circle cx="24" cy="24" r="16" className="pi-line" />
      <path d="M31 17l-4.5 10.5L16 32l4.5-10.5z" className="pi-main" />
      <circle cx="24" cy="24" r="2.2" className="pi-light" />
    </>
  ),
  "next-steps": (
    <>
      <path d="M14 10v32" className="pi-line" />
      <path d="M15 12h21l-5.5 7.5L36 27H15z" className="pi-main" />
      <circle cx="14" cy="7.5" r="3" className="pi-amber" />
    </>
  ),
};

// The five stages, in order, as the strip lists them — same names and
// one-line descriptions as the Project Description's own strip.
export const STAGES = [
  { id: "preserve", name: "Preserve", desc: "Freeze-dried microbes or spores" },
  { id: "select", name: "Select", desc: "Choose the strain for your protein" },
  { id: "grow", name: "Grow", desc: "Activate and grow in the bioreactor" },
  { id: "produce", name: "Produce", desc: "Secrete therapeutic proteins" },
  { id: "purify", name: "Purify", desc: "Recover and purify the product" },
];

