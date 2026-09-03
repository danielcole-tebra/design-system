# Library to-dos write batch 1 of 2, 2026-09-03

Batch id `libraryTodos_write1_2026_09_03`. Library file `YX2n4YLrEpBXNbcc73T6dw`. Additive only: no node deleted, no published name renamed. Three transient instances (993:2, 993:24, 993:30) were created for the rule 1 rendered read and removed; by-id checks and TRANSIENT-name scans on Cover and Compositions came back empty. `figma.skipInvisibleInstanceChildren = false` set on every walk.

**Prompt truncation.** The batch prompt ended mid-sentence in write 2 ("…so geometry should"). Writes 1 and 2 were received and done; anything after that point was not received and is not in this batch.

## Step 0. Render findings, recorded before any write

Copied from Temp before anything else; both were present:

- `storybook-button-contained-primary-2026-09-03.png` (copy of `screenshot-1788453538220-0.png`, 1197×180): contained primary button reading "Save & Add To Note".
- `storybook-tabs-2026-09-03.png` (copy of `screenshot-1788453648698-2.png`, 1197×180): three tabs, Tab 3 selected in #004852 with a 2px indicator, Tab 1 and Tab 2 in #545454, no rule under the strip.

The three findings were written verbatim to `libraryTodos_write1_2026_09_03.step0_renderFindings` by `apply-library-todos-write1-prerecord.js` (backup `design-system-schema.backup-2026-09-03-pre-library-todos-write1.json`) before the first Figma write. The read record's A2, A1 and B2 entries carry a dated `annotation_2026_09_03` saying the 16/24 derivation and the letter-spacing inference are superseded at render; their original text is untouched. Seven flags received dated render lines; none resolved.

## Write 1. Text field size=small resting label and hidden slots

Set 121:350, the ten size=small masters. Before, on all ten: Label / resting at y 16 (24 tall) inside the 40-tall Input; Label slot 56 tall on the four hidden slots, 40 on the six visible.

| Variant | id | Label / resting y | Label slot h | Box centre offset | Glyph centre offset |
|---|---|---|---|---|---|
| Default, Empty | 130:140 | 16 → 9 | 56 → 40 (hidden) | +8 → +1 | +8.32 → +1.32 |
| Default, Filled | 130:159 | 16 → 9 | 40 (visible, untouched) | +8 → +1 | hidden |
| Hover, Empty | 130:178 | 16 → 9 | 56 → 40 (hidden) | +8 → +1 | +8.32 → +1.32 |
| Hover, Filled | 130:197 | 16 → 9 | 40 | +8 → +1 | hidden |
| Focused, Empty | 130:216 | 16 → 9 | 40 | +8 → +1 | hidden |
| Focused, Filled | 130:235 | 16 → 9 | 40 | +8 → +1 | hidden |
| Disabled, Empty | 130:254 | 16 → 9 | 56 → 40 (hidden) | +8 → +1 | +8.32 → +1.32 |
| Disabled, Filled | 130:273 | 16 → 9 | 40 | +8 → +1 | hidden |
| Error, Empty | 130:292 | 16 → 9 | 56 → 40 (hidden) | +8 → +1 | +8.32 → +1.32 |
| Error, Filled | 130:311 | 16 → 9 | 40 | +8 → +1 | hidden |

Mutated nodes: Label / resting 130:154, 130:173, 130:192, 130:211, 130:230, 130:249, 130:268, 130:287, 130:306, 130:325 (y); Label slot 130:144, 130:182, 130:258, 130:296 (height, `resize(95, 40)`, FIXED sizing inside the HORIZONTAL Outline). Variant height 60, Input 40 and Outline 40 unchanged on all ten. Medium read back after the write: all ten at y 16, slot 56, Input 56, untouched.

The +1 box offset is the code value: MUI rests the small outlined label at translate y 9 with a 24px line box in a 40px input (`InputLabel.js:100`). The todo's 8 was our error; 9 is what code does. The remaining +0.32 glyph offset is Akkurat's ascent inside its line box and exists in code too.

Pixels, `after-textfield-small-default-empty-130-140-1x.png` (300×60): outline rows 0 and 39, label ink rows 15 to 27, centre 21.5 against the input centre 20 (before: rows 22 to 34, centre 28.5). Marked 3× `after-textfield-small-default-empty-130-140-3x-marked.png`, looked at: the label sits on the input's centre line. `after-textfield-small-default-filled-130-159-1x.png` (300×68, the floating label pushes the top up by 8): outline rows 8 and 47, notch closed by the visible 40 slot; 3× looked at, floating label and value as before.

Existing consumer: the one small instance in the library, 883:2105 on Compositions (Value=Filled), reads resting y 9, slot 40, Input 40 after the write; its resting label is hidden so nothing visible moved there.

## Write 2. Tabs/Tab label bindings and case

Variants 201:3, 201:5, 201:7, 201:10, Label texts 201:4, 201:6, 201:8, 201:11. Variables verified by name in-script before binding (throws on mismatch): font/family/base VariableID:74:50 (Akkurat LL), font/size/body1 74:57 (16), font/lineHeight/body2 74:62 (20), font/weight/regular 74:51 (400). Akkurat LL Regular loaded before binding.

| Text | Before | After |
|---|---|---|
| 201:4 (selected=no Default) | literal Akkurat LL Regular 16/20, ORIGINAL, fills bound | fontFamily, fontSize, lineHeight, fontWeight bound to the four above; TITLE; fills color/text/secondary unchanged |
| 201:6 (selected=no Hover) | same | same, fills color/text/secondary |
| 201:8 (selected=yes Default) | same | same, fills color/primary/main |
| 201:11 (selected=yes Hover) | same | same, fills color/primary/main |

Read back: fontName Akkurat LL Regular, fontSize 16, lineHeight 20px, letterSpacing 0%, text 37×20 at y 14, variant 90×48, render height 11.808. Geometry identical to before; the only rendered change is case. `componentPropertyReferences` on each Label still `{ characters: "Label#201:0" }` (rule 3).

Pixels: `after-tab-set-201-13-1x.png` (480×96) and 3×, looked at: four tabs "Tab 1", two hover fills, two indicators, unchanged. `after-tabs-201-14-1x.png` (270×48): the Tabs component's three nested Tab instances read TITLE with all five bindings.

## Rule 1. Instance verification

- Text field: transient instance of 130:140 (993:2) read resting y 9, slot 40, box +1, glyph +1.32, label fill #545454 bound (1 variable), opacity 1. Capture `rule1-transient-textfield-small-130-140-1x.png` is pixel-identical to the master capture (diff bbox None).
- Tab: transient instance of 201:3 (993:24) with `Label#201:0` set to "recent problems" renders "Recent Problems", TITLE, 16/20, all five bindings present, 160×48. Capture `rule1-transient-tab-lowercase-label-1x.png` and 3×, looked at: "Recent Problems" in grey.
- Tabs: transient instance of 201:14 (993:30), 270×48, three labels TITLE, 16/20, five bindings each.

All three removed; by-id reads return null; TRANSIENT-name scans on Cover and Compositions return nothing.

## Standing batch rules

1 instance paint verification: done above (paints unchanged, alpha untouched, bound fills read back on instances). 2 unbound paint audit: no paint added or changed; not re-run. 3 reference counts: Label refs intact on all four Tab texts; Text field Label refs `Label#123:0` intact on 130:155 and 130:152. 4 skipInvisible false: set. 5 opacity last: no opacity touched. 6 enumerate: the ten small variants and four Tab variants were enumerated from the sets, not from the todo. 7 file identity: pages read in the read batch this morning; Inputs and Actions confirmed by the sets' page parents. 8 round with record: y 9, height 40, all integers; variant sizes unchanged. 9 bound paint alpha: no paint touched. 10 clone drops refs: no clone.

Rules 14 and 15 (change log and rebuild comparison) govern rebuilt frames in a target file; this batch edits library masters and places no frames. Not applicable; recorded as such.

## Publishing

These are edits to published components (Text field, Tabs/Tab, and Tabs through its nested instances). Per CLAUDE.md the library must be published manually and consuming files (Proposals, the NPVE target) must accept updates before the change reaches them. Not done here.

## Open

- Prompt truncated after write 2; further writes in this batch, if any, were not received.
- Text field small: the todo's "8" is superseded by code's 9 in the schema note; flag `npveLabelDrift_smallRestingLabelInsetIsMedium` gets a dated fix line but stays open until the NPVE target accepts the update and the drift is re-measured there.
- Tab line height: the render finding confirms 20, which the library already had; the case change is the only visible difference.

## Files

- `storybook-button-contained-primary-2026-09-03.png`, `storybook-tabs-2026-09-03.png` (plus the two originals under their Temp names)
- `after-textfield-small-default-empty-130-140-1x.png`, `-3x-marked.png`
- `after-textfield-small-default-filled-130-159-1x.png`, `-3x.png`
- `after-tab-set-201-13-1x.png`, `-3x.png`
- `after-tabs-201-14-1x.png`, `-3x.png`
- `rule1-transient-textfield-small-130-140-1x.png`, `-3x.png`
- `rule1-transient-tab-lowercase-label-1x.png`, `-3x.png`
