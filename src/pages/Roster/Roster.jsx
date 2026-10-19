import { Fragment, useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Roster.module.scss";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RosterDetail from "./RosterDetail";
import Honeycomb from "./Honeycomb";
import Flag from "./Flag";
import TeamPhotos from "./TeamPhotos";
const gradient = "https://static.igem.wiki/teams/6341/wiki/svg-assets/gradient.svg";
const bg = "https://static.igem.wiki/teams/6341/wiki/svg-assets/bg.svg";
// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/images/.
const astronautPhoto = "https://static.igem.wiki/teams/6341/wiki/images/apollo17-eva.webp";

// Hosted on iGEM's asset server rather than bundled locally — see
// https://static.igem.wiki/teams/6341/wiki/roster/.
const ROSTER_CDN = "https://static.igem.wiki/teams/6341/wiki/roster";
const jeremy    = `${ROSTER_CDN}/jeremy.avif`;
const taiba     = `${ROSTER_CDN}/taiba.avif`;
const ammar     = `${ROSTER_CDN}/ammar.avif`;
const genesis   = `${ROSTER_CDN}/genesis.avif`;
const kexin     = `${ROSTER_CDN}/kexin.avif`;
const maria     = `${ROSTER_CDN}/maria.avif`;
const mariana   = `${ROSTER_CDN}/mariana.avif`;
const sriharsha = `${ROSTER_CDN}/sriharsha.avif`;
const kevser    = `${ROSTER_CDN}/kevser.avif`;
const shahad    = `${ROSTER_CDN}/shahad.avif`;
const francesca = `${ROSTER_CDN}/francesca.avif`;
const ansal     = `${ROSTER_CDN}/ansal.avif`;
const zeyad     = `${ROSTER_CDN}/zeyad.avif`;
const nadia     = `${ROSTER_CDN}/nadia.avif`;
const hassan    = `${ROSTER_CDN}/hassan.avif`;
const raheema   = `${ROSTER_CDN}/raheema.avif`;
const mafer     = `${ROSTER_CDN}/mafer.avif`;
const kiran     = `${ROSTER_CDN}/kiran.avif`;
const shahada   = `${ROSTER_CDN}/shahada.avif`;
const noureldin = `${ROSTER_CDN}/noureldin.avif`;
const yerlen    = `${ROSTER_CDN}/yerlen.avif`;
const wayne     = `${ROSTER_CDN}/wayne.avif`;
const fabian    = `${ROSTER_CDN}/fabian.avif`;
const selena    = `${ROSTER_CDN}/selena.avif`;
const tehseen   = `${ROSTER_CDN}/tehseen.avif`;
const alejandra = `${ROSTER_CDN}/alejandra.avif`;
const jordi     = `${ROSTER_CDN}/jordi.avif`;

// Order within each department controls display order in both the
// honeycomb and the fallback grid (departmentGroups below filters this
// array, preserving order) — Ansal' leads Wet Lab and Shahad Hersi leads
// Public Engagement deliberately, not just alphabetically/by join date.
//
// `isTeamLead` marks the team's actual leads (Ansal' and Francesca, Wet
// Lab) — rendered with the same warm gold LiquidGlass tint the PI cluster
// uses (see `isPi`/`isTeamLead` in Honeycomb.jsx and renderPerson below),
// felt as a quiet signal on their normal bubble rather than a separate
// section or duplicate entry.
const members = [
  { name: "Jeremy Rodrigo Guerrero Alejos", roleKey: "dryLab", memberKey: "jeremy", photo: jeremy, countryCode: "pe" },
  { name: "Taiba Zeya", roleKey: "dryLab", memberKey: "taiba", photo: taiba, countryCode: "in" },
  { name: "Ammar Almarzooq", roleKey: "wiki", memberKey: "ammar", photo: ammar, countryCode: "sa" },
  { name: "Ansal' Diassova", roleKey: "wetLab", memberKey: "ansal", photo: ansal, countryCode: "kz", isTeamLead: true },
  { name: "Francesca Rivas Cuestas", roleKey: "wetLab", memberKey: "francesca", photo: francesca, countryCode: "pe", isTeamLead: true },
  { name: "Mariana Villegas", roleKey: "wetLab", memberKey: "mariana", photo: mariana, countryCode: "co" },
  { name: "Kexin Niu", roleKey: "dryLab", memberKey: "kexin", photo: kexin, countryCode: "cn" },
  { name: "Shahad Hersi", roleKey: "publicEngagement", memberKey: "shahad", photo: shahad, countryCode: "sa" },
  { name: "Raheema Javid", roleKey: "publicEngagement", memberKey: "raheema", photo: raheema, countryCode: "us" },
  { name: "Sriharsha Chowdarapu", roleKey: "wetLab", memberKey: "sriharsha", photo: sriharsha, countryCode: "in" },
  { name: "Maria Camila Muñoz Vega", roleKey: "wetLab", memberKey: "mariaCamila", photo: maria, countryCode: "co"},
  { name: "Kevser Ciek", roleKey: "dryLab", memberKey: "kevser", photo: kevser, countryCode: "tr" },
  { name: "Zeyad Muazzen", roleKey: "wetLab", memberKey: "zeyad", photo: zeyad, countryCode: "sa" },
  { name: "Nadia Houti", roleKey: "hardware", memberKey: "nadia", photo: nadia, countryCode: "sg" },
  { name: "Hassan Abuali", roleKey: "hardware", memberKey: "hassan", photo: hassan, countryCode: "sa" },
  { name: "Génesis Arroyo", roleKey: "publicEngagement", memberKey: "genesis", photo: genesis, countryCode: "pe" },
  { name: "Kiran Ahmad", roleKey: "publicEngagement", memberKey: "kiran", photo: kiran, countryCode: "us" },
  { name: "Maria Fernanda Gutierrez", roleKey: "humanPractices", memberKey: "mariaFernanda", photo: mafer, countryCode: "pe" },
];

// The two PIs also listed on Attributions (src/pages/Attributions/Attributions.jsx)
// — same names/role. Raik has sent neither a photo nor a flag yet, so his
// entry stays photo-less (the bubble falls back to initials).
const principalInvestigators = [
  { name: "Raik Grünberg", roleKey: "pi", memberKey: "raik", photo: null, countryCode: null },
  { name: "Wayne Yang", roleKey: "pi", memberKey: "wayne", photo: wayne, countryCode: "sg" },
];

// A separate advisory group, below PI — same idea (outside any department,
// no photo asset yet, "Bio coming soon." placeholder bios/tasks in
// src/i18n/en.json, not invented copy) but its own category, its own line
// in the honeycomb (see satelliteGroups below) and its own section on
// Attributions.
// Names, flags and photos are each person's own choice, from the replies in
// src/assets/email-responses — Jordi publishes as "Jordi Pla-Mauri", and
// Muhammad Tehseen asked for the Australian flag. Samah hasn't replied yet.
const advisors = [
  { name: "Fabian Schmidt", roleKey: "advisor", memberKey: "fabian", photo: fabian, countryCode: "de" },
  { name: "Samah Gadhoum", roleKey: "advisor", memberKey: "samah", photo: null, countryCode: null },
  { name: "Selena Franchini", roleKey: "advisor", memberKey: "selena", photo: selena, countryCode: "it" },
  { name: "Muhammad Tehseen", roleKey: "advisor", memberKey: "muhammadTehseen", photo: tehseen, countryCode: "au" },
  { name: "Alejandra Rodríguez Llerena", roleKey: "advisor", memberKey: "alejandra", photo: alejandra, countryCode: "es" },
  { name: "Jordi Pla-Mauri", roleKey: "advisor", memberKey: "jordi", photo: jordi, countryCode: "es" },
];

// A third satellite group, below Advisors — same idea again (outside any
// department, its own line in the honeycomb, its own section on
// Attributions).
const volunteers = [
  { name: "Shahad Al Abdulomhssen", roleKey: "volunteer", memberKey: "shahadAl", photo: shahada, countryCode: "sa" },
  { name: "Noureldin Rihan", roleKey: "volunteer", memberKey: "noureldin", photo: noureldin, countryCode: "eg" },
  { name: "Yerlen Menglen", roleKey: "volunteer", memberKey: "yerlen", photo: yerlen, countryCode: "kz" },
];

// Unfilled slots woven into the PI cluster, decorative room for that group
// specifically to grow into — none needed right now since both PI slots
// above are filled. Purely decorative when nonzero: not clickable, no name
// tag.
const PI_EMPTY_SLOT_COUNT = 0;

// Display order for the department clusters — deliberately not the
// roster.roles order in src/i18n/en.json (Wet Lab and Dry Lab are swapped,
// and Wiki moved last). Labels are hardcoded here, deliberately shorter
// than that file's full "Human Integrated Practices" for humanPractices:
// these are cluster captions, not the more spacious per-person role
// subtitle RosterDetail.jsx renders via t() from the fuller i18n string.
const DEPARTMENT_LABELS = {
  wetLab: "Wet Lab",
  dryLab: "Dry Lab",
  humanPractices: "Human Practices",
  hardware: "Hardware",
  publicEngagement: "Public Engagement",
  wiki: "Wiki",
};
const DEPARTMENT_ORDER = Object.keys(DEPARTMENT_LABELS);

// `members` grouped by department — computed once since `members` is
// static. Each group becomes its own labeled line in the honeycomb
// (Honeycomb.jsx's `departments` prop) and its own row in the
// touch/coarse-pointer fallback grid.
const departmentGroups = DEPARTMENT_ORDER.map((key) => ({
  key,
  label: DEPARTMENT_LABELS[key],
  members: members.filter((member) => member.roleKey === key),
}));

// Groups that sit below the whole department block instead of inside it —
// PI, then Advisors, then Volunteers under that. Each becomes its own line
// in the honeycomb (Honeycomb.jsx's `satelliteGroups` prop, stacked in this
// order) and its own section in the fallback grid below. `group` on each
// item is what Honeycomb.jsx keys its "not a department member" gold tint
// off of (anything other than "team").
const satelliteGroups = [
  {
    key: "pi",
    label: "Principal Investigators",
    items: [
      ...principalInvestigators.map((pi) => ({ kind: "member", group: "pi", id: pi.name, ...pi })),
      ...Array.from({ length: PI_EMPTY_SLOT_COUNT }, (_, i) => ({ kind: "empty", group: "pi", id: `pi-empty-${i}` })),
    ],
  },
  {
    key: "advisors",
    label: "Advisors",
    items: advisors.map((advisor) => ({ kind: "member", group: "advisor", id: advisor.name, ...advisor })),
  },
  {
    key: "volunteers",
    label: "Volunteers",
    items: volunteers.map((volunteer) => ({ kind: "member", group: "volunteer", id: volunteer.name, ...volunteer })),
  },
];

const allPeople = [...members, ...principalInvestigators, ...advisors, ...volunteers];

// The honeycomb's cursor-driven fisheye (Honeycomb.jsx) is a mouse-hover
// effect with nothing meaningful to do on a touchscreen — `hover: hover`
// and `pointer: fine` together are the standard way to ask "is there
// actually a mouse here," which is exactly the condition the effect needs.
// Touch/coarse-pointer devices fall back to the plain wrapping bubble grid
// below instead.
function usePointerFine() {
  const query = "(hover: hover) and (pointer: fine)";
  const [pointerFine, setPointerFine] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setPointerFine(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return pointerFine;
}

// One bubble button in the touch/coarse-pointer fallback grid — shared
// between the department and PI rows below. `isTeamLead` gets the same warm
// gold glass tint the honeycomb's team-lead bubbles use (DESIGN.md's one
// warm accent color, used sparingly) so the cue reads identically on both
// layouts — see Honeycomb.jsx's isTeamLead for why the opacity here is much
// higher than the PI cluster's: a photo covers all but a thin margin ring
// of the glass underneath, so a faint tint (fine for PI's usually-empty
// circle) would simply disappear. PI bubbles keep the plain black glass
// here, same as before — the gold tint on PI is a honeycomb-only cue (see
// `isPi` in Honeycomb.jsx), not something this grid has ever shown.
// `.leadGlow` (Roster.module.scss) adds a second, permanent cue on top of
// the tint — a tiny gold drop-shadow, distinct from `.selected`'s
// transient white one.
function renderPerson(person, selected, setSelectedName) {
  const isSelected = person === selected;
  const isGold = Boolean(person.isTeamLead);
  return (
    <button
      key={person.name}
      type="button"
      className={styles.person}
      onClick={() => setSelectedName(person.name)}
      aria-haspopup="dialog"
      aria-expanded={isSelected}
      aria-label={person.name}
    >
      <span className={`${styles.bubble} ${isGold ? styles.leadGlow : ""} ${isSelected ? styles.selected : ""}`}>
        <LiquidGlass radius={300} color={isGold ? [255, 216, 77] : [0, 0, 0]} opacity={isGold ? 0.55 : 0.07}>
          {person.photo ? (
            <img src={person.photo} className={styles.icon} alt={person.name} />
          ) : (
            <div className={styles.iconPlaceholder} />
          )}
        </LiquidGlass>
        {person.countryCode && (
          <span className={styles.flagBadge}>
            <Flag code={person.countryCode} width={22} height={16} />
          </span>
        )}
      </span>
      <span className={styles.personName}>{person.name.split(" ")[0]}</span>
    </button>
  );
}

// `photo` (apollo17-eva.webp — Apollo 17 CMP Ronald Evans on a trans-Earth-
// coast EVA, black space void keyed to transparent so it blends into the
// page's own --bg navy) is a one-off background for this page, same pattern
// as Sponsors.jsx's gemini4-eva.webp: PageWrapper renders it `background-size:
// cover` and pinned `fixed`, filling the viewport with no edges showing.
//
// On a mouse-driven desktop (see usePointerFine above) the team is the
// cursor-reactive fisheye honeycomb (Honeycomb.jsx): a fixed field of
// circles that never pans or scrolls; hovering near a bubble zooms it in
// place (no displacement — neighbors don't move), and it springs back once
// the cursor moves on. Each department is one horizontal line of bubbles,
// wrapping into a compact 2-3-row block (see Honeycomb.jsx), and PI/Advisors
// (satelliteGroups above) each get one further line below all of them —
// PI first, Advisors under that — set apart by a noticeably bigger gap
// (plus a few empty slots on PI's line, room to grow) — same mesh, same
// bubbles throughout, every group just set apart by distance and its own
// quiet caption rather than a hard divider. Touch/coarse-pointer devices
// get the plain wrapping bubble grid instead, since the fisheye is a hover
// effect with nothing to do on a screen with no cursor — the same
// department/PI/Advisors split, just as plain labeled rows.
export default function Roster() {
  const { t } = useLanguage();
  const pointerFine = usePointerFine();
  const [selectedName, setSelectedName] = useState(null);
  const selected = allPeople.find((person) => person.name === selectedName) || null;

  const departments = departmentGroups.map(({ key, label, members: deptMembers }) => ({
    key,
    label,
    items: deptMembers.map((member) => ({ kind: "member", group: "team", id: member.name, ...member })),
  }));

  const close = () => setSelectedName(null);

  // Escape closes from anywhere on the page, and the page shouldn't scroll
  // while a detail panel covers it.
  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <PageWrapper
      // The honeycomb (pointerFine) deliberately fits the viewport with no
      // scroll of its own — PageWrapper's default scrollable wrapper adds
      // --nav-clearance (130px) of bottom padding on top of that, purely
      // as scroll room the fixed nav never actually needs here, so it'd
      // force a scrollbar under a cluster that already fits. The touch
      // fallback grid genuinely does need to scroll (unbounded content),
      // so it keeps the default.
      scrollable={!pointerFine}
      background={{
        color: "#0A0A27",
        image: bg,
        size: "1280px 1080px",
        photo: astronautPhoto,
        photoPosition: "center top",
        gradient,
      }}
    >
      <div className={styles.page}>
        <div className={styles.titleWrap}>
          <p className={styles.titleLabel}>Team</p>
          <h1 className={styles.title}>Team</h1>
          <TeamPhotos />
        </div>

        {pointerFine ? (
          <Honeycomb
            departments={departments}
            satelliteGroups={satelliteGroups}
            onSelect={(person) => setSelectedName(person.name)}
          />
        ) : (
          <>
            {departments.map((dept, i) => (
              <Fragment key={dept.key}>
                <p className={`${styles.rosterSectionLabel} ${i === 0 ? styles.rosterSectionLabelFirst : ""}`}>{dept.label}</p>
                <div className={styles.roster}>{dept.items.map((item) => renderPerson(item, selected, setSelectedName))}</div>
              </Fragment>
            ))}
            {satelliteGroups.map((group) => (
              <Fragment key={group.key}>
                <p className={styles.rosterSectionLabel}>{group.label}</p>
                <div className={styles.roster}>
                  {group.items
                    .filter((item) => item.kind !== "empty")
                    .map((item) => renderPerson(item, selected, setSelectedName))}
                </div>
              </Fragment>
            ))}
          </>
        )}
      </div>

      {selected && <RosterDetail member={selected} onClose={close} t={t} />}

      <a
        href="https://www.nasa.gov/image-detail/apollo-17-spacewalk-december-1972/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoCredit}
      >
        Apollo 17 EVA: NASA
      </a>
    </PageWrapper>
  );
}
