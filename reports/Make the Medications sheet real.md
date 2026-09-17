# Make the Medications sheet real

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319 · reference `fdCQVFdvOByaOYIJYag0d6` 254:3706, read only · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Two rulings, five items, all five done.

---

## The five names, first

Rows 5 to 9 of the chart list now read:

1. **Procedures & surgical history**
2. **Family history**
3. **External care history**
4. **Health status/observations**
5. **Social history**

Taken from the NPVE sheet bodies on page `Templates` in canvas order after `Medication list body` 236:1758 — the 518-wide `… body` components the Sidesheet shell swaps in.

**One was skipped, deliberately.** `Allergies list body` 355:3217 falls between Family history and External care history in that order. The mobile chart list already carries **Allergies as its second row**, so renaming a fifth row to it would have put two Allergies rows in one list. Skipped, and the next sheet in order taken instead. Recorded here and in FLAGS so the gap is not read later as an error.

---

## Before and after

| | before | after |
|---|---|---|
| Children on `Account screens` | 48 | **50** |
| Frames | 40 | **42** |
| Reactions | 130 across 126 | **138 across 134** |
| Destinations | 36 | **38** |
| Off-page destinations | 0 | **0** |
| Starting points | `Account device`, `Schedule` | **unchanged** |
| Local components | 44 | **45** |

Accountable: two cloned frames bring 4 reactions each (+8), each loses its Start Recording (−2), Colette's two Medications rows gain one each (+2). 130 + 8 − 2 + 2 = 138.

---

## What the reference is

**`254:3706` is a SECTION, on page `Screens`, named "05 · Medication list comparisons".** It holds exactly one child: a `Rebuild comparison` instance **254:3707**, 1708 × 1290. So the node is **a frame holding both versions**, not one of them.

| region | what it is |
|---|---|
| **Reference** `I254:3707;114:1137` | the **legacy** sheet, as a flat snapshot image — `Source: zVsuhYehoSLLq880qRBFkq 545:5557, exported 2026-09-04` |
| **Rebuild** `I254:3707;114:1139;253:1841` | the **rebuilt** sheet, live nodes — a 550 × 382 Sidesheet shell at `Placement=Floating` |
| **Change log** `I254:3707;114:1240` | six rows recording what changed |

Which is which is unambiguous — the captions say so and the swap properties are named `Reference content` and `Rebuild content` — so nothing was stopped on.

**Both versions, fields and order.** They carry the same content; the legacy is an image so its fields are read from the render, the rebuild from its nodes.

| | field | legacy | rebuild |
|---|---|---|---|
| header | title | "Med List" | "Med List" (20 Bold, 72-tall header) |
| header | close | X | X |
| body | add action | "Add New Medication ✛" | same |
| row | **status** | ACTIVE ▾ / DISCONTINUED ▾ | same, 14 Bold + caret |
| row | **name** | Losartan / Sertraline | same, 18 Regular |
| row | **dose** | 50mg / 100mg | same, 18 Regular |
| row | **indication** | chip: Hypertension / Depression | same |
| row | **add to note** | circled icon button, active row only | bare glyph, active row only |
| row | divider | under the active row only | same |
| footer | action | "Add Section to Note" | "Add Section **To** Note" |

Hierarchy in both: **shell → header → body → (add action, then one row per medication) → footer**, and within a row **status → name → dose → indication → action**.

**Where they disagree**, beyond what the change log already records (shell height, header 64 → 72, rows drawn one by one → one reusable row, grey rows → white, footer pinned → following, 20 inset → 16):

1. **The footer label**: legacy "Add Section to Note", rebuild "Add Section **To** Note". The library Button's `textTransform: capitalize` — the same rule that gives this file "Next Patient" and "Back To Schedule". **Followed the rebuild.**
2. **The add-to-note affordance**: legacy a circled icon button, rebuild a bare glyph. Moot here, since actions are dropped.

Both logged as `npveMedications_rebuildFooterIsTitleCase`; neither was changed, because that file was read-only this batch.

---

## What was built

### 1. The sheet

**`Visit/Sheet/Medications` 272:396**, on `Components` in the `Visit/` band at (3116, 0): **358 × 288**, four rows at **72**.

Each row is the library **`List/Item` at `Lines=Two`**, `Show icon` off, FILLing a 358 wrapper that carries a **1 px INSIDE bottom stroke bound `color/divider`**:

- **primary line** — name and dose ("Sertraline 50 mg")
- **secondary line** — form and frequency ("tablet, once daily")

**What was kept from the rebuild**: the row order, and the name-then-dose-then-detail hierarchy.

**What was left out, because the supplied rows do not cover it** — as the brief directs:

- the **status control** (active / discontinued, with its caret)
- the **indication chip** (Hypertension / Depression)

**What was dropped, because ported sheets drop actions** (§6.4):

- **Add New Medication**
- the per-row **Add to note**
- the **Add Section to Note** footer

**The library expressed every row.** No GAP was needed and nothing is labelled SCAFFOLDING: a two-line `List/Item` carries name, dose, form and frequency without a workaround.

**One pixel worth the words.** The row first came out **73** tall: an INSIDE stroke insets a *hugging* frame's content box, so a 72-tall child forces the wrapper to 73. Fixed by making the wrapper **FIXED 72** and letting the `List/Item` **FILL** it. This is the same pixel the Date header's `paddingTop 1` fixes, met from the other side — and it is now in COMPOSITIONS.md both ways.

### 2. Marcus

The sheet was swapped into the drawer's `Sheet#48:4` slot in place of `Visit/Sheet/Placeholder` on **both** of his Medications frames:

| frame | before | after |
|---|---|---|
| `A4 Patient / placeholder` 103:3032 | `Visit/Sheet/Placeholder` 48:141 | **`Visit/Sheet/Medications` 272:396** |
| `A5 Recording / medications` 103:3048 | `Visit/Sheet/Placeholder` 48:141 | **`Visit/Sheet/Medications` 272:396** |

Both read back with all four of his medications, and the drawer title still reads "Medications" on both. **Their wiring was not touched.**

`A4 Patient / placeholder` now shows real content under a name that says placeholder. Left as it is — renaming it was not asked and it is referenced by name in the spec and by the chart row that reaches it. Worth a rename in a later batch.

### 3. Colette

**Two frames, not one** — `A4 Colette / medications, after Marcus` **272:3459** and `A4 Colette / medications, after Yusuf` **272:3602**, cloned from Marcus's `A4 Patient / placeholder` (57 componentPropertyReferences and 4 reactions on the source and on both clones, nothing dropped).

The brief said "her own Medications frame" in the singular, and also that its back must "return to the frame it came from". Her Medications row exists on **both** her chart frames, and one frame cannot return to two, so it was built the way her summary already is: one per path. Reported rather than assumed.

Her three medications override the sheet's rows; the fourth row is hidden.

**Nothing on Colette's path reaches a Marcus frame** — every reaction on both frames, read back:

| frame | node | to |
|---|---|---|
| after Marcus | `Back tap target 48` (drawer back) | **A4 Colette / after Marcus** |
| after Marcus | `Back to patients` | A S2 Home / schedule, Marcus sent |
| after Marcus | `Input device pill` | A S3 Microphone |
| after Yusuf | `Back tap target 48` | **A4 Colette / after Yusuf** |
| after Yusuf | `Back to patients` | A S2 Home / schedule, both sent |
| after Yusuf | `Input device pill` | A S3 Microphone |

`A S3 Microphone` names no patient; `A S2 Home / schedule, Marcus sent` is a schedule frame, not a Marcus patient frame.

### 4. Row names

Set once on the `Visit/Drawer` `Mode=list` master, so **all six chart lists in the file followed with no override** — Marcus's three, Yusuf's, and Colette's two. Verified by reading the labels off every list: none still shows "Sheet 5" to "Sheet 9". The layer names were renamed to match. The rows keep **no reaction**.

### 5. The wiring, read back

Eight destinations written, each built fresh against the `actions` array (note 49), each read back **by name from both the `action` alias and the `actions` array**, which **agreed on all eight**:

| # | frame | node | from | to |
|---|---|---|---|---|
| 1 | A4 Colette / after Marcus | `Visit/Chart row · Medications` | nothing | A4 Colette / medications, after Marcus |
| 2 | A4 Colette / medications, after Marcus | `Back tap target 48` | A4 Patient / list | A4 Colette / after Marcus |
| 3 | A4 Colette / medications, after Marcus | `Back to patients` | A S2 Home / schedule | A S2 Home / schedule, Marcus sent |
| 4 | A4 Colette / medications, after Marcus | `Start recording CTA` | A S5 Recording / recording | **nothing** |
| 5 | A4 Colette / after Yusuf | `Visit/Chart row · Medications` | nothing | A4 Colette / medications, after Yusuf |
| 6 | A4 Colette / medications, after Yusuf | `Back tap target 48` | A4 Patient / list | A4 Colette / after Yusuf |
| 7 | A4 Colette / medications, after Yusuf | `Back to patients` | A S2 Home / schedule | A S2 Home / schedule, both sent |
| 8 | A4 Colette / medications, after Yusuf | `Start recording CTA` | A S5 Recording / recording | **nothing** |

---

## What was found

### `strokeBottomWeight` is overridable on an instance child

Probed rather than assumed, because trap 13's neighbourhood is unreliable: setting `strokeBottomWeight = 0` on a row wrapper **inside** the swapped sheet instance took and read back 0. That is what lets the last *visible* row drop its divider per instance — row 4 on Marcus's, row 3 on Colette's — which is how the rebuilt NPVE sheet ends its list.

### The NPVE footer label

Covered above and logged. Not changed: read-only file, and whether NPVE wants sentence case in a footer action belongs to that file's owner.

---

## Verification

- **Counts** read before the first write and after the last: 48 → 50 children, 40 → 42 frames, 130/126 → **138/134**, 36 → **38** destinations, zero off-page, two starting points unchanged.
- **Clone integrity measured**: 57 componentPropertyReferences and 4 reactions on the source and on both Colette clones.
- **Every chart list re-read** after the rename: 6 lists, none still showing "Sheet 5"–"Sheet 9".
- **Row geometry read back**: wrapper 72, `List/Item` 71 filling it, stroke 0/0/1/0 INSIDE bound `color/divider`, sheet 358 × 288 with four rows and 358 × 216 with three.
- **Sheet swap read back** on both Marcus frames: `Sheet#48:4` 48:141 → 272:396, and the eight visible strings on each.
- **All eight destinations read back by name from both reaction representations.**
- **Four Medications frames rendered at 1x and looked at**, plus one chart list per patient, plus the NPVE comparison.

---

## What I believe but did not see

- **The prototype was not played.** The Colette Medications loop is traced through stored destinations.
- **The legacy sheet is an image**, so its fields were read from pixels, not nodes. A field hidden under another in that snapshot would not show up.
- **The medication data is Daniel's**, invented for the demo, and describes no real person or prescription.
- **`A5 Paused / drawer list`'s Medications row is still inert**, as it was before this batch — the paused chart has never opened a sheet, and the brief did not ask to change that.
- **Rows 10 to 14 still read "Sheet 10" to "Sheet 14".** Only 5 to 9 were in scope.
- **The NPVE file was not written to.** Everything from it was read; the two differences found there are reported, not fixed.

---

## Renders

- `figma-export/medications-sheet-2026-09-17/` — the NPVE comparison, both Marcus and Colette Medications frames, and one chart list per patient
- `reports/Make the Medications sheet real.png` — the NPVE rebuild beside both Medications frames and both chart lists
