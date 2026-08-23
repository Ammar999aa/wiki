// Small abstract molecular icons, one per `glyph` key used in proteins.js.
// Kept as inline vector shapes (not uploaded images) since these are
// generic, reusable UI marks rather than page content — see the repo's
// asset rules in README.md. Loosely themed to what each protein does
// rather than literal illustrations: ice spark for antifreeze proteins,
// a shield for binder/antibody-style proteins, a glowing orb for the
// fluorescent proteins, a hexamer for insulin, etc.
const PATHS = {
  spark: (
    <g strokeLinecap="round">
      <path d="M24 6v36M6 24h36M12 12l24 24M36 12L12 36" />
    </g>
  ),
  shield: (
    <path d="M24 5 L41 12 V23 C41 33 34 40 24 44 C14 40 7 33 7 23 V12 Z M17 24 L22 29 L32 18" fill="none" />
  ),
  orb: (
    <>
      <circle cx="24" cy="24" r="11" />
      <circle cx="24" cy="24" r="18" fill="none" opacity="0.4" />
    </>
  ),
  hex: (
    <path d="M24 5 L40 14.5 V33.5 L24 43 L8 33.5 V14.5 Z" fill="none" />
  ),
  network: (
    <g>
      <circle cx="12" cy="14" r="5" />
      <circle cx="36" cy="14" r="5" />
      <circle cx="24" cy="38" r="5" />
      <path d="M12 14 L24 38 M36 14 L24 38 M12 14 L36 14" opacity="0.5" />
    </g>
  ),
  helix: (
    <path
      d="M8 6c8 6 8 10 0 16s-8 10 0 16 8 10 0 16M40 6c-8 6-8 10 0 16s8 10 0 16-8 10 0 16"
      fill="none"
    />
  ),
  branch: (
    <path
      d="M24 44V24M24 24 L10 8M24 24 L38 8M24 34 L14 22M24 34 L34 22"
      fill="none"
    />
  ),
  plus: (
    <g fill="none">
      <circle cx="24" cy="24" r="17" strokeDasharray="4 5" />
      <path d="M24 15v18M15 24h18" />
    </g>
  ),
};

export default function ProteinGlyph({ variant, color }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="32"
      height="32"
      fill={color}
      stroke={color}
      strokeWidth="2.5"
      aria-hidden="true"
    >
      {PATHS[variant] || PATHS.orb}
    </svg>
  );
}
