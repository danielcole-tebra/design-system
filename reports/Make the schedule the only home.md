# Make the schedule the only home

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, all pages · `figma.skipInvisibleInstanceChildren = false` on every read · no node deleted

![contact sheet](Make%20the%20schedule%20the%20only%20home.png)

---

## 0. The version gate

This batch **stopped before touching anything** because LOG.md recorded no version saved since "Before tidy, 2026-09-17", two batches earlier (commit `bd1294c`). Daniel saved one by hand and the batch resumed. Everything below happened after that save.

---

## 1. Inventory — read-only, and it was clean

**Ten reactions pointed at the five superseded frames, and every one mapped onto a step 3 rule. No orphans**, so nothing had to stop.

Two were worth naming before the rewire, and both were reported at the stop:

- **`A S1 Login / error`'s Sign In** also pointed at `/ empty`. The Sign In rule named only *default* and *after sign out*, so this one resolved through the "any reaction to `/ empty`" catch-all. That frame has zero inbound and is unreachable, so it was wiring nobody could get to.
- **Signing out changed meaning, not just destination.** `after sign out` landed on `/ unsent`, a home whose point was an unsent recording waiting. It now lands on `schedule`, where Marcus already reads Failed.

**Fourteen reactions lived inside the five frames, thirteen of them on visible layers.** Unlike the previous batch's dead frames, these were reachable screens retired by decision, not decay — cutting their wiring is what made archiving them safe.

---

## 2. `A S2 Home / schedule, sent` 227:2420

Cloned from `A S2 Home / schedule`, placed after `schedule, top`. Marcus Vance's row set to **`Status = sent`** and rewired to **`A4 Patient / list` 103:3027**; every other row untouched — all 14 read back at 72 tall with their names, times and statuses intact.

**Trap 34 did not fire.** `Status` is a variant axis and the trap says a switch drops text overrides; `Name` and `Time` both read back "Marcus Vance" / "9:15 AM" with no re-apply needed. The script was ready to re-apply and did not have to.

**But the clone brought a second starting point.** `page.flowStartingPoints` read **four** entries afterwards, including a duplicate named `Schedule` on 227:2420. It appeared nowhere in the clone result, and the duplicate *name* makes it invisible in a list — only the nodeId distinguishes them. Removed. This refines the tidy batch's note that "a cloned frame does not inherit a starting point": that clone was of a frame which had none. Now **trap 46 in PLUGIN-NOTES.md** — read `flowStartingPoints` after every frame clone, and filter by nodeId, not by name.

---

## 3. The rewire — thirteen redirects, no trigger added or removed

Each reaction was rebuilt with its original `trigger` and `navigation`, changing only `destinationId`. All thirteen read back with one reaction and an `ON_CLICK` trigger.

| Source | Layer | From | To |
|---|---|---|---|
| `A S1 Login / default` | Sign in CTA 103:2329 | / empty | **/ schedule** |
| `A S1 Login / error` | Sign in CTA 103:2340 | / empty | **/ schedule** |
| `A S1 Login / after sign out` | Sign in CTA 163:2947 | / unsent | **/ schedule** |
| `A S8 Sent / sent` | Next patient CTA 103:2483 | / after first capture | **/ schedule, sent** |
| `A S8 Sent / failed` | Back to patients 103:2980 | / after failed capture | **/ schedule** |
| `A4 Patient / list` | Back to patients | / empty | **/ schedule** |
| `A4 Patient / placeholder` | Back to patients | / empty | **/ schedule** |
| `A4 Patient / summary` | Back to patients | / empty | **/ schedule** |
| `A4 Patient / list, not sent` | Back to patients | / empty | **/ schedule** |
| `A S9 Account / unsent` | 1 recording not sent row 163:2791 | / unsent | **A4 Patient / list, not sent** |
| `/ schedule` | avatar `I204:4088;114:603` | A S9 Account | **A S9 Account / unsent** |
| `/ schedule, top` | avatar `I204:4133;114:603` | A S9 Account | **A S9 Account / unsent** |
| `/ schedule, sent` | avatar `I227:2426;114:603` | A S9 Account | A S9 Account *(unchanged, as ruled)* |

---

## 4. Archived

### The fourteen reactions removed

| Frame | Layer | Went to |
|---|---|---|
| `/ empty` | avatar · search field | A S9 Account · / searching |
| `/ sessions` | avatar · search field · Session row | A S9 Account · / results · A S8 Sent / failed |
| `/ after first capture` | avatar · search field · Session row *(hidden)* | A S9 Account · / results · A S8 Sent / failed |
| `/ after failed capture` | avatar · search field · Session row | A S9 Account · / results · A S8 Sent / failed |
| `/ unsent` | avatar · search field · Session row | A S9 Account / unsent · / results · A S7 Sending |

`Account screens` went **125 → 111**, exactly fourteen.

### Moved and unpinned

All five to `Archive` 214:3026 at y 13336, 14380, 15424, 16468, 17512 — below the 17 PROOF frames and the two dead screens. **The `Unsent recording` starting point was removed** with `/ unsent`.

### The Home row

Repacked to seven frames at 80 pitch: **schedule, schedule top, schedule sent, empty day, searching, results, no results.**

**This is a reorder, not just a repack, and it is my judgement rather than a ruling.** The tidy batch set rows to run "left to right in flow order". Keeping the old relative order would have left the row starting with `searching` and the actual home fourth. Trivially reversible if Daniel wants the original sequence.

---

## 5. Pages

`Visit screens` → **`Archive · Visit screens`** 43:705, `Screens` → **`Archive · Screens`** 1:3, both moved to the end. Contents, reactions and starting points untouched and re-read to prove it: 26 frames / 84 reactions / `Visit device`, and 18 frames / 42 reactions / `Happy path`. Every destination in both still resolves inside its own page.

**Page list now:** Foundations, Components, Flow, **Account screens**, Archive, Archive · Visit screens, Archive · Screens.

---

## What was found

### `schedule, sent` is drawn scrolled past the row it exists to show

The clone inherited the schedule's **y −292** offset, which peeks the Renata Ilves row. Marcus Vance sits at stack y 112–184, so at that offset he spans **−180 to −108** in the container: **entirely above the fold.**

The frame is where `A S8 Sent / sent`'s Next Patient lands, and its whole purpose is to show Marcus now reading **Sent** — which a provider arriving there cannot see. The contact sheet shows it: the right-hand panel opens on Yusuf Bahri at 11:00 AM.

Built exactly as the brief specified — clone, change Marcus, leave every other row — and **not resolved** (rule 10). The offset was not named in the ruling and choosing one is a design call. Offset **0** would show the whole morning including Marcus; **−40** would clear the heading and start on Dolores. Logged as `mobileSchedule_sentFrameScrolledPastMarcus` and raised in the plan's Open list.

### The search screens' avatars still go to `A S9 Account`

`searching`, `results` and `no results` were cloned from the old homes long ago and their avatars point at `A S9 Account` 140:1481, not the unsent variant. That is consistent with `schedule, sent` and inconsistent with `schedule` — but the ruling named only the three schedule frames, so they were left. Worth a look: a provider who searches while holding an unsent recording gets the account screen that does not mention it.

---

## Verification

| Page | Frames before | after | Reactions before | after |
|---|---|---|---|---|
| **Account screens** | 37 (+8 labels) | **33** (+8 labels) | 122 across 119 | **111 across 108** |
| **Archive** | 19 | **24** | 0 | 0 |
| Components | 36 (+4 labels) | 36 (+4 labels) | 0 | 0 |
| **Archive · Visit screens** | 26 | 26 | 84 across 81 | 84 across 81 |
| **Archive · Screens** | 18 | 18 | 42 across 41 | 42 across 41 |

**Every difference accounted for:**

- **Account screens frames 37 → 33**: **+1** the `schedule, sent` clone, **−5** the archived homes.
- **Account screens reactions 122 → 111**: **+3** carried in by the clone (avatar, search field, Marcus row), **−14** stripped from the five. The thirteen redirects are net zero — they changed destinations, not counts.
- **Archive 19 → 24**: the five homes.
- **Components untouched.** The two renamed pages untouched in content.

**Nothing on `Account screens` points at an archived frame** — all 29 destinations resolved and walked to their page; zero landed on `Archive`, `Archive · Visit screens` or `Archive · Screens`.

**No cross-page edges** on any page: `Account screens` 29 destinations all local; `Archive · Visit screens` 20 all local; `Archive · Screens` 13 all local; `Archive` and `Components` hold no reactions at all.

**Starting points: `Account device` 103:2320 and `Schedule` 204:4082** — the two the brief asks for, after removing `Unsent recording` and the duplicate the clone created.

**Zero overlaps** on `Account screens` and `Archive`.

### The two flows, traced as stored wiring

**Login → schedule → Marcus → Retry → Sending → Sent → Next Patient → schedule, sent**

| Step | Layer | → |
|---|---|---|
| 1 | `Sign in CTA` 103:2329 | `A S2 Home / schedule` |
| 2 | `Schedule row · Marcus Vance` | `A4 Patient / list, not sent` |
| 3 | `Not sent alert` (the whole alert) | `A S7 Sending` |
| 4 | `A S7 Sending`, frame-own `AFTER_TIMEOUT` | `A S8 Sent / sent` 103:2473 |
| 5 | `Next patient CTA` 103:2483 | `A S2 Home / schedule, sent` |

Closed. `A S7 Sending` also keeps its frame-own `ON_CLICK` to `A S8 Sent / failed`, the manual failure branch.

**Search → results → patient → back → schedule**

| Step | Layer | → |
|---|---|---|
| 1 | schedule's `Search field` | `A S2 Home / searching` |
| 2 | searching's `Search field` | `A S2 Home / results` |
| 3 | results' `Search result row` | `A4 Patient / list` 103:3027 |
| 4 | `Back to patients` | `A S2 Home / schedule` |

Closed, and it returns to the schedule rather than to a search state.

---

## What I believe but did not see

- **The prototype was not played.** Both flows are traced through stored `destinationId`s, hop by hop; that they navigate is inference from the wiring resolving, not observation.
- **The redirects preserved `transition` and `resetScrollPosition` by copying them off the old action.** Each read back with the right trigger and destination, but I did not diff the full action object field by field.
- **`Archive · Visit screens` and `Archive · Screens` were verified self-contained after the rename**, but their internals were not otherwise inspected; "contents untouched" rests on unchanged frame and reaction counts.
- **The search screens' avatar destinations are reported, not tested** — I read where they point, not what that looks like to a provider mid-search.
- **The page screenshot is 710 × 1500 for a 3570 × 7546 page**, so frames in it are thumbnails; counts and overlaps were verified by arithmetic, and `schedule, sent` was exported separately at 1x.
- Both screenshots were **looked at before this was written**, which is how the scrolled-past-Marcus problem was caught.

---

## Renders

- `figma-export/schedule-only-home-2026-09-17/account-screens-page.png`
- `figma-export/schedule-only-home-2026-09-17/as2-home-schedule-sent-227-2420-1x.png`
- `reports/Make the schedule the only home.png` — the two side by side
