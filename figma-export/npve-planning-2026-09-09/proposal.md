# Planner proposal — next two sidesheet edit forms (2026-09-09)

Role: planner. Read first: workflow/rules.json, workflow/manifest.json (item shape from pilot2-hospitalizations-edit), leanPilot_run2-3_2026-09-08 and leanPilot_run3_2026-09-08 (the edit-form pattern), npveRebuild_sidesheet_inventory_2026_09_02 (source inventory of 129:7826 and 129:12486), npveRebuild_familyHistory_2026-09-05 and npveRebuild_allergiesList_2026-09-05 (what already exists to reuse). Scoped reads: source metadata and 1x renders of both nodes (saved here), the target Sidesheet shell and the runs 2-3 form, and the library Autocomplete/Field, Radio and Form control label sets. No mutation; both items sit in the manifest as `proposed` with tiers unapproved and no lock.

## Scoped-read findings

| Fact | Allergies edit 129:7826 | Family History edit 129:12486 |
|---|---|---|
| Source frame | 550x673, `Page=Clin_Allergies-Edit` | 550x685, `Page=Clin_FHX-Editing` |
| Header | Breadcrumbs 64: back 32x32 tinted #E9EFEE at (16,16), title "Edit Allergies" Bold, close glyph 24 | NoteHeader 65: same back, title "Edit Family History", close glyph 24 |
| Card | 518x517 at y 8, padding 12 (rows 494) | 518x520 at y 16, padding 16 (rows 486) |
| Rows | Edit Allergen + trash · Allergen caption + autocomplete 384x40 with caret ("Penicillin") and Severity chip 70x32 ("Mild") · Status caption + two 24px radios in a 40 row (Active on) · Reactions caption + rows 494x40 "flushing", "hives" with red X 24 + Add reaction input 426x36 with outlined Add 60x36 · Comments 494x110 focused | Edit Family Member + trash · Relationship caption + autocomplete 486x40 ("Father") · Status radios (Living on, Deceased) with Age caption + 80x40 field ("65") · Medical Conditions caption + Add condition input 418x36 with outlined Add + rows "Diabetes", "Hypertension" with red X · Comments 486x110 focused |
| Footer | Cancel (text) / Save & Add to Note (outlined) / Save (primary), 60 tall | Cancel (text) / Save (**outlined**), 60 tall — inconsistent with every other edit sheet |
| Hidden scaffold | tab strips, breadcrumb strip, toggle group, alternate footer (ignored, per inventory) | same |

**Expected dimensions.** Allergies form 518 x ~544 (floating labels) or ~596 (captions kept); sheet 550 x ~720 / ~772 against a 673 source. Family History form 518 x ~478 / ~530; sheet 550 x ~654 / ~706 against a 685 source. Both bodies equal their forms (no tab strip). Comparisons ~1708 x ~1190–1240 with clipping off on the tall columns.

**Back control.** The shell's Show back control (6:67) is the library Icon button color=default size=medium, 40x40, no fill, with Icon/LeftCaret. The source draws a 32x32 square tinted #E9EFEE. The inventory already recorded this as a DEFECT verdict ("Back control (edit pages)"). Plan: shell as published, one change-log row, one DEFECT marker beside the first comparison. These are the first sheets built with the back control visible.

**Library mapping.** Autocomplete/Field (30 variants; size small; Value Filled; props Label, Value text, Clear icon) — no instance in the target yet, plain placement. Radio (8 variants, 42x42) inside Form control label (Control is an INSTANCE_SWAP slot defaulting to Checkbox; Radio swaps in, not in the preferred list) — two per row, 42 tall per npve.touchTargets. Severity chip = the existing Allergy severity selector 352:3206. List rows with the red X = Text field size=small Value=Filled + Icon button color=error in the recorded end-adornment GAP wrapper. Trash = Icon button size=small + Icon/TrashOutlined (runs 2-3). Age = Text field size=small, 80 wide. Comments = Text field medium multiline resting (104).

**GAPs expected to recur.** Dropdown chip: Allergies yes (severity selector, marker pattern 404:7061); Family History no. Date/end-adornment wrapper: both (list rows with X). Ringed buttons: neither (bare glyphs → small Icon buttons). Search pattern: neither (plain add-entry text fields).

**Reuse, not parallel.** The Codex Family History batch built the display side (condition row 346:3080 with highlight and add-to-note button, member card 346:3089, body 346:3113, comparison 346:5993). The edit rows have a different anatomy (outlined field + delete X) and reuse the Allergies edit wrapper instead; the member card's Relationship/Age typography is the reference for the Relationship value. Nothing from that batch changes. Family History depends on Allergies so every new composition is a reuse.

## New-pattern watch — one decision needed before either item starts

Autocomplete/Field and Radio + Form control label compose as plain library placements; no convention is missing for them. **Caption placement is the gap.** The source puts a caption text above each control (Regular 14, 8px above); the library fields carry a floating label inside the outline, and runs 2-3 used the floating label. The contract has no rule for caption-above-control.

- (A) Library floating label, caption dropped, one change-log row per form. Recommended: it is what the library ships and what runs 2-3 did.
- (B) Keep the caption as a Typography text above a label-less field with the 8px tight gap. Source-faithful, but the field then shows no label of its own, and the radio and list groups need the same caption.

Stop-and-propose, not an invention: Daniel's answer in the approval message settles it for both items.

## Proposed tiers

| Item | Tier | Reasoning |
|---|---|---|
| npve-allergies-edit | medium | New content inside the established shell on the approved edit-form pattern, appending one preferred value to the shared Sidesheet API; first composition of Autocomplete/Field and Radio + Form control label, both plain placements once the caption question is answered; two recorded GAP patterns and one recorded DEFECT verdict reused; no shared master touched. |
| npve-family-history-edit | medium | Same pattern and shell, run second so every new composition is a reuse; one expected source inconsistency (outlined Save) reported not resolved; touches nothing from the Codex Family History batch. Depends on npve-allergies-edit. |

Proposed, not locked. Tiers lock only through `node scripts/workflow/lock-risk.js <item-id> "Daniel (operator)" "<Daniel's exact words>"`. Each item then needs its own apply-*.js (openRecord), `start-batch.js`, finalize-*.js and `finish-batch.js`.

Evidence: `source-allergies-edit-129-7826-1x.png`, `source-family-history-edit-129-12486-1x.png` (1x renders for planning only; the frozen references are 2x exports taken in the batches).
