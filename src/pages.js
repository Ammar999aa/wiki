import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";
import Roster from "./pages/Roster/Roster";
import Attributions from "./pages/Attributions/Attributions";
import WetLab from "./pages/WetLab/WetLab";
import DryLab from "./pages/DryLab/DryLab";
import HumanPractices from "./pages/HumanPractices/HumanPractices";
import Safety from "./pages/Safety/Safety";
import Engagement from "./pages/Engagement/Engagement";
import Stub from "./pages/Stub/Stub";

// Single source of truth for routing + nav: App.jsx turns this into <Routes>,
// Menu.jsx turns it into the nav bar. Add a page here and both update — this
// is what replaces the old App.jsx/Menu.jsx duplicate route lists (the thing
// that caused the /Roster vs /roster mismatch before).
const Pages = [
  { name: "Home", title: "Home", path: "/", component: Home },
  { name: "Project", title: "Project", path: "/project", component: Project },
  { name: "Wet Lab", title: "Wet Lab", path: "/wetlab", component: WetLab },
  { name: "Dry Lab", title: "Dry Lab", path: "/drylab", component: DryLab },
  { name: "Human Practices", title: "Human Practices", path: "/human-practices", component: HumanPractices },
  {
    name: "Team",
    folder: [
      { name: "Roster", title: "Roster", path: "/roster", component: Roster },
      { name: "Attributions", title: "Attributions", path: "/attributions", component: Attributions },
    ],
  },
  { name: "Safety", title: "Safety", path: "/safety", component: Safety },
  { name: "Engagement", title: "Engagement", path: "/engagement", component: Engagement },
  {
    // Standard award/medal URLs required by requirements.md §4. All currently
    // render the shared "coming soon" Stub until real content exists — the
    // paths themselves are what's required to resolve, not the content yet.
    name: "Awards",
    folder: [
      { name: "Contribution", title: "Contribution", path: "/contribution", component: Stub },
      { name: "Engineering", title: "Engineering", path: "/engineering", component: Stub },
      { name: "Education", title: "Education", path: "/education", component: Stub },
      { name: "Entrepreneurship", title: "Entrepreneurship", path: "/entrepreneurship", component: Stub },
      { name: "Hardware", title: "Hardware", path: "/hardware", component: Stub },
      { name: "Inclusivity", title: "Inclusivity", path: "/inclusivity", component: Stub },
      { name: "Measurement", title: "Measurement", path: "/measurement", component: Stub },
      { name: "Model", title: "Model", path: "/model", component: Stub },
      { name: "Plant Synthetic Biology", title: "Plant Synthetic Biology", path: "/plant", component: Stub },
      { name: "Safety & Security", title: "Safety & Security", path: "/safety-and-security", component: Stub },
      { name: "Software", title: "Software", path: "/software", component: Stub },
      { name: "Sustainable Development", title: "Sustainable Development", path: "/sustainability", component: Stub },
    ],
  },
];

export default Pages;
