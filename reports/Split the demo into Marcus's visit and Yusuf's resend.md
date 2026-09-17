# Split the demo into Marcus's visit and Yusuf's resend

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, page `Account screens` · `figma.skipInvisibleInstanceChildren = false` on every read · no node deleted

![contact sheet](Split%20the%20demo%20into%20Marcus's%20visit%20and%20Yusuf's%20resend.png)

---

## 1. Inventory — read-only, and it matched

Nothing conflicted with the brief, so nothing had to stop.

**Reactions on the six home and search frames** — `schedule` and `schedule, top` each had avatar → `A S9 Account / unsent`, search field → `searching`, and a Marcus row → `A4 Patient / list, not sent`. `schedule, sent` had avatar → `A S9 Account`, search field → `searching`, Marcus row → `A4 Patient / list`. The three search screens each had avatar → `A S9 Account` and a search field; `results` also had `Search result row` → `A4 Patient / list`.

**Around the resend frames** — `A4 Patient / list, not sent` had **six** outbound: back, device pill, two chart rows, Start Recording, and the alert → `A S7 Sending`. `A S7 Sending` had two frame-own: `AFTER_TIMEOUT` → `A S8 Sent / sent`, `ON_CLICK` → `A S8 Sent / failed`. Four things pointed into `A S7 Sending` — the failed frame's Retry, the sign-out warning's Retry, the stop overlay's button, and that alert.

**"Marcus Vance" outside the A4/A5/A S5 frames** — ten text nodes: one in `results`, one in `A S8 Sent / sent`'s body, two on `A S9 Account / unsent`, three on `/ sign-out warning`, and one row label on each of the three schedule frames.

One thing the inventory turned up that the brief did not mention: **`A S9 Account / unsent`'s back is a `BACK` navigation, not a NODE**, which is why it read as a null destination. Left alone.

---

## 2. Schedule rows — Marcus and Yusuf swap places

| Frame | 9:15 | 11:00 |
|---|---|---|
| `schedule` 204:4082 | **Yusuf Bahri**, failed → `A4 Yusuf / list, not sent` | **Marcus Vance**, none → `A4 Patient / list` |
| `schedule, top` 204:4127 | **Yusuf Bahri**, failed → `A4 Yusuf` | **Marcus Vance**, none → `A4 Patient / list` |
| `schedule, Marcus sent` 227:2420 | **Yusuf Bahri**, failed → `A4 Yusuf` | **Marcus Vance**, sent, no reaction |
| `schedule, both sent` 230:4677 | **Yusuf Bahri**, sent, no reaction | **Marcus Vance**, sent, no reaction |

`A S2 Home / schedule, sent` was renamed **`A S2 Home / schedule, Marcus sent`**, and cloned as **`A S2 Home / schedule, both sent`** at offset **0**. Avatars: `schedule`, `schedule, top`, `schedule, Marcus sent` and the three search screens → `A S9 Account / unsent`; `schedule, both sent` → `A S9 Account`.

**The scrolled-past GAP closes itself.** `mobileSchedule_sentFrameScrolledPastMarcus` recorded that `schedule, sent` was drawn past the row it existed to show. Moving Marcus to 11:00 puts him at stack y **328** — the first full row at the frame's unchanged **−292** offset. The render confirms it: the frame opens on "Marcus Vance, 11:00 AM, Sent". **Fixed by moving the row, not the offset**, so the peek cue survives — Renata Ilves still half-shows above him.

---

## 3. Yusuf's resend frames

**`A4 Yusuf / list, not sent` 200:6707**, renamed, identity changed to Yusuf Bahri, DOB 07/22/1985. **Four reactions removed**, leaving the chart inert:

| Layer | Went to |
|---|---|
| `Input device pill` | A S3 Microphone |
| `Visit/Chart row · Patient summary` | A4 Patient / summary |
| `Visit/Chart row · Medications` | A4 Patient / placeholder |
| `Start recording CTA` | A S5 Recording / recording |

Kept: back → **`schedule, Marcus sent`**, and the alert → **`A S7 Sending / Yusuf`**.

**`A S7 Sending / Yusuf` 230:5061**, cloned from `A S7 Sending`: `AFTER_TIMEOUT` → `A S8 Sent / Yusuf`, `ON_CLICK` → `A S8 Sent / failed` (unchanged).

**`A S8 Sent / Yusuf` 230:5044**, cloned from `A S8 Sent / sent`, body now "The note for Yusuf Bahri is being generated. You'll find it in your desktop queue.", Next Patient → **`schedule, both sent`**.

**Trap 46 checked after all three clones, and none inherited a starting point** — because none of the three source frames is one. The check ran and found nothing, which is the point: the trap fires only when the source is itself a starting point, as last batch's clone of `schedule` was.

---

## 4. Account copy

Five text nodes changed across the two account frames: the unsent row's secondary line and the warning body, **including two on hidden superseded rows**, so no stale "Marcus Vance · Yesterday, 4:30 PM" survives anywhere. A re-scan for "Marcus" on both frames returns nothing.

The unsent row → `A4 Yusuf / list, not sent`; the warning's Retry → `A S7 Sending / Yusuf`.

---

## What was found

### A defect I introduced, caught by the render

**Yusuf's DOB wrapped and clipped.** `Patient detail` is a **FIXED 103-wide** box with `textAutoResize: NONE`, sized for "DOB 03/14/1972". "DOB 07/22/1985" needs **105** — two pixels more — so it wrapped to two lines, pushed the identity row from 44 to 48, and had its second line cut off by the row's clip.

Every geometry read passed, because nothing in the tree is wrong: the box is exactly as built. **Only the picture showed it.**

Fixed in the same batch: `textAutoResize` → `WIDTH_AND_HEIGHT`, `layoutSizingHorizontal` → `HUG`, matching how `Patient name` beside it already behaves. Detail is now 105 × 20 on one line, the row is back to **44**, and the frame's other geometry is untouched — bar 201, alert at 201 × 48, drawer 265 × 579, frame 844. Logged and struck as `mobileAccount_yusufDobWrappedOnIdentityRow`.

**The two-pixel margin is the lesson**: any name or date on that row can overflow it silently, because the box is fixed and the clip hides the evidence.

### Yusuf's row is above the fold on the frame his scenario starts from

The resend scenario begins on `schedule, Marcus sent`, and the first thing it asks you to do is tap Yusuf's 9:15 row. At the −292 offset that row sits at stack y 112–184, which is **entirely above the container top**. The row is wired and the list scrolls, so the prototype works — but the frame as drawn does not show the thing the demo asks you to tap next.

This is the mirror of the GAP just closed, and it is not resolvable without a trade-off: the same offset that makes Marcus the first full row is what hides Yusuf. **Not resolved** (rule 10) — raised in the plan's Open list.

---

## Verification

| | Before | After |
|---|---|---|
| Frames | 33 | **36** |
| Page children | 41 (33 + 8 labels) | **44** (36 + 8 labels) |
| Reactions | 111 across 108 | **114 across 110** |
| Destinations | 29 | 32 |

**Every difference accounted for:**

- **+3 frames**: `schedule, both sent` 230:4677, `A S8 Sent / Yusuf` 230:5044, `A S7 Sending / Yusuf` 230:5061.
- **Reactions +3 net**, from five separate movements:
  - **+2** carried in by the `both sent` clone (avatar, search field) — its 9:15 row's reaction was cleared
  - **+1** `A S8 Sent / Yusuf` (Next Patient)
  - **+2** `A S7 Sending / Yusuf` (two frame-own)
  - **+2** the 11:00 rows on `schedule` and `schedule, top`, which were inert and now open Marcus's chart
  - **−4** removed from `A4 Yusuf`
- The thirteen-odd redirects are net zero: they changed destinations, not counts.

**Starting points: exactly `Account device` 103:2320 and `Schedule` 204:4082.** Checked after every clone.

**No cross-page edges** — all 32 destinations resolved and walked to their page; every one lands on `Account screens`. **Zero overlaps.**

### Main path, traced as stored wiring

| Step | Layer | → |
|---|---|---|
| 1 | `Sign in CTA` | A S2 Home / schedule |
| 2 | `Schedule row · Marcus Vance` (11:00) | A4 Patient / list |
| 3 | `Visit/Chart row · Patient summary` | A4 Patient / summary |
| 4 | `Back tap target 48` (sheet back) | A4 Patient / list |
| 5 | `Start recording CTA` | A S5 Recording / recording |
| 6 | `Stop` | A S6 Stop confirmation / overlay |
| 7 | overlay `Button` | A S7 Sending |
| 8 | `A S7 Sending`, frame-own `AFTER_TIMEOUT` | A S8 Sent / sent |
| 9 | `Next patient CTA` | **A S2 Home / schedule, Marcus sent** |

### Resend path, traced as stored wiring

| Step | Layer | → |
|---|---|---|
| 1 | `Schedule row · Yusuf Bahri` on `schedule, Marcus sent` | A4 Yusuf / list, not sent |
| 2 | `Not sent alert` | A S7 Sending / Yusuf |
| 3 | `A S7 Sending / Yusuf`, frame-own `AFTER_TIMEOUT` | A S8 Sent / Yusuf |
| 4 | `Next patient CTA` | **A S2 Home / schedule, both sent** |

Both closed.

---

## What I believe but did not see

- **The prototype was not played.** Both paths are traced hop by hop through stored `destinationId`s; that they navigate is inference from the wiring resolving.
- **Step 4 of the main path resolved to the sheet back only after a correction.** My first trace matched `Back to patients` — the frame-level back to the schedule — because both layers match "back". The sheet back is `Back tap target 48`. The trace above is the corrected one; the wiring was never wrong, my predicate was.
- **DOB 07/22/1985 is a placeholder**, as the brief states. No real date of birth was used or inferred.
- **The five copy changes were verified by re-scanning for "Marcus" on the two account frames**, which returns nothing — but I did not re-render those frames, so the new strings are confirmed in the tree and not in pixels.
- **`A S7 Sending / Yusuf`'s failure branch was not traced.** It points at the shared `A S8 Sent / failed`, whose Retry goes back to the *original* `A S7 Sending` — so a failed Yusuf resend would rejoin Marcus's sending frame. Reported rather than changed; the brief said any failure tap goes to `A S8 Sent / failed`, and it does.
- All five renders were **looked at before this was written**, which is the only reason the DOB clip was caught.

---

## Renders

- `figma-export/marcus-yusuf-split-2026-09-17/1-schedule-204-4082-1x.png`
- `figma-export/marcus-yusuf-split-2026-09-17/2-schedule-marcus-sent-227-2420-1x.png`
- `figma-export/marcus-yusuf-split-2026-09-17/3-schedule-both-sent-230-4677-1x.png`
- `figma-export/marcus-yusuf-split-2026-09-17/4-a4-yusuf-not-sent-200-6707-1x.png`
- `figma-export/marcus-yusuf-split-2026-09-17/5-as8-sent-yusuf-230-5044-1x.png`
- `reports/Split the demo into Marcus's visit and Yusuf's resend.png` — the five side by side
