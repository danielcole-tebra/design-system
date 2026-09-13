# Problems page — Phase 0

2026-08-20. **Nothing built. No page created.** Three of the Phase 0 checks stop the build, and one
of my own earlier records is wrong and is corrected here.

---

## Blocker 1 — Problems has no `web-app-v2` code, and neither do the other four

The rail's own link table (`clinical-system/src/utils/chartPermissionsNavLinks.ts`) says where each
destination goes:

| Page | URL | Stack |
|---|---|---|
| **Problems** | `/EhrWebApp/patients/viewProblems/{patientId}` | **legacy EhrWebApp** |
| **Immunizations** | `/EhrWebApp/patients/viewImmunizations/{patientId}` | **legacy EhrWebApp** |
| **Allergies** | `/EhrWebApp/patients/viewAllergies/{patientId}` | **legacy EhrWebApp** |
| **Medications** | `/patients/{patientId}/medications` | v1 app, not EhrWebApp, not v2 |
| **Labs/Studies** | `/labs-ui/#/patient/{patientId}/labState/all` | **`labs-ui` — not in this checkout at all** |

Searched: **no `problems-ui` package, no route in `microfrontend-layout.html`, no page component.**
The only Problems code in the monorepo is the *facesheet card* (`ProblemsCard.tsx`) and its query —
a different thing from the Problems destination.

**So "code is source of truth" has nothing to point at.** The build would rest entirely on the
production capture, which the standing conventions rank as *evidence, not authority*. Building a v2
page from a legacy screenshot is a **proposal**, not a rebuild — the same distinction drawn for the
split button.

**And "structurally the same, so this sets the pattern for the other four" cannot be verified.** The
five do not share a stack: three legacy, one v1, one absent from the checkout. Whatever this build
sets a pattern for, it is not a shared code structure.

## Blocker 2 — P0.b has no answer, and its premise needs correcting

**Problems uses neither DataGrid nor Table.** It is not built from MUI. There is no row height "that
mechanism produces" because neither mechanism is present.

Separately, the premise as stated is wrong:

> *"DataGrid's row height is authored at 52"*

**`DataGridOverrides.ts` contains no `rowHeight` at all.** It sets column-header colour, row hover
and selection, cell borders, detail panels — no geometry. **52 is MUI X's own default**, not a Tebra
value. And four v2 call sites already override it with four different numbers:

| Call site | `rowHeight` |
|---|---:|
| `ordering-system/.../InteractionDataGrid.tsx:188` | 34 |
| `ordering-system/.../FavoritesDataGrid.tsx:103` | 40 |
| `composition-ui/.../CompositionWorkspace.tsx:356` | 30 |
| `electronic-case-reporting-ui/.../CaseReportTable.tsx:38` | 64 |

So there is no single DataGrid row height to inherit either. The two mechanisms do not split cleanly
into "52" and "falls out of padding".

`Table/Cell`'s own published description confirms the other half: body cells are *"typography body2,
padding 16, borderBottom 1px palette.divider"*, and — relevant to this page — **"No sort indicator —
the story renders no `TableSortLabel`, so no sort glyph rides along."**

## Blocker 3 — the rail instruction cannot be executed

The prompt asks to use `State = Selected` and to clear the height overrides because *"the component
now produces 48 unaided."* **Neither is true in the proposals file.** Read from `zKT34LQogNjz3Z07fY4VQB`:

```
List/Item  variants: ["State=Default", "State=Hover"]        <- no Selected
           props:    Primary, Secondary, Show secondary [BOOLEAN],
                     Show icon, Icon, State                   <- no Lines axis
rail:      17 items, all State=Default, all 48
           withTextPadOverride: 17 of 17
           withFillOverride:    ["Problems"]
```

The corrected component — `Lines` axis, `Selected` state, 48 unaided — exists **only in the
unpublished library**. In the proposals file:

- `State = Selected` **does not exist**, so the Problems fill override cannot be replaced by it.
- Clearing the 17 `textPad` overrides would break the rail **to 52**, not fix it to 48, because the
  published master still carries the 6/6 margin.

**This blocks until `Design System Rebuild` is published and accepted.** Same publish that the
Segment `minWidth` fix and `Split button` are waiting on.

---

## P0.a — the page, enumerated from the capture

Source: `patient_problems_rich01.png`, `app-qa.kareo.com/EhrWebApp/patients/viewProblems/164444127`,
1440 viewport. **The only artifact this page has.**

**Above the table**
- `Active | Inactive` segmented toggle, Active selected (solid dark teal)
- ☐ `No known problems` checkbox
- ☐ `Problem reconciliation performed` checkbox
- `+ Problem` button, top right, outlined

**Table** — titled **"Problems List"** in a card with a header band

Columns, left to right:

| # | Column |
|---:|---|
| 1 | *(row checkbox)* |
| 2 | Problem/Issue |
| 3 | Diagnosis Description |
| 4 | ICD-10 |
| 5 | ICD-9 |
| 6 | Type |
| 7 | Start Date |
| 8 | Comments |
| 9 | Last Edited **▼** |
| 10 | *(narrow trailing column, empty)* |

**The catalog manifest undercounts this.** It records *"8 columns (Problem/Issue, Diagnosis
Description, ICD-10, ICD-9, Type, Start Date, Comments)"* — seven names for a stated eight, and it
omits `Last Edited`, the checkbox column and the trailing column. The capture shows **ten**.
Recorded as a contradiction; the capture is the artifact and the manifest is a report.

**Sort** — one indicator only, a small solid **▼** on `Last Edited`. No sort affordance on any other
column, no filter controls, no search field, **no pagination** anywhere on the page.

**Row actions** — none per row. Selection is by checkbox, and the actions are **bulk**, at the bottom
left: `Deactivate` and `Mark As Error`.

**Page actions** — `+ Problem` only.

**Empty state** — **not determinable.** Every Problems capture in the catalog has rows. The rich01
capture shows 4 rows, rich02 shows 2. No zero-row capture exists, so the empty state could not be
enumerated and was not guessed.

**Row height** — not recorded. The capture is a 2× raster of a 1440 viewport, so a row measures
roughly 93 CSS px, but that is a screen measurement of a non-MUI page at a derived scale. Under the
standing conventions that is not a value to author from, and there is no code to check it against.

## P0.c — icons

Needed by the page: sort indicator ▼ · row and header checkboxes · `+` for the page action. No row
action glyphs, no status markers, no filter controls, no empty-state art appear in the capture.

| Need | Published? |
|---|---|
| `+ Problem` leading glyph | **`Icon/PlusOutlined` — yes** |
| Row / header checkbox | **`Checkbox` set (12 variants) — yes.** Also `Icon/CheckboxUnchecked`, `CheckboxChecked`, `CheckboxIndeterminate` |
| Table cell substrate | **`Table/Cell` set (6 variants) — yes** |
| **Sort indicator ▼** | **No matching glyph.** `Icon/DownCaret` is published but is a **chevron**, not the solid triangle the capture shows. `Icon/Unsorted` and `Icon/UpCaret` exist in the library but are **not published** |

**Icons do not block this build.** The only gap is the sort indicator's shape, and it is one glyph on
one column — not the "table probably will not get away with it" scenario the prompt anticipated.

### Correction — my earlier "71 of 76 icons unreachable" was wrong

`SPLIT-BUTTON-BUILD.md` §6 and `LIST-ITEM-GAPS.md` state that only five icon masters are published
and reachable. **That is not right, and the method that produced it was wrong.**

I probed by reading `node.key` off masters in the library file and calling
`importComponentByKeyAsync`. For a component published *before* subsequent edits, the node's current
key is not its published key, so that probe under-reports. Verified now by importing keys taken from
`search_design_system`, which indexes published assets:

```
Checkbox (set)               OK, 12 variants
Table/Cell (set)             OK, 6 variants
Icon button (set)            OK, 24 variants
Icon/CheckboxUnchecked       OK          Icon/CheckboxChecked   OK
Icon/CheckboxIndeterminate   OK          Icon/DownCaret         OK
Icon/PlusOutlined            OK          Icon/PrintOutlined     FAIL
```

**The real rule is publish-date, not a count of five.** Masters published in the last library publish
are reachable; the code-source batch imported 2026-08-19 (node ids `575:x`, including
`Icon/PrintOutlined`) is not. **`search_design_system` is the reliable test; reading `node.key` is
not.**

The `Split button` decision to ship Print and AI Note Assist label-only still stands —
`Icon/PrintOutlined` genuinely is unpublished, and `Book4SparkSharp` has no equivalent — but the
reason recorded there is wrong and should be read as the publish-date rule instead.

---

## What was not reached

`P0.a` is complete, `P0.b` is answered as unanswerable, `P0.c` is complete and does not block.
The rail, patient header, action row, page heading and table were **not built**, and no page was
created in `zKT34LQogNjz3Z07fY4VQB`.

The page-heading question — *does the pattern hold, or does it need a real component* — is untouched,
because it cannot be tested before the page exists.

## What would unblock it

| Blocker | What it needs |
|---|---|
| 3 — rail | **Publish `Design System Rebuild` and accept in the proposals file.** Also clears the Segment `minWidth` fix, `Split button`, and the action row's temporary caret override |
| 1 — no v2 code | A decision: build this as a **proposal from production evidence**, explicitly labelled, or wait for a v2 Problems page to exist |
| 2 — DataGrid vs Table | Follows from 1. If it is a proposal, the mechanism is a design choice, not a derivation — and `Table/Cell` is published and ready while DataGrid has no Tebra row height |

Blocker 1 is the one that needs your call. 3 is mechanical. 2 resolves once 1 does.

---

## Gate check, 2026-08-21 — publish landed, file has not accepted it

Build stopped at the gate. **Nothing built, no `Problems` page created.**

The prompt's stop condition triggered — `List/Item` in this file still reads
`State = Default | Hover` with a `Show secondary` boolean — but the cause is **not** what the
condition assumed. The publish did land. The consuming file has not taken the update.

**Read from `zKT34LQogNjz3Z07fY4VQB`, comparing the file's own copy against a fresh import by key:**

| Component | File's copy | Fresh import from the library | Verdict |
|---|---|---|---|
| `List/Item` | **2 variants**, `State=Default\|Hover`, `Show secondary` boolean | **6 variants**, `Lines=One\|Two` × `State=Default\|Hover\|Selected` | **Published, not accepted** |
| `Button group / Segment` | master `minWidth: 64` | master `minWidth: **40**` | **Published, not accepted** |
| `Split button` | — | **8 variants, importable** | **Published and available** |

**Why Split button is available and the other two are not.** A *new* library component appears in a
consuming file as soon as it is published. An *update to an existing* component does not — it waits
in the Libraries panel until someone accepts it. `Split button` is new; the `List/Item` restructure
and the `Segment` `minWidth` fix are edits to components this file already uses.

**So the remaining step is not another publish.** It is: open `zKT34LQogNjz3Z07fY4VQB` →
Libraries → **review and accept the pending updates** to `List/Item` and `Button group / Segment`.
Accepting library updates is not available in the Plugin API, the same class of manual step as
publishing and as enabling a library (`PROPOSAL-PATIENT-HEADER-V1.md` PH-10).

### Why I did not build around it

A fresh import by key does return the corrected 6-variant set, so the corrected component *is*
reachable from here. Building the rail from it anyway was rejected:

- The 17 existing rail instances point at the **stale** copy. New instances from a fresh import would
  sit beside them on a different version of the same component — two `List/Item` states in one file,
  which is worse than stopping.
- The prompt's own rail test confirms the hazard: *"If clearing produces 52, the publish did not land
  and you should stop."* Clearing the `textPad` overrides now **would** produce 52, because the file's
  master still carries the 6/6 margin.

### Current state, unchanged

```
rail:            17 items, all State=Default, 17 x 48 = 816
                 textPad overrides: 17 of 17   (still load-bearing)
                 fill override:     ["Problems"] (still hand-painted)
action row:      New Note 150, caret 40
                 caret still carries [minWidth override - clear at publish]
                 master still reads 64, so the override is still doing the work
```

**All three clear together once the updates are accepted:** the rail's 17 padding overrides become
dead weight and can be removed, `Problems` can take `State=Selected` instead of a painted fill, and
the action row's caret override can come off and inherit 40 from the master.
