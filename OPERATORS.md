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

- **Work inside the Claude project.** Open chats there so instructions load. First line declares the work: library work (authority: code) or screen work (authority: library).
- **One batch, one stop condition, one reply.** Claude drafts the prompt; you send it to the builder; you paste the builder's full reply back — every time, even routine ones. Claude interprets, you decide, next batch. Work run in side sessions gets its reply pasted back too, or it's invisible to the person checking.
- **Read-only before writes.** New file, uncertain state, resumed work, anything that smells off: inventory first, build second. Nothing builds on an unverified state.
- **Look at the canvas yourself after every build batch.** Reports claim, renders show. The catches that matter — a flush margin, sagging text, a missing hairline, a wrong color — have come from operator eyes on the file, not from any report.
- **No record, no next batch.** Every batch ends with a schema record and a report on disk. The builder refuses new work on top of an unrecorded batch; that stop protects the system.
- **Commit at session end.** The record files, the generated aggregate and indexes, backups, instruction files, reports. The register is the project; protect it.
- **Use the compact NPVE entry point when it validates.** `workflow/npve-contract.generated.json` and the planner-owned manifest replace routine full-schema rereads, not the schema itself. A stale-contract failure routes the agent back to regeneration or full evidence. Risk tiers are proposed by the planner and approved by you: your approval is quoted word for word in the manifest, and an item whose tier you have not approved runs only on your per-item confirmation, also quoted. The visual comparison remains mandatory. The rule text agents follow lives in `workflow/rules.json`, one place for every agent.

## Which decisions are whose

Fact questions go to evidence. What padding ships, whether a color has a token, what height a component renders — resolved by the precedence order, usually by telling the agent "go read it," not by anyone's memory or taste.

Design questions stop for a human. Keep a button the source lacks, generalize a pattern or keep it specific, adopt a mechanism better than the written rule, choose between two defensible spacings. Agents must stop and ask; an agent deciding these silently is the core failure mode. When an agent presents a design question with a recommendation, that's the system working — the recommendation is input, the call is yours.

Ownership: [who decides design questions — fill in per project or team].

## What good looks like

Unglamorous. Small batches, short replies, records accumulating, periodic stop-and-reports that resolve into one-line decisions. Work sits beside its source snapshot with a plain-language change list a designer can read without knowing any of this machinery. Library gaps wear grey cards instead of workarounds, and the cards drain into library batches. A scheduled read-only audit every week or few batches, diffing the file against the schema, whichever operator is on. If it feels fast and nothing is stopping to ask anything — that's the warning, not the win.
