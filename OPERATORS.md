# Operator's guide — running the design system build loop

The method for directing agent work on the Tebra design system: the library, screens built from it, and any future file that consumes it. Agents have their rules in CLAUDE.md and AGENTS.md. This is the third seat — the person running the loop. The projects change; the loop doesn't.

## Why this guide exists

Every AI agent in this system — the one drafting prompts, the one executing in Figma, any other tool pointed at these files — produces plausible-looking work by default. Plausible is the danger: screens that look right built on hand-drawn shapes, colors that look right typed as raw values instead of tokens, reports that assert alignment your own eyes disprove. The gap between plausible and verified is closed by a loop — read first, build in small batches, verify in pixels, record everything — and the loop does not run itself. A person runs it.

We know because we tested the alternative. In September 2026, during the NPVE screen rebuild, a capable agent worked in the file without an operator holding the loop. Its screens matched ours nearly pixel for pixel. Underneath: the file reorganized with no record, verified work displaced, drawn shapes labeled as library components, one screen existing three times, and the file half-subscribed to two versions of a component — set to silently tear apart at the next library publish. Three repair batches and a full audit later, the file was trustworthy again. Same week, smaller lesson: a perfectly good batch run in a side session with no record had to be re-verified from scratch, because unrecorded work is indistinguishable from suspect work.

Capability was never the problem. The loop was missing. This guide is the loop, from the operator's chair.

## The standing structure

- **Code is the root truth.** The design system in code (packages/design-system) outranks everything; Storybook's render outranks derivations; the Figma library outranks any consuming file; source files being rebuilt are evidence of intent, never authority.
- **The library defines, files consume.** Screens and proposals are built from published library components. Nothing consuming the library invents what the library lacks — gaps get marked (grey GAP/DEFECT cards by the work) and become the library's to-do list.
- **The record store is the memory.** Every decision, finding, and batch lives as a dated, immutable record file under records/<workstream>/<date>/, with findings in flags/active.json and flags/resolved.json and the foundations in foundation/; design-system-schema.json is generated from those files and is never edited by hand (record schemasplit_phase8_2026-09-08). Chat history is not the record. A batch without a record didn't happen.
- **Everything is additive.** Nothing deleted; superseded work is renamed and archived with a README saying why.

## The loop, from your seat

- **Use one surface if you prefer.** Planning and building may happen in the same session, with any capable model/harness that reads the repository instructions. Declare library work (authority: code) or screen work (authority: library). No particular provider or separate planning chat is required.
- **One approved batch, visible milestones, one closing reply.** The agent checks the plan, builds and verifies the form, finishes its surrounding screen, then shows the comparison. You decide design questions and review the result. Internal milestones do not require you to say “continue.” If you change sessions, the agent resumes from the saved record and execution checkpoint; paste a reply only when the receiving session cannot access the repo evidence.
- **Read-only before writes.** New file, uncertain state, resumed work, anything that smells off: inventory first, build second. Nothing builds on an unverified state.
- **Look at the canvas yourself after every build batch.** Reports claim, renders show. The catches that matter — a flush margin, sagging text, a missing hairline, a wrong color — have come from operator eyes on the file, not from any report.
- **Review the whole form, even after a small repair.** Compare field and card backgrounds, borders, states, content, spacing and actions. Ask for material differences to be corrected or explained by the approved design-system decisions. Acceptance of one repair is not acceptance of every inherited detail; findings on reused patterns must name their known affected forms.
- **No record, no next batch.** Every batch ends with a schema record and a report on disk. The builder refuses new work on top of an unrecorded batch; that stop protects the system.
- **Commit at session end.** The record files, the generated aggregate and indexes, instruction files, reports. The register is the project; protect it. The commit is the backup: a milestone tag marks each workstream close or each week, whichever comes first (`node scripts/schema/milestone.js "<reason>"`), and the validator reminds you when one is due.
- **Use the compact NPVE entry point when it validates.** `workflow/npve-contract.generated.json` and the planner-owned manifest replace routine full-schema rereads, not the schema itself. A stale-contract failure routes the agent back to regeneration or full evidence. Risk tiers are proposed by the planner and approved by you: your approval is quoted word for word in the manifest, and an item whose tier you have not approved runs only on your per-item confirmation, also quoted. The visual comparison remains mandatory. The rule text agents follow lives in `workflow/rules.json`, one place for every agent.

## Which decisions are whose

Fact questions go to evidence. What padding ships, whether a color has a token, what height a component renders — the agent resolves these from the precedence order and records any correction. You should not have to tell it to look up an available fact. Fixing this batch's misplaced field, clipped label or default text is routine execution, with the disposition recorded; it is not a new design approval.

Design questions stop for a human. Keep a button the source lacks, generalize a pattern or keep it specific, adopt a mechanism better than the written rule, choose between two defensible spacings. Agents must stop and ask; an agent deciding these silently is the core failure mode. When an agent presents a design question with a recommendation, that's the system working — the recommendation is input, the call is yours.

Ownership: [who decides design questions — fill in per project or team].

## What good looks like

Small batches, visible progress, short replies and records accumulating. Work sits beside its source snapshot with a plain-language change list. Library gaps wear grey cards and become future library work. Fast progress is welcome when the evidence supports it; repeated requests for permission are not evidence of quality. See `workflow/execution-policy.md` for the executor's retry limits and checkpoints. If work stalls, the agent should explain the specific obstacle and preserve its progress, rather than ask you to supervise another open-ended retry.
