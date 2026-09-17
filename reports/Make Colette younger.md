# Make Colette younger

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319, `Components` 1:2 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

One ruling, five items, all five done. Twenty text nodes changed, none of them a master, no wiring touched.

---

## The ruling

Added to `mobile-spec.md` §2, under **Patient page**, immediately after "The patient header carries a profile picture", as written:

> **Colette Mwangi is in her thirties, to match her portrait. Her DOB is 05/09/1990, and she is 36.**

---

## What the enumeration found

`figma.skipInvisibleInstanceChildren = false` at the top of every read. Every page scanned, all eight.

| page | text nodes | `05/09/1968` | states her age |
|---|---|---|---|
| `scratchpad` 262:7760 | 139 | **0** | 0 |
| `Foundations` 0:1 | 2 | 0 | 0 |
| `Components` 1:2 | 218 | **0** | 0 — the one age line is Marcus's, on the master |
| `Flow` 1:4 | 2 | 0 | 0 |
| **`Account screens` 103:2319** | 1622 | **18** | **2** |
| `Archive` 214:3026 | 661 | **3** | **2** |
| `Archive · Visit screens` 43:705 | 524 | 0 | 0 |
| `Archive · Screens` 1:3 | 209 | 0 | 0 |

**No master carries her DOB.** `Visit/Patient header` 287:10323 defaults to Marcus's `DOB 03/14/1972`; every one of her dates is a per-instance override. Likewise `Visit/Sheet/Patient summary` 50:969 holds Marcus's "54-year-old male" — her "58-year-old female" exists only as an override on her two summary frames. So nothing published had to move, and the library was not touched.

### The 18 on `Account screens`, and why they are two different jobs

| | count | how the string is held | how it was set |
|---|---|---|---|
| `Visit/Patient header` instances | **10** | the `DOB#287:1` TEXT **component property**; the text node's `componentPropertyReferences` is `{characters: "DOB#287:1"}` | `setProperties` on the instance |
| `Visit/Recording bar` instances, hidden, SUPERSEDED | **8** | plain `characters`; `componentPropertyReferences` is `{}` | assignment, after loading the node's own font |

Writing `characters` on the first group would have been the wrong handle — the property drives the node. Calling `setProperties` on the second was impossible; those bars expose only a `State` variant.

**The ten headers**

| frame | header instance |
|---|---|
| `A4 Colette / after Marcus` 246:4990 | 292:7695 |
| `A4 Colette / after Yusuf` 246:4995 | 292:8340 |
| `A4 Colette / summary, after Marcus` 249:10819 | 292:7795 |
| `A4 Colette / summary, after Yusuf` 249:10824 | 292:8440 |
| `A4 Colette / medications, after Marcus` 272:3459 | 292:7906 |
| `A4 Colette / medications, after Yusuf` 272:3602 | 292:8551 |
| `A4 Colette / vitals, after Marcus` 273:9637 | 292:8016 |
| `A4 Colette / vitals, after Yusuf` 273:9780 | 292:8661 |
| `A4 Colette / landing, after Marcus` 287:10504 | 287:10526 |
| `A4 Colette / landing, after Yusuf` 287:10615 | 287:10637 |

**The eight bars** — `I246:4991;48:908`, `I246:4996;48:908`, `I249:10820;48:908`, `I249:10825;48:908`, `I272:3460;48:908`, `I272:3603;48:908`, `I273:9638;48:908`, `I273:9781;48:908`. All eight are invisible and stay invisible; they were changed because the brief says every place it appears on `Account screens`, and because a superseded layer that contradicts the live one is exactly the thing the next enumeration trips over.

### Her age, in exactly two places

`I249:10821;48:895;50:985` and `I249:10826;48:895;50:985` — the first bullet of **Current Situation** on her two summary frames. Nowhere else in the file states it.

---

## 1. DOB

**`DOB 05/09/1968` → `DOB 05/09/1990` on all 18.** Akkurat LL Regular loaded from `getStyledTextSegments(['fontName'])` on the nodes themselves, not assumed.

**The schedule row had nothing to change.** Her row shows the name, `11:30 AM · ▢ Telehealth` and a chevron — no date of birth, on any of the four schedule frames. The brief named schedule rows; they are in the contact sheet so the absence is visible rather than asserted.

## 2. Age

`58-year-old female` → `36-year-old female`, on both.

The node is one TEXT holding three `UNORDERED` list items at `listSpacing` 12 — the shape the summary polish batch settled. Rewriting `characters` wholesale is the obvious move and the wrong one: it would have rebuilt the string and put the list formatting at risk for a two-character edit. Instead:

```
t.insertCharacters(2, '36', 'BEFORE')   // "58" -> "5836-year-old…", style inherited from the '8'
t.deleteCharacters(0, 2)                //      -> "36-year-old…"
```

The whole string is never reassigned. Read back: `getRangeListOptions(0, len)` is `UNORDERED`, and the node measures **216 before and 216 after** on both frames. Nothing else in the summary was touched.

## 3. Read back on the instances

Every number below is from an instance, re-read after the write. No master was read as evidence.

| | nodes | reads | width × height | mode | lines |
|---|---|---|---|---|---|
| header DOB | 10 | `DOB 05/09/1990` | **109 × 20** | `WIDTH_AND_HEIGHT` | **one** |
| bar DOB, hidden | 8 | `DOB 05/09/1990` | 120 × 36 | `NONE` | one |
| Current Situation | 2 | `36-year-old female…` | — | — | height 216, unchanged |

**Trap 48 — no DOB wraps.** The header's DOB hugs, so a wrap would show as a height of 40 rather than 20. All ten read 20. The row gives 298 after the 48 avatar and the two 16 gutters; the hugging `Name and DOB` frame is 175 + 8 + 109 = **292**. **Six pixels of slack**, down from seven.

**Trap 50 — no swapped instance kept old text.** Her medications and vitals frames are the ones that were built by INSTANCE_SWAP between two components cloned from each other, which is where trap 50 was first measured. A full re-scan of all 1622 text nodes on `Account screens` for `1968` **or** `58-year` returns **zero**. The check is the whole page, not the nodes I expected to have changed.

## 4. Other text that implies her age — reported, unchanged

| where | text | what it now implies |
|---|---|---|
| summary, Key Background | "Type 2 diabetes diagnosed 2019" | onset at **29** |
| summary, Key Background | "Hypertension since 2021. Lisinopril stopped (2024)" | onset at **31** |
| summary, Active Care Plan | Metformin + Amlodipine + Chlorthalidone | a three-drug regimen on a 36-year-old |
| landing, Admin row 2 | "Last seen June 11, 2026" | nothing |
| schedule row | "11:30 AM · Telehealth" | nothing |

None of it states an age, so under the brief's fourth item all of it stands. It is not impossible — early-onset type 2 diabetes with a family history in mother and sister is the reading the summary already supports — but the history was written for a 58-year-old and now sits on a 36-year-old, and the summary is the one screen in the demo that gets read as prose. `mobileColette_historyImpliesYoungerOnsetNow`.

## 5. Wiring — counts before and after

| `Account screens` 103:2319 | before | after |
|---|---|---|
| nodes | 7753 | **7753** |
| nodes carrying reactions | 200 | **200** |
| reactions | 207 | **207** |
| destinations | 199 | **199** |

| `Components` 1:2 | before | after |
|---|---|---|
| nodes | 1132 | 1132 |
| reactions | **0** | **0** |

Counted from both `reaction.actions` and the legacy `reaction.action`, over every node on the page with invisible children included. Text overrides cannot move a reaction, and none did.

---

## What was found

### Colette's landing frames still name Marcus, on a hidden layer — DEFECT

`A4 Colette / landing, after Marcus` 287:10504 and `/ landing, after Yusuf` 287:10615 were cloned from Marcus's landing page. Their own `Header` and `Control group` were hidden and labelled SUPERSEDED under rule 1 when `Visit/Patient header` replaced them — but the identity text inside was never re-typed. **287:10510 reads "Marcus Vance" and 287:10511 reads "DOB 03/14/1972"**, and 287:10621 / 287:10622 the same.

Effective visibility is false on all four, so nothing renders and the demo is unaffected. They did not surface in the DOB enumeration either, because the date is 1972. Left as is — out of scope, and rule 1 forbids removing them. It costs nothing until someone unhides a superseded layer or greps the file for a patient's name. `mobilePatientPage_colettesHiddenHeaderStillNamesMarcus`.

### The identity row's slack is now six pixels

`mobilePatientPage_fixedDobBoxWrappedColette` recorded 108 and 7 px of slack when the fixed DOB box was made to hug. Same character count, one wider glyph: 05/09/**1990** measures **109**, so the slack is **6**. Still one line on all ten, still nowhere near a wrap — but that flag's arithmetic should be read as 109 / 6 from today, and the margin on that row has now narrowed twice for reasons that looked cosmetic both times. `mobileColette_dobSlackIsNowSixPx`.

### The Archive now disagrees with the file, on purpose

Five nodes there still say 58 — `I278:12507;48:908` and `I278:13159;48:908` (DOB) plus `I278:12676;50:985` and `I278:13328;50:985` (the age line) inside the two SCAFFOLDING scrolled-to-the-end summary clones, and `I287:10780;48:908` (DOB) in `PROOF · Visit/Patient header with each avatar 2026-09-17`. Left as directed. `scratchpad` 262:7760 carries neither string on any of its 139 text nodes, so there was nothing there to leave.

The consequence is small and worth naming: an enumeration for "Colette's DOB" now returns two answers, and has to know which page it is on. `mobileColette_archiveStillCarriesTheOldDob`.

---

## Verification

- **Enumerated from the file, every page, never from a prior report** — including `Components`, `Archive` and `scratchpad`, which is how "no master holds her DOB" became a fact rather than an assumption.
- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read, which is the only reason the eight hidden recording-bar DOBs were found at all.
- **Both handles identified before writing** — the property reference on the header nodes was read off the node, not inferred from the component's property list.
- **Fonts loaded from the nodes** via `getStyledTextSegments(['fontName'])`, never a hardcoded family.
- **Read back on the instances**, all 20, with width, height, sizing mode and the resulting line count — masters were not read as evidence.
- **Trap 50 checked as a whole-page re-scan**, not a spot check of the nodes that were touched.
- **Counts taken before the first write and after the last**, on both pages.
- **Four renders looked at** before this was written: her schedule row, her landing page, her open chart list, the top of her summary — plus a 2x crop of the header DOB and a 1.6x crop of the first bullet, so the two changed strings are legible at size rather than taken on trust.

---

## What I believe but did not see

- **The prototype was not played.** Nothing about the wiring changed, and the counts say so, but no tap was executed.
- **The four frames not screenshotted** — her `after Yusuf` path, and her medications and vitals frames — were read back node by node and are identical in every measured respect to the four that were. That is a read, not a render.
- **The hidden recording bars were changed but never rendered.** They are invisible; the 120 × 36 read is the node's, not the screen's.
- **"36" is Daniel's arithmetic, not mine.** The ruling gives both the DOB and the age; against today's 2026-09-17 a 05/09/1990 birth date gives 36 either way, so nothing needed resolving.

---

## Renders

- `reports/colette-younger/` — the four frames, 1x PNGs
- `reports/Make Colette younger.png` — the contact sheet: the four screens across the top, the two changed strings enlarged beneath
