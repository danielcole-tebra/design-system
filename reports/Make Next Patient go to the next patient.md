# Make Next Patient go to the next patient

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 · library `YX2n4YLrEpBXNbcc73T6dw` read only · Daniel saved a named version before the batch

Three rulings, six pieces of work, all six done. One thing in this batch failed silently and was caught only by reading the result back — it is the first finding below, because it is the more useful half of the report.

---

## Before and after

| | before | after |
|---|---|---|
| Children on `Account screens` | 44 | **46** |
| Frames | 36 | **38** |
| Reactions | **114 across 110** | **126 across 122** |
| Destinations | 32 | **34** |
| Off-page destinations | 0 | **0** |
| Starting points | `Account device` 103:2320, `Schedule` 204:4082 | **unchanged** |

The delta is exactly accountable: two cloned frames bring 5 reactions each (+10), each loses its Start Recording (−2), the two Colette schedule rows gain one each (+2), the two Back To Schedule buttons bring one each (+2). 114 + 8 + 2 + 2 = 126.

---

## What was built

### 1. Colette's patient screens

`A4 Patient / list` 103:3027 cloned twice onto the A4 row at x 2240 and 2710:

- **`A4 Colette / after Marcus` 246:4990**
- **`A4 Colette / after Yusuf` 246:4995**

Two frames rather than one, because the only thing that differs between the paths is where "Patients" returns to, and a frame cannot carry two back destinations.

Identity changed to **Colette Mwangi, DOB 05/09/1968** (placeholder — no real date of birth was used or inferred). Everything else is the source's.

**Nothing dropped on either clone.** The brief asked for rule 8's rebind; it was not needed, and that was measured rather than assumed: the source carries **170 componentPropertyReferences across 429 nodes** and **5 reactions**, and both clones read exactly the same. `flowStartingPoints` was read before and after (trap 46): no duplicate appeared, because the source is not a starting point.

**The DOB fits.** The box the last batch widened to 120 holds "DOB 05/09/1968" at **105.66 of ink** on one line, ink top **115.88** — the same line Marcus's sits on. The identity row is still 44. The two frames are **pixel-identical** to each other (PIL diff, no bounding box).

### 2. Colette's wiring

| frame | node | to |
|---|---|---|
| A4 Colette / after Marcus | `Back to patients` | A S2 Home / schedule, Marcus sent |
| A4 Colette / after Yusuf | `Back to patients` | A S2 Home / schedule, both sent |
| both | `Start recording CTA` | **nothing** (reaction removed) |

"Start Recording on Colette opens nothing" is now in Known and accepted.

### 3. Colette's row

| frame | node | to |
|---|---|---|
| A S2 Home / schedule, Marcus sent | `Schedule row · Colette Mwangi` 227:2440 | A4 Colette / after Marcus |
| A S2 Home / schedule, both sent | `Schedule row · Colette Mwangi` 230:4697 | A4 Colette / after Yusuf |

Left inert on `schedule` and `schedule, top`, which the demo reaches before she is the next patient. Also in Known and accepted.

### 4. Next Patient

| frame | node | from | to |
|---|---|---|---|
| A S8 Sent / sent | `Next patient CTA` 103:2483 | A S2 Home / schedule, Marcus sent | **A4 Colette / after Marcus** |
| A S8 Sent / Yusuf | `Next patient CTA` 230:5054 | A S2 Home / schedule, both sent | **A4 Colette / after Yusuf** |

**What `A S8 Sent / failed`'s Next Patient does now: it does not have one.** There is no node named anything like Next Patient on that frame — its two actions are `Retry CTA` → `A S7 Sending` and `Back to patients` → `A S2 Home / schedule`, both unchanged. Spec §6.6 has always described it as "Back To Patients (text), above Retry". It was left alone as instructed, and §6.6 now says so explicitly.

### 5. Back To Schedule

Both Sent frames gained an **`Actions`** stack: a VERTICAL auto-layout at **(16, 674), 358 x 120**, `itemSpacing` **bound `space/8`**, holding `Next patient CTA` over the new **`Back to schedule`** button, both 358 x 56, the stack ending on **794** — the 34 bottom safe area, exactly where Next Patient used to end.

The button is a library Button at `variant=text, color=primary, size=medium` — **cloned from `A S8 Sent / failed`'s `Back to patients` 103:2980**, which is already an instance of that master in this file, so nothing was imported by key (trap 4). Its geometry copies the failed frame's own stacked-action pattern node for node, including the 8 between the two controls.

| frame | node | to |
|---|---|---|
| A S8 Sent / sent | `Back to schedule` 246:5865 | A S2 Home / schedule, Marcus sent |
| A S8 Sent / Yusuf | `Back to schedule` 246:5873 | A S2 Home / schedule, both sent |

**The confirmation content did not move.** `Sent readout` is at y 296 on both frames, before and after, read back. **Next Patient did move**, 738 → 674, inside its own stack: the frame's usable height ends at 794 and a second 56-tall control cannot go below it, so the only way to put a link under Next Patient is to raise Next Patient. The brief's stop condition named the confirmation content, not the button stack, so this was built rather than stopped on — and the numbers are here so it can be reversed in one line if that reading was wrong.

Confirmed in pixels down the centre of `A S8 Sent / sent`: secondary fill #FF8D6E from **674 to 729**, beige 730–737 (the 8), teal #004852 label ink 760–773 inside the text button 738–793.

**The button renders "Back To Schedule", not "Back to schedule"** — the library Button applies `textTransform: capitalize`, and §2 already rules that library Buttons render Title Case and that button copy ships that way. `Next Patient` beside it does the same.

### 6. Both demo paths

**Main path:** schedule → Marcus Vance → summary → record → stop → Sending → Sent → **Next Patient → Colette Mwangi** → "Patients" → schedule, Marcus sent.

**Resend:** schedule, Marcus sent → Yusuf Bahri → the alert → Sending / Yusuf → Sent / Yusuf → **Next Patient → Colette Mwangi** → "Patients" → schedule, both sent.

Back To Schedule is the shortcut that skips Colette on either path. All four new hops traced as stored wiring and resolved by name.

---

## What was found

### 1. Eight reaction writes succeeded and changed nothing

This is the finding worth keeping.

A Figma `Reaction` carries its destination **twice**: in the deprecated `action` object and in the `actions` array. The raw shape is

```
{ action: {type:'NODE', destinationId:'227:2420', …},
  actions: [{type:'NODE', destinationId:'227:2420', …}],
  trigger: {type:'ON_CLICK'} }
```

— two identical copies, which is exactly what makes `r.action || r.actions[0]` look safe. It is not: it returns the first truthy key, so editing a JSON copy that way mutates **only the alias**, and `setReactionsAsync` reads `actions`.

Every one of the eight calls returned without throwing. Every reaction count afterwards was correct. **Every destination was unchanged.** And in two places it was worse than unchanged: the Colette schedule rows, which had no reaction at all, were given a copy of the Marcus row's reaction whose destination I believed I had edited — so both rows silently pointed at **`A4 Patient / list`**, Marcus's chart, under Colette's name.

Nothing in the tool output said so. The only reason it was caught is that the next read printed destinations **by name**, and "A S2 Home / schedule, Marcus sent" appeared where "A4 Colette / after Marcus" should have been.

All eight were rebuilt from scratch against the `actions` array and verified: `allOk: true`, each one read back by name, with the `action` alias confirmed to agree. Recorded as plugin note 49. The rule it generalises to: **`setReactionsAsync` never reports a partial write, and a reaction count is not a check.** `setReactionsAsync([])` in the same script worked perfectly, so the call is not broken and the failure gives no signal at all.

### 2. Colette's chart rows open Marcus Vance's sheets — not resolved

Both clones were taken whole and only the identity changed, which is what the brief specified, and the brief named only Start Recording to unwire. So four reactions survive that should probably not:

| frame | node | to |
|---|---|---|
| A4 Colette / after Marcus | `Visit/Chart row · Patient summary` | A4 Patient / summary |
| A4 Colette / after Marcus | `Visit/Chart row · Medications` | A4 Patient / placeholder |
| A4 Colette / after Yusuf | `Visit/Chart row · Patient summary` | A4 Patient / summary |
| A4 Colette / after Yusuf | `Visit/Chart row · Medications` | A4 Patient / placeholder |

Tapping Patient summary under the name "Colette Mwangi" shows a 54-year-old male's sick-visit summary with **Marcus Vance in the top bar**. This is the one place in the file where one patient's name sits above another patient's data, and it is on a screen the demo now routes to twice.

**Not resolved** (rule 10). `A4 Yusuf / list, not sent` avoided it by having its chart made inert, and the same move closes this in one script. Logged as `mobileDemo_coletteChartRowsOpenMarcusSheets`; worth deciding before the prototype is shown.

The device pill is the same class of thing and is far less serious: it goes to `A S3 Microphone`, which is patient-agnostic. It was left.

---

## Every reaction added or changed

| # | frame | node | from | to |
|---|---|---|---|---|
| 1 | A4 Colette / after Marcus | `Back to patients` | A S2 Home / schedule | A S2 Home / schedule, Marcus sent |
| 2 | A4 Colette / after Yusuf | `Back to patients` | A S2 Home / schedule | A S2 Home / schedule, both sent |
| 3 | A4 Colette / after Marcus | `Start recording CTA` | A S5 Recording / recording | **removed** |
| 4 | A4 Colette / after Yusuf | `Start recording CTA` | A S5 Recording / recording | **removed** |
| 5 | A S2 Home / schedule, Marcus sent | `Schedule row · Colette Mwangi` | nothing | A4 Colette / after Marcus |
| 6 | A S2 Home / schedule, both sent | `Schedule row · Colette Mwangi` | nothing | A4 Colette / after Yusuf |
| 7 | A S8 Sent / sent | `Next patient CTA` | A S2 Home / schedule, Marcus sent | A4 Colette / after Marcus |
| 8 | A S8 Sent / Yusuf | `Next patient CTA` | A S2 Home / schedule, both sent | A4 Colette / after Yusuf |
| 9 | A S8 Sent / sent | `Back to schedule` | **new** | A S2 Home / schedule, Marcus sent |
| 10 | A S8 Sent / Yusuf | `Back to schedule` | **new** | A S2 Home / schedule, both sent |

Plus the ten reactions the two clones carried in unchanged (5 each, of which the two Start Recordings above were then removed).

---

## Verification

- **Counts** read from the file before the first write and after the last: 44 → 46 children, 36 → 38 frames, 114/110 → **126/122** reactions and owners, 32 → **34** destinations, **zero** off-page destinations, two starting points unchanged.
- **Every one of the eight destinations read back by name** after the rewrite, with the deprecated `action` alias confirmed to agree with `actions[0]` on all eight.
- **Clone integrity measured, not assumed**: 170 componentPropertyReferences / 429 nodes / 5 reactions on the source and on both clones.
- **The two Colette frames are pixel-identical**, PIL difference returns no bounding box.
- **The button band sampled** down the centre of `A S8 Sent / sent`: 674–729 secondary fill, 730–737 beige, label ink 760–773, stack bottom 794.
- **All four required frames rendered at 1x and looked at** before this was written, plus the two schedule frames whose rows are now live.

---

## What I believe but did not see

- **The prototype was not played.** Both paths are traced hop by hop through stored destinations; that they navigate is inference from the wiring resolving.
- **The 8 between the two buttons is bound**, but the stack's own position (16, 674) is a coordinate — the Sent frames have no auto-layout to bind it to, the same situation as the sign-in lockup last batch.
- **DOB 05/09/1968 is a placeholder**, as the brief states.
- **Colette's drawer content is Marcus's** beyond the two wired rows as well — the chart list, the sheets, everything inside the drawer is the source's. Only the identity in the top bar is hers. The finding above names the two rows that are *reachable*; the rest is inert and therefore invisible.
- **I did not re-render the A4 row's other frames**, because nothing in them changed.

---

## Renders

- `figma-export/next-patient-2026-09-17/` — the two Colette frames, the two Sent frames and the two schedule frames, all at 1x
- `reports/Make Next Patient go to the next patient.png` — the six side by side
