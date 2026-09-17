# Mobile ambient capture: visit device addendum

First addendum to `mobile-ambient-capture-spec.md`. The phone shows read-only patient information, the Patient chart, before and during a recording. Built on page `Visit screens` 43:705 in file TP5KrQtY0T5IcMNqi375So. The same components serve `Account screens` (see `mobile-account-spec.md`).

Consumer: the Figma builder agent, and anyone reading what was decided. Section 1 is context and rulings. Section 2 onward records the build as it stands.

Revision 9, record of the build through K2 and the footer band audit. Rewritten in full; revisions 1 to 8 are in git history. Changes from revision 8: the drawer is the Patient chart, navigated by drilling in; no close button anywhere; opening a patient lands on the chart list; the quick switch and the sheet switcher are gone; 32 corners and one shared drawer top; the collapsed drawer edge replaces the Patient info button; Start Recording sits on a footer band; the stop confirmation is an overlay; the recording controls sit on the timer line; the batch record through K2.

---

## 1. Intent and rulings

The base prototype makes the phone a capture device. This addendum makes it a visit device: once a patient is picked, the provider can read what the desktop's side sheets show without reaching for a laptop, before recording ("is this the patient with the penicillin allergy?") and during it ("right, we started you on Zofran in March").

This reverses one line of base spec section 1: chart data is in scope, **read-only**. Prescribing, ordering, editing or adding to any list, note review and signing stay out.

Phase 1, the architecture and one worked sheet, is built. Phase 2 ports the remaining desktop sheets one per batch against section 7.

**Rulings from Daniel:**

- The drawer is the **Patient chart**. It works by drilling in, identically on the patient screen and the recording screen. The list is home; a sheet opens from its row; back returns to the list.
- Opening a patient lands on the chart list. No sheet is open by default, and no row is highlighted.
- **No close (X) button on any drawer or sheet.** The drawer tucks away by dragging down on the recording screen. The microphone sheet closes by choosing a device or tapping the dimmed area.
- Dragging up from the collapsed drawer edge opens the chart list, in either recording state.
- The collapsed drawer edge reads "Patient chart" and replaces the Patient info button on the recording screen.
- Drawer and sheet titles have a divider under them in both states.
- Sheets and drawers have 32 top corners and one shared top (puller 30, title row 48).
- One back chevron per screen. The ready bar's back is a labeled link, "Patients".
- Start Recording is pinned to the bottom on its own surface, with a divider along the top edge to separate it from the chart behind it.
- The pause and stop controls on the recording bar sit on the timer line.
- Chart rows with no sheet frame yet stay in the list and do nothing when tapped.
- Every sheet is reachable before recording.
- Desktop sheets are generated from set templates, so ports keep their content as is; only identifying details change. Patient summary is ported from the Default version at NPVE node 672:7906.
- Pause, stop and play use MUI's own icons, never invented ones. All glyphs follow the glyph rule in `mobile-account-spec.md` section 1.

**Not in scope:** search within the chart list, pinning sheets, any sheet that needs an action to be useful (flag it rather than bring the action across).

---

## 2. Conventions

All CLAUDE.md rules apply. Base spec section 2 applies where this document doesn't override it.

- **Pages.** `Screens` is the base prototype and is never edited. `Visit screens` holds `V `-prefixed duplicates of its frames plus the V4 and V5 frames. No reaction crosses pages.
- **Components.** Local components live on `Components` under `Visit/`. They are shared with `Account screens`; a change to one reaches both pages.
- **Sheet source.** Desktop sheets live in the NPVE target file fdCQVFdvOByaOYIJYag0d6. Read, never write. Daniel confirms each sheet's node before it is ported.
- **Sheets are swapped, not nested.** The drawer carries content through its `Sheet` instance swap property. Each sheet is its own `Visit/Sheet/<name>` component, 358 wide.
- **Optical edge.** Screen-edge ink at x 16 and x 374; tap targets may bleed to the screen edge.
- **Superseded nodes** are hidden and labeled SUPERSEDED, never deleted.
- **Record.** Composition decisions in COMPOSITIONS.md, open findings in FLAGS.md, history in LOG.md.

---

## 3. Geometry

Base spec section 3 applies: 390 x 844, 47 top safe area, 34 bottom, 16 edge padding, integer px, 8 rhythm, 48 minimum touch target.

The drawer runs from the bottom of the recording bar to the bottom of the frame. No partial height, no detents. It is open or collapsed to its edge.

---

## 4. Components

| Component | Node | What it is |
|---|---|---|
| `Visit/Recording bar` | 48:918 set | `State`: ready (default), recording, paused. Section 5 |
| `Visit/Drawer` | 48:897 set | `Mode`: list (default), sheet. `Sheet` swap (default `Visit/Sheet/Placeholder`). `Stroke` boolean, default false. `Closable` boolean, default false, no visible effect since the close button is hidden. Section 6 |
| `Visit/Drawer edge` | 70:1480 | 390 x 112 (30 + 48 + 34), `color/background/paper`, 32 top corners, clipping. Label "Patient chart" at (16, 12), bound `color/text/primary`. `Stroke` boolean, default false |
| `Visit/Chart row` | 177:2858 | 390 x 48. Exposed library `List/Item` (Lines=One, Show icon off) filling 358, `Visit/Icon/ChevronRight (MUI)` 24 with ink right edge at 374, `color/grey/600`. No properties |
| `Visit/Top bar` | 93:2734 set | `Config`: Title with action (default), Back with title, Back only. 390 x 64 |
| `Visit/Sheet/Patient summary` | 50:969 | 358 x 1141. The worked example, section 7 |
| `Visit/Sheet/Placeholder` | 48:141 | 358 x 68. Stand-in for any sheet not yet ported |
| `Visit/Icon/…` (MUI) | Components page | ArrowDropDown 59:493, ChevronLeft 159:1103, ChevronRight 159:1105, ExpandMore 159:1107 (reserved, not placed), PauseCircle 74:531, StopCircle 74:534, PlayCircle 74:537, Cancel 74:540. 24 x 24, exact MUI paths |

**Superseded, hidden and labeled:** `Visit/Sheet list row` 48:137, `Visit/Quick switch` 51:1091, `Visit/Icon/CancelOutlined (MUI)` 74:543, `Visit/Icon/Pause`, `Stop`, `PlayArrow (MUI)` 51:983, 51:986, 51:989.

**Unused, kept:** `Visit/Probe/Swap host` 43:1631, from D0's swap test.

---

## 5. Recording bar

**Ready** (V4), 390 x 201, `color/background/default`.

- Top safe area 47.
- Back row, 44 at y 47: text Button "Patients" with a 16 `ChevronLeft` start icon, 103 x 36 at x 4.
- Identity row, 44 at y 91: "Marcus Vance" at x 16 in `color/text/primary`, "DOB 03/14/1972" beside it in `color/text/secondary`, on one line.
- Pills row, 50 at y 135:
  - Template pill, (16, 12), 200 x 38: `Icon/List` start icon, label "Template: SOAP", `ArrowDropDown` end icon.
  - Input device pill, (224, 12), 82 x 38: microphone glyph and `ArrowDropDown`, no label.
  - Both end icons render at the Button's 16 slot.

**Recording** (V5), 390 x 119, `color/success/dark`.

- A 72 bar row sits below the safe area.
- Readout at (16, 6), 358 x 60, all text `color/common/white`: "Marcus Vance" on the first line, "04:32" on the second (timer line at 30 to 66 in the row).
- Controls, 76 x 40, at x 308, y 28 in the row, holding the pause and stop icon buttons in white. Their centre is 48, the timer line's centre.

**Paused**, as recording, with these differences:

- The field is `color/primary/main`.
- "Paused" replaces the name.
- Play replaces pause.
- The timer holds.

The full recording field (V S5) is not a bar state. It stays its own frames.

---

## 6. Patient chart drawer

Both modes are 390 x 621, `color/background/paper`, with 32 top corners and clipping.

**The shared top.** A 30 puller zone holds a 30 x 6 `color/grey/400` puller at (180, 8), radius 3. Below it is a 48 title row with a 1 px INSIDE bottom stroke in `color/divider`. The top is 78 in total. The close button is hidden in both modes.

**List mode.**

- Title "Patient chart" at (16, 12), h4, `color/text/primary`.
- The body holds fourteen `Visit/Chart row`s, none selected: Patient summary, Allergies, Medications, Problems, then Sheet 5 to Sheet 14 as placeholders until Daniel supplies the real list.
- The body scrolls vertically, with bottom padding 34 in the master.

**Sheet mode.**

- Back tap target 48 at x -2 (ink from 18), built as `Visit/Top bar`'s back.
- Sheet name at x 72, h4, `color/text/primary`.
- The body holds the `Sheet` swap, with padding 8 / 16 / 34 / 16, and scrolls vertically.

**Stroke.** True on the V4 drawers, over the light page, and false on the V5 drawers, over the colour field. Docked drawers under the recording or paused bar have the bar's fill extended 32 behind them, so the corners show the field.

**Footer band** (V4 only). A rectangle named `Footer band`, not a component.

- 390 x 122 at (0, 722), `color/background/paper`, with a 1 px INSIDE top stroke in `color/divider`.
- Start Recording, a library Button (contained, secondary, medium), 358 x 56 at (16, 738).
- The drawer body on these frames is bottom-padded 122 as an instance override, so the last row scrolls exactly clear of the divider.
- The band is on V4 list, summary and placeholder, and on their A4 twins.

---

## 7. Porting rule

Every sheet follows this. Patient summary is the reference.

1. Content width 358, one column. Anything side by side on desktop stacks.
2. Tables become stacked rows: primary value first, supporting values in secondary text below, divider between rows, desktop order kept.
3. The desktop sheet's own header and close are dropped. The drawer's title row replaces them.
4. Every action is dropped: add, edit, prescribe, reconcile, overflow menus. Each is logged in FLAGS.md as DECISION, naming the sheet. Feedback controls on generated content are kept if they port without new components; otherwise dropped and flagged GAP.
5. Library components are used as the desktop sheet uses them. Desktop-only pieces with no mobile fit are flagged GAP.
6. Long text wraps. Nothing truncates unless desktop does.
7. Content is ported as it reads. Only identifying details (name, age, sex, pronouns, dates of birth) change, to match Marcus Vance, DOB 03/14/1972, each logged as DECISION. No clinical content is written or rewritten.

Each port adds a `Visit/Sheet/<name>` component and the sheet frames that show it, and wires its chart rows.

---

## 8. Frames

`Visit screens`, 26 frames, one starting point: **Visit device** on V S1 Login / default.

| Frames | Notes |
|---|---|
| V S1 Login / default, error | |
| V S2 Home / empty, sessions, results, no results, searching, after first capture, after failed capture | |
| V S3 Microphone | Pre-recording microphone choice |
| V S4 Patient | SUPERSEDED by V4, hidden |
| V S5 Recording / recording, paused | Full field. `Visit/Drawer edge` at y 732. Patient info button hidden, SUPERSEDED |
| V S6 Stop confirmation | SUPERSEDED by the overlay, hidden |
| V S6 Stop confirmation / overlay | 166:5030. Dialog only, 326 x 238. Close on click outside, 50% black background (set by hand; the colour is a literal, GAP) |
| V S7 Sending, V S8 Sent / sent, failed | |
| V4 Patient / list, summary, placeholder | Ready bar, drawer, footer band. Placeholder shows Medications |
| V5 Recording / drawer list, summary, medications | Recording bar over the drawer |
| V5 Paused / drawer list, summary | Paused bar over the drawer |

---

## 9. Wiring

| From | Action | To |
|---|---|---|
| V S2 search result row | tap | V4 Patient / list |
| V4 "Patients" | tap | home |
| V4 Start Recording | tap | V S5 Recording / recording |
| Chart row, Patient summary | tap | the summary frame of the same screen and state |
| Chart row, Medications | tap | V4 Patient / placeholder, V5 Recording / medications. Inert on V5 Paused / drawer list |
| Chart rows, all others | tap | nothing |
| Sheet back | tap | the list frame of the same screen and state |
| V S5 drawer edge | tap or drag up | V5 Recording / drawer list, or V5 Paused / drawer list |
| V5 puller zone, all five frames | drag down | V S5 in the matching state |
| Every Stop, seven callers | tap | S6 overlay |
| S6 overlay | Stop Recording / Cancel | V S7 Sending / close |

Totals: 84 reactions across 81 layers (76 click, 7 drag, 1 timeout). The seven drags are the two edge drags and the five puller drags. The full table is in the LOG.md entry for the read-only drawer audit.

State after K2: Visit screens 26 frames, 84 reactions across 81, text 524 / 10,169. Account screens 35 frames, 114 across 111, 707 / 12,767. Screens 18 frames, 42 across 41. No cross-page edges.

---

## 10. Batch record

Batches before the account work, D0 to D4 and their fixes, are in LOG.md; `Visit screens` was locked at commit `09a7b09`. Shared-component batches during the account work (D1, D1.1, D1.2, P1, C1) are in `mobile-account-spec.md` section 9.

| Batch | Scope | Commit |
|---|---|---|
| N1 | Patient chart drill-in, no close buttons, `Visit/Chart row` | pending |
| Audit | Read-only drawer audit for this revision | pending |
| K1 | List divider, pill glyph on master, edge title binding, superseded leftovers | pending |
| K2 | Recording bar set height, controls back on the timer line | pending |
| Band audit | Read-only footer band values, two rulings recorded | pending |

---

## 11. Open

- **To confirm against the file:**
  - where the V4 Template pill and input device pill lead
  - where pause leads from V5 Recording / medications, which has no paused twin
- **Real chart list.** Sheet names and order, and each sheet's NPVE node. Daniel supplies.
- **Phase 2 ports,** Medications first.
- **Housekeeping:**
  - COMPOSITIONS.md has no footer band entry.
  - The A4 footer band ids are recorded nowhere.
  - `Visit/Recording bar`'s set, which has no fill, now overlaps `PROOF · Batch 2 local components` 4:560 on the Components canvas.
- **Play both pages on a phone:**
  - the chart drill-in while recording
  - drag up and down
  - stop and cancel from a paused drawer
- **Library batch in YX2n4YLrEpBXNbcc73T6dw:**
  - add the MUI glyphs
  - add a trailing slot on `List/Item`
  - add a Divider component

## 12. Questions for the build

- Which desktop sheets come to mobile, and does any need an action to be useful?
- Is the chart data fetched once on opening a patient, or live during a recording?
- Do generated summaries on the phone carry the same feedback path as desktop?
