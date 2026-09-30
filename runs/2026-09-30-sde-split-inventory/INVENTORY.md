# SDE split inventory

Read-only audit, 2026-09-30. Nothing was moved, copied, renamed or edited; `C:\Code\sde` was not created. The only writes are this folder and one LOG.md entry.

Companion file: `files-classified.csv` in this folder has one row per file (path, bucket, one line of evidence) for all 3,137 files. This report gives every root file individually, every folder as a unit, and the mixed files part by part.

## How this was done, and its limits

- Enumerated from the filesystem with a recursive walk of `C:\Code\design system` (`.git` and `node_modules` skipped). Not from any prior report.
- **3,137 files** counted. Not counted: `.tmp.driveupload/` holds another 6,175 files (231 MB), all zlib blobs with numeric names, gitignored, dated 2026-09-03 to 2026-09-15. It is a Google Drive upload temp folder, not repository content, and should not move with anything. `.git/` skipped.
- Git state: 2,793 tracked files. Untracked: `audits/` (323 files), `reports/backport-2026-09-25/` (5) and this `runs/` folder. Modified and uncommitted: APPEARANCE-NPVE-EDIT-FORMS.md, COMPOSITIONS.md, FLAGS.md, LOG.md, mobile-spec.md.
- **LOG.md (4,348 lines, 808 KB) and FLAGS.md (546 lines, 403 KB) were not read line by line in this session's context.** I read the heads and structure, and processed both by script: split LOG.md on `## ` headings (149 entries) and FLAGS.md on its `TAG | file key | node | ...` lines (512 finding lines), then counted file keys per entry and per line. Counts below are from those scripts. Anything that needs a human read of individual entries (for example which entries are really about SDE work when they cite no key) is flagged as such.
- Bucket calls come from file keys inside the file, directory and batch names, and LOG.md entries that name a folder. Many folders are PNG only and have no keys in them; for those the evidence is the name plus the LOG entry that cites them, and it is labelled so.

## 0. The finding that shapes the split

The four-bucket scheme has one bucket, "Other consumer", that turns out to be the largest thing in the repo after SDE, and it is not the Proposals file. It is the **mobile ambient capture prototype, Figma file `TP5KrQtY0T5IcMNqi375So`**. CLAUDE.md does not list it in its Files section and does not mention it. It has:

- 104 of 149 LOG.md entries cite its key, 97 of them without any SDE key (versus 41 entries that cite only SDE keys);
- 266 of 512 FLAGS.md lines carry its key in the file-key column (versus 150 for SDE);
- `mobile-spec.md`, `mobile-plan.md`, all of `reports/` (104 files), `assets/` (3 portraits), `archive/mobile-specs/` and about 410 files under `figma-export/`;
- a code-side sibling repo, `C:\Code\visit-companion-prototype`, cited 14 times in LOG.md (`BACKPORT-PROMPT.md` and `runs/2026-09-26-figma-b3/`).

It is unrelated to the SDE data model but it sits in the same LOG.md, FLAGS.md and COMPOSITIONS.md, and its sheets are ported from SDE sheets (Medications, Vitals, Patient Summary), so it reads the SDE target file as a source. If the plan is only "SDE leaves", the mobile work stays behind as-is; if the aim is a library repo with no consumer work, mobile needs its own decision. Reported, not resolved.

## 1. Summary

| Bucket | Files | Where it sits |
|---|---:|---|
| 1 Library | 420 | 28 root files (docs, scans, icon sources, PNGs), `foundation/` 14, `icon-svg/` 49, `records/library/` 26, deprecated-kit exports and library/composition batches under `figma-export/` 264, library scripts and discovery notes under `archive/` 38, one `.workflow-runs` file |
| 2 SDE | 1,854 | `audits/` 323, `records/npve/` 71, NPVE batch folders under `figma-export/` 1,316, NPVE scripts and artifacts under `archive/` 129, `.workflow-runs/` 14, APPEARANCE spec |
| 3 Other consumer | 533 | `reports/` 104, `assets/` 3, mobile folders under `figma-export/` 410, `archive/mobile-specs/` 4, Proposals discovery notes 10, `mobile-spec.md`, `mobile-plan.md` |
| 4 Mixed / ambiguous | 330 | CLAUDE.md, COMPOSITIONS.md, FLAGS.md, LOG.md, `flags/` 2, `records/workflow/` 19 + README, 101 gated-workflow batch files under `figma-export/`, 200 files in `archive/` (schema, 81 schema backups, workflow scripts, indexes, instruction files) and three config files (`.gitattributes`, `.gitignore`, `.claude/settings.local.json`) |

Nothing was classified 3 by default: every bucket-3 file either cites the mobile key or the Proposals key, or is a PNG proof or folder that a LOG.md entry citing the mobile key names. The 1,316 SDE files under `figma-export/` are 88 batch folders, most of them PNG proof.

## 2. Direct answers

### 2.1 Where APPEARANCE-NPVE-EDIT-FORMS.md lives

**Root only.** `C:\Code\design system\APPEARANCE-NPVE-EDIT-FORMS.md`, 2,426 bytes. There is no copy in `archive/`: a name search finds one file. Near-neighbours that are not copies:

- `archive/workflow/appearance/README.md` is a different file ("Appearance evidence" checkpoint format for the retired workflow); it links to the spec.
- Six per-batch `figma-export/npve-*/appearance.md` files (patient summary body/content/feedback, flowsheets finish/list-body/measure-row) are batch evidence notes, not the spec.
- It is cited by `CLAUDE.md`, `FLAGS.md`, `LOG.md`, `audits/2026-09-29-cleanup-batch/REPORT.md` and `audits/2026-09-29-file-cleanup/REPORT.md`; also by `archive/batch-scripts/apply-appearance-review.js`, `finalize-appearance-review.js`, `records/workflow/2026-09-10/workflow_appearanceReview_2026-09-10.json` and the appearance review report, all of which predate the 2026-09-13 move to the root (commit `3d08985`).

The working copy differs from HEAD by one line (uncommitted): the Card line changed from "pale teal Form surface using the approved existing token" to "white paper, `color/background/paper`" per Daniel's 2026-09-23 ruling, applied 2026-09-29.

Related disagreement, reported and not resolved: `COMPOSITIONS.md` line 10 (Sheets, "Edit form, 634:6808") still says "Pale teal Form surface". The working-copy APPEARANCE spec and the 2026-09-29 cleanup batch say white paper. The COMPOSITIONS.md edit is not in its uncommitted diff.

### 2.2 archive/AGENTS.md

**Yes**, `archive/AGENTS.md`, 2,823 bytes. It is the old (pre-reset) long AGENTS.md; the root AGENTS.md is a one-line pointer to CLAUDE.md. First ten lines, verbatim (lines are long; nothing trimmed):

```
# AGENTS.md

This repo is the docs, schema, scripts, and exports for the Tebra design system Figma rebuild: a component library rebuilt in Figma from the code in `C:\Code\web-app-v2\packages\design-system`, plus screen rebuilds that consume it. Figma files: Design System Rebuild library `YX2n4YLrEpBXNbcc73T6dw`; Proposals `zKT34LQogNjz3Z07fY4VQB` (consumes the library, never defines it); NPVE Rebuild target `fdCQVFdvOByaOYIJYag0d6`; NPVE source NDE-2026 `zVsuhYehoSLLq880qRBFkq` (read-only, never written); Tebra Working UI Kit `ZPf0sJy83aPyrHjCVHomya` (deprecated, read-only reference). `CLAUDE.md` in the repo root is the canonical instruction file and holds the full standing rules, precedence, and plugin traps; read it first. The register is the append-only record store in the repo root: `records/<workstream>/<date>/<recordId>.json` (one immutable file per batch record), `flags/active.json` and `flags/resolved.json` (the flag register split by status), `foundation/<section>.json` (decisions, tokens, components, standing batch rules); `indexes/` is generated and never hand-edited; `design-system-schema.json` is the aggregate generated from the store, a read-only compatibility view (record schemasplit_phase8_2026-09-08). This file exists because Codex and other tools read `AGENTS.md` by convention. It points at the same canonical rule text as `CLAUDE.md` and adds nothing. Where the two differ, `CLAUDE.md` wins. OPERATORS.md in this root describes the operator seat.

## Rules for any agent working in these files

Any agent — Claude, Codex, or other — editing the Figma files or this repo follows the same loop. Work that skips it gets audited and may be superseded.

The eleven rules are canonical in `workflow/rules.json` → agentRules and appear in every generated `workflow/npve-contract.generated.json`; CLAUDE.md points to the same text. Their titles: 1 Read before touching; 2 Audit before building; 3 One batch at a time; 4 Additive only; 5 No invention; 6 Verify in pixels; 7 Record every batch; 8 Report per rule 13; 9 Stop on disagreement; 10 Record gate; 11 Risk is planner/operator-owned.

```

### 2.3 LOG.md and FLAGS.md references to the file keys

Keys: SDE = target `fdCQVFdvOByaOYIJYag0d6` or legacy source `zVsuhYehoSLLq880qRBFkq`; library = `YX2n4YLrEpBXNbcc73T6dw`; mobile = `TP5KrQtY0T5IcMNqi375So`.

**LOG.md, 149 entries (first is 2026-09-12; earlier history is in `records/`):**

| References | Entries |
|---|---:|
| SDE key(s) at all | 48 |
| library key at all | 76 |
| **both SDE and library** | **28** |
| SDE only (no library key) | 20 |
| library only (no SDE key) | 48 |
| neither key | 53 |
| mobile key at all | 104 |

Cross-cut by primary subject (scripted; any entry that cites the mobile key counted mobile even if it also cites SDE as a read-only source): 41 SDE-only (dated 2026-09-12 to 2026-09-29), 97 mobile-only-or-with-library (2026-09-15 on), 7 cite both mobile and SDE (the medication/vitals/summary sheet ports and similar), 1 library only (2026-09-15, paper fill), 3 cite no key (2026-09-16/17, mobile spec consolidation). Nine entries also cite the Composition System file and three the Proposals file. Only 30 of 149 entry titles contain an NPVE-ish word, so titles alone will not split the log; the file-key line under each heading is the reliable handle.

**FLAGS.md, 512 finding lines** (tag | file key | node | text | date | id). By the file-key column: SDE 150 (116 open, 34 closed), library 81 (70 open, 11 closed), mobile 266 (205 open, 61 closed), Proposals 1, Composition System 2, `repo` (no file) 12. By text reference: 162 lines mention an SDE key anywhere; the other 12 carry a different key in the column (9 library, 3 mobile) and cite an SDE node or key in the text. Tag split for the SDE column: DECISION 76, GAP 49, DEFECT 25. The FLAGS.md section headers ("DEFECT (42 open, 24 closed)" and so on) are stale against the lines beneath them (396 counted by headers, 512 lines found); the lines are the register.

Two entries in FLAGS.md are not in the one-line format (a `DECISION` block dated 2026-09-13 about Screens 29 and a continuation bullet about ButtonOverrides); a script that filters on the line format will miss them.

**GAP lines that reference SDE file keys: 57** (49 with an SDE key in the file-key column; 8 with the library key in the column that cite an SDE node in the text; 4 closed). Every line, in file order:

| # | Status | Column key | Node | Also cites | ID | Finding (start) |
|---:|---|---|---|---|---|---|
| 1 | open | target | `35:332` | target | `npveComparison_imageFillUnbindable` | The reference rectangle carries an IMAGE fill (the 2x source export), which cannot bind a variable.... |
| 2 | open | target | `35:332` | target | `npveComparison_noSpace32Token` | No space/32 variable exists in Tebra/Dimension, so the Rebuild comparison root padding and gap of 32 are literal values.... |
| 3 | open | target | `26:221` | target | `npveFavorites_activeTabNotExpressible` | A single Active tab property cannot be expressed on Problems picker body: the nested Tabs/Tab selected variant cannot be... |
| 4 | open | target | `26:222` | target | `npveFavorites_searchPropsExposedNotLifted` | The nested Text field exposes Value text and Label but they cannot be lifted to body properties; the instance was marked... |
| 5 | open | source | `4618:4967` | source | `npveProblemsRecent_unresolvedColours` | Six source colours matched no library token this batch: #1D6B45 (selected check), #C3E7C0 (hidden check ring), #417E86 (... |
| 6 | open | target | `316:3412` | target | `npveProblemEdit_textFieldNoEndAdornment` | The published Text field component has no end-adornment instance-swap slot, so the Edit Problem date fields cannot place... |
| 7 | open | target | `6:7` | target | `npveRepair1_orphanImportCannotBeRenamed` | Remote subscription nodes cannot be renamed from the Plugin API ("Cannot write to internal and read-only node"), so the ... |
| 8 | open | source | `4841:18131` | source+target | `npveWorkflows_editorToolbarNoPattern` | The rich-text toolbar (undo, redo, H1, bold, italic, underline, align left, numbered list with hairline separators) is d... |
| 9 | open | source | `I4841:18067` | source | `npveWorkflows_expandGlyphMissing` | The note header expand control uses Material expand_content; the library has no expand glyph (the Kit has one).... |
| 10 | open | source | `899:7657` | source | `npveWorkflows_groupedMenuNoSubheader` | The Module Dropdown (Clinical / Billing headers, 392x480) and the appointment date menu (SELECT APPOINTMENT DATE caption... |
| 11 | open | source | `4841:18217` | source | `npveWorkflows_linkChipColourNoToken` | Editor link chips "(FHx) Diabetes (Father)" use #F0EBF5 fill and #8657AC stroke at r4; Chip has no purple colour or r4 o... |
| 12 | open | source | `4841:18059` | source | `npveWorkflows_moduleChipNoLibraryPattern` | The encounter page module strip uses 40-tall r8 closable chips (icon + label + close, #DFEAEC / #8CB2B6 when selected) a... |
| 13 | open | source | `4841:18065` | source | `npveWorkflows_noteCardShellNoLibraryPattern` | The note card (831x748, white, #D6D6D6, r8) has header, toolbar, body and footer bands; library Card (r4, header/media/a... |
| 14 | open | source | `3943:12402` | source | `npveWorkflows_segmentedChipNoPattern` | Medication and order chips on the Med List board are multi-segment ("Start · Sertraline · 50mg · PO · QD · Approve ×"); ... |
| 15 | open | source | `4841:18067` | source | `npveWorkflows_shieldLockGlyphMissing` | The note title carries a 40px shield-lock badge (Material shield_lock, #417E86); the library has Icon/Lock and Icon/Unlo... |
| 16 | open | source | `none` | source | `npveWorkflows_templateMenuInlineField` | The Template dropdown panel combines a Save-as text field with a two-line item list; library Menu/Item is one line and M... |
| 17 | open | target | `424:4362` | target | `npveEncounter_badgeDotCannotSitInline` | Badge variant=dot anchors an 8px dot to the top-right of a 24px child; an inline status dot before text is not expressib... |
| 18 | open | target | `426:4214` | target | `npveEncounter_moduleChipGlyphsMissing` | No vitals, lab, allergy or timeline glyph in the library; the five new module chips use Icon/Clinical, Icon/UserGroupFil... |
| 19 | closed | target | `426:4165` | target | `npveEncounter_patientHeaderPadding10NoToken` | The Patient header (proposal geometry) needs 10px vertical padding; Tebra/Dimension has no space/10, so the value is a l... |
| 20 | open | target | `468:5582` | target | `npveEncounter_toolbarGlyphsMissing` | The toolbar needs mic, transcribe, person-heart and template-list glyphs the library lacks; Icon/Telehealth, Icon/UserOu... |
| 21 | closed | target | `469:5827` | target | `npveEncounter_transcriptionStatusInvention` | Nothing in the library expresses an inline status toggle (radio dot + bold teal label); built minimal as a local Transcr... |
| 22 | open | source | `none` | source | `npveFlowsheets_questionnairePattern_2026-09-11` | Add/Edit source depicts nine four-option questions, selected response, inline graph, date control and Save caret without... |
| 23 | open | source | `129:6647` | source | `npveFlowsheets_proposalOnly_2026-09-13` | Extends npveFlowsheets_questionnairePattern_2026-09-11: the Flowsheets sidesheet family in the source has no code in web... |
| 24 | closed | target | `634:6808` | target | `npveAllergiesAudit_formSurfaceNoLibraryToken` | Form surface is a file-local variable (NPVE/Color, VariableID:387:3434, raw #EEF7F9, the only variable in its collection... |
| 25 | open | library | `575:37` | library+source | `npveVitalsDelta_arrowGlyphIsCaret` | The library has no arrow glyph pair for a signed change indicator (Icon/ArrowLeft 575:3 is the only arrow); Vitals/Delta... |
| 26 | open | library | `none` | library+source | `npveVitals_noChartComponent` | The library has no chart or sparkline component; the source Vitals rows carry a 56x20 sparkline (zVsuhYehoSLLq880qRBFkq ... |
| 27 | open | library | `171:31` | library+source | `npveVitalsDelta_dividerAddsAPixelInFlow` | Library Divider orientation=horizontal is a 1px-tall component, so inside an auto-layout stack it contributes a pixel an... |
| 28 | open | library | `79:2` | library+source | `npveVitalsBody_buttonLabelCapitalized` | Library Button sets its label textCase to TITLE, so a sentence-case label cannot be expressed. The Vitals disclosure car... |
| 29 | open | library | `none` | library+source | `npveVitalsBody_noMonospaceFont` | The library has one font family token, font/family/base (Akkurat LL), so a monospaced value cannot be expressed. The sou... |
| 30 | open | library | `165:57` | library+source | `npveVitalsBody_alertActionAndDismissShareOneSlot` | Library Alert has a single trailing slot: onClose shows it and the action INSTANCE_SWAP decides what sits in it (preferr... |
| 31 | open | target | `429:4161` | target | `npveCleanupAudit_mainNoteScreenUnitsMissing` | Main note screen units not built in the target: recording states Started/Paused/Processing/Closed, editor toolbar and no... |
| 32 | open | library | `none` | library+target | `npveEncounterShell_muiIconsLibraryAsk (2026-09-29: Icon/MUI/RadioButtonChecked 965:694 added to this group.) (2026-09-29: Icon/MUI/PrintOutlined, Pause, PlayArrow and Stop added to this group.)` | Library ask, grouped: no @mui/icons-material glyphs in the library for Icon/MUI/ListAlt, MicNone, PersonOutline, LockOut... |
| 33 | open | library | `79:2` | library+target | `npveButtonIcon_libraryCandidateTokenGaps` | Library candidate: Button-icon (fdCQVFdvOByaOYIJYag0d6 952:14989) needs three things the library does not carry. (1) The... |
| 34 | closed | target | `955:15327` | target | `npveNoteBody_addSectionGlyphPick` | Add Section start glyph: the source uses splitscreen_add (Rec_Started 3159:20182), which has no @mui/icons-material matc... |
| 35 | open | target | `954:15029` | target | `npveNoteBody_tagColorNoToken` | Note tag color: the source draws the FHx tag purple (ring and Bold label #8657AC, fill #FDFCFD, radius 4, Rec_Started 33... |
| 36 | open | target | `955:15050` | target | `npveNoteBody_sectionBlockLimits` | Note section block limits: (1) the inline tag is an absolutely positioned Note tag/FHx with a paragraph indent of 150 on... |
| 37 | open | target | `955:15327` | target | `npveNoteBody_toolbarSizingAndBandTokens` | Note editor/Toolbar sizing: the library Icon button small is 34 with an 18 glyph where the source toolbar uses bare 24 g... |
| 38 | open | target | `955:15236` | target | `npveNoteToolbar_h1ButtonNoGreyInk` | Note editor/Toolbar H1 Button stays teal (color=primary, color/primary/main): the library Button text variant has no val... |
| 39 | open | target | `966:16408` | target | `npveRecording_italicStatusNoStyle` | Italic status text (Transcription in Progress, Transcription Paused, Processing AI Transcriptions, Added to Note) has no... |
| 40 | open | target | `966:16408` | target | `npveRecording_textButtonVsSourceControls` | Library text Button cannot express the source recording controls: it inks color/primary/main in 16 Regular where the sou... |
| 41 | open | target | `969:16276` | target | `npveAIResults_alertOutlinedWarningColours` | Library Alert variant=outlined severity=warning renders a yellow border and glyph with a coral dismiss cross; the source... |
| 42 | open | target | `976:16684` | target | `npveReplaceDialog_noBackdropInLibrary` | The library Dialog has no backdrop. Built a local Dialog backdrop 976:16684 bound to color/computed (no palette)/alphaBl... |
| 43 | open | target | `976:16644` | target | `npveReplaceDialog_vsSource` | Library Dialog cannot express the source Replace dialog: source is 604x232 with a 24 Bold grey title and a hairline abov... |
| 44 | open | target | `966:16408` | target | `npveClickMap_toolbarPillMenusMissing` | Click map: the Note toolbar's Assigned To pill and Mic device pill open menus that are not rebuilt, and the source has n... |
| 45 | open | target | `980:16655` | target | `npveClickMap_printPreviewMissing` | Click map: Print has no destination in the target; the source draws a Print Example frame 5093:18693 (1429x815) that is ... |
| 46 | open | target | `958:25108` | target | `npveClickMap_sectionMenusMissing` | Click map: the Add Section menu (source strings Add Family History, Add Travel History, Add Social History) and each sec... |
| 47 | open | target | `424:4394` | target | `npveClickMap_footerMenusAndChargeCaptureMissing` | Click map: the note footer's Sign (caret) and More (ellipsis) menus, and the Charge Capture destination, are not rebuilt... |
| 48 | open | target | `426:4214` | target | `npveClickMap_moduleChipsCareLabsTimelineMissing` | Click map: the Care Team, Labs/Studies and Timeline module chips have no rebuilt destination (Vitals, Allergies and AI S... |
| 49 | open | target | `424:4360` | target | `npveClickMap_noteClosedShieldExpandMissing` | Click map: no frame shows the Note closed (Note chip and card close), and the shield badge and expand have no target dra... |
| 50 | open | target | `160:4896` | target | `npveClickMap_problemsStatusFilterMenuMissing` | Click map: the Problems Status filter has no open menu; Problems list State=Open shows only the row status menu 156:1321... |
| 51 | open | target | `943:14942` | target | `npveClickMap_resultStatesMissing` | Click map: no result states are drawn for a problem added to the note (row Add to note, Add Active Problems to Note, pic... |
| 52 | open | target | `672:7932` | target | `npveEncounterPrototype_patientSummaryTallerThanSlot` | Patient Summary (672:7932, 550 x 939; Error/Entry 673:8046 at 1273; Success 673:8349 at 1023) is taller than the 748 lef... |
| 53 | open | target | `1004:8207` | target | `npveEncounterWiring_modulesBridgeScaffolding` | Modules bridge: four SCAFFOLDING hotspots (1008:13157 on F01, 1008:13159 on F10, 1008:13161 on F03, 1008:13163 on F04) s... |
| 54 | open | target | `1004:40247` | target | `npveEncounterWiring_pickerSaveNoResultState` | The picker Save, Save & Add To Note and Cancel all land on frame a (Problems open) because no result state exists: no ro... |
| 55 | open | target | `966:16408` | target | `npveRecording_timerNewElement` | The elapsed-time timer is a new element for engineering: the design shows a static "04:12" that engineering must drive (... |
| 56 | open | target | `981:19699` | target | `npveRecording_startedCompactOverflow8` | Started Compact overflows 799 by 8 px: left content 387 + gap 8 + right content 412 = 807. Every gap was already 8, so n... |
| 57 | open | target | `981:19714` | target | `npveRecording_pausedCompactOverflow65` | Paused Compact overflows 799 by 65 px: 387 + 8 + 469 = 864. Nothing to tighten; the left group shrinks to 322 and the As... |

### 2.4 Does a schema file hold SDE records next to library records?

Yes. Only one aggregate exists, and it is retired: **`archive/design-system-schema.json`** (1,658,815 bytes, generated from the split store; the 2026-09-12 reset moved it into `archive/`). There is no schema file at the repo root. 81 dated copies of it are in `archive/schema-backups/`. The live equivalent is the split store: `records/`, `flags/`, `foundation/`, and the two are described as "read-only compatibility view" of it.

How the aggregate is organised, counted from its top-level keys (130 total):

| Bucket | Top-level keys | How they are distinguished |
|---|---:|---|
| SDE | 69 | Key name starts `npveRebuild_`. Some carry `_targetFile` / `_sourceFile` notes with the target and source keys |
| Library / foundation | 40 | The 14 register sections (`meta`, `tokens`, `components`, ...), `flags` (list of 297) and the dated library records before 2026-09-02 (`propertySurfaceRepair2026_08_26` ... `quietPatientChipsWithoutFill2026_09_01`), plus `libraryTodos_*` and `libraryThumbIcons_2026-09-10` |
| Workflow infrastructure | 21 | `workflow*`, `leanPilot_*`, `postPilot_*`, `schemasplit_*`, `backupPolicyB_*`, `docsOperatorsGuide_*` |

The split store keeps the same separation by folder: `records/library/` 26 files, `records/npve/` 71, `records/workflow/` 19. Keys do not separate them cleanly: 50 of the 71 NPVE records also contain the library file key, 7 of 19 workflow records contain an SDE key and 2 of 26 library records contain one. **`flags/active.json` (237 entries) and `flags/resolved.json` (60) mix both** and mostly carry no file key at all (218 and 55 respectively); they are distinguished by flag `id` prefix, `npve*` (88 active, 41 resolved) against the rest (130 and 14, which are library, workflow and repo findings). Records are not present for the mobile prototype: the store was frozen 2026-09-12 and mobile work starts 2026-09-15, so mobile lives only in LOG.md, FLAGS.md, COMPOSITIONS.md, `mobile-spec.md`, `mobile-plan.md`, `reports/` and `figma-export/`.

### 2.5 Absolute, machine-specific and `C:\Code` paths

Every reference is text inside a document, script or JSON; none is a live import, symlink or config. Nothing in the repo root's active instruction files (CLAUDE.md, AGENTS.md) contains one: CLAUDE.md says "web-app-v2/packages/design-system" relatively. Distinct roots found, with occurrence counts (all 3,137 files; the schema backups dominate):

| Path root | Occurrences | Notes |
|---|---:|---|
| `C:\Code\web-app-v2` (`\packages\design-system`) | ~1,150 | Library code source. Expected to stay (library upstream). |
| `C:\Code\design system` (this repo; truncated at the space in some greps) | ~280 | Mostly `figma-export/*/report.md` from 2026-09-02..12 and the workflow evidence |
| `C:\Code\tebra-catalog` | 165 | Sibling repo cited by the retired schema and its backups; 158 in the backups |
| `C:\Users\coled\...` | 57 (+17 `/Users/`) | Home-dir paths in workflow session-economy evidence, startup measurements, a session note, and one OneDrive Desktop spec path (FLAGS.md:164) |
| `C:\Code\visit-companion-prototype` | 14 | Mobile prototype code repo, all in LOG.md |
| `C:\Code\tebra-rebuild` | 9 | Retired handoff.json files under `archive/figma-export/` and `archive/CLAUDE-2026-09-12.md` |
| `C:\Code\design-agent` (3), `design-coordination` (1), `de...` truncations (3) | 7 | Old sibling repos in `archive/CHAT-HANDOFF.md`, `archive/discovery/` |

Files that matter for the split, outside the retired bulk:

| File | Path(s) | Bucket |
|---|---|---|
| `LOG.md` | `C:\Code\visit-companion-prototype\...` (14 lines, `BACKPORT-PROMPT.md`, `runs/2026-09-26-figma-b3/`); `C:\Code\web-app-v2` (5); one `C:\Users\coled\OneDrive\Desktop\` folder reference (line 2824, where the mobile specs came from) | mixed (already 4) |
| `FLAGS.md:164` | `C:\Users\coled\OneDrive\Desktop\mobile-ambient-capture-spec.md` - "exists only at" that path | mixed |
| `PLUGIN-NOTES.md:102` | `C:\Code\web-app-v2\packages\design-system` | library |
| `TEBRA-DESIGN-SYSTEM.md:8` | `C:\Code\web-app-v2` "read-only checkout is conventionally at" | library |
| `foundation/meta.json:3` and `figmaBuild.json:790` | `C:/Code/web-app-v2/packages/design-system`, `C:/Code/web-app-v2` | library |
| `flags/active.json`, `flags/resolved.json` | `C:\Code\web-app-v2\packages` (3) | mixed |
| `records/library/*` (10 files), `records/npve/*` (7), `records/workflow/*` (3) | web-app-v2, tebra-catalog, design system | per record |
| `figma-export/npve-*` and `library-todos*` reports | `C:\Code\design system` (2026-09-02..06 reports), `C:\Code\web-app-v2\packages` | SDE / library |
| `figma-export/workflow-*`, `npve-allergies-edit-2026-09-09/session-note-2026-09-09-mcp-capability.md`, `npve-patient-summary-content-2026-09-10/measure-observed.js`, `schema-split-phase8-2026-09-08/dry-run-store-cycle.log` | `C:\Users\coled\...` | workflow / SDE |
| `reports/Change the telehealth marker to text and icon.md` | `C:\Code\web-app-v2` | mobile |
| `archive/**` (schema, backups, batch scripts, workflow scripts, instruction files) | web-app-v2, tebra-catalog, design system, tebra-rebuild, design-agent | retired |
| `.claude/settings.local.json` | none (only MCP tool ids); the auto-memory path `C:\Users\coled\.claude\projects\C--Code-design-system\memory` is derived from this repo's path and would not follow it | 4 |

Nothing in `records/`, `foundation/` or `flags/` embeds a path under `C:\Code\sde` (the folder does not exist).

## 3. Root files

Bucket, then evidence. All at the repo root. `(local)` = gitignored. The per-file CSV also lists every non-root file.

| Path | Bucket | Evidence |
|---|---|---|
| `.gitattributes` | Mixed/ambiguous | LF rules for records/, flags/, foundation/, indexes/, workflow/, scripts/ - covers both the library store and the gated-workflow store |
| `.gitignore` | Mixed/ambiguous | Ignores .workflow-runs/ (SDE run state) and .tmp.driveupload/ (machine temp) - one line for each |
| `AGENTS.md` | Library | One line: "Read CLAUDE.md. It is the only instruction file." Repo-level pointer; SDE will need its own |
| `APPEARANCE-NPVE-EDIT-FORMS.md` | SDE | Approved appearance spec for NPVE Allergies/Family History edit forms; cites zVsuhYehoSLLq880qRBFkq and target nodes; scope line says it is not global |
| `CLAUDE.md` | Mixed/ambiguous | Repo instruction file: rules 1-12, Record and Agents are library-general; Files section lists SDE target and legacy keys and the APPEARANCE spec; also lists Proposals and Composition System keys. No mention of the mobile prototype or of the SDE rename |
| `COMPOSITIONS.md` | Mixed/ambiguous | Index of compositions: lines 1-6 library preamble; 7-18 Sheets (NPVE target); 20-30 Pages (Proposals); 32-70 Mobile (TP5KrQtY0T5IcMNqi375So); 72-73 Encounter shell page in the NPVE target sits under the Mobile heading |
| `FLAGS.md` | Mixed/ambiguous | One line per finding, file key in column 2: 150 SDE, 81 library, 266 mobile prototype, 1 Proposals, 2 Composition System, 12 repo/none (see section 4) |
| `LOG.md` | Mixed/ambiguous | 149 entries from 2026-09-12: 41 reference only SDE keys, 97 reference the mobile file key, 1 library only, 3 no key (see section 4) |
| `PLUGIN-NOTES.md` | Library | Plugin API traps and icon recipe; traps 35 and 36 cite mobile-prototype examples, otherwise generic |
| `REFERENCE-KIT.md` | Library | Manifest of the deprecated Tebra Working UI Kit (ZPf0sJy83aPyrHjCVHomya) and its open "need Daniel" items |
| `TEBRA-DESIGN-SYSTEM.md` | Library | Written form of the library code: theme architecture, token derivations, per-component override table; 0 SDE references |
| `alert-scan-actions.json` | Library | Scan of Alert action usage in web-app-v2 admin-ui source files |
| `alert-scan-data.json` | Library | Scan of Alert usage in web-app-v2 source files |
| `autocomplete-scan.json` | Library | Scan of Autocomplete usage in web-app-v2 source files |
| `bg-scan.json` | Library | Scan of ButtonGroup usage in web-app-v2 source files |
| `defects-scan.json` | Library | Code-defect scan over web-app-v2 source |
| `field-corrected.png` | Library | Text field render from the library build |
| `field-final.png` | Library | Text field render from the library build (byte size identical to field-corrected.png) |
| `final-button-set.png` | Library | Library Button set render |
| `icon-batch-0.json` | Library | SVG icon batch for library icon build |
| `icon-batch-1.json` | Library | SVG icon batch for library icon build |
| `icon-batch-2.json` | Library | SVG icon batch for library icon build |
| `icons-marketing.json` | Library | Marketing icon source for library icon build |
| `icons-utility.json` | Library | Utility icon source for library icon build |
| `kit-provenance.json` | Library | Provenance table for the deprecated kit exports in figma-export/ |
| `mobile-plan.md` | Other consumer | Plan and batch history for the mobile ambient capture prototype (TP5KrQtY0T5IcMNqi375So) |
| `mobile-spec.md` | Other consumer | The one spec for the mobile prototype; names the NPVE target only as a read-only sheet source (nine NPVE mentions) |
| `option-converted.png` | Library | Library option/menu-item render |
| `ref-button-set.png` | Library | Library Button reference render |
| `rows.json` | Library | Scan of DialogActions usage in web-app-v2 admin-ui source |
| `rule8-audit.figma.js` | Library | Standing-rule-8 integer-px audit script for use_figma; PLUGIN-NOTES tooling |
| `scan-out.json` | Library | Empty scan output ([]); scratch |
| `select-scan.json` | Library | Scan of Select usage in web-app-v2 source files |
| `table-scan.json` | Library | Scan of Table usage in web-app-v2 source files |
| `textfield-states.png` | Library | Library Text field states render |
| `tmp-grep.txt` | Library | Scratch list of web-app-v2 admin-ui source paths; scratch |
| `tmp-mine.txt` | Library | Scratch list of web-app-v2 admin-ui source paths; scratch |
| `.claude/settings.local.json` (local) | Mixed | Local Claude Code permissions (two Figma MCP tool ids); gitignored, machine-local, belongs to whichever repo is opened |

## 4. Mixed files: which parts belong where

**CLAUDE.md** (4,779 bytes). Library: the intro paragraph, Truth, Rules 1-12, Record (except the SDE log examples), Agents; PLUGIN-NOTES / TEBRA-DESIGN-SYSTEM / REFERENCE-KIT / COMPOSITIONS pointers. SDE: the two Files lines for target `fdCQVFdvOByaOYIJYag0d6` and legacy source `zVsuhYehoSLLq880qRBFkq`, and the APPEARANCE-NPVE-EDIT-FORMS.md paragraph ("Check a rebuilt form against it before reporting"). Other consumer: the Proposals line and the Composition System line (both are consumers/records). Missing: no line for the mobile prototype file.

**COMPOSITIONS.md** (73 lines). Lines 1-6 library preamble and the rhythm rule; lines 7-18 "Sheets (NPVE fdCQVFdvOByaOYIJYag0d6)" are SDE (11 compositions, node ids in the target; line 10 Edit form is stale against APPEARANCE, see 2.1); lines 20-30 "Pages (Proposals zKT34LQogNjz3Z07fY4VQB)" are Proposals (line 23 also names the NPVE local Patient header 426:4165); lines 32-70 "Mobile (ambient capture ...)" are the mobile prototype, provisional; **lines 72-73, the "Encounter shell page" `943:14942` and its 2026-09-29 status update, are SDE content sitting under the Mobile heading**. The Composition System file (`oNrOL9kQCpJHyK4rBCGqsq`) is the record the index points at; per CLAUDE.md it consumes and never defines the library.

**LOG.md** (149 entries, 4,348 lines). Library: 1 entry by key plus the library halves of 28 entries that cite both. SDE: 41 entries citing only SDE keys, dated 2026-09-12..29, plus 7 sharing with mobile. Mobile: 97 entries from 2026-09-15. No entry is missing a File line by design, but 3 have no key. The 28 entries that name both SDE and library keys are the ambiguous set: likely SDE batches that read the library, but that is unverified. The history before 2026-09-12 is not in LOG.md.

**FLAGS.md** (512 finding lines). SDE 150, library 81, mobile 266, Proposals 1, Composition System 2, `repo` 12; see 2.3 for tag/status splits. The 12 `repo` lines describe repo docs and tooling and need a call per line. The two off-format lines are listed in 2.3.

**.gitattributes**. LF rules for `records/**`, `flags/*.json`, `foundation/*.json`, `indexes/*.json`, `design-system-schema.json`, `workflow/*.json`, `scripts/**/*.js`. `foundation/` is library; `records/`, `flags/` are shared; `indexes`, `workflow`, `scripts` are retired workflow paths that no longer exist at the root.

**.gitignore**. Two lines, one for each: `.workflow-runs/` (SDE run state) and `.tmp.driveupload/` (machine temp).

**.claude/settings.local.json**. Local, gitignored permissions allowing two Figma MCP tool ids; the id `5577fcc4-...` is the Figma MCP connection that `audits/2026-09-29-file-cleanup/REPORT.md` says failed during that audit. Belongs to whichever folder Claude Code is opened in.

**flags/active.json, flags/resolved.json**. Library, SDE and workflow flags together; see 2.4 for the `id`-prefix rule. 129 of the 297 entries carry an `npve` id prefix (43%).

**records/workflow/ (19 files) and records/README.md**. Retired gated-workflow batch records (2026-09-04..12). The workflow ran against the NPVE queue (7 records cite an SDE key) but its runner, schema split, cost tracking and source-gate work are repo-wide tooling. README describes all three streams.

**archive/design-system-schema.json, archive/schema-backups/ (81), archive/indexes/ (2)**. See 2.4: library 40 keys, SDE 69, workflow 21. Backups are dated copies of the same aggregate.

**archive/ instruction files** (`AGENTS.md`, `CHAT-HANDOFF.md`, `CLAUDE-2026-09-12.md`, `HANDOFF.md`, `OPERATORS.md`, `README.md`, `clinerules`, `copilot-instructions.md`). Retired rules for the whole repo. `archive/AGENTS.md` names all five Figma files; `HANDOFF.md` (40 KB) is library method with the Proposals key; `OPERATORS.md` and `CLAUDE-2026-09-12.md` describe the NPVE-era operator seat; `CHAT-HANDOFF.md` is a chat handoff with no file keys. Keep intact in the library, copy nothing.

**archive/scripts/ (54), archive/workflow/ (12), archive/batch-scripts/ (35 workflow/repo-tooling files), archive/figma-export/ workflow entries, and the 19 `figma-export/workflow-*` and related folders.** Workflow and schema tooling built during the NPVE rebuild: generic gates and schema store code with an NPVE-specific runner (`scripts/workflow/npve-runner.js`, `workflow/npve-contract.generated.json`, `figma-export/workflow-npve-runner-2026-09-11/`) among it. Which side owns it is a decision; nothing here runs after the 2026-09-12 reset (per memory and CLAUDE.md).

**figma-export/ workflow-family folders (101 files):** `workflow-*` (14 dirs), `lean-pilot-run2-3`, `post-pilot-merge`, `schema-split-phase8`, `backup-policy-b`, `docs-operators-guide`.

## 5. Every folder as a unit

Bucket "Mixed(...)" means the folder's files were classified individually and split; the per-file CSV has each. For `figma-export/` the 212 subfolders are listed by family below rather than one per row.

| Unit | Files | Bucket | Evidence (dominant) |
|---|---:|---|---|
| `.claude/` | 1 | Mixed | Local Claude Code permissions (two Figma MCP tool ids); gitignored, machine-local, belongs to whichever repo is opened |
| `.workflow-runs/` | 15 | Mixed: Library 1, SDE 14 | gated-workflow run state for an NPVE screen batch (npve-*/pilot-* names); gitignored |
| `archive/` | 9 | Mixed | retired instruction/handoff file covering library, NPVE and workflow together |
| `archive/batch-scripts` | 157 | Mixed: Library 11, SDE 111, Mixed 35 | batch script named for an NPVE record |
| `archive/discovery` | 20 | Mixed: Library 10, Other consumer 10 | library component discovery note |
| `archive/figma-export` | 22 | Mixed: Library 1, SDE 14, Mixed 7 | retired workflow artifact (execution.json/handoff) for an NPVE batch |
| `archive/indexes` | 2 | Mixed | generated indexes over the whole record store |
| `archive/loose-scripts` | 20 | Mixed: Library 16, SDE 4 | August library scan/generator script |
| `archive/mobile-specs` | 4 | Other consumer | superseded mobile specs (replaced by mobile-spec.md); cite TP5KrQtY0T5IcMNqi375So |
| `archive/schema-backups` | 81 | Mixed | dated copy of the aggregate schema (library + NPVE + workflow records together) |
| `archive/scripts` | 54 | Mixed | retired workflow/schema/figma tooling; generic to the store, with an NPVE runner among it |
| `archive/workflow` | 12 | Mixed | retired workflow contract/policy/runner docs; README calls them "reusable NPVE programs" over generic gates |
| `assets/` | 3 | Other consumer | patient/provider portraits used by the mobile prototype (LOG 2026-09-17 avatar entries; assets/ written the same day) |
| `audits/2026-09-29-button-icon` | 11 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-cleanup-batch` | 49 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-click-map` | 23 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-compact-recording` | 11 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-encounter-shell-complete` | 22 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-encounter-shell` | 17 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-file-cleanup` | 99 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-note-body-in-place` | 20 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-note-body-units` | 11 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-prototype-frames` | 12 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-prototype-wiring` | 6 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-recording-and-ai-results` | 17 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-recording-controls` | 12 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `audits/2026-09-29-recording-labels` | 13 | SDE | 2026-09-29 NPVE target audit/batch report; every REPORT.md cites fdCQVFdvOByaOYIJYag0d6 |
| `flags/` | 2 | Mixed | flag register split by status; entries are library and NPVE together (see 2.4) |
| `foundation/` | 14 | Library | library register section (tokens, components, decisions, naming freeze, ...); 0 SDE-key references |
| `icon-svg/` | 49 | Library | library icon SVG export |
| `records/` | 1 | Mixed | README for the closed record store (all three workstreams) |
| `records/library` | 26 | Library | closed library batch record (2026-08-26..09-10) |
| `records/npve` | 71 | SDE | closed NPVE batch record (2026-09-02..11) |
| `records/workflow` | 19 | Mixed | closed gated-workflow batch record (2026-09-04..12); infrastructure that served both |
| `reports/` | 60 | Other consumer | mobile-prototype batch report or proof (each .md cites TP5KrQtY0T5IcMNqi375So); PNG/sub-folders proof for the same batches |
| `reports/avatar-clip` | 7 | Other consumer | mobile-prototype batch report or proof (each .md cites TP5KrQtY0T5IcMNqi375So); PNG/sub-folders proof for the same batches |
| `reports/avatar-polish` | 8 | Other consumer | mobile-prototype batch report or proof (each .md cites TP5KrQtY0T5IcMNqi375So); PNG/sub-folders proof for the same batches |
| `reports/backport-2026-09-25` | 5 | Other consumer | PNG proof for Backport batches (LOG cites TP5KrQtY0T5IcMNqi375So); untracked |
| `reports/colette-younger` | 4 | Other consumer | mobile-prototype batch report or proof (each .md cites TP5KrQtY0T5IcMNqi375So); PNG/sub-folders proof for the same batches |
| `reports/demo-cleanup` | 16 | Other consumer | mobile-prototype batch report or proof (each .md cites TP5KrQtY0T5IcMNqi375So); PNG/sub-folders proof for the same batches |
| `reports/yusuf-in-line` | 4 | Other consumer | mobile-prototype batch report or proof (each .md cites TP5KrQtY0T5IcMNqi375So); PNG/sub-folders proof for the same batches |
| `figma-export/` (39 root entries: PNGs and component folders) | 39 | Library | deprecated-kit component render / reference PNG at figma-export root |

### figma-export/ subfolders by family

**1 Library, deprecated-kit component folders**: 12 folders, 112 files.

`Autocomplete` (3), `Button group` (1), `Icon` (79), `Illustration` (7), `List` (1), `Marketing` (9), `Menu` (1), `Nav` (6), `Pagination` (1), `Stepper` (1), `Table` (2), `Tabs` (1)

**1 Library, library and composition batches**: 13 folders, 113 files.

`button-outlined-check-2026-09-02` (2), `compact-tabs-search-2026-09-02` (7), `composition-system-enumeration-2026-09-13` (4), `compositions-batch-a-2026-09-13` (3), `compositions-batch-b-2026-09-13` (13), `compositions-batch-c-2026-09-13` (10), `compositions-batch-c-rulings-2026-09-13` (8), `library-paper-fill-2026-09-15` (5), `library-thumb-icons-2026-09-10` (33), `library-todos` (1), `library-todos-read-2026-09-03` (9), `library-todos-write1-2026-09-03` (17), `library-todos-write2-2026-09-03` (1)

**2 SDE**: 88 folders, 1316 files.

`model-test-2026-09-10` (4), `npve-agent-rules-2026-09-04` (1), `npve-allergies-audit-2026-09-13` (1), `npve-allergies-comparison-height-correction-2026-09-05` (2), `npve-allergies-edit-2026-09-09` (10), `npve-allergies-field-repair-2026-09-13` (10), `npve-allergies-list-2026-09-05` (8), `npve-audit-2026-09-03` (9), `npve-body-padding-read-2026-09-03` (1), `npve-body-padding-search-2026-09-02` (8), `npve-changelog-2026-09-02` (4), `npve-cleanup-2026-09-03` (8), `npve-comparison-layout-2026-09-02` (3), `npve-encounter-shell-2026-09-06` (20), `npve-encounter-toolbar-2026-09-06` (15), `npve-enum-2026-09-02` (17), `npve-ext-review-repairs-2026-09-05` (34), `npve-external-care-facility-stay-2026-09-05` (8), `npve-external-care-hospitalizations-2026-09-05` (5), `npve-external-review-2026-09-05` (25), `npve-family-history-2026-09-05` (8), `npve-family-history-edit-2026-09-09` (11), `npve-flowsheets-archive-review-2026-09-13` (4), `npve-flowsheets-audit-2026-09-11` (19), `npve-flowsheets-finish-2026-09-11` (50), `npve-flowsheets-finish-2026-09-13` (34), `npve-flowsheets-list-2026-09-05` (1), `npve-flowsheets-list-body-2026-09-11` (174), `npve-flowsheets-measure-row-2026-09-11` (119), `npve-gold-stars-corrections-2026-09-03` (8), `npve-health-status-observations-2026-09-05` (5), `npve-health-status-optical-spacing-2026-09-06` (4), `npve-label-drift-underline-2026-09-03` (15), `npve-medication-list-body-2026-09-04` (7), `npve-medication-list-height-correction-2026-09-04` (5), `npve-medication-list-sidesheet-2026-09-04` (8), `npve-medication-summary-row-2026-09-04` (7), `npve-medication-surface-correction-2026-09-04` (7), `npve-mgmt-fidelity-2026-09-04` (16), `npve-mgmt-fidelity-build-2026-09-04` (23), `npve-module-chip-fix-2026-09-06` (8), `npve-module-chip-fix-2026-09-08` (12), `npve-module-chip-relationship-spacing-2026-09-06` (9), `npve-next-candidate-audit-2026-09-05` (9), `npve-note-header-layout-2026-09-08` (10), `npve-past-medical-history-body-2026-09-08` (20), `npve-past-medical-history-row-2026-09-08` (7), `npve-past-medical-history-section-2026-09-08` (7), `npve-patient-summary-body-2026-09-10` (36), `npve-patient-summary-content-2026-09-10` (21), `npve-patient-summary-feedback-2026-09-10` (36), `npve-planning-2026-09-09` (3), `npve-problem-edit-2026-09-04` (5), `npve-problem-edit-spacing-correction-2026-09-04` (4), `npve-problem-links-2026-09-14` (9), `npve-problem-links-variant-2026-09-14` (8), `npve-problems-favorites-2026-09-02` (5), `npve-problems-low-oversight-batch-2026-09-04` (9), `npve-problems-recent-2026-09-02` (8), `npve-problems-recent-build-2026-09-02` (11), `npve-problems-recent-corrections-2026-09-02` (5), `npve-procedure-history-2026-09-04` (7), `npve-repair1-2026-09-04` (14), `npve-repair2-2026-09-04` (22), `npve-row-structure-2026-09-04` (12), `npve-sidesheet-2026-09-02` (40), `npve-sidesheet-base8-spacing-audit-2026-09-04` (5), `npve-sidesheet-build-2026-09-02` (9), `npve-sidesheet-closeout-2026-09-02` (5), `npve-sidesheet-header-inset-audit-2026-09-04` (6), `npve-sidesheet-header-padding-global-2026-09-04` (11), `npve-sidesheet-outline-footer-global-2026-09-04` (9), `npve-sidesheet-radius-placement-2026-09-04` (7), `npve-social-history-2026-09-06` (5), `npve-social-history-new-entry-placement-2026-09-06` (4), `npve-status-audit-2026-09-14` (31), `npve-tab-underline-fix-2026-09-03` (11), `npve-tidy-2026-09-08` (11), `npve-vitals-body-2026-09-14` (7), `npve-vitals-delta-2026-09-14` (23), `npve-vitals-enum-2026-09-14` (16), `npve-vitals-list-2026-09-14` (6), `npve-vitals-placeholders-2026-09-14` (14), `npve-vitals-row-2026-09-14` (12), `npve-vitals-row-grid-fix-2026-09-14` (8), `npve-vitals-row-regrid-2026-09-14` (9), `npve-vitals-sheet-2026-09-15` (7), `npve-workflows-audit-2026-09-05` (45)

**3 Other consumer (mobile prototype)**: 80 folders, 410 files.

`account-a0-2026-09-16` (5), `account-a1-clone-2026-09-16` (3), `account-a2a-2026-09-16` (6), `account-a2a1-rebind-2026-09-16` (2), `account-a2b-topbar-2026-09-16` (2), `account-a2c-screens-2026-09-16` (6), `account-a2d-pill-2026-09-16` (3), `account-a3a-micsheet-2026-09-16` (2), `account-a3b-corners-frames-2026-09-16` (27), `account-a4a-frames-2026-09-16` (7), `account-a4b-2026-09-16` (2), `account-a5-2026-09-16` (2), `account-c1-overlay-2026-09-16` (1), `account-d1-drawer-glyph-2026-09-16` (11), `archive-dead-frames-2026-09-17` (3), `chart-copy-2026-09-17` (9), `colette-summary-2026-09-17` (5), `login-fields-2026-09-17` (4), `marcus-yusuf-split-2026-09-17` (5), `medications-sheet-2026-09-17` (5), `mobile-capture-batch1-2026-09-15` (3), `mobile-capture-batch2-2026-09-15` (8), `mobile-capture-batch3-2026-09-15` (4), `mobile-capture-batch4-2026-09-15` (3), `mobile-capture-batch5-2026-09-15` (2), `mobile-capture-batch5-followup-2026-09-15` (3), `mobile-capture-copy-2026-09-15` (4), `mobile-capture-failure-path-2026-09-15` (4), `mobile-capture-paper-fill-2026-09-15` (6), `mobile-capture-part1-2026-09-15` (1), `mobile-capture-partA-2026-09-15` (4), `mobile-capture-rulings-2026-09-15` (3), `mobile-capture-storyline-2026-09-15` (5), `next-patient-2026-09-17` (6), `now-marker-2026-09-17` (5), `now-marker-dot-2026-09-17` (5), `npve-n1-drawer-2026-09-16` (18), `open-chart-header-2026-09-17` (14), `patient-landing-2026-09-17` (4), `patient-not-sent-2026-09-17` (2), `patient-page-experiments-2026-09-17` (4), `patient-summaries-2026-09-17` (10), `phone-playthrough-notes-2-2026-09-17` (9), `phone-playthrough-notes-2026-09-17` (15), `schedule-chevron-2026-09-17` (2), `schedule-full-day-2026-09-17` (3), `schedule-home-2026-09-17` (4), `schedule-only-home-2026-09-17` (2), `schedule-s0-2026-09-16` (3), `schedule-s2-2026-09-16` (2), `scrim-2026-09-17` (13), `sent-copy-leads-with-name-2026-09-17` (2), `signin-logo-bottom-2026-09-17` (3), `telehealth-text-2026-09-17` (3), `tidy-account-2026-09-17` (3), `visit-base-screens-align-2026-09-16` (4), `visit-circle-controls-2026-09-16` (5), `visit-controls-large-2026-09-16` (3), `visit-d0-2026-09-15` (5), `visit-d1-2026-09-15` (3), `visit-d1-fixes-2026-09-15` (2), `visit-d12-mui-glyphs-2026-09-16` (8), `visit-d2-2026-09-15` (2), `visit-d3-2026-09-15` (9), `visit-d4-2026-09-15` (5), `visit-drawer-audit-2026-09-16` (7), `visit-drawer-edge-2026-09-16` (5), `visit-footer-keyline-2026-09-16` (2), `visit-g1-mui-chevrons-2026-09-16` (7), `visit-handle-selected-2026-09-16` (5), `visit-k1-cleanup-2026-09-16` (7), `visit-k2-controls-2026-09-16` (4), `visit-library-list-2026-09-16` (3), `visit-merged-top-row-2026-09-16` (4), `visit-one-selector-2026-09-16` (6), `visit-optical-2026-09-16` (3), `visit-puller-gap-2026-09-16` (6), `visit-rev7-2026-09-16` (3), `visit-toolbar-2026-09-16` (2), `vitals-sheet-2026-09-17` (8)

**4 Mixed, gated-workflow batches**: 19 folders, 101 files.

`backup-policy-b-2026-09-08` (2), `docs-operators-guide-2026-09-04` (1), `lean-pilot-run2-3-2026-09-08` (20), `post-pilot-merge-2026-09-08` (1), `schema-split-phase8-2026-09-08` (6), `workflow-appearance-review-2026-09-10` (1), `workflow-credit-reset-2026-09-10` (2), `workflow-execution-reliability-2026-09-10` (1), `workflow-flowsheets-resume-2026-09-12` (4), `workflow-npve-queue-refresh-2026-09-10` (1), `workflow-npve-runner-2026-09-11` (6), `workflow-plan-inventory-2026-09-12` (9), `workflow-record-scripts-2026-09-12` (6), `workflow-refactor-closeout-2026-09-08` (18), `workflow-run-cost-tracking-2026-09-10` (2), `workflow-session-economy-2026-09-12` (7), `workflow-session-economy-c-2026-09-12` (12), `workflow-source-gate-variants-2026-09-12` (1), `workflow-tier-approval-2026-09-08` (1)


## 6. Things I could not settle from the filesystem

1. **Whether the deprecated-kit exports at `figma-export/` root (39 entries: `Accordion.png`, `Icon/`, `Nav/`, ...) are still wanted.** They belong to the library side (REFERENCE-KIT.md manifests them; kit-provenance.json). Treated as library.
2. **The 28 LOG.md entries that cite both an SDE key and the library key** are probably SDE batches that read the library for token or component keys, but I did not read them; each needs a read to assign.
3. **`figma-export/model-test-2026-09-10`** is bucketed SDE (MODEL TEST is node `642:7557` in the target) but the LOG has no entry naming the folder; the record lives in `records/npve/`.
4. **`figma-export/npve-n1-drawer-2026-09-16`** is named npve but is a mobile-drawer batch; a name-based pass would send it the wrong way. PNG-only folders can only be classified by name and LOG entry, so other misnamed folders could exist; none turned up by key.
5. **`figma-export/library-paper-fill-2026-09-15`, `compositions-*` and `composition-system-enumeration-*`** are bucketed library because they change the library or the Composition System, but the three compositions LOG entries also cite the SDE target (read-only source geometry).
6. **`audits/`** (2026-09-29, 14 folders) is SDE by key, but FLAGS.md lines tied to it include library asks (`npveButtonIcon_libraryCandidateTokenGaps`, `npveEncounterShell_muiIconsLibraryAsk`); the folders themselves are SDE evidence.
7. **The 12 `repo` FLAGS.md lines** and **the 3 keyless LOG.md entries** were not sorted individually.
