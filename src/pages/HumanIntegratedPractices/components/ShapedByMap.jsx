import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shapedParts, shapedGroups, shapedPeople } from "../data.js";
import styles from "./ShapedByMap.module.scss";

// "Who shaped SHIHAB": the people we spoke with orbit SHIHAB, and a beam runs
// from each person to the parts of the project their conversation changed.
// The side panel already lists this page's sections, so this map is organised
// by people and project parts instead.

const PHOTO_BASE = "https://static.igem.wiki/teams/6341/wiki/content/human-integrated-practices";

// Stage geometry, in viewBox units. Avatars and part pills are HTML laid over
// the SVG at the same percentages, so they stay clickable buttons.
const W = 1000;
const H = 540;
const CX = W / 2;
const CY = H / 2;
const OUTER = { rx: 400, ry: 200 };
const INNER = { rx: 215, ry: 100 };

// Degrees clockwise from the top. People sit in 24° slots, with one empty slot
// before each group so the groups read as separate arcs.
const PERSON_ANGLES = {
  starr: 24,
  "vergos-chandrashekhar": 48,
  barnawi: 72,
  alahmadi: 96,
  rosado: 120,
  mason: 144,
  zea: 168,
  washington: 192,
  glowe: 216,
  alharbi: 240,
  hse: 264,
  mian: 288,
  macleod: 312,
  kessler: 336,
  grant: 360,
};
// Turns the whole layout so the groups run clockwise from the top-left in
// page order: astronauts, microbes, mission, then back on Earth.
const ROTATE = -96;
// Each part sits roughly in line with the people linked to it, so beams cross less.
const PART_ANGLES = {
  payload: 40,
  experiments: 105,
  drylab: 155,
  roadmap: 200,
  safety: 250,
  hardware: 300,
  modeling: 350,
};

const onEllipse = ({ rx, ry }, deg) => {
  const t = ((deg + ROTATE) * Math.PI) / 180;
  return { x: CX + rx * Math.sin(t), y: CY - ry * Math.cos(t) };
};
// On a flat ellipse, equal angles bunch up at the left and right ends. This
// places a point a given share of the way around the ellipse's *length*
// instead, so evenly spaced slots stay evenly spaced on screen.
function alongEllipse(e, deg) {
  const steps = 720;
  const pts = Array.from({ length: steps + 1 }, (_, i) => onEllipse(e, (i / steps) * 360));
  const cum = [0];
  for (let i = 1; i <= steps; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  const target = ((((deg % 360) + 360) % 360) / 360) * cum[steps];
  const i = cum.findIndex((c) => c >= target);
  return pts[Math.max(i, 0)];
}

const pct = ({ x, y }) => ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%` });

const personPos = Object.fromEntries(shapedPeople.map((p) => [p.id, alongEllipse(OUTER, PERSON_ANGLES[p.id])]));
const partPos = Object.fromEntries(shapedParts.map((p) => [p.id, onEllipse(INNER, PART_ANGLES[p.id])]));
const partById = Object.fromEntries(shapedParts.map((p) => [p.id, p]));
const groupById = Object.fromEntries(shapedGroups.map((g) => [g.id, g]));
const personById = Object.fromEntries(shapedPeople.map((p) => [p.id, p]));
const peopleForPart = (partId) => shapedPeople.filter((p) => p.parts.includes(partId));

const links = shapedPeople.flatMap((person) => person.parts.map((part) => ({ person, part })));
// People not tied to one part of the project beam straight to SHIHAB at the centre.
const centreLinks = shapedPeople.filter((person) => person.parts.length === 0);

// A beam bows toward SHIHAB at the centre rather than running straight.
function beamPath(a, b) {
  const mx = CX + ((a.x + b.x) / 2 - CX) * 0.4;
  const my = CY + ((a.y + b.y) / 2 - CY) * 0.4;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

function findCard(person) {
  const name = [...document.querySelectorAll(".person-card .person-name")].find(
    (h) => h.textContent.trim() === person.card,
  );
  return name?.closest(".person-card");
}

// Clicking the card's own "See more" button lets Article.jsx open its popup as usual.
function openConversation(person) {
  findCard(person)?.querySelector(".person-more-btn")?.click();
}

function Photo({ ph }) {
  return (
    <img
      src={`${PHOTO_BASE}/${ph.file}`}
      alt=""
      loading="lazy"
      style={{
        ...(ph.x && { "--photo-x": ph.x }),
        ...(ph.y && { "--photo-y": ph.y }),
        ...(ph.zoomY && { "--photo-zoom-y": ph.zoomY }),
        ...(ph.zoom && { "--photo-zoom": ph.zoom }),
      }}
    />
  );
}

// Two people in one conversation share one circle, split down the middle, so
// the pair takes the same space as everyone else.
function Avatar({ person, className }) {
  const pair = person.photos.length > 1;
  return (
    <span
      className={`${styles.avatar} ${className || ""}`}
      data-tone={groupById[person.group].tone}
      data-pair={pair || undefined}
    >
      {pair
        ? person.photos.map((ph) => (
            <span key={ph.file} className={styles.half} style={{ backgroundImage: `url(${PHOTO_BASE}/${ph.file})` }} />
          ))
        : person.photos.map((ph) => <Photo key={ph.file} ph={ph} />)}
    </span>
  );
}

function PartLinks({ person }) {
  return (
    <div className={styles.chips}>
      {person.parts.map((id) => (
        <Link key={id} to={partById[id].path} className={styles.chip}>
          {partById[id].label} →
        </Link>
      ))}
    </div>
  );
}

function PersonReadout({ person }) {
  const group = groupById[person.group];
  return (
    <div className={styles.readCols}>
      <div>
        <div className={styles.readHead}>
          <Avatar person={person} className={styles.readAvatar} />
          <div>
            <p className={styles.kicker} data-tone={group.tone}>
              {group.label} · {person.topic}
            </p>
            <h4 className={styles.readName}>{person.card}</h4>
          </div>
        </div>
        <p className={styles.changed} dangerouslySetInnerHTML={{ __html: person.changed }} />
      </div>
      <div className={styles.readSide}>
        {person.parts.length > 0 && (
          <>
            <p className={styles.label}>Shaped</p>
            <PartLinks person={person} />
          </>
        )}
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={() => openConversation(person)}>
            Read the full conversation
          </button>
        </div>
      </div>
    </div>
  );
}

function PartReadout({ part, onPick }) {
  const people = peopleForPart(part.id);
  return (
    <>
      <p className={styles.kicker}>Part of SHIHAB</p>
      <h4 className={styles.readName}>{part.label}</h4>
      <p className={styles.label}>
        Shaped by {people.length} conversation{people.length > 1 ? "s" : ""}
      </p>
      <div className={styles.chips}>
        {people.map((p) => (
          <button type="button" key={p.id} className={styles.personChip} onClick={() => onPick(p.id)}>
            <Avatar person={p} className={styles.chipAvatar} />
            {p.lines[0]}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <Link to={part.path} className={styles.primaryBtn}>
          Go to {part.label} →
        </Link>
      </div>
    </>
  );
}

export default function ShapedByMap() {
  // `pinned` is the clicked item; `hover` previews another one on top of it.
  const [pinned, setPinned] = useState(null);
  const [hover, setHover] = useState(null);
  const [openRow, setOpenRow] = useState(null);
  const readoutRef = useRef(null);
  const readoutInnerRef = useRef(null);
  const active = hover || pinned;
  const activeKey = active ? `${active.type}-${active.id}` : "idle";

  // The readout's height follows its content with a transition: the outer box
  // gets the inner box's measured height, and CSS animates between values.
  useEffect(() => {
    const outer = readoutRef.current;
    const inner = readoutInnerRef.current;
    if (!outer || !inner) return undefined;
    const fit = () => {
      outer.style.height = `${inner.offsetHeight}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  const toggle = (item) => setPinned((cur) => (cur && cur.type === item.type && cur.id === item.id ? null : item));
  const preview = (item) => ({
    onMouseEnter: () => setHover(item),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(item),
    onBlur: () => setHover(null),
  });

  // What stays lit for the active item; everything else dims.
  const litPeople = new Set();
  const litParts = new Set();
  if (active?.type === "person") {
    litPeople.add(active.id);
    personById[active.id].parts.forEach((id) => litParts.add(id));
  } else if (active?.type === "part") {
    litParts.add(active.id);
    peopleForPart(active.id).forEach((p) => litPeople.add(p.id));
  }
  const state = (lit) => (!active ? undefined : lit ? "lit" : "dim");
  const isPinned = (type, id) => pinned?.type === type && pinned?.id === id;

  return (
    <div className={styles.map} onKeyDown={(e) => e.key === "Escape" && setPinned(null)}>
      <div className={styles.stage} onMouseLeave={() => setHover(null)}>
        <ul className={styles.legend}>
          {shapedGroups.map((g) => (
            <li key={g.id} data-tone={g.tone}>
              {g.label}
            </li>
          ))}
        </ul>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
          <ellipse cx={CX} cy={CY} rx={OUTER.rx} ry={OUTER.ry} className={styles.orbit} />
          <ellipse cx={CX} cy={CY} rx={INNER.rx} ry={INNER.ry} className={styles.orbit} />
          {shapedParts.map((part) => (
            <line
              key={part.id}
              x1={CX}
              y1={CY}
              x2={partPos[part.id].x}
              y2={partPos[part.id].y}
              className={styles.spoke}
              data-state={state(litParts.has(part.id))}
            />
          ))}
          {links.map(({ person, part }) => {
            const lit = active && litPeople.has(person.id) && litParts.has(part);
            return (
              <path
                key={`${person.id}-${part}`}
                d={beamPath(personPos[person.id], partPos[part])}
                className={styles.beam}
                data-tone={groupById[person.group].tone}
                data-state={state(lit)}
              />
            );
          })}
          {centreLinks.map((person) => (
            <path
              key={`${person.id}-centre`}
              d={beamPath(personPos[person.id], { x: CX, y: CY })}
              className={styles.beam}
              data-tone={groupById[person.group].tone}
              data-state={state(active?.type === "person" && active.id === person.id)}
            />
          ))}
          <circle cx={CX} cy={CY} r={70} className={styles.coreHalo} />
          <circle cx={CX} cy={CY} r={46} className={styles.core} />
          <text x={CX} y={CY + 6} className={styles.coreText}>
            SHIHAB
          </text>
        </svg>

        {shapedParts.map((part) => (
          <button
            type="button"
            key={part.id}
            className={styles.part}
            style={pct(partPos[part.id])}
            data-state={state(litParts.has(part.id))}
            aria-pressed={isPinned("part", part.id)}
            onClick={() => toggle({ type: "part", id: part.id })}
            {...preview({ type: "part", id: part.id })}
          >
            {part.label}
          </button>
        ))}

        {shapedPeople.map((person) => (
          <button
            type="button"
            key={person.id}
            className={styles.person}
            style={pct(personPos[person.id])}
            data-state={state(litPeople.has(person.id))}
            aria-pressed={isPinned("person", person.id)}
            aria-label={`${person.card}: ${person.topic}`}
            onClick={() => toggle({ type: "person", id: person.id })}
            {...preview({ type: "person", id: person.id })}
          >
            <Avatar person={person} />
            <span className={styles.personName}>
              {person.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.readout} ref={readoutRef} aria-live="polite">
        <div className={styles.readoutInner} ref={readoutInnerRef}>
          <div key={activeKey} className={styles.readoutFade}>
            {active?.type === "person" ? (
              <PersonReadout person={personById[active.id]} />
            ) : active?.type === "part" ? (
              <PartReadout part={partById[active.id]} onPick={(id) => setPinned({ type: "person", id })} />
            ) : (
              <div className={styles.idle}>
                <p className={styles.idleStats}>
                  <strong>{shapedPeople.length}</strong> conversations · <strong>{shapedParts.length}</strong> parts of
                  SHIHAB changed
                </p>
                <p>
                  Pick a person to see what their conversation changed, or a part of SHIHAB to see everyone who shaped
                  it.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Narrow screens: the orbit gets too small to read, so the same data
          becomes a list, each row opening the same readout. */}
      <ul className={styles.list}>
        {shapedPeople.map((person) => {
          const open = openRow === person.id;
          return (
            <li key={person.id} data-open={open}>
              <button
                type="button"
                className={styles.row}
                aria-expanded={open}
                onClick={() => setOpenRow(open ? null : person.id)}
              >
                <Avatar person={person} className={styles.rowAvatar} />
                <span className={styles.rowText}>
                  <b>{person.lines.join(" ")}</b>
                  <span>{person.parts.map((id) => partById[id].label).join(" · ")}</span>
                </span>
                <span className={styles.rowMark} aria-hidden="true">
                  {open ? "–" : "+"}
                </span>
              </button>
              {open && (
                <div className={styles.rowBody}>
                  <PersonReadout person={person} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
