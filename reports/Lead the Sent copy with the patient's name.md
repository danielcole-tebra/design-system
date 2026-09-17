# Lead the Sent copy with the patient's name

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw` read only

One ruling, four items, all four done. It closes a finding the previous batch reported and did not resolve, and it opens one of its own.

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

Two text nodes changed and nothing else.

**The frames, enumerated from the file.** Three are named `A S8 Sent`. The two that carry the confirmation copy are **`A S8 Sent / sent` 103:2473** (body `Body` 103:2482) and **`A S8 Sent / Yusuf` 230:5044** (body 230:5053). The third, `A S8 Sent / failed` 103:2969, is the error screen — different copy, a 358 column, and outside the ruling. It was not touched.

---

## What was built

### 1. The copy

| frame | before | after |
|---|---|---|
| A S8 Sent / sent | "The note for Marcus Vance is being generated. You'll find it in your desktop queue." | **"Marcus Vance's note is being generated."** ⏎ **"You'll find it in your desktop queue."** |
| A S8 Sent / Yusuf | "The note for Yusuf Bahri is being generated. You'll find it in your desktop queue." | **"Yusuf Bahri's note is being generated."** ⏎ **"You'll find it in your desktop queue."** |

The break is authored, not a wrap.

### 2. Style and column kept, line count read back

Read back property by property on both nodes, before and after:

| | value |
|---|---|
| face | Akkurat LL Regular **16 / 24** |
| alignment | `textAlignHorizontal: CENTER` |
| sizing | `layoutSizingHorizontal: FILL` at **326**, `textAutoResize: HEIGHT` |
| ink | bound **`color/text/secondary`** |

**Identical on both, before and after.** The column is unchanged at 326.

| frame | lines before | lines after | height |
|---|---|---|---|
| A S8 Sent / sent | **3** | **2** | 72 → **48** |
| A S8 Sent / Yusuf | 2 | **2** | 48 → **48** |

### 3. Nothing wraps

Each sentence was set alone in the same box and measured, then the two-line version restored:

| sentence | ink width | column | lines |
|---|---|---|---|
| "Marcus Vance's note is being generated." | **294.95** | 326 | 1 |
| "Yusuf Bahri's note is being generated." | **277.28** | 326 | 1 |
| "You'll find it in your desktop queue." | **257.34** | 326 | 1 |

**No sentence wraps onto a second line of its own**, so there was nothing to report under item 3 and the column was not adjusted. The margin is the subject of the finding below.

### 4. Section 6.6

Updated for both frames, with the authored break and the shared shape stated.

---

## What was found

### The two Sent screens are now the same shape

This is what the ruling was for, and it is visible in the pixels rather than inferred. Scanning both 1x renders for inked bands between y 360 and 500 gives **identical results**:

| band | A S8 Sent / sent | A S8 Sent / Yusuf |
|---|---|---|
| heading | 377–400 | 377–400 |
| body line 1 | 418–433 | 418–433 |
| body line 2 | 442–457 | 442–457 |

That closes the previous batch's finding — *"Marcus's Sent copy wraps to three lines, Yusuf's to two"* — which was reported rather than reflowed because the fix was a copy decision. It was.

**A consequence worth naming.** Marcus's `Copy` frame goes **116 → 92** and his `Sent readout` **188 → 164**, which is exactly Yusuf's. Both readouts stay anchored at **y 296**, and both `Actions` stacks are unmoved at **674–794**. So the confirmation block is 24 shorter on Marcus's screen and nothing below it moved.

### The first line has about four characters of headroom — not resolved

"Marcus Vance's note is being generated." is **294.95** of ink in a **326** column: **31 px of slack**, which at roughly 8 px per character at 16 px Akkurat is about **four characters**.

- "Colette Mwangi" is two characters longer than "Marcus Vance" and would still fit.
- A name like "Priya Raghunathan" would not, and the screen would silently go back to three lines with a widow — the exact shape this batch removed.

**Not resolved** (rule 10). Nothing is wrong today, the ruling is the ruling, and the alternatives — a wider column, a shorter sentence, truncating the name — are copy and layout decisions. Logged as `mobileHandoff_sentFirstLineHasFourCharactersOfSlack` so the next invented demo patient gets measured before their Sent screen is called done.

---

## Verification

- **Counts** read before the first write and after the last: 48 children, 40 frames, **130 reactions across 126 owners**, 36 destinations, zero off-page, two starting points — all unchanged.
- **Every style property and the colour binding read back** on both nodes and compared to the before values: no difference.
- **Column width read back**: 326 on both, unchanged.
- **Line counts read back**: 2 and 2.
- **Each sentence measured on its own** in the live box, then the final text restored.
- **`Actions` stacks re-read**: both still y 674, height 120, bottom 794.
- **`A S8 Sent / failed` re-read and confirmed untouched**: same copy, 326, 2 lines.
- **Both frames rendered at 1x and looked at** before this was written, and the ink bands compared numerically.

---

## What I believe but did not see

- **The prototype was not played.** No wiring was touched and the reaction counts are unchanged, but the hand-off was not run.
- **The four-character estimate is arithmetic, not a measurement of a specific name** — 31 px of slack divided by roughly 8 px per character at this size. A name of wide letters would eat it faster than a narrow one.
- **The apostrophe is the straight `'` the rest of the file uses**, not a typographic one; that is the file's existing convention rather than a decision made here.
- **`A S7 Sending`'s copy was not reviewed.** The ruling names the Sent confirmation, and the Sending screen carries a different sentence that does not mention a patient.
- **Only `Account screens` was searched** for the old wording; the two archived Sent frames still carry their own older copy, as recorded when "desktop queue" was ruled.

---

## Renders

- `figma-export/sent-copy-leads-with-name-2026-09-17/` — both Sent frames at 1x
- `reports/Lead the Sent copy with the patient's name.png` — the two side by side
