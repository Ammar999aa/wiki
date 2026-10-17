import { useState } from "react";
import { LAND_ROWS, DOT_STEP, LAT_TOP, LAT_BOTTOM } from "../worldDots.js";
import { countries } from "../data.js";
import styles from "../Inclusivity.module.scss";

// "An international team in Saudi Arabia": a dotted world map with a marker
// for each country the page names, and a faint arc from each to KAUST, where
// the team works together. Plain SVG in degrees (equirectangular: x =
// longitude + 180, y = degrees below LAT_TOP), so markers sit on the same
// grid as the land dots. The country names are also listed under the map,
// so no country is identified by a dot alone.

const W = 360;
const H = LAT_TOP - LAT_BOTTOM;
const project = ({ lon, lat }) => ({ x: lon + 180, y: LAT_TOP - lat });

const landDots = LAND_ROWS.flatMap((row, r) =>
  [...row].flatMap((cell, c) => (cell === "1" ? [{ x: (c + 0.5) * DOT_STEP, y: (r + 0.5) * DOT_STEP }] : [])),
);

const home = countries.find((c) => c.home);
const homePt = project(home);

// Each arc bows upward (toward the top of the map) by a share of its length.
function arc(from) {
  const a = project(from);
  const mx = (a.x + homePt.x) / 2;
  const my = (a.y + homePt.y) / 2 - Math.hypot(a.x - homePt.x, a.y - homePt.y) * 0.22;
  return `M${a.x},${a.y} Q${mx},${my} ${homePt.x},${homePt.y}`;
}

export default function WorldMap() {
  const [active, setActive] = useState(null);

  return (
    <figure className={styles.worldMap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.worldSvg}
        role="img"
        aria-label={`World map marking the team's countries: ${countries.map((c) => c.name).join(", ")}.`}
      >
        <g className={styles.land}>
          {landDots.map((d) => (
            <circle key={`${d.x},${d.y}`} cx={d.x} cy={d.y} r={0.62} />
          ))}
        </g>

        <g className={styles.arcs}>
          {countries
            .filter((c) => !c.home)
            .map((c) => (
              <path key={c.name} d={arc(c)} data-active={active === c.name || undefined} />
            ))}
        </g>

        {countries.map((c) => {
          const p = project(c);
          return (
            <g
              key={c.name}
              className={styles.marker}
              data-home={c.home || undefined}
              data-active={active === c.name || undefined}
              transform={`translate(${p.x} ${p.y})`}
              onMouseEnter={() => setActive(c.name)}
              onMouseLeave={() => setActive(null)}
            >
              <title>{c.home ? `${c.name} (KAUST)` : c.name}</title>
              <circle className={styles.markerHalo} r={4.2} />
              <circle className={styles.markerDot} r={1.9} />
            </g>
          );
        })}
      </svg>

      <ul className={styles.countryList}>
        {countries.map((c) => (
          <li
            key={c.name}
            data-home={c.home || undefined}
            data-active={active === c.name || undefined}
            onMouseEnter={() => setActive(c.name)}
            onMouseLeave={() => setActive(null)}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </figure>
  );
}
