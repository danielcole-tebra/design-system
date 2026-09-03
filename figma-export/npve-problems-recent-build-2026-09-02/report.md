# Problems picker — first screen rebuild, 2026-09-02

Batch `npveRebuild_problemsRecent_build_2026-09-02`. Target `fdCQVFdvOByaOYIJYag0d6` (NPVE Rebuild): writes on Templates `3:2` and the new page Screens `27:2`. Library `YX2n4YLrEpBXNbcc73T6dw` read only; every instance imported by key in the same script as its use. Source `zVsuhYehoSLLq880qRBFkq` read only, `4618:4930` screenshotted for step 8. Schema record written by `apply-npve-problems-recent-build.js` after backup `design-system-schema.backup-2026-09-02-pre-npve-problems-recent-build.json`. Flags now 175 (5 added, 4 updated). Stopped after step 8; Favorites and Main not built.

## Step 1. Reads before building

### a. Text field 121:350

Properties: `Label#123:0` TEXT "TextField Label"; `Value text#123:11` TEXT "Default Value"; `Helper text#123:22` TEXT; `Show helper#123:33` BOOLEAN true; `required#123:44` BOOLEAN false; `select#123:55` BOOLEAN false; `multiline#123:66` BOOLEAN false; `size` medium | small; `State` Default | Hover | Focused | Disabled | Error; `Value` Empty | Filled. Twenty variants: medium 300×75, small 300×60.

Instantiated off-canvas on Templates (kept, not deleted):

| Instance | Variant | Rendered input | Input layout | Outline | Screenshot |
|---|---|---|---|---|---|
| 25:564 at (-800, 200) | size=small, State=Default, Value=Empty | **40** tall (Input I25:564;130:141) | H p8/14/8/14, radius 4, no fill | three parts Cap left 9×40, Label slot 95×56, Body right 291×40; each #000000@0.23 bound color/substrate/inputOutline | step1-textfield-small-25-564.png |
| 25:586 at (-800, 400) | size=medium, State=Default, Value=Empty | **56** tall (Input I25:586;121:231) | H p16/14/16/14, radius 4, no fill | same parts at 56 tall | step1-textfield-medium-25-586.png |

Value text Regular 16/24 bound color/text/primary; resting label Regular 16/24 color/text/secondary; helper 16 tall (hideable). The outline alpha lives in the variable: paint.opacity reads 0.23 on a bound paint and was left alone (rule 9). Observation: on size=small the Label slot part is 56 tall inside a 40-tall input, so its bottom stroke sits below the box (flag `npveProblemsBuild_textFieldSmallLabelSlotHeight`, not visible at 1x).

### b. Leading adornment or search input in the library

**None exists.** Text field has no adornment property. Autocomplete/Field 86:95 (Label, Value text, Clear icon, size, State, Value) carries only trailing icons: Icon/Close (MUI), Icon/DownCaret, tag delete icons. Menu 749:323 is four Menu/Item swaps. The name search for search / adornment / input returns the glyphs Icon/Search 575:30 and Icon/SearchOutlined (MUI) 312:4 and Nav/Search 294:147 (page Primary nav — partner theme, 400×65): a partner-theme nav composition whose magnifier is a trailing adornment drawn as a loose glyph next to a placeholder text, not a reusable input.

### c. Code

`TextFieldOverrides.tsx` sets only the select caret (`SelectProps.IconComponent`); no height, size or adornment override. The product does render a search field with a leading icon:

```
treatment-plan-ui/src/components/wiley/ProblemSearchField.tsx:102-124
  <TextField size="small" placeholder="Search problems..."
    InputProps={{ startAdornment: (<><InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>{params.InputProps.startAdornment}</>) }} />
documents-ui/src/components/DataGridColumnFilter.tsx:161-166
  <OutlinedInput size="small" placeholder="Search" startAdornment={<Search color="primary" sx={{ mr: 1 }} />} />
```

Both are `size="small"`, which MUI renders at 40px (23px line plus 8.5px padding top and bottom, recorded as computedPx on Nav/Search). Other product search fields (messages-ui PatientGroupsSearchGroup, navigation-ui PatientSearch) put the magnifier at the end. Fourteen files pair a Search icon with an adornment. So the product ships a 40-tall leading-icon search field; the library's size=small matches the height but has no slot for the icon.

**Branch taken:** no library component models a leading search adornment, so the screen uses Text field size=small (input 40) with no glyph and a GAP marker beside it. No magnifier drawn.

## Step 2. Sidesheet instance

Page Screens `27:2` created. Instance `27:6` "Screen — Clin_Problems-Recent" at (0, 0), 550×600, main Sidesheet 6:65. Properties: Title "Add Problem to Chart", Show back off, Show footer on, Show secondary action on, Show tertiary action on. The tertiary Button's Label was set to "Save & Add to Note"; the library renders textCase TITLE, so the sheet shows **"Save & Add To Note"** (176×38), left as produced.

## Step 3. Local components on Templates

**Problem row** `26:208` at (0, 1600), 518×56 hug. HORIZONTAL, padding 8/16/8/16 bound space/8 and space/16, gap 16 bound space/16, items centred, no fill. Children: Favorite = Icon button 170:5 (color=default, size=medium, 40×40) with Icon swap Icon/FavoritesOutlined 575:17 (glyph #545454 bound color/grey/600, the library default); Text = FILL-width horizontal frame, gap bound space/16, holding Name TEXT (HUG, Regular 16/24, bound font/family/base, font/size/body1, font/lineHeight/body1, font/weight/regular, fill color/text/primary) and Code TEXT (HUG, Regular 14/20 bound font/size/body2, font/lineHeight/body2, font/weight/regular, fill color/text/secondary); Trailing action = Icon button with Icon/PlusOutlined 76:8. Properties `Name#26:0` TEXT, `Code#26:1` TEXT, `Trailing action#26:2` INSTANCE_SWAP (default Icon button). Height 56 = 8 + 40 + 8 where the source rows were 48 with bare glyphs. Decision recorded: the first build put Name at FILL directly in the row, which pushed the code to the far right beside the trailing action; Name and Code were then grouped in the Text frame so the code reads beside the name as in the source. Property references verified after the move. Screenshot step3-problem-row-master-26-208.png.

**Problems picker body** `26:221` at (0, 1700), 518×384 hug. VERTICAL, padding 0 bound space/0, gap 16 bound space/16, no fill. Children:

| Child | id | Rendered | Notes |
|---|---|---|---|
| Search field | 26:222 | Text field size=small State=Default Value=Filled, FILL 518×40 | Label "Search for problem or ICD-10" (the Favorites sibling's placeholder, since a Filled field must carry a notch label), Value "Diabetes", Show helper off. Outline color/substrate/inputOutline, value color/text/primary. |
| Filter tabs | 26:244 | Tabs 201:14, 282×48 hug | Labels All / Recent / Favorites, selected=yes on Recent. |
| Section title | 26:259 | TEXT FILL, Bold 16/24 | Bound font/family/base, font/size/body1, font/lineHeight/body1, font/weight/bold, color/text/primary. |
| Rows | 26:260 | VERTICAL FILL frame, gap 0 bound space/0, 224 tall | Four Problem row instances 26:261 Diabetes Mellitus E10.9 (trailing Icon swapped to Icon/CheckCircle (MUI) 200:41, glyph rebound to color/success/dark), 26:272 Asthma J45.909, 26:282 Chronic Obstructive Pulmonary Disease J45.909, 26:292 Osteoarthritis M17.11. |

Decision recorded: the rows are grouped with gap 0 so the list reads as one MUI List; the 16 gap applies between field, tabs, title and list. Not carried: hidden Tab Set Meta, hidden row 1, hidden per-row Close / Delete / bin / Arrow / Done-Check, the white r8 row fill. Screenshot step3-body-master-26-221.png.

**Tabs instance read** (first real one; the library has no on-canvas Tabs instance): Tabs 282×48. Tab 1 "All" selected=no, 90×48, label Akkurat LL Regular **16/20** #545454 bound color/text/secondary, no indicator. Tab 2 "Recent" selected=yes, 90×48, label Regular 16/20 #004852 bound color/primary/main, Indicator 90×2 #004852 bound color/primary/main. Tab 3 "Favorites" selected=no, 102×48 (hug grows with the label), Regular 16/20 color/text/secondary. No root fills. The label renders 16/20, matching the master; family, size, line height and weight are unbound on the library label (flag `npveProblemsBuild_tabLabelTypeUnbound`).

**Selected green:** source #1D6B45; library color/success/main #3FA266 (distance 72.6) and color/success/dark #2B865A (distance 37.0). Nearest is color/success/dark, bound on the check glyph, GAP marker placed. No raw hex authored anywhere.

## Step 4. Swap

`Body#6:5` set to 26:221. The template body 6:79 padding 8/16/8/16 governs and was not overridden. The body content instance renders 518×384 inside the 488-tall body.

## Step 5. Render

Screenshot step5-screen-27-6.png, 550×600 at 1x, looked at: bold title with the 40px close; 40-tall search field with the notch label and "Diabetes"; three 48-tall text tabs, Recent underlined teal; "Recent Problems"; four 56-tall rows with star icon buttons, name, grey code beside the name, a green check on Diabetes Mellitus and plus glyphs on the rest; empty space below; footer Cancel / Save & Add To Note / coral Save.

| Region | Height |
|---|---|
| Header | 56 |
| Header divider | 1 |
| Body | 488 |
| Footer | 55 |
| Total | 600 |

Body content: Search field 40 + Filter tabs 48 + Section title 24 + Rows 224 + three gaps of 16 = 384. Plus template padding 8 + 8 = 400 in a 488 body. **No overflow; 88px slack.**

## Step 6. Standing batch rules (all ten)

- Rule 1 PASS. Problem row master vs body-master instance vs screen instance: 0 paint differences. Problems picker body master vs screen instance: 0 differences. Screen reads: outline #000000@0.23 color/substrate/inputOutline; value, title and names #000000 color/text/primary; codes #545454 color/text/secondary; indicator #004852 color/primary/main; check glyph #2B865A color/success/dark.
- Rule 2. Templates 160 visible solid paints, 0 unbound. Screens 93, 0 unbound. **Cover 0:1** (the target's pre-existing first page): 1 paint, unbound #010000 on Frame 1 1:5. Pre-existing, untouched, flagged (`npveProblemsBuild_coverPageUnboundFill`). The walk also found a stray `Change log/Row` instance 18:129 at (0, 0) on Templates, left when the changelog batch's appendChild threw after createInstance. Renamed "STRAY — …" and moved to (-800, 600); not deleted (rule 1); flagged (`npveProblemsBuild_strayChangelogRow`).
- Rule 3 PASS. Problem row: 5 references. Body master: 34 references across nested instances. Rendered check in the screen: Diabetes Mellitus | E10.9 (Icon/CheckCircle (MUI)), Asthma | J45.909, Chronic Obstructive Pulmonary Disease | J45.909, Osteoarthritis | M17.11 (Icon/PlusOutlined), against their property values.
- Rule 4. `skipInvisibleInstanceChildren = false` at the top of every script.
- Rule 5 PASS. 0 unbound paints below opacity 1.
- Rule 6. The audit enumerated every top-level node on every target page from the file.
- Rule 7. Every call passed its file key. Target pages read from the file: Cover 0:1, Templates 3:2, Screens 27:2.
- Rule 8 PASS. 0 fractional x/y/width/height on non-vector nodes, before and after the row restructure.
- Rule 9 PASS. The only bound paints with alpha are the Text field outline parts at 0.23; untouched.
- Rule 10. Not applicable (no variant clone); references re-verified after the Name/Code move.

## Step 7. Change log

`27:222` "Change log — Problems picker (detached: instances cannot host added rows)" at (650, 0), 480×613, title "Changes: Problems picker", eight rows 27:226 … 27:268 verbatim from the prompt. Screenshot step7-changelog-27-222.png, looked at: every wrap at a word boundary.

## GAP markers (defectMarkerConvention2026_08_28)

Both on Screens, left of the screen: VERTICAL g12 p16 r4, 1px dashed [6,4], fill color/grey/300, stroke color/grey/500; chip color/grey/400 r4 p3/8 with label color/grey/900 Bold 12/16 letter spacing 0.5; fix line color/grey/600 body1 tokens; difference line color/text/primary body1 tokens; example first.

- `27:295` "GAP marker — Search field" at (-450, 0), 400×240. Example: Text field size=small with the screen's label and value. Fix lives in the library: Text field 121:350 needs a start adornment slot. Marks Search field 26:222. Screenshot step1-gap-marker-search-27-295.png.
- `27:306` "GAP marker — Colours without a token" at (-450, 220), 400×288. Example: Icon button with Icon/CheckCircle (MUI) bound color/success/dark. Fix lives in the library: no token for the source greens and greys (#1D6B45 → color/success/dark; also unmatched #417E86, #9A9A9A, #004852 search border, #323232). Marks the first Problem row trailing action. Screenshot step3-gap-marker-colours-27-306.png.

Chip letter spacing 0.5px stays unbound (no letter-spacing variable).

## Step 8. Comparison

`step8-comparison-source-4618-4930-vs-target-27-6.png` (1220×680): source left, target right, both 1x, labelled. Looked at: same content and order. Differences visible: header 56 vs 64 with a larger close; search field with notch label instead of teal border and magnifier; tabs 48 vs 28 and regular weight; rows 56 vs 48 with 40px icon buttons; codes beside names in both; footer buttons 38 vs 36 with "Save & Add To Note".

## Flags

Added: `npveProblemsBuild_textFieldSmallLabelSlotHeight` DEFECT, `npveProblemsBuild_tabLabelTypeUnbound` DEFECT, `npveProblemsBuild_coverPageUnboundFill` DEFECT, `npveProblemsBuild_strayChangelogRow` DEFECT, `npveProblemsBuild_searchLabelCopy` DECISION. Updated: `npveProblemsRecent_textFieldNoStartAdornment` (built around, GAP marker 27:295, still open in the library), `npveProblemsRecent_searchFieldDiffersFromTextField` (resolved: small input is 40), `npveProblemsRecent_bodyPaddingConflict` (resolved: template governs), `npveProblemsRecent_unresolvedColours` (built with nearest tokens, GAP marker 27:306).

## Files

- `C:\Code\design system\figma-export\npve-problems-recent-build-2026-09-02\` — 10 PNGs and this report
- `C:\Code\design system\apply-npve-problems-recent-build.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-02-pre-npve-problems-recent-build.json`
