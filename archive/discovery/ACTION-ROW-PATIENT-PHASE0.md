# Patient action row — Phase 0

Enumeration pass, 2026-08-20. **Nothing built in this pass.** Phase 0 contradicted four of the prompt's
fixed decisions and stopped rather than resolving them, per the prompt's own instruction.

**All four were then resolved by reverting to production's composition, and the row was built.**
See `ACTION-ROW-PATIENT-BUILD.md`. The modal test is withdrawn.

---

## 0. Substitutions and missing inputs, declared first

| Asked for | What was used | Why |
|---|---|---|
| Capture the current v2 Facesheet header **from production** (P0.a) | `web-app-v2` read-only checkout **+** the catalog's own production capture `patient_facesheet_rich01.png` (QA, `app-qa.kareo.com/v2/#/Facesheet/164444127`) | No production access this session. The catalog capture *is* a production artifact, so the enumeration is grounded in both source and pixels |
| Enumerate the legacy EhrWebApp header (P0.c) | Catalog capture `patient_history_rich01.png` (`app-qa.kareo.com/EhrWebApp/patients/viewPatientHistory/164444127`) | Same. The legacy stack is not in this checkout at all |
| Read `patient-header-build-prompt.md` | **Does not exist.** Nothing matching `*build-prompt*` exists anywhere under `C:\Code` | Substituted `PROPOSAL-PATIENT-HEADER-V1.md`, which records the header's authored bounds and conventions, plus the built component read live |
| Read `patient-chart-control-build-prompt.md` | **Does not exist** | Substituted the built control screen read live from `zKT34LQogNjz3Z07fY4VQB` page `Control — patient chart` |

The two missing prompt files are the larger gap. Their conventions were recovered from the built
artefacts, which is the stronger source anyway, but any instruction in them that is *not* expressed
in the build is lost and this pass cannot know it.

---

## P0.a — v2 Facesheet header actions, enumerated

Source: `clinical-system/src/components/ClinicalPageHeader/`, reconciled against
`patient_facesheet_rich01.png`. Source and capture agree on composition.

### Visible in the header row

| # | Label | Control | Behaviour | File |
|---:|---|---|---|---|
| 1 | `Collect Payment ($0.00)` | text Button, `size="small"` | **Navigates** — `window.location.href = /payments-ui/#/payment/{id}?source=patient` | `HeaderRightLinks.tsx:56-58, 113-127` |
| 2 | `Print` | text Button + `PrintOutlinedIcon` | **New tab** — `window.open('/patients/print/{id}.pdf', '_blank')` | `HeaderRightLinks.tsx:28-31, 164-170` |
| — | `More ⌄` | text Button + `DownCaretIcon` | Disclosure, not an action | `MoreMenu.tsx:263-272` |
| 3 | `AI Note Assist` | Button, `variant="contained"`, `size="small"` | **Navigates** — `window.location.assign(resolvePatientHref(...))` | `AiNoteButton.tsx:31-37, 48-60` |
| 4 | `New Note` | **ButtonGroup split**, `size="small"` | **Navigates** — `/patients/{id}/notes/new?note_type={default}` | `CreateNoteButton.tsx:74-81, 96-117` |

### In the More menu

| # | Label | Behaviour | Gate |
|---:|---|---|---|
| 5 | `Send Secure Message` | **New tab** — `window.open(patientPortalUrl)` | disabled unless `hasActivePatientPortalAccount` |
| 6 | `Health Data Exchange` | **MODAL** — `HieModal` | `dark-feature.facesheet-hie-modal` **and** provider role |
| 7 | `Send Patient Education` | **MODAL** — `PatientEducationModal` | clinical product + chart-write |
| 8 | `Export Immunization Data` | **MODAL** — `ExportModalCard` | " |
| 9 | `Export Health Surveillance Data` | **MODAL** — `ExportModalCard` | " |
| 10 | `Import Summary of Care` | **MODAL** — `ImportSummaryOfCare` | " |
| 11 | `Export Referral` | **MODAL** — `ExportModalCard` | " |
| 12 | `Export Continuity of Care` | **MODAL** — `ExportModalCard` | " |

Labels verbatim from `types/header.ts:50-59`.

### Two more actions in the header block, outside the action row

| Label | Control | Behaviour | File |
|---|---|---|---|
| *(none — the avatar itself)* | 70×70 `Avatar`, `cursor: pointer`, camera icon on hover | **MODAL** — `PatientPhotoUpload` | `PatientOverview.tsx:181, 255-258` |
| `Restricted` / `Unrestricted` | text Button, `color="secondary"`, lock/unlock icon | **MODAL** — `ModalControl` | `AccessLink.tsx:29-36` |

**`ChartAccess` renders twice** — `PatientOverview.tsx:225` (header) *and* `ClinicalPageNav.tsx:93`
(rail). Same component, two places, one screen.

---

## P0.b — twelve versus eleven, resolved

**Both are right. They describe different feature-flag states, and the flag is `dark-feature.facesheet-hie-modal`.**

Counting actions — the `More` trigger is a disclosure, not an action; the avatar and the restriction
link sit outside the action row:

```
Visible:  Collect Payment, Print, AI Note Assist, New Note          = 4
More:     Send Secure Message, Send Patient Education,
          Export Immunization Data, Export Health Surveillance Data,
          Import Summary of Care, Export Referral,
          Export Continuity of Care                                  = 7
                                                                     ---
                                                        flag OFF  =  11
          + Health Data Exchange                                     = 1
                                                                     ---
                                                        flag ON   =  12
```

`MoreMenu.tsx:198-210` inserts `Health Data Exchange` at the head of the clinical list **only** when
`isHieEnabled && hasProviderRole`. The audit's twelve was counted with the flag on and a provider
account; this prompt's eleven was counted with it off, or by a non-provider.

**Neither number should be adopted as "the" count.** The header carries **11 or 12 actions depending
on one dark feature and the viewer's role**, and that is the finding. Recorded rather than collapsed.

---

## P0.c — legacy EhrWebApp header

Enumerated from `patient_history_rich01.png`, left to right. **Seven targets**, skeuomorphic icons
with labels beneath:

| # | Label | Split caret? | State in capture |
|---:|---|---|---|
| 1 | `Pt. Msg` | no | **greyed / disabled** |
| 2 | `Print` | no | enabled |
| 3 | `Pt. Ed.` | no | enabled |
| 4 | `+ Note` | **yes** | enabled |
| 5 | `Scripts` | **yes** | enabled |
| 6 | `Orders` | **yes** | enabled |
| 7 | `Exchange` | **yes** | enabled |

v2 kept `Print` and `+ Note` (as `New Note`). **Five fell off the v2 header — confirmed**, exactly
the five the prompt names.

### But two of the five did not disappear. They moved.

| Legacy | Fate in v2 | Classification |
|---|---|---|
| `Pt. Ed.` | **Present.** Reappears as `Send Patient Education` inside More | **MODAL** — `PatientEducationModal` |
| `Exchange` | **Present.** Reappears as `Health Data Exchange` inside More, behind `dark-feature.facesheet-hie-modal` + provider role | **MODAL** — `HieModal` |
| `Pt. Msg` | Related control exists: `Send Secure Message` in More | **Navigates** (new tab to the portal). Whether this is the same action renamed or a different one is **not resolved** — Pt. Msg was disabled in the only capture available, so its target could not be observed |
| `Scripts` | Gone from the header. Destination exists at `#/medications-ui/patient/{guid}/prescription` | **Navigates** |
| `Orders` | Gone from the header. Destination exists at `#/medications-ui/patient/{guid}/orders` | **Navigates** |

### `Exchange` is a menu, not a single action

The prompt lists this as unresolved. **It resolves from the capture: `Exchange` carries a split
dropdown caret.** So do `+ Note`, `Scripts` and `Orders` — four of the seven legacy targets are split
controls. What is *in* the Exchange menu cannot be read from a closed-menu capture and remains
unknown.

---

## P0.d — the `New Note` split control

**The split contains note types. This is the finding the prompt anticipated.**

`CreateNoteButton.tsx:56-57` fetches `getPracticeNoteTypes(patientId)` and `:136-143` renders one
`MenuItem` per returned `NoteType`, each calling `handleCreateNote(noteType.title)` which navigates
to `/patients/{id}/notes/new?note_type={title}`. The main button uses `getDefaultNoteType()`.

So the list is **practice-configured clinical note types**, not actions. **Note type selection is
happening in the patient action row rather than on Notes.**

### And there is a second, larger version of the same control

`HeaderRightLinks.tsx:172-179` forks on `CLINICAL_NDE_FEATURE_FLAG`:

- **flag off** → `AiNoteButton` + `CreateNoteButton` (two controls, as captured)
- **flag on** → **`CreateSelector`**, a single mega-menu replacing both

`CreateSelector.tsx:87-115` defines `CREATE_MODES`: *New Documentation Experience* (BETA), *Classic
Documentation*, *Classic Documentation + AI Transcription*, *Treatment Plans* — plus template
selection panels and footer action links. The action row therefore has **three** possible
compositions, not one, and in the third the entire note-creation vocabulary lives inside one menu.

---

## P0.e — the patient header's authored bounds

Read live from `zKT34LQogNjz3Z07fY4VQB`, page `Patient header`, set `12:773`.

| | Value |
|---|---|
| Master size | **900 × 72** |
| `minWidth` | **900** |
| `maxWidth` | **null** |
| Layout | `HORIZONTAL`, padding **10 / 16 / 10 / 16**, gap **16** |
| Sizing | `primaryAxisSizingMode: FIXED` / `counterAxisSizingMode: AUTO` |
| Height composition | 10 + 52 + 10 = 72, plus a 1px bottom rule drawn as a stroke |
| Axis | `Allergies` = Severe / MildOnly / NoneKnown / NotDocumented / Error, **all five 900 × 72** |

**The 900 is a floor, not a fixed width** — exactly the case the standing convention warns about.
`minWidth: 900` with no `maxWidth`, and the proposal records the intent: *"A master cannot fill at
the top level; `minWidth` is set to 900 and instances are set to fill when placed in a layout."*

**As placed on the control screen** (`31:2` → `Content region` `31:335`):

| | Value |
|---|---|
| Content region | **1184** wide (1440 − 256 rail region) |
| Header instance `31:336` | **1184 × 72**, `layoutSizingHorizontal: FIXED`, `Vertical: HUG` |
| Header bottom edge | **y = 72** within the content region |
| `Page content` `31:370` | y = 72, **1184 × 824** |
| Body | 1440 × **896** at y = 65, under a 1440 × 65 `Nav/Bar` |

So the row is **1184 wide on the control screen**, sits at y = 72, and takes its height out of the
824 currently given to `Page content`.

---

## P0.f — components available

`get_libraries` on the proposals file returns **`Design System Rebuild`** as the one subscribed
library (`source: team`). `Tebra Working UI Kit` is available-but-not-added and was not used.

| Component | Key / node | Public interface |
|---|---|---|
| **Button** | `cfb726c79b456d52901243b7c33839efd0780a93` · set `79:2` | `Variant` (Contained/Text) × `Color` (Primary/Secondary/Error) × `Size` (Small/Medium/Large) × `State` (Default/Hover/Disabled) = 54 variants. Properties: `Label` (TEXT), `Start icon` / `End icon` (BOOLEAN), `Start icon swap` / `End icon swap` (INSTANCE_SWAP) |
| **Icon button** | `7ebea5d7ce6ecfdaef84d177efa64196f654717d` · set `170:77` | `Color` × `Size` (Medium 40 / Small 34) × `State`, 24 variants. `Icon` INSTANCE_SWAP, defaults to DownCaret |
| **Button group / Segment** | `bc219c96060a727688a6604a3a66d0a2b09c2e1c` · set `160:996` | `Position` (First/Middle/Last) composed in an auto-layout row. **This is the split-button primitive** |
| **Menu** | `154:2` (component) | composite, 300 × 144 |
| **Menu / Item** | `152:15` (set) | 6 variants |
| **Icon / DownCaret** | `9014d3426e8bc55a4b28ef279f584134ae32f06f` | 24 viewBox |
| **Icon / LinearEllipsis** | `4b36995eeb808368112345235e670acfd187d920` | overflow / kebab affordance |

**Button rendered heights, from the set's own description:** contained **30 / 38 / 42**, text
**28 / 36 / 40** for Small / Medium / Large. These are to be re-derived from the node geometry in
Phase 1 rather than taken from prose — recorded here only to show the 56 estimate is plausible
(36 + 2×10 = 56 for a medium text button).

**No component exists for:** a toolbar or action-row container, a split button as a single component
(only the positional segment primitive), or an overflow menu button with an attached popover.

---

## P0.g — contradictions with the prompt's fixed decisions

Recorded, not resolved. **The prompt says to stop here if Phase 0 contradicts a decision. It does, four times.**

### C1 — "Modal is the test" excludes four of the six actions the prompt says are visible

> **RESOLVED 2026-08-20: the modal test is WITHDRAWN.** Daniel's call — "Drop the modal test entirely,
> it was wrong." C1 through C4 are all resolved by reverting to production's composition. The row was
> built on that basis; see `ACTION-ROW-PATIENT-BUILD.md`. The analysis below is kept as the reason the
> test was withdrawn, not as an open question.

The prompt: *"If an action opens a modal and acts on the patient in place, it belongs in this row.
If it navigates to a destination, the rail owns it and it is out."*

Applying that test to the six the prompt names as visible:

| Action | Actually does | Passes the modal test? |
|---|---|---|
| New Note | navigates to `/patients/{id}/notes/new` | **No** |
| AI Note Assist | navigates via `window.location.assign` | **No** |
| Collect Payment | navigates to `/payments-ui/#/payment/{id}` | **No** |
| Print | opens a PDF in a new tab | **No** |
| Send Secure Message | opens the portal in a new tab | No — but explicitly admitted as the one exception |
| Send Patient Education | opens `PatientEducationModal` | **Yes** |

**Only one of the six passes the stated test.** The prompt admits one exception (Secure Message) and
does not address the other four. Meanwhile every one of the five C-CDA items the prompt sends *into*
More is a modal and passes the test cleanly.

Stated plainly: **the rule as written selects almost the inverse of the list it is attached to.** The
list may still be the right list — commonness, not modality, is a defensible basis — but the rule
does not produce it and should not be cited as the reason.

### C2 — Send Secure Message and Send Patient Education are in More today, not visible

The prompt puts both in the visible six and says More holds *"the C-CDA cluster only."* Production
has both **inside** More (`MoreMenu.tsx:298-304` and `:211-218`). Moving them out is a change, not a
reproduction — fine if intended, but it is not what production does and the prompt reads as though it
were.

### C3 — More has seven or eight items in production, not five

The prompt's More list is the five C-CDA items. Production's More is **seven** (`Send Secure
Message`, `Send Patient Education`, and the five) or **eight** with `Health Data Exchange`.
**`Health Data Exchange` appears nowhere in the prompt** — not in the visible list, not in More, not
in the scoped-out list. It is the legacy `Exchange`, returned. Under the prompt's own modal test it
belongs in the row.

### C4 — production styles New Note as a primary

The prompt: *"All six visible actions at the same visual weight. No primary styling on any of them."*

`MuiButton.defaultProps.variant = "contained"` and `MuiButtonGroup.defaultProps = { variant:
"contained", color: "secondary" }` (`ButtonOverrides.ts:8`, `ButtonGroupOverrides.ts:5-6`), so
`CreateNoteButton`'s unstyled ButtonGroup renders **contained secondary** — the coral split button
visible in the capture. This is a deliberate contradiction the prompt is entitled to make; recorded
so it is not later mistaken for a build error.

**Sub-disagreement — WITHDRAWN 2026-08-20, it was my error.** I recorded that `AiNoteButton.tsx:57`'s
`variant="contained"` should render teal while the capture showed it white-with-border, and called
that a code-vs-capture disagreement. It is not one. `ButtonOverrides.ts:40-44` gives `containedPrimary`
a `common.white` background with a `1px core.main` border and `core.contrastText` text — in this theme
contained primary **is** the white pill. Code and capture agree, and so does the built Figma Button.
Caught when the built row rendered AI Note Assist as a white pill.

### Also recorded

- **`ChartAccess` renders twice on one screen** — header and rail.
- **`PatientCard` ships hardcoded placeholder props** — `insurance="test" address="test"`
  (`ClinicalPageNav.tsx:129-133`). Not this row's problem; noted because it was found in the sweep.
- **Collect Payment's amount is inline in v2, separate in legacy.** v2:
  `Collect Payment ($0.00)` with the amount as a nested `<Typography component="span">` coloured
  `error` when non-zero (`HeaderRightLinks.tsx:118-126`) — so it is one label with a
  differently-coloured run, not a separate element. Legacy renders `Collect Payment` over
  `$0.00 due` on two lines. **The prompt's instruction to keep the amount in the label matches v2.**
  Confirmed, no contradiction.

---

## Where this stops

Phase 0 is complete and its exit criteria are met. Per the prompt — *"If Phase 0 contradicts any
decision above, stop and record the contradiction rather than resolving it"* — no build has started
and no Figma node has been created or mutated.

**C1 is the one that needs your call before building**, because it decides whether the row's
composition is the six named or something the stated rule actually produces. C2, C3 and C4 are
answerable by you in a sentence each. Nothing else blocks.
