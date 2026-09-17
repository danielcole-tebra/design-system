# Dim the page behind the open chart

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

One ruling, five items, all five done. Twelve frames, identical again.

---

## What the enumeration found

All twelve, the same:

| part | before |
|---|---|
| `Visit/Patient header` | 390 × **265** at y 0 |
| its identity row's bottom | **147** |
| `Drawer` | **579** at y **265** |
| `Sheet body` / `Sheet list` | **501**, bottom padding **34** |
| beneath | three hidden SUPERSEDED nodes — the old recording bar, the footer band, the CTA |

Z-order was `[superseded bar, superseded band, superseded CTA, Visit/Patient header]` with the drawer somewhere in the middle — **the header sat on top**, because the previous batch appended it last. That mattered: a scrim added on top would have been covered by the header. The order was rebuilt to `[…superseded…, header, Scrim, Drawer]`.

---

## 1. Scrim

**The library's backdrop colour: `color/computed (no palette)/alphaBlack50`.**

| | |
|---|---|
| variable | `color/computed (no palette)/alphaBlack50` |
| key | `482703044f1cfd379642fc2f19930975d652abb0` |
| remote | yes — the library's |
| **stored rgba** | **`{r: 0, g: 0, b: 0, a: 0.5}`** |

**Alpha lives in the variable** (rule 5). It is MUI's `Backdrop` default: TEBRA-DESIGN-SYSTEM §2.3 files `rgba(0,0,0,0.5)` under *computed values with no palette home*, and §3.23 confirms the dialog scrim is "`Backdrop`'s `rgba(0,0,0,0.5)`, rendered at runtime by `Modal`". **No GAP was needed and nothing was labelled SCAFFOLDING.**

**The file already had three scrims** — `A S5 Recording / microphone`, `A S5 Paused / microphone` and `A S9 Account / sign-out warning` — all binding that variable and all carrying a paint opacity of 0.5 alongside it. So rather than build new rectangles, the twelve are **clones of 163:2904**, the sign-out warning's scrim. Every scrim in the file is now the same object, and trap 43's measurement — that the stored alpha and the paint opacity are not multiplied, so it renders at 0.5 once — carries over unchanged.

One per frame, **390 × 844**, named `Scrim`, **above the header and below the drawer**.

## 2. Drawer

| | before | after |
|---|---|---|
| top | 265 | **147** — the identity row's bottom |
| height | 579 | **697** |
| `Sheet body` / `Sheet list` | 501 | **619** |
| bottom padding | 34 | **34, unchanged** |

The padding still clears only the home indicator, which is still the only thing covering the bottom edge. Nothing else changed about it.

## 3. At the new height

| sheet | content | area | scrolls? | last content bottom |
|---|---|---|---|---|
| chart list, 9 rows | 466 | 619 | **no** | **657** |
| summary, Marcus | 1309 | 619 | **yes** | **794** (the feedback block) |
| summary, Colette | 1165 | 619 | **yes** | **794** |
| Medications, Marcus | 330 | 619 | no | **521** |
| Medications, Colette | 258 | 619 | no | **449** |
| Vitals, both | 474 | 619 | no | **665** |

**The chart list still does not scroll.** The summary's scrolled end is unchanged at 794 — 16 above the home indicator — because the sheet's own 50 of padding did not move; only the window it scrolls in got taller.

## 4. Wiring

| | |
|---|---|
| **Scrim, tap** | that patient's landing frame, `SMART_ANIMATE / EASE_OUT / 0.225` |
| **Puller zone, drag down** | the same landing frame, unchanged |
| Start Encounter, pills, Back to patients | reactions left as they were |
| Drawer back, every sheet row | unchanged |

| frame group | scrim and puller go to |
|---|---|
| Marcus's four | `A4 Patient / landing` |
| Colette's four, after Marcus | `A4 Colette / landing, after Marcus` |
| Colette's four, after Yusuf | `A4 Colette / landing, after Yusuf` |

**Nothing on Colette's path reaches a Marcus frame** — checked against all five Marcus frame ids, zero hits.

**Does the scrim block the header's buttons in Figma's prototype?** **Yes.** The scrim covers the whole frame and sits above the header in z-order, and Figma gives a tap to the topmost node carrying a reaction. So `Start encounter CTA` and `Back to patients` keep their destinations in the file but cannot be reached while the drawer is open — which is what makes it modal, and why Start Encounter is reached by closing it. **This was reasoned from z-order, not played**; see below.

## 5. Counts, with the arithmetic

| | before | after |
|---|---|---|
| Children on `Account screens` | 57 | **57** |
| Frames | 49 | **49** |
| Reactions | 195 | **207** |
| Nodes with reactions | 188 | **200** |
| Destinations | 45 | **45** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |

- **Children and frames unchanged** — the twelve scrims are children of frames, not of the page.
- **+12 reactions on +12 nodes** — one scrim tap each. 195 + 12 = **207**; 188 + 12 = **200**.
- **Destinations unchanged at 45** — the three landing frames were already destinations, from the schedule rows, the Next Patient CTAs and the pullers.
- **Starting points read by nodeId** (trap 46): `Account device` 103:2320, `Schedule` 204:4082.

**Every destination read back by frame name from both `action` and `actions`** (note 49). They agreed on all twelve.

---

## What was found

### The header's live reactions are under the scrim — DEFECT

`Start encounter CTA` on Marcus's four frames and `Back to patients` on all twelve were left wired, as the brief directed. They are now covered by the scrim, which carries its own tap, so **sixteen live reactions resolve to the scrim's destination rather than their own** — on top of the 28 already sitting on hidden nodes from the previous batch.

That is the intended behaviour. It is worth recording anyway, because the file now says three different things in three places: the node says "go to A S5 Recording / recording", the z-order says "go to the landing page", and only the render tells you which. **Not executed** — the plugin API cannot run a prototype, so the hit-testing is reasoned from z-order. It is the first thing to check on a phone. `mobileChart_headerReactionsAreUnderTheScrim`.

### The drawer now runs 189 px past the chart list — GAP

Nine rows end on 657 inside a drawer that reaches 844. What was 35 px of *page* below the last row is now **153 px of paper inside a modal surface**, which reads differently: a page can simply end, a modal that ends well below its content looks like it is waiting for something. The closing-line question from the previous batch is the same question, asked louder. `mobileChart_drawerRunsWellPastTheChartList`.

### The z-order had to be rebuilt, and that is not obvious from a read

The header was the last child and therefore on top — correct while the drawer began at 265 and never overlapped it, silently wrong the moment a scrim was added. A tree read shows the order but not the consequence; only the intended stacking tells you which. Worth knowing for the next frame that gains a layer: **appending puts a node on top, and the previous batch's convenience is the next batch's bug.**

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read, with effective visibility recorded alongside every reaction — which is how the hidden carriers stay distinguishable from the live ones.
- **The backdrop variable resolved from an existing node**, not guessed: read off the three scrims already in the file, then resolved by id to its name, remoteness, key and stored value.
- **Read back on all twelve**: scrim size and bound fill, child order, drawer y and height, `Sheet body` / `Sheet list` height and padding, sheet height and padding, row counts, and computed scroll and last-content positions.
- **Every reaction read back by frame name from both representations**, and Colette's eight frames checked for leaks to any Marcus frame.
- **Counts before the first write and after the last**; starting points by nodeId.
- **Thirteen renders looked at**: all twelve frames, plus Marcus's summary beside his landing page so the open and closed states sit side by side.

---

## What I believe but did not see

- **The prototype was not played.** The scrim's hit-testing over the header, and whether the tap and the drag feel like one surface closing, are both unplayed.
- **The scrim renders at 0.5, not 0.25.** That is trap 43's measurement on this file's existing scrims, inherited by clone rather than re-measured here.
- **Nothing on the landing, recording, paused or Yusuf frames was touched**, as instructed — so the recording screens still show the chart without a scrim, which is correct: the ruling says the recording screen is unchanged.
- **The superseded nodes are still there and still wired.** Every count in this report includes them unless it says otherwise.
- **`A4 Yusuf / list, not sent` now looks less like its siblings than ever** — old header, footer band, no scrim, drawer at 265 for an unrelated reason. It was out of scope and is queued.

---

## Renders

- `figma-export/scrim-2026-09-17/` — all twelve frames and Marcus's landing page, thirteen files
- `reports/Dim the page behind the open chart.png` — the contact sheet, one row per patient path plus the open-beside-closed pair
