# NPVE Allergies comparison height correction — 2026-09-05

## Outcome

The false white extension below the Allergies Sidesheet is removed. The visible rebuild surface now ends with the 550×447 live Sidesheet footer, while the surrounding comparison area remains the grey canvas backdrop.

## Scope and stop condition

This correction was limited to the unique `_Rebuild comparison/Rebuild/Allergies list` helper (`356:3248`) and its sole comparison placement (`356:6236`). The shared Rebuild comparison master, frozen source reference, change log, Sidesheet component, body, tokens, and every other comparison were preserved.

The batch stopped after the helper surface, live-instance links, integer geometry, and final rendered comparison were verified.

## Read-only finding

- Comparison: `356:6236`, 1708×1290.
- Nested Rebuild content swap slot: `I356:6236;114:1139`, 550×600, white paper fill.
- Live Allergies Sidesheet inside it: `I356:6236;114:1139;356:3249`, 550×447, white paper fill.
- The 153px difference was not Sidesheet geometry. Figma preserved the canonical 600px swap-slot size when the 447px helper was selected, and the helper's own paper fill made that unused area look like part of the sheet.

## Correction

Removed the redundant token-bound paper fill from the unique Allergies rebuild helper component `356:3248`. The live Sidesheet remains unchanged and continues to own the paper surface through its bound `color/background/paper` fill.

A direct resize of the nested swap-slot instance was attempted first but did not persist because the shared comparison component owns that slot geometry. The rejected verification call left no persisted geometry change. The final correction therefore stays at the unique helper layer and does not alter the shared comparison master.

## Verification

- Unique helper remains 550×447 and now has no fills.
- Nested Rebuild content instance remains linked to helper `356:3248`, with no visible fill.
- Live Allergies Sidesheet remains 550×447 and linked to Sidesheet variant `6:65`.
- Frozen reference and change-log helpers retain their links and geometry.
- All affected dimensions are whole pixels.
- Final render inspected: the rebuild ends at its footer and the area below is the grey comparison backdrop.

## Evidence

- `comparison-allergies-356-6236-height-corrected.png`

## Findings

- GAP: 0
- DEFECT: 1, resolved in this batch
- DECISION: 0

## Workflow rule carried forward

When a rebuild helper is shorter than the canonical 600px comparison swap slot, the helper must be surface-transparent so only the contained live screen owns the visible product surface. This avoids a false white extension without changing the shared comparison master.

