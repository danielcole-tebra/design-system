# Encounter shell click map, 2026-09-29

Read-only audit of the NPVE target `fdCQVFdvOByaOYIJYag0d6`, page `Encounter shell` 943:14942, all ten frames. No Figma writes. `figma.skipInvisibleInstanceChildren = false` on every script. The legacy source `zVsuhYehoSLLq880qRBFkq` and the library were read only; the source was read for its own prototype reactions and menu frames.

Read first: CLAUDE.md, the LOG.md 2026-09-29 entries, `audits/2026-09-29-encounter-shell-complete/REPORT.md`, `audits/2026-09-29-file-cleanup/REPORT.md` Part 1, and the open lines of FLAGS.md. Controls were enumerated from the file (an instance-tree walk of each frame, visible nodes only), not from those reports. Boxes and node ids are read off the nodes. The screenshots in this folder are 1x exports of each frame with numbered callouts drawn on afterwards; the callouts are not in the file.

Files: `click-map-01` to `click-map-10` (annotated), `raw-01` to `raw-10` (the same exports without callouts), `controls.json` (every numbered control with its frame-relative box), `ref-problems-state-open-160-1608.png` (Problems list with the status menu open, evidence for the row status caret).

## How to read the tables

Numbers are frame then control, for example `03.12`, matching the callout in that frame's screenshot. "Control node" is the node id inside the frame's Page/Encounter instance, with the frame's own instance prefix dropped. "Destination node" is what the control should open: a frame id for IN SHELL, a component or instance id in the target for STANDALONE, a source node for MISSING where the source draws it.

Classes: the four asked for, plus one I had to add.

- IN SHELL: a frame on this page already shows the destination in place.
- STANDALONE: rebuilt elsewhere in the target, not composed beside the note.
- MISSING: nothing rebuilt. The Note column says known deferral or new.
- NAV AWAY: leaves the encounter; dead in the prototype.
- **INLINE (added):** the control changes its own state or a text field and has no destination to open: formatting buttons, checkboxes, stars, the search field, drag handles, a disabled Save. It fits none of the four classes honestly (a ticked checkbox is not a frame showing a destination), so I kept it out of them. Fold it into any class you prefer; the count is separate so nothing is hidden.

What was numbered and what was not:
- Visible and interactive only. In F02 and F08 the docked right sheet covers the note card from x 879, so controls under it are not numbered there; they are numbered in the Note only frames, where they are visible.
- In F09 the scrim makes everything behind the dialog inert, so only the dialog's two controls are numbered.
- Not numbered, not treated as controls: the patient header text (name, pronouns, Restricted, legal name, sex, DOB, phone, MRN, allergy text, Balance), the header avatar, and the practice name in the nav bar. Nothing in the file marks them clickable and the source has no reaction on them. If the live app links Balance or the practice name, they are missing from this map.

## Counts

Rows are numbered callouts across the ten frames (the same control shown on nine frames counts nine times). Distinct is one per control kind.

| Class | Rows | Distinct controls |
|---|---|---|
| IN SHELL | 45 | 21 |
| STANDALONE | 51 | 9 |
| MISSING | 137 | 23 |
| NAV AWAY | 106 | 12 |
| INLINE (added) | 112 | 16 |
| **Total** | 451 | 81 |

Rows per frame: F01 43, F02 66, F03 44, F04 44, F05 67, F06 67, F07 41, F08 36, F09 2, F10 41.

Distinct controls by class:
- IN SHELL (21): Note chip; Problems chip and its ✕; Problems sheet close; Create New Problem; Start Transcribing, Cancel, Pause, Resume, Finish, View AI Recording; picker close, Cancel and the All tab; AI sheet close, Add Section, Append to Section, Replace Section, Add All to Note; dialog Cancel and Yes, replace section.
- STANDALONE (9 controls, 8 destinations): header View all (13) and the Allergies chip (Allergies list 356:3249); AI Summary chip (Patient Summary 672:7932); Vitals chip (Vitals 851:13663); FHx tag (Family History 346:3149); row Edit problem (Problem edit 318:3655); row status caret (Problem status menu 156:1321); picker Recent and Favorites tabs (picker body 26:221, 94:652).
- MISSING (23): 2 known, 21 new. Known: Modules + (module dropdown, known deferral) and the Template pill (menu; already GAP npveWorkflows_templateMenuInlineField). New: Assigned To menu; Mic device menu; Print (a source frame exists, 5093:18693); Add Section menu; Link to Section menu; Sign; More; Charge Capture; Care Team, Labs/Studies and Timeline modules; Note chip ✕ and card ✕ (Note closed); shield badge; expand; Status filter menu; row Add to note and Add Active Problems to Note (problem added to the note body); picker +, Save and Save & Add to Note (result states).
- NAV AWAY (12): the 11 nav bar items and Save & Close.
- INLINE (16): Undo, Redo, H1, Bold, Italic, Underline, Align left, Numbered list; drag handle; Confidential; the two Problems checkboxes; the disabled Save; picker search field; favorite star; AI alert dismiss.

## Findings

1. **No visible control enters Problems, so F02, F05 and F06 cannot be reached from the other frames.** The Note only layout hides chips 2 to 8 of the Module strip, leaving Modules + and the Note chip. The only route to Note and Problems is the Modules dropdown, a known deferral. The click map has two islands: the Note only chain (F01, F03, F04, F07, F08, F09, F10) and the Problems chain (F02, F05, F06). The Modules dropdown is also the presumed entry to every rebuilt sheet that has no control pointing at it (list below).
2. **The source's own prototype wiring is thin, and one link disagrees with the rebuild.** Across the eight source frames the reactions are: five Module chips (Vitals, Care Team, Labs, Allergies, Timeline) that only switch the chip's Selected variant (1424:10629, 10653, 10648, 10645, 10690); CLOSE actions; the Problems row pencil; and, in the Add Problem source 4841:18039, the picker's Cancel and a frame at 1115,85 (297 x 24) that both navigate to Rec_Ready 4841:17077. **The row pencil goes to `Clin_FHX-Editing` 129:12486, a Family History edit page (550 x 685), not to a Problem edit sheet.** The rebuild has a Problem edit sheet (318:3655, 803:11926) and the Family History edit form 638:539. This map uses Problem edit for the pencil; the source reaction is reported here, not corrected (rule 10).
3. **The date menu has no trigger in the shell.** The Note toolbar has a `Show date` property, default false, and all ten frames leave it false, so nothing in the file opens the date menu. The source frame that shows it, 3456:11505, is the misnamed 'Mark As Error_Ready' (open DEFECT). Psychotherapy note has no trigger either (presumably the Template menu or the Modules dropdown, both MISSING). Flowsheets Graph and Vitals Expanded chart/table sit inside the Flowsheets and Vitals sheets, so they are not controls in these frames.
4. **Processing to AI Note Results has no control.** F07 Processing has no button; F08 follows on completion. A prototype needs a timed transition there.
5. **In-sheet result states exist but the note does not change.** AI result section has `Action=Added` (969:16269) and F08 shows it on Assessment, so Add Section, Append, Replace (after the dialog) and Add All can end in "Added to Note" inside the sheet. No frame shows the note body receiving a section, and none shows a problem added to the note (Add to note, Add Active Problems to Note, Save & Add to Note). Those are the MISSING result states.
6. **Recording controls chain cleanly, with three seams.** Finish in the compact Problems-open frames (F05, F06) can only land on F07, which is Note only; there is no Processing with Problems open. Cancel in F05 and F06 lands on Ready with Problems open, which exists only as the base layer under the picker in F02. Create New Problem in F05 or F06 has no frame, since the picker exists only over Ready.
7. **The `Docked left` sheet variant (279:2431) is unused.** The Problems sheet beside the note is Placement=Floating with 8px corners (Part 3).
8. **Nav Help and Avatar open menus in the live product, and Search opens a typeahead.** None is rebuilt. They stay dead by the brief; listed so nobody expects them.
9. **Source strings near the unrebuilt menus** (my reading of which control opens which, not a source reaction). Source frame 3456:11505 carries: Add Family History, Add Travel History, Add Social History (Add Section menu); Care Coordination, Charge Capture, Care Checklist, Save as Draft (probably the Sign or More menu); Save Current Template, Load Template with Custom Template 1 and 2 (Template menu). The Module dropdown 899:7657 lists Clinical: Documents, Care Team, Family History, Social History, Facilities, Flowsheets, Med List, Procedures, SDOH, Travel History, Create New Section; Billing: Documents, Claim; plus New Custom Section and Save Template As.

## Part 3: STANDALONE sheets against the shell

What the shell expects. Two patterns exist and they differ:
- **Docked right overlay** (picker in F02; AI Note Results in F08 and F09): `Sidesheet` Placement=Docked right, **550 x 920, square corners (0)**, at x 879, y 65. It covers the note; it does not move it.
- **Beside the note** (Problems in F02, F05, F06): the Page/Encounter `Left slot` (INSTANCE_SWAP, default Sidesheet 6:65) holds a Sidesheet that is Placement=**Floating, 8px corners**, 550 x 600 FIXED, inside `LeftCol`; the Note card takes the remaining 831. So Problems itself is not square-cornered or docked. If "the way Problems does" is the brief, the target is the left slot at Floating.

Every sheet below is an instance of the same Sidesheet set 279:2446 (Placement Floating | Docked right | Docked left), so docking is a Placement swap plus a resize to 920, not a rebuild. Left slot capacity: the column runs y 221 to y 969, so a sheet up to **748** tall fits beside the note. The slot is fixed at 600 today and would be resized per sheet.

| Destination | Node | Size | Placement, corners | 550 wide | Square-corner dock | Beside the note (left slot, max 748) | Docked right (920) |
|---|---|---|---|---|---|---|---|
| Allergies list | 356:3249 | 550 x 447 | Floating, 8 | yes | no, needs Placement swap | fits | fits, resize to 920 |
| Allergies edit (from Allergies) | 634:11956 | 550 x 644 | Floating, 8 | yes | no | fits | fits |
| Patient Summary, Default | 672:7932 | 550 x 939 | Floating, 8 | yes | no | **does not fit** (939 > 748) | 19 over, body scrolls |
| Patient Summary, Error/Entry | 673:8046 | 550 x 1273 | Floating, 8 | yes | no | **does not fit** | 353 over |
| Patient Summary, Success | 673:8349 | 550 x 1023 | Floating, 8 | yes | no | **does not fit** | 103 over |
| Vitals, Default | 851:13663 | 550 x 528 | Floating, 8 | yes | no | fits | fits |
| Vitals, Alert | 851:13938 | 550 x 592 | Floating, 8 | yes | no | fits | fits |
| Family History | 346:3149 | 550 x 414 | Floating, 8 | yes | no | fits | fits |
| Family History edit (from Family History) | 638:539 | 550 x 644 | Floating, 8 | yes | no | fits | fits |
| Problem edit, Links=no | 318:3655 | 550 x 600 | Floating, 8 | yes | no | fits | fits |
| Problem edit, Links=yes | 803:11926 | 550 x 740 | Floating, 8 | yes | no | fits (8 spare) | fits |
| Problems list, State=Open (status menu 156:1321, 344 x 108, absolute) | sheet 160:1608, body 156:1294 | 550 x 600 | Floating, 8 | yes | n/a | it is the left slot sheet; no change | n/a |
| Picker body Recent / Favorites | 26:221 / 94:652 | 518 x 385 bodies | inside the docked sheet | yes | already docked | n/a (docked overlay) | already 920 |

Result: all destinations are 550 wide (0 off). None is square-cornered: every sheet instance is Floating with 8px corners. Beside the note, all but Patient Summary (three states) fit the 748 column. Docked right, everything but Patient Summary fits 920 without scroll; Patient Summary overflows by 19 to 353.

### Sheets with no inbound control in the ten frames

Rebuilt, 550 wide, Floating r8, not the destination of any control here. The Modules dropdown (MISSING, known deferral) is their presumed entry: Medications 253:1841 (550 x 382), Procedures & surgical history 339:6236 (350) and edit 586:6560 (530), Social History 444:5270 (790, over 748), Past Medical History 559:6085 (564), External care history 371:3360 (383), Facility Stay 392:3673 (853, over 748), Hospitalizations edit 581:6217 (651), Health Status/Observations 413:7011 (464), Flowsheets 745:9863 (482), Add new 745:10205 and Edit past 745:10773 (both 2762, over 748 and over 920). The source Module dropdown items line up with Med List, Procedures, Social History, Family History, Flowsheets and Facilities.

## Frame tables

### F01 · Encounter · Ready · `978:4048`

Note only. Screenshot: [`click-map-01-ready-978-4048.png`](click-map-01-ready-978-4048.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 01.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 01.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 01.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 01.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 01.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 01.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 01.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 01.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 01.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 01.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 01.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 01.12 | Patient header · View all (13) | Allergies list sheet (also reached by the Allergies chip) | STANDALONE | `356:3249` | Inferred: no source reaction. Edit form 634:11956. | `974:16288;426:4194` |
| 01.13 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `974:16289;426:4215` |
| 01.14 | Module chip · Note | Note module (already open) | IN SHELL | `978:4048` | no change | `974:16289;426:4230` |
| 01.15 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `974:16289;426:4230;426:4204` |
| 01.16 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `974:16294;424:4364` |
| 01.17 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `974:16294;424:4379` |
| 01.18 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `974:16294;424:4383` |
| 01.19 | Toolbar · Template pill (SOAP) ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `974:16294;469:9852;468:5585` |
| 01.20 | Toolbar · Assigned To pill (Otto Octavius) ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;468:5595` |
| 01.21 | Toolbar · Start Transcribing | Started (recording) | IN SHELL | `978:4565` | F03 | `974:16294;469:9852;966:16230` |
| 01.22 | Toolbar · Mic device pill ▾ | Microphone device menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;468:5613` |
| 01.23 | Toolbar · Print | Print preview (source frame Print Example) | MISSING | 5093:18693 (source) | new; source frame exists, unrebuilt | `974:16294;469:9852;980:16655` |
| 01.24 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15227` |
| 01.25 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15231` |
| 01.26 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15236` |
| 01.27 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15244` |
| 01.28 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15248` |
| 01.29 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15252` |
| 01.30 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15258` |
| 01.31 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15262` |
| 01.32 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `974:16294;958:25193;958:25108;955:15267` |
| 01.33 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25154;955:15020` |
| 01.34 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25154;955:15024` |
| 01.35 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25154;955:15030` |
| 01.36 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25175;955:15020` |
| 01.37 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25175;955:15024` |
| 01.38 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25175;955:15030` |
| 01.39 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `974:16294;424:4394` |
| 01.40 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `974:16294;424:4403` |
| 01.41 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `974:16294;424:4411` |
| 01.42 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `974:16294;464:5852` |
| 01.43 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `974:16294;424:4444` |

### F02 · Encounter · Ready · Add Problem · `943:14943`

Note and Problems, picker docked right. Screenshot: [`click-map-02-add-problem-943-14943.png`](click-map-02-add-problem-943-14943.png) (1x, callouts drawn on the export only, not in the file).

The docked right sheet covers the note card from x 879. Controls under it are not numbered here; they are numbered in the frames where they are visible (Note only frames for the right half of the toolbar, Add Section, Link to Section, header Expand and Close, footer buttons).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 02.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 02.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 02.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 02.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 02.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 02.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 02.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 02.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 02.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 02.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 02.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 02.12 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `429:4199;426:4215` |
| 02.13 | Module chip · Note | Note module (already open) | IN SHELL | `943:14943` | no change | `429:4199;426:4230` |
| 02.14 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `429:4199;426:4230;426:4204` |
| 02.15 | Module chip · Problems | Problems module (already open in the left slot) | IN SHELL | `943:14943` | no change | `429:4199;426:4239` |
| 02.16 | Module chip · Problems ✕ | Problems closed: back to Note only layout | IN SHELL | `978:4048` | F01 | `429:4199;426:4239;426:4204` |
| 02.17 | Module chip · AI Summary | Patient Summary sheet (AI Summary) | STANDALONE | `672:7932` | Inferred from title; Error/Entry 673:8046, Success 673:8308 | `429:4199;426:4247` |
| 02.18 | Module chip · Vitals | Vitals sheet | STANDALONE | `851:13663` | Alert state 851:13938; Expanded chart/table parked | `429:4199;465:5473` |
| 02.19 | Module chip · Care Team | Care Team module | MISSING |  | new; listed in source Module dropdown 899:7657, nothing rebuilt | `429:4199;465:5481` |
| 02.20 | Module chip · Labs/Studies | Labs/Studies module | MISSING |  | new; nothing rebuilt | `429:4199;465:5492` |
| 02.21 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `429:4542;424:4364` |
| 02.22 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `429:4542;469:9852;468:5585` |
| 02.23 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `429:4542;469:9852;468:5595` |
| 02.24 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15227` |
| 02.25 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15231` |
| 02.26 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15236` |
| 02.27 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15244` |
| 02.28 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15248` |
| 02.29 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15252` |
| 02.30 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `429:4542;958:25193;958:25154;955:15020` |
| 02.31 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `429:4542;958:25193;958:25154;955:15030` |
| 02.32 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `429:4542;958:25193;958:25175;955:15020` |
| 02.33 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `429:4542;958:25193;958:25175;955:15030` |
| 02.34 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `429:4542;424:4394` |
| 02.35 | Problems sheet · close ✕ | Problems closed: back to Note only layout | IN SHELL | `978:4048` | F01 | `429:4239;6:74` |
| 02.36 | Problems · Create New Problem + | Add Problem to Chart picker, docked right | IN SHELL | `943:14943` | F02 | `429:4239;6:80;155:1561` |
| 02.37 | Problems · Status filter ▾ | Status filter menu | MISSING |  | new; Problems list State=Open shows only the row status menu | `429:4239;6:80;160:4896` |
| 02.38 | Problems · No known problems (checkbox) | Checkbox toggled; list filters in place | INLINE |  | no destination | `429:4239;6:80;197:3289` |
| 02.39 | Problems · Only show active problems (checkbox) | Checkbox toggled; list filters in place | INLINE |  | no destination | `429:4239;6:80;197:3297` |
| 02.40 | Row 1 (active) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3134;170:1591` |
| 02.41 | Row 1 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3134;958:15333` |
| 02.42 | Row 1 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3134;958:15337` |
| 02.43 | Row 2 (resolved) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3151;170:1591` |
| 02.44 | Row 2 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3151;958:15333` |
| 02.45 | Row 2 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3151;958:15337` |
| 02.46 | Row 3 (marked as error) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3168;170:1591` |
| 02.47 | Row 3 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3168;958:15333` |
| 02.48 | Row 3 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3168;958:15337` |
| 02.49 | Problems · Add Active Problems to Note | Active problems added into the note body | MISSING |  | new; same as row Add to note | `429:4239;6:93` |
| 02.50 | Problems · Save (disabled) | Disabled; no destination | INLINE |  | disabled state | `429:4239;6:101` |
| 02.51 | Picker · close ✕ | Picker closed: Ready with Problems open | IN SHELL | `943:14943` | base layer of F02 | `279:2420` |
| 02.52 | Picker · Search field | Typed query filters the list | INLINE |  | no destination | `279:2423;94:640` |
| 02.53 | Picker · tab All | All tab (shown) | IN SHELL | `943:14943` | no change | `279:2423;94:642;201:15` |
| 02.54 | Picker · tab Recent | Picker body, Recent tab | STANDALONE | `26:221` | variant Active tab=Recent | `279:2423;94:642;201:17` |
| 02.55 | Picker · tab Favorites | Picker body, Favorites tab | STANDALONE | `94:652` | variant Active tab=Favorites | `279:2423;94:642;201:19` |
| 02.56 | Row 1 Diabetes Mellitus · favorite ☆ | Favorite toggled | INLINE |  | no destination | `279:2423;94:648;107:415` |
| 02.57 | Row 1 · add + | Problem picked (state after adding) | MISSING |  | new; no selected/added row state | `279:2423;94:648;958:15345` |
| 02.58 | Row 2 Asthma · favorite ☆ | Favorite toggled | INLINE |  | no destination | `279:2423;94:649;107:415` |
| 02.59 | Row 2 · add + | Problem picked (state after adding) | MISSING |  | new; no selected/added row state | `279:2423;94:649;958:15345` |
| 02.60 | Row 3 COPD · favorite ☆ | Favorite toggled | INLINE |  | no destination | `279:2423;94:650;107:415` |
| 02.61 | Row 3 · add + | Problem picked (state after adding) | MISSING |  | new; no selected/added row state | `279:2423;94:650;958:15345` |
| 02.62 | Row 4 Osteoarthritis · favorite ☆ | Favorite toggled | INLINE |  | no destination | `279:2423;94:651;107:415` |
| 02.63 | Row 4 · add + | Problem picked (state after adding) | MISSING |  | new; no selected/added row state | `279:2423;94:651;958:15345` |
| 02.64 | Picker · Cancel | Picker closed: Ready with Problems open | IN SHELL | `943:14943` | Source reaction: Cancel navigates to Rec_Ready 4841:17077 | `279:2427` |
| 02.65 | Picker · Save & Add to Note | Picker closed; problem in Problems list and in note | MISSING |  | new; result state not built | `279:2428` |
| 02.66 | Picker · Save | Picker closed; problem in Problems list | MISSING |  | new; result state not built | `279:2429` |

### F03 · Encounter · Started · `978:4565`

Note only. Screenshot: [`click-map-03-started-978-4565.png`](click-map-03-started-978-4565.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 03.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 03.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 03.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 03.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 03.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 03.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 03.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 03.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 03.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 03.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 03.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 03.12 | Patient header · View all (13) | Allergies list sheet (also reached by the Allergies chip) | STANDALONE | `356:3249` | Inferred: no source reaction. Edit form 634:11956. | `974:16288;426:4194` |
| 03.13 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `974:16289;426:4215` |
| 03.14 | Module chip · Note | Note module (already open) | IN SHELL | `978:4565` | no change | `974:16289;426:4230` |
| 03.15 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `974:16289;426:4230;426:4204` |
| 03.16 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `974:16294;424:4364` |
| 03.17 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `974:16294;424:4379` |
| 03.18 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `974:16294;424:4383` |
| 03.19 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `974:16294;469:9852;966:16239` |
| 03.20 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16240` |
| 03.21 | Toolbar · Cancel | Back to Ready (recording discarded) | IN SHELL | `978:4048` | F01 | `974:16294;469:9852;966:16269` |
| 03.22 | Toolbar · Pause | Paused | IN SHELL | `978:5177` | F04 | `974:16294;469:9852;966:16275` |
| 03.23 | Toolbar · Finish | Processing | IN SHELL | `978:5787` | F07 | `974:16294;469:9852;966:16282` |
| 03.24 | Toolbar · Mic device pill ▾ | Microphone device menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16246` |
| 03.25 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15227` |
| 03.26 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15231` |
| 03.27 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15236` |
| 03.28 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15244` |
| 03.29 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15248` |
| 03.30 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15252` |
| 03.31 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15258` |
| 03.32 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15262` |
| 03.33 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `974:16294;958:25193;958:25108;955:15267` |
| 03.34 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25154;955:15020` |
| 03.35 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25154;955:15024` |
| 03.36 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25154;955:15030` |
| 03.37 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25175;955:15020` |
| 03.38 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25175;955:15024` |
| 03.39 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25175;955:15030` |
| 03.40 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `974:16294;424:4394` |
| 03.41 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `974:16294;424:4403` |
| 03.42 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `974:16294;424:4411` |
| 03.43 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `974:16294;464:5852` |
| 03.44 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `974:16294;424:4444` |

### F04 · Encounter · Paused · `978:5177`

Note only. Screenshot: [`click-map-04-paused-978-5177.png`](click-map-04-paused-978-5177.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 04.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 04.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 04.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 04.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 04.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 04.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 04.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 04.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 04.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 04.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 04.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 04.12 | Patient header · View all (13) | Allergies list sheet (also reached by the Allergies chip) | STANDALONE | `356:3249` | Inferred: no source reaction. Edit form 634:11956. | `974:16288;426:4194` |
| 04.13 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `974:16289;426:4215` |
| 04.14 | Module chip · Note | Note module (already open) | IN SHELL | `978:5177` | no change | `974:16289;426:4230` |
| 04.15 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `974:16289;426:4230;426:4204` |
| 04.16 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `974:16294;424:4364` |
| 04.17 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `974:16294;424:4379` |
| 04.18 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `974:16294;424:4383` |
| 04.19 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `974:16294;469:9852;966:16291` |
| 04.20 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16292` |
| 04.21 | Toolbar · Cancel | Back to Ready (recording discarded) | IN SHELL | `978:4048` | F01 | `974:16294;469:9852;966:16321` |
| 04.22 | Toolbar · Resume | Started (resumed) | IN SHELL | `978:4565` | F03 | `974:16294;469:9852;966:16327` |
| 04.23 | Toolbar · Finish | Processing | IN SHELL | `978:5787` | F07 | `974:16294;469:9852;966:16334` |
| 04.24 | Toolbar · Mic device pill ▾ | Microphone device menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16298` |
| 04.25 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15227` |
| 04.26 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15231` |
| 04.27 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15236` |
| 04.28 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15244` |
| 04.29 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15248` |
| 04.30 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15252` |
| 04.31 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15258` |
| 04.32 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15262` |
| 04.33 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `974:16294;958:25193;958:25108;955:15267` |
| 04.34 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25154;955:15020` |
| 04.35 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25154;955:15024` |
| 04.36 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25154;955:15030` |
| 04.37 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25175;955:15020` |
| 04.38 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25175;955:15024` |
| 04.39 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25175;955:15030` |
| 04.40 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `974:16294;424:4394` |
| 04.41 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `974:16294;424:4403` |
| 04.42 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `974:16294;424:4411` |
| 04.43 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `974:16294;464:5852` |
| 04.44 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `974:16294;424:4444` |

### F05 · Encounter · Started · Problems open · `982:4584`

Note and Problems, compact. Screenshot: [`click-map-05-started-problems-open-982-4584.png`](click-map-05-started-problems-open-982-4584.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 05.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 05.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 05.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 05.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 05.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 05.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 05.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 05.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 05.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 05.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 05.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 05.12 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `429:4199;426:4215` |
| 05.13 | Module chip · Note | Note module (already open) | IN SHELL | `982:4584` | no change | `429:4199;426:4230` |
| 05.14 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `429:4199;426:4230;426:4204` |
| 05.15 | Module chip · Problems | Problems module (already open in the left slot) | IN SHELL | `982:4584` | no change | `429:4199;426:4239` |
| 05.16 | Module chip · Problems ✕ | Problems closed: back to Note only layout | IN SHELL | `978:4565` | F03 | `429:4199;426:4239;426:4204` |
| 05.17 | Module chip · AI Summary | Patient Summary sheet (AI Summary) | STANDALONE | `672:7932` | Inferred from title; Error/Entry 673:8046, Success 673:8308 | `429:4199;426:4247` |
| 05.18 | Module chip · Vitals | Vitals sheet | STANDALONE | `851:13663` | Alert state 851:13938; Expanded chart/table parked | `429:4199;465:5473` |
| 05.19 | Module chip · Care Team | Care Team module | MISSING |  | new; listed in source Module dropdown 899:7657, nothing rebuilt | `429:4199;465:5481` |
| 05.20 | Module chip · Labs/Studies | Labs/Studies module | MISSING |  | new; nothing rebuilt | `429:4199;465:5492` |
| 05.21 | Module chip · Allergies | Allergies list sheet | STANDALONE | `356:3249` | Edit form 634:11956 | `429:4199;465:5505` |
| 05.22 | Module chip · Timeline | Timeline module | MISSING |  | new; nothing rebuilt | `429:4199;465:5517` |
| 05.23 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `429:4542;424:4364` |
| 05.24 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `429:4542;424:4379` |
| 05.25 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `429:4542;424:4383` |
| 05.26 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `429:4542;469:9852;981:19701` |
| 05.27 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `429:4542;469:9852;981:19702` |
| 05.28 | Toolbar · Cancel | Back to Ready (recording discarded) | IN SHELL | `943:14943` | F02 (Ready with Problems open exists only under the picker) | `429:4542;469:9852;981:19708` |
| 05.29 | Toolbar · Pause (icon) | Paused | IN SHELL | `982:5443` | F06 | `429:4542;469:9852;981:19930` |
| 05.30 | Toolbar · Finish (icon) | Processing | IN SHELL | `978:5787` | F07 (Note only; no Processing with Problems open) | `429:4542;469:9852;981:19934` |
| 05.31 | Toolbar · Mic device pill ▾ | Microphone device menu | MISSING |  | new; no menu frame found in source | `429:4542;469:9852;981:19711` |
| 05.32 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15227` |
| 05.33 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15231` |
| 05.34 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15236` |
| 05.35 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15244` |
| 05.36 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15248` |
| 05.37 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15252` |
| 05.38 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15258` |
| 05.39 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15262` |
| 05.40 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `429:4542;958:25193;958:25108;955:15267` |
| 05.41 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `429:4542;958:25193;958:25154;955:15020` |
| 05.42 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `429:4542;958:25193;958:25154;955:15024` |
| 05.43 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `429:4542;958:25193;958:25154;955:15030` |
| 05.44 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `429:4542;958:25193;958:25175;955:15020` |
| 05.45 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `429:4542;958:25193;958:25175;955:15024` |
| 05.46 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `429:4542;958:25193;958:25175;955:15030` |
| 05.47 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `429:4542;424:4394` |
| 05.48 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `429:4542;424:4403` |
| 05.49 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `429:4542;424:4411` |
| 05.50 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `429:4542;464:5852` |
| 05.51 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `429:4542;424:4444` |
| 05.52 | Problems sheet · close ✕ | Problems closed: back to Note only layout | IN SHELL | `978:4565` | F03 | `429:4239;6:74` |
| 05.53 | Problems · Create New Problem + | Add Problem to Chart picker, docked right | IN SHELL | `943:14943` | F02 (picker over a recording state is not built) | `429:4239;6:80;155:1561` |
| 05.54 | Problems · Status filter ▾ | Status filter menu | MISSING |  | new; Problems list State=Open shows only the row status menu | `429:4239;6:80;160:4896` |
| 05.55 | Problems · No known problems (checkbox) | Checkbox toggled; list filters in place | INLINE |  | no destination | `429:4239;6:80;197:3289` |
| 05.56 | Problems · Only show active problems (checkbox) | Checkbox toggled; list filters in place | INLINE |  | no destination | `429:4239;6:80;197:3297` |
| 05.57 | Row 1 (active) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3134;170:1591` |
| 05.58 | Row 1 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3134;958:15333` |
| 05.59 | Row 1 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3134;958:15337` |
| 05.60 | Row 2 (resolved) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3151;170:1591` |
| 05.61 | Row 2 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3151;958:15333` |
| 05.62 | Row 2 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3151;958:15337` |
| 05.63 | Row 3 (marked as error) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3168;170:1591` |
| 05.64 | Row 3 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3168;958:15333` |
| 05.65 | Row 3 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3168;958:15337` |
| 05.66 | Problems · Add Active Problems to Note | Active problems added into the note body | MISSING |  | new; same as row Add to note | `429:4239;6:93` |
| 05.67 | Problems · Save (disabled) | Disabled; no destination | INLINE |  | disabled state | `429:4239;6:101` |

### F06 · Encounter · Paused · Problems open · `982:5443`

Note and Problems, compact. Screenshot: [`click-map-06-paused-problems-open-982-5443.png`](click-map-06-paused-problems-open-982-5443.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 06.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 06.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 06.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 06.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 06.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 06.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 06.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 06.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 06.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 06.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 06.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 06.12 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `429:4199;426:4215` |
| 06.13 | Module chip · Note | Note module (already open) | IN SHELL | `982:5443` | no change | `429:4199;426:4230` |
| 06.14 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `429:4199;426:4230;426:4204` |
| 06.15 | Module chip · Problems | Problems module (already open in the left slot) | IN SHELL | `982:5443` | no change | `429:4199;426:4239` |
| 06.16 | Module chip · Problems ✕ | Problems closed: back to Note only layout | IN SHELL | `978:5177` | F04 | `429:4199;426:4239;426:4204` |
| 06.17 | Module chip · AI Summary | Patient Summary sheet (AI Summary) | STANDALONE | `672:7932` | Inferred from title; Error/Entry 673:8046, Success 673:8308 | `429:4199;426:4247` |
| 06.18 | Module chip · Vitals | Vitals sheet | STANDALONE | `851:13663` | Alert state 851:13938; Expanded chart/table parked | `429:4199;465:5473` |
| 06.19 | Module chip · Care Team | Care Team module | MISSING |  | new; listed in source Module dropdown 899:7657, nothing rebuilt | `429:4199;465:5481` |
| 06.20 | Module chip · Labs/Studies | Labs/Studies module | MISSING |  | new; nothing rebuilt | `429:4199;465:5492` |
| 06.21 | Module chip · Allergies | Allergies list sheet | STANDALONE | `356:3249` | Edit form 634:11956 | `429:4199;465:5505` |
| 06.22 | Module chip · Timeline | Timeline module | MISSING |  | new; nothing rebuilt | `429:4199;465:5517` |
| 06.23 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `429:4542;424:4364` |
| 06.24 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `429:4542;424:4379` |
| 06.25 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `429:4542;424:4383` |
| 06.26 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `429:4542;469:9852;981:19716` |
| 06.27 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `429:4542;469:9852;981:19717` |
| 06.28 | Toolbar · Cancel | Back to Ready (recording discarded) | IN SHELL | `943:14943` | F02 (Ready with Problems open exists only under the picker) | `429:4542;469:9852;981:19723` |
| 06.29 | Toolbar · Resume (icon) | Started (resumed) | IN SHELL | `982:4584` | F05 | `429:4542;469:9852;981:19938` |
| 06.30 | Toolbar · Finish (icon) | Processing | IN SHELL | `978:5787` | F07 (Note only; no Processing with Problems open) | `429:4542;469:9852;981:19942` |
| 06.31 | Toolbar · Mic device pill ▾ | Microphone device menu | MISSING |  | new; no menu frame found in source | `429:4542;469:9852;981:19726` |
| 06.32 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15227` |
| 06.33 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15231` |
| 06.34 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15236` |
| 06.35 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15244` |
| 06.36 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15248` |
| 06.37 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15252` |
| 06.38 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15258` |
| 06.39 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `429:4542;958:25193;958:25108;955:15262` |
| 06.40 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `429:4542;958:25193;958:25108;955:15267` |
| 06.41 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `429:4542;958:25193;958:25154;955:15020` |
| 06.42 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `429:4542;958:25193;958:25154;955:15024` |
| 06.43 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `429:4542;958:25193;958:25154;955:15030` |
| 06.44 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `429:4542;958:25193;958:25175;955:15020` |
| 06.45 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `429:4542;958:25193;958:25175;955:15024` |
| 06.46 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `429:4542;958:25193;958:25175;955:15030` |
| 06.47 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `429:4542;424:4394` |
| 06.48 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `429:4542;424:4403` |
| 06.49 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `429:4542;424:4411` |
| 06.50 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `429:4542;464:5852` |
| 06.51 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `429:4542;424:4444` |
| 06.52 | Problems sheet · close ✕ | Problems closed: back to Note only layout | IN SHELL | `978:5177` | F04 | `429:4239;6:74` |
| 06.53 | Problems · Create New Problem + | Add Problem to Chart picker, docked right | IN SHELL | `943:14943` | F02 (picker over a recording state is not built) | `429:4239;6:80;155:1561` |
| 06.54 | Problems · Status filter ▾ | Status filter menu | MISSING |  | new; Problems list State=Open shows only the row status menu | `429:4239;6:80;160:4896` |
| 06.55 | Problems · No known problems (checkbox) | Checkbox toggled; list filters in place | INLINE |  | no destination | `429:4239;6:80;197:3289` |
| 06.56 | Problems · Only show active problems (checkbox) | Checkbox toggled; list filters in place | INLINE |  | no destination | `429:4239;6:80;197:3297` |
| 06.57 | Row 1 (active) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3134;170:1591` |
| 06.58 | Row 1 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3134;958:15333` |
| 06.59 | Row 1 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3134;958:15337` |
| 06.60 | Row 2 (resolved) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3151;170:1591` |
| 06.61 | Row 2 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3151;958:15333` |
| 06.62 | Row 2 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3151;958:15337` |
| 06.63 | Row 3 (marked as error) · status ▾ | Problem status menu (Active, Resolved, Mark as Error) | STANDALONE | `156:1321` | in Problems list body State=Open 156:1294, sheet 160:1608 | `429:4239;6:80;172:3168;170:1591` |
| 06.64 | Row 3 · Edit problem | Problem edit sheet | STANDALONE | `318:3655` | Links=yes 803:11926 (740 tall). Source reaction sends the pencil to Clin_FHX-Editing 129:12486 | `429:4239;6:80;172:3168;958:15333` |
| 06.65 | Row 3 · Add to note | Problem added into the note body | MISSING |  | new; no note state with a problem added | `429:4239;6:80;172:3168;958:15337` |
| 06.66 | Problems · Add Active Problems to Note | Active problems added into the note body | MISSING |  | new; same as row Add to note | `429:4239;6:93` |
| 06.67 | Problems · Save (disabled) | Disabled; no destination | INLINE |  | disabled state | `429:4239;6:101` |

### F07 · Encounter · Processing · `978:5787`

Note only. Screenshot: [`click-map-07-processing-978-5787.png`](click-map-07-processing-978-5787.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 07.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 07.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 07.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 07.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 07.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 07.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 07.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 07.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 07.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 07.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 07.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 07.12 | Patient header · View all (13) | Allergies list sheet (also reached by the Allergies chip) | STANDALONE | `356:3249` | Inferred: no source reaction. Edit form 634:11956. | `974:16288;426:4194` |
| 07.13 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `974:16289;426:4215` |
| 07.14 | Module chip · Note | Note module (already open) | IN SHELL | `978:5787` | no change | `974:16289;426:4230` |
| 07.15 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `974:16289;426:4230;426:4204` |
| 07.16 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `974:16294;424:4364` |
| 07.17 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `974:16294;424:4379` |
| 07.18 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `974:16294;424:4383` |
| 07.19 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `974:16294;469:9852;966:16343` |
| 07.20 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16344` |
| 07.21 | Toolbar · Mic device pill ▾ | Microphone device menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16350` |
| 07.22 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15227` |
| 07.23 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15231` |
| 07.24 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15236` |
| 07.25 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15244` |
| 07.26 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15248` |
| 07.27 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15252` |
| 07.28 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15258` |
| 07.29 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15262` |
| 07.30 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `974:16294;958:25193;958:25108;955:15267` |
| 07.31 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25154;955:15020` |
| 07.32 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25154;955:15024` |
| 07.33 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25154;955:15030` |
| 07.34 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25175;955:15020` |
| 07.35 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25175;955:15024` |
| 07.36 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25175;955:15030` |
| 07.37 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `974:16294;424:4394` |
| 07.38 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `974:16294;424:4403` |
| 07.39 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `974:16294;424:4411` |
| 07.40 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `974:16294;464:5852` |
| 07.41 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `974:16294;424:4444` |

### F08 · Encounter · Ready · AI Note Results · `943:15819`

Note only, AI sheet docked right. Screenshot: [`click-map-08-ai-note-results-943-15819.png`](click-map-08-ai-note-results-943-15819.png) (1x, callouts drawn on the export only, not in the file).

The docked right sheet covers the note card from x 879. Controls under it are not numbered here; they are numbered in the frames where they are visible (Note only frames for the right half of the toolbar, Add Section, Link to Section, header Expand and Close, footer buttons).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 08.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 08.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 08.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 08.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 08.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 08.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 08.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 08.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 08.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 08.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 08.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 08.12 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `974:16289;426:4215` |
| 08.13 | Module chip · Note | Note module (already open) | IN SHELL | `943:15819` | no change | `974:16289;426:4230` |
| 08.14 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `974:16289;426:4230;426:4204` |
| 08.15 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `974:16294;424:4364` |
| 08.16 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `974:16294;469:9852;468:5585` |
| 08.17 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;468:5595` |
| 08.18 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15227` |
| 08.19 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15231` |
| 08.20 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15236` |
| 08.21 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15244` |
| 08.22 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15248` |
| 08.23 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15252` |
| 08.24 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15258` |
| 08.25 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15262` |
| 08.26 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25154;955:15020` |
| 08.27 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25154;955:15030` |
| 08.28 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25175;955:15020` |
| 08.29 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25175;955:15030` |
| 08.30 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `974:16294;424:4394` |
| 08.31 | AI Note Results · close ✕ | AI sheet closed: Closed state | IN SHELL | `978:7020` | F10; presumed | `279:2420` |
| 08.32 | AI alert · dismiss ✕ | Warning alert dismissed | INLINE |  | no destination; no frame without the alert | `279:2423;969:16277;743:4423` |
| 08.33 | Subjective · Add Section | Section marked Added to Note | IN SHELL | `943:15819` | F08 Assessment shows Action=Added (969:16269); note body update not built | `279:2423;969:16290;969:16243` |
| 08.34 | Objective · Append to Section | Section marked Added to Note (appended) | IN SHELL | `943:15819` | Action=Added; note body update not built | `279:2423;969:16301;969:16256` |
| 08.35 | Objective · Replace Section | Replace section dialog over a scrim | IN SHELL | `978:6363` | F09 | `279:2423;969:16301;969:16262` |
| 08.36 | AI Note Results · Add All to Note | All sections Added to Note | IN SHELL | `943:15819` | each section can show Added (969:16269); all-Added composition not drawn | `279:2430;248:1828` |

### F09 · Encounter · Replace section · `978:6363`

Note only, AI sheet docked right, scrim, dialog. Screenshot: [`click-map-09-replace-section-978-6363.png`](click-map-09-replace-section-978-6363.png) (1x, callouts drawn on the export only, not in the file).

Everything behind the scrim (nav, header, note card, AI sheet) is inert while the dialog is open, so only the dialog's two controls are numbered. The sheet's controls are numbered in F08.

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 09.1 | Replace dialog · Cancel | Dialog closed: AI Note Results | IN SHELL | `943:15819` | F08 | `976:16645;186:10` |
| 09.2 | Replace dialog · Yes, replace section | Section replaced; dialog closed | IN SHELL | `943:15819` | Objective Added state not drawn; note body update not built | `976:16645;186:18` |

### F10 · Encounter · Closed · `978:7020`

Note only. Screenshot: [`click-map-10-closed-978-7020.png`](click-map-10-closed-978-7020.png) (1x, callouts drawn on the export only, not in the file).

| # | Control | Destination | Class | Destination node | Note | Control node |
|---|---|---|---|---|---|---|
| 10.1 | Nav/Logo | Tebra home | NAV AWAY |  |  | `974:16284;296:144` |
| 10.2 | Nav · Platform | Platform / app switcher | NAV AWAY |  |  | `974:16284;296:153` |
| 10.3 | Nav · Clinical (current area) | Clinical home (current area) | NAV AWAY |  |  | `974:16284;296:163` |
| 10.4 | Nav · Billing | Billing area | NAV AWAY |  |  | `974:16284;296:170` |
| 10.5 | Nav · Engage | Engage area | NAV AWAY |  |  | `974:16284;296:177` |
| 10.6 | Nav · Payments | Payments area | NAV AWAY |  |  | `974:16284;296:184` |
| 10.7 | Nav · Reports | Reports area | NAV AWAY |  |  | `974:16284;296:192` |
| 10.8 | Nav · Patient search | Patient search results, then another patient chart | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:201` |
| 10.9 | Nav · Messages (badge 1) | Messages / inbox | NAV AWAY |  |  | `974:16284;296:205` |
| 10.10 | Nav · Help | Help (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:218` |
| 10.11 | Nav · Account avatar | Account menu (opens a menu in the live product) | NAV AWAY |  | flyout/typeahead not rebuilt; stays dead | `974:16284;296:226` |
| 10.12 | Patient header · View all (13) | Allergies list sheet (also reached by the Allergies chip) | STANDALONE | `356:3249` | Inferred: no source reaction. Edit form 634:11956. | `974:16288;426:4194` |
| 10.13 | Modules + | Module dropdown (Clinical and Billing groups, source 899:7657) | MISSING | 899:7657 (source) | known deferral; GAP npveWorkflows_groupedMenuNoSubheader | `974:16289;426:4215` |
| 10.14 | Module chip · Note | Note module (already open) | IN SHELL | `978:7020` | no change | `974:16289;426:4230` |
| 10.15 | Module chip · Note ✕ | Note module closed: page without a note card | MISSING |  | new; no frame shows the Note closed | `974:16289;426:4230;426:4204` |
| 10.16 | Note card · shield badge | Unknown: lock/privacy popover on the note | MISSING |  | new; source draws no target | `974:16294;424:4364` |
| 10.17 | Note card · expand | Expanded note (likely Note only layout) | MISSING |  | new; unconfirmed, no source reaction. If it means Note only, it is IN SHELL | `974:16294;424:4379` |
| 10.18 | Note card · close ✕ | Note closed (or back to the chart) | MISSING |  | new; no frame; same destination as Note chip ✕ | `974:16294;424:4383` |
| 10.19 | Toolbar · Template pill ▾ | Template menu (Save Current Template, Load Template) | MISSING | 3456:11505 (source) | already GAP npveWorkflows_templateMenuInlineField | `974:16294;469:9852;966:16374` |
| 10.20 | Toolbar · Assigned To pill ▾ | Provider picker menu | MISSING |  | new; no menu frame found in source | `974:16294;469:9852;966:16375` |
| 10.21 | Toolbar · View AI Recording | AI Note Results sheet, docked right | IN SHELL | `943:15819` | F08; presumed | `974:16294;469:9852;966:16402` |
| 10.22 | Editor · Undo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15227` |
| 10.23 | Editor · Redo | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15231` |
| 10.24 | Editor · H1 | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15236` |
| 10.25 | Editor · Bold | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15244` |
| 10.26 | Editor · Italic | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15248` |
| 10.27 | Editor · Underline | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15252` |
| 10.28 | Editor · Align left | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15258` |
| 10.29 | Editor · Numbered list | Text formatting in the note body | INLINE |  | no destination | `974:16294;958:25193;958:25108;955:15262` |
| 10.30 | Editor · Add Section ▾ | Add Section menu (Add Family History, Travel History, Social History in source) | MISSING | 3456:11505 (source) | new | `974:16294;958:25193;958:25108;955:15267` |
| 10.31 | Family History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25154;955:15020` |
| 10.32 | Family History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25154;955:15024` |
| 10.33 | Family History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25154;955:15030` |
| 10.34 | Social History · drag handle | Reorder sections (drag) | INLINE |  | no destination | `974:16294;958:25193;958:25175;955:15020` |
| 10.35 | Social History · Link to Section ▾ | Link to Section menu | MISSING |  | new | `974:16294;958:25193;958:25175;955:15024` |
| 10.36 | Social History · FHx tag | Family History sheet (tag is a family-history link) | STANDALONE | `346:3149` | Inferred; edit form 638:539 | `974:16294;958:25193;958:25175;955:15030` |
| 10.37 | Footer · Confidential checkbox | Confidential toggled | INLINE |  | no destination | `974:16294;424:4394` |
| 10.38 | Footer · Charge Capture | Charge Capture | MISSING |  | new; destination not drawn (billing sheet or dialog) | `974:16294;424:4403` |
| 10.39 | Footer · Save & Close | Note saved, encounter left (patient chart) | NAV AWAY |  | presumed | `974:16294;424:4411` |
| 10.40 | Footer · Sign ▾ | Sign menu / sign flow | MISSING |  | new | `974:16294;464:5852` |
| 10.41 | Footer · More (…) | More menu (Care Coordination, Care Checklist, Save as Draft in source) | MISSING | 3456:11505 (source) | new | `974:16294;424:4444` |
