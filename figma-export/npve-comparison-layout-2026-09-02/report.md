# Rebuild comparison — layout batch, 2026-09-02

Batch `npveRebuild_comparisonLayout_2026-09-02` (steps 4 to 7; steps 1 to 3 were recorded as `npveRebuild_problemsRecent_corrections_2026_09_02`). Target `fdCQVFdvOByaOYIJYag0d6`: writes on Templates `3:2` and Screens `27:2`. Library read only, variables imported by key in-script. Source read only: `4618:4930` exported as PNG at 2x through `download_assets`. Record written by `apply-npve-comparison-layout.js` after backup `design-system-schema.backup-2026-09-02-pre-npve-comparison-layout.json`. Flags now 178 (2 added).

## Step 4. Component Rebuild comparison 35:332 (Templates, (0, 2200))

Root HORIZONTAL, padding 32, gap 32, hug both axes, items top-aligned, fill #F6F6F6 bound color/grey/300. **Rule 10 exception, deliberate:** two white sheets on a paper backdrop are indistinguishable, so the comparison backdrop is grey. Three columns, each VERTICAL, gap 8 bound space/8, hug, no fill, caption above content:

| Column | Caption default | Content |
|---|---|---|
| Reference | "Source: <file key> <node id>, exported <date>" | Source export RECTANGLE 550×600, IMAGE fill scaleMode FIT (2×2 grey placeholder PNG in the master) |
| Rebuild | "Rebuild" | Rebuilt screen FRAME 550×600, no fill (placeholder wrapper) |
| Change log | "Changes" | Change log frame FRAME 480×200, no fill (placeholder wrapper) |

Captions Akkurat LL Regular 14/20 bound font/family/base, font/size/body2, font/lineHeight/body2, font/weight/regular, fill color/text/secondary. Properties `Source caption#35:0`, `Rebuild caption#35:1`, `Change log caption#35:2` (TEXT). Description on the component states the flat-export caveat, the re-export instruction, the rule 10 exception and the detached-copy rule.

Unbindable, recorded as findings: root padding and gap 32 (no space/32 variable exists; Dimension has space/0, 4, 8, 12, 16) and the IMAGE fill (cannot bind by nature).

## Step 5. Placed on Screens: 36:258

"Rebuild comparison — Problems picker (detached: instances cannot host children)" at (0, 0), 1708×839. Built from an instance with the captions set, then detached. The two placeholder frames were switched to VERTICAL hug auto-layout and the live nodes moved into them: screen 27:6 into Rebuilt screen, change log 27:222 into Change log frame. Nothing deleted.

Source export: `step5-source-export-4618-4930-2x.png`, 1100×1200 RGBA, 61,274 bytes, from `download_assets` at scale 2. Uploaded with `upload_assets` targeting rectangle 36:261 at scaleMode FIT (image hash 5bbc19ec…). The rectangle is 550×600, the source's 1x size. Caption: "Source: zVsuhYehoSLLq880qRBFkq 4618:4930, exported 2026-09-02".

| Column | Size | Position | Content |
|---|---|---|---|
| Reference | 550×628 | (32, 32) | export 550×600 |
| Rebuild | 550×628 | (614, 32) | screen 550×600 |
| Change log | 480×775 | (1196, 32) | change log 480×747 |

All three captions sit at absolute y 32, height 20; every content block starts 28 below. No descendant extends outside the frame. The three markers stay at x −450, outside the comparison.

Screenshot `step5-rebuild-comparison-36-258.png` (1024×503 render of 1708×839), looked at: two white sheets read as separate cards on the grey ground, source left with its teal search field and compact tabs, rebuild right; the change log is a third white card; the grey captions align on one line. Nothing clips.

Transport note: `figma.clientStorage` is not supported in use_figma, and inline base64 of the export exceeds the output budget. `download_assets` (2x export URL) plus `upload_assets` (single-use POST URL targeting the rectangle) moved the image without transcription. Use this for the next screen.

## Step 6. CLAUDE.md

Rule 15 added after rule 14:

15. Every rebuilt frame sits in a Rebuild comparison on Screens: source export, rebuild, change log, left to right on a grey backdrop. The source export is a flat image at 2x captioned with its node id and export date, and does not update when the source changes. Like the change log, the placed comparison is a detached frame because an instance cannot host children. The grey backdrop is a deliberate exception to rule 10.

## Step 7. Rules 1, 2, 5, 8, 9

- Rule 1 PASS. Master 35:332 vs detached copy 36:258: caption fills identical (color/text/secondary), root fill bound color/grey/300 on both. Screen 27:6 after the move: 20 solid paints, 0 unbound, bindings unchanged.
- Rule 2. Templates: 16 top-level nodes, 164 visible solid paints, 0 unbound, 1 image paint (placeholder). Screens: 4 top-level nodes, 112 visible solid paints, 0 unbound, 1 image paint (export).
- Rule 5 PASS. 0 unbound paints below opacity 1.
- Rule 8 PASS. 0 fractional geometry on non-vector nodes.
- Rule 9 PASS. Bound alpha only on the Text field outline (0.23); untouched.

## Flags

Added `npveComparison_noSpace32Token` GAP (low) and `npveComparison_imageFillUnbindable` GAP (low, accepted).

## Files

- `C:\Code\design system\figma-export\npve-comparison-layout-2026-09-02\` (2 PNGs, this report)
- `C:\Code\design system\apply-npve-comparison-layout.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-02-pre-npve-comparison-layout.json`
