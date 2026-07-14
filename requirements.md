Your wiki is how the world — judges, future iGEM teams, and the wider community — will read your project years from now. The rules below exist for four reasons: so your work is preserved, so it is reproducible, so it is legally reusable, and so judges can find what they need to evaluate.

Meeting these requirements is what keeps your team eligible for medals and prizes. Failing them — accidentally or not — can make your team ineligible for them.

1.Everything lives on iGEM servers
Your wiki must still be readable in 2036. That only works if every asset it depends on is hosted by iGEM. External servers go offline, domains expire, CDNs change pricing — and your project disappears with them. Anything served from outside igem.org / igem.wiki / static.igem.wiki is not preserved.

HTML and source code — committed to your team Wiki repository on iGEM's GitLab.
Images, documents, fonts, and other static assets — uploaded to iGEM's CDN via Uploads.
Videos and audios — uploaded to iGEM Video Universe and embedded from there.
External requests at runtime (fetch, XHR, web fonts, analytics scripts, AI-API calls) only to igem.org and igem.wiki domains.
Linking to external sources is a different matter — and is encouraged. Citing a Zenodo dataset, a peer-reviewed paper, a public preprint, a GitHub repository for an upstream library, or another team's wiki is part of good scholarship. The rule above is about hosted content and runtime dependencies, not about outbound links.

iframes
iframes may only embed content already hosted on iGEM infrastructure. Embedding YouTube videos, Google Drive documents, or third-party dashboards as the substantive content of your wiki is not permitted. Use the External Content Check tool before the Wiki Freeze.
2.Your wiki is built from source, not uploaded as files
Anyone in the future should be able to clone your repository, run the build, and get back your wiki. That means:
The wiki is generated from source by CI/CD. Your repository must contain a working .gitlab-ci.yml that builds the site on every push to main.
Don't commit pre-generated output. No hand-uploaded compiled HTML, CSS, or JavaScript. The source must produce the output.
Pinned dependencies. Commit your lockfile (package-lock.json, yarn.lock, requirements.txt, uv.lock, etc.) so the build is deterministic.

3.Licensing and attribution
Your wiki content must be reusable by future iGEM teams and the community. That requires explicit licensing for what you produce, and compatible licensing for anything you bring in.

Team-authored content is released under Creative Commons Attribution 4.0. This applies to your text, your figures, your photos. The license link must appear in your wiki footer, and the LICENSE file at the repository root must not be modified or deleted.
Third-party assets (images, fonts, icons, illustrations, stock footage) are allowed only if they are licensed for reuse, redistribution, and modification — open-source licenses, Creative Commons (CC0, CC-BY, CC-BY-SA), public domain.
Attribution is mandatory. Every third-party asset must credit its source and license, inline next to the asset.
No copyrighted material without a license. Logos of companies, journal figures (unless explicitly CC-licensed), stills from films, character art, song lyrics — none of these belong on your wiki without a written license.
A note on AI-generated images
Most current image-generation models do not produce work with a clear copyright status. For decorative AI-generated imagery on your wiki: release it under CC-BY 4.0 alongside the rest of your team's content, and credit the model used next to the image (e.g. "Generated with Stable Diffusion 3"). Section §6 below covers the broader expectations for sharing how your team used AI.
4.Judging pages are at predictable URLs
Judges evaluate hundreds of wikis in a short window. If your documentation for a medal criterion or special award lives at an unpredictable URL, judges may not find it — and you may not be evaluated for that award. Every wiki therefore exposes a set of Standard URL Pages at fixed paths.

Standard URLs for medals
Award Required URL path
Bronze #3 — Contribution 2026.igem.wiki/kaust-ksa/contribution
Silver #1 — Engineering Success 2026.igem.wiki/kaust-ksa/engineering
Silver #2 — Human Practices 2026.igem.wiki/kaust-ksa/human-practices
Gold — Select three special awards Use the standard pages of the awards you select (below).

Standard URLs for awards
Award Required URL path
Best Education 2026.igem.wiki/kaust-ksa/education
Best Entrepreneurship 2026.igem.wiki/kaust-ksa/entrepreneurship
Best Hardware 2026.igem.wiki/kaust-ksa/hardware
Inclusivity Award 2026.igem.wiki/kaust-ksa/inclusivity
Best Integrated Human Practices 2026.igem.wiki/kaust-ksa/human-practices
Best Measurement 2026.igem.wiki/kaust-ksa/measurement
Best Model 2026.igem.wiki/kaust-ksa/model
Best Plant Synthetic Biology 2026.igem.wiki/kaust-ksa/plant
Safety and Security Award 2026.igem.wiki/kaust-ksa/safety-and-security
Best Software Tool 2026.igem.wiki/kaust-ksa/software
Best Sustainable Development Impact 2026.igem.wiki/kaust-ksa/sustainability
The Best Software Tool prize also requires your source code on iGEM's GitLab — see the Software deliverable.

Awards judged without a standard page
Best Presentation — evaluated from your team presentation video.
Best Wiki — evaluated across your entire wiki.
Village Awards — evaluated across the full body of work, not a specific page.
Part Prizes (Best New Basic Part, Best New Composite Part, Best New Improved Part, Best Part Collection) — judged from the documentation in the Registry.
Your wiki footer must include a visible link to your team's GitLab repository (gitlab.igem.org/2026/kaust-ksa) so that judges and future teams can find the source.

5.Authorship and integrity
The wiki is a scientific record. Your team is accountable for every claim, citation, figure, and line of code published under your team name — regardless of how it was produced or who produced it.

Citations must be real and accurately represent the source. Every cited work must resolve to a real reference — DOI, registry part number, arXiv ID, ISBN, or a stable URL — and the cited claim must actually appear in that source. Fabricated, garbled, or hallucinated citations are a disqualifying violation of academic integrity.
Data figures must represent real data your team produced or sourced. Plots, gel images, microscopy, flow cytometry plots, chromatograms, model outputs — anything that purports to show experimental or computational evidence — must come from real experiments or documented computations. AI-generated, AI-modified, or AI-"cleaned" evidentiary figures are not allowed under any circumstances.
Quote and interview attribution must be accurate. If you quote a stakeholder, an expert, or a teammate, the quote must be what the person actually said. Invented quotes — including AI-generated "representative" quotes — are not allowed.
Plagiarism is disqualifying. Copying text, images, designs, or code from another team, the literature, or a generative model without attribution is plagiarism whether or not a search engine catches it.
You are responsible for what you publish. Review what you publish. If you cannot defend a claim, a number, or a figure to a judge, do not put it on your wiki.
What this looks like in practice
A team that publishes a plausible-looking but fabricated reference list, an AI-generated "representative" gel image, or a dashboard of numbers that do not correspond to any real experiment has misrepresented their work — even if no individual member intended to. Build a review step into your wiki workflow so this does not happen accidentally.
6.Responsible AI Usage
Generative AI is part of how teams work in 2026, and we don't ask you to avoid it. We do ask that you use it responsibly and with critical thinking about everything you publish under your team's name. Used well, AI helps you communicate your science more clearly. Used carelessly, it produces wikis that look polished but are hollow, inaccurate, or not really yours.

The line we're drawing is about what AI is for (not exhaustive):

Acceptable uses — polishing wording, fixing grammar and typos, translating between languages, suggesting structure or headings, drafting alt text, writing build and infrastructure code, generating decorative illustrations.
Not acceptable — having a model author the substance of your wiki. The reasoning, the choices about what your project did and why it matters, the descriptions of your experiments and your human practices work — these should be in your team's voice and reflect your team's thinking, not a model's.
Never acceptable — using AI to generate scientific claims, data figures, gel images, microscopy, plots, simulated experimental results, or citations. This is research misconduct, not a wiki violation, and it disqualifies your team.
A useful test: did your team write the substance and then ask AI to improve it, or did you ask AI to write the substance and then edit what it produced? The first is fine. The second isn't the wiki the deliverable is asking for, even if every paragraph looks plausible.

Include a section covering:

Which models you used — name and version where applicable (e.g. Claude Opus 4.7, GPT-4, Gemini 2.5 Pro, Stable Diffusion 3, Midjourney v7, your own fine-tuned model).
What you used them for — language polish, translation, alt text, decorative imagery, build code, data analysis, and so on. Anything innovative or unusual? Describe it — that is exactly the kind of thing the next generation of teams will want to read.
How you reviewed the output — who on the team verified factual claims, checked citations, validated code, and signed off. A one-line summary per use is fine; the point is that someone human-checked the output.
Judges value honest, well-reviewed AI use more than impressive-sounding claims of doing everything by hand — but they can tell the difference between a wiki polished by AI and a wiki written by AI.
