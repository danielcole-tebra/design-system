# Tidy the Account screens page

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, pages `Account screens`, `Components` and the new `Archive` · `figma.skipInvisibleInstanceChildren = false` on every read · no node deleted

![contact sheet](Tidy%20the%20Account%20screens%20page.png)

---

## 0. The version checkpoint

`figma.saveVersionHistoryAsync` **exists as a function** but throws `"saveVersionHistoryAsync" is not a supported API`. It was re-tested rather than assumed, because the PLUGIN-NOTES entry recording this was four days old and the checkpoint is the only protection for a batch that moves 8 nodes between pages and relays 47.

**This batch stopped at that gate and reported the inventory** (commit `aa3406b`). Daniel saved **"Before tidy, 2026-09-17"** by hand and the batch resumed from there. Everything below step 1 happened after that save.

---

## 1. Inventory — `Account screens` before the tidy, all 47 top-level nodes

Sorted by y then x. **In** and **Out** are counts of reactions pointing at the node and reactions living inside it.

| Name | id | Type | State | In | Out | Start | x, y | w × h | Overlaps |
|---|---|---|---|---|---|---|---|---|---|
| `A S1 Login / default` | 103:2320 | frame | visible, — | 2 | 2 | **yes** | 120, 120 | 390 × 844 | — |
| `A S1 Login / error` | 103:2330 | frame | visible, — | 0 | 2 |  | 590, 120 | 390 × 844 | — |
| `A S1 Login / after sign out` | 163:2938 | frame | visible, — | 1 | 2 |  | 1060, 120 | 390 × 844 | — |
| `Account/Avatar` | 108:1212 | component | visible, — | 0 | 0 |  | 4000, 120 | 40 × 40 | — |
| `PROOF · Account/Avatar rebound…` | 108:1225 | frame | visible, PROOF | 0 | 0 |  | 4000, 220 | 1165 × 136 | — |
| `PROOF · Button every variant value` | 109:1212 | frame | visible, PROOF | 0 | 0 |  | 4000, 440 | 1074 × 134 | — |
| `Account/Top bar` | 114:600 | set | visible, — | 0 | 0 |  | 4000, 640 | 390 × 264 | — |
| `PROOF · Account/Top bar vs Visit/Top bar…` | 114:1721 | frame | visible, PROOF | 0 | 0 |  | 4000, 1000 | 892 × 227 | unsent; schedule; schedule, top |
| `A S2 Home / empty` | 103:2341 | frame | visible, — | 7 | 2 |  | 120, 1120 | 390 × 844 | — |
| `A S2 Home / sessions` | 103:2353 | frame | visible, — | 0 | 3 |  | 590, 1120 | 390 × 844 | — |
| `A S2 Home / results` | 103:2370 | frame | visible, — | 5 | 3 |  | 1530, 1120 | 390 × 844 | — |
| `A S2 Home / no results` | 103:2383 | frame | visible, — | 0 | 2 |  | 2000, 1120 | 390 × 844 | — |
| `A S2 Home / searching` | 103:2981 | frame | visible, — | 6 | 2 |  | 2470, 1120 | 390 × 844 | — |
| `A S2 Home / after first capture` | 103:2993 | frame | visible, — | 1 | 3 |  | 2940, 1120 | 390 × 844 | — |
| `A S2 Home / after failed capture` | 103:3010 | frame | visible, — | 1 | 3 |  | 3410, 1120 | 390 × 844 | — |
| `A S2 Home / unsent` | 140:1618 | frame | visible, — | 2 | 3 | **yes** | 3880, 1120 | 390 × 844 | PROOF Top bar; Mic sheet; List row |
| `A S2 Home / schedule` | 204:4082 | frame | visible, — | 0 | 3 | **yes** | 4350, 1120 | 390 × 844 | PROOF Top bar; Mic sheet; PROOF Mic sheet; List row |
| `A S2 Home / schedule, top` | 204:4127 | frame | visible, — | 0 | 3 |  | 4820, 1120 | 390 × 844 | PROOF Top bar; PROOF Mic sheet |
| `A S2 Home / empty day` | 204:4172 | frame | visible, — | 0 | 2 |  | 5290, 1120 | 390 × 844 | — |
| `Account/Microphone sheet` | 121:1793 | component | visible, — | 0 | 0 |  | 4000, 1300 | 390 × 256 | unsent; schedule |
| `PROOF · Account/Microphone sheet…` | 121:1848 | frame | visible, PROOF | 0 | 0 |  | 4450, 1300 | 390 × 844 | schedule; schedule, top |
| `Account/List row` | 163:1444 | component | visible, — | 0 | 0 |  | 4000, 1800 | 390 × 72 | unsent; schedule |
| `A S3 Microphone` | 103:2397 | frame | visible, — | 7 | 4 |  | 120, 1964 | 390 × 844 | — |
| `A S4 Patient` | 103:2412 | frame | **hidden, SUPERSEDED** | 0 | **3** |  | 120, 2808 | 390 × 844 | — |
| `A S5 Recording / recording` | 103:2426 | frame | visible, — | 18 | 5 |  | 120, 3772 | 390 × 844 | — |
| `A S5 Recording / paused` | 103:2438 | frame | visible, — | 10 | 5 |  | 590, 3772 | 390 × 844 | — |
| `A S6 Stop confirmation` | 103:2451 | frame | **hidden, SUPERSEDED** | 0 | **3** |  | 1060, 3772 | 390 × 844 | — |
| `A S5 Recording / microphone` | 133:4410 | frame | visible, — | 1 | 4 |  | 1530, 3772 | 390 × 844 | — |
| `A S5 Paused / microphone` | 133:4508 | frame | visible, — | 1 | 4 |  | 2000, 3772 | 390 × 844 | — |
| `A S6 Stop confirmation / overlay` | 166:5058 | frame | visible, — | 7 | 2 |  | 2470, 3772 | 326 × 238 | — |
| `A S7 Sending` | 103:2463 | frame | visible, — | 6 | 2 |  | 120, 4736 | 390 × 844 | — |
| `A S8 Sent / sent` | 103:2473 | frame | visible, — | 1 | 1 |  | 120, 5700 | 390 × 844 | — |
| `A S8 Sent / failed` | 103:2969 | frame | visible, — | 4 | 2 |  | 590, 5700 | 390 × 844 | — |
| `A4 Patient / summary` | 103:3037 | frame | visible, — | 2 | 4 |  | 120, 6800 | 390 × 844 | — |
| `A4 Patient / list` | 103:3027 | frame | visible, — | 3 | 5 |  | 590, 6800 | 390 × 844 | — |
| `A4 Patient / placeholder` | 103:3032 | frame | visible, — | 2 | 4 |  | 1060, 6800 | 390 × 844 | — |
| `A4 Patient / list, not sent` | 200:6707 | frame | visible, — | 2 | 6 |  | 1530, 6800 | 390 × 844 | — |
| `A5 Recording / drawer list` | 103:3042 | frame | visible, — | 5 | 6 |  | 120, 7900 | 390 × 844 | — |
| `A5 Recording / summary` | 103:3045 | frame | visible, — | 2 | 5 |  | 590, 7900 | 390 × 844 | — |
| `A5 Recording / medications` | 103:3048 | frame | visible, — | 1 | 5 |  | 1060, 7900 | 390 × 844 | — |
| `A5 Paused / summary` | 103:3051 | frame | visible, — | 2 | 5 |  | 1530, 7900 | 390 × 844 | — |
| `A5 Paused / drawer list` | 103:3054 | frame | visible, — | 4 | 5 |  | 2000, 7900 | 390 × 844 | — |
| `A S9 Account` | 140:1481 | frame | visible, — | 10 | 3 |  | 120, 8900 | 390 × 844 | — |
| `A S9 Account / unsent` | 140:1547 | frame | visible, — | 2 | 4 |  | 590, 8900 | 390 × 844 | — |
| `A S9 Account / sign-out warning` | 163:2812 | frame | visible, — | 1 | 3 |  | 1060, 8900 | 390 × 844 | — |
| `A S10 Forgot password` | 164:1604 | frame | visible, — | 3 | 2 |  | 1530, 8900 | 390 × 844 | — |
| `A S11 Reset sent` | 164:1720 | frame | visible, — | 1 | 1 |  | 2000, 8900 | 390 × 844 | — |

**Before: 47 nodes — 43 frames, 3 components, 1 component set. 128 reactions. 3 starting points. Seven overlapping pairs.**

---

## 2. What moved

**To `Components`**, placed at y 9200 in a clear band below the `Visit/` masters, 600 pitch, no overlap with anything:

| Master | id | at |
|---|---|---|
| `Account/Top bar` (set) | 114:600 | 0, 9200 |
| `Account/Microphone sheet` | 121:1793 | 600, 9200 |
| `Account/List row` | 163:1444 | 1200, 9200 |
| `Account/Avatar` | 108:1212 | 1800, 9200 |

**To `Archive` 214:3026**, a new page, stacked with 200 between them:

| PROOF frame | id | In | Out |
|---|---|---|---|
| `PROOF · Account/Avatar rebound…` | 108:1225 | 0 | 0 |
| `PROOF · Button every variant value` | 109:1212 | 0 | 0 |
| `PROOF · Account/Top bar vs Visit/Top bar…` | 114:1721 | 0 | 0 |
| `PROOF · Account/Microphone sheet…` | 121:1848 | 0 | 0 |

`Archive` holds **4 frames, 0 reactions, 0 starting points**, no overlaps.

### Two frames could not go, and that is the finding

`A S4 Patient` 103:2412 and `A S6 Stop confirmation` 103:2451 are both **hidden, SUPERSEDED and zero inbound** — they qualify on every count but one. Each carries **three outbound reactions to live frames**:

| Frame | Points at |
|---|---|
| `A S4 Patient` 103:2412 | `A S2 Home / empty`, `A S3 Microphone`, `A S5 Recording / recording` |
| `A S6 Stop confirmation` 103:2451 | `A S5 Recording / recording` ×2, `A S7 Sending` |

Archiving either would have put six edges across a page boundary. Under the brief's own rule **both stayed**, at the end of the Patient and Stop rows.

Worth saying plainly: these are **dead frames tethered to live ones by reactions nobody can fire**, because both frames are hidden. Cutting those six frees both to archive. That is a ruling, not a tidy.

### Five frames stay but want Daniel's eye

Zero inbound, not starting points, not labelled — nothing in the prototype reaches them:

| Frame | What it shows |
|---|---|
| `A S1 Login / error` 103:2330 | The login card with an error alert. **The only login state with no way in** |
| `A S2 Home / sessions` 103:2353 | "Today" and three session rows, one Failed. **The pre-schedule home — arguably superseded now** |
| `A S2 Home / no results` 103:2383 | "No patients match" under the search field |
| `A S2 Home / schedule, top` 204:4127 | The schedule at the list's start, a reference for the unscrolled state |
| `A S2 Home / empty day` 204:4172 | "No appointments today" |

---

## 3. The layout

Eight rows, each with a 28 px Akkurat LL Bold label at x 0, frames from x 360, **80 between frames and 200 between rows**. The widest label is 259, so no label reaches the frames.

| Row | y | Frames |
|---|---|---|
| Sign in | 0 | default, error, after sign out, A S10, A S11 |
| Home and schedule | 1044 | empty, sessions, searching, results, no results, after first capture, after failed capture, unsent, schedule, schedule top, empty day |
| Microphone | 2088 | A S3, A S5 Recording / microphone, A S5 Paused / microphone |
| Patient | 3132 | list, summary, placeholder, list not sent, *A S4 (hidden)* |
| Recording | 4176 | recording, paused, A5 drawer list, A5 summary, A5 medications, A5 Paused drawer list, A5 Paused summary |
| Stop | 5220 | the overlay, *A S6 (hidden)* |
| Hand off | 6264 | A S7, A S8 sent, A S8 failed |
| Account | 7308 | A S9, A S9 unsent, sign-out warning |

**39 frames placed, 0 unplaced, 0 overlaps.** Page bounds 5450 × 8152.

**One consequence of keeping the two hidden frames in place:** they occupy layout space and render nothing, so the Patient row has an empty slot at its end and the Stop row is 844 tall to hold a hidden 844 frame beside a 238 overlay. In the page screenshot the Stop row is mostly empty. That is the cost of the rule, and it disappears if those six reactions are ever cut.

---

## 4. The Forgot Password link

The link is a `Forgot password link` Button inside a `Forgot password row` frame, which fills the card's 310 content width. The row was a HORIZONTAL auto-layout with `primaryAxisAlignItems: MAX`. It is now **`CENTER`**, on all three login frames.

| Frame | Button x before | after | right before | after |
|---|---|---|---|---|
| `A S1 Login / default` 103:2320 | 201 | **120.5** | 350 | 269.5 |
| `A S1 Login / error` 103:2330 | 201 | **120.5** | 350 | 269.5 |
| `A S1 Login / after sign out` 163:2938 | 201 | **120.5** | 350 | 269.5 |

The button's centre lands on **179**, which is exactly the centre of the 358-wide card. **Vertical spacing is untouched**: the row is still 36 tall at y 424 (508 on error), the card's `itemSpacing` is still 16, and the cards are still 282 and 366 tall.

**The new x is a half pixel and cannot be otherwise.** The row's content is 310 and the button 149, so the free space is 161 — odd. Exact centring and rule 4's integer-px cannot both hold unless the button width or the card padding changes by one. Centre was kept, because it is what was ruled and because the auto-layout keeps it true if the label ever changes. **Recorded, not faked away.**

### The ruling it supersedes

`mobileAccount_forgotLinkRightAlignedUnderPassword` (FLAGS.md) set the right edge at **350** on 2026-09-16. It was **already struck through** — closed the same day when Daniel ruled the 16/16 spacing — but its text still carried the 350, and **`mobile-spec.md` §6.1 still stated it as live**. The spec line was the one actually wrong. Both now carry the supersession; §6.1 reads "centred horizontally in the card at x 120.5".

---

## Verification

| Page | Before | After | Reactions before | after |
|---|---|---|---|---|
| **Account screens** | 43 frames, 4 components | **39 frames, 8 labels, 0 components** | 128 across 125 | **128 across 125** |
| **Components** | 45 children | **49 children** | 0 | 0 |
| **Archive** | did not exist | **4 frames** | — | **0** |
| Visit screens | 26 frames | 26 frames | 84 across 81 | 84 across 81 |
| Screens | 18 frames | 18 frames | 42 across 41 | 42 across 41 |

**Every difference accounted for:**

- **Account screens −4 frames**: the four PROOF frames left for `Archive`. **−4 components**: the four `Account/` masters left for `Components`. **+8 TEXT**: the row labels. 47 → 47 children by coincidence, but the composition is entirely different.
- **Components +4**: exactly those four masters.
- **Archive +4**: exactly those four PROOF frames.
- **Reactions unchanged everywhere.** Moving a frame within a page does not touch its reactions, and nothing that moved between pages had any — all eight moved nodes were 0 in, 0 out.

**Starting points unchanged: three**, same nodes — `Account device` 103:2320, `Unsent recording` 140:1618, `Schedule` 204:4082. `Archive` has none.

**No reaction crosses pages.** All **31** distinct destination ids on `Account screens` resolved and walked to their page; every one lands on `Account screens`. `Archive` and `Components` hold zero reactions, so neither can source a cross-page edge.

**Overlaps: seven before, zero after** on `Account screens`, and zero on `Archive`.

---

## What I found that was not asked for

**The `Components` page has eight overlapping pairs of its own**, none involving the four masters I placed:

```
Status chip >< Visit/Drawer              Session row >< Microphone list row
Search result row >< Visit/Drawer        Session row >< Visit/Drawer
Microphone list row >< Visit/Drawer      Microphone summary row >< Visit/Drawer
PROOF Batch 2 >< Visit/Recording bar     PROOF Visit MUI icons >< Visit/Chart row
```

`Visit/Drawer` 48:897 is 1362 tall at y −64 and sits under five other nodes. This is the same class of mess this batch just cleared off `Account screens`, and the plan's old "Tidy up" item half-named it. **Not touched** — out of scope, and the plan's Next entry is rewritten to describe it properly.

---

## What I believe but did not see

- **The prototype was not played.** Reaction counts and destinations are read from nodes; that the flows still work is inferred from the counts being identical and every destination resolving on-page.
- **"Moving a frame does not change its reactions" was verified by count, not per-reaction.** 128 across 125 before and after, and all 31 destinations still resolve — but I did not diff each reaction's JSON before and after the relayout.
- **The row order within each row is my reading of flow order**, not a ruling. Sign in and Hand off are unambiguous; the eleven Home frames and the seven Recording frames are a judgement about what follows what.
- **The two hidden SUPERSEDED frames were not opened.** Their outbound reactions were read; whether anything inside them is still worth keeping was not assessed.
- **The page screenshot is a 936 × 1400 render of a 5450 × 8152 page**, so individual frames in it are thumbnails. Overlap and placement were verified by arithmetic on bounding boxes, not by eye at that scale; `A S1 Login / default` was exported separately at 1x to check the link.
- All three screenshots were **looked at before this was written**.

---

## Renders

- `figma-export/tidy-account-2026-09-17/account-screens-page.png`
- `figma-export/tidy-account-2026-09-17/archive-page.png`
- `figma-export/tidy-account-2026-09-17/as1-login-default-103-2320-1x.png`
- `reports/Tidy the Account screens page.png` — the three side by side
