# Split fixes and Visit Companion audit, 2026-09-30

Mixed batch. No Figma reads or writes, no `git init` anywhere, nothing created or moved in `C:\Code\visit-companion-prototype`.

## 1. Library

- `AGENTS.md` line 1 changed from `# CLAUDE.md` to `# AGENTS.md`. Nothing else in the file.
- One commit of all uncommitted library changes, message "Split SDE out; AGENTS.md is the instruction file" (see `git log -1`). It includes changes that predate batch two, because the instruction was "all uncommitted": `COMPOSITIONS.md` and `mobile-spec.md` (modified before the split), `audits/` (323 files), `reports/backport-2026-09-25/`, and `runs/2026-09-30-sde-split-inventory/`. Batch two's own changes (new `AGENTS.md`, one-line `CLAUDE.md`, `MOVED.md`, three FLAGS lines, LOG entry, `runs/2026-09-30-sde-split-scaffold/`) and this batch's report went in with it.

## 2. SDE repo (`C:\Code\sde`)

**Changed lines in `APPEARANCE-SDE-EDIT-FORMS.md` (2):**

- Line 1
  - was: `# NPVE edit-form appearance`
  - now: `# SDE edit-form appearance`
- Line 5
  - was: `- Card: white paper, `color/background/paper`. Ruled by Daniel on 2026-09-23: edit forms sit on white paper; the pale teal Form surface (#EEF7F9, a file-local variable, not a library token) is local to NPVE and is not approved. Supersedes the pale teal card line that stood here until 2026-09-29. Applied 2026-09-29 to `634:6808`, `636:3`, `586:6414`, `580:6017` and `389:3469`; the superseded MODEL TEST `642:7557` keeps Form surface.`
  - now: `- Card: white paper, `color/background/paper`. Ruled by Daniel on 2026-09-23: edit forms sit on white paper; the pale teal Form surface (#EEF7F9, a file-local variable, not a library token) is local to SDE and is not approved. Supersedes the pale teal card line that stood here until 2026-09-29. Applied 2026-09-29 to `634:6808`, `636:3`, `586:6414`, `580:6017` and `389:3469`; the superseded MODEL TEST `642:7557` keeps Form surface.`

Left alone on purpose: the flag id `npveEditForms_fieldSurfaceInheritance_2026-09-10` and the `flags/active.json` / `flags/resolved.json` paths on line 12 (an identifier and a quote of the past record), and every file key, node id and date. The only other place the word NPVE appeared was line 1 and line 5, so nothing else needed a call.

**Removed from `FLAGS.md` (8 GAP lines with the library key `YX2n4YLrEpBXNbcc73T6dw` in the file-key column).** They remain in the library's FLAGS.md, untouched. 45 GAP lines are left in SDE's FLAGS.md (was 53).

1. `- GAP | YX2n4YLrEpBXNbcc73T6dw | 575:37 | The library has no arrow glyph pair for a signed change indicator (Icon/ArrowLeft 575:3 is the only arrow); Vitals/Delta 816:12450 uses Icon/UpCaret 575:37 and Icon/DownCaret 76:5 at 16 in place of the source's 9x10 filled arrows (zVsuhYehoSLLq880qRBFkq 3569:22404). Library ask: Icon/ArrowUp and Icon/ArrowDown. | 2026-09-14 | npveVitalsDelta_arrowGlyphIsCaret`
2. `- GAP | YX2n4YLrEpBXNbcc73T6dw | none | The library has no chart or sparkline component; the source Vitals rows carry a 56x20 sparkline (zVsuhYehoSLLq880qRBFkq 3496:14400) and the Expanded variants a 377x144 trend chart (3496:15379), as Flowsheets Graph 861:7047 did. Per ruling npveVitals_noChartVectorsFpo the rebuild places labelled FPO rectangles; this line is the library ask. | 2026-09-14 | npveVitals_noChartComponent`
3. `- GAP | YX2n4YLrEpBXNbcc73T6dw | 171:31 | Library Divider orientation=horizontal is a 1px-tall component, so inside an auto-layout stack it contributes a pixel and makes a two-chip stack odd-height; the source draws the same seam as a zero-height vector with a centred 1px stroke (zVsuhYehoSLLq880qRBFkq 3569:22425, 26x0), which is why the source stack is exactly twice its chip. Vitals/Delta stacked 817:12451 works around it by setting the Divider instance layoutPositioning ABSOLUTE at the seam, so the stack is 32 and the rule still renders. A zero-height divider would remove the need. | 2026-09-14 | npveVitalsDelta_dividerAddsAPixelInFlow`
4. `- GAP | YX2n4YLrEpBXNbcc73T6dw | 79:2 | Library Button sets its label textCase to TITLE, so a sentence-case label cannot be expressed. The Vitals disclosure carries the characters "Or use editor" and renders "Or Use Editor" against the source's sentence case (zVsuhYehoSLLq880qRBFkq 3551:14898, Akkurat LL Regular 14 #004852). Read on the instance inside Vitals/Body 846:13017. The same trait already shows on Mark As Error in the Problems Edit comparison. A sentence-case option, or a link that carries an end icon, would remove the need. Third site 2026-09-15: the sheet's full-width footer action renders "Add Section To Note" where the source reads "Add Section to Note", through the same shared Medication list footer action 248:1827. | 2026-09-14 | npveVitalsBody_buttonLabelCapitalized`
5. `- GAP | YX2n4YLrEpBXNbcc73T6dw | none | The library has one font family token, font/family/base (Akkurat LL), so a monospaced value cannot be expressed. The source types the Quick Entry value in IBM Plex Mono Regular 14 (zVsuhYehoSLLq880qRBFkq 3557:15628) so parsed vitals align in a column; the rebuild renders Akkurat LL Regular 16 from the library Text field size=small. | 2026-09-14 | npveVitalsBody_noMonospaceFont`
6. `- GAP | YX2n4YLrEpBXNbcc73T6dw | 165:57 | Library Alert has a single trailing slot: onClose shows it and the action INSTANCE_SWAP decides what sits in it (preferred values Icon/CloseOutlined, Button, Icon button). The source alert shows a PULL NEW DATA text action and a dismiss X side by side (zVsuhYehoSLLq880qRBFkq 3569:22384). The rebuild swaps the slot to the library Button for the action and therefore has no close glyph at all, read on the instance in Vitals/Body 846:13017. A dismiss slot separate from the action slot would remove the need. | 2026-09-14 | npveVitalsBody_alertActionAndDismissShareOneSlot`
7. `- GAP | YX2n4YLrEpBXNbcc73T6dw | none | Library ask, grouped: no @mui/icons-material glyphs in the library for Icon/MUI/ListAlt, MicNone, PersonOutline, LockOutlined, OpenInFull, MonitorHeartOutlined, ScienceOutlined, HealthAndSafetyOutlined, DragIndicator, Splitscreen, PlaylistAdd, PostAdd, EditOutlined, NoteAddOutlined, RecordVoiceOverOutlined, PauseCircleOutline, StopCircleOutlined, PlayCircleOutline, Timeline, Undo, Redo, FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft, FormatListNumbered, Add, ArrowDropDown. Built locally in fdCQVFdvOByaOYIJYag0d6 Templates 32 · Local icons (938:25769), path unedited from 5.15.12. Swapped in for ListAlt (Template pill), MicNone (mic pill), Timeline (hidden Timeline chip glyph), PersonOutline (Assigned To pill), LockOutlined (Note card badge), OpenInFull (Note card expand) and the hidden Vitals, Labs and Allergies chip glyphs (MonitorHeartOutlined, ScienceOutlined, HealthAndSafetyOutlined). 28 in all (Splitscreen, PlaylistAdd and PostAdd are the three Add Section candidates, none swapped in by default). | 2026-09-29 (updated) | npveEncounterShell_muiIconsLibraryAsk (2026-09-29: Icon/MUI/RadioButtonChecked 965:694 added to this group.) (2026-09-29: Icon/MUI/PrintOutlined, Pause, PlayArrow and Stop added to this group.)`
8. `- GAP | YX2n4YLrEpBXNbcc73T6dw | 79:2 | Library candidate: Button-icon (fdCQVFdvOByaOYIJYag0d6 952:14989) needs three things the library does not carry. (1) The outlined Button's 1px border is a literal, not bound to border/hairline (read on 78:14 and eight sibling variants); Button-icon binds the token. (2) The library Icon button has no ring, no large size and a small glyph of 18 with no size token (size/icon/small is 20); Button-icon binds size/icon/medium at 24 and leaves the 18 literal. (3) Button has no Focus visible state, so Button-icon has none. Library heights small 30, medium 38, large 42 are also not tokens, only padding plus line height. | 2026-09-29 | npveButtonIcon_libraryCandidateTokenGaps`

`AGENTS.md` not touched. LOG.md has the new entry. One loose end: SDE FLAGS.md's header line still reads "every open GAP line that references an SDE file key", which is now slightly wider than what follows. Not edited, because only the 8 lines were to change.

## 3. Left-behind check (read only)

Source: `runs/2026-09-30-sde-split-scaffold/bucket2-left-behind.csv`, 1,853 files.

| Top-level folder | Files |
|---|---:|
| `figma-export/` | 1,316 |
| `audits/` | 323 |
| `archive/` | 129 |
| `records/` | 71 |
| `.workflow-runs/` | 14 |

By type: 1,125 PNG, 461 JSON, 160 JS, 100 Markdown, 4 TXT, 2 PY, 1 other. The Markdown and text files were checked by name and first heading (all 104 of them; the 14 `audits/*/REPORT.md` and about 80 `report.md` files are headed as dated batch reports).

**Left-behind files that describe how screens should look, as opposed to what a batch did.** Six, all named `appearance.md`. Each is a per-batch approved-appearance note (geometry, spacing, surfaces, states) for a screen that SDE now owns; the batch record they sit in is history, but their content is a spec of the result:

1. `figma-export/npve-flowsheets-finish-2026-09-11/appearance.md`, "Approved Flowsheets appearance" (radio questions, scores, Date field)
2. `figma-export/npve-flowsheets-list-body-2026-09-11/appearance.md`, "Flowsheets list appearance" (518 width, paper surface, header and body)
3. `figma-export/npve-flowsheets-measure-row-2026-09-11/appearance.md`, "Flowsheets row appearance" (518, 16 padding, 40px Icon buttons, gaps)
4. `figma-export/npve-patient-summary-body-2026-09-10/appearance.md`, "Patient Summary full sheets"
5. `figma-export/npve-patient-summary-content-2026-09-10/appearance.md`, "Patient summary content appearance" (headings h4 16/24 bold, 16 and 8 gaps)
6. `figma-export/npve-patient-summary-feedback-2026-09-10/appearance.md`, "Patient Summary feedback appearance"

Caveat: each opens with the operator quote that approved it and is scoped to one batch ("Scope: Basic PHQ-9 and With trend GAD-7 only"), so they may be superseded by later corrections; I did not check that against the Figma file.

**Borderline, judged records:**
- `figma-export/model-test-2026-09-10/test-notes.md`: notes on the MODEL TEST form, which `APPEARANCE-SDE-EDIT-FORMS.md` calls superseded.
- `figma-export/npve-planning-2026-09-09/proposal.md`: a planner proposal for the next two edit forms; it proposes rather than records how screens look.
- The 14 `audits/2026-09-29-*/REPORT.md` files end with open items for Daniel and record rulings inside a batch narrative (for example white-paper edit forms in `cleanup-batch`), but are batch reports. The live form of those rulings is in the spec.
- `archive/workflow/appearance/README.md`: the format for appearance evidence in the retired workflow, not a description of screens.

No JSON, script or PNG file was judged a live reference: the `records/` JSON are closed batch records, and no left-behind file is named spec, ruling or pattern.

## 4. Visit Companion audit (`C:\Code\visit-companion-prototype`, read only)

**Git.** Not a git repo: `git rev-parse` fails, no `.git` folder here or in any parent (`C:\Code` has none), so no remote and no history. It does have a `.gitignore` (18 bytes, `node_modules` and `dist`).

**Drive.** Not in a Google Drive synced location. Drive's only configured sync target is `C:\Code\design system`; `C:\Code` and this folder are outside it, and there is no `.tmp.driveupload` here. Not under Dropbox or OneDrive either.

**Agent instruction files.** No `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/`, `.cursorrules`, `.windsurf/`, `.clinerules`, `.github/` or `copilot-instructions.md` anywhere at the root. The only dot-folder with instructions is `.claude/`, with two slash commands and a launch config. First 20 lines of each:

**`.claude/commands/backport-audit.md`**

```
---
description: Log what the prototype changed since the last audit as "to Figma" rows in SYNC.md, and write BACKPORT-PROMPT.md for the Figma builder
---

Audit what the Visit Companion prototype changed since the last backport audit, so Figma can catch up. **This is read only for code, data, README, Figma and FLAGS.md.** It writes SYNC.md, BACKPORT-PROMPT.md, the run folder and LOG.md, and nothing else.

Figma owns layout, visuals and copy. The prototype owns behavior, data and mechanics.

$ARGUMENTS

## Rules for this run

- **Run folder:** `runs/<today>-backport/`. If that exists, add `-2`, `-3` and so on.
- **Read before writing:** read SYNC.md in full before appending, so no difference gets a second row.
- **Stop on design questions.** Don't rule rows yourself. A type is a proposal; add `?` and a reason where you're unsure. Only Daniel moves a row to `ruled`.
- **Rows are never deleted,** and existing rows are not rewritten. Follow the rules at the top of SYNC.md.
- Don't open Figma. Name only the node ids the sources name.
- Don't commit, and don't edit FLAGS.md or anything in `C:\Code\design system`.

## Steps
```

**`.claude/commands/sync-from-figma.md`**

```
---
description: Diff Figma against the last snapshot, log each change in SYNC.md, build the clear ones, take a new snapshot
---

Sync the Visit Companion prototype from Figma. Figma TP5KrQtY0T5IcMNqi375So, page Account screens 103:2319. **Figma is read only.** Use `get_metadata`, `get_screenshot` and `use_figma` with the read-only script in `scripts/figma-frames.js`, and nothing that writes.

Figma owns layout, visuals and copy. The prototype owns behavior, data and mechanics. A Figma change is built here only as far as it is layout, visuals or copy.

$ARGUMENTS

## Rules for this run

- **Snapshot folder names:** `snapshots/<today>/`, or `snapshots/<today>-2/` and so on when today already has one. `snapshots/LATEST` is a one-line text file naming the newest folder.
- **Run folder:** `runs/<today>-sync/`. If that exists, add `-2`, `-3` and so on. Everything this run writes, apart from the files named below, goes in it.
- **Read before writing:** read README.md, SPEC.md, SYNC.md, the last LOG.md entry and `snapshots/LATEST` before you change anything. Read any source file before editing it.
- **Stop on design questions.** If a change needs a design answer that Figma doesn't give (a state it doesn't draw, copy that contradicts a ruled row, behavior it implies but doesn't show), log the row, don't build it, and ask Daniel in REPORT.md.
- **Rows are never deleted** from SYNC.md. Follow the rules at the top of SYNC.md.
- Don't commit, and don't edit FLAGS.md or anything in `C:\Code\design system`.

## Steps
```

**`.claude/launch.json`**

```
{
  "version": "0.0.1",
  "configurations": [
    { "name": "dev", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 5173 },
    { "name": "phone", "runtimeExecutable": "npm", "runtimeArgs": ["run", "phone"], "port": 5174, "autoPort": false }
  ]
}
```

Other root Markdown that could act as instructions to an agent, not listed as instruction files: `BACKPORT-PROMPT.md` (6.2 KB), `FIGMA-BACKPORT.md` (19 KB), `SPEC.md` (3.3 KB), `SYNC.md` (39 KB), `README.md` (15 KB), `LOG.md` (38 KB).

**Design folder.** No `design/` (or `Design`, `public/design`, `src/design`) exists.

**Top level, one level deep** (file counts exclude `node_modules` contents except where shown):

| Entry | Type | Files |
|---|---|---:|
| `.claude/` | folder | 3 |
| `dist/` | folder | 11 |
| `node_modules/` | folder | 862 |
| `public/` | folder | 8 |
| `runs/` | folder | 177 (10 shown by name, dated `2026-09-24-*`) |
| `screenshots/` | folder | 9 |
| `scripts/` | folder | 9 (`figma-frames*.js`, `make-icons.mjs`, `phone-*.mjs`, `screenshot.mjs`, `snapshot*.mjs`) |
| `snapshots/` | folder | 283 (dated folders `2026-09-25` to `2026-09-28`, plus `LATEST`) |
| `src/` | folder | 33 |
| `.gitignore`, `BACKPORT-PROMPT.md`, `FIGMA-BACKPORT.md`, `LOG.md`, `README.md`, `SPEC.md`, `SYNC.md`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js` | files | 11 |

## 5. Mobile-prototype files in this repo (bucket 3, key `TP5KrQtY0T5IcMNqi375So`)

Bucket 3 has 533 files. 10 are Proposals discovery notes in `archive/discovery/` (they cite the Proposals key, not the mobile key). The other **523** belong to the mobile prototype.

| Top-level | Files |
|---|---:|
| `figma-export/` | 410 |
| `reports/` | 104 |
| `archive/` (`mobile-specs/`) | 4 |
| `assets/` | 3 |
| root: `mobile-spec.md`, `mobile-plan.md` | 2 |

By type: 487 PNG and 36 Markdown; no JSON or scripts.

**Live references (describe the prototype now):**
- `mobile-spec.md`: the one spec; rulings, components, screens.
- `mobile-plan.md`: what is next and open; it also carries the batch history table, so it is live and a record at once.
- `assets/colette-mwangi.png`, `assets/marcus-vance.png`, `assets/sarah-bennett.png`: portraits the prototype uses. Assets, not documents, but they are live inputs.

**Records of past batches (everything else, 518):**
- `reports/` (104 files): 30 Markdown batch reports named for the prompt, plus their PNG proofs and six sub-folders (`avatar-clip`, `avatar-polish`, `backport-2026-09-25`, `colette-younger`, `demo-cleanup`, `yusuf-in-line`).
- `figma-export/` (410 files): 80 mobile batch folders (`visit-*`, `account-*`, `schedule-*`, `mobile-capture-*`, `patient-*`, `phone-playthrough-*`, and others), almost all PNG proof.
- `archive/mobile-specs/` (4): the first spec set, marked "Replaced by mobile-spec.md and mobile-plan.md. Kept for history." Superseded, so history.

No file in a mobile batch folder or report is a spec or ruling by itself: rulings are recorded in `mobile-spec.md` section 2.

**Files that reference both the mobile key and an SDE key** (SDE keys `fdCQVFdvOByaOYIJYag0d6` target, `zVsuhYehoSLLq880qRBFkq` legacy source):

| File | Mobile key | Target key | Source key |
|---|---:|---:|---:|
| `COMPOSITIONS.md` | 1 | 4 | 0 |
| `FLAGS.md` | 290 | 136 | 34 |
| `LOG.md` | 106 | 48 | 20 |
| `mobile-spec.md` | 1 | 2 | 0 |
| `archive/mobile-specs/mobile-visit-drawer-spec.md` | 1 | 1 | 0 |
| `reports/Make the Medications sheet real.md` | 1 | 1 | 1 |
| `reports/Make the Vitals sheet real.md` | 1 | 1 | 0 |

Four are library-side mixed files (`COMPOSITIONS.md`, `FLAGS.md`, `LOG.md`) or the spec (`mobile-spec.md`, target named as a read-only sheet source). The two `reports/` files are the Medications and Vitals ports, which cite the target as read-only source. `archive/mobile-specs/mobile-visit-drawer-spec.md` names the target once. Two more reports (`Apply the first phone playthrough notes.md`, `Correct the chart copy.md`) mention NPVE by name only, without an SDE file key.
