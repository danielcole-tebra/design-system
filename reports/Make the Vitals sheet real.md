# Make the Vitals sheet real

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319 · reference `fdCQVFdvOByaOYIJYag0d6` 846:13017, read only · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Two rulings, four items, all four done.

---

## The reference, and why the batch did not stop

The brief said the rebuilt Vitals sheet body "may be named Vitals or Health status/observations", and to stop if there was more than one candidate. **There are two nodes on `Templates` that answer to those names. They are two different sheets, not two names for one**, so nothing was ambiguous once they were read.

| node | section | what it actually holds |
|---|---|---|
| `Health status/observations body` **412:3889** | `14 · Health Status/Observations` | Disability Status "Not disabled", Cognitive/Mental Status "Normal cognitive functioning", Functional Status "Independent in activities", then a **Functional Observations** heading over an empty "Add observation" field. **No vitals.** |
| `Vitals/Body` **846:13017** | `31 · Vitals` 816:12438 | the rebuilt Vitals sheet |

Only one is a Vitals sheet, so `Vitals/Body` **846:13017** was taken and the batch continued. This is also what Daniel's ruling implies: Vitals *takes the row that read* "Health status/observations", which only makes sense if the two are different sheets and one is displacing the other.

**Page:** `Templates` 3:2. **Name:** `Vitals/Body`, a 518 × 352 COMPONENT.

**Hierarchy**, top to bottom:

```
Vitals/Body 846:13017
├─ Alert            846:12881   hidden by default — "S. Strange recorded vitals 14 min ago" + PULL NEW DATA
├─ Quick entry      846:12897   library Text field, floating label "Quick Entry", value "bp 128/52 hr 120 wt 186"
├─ Disclosure       846:12918   text button "Or Use Editor" + ExpandMore
└─ List             846:12925   instance of Vitals/List 842:12692, five Vitals/Row instances
      Row · Weight → Row · BP → Row · HR → Row · Temp → Row · SpO2
```

**A row**, left to right: `Label` (uppercase, e.g. `WEIGHT`) → `Measures` [ `Value and unit` (large value, smaller unit) → `Delta slot` → `Date slot` ] → `Sparkline` (an FPO placeholder) → `Action slot` (empty, and itself labelled with a GAP marker in that file).

**Fields and order as drawn:**

| # | label | value | unit | delta | date |
|---|---|---|---|---|---|
| 1 | WEIGHT | 182 | lbs | +4 | 4/11/26 |
| 2 | BP | 128/82 | mmHg | +4 / −4 stacked | 4/11/26 |
| 3 | HR | 76 | bpm | +4 | 4/14/26 |
| 4 | TEMP | 96.2 | F | +4 | 4/14/26 |
| 5 | SPO2 | 98 | % | +4 | 4/14/26 |

A `Vitals/Body` **Alert** variant adds the alert above Quick Entry and grows to 416. The sheet the shell shows is `_Rebuild comparison/Rebuild/Vitals` 851:14209, with an **Add Section To Note** footer.

Render: `figma-export/vitals-sheet-2026-09-17/npve-vitals-sheet-proof.png`, from the file's own `PROOF · Vitals sheet on paper 2026-09-15` 851:14560.

---

## The two orderings, which cannot both be honoured

The brief said to **follow the rebuilt NPVE sheet's order** and also **supplied the rows in a different order**.

| | order |
|---|---|
| rebuilt NPVE | weight, BP, HR, temp, SpO2 — **five rows, no respiratory rate** |
| Daniel's list | blood pressure, heart rate, temperature, **respiratory rate**, SpO2, weight — six rows |

**The supplied list was followed.** It is the more specific instruction, and NPVE's order cannot order a row NPVE does not contain. Reported rather than reconciled silently, and logged as `mobileVitals_rowOrderDepartsFromNpve`.

---

## Before and after

| | before | after |
|---|---|---|
| Children on `Account screens` | 50 | **54** |
| Frames | 42 | **46** |
| Reactions | 138 across 134 | **157 across 153** |
| Destinations | 38 | **42** |
| Off-page destinations | 0 | **0** |
| Starting points | `Account device`, `Schedule` | **unchanged** |
| Local components on `Components` | 40 top-level | **41 top-level** (74 counting variants) |
| Visible chart rows per list | 14 | **9** |

Accountable: four cloned frames bring 4 + 5 + 3 + 3 = 15 reactions, and four Vitals rows gain one each. 138 + 15 + 4 = 157.

---

## What was built

### 1. The row list

On the `Visit/Drawer` `Mode=list` master **48:814**:

- `Visit/Chart row · Health status/observations` **177:5316** renamed **Vitals** — the layer name, and the label through the exposed `List/Item`'s `Primary#174:0`. **Position 8 is unchanged**; it still sits between External care history and Social history.
- `Visit/Chart row · Sheet 10` **177:5336** through `· Sheet 14` **177:5376** set `visible = false`. **Not deleted** (rule 1); they are still in the tree.

**All six chart lists followed with no override**, read back from the instances rather than the master:

| list | rows | ends at | Vitals at |
|---|---|---|---|
| `A4 Patient / list` 103:3029 | 9 | Social history | 8 |
| `A5 Recording / drawer list` 103:3044 | 9 | Social history | 8 |
| `A5 Paused / drawer list` 103:3056 | 9 | Social history | 8 |
| `A4 Yusuf / list, not sent` 200:6709 | 9 | Social history | 8 |
| `A4 Colette / after Marcus` 246:4992 | 9 | Social history | 8 |
| `A4 Colette / after Yusuf` 246:4997 | 9 | Social history | 8 |

**The height, measured.** Nine rows are 432 in a 543 `Sheet list`, so the list **no longer scrolls**. On the four frames whose drawer sits at y 201, the last row's bottom lands on **711** against a `Footer band` top of **722** — **11 px clear**, confirmed in the render. On the two recording frames there is no footer band at all.

**The one frame where it does not end cleanly** is covered under *What was found*.

### 2. The sheet

**`Visit/Sheet/Vitals` 273:9321**, on `Components` in the `Visit/` band at **(3554, 0)**: **358 × 432**, six rows at **72**.

It was made by **cloning `Visit/Sheet/Medications` 272:396** and adding two rows, rather than by re-describing the construction — so the FIXED 72 wrapper, the 1 px INSIDE bottom stroke bound `color/divider` and the FILLing library `List/Item` at `Lines=Two` with `Show icon` off are the same objects, not a second copy of the same intention. `componentPropertyReferences` went 12 on the source to 18 on the clone, which is 3 per row in both cases — nothing dropped.

| row | primary | secondary |
|---|---|---|
| 1 | Blood pressure 124/78 mmHg | Sitting, left arm |
| 2 | Heart rate 72 bpm | Regular |
| 3 | Temperature 98.6 °F | Oral |
| 4 | Respiratory rate 16 /min | — |
| 5 | SpO2 98% | Room air |
| 6 | Weight 182 lb | BMI 26.1 |

**Row 4 has no secondary line. What was done:** that row alone is set to **`Lines=One`**, the library's own affordance, so its single line **centres in the 72** instead of sitting on the two-line baseline with a blank beneath it. The alternative — keeping `Lines=Two` and hiding the `Secondary` node — was not used, because it reaches inside the library row to do what the row already has a property for. Its `Secondary#174:3` was then **blanked**, because the clone arrived carrying `"tablet, every 4 hours as needed for cough"` from the medication row it was cloned from, and that string would have surfaced if anyone ever switched the row back to `Lines=Two`.

**The last visible row drops its divider**, and here that is set **on the master** — `strokeBottomWeight = 0` on row 6 — rather than per instance as Medications does it. Medications varies its row count per patient, so it has to hide the stroke wherever the list happens to end; Vitals is six rows on all four frames, so the component can carry it.

**The library expressed every row.** No GAP was needed for the rows themselves and nothing is labelled SCAFFOLDING. The GAP is in what the row cannot carry beside the text, below.

### 3. The frames

Four clones, each with `Visit/Sheet/Vitals` swapped into the drawer's `Sheet#48:4` slot and the drawer title set to **"Vitals"** (it read "Medications" on all four before).

| clone | id | from | at |
|---|---|---|---|
| `A4 Patient / vitals` | **273:9376** | `A4 Patient / placeholder` 103:3032 | (5060, 3132) |
| `A5 Recording / vitals` | **273:9519** | `A5 Recording / medications` 103:3048 | (3650, 4176) |
| `A4 Colette / vitals, after Marcus` | **273:9637** | `A4 Colette / medications, after Marcus` 272:3459 | (5530, 3132) |
| `A4 Colette / vitals, after Yusuf` | **273:9780** | `A4 Colette / medications, after Yusuf` 272:3602 | (6000, 3132) |

Each sits at the end of its own row, on the page's 470 pitch (390 frames, 80 apart) — which is where Colette's Medications frames were put for the same reason: the Patient row has been full since the Medications batch.

**Clone integrity, source and clone, as the brief asked:**

| clone | `componentPropertyReferences` | reactions |
|---|---|---|
| `A4 Patient / vitals` | 47 → **47** | 4 → **4** |
| `A5 Recording / vitals` | 35 → **35** | 5 → **5** |
| `A4 Colette / vitals, after Marcus` | 47 → **47** | 3 → **3** |
| `A4 Colette / vitals, after Yusuf` | 47 → **47** | 3 → **3** |

**Nothing was dropped, so nothing was rebound.** Rule 8's loss is specific to cloning a variant inside a COMPONENT_SET (trap 12), and these are top-level frames; the counts are the check, and blindly re-applying would have doubled what survived. `flowStartingPoints` was read before and after and is unchanged at two, by nodeId not by name (trap 46).

**Colette's rows** were overridden with her values on both her frames:

| row | primary | secondary |
|---|---|---|
| 1 | Blood pressure 142/88 mmHg | Sitting, left arm |
| 2 | Heart rate 78 bpm | Regular |
| 3 | Temperature 98.4 °F | Oral |
| 4 | Respiratory rate 16 /min | — |
| 5 | SpO2 97% | Room air |
| 6 | Weight 176 lb | BMI 29.3 |

### 4. The wiring

Four reactions, each built fresh against the `actions` array (note 49) and read back **by name from both the `action` alias and the `actions` array**, which **agreed on all four**:

| # | frame | node | before | after |
|---|---|---|---|---|
| 1 | A4 Patient / list | `Visit/Chart row · Vitals` | nothing | **A4 Patient / vitals** |
| 2 | A5 Recording / drawer list | `Visit/Chart row · Vitals` | nothing | **A5 Recording / vitals** |
| 3 | A4 Colette / after Marcus | `Visit/Chart row · Vitals` | nothing | **A4 Colette / vitals, after Marcus** |
| 4 | A4 Colette / after Yusuf | `Visit/Chart row · Vitals` | nothing | **A4 Colette / vitals, after Yusuf** |

**That is exactly where Medications is wired**, and nowhere else: the Vitals row is inert on `A5 Paused / drawer list` and on `A4 Yusuf / list, not sent`, as Medications is.

**Every reaction on each Vitals frame, read back.** All of them came across with the clone, and back already returned to the chart frame the Vitals row is tapped on, so nothing needed rewriting:

| frame | node | to |
|---|---|---|
| A4 Patient / vitals | `Back tap target 48` (drawer back) | **A4 Patient / list** |
| | `Back to patients` | A S2 Home / schedule |
| | `Input device pill` | A S3 Microphone |
| | `Start recording CTA` | A S5 Recording / recording |
| A5 Recording / vitals | `Back tap target 48` | **A5 Recording / drawer list** |
| | `Visit/Recording bar` | A S5 Recording / recording |
| | `Pause` | A S5 Recording / paused |
| | `Stop` | A S6 Stop confirmation / overlay (OVERLAY) |
| | `Puller zone` (ON_DRAG) | A S5 Recording / recording |
| A4 Colette / vitals, after Marcus | `Back tap target 48` | **A4 Colette / after Marcus** |
| | `Back to patients` | A S2 Home / schedule, Marcus sent |
| | `Input device pill` | A S3 Microphone |
| A4 Colette / vitals, after Yusuf | `Back tap target 48` | **A4 Colette / after Yusuf** |
| | `Back to patients` | A S2 Home / schedule, both sent |
| | `Input device pill` | A S3 Microphone |

There is nothing to do for "close": no sheet or drawer in this file has a close button (ruling N1, 2026-09-16); both masters' `Close` nodes are hidden and labelled SUPERSEDED.

---

## What was found

### The NPVE fields these rows do not cover

The brief asked for this list. Seven parts of the rebuilt sheet were dropped, each with a reason, and logged as a GAP:

| dropped | why |
|---|---|
| **Quick Entry** field | an entry affordance; the mobile chart is read-only |
| **"Or Use Editor"** disclosure | same |
| the **alert** and its **Pull New Data** action | an action, and it names a provider the mobile demo does not have |
| per-row **delta** (`Vitals/Delta` 816:12450, stacked 817:12451) | a two-line `List/Item` has one primary and one secondary slot and **no trailing region** |
| per-row **date** | same |
| per-row **sparkline** (`Vitals/FPO sparkline` 823:12487) | same — and it is an FPO placeholder in NPVE too |
| per-row **action slot** | every ported sheet drops actions (§6.4) |
| **Add Section To Note** footer | same |

One difference that is not a drop: NPVE sets the measure as an **uppercase label** beside a large value and a smaller unit; the mobile row puts **name, value and unit on one primary line** in the row's own type, because that is how the Medications sheet already reads and the drawer is 358 wide, not 518.

### `A4 Yusuf / list, not sent` now ends at Vitals — DEFECT

His drawer starts at **y 265** rather than 201, to clear the not-sent alert, and is 579 rather than 643 tall. With rows 10 to 14 hidden the nine rows run **343 to 775** while the `Footer band` starts at **722**. So **Vitals is the last row that shows, and Social history sits entirely behind the band** — and because the list is now 466 of content in a 501 area, it **no longer scrolls**, so there is no way to reach it.

Before this batch the same rows sat in the same places, but the list overflowed (706 in 501) and could be scrolled down to them. Hiding five rows removed the scroll, and with it the only way past the footer.

**Nothing was changed.** How a drawer shortened by an alert should end is a design question, and his chart is inert either way — only back and the alert are wired there. Raised in `mobile-plan.md` and as `mobileVitals_yusufListCannotReachSocialHistory`.

### A new plugin trap: an INSTANCE_SWAP carried the old component's text overrides

Swapping `Sheet#48:4` from `Visit/Sheet/Medications` to `Visit/Sheet/Vitals` on Colette's two frames left rows 1 to 3 reading **Metformin 500 mg**, **Amlodipine 5 mg** and **Chlorthalidone 25 mg** on a sheet whose own rows say blood pressure, heart rate and temperature — the three rows she had overridden, and only those.

No layer name matches (`Medication row 1..4` against `Vitals row 1..6`) and no node id matches, so **trap 42's name-matching rule does not explain it**; a component cloned from another evidently keeps enough of its origin for the override map to follow. Rows 4 to 6, which she had never overridden, came through clean, and her row-4 **visibility** override did **not** follow — so it is the text overrides specifically. The Marcus frames, which carried no overrides, were clean.

Caught by reading every slot back before writing. All six rows were overwritten on both frames. Written up as **PLUGIN-NOTES trap 50**.

---

## Verification

- **Counts** read before the first write and after the last: 50 → 54 children, 42 → 46 frames, 138/134 → **157/153** reactions, 38 → **42** destinations, zero off-page, two starting points unchanged by nodeId.
- **`figma.skipInvisibleInstanceChildren = false`** set at the top of every read, and effective visibility computed by walking to the page rather than trusting `node.visible` (trap 39).
- **Every chart list re-read from the instance** after the rename and the hide: six lists, nine rows each, Vitals at position 8, Social history last.
- **Row geometry read back** on every instance: wrapper 72 FIXED, `List/Item` 71 FILLing it, stroke 0/0/1/0 INSIDE bound `color/divider`, row 6 at 0/0/0/0, sheet 358 × 432.
- **Clone integrity measured** on all four frames, `componentPropertyReferences` and reactions, source against clone.
- **Sheet swap and drawer title read back** on all four frames: `Sheet#48:4` 272:396 → 273:9321, title "Medications" → "Vitals".
- **All four destinations read back by name from both reaction representations**, plus every inherited reaction on each Vitals frame.
- **Rendered and looked at**: the four Vitals frames, the Vitals component at 2x, `A4 Patient / list`, `A4 Yusuf / list, not sent`, and the NPVE proof.

---

## What I believe but did not see

- **The prototype was not played.** The Vitals loop is traced through stored destinations, not tapped.
- **The vitals data is Daniel's**, invented for the demo. It describes no real person and no real measurement.
- **The NPVE file was not written to.** Everything from it was read; the ordering difference and the missing respiratory rate are reported, not fixed.
- **`Vitals/Body`'s Alert variant was not ported.** It is hidden by default in NPVE and the mobile chart drops alerts with the rest of the actions; nobody asked for it.
- **The two rows below the fold on `A4 Yusuf`** are the only thing this batch changed for the worse, and that frame's chart was already inert.
- **Rows 10 to 14 are hidden, not deleted**, so anything that later reads the master's children without checking visibility will still count fourteen.

---

## Renders

- `figma-export/vitals-sheet-2026-09-17/` — the NPVE proof, the Vitals component at 2x, the four Vitals frames at 2x, and the Marcus and Yusuf chart lists
- `reports/Make the Vitals sheet real.png` — the NPVE sheet beside the chart list, Marcus's Vitals, Colette's Vitals and the recording-screen Vitals
