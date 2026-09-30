# Visit Companion split and SDE specs, 2026-09-30

Write batch across three repos. No Figma reads or writes, no `git init`, nothing moved, `.claude/` in visit-companion-prototype untouched.

## 1. SDE repo: six specs copied

Copied byte for byte (checked), not edited. All six are named `appearance.md`, so every destination is prefixed with its source folder name.

| Source (library repo) | Destination (`C:\Code\sde`) |
|---|---|
| `figma-export/npve-flowsheets-finish-2026-09-11/appearance.md` | `specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md` |
| `figma-export/npve-flowsheets-list-body-2026-09-11/appearance.md` | `specs/flowsheets/npve-flowsheets-list-body-2026-09-11-appearance.md` |
| `figma-export/npve-flowsheets-measure-row-2026-09-11/appearance.md` | `specs/flowsheets/npve-flowsheets-measure-row-2026-09-11-appearance.md` |
| `figma-export/npve-patient-summary-body-2026-09-10/appearance.md` | `specs/patient-summary/npve-patient-summary-body-2026-09-10-appearance.md` |
| `figma-export/npve-patient-summary-content-2026-09-10/appearance.md` | `specs/patient-summary/npve-patient-summary-content-2026-09-10-appearance.md` |
| `figma-export/npve-patient-summary-feedback-2026-09-10/appearance.md` | `specs/patient-summary/npve-patient-summary-feedback-2026-09-10-appearance.md` |

Other SDE changes: `FLAGS.md` header now reads "Open GAP lines carried from the library's FLAGS.md on 2026-09-30 whose file-key column holds an SDE key, copied verbatim." (45 GAP lines beneath, unchanged). `AGENTS.md`: one line added at the end of "Screen truth" (with a blank line before it): "Screen specs live in specs/, one folder per screen. Where a spec disagrees with the appearance spec or with the library, report it as a finding." Nothing else in `AGENTS.md` changed. SDE `LOG.md` has the entry.

## 2. Supersession check (read only)

Method: for each spec, the library `LOG.md` entries dated on or after 2026-09-11 (the log begins 2026-09-12; earlier batches are in `records/`, not searched) and `FLAGS.md` lines dated on or after 2026-09-10 that mention Flowsheets, Questionnaire, PHQ/GAD, Patient Summary or the headings row. I read every hit for the 2026-09-13 Flowsheets entries, the 2026-09-14 status audit and Vitals entries, the 2026-09-15 mobile drawer summary flags and the 2026-09-29 entries. About 30 mobile-file (`TP5KrQtY0T5IcMNqi375So`) entries mention Patient Summary or Flowsheets in passing while building the phone port; I read the flags among them and did not find any that edit the SDE target's summary or Flowsheets. Nothing was checked against the Figma file, so "contradicts" means the record disagrees, not that the file was compared.

### 2.1 Flowsheets finish

`figma-export/npve-flowsheets-finish-2026-09-11/appearance.md` to `specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md`

Later entries that touch it:
- **Questions' type style, refined.** Spec: "Questions use h4/body1/body2 library styles". LOG 2026-09-13, "Flowsheets typography and headings row": "Question masters `730:8619` and `730:8658`: label text moved from h4 to body1 (Regular 16/24, the values the library's Form control label carries); property reference Question#730:0 intact. Form heading stays h4". FLAGS `npveFlowsheets_formTypeWeight_2026-09-13`, closed 2026-09-13: "form heading stays h4; the nine question labels moved to body1". The spec's list is still true only if it is read as "h4 for the heading, body1 for questions".
- **List component no longer untouched.** Spec: "Existing list component stays untouched as a nested live instance." LOG 2026-09-13, "List body headings swap": "Table/Headings/Flowsheets instance `755:11007` ... inserted at index 1 of Flowsheets/List body `706:8405`; the hand-built frame `706:8459` hidden and renamed SUPERSEDED".
- **Radio proof archived.** Spec: "Inspect radio states". LOG 2026-09-13, "Archive Flowsheets PROOF and review section 29": "original `PROOF - Flowsheets radio states` frame `730:8699` ... Moved ... into new Templates section `Archive - Superseded Flowsheets proof`" (superseded by the Screens section 29 comparisons).
- **Date field defect, open.** Spec: "a labelled Date field with calendar button". FLAGS `compositionsC_questionnaireDateLabelOverflowsBox`, 2026-09-13, DEFECT, open: "the Date Text field ... sits at y 0 of the Form heading and date row, so its floating label ... renders 8px above the component's box; the first field has no 8 top inset".
- **Consistent, no action:** LOG 2026-09-14 status audit lists Flowsheets as "Partial: List, Add new, Edit past, rows, header, footer built; Graph 861:7047 not built", which matches "graph work excluded".

### 2.2 Flowsheets list body

`figma-export/npve-flowsheets-list-body-2026-09-11/appearance.md` to `specs/flowsheets/npve-flowsheets-list-body-2026-09-11-appearance.md`

- **Heading row replaced by a component.** Spec: "Column heading uses color/core/light and four live Table/Cell head/none instances ... 8px vertical padding. Column widths 80/136/110/192". LOG 2026-09-13, "Flowsheets typography and headings row": "`Table/Headings/Flowsheets` ... four Table/Cell head instances ... MEASURE 80, LATEST 136, UPDATED 110, ACTIONS 192 right-aligned, 8px vertical padding bound space/8, fill bound color/core/light". Same numbers, now in one component; the list body's own frame `706:8459` is hidden as SUPERSEDED (2026-09-13, "List body headings swap").
- **Band width contradicts the spec.** Spec: "518px content width". LOG 2026-09-13, "Table/Headings/Flowsheets band to the card edges": "the fill moved off the row frame onto a new absolute rectangle `Band` ... 550x36 at x -16 ... lands at 0px from both sheet edges".
- **Heading type size disagrees.** Spec: "Akkurat LL Bold 14/20 ... Table heading height 36 follows code typography 20+16 padding". LOG 2026-09-13, "Flowsheets typography and headings row", found: "Table/Cell head text carry literal values with no text style bound (Label 16/24 Regular, head 14/24 Bold; h5 is 14/20)". The two records give 20 and 24 for the same head line height; the row height stayed 36 in both.
- **Footer.** Spec: "Footer action is a separate 518px component with right-aligned medium 38px Add to Note. It is not added to the shared sheet shell." FLAGS `compositionsC_footerMasterNotFullWidth`, 2026-09-13, DECISION, open: "COMPOSITIONS.md describes Full-width footer action as one action spanning the sheet ...; the footer master Flowsheets/Footer/Save `732:9985` is a 534x38 row holding one 94-wide Save button right-aligned". The LOG 2026-09-13 finish entry also swaps the sheet helpers to "the full-width footer ... Flowsheets/Footer/List or /Save". Relevant, not conclusive: the spec's footer is the list's Add to Note, the flag is about the form Save footer.

### 2.3 Flowsheets measure row

`figma-export/npve-flowsheets-measure-row-2026-09-11/appearance.md` to `specs/flowsheets/npve-flowsheets-measure-row-2026-09-11-appearance.md`

No later entry corrects, replaces or contradicts it. Later entries use or leave it alone:
- LOG 2026-09-14, Vitals enumeration: relied on as the row idiom: "Flowsheets/Measure row `686:8437` (74 tall, 16 Bold, four Icon button actions, its own GAP text on the icons)".
- LOG 2026-09-29, "Note body in place and Button-icon swaps": "Source checked first: ... all eight Flowsheets action areas have no ring in the source, so they were not swapped."
- LOG 2026-09-29, cleanup batch: "Vitals delta and Flowsheets trend carets untouched."
- Still open from the same day: FLAGS `npveFlowsheets_rowIconMappings_2026-09-11` (GAP, library key column): monitoring and double-up trend glyphs missing, so the spec's temporary icon substitutions (Reports, UpCaret) remain temporary.

### 2.4 Patient Summary body

`figma-export/npve-patient-summary-body-2026-09-10/appearance.md` to `specs/patient-summary/npve-patient-summary-body-2026-09-10-appearance.md`

No later entry corrects or contradicts it. Consistent with it:
- FLAGS `visitDrawer_summaryFooterAlreadyHidden`, 2026-09-15, DECISION, open: the Footer frame "is visible=false on all three versions", matching "back/footer hidden".
- FLAGS `npveEncounterPrototype_patientSummaryTallerThanSlot`, 2026-09-29, GAP: "Patient Summary (672:7932, 550 x 939; Error/Entry 673:8046 at 1273; Success 673:8349 at 1023) is taller than the 748 left column", matching "550px width ... hug content".
- LOG 2026-09-14 status audit calls the Patient summary family "Mostly complete".

### 2.5 Patient Summary content

`figma-export/npve-patient-summary-content-2026-09-10/appearance.md` to `specs/patient-summary/npve-patient-summary-content-2026-09-10-appearance.md`

No later entry touches it. (The phone port carries the summary content, per the mobile file's own entries; none edits the SDE component.)

### 2.6 Patient Summary feedback

`figma-export/npve-patient-summary-feedback-2026-09-10/appearance.md` to `specs/patient-summary/npve-patient-summary-feedback-2026-09-10-appearance.md`

- **Typo, open defect that will contradict the spec once fixed.** Spec: "Preserve all source copy including the typo 'your'". FLAGS `visitDrawer_summaryRatingCopyTypoDefect`, 2026-09-15, DEFECT, open: "The Patient Summary rating prompt reads 'How would your rate the accuracy of this summary?' ... in the shared feedback component ... the copy is fixed at source, not in the port." The related DECISION `visitDrawer_summaryRatingCopyTypo` is closed 2026-09-15 ("ruled by Daniel: carry the prompt verbatim into the mobile port and record the typo as a DEFECT against the source file"). Today the spec and the file agree; if the source is fixed, the spec needs the same change.
- Nothing else touches it.

## 3. Visit Companion repo: `design/`

```
C:\Code\visit-companion-prototype\design
AGENTS.md  (1,555 bytes)
assets/
assets/colette-mwangi.png  (1,893,974 bytes)
assets/marcus-vance.png  (1,945,163 bytes)
assets/sarah-bennett.png  (1,806,323 bytes)
FLAGS.md  (14,346 bytes)
LOG.md  (1,076 bytes)
mobile-plan.md  (16,172 bytes)
mobile-spec.md  (71,768 bytes)
runs/

(root files added beside it: AGENTS.md, CLAUDE.md)
```

- Root `AGENTS.md` and `CLAUDE.md` created with the exact text given. `design/AGENTS.md` has the marker text exactly, no changes.
- Copied unedited from the library: `mobile-spec.md`, `mobile-plan.md`, and the three portraits into `design/assets/`. The originals stay in the library.
- `design/FLAGS.md`: **20 GAP lines carried** (GAP lines whose file-key column holds `TP5KrQtY0T5IcMNqi375So`, not struck through, verbatim). 4 struck-through lines with that column were skipped. Lines that carry the mobile key only in their text, not in the column, were not carried.
- `design/runs/` is empty. Not a git repo, so nothing to commit there.

## 4. SDE repo file tree

```
C:\Code\sde
AGENTS.md  (1,818 bytes)
APPEARANCE-SDE-EDIT-FORMS.md  (2,424 bytes)
CLAUDE.md  (70 bytes)
FLAGS.md  (15,818 bytes)
LOG.md  (2,870 bytes)
runs/
specs/
specs/flowsheets/
specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md  (1,562 bytes)
specs/flowsheets/npve-flowsheets-list-body-2026-09-11-appearance.md  (1,970 bytes)
specs/flowsheets/npve-flowsheets-measure-row-2026-09-11-appearance.md  (2,754 bytes)
specs/patient-summary/
specs/patient-summary/npve-patient-summary-body-2026-09-10-appearance.md  (1,226 bytes)
specs/patient-summary/npve-patient-summary-content-2026-09-10-appearance.md  (1,089 bytes)
specs/patient-summary/npve-patient-summary-feedback-2026-09-10-appearance.md  (1,245 bytes)
```

`runs/` is empty.

## 5. Library repo

- `MOVED.md`: appended "as of 2026-09-30, Visit Companion design work lives in visit-companion-prototype/design/. Mobile files remaining here are frozen history."
- `LOG.md`: entry appended.
- Commit: only `MOVED.md`, `LOG.md` and this run folder, message "Split Visit Companion design out". Hash: HASH_PENDING. A commit cannot contain its own hash, so it was written into this file in a second commit that touches only this report.
- Uncommitted files left alone at commit time: none. Before committing, `git status` showed only MOVED.md, LOG.md and this run folder.
