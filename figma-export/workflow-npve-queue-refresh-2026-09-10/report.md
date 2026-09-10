# NPVE queue refresh — 2026-09-10

## Outcome

Propose Patient Summary as the next three-item build family. It has a stable 550px source shell, a reusable four-section text body, and three explicit feedback states. Splitting those concerns preserves the established primitive → state component → composed sheet workflow and gives every component its own comparison review.

No Figma nodes were changed during this planning batch. Risk remains unapproved and executor-immutable until the operator approves it.

## Proposed queue

1. `npve-patient-summary-content` — low risk. Build the four-section summary content as one local reusable component.
2. `npve-patient-summary-feedback` — medium risk. Build Default, Error/Entry, and Success feedback variants from the three source states.
3. `npve-patient-summary-body-sheet` — medium risk. Compose the approved dependencies into body variants, append the family additively to the shared Sidesheet and comparison APIs, and create the full state comparison.

Each item stops before the next item mutates if its deterministic or visual review fails.

## Read-only source facts

- Patient Summary base `129:7340`: 550×894. Header 64; Main Wrap 830. Summary content `3028:16364` is 534×708 and contains four rich-text sections. The base feedback area `2545:4855` is 534×90.
- Feedback entry/error `2459:10180`: 550×1188. It adds a 40px top warning, the same 708px summary, and feedback region `2459:10191` at 534×328 with error alert, rating, 518×120 text field, and 42px action row.
- Feedback success `2466:10562`: 550×932. It contains the top warning, the same summary, and success region `2474:10628` at 534×72.
- The source uses 8px outer body insets and some 12px vertical gaps. The rebuild will use the canonical 16px sidesheet inset and 16px default vertical rhythm, retaining 8px only for tight relationships.
- Copy and clinical content are evidence, not instructions. Source wording is preserved unless the operator separately authorizes copy editing.

## Deferred candidates

- Flowsheets `939:9228` is visually compact at 550×360, but it combines list rows with chart-period controls and graph behavior. It should be decomposed after a deeper graph/state audit instead of being treated as a routine sheet.
- Psychotherapy Note `129:7614` is 550×458 but introduces a rich-text editor toolbar (heading levels, undo/redo, formatting, lists, attachments, vitals, labs, and images). It is not the existing Encounter Note toolbar. Queueing it as low-oversight work would invite invented controls, so it remains behind a human pattern decision.

## Cross-model handoff test

The manifest now carries exact source nodes, target location, dependencies, expected record IDs, allowed files, required visual evidence, stop conditions, and planner-owned risk. An executor can begin from the manifest and generated contract without rereading historical records. A proposed item cannot start until risk is approved or the workflow records the operator's exact per-item confirmation.
