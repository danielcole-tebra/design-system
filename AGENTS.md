# Tebra Figma builder

Build screens from Tebra's library; report what it cannot express. Code lives in the sibling `web-app-v2/packages/design-system`; this repo contains guidance and evidence, not component source.

## Read only what the task needs

The active builder package is this file plus three references:

- [LIBRARY.md](LIBRARY.md): token mappings, component capabilities, code/Figma differences and essential API checks. Read the requested component entries, not the whole file.
- [COMPOSITIONS.md](COMPOSITIONS.md): reusable assembly patterns. Read the relevant pattern before composing a section.
- [OPEN-ISSUES.md](OPEN-ISSUES.md): unresolved facts affecting new builds. Read entries linked from the relevant component or pattern.

Also read the task's own screen spec when supplied. Do not routinely read LOG.md, FLAGS.md, records/, audits/, archive/, or the old long-form references. They are evidence for a specific unanswered question, not startup requirements. CLAUDE.md points here; it adds no rules.

For Figma work, follow LIBRARY.md's **Efficient execution** sequence. Use `node tools/builder/read.cjs LIBRARY.md --index` for its current section map, then `--section "Efficient execution"`. Read complete required skills in one appropriately budgeted call when they fit; the reader supports adjustable bounds, not mandatory tiny pages. Follow MORE until required content is complete. Helpers are implementation aids, not extra startup documents.

SDE is settled for now, per Daniel on 2026-10-31. Its residual findings are historical limitations, not a backlog to reopen or blockers for new work. Mobile screen rulings remain local to their project. History is preserved in [archive/builder-docs-2026-10-31](archive/builder-docs-2026-10-31/README.md).

## Authority and scope

Code governs declared values. LIBRARY.md is a concise transcription with dated evidence, not a claim of a fresh code or Figma audit. Use the actual library to build; verify its properties in the consuming file before relying on them. A library definition, a published update and an accepted consumer update are three different states; publishing and accepting updates are manual.

Storybook defines demonstrated axes and examples. Its documented decorator lacks CssBaseline, so it is not universal rendered truth. For layout or interaction questions, use a screenshot of the relevant implementation and theme; do not replace an explicit code value with a measurement. Legacy/proposal screenshots are design input, not proof of shipping behavior.

An explicit approved screen exception applies only to its stated scope. Report conflicting evidence; never silently correct code, the library or a spec. Ask Daniel on an unresolved design choice. Do not re-ask settled decisions within their scope, assign risk tiers, or request ritual approval wording. Finish independent work while a dependent choice remains open.

## Files and boundaries

| File | Key | Role |
|---|---|---|
| Design System Rebuild | `YX2n4YLrEpBXNbcc73T6dw` | Library; screen tasks consume it, never modify it |
| Proposals | `zKT34LQogNjz3Z07fY4VQB` | Consumes the library |
| Composition System | `oNrOL9kQCpJHyK4rBCGqsq` | Canonical composition record; consumes the library |

Pass the file key on every Figma call; file titles can all read "Document". The deprecated Tebra Working UI Kit is read-only. Components made in a project file remain local; proposing one for the library does not publish or promote it. Importing a component or variable is a write, even if the source is read-only.

## Build and verify

1. Break a target into sections (or flow stages). Reuse an existing section/pattern; build missing smaller parts before their section. State required widths, states and action outcomes before assembly. Do not redraw a screen whole cloth from a screenshot.
2. Use library instances, supported properties and bound tokens. Token-bound text and ordinary layout frames are legitimate composition; they do not require a new text component. Keep published component internals unchanged unless the task has an explicit scoped exception. Label approved workarounds SCAFFOLDING; instances cannot host added children.
3. Preserve all nodes, including self-created inspection/scratch instances. Additive only: no temporary-node cleanup exception; supersede/hide/archive with a README instead of deleting. Read imported masters for definitions when sufficient. Retain any required inspection instances in a uniquely named `Inspection · RUN` area outside the review section. Published names are locked. Code props use exact lowercase code names/values; Figma-only affordances use Sentence case; subcomponent paths use `/` without surrounding spaces.
4. Use intended integer px, recording computed inflation or authored rounding. Preserve stored variable alpha; never force a bound paint to opacity 1. Read LIBRARY.md's "API checks by operation" before the corresponding write.
5. Set `figma.skipInvisibleInstanceChildren = false`. Enumerate the affected scope from the live file, not a prior report. Instantiate every new variant; read its properties and render it. Check affected existing instances, actual target widths, clipping and content changes. Verify reaction destinations after structural edits. Distinguish stored wiring from a played-through prototype.
6. Screenshot each Figma batch and look at it, including the assembled section in context. Stop for Daniel's read before the next build batch. Expand beyond affected components/instances only for shared changes, unexplained failures or a requested full audit. Documentation-only batches need no invented screenshot.

## Record once, maintain the current answer

DEFECT means a render differs from what ships; GAP means a required capability cannot be expressed; DECISION means a human choice is needed or records its resolution. Shipping quirks are not DEFECTs merely because they are undesirable. Unknown coverage is not proof of absence. Figma markers use grey cards, with no red, yellow, orange or green.

New library findings go in OPEN-ISSUES.md; screen findings belong in the consuming project's current spec/register. Record owner, scope, status, impact, evidence date and any approved workaround. Distinguish a nonblocking limitation from a blocked task. Do not copy SDE's historical flags into the active register.

Update the authoritative component or composition entry when a decision changes it, preserving previous text in history. Composition decisions carry decider, date and what they override. Keep one short LOG.md entry per batch: date, file key, change, finding and evidence/run path. Detailed reads and screenshots go under runs/; do not duplicate them in every document. A batch without a log entry is unverified.

Prepare evidence, one concise report and the LOG entry together, then commit/push once. A benchmark report records start, first reviewable image and verification checkpoints; report actual total time and push outcome in the final chat. Do not make a second commit just to record the first push's timestamp or hash. Required corrections or a failed push still need truthful reporting and recovery.

## Git

Use one working copy per repo; never commit from retired/synced copies. Stay on master unless Daniel asks for a branch. Pull before a batch; a consuming project pulls its library first. After logging, commit only individually named paths changed by the batch, then push. Report unrelated changes and leave them alone. A batch is not recorded until pushed. LOG.md/register conflicts retain both dated records in order; other conflicts stop the batch for review.
