// Importing the specific flags used instead of 'flag-icons/css/flag-icons.min.css'
// — that stylesheet references every country's SVG (~140 files, ~4MB), which
// blew past GitLab's CI artifact size limit for a 12MB build. Only 9 are
// ever shown here. Source: flag-icons (MIT) — github.com/lipis/flag-icons
import flagCn from "../../assets/flags/cn.svg";
import flagCo from "../../assets/flags/co.svg";
import flagIn from "../../assets/flags/in.svg";
import flagKz from "../../assets/flags/kz.svg";
import flagPe from "../../assets/flags/pe.svg";
import flagSa from "../../assets/flags/sa.svg";
import flagSg from "../../assets/flags/sg.svg";
import flagTr from "../../assets/flags/tr.svg";
import flagUs from "../../assets/flags/us.svg";

const FLAGS = { cn: flagCn, co: flagCo, in: flagIn, kz: flagKz, pe: flagPe, sa: flagSa, sg: flagSg, tr: flagTr, us: flagUs };

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
