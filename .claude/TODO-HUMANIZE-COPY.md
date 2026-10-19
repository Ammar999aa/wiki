# TODO — humanize the masthead deck sentences

When the UI/UX audit findings "No shared masthead" and "Title doesn't
confirm the nav label" were fixed, every archetype-2 page that previously
opened cold got a one-sentence `deck` under its eyebrow (see
`src/components/SectionedArticle/Masthead/Masthead.jsx`). Those deck
sentences are **newly written prose, drafted by Claude Code** — not copied
verbatim from the page's own existing paragraphs, though every claim in
them is sourced from content already present elsewhere on that same page
(see the conversation this came from for the paragraph-by-paragraph trace).

Per `.claude/RESPONSIBLE_AI_USE.md` ("keep a human in the loop: review and
understand AI-generated text... before committing it"), a team member
should read each of these, rewrite them in the team's own voice where
needed, and remove this note once done. Each spot is marked in-code with a
`// TODO(humanize):` comment (a JS comment, not rendered to the page) right
above the `deck={...}` prop:

- [ ] `src/pages/Safety/Safety.jsx`
- [x] `src/pages/DryLabModeling/DryLabModeling.jsx` (replaced with the team's own deck from the Dry Lab write-up)
- [ ] `src/pages/HumanIntegratedPractices/HumanIntegratedPractices.jsx`
- [ ] `src/pages/Education/Education.jsx` (`educationIntro`)
- [ ] `src/pages/ScienceCommunication/ScienceCommunication.jsx`

Two are closer to synthesis than paraphrase and are worth a closer look
first: Human Integrated Practices' second clause ("how should that shape
who we build with and what we build for them?") and Education's combined
sentence (it merges the page's opening paragraph with program names
introduced later in the page).

Delete this file once all seven are reviewed.
