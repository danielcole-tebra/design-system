# NPVE target read-only file cleanup audit, 2026-09-29

File audited: NPVE target `fdCQVFdvOByaOYIJYag0d6`. Compared against: legacy source `zVsuhYehoSLLq880qRBFkq` and library `YX2n4YLrEpBXNbcc73T6dw`. No writes to Figma. `figma.skipInvisibleInstanceChildren = false` on every read script. Screenshots are in `shots/` in this folder; `_contact-*.png` are contact sheets of them.

Read first: CLAUDE.md, COMPOSITIONS.md, every open line of FLAGS.md, the LOG.md entries for the target (2026-09-12 to 2026-09-15) and the last entries in the file (the mobile ambient-capture work, which does not touch the target). PLUGIN-NOTES.md skipped as instructed.

**How the evidence was gathered, and its limits**
- Sections and statuses come from the file tree (component inventory, child counts, renders) plus LOG.md, `records/npve/*` (pre-2026-09-12 history) and FLAGS.md. I looked at every section render through contact sheets (`_contact-templates-1..3.png`, `_contact-archive.png`, plus full-size looks at Encounter 15, Screens 15 and Vitals 31); I did not open every Screens render at full size. Statuses for Screens sections are inferred from their Templates counterpart plus the render.
- Tall sections are downscaled to 2048 px on the long edge (Vitals 31 at 440x2048, Flowsheets 29 at 1124x2048), so detail in those is limited. The per-node crops in `shots/p2*` and `shots/p3*` are 1x.
- The plugin API cannot report whether a remote component is behind the published library. "Out of date" below is a structural comparison (size, layer count, property definitions) against the library file. It cannot see colour or text changes.
- During the run the `5577fcc4…` Figma MCP connection failed and the account hit a call limit on it; everything below was read through the `figma` MCP server. Some screenshot files were written twice by racing subagents; I checked the sizes and the contact sheets and every file shows the node it is named for.
- A Screens mismatch to know about: Templates numbers Vitals **31**, Screens numbers its Vitals comparisons **30**, and Screens has no 04 or 06. Numbers are per page, so section numbers cannot be used to pair Templates with Screens.

---

## Part 1: inventory

Status key: Complete, Mostly complete (gaps flagged), Partial, Not started, Superseded, Unknown. **Unrecorded** = built work with no LOG or records entry. Result: **no section is Unrecorded.** 32 of 35 Templates sections have no node-ID hit in LOG.md because they were built before the 2026-09-12 reset; each has a hit in `records/` (closed history) or, for 705:8365 and 684:8265, in the 2026-09-13 LOG entries by section number. Shots are `shots/tpl-<id>.png`, `scr-<id>.png`, `arc-<id>.png`.

### Page Cover 0:1
| Section | Node | Status | Notes |
|---|---|---|---|
| Cover frame | 1:5 | Complete | `shots/cover-0-1.png`. One unbound fill #010000 (open DEFECT npveProblemsBuild_coverPageUnboundFill). |

### Page Templates 3:2 (35 top-level nodes)
| Section | Node | Status | Basis |
|---|---|---|---|
| 01 · Sidesheet shell | 126:2020 | Complete | Sidesheet set 279:2446, Floating, Docked right, Docked left, all 550x600; docked corners 0. Proof 764:10987 records the corner ruling. |
| 02 · Problems picker | 126:2021 | Mostly complete | Picker body 94:812, Problem row 107:485. Picker and Questionnaire GAP cards on the plate. |
| 03 · Problems management | 153:1185 | Mostly complete | Problem summary row 153:1186, Problems list body 156:2426. Open: ringed icon button DEFECT/GAP, status caret. |
| 04 · Change log utilities | 126:2022 | Complete | Change log and Change log/Row (scaffolding for comparisons). |
| 05 · Rebuild comparison | 126:2023 | Complete | Comparison master 35:332 and the Problems/Medication reference, rebuild and change-log helpers. |
| 06 · Medications | 219:2067 | Mostly complete | Medication summary row, body, footer action. Open: footer label "Add Section To Note" DEFECT. |
| 07 · Problems state comparison helpers | 309:4528 | Complete | Empty and Browse helpers. |
| 08 · Problem editing | 316:3411 | Mostly complete | Problem edit body set (Links no/yes), footer actions, Mark as error action. Open: sheet height authored not content, Page55 DECISION. |
| 09 · Procedures & surgical history | 337:3880 | Mostly complete | Event row, metadata, body. |
| 10 · Family history | 346:3079 | Mostly complete | Member card, condition row, body. Open DECISION on record-card related-lines gap. |
| 11 · Allergies list | 352:3205 | Mostly complete | Allergy card and selector, body. Selector uses Icon/DownCaret (Part 3). |
| 12 · External care history | 370:3340 | Mostly complete | Event card and hospitalizations body. |
| 13 · External care history · Facility Stay | 388:3433 | Mostly complete | Facility stay form and body. |
| 14 · Health Status/Observations | 412:3888 | Mostly complete | Body plus helpers. Open DECISION: helper naming off the `_Rebuild comparison/…` pattern. |
| 15 · Encounter page shell | 424:4085 | **Partial** | Page/Encounter 429:4161 built, but the nav is SCAFFOLDING, the note body is SCAFFOLDING, no recording states, no docked overlay sheet, no Module dropdown, no Replace-section dialog. See Part 4. |
| 16 · Social History | 441:4993 | Mostly complete | Body plus helpers. |
| 17 · PMH · Condition row | 518:5771 | Complete | Set 518:5797 plus comparison. |
| 18 · PMH · Section group | 534:5804 | Complete | Section 534:5805 (also the composition "Section group"). |
| 19 · PMH · Body and sidesheet | 546:5870 | Mostly complete | Body carries a `SCAFFOLDING` item. |
| 20 · External care · Hospitalizations edit | 580:6012 | Mostly complete | On Form surface (Part 3). |
| 21 · Procedures · Edit Event | 586:6413 | Mostly complete | On Form surface. |
| 22 · Allergies · Edit Allergen | 634:6807 | Mostly complete | Field surfaces repaired 2026-09-13. Open organizer-paper DECISION, Form surface GAP. |
| 23 · Family history · Edit Family Member | 636:2 | Mostly complete | Clone of 22. |
| MODEL TEST | 642:7556 | Superseded | A test section labelled "not for production", one component 642:7557. In LOG 2026-09-13. |
| 24 · Patient Summary · Content | 654:9852 | Mostly complete | |
| 25 · Patient Summary · Feedback | 665:10011 | Mostly complete | Feedback set plus Default, Error and Success. |
| 26 · Patient Summary · Complete sheets | 672:7906 | Mostly complete | Three DECISION lines open (AI disclaimer on Default). |
| 27 · Flowsheets · Measure rows | 684:8265 | Mostly complete | Set 686:8437 Basic and With trend. |
| 28 · Flowsheets list header and body | 705:8365 | Mostly complete | Local Table/Headings/Flowsheets copy still here (library copy exists now, Part 3). |
| 29 · Flowsheets forms without graphs | 730:8618 | Mostly complete | List, Add new, Edit past. Graph state 861:7047 not built (parked by ruling). |
| Archive · Superseded Flowsheets proof | 756:10987 | Superseded | README and the old radio proof. |
| PROOF · Sidesheet docked corners | 764:10987 | Complete | A proof frame (630x680), not a section. |
| PROOF · Compositions exports on paper | 771:11084 | Complete | A proof frame (1746x680). |
| 30 · Problem editing · Links and relationships | 791:11350 | Mostly complete | Row and block components; GAP card superseded; section-label GAP kept open. |
| 31 · Vitals | 816:12438 | **Partial** | Delta, FPO sparkline, Row, List, Body and the sheet set through the shell are built and verified (Part 2a). Quick-entry parsing (batches 8-10) and the parked Expanded chart/table states are not built. Open GAPs: sparkline, monospace, label case, alert action/dismiss, ring button. |

### Page Screens 27:2 (28 top-level sections)
Each holds Reference / Rebuild / Change-log comparisons (Rebuild comparison master) of its Templates counterpart, plus GAP and DEFECT marker cards on 01 and 15.

| Section | Node | Status | Note |
|---|---|---|---|
| 01 · Current comparisons | 126:2024 | Mostly complete | Problem-picker and Links comparisons plus 4 markers. |
| 02 · Problems management markers | 156:2427 | Superseded | Title says standalone screens moved to Archive 05; holds 2 markers. |
| 03 · Problems management comparisons | 160:3168 | Complete | |
| 05 · Medication list comparisons | 254:3706 | Complete | Also the legacy Medication list reference used by the mobile file. |
| 07 · Problems states comparisons | 309:4530 | Complete | |
| 08 · Problem editing comparison | 318:6739 | Mostly complete | Links=no comparison; the Links=yes one is on 01. |
| 09 · Procedures & surgical history comparison | 339:6480 | Complete | |
| 10 · Family history comparison | 346:5992 | Complete | |
| 11 · Allergies list comparison | 356:6235 | Complete | |
| 12 · External care history comparison | 378:5612 | Complete | |
| 13 · External care · Facility Stay comparison | 393:7688 | Complete | |
| 14 · Health Status/Observations | 415:7207 | Complete | |
| 15 · Encounter page shell comparison | 429:6859 | Partial | Mirrors Templates 15. Five GAP markers. |
| 16 · Social History | 446:9236 | Complete | |
| 17 · PMH · Condition row | 521:7834 | Complete | |
| 18 · PMH · Section group | 537:9914 | Complete | |
| 19 · Past Medical History | 561:9876 | Complete | |
| 20 · Hospitalizations edit comparison | 581:11116 | Complete | |
| 21 · Edit Event comparison | 586:11764 | Complete | |
| 22 · Allergies · Edit Allergen comparison | 634:12489 | Complete | |
| 23 · Family history · Edit Family Member comparison | 638:13052 | Complete | |
| 24 · Patient Summary · Content | 656:13013 | Complete | |
| 25 · Patient Summary · Feedback | 668:10805 | Complete | |
| 26 · Patient Summary · Complete sheets | 676:11185 | Complete | |
| 27 · Flowsheets · Measure rows | 687:13026 | Complete | |
| 28 · Flowsheets list comparisons | 709:12062 | Complete | |
| 29 · Flowsheets forms comparisons | 748:15937 | Mostly complete | Stale change-log annotation (h4 Bold) open. |
| 30 · Vitals comparisons | 852:22762 | Complete | Default and Alert (Part 2a). Covers the built states only. |

### Page Archive 126:2
All of it is by design a record of replaced work (rule 1). README frame 185:3 explains it.

| Section | Node | Status |
|---|---|---|
| README — Archive | 185:3 | Complete |
| 01 · Gap and defect markers (empty) | 126:2025 | Superseded |
| 02 · Detached comparison history | 126:2026 | Superseded |
| 03 · Template checks and legacy | 126:2027 | Superseded |
| 04 · Recovery checks | 142:996 | Superseded |
| 05 · Superseded standalone screens | 407:5492 | Superseded |
| 06 · Pilot proofs | 570:10455 | Superseded |
| 07 · Emptied organizers | 597:11595 | Superseded |
| 08 · Legacy oversize | 597:11596 | Superseded |

### Source families with no section in the target
From the 2026-09-14 status audit, unchanged: Psychotherapy note (129:7614) **Not started**. Flowsheets Graph 861:7047 and Vitals Expanded chart/table (3496:15197, 3501:15528) are parked by Daniel's ruling until a chart component question is answered. Page55 (Edit Problem plus Links) is now the Links=yes variant.

---

## Part 2: the two batches from 2026-09-14

### a) Vitals sidesheet Default and Alert through the library shell: **confirmed**
Shots: `shots/p2a-vitals-sheet-proof-851-14560.png` (both sheets side by side on paper), `shots/tpl-816-12438.png`, `shots/scr-852-22762.png`.
- Exist: yes. Component set `851:14209` `_Rebuild comparison/Rebuild/Vitals` with variants `851:14206` State=Default and `851:14208` State=Alert. Instances `851:14210` (Default) and `851:14385` (Alert), and the PROOF frame `851:14560`, all in section 31 · Vitals `816:12438`.
- 550 wide: yes. Variants and instances read 550x528 (Default) and 550x592 (Alert). The shell instances inside are Sidesheet Placement=Floating, 550.
- Body: each sheet's Body content is an instance of `846:13017` Vitals/Body. The Default sheet's instance `I851:14210;851:13663;6:80` has **Show alert = false** with the Alert node hidden; the Alert sheet's `I851:14385;851:13938;6:80` has **Show alert = true** with it visible. Body is 518x352 and 518x416 respectively.
- Placed in the Screens Vitals comparison: yes. Screens section `852:22762` "30 · Vitals comparisons" holds `852:22763` (Default) and `852:23276` (Alert), each nesting the Reference, the Rebuild variant (State=Default / State=Alert) and the Change log. Nested Vitals/Body instances resolve to `846:13017`.
- LOG entry: yes, two. "2026-09-14 · Vitals · body, Default and Alert states (enumeration batch 7)" for the body, and "2026-09-15 · Vitals · sheet through the shell, both states, and the Screens comparison" for the sheet and comparison. **The sheet and comparison are dated 2026-09-15, not 09-14.** A third entry (2026-09-15, "body batch re-sent, verified not rebuilt") confirms no duplicate Vitals/Body exists; I found exactly one.
- Visible in the render: "Or Use Editor" and "Add Section To Note" render Title Case (open GAP); FPO sparkline placeholders; the Alert sheet's dismiss is absent (open GAP).

### b) Edit Problem Links = no/yes: **confirmed**
Shot: `shots/p2b-problem-edit-links-yes-803-20724.png` (the Links=yes sheet, 550x740, on Templates section 30).
- Property exists: yes. `802:11827` Problem edit body: VARIANT `Links` = no | yes, default no. `803:12368` `_Rebuild comparison/Rebuild/Problems · Edit` carries the same property (`318:3654` no, `803:11925` yes).
- Block `791:11437` (Problem edit/Links and relationships, 518x124, COMPONENT) is placed in the yes state: instance `802:11720` inside variant Links=yes `802:11703`. It also appears in the sheet variant `803:11925` and in proof `803:20724`. It is not in Links=no.
- ICD-10 text: the corrected version. Every variant and proof (`316:3412`, `802:11703`, `318:3654`, `803:11925`, `803:20544`, `803:20724`) reads "Low back pain M54.50". The source reads "M540.50" (typo, corrected on purpose, recorded in the change-log row "Problem code M540.50 → M54.50").
- Placed in Screens 01: comparison `803:19794` (Reference 803:19691, Rebuild 803:11925, change log 803:19693).
- LOG entry: yes, two, both 2026-09-14: "Problems Edit · LINKS/RELATIONSHIPS row and block" and "Problems Edit · Links = yes variant, section-label ruling, Screens 01 comparison".
- Observations, not fixes: the sheet is authored at 740 rather than content height (DECISION already open); the `LINKS/RELATIONSHIPS` label is a token-bound text node under Daniel's 2026-09-14 ruling (GAP kept open); the source's 16 label-to-row gap became 8.

---

## Part 3: inconsistencies

Scope: the three main pages, Templates, Screens and Archive, walked by script. Library-instance internals (published components) are excluded from the spacing count; overrides on them are not checked. Counts are of nodes unless stated.

### 3.1 Sheets not 550 wide: **0**
Every one of the 47 (Templates), 30 (Screens) and 9 (Archive) instances of the Sidesheet shell reads 550 wide, and all three shell variants are 550x600 (`279:2416` docked right, `279:2431` docked left, `6:65` floating). Not counted: the source Reference plates, which are frozen source captures and correctly keep the source width: 441 (Vitals ×2, `852:14797`, `852:14800`), 548 (Flowsheets row/header references `688:2`, `689:2`, `707:2`) and 534 (Patient Summary references). That is informational, not a sheet.

### 3.2 Docked sheets with rounded corners: **0**
All three docked instances (`279:2613`, `279:2711`, `764:10988`) read radius 0 on all four corners; the set variants read 0. One observation: Page/Encounter's `Left slot — Sidesheet` `429:4239` is a **Floating** sheet (radius 8, 550x600) used as the inline left column. That matches the source's inline 550 column and is not docked.

### 3.3 Page gutters other than 16: **0**
Page/Encounter `429:4161`: Body padding 16/16/16/16 with gap 16, Patient header at x 16 (1397 wide), Module strip at x 16, MainWrap at x 16 with gap 16 between LeftCol 550 and RightCol 831. Patient header inner padding 16/16/10/10 (the 10 is counted in 3.4). No other page shell is built in this file. The Screens sections use a 32 organiser inset, which is canvas furniture, not a page gutter.

### 3.4 Off-grid spacing in built rows, bodies and sheets: **15 nodes in built units, 52 more in marker cards**
Built units (Templates only; Screens and Archive have none):
| Node | Unit | Values |
|---|---|---|
| `153:1186` | Problem summary row | pt 19, pb 19 |
| `170:1590` | Problem summary row › Status control | gap 3 |
| `219:2068` | Medication summary row | pt 12, pb 12 |
| `219:2070` | Medication summary row › Status control | gap 4 |
| `426:4165` | Patient header | pt 10, pb 10 (GAP npveEncounter_patientHeaderPadding10NoToken already open) |
| `426:4180` | Patient header › DOB group | gap 4 |
| `426:4188` | Patient header › Allergy row | gap 12 |
| `426:4191` | Patient header › Severe group | gap 4 |
| `426:4196` | Patient header › Balance row | gap 4 |
| `426:4199`, `426:4206` | Module chip set variants selected=yes/no | pl 12, pr 12 |
| `488:8725` | Module chip (loose) | pl 12, pr 12 |
| `488:8732` | Frame 1 (loose) | gap 4 |
| `426:4214` | Module strip | gap 12 |
| `18:104` | Change log/Row › Cells | gap 12 |

Marker cards: every GAP and DEFECT marker card is built from one recipe with gap 12 and a Chip with pt/pb 3: 3 cards on Templates (`792:11566`, `817:12493`, `825:12492`) and 23 on Screens, so 26 cards = 52 nodes. The recipe is from `324:4934` (LOG 2026-09-14), so it is one finding, not 26.

Not counted: Vitals row/list/body, which were re-gridded to 8 on 2026-09-14, and the library internals the Vitals entries already note (Alert 12 and 6, Text field 4).

### 3.5 Edit forms on the pale teal Form surface instead of white paper: **6 forms, 5 wrapped bodies**
Shots: `shots/p3-teal-allergies-edit-form-634-6808.png`, `p3-teal-procedure-edit-form-586-6414.png`, `p3-teal-model-test-642-7557.png`.
| Form | Node | Root fill |
|---|---|---|
| Allergies edit form | `634:6808` | Form surface |
| Family history edit form | `636:3` | Form surface |
| Procedure history edit form | `586:6414` | Form surface |
| External care hospitalizations edit form | `580:6017` | Form surface |
| External care facility stay form | `389:3469` | Form surface |
| Family history edit form — MODEL TEST | `642:7557` | Form surface |

The bodies `634:6809`, `638:2`, `586:6467`, `580:10621`, `391:3567` each wrap that form and carry no fill of their own, so the teal reaches the sheet. The Problem edit body (`316:3412`, `802:11703`), Flowsheets Questionnaire and Links block have no fill and sit on the sheet's paper. Form surface is a **file-local variable** #EEF7F9 with no library token (open GAP npveAllergiesAudit_formSurfaceNoLibraryToken). APPEARANCE-NPVE-EDIT-FORMS.md approves the pale teal card, so this is a conflict between that document and the "overlays on paper" rule in COMPOSITIONS.md, not an unapproved drift.

### 3.6 Hand-drawn glyphs or Icon/DownCaret where a real MUI icon belongs: **4 selector sites, 3 delta/trend sites, 1 drawn dot**
Shots: `shots/p3-caret-problem-summary-row-153-1186.png`, `p3-caret-allergy-severity-352-3206.png`.
- Icon/DownCaret on a list selector (should be ArrowDropDown): Problem summary row Status control `190:23` (in `153:1186`), Medication summary row Status control `222:1995` (in `219:2068`), Allergy severity selector `352:3208`, Hospitalization status selector `580:6015`. All four are local components used many times: 626 DownCaret instances on Templates, most inside library Select/Text field internals (published components, not counted).
- Icon/UpCaret and Icon/DownCaret standing in for the signed-change arrow: `816:12440`, `816:12446` (Vitals/Delta) and `685:8303` (Flowsheets measure row › With trend). Already documented as a GAP (arrow glyph pair, `817:12493` marker).
- Drawn 8px status ellipse in the Note card header (open GAP npveEncounter_badgeDotCannotSitInline).
- No authored vector paths in any local component on Templates; the only authored vectors are the 6 legacy hand-drawn nodes in Archive 03 (`126:2027`), which is history.
- The library itself flags Icon/DownCaret as hand-drawn and a retirement candidate (open GAP 76:5), and the mobile file has an open DECISION that selectors use ArrowDropDown. The NPVE target has not adopted it.

### 3.7 Drawn shapes or detached frames named as if they were components: **11 frames, 1 detached, 0 shapes**
- Frames with component-style slash names but not components: `Substance/drug use` ×3 (`441:5062`, `441:5063`, `441:5073`, inside Social history body) and `Action area/note|chart|edit|add` ×8 (`684:8273`…`685:8325`, inside the Measure row variants). These are inner layer names, not published claims; low risk.
- Detached: `18:135` "Legacy detached — Sidesheet change log" in Archive is named as detached and is honest about it. `Archive 03` holds `_Legacy hand-drawn — Problem s…` similarly.
- SUPERSEDED-named hand-built heading frames (3: `706:8459`, `732:9188`, `732:9597`) still sit inside the Flowsheets list body and both forms, labelled as superseded but still in the tree.

### 3.8 Local components that duplicate something now in the library: **1 confirmed, 4 candidates**
- Confirmed: `752:13439` Table/Headings/Flowsheets (Templates 28) duplicates the library `Table/Headings/Flowsheets` (library `1107:148`). The LOG says the swap waits on a manual publish.
- Candidates, not confirmed: Allergy severity selector `352:3206` and Hospitalization status selector `580:6013` (local dropdown chips; 3 GAP markers say the library Chip can't express them); Module chip set `426:4213` (open GAP); `_Patient summary feedback/Dismiss action` `666:7826` 34x34 against library Icon button small (34x34); Transcription status/Start `469:5827` (INVENTION, open GAP).

### 3.9 Library instances that are out of date with the published library: **1 component, 231 instances**
Compared 83 distinct remote components in use (size, layer count) against the library: **all 83 match**. Compared property definitions for Text field, Button, Icon button, Chip, Divider, Alert, Checkbox, Radio, Form control label, Menu/Item and Tabs/Tab: **only Text field differs.** The library Text field has `Fill: None | Paper` (built 2026-09-15); the target's imported set does not. Affected: 231 Text field instances (120 small/Filled `679a3842`, 84 small/Empty `542540ea`, 11 medium/Filled, 16 medium/Empty). Whether the library change was published is not readable from the plugin API; publishing is manual (rule 12).

### 3.10 Markers that break the grey-card rule: **2 cards with red or green content**
Shots: `shots/p3-marker-red-817-12493.png`, `shots/p3-marker-green-27-306.png`.
- `817:12493` GAP marker — Arrow glyph (Templates 31): contains the red delta indicator instances, ink `color/error/dark`.
- `27:306` GAP marker — Colours without a token (Screens 01): contains a green check, `color/success/dark`.
All 26 card shells (fill, stroke, Chip) are grey. Of the 26 cards: 6 are grey throughout, 18 embed a teal (`color/primary/main` or `/light`) specimen instance, and 2 embed red or green. Teal is not in the banned list (red, yellow, orange, green), so the 18 are not counted.

### 3.11 The same unit built twice in different sections: **7 groups**
1. Summary row: Problem summary row `153:1186` and Medication summary row `219:2068` (open DECISION, same anatomy). Also `Status control` twice inside them.
2. Footer actions: `Problem edit footer actions` `320:3849`, `Medication list footer action` `248:1827`, `Flowsheets/Footer/List|Save` `732:9973`/`732:9985`, `Flowsheets/Footer action` `706:8637` (518 or 534 wide, all one job).
3. Edit-form shells: five near-identical forms (Part 3.5) each with its own "Edit … header" frame; Family history was cloned from Allergies, plus MODEL TEST.
4. "Create New …" white add buttons (`color/common/white` fill) rebuilt in Medication list body, Allergies list body, Family history body, Procedure history body and External care body.
5. Status dropdown chips: Allergy severity selector, Hospitalization status selector, Status control.
6. Hand-built column headings: three copies (`706:8459`, `732:9188`, `732:9597`) plus the component `752:13439`.
7. The marker recipe rebuilt 26 times, of which "Text field end adornment" ×4 (`324:4934`, `394:5611`, `581:11754`, `639:2`), "Dropdown chip" ×3, "Back control" DEFECT ×2.
Also noted: the comparison helpers are named two ways (`Rebuild helper · Health Status/Observations` and `Rebuild helper · Social History` against `_Rebuild comparison/…`), an open DECISION for Health Status.

### Counts
| Type | Count |
|---|---|
| Sheets not 550 wide | 0 |
| Docked sheets with rounded corners | 0 |
| Page gutters other than 16 | 0 |
| Off-grid spacing | 15 nodes in built units (+ 52 in one marker recipe) |
| Edit forms on Form surface | 6 forms (5 bodies) |
| Caret or hand-drawn glyphs | 4 selector sites, 3 delta/trend sites, 1 drawn dot |
| Frames or detached named as components | 11 + 3 superseded heading frames |
| Local duplicates of library | 1 confirmed, 4 candidates |
| Out-of-date library instances | 1 component, 231 instances |
| Markers breaking the grey-card rule | 2 |
| Same unit built twice | 7 groups |

---

## Part 4: main note screen readiness

**Source:** Workflows page `105:1426`. The encounter screen is the family `Rec_*`, all 1429 wide: `Rec_Ready` (`3124:12369`, `4841:17077`, `4841:18039`), `Rec_Started` `3159:20067`, `Rec_Paused` `4296:17197`, `Rec_Processing` `4275:15285`, `Rec_Open` `3159:21282`, `Rec_Closed` `4294:15013`, `Replace_Section_Modal` `4439:16310`, `Mark As Error_Ready` `3456:11505`. Structure of `4841:18039`: Primary Nav (1429x65), Body (16 padding) holding PatientHeader (1397x96), Modules_HFlex (1397x40), MainWrap (LeftCol 550 with a Sidesheetv3, RightCol 831 with the NoteWrapper), plus a right-docked Sidesheetv3 (550x948, square corners, no scrim). Screenshots: `shots/src-*.png`.

**Naming trap in the source.** `Mark As Error_Ready` `3456:11505` is not a mark-as-error screen. It shows the note toolbar in another variant (SOAP:Modified, Dr. Steven Strange, Date, device, Start Transcribing, Print) with the appointment-date menu open ("SELECT APPOINTMENT DATE"). The mark-as-error control lives in the Problem edit sheet (built, `318:3643`). Reported as a source finding; nothing renamed.

**Target:** Page/Encounter `429:4161` (1429x989), Templates 15 `424:4085`, comparison Screens 15 `429:6859`. Render: `shots/scr-429-6859.png` (source top, rebuild below, five GAP markers to the right).

| # | Section | Source (shot) | Target unit, node, status | Can the library build it now? |
|---|---|---|---|---|
| 1 | Primary nav | Teal 65px bar: tebra logo, six app icons, org name, patient search, history, inbox, help, avatar. `src-rec-ready-4841-18039.png` | SCAFFOLDING placeholder `429:4162`, a teal bar with a label. Status: placeholder only. | **Blocked on a design decision.** Library has Nav/Bar, Nav/Icon button, Nav/Menu item, Nav/Dropdown, Nav/Logo, Nav/Search, but their home is unresolved. DECISION npveWorkflows_navFamilyHomeBlocksShell (279:92): "The top nav on every encounter frame is a Kit Primary Nav; the library Nav/Bar family exists but its home is unresolved (navComponentsOnCompositionsPage OPEN), so a library-consuming page shell cannot start with it." Also DEFECT npveEncounter_navIconsShipWhiteGlyphs (Icon/Clinical and Icon/Reports ship white glyphs). |
| 2 | Patient header | 1397x96, two rows: name, pronouns, Restricted; legal name, DOB, phone, insurer. Later variants add allergies and balance. | `Patient header` `426:4165` (900x72 proposal geometry, fills when placed). Built (Part 1: Mostly complete). Rendered at the proposal size, not the source's 96. | Yes. Open: DECISION npveWorkflows_patientHeaderNotInLibrary; GAP padding 10 (no token); off-grid gaps 4, 10, 12 (Part 3.4). |
| 3 | Module strip | Modules pill + closable Note and Problems chips, later chips AI Summary…Timeline. | `Module strip` `426:4214` and `Module chip` set `426:4213`, built with nine modules. Built. | Yes, locally. GAPs: no library pattern for a 40-tall closable chip (npveWorkflows_moduleChipNoLibraryPattern); no vitals, lab, allergy or timeline glyph (npveEncounter_moduleChipGlyphsMissing); Modules pill glyph DECISION. |
| 4 | Left column: Problems sheet | 550x517 inline Problems list. | `Left slot — Sidesheet` `429:4239` with Problems list body; Templates 03 `153:1185`. Built (600 tall against 517). | Yes. Open items are on the Problems batch (ring button DEFECT `170:77`, status caret). |
| 5 | Note card shell and header | White card, r8: shield-lock badge, "Encounter Note", auto-saved dot, expand, close. | `Note card` `424:4362` (831x748). Built for header, toolbar band and footer; body is SCAFFOLDING. | Yes, locally. GAPs: no card with toolbar and footer slots (npveWorkflows_noteCardShellNoLibraryPattern); no shield glyph or expand glyph; inline status dot (npveEncounter_badgeDotCannotSitInline). |
| 6 | Note toolbar (Ready) | Template: SOAP pill, Assigned To pill, Start Transcribing, mic pill with caret. | `Note toolbar` `468:5582` (799x42) and `Transcription status/Start` `469:5827` (INVENTION). Built for the Ready state. | Partly. GAP npveEncounter_toolbarGlyphsMissing (mic, transcribe, person-heart, list glyphs stand in); GAP npveEncounter_transcriptionStatusInvention. |
| 7 | Recording states | Started: "Transcription in Progress", Cancel, Pause, Finish, mic. Paused. Processing: "Processing AI Transcriptions". Closed: "View AI Recording". `src-rec-started…`, `src-rec-paused…`, `src-rec-processing…`, `src-rec-closed…` | **Not built.** Only the Start state exists. | Yes in principle: text buttons, italic status text, and library buttons cover them. Glyphs for pause/finish are missing from the library (GAP "No Pause, Stop or Play glyph"). No decision blocks it. |
| 8 | Rich-text editor and note body | Undo/redo/H1/B/I/U/align/list toolbar, Add Section pill, section blocks (Family History, Social History) with Link to Section, FHx tag chips, drag handles. | `SCAFFOLDING — Note body placeholder` `424:4360` (799x120) only. **Not built.** | Not yet. GAP npveWorkflows_editorToolbarNoPattern (no undo, redo, H1, align, list glyphs, no toolbar composition). Section blocks and the tagged chips have no library part and no record. |
| 9 | Footer | Confidential checkbox, Charge Capture, Save & Close, Sign (with caret), kebab. | Footer inside Note card `424:4362`. Built; Split button instance `424:4417` SUPERSEDED. | Yes. DEFECT npveEncounter_splitButtonLabelNotAProperty and DECISION splitButtonSuperseded are about the Sign split. |
| 10 | Docked sheet: Add Problem to Chart | 550x948 right-docked Problems picker: header, search, All/Recent/Favorites, results with star, add, check; Cancel / Save & Add to Note / Save. `src-rec-ready-4841-18039.png` | Picker body `94:812` (Templates 02) and Sidesheet Docked right `279:2416`; proof `764:10988` shows the docked picker. **Built as units; never composed into the encounter page.** | Yes. |
| 11 | Docked sheet: AI Note Results | 550x948 right-docked: header, warning Alert "Always double check AI output for mistakes.", Subjective / Objective / Assessment blocks with Add / Append / Replace Section links, "Added to Note", "Add All to Note" outlined full-width action. `src-rec-open-3159-21282.png` | **Not built.** No section, component or record. | Yes in principle: Sidesheet Docked right, library Alert (warning), text buttons and the full-width footer action `732:9985`. No glyph blocker, but the Add / Append / Replace link row and the section heading row have no unit. Nothing in FLAGS blocks it. |
| 12 | Module dropdown | 392x480 popup listing Clinical and Billing groups with subheaders, ticks, and a footer button. Parked off-canvas at x -437 (a source artefact, per DECISION npveWorkflows_moduleDropdownOffCanvas); the node reads 1x1 in a render. | **Not built.** | Not yet. GAP npveWorkflows_groupedMenuNoSubheader (library Menu has four item slots and no subheader). |
| 13 | Replace-section confirmation | Centred dialog: "Are you sure you want to replace this section?", Cancel, red "Yes, replace section", over the dimmed page and open AI sheet. `src-replace-modal-4439-16310.png` | **Not built.** | Yes. Library Dialog plus a Button `color=error`. DECISION (closed 2026-09-15) confirms Dialog padding is MUI substrate. |
| 14 | Appointment-date menu (frame misnamed "Mark As Error_Ready") | Toolbar variant with Date pill and a menu with a caption and four dates. `src-mark-as-error-3456-11505.png` | **Not built.** The mark-as-error button is built inside Problem edit. | Not yet: same subheader GAP as 12. The toolbar variant (SOAP:Modified, provider name, device, Print) is also unbuilt. |

### Bottom-up build order for what is still missing
1. **Nav.** Blocked on Daniel's decision. Quote: "The top nav on every encounter frame is a Kit Primary Nav; the library Nav/Bar family exists but its home is unresolved (navComponentsOnCompositionsPage OPEN), so a library-consuming page shell cannot start with it." Until it is ruled, the page keeps its SCAFFOLDING bar. Everything below can be built without it.
2. **Editor toolbar.** Undo, redo, H1, align, list glyphs are not in the library. Needs Daniel: build local glyphs (icon recipe) or wait for the library. Existing GAP npveWorkflows_editorToolbarNoPattern.
3. **Note body sections.** Section block (drag handle, title, Link to Section, body text) and the tagged chip (FHx, purple outline). No decision recorded; needs a first build and a composition note.
4. **Recording state row.** Started, Paused, Processing and Closed variants of the Note toolbar's right side. Buildable now; needs the Pause / Finish glyph answer (open GAP), which Daniel has not ruled on for the desktop file.
5. **Note card body swap.** Replace `424:4360` with 3 and the editor toolbar, once 2 and 3 exist.
6. **Menu subheader / grouped menu** for the Module dropdown and the appointment-date menu. Blocked on a GAP (library Menu). Needs Daniel: local subheader row, or ask for a library change.
7. **AI Note Results sheet body** (AI Note Results section rows, Add / Append / Replace link row, Added-to-note status) through the Docked right shell. Buildable now.
8. **Replace-section dialog.** Buildable now (library Dialog).
9. **Page assembly:** the Rec_Ready, Started, Paused, Processing, Open and Closed frames as `Page/Encounter` variants, with Add Problem to Chart and AI Note Results docked on the right. Last.

Of these, **only 1 is blocked on a recorded design decision**; 2 and 6 wait on GAPs that need a ruling on local build versus library change; 4 needs a glyph answer.

---

## New findings to record (added to FLAGS.md)
- Target Text field set lacks the library's Fill axis (231 instances).
- Two GAP marker cards carry red and green content.
- Four local selectors use Icon/DownCaret.
- Five edit forms plus the model test sit on Form surface against the "overlays on paper" line; APPEARANCE-NPVE-EDIT-FORMS.md approves it.
- Source frame `Mark As Error_Ready` `3456:11505` is the appointment-date menu.
- Main note screen units not built: recording states, editor and note body, AI Note Results sheet, Module dropdown, Replace-section dialog, date menu.
- Off-grid spacing in Problem summary row, Medication summary row, Patient header, Module chips and Change log/Row.

## Not done
No fixes, renames, moves or rebuilds. The gaps and inconsistencies above are findings.
