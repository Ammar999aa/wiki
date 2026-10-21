// Line glyphs for the three "Engaging with society" activities, shared by the
// ShapedByMap avatars and the EngagementTabs cards, plus `person` for a
// stakeholder we have no photo of. 24×24, stroke only, so the
// caller's CSS sets the colour (stroke) like the site's other line icons.
const ICONS = {
  mentorship: (
    <>
      <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
      <path d="M6.5 11.6V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.4M22 9.5V15" />
    </>
  ),
  tawasol: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
      <circle cx="16.5" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.6-.4 4.6 1.3 5.1 4.3" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 20c.8-4 3.6-6.6 7.2-6.6s6.4 2.6 7.2 6.6" />
    </>
  ),
  academy: (
    <>
      <path d="M12 3c3 2.2 4.6 5.5 4.6 9.2V17H7.4v-4.8C7.4 8.5 9 5.2 12 3Z" />
      <circle cx="12" cy="10" r="1.8" />
      <path d="M7.4 13.5 5 16v3h2.4M16.6 13.5 19 16v3h-2.4M10 20.5h4" />
    </>
  ),
};

export default function ActivityIcon({ name, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}
