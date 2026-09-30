# SDE split scaffold, 2026-09-30

Write batch. No Figma reads or writes. Library repo `C:\Code\design system`, new repo `C:\Code\sde`. `git init` was not run in `C:\Code\sde`. Nothing in the library was deleted or moved; existing library history files were changed only by the appends below.

## 1. Google Drive sync: `C:\Code\sde` is not in a synced location

- Google Drive for desktop is running (`GoogleDriveFS.exe`, drive `G:` mounted). Its configured sync targets (registry `HKCU\Software\Google\DriveFS\Share`, `SyncTargets`) list exactly one local folder: **`C:\Code\design system`**.
- `C:\Code` itself is not a sync target, is not a junction or link, and no other folder under it has a `.tmp.driveupload` marker. `C:\Code\sde` is a sibling of the synced folder, so it is **not** synced. It did not exist before this batch.
- The reverse matters: **the library repo is Drive-synced** (that is the source of the 6,175-file `.tmp.driveupload/` folder found in the inventory). Dropbox is also running; `C:\Code` is not under it either. Neither is `C:\Code\sde` under OneDrive (`C:\Users\coled\OneDrive`).

## 2. File tree of `C:\Code\sde`

```
C:\Code\sde
AGENTS.md  (1670 bytes)
APPEARANCE-SDE-EDIT-FORMS.md  (2426 bytes)
CLAUDE.md  (70 bytes)
FLAGS.md  (21167 bytes)
LOG.md  (999 bytes)
runs\
```

`runs\` is empty. Line endings are CRLF, matching the library's `CLAUDE.md` and `FLAGS.md`.

## 3. Bucket 2 files

Source: `runs/2026-09-30-sde-split-inventory/files-classified.csv`, 1854 files in bucket 2.

**Copied (1):** `APPEARANCE-NPVE-EDIT-FORMS.md` to `C:\Code\sde\APPEARANCE-SDE-EDIT-FORMS.md`. Byte-identical to the library file at commit `114bc20` (checked with `cmp`); the title and body still say NPVE. Not edited, because the instruction was to copy. It is the only bucket 2 file that describes how screens should look now.

**Left behind (1853):** every other bucket 2 file. None is a live working reference; each records a past batch. One row per file is in `bucket2-left-behind.csv` in this folder (path, reason). By folder:

| Folder | Files | Reason |
|---|---:|---|
| `.workflow-runs` | 14 | gitignored run state of the retired gated workflow; past run |
| `archive/batch-scripts` | 111 | retired batch script; records a past batch |
| `archive/figma-export` | 14 | retired workflow artifact of a past batch |
| `archive/loose-scripts` | 4 | retired scan script |
| `audits` | 323 | past-batch report and proof (2026-09-29); records what was done, not how screens should look now |
| `figma-export/model-test-2026-09-10` | 4 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-agent-rules-2026-09-04` | 1 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-allergies-audit-2026-09-13` | 1 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-allergies-comparison-height-correction-2026-09-05` | 2 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-allergies-edit-2026-09-09` | 10 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-allergies-field-repair-2026-09-13` | 10 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-allergies-list-2026-09-05` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-audit-2026-09-03` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-body-padding-read-2026-09-03` | 1 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-body-padding-search-2026-09-02` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-changelog-2026-09-02` | 4 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-cleanup-2026-09-03` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-comparison-layout-2026-09-02` | 3 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-encounter-shell-2026-09-06` | 20 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-encounter-toolbar-2026-09-06` | 15 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-enum-2026-09-02` | 17 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-ext-review-repairs-2026-09-05` | 34 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-external-care-facility-stay-2026-09-05` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-external-care-hospitalizations-2026-09-05` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-external-review-2026-09-05` | 25 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-family-history-2026-09-05` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-family-history-edit-2026-09-09` | 11 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-archive-review-2026-09-13` | 4 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-audit-2026-09-11` | 19 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-finish-2026-09-11` | 50 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-finish-2026-09-13` | 34 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-list-2026-09-05` | 1 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-list-body-2026-09-11` | 174 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-flowsheets-measure-row-2026-09-11` | 119 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-gold-stars-corrections-2026-09-03` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-health-status-observations-2026-09-05` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-health-status-optical-spacing-2026-09-06` | 4 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-label-drift-underline-2026-09-03` | 15 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-medication-list-body-2026-09-04` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-medication-list-height-correction-2026-09-04` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-medication-list-sidesheet-2026-09-04` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-medication-summary-row-2026-09-04` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-medication-surface-correction-2026-09-04` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-mgmt-fidelity-2026-09-04` | 16 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-mgmt-fidelity-build-2026-09-04` | 23 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-module-chip-fix-2026-09-06` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-module-chip-fix-2026-09-08` | 12 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-module-chip-relationship-spacing-2026-09-06` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-next-candidate-audit-2026-09-05` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-note-header-layout-2026-09-08` | 10 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-past-medical-history-body-2026-09-08` | 20 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-past-medical-history-row-2026-09-08` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-past-medical-history-section-2026-09-08` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-patient-summary-body-2026-09-10` | 36 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-patient-summary-content-2026-09-10` | 21 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-patient-summary-feedback-2026-09-10` | 36 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-planning-2026-09-09` | 3 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problem-edit-2026-09-04` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problem-edit-spacing-correction-2026-09-04` | 4 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problem-links-2026-09-14` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problem-links-variant-2026-09-14` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problems-favorites-2026-09-02` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problems-low-oversight-batch-2026-09-04` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problems-recent-2026-09-02` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problems-recent-build-2026-09-02` | 11 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-problems-recent-corrections-2026-09-02` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-procedure-history-2026-09-04` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-repair1-2026-09-04` | 14 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-repair2-2026-09-04` | 22 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-row-structure-2026-09-04` | 12 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-2026-09-02` | 40 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-base8-spacing-audit-2026-09-04` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-build-2026-09-02` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-closeout-2026-09-02` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-header-inset-audit-2026-09-04` | 6 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-header-padding-global-2026-09-04` | 11 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-outline-footer-global-2026-09-04` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-sidesheet-radius-placement-2026-09-04` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-social-history-2026-09-06` | 5 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-social-history-new-entry-placement-2026-09-06` | 4 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-status-audit-2026-09-14` | 31 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-tab-underline-fix-2026-09-03` | 11 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-tidy-2026-09-08` | 11 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-body-2026-09-14` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-delta-2026-09-14` | 23 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-enum-2026-09-14` | 16 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-list-2026-09-14` | 6 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-placeholders-2026-09-14` | 14 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-row-2026-09-14` | 12 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-row-grid-fix-2026-09-14` | 8 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-row-regrid-2026-09-14` | 9 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-vitals-sheet-2026-09-15` | 7 | past batch report, script or proof image; records a past batch |
| `figma-export/npve-workflows-audit-2026-09-05` | 45 | past batch report, script or proof image; records a past batch |
| `records` | 71 | closed batch record; frozen history |

Not copied although SDE-related, because the batch said not to edit or split them: the SDE lines in `COMPOSITIONS.md` (7-18, 72-73) and the SDE rows in `LOG.md` and `FLAGS.md`, which are bucket 4 (mixed).

## 4. Library `AGENTS.md` against the pre-batch `CLAUDE.md`

Built from the pre-batch `CLAUDE.md` (unmodified against HEAD at the time) by removing three things and nothing else: the `NPVE target` file line, the `NPVE legacy source` file line, and the `APPEARANCE-NPVE-EDIT-FORMS.md` paragraph under Truth (with its following blank line). A scan of the result for `npve`, `sde`, and both SDE file keys finds nothing. The first line is still `# CLAUDE.md`, because nothing else was to change.

The previous root `AGENTS.md` (`Read CLAUDE.md. It is the only instruction file.`) was overwritten; it is in git history (commit before this batch). `archive/AGENTS.md` was not touched. `CLAUDE.md` is now the single line `Read AGENTS.md at this repo's root. It is the only instruction file.` The full file is `agents-vs-pre-batch-claude.diff` in this folder.

```diff
--- CLAUDE.md (pre-batch, HEAD)
+++ AGENTS.md (new)
@@ -8,4 +8,2 @@
 - Composition System: oNrOL9kQCpJHyK4rBCGqsq. Record of canonical compositions built from the library. Consumes, never defines.
-- NPVE target: fdCQVFdvOByaOYIJYag0d6
-- NPVE legacy source: zVsuhYehoSLLq880qRBFkq
 - Tebra Working UI Kit: deprecated, read only.
@@ -18,4 +16,2 @@
 TEBRA-DESIGN-SYSTEM.md is the written form of the code: theme architecture, token derivations, and the per-component table of what Tebra overrides versus MUI substrate. Read the component's row before building it. REFERENCE-KIT.md is the manifest of the deprecated kit and holds the open "need Daniel" items.
-
-APPEARANCE-NPVE-EDIT-FORMS.md is the approved appearance specification for NPVE edit forms. Check a rebuilt form against it before reporting.
```

## 5. Other library changes

- `APPEARANCE-NPVE-EDIT-FORMS.md`: committed as-is, commit `114bc20` "SDE ruling: edit forms follow production, white paper". Only that file was committed; `COMPOSITIONS.md`, `FLAGS.md`, `LOG.md`, `mobile-spec.md` and the untracked `audits/`, `reports/backport-2026-09-25/`, `runs/` remain uncommitted, as before. The new `AGENTS.md`, `CLAUDE.md`, `MOVED.md`, and FLAGS/LOG appends are also uncommitted; the batch did not ask for a commit.
- `MOVED.md` added at the library root.
- Three `DECISION` lines appended to `FLAGS.md` (file key `repo`): code default surface beige versus mostly-white production; `COMPOSITIONS.md` line 10 pale teal versus SDE white paper; `COMPOSITIONS.md` lines 72-73 filing the SDE Encounter shell under Mobile. `COMPOSITIONS.md` was not edited.
- The three new FLAGS lines and `MOVED.md` do mention SDE, as instructed. The library `AGENTS.md` does not.

## 6. GAP lines carried to `C:\Code\sde\FLAGS.md`

**53 lines.** Rule: a line in the library `FLAGS.md` tagged GAP, containing the SDE target key `fdCQVFdvOByaOYIJYag0d6` or the legacy source key `zVsuhYehoSLLq880qRBFkq` anywhere in the line, with no strikethrough. 4 closed (struck through) lines matching the rule were skipped. Copied byte for byte, before the three new library lines were appended.

Eight of the 53 have the library key `YX2n4YLrEpBXNbcc73T6dw` in the file-key column and cite an SDE key only in the text (for example the Vitals items about missing library glyphs, a chart component and a monospace font). They match the rule but are library asks by their column; SDE's FLAGS.md now holds them as its request list back to the library. Say if you would rather keep them out.

## 7. Notes

1. The carried GAP lines and the copied appearance spec still say NPVE and cite library node ids.
2. SDE's `AGENTS.md` tells agents to read the library's `AGENTS.md` "as a sibling folder"; it is at `C:\Code\design system\AGENTS.md`, and the folder name has a space, not `design-system`. Text is as given; agents will need to know that.
3. SDE's `AGENTS.md` names the appearance spec as `APPEARANCE-SDE-EDIT-FORMS.md`, which exists.
4. The mobile prototype's files were not touched.
