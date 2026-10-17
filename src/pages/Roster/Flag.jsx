// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/svg-assets/flags/. Originally
// picked as the specific flags used instead of pulling in
// 'flag-icons/css/flag-icons.min.css' — that stylesheet references every
// country's SVG (~140 files, ~4MB), which blew past GitLab's CI artifact
// size limit for a 12MB build. Only 9 are ever shown here. Source:
// flag-icons (MIT) — github.com/lipis/flag-icons
const FLAGS_BASE = "https://static.igem.wiki/teams/6341/wiki/svg-assets/flags";
const FLAGS = Object.fromEntries(
  ["au", "cn", "co", "de", "eg", "es", "in", "it", "kz", "pe", "sa", "sg", "tr", "us"].map((code) => [
    code,
    `${FLAGS_BASE}/${code}.svg`,
  ])
);

// Shared by Roster.jsx (bubble grid needs no flag) and RosterDetail.jsx (the
// selected member's overlay).
export default function Flag({ code, width, height, marginInlineStart }) {
  if (!code || !FLAGS[code]) return null;
  return (
    <img
      src={FLAGS[code]}
      alt=""
      style={{ width, height, borderRadius: 3, verticalAlign: "middle", marginInlineStart, display: "inline-block", objectFit: "cover" }}
    />
  );
}
