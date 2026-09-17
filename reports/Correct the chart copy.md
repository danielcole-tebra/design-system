# Correct the chart copy

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

One ruling, six items, all six done. Four strings changed, three mismatches reported and left alone.

---

## What the enumeration found

### Every medication and dose the summaries name

**Marcus Vance**, read off `I103:3039;48:895`:

| drug | where in the summary | dose and frequency stated |
|---|---|---|
| Acetaminophen | Current Situation, Active Care Plan | **500 mg q6h PRN** |
| Guaifenesin | Current Situation, Active Care Plan | **400 mg q4h PRN** |
| Sertraline | Current Situation / Active Care Plan / Progress | **50 mg** (~2 years) → **titrated to 75 mg at today's visit** → **75 mg** |
| Melatonin | Current Situation, Active Care Plan | **5 mg PRN** / **5 mg PO QHS PRN** |
| Buspirone | Key Background | trial **discontinued** 2023 |

**Colette Mwangi**, read off `I249:10821;48:895` and `I249:10826;48:895`, which are identical:

| drug | where in the summary | dose and frequency stated |
|---|---|---|
| Metformin | Key Background, Active Care Plan | **1000 mg BID**, twice |
| Amlodipine | Current Situation / Active Care Plan | **5 mg daily** → **reduced to 2.5 mg daily** |
| Chlorthalidone | Active Care Plan | **12.5 mg daily, added today** |
| Lisinopril | Key Background | **stopped** 2024, persistent cough |

### Every vital the summaries state

Only two, and one each:

| patient | stated |
|---|---|
| Marcus | **Low-grade fever (100.4°F) at exam** |
| Colette | **Home BP log averaging 138/86 over the past 2 weeks** (and A1c 7.4%, which is a lab, not a vital) |

Neither summary states a heart rate, respiratory rate, SpO2 or weight, so those rows had nothing to check against.

### Every row on the two sheets, and every override

**`Visit/Sheet/Medications` 272:396**, master, four rows — and `A4 Patient / placeholder` 103:3032 and `A5 Recording / medications` 103:3048 carried **no overrides**, so Marcus follows the master exactly.

**Colette's two Medications frames** override rows 1–3 and hide row 4:

| row | master | Colette's override |
|---|---|---|
| 1 | Sertraline 50 mg / tablet, once daily | **Metformin 500 mg / tablet, twice daily with meals** |
| 2 | Melatonin 3 mg / tablet, nightly at bedtime | **Amlodipine 5 mg / tablet, once daily** |
| 3 | Acetaminophen 500 mg / … | **Chlorthalidone 25 mg / tablet, once daily in the morning** |
| 4 | Guaifenesin 400 mg / … | *hidden*, still carrying the master string |

**`Visit/Sheet/Vitals` 273:9321**, master, six rows — Marcus's two frames carry no overrides. **Colette's two Vitals frames override all six rows**, which is the fact item 3 turns on: nothing done to the Vitals master can reach her.

### The feedback prompt

`50:997` inside `Visit/Sheet/Patient summary` 50:969, Akkurat LL Regular 14 / 20, reading **"How would your rate the accuracy of this summary?"** — one node, inherited by all five summary frames.

---

## 1. Marcus, on the masters

| sheet | row | before | after |
|---|---|---|---|
| `Visit/Sheet/Medications` 272:396 | 2 | Melatonin **3 mg** / tablet, **nightly at bedtime** | **Melatonin 5 mg** / **tablet, at bedtime as needed** |
| `Visit/Sheet/Vitals` 273:9321 | 3 | Temperature **98.6 °F** / Oral | **Temperature 100.4 °F** / Oral |

Set on the masters, so both of his frames followed each change with no per-frame work. Sheet heights unchanged at 288 and 432.

## 2. Colette, on both her Medications frames

| frame | row | before | after |
|---|---|---|---|
| `A4 Colette / medications, after Marcus` 272:3459 | 1 | Metformin **500 mg** | **Metformin 1000 mg** |
| `A4 Colette / medications, after Yusuf` 272:3602 | 1 | Metformin **500 mg** | **Metformin 1000 mg** |

Secondary line unchanged on both — "tablet, twice daily with meals" already matched her summary's **BID**. Done per frame because her rows are overrides; the master's row 1 is Marcus's Sertraline and was not touched.

## 3. Confirmed unchanged

Read off her instances, after the master edits:

| frame | row | reads |
|---|---|---|
| `A4 Colette / vitals, after Marcus` 273:9637 | 3 | **Temperature 98.4 °F / Oral** ✓ |
| `A4 Colette / vitals, after Yusuf` 273:9780 | 3 | **Temperature 98.4 °F / Oral** ✓ |
| Both her Medications frames | 2 | **Amlodipine 5 mg / tablet, once daily** ✓ |
| Both her Medications frames | 3 | **Chlorthalidone 25 mg / tablet, once daily in the morning** ✓ |

The Vitals master change did not reach her, as expected: every one of her six Vitals rows is an override.

## 4. Feedback prompt

`50:997`: **"How would your rate the accuracy of this summary?"** → **"How would you rate the accuracy of this summary?"**

Read back on all five summary frames — `A4 Patient / summary`, `A5 Recording / summary`, `A5 Paused / summary` and both of Colette's. Node stays 258 × 40; the line count does not change.

---

## 5. Cross-check

### Medications

| patient | drug | summary | sheet | verdict |
|---|---|---|---|---|
| Marcus | Acetaminophen | 500 mg q6h PRN | 500 mg / every 6 hours as needed for pain | **agrees** |
| Marcus | Guaifenesin | 400 mg q4h PRN | 400 mg / every 4 hours as needed for cough | **agrees** |
| Marcus | Melatonin | 5 mg PO QHS PRN | 5 mg / at bedtime as needed | **agrees — fixed this batch** |
| Marcus | Sertraline | 50 mg, **titrated to 75 mg today** | **50 mg** / once daily | **mismatch, not fixed** |
| Marcus | Buspirone | discontinued 2023 | absent | **agrees** |
| Colette | Metformin | 1000 mg BID | 1000 mg / twice daily with meals | **agrees — fixed this batch** |
| Colette | Amlodipine | 5 mg daily, **reduced to 2.5 mg today** | **5 mg** / once daily | **mismatch, not fixed** |
| Colette | Chlorthalidone | **12.5 mg daily, added today** | **25 mg** / once daily in the morning | **mismatch, not fixed** |
| Colette | Lisinopril | stopped 2024 | absent | **agrees** |

### Vitals

| patient | vital | summary | sheet | verdict |
|---|---|---|---|---|
| Marcus | Temperature | 100.4°F at exam | 100.4 °F / Oral | **agrees — fixed this batch** |
| Colette | Blood pressure | home log averaging **138/86**, 2 weeks | **142/88** / Sitting, left arm | **different measurements** — see below |
| both | HR, RR, SpO2, weight | not stated | — | nothing to check |

### The three that were left alone

**Two of them are the same mismatch.** Marcus's Sertraline and Colette's Amlodipine both hold **the dose from before today's visit**, and in both cases the summary states that earlier dose itself — "partially controlled on Sertraline 50 mg, ~2 years" and "since starting Amlodipine 5 mg daily" — while only the Active Care Plan carries today's change. So the med list reads consistently as **the list as it stood before the visit**, which is a coherent reading, not an error. Whether a mobile med list should show the chart as it stands or as the visit leaves it is a design question, and Daniel's ruling — the summary wins where they differ — does not settle which of the summary's two figures is the one to win. Reported, not resolved (rule 10). `mobileChart_twoDosesArePreVisit`.

**Colette's Chlorthalidone is not that.** Her plan says **"Chlorthalidone 12.5 mg daily added"** and the drug appears nowhere else in her summary, so there is no earlier dose the **25 mg** could be. Under either reading of the list, nothing supports it. That one is a plain error, and the only reason it is still there is that the brief said to report other mismatches and not fix them. `mobileChart_colettesChlorthalidoneHasNoSupport`.

**Colette's blood pressure is not a mismatch, but the row cannot say so.** 142/88 sitting in the office and a 138/86 two-week home average are different measurements and can both be true. The two-line `List/Item` carries a value and **one** qualifier, and the qualifier is already spent on "Sitting, left arm", so nothing in the row distinguishes an office reading from a home average — the rebuilt NPVE row says it with a date and a delta, both of which the mobile port drops. Reported as a GAP. `mobileChart_bloodPressureRowCannotSayWhichReading`.

---

## 6. Wiring

| | before | after |
|---|---|---|
| Children on `Account screens` | 54 | **54** |
| Frames | 46 | **46** |
| Reactions | 157 across 153 nodes | **157 across 153** |
| Destinations | 42 | **42** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |

**Nothing was wired, unwired or repointed.** No node was created or cloned this batch, so trap 46 had nothing to catch.

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** set at the top of every read; effective visibility computed by walking to the page, not from `node.visible` (trap 39).
- **Every changed string read back from the instances, not the masters** (rule 3), and read from the rendered `Primary` / `Secondary` **TEXT nodes** rather than from the `componentProperties` that drive them — so the check is what the row shows, not what it was told.
- **Trap 50 was the reason to check Colette's untouched rows.** Her Vitals sheet was swapped in from a component cloned from Medications, which once carried her medication strings across. Rows 2 and 3 of her Medications and all six of her Vitals were re-read after the master edits and are exactly as they were.
- **Both summaries re-read** after the feedback fix, to confirm no bullet text moved.
- **Counts** read before the first write and after the last.
- **Nine renders looked at**: all four Medications frames, all four Vitals frames, and the end of Marcus's summary showing the corrected prompt.

---

## What I believe but did not see

- **The prototype was not played.** Nothing about wiring changed, and the counts were read rather than tapped.
- **The clinical content is Daniel's**, invented for the demo. This batch changed four numbers and a pronoun to make the sheets agree with the summaries; it did not decide what any of them should clinically be.
- **The scrolled screenshot** of the summary end is the `SCAFFOLDING` frame built last batch, which instances the same summary component, so the corrected prompt reaches it. Its drawer is detached; the sheet inside is not.
- **Hidden row 4 of Colette's Medications sheets** still carries the master's "Guaifenesin 400 mg". It is hidden, so nothing renders it, and it was left alone.
- **Marcus's Medications sheet has no Sertraline 75 mg row and Colette's has no 2.5 mg or 12.5 mg row**, by decision of this batch's scope, not by oversight.

---

## Renders

- `figma-export/chart-copy-2026-09-17/` — the four Medications frames, the four Vitals frames, and the end of Marcus's summary, nine files
- `reports/Correct the chart copy.png` — the contact sheet, Medications above Vitals
