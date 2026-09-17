# Enlarge the time marker dot

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319, `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw` read only

One ruling, four items, all four done. Daniel's sketch on the `scratchpad` page 262:7760 was read for reference and not touched; it shows the half-dot at the screen edge, which is what got built.

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
| `Schedule content` stack height | 1106 | **1106** |

Three nodes changed on the master and four instances moved. Nothing else.

**Enumerated from the file**: the master `Schedule/Now marker` **257:6162** and four instances — 257:8927, 257:8930, 257:8933, 257:8936 — found by walking the page and matching `getMainComponentAsync`, not from a remembered list.

---

## What was built

### 1. The master

| | before | after |
|---|---|---|
| component | 390 × **8** | 390 × **16** |
| `Line` | 390 × 2 at (0, **3**), centre y **4** | 390 × 2 at (0, **7**), centre y **8** |
| `Dot` | **8 × 8** at (12, 0), centre (16, 4) | **16 × 16** at (**−8**, 0), centre (**0**, **8**) |
| render bounds | 390 wide | **398** wide |

**The new height is 16 and the line's y is 7.** The height had to grow because the dot is 16 tall and now sets the floor; 16 is then the smallest box that both holds the dot and centres an even-numbered line on an integer — a 2 px line centred in 16 sits at y 7 with its centre on **8**, which is also the dot's centre. Both centres agree, and both are integers.

**The dot overflows the component on the left rather than the component being widened**, as asked. `clipsContent` is false on the master, and its render bounds read **398** against a 390 box — exactly the 8 px of overhang. The line therefore still spans exactly 390 and nothing about the line's geometry had to bend to accommodate the dot.

### 2. The instances

Each moved up 4, so the line's centre holds the boundary it had:

| frame | instance | y before | y after | line centre | boundary |
|---|---|---|---|---|---|
| A S2 Home / schedule | 257:8927 | 284 | **280** | **288** | Renata Ilves \| Marcus Vance |
| A S2 Home / schedule, top | 257:8930 | 284 | **280** | **288** | Renata Ilves \| Marcus Vance |
| A S2 Home / schedule, Marcus sent | 257:8933 | 356 | **352** | **360** | Marcus Vance \| Colette Mwangi |
| A S2 Home / schedule, both sent | 257:8936 | 356 | **352** | **360** | Marcus Vance \| Colette Mwangi |

The instance moved up 4 and the line moved down 4 inside the component, so the two cancel exactly — confirmed below in pixels, where the line's rows are unchanged from the previous batch.

**Constraints re-read on each after the change: `STRETCH / MIN` on all four.** Worth being precise about what that shows. Each instance read `STRETCH / MIN` **before** I re-applied it, so the instance-level constraints **survived the master's resize**. That is the other half of the trap 13 amendment: a master's constraints are still not inherited by a fresh instance, but once set on an instance they persist through a master geometry change. I re-applied them anyway, which was belt and braces rather than a fix.

### 3. Clipping

**`Schedule content` does the clipping** — on every frame it is the innermost ancestor with `clipsContent` true whose left edge is x 0 (204:4373, 204:4217, 227:2432, 230:4689). The scroll frame, the `Content` stack and the screen frame all clip too, and all sit at x 0, but `Schedule content` is the one that gets there first.

Confirmed in pixels as a **true half circle**, not a circle that happens to sit near an edge. Tracing the ink profile down the left edge on `A S2 Home / schedule`:

```
y 259  x 0..3      y 266  x 0..29  <- line
y 260  x 0..5      y 267  x 0..29  <- line
y 261  x 0..6      y 268  x 0..7
y 262  x 0..6      y 269  x 0..7
y 263  x 0..7      y 270  x 0..7
y 264  x 0..7      y 271  x 0..6
y 265  x 0..7      y 272  x 0..6
                   y 273  x 0..5
                   y 274  x 0..3
```

Inked from **x 0** — never negative, because the left half is gone — out to a maximum of **x 7** at the vertical centre, tapering to 3 at top and bottom, across a **16-row** span centred on the line. The same profile on all four frames and in the proof.

**The dot is not clipped anywhere else.** It clears the pinned date header by **28, 280, 100 and 352** px on the four frames and sits fully inside the 613 window on every one, including both −252 frames. Nothing to stop for.

### 4. COMPOSITIONS.md

The now-marker entry amended in place, with the new geometry, what supersedes the old 8 px argument, and the clipping chain.

---

## What was found

Nothing that needed a new flag.

Two things worth having on the record:

**The instance constraints survived the master resize.** Read before re-applying: `STRETCH / MIN` on all four. Combined with the previous batch's finding that a fresh instance comes out `MIN / MIN` regardless of the master, the picture is now complete — instance constraints are set once, on the instance, and then persist.

**The line's pixel rows did not move.** 266–267, 518–519, 338–339 and 590–591 — exactly where the previous batch left them. That is the check that the 4 px instance shift and the 4 px line shift inside the component cancelled; had either been wrong, the line would have drifted off its boundary by 4 or 8.

---

## Verification

- **Counts** read before the first write and after the last: 48 children, 40 frames, **130 reactions across 126 owners**, 36 destinations, zero off-page, two starting points — all unchanged.
- **Master geometry read back**: 390 × 16, line (0, 7) 390 × 2, dot (−8, 0) 16 × 16, both centres on y 8, both still bound `color/primary/main`, render bounds 398.
- **Every instance read back**: x 0, y 280 or 352, 390 × 16, `layoutPositioning ABSOLUTE`, constraints `STRETCH / MIN`, dot x −8, line centre equal to the boundary, dot centre equal to the line centre.
- **Integer geometry** on all four instances and their children, 12 values each: **4 of 4 pass**.
- **Stack height read before and after** on all four: 1106 → 1106.
- **Clipping chain walked** from each instance to its page, and the innermost clipper at x 0 identified by name and id.
- **Pixel profile traced** row by row on `/ schedule` and checked at three rows on the other three, plus the proof.
- **The proof frame on `Archive` was updated and re-rendered at 4x** before the schedule frames were looked at, and all four frames were rendered at 1x and looked at before this was written.

---

## What I believe but did not see

- **The prototype was not played.** No wiring was touched and the counts are unchanged, but the schedule was not scrolled.
- **The clip is attributed to `Schedule content` by walking the ancestor chain**, not by testing — every ancestor from `Schedule content` outward clips and all sit at x 0, so the render would look identical if a different one did the cutting. The visible result is the same either way.
- **`STRETCH` is still not exercised.** The container is 390 and the marker is 390; no resize was performed to prove the constraint behaves.
- **Daniel's sketch was read, not matched pixel for pixel.** It draws the line in salmon and crossing the Marcus Vance row rather than the boundary; the ruling's words governed, and the line stayed teal and on the boundary as ruled.
- **The empty day still has no marker**, confirmed by not adding one rather than by re-reading that frame.

---

## Renders

- `figma-export/now-marker-dot-2026-09-17/` — the four schedule frames at 1x and the proof frame
- `reports/Enlarge the time marker dot.png` — the four side by side, with the proof and a 4x crop of the clipped dot
