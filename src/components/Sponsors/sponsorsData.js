import nti    from "../../assets/sponsors/nti.png";
import bese   from "../../assets/sponsors/bese.png";
import lem    from "../../assets/sponsors/lem.png";
import biomed from "../../assets/sponsors/biomed.png";
import bk     from "../../assets/sponsors/bk.png";
import br     from "../../assets/sponsors/br.png";
import gs     from "../../assets/sponsors/gs.png";
import sg     from "../../assets/sponsors/sg.png";
import idt    from "../../assets/sponsors/idt.png";
import kaustigem from "../../assets/sponsors/kaustigem.png";

// Single source of truth for sponsor logos/metadata, shared by the floating
// "Supported by" strip (./Sponsors.jsx, embedded on Home and the /sponsors
// page) and the detail cards on the /sponsors page
// (src/pages/Sponsors/Sponsors.jsx). `description` is placeholder copy —
// real sponsor blurbs haven't been written yet; see RESPONSIBLE_AI_USE.md on
// not fabricating content on a sponsor's behalf.
export const SPONSORS = [
  { id: "nti",       src: nti,       name: "NTI",             nudge:   0, description: "Sponsor description coming soon." },
  { id: "bese",      src: bese,      name: "BESE",            nudge:  22, description: "Sponsor description coming soon." },
  { id: "bk",        src: bk,        name: "Burger King",     nudge: -14, small: true, description: "Sponsor description coming soon." },
  { id: "lem",       src: lem,       name: "LEM",             nudge:  -8, description: "Sponsor description coming soon." },
  { id: "kaustigem", src: kaustigem, name: "KAUST iGEM",      nudge:  12, description: "Sponsor description coming soon." },
  { id: "biomed",    src: biomed,    name: "BioMed",          nudge:  30, description: "Sponsor description coming soon." },
  { id: "gs",        src: gs,        name: "GS",              nudge:  -4, description: "Sponsor description coming soon." },
  { id: "idt",       src: idt,       name: "IDT",             nudge: -18, description: "Sponsor description coming soon." },
  { id: "br",        src: br,        name: "Baskin-Robbins",  nudge:  16, small: true, description: "Sponsor description coming soon." },
  { id: "sg",        src: sg,        name: "SnapGene",        nudge:  24, description: "Sponsor description coming soon." },
];
