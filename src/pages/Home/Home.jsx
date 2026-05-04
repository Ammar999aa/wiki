import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import { useLanguage } from "../../i18n/LanguageContext";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LiquidGlass from "../../components/LiquidGlass/LiquidGlass";
import bg from "../../assets/bg.svg?url";
import gradient from "../../assets/gradient.svg?url";

const PHRASES = [
  { text: "However, future space missions will operate in isolated and extreme environments.", inAt: 0.00, outAt: 0.30 },
  { text: "Traditional drug supply chains cannot support long-duration space missions.",       inAt: 0.32, outAt: 0.62 },
  { text: "Medical autonomy becomes essential for mission success.",                           inAt: 0.64, outAt: null },
];

function PlanetsSection({ scrollY }) {
  const ref = useRef(null);

  const progress = (() => {
    const el = ref.current;
    if (!el) return 0;
    const local = scrollY - el.offsetTop;
    return Math.min(Math.max(local / (window.innerHeight * 2.2), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const phraseOp = (inAt, outAt) => {
    const fadeIn  = clamp01((progress - inAt)  / 0.09);
    const fadeOut = outAt != null ? clamp01((outAt - progress) / 0.06) : 1;
    return Math.min(fadeIn, fadeOut);
  };

  return (
    <div className={styles.planetsSection} ref={ref}>
      <div className={styles.planetsSticky}>

        {/* Decorative planets */}
        <div className={`${styles.planet} ${styles.p1}`} />
        <div className={`${styles.planet} ${styles.p2}`} />
        <div className={`${styles.planet} ${styles.p3}`} />
        <div className={`${styles.planet} ${styles.p4}`} />
        <div className={`${styles.planet} ${styles.p5}`} />

        {/* Phrase stack — all in the same grid cell, crossfade via opacity */}
        <div className={styles.phraseStack}>
          {PHRASES.map(({ text, inAt, outAt }, i) => (
            <p
              key={i}
              className={`${styles.phrase} ${outAt === null ? styles.phraseFinal : ""}`}
              style={{ opacity: phraseOp(inAt, outAt) }}
            >
              {text}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── ASTRA Reveal ────────────────────────────────────────────────────────────

function AstraRevealSection({ scrollY }) {
  const ref = useRef(null);
  const progress = (() => {
    const el = ref.current;
    if (!el) return 0;
    return Math.min(Math.max((scrollY - el.offsetTop) / (window.innerHeight * 1.2), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const labelOp  = clamp01((progress - 0.00) / 0.15);
  const astraOp  = clamp01((progress - 0.25) / 0.20);
  const astraScale = 0.75 + 0.25 * clamp01((progress - 0.25) / 0.25);

  return (
    <div className={styles.revealSection} ref={ref}>
      <div className={styles.revealSticky}>
        <p className={styles.revealLabel} style={{ opacity: labelOp }}>
          That's why we present:
        </p>
        <h2
          className={styles.revealAstra}
          style={{ opacity: astraOp, transform: `scale(${astraScale})` }}
        >
          A.S.T.R.A
        </h2>
      </div>
    </div>
  );
}

// ─── Briefing ─────────────────────────────────────────────────────────────────

const BRIEFING = [
  {
    tag: "Context",
    text: "Medicines can be produced on demand using engineered biological systems.",
    inAt: 0.00, outAt: 0.30,
  },
  {
    tag: "Problem",
    text: "Biological systems are not naturally adapted to function in space conditions.",
    inAt: 0.32, outAt: 0.62,
  },
  {
    tag: "Solution",
    text: "We engineer resilient microbial systems capable of operating under space stressors — using Bacillus subtilis and Saccharomyces cerevisiae as robust production platforms.",
    inAt: 0.64, outAt: null,
  },
];

function BriefingSection({ scrollY }) {
  const ref = useRef(null);
  const progress = (() => {
    const el = ref.current;
    if (!el) return 0;
    return Math.min(Math.max((scrollY - el.offsetTop) / (window.innerHeight * 2.2), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const phraseOp = (inAt, outAt) => {
    const fadeIn  = clamp01((progress - inAt)  / 0.09);
    const fadeOut = outAt != null ? clamp01((outAt - progress) / 0.06) : 1;
    return Math.min(fadeIn, fadeOut);
  };

  return (
    <div className={styles.briefingSection} ref={ref}>
      <div className={styles.briefingSticky}>
        <div className={styles.briefingStack}>
          {BRIEFING.map(({ tag, text, inAt, outAt }) => (
            <div
              key={tag}
              className={styles.briefingItem}
              style={{ opacity: phraseOp(inAt, outAt) }}
            >
              <span className={styles.briefingTag}>{tag}</span>
              <p className={styles.briefingText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Scenarios ────────────────────────────────────────────────────────────────

// TODO: replace placeholder protein names with actual inserted gene/protein names
const B_SUBTILIS_PROTEINS = ["Protein A", "Protein B"];
const S_CEREVISIAE_PROTEINS = ["Protein C"];

const STRESSORS = ["Radiation", "Microgravity", "Extreme temp."];

function Organism({ type, state, proteins = [], proteinOpacity = 0 }) {
  return (
    <div className={styles.organismWrapper}>
      <div className={`${styles.organism} ${styles[type]} ${state === "dead" ? styles.dead : state === "alive" ? styles.alive : ""}`}>
        {state === "dead" && <span className={styles.deathMark}>✕</span>}
        {state === "alive" && <span className={styles.aliveMark}>✓</span>}
      </div>
      {proteins.length > 0 && (
        <div className={styles.proteinTags} style={{ opacity: proteinOpacity }}>
          {proteins.map((p) => (
            <span key={p} className={styles.proteinTag}>{p}</span>
          ))}
        </div>
      )}
      <small className={styles.organismLabel}>
        {type === "bacteria" ? "B. subtilis" : "S. cerevisiae"}
      </small>
    </div>
  );
}

function ScenarioSection({ scrollY }) {
  const ref = useRef(null);
  const progress = (() => {
    const el = ref.current;
    if (!el) return 0;
    return Math.min(Math.max((scrollY - el.offsetTop) / (window.innerHeight * 2.2), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const between = (start, end) => clamp01((progress - start) / (end - start));

  // Shared timeline — both panels animate in parallel
  const labelsOp   = between(0.00, 0.15);
  const orgsOp     = between(0.15, 0.32);
  const stressOp   = between(0.32, 0.48);
  const proteinOp  = between(0.48, 0.62);
  const outcomeOp  = between(0.65, 0.80);
  const surviveOp  = between(0.80, 0.92);

  const normalState = outcomeOp > 0.01 ? "dead" : "neutral";
  const astraState  = surviveOp > 0.01 ? "alive" : "neutral";

  return (
    <div className={styles.scenarioSection} ref={ref}>
      <div className={styles.scenarioSticky}>

        {/* ── Normal scenario ── */}
        <div className={styles.scenario}>
          <p className={styles.scenarioLabel} style={{ opacity: labelsOp }}>Without A.S.T.R.A</p>
          <div className={styles.organisms} style={{ opacity: orgsOp }}>
            <Organism type="bacteria" state={normalState} />
            <Organism type="yeast"   state={normalState} />
          </div>
          <div className={styles.stressors} style={{ opacity: stressOp }}>
            {STRESSORS.map((s) => <span key={s} className={styles.stressor}>{s}</span>)}
          </div>
        </div>

        <div className={styles.scenarioDivider} style={{ opacity: labelsOp }} />

        {/* ── ASTRA scenario ── */}
        <div className={styles.scenario}>
          <p className={`${styles.scenarioLabel} ${styles.scenarioLabelAstra}`} style={{ opacity: labelsOp }}>
            With A.S.T.R.A
          </p>
          <div className={styles.organisms} style={{ opacity: orgsOp }}>
            <Organism type="bacteria" state={astraState} proteins={B_SUBTILIS_PROTEINS} proteinOpacity={proteinOp} />
            <Organism type="yeast"    state={astraState} proteins={S_CEREVISIAE_PROTEINS} proteinOpacity={proteinOp} />
          </div>
          <div className={styles.stressors} style={{ opacity: stressOp }}>
            {STRESSORS.map((s) => <span key={s} className={styles.stressor}>{s}</span>)}
          </div>
          {surviveOp > 0.01 && (
            <p className={styles.surviveText} style={{ opacity: surviveOp }}>
              Medicine produced. ✓
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Nanobody Section ────────────────────────────────────────────────────────

function NanobodySection({ scrollY }) {
  const ref = useRef(null);
  const progress = (() => {
    const el = ref.current;
    if (!el) return 0;
    return Math.min(Math.max((scrollY - el.offsetTop) / (window.innerHeight * 1.5), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const textOp      = clamp01((progress - 0.00) / 0.20);
  const orgsOp      = clamp01((progress - 0.20) / 0.20);
  const particlesOp = clamp01((progress - 0.40) / 0.20);

  return (
    <div className={styles.nanobodySection} ref={ref}>
      <div className={styles.nanobodySticky}>
        <p className={styles.nanobodyText} style={{ opacity: textOp }}>
          Our system enables the controlled production of{" "}
          <span className={styles.nanobodyEmphasis}>therapeutic nanobodies</span> on demand.
        </p>

        <div className={styles.nanobodyOrganisms} style={{ opacity: orgsOp }}>
          {/* B. subtilis */}
          <div className={styles.nanobodyOrgWrapper}>
            <div className={styles.particleField} style={{ opacity: particlesOp }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.particle} style={{ "--i": i }}> Ψ</span>
              ))}
            </div>
            <div className={`${styles.organism} ${styles.bacteria} ${styles.supercharged}`} />
            <small className={styles.organismLabel}>B. subtilis</small>
          </div>

          {/* S. cerevisiae */}
          <div className={styles.nanobodyOrgWrapper}>
            <div className={styles.particleField} style={{ opacity: particlesOp }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.particle} style={{ "--i": i + 5 }}> Ψ</span>
              ))}
            </div>
            <div className={`${styles.organism} ${styles.yeast} ${styles.supercharged}`} />
            <small className={styles.organismLabel}>S. cerevisiae</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Capabilities Section ─────────────────────────────────────────────────────

const CAPABILITIES = [
  { icon: "∞", label: "Scalable",      desc: "Production scales to mission demands." },
  { icon: "</>", label: "Programmable", desc: "Genetic circuits tuned for any therapeutic." },
  { icon: "⟳",  label: "Adaptable",    desc: "Operates across diverse environmental conditions." },
];

function CapabilitiesSection({ scrollY }) {
  const ref = useRef(null);
  const progress = (() => {
    const el = ref.current;
    if (!el) return 0;
    return Math.min(Math.max((scrollY - el.offsetTop) / (window.innerHeight * 1.8), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const textOp = clamp01((progress - 0.00) / 0.18);

  return (
    <div className={styles.capSection} ref={ref}>
      <div className={styles.capSticky}>
        <p className={styles.capText} style={{ opacity: textOp }}>
          ASTRA is <em>scalable</em>, <em>programmable</em>, and <em>adaptable</em> to mission needs.
        </p>
        <div className={styles.capTiles}>
          {CAPABILITIES.map(({ icon, label, desc }, i) => {
            const tileOp = clamp01((progress - (0.22 + i * 0.14)) / 0.16);
            return (
              <div key={label} className={styles.capTile} style={{ opacity: tileOp, transform: `translateY(${(1 - tileOp) * 20}px)` }}>
                <span className={styles.capIcon}>{icon}</span>
                <strong className={styles.capLabel}>{label}</strong>
                <p className={styles.capDesc}>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Navigation Cards ─────────────────────────────────────────────────────────

const NAV_CARDS = [
  { emoji: "🔬", title: "Project Description", subtitle: "The science behind A.S.T.R.A.", to: "/project" },
  { emoji: "👥", title: "Team Roster",         subtitle: "Meet the people behind the mission.", to: "/Roster" },
  { emoji: "📋", title: "Attributions",        subtitle: "Contributions and acknowledgements.", to: "/Attributions" },
];

function NavigationCards() {
  return (
    <div className={styles.navSection}>
      <p className={styles.navHeading}>Explore the wiki</p>
      <div className={styles.navCards}>
        {NAV_CARDS.map(({ emoji, title, subtitle, to }) => (
          <Link key={to} to={to} className={styles.navCardLink}>
            <LiquidGlass radius={24} color={[0, 0, 0]} opacity={0.07}>
              <div className={styles.navCard}>
                <span className={styles.navEmoji}>{emoji}</span>
                <strong className={styles.navTitle}>{title}</strong>
                <p className={styles.navSubtitle}>{subtitle}</p>
              </div>
            </LiquidGlass>
          </Link>
        ))}
      </div>
    </div>
  );
}

const ORBITS = [
  { key: "food",     emoji: "🍱", label: "Food",     r: 55,  angle: 0,   threshold: 0.20 },
  { key: "water",    emoji: "💧", label: "Water",    r: 90,  angle: 90,  threshold: 0.38 },
  { key: "safety",   emoji: "🛡️", label: "Safety",   r: 125, angle: 180, threshold: 0.55 },
  { key: "medicine", emoji: "💊", label: "Medicine", r: 160, angle: 270, threshold: 0.70, highlight: true },
];

// Angles use CSS coordinate space (0° = right, 90° = down, 270° = up)
function orbitPos(r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

export default function Home() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const orbitSectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroProgress = Math.min(scrollY / 300, 1);

  const orbitProgress = (() => {
    const el = orbitSectionRef.current;
    if (!el) return 0;
    const local = scrollY - el.offsetTop;
    return Math.min(Math.max(local / (window.innerHeight * 1.5), 0), 1);
  })();

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const ringProg  = (t) => clamp01((orbitProgress - (t - 0.06)) / 0.12);
  const iconProg  = (t) => clamp01((orbitProgress - t)          / 0.10);

  return (
    <PageWrapper background={{ color: "#0A0A27", image: bg, size: "1280px 1080px", gradient }}>

      {/* ── Hero ── */}
      <div className={styles.scrollSpace}>
        <div className={styles.title}>
          <h1>{t("home.introducing")}</h1>
          <div className={styles.nameWrapper}>
            <h1 className={styles.astra} style={{ opacity: 1 - heroProgress }}>
              A.S.T.R.A
            </h1>
            <h1 className={styles.fullName} style={{ opacity: heroProgress }}>
              Adaptive Synthetic Therapeutics
              <br />
              for Remote and Astro Environments
            </h1>
          </div>
        </div>
      </div>

      {/* ── Tagline ── */}
      <div className={styles.tagline}>
        <p>On-demand medicine. Anywhere.</p>
      </div>

      {/* ── Orbit diagram ── */}
      <div className={styles.orbitSection} ref={orbitSectionRef}>
        <div className={styles.orbitSticky}>

          <p className={styles.orbitText}>
            Astronauts require reliable access to essential resources,{" "}
            <span className={styles.medicineEmphasis}>including medicine.</span>
          </p>

          <div className={styles.orbitDiagram}>

            {/* Central orb */}
            <div className={styles.centerOrb} />

            {ORBITS.map(({ key, emoji, label, r, angle, threshold, highlight }) => {
              const rp = ringProg(threshold);
              const ip = iconProg(threshold);
              const { x, y } = orbitPos(r, angle);

              return (
                <Fragment key={key}>
                  {/* Ring wrapper: scroll-driven scale + opacity */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: r * 2,
                      height: r * 2,
                      opacity: rp,
                      transform: `translate(-50%, -50%) scale(${0.25 + 0.75 * rp})`,
                    }}
                  >
                    {/* Inner ring: continuous slow rotation */}
                    <div className={`${styles.orbitRing} ${highlight ? styles.medicineRing : ""}`} />
                  </div>

                  {/* Icon */}
                  <div
                    className={`${styles.orbitIcon} ${highlight ? styles.medicineIcon : ""}`}
                    style={{
                      opacity: ip,
                      transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                    }}
                  >
                    <span>{emoji}</span>
                    <small>{label}</small>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Planets / phrases ── */}
      <PlanetsSection scrollY={scrollY} />

      {/* ── ASTRA reveal ── */}
      <AstraRevealSection scrollY={scrollY} />

      {/* ── Briefing: context / problem / solution ── */}
      <BriefingSection scrollY={scrollY} />

      {/* ── Scenarios ── */}
      <ScenarioSection scrollY={scrollY} />

      {/* ── Nanobody ── */}
      <NanobodySection scrollY={scrollY} />

      {/* ── Capabilities ── */}
      <CapabilitiesSection scrollY={scrollY} />

      {/* ── Navigation cards ── */}
      <NavigationCards />

    </PageWrapper>
  );
}
