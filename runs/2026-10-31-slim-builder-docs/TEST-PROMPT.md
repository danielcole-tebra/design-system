# Eight-question retrieval test

Read-only test. Do not write, edit, commit, or push anything. Do not use Figma, MCP tools, or the web.

You are a Figma builder agent newly assigned to Tebra's design system. You have never worked on it. Your only knowledge source is these four files at C:\Code\design-system:

AGENTS.md, LIBRARY.md, COMPOSITIONS.md, OPEN-ISSUES.md

Start with AGENTS.md and follow its pointers, but stay inside those four files. Do not open logs, history, archives, test reports, code, JSON, or other files. Answer only from what the supplied docs say.

A designer has sent you eight requests. For each one, do NOT build anything. Write what you would do before building: the concrete values, tokens, components or variants you'd use, anything you'd flag (and with which marker), and anything you'd stop and ask the designer about. Cite the doc file and section or flag id for each claim. If the docs don't answer something, say so plainly rather than filling in from general MUI or design knowledge; if you do fall back on general knowledge, label it as such.

1. The standard (default colour) Icon button needs its hover state. What background colour and token?
2. A clickable filled primary Chip needs a visible hover state. What colour should it go to on hover?
3. I'm building a confirmation dialog. What type style does the dialog title use?
4. Put a secondary outlined button next to the Save button in this form footer.
5. Add a warning alert banner at the top of the page. What colour is it?
6. Add a slider so the patient can rate pain from 0 to 10.
7. Build a patient search field with a magnifying-glass icon inside the field on the left.
8. While building, you notice the library Figma component draws a value that disagrees with what the docs say the code does. What do you do, and what do you record where?

Keep each answer to a short paragraph. At the end, add:
- a short list of anything in the docs you found confusing, contradictory, or hard to find
- which files and sections you read, and how many searches you ran
- whether you opened anything outside the four files (be honest; it's part of the test)

Do not estimate token usage. Report exact usage only if the runtime exposes it. The coordinating agent measures elapsed time externally. Return answers in chat; do not write any files.
