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
const Protocols = lazyWithPreload(() => import("./pages/Protocols/Protocols"));
const HumanIntegratedPractices = lazyWithPreload(() =>
  import("./pages/HumanIntegratedPractices/HumanIntegratedPractices")
);
const Hardware = lazyWithPreload(() => import("./pages/Hardware/Hardware"));
const Notebook = lazyWithPreload(() => import("./pages/Notebook/Notebook"));
const Stub = lazyWithPreload(() => import("./pages/Stub/Stub"));
const Model = lazyWithPreload(() => import("./pages/Model/Model"));
const BioreactorModeling = lazyWithPreload(() => import("./pages/BioreactorModeling/BioreactorModeling"));
const DryLabOverview = lazyWithPreload(() => import("./pages/DryLabOverview/DryLabOverview"));

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
  { name: "Home", title: "Home", path: "/", component: Home },
  {
    name: "Project",
    folder: [
      { name: "Description", title: "Description", path: "/project", component: Stub },
      { name: "Safety", title: "Safety", path: "/safety", component: Stub },
      { name: "Contribution", title: "Contribution", path: "/contribution", component: Stub },
    ],
  },
  {
    name: "Wet Lab",
    folder: [
      { name: "Design", title: "Design", path: "/design", component: ProteinLibrary },
      { name: "Notebook", title: "Notebook", path: "/notebook", component: Notebook },
      { name: "Experiments (Protocols)", title: "Experiments (Protocols)", path: "/experiments", component: Protocols },
      { name: "Results", title: "Results", path: "/results", component: Stub },
      { name: "Proposed Implementation", title: "Proposed Implementation", path: "/proposed-implementation", component: Stub },
      { name: "Proof of Concept", title: "Proof of Concept", path: "/proof-of-concept", component: Stub },
    ],
  },
  {
    name: "Engineering",
    folder: [
      { name: "Engineering Success", title: "Engineering Success", path: "/engineering-success", component: Stub },
      { name: "Parts", title: "Parts", path: "/parts", component: Stub },
      { name: "Hardware", title: "Hardware", path: "/hardware", component: Hardware },
    ],
  },
  {
    name: "Dry Lab",
    folder: [
      // Bioreactor Modeling now lives at the nav's "Modeling" slot — see the
      // Awards section below for where the previous occupant (Model, the
      // data-heavy candidate-mining page) moved to instead. /bioreactor-modeling
      // itself is kept working (hidden route at the bottom of this file) so
      // any existing links to it don't break.
      { name: "Overview", title: "Dry Lab Overview", path: "/dry-lab-overview", component: DryLabOverview },
      { name: "Modeling", title: "Bioreactor Modeling", path: "/modeling", component: BioreactorModeling },
      { name: "Protein Mining", title: "Protein Mining", path: "/protein-mining", component: Stub },
      // Same page/component/path as Awards → Software below — Model's
      // candidate-mining content is genuinely Dry Lab work, so it's linked
      // from both nav locations. getPathMapping() keys by path, so this
      // doesn't create a duplicate route, just a second nav entry to it.
      { name: "Software", title: "Software", path: "/software", component: Model },
    ],
  },
  {
    name: "Beyond the Lab",
    folder: [
      {
        name: "Human Integrated Practices",
        title: "Human Integrated Practices",
        path: "/human-integrated-practices",
        component: HumanIntegratedPractices,
      },
      { name: "Education", title: "Education", path: "/education", component: Education },
      { name: "Science Communication", title: "Science Communication", path: "/science-communication", component: ScienceCommunication },
    ],
  },
  {
    name: "Team",
    folder: [
      { name: "Members", title: "Members", path: "/roster", component: Roster },
      { name: "Attributions", title: "Attributions", path: "/attributions", component: Attributions },
      { name: "Sponsors", title: "Sponsors", path: "/sponsors", component: Sponsors },
      { name: "Inclusivity", title: "Inclusivity", path: "/inclusivity", component: Stub },
      { name: "Collaborations", title: "Collaborations", path: "/collaborations", component: Stub },
    ],
  },
  {
    // Standard award/medal URLs required by requirements.md §4, not covered
    // by pages.md's categories above. Most render the shared "coming soon"
    // Stub until real content exists — the paths themselves are what's
    // required to resolve, not the content yet. Software is the exception:
    // it's what used to be at /modeling (see the Dry Lab section above) —
    // that page's actual substance (candidate mining/scoring pipeline,
    // Explorer tool, etc.) is a software deliverable, so it now lives at
    // this standard URL instead of behind a nav path nobody judging the
    // Software award would think to check.
    name: "Awards",
    folder: [
      { name: "Engineering", title: "Engineering", path: "/engineering", component: Stub },
      { name: "Entrepreneurship", title: "Entrepreneurship", path: "/entrepreneurship", component: Stub },
      { name: "Measurement", title: "Measurement", path: "/measurement", component: Stub },
      { name: "Model", title: "Model", path: "/model", component: Stub },
      { name: "Plant Synthetic Biology", title: "Plant Synthetic Biology", path: "/plant", component: Stub },
      { name: "Safety & Security", title: "Safety & Security", path: "/safety-and-security", component: Stub },
      { name: "Software", title: "Software", path: "/software", component: Model },
      { name: "Sustainable Development", title: "Sustainable Development", path: "/sustainability", component: Stub },
    ],
  },
  // Pre-existing sectioned pages, superseded in the nav by the categories
  // above but left routable at their old URLs — see file header comment.
  { name: "Wet Lab (overview)", title: "Wet Lab", path: "/wetlab", component: WetLab, hidden: true },
  { name: "Dry Lab (overview)", title: "Dry Lab", path: "/drylab", component: DryLab, hidden: true },
  { name: "Human Practices (overview)", title: "Human Practices", path: "/human-practices", component: HumanPractices, hidden: true },
  { name: "Engagement", title: "Engagement", path: "/engagement", component: Engagement, hidden: true },
  // Bioreactor Modeling's old URL, from before it took over the "Modeling"
  // nav slot at /modeling — kept resolving to the same component so any
  // existing links to it don't break.
  { name: "Bioreactor Modeling (old URL)", title: "Bioreactor Modeling", path: "/bioreactor-modeling", component: BioreactorModeling, hidden: true },
];

export default Pages;
