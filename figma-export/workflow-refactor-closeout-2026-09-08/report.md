# Workflow refactor close-out and PMHx corrections — report

Status: DONE. Record `workflowRefactor_closeout_2026-09-08` (backup `design-system-schema.backup-2026-09-08-pre-workflow-refactor-closeout.json`). Executor: Claude. Repo and target written; library and source read only.

## Record gate

The prompt named `workflowRefactor_handoff_2026-09-08`. No such record exists, and the four refactor commits (c88ce6c, 5b4d119, 146e867, c27235a) wrote none. Per agent rule 10 a read-only state check was recorded first as `workflowRefactor_stateCheck_2026-09-08`; it stands in for the missing record and carries the phase 0–3 verification from the previous turn. The closeout then ran as the next batch.

## Step 1 — contract completion

- New `workflow/rules.json`: eleven agent rules (rule 11 is risk ownership, adopted from amendment 2), the record gate, standing rules 14 and 15 verbatim, the six sheet and comparison techniques, the proof convention, and 24 NPVE values. Every entry names its schema record; the body inset now cites `npveRebuild_bodyPaddingAndSearch_2026_09_02`.
- `generate-contract.js` v2 folds the file into the contract and refuses to generate if any cited record is missing (24 verified). The file is digest-checked like the instruction files. Contract sections that stay in CLAUDE.md are declared canonical by name: precedence, Figma files, standing rules 1–13, plugin traps, Recording, Publishing.
- CLAUDE.md thinned from 10,593 to 8,443 bytes: rules 14/15, the sheet techniques and the agent-rules section are pointers with one-line summaries. AGENTS.md (3,229 → 2,036) drops its divergent copy and points to the same text. OPERATORS.md gained the approval-by-quote sentence.
- Lean startup set grew from 55,219 to 83,412 bytes because the contract now carries rule text; still a 94% reduction on the legacy set.

## Step 2 — tier attribution

| Item | Was recorded | Truth now in manifest |
|---|---|---|
| pilot-pmhx-condition-row | assignedBy "Cole (operator)" 17:26:50Z | proposedBy Codex (146e867); approval unapproved; history keeps the false entry and its basis ("ok whats next?" 17:26:26Z) |
| pilot-pmhx-section | same | same; per-item confirmation at run time "That's a pretty small item, seems good so far" |
| pilot-pmhx-body-sheet | same | same; per-item confirmation at run time "this looks good proceed" |

No verbatim tier approval arrived with this batch, so all three tiers stay **unapproved**. `lock-risk.js` now requires the operator's quote; `start-batch.js` refuses an unapproved tier without `--confirm="<quote>"` and records the confirmation in the run and the manifest. The three PMHx records carry the same correction.

To approve later: `node scripts/workflow/lock-risk.js <item-id> "Daniel (operator)" "<his exact words>"`.

## Step 3 — proof convention

Written to rules.json and the contract: proofs are named `PROOF — <batch> · <what>`, live through their batch, and move unchanged to Archive `06 · Pilot proofs` at batch close. Applied: 518:5798, 534:5834, 552:5930 and 555:10031 moved to the new section 570:10455 at (1240, 5613), renamed, masters intact; README 185:5 gained a 06 paragraph.

## Step 4 — PMHx items

- Kept the capitalised footer label and the resting Comments field.
- Change log 560:6172 gained "Button label | …to Note → …To Note | Code capitalises button labels" and "Comments field | Focused in the mockup → resting | We build default states, the mockup caught a click" (rows 570:10301, 570:10307). Sub-component 385 → 555 tall; the comparison's Change log column 413 → 583.
- References re-exported at 2x with `download_assets` and placed with `upload_assets`: 518:5826 (1036×64), 537:5841 (1036×168), 558:6085 (1164×1232 including the 16px shadow margin). Rectangle size, position and scale mode unchanged.
- The raw body export carried the source component set's dashed purple outline on its top two pixel rows in place of the sheet's 1px grey border (the row and section exports and the Health Status precedent do not). A cleaned copy replaces only those two rows with a nearest-neighbour upscale of the 1x capture's top row (1,608 px). Both files are kept: `source-pmhx-129-9205-2x.png` (raw) and `source-pmhx-129-9205-2x-cleaned.png` (placed, hash f120890c…).
- Captions on 521:7835, 537:9915 and 561:9877 now read "exported 2026-09-08 at 2x".
- Body record notes: comparison verified by Daniel 2026-09-08; four decisions resolved.

## Step 5 — retro-measurement (pilot run 1 of 3)

Written to `workflow/metrics.json` v2 with the method stated. Baseline: Codex Facility Stay, 2026-09-05 17:01–17:28Z. Pilot: PMHx row, section, body (Codex) plus Claude finish.

| Measure | Facility Stay | PMHx pilot (3 items) |
|---|---|---|
| Model turns | 14 | 141 (Codex 43, Claude finish 98) |
| Tool calls | 92 | 272 |
| Figma calls | 35 | 84 |
| Screenshots | 7 | 23 |
| Context loaded (startup bytes) | 1,032,558 | 55,219 |
| Peak input tokens (Codex) | 214,005 | 207,387–236,083 |
| Corrections | 6 messages | 13 recorded cycles |
| Design decisions stopped for | 1 | 0 during build, 4 at finish |

Reading: the 50% reduction target is met for context loaded (−94.7%) and not for tool calls or turns. One sheet became three gated items, each with its own comparison, record and commit, plus a hand-over between agents. Per-item Figma calls (24 / 11 / 36+13) sit at or below the baseline's 35. Claude's turn count includes every tool step, which the Codex count does not.

## Step 6 — checks

- File identity: four pages as recorded.
- Four-page walk after the mutations with `skipInvisibleInstanceChildren = false`: Cover 8, Templates 8547, Screens 4046, Archive 1782 nodes. Unbound solid paints: 1 / 37 / 38 / 12; the only additions are the new Archive section's fill and stroke.
- Fractional authored geometry outside instances: zero on every page.
- New rows: four rendered paints each, zero mismatches against 18:103; three property references each.
- Rebuild column of the body comparison: 0 changed pixels against the pre-closeout render. Reference column: 2,503 changed pixels, all resharpening. Change log column: the new rows.
- Renders inspected: three comparisons, the change log, three references, Archive 06, Archive README.
- Ten standing rules: PASS (details in the record).
- Validators: workflow, manifest (tiers reported UNAPPROVED), self-test including the approval-flip lock check.

GAP 0. DEFECT 1 (references at 1x, resolved). PROCESS 4 (unrecorded refactor, false attribution, diverged AGENTS.md, missing provenance; all resolved). Tiers: unapproved, awaiting the operator's words.

## Evidence

- `comparison-pmhx-body-561-9877.png`, `comparison-pmhx-row-521-7835.png`, `comparison-pmhx-section-537-9915.png` — the three comparisons after the changes (copied over `comparison.png` in each PMHx folder; the pre-closeout renders kept as `comparison-before-closeout-2026-09-08.png`)
- `changelog-pmhx-560-6172.png` — six rows
- `reference-pmhx-body-558-6084.png`, `reference-pmhx-row-518-5825.png`, `reference-pmhx-section-537-5840.png` — reference helpers at 1x showing the 2x images
- `source-pmhx-*-2x.png` — the three raw 2x exports; `source-pmhx-129-9205-2x-cleaned.png` — the placed body export
- `precedent-reference-health-status-415-4050.png` — precedent check for the top-edge artifact
- `archive-06-pilot-proofs-570-10455.png`, `archive-readme-185-3.png`
- `zoom-reference-column-2x.png`, `zoom-reference-row-2x.png` — inspection crops
- `visual-observations.json` — the executor's observations as recorded in the schema
