import fs from "fs";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";

// throwOnError: false — a typo'd formula should degrade to visible raw
// LaTeX in the built page, not fail the whole site build.
marked.use(markedKatex({ throwOnError: false }));

export default function markdownSections() {
    return {
        name: "markdown-sections",
        transform(code, id) {
            if (!id.endsWith(".md")) return null;
            if (!id.includes("/content/")) return null;

            const raw = fs.readFileSync(id, "utf-8");
            const lines = raw.split("\n");
            const sections = [];
            let current = null;

            for (const line of lines) {
                if (line.startsWith("## ")) {
                    if (current) sections.push(current);
                    current = { title: line.replace("## ", "").trim(), body: "" };
                } else if (current) {
                    current.body += line + "\n";
                }
            }
            if (current) sections.push(current);

            const parsed = sections.map((s) => ({
                title: s.title,
                html: marked(s.body.trim()),
            }));

            return {
                code: `export default ${JSON.stringify(parsed)};`,
                map: null,
            };
        },
    };
}