# GitHub setup, 2026-09-30

Write batch across three repos and GitHub. No Figma reads or writes. Nothing deleted, including the old folder `C:\Code\design system`, which was last written to when its `.gitignore` commit was made and its `origin` remote added. All later writes went to `C:\Code\design-system`.

## 1. Account

- `gh` 2.96.0 is installed and signed in. `gh auth status` labels the keyring entry `danielcole-tech`. The token resolves to **`danielcole-tebra`** (`gh api user --jq .login`), which is the account every repo below was created under and the one Daniel confirmed as his work account. The `-tech` label appears to be a stale name for the same account; I did not sign in, out or switch anything.
- Token scopes: `gist`, `read:org`, `repo`, `workflow`. Git pushes used the gh credential helper for each command only (`-c credential.helper=!gh auth git-credential`); no global git config was changed. Commits are authored `Daniel Cole <daniel.cole@tebra.com>` from the existing git config.

## 2. Preflight scans

Scope: every file that would be tracked, in all three repos, after the `.gitignore` additions (library excluding `.git`, `.tmp.driveupload/`, `.workflow-runs/`; visit-companion excluding `node_modules/` and `dist/`, already ignored). Library history was scanned by file name and blob size.

| Repo | Files scanned | Size | Secret-like file names | Secret-like content | Files over 50 MB |
|---|---:|---:|---:|---:|---:|
| library | 3,131 | 241 MB | 0 | 0 | 0 |
| sde | 11 | under 1 MB | 0 | 0 | 0 |
| visit-companion-prototype | 543 | 29 MB | 0 | 0 | 0 |

- File-name patterns: `.env*`, `*.pem`, `*.key`, `*.p12`, `*.pfx`, `id_rsa`, `id_ed25519`, keystores, `credentials*`, `secrets.*`, `.npmrc`, `.netrc`.
- Content patterns: GitHub tokens (`ghp_`, `gho_`, `github_pat_`), Figma tokens (`figd_`), `sk-` keys, AWS keys, Slack tokens, Google API keys, private-key headers, bearer tokens, and quoted `api_key`/`secret`/`token`/`password` assignments.
- Nothing found, so no paths to report. The scan is pattern-based, text files under 40 MB only; it is not proof that no secret exists. Library history was checked by file name (none) and blob size, not by content.
- Size: largest blob anywhere in library history is 1.9 MB; nothing over 50 MB, nothing over 100 MB. The 245 MB of library size is many small files.
- The library's `.claude/` is ignored locally and was not pushed. The visit-companion `.claude/` (3 files: two commands and `launch.json`) was included in its commit as instructed.

## 3. `.gitignore`

Existing lines kept; only missing ones added.

| Repo | Already had | Added |
|---|---|---|
| library | `.workflow-runs/`, `.tmp.driveupload/` | `desktop.ini`, `Thumbs.db`, `.DS_Store`, `node_modules/`, `.env*` |
| sde | none (file did not exist) | `.tmp.driveupload/`, `desktop.ini`, `Thumbs.db`, `.DS_Store`, `node_modules/`, `.env*` |
| visit-companion-prototype | `node_modules`, `dist` | `.tmp.driveupload/`, `desktop.ini`, `Thumbs.db`, `.DS_Store`, `.env*` (`node_modules` was already covered) |

Note: `.env*` also ignores a future `.env.example`.

## 4. GitHub repos (all private, created empty: no README, license or .gitignore)

| Repo | URL | Default branch | Pushed |
|---|---|---|---|
| design-system | https://github.com/danielcole-tebra/design-system | `master` | branches `master`, `codex/lean-workflow`; 9 tags |
| sde | https://github.com/danielcole-tebra/sde | `master` | `master` |
| visit-companion-prototype | https://github.com/danielcole-tebra/visit-companion-prototype | `master` | `master` |

`git init` used its configured default, `master`, for both new repos. The library was already on `master`.

**Deviation:** GitHub made `codex/lean-workflow` the library repo's default branch, because `git push --all` sent it first and it sorted first. That branch is an old, pre-reset line of work, so the first clone checked out the wrong tree. I ran `gh repo edit danielcole-tebra/design-system --default-branch master` (a setting on the repo I had just created) and re-checked out `master` in the clone. The `AGENTS.md` first-line check happened to pass on the wrong branch too, so I re-ran it after the fix.

## 5. Commits pushed

| Repo | Branch | Commit | Message |
|---|---|---|---|
| library | `master` | `b3c8f9a` | Add .gitignore entries for machine files, node_modules and env files |
| library | `codex/lean-workflow` | `c20cd6b` | Schema backup taken before lean pilot run 3 (unchanged, pushed as it was) |
| sde | `master` | `71c8f9e` | Initial commit (12 files) |
| visit-companion-prototype | `master` | `d423f8b` | Initial commit (543 files) |

Library `master` at `b3c8f9a` includes `380f18e`, `c91df09` and every earlier commit. Second commits carrying the records below were made and pushed after this report was written; their hashes are in the final message and in `git log -1` of each repo (a report cannot contain the hash of the commit that holds it).

## 6. Fresh clone: `C:\Code\design-system`

- Cloned from `https://github.com/danielcole-tebra/design-system.git`; `master` checked out, tracking `origin/master`; 9 tags; working tree clean.
- **Not in a Drive-synced location.** Drive's only sync target is `C:\Code\design system` (registry `SyncTargets`). `C:\Code\design-system` and `C:\Code` are not targets, there is no `.tmp.driveupload` in either, and neither is a link.
- **Hash match:** clone `master` HEAD `b3c8f9aa8ef3595d2c342f4a8379b52559daa361` equals the old folder's HEAD `b3c8f9aa8ef3595d2c342f4a8379b52559daa361`.
- **Sibling reach:** `C:\Code\sde\..\design-system\AGENTS.md` and `C:\Code\visit-companion-prototype\..\design-system\AGENTS.md` both resolve; the first line of each reads `# AGENTS.md`. The two `CLAUDE.md` files there are the one-line pointer.

## 7. SDE flags added (`C:\Code\sde\FLAGS.md`, DECISION, 7 lines, specs not edited)

1. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 730:8619 | specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md says "Questions use h4/body1/body2 library styles"; library LOG.md 2026-09-13, "Flowsheets typography and headings row": "Question masters `730:8619` and `730:8658`: label text moved from h4 to body1 (Regular 16/24, the values the library's Form control label carries); "Form heading stays h4"". The spec reads true only as h4 for the form heading and body1 for the questions. Spec not edited. | 2026-09-30 | sdeSpec_flowsheetsFinish_questionTypeMovedToBody1`
2. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 706:8405 | specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md says "Existing list component stays untouched as a nested live instance"; library LOG.md 2026-09-13, "List body headings swap, AGENTS.md": "the hand-built frame `706:8459` hidden and renamed SUPERSEDED". The list body was changed after the spec, so "untouched" no longer holds. Spec not edited. | 2026-09-30 | sdeSpec_flowsheetsFinish_listComponentNoLongerUntouched`
3. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 730:8699 | specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md says "Inspect radio states"; library LOG.md 2026-09-13, "Archive Flowsheets PROOF and review section 29": "original `PROOF · Flowsheets radio states` frame `730:8699` (550x456) was moved into the Templates section "Archive · Superseded Flowsheets proof"". The radio-state proof the spec tells the builder to inspect is archived and superseded by the Screens section 29 comparisons. Spec not edited. | 2026-09-30 | sdeSpec_flowsheetsFinish_radioProofArchived`
4. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 732:8713 | specs/flowsheets/npve-flowsheets-finish-2026-09-11-appearance.md says "a labelled Date field with calendar button"; library FLAGS.md 2026-09-13, DEFECT compositionsC_questionnaireDateLabelOverflowsBox (open): "its floating label (I732:8717;130:170, 37x16 at y -8) renders 8px above the component's box". Open library defect against the Date field the spec describes. Spec not edited. | 2026-09-30 | sdeSpec_flowsheetsFinish_dateLabelOverflowsBox`
5. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 1107:148 | specs/flowsheets/npve-flowsheets-list-body-2026-09-11-appearance.md says "518px content width"; library LOG.md 2026-09-13, "Table/Headings/Flowsheets band to the card edges": "the fill moved off the row frame onto a new absolute rectangle `Band` at index 0, 550x36 at x -16". The heading band is now 550 wide, not the spec's 518 content width. Spec not edited. | 2026-09-30 | sdeSpec_flowsheetsListBody_headingBandWidth518To550`
6. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 1107:148 | specs/flowsheets/npve-flowsheets-list-body-2026-09-11-appearance.md says "Akkurat LL Bold14/20" and "Table heading height36 follows code typography20+16 padding"; library LOG.md 2026-09-13, "Flowsheets typography and headings row": "Table/Cell head text carry literal values with no text style bound (Label 16/24 Regular, head 14/24 Bold; h5 is 14/20)". The two records disagree on the head line height (20 vs 24). Needs a check against code, which is authority on values; not resolved here. Spec not edited. | 2026-09-30 | sdeSpec_flowsheetsListBody_headLineHeight20Vs24`
7. `DECISION | fdCQVFdvOByaOYIJYag0d6 | 672:7931 | specs/patient-summary/npve-patient-summary-feedback-2026-09-10-appearance.md says "Preserve all source copy including the typo “your”"; library FLAGS.md 2026-09-15, DEFECT visitDrawer_summaryRatingCopyTypoDefect (open): "the copy is fixed at source, not in the port". The spec follows when the library DEFECT visitDrawer_summaryRatingCopyTypoDefect closes; until then it stands. Spec not edited. | 2026-09-30 | sdeSpec_patientSummaryFeedback_typoYourFixedAtSource`

Each names the spec file and quotes the dated library entry; quotes were checked verbatim against the library `LOG.md`, `FLAGS.md` and the spec copies before writing. The 14/20 vs 14/24 line says it needs a check against code, which is authority on values. The typo line cites the library DEFECT `visitDrawer_summaryRatingCopyTypoDefect`.

## 8. Notes

1. Windows `core.autocrlf=true` produced many "LF will be replaced by CRLF" warnings on the first commits; no content was affected.
2. Everything under `C:\Code\design system` other than the `.gitignore` commit is untouched and remains in Drive sync. That folder and `C:\Code\design-system` are now two copies; only the clone should be written to.
3. The two new repos have no other branches or tags.
