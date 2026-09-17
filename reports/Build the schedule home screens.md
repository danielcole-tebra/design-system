# Build the schedule home screens

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, page `Account screens` · `figma.skipInvisibleInstanceChildren = false` on every read · additive only

![contact sheet](Build%20the%20schedule%20home%20screens.png)

---

## What was built

### 1. The alert on `A4 Patient / list, not sent` 200:6707

| | Before | After |
|---|---|---|
| Retry button colour | `error` | **`primary`** (#004852 teal, bound `color/primary/main`) |
| Reaction on the Button | **1** | **0** |
| Reaction on the Alert | **0** | **1** |
| Tap target | 64 × 28 | **358 × 48** |

The reaction was moved, not copied: `ON_CLICK` → `A S7 Sending` 103:2463 now sits on the Alert instance, and the Button carries none, so the page total is unchanged by this step.

**Trap 34 did not fire.** `color` is a variant axis, and the trap says a variant switch drops text overrides and takes the target variant's defaults. The `Label#83:165` value read back as **"Retry"** with no re-apply needed. The script checked and was ready to re-apply; it did not have to. Recorded because the trap predicts the opposite and the check costs nothing.

### 2. Three frames on the A S2 row, y 1120

All three clone `A S2 Home / empty` 103:2341, each carrying its two reactions (avatar → `A S9 Account`, search → `A S2 Home / searching`) with **identical JSON on identical layer paths**.

| Frame | id | x |
|---|---|---|
| `A S2 Home / schedule` | 204:4082 | 4350 |
| `A S2 Home / schedule, top` | 204:4127 | 4820 |
| `A S2 Home / empty day` | 204:4172 | 5290 |

**The scroll container.** The cloned frame's `List` — an empty 390 × 100 frame in the source — was repurposed rather than replaced, so nothing was deleted: renamed `Schedule scroll`, `layoutMode` NONE, resized **390 × 619** (y 191 to 810, the 34 bottom safe area), `clipsContent` true, `overflowDirection` **VERTICAL**.

**The content.** A `Schedule content` auto-layout stack, **390 × 616**, holding the "Today" `List heading` cloned from 103:2365 (40) and eight `Schedule/Row` instances (72 each). Each row was created **from the variant it needed**, not switched into it, so no variant switch could drop a text override.

| # | Time | Name | Status | Telehealth |
|---|---|---|---|---|
| 1 | 8:30 AM | Dolores Okonkwo | Sent | |
| 2 | 9:15 AM | **Marcus Vance** | **Failed to send** | |
| 3 | 9:45 AM | Priya Raghunathan | none — past and quiet | |
| 4 | 10:20 AM | Renata Ilves | Sent — off schedule, placed by start time | |
| 5 | 11:00 AM | Yusuf Bahri | none — **first upcoming** | |
| 6 | 11:30 AM | Colette Mwangi | none | **yes** |
| 7 | 1:15 PM | Ingrid Solheim | none | |
| 8 | 2:00 PM | Theo Abernathy | none | |

The five invented names are **Renata Ilves, Yusuf Bahri, Colette Mwangi, Ingrid Solheim, Theo Abernathy**; Dolores, Priya and Marcus already existed. The times put the present between **10:20 and 11:00 AM**, which is what makes the first four past and the last four upcoming. Logged as `mobileSchedule_placeholderRowsAndTimes`. No patient ID, MRN or DOB was invented.

**The offset is −328.** The first upcoming row, Yusuf Bahri, sits at y 328 inside the stack (40 heading + 4 × 72), so the stack is drawn at **y −328** in `/ schedule` and at **y 0** in `/ schedule, top`.

**Empty day.** `No patients match` 103:2395 cloned into the list and its text changed to "No appointments today" — same 390 × 40 row, same 14 px Akkurat LL Regular, same 16 left inset.

---

## What was found

### 1. At eight rows the list cannot scroll, and the scrolled frame is mostly empty

This is the finding that matters. The stack is **616** tall inside a **619** viewport — three pixels short of overflowing. So:

- **Nothing can scroll.** `overflowDirection` is set and the frame clips, but there is no overflow to scroll, so the container is a scroll container in name only.
- **`/ schedule` shows four rows and 331 px of bare page below them.** Offsetting a 616-tall stack up by 328 inside a 619-tall window leaves the bottom 331 empty. The contact sheet shows it plainly: the frame reads as a short list floating under the search field, not as a long list scrolled down to today's next appointment.

Built exactly as the brief specified, and **not resolved** (rule 10) — the fix is a design call. Three ways out: more rows (about five more would make it genuinely overflow), a shorter container, or drop the offset and let `/ schedule` and `/ schedule, top` be the same frame. Worth noting the spec's own words for this frame — "It is drawn scrolled so the next upcoming row sits below search" — cannot be satisfied convincingly at eight rows, because there is not enough list to scroll.

### 2. A literal white fill arrived by default and was cleared

`figma.createAutoLayout()` gives its frame an **unbound white fill** `{r:1, g:1, b:1}` with empty `boundVariables`. Both `Schedule content` stacks had it, and it rendered as a white band behind the "Today" heading and behind the 3 px below the last row — reading as if the heading sat on a card.

Checked against the file's own pattern before changing anything: `A S2 Home / sessions`'s `List` and `A S2 Home / unsent`'s `List` both read `fills: []`. Both stacks were set to `[]` to match, and the frames re-exported. The heading now sits on the page's beige, as it does on every other home frame.

This is a trap worth carrying: **a frame from `createAutoLayout` starts with a literal colour no audit would expect**, and in this file every fill is supposed to be bound. It would have passed a visual read on a white-ish ground and only shown up over beige.

### 3. The alert no longer says where it is tappable

Making the whole alert the target fixes the 28 px problem and creates a smaller one: **the Retry label looks like the control and is not**. Tapping the message text now navigates. That is the same shape as `mobileCapture_failedRowNoTapAffordance`, seen on an alert instead of a row, and it is the third sighting of that pattern in this prototype.

### 4. The library limit behind the closed GAP has not moved

`mobileAlert_actionTargetUnder48` is closed by the ruling, not by the component changing. The Alert's `Action` frame is still 64 × 36 and its button still 64 × 28. Any future alert whose action must be tappable on its own — two actions in one alert, say — hits the same wall.

---

## Verification

**Every row instance read back, both frames, 16 instances:**

- **all 72 tall**, all 390 wide
- **nothing truncates**: `textTruncation` DISABLED on every `Name` and `Time`; every `Name` exactly 24 tall and every `Time` exactly 20 tall, so nothing wrapped either
- **in time order**: parsed to minutes and checked strictly ascending — 510, 555, 585, 620, 660, 690, 795, 840
- the chevron is present on all 16; the Telehealth chip is visible on Colette Mwangi only; the status chip is visible on exactly the three rows that carry one

**Counts, before and after:**

| Page | Frames before | Frames after | Reactions before | Reactions after |
|---|---|---|---|---|
| **Account screens** | 40 (+4 components) | **43** (+4 components) | 120 across 117 | **126 across 123** |
| Visit screens | 26 | 26 | 84 across 81 | 84 across 81 |
| Screens | 18 | 18 | 42 across 41 | 42 across 41 |

**Every difference accounted for:**

- **+3 frames** — the three clones. Page children 44 → 47; four are components, so 47 children is 43 frames.
- **+6 reactions on +6 nodes** — 3 clones × 2 carried reactions. **The alert step is net zero**: the Button lost one and the Alert gained one.
- **Nothing else was wired.** The schedule rows carry no reactions; they are wired next batch.

**No reaction crosses pages.** All **30** distinct destination ids resolved and walked to their page; every one lands on `Account screens`. `flowStartingPoints` unchanged at two, no duplicate.

**Sources untouched**: `A S2 Home / empty` 103:2341 re-read after the build — still 844 tall, its `List` still named `List`, still 100 tall, still 0 children. `A S2 Home / unsent` 140:1618 still carries its 3 reactions.

---

## What I believe but did not see

- **The prototype was not played.** Retry's reaction is read back from the node, not observed navigating. The scroll behaviour is asserted from `overflowDirection` and the geometry, not from scrolling anything — and the geometry says it will not scroll at all.
- **The three cloned frames' carried reactions are byte-identical JSON to the source's**, which is evidence they were copied, not evidence they work.
- **The eight rows are placeholders and the clock is invented.** Nothing in the file establishes what "now" is; the 10:20/11:00 boundary exists only because I chose those times.
- **Telehealth on Colette Mwangi is arbitrary.** The brief asked for one of the four upcoming to be Telehealth and did not say which.
- **`A S2 Home / unsent` was verified by reaction count only** — 3, unchanged — not by re-reading its row's destination.
- The renders are **1x**, as asked. The white-fill defect was caught by sampling the render against the beige; on a lighter ground it would not have shown.
- All four renders were **looked at before this was written**, and the two schedule frames were **re-exported and looked at again** after the fill fix.

---

## Renders

- `figma-export/schedule-home-2026-09-17/as2-home-schedule-204-4082-1x.png`
- `figma-export/schedule-home-2026-09-17/as2-home-schedule-top-204-4127-1x.png`
- `figma-export/schedule-home-2026-09-17/as2-home-empty-day-204-4172-1x.png`
- `figma-export/schedule-home-2026-09-17/a4-patient-list-not-sent-200-6707-1x.png`
- `reports/Build the schedule home screens.png` — the four side by side
