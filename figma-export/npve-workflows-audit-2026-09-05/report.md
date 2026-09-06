# NPVE source Workflows page — read-only audit, 2026-09-05

Schema record: `npveRebuild_workflowsAudit_2026-09-05`. Backup: `design-system-schema.backup-2026-09-05-pre-npve-workflows-audit.json`. Apply script: `apply-npve-workflows-audit.js`.
Source `zVsuhYehoSLLq880qRBFkq` page Workflows 105:1426 read only (page loaded with `loadAsync`, never switched, nothing selected). Library `YX2n4YLrEpBXNbcc73T6dw` and Tebra Working UI Kit `ZPf0sJy83aPyrHjCVHomya` read only for key inventories and nearest-component geometry. Target not opened. Keys explicit; `figma.skipInvisibleInstanceChildren = false` on every walk. Record gate: `npveRebuild_extReviewRepairs_2026-09-05` present — passed. Nothing built.

Read first: CLAUDE.md (with the new Sheet and comparison techniques subsection), `npveRebuild_enum_2026-09-02` (Workflows: 26 top-level, three Rec_Ready, Kit/other provenance, hidden Module Dropdown 899:7657), LIBRARY-TODOS.md items 1–17.

Provenance method, refreshed: every INSTANCE under each top-level node resolved to its main component; remote keys matched by 8-hex prefix against inventories built today of the Design System Rebuild (145 top-level components and sets) and the Kit (327). The enumeration record's inventories counted variants individually (657 / 1674); this one counts sets, so per-frame numbers agree with the 2026-09-02 record where the instance is a set variant and differ only in the inventory sizes.

## Step 1 — Current-vs-stale map

Page total: 7 843 instances. Kit 3 806 (48.5%), other remote 3 304 (42.1%), local 709 (9.0%), Design System Rebuild 24 (0.31%). "Other remote" is dominated by an icon pack (`plus` 689, `Interface, Essential/Delete, Disabled` 270, `Health, Medicine/…` 250 each, `close` 213) and an older Tebra library (`_icon button template`, `Icon Button/Default/Small/False/False`, `TemplateMgmt`, `Edit_light`). The 24 Design System Rebuild instances (Form control label, Checkbox, CheckboxUnchecked ×6 each; Button, PlusOutlined, DownCaret ×2) sit only in the four newest nodes (4715:26647, 4841:17077, 4841:18039, 4841:21245).

| # | Id | Name | Type | Size | Visible | Kit / other / local / DSR | Authored dated text (not inside remote instances) | Cluster | Render |
|---|---|---|---|---|---|---|---|---|---|
| 0 | 3943:12393 | Frame 758532141 "General Workflow: How the Note Module Works" | FRAME | 2922×2008 | yes | 164 / 180 / 7 / 0 | DOB 08/01/1994; 04/18/2022 | 2922 pair A (annotated: numbered step labels, yellow sticky) | f00 |
| 1 | 4317:11594 | Frame 758532154 (same title) | FRAME | 2922×2008 | yes | 164 / 176 / 7 / 0 | same | 2922 pair B (clean, no annotations) | f01 |
| 2 | 4715:26647 | Frame 758532155 "Sidesheet View" | FRAME | 1584×1364 | yes | 116 / 74 / 21 / 6 | DOB; 04/18/2022; 11/21/24 (Edit Problem) | board holding one 1429×815 screen with Edit Problem overlay | f02 |
| 3 | 5093:18693 | Print Example | FRAME | 1429×815 | yes | 66 / 52 / 16 / 0 | DOB; 04/18/2022 | single screen (Print pill) | f03 |
| 4 | 3943:12395 | Frame 758532143 "General Workflow" strip | FRAME | 15951×1314 | yes | 1107 / 934 / 237 / 0 | DOB; 04/18/2022 | board of 9 numbered screens (1,2,3,7,10,11,13,15,18), older shell | f04, f04a, f04b |
| 5 | 3943:12402 | Frame 758532144 "Med List & Medication Chips" | FRAME | 2906×1360 | yes | 195 / 163 / 30 / 0 | DOB; 04/18/2022 | board of 2 screens | f05 |
| 6 | 3943:13025 | Frame 758532149 "Signed Note/Add Addendum" | FRAME | 4367×2839 | yes | 253 / 211 / 78 / 0 | Signed 03/03/2026; 04/24/26 11:46 AM; DOB | board of 3 tall screens | f06 |
| 7 | 3534:17621 | arrow_drop_down_24dp… 1 | FRAME | 24×24 | yes | 0 | — | loose Material glyph | f07 |
| 8 | 899:7657 | Module Dropdown | INSTANCE (local) | 376×504 | **no** | 8 / 5 / 11 / 0 | — | hidden loose instance (renders 1×1) | f08 |
| 9 | 3456:11503 | Frame 758532101 | FRAME | 1517×280 | yes | 0 | — | board label "Select Appointment Date" | f09 |
| 10 | 2939:11510 | Frame 758532100 | FRAME | 1762×280 | yes | 0 | — | board label "Recording/Transcription Live" | f10 |
| 11 | 3943:13027 | Frame 758532151 "New 'Create' Experience Flow (Megamenu)" | FRAME | 5039×1249 | yes | 49 / 27 / 0 / 0 | DOB; 04/18/2022 | board of 3 screens + state card | f11 |
| 12 | 3456:11505 | Mark As Error_Ready | FRAME | 1429×810 | yes | 109 / 104 / 26 / 0 | 4/27/26, 5/1/26, 4/21/26, 4/12/26 (date menu); Lipid Panel 1/27/25 …; DOB | single screen; latest authored ids on the page (up to 5090) | f12 |
| 13 | 3124:12369 | Rec_Ready | FRAME | 1429×1013 | yes | 114 / 109 / 26 / 0 | "Ready to Record", "Ready to Tra"; DOB | Rec_Ready trio; nine 1429×1013 | f13 |
| 14 | 4841:17077 | Rec_Ready | FRAME | 1429×1013 | yes | 123 / 110 / 28 / 6 | same | Rec_Ready trio; nine | f14 |
| 15 | 4841:21245 | Sidesheetv3 (Page=Clin_… summary variant) | INSTANCE (local) | 550×948 | yes | 41 / 36 / 3 / 3 | — | loose sheet placed at (900, 23414) beside #14 | f15 |
| 16 | 4841:18039 | Rec_Ready | FRAME | 1429×1013 | yes | 164 / 146 / 31 / 9 | same | Rec_Ready trio; nine; contains the Add Problem overlay and a Module Dropdown at x −437 | f16 |
| 17 | 3159:20067 | Rec_Started | FRAME | 1429×1013 | yes | 106 / 104 / 14 / 0 | DOB | nine | f17 |
| 18 | 4296:17197 | Rec_Paused | FRAME | 1429×1013 | yes | 106 / 104 / 14 / 0 | DOB | nine | f18 |
| 19 | 4275:15285 | Rec_Processing | FRAME | 1429×1013 | yes | 106 / 104 / 14 / 0 | DOB | nine | f19 |
| 20 | 4294:15013 | Rec_Closed | FRAME | 1429×1013 | yes | 104 / 103 / 14 / 0 | DOB | nine | f20 |
| 21 | 3159:21282 | Rec_Open | FRAME | 1429×1013 | yes | 109 / 105 / 14 / 0 | DOB | nine; AI Note Results overlay | f21 |
| 22 | 4439:16310 | Replace_Section_Modal | FRAME | 1429×1013 | yes | 134 / 118 / 14 / 0 | DOB | nine; wraps Rec_Open_Modal + Kit Dialog - Alert + scrim | f22 |
| 23 | 3943:13029 | Frame 758532153 "Mark As Error" | FRAME | 5039×3547 | yes | 461 / 337 / 104 / 0 | Signed 03/03/2026; 04/24/26 11:46 AM; DOB | board of 4 screens + note | f23 |
| 24 | 3806:13143 | Screenshot 2026-05-05 at 9.44.35 AM 1 | RECTANGLE | 1458×106 | yes | 0 | (name carries 2026-05-05) | pasted screenshot of a document row | f24 |
| 25 | 3810:13146 | Frame 758532132 | FRAME | 758×116 | yes | 7 / 2 / 0 / 0 | DoS 3/26/26 (last update 3/28/26) | document list row rebuilt from #24 | f25 |

Every frame shares the mock patient (Steven Strange, DOB 08/01/1994) and the Kit note placeholders (Created by Steven Strange on 1/23/24, Lipid Panel 1/27/25). Mockup dates run up to 04/24/26 (addendum) and 5/1/26 (appointment menu); the screenshot rectangle is dated 2026-05-05.

### Duplicate clusters — pixel and structure evidence

**2922 pair (#0 vs #1).** Same size, same highest authored id prefix (4730), same texts, same instance sets except two annotation components (`Note` sticky ×2, `Bullet` ×2) present only in #0. Pixel diff 21.5% of the board, all inside rows 497–1996: #0's inner screen frame is 1496 tall (a 449×128 sticky rides above it) against #1's 1348, so everything below the title shifts. Content of the two screens is identical (Default state, Template dropdown). Evidence: #0 is the annotated copy, #1 the clean copy; neither has newer content. Diff image `diff-2922-pair-f00-vs-f01.png`.

**Nine 1429×1013 (#13, 14, 16, 17–22).** Base for diffs: #14 (4841:17077, exact frame render).

| Member | Pixels differing from #14 | Where | Structure difference from 4841:18039 |
|---|---|---|---|
| 3124:12369 Rec_Ready | 5.61% | left column and toolbar (bbox 16,193–1396,997) | older shell: LeftCol 450 with Clin_FHx sheet; toolbar shows filled values "SOAP", "Otto Octavius" and a Print pill; highest authored id 4907 (edited after the 4841 frames were created) |
| 4841:17077 Rec_Ready | — (base) | | newer shell: LeftCol 550 with Clin_Problems-Main sheet, RightCol 831; no overlay |
| 4841:18039 Rec_Ready | 11.59% (contents-only render cropped to the frame) | right overlay region | = 17077 plus the "Add Problem to Chart" overlay frame 550×948 at x 878 and a Module Dropdown instance at x −437 (off-canvas); the only frame with 9 DSR instances |
| 3159:20067 Rec_Started | 5.55% | left column and toolbar | old shell + "Transcription in Progress", Pause, Finish |
| 4296:17197 Rec_Paused | 5.54% | same | + "Transcription Paused", Resume |
| 4275:15285 Rec_Processing | 5.50% | same | + "Processing AI Transcriptions" |
| 4294:15013 Rec_Closed | 5.51% | same, plus header row | + "View AI Recording" |
| 3159:21282 Rec_Open | (render carries overflow) | | + AI Note Results panel 483×948 with Contextual Alert, Append/Replace Section |
| 4439:16310 Replace_Section_Modal | 91.94% | whole frame (scrim) | Rec_Open_Modal + Kit Dialog - Alert 604×232 + scrim |

Within the recording family, #13 vs #17 differ by only 0.46% (the toolbar strip, bbox 32,322–1397,438): Rec_Started/Paused/Processing/Closed/Open are one shell with the toolbar state swapped. Diff images `diff-f14-vs-*.png`.

**Rec_Ready trio (#13, #14, #16).** 4841:18039 is a superset of 4841:17077 (same 1429×1013 shell, same LeftCol 550 Problems-Main sheet, plus overlay). 3124:12369 is the older shell (450 FHx sheet) but carries the latest toolbar edits on the page (id prefix 4907; "SOAP" / "Otto Octavius" / Print). So "newest structure" and "latest edits" point at different members; both are evidence, the scope pick is Daniel's.

**Mark As Error_Ready (#12, 1429×810)** shares the 4841-era note toolbar (Print, Date pill, "SOAP:Modified", "Dr. Steven Strange") and holds the page's highest authored ids (5090), so it is the most recently touched screen. Its twin lives inside board #23 (2745:10131, same name).

## Step 2 — Page anatomy (best-evidence member 4841:18039, with 4841:17077 as its clean twin)

Root FRAME 1429×1013, VERTICAL, no fill. Children:

| Region | Node | Size | Structure | Repeats identically? |
|---|---|---|---|---|
| Top nav bar | 4841:18040 Primary Nav (Kit instance, `Primary Nav / Hover/Active=Clinical`) | 1429×65, fill #004852 | Left: logo 128, six 65×65 app icons (Platform, Clinical selected #417E86, Billing, Engage, Analytics, Payments), "Frozen Lava Medical Center"; right: search group (black 300×30 rectangle, magnifier, placeholder), four 65×65 utility slots (history, mail with badge 1, help, avatar) | Yes in all 27 encounter frames; two older board screens carry it at 1413 wide |
| Body | 4841:18041 | 1429×948, VERTICAL, padding 16, fill #FBF9F8 (off-white, not paper, not the beige token) | holds the three bands below | Yes |
| Patient header | 4841:18042 PatientHeader | 1397×96, white, 1px #D6D6D6, radius 8, padding 20, HORIZONTAL gap 24 | hidden Kit Avatar 70; row 1: name Bold 20, "(he/him)" Regular 16, "Restricted" Kit Text Button with lock; row 2: Legal Name / DOB / phone / insurer with "•" #9A9A9A separators | Yes: identical size and text set in all 27 |
| Module strip | 4841:18059 Modules_HFlex (local instance, State=Closed) | 1397×40, HORIZONTAL gap 12 | "Modules +" pill 144×40 r8 white #D6D6D6; selected chips Note 120×40 and Problems 145×40 (#DFEAEC fill, #8CB2B6 stroke, r8, icon + label + close); unselected pills r24 grey 10% (AI Summary, Vitals, Care Team, Labs/Studies, Allergies, Timeline) | Three generations: `Modules_Left` frame 48 tall (board #4 screen 1), `Modules_HFlex` frame 64 tall with round icon-only chips (board #4 screens 2–18, #2, #3), local instance 40 tall (everything from the Med List board onward, 19 frames) |
| Main columns | 4841:18060 MainWrap | 1397×748, HORIZONTAL gap 16 | LeftCol 550×517 (the sheet) + RightCol 831×748 | Column widths vary: LeftCol 450 (older, sheet hidden in the recording family so the note spans 1397) / 550 (4841 pair) / 691 (FHx editing); RightCol 931 / 831 / 1397 / 691 |
| Left sheet | 4841:18062 Sidesheetv3 (local instance, Page=Clin_Problems-Main) | 550×517, white, #D6D6D6, r8 | Header 64 / MainWrap / Footer 76 — the frame our Problems Main rebuild came from | See Step 4 |
| Note card | 4841:18065 NoteWrapper | 831×748, white, 1px #D6D6D6, r8 | NoteHeader 65 (local instance) · toolbar row 58 · NoteBody 555 (padding 16) · Footer 70; hidden TemplateMgmt panel 282×268; hidden Note_Module_Transcript 422×748 | Same four bands in every frame; named `Note_Module` in the older screens, `NoteWrapper` from the recording family on |
| Note header | NoteHeader Design=Default | 831×65, padding 12/16 | ShieldSet 40×40 (shield_lock glyph #417E86) · "Encounter Note" Bold 20 #545454 · hidden "Note Details" pill · Auto-saved (8px #3FA266 dot + Regular 14 #545454) · expand_content 24 · close 24 | Yes |
| Toolbar row | 4841:18068 | 831×58 | left: Template: SOAP 193×42, Assigned To 168×42 (Date 111×42 on Mark As Error / Print Example); right: transcription status, mic pill 78×40, (Print pill on #3, #12) | Yes; contents change with state |
| Editor | NoteBody › Subjective 799×523 (#F6F6F6, #D6D6D6, r8) | TollbarWrap 42 (undo, redo, H1, B, I, U, align, numbered list; 1px separators) + Add Section pill 161×42 · Container 783×457 white r8 with sections (drag handle, title Bold 16, "Link to Section ▾", hairline, body Regular 16, purple link chips) | Yes for the shell; sections vary |
| Note footer | 4841:18245 | 831×70, padding 16 | Kit Checkbox Item "Confidential" (Bold 14) · Kit Buttons: Charge Capture 147×42, Save & Close 124×42, Sign 84×42 (Primary, right caret) · more_vert 24 | Yes; the signed/addendum screens swap the buttons |
| Page footer | none | — | The body ends at the note card; no page footer exists on any frame | — |
| Overlays | 4841:21482 Sidesheetv3 (detached FRAME) | 550×948 at x 878, white, square corners, no scrim | "Add Problem to Chart" panel flush to the right edge for the full body height | Also: AI Note Results 483×948 (#21), Edit Problem 550×789 (#2), Module Dropdown 392×480 at x −437 (#12, 13, 14, 16), Kit Dialog with scrim (#22, board #23) |

Candidate shells, in the order the sidesheet shell was extracted: (1) page frame + body backdrop, (2) nav bar, (3) patient header band, (4) module strip, (5) note card shell with header/toolbar/body/footer slots, (6) two-column MainWrap with a left sheet slot. All six repeat identically or nearly so across the 27 encounter frames; only the module strip has three generations.

## Step 3 — Conventions catalog

Classification: **covers** = library covers it (delta noted); **gap** = library cannot express it, LIBRARY-TODOS candidate; **invention** = mockup-only styling with no product component behind it. "Drawn" = hand-built frame in the source; "Kit" = Tebra Working UI Kit instance; "other" = the icon pack / older library; "local" = a component defined in NDE-2026.

| # | Convention | Where | How drawn / provenance | Nearest library part and delta | Class |
|---|---|---|---|---|---|
| 1 | Top nav bar (logo, app icons, practice name, search, utilities, avatar with badge) | every encounter frame | Kit `Primary Nav` instance 1429×65 | `Nav/Bar` 1440×65 with Nav/Icon button, Nav/Search, Nav/Logo; DSR Avatar, Badge. Delta: 1429 vs 1440; the Nav family's home is unresolved (schema `navComponentsOnCompositionsPage`, OPEN) | covers (blocked on the nav home decision) |
| 2 | Patient header band | every frame | drawn frame 1397×96, Kit Text Button "Restricted" + lock glyph (other) | Proposals file "Patient header" v1 (900×72, built 2026-08-19, `PROPOSAL-PATIENT-HEADER-V1.md`); code `ClinicalPageHeader` (`PATIENT-HEADER-DISCOVERY.md`). Library has none | gap (proposal exists; not in the library) |
| 3 | "Modules +" pill | module strip | local `Modules Filter` 144×40, r8, white, #D6D6D6, widgets glyph + label + plus | Button contained/primary (renders white with teal outline under the Tebra override) + Start icon + End icon PlusOutlined; delta radius 8 vs pill, 40 vs 38 tall, grey stroke vs teal | covers with delta |
| 4 | Module chip, selected and closable (Note, Problems, Med List) | module strip | local components 120–145×40, #DFEAEC fill, #8CB2B6 stroke, r8, glyph + label + close | Chip 32 tall r16 with Delete icon; Toggle button 48 r4; Tabs. None is a 40-tall r8 closable chip | gap — LIBRARY-TODOS candidate 18 "Module chip" |
| 5 | Module chip, unselected pill (r24, grey 10%) and the older round icon-only 40px chips | module strip, older generation on boards #2, #3, #4 | local components | same as 4; the round icon-only form is Icon button medium (40, r20) with an outline — Icon button has no outlined variant (TODO 2) | gap (fold into 18) |
| 6 | Module Dropdown panel (Clinical / Billing lists with headers) | hidden 899:7657; placed at x −437 in #12, 13, 14, 16 | local component 392×480, #F6F6F6, #D6D6D6, r8 | Menu 300×144 r4 (no subheaders, four item slots); Nav/Dropdown 240×233 | gap — candidate 19 "Grouped menu with subheaders" |
| 7 | Note card shell (header / toolbar / body / footer) | every frame | drawn `NoteWrapper` 831×748, white, #D6D6D6, r8 | Card outlined r4 (header/media/actions, no toolbar or footer slots); Paper outlined r4; radius 8 is the NPVE-local radius/md decision | gap — candidate 20 "Module card shell" (same shape as the sidesheet shell: slots, not children) |
| 8 | Shield-lock badge before the note title | note header | local `ShieldSet` 40×40, Material `shield_lock` glyph #417E86 | Icon/Lock, Icon/Unlock exist; no shield glyph | gap — candidate 21 "Icon/ShieldLock" |
| 9 | Auto-saved indicator (green dot + "Auto-saved just now") | note header | drawn: 8px ellipse #3FA266 + Regular 14 #545454 | Badge variant=dot + caption text; no status-text pattern | invention |
| 10 | Expand control | note header | Material `expand_content` 24, #545454 | no expand glyph in DSR (Kit has `expand`) | gap — candidate 22 "Icon/Expand" |
| 11 | Close control on cards and sheets | note header, sheet header, module chips | other-remote `Interface, Essential/Delete, Disabled` 24 glyph (bare) | Icon button + Icon/CloseOutlined | covers (TODO "bare icon controls" already open) |
| 12 | Pill dropdown buttons: Template / Assigned To / Date, and their filled states (SOAP:Modified, Dr. Steven Strange, Appointment) | toolbar row | drawn `_button template` frames 168–193×42, white, #8CA7A2 1px, r24; Material glyph left (list_alt, person_heart, calendar_month), Regular 14 #004852, Kit `caret_down` 20 right | Button contained/primary + Start icon swap + End icon DownCaret. Delta: 42 vs 38 tall, stroke #8CA7A2 vs library primary, Material glyphs (DSR has Calendar only) | covers with delta |
| 13 | Mic device pill (glyph + caret, label collapsed; "Macbook Air…" expanded on boards) | toolbar right | drawn `_button template` 78×40 | Split button (Medium) or Button + End icon caret; no mic glyph in DSR | covers with delta (glyph gap) |
| 14 | Start Transcribing pill | toolbar right (boards, #3, #12) | drawn 177×40 as 12 | Button + Start icon; no transcribe glyph | covers with delta (glyph gap) |
| 15 | Transcription status states: radio-dot + teal Bold 14 "Start Transcribing"; italic "Transcription in Progress" + Pause / Finish pills; hidden "Ready to Record" salmon strip (#FFE9E3 / #DC785D) | 4841 frames and the recording family | drawn | nearest Alert or Chip; nothing expresses an inline status toggle | invention |
| 16 | Print pill | #3, #12 | drawn as 12 with print glyph | Button + Icon/PrintOutlined | covers |
| 17 | Sign split button (salmon, right caret) with kebab beside | note footer | Kit `Button Type=Primary, Icon=Right` 84×42 + Material `more_vert` | Split button 627:161 (Size Medium) or Button contained/secondary + End icon; kebab = Icon button + Icon/EllipsisFilled (horizontal glyph, source is vertical) | covers with delta |
| 18 | Footer buttons Charge Capture, Save & Close, Add Addendum, Save Addendum | note footer | Kit Button 42 tall | Button medium 38 | covers |
| 19 | Confidential checkbox row | note footer | Kit Checkbox Item, label Bold 14 | Form control label + Checkbox; label weight delta | covers |
| 20 | Rich-text toolbar (undo, redo, H1, bold, italic, underline, align left, numbered list; 1px #D6D6D6 separators) | editor, every frame | raw Material Symbol vector frames in a 42-tall wrap | DSR icons FormatBold/Italic/Underline, List, ListNested*; Toggle button; Button group/Segment; Divider vertical. No toolbar pattern; no undo/redo/H1/align/numbered glyphs | gap — candidate 23 "Editor toolbar" (icons + composition) |
| 21 | Add Section pill with caret | editor toolbar right | drawn 161×42 as 12 | as 12 | covers with delta |
| 22 | Section container: grey card (#F6F6F6, r8) holding a white container (r8) of sections, each with drag handle, title Bold 16, "Link to Section ▾" text dropdown (filled triangle caret), hairline | editor | drawn | Accordion / List/Item nearest; drag handle = Icon/DragAndDrop covers; triangle caret = TODO 14 | invention (section chrome) |
| 23 | Purple link chips "(FHx) Diabetes (Father)" | editor sections | drawn 34 tall, #F0EBF5 fill, #8657AC stroke, r4 | Chip outlined has no purple colour and no r4; #8657AC and #F0EBF5 have no token (extends TODO 6) | gap — candidate 24 "Link chip colour" |
| 24 | Medication and order chips ("Father · Diabetes ×", "Start · Sertraline · 50mg · PO · QD · Approve ×", ORDERS block with link glyph) | Med List board #5 | drawn multi-segment chips | Chip has a single label; nothing multi-segment | gap — candidate 25 "Segmented chip" |
| 25 | Status word dropdown "ACTIVE ▾" with filled triangle | sheets in every frame | drawn | TODO 14 Icon/ArrowDropDown (open) | gap (existing) |
| 26 | Template dropdown panel ("Save Current Template As" field + Save, "Load Template" list with two-line items) | boards #0, #1; hidden `TemplateMgmt` 282×268 in every note | other-remote `TemplateMgmt` | Menu + Menu/Item (one line) + Text field; no inline-field menu | gap — candidate 26 "Menu with inline field and two-line items" |
| 27 | Appointment date menu ("SELECT APPOINTMENT DATE" caption + items) | #12 | drawn | Menu covers items; no subheader | covers with delta (subheader gap, same as 6) |
| 28 | Right-docked overlay panel: Add Problem to Chart 550×948, AI Note Results 483×948, Edit Problem 550×789 | #16, #21, #22, #2 | detached Sidesheetv3 frame / drawn frame, white, square corners, flush right, full body height, no scrim | our Sidesheet Placement=Docked right (radius 8/0/0/8) — corners and the 483 width differ | covers with delta; page-level decision |
| 29 | Modal dialog with scrim | #22, board #23 | Kit `Dialog - Alert` + full-frame scrim rectangle | Dialog maxWidth sm; scrim value not read | covers |
| 30 | Warning strips: Kit `Contextual Alert` (AI Note Results), outlined "AI can make mistakes" (#DC785D outline) | #21, boards #0, #1 | Kit / drawn | Alert outlined severity=warning; delta: salmon outline | covers with delta |
| 31 | Thumbs up / down feedback | AI Patient Summary panel, boards #0, #1 | other-remote ThumbsUp/Down in 40px rings | Icon/ThumbUpOutlined (MUI), Icon/ThumbDownOutlined (MUI) (schema `insightCardAffordances2026_09_01`); ring = TODO 2 | covers |
| 32 | Signed-note status block (grey block "Status / Final Author / Signed / Encounter"), "ORIGINAL ▾" label, addendum editor and "Addendum · date · author" line | boards #6, #23 | drawn | nothing | invention |
| 33 | "Create ▾" salmon split button and the megamenu cards (BETA chip, three documentation options, template list) | board #11 | Kit button + drawn cards | Split button covers the button; megamenu = Sandbox page work, out of scope here | covers (button) / out of scope (menu) |
| 34 | Document list row (title, BETA purple chip, Open status chip, author, DoS, Open button) | #24, #25 | pasted screenshot + drawn rebuild | Chip small covers the two chips; List/Item nearest for the row | gap (not on the encounter page; note for the Notes list) |
| 35 | Page canvas colour #FBF9F8 under the bands | Body fill, every frame | drawn | no token; library `background.default` is #E8E5DF (schema `beigeSurfaceInvestigation2026_08_31`), paper is #FFFFFF | decision (colour without a token) |
| 36 | "•" #9A9A9A separators in the patient header meta row | patient header | text | typographic; nothing to model | invention |

Tally (36 rows): library-covers 18 (of which 9 with a recorded delta), library-gap 12 (candidates 18–26 plus TODO 14 and TODO 6 extensions and the patient header), invention-in-source 5, decision 1. Existing to-dos cross-referenced rather than re-derived: 2 (ringed icon button), 3 (tabs on divider), 6 (colours without token), 9 (sidesheet), 14 (ArrowDropDown), 16/17 (chip gaps).

The library Button set reads variant = contained | text only (72 variants, no outlined). The source's white teal-outlined pills correspond to `variant=contained, color=primary`, which the Tebra override renders white with a teal outline (rule 8; `buttonInheritColour2026_08_28`). Earlier batch records that say "variant=outlined" describe that variant loosely; the instances are contained/primary.

## Step 4 — Sidesheet linkage

45 sheet placements on the page (44 `Sidesheetv3` local-component instances, 1 detached frame). Every encounter frame carries one in `LeftCol`:

| Sheet variant | Placements | Size | Frames |
|---|---|---|---|
| Page=Clin_FHx | 30 (10 of them hidden duplicates stacked at y 672 in board #4 and #5) | 450×407 (older), 550×407 (recording family, #12, #6, #23) | boards #4, #5, #6, #23; #12, #13, #17–22 |
| Page=Clin_Problems-Main | 3 | 450×517 (#2), 550×517 (#14, #16) | the frame our Problems Main rebuild used |
| Clin_Problems-Edit | 1 | 550×789 in a "Side Sheet" parent | #2 (overlay) |
| Page=Clin_MedList | 2 | 450×380 | board #5 |
| Page=Clin_FHX-Editing | 1 | 691×685 | board #4 screen 3 |
| summary variant, loose | 1 | 550×948 | #15 beside #14 |
| detached frame | 1 | 550×948 at x 878 | #16 "Add Problem to Chart" |

How sheets sit on the page — two conventions, neither modelled yet:

1. **Inline left column.** The sheet is the left column of `MainWrap` (HORIZONTAL, gap 16): 450 wide in the older frames (note 931), 550 wide in the 4841 pair (note 831). In the recording family the column is hidden and the note spans 1397. The sheet is a white r8 card with a #D6D6D6 outline, which our Sidesheet Placement=Floating already matches (radius/md, four-sided hairline).
2. **Right-docked overlay.** Add Problem to Chart (550×948), AI Note Results (483×948) and Edit Problem (550×789) sit flush to the right edge for the full body height, white, square corners, no scrim, no push. Our Placement=Docked right variant has 8/0/0/8 corners, so a decision is needed on corners; the 483 width is a second size.

No dim backdrop appears with any sheet; scrims appear only with modal dialogs. The Module Dropdown is placed off-canvas (x −437) in four frames and hidden as a loose instance at page level, so it is a mockup artefact, not a page convention.

## Step 5 — Rebuild-shape proposal (proposal, not a decision)

**Shell decomposition, in order.** Same method as the sidesheet: shells with slots, bodies as swappable components, GAP markers for what the library lacks.

1. `Page/Encounter` frame 1429 wide with the body backdrop (colour decision, finding 35) and the three bands as slots.
2. `Nav/Bar` instance from the library, once the Nav family's home is settled (`navComponentsOnCompositionsPage`). Until then a GAP-marked local placeholder.
3. `Patient header` from the Proposals v1 composition (900×72) or rebuilt at the source geometry (1397×96, two rows) — decision; either way a local component consuming library parts.
4. `Module strip`: local component with a Modules pill (Button) and module chips (GAP marker, candidate 18), three chips exposed as swaps.
5. `Note card` shell: local component with Header (shield GAP, title, auto-saved, expand, close), Toolbar slot, Body slot, Footer slot (Form control label + Buttons + Split button) — the same slot pattern as Sidesheet, body content appended to preferred values.
6. `MainWrap` two-column frame with a left slot that takes our existing Sidesheet bodies and a right slot for the note card; column widths 550/831 as in the 4841 pair.

**Frames in scope for rebuild.** 4841:17077 (clean newest shell) and 4841:18039 (its overlay state) as the primary references; 3456:11505 Mark As Error_Ready for the toolbar with Date and Print pills; the Med List board screen 3943:12404 for chips inside the editor. History, not rebuild: the 2922 pair (annotated duplicates of the Default/Template states), the General Workflow strip (older 48/64-tall module strips, 450 columns), and the Rec_* family until the transcription states are wanted (they are one shell with a toolbar swap; rebuild the shell once, add the states as toolbar variants later).

**Comparison layout for 1429-wide references — decision, not solved here.** The Rebuild comparison master is 1708 wide with 550 slots. Two 1429 frames side by side plus a change log would need roughly 3 500 px. Options to choose from: stack the reference above the rebuild in a second comparison master (`Rebuild comparison/Page`), place references at 0.5× beside a 1× rebuild (breaks the 1:1 rule adopted on 2026-09-05), or widen the existing master's slots with the 550 sheets keeping their own instance. The reference export stays 2× regardless.

**First batch recommendation.** A build batch "Encounter page shell, skeleton" on a new Templates section: page frame, body backdrop, nav placeholder or Nav/Bar (per decision), patient header (per decision), module strip with GAP marker, MainWrap with our Sidesheet Problems Main body in the left slot, note card shell with an empty body and the footer row, one comparison against 4841:17077 (per the layout decision). No editor toolbar, no section chrome, no transcription states in that batch. Stop condition: any region that needs a drawn stand-in beyond the module chips.

## Decisions needed

1. Nav family home (blocks a library-consuming nav bar).
2. Patient header: source geometry or the Proposals v1 composition.
3. Right-docked panel corners (square in source, 8/0/0/8 in our Docked right) and the 483 width.
4. Comparison layout for 1429-wide references.
5. Page canvas colour #FBF9F8 (no token; beige is the coded default).
6. Scope: the 4841 pair versus the later-edited 3124:12369 / 3456:11505 toolbar content; recording family in or out.

## Standing batch rules (read-only)

1 N/A (no variant created); 2 N/A (no paint changed; the source is not audited for bindings); 3 N/A; 4 PASS (skipInvisibleInstanceChildren false on every walk; hidden duplicates found because of it); 5 PASS untouched; 6 PASS enumerated from the page, not from the 2026-09-02 record; 7 PASS keys explicit on every call, page identity confirmed by the 26-child count and ids; 8 N/A no geometry written; 9 PASS untouched; 10 N/A.

## Screenshots (this folder)

f00–f25 as listed in the map (one per top-level node; boards wider than 3 000 px rendered at 3 000 or 4 000 px and named `-at3000` / `-at4000`); f04a/f04b two legible screens from the General Workflow strip; f16 and f21 contents-only renders; crops `crop-nav-1429x65.png`, `crop-patient-header.png`, `crop-modules-strip.png`, `crop-note-header-toolbar.png`, `crop-note-footer.png`, `crop-left-sheet.png`; diffs `diff-2922-pair-f00-vs-f01.png`, `diff-f14-vs-f13/f17/f18/f19/f20/f22.png`, `diff-f14-vs-f16.png`.
