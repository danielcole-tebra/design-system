# Encounter shell batch, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive only); source `zVsuhYehoSLLq880qRBFkq` read only; library `YX2n4YLrEpBXNbcc73T6dw` read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted. Parts 0 to 3 done; no design question stopped the batch. Open items for Daniel are at the end.

Rulings recorded as DECISION lines in FLAGS.md: nav family used now, local MUI icons rule, 16 status-caret slot, header 68 accepted, status menu offset stays. Closed: npveWorkflows_navFamilyHomeBlocksShell, the 12-slot caret DECISION, the header-height DECISION. COMPOSITIONS.md Patient header line updated.

## 0. Carry-over
- `938:25770` renamed `Icon/MUI/ArrowDropDown`; its four instances keep working.
- Layers `352:3208` and `580:6015` renamed `ArrowDropDown`.
- Status carets `190:23` and `222:1995` resized 12 to 16 (vector now inks 6.67 x 3.33). Status control 65 to 69 wide in both rows; the rows stay 518 x 82 and 518 x 84 and nothing overflows (Status label 45 + gap 8 + caret 16 = 69).
- Screenshots: `after-part0-problems-list-body-156-2426.png` (all three variants), `after-part0-medication-list-body-236-1758.png`. The Open variant's status menu still overlaps the first row's name, as flagged; unchanged by ruling.

## 1. MUI icons
Section `32 · Local icons` `938:25769`. Every path is copied unedited from `@mui/icons-material` 5.15.12, the version packages/design-system resolves (`^5.15.11` in yarn.lock). Built by the icon recipe: 24 x 24 component, one vector at its viewBox position, constraints SCALE/SCALE, fill bound `color/text/primary`, described as local. Layer name of each vector: Vector.

Built (15), each a one-to-one name match for the source glyph:
| Source glyph (Material Symbols) | Component |
|---|---|
| list_alt | `Icon/MUI/ListAlt` 940:23002 |
| mic | `Icon/MUI/MicNone` 940:23005 |
| record_voice_over | `Icon/MUI/RecordVoiceOverOutlined` 940:23008 |
| pause_circle | `Icon/MUI/PauseCircleOutline` 940:23011 |
| stop_circle | `Icon/MUI/StopCircleOutlined` 940:23014 |
| play_circle | `Icon/MUI/PlayCircleOutline` 940:23017 |
| timeline | `Icon/MUI/Timeline` 940:23020 |
| undo, redo | `Icon/MUI/Undo` 940:23023, `Icon/MUI/Redo` 940:23026 |
| format_bold, _italic, _underlined | `FormatBold` 940:23029, `FormatItalic` 940:23032, `FormatUnderlined` 940:23035 |
| format_align_left | `FormatAlignLeft` 940:23038 |
| format_list_numbered | `FormatListNumbered` 940:23041 |
| add | `Add` 940:23044 |
Comparison, source glyph beside the Figma-rendered component, 8x: `glyph-compare-source-vs-figma-icons.png`. Section render: `after-part1-section-32-local-icons-938-25769.png`.
- Not built: a bulleted list. The source toolbar only has the numbered one.
- Source crops are cut from the 1x source frames. Two cells have no visible source: record_voice_over (only on hidden pills) and timeline (its chip is hidden). They matched on the Material name only.
- **Confirm:** Undo, Redo and FormatItalic differ in shape from the source glyph (U-turn arrows and a serif I against a curved arrow and a slab italic), and every MUI glyph is heavier than the source's wght300. Built on the name; not swapped anywhere. DECISION npveEncounterShell_undoRedoItalicShapeDiffers.

**No clear match, not built, for Daniel** (`glyph-no-match-candidates-for-daniel.png`, two nearest candidates each):
| Source glyph | Where | Candidates |
|---|---|---|
| person_heart | Assigned To pill | PersonOutline, VolunteerActivismOutlined |
| shield_lock | Note card badge | Shield, Security |
| expand_content | Note card expand | OpenInFull, Fullscreen |
| format_h1 | editor toolbar | LooksOne, Title |
| vital_signs | Vitals chip (hidden in source) | MonitorHeartOutlined, ShowChart |
| lab-tube (kit icon) | Labs chip (hidden) | ScienceOutlined, Biotech |
| shield-virus-protection (kit icon) | Allergies chip (hidden) | CoronavirusOutlined, HealthAndSafetyOutlined |
The Add Section glyph (splitscreen_add) has no MUI match either (Splitscreen, PlaylistAdd) but was outside the list.

**Swapped** (nested stand-ins, so the Note card and the page follow through their instances, checked):
- Note toolbar `468:5582`, Template pill start icon `I468:5585;78:15`: Icon/List to `Icon/MUI/ListAlt`.
- Note toolbar, mic pill start icon `I468:5613;78:15`: Icon/Telehealth to `Icon/MUI/MicNone`.
- Module chip, hidden Timeline chip glyph `I465:5517;426:4207`: Icon/Calendar to `Icon/MUI/Timeline` (still hidden, like the other unselected chips' glyphs).
Left alone because nothing matched: Assigned To (Icon/UserOutlined), the Note card lock badge and expand, the chip glyphs for Vitals, Labs and Allergies, and the Problems chip glyph (Icon/Clinical, source pill icon is hidden). The library Button recolours the swapped glyphs (checked on the toolbar: ink is primary). Screenshots: `after-part1-note-toolbar-468-5582.png`, `after-part1-module-strip-426-4214.png`. The transcription pill's radio dot is still the invention piece.
GAP npveEncounterShell_muiIconsLibraryAsk lists all 16 as library asks.

## 2. Nav
- Placeholders found: one, `429:4162` in Page/Encounter (the two other hits on Templates and the one on Screens are nested instance copies of it). No kit Primary Nav instance exists in the target. The Screens "GAP marker — Nav placeholder" card is documentation and was not touched.
- Library `Nav/Bar` (key a0ddf46b…, 279:92 in the library) imported and placed as index 0 of Page/Encounter, FILL width (1429 x 65), instance `941:14816`. The old placeholder is hidden and renamed `_Superseded · SCAFFOLDING — Nav placeholder (GAP: nav family home unsettled)`.
- Set by override to match the source: Clinical slot State=Selected, practice name "Frozen Lava Medical Center", search text "Start typing a patient name…".
- Render: not broken. `compare-nav-source-vs-library.png` (source above, rebuild below), `after-part2-page-encounter-429-4161.png` (whole page, 1429 x 985; header and module strip in context). Page height did not change (985).
- **Differences the library bar cannot express** (GAP npveEncounterShell_navBarVsSourceDifferences), left as is: no History clock in the utilities (source has history, inbox, help, avatar; the bar has messages, help, avatar); Payments (card) and Reports (bars) sit in the opposite order; the avatar is a letter, not a photo; the search field is wider and darker with a search glyph.
- Icon/Clinical and Icon/Reports white-glyph DEFECT, as seen in the render: not visible in the nav, because white on the teal ground is right there. It would show on a light surface. The Problems chip glyph on pale teal reads dark because it already carries a local recolour. Nothing fixed; the existing DEFECT stays open.

## 3. Encounter shell page
New page `Encounter shell` `943:14942`, two 1429 x 985 frames stacked, each beside its source frame.
| Frame | Node | Contents |
|---|---|---|
| Encounter · Ready · Add Problem | `943:14943` | Page/Encounter instance at (0,0); Sidesheet Docked right instance `943:15521` at (879, 65), 550 x 920, title "Add Problem to Chart", Body content = Problems picker body `94:639` (Active tab=All), Cancel / Save & Add To Note / Save. |
| Encounter · Ready · AI Note Results | `943:15819` | Same Page/Encounter instance; Docked right instance `943:16231`, 550 x 920, title "AI Note Results", Body content = placeholder `943:14940`, footer set to the full-width action reading "Add All to Note", the three footer buttons hidden. |
- Docked instances read radius 0 on all four corners, no scrim. Page and sheets are instances; the only things drawn are the frames, four annotation labels and the two reference rectangles.
- References: rectangles `943:16365` and `943:16368` carry 1:1 exports of source `4841:18039` (1442 x 1031) and `3159:21282` (1441 x 1031), fill mode FIT, hashes read back. The exports are 1442 x 1031 and 1441 x 1031 rather than 1429 x 1013 because the source content overhangs its frame.
- New local component `SCAFFOLDING — AI Note Results body placeholder` `943:14940` (518 x 744, cloned from the note body placeholder), in Templates section 15 at (1600, 1200). Its sheet slot is set to FILL so it fills the 776 body. While placing it I first put it where it made section 15 grow to 3276 and overlap section 16; I moved it to a free spot and restored the height to 2600.
- Screenshots: `after-frame-A-add-problem-943-14943.png`, `after-frame-B-ai-note-results-943-15819.png`, `after-page-encounter-shell-943-14942.png` (whole page, both pairs).
- Differences against the source: the note area behind the sheet stays the SCAFFOLDING placeholder; the page reads 985 tall against 1013; the source AI Note Results sheet is 483 wide and this one is 550 (the sheet-width rule); the Add Problem body shows the picker's own "Problems" list where the source shows "Search Results" with a checked row. The footer label renders "Save & Add To Note" and "Add All To Note" (open Button capitalisation GAP).

## Open items
- Daniel: the seven no-match glyphs, and whether Undo, Redo and FormatItalic stand.
- The library Nav/Bar differences above.
- The `Encounter shell` frames use Inter for the four annotation labels (they are labels, not product text).
