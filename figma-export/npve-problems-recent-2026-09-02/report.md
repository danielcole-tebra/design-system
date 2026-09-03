# Clin_Problems-Recent body — read-only itemisation, 2026-09-02

Batch `npveRebuild_problemsRecent_inventory_2026-09-02`. Source `zVsuhYehoSLLq880qRBFkq` (NDE-2026), page ⚙️ Components `21:321`, Sidesheetv3 `129:6647` child `4618:4930` Page=Clin_Problems-Recent, 550×600. Read with `page.loadAsync()` only, `skipInvisibleInstanceChildren = false`. Library `YX2n4YLrEpBXNbcc73T6dw` read with `loadAsync`; no instance created, existing on-canvas instances used for paint reads. Target `fdCQVFdvOByaOYIJYag0d6` not opened. Schema record written by `apply-npve-problems-recent.js` after backup `design-system-schema.backup-2026-09-02-pre-npve-problems-recent.json`. Flags now 170 (8 added).

Scope: body only, `Summary_Wrap 4618:4967`. Header `4618:4931` and footer `4618:5092` are template territory and appear only in step 5.

## Step 1. Screenshots (1x, PNG in this folder)

| File | Node | Size |
|---|---|---|
| step1-frame-4618-4930.png | whole variant | 550×600 |
| step1-body-summary-wrap-4618-4967.png | body | 550×476 |
| step1-region-search-row-4618-4970.png | search row | 518×40 |
| step1-region-filter-tabs-4618-4975.png | filter tab bar | 518×28 |
| step1-region-list-block-4618-4974.png | tabs + section | 518×284 |
| step1-region-recent-list-4618-4986.png | section (title + rows) | 518×248 |
| step1-region-row-asthma-4618-5029.png | one unselected row | 518×48 |

Looked at: title "Add Problem to Chart" with a bare close x; teal-outlined search field reading "Diabetes" with a magnifier; three text tabs, Recent underlined; "Recent Problems" heading; four rows of outline star, name, grey code, and a trailing control (filled green check on Diabetes Mellitus, ringed plus on the other three); empty space below; footer Cancel / Save & Add to Note / coral Save. The body regions match the itemisation below.

## Step 2. Body itemised to the leaf

Format: name · id · type · w×h · layout (direction, padding T/R/B/L, gap, align) · sizing H/V · paint (hex@opacity, U unbound / B bound). Hidden nodes marked HIDDEN; hidden subtrees were itemised separately (below the table) rather than inline.

| Node | id | Type | w×h | Layout | Sizing | Paint / text |
|---|---|---|---|---|---|---|
| Summary_Wrap | 4618:4967 | FRAME | 550×476 | V p16/16/16/16 g12 MIN/MIN, clips | FILL/FIXED | fill none |
| Tab Set Meta | 4618:4968 | INSTANCE HIDDEN | 518×56 | H g0 | FIXED/HUG | Kit Tab Set 129:5552; labels Conditions #004852, Procedures / Observations / Social #545454 (32 nodes) |
| Frame 758531505 | 4618:4969 | FRAME | 518×340 | V g16 | FILL/HUG | none |
| Frame 143727238 | 4618:4970 | FRAME | 518×40 | H g8 MIN/CENTER | FILL/HUG | none |
| Field | 4618:4971 | FRAME | 518×40 | H p8/8/8/8 g10 MIN/CENTER | FILL/HUG | fill #FFFFFF@1 U; stroke #004852@1 U, 1 INSIDE all sides; radius 4 |
| Interface, Essential/Search | 4618:4972 | INSTANCE | 24×24 | — | FIXED/FIXED | Other; vectors stroke #323232@1 U 1.5 (11.94×11.94, 5.85×5.93) |
| ✏️ Input text | 4618:4973 | TEXT | 468×24 | — | FILL/HUG | Akkurat LL Regular 16/24, #000000@1 U, style Body/Body 1 (remote), "Diabetes" |
| Frame 758531501 | 4618:4974 | FRAME | 518×284 | V g8 | FILL/HUG | none |
| Frame 758531484 | 4618:4975 | FRAME | 518×28 | V g6 | FILL/HUG | stroke #D6D6D6@1 U bottom 1 only, INSIDE |
| Frame 758531500 | 4618:4976 | FRAME | 183×28 | H g4 MIN/CENTER | HUG/HUG | none |
| Frame 758531497 › 758531492 | 4618:4977 › 4618:4978 | FRAME | 34×28 | H g2 › V p0/8/0/8 g8 CENTER | HUG/HUG | none |
| All | 4618:4979 | TEXT | 18×28 | — | FIXED/HUG | Akkurat LL Bold 14/200% (28), #9A9A9A@1 U, centre |
| Frame 758531498 › 758531492 | 4618:4980 › 4618:4981 | FRAME | 63×28 | as above | HUG/HUG | stroke #417E86@1 U bottom 2 only, INSIDE |
| Recent | 4618:4982 | TEXT | 47×28 | — | HUG/HUG | Akkurat LL Bold 14/200%, #004852@1 U |
| Frame 758531499 › 758531492 | 4618:4983 › 4618:4984 | FRAME | 78×28 | as above | HUG/HUG | none |
| Favorites | 4618:4985 | TEXT | 62×28 | — | HUG/HUG | Akkurat LL Bold 14/200%, #9A9A9A@1 U |
| Frame 758531503 | 4618:4986 | FRAME | 518×248 | V g8 | FILL/HUG | none |
| Recent Problems | 4618:4987 | TEXT | 129×24 | — | HUG/HUG | Akkurat LL Bold 16/24, #000000@1 **B** (remote variable "Color" 04eceeeb), style Headline/H4 (remote), align CENTER |
| div | 4618:4988 | FRAME HIDDEN | 518×48 | H p12/16/12/16 g16 | FILL/HUG | fill #FFFFFF@1 U r8; 34 nodes, see hidden row |
| div (row 1) | 4618:5008 | FRAME | 518×48 | H p12/16/12/16 g16 MIN/CENTER | FILL/HUG | fill none, r8 |
| star_border | 4618:5009 | INSTANCE | 24×24 | — | FIXED | Other 4618:3271 Style=Outlined; vector 20×19 #000000@1 U |
| Frame 758531077 | 4618:5010 | FRAME | 131×16 | H g16 MIN/CENTER | HUG/HUG | none |
| Interface, Essential/Done, Check | 4618:5011 | FRAME HIDDEN | 24×24 | — | FIXED | fill #C3E7C0@1 U r16; check path stroke #1D6B45@1 U |
| Frame 758531448 | 4618:5016 | FRAME | 131×16 | H g8 | HUG/HUG | none |
| Diabetes Mellitus | 4618:5017 | TEXT | 131×16 | — | HUG/HUG | Akkurat LL Regular 16/16, #000000@1 **B** ("Color" 04eceeeb), no style |
| Frame 758531078 | 4618:5375 | FRAME | 259×16 | H g16 MIN/CENTER | FILL/HUG | none |
| Interface, Essential/Done, Check | 4618:5376 | FRAME HIDDEN | 24×24 | — | FIXED | as 4618:5011 |
| E10.9 | 4618:5382 | TEXT | 34×16 | — | HUG/HUG | Akkurat LL Regular 14/16, #545454@1 U |
| Close | 4618:5018 | INSTANCE HIDDEN | 24×24 | — | FIXED | Other 10:1245; paths stroke #000000 |
| Delete | 4618:5019 | TEXT HIDDEN | 50×24 | — | FIXED | Akkurat LL Regular 16/24, #B51A2C@1 U, style CTAs/Button (remote) |
| streamlinehq-bin-interface-essential-24 | 4618:5020 | FRAME HIDDEN | 24×24 | — | FIXED | vectors stroke/fill #B51A2C@1 U (15.58×17.31 etc.) |
| Arrows, Diagrams/Arrow | 4618:5027 | INSTANCE HIDDEN | 235×24 | H g8 MAX/CENTER | FILL/HUG | Other 129:6507; fill #FFFFFF@1 U; paths stroke #323232 |
| check_circle | 4618:5028 | INSTANCE | 24×24 | — | FIXED | Other 4841:16946 Style=Filled; vector 20×20 #1D6B45@1 U |
| div (row 2) | 4618:5029 | FRAME | 518×48 | H p12/16/12/16 g16 MIN/CENTER | FILL/HUG | fill #FFFFFF@1 U, r8 |
| star_border | 4618:5030 | INSTANCE | 24×24 | — | FIXED | as row 1 |
| Frame 758531077 | 4618:5031 | FRAME | 406×16 | H g16 MIN/CENTER | FILL/HUG | none (nests name and code, unlike row 1) |
| Done, Check | 4618:5032 | FRAME HIDDEN | 24×24 | | | as above |
| Frame 758531448 › Asthma | 4618:5037 › 4618:5038 | TEXT | 58×16 | H g8 | HUG | Akkurat LL Regular 16/16, #000000@1 B |
| Frame 758531078 › J45.909 | 4618:5383 › 4618:5390 | TEXT | 52×16 | H g16, FILL | HUG | Akkurat LL Regular 14/16, #545454@1 U |
| Close / Delete / bin / Arrow | 4618:5039 / 5040 / 5041 / 5048 | HIDDEN | | | | as row 1 |
| Check-Circle | 4618:5049 | INSTANCE | 24×24 | H p4/7/4/7 g8 CENTER | FIXED | **Local** 980:15883 Mode=NotSelected; fill #FFFFFF@1 U, stroke #D6D6D6@1 U 1, r16; inner 8×8 plus vector stroke #000000@1 U 1.5 |
| div (row 3) | 4618:5050 | FRAME | 518×48 | as row 2 | FILL/HUG | fill #FFFFFF@1 U r8 |
| Chronic Obstructive Pulmonary Disease | 4618:5059 | TEXT | 295×16 | | HUG | Regular 16/16 #000000 B |
| J45.909 | 4618:5398 | TEXT | 52×16 | | HUG | Regular 14/16 #545454 U |
| star_border / hidden set / Check-Circle | 4618:5051 / 5053–5069 / 5070 | | | | | as row 2 |
| div (row 4) | 4618:5071 | FRAME | 518×48 | as row 2 | FILL/HUG | fill #FFFFFF@1 U r8 |
| Osteoarthritis | 4618:5080 | TEXT | 105×16 | | HUG | Regular 16/16 #000000 B |
| M17.11 | 4618:5406 | TEXT | 38×16 | | HUG | Regular 14/16 #545454 U |
| star_border / hidden set / Check-Circle | 4618:5072 / 5074–5090 / 5091 | | | | | as row 2 |

Hidden row 1 (`4618:4988`, "Hypertension"): same anatomy as row 2 but with the name frame at 446 FILL; Check-Circle `4618:5007` is **Mode=Selected** (Other 63:445) with fill #C3E7C0@1 U and an 8×5 check path stroke #000000@1 **B**. Close `4618:4997`, Delete `4618:4998` (#B51A2C, style CTAs/Button), bin `4618:4999` and Arrow `4618:5006` hidden as in the visible rows.

Observations from the walk:

- No text node binds family, size, line height or weight. Two fills are bound, to a remote variable named "Color" (key 04eceeeb…), which is not a library token.
- Line heights: search 24; tabs 200% = 28; title 24; names 16 (100%); codes 16. Letter spacing 0 everywhere.
- Fractional geometry only inside icon vectors. All frames are integer.
- Row 1 differs structurally from rows 2 to 4 (name frame HUG 131 with the code frame as a sibling, versus FILL 406 with the code frame nested) and has no fill where the others are white with radius 8. Invisible on the white backdrop.

## Step 3. Instances and provenance

Method: `mainComponent.key` first 8 hex characters against `figma-export/npve-enum-2026-09-02/enum-data.json` `libraryKeyPrefixes` (rebuild 5912 keys, kitA 11798, kitB 3266). Local = main component lives in this file (key not in any inventory).

| Instance(s) | Main component | Main id | Provenance |
|---|---|---|---|
| Tab Set Meta 4618:4968 (hidden) | Tab Set | 129:5552 | Kit (6b8f024e) |
| 4 × Tab inside it | Background=False, State=Active / Inactive | 129:5534 / 129:5544 | Kit (a3db59b9 / 7321786b) |
| 4 × _tab template, 4 × _tab indicator inside it | _tab template / _tab indicator | 129:5528 / 129:5526 | Kit (a1e6c1b0 / 54a390e0) |
| Interface, Essential/Search 4618:4972 | Interface, Essential/Search | 129:6489 | Other (e8c0d3dd, Streamline pack) |
| star_border × 4 (4618:5009, 5030, 5051, 5072) | Style=Outlined (set star_border) | 4618:3271 | Other (07e9545b, Material) |
| check_circle 4618:5028 | Style=Filled (set check_circle) | 4841:16946 | Other (7eee6145, Material) |
| Check-Circle × 3 (4618:5049, 5070, 5091) | Mode=NotSelected | 980:15883 | **Local** (7b4def41) |
| Check-Circle 4618:5007 (hidden) | Mode=Selected | 63:445 | Other (6fe87042) |
| Close × 5 (hidden) | Interface, Essential/Delete, Disabled | 10:1245 | Other (e7c73628) |
| Arrows, Diagrams/Arrow × 5 (hidden) | Arrows, Diagrams/Arrow | 129:6507 | Other (ffe42fca) |

Totals: 33 instances. DSR 0, Kit 13, Other 17, Local 3. Visible: 9 (one Streamline search glyph, four Material stars, one Material check, three local rings). The visible body uses no Design System Rebuild component; the only Kit instances are the hidden nav scaffold.

## Step 4. Mapping to the library

Library paint reads came from existing on-canvas instances: Text field `127:390` (Reference page, size=medium, State=Default, Value=Filled), List/Item `499:6` and Button group/Segment `886:2102` (Compositions), Checkbox `564:5` (Compositions). Tabs/Tab, Icon button, Toggle button and the icon glyphs have no on-canvas instance in the library; no instance was created; those rows say "paint not compared".

| Item | Library candidate | Verdict | What differs |
|---|---|---|---|
| Body container 4618:4967 (p16 all, g12, fixed 476) | Sidesheet template Body 6:79 (target) with Body slot 6:80 | TEMPLATE, conflict | Padding 16 vs 8/16/8/16, gap 12 vs 16, fixed vs fill. Step 5. |
| Search field 4618:4971 | Text field 121:350 size=medium, State=Default, Value=Filled (121:242); instance 127:390 | **DEFECT + GAP** | Instance: 300×56, notched floating label Regular 12/16 color/text/secondary, outline #000000@0.23 bound color/substrate/inputOutline, value Regular 16/24 #000000 bound color/text/primary, helper row (hideable). Source: 40 tall, #004852 1px, radius 4, no label. Value text matches. GAP: no start adornment property, so the search glyph has no slot (Icon/Search 575:30 and Icon/SearchOutlined (MUI) 312:4 exist). size=small exists (Reference instances 300×60 with helper); its input height was not read. Code: no height override in TextFieldOverrides.tsx. |
| Filter tab bar 4618:4975 | Tabs 201:14 (270×48, three Tabs/Tab) with Tabs/Tab 201:13 selected=no/yes × State=Default/Hover | **DEFECT**, paint not compared | Master: 90×48 p12/16/12/16, label Regular 16/20, unselected #545454 bound, selected #004852 bound, Indicator 90×2, hover fill #CBDDE0 bound. Source: 28 tall, Bold 14/28, #9A9A9A / #004852, 2px #417E86 underline. Code: TabsOverrides.tsx sets no height or font, so MUI's 48px minimum stands and the library matches code. Bottom rule → Divider 171:31 (DSR). |
| Section title 4618:4987 | No component; tokens font/family/base, font/size/body1, font/lineHeight/body1, font/weight/bold, color/text/primary | DSR tokens; h4 GAP already flagged | Code typography.ts h4 = 1rem / 700 / 1.5rem = Bold 16/24, exactly the source style and the binding already used on the Change log title. The library still has no h4 variable (`npveChangelog_noH4Token`). |
| Problem row 4618:5008 etc. | List/Item 174:17 Lines=One, State=Default (174:3); instance 499:6 | **DEFECT + GAP** | Instance: 255×48 p8/16/8/16 g0; Icon slot 56×24 with Icon swap (glyph #004852 color/action/active); Primary Regular 16/24 #000000 color/text/primary; Secondary Regular 14/20 #545454 color/text/secondary, own line, hidden on One. Colours match the source name and code. Differs: line height 16 vs 24, inline code vs second line, padding 12/16 vs 8/16, gap 16 vs 0, white r8 fill vs none (library Selected = #004852@0.08). GAP: no trailing action slot, no inline secondary. |
| Favourite star (bare 24 glyph #000000) | Icon/FavoritesOutlined 575:17 glyph; Icon button 170:77 with swap (40×40) or Toggle button 202:95 (48×48, bordered) as a control | DSR glyph; DEFECT as control; paint not compared | Source has no hit area. Library glyph colour not read. |
| Selected check (Material check_circle, #1D6B45) | Icon/CheckCircle (MUI) 200:41 | DSR glyph; paint not compared | #1D6B45 matched no token this batch. |
| Add control (local ring 24×24 #FFFFFF, #D6D6D6 1px, r16, 8×8 plus) | Icon button 170:77 with Icon/PlusOutlined 76:8 (40×40, no ring) | **DEFECT** | No ringed circular icon button in the library. |
| Hidden nav scaffold Tab Set Meta | Tabs 201:14 | NOT CARRIED | Hidden layer. |
| Hidden per-row affordances (Close, "Delete" #B51A2C, bin, Arrow, Done/Check ring #C3E7C0 + #1D6B45, Check-Circle Selected) | Icon/CloseOutlined 76:11, Icon/TrashOutlined 76:14, Icon/CheckCircle (MUI) 200:41 as glyphs | NOT CARRIED | Recorded for a later Delete state. #B51A2C, #C3E7C0 matched no token this batch. |

Counts: GAP 3 (start adornment, trailing slot, unresolved colours), DEFECT 4 (search field, filter tabs, bare controls, row inconsistency), plus 1 template conflict. All eight are in `flags[]` with `kind` set.

## Step 5. What the Sidesheet template already provides or fights

- **Body padding: CONFLICT.** Source pads 16 on all sides with gap 12; template Body 6:79 pads 8/16/8/16 with gap 16. Vertical 16 vs 8 and gap 12 vs 16. Decision needed before the first screen build.
- **Body height.** Source FIXED 476; template FILL 488 with the footer on. Content hugs at 340, so no overflow either way.
- **Second close control.** None in the body. The five hidden "Close" instances are per-row delete affordances.
- **Own footer.** Outside the body. Frame 758531478 (60 tall p8 g21) is replaced by the template footer. It holds the set's only DSR Button `4841:20912` (68×36, axes "Variant=Text, Color=Primary, Size=Medium, State=Default" in Sentence case, so from a pre-migration publish) beside two Kit buttons 171×36 and 66×36. The template provides all three.
- **Hidden nav scaffold.** Tab Set Meta 4618:4968 (Kit, 518×56) at the top of the body. Not carried.
- **Header.** "Add Problem to Chart" maps to the template Title; hidden back button maps to Show back = false.
- **State shown.** The frame shows a filled search ("Diabetes", #004852 outline) and row 1 selected. The template is state-neutral.

## Step 6. Siblings by structure and by content

**Clin_Problems-Favorites 4618:5137.** Body structure identical node for node: hidden Tab Set Meta, search row, three-cell filter bar, section with title, one hidden row and four visible rows, the same hidden affordances per row, the same local ring on rows 2 to 4, the same row fills (row 1 none, rows 2 to 4 white). The footer differs structurally: 6 children instead of 7 (no DSR text Button). Content-only differences in the body:

- Search text "Search for problem or ICD-10" (placeholder) vs "Diabetes".
- Active cell Favorites (2px #417E86 bottom stroke on the third cell) vs Recent. The inactive Favorites cells read a 1px #417E86 bottom stroke that Recent does not; the visibility of that paint was not confirmed.
- Section title "Favorites" vs "Recent Problems" (same Bold 16/24 #000000).
- Star instance swapped: `star` 4618:5349 (Other f81c4ab0, filled #F2BA2A) vs `star_border` 4618:3271 (outline #000000).
- Row 1 trailing control: local ring Mode=NotSelected vs filled green check. No row is selected in Favorites. The hidden row 1 Hypertension carries Mode=Selected in both.
- Row names and codes identical.

**Clin_Problems-Main 545:5239.** Structurally different: 3 root children (Header / MainWrap / Footer), no scaffold frames, 517 tall. Header 550×64 p16 g16 (integer gap) with the title at FILL and the close glyph as a direct child. Body MainWrap 545:5517 550×377 V p16/20/16/20 g8, HUG: toolbar row 510×42 (Kit _button template 185×42 "Create New Problem" + Kit Autocomplete Select Field 274×40 "Status"); checkbox row 510×42 with two DSR Form control label instances (rebuild keys 9821b1c5, 243efa24, 63080d8b; "No known problems", "Only show active problems"); three Item rows 510×71 H p12/4/12/4 g8 (status word Bold 14 #3FA266 or #9A9A9A with a caret vector, name Regular 18, code Body 2 14/18 #545454, hidden diversity icon, EditIcon 40×40 (Other 2f9fb1c4), hand-drawn Add Note 40×40) with Kit Divider Color=Light (kitA 79c17b47) between rows. Footer 550×76 p20 g12 with Kit Button 243×36 and a disabled Kit Button 66×36. No search, no filter tabs, no section title; it is the problem-list management screen, not the picker. Content comparison does not apply.

## Step 7. Build order for the body — PROPOSAL

Marked as a proposal. Nothing built.

1. **Container.** Sidesheet instance from the template: Title "Add Problem to Chart", Show back off, Show tertiary action on ("Save & Add To Note"). Body content goes into a local component "Problems picker body" (518 wide, V, gap 16) swapped into the Body slot. Padding decision from step 5 first.
2. **Search field: one library instance, blocked.** Text field 121:350 once decided: accept the 56-tall labelled field, or verify size=small at 40 and accept no leading glyph. A glyph drawn beside the instance would be SCAFFOLDING.
3. **Filter tabs: one library instance.** Tabs 201:14 with Label overrides All / Recent / Favorites and selected=yes on the second tab. DEFECT accepted and logged (48 tall Regular 16 instead of 28 tall Bold 14). Bottom rule: Divider 171:31 below, or rely on the indicator.
4. **Section title: composition.** One TEXT bound font/family/base, font/size/body1, font/lineHeight/body1, font/weight/bold, color/text/primary.
5. **Problem rows: composition.** Local component "Problem row" 518 wide, H, p8/16 g16, items centred: Icon button 170:77 with Icon/FavoritesOutlined 575:17; name TEXT body1 text/primary; code TEXT body2 text/secondary; trailing Icon button with Icon/PlusOutlined 76:8, swapped to Icon/CheckCircle (MUI) 200:41 on the selected row. Four instances with text overrides. The white r8 fill is dropped (invisible on paper).
6. **Selected check colour: blocked** on a token for the green (#1D6B45) until read against the Color collection.
7. **Not carried.** Hidden Tab Set Meta, hidden row 1, hidden Close / Delete / bin / Arrow / Done-Check affordances. One change-log row.
8. **Change log** beside the frame per rule 14, rows from the build prompt.

Summary: one-instance regions = Text field (after decision), Tabs, Divider, Icon buttons; composition = body frame, section title, Problem row × 4; blocked = search field height and glyph, body padding, green token.

## Schema record

`npveRebuild_problemsRecent_inventory_2026_09_02` with method, scope, screenshots, itemisation tree, provenance totals, mapping table, template conflicts, sibling comparison and the proposal. Flags added (with `kind`): `npveProblemsRecent_textFieldNoStartAdornment` GAP, `npveProblemsRecent_searchFieldDiffersFromTextField` DEFECT, `npveProblemsRecent_filterTabsCompact` DEFECT, `npveProblemsRecent_listItemNoTrailingSlot` GAP, `npveProblemsRecent_bareIconControls` DEFECT, `npveProblemsRecent_rowStructureInconsistent` DEFECT, `npveProblemsRecent_unresolvedColours` GAP, `npveProblemsRecent_bodyPaddingConflict` CONFLICT.

## Files

- `C:\Code\design system\figma-export\npve-problems-recent-2026-09-02\` (7 PNGs + this report)
- `C:\Code\design system\apply-npve-problems-recent.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-02-pre-npve-problems-recent.json`
