# Lean pilot, runs 2 and 3 combined — report (Step 0 stop)

Status: IN PROGRESS, stopped at Step 0 awaiting the operator's per-item confirmation. Record `leanPilot_run2-3_2026-09-08` (backup `design-system-schema.backup-2026-09-08-pre-lean-pilot-run2-3.json`). No Figma writes.

## Gates

- Contract freshness: `validate-workflow` PASS before any reading; rules.json, CLAUDE.md, AGENTS.md, OPERATORS.md digests match.
- Record gate: previous record in the workstream `workflowRefactor_tierApproval_2026-09-08` is DONE.
- Authorization: the batch prompt carried no tier approval, so per Step 0 the executor selected two items, proposed their classes, and stopped.

## Survey (read-only)

Source `Sidesheetv3` 129:6647 holds 55 variants. Thirteen source sheets already have rebuild records (Problems Recent, Favorites, Main, Edit; Medication list; Procedures history; Family history; Allergies; Hospitalizations; Facility Stay; Health Status; Social History; Past Medical History). Of the visible, unbuilt, 550-wide sheets:

| Candidate | Source | Shape | Verdict |
|---|---|---|---|
| Hospitalizations edit | 129:8401, 550×606 | Edit Event form: tabs, Facility Name, Admission/Discharge dates, Related to problem, Procedure Code, Status chip, Comments | **Selected, item 1** |
| Procedures edit | 129:8651, 550×498 | Edit Event form: Procedure Code, Status chip, Related to problem, Facility Name, Comments | **Selected, item 2** |
| Allergies edit | 129:7826, 550×673 | Allergen autocomplete, Severity selector, Status radios, Reaction chips + Add, Comments | Next in queue |
| Family History edit | 129:12486, 550×685 | Relationship autocomplete, Status radios, Age, Conditions chips + Add, Comments | Next in queue |
| Flowsheets | 939:9228 | Table with measure/latest/updated/actions columns | Rejected: table shape, not the sidesheet-body pattern |
| Psychotherapy Note | 129:7614 | Rich-text toolbar | Rejected: no library toolbar pattern |
| Vitals family | six variants, 441 wide | Charts, hand-drawn shapes | Rejected: different width and shape |

## Proposed items

| Item | Proposed class | Why |
|---|---|---|
| pilot2-hospitalizations-edit | medium | New content in the established shell; appends a Sidesheet preferred value. Pattern is the approved Facility Stay form (Form surface token, 16px rhythm, 42px control rows). Controls map to published Text field, Tabs, Chip, Button, Icon button + TrashOutlined; dates reuse the recorded date-field GAP wrapper; the Status chip follows the recorded Allergy severity selector precedent with a GAP marker. |
| pilot2-procedures-edit | medium | Same pattern and control set minus tabs and dates; depends on item 1 passing. |

Both are written to the manifest as `proposed`, `proposedBy: Claude (planner proposal)`, `approval.status: unapproved`. They will be locked only with the operator's words quoted, or started one at a time with `start-batch.js --confirm`.

Scope match for Step 5: both items are Edit Event forms of the same family as the Facility Stay baseline.

## What happens on confirmation

Step 1: one preflight for both (2x exports via `download_assets`, edge checked for editor chrome, target pattern nodes, approved differences, applicable GAPs). Step 2: build item 1, validate, stop on failure. Step 3: item 2. Step 4: evidence per component. Step 5: one record, one commit, three-column measurement.

GAP 0. DEFECT 0. DECISION 0 (two items awaiting confirmation).
