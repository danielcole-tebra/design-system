# Add a current time marker to the schedule

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319, `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw` read only

Four items, all four done. One probe along the way found that a note in PLUGIN-NOTES.md is backwards, which is the more useful half of this report.

---

## Before and after

| | before | after |
|---|---|---|
| Children on `Account screens` | 48 | **48** |
| Frames | 40 | **40** |
| Reactions | 130 across 126 | **130 across 126** |
| Destinations | 36 | **36** |
| Off-page destinations | 0 | **0** |
| Starting points | `Account device`, `Schedule` | **unchanged** |
| Local components | 43 | **44** |
| `Archive` frames | 26 | **27** (the proof frame) |

The wiring was not touched, and the four marker instances carry **zero reactions**.

---

## What was built

### 1. The component

**`Schedule/Now marker` 257:6162**, in the `Schedule/` group on `Components` at **(1300, 2174)** — 80 to the right of `Schedule/End of list`, which is where the band ended.

| | |
|---|---|
| component | **390 × 8** |
| `Line` | 390 × 2 at (0, **3**) — full width |
| `Dot` | 8 × 8 at (**12**, 0) |
| both bound | **`color/primary/main`** #004852, read back (0, 72, 82) |
| line centre | local y **4** |
| dot centre | local y **4** |

**The height is 8, and that is the answer to "choose the height so the line's centre falls on an integer".** The dot is the taller of the two parts, so the box cannot be smaller than 8; and a 2 px line centred in 8 sits at y 3 with its centre on **4**. Any odd height would have put the centre on a half pixel.

The dot's left edge at 12 puts its centre on **16** — the screen-edge ink line the whole app aligns to — so it straddles the row gutter rather than sitting inside the text column.

**Proof first, as asked.** `PROOF Schedule/Now marker (SCAFFOLDING)` **257:7208** on `Archive` at (0, 20000): a paper-filled 390 × 160 frame with a 1 px `color/divider` rule for comparison and the instance below it, rendered at **4x** and read. The instance reads 390 × 8, `Line` 390 × 2 at y 3, `Dot` 8 × 8 at x 12, both on `color/primary/main`. Against the 1 px grey the 2 px teal reads as deliberately heavier without shouting.

### 2. Placement

One instance per schedule frame, each the **last child of `Schedule content`** (so topmost in layer order) with **`layoutPositioning: ABSOLUTE`**.

| frame | instance | stack y | line centre | boundary |
|---|---|---|---|---|
| A S2 Home / schedule | 257:8927 | 284 | **288** | Renata Ilves 216–288 \| Marcus Vance 288–360 |
| A S2 Home / schedule, top | 257:8930 | 284 | **288** | Renata Ilves \| Marcus Vance |
| A S2 Home / schedule, Marcus sent | 257:8933 | 356 | **360** | Marcus Vance 288–360 \| Colette Mwangi 360–432 |
| A S2 Home / schedule, both sent | 257:8936 | 356 | **360** | Marcus Vance \| Colette Mwangi |

The line centre matches the boundary exactly on all four — computed from the rows in the file, not assumed.

**It does not push rows apart.** `Schedule content` reads **1106 before and 1106 after** on all four frames, with 15 children before and 16 after. That is the whole point of the absolute positioning, and it is measured rather than asserted.

**Constraints: `STRETCH` horizontal, `MIN` vertical**, set on each instance. MIN holds the marker's offset from the content top, which is the right anchor while the rows above it are fixed; STRETCH lets the 390 line follow the container if it ever changes width. **What MIN does not survive is a row inserted above the marker** — nothing in Figma can express "after the fourth row", only "284 from the top" — so the marker is re-placed by hand whenever the morning changes. That limit is in COMPOSITIONS.md rather than left implicit.

### 3. Visible on all four, including at the −252 offset

| frame | offset | line centre in frame | window y | clear of the date header by |
|---|---|---|---|---|
| A S2 Home / schedule | −252 | 267 | **36** | 36 |
| A S2 Home / schedule, top | 0 | 519 | **288** | 288 |
| A S2 Home / schedule, Marcus sent | −252 | 339 | **108** | 108 |
| A S2 Home / schedule, both sent | 0 | 591 | **360** | 360 |

The scroll window is 613 tall and starts at frame y 231, immediately under the pinned date header. **Nothing is hidden**, and the offsets were not touched. The tightest case is `/ schedule`, where the marker sits 36 px into the window, directly under the half-cut Renata Ilves row that is the peek cue — visible and, in the render, legible.

Confirmed in pixels on all four frames rather than derived:

- exactly **two rows** of (0, 72, 82) at the expected centre — 266–267, 518–519, 338–339, 590–591 — with white immediately above and below;
- sampling a row **above** the line, where only the dot is inked, the dot spans x **12–19**; down its centre column it spans **8 rows**, centred on the line.

### 4. COMPOSITIONS.md

Added, with the reasoning for the 8 px height, the gutter position, the boundary-not-proportional decision, and the constraint limit.

---

## What was found

### Trap 13 is backwards for a top-level instance

PLUGIN-NOTES.md trap 13 reads: *"constraints cannot be overridden on an instance, only fills; set them on the master."*

Following it produced an instance with the wrong constraints, and the probe showed why:

| | result |
|---|---|
| master 257:6162 set to | `STRETCH / MIN` |
| fresh `createInstance()` reads | **`MIN / MIN`** — the master's value is not inherited at all |
| `instance.constraints = {STRETCH, MIN}` | **no throw**, reads back **`STRETCH / MIN`** |

So for an instance placed directly in a frame, **the master route is the one that fails and the instance route is the one that works** — the exact opposite of the note.

**Scoped rather than overturned.** The original note presumably came from an instance nested **inside another instance**, where override rules genuinely are tighter — the same distinction trap 18 draws for `resize()`. Trap 13 was amended with both halves and the scope, and logged as `mobilePlugin_trap13BackwardsForTopLevelInstances`.

Had the note been trusted and the result not read back, all four markers would have shipped on `MIN / MIN` and nothing would have looked wrong until the container resized.

---

## Verification

- **Counts** read before the first write and after the last: 48 children, 40 frames, **130 reactions across 126 owners**, 36 destinations, zero off-page, two starting points — all unchanged, as they should be for a batch that adds no wiring.
- **Instance count**: exactly **4** instances of the master on `Account screens`, one per schedule frame.
- **Integer geometry** on all four instances and their children — instance box, line and dot, 12 values each: **4 of 4 pass**.
- **Stack height read before and after** on all four: 1106 → 1106.
- **Line centre against row boundary** computed from the rows as they are in the file: equal on all four.
- **Pixels, not only the tree**: two-row teal line at the expected centre on all four; dot isolated at x 12–19 and 8 rows tall.
- **The proof instance was read and rendered at 4x before anything was placed**, and all four schedule frames were rendered at 1x and looked at before this was written.

---

## What I believe but did not see

- **The prototype was not played**, so "scrolls with the list" is asserted from the marker being an absolutely-positioned child of the scrolling stack rather than of the scroll window, not from dragging it.
- **STRETCH was not exercised.** The container is 390 and the marker is 390, so the constraint is a statement of intent; no resize was performed to prove it behaves.
- **The boundary positions encode a clock that exists only in the copy** — "now" is between 10:20 and 11:00 on two frames and between 11:00 and 11:30 on the other two, because that is what the demo says has happened. Nothing in the file computes it.
- **The empty day was not touched**, as ruled; I confirmed it has no marker by not adding one, not by re-reading it.
- **The 4x proof render shows the marker against paper**, which is the row colour; I did not proof it against the beige that shows at the top of `/ schedule` above the first row.

---

## Renders

- `figma-export/now-marker-2026-09-17/` — the four schedule frames at 1x and the proof frame
- `reports/Add a current time marker to the schedule.png` — the four side by side, with the proof strip below
