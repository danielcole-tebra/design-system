# Give Colette her own summary and match the Sent copy

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw` read only · Daniel saved a named version before the batch

Three rulings, four pieces of work, all four done. The defect the last batch opened is closed: **no Marcus frame is reachable from any Colette frame any more.**

---

## Before and after

| | before | after |
|---|---|---|
| Children on `Account screens` | 46 | **48** |
| Frames | 38 | **40** |
| Reactions | **126 across 122** | **130 across 126** |
| Destinations | 34 | **36** |
| Off-page destinations | 0 | **0** |
| Starting points | `Account device` 103:2320, `Schedule` 204:4082 | **unchanged** |

Accountable exactly: two cloned frames bring 4 reactions each (+8), each loses its Start Recording (−2), the two Colette list frames lose Medications (−2). 126 + 8 − 2 − 2 = 130.

---

## What was built

### 1. Sent copy

`A S8 Sent / sent`'s body 103:2482:

> before — "The note for Marcus Vance is being generated. It'll appear in Unsigned Notes on your desktop shortly."
> after — **"The note for Marcus Vance is being generated. You'll find it in your desktop queue."**

**The spec was already right and the file was wrong**, which is the direction CLAUDE.md's Truth section predicts. §6.6 has read "You'll find it in your desktop queue" since the hand-off was built, and `A S8 Sent / Yusuf` 230:5053 already matched it — only Marcus's frame still carried the older line.

**Every "Unsigned Notes" hit, as asked:**

| page | frame | node | what happened |
|---|---|---|---|
| `Account screens` | A S8 Sent / sent | `Body` 103:2482 | **changed** |
| `Components` | — | — | no hits (189 text nodes searched) |

The brief scoped the search to those two pages. The other three were checked anyway, so the answer is complete:

| page | frame | node | what happened |
|---|---|---|---|
| `Archive` | — | — | no hits |
| `Archive · Visit screens` | V S8 Sent / sent | 43:861 | **left** — archived history, rule 1 |
| `Archive · Screens` | S8 Sent / sent | 9:451 | **left** — archived history, rule 1 |

A re-scan of `Account screens` after the change returns nothing.

### 2. Colette's summary

`A4 Patient / summary` 103:3037 cloned twice onto the A4 row beside her list frames:

- **`A4 Colette / summary, after Marcus` 249:10819** at x 3180
- **`A4 Colette / summary, after Yusuf` 249:10824** at x 3650

**Nothing dropped on either clone** — 53 componentPropertyReferences across 138 nodes and 4 reactions on the source, identical on both. No starting point appeared (trap 46 checked).

Identity set to **Colette Mwangi, DOB 05/09/1968**; the box holds it at **105.66 of ink in the 120 box**, one line. The AI disclaimer is untouched.

The four `Bulleted content` nodes were replaced with Daniel's copy **as instance overrides** on `Visit/Sheet/Patient summary` — **the shared component was not touched**, so Marcus's three summary frames (`A4 Patient / summary`, `A5 Recording / summary`, `A5 Paused / summary`) are unchanged.

Each node's `UNORDERED` list formatting and indentation 1 were **re-applied after the characters were set, and read back**, because setting `characters` is exactly where range formatting tends to be lost. All eight read back `{type: "UNORDERED"}`, indentation 1, `textAutoResize: HEIGHT`, width 358.

| section | Marcus | Colette |
|---|---|---|
| Current Situation | 264 (11 lines) | **192** (8 lines) |
| Key Background | 168 (7) | **144** (6) |
| Active Care Plan | 192 (8) | **168** (7) |
| Progress & Next Steps | 168 (7) | **144** (6) |
| **Sheet total** | **1141** | **997** |

**The brief anticipated a longer body and got a shorter one.** Her sheet is **997** against Marcus's **1141**, in the same **565** scroller with the same 122 bottom padding, so it scrolls the same way and simply ends sooner. Nothing needed changing.

### 3. Colette's wiring

Ten reactions, every one **built fresh against the `actions` array** per note 49, and **every destination read back by name**. None failed.

| # | frame | node | from | to |
|---|---|---|---|---|
| 1 | A4 Colette / after Marcus | `Visit/Chart row · Patient summary` | A4 Patient / summary | **A4 Colette / summary, after Marcus** |
| 2 | A4 Colette / after Marcus | `Visit/Chart row · Medications` | A4 Patient / placeholder | **nothing (inert)** |
| 3 | A4 Colette / summary, after Marcus | `Back tap target 48` | A4 Patient / list | **A4 Colette / after Marcus** |
| 4 | A4 Colette / summary, after Marcus | `Back to patients` | A S2 Home / schedule | **A S2 Home / schedule, Marcus sent** |
| 5 | A4 Colette / summary, after Marcus | `Start recording CTA` | A S5 Recording / recording | **nothing (inert)** |
| 6 | A4 Colette / after Yusuf | `Visit/Chart row · Patient summary` | A4 Patient / summary | **A4 Colette / summary, after Yusuf** |
| 7 | A4 Colette / after Yusuf | `Visit/Chart row · Medications` | A4 Patient / placeholder | **nothing (inert)** |
| 8 | A4 Colette / summary, after Yusuf | `Back tap target 48` | A4 Patient / list | **A4 Colette / after Yusuf** |
| 9 | A4 Colette / summary, after Yusuf | `Back to patients` | A S2 Home / schedule | **A S2 Home / schedule, both sent** |
| 10 | A4 Colette / summary, after Yusuf | `Start recording CTA` | A S5 Recording / recording | **nothing (inert)** |

**Every other reaction the summary clones carried**, as asked: exactly one per frame —

| frame | node | to | points at a Marcus frame? |
|---|---|---|---|
| A4 Colette / summary, after Marcus | `Input device pill` | A S3 Microphone | no |
| A4 Colette / summary, after Yusuf | `Input device pill` | A S3 Microphone | no |

`A S3 Microphone` names no patient, so neither was made inert.

**Both loops traced end to end:**

- Sent / sent → Next Patient → Colette (after Marcus) → Patient summary → her summary → back chevron → her list; "Patients" → schedule, Marcus sent.
- Sent / Yusuf → Next Patient → Colette (after Yusuf) → Patient summary → her summary → back chevron → her list; "Patients" → schedule, both sent.

### 4. The defect is closed

`mobileDemo_coletteChartRowsOpenMarcusSheets` is struck through in FLAGS.md with what closed it. The four reactions that put Marcus's name and data under Colette's are gone: two retargeted to her own summary, two cleared.

`Give Yusuf a patient summary, if his chart should open during the resend demo` is now in the plan's Later list.

---

## What was found

### Marcus's Sent copy wraps to three lines, Yusuf's to two

The two confirmation screens carry the same sentence and no longer have the same shape. In the 326-wide `Copy` column:

- **Marcus**: "The note for Marcus Vance is being generated. You'll find it in your desktop queue." — **3 lines, 72 tall**, with **"queue." alone on the third**.
- **Yusuf**: "The note for Yusuf Bahri is being generated. You'll find it in your desktop queue." — **2 lines, 48 tall**.

Eleven characters of name is the whole difference. Reported rather than reflowed (rule 10): the copy is as Daniel wrote it, and the fixes available — a narrower column, a shorter sentence, or a manual break — are all copy or layout decisions.

### Note 49 held

Every reaction write this batch was built fresh against the `actions` array rather than edited in place, and every destination was read back by name. Ten for ten. The note's rule — *a reaction count is not a check* — is what made the difference; nothing needed a second pass.

---

## Verification

- **Counts** read before the first write and after the last: 46 → 48 children, 38 → 40 frames, 126/122 → **130/126**, 34 → **36** destinations, **zero** off-page, two starting points unchanged.
- **Clone integrity measured**: 53 componentPropertyReferences / 138 nodes / 4 reactions on the source and on both clones.
- **List formatting read back** on all eight bulleted nodes: `UNORDERED`, indentation 1, `textAutoResize: HEIGHT`, 358 wide.
- **The two Colette summary frames are pixel-identical** to each other, and so are the two list frames — PIL difference returns no bounding box on either pair.
- **Integer geometry** on both new frames: 3180 / 3650, y 3132, 390 × 844.
- **All five required frames rendered at 1x and looked at** before this was written.

---

## What I believe but did not see

- **The prototype was not played.** Both loops are traced hop by hop through stored destinations.
- **DOB 05/09/1968 and the whole of Colette's summary are invented for the demo**, supplied by Daniel, and describe no real person.
- **Her drawer below the two wired rows is still Marcus's chart list** — Allergies, Problems, Sheet 5 to 14 — as it is on every patient screen in the file. Those rows have never had destinations, so nothing is reachable; only Patient summary and Medications ever did, and both now behave.
- **Marcus's three summary frames were not re-rendered**, because the override was made on the instances and the shared component was not touched; that they are unchanged is read from the component, not from pixels.
- **The current time marker ruling was recorded, not built.** There is no such marker on any schedule frame yet.

---

## Renders

- `figma-export/colette-summary-2026-09-17/` — both Colette summary frames, both Colette list frames and `A S8 Sent / sent`, all at 1x
- `reports/Give Colette her own summary and match the Sent copy.png` — the five side by side
