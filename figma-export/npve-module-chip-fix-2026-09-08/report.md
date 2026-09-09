# NPVE Module chip fix — re-run of the superseding prompt — 2026-09-08

Record `npveRebuild_moduleChipFix_2026-09-08` (backup `design-system-schema.backup-2026-09-08-pre-npve-module-chip-fix.json`). Manifest item `npve-module-chip-fix-2026-09-08`, tier medium proposed by Claude, started with the operator's Step 3 paragraph as the per-item confirmation.

Status: DONE with one decision open. The superseding prompt (chat record 2026-09-06 16:48, "Daniel's crop review, superseding the earlier moduleChipFix draft") was first executed as `npveRebuild_moduleChipFix_2026-09-06`; its uniform-gap detail was then changed by `npveRebuild_moduleChipRelationshipSpacing_2026-09-06`. This re-run measured the source, verified every step against the live file, added the one row the prompt asked for that was missing, and stopped before the one step that would reverse the later decision.

## Gates

- Contract freshness: `validate-workflow` PASS before reading (after the post-merge regeneration).
- Record gate: `npveRebuild_noteHeaderLayout_2026-09-08` DONE (Encounter page workstream).
- Batch guard: schema digest 84dbf3fb5e66; `check-batch` PASS before the mutation.
- Stop condition: triggered by design on the internal-gap step; see Decision.

## Step 1 — source measurement (4841:17077, strip 4841:17097, read only)

| Element | Measurement |
|---|---|
| Strip | 1397×40, horizontal, gap 12 |
| Selected Note chip | 120×40, radius 8, padding 8/12, internal gap 8; fill #DFEAEC (no token; nearest `primary/100` #CBDDE0); stroke #8CB2B6 1px (= `primary/200` exactly) |
| Icon | docs glyph, 24px slot, visible vector 15×19, fill #004852 (= `primary/main`) |
| Label | Akkurat LL Bold 14/18; Note #000000, Problems #004852 |
| Close | 24×24 control, two 8×8 stroked paths, #000000, 1.5px |
| Gaps | icon → label 8, label → close 8 |
| Selected Problems | 145×40, icon 15×18.15 #004852, label #004852 |
| Unselected | radius 24 pills, padding 8, gap 8, fill #F6F6F6 at 10%, stroke #D6D6D6; 24px icon #545454 + Regular 14/18 label #545454 (Timeline #000000) |

## Step 2 — verification against the prompt

| Prompt step | Live state (426:4213) | Result |
|---|---|---|
| One ink family bound to the matching token | Selected icon, label and close fills bound `color/primary/main`; Problems included | Already in place |
| Close rebuilt to source scale, not black | Icon/Close (MUI) 16×16, 9.33px glyph, `primary/main` | Already in place |
| Internal gaps space/16 between all three elements | Module identity (icon + label) at `space/8`; identity → close at `space/16` | Decision (see below) |
| Variant anatomy | selected=yes: icon + label + close; selected=no: label only, icon and close hidden | Already in place |
| Chip-fill token delta logged | Not logged before this batch | Row added |

## Step 3 — strip

426:4214, 1397×40: Modules · Note (selected) · Problems (selected) · AI Summary · Vitals · Care Team · Labs/Studies · Allergies · Timeline. Source order; no mutation required.

## Step 4 — crop-compare and change log

Crop-compare at 1x: `comparison-module-strip-reference-vs-rebuild.png` (source strip over the placed rebuild strip cropped from 434:7474 at (48,1302)); `crop-compare-source-vs-rebuild-strip-left-2x.png` for the left 700px at 2x.

Observations:

- One teal ink family on the selected chips in the rebuild; the source mixes a teal icon with a black label and black close on Note.
- Close is small in both; rendered ink extents match within 2px per side.
- Icon → label is 8px in both; label → close is 16px in the rebuild against 8px in the source, per the recorded relationship-spacing decision.
- Unselected chips are label-only in the rebuild where the source shows icons; logged in the existing Module chips row.
- Chip fill: source #DFEAEC has no token; `primary/100` is slightly deeper; the edge is exactly `primary/200`.
- Placed strip versus the master at 1x: 0 pixels with a channel delta above 24.

Change-log rows about chips, verbatim as they now stand in 434:4745:

| What | From → to | Why | Status |
|---|---|---|---|
| Chip spacing | Uniform 16px gaps → icon + label 8px; close 16px | Groups module identity; separates the close action | as amended 2026-09-06 |
| Chip inks | Black icon, black close → one teal family | Matches the source's single ink | verbatim from the prompt, unchanged |
| Chip fill | Pale teal typed in by hand → nearest library teal | No token matches the mockup tint; the edge colour is a token | new, 593:6712 |

The prompt's verbatim row `Chip spacing | Tight 8px gaps → 16px | Small elements in one control need room` is withheld pending the decision.

## Figma mutations

- Templates 434:4749: appended Change log/Row 593:6712 (Chip fill). Helper 434:4745 480×2063 → 480×2160; the placed comparison 434:7474 inherits (2005×2155 → 2005×2252).
- No master, strip, instance, token or comparison slot changed. Source and library read only.

## Decision for the operator

Internal chip gaps. The superseding prompt asks for `space/16` between icon, label and close as a deliberate improvement. The later batch `npveRebuild_moduleChipRelationshipSpacing_2026-09-06` (commit f1536ad, Daniel Cole, 2026-09-06 15:14) set icon → label to `space/8` and identity → close to `space/16`, and amended the change-log row. Options:

- (a) Keep `space/8` identity + `space/16` close as recorded. No Figma change. Recommended: it is the later decision and matches the source's 8px icon → label.
- (b) Return to uniform `space/16` and restore the verbatim row. One master edit plus one row amendment in a small follow-up batch.

## Verification

| Check | Result |
|---|---|
| File identity | PASS — four pages as expected |
| Page walk (skipInvisibleInstanceChildren=false) | PASS — Cover 8, Templates 9516, Screens 4564, Archive 1782 nodes |
| Unbound solid paints | PASS — Cover 1, Templates 41, Screens 42, Archive 12; unchanged |
| Fractional authored geometry | PASS — 0 on every page |
| Chip set API and references | PASS — Label, Icon, Show close (true), selected (yes); selected master references Icon/Label/Close; unselected Icon/Label, Close unlinked |
| Reference counts | PASS — 8 selected, 24 unselected variant references, 3 strip instances; one page comparison |
| Rendered inks on placed chips | PASS — selected icon/label/close `primary/main`, fill `primary/100`; unselected labels `text/secondary` |
| Pixel diff placed vs master | PASS — 0 px above a channel delta of 24 |
| Change log | PASS — 19 rows; the new row renders in the placed comparison |
| Archive | PASS — no id ≥ 593 |
| Ten standing batch rules | PASS — see the schema record |

## Evidence

- `source-module-strip-4841-17097-1x.png`, `master-module-strip-426-4214-1x.png`, `placed-module-strip-from-comparison-1x.png`
- `comparison-module-strip-reference-vs-rebuild.png`, `crop-compare-source-vs-rebuild-strip-left-2x.png`, `pixel-diff-master-vs-placed-strip-1x.png`
- `comparison-encounter-434-7474-1x.png` (before), `comparison-encounter-434-7474-1x-after.png`, `changelog-tail-chip-rows-1x.png`
- `audit-module-chip-fix.json`

## Findings

GAP 0. DEFECT 0. DECISION 1 (internal chip gaps). No new flag.
