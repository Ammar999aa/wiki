import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// Emits sitemap.xml into the build, listing every routed page from
// src/pages.js except hidden ones (old URLs kept working for existing links,
// superseded in the nav) and "coming soon" Stub pages. As the team replaces a
// Stub with real content, it joins the sitemap on the next build.
//
// The sitemap lives at /kaust-ksa/sitemap.xml, but iGEM owns the domain's
// root robots.txt, so crawlers won't find it on their own — submit it in
// Google Search Console.
export default function sitemap() {
  return {
    name: "sitemap",
    apply: "build",
    async generateBundle() {
      // pages.js only *defines* lazy() imports, it never runs them, so it
      // loads fine in Node without pulling in any page component.
      const { default: pages, Stub } = await import(pathToFileURL(resolve("src/pages.js")).href);
      const { SITE_URL } = await import(pathToFileURL(resolve("src/site.js")).href);

      const entries = pages.flatMap((item) => item.folder ?? [item]);
      const paths = [
        ...new Set(entries.filter((p) => p.path && !p.hidden && p.component !== Stub).map((p) => p.path)),
      ];

      const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}
