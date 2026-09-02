import Home from "./pages/Home/Home";
import Roster from "./pages/Roster/Roster";
import Attributions from "./pages/Attributions/Attributions";
import Sponsors from "./pages/Sponsors/Sponsors";
import WetLab from "./pages/WetLab/WetLab";
import DryLab from "./pages/DryLab/DryLab";
import HumanPractices from "./pages/HumanPractices/HumanPractices";
import Engagement from "./pages/Engagement/Engagement";
import Education from "./pages/Education/Education";
import ProteinLibrary from "./pages/ProteinLibrary/ProteinLibrary";
import HumanIntegratedPractices from "./pages/HumanIntegratedPractices/HumanIntegratedPractices";
import Hardware from "./pages/Hardware/Hardware";
import Notebook from "./pages/Notebook/Notebook";
import Notebook2 from "./pages/Notebook2/Notebook2";
import Stub from "./pages/Stub/Stub";

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
      { name: "Experiments (Protocols)", title: "Experiments (Protocols)", path: "/experiments", component: Stub },
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
      { name: "Modeling", title: "Modeling", path: "/modeling", component: Stub },
      { name: "Protein Mining", title: "Protein Mining", path: "/protein-mining", component: Stub },
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
      { name: "Science Communication", title: "Science Communication", path: "/science-communication", component: Stub },
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
    // by pages.md's categories above. All render the shared "coming soon"
    // Stub until real content exists — the paths themselves are what's
    // required to resolve, not the content yet.
    name: "Awards",
    folder: [
      { name: "Engineering", title: "Engineering", path: "/engineering", component: Stub },
      { name: "Entrepreneurship", title: "Entrepreneurship", path: "/entrepreneurship", component: Stub },
      { name: "Measurement", title: "Measurement", path: "/measurement", component: Stub },
      { name: "Model", title: "Model", path: "/model", component: Stub },
      { name: "Plant Synthetic Biology", title: "Plant Synthetic Biology", path: "/plant", component: Stub },
      { name: "Safety & Security", title: "Safety & Security", path: "/safety-and-security", component: Stub },
      { name: "Software", title: "Software", path: "/software", component: Stub },
      { name: "Sustainable Development", title: "Sustainable Development", path: "/sustainability", component: Stub },
    ],
  },
  // Pre-existing sectioned pages, superseded in the nav by the categories
  // above but left routable at their old URLs — see file header comment.
  // Notebook (one-scroll) is a comparison copy of /notebook using the
  // original continuous-scroll SectionedArticle layout instead of the
  // pills/tabs redesign — same content (src/content/en/notebook.md).
  { name: "Notebook (one-scroll)", title: "Notebook", path: "/notebook2", component: Notebook2, hidden: true },
  { name: "Wet Lab (overview)", title: "Wet Lab", path: "/wetlab", component: WetLab, hidden: true },
  { name: "Dry Lab (overview)", title: "Dry Lab", path: "/drylab", component: DryLab, hidden: true },
  { name: "Human Practices (overview)", title: "Human Practices", path: "/human-practices", component: HumanPractices, hidden: true },
  { name: "Engagement", title: "Engagement", path: "/engagement", component: Engagement, hidden: true },
];

export default Pages;
