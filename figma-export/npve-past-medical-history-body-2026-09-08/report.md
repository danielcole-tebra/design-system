# Past Medical History body and sidesheet — pilot report

Status: complete. Built by Codex through P4.d; audited, evidenced, recorded, and committed by Claude from P4.e. Medium risk, operator-locked. Operator review of `comparison.png` is required before any further pilot item or schema migration.

## Outcome

- Built `Past medical history body` (546:5871) as a reusable 518×388 vertical body: three live instances of the approved `Past medical history section` (HEAD, EYES, CUSTOM ITEMS) and one published multiline Text field (Comments), with 16px between body children.
- One-row groups (HEAD, CUSTOM ITEMS) hide their second nested row by visibility override; no row or section is detached.
- HEAD sits in a small wrapper frame so the source's COMMENTS column label can sit beside the section instance. The wrapper is labelled SCAFFOLDING per standing rule 6.
- Appended the body to the shared Sidesheet's Body content preferred values (12 → 13). The default body, all 12 existing properties, and the 550×600 master geometry of all three Placement variants are unchanged.
- Placed one content-driven sheet: 550×564 = header 72 + divider 1 + body region 420 (16 + 388 + 16) + footer 71. The footer follows the content; nothing is padded to 600.
- Created the three `_Rebuild comparison/…/Past Medical History` sub-components (reference 550×600, rebuild 550×564 with no fill, change log 480×385 with four Change log/Row instances) and the sole comparison instance on Screens (561:9877, instance of shared master 35:332).
- A body proof (552:5930) and a sheet proof (555:10031) remain on Templates beside the master, matching the row and section pilots' proof convention.

## Source-backed differences (in the change log)

| Row | Source → Rebuild | Why |
|---|---|---|
| Condition rows | 32px → 42px | Approved live touch targets from the published Checkbox and Icon button |
| Section rhythm | 0px → 8px | Canonical tight relationship between a heading and its list |
| Sheet height | 600px fixed → 564px | Footer follows the active content |
| Comments field | 110px detached → 88px | Reuses the published small multiline Text field |

## Findings for the operator (not resolved, per rule 11)

1. **Footer label casing.** Source reads "Save & Add to Note"; the rebuild renders "Save & Add To Note". The stored Label is "Save & Add to Note"; the published Button applies TITLE case, and code (`src/typography/typography.ts`, button variant) sets `textTransform: capitalize`, so the library follows code and the source is the outlier. Precedence puts code first. Decision needed: add a change log row saying button labels take the library's title case, or leave unlogged.
2. **Comments field state.** Source shows the focused state (teal outline, label breaking the outline). Rebuild shows the resting state. Only the height change is logged. Decision needed: log the state change as intentional, or switch the instance to State=Focused if the library variant exists.
3. **Reference resolution.** The frozen source is a 1x capture (582×616 image in a 550×600 frame). Rule 15 asks for a 2x flat export; Health Status and Social History references are 2x (1100×1200, 1100×1556). The row and section pilots also froze at 1x. Decision needed: accept 1x for pilot references, or schedule a re-capture batch at 2x for all three PMHx references once a 2x capture path is confirmed.
4. **Two live sheets on Templates.** The screen exists inside the Rebuild sub-component (559:6085) and again as the standalone proof (555:10031). Rule 15 says the sub-component is the single placement. The standalone was renamed "— proof" in this batch and left in place (additive only). Decision needed: keep proofs as a pilot convention, or archive them after review.

GAP 0. DEFECT 0. DECISION 4 (above).

## Validation

- File identity: fdCQVFdvOByaOYIJYag0d6 with pages 0:1 Cover, 3:2 Templates, 27:2 Screens, 126:2 Archive.
- All four pages walked with `skipInvisibleInstanceChildren = false`: Cover 8, Templates 8788, Screens 4034, Archive 1528 nodes.
- Unbound visible solid paints: Cover 1, Templates 37, Screens 38, Archive 10. The only additions since the section pilot are the two organizer sections' fill and stroke.
- Fractional authored geometry: zero on every page outside published instances.
- Body master vs proof: 40 visible solid paints, zero mismatches.
- Shared Sidesheet API: preferred values 13, default 26:221, three variants 550×600, 12 existing properties unchanged.
- Comparison: slots swapped to 558:6084 / 559:6084 / 560:6172; legacy placeholder layers hidden; captions set; Rebuild column matches the live sheet within 62 anti-aliasing pixels.
- Archive growth is a counting-method difference; no node with id ≥ 538 exists on Archive.
- Batch guard, contract freshness, manifest lock, evidence, and record validators pass (see `finish-batch.js` output in the commit).

## Corrections

- Codex (build): empty body wrapper sat at 1px so the first gap rendered transparent; corrected to vertical hug.
- Claude (finish): renamed 547:5870 with the SCAFFOLDING label (rule 6); renamed 555:10031 "— proof" (rule 15). No geometry, paint, or property change.

## Evidence

- `comparison.png` — 1708×692, the operator-facing reference / rebuild / changes packet (1x)
- `sidesheet-555-10031.png` — live sheet proof at 550×564, captured at finish
- `rebuild-sidesheet.png` — the same sheet as Codex rendered before the stop (47 px anti-aliasing difference from the finish capture)
- `body.png`, `body-step-*.png` — Codex's incremental body renders
- `reference-helper.png` — the frozen reference sub-component
- `source-sidesheet-129-9205.png` — 1x source capture with shadow margin (582×616)
- `crop-rebuild-column.png`, `crop-reference-column.png`, `diff-reference-column.png` — PIL crops and diff used for the column checks
- `audit.json` — deterministic evidence and tool-call measurement

## Pilot measurement

Codex reached P4.d in about 50 tool calls with one correction cycle. Finishing from P4.e took Claude 9 Figma reads, 1 Figma write, and 2 screenshots. The lean startup set stayed at about 55 KB against the 1.3 MB legacy set. Two naming corrections at finish came from standing rules 6 and 15, which the deterministic catalog does not encode; both were caught by reading the structure and looking at the render, not by a script.

Stop condition: met. No further pilot item is queued. Operator review of the comparison is the next step.
