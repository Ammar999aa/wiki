import { lazy } from "react";

// lazy() alone gives React a component that suspends until its chunk
// arrives, but no way to kick that fetch off ahead of time — App.jsx's
// route-transition effect needs exactly that (preload the target route,
// *then* start the View Transition) so the crossfade animates between two
// fully-rendered pages instead of old-page → blank Suspense fallback,
// with the real content popping in untransitioned afterward once its
// chunk finally lands. `.preload` re-invokes the same dynamic import()
// factory; ES module imports of the same specifier are cache-deduped by
// the engine, so this doesn't re-fetch anything lazy() would already have
// triggered, and vice versa — whichever call happens first does the one
// real fetch.
function lazyWithPreload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}

// Lazy (route-level code-split) rather than static imports: every page used
// to be bundled into one shared chunk, so visiting Home also downloaded and
// parsed Model's ~1850-line data-heavy page, Roster's honeycomb layout
// engine, ProteinLibrary, etc. — everything, on every route. Each of these
// now ships as its own chunk fetched only when its route is actually
// visited; <App>'s <Suspense> boundary covers the gap. `pages.js` staying
// the single source of truth for routing + nav (see the block comment
// below) isn't affected — `component` is still just a component reference,
// lazyWithPreload() returns one Suspense can render the same way lazy() did.
const Home = lazyWithPreload(() => import("./pages/Home/Home"));
const Roster = lazyWithPreload(() => import("./pages/Roster/Roster"));
const Attributions = lazyWithPreload(() => import("./pages/Attributions/Attributions"));
const Sponsors = lazyWithPreload(() => import("./pages/Sponsors/Sponsors"));
const WetLab = lazyWithPreload(() => import("./pages/WetLab/WetLab"));
const DryLab = lazyWithPreload(() => import("./pages/DryLab/DryLab"));
const HumanPractices = lazyWithPreload(() => import("./pages/HumanPractices/HumanPractices"));
const Engagement = lazyWithPreload(() => import("./pages/Engagement/Engagement"));
const Education = lazyWithPreload(() => import("./pages/Education/Education"));
const ScienceCommunication = lazyWithPreload(() => import("./pages/ScienceCommunication/ScienceCommunication"));
const ProteinLibrary = lazyWithPreload(() => import("./pages/ProteinLibrary/ProteinLibrary"));
const ProjectDescription = lazyWithPreload(() => import("./pages/ProjectDescription/ProjectDescription"));
const WetLabDesign = lazyWithPreload(() => import("./pages/WetLabDesign/WetLabDesign"));
const Protocols = lazyWithPreload(() => import("./pages/Protocols/Protocols"));
const HumanIntegratedPractices = lazyWithPreload(() =>
  import("./pages/HumanIntegratedPractices/HumanIntegratedPractices")
);
const Hardware = lazyWithPreload(() => import("./pages/Hardware/Hardware"));
const EngineeringSuccess = lazyWithPreload(() => import("./pages/EngineeringSuccess/EngineeringSuccess"));
const Notebook = lazyWithPreload(() => import("./pages/Notebook/Notebook"));
const Inclusivity = lazyWithPreload(() => import("./pages/Inclusivity/Inclusivity"));
const Stub = lazyWithPreload(() => import("./pages/Stub/Stub"));
const Model = lazyWithPreload(() => import("./pages/Model/Model"));
const DryLabModeling = lazyWithPreload(() => import("./pages/DryLabModeling/DryLabModeling"));
const Safety = lazyWithPreload(() => import("./pages/Safety/Safety"));
const Contribution = lazyWithPreload(() => import("./pages/Contribution/Contribution"));
const Judging = lazyWithPreload(() => import("./pages/Judging/Judging"));
const Parts = lazyWithPreload(() => import("./pages/Parts/Parts"));
const Results = lazyWithPreload(() => import("./pages/Results/Results"));
const ProofOfConcept = lazyWithPreload(() => import("./pages/ProofOfConcept/ProofOfConcept"));
const ExampleArticle = lazyWithPreload(() => import("./pages/ExampleArticle/ExampleArticle"));

// Optional `description` on a page: the search-result / link-preview
// snippet App.jsx sets for that route (falls back to index.html's site-wide
// one). Keep it to text already on the page — it's a summary, not new copy.
//
// Single source of truth for routing + nav: App.jsx turns this into <Routes>,
// Menu.jsx turns it into the nav bar. Add a page here and both update — this
// is what replaces the old App.jsx/Menu.jsx duplicate route lists (the thing
// that caused the /Roster vs /roster mismatch before).
//
// Categories below follow pages.md verbatim. A few pre-existing pages
// (Wet Lab, Dry Lab, Human Practices, Engagement) predate that structure and
// each bundle several of pages.md's now-separate subpages into one sectioned
// article — rather than guess how to split their real, already-written
// content across the new pages, they're kept exactly as-is and reachable at
// their old URLs (`hidden: true` — routed, just not linked from the nav).
// pages.md's actual subpages are added alongside as their own pages, most
// still `Stub` until content is written.
const Pages = [
  {
    name: "Home",
    title: "Home",
    path: "/",
    component: Home,
    description:
      "SHIHAB (شهاب, Arabic for 'shooting star') is the KAUST-KSA iGEM 2026 project: resilient microbial chassis for on-demand biomanufacturing of therapeutic proteins in space.",
  },
  {
    name: "Project",
    folder: [
      // The protein payload library used to be Wet Lab → Design, then sat
      // at /project as the stand-in Description. Now that the real project
      // description exists (ProjectDescription, from
      // src/content/en/project-description.md), the library is its own page
      // right after it, linked from the description's payload-library card.
      // src/content/en/project.md is left in the repo but is no longer
      // rendered by any route — it was placeholder text plus an unfinished
      // Pectin Hydrogel section.
      {
        name: "Description",
        title: "Description",
        path: "/project",
        component: ProjectDescription,
        description: "How SHIHAB engineers medical autonomy for deep-space missions — the full scientific rationale.",
      },
      { name: "Protein Library", title: "Protein Library", path: "/protein-library", component: ProteinLibrary },
      { name: "Safety", title: "Safety", path: "/safety-and-security", component: Safety },
      { name: "Contribution", title: "Contribution", path: "/contribution", component: Contribution },
      {
        name: "Engineering Success",
        title: "Engineering Success",
        path: "/engineering",
        component: EngineeringSuccess,
        description:
          "SHIHAB engineering cycles: Design–Build–Test–Learn across the bioreactor, purification hardware, wet lab constructs and metabolic models.",
      },
    ],
  },
  {
    name: "Wet Lab",
    folder: [
      {
        name: "Design",
        title: "Design",
        path: "/design",
        component: WetLabDesign,
        description: "SHIHAB wet lab: strain engineering, assays, and protein expression.",
      },
      { name: "Notebook", title: "Notebook", path: "/notebook", component: Notebook },
      { name: "Parts", title: "Parts", path: "/parts", component: Parts },
      { name: "Experiments (Protocols)", title: "Experiments (Protocols)", path: "/experiments", component: Protocols },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: Results,
        description:
          "SHIHAB wet lab results: Dsup integration across three chassis, radiation resistance, and payload protein expression and purification.",
      },
      { name: "Measurement", title: "Measurement", path: "/measurement", component: Stub },
      {
        name: "Proof of Concept",
        title: "Proof of Concept",
        path: "/proof-of-concept",
        component: ProofOfConcept,
        description:
          "SHIHAB proof of concept: engineered microbial chassis, a compact bioreactor, downstream purification components and a computational screen for stress-resistance proteins.",
      },
    ],
  },
  {
    name: "Hardware",
    title: "Hardware",
    path: "/hardware",
    component: Hardware,
    description: "SHIHAB hardware: the bioreactor stand, electronics, and physical build.",
  },
  {
    name: "Dry Lab",
    folder: [
      {
        name: "Modeling",
        title: "Modeling",
        path: "/model",
        component: DryLabModeling,
        description: "SHIHAB dry lab modeling: flux balance analysis of three chassis and a cyanobacterial partner.",
      },
      // Model's candidate-mining content is a software deliverable, so it
      // lives at iGEM's standard /software URL.
      { name: "Software", title: "Software", path: "/software", component: Model },
    ],
  },
  {
    name: "Beyond the Lab",
    folder: [
      {
        name: "Integrated Human Practices",
        title: "Integrated Human Practices",
        path: "/human-practices",
        component: HumanIntegratedPractices,
      },
      { name: "Education", title: "Education", path: "/education", component: Education },
      { name: "Science Communication", title: "Science Communication", path: "/science-communication", component: ScienceCommunication },
    ],
  },
  {
    name: "Team",
    folder: [
      {
        name: "Members",
        title: "Members",
        path: "/roster",
        component: Roster,
        description: "Meet the KAUST-KSA iGEM 2026 team behind SHIHAB.",
      },
      { name: "Attributions", title: "Attributions", path: "/attributions", component: Attributions },
      { name: "Sponsors", title: "Sponsors", path: "/sponsors", component: Sponsors },
      { name: "Inclusivity", title: "Inclusivity", path: "/inclusivity", component: Inclusivity },
      { name: "Collaborations", title: "Collaborations", path: "/collaborations", component: Stub },
    ],
  },
  // Medal criteria checklist for judges (Bronze/Silver/Gold), from the
  // team's judging page draft — src/pages/Judging/Judging.jsx. Formerly the
  // "Awards" dropdown; Judging was its only remaining entry.
  { name: "Judging", title: "Judging", path: "/judging", component: Judging },
  // Standard iGEM award URLs, taken out of the nav but kept routable
  // (shared "coming soon" Stub) so the standard paths still resolve.
  // Pages that already exist live at their required URL in the nav
  // (/engineering, /human-practices, /model, /safety-and-security,
  // /software, /contribution, /education, /hardware, /inclusivity,
  // /measurement).
  // No longer in the nav, but Integrated Human Practices still links here
  // ("See long-term roadmap"), so the URL has to keep resolving.
  { name: "Proposed Implementation", title: "Proposed Implementation", path: "/proposed-implementation", component: Stub, hidden: true },
  { name: "Entrepreneurship", title: "Entrepreneurship", path: "/entrepreneurship", component: Stub, hidden: true },
  { name: "Plant Synthetic Biology", title: "Plant Synthetic Biology", path: "/plant", component: Stub, hidden: true },
  { name: "Sustainable Development", title: "Sustainable Development", path: "/sustainability", component: Stub, hidden: true },
  // Pre-existing sectioned pages, superseded in the nav by the categories
  // above but left routable at their old URLs — see file header comment.
  { name: "Wet Lab (overview)", title: "Wet Lab", path: "/wetlab", component: WetLab, hidden: true },
  { name: "Dry Lab (overview)", title: "Dry Lab", path: "/drylab", component: DryLab, hidden: true },
  { name: "Human Practices (overview)", title: "Human Practices", path: "/human-practices-overview", component: HumanPractices, hidden: true },
  { name: "Engagement", title: "Engagement", path: "/engagement", component: Engagement, hidden: true },
  // Old URLs from before the paths were aligned with iGEM's required award
  // URLs (/engineering, /human-practices, /model, /safety-and-security).
  // Kept routable so existing links work; App.jsx's canonical tag points
  // each at the first path above that renders the same component.
  { name: "Engineering Success (old URL)", title: "Engineering Success", path: "/engineering-success", component: EngineeringSuccess, hidden: true },
  { name: "Integrated Human Practices (old URL)", title: "Integrated Human Practices", path: "/human-integrated-practices", component: HumanIntegratedPractices, hidden: true },
  { name: "Modeling (old URL)", title: "Modeling", path: "/modeling", component: DryLabModeling, hidden: true },
  { name: "Safety (old URL)", title: "Safety", path: "/safety", component: Safety, hidden: true },
  // Dry Lab Overview's old URL, from before it became the Modeling page.
  { name: "Dry Lab Overview (old URL)", title: "Modeling", path: "/dry-lab-overview", component: DryLabModeling, hidden: true },
  // Authoring reference for the team: a fictional article applying every
  // wiki authoring convention, annotated. Not wiki content — remove
  // before the wiki freeze.
  { name: "Example Article", title: "Example Article", path: "/example-article", component: ExampleArticle, hidden: true },
];

export default Pages;

// For plugins/sitemap.js, which leaves "coming soon" Stub routes out of the
// sitemap (Stub itself marks them noindex at runtime).
export { Stub };
