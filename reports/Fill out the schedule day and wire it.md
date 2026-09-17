# Fill out the schedule day and wire it

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, `Components` page and `Account screens` · `figma.skipInvisibleInstanceChildren = false` on every read · additive only

![contact sheet](Fill%20out%20the%20schedule%20day%20and%20wire%20it.png)

---

## What was built

### 1. The Failed pill

`Schedule/Row` 196:777, `Status = failed` 196:762 only. The nested `Chip (library)` instance `I196:768;4:388` had its `Label#156:0` set to **"Failed"**.

| | Before | After |
|---|---|---|
| Chip width | 107 | **59** |
| Chip left edge | 235 | **283** |
| Chip right edge | 342 | **342** |
| Text column beside it | 203 | **251** |

**`Status chip` 4:395 was not touched**, and that was checked rather than assumed. Re-read afterwards: its `Status = Failed to send` variant is still **107** wide and still reads "Failed to send", `Session row` 4:445's chip is still 107 / "Failed to send", and all **six** "Failed to send" labels on the `Screens` page are unchanged at 85 wide.

**The override reaches every failed instance by inheritance, not by editing.** Both proof rows (196:892, 196:906) and Marcus Vance's row on both schedule frames read "Failed" at 59 wide with a 251 column, without any of them being opened. None of them carried an override of their own for that property, so the component's value flows through.

This is worth naming as the pattern: **to narrow a shared chip for one consumer, override the nested library instance inside the variant, never the set.**

### 2. Six more rows, both frames

Appended after Theo Abernathy, all `Status = none`, each built from the variant rather than switched into it:

| Time | Name | |
|---|---|---|
| 2:30 PM | Nadia Kowalczyk | |
| 3:00 PM | Emeka Balogun | **Telehealth** |
| 3:30 PM | Sofia Renteria | |
| 4:00 PM | Hamish Croft | |
| 4:30 PM | Lena Petrova | |
| 5:00 PM | Amara Dunbar | |

All six names are invented and distinct from the existing eight. Logged as `mobileSchedule_sixMorePlaceholdersAndWiring`. Each stack is now **fourteen rows, 390 × 1048**.

### 3. The offset, and the overflow

**Offset −292.** Renata Ilves (10:20 AM, the last past appointment) sits at y 256 in the stack and is 72 tall, so its midpoint is 292. Drawing the stack at −292 puts the row's bottom half — the time line and the lower half of its Sent pill — at the top of the container, and **Yusuf Bahri starts at container y 36**, fully visible.

**Both frames now genuinely overflow**, which is the thing the last batch could not achieve:

| Frame | Stack y | Stack height | Content bottom | Container | Overflows |
|---|---|---|---|---|---|
| `/ schedule` | −292 | 1048 | **756** | 619 | yes, by 137 |
| `/ schedule, top` | 0 | 1048 | **1048** | 619 | yes, by 429 |

### 4. Wiring

Marcus Vance's row → `A4 Patient / list, not sent` 200:6707, `ON_CLICK`, on **both** frames. Every other row on both frames carries **zero** reactions — checked, not assumed. A flow starting point named **`Schedule`** was added on 204:4082.

---

## What was found

### 1. `/ schedule, top` has no bottom cue, and it is a near miss

The peek fixes the top of `/ schedule`. The bottom of `/ schedule, top` has the opposite problem: row 8 (Theo Abernathy) ends at **616** and the container ends at **619**, so **exactly 3 px of row 9 shows**. In the render the list looks like it stops cleanly at 2:00 PM — there is no partial row to say six more appointments follow.

It is a coincidence of arithmetic, not a decision: 40 heading + 8 × 72 = 616 happens to land 3 px short of 619. Any of a shorter heading, a 15th row, or a container ending on a different number would break the coincidence. **Not resolved** (rule 10) — it is the mirror of the cue Daniel just asked for at the top, and whether the bottom needs one is his call.

### 2. The peeking row shows a half-clipped pill

The cue works, and what it shows is the time line plus the **bottom half of Renata's Sent pill** — a green arc with no text. It reads as "something is cut off", which is the point, but it is a pill sliced through its middle rather than a name sliced through its middle. Worth a look at arm's length before it is called finished; a different offset would peek the name instead, at the cost of showing less of the row.

### 3. The three pills now read as one family

Before, `Failed to send` was 107 against `Sent` 51 and `Sending` 72 — nearly the width of the other two together, and the only pill that wrapped a phrase rather than naming a state. At 59 it sits between them. The proof sheet's four rows show it directly.

A second-order effect worth recording: the text column beside the failed chip goes 203 → 251, so the order is now **Sent 259, Failed 251, Sending 238**, where it was **Sent 259, Sending 238, Failed 203**. The failed row is no longer the tightest.

---

## Verification

**Every row instance read back, both frames, 28 instances:**

- **14 rows each**, all **72 tall** and 390 wide
- **nothing truncates**: `textTruncation` DISABLED on every `Name`, `Time` and Telehealth word; every `Name` exactly 24 tall and every `Time` exactly 20, so nothing wrapped
- **strict time order**, parsed to minutes and checked ascending with no ties, on both frames
- **Telehealth shows on exactly two rows** — Colette Mwangi 11:30 AM and Emeka Balogun 3:00 PM — tested by walking to the page for effective visibility (trap 39), not by reading `visible`
- **Marcus Vance's pill reads "Failed"**, 59 wide, 251 column, on both frames
- **Only Marcus Vance carries a reaction** on either frame; every other row is 0

**Counts, before and after:**

| Page | Frames before | Frames after | Reactions before | Reactions after |
|---|---|---|---|---|
| **Account screens** | 43 (+4 components) | 43 (+4 components) | 126 across 123 | **128 across 125** |
| **Components** | 45 children | 45 children | — | — |
| Visit screens | 26 | 26 | 84 across 81 | 84 across 81 |
| Screens | 18 | 18 | 42 across 41 | 42 across 41 |

**Every difference accounted for:**

- **No frame was created.** The twelve new rows are children of existing stacks, and the icon work was last batch.
- **+2 reactions on +2 nodes** — Marcus Vance's row on each of the two schedule frames. Nothing else was wired, nothing existing was edited.
- **Destinations went 30 → 31**: `A4 Patient / list, not sent` 200:6707 is now a destination, where before nothing pointed at it.
- **Visit screens and Screens are untouched**, re-read after the build.

**Starting points: three, no duplicate.** `Account device` 103:2320, `Unsent recording` 140:1618, `Schedule` 204:4082. The array was read, appended to and written back, with a guard against adding 204:4082 twice; the node ids are unique. **Worth noting the spec was wrong here before today** — §4 listed "Visit device, Account device, Unsent recording" for this page, but `Visit device` is a starting point on `Visit screens`, not this one. §4 now reads the three that are actually there.

**No reaction crosses pages.** All **31** distinct destination ids resolved and walked to their page; every one lands on `Account screens`.

---

## What I believe but did not see

- **The prototype was not played.** The scroll is asserted from `overflowDirection` VERTICAL plus content 1048 in a 619 container — arithmetic, not a scroll. Marcus's reaction is read back from the node, not observed navigating. This is the one thing most worth doing next, and it is now in the plan.
- **The peek is judged from a 1x render on a monitor**, not on a phone. Whether a half-row reads as "scroll up" or as "broken" is exactly the sort of thing that changes at arm's length.
- **The override's reach was verified on four instances** — two proof rows and two schedule rows — not on every instance of the failed variant in the file. Those four are all of them that I know of, but the claim rests on a targeted read, not a census.
- **The six invented names are placeholders and the clock is invented.** Nothing in the file establishes "now"; the 10:20/11:00 boundary exists only because earlier batches chose those times, and 5:00 PM as the day's end is Daniel's ruling, not data.
- **`Components` was not recounted for reactions**, only for children; it holds no reactions and never has.
- All three renders were **looked at before this was written**.

---

## Renders

- `figma-export/schedule-full-day-2026-09-17/as2-home-schedule-204-4082-1x.png`
- `figma-export/schedule-full-day-2026-09-17/as2-home-schedule-top-204-4127-1x.png`
- `figma-export/schedule-full-day-2026-09-17/schedule-row-proof-196-787-1x.png`
- `reports/Fill out the schedule day and wire it.png` — the three side by side
