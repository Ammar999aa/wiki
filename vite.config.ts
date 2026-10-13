import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownSections from "./plugins/markdown-sections.js";
import sitemap from "./plugins/sitemap.js";

// Hardcoded rather than derived from VITE_TEAM_NAME: a GitLab CI/CD variable
// outside this repo's control overrides the committed .env value at build
// time (Vite's loadEnv lets process.env win over .env files), which silently
// baked the wrong base path into the deployed build. Team slug is a fixed
// fact about this deployment, not something that needs to be configurable —
// hardcoding it removes that failure mode entirely.
export default defineConfig({
  base: "/kaust-ksa/",
  plugins: [react(), markdownSections(), sitemap()],
});
