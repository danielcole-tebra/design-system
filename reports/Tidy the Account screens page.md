# Tidy the Account screens page

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, pages `Account screens` and `Components` · `figma.skipInvisibleInstanceChildren = false` on every read

> **STOPPED AT STEP 0. Nothing in Figma was changed.** The Plugin API cannot save a named version, so this batch stopped at its own gate, as the brief instructs. Step 1's inventory was run anyway — it is read-only, it costs nothing, and it is what the rest of the batch depends on. Steps 2, 3 and 4 are not started.

---

## 0. The version checkpoint — the API refuses

`figma.saveVersionHistoryAsync` **exists as a function** (`typeof` returns `function`) but throws on call:

```
in saveVersionHistoryAsync: "saveVersionHistoryAsync" is not a supported API
```

This confirms the note already in PLUGIN-NOTES.md from 2026-09-13. It was re-tested rather than assumed, because the note was four days old and a checkpoint is the one thing protecting this batch's moves. It is unchanged.

**Daniel: please save a version by hand before this resumes** — in Figma, `File → Save to version history…`, named **"Before tidy, 2026-09-17"**. This batch moves 8 nodes between pages and relays 47, and a hand-saved checkpoint is the only undo that survives a bad layout pass.

---

## 1. Inventory — `Account screens`, all 47 top-level nodes

Sorted by y then x, which is reading order on the canvas. **In** and **Out** are counts of reactions pointing at the node and reactions living inside it.

| Name | id | Type | State | In | Out | Start | x, y | w × h | Overlaps |
|---|---|---|---|---|---|---|---|---|---|
| `A S1 Login / default` | 103:2320 | frame | visible, — | 2 | 2 | **yes** | 120, 120 | 390 × 844 | — |
| `A S1 Login / error` | 103:2330 | frame | visible, — | 0 | 2 |  | 590, 120 | 390 × 844 | — |
| `A S1 Login / after sign out` | 163:2938 | frame | visible, — | 1 | 2 |  | 1060, 120 | 390 × 844 | — |
| `Account/Avatar` | 108:1212 | component | visible, — | 0 | 0 |  | 4000, 120 | 40 × 40 | — |
| `PROOF · Account/Avatar rebound vs library Av` | 108:1225 | frame | visible, PROOF | 0 | 0 |  | 4000, 220 | 1165 × 136 | — |
| `PROOF · Button every variant value 2026-09-1` | 109:1212 | frame | visible, PROOF | 0 | 0 |  | 4000, 440 | 1074 × 134 | — |
| `Account/Top bar` | 114:600 | set | visible, — | 0 | 0 |  | 4000, 640 | 390 × 264 | — |
| `PROOF · Account/Top bar vs Visit/Top bar, Ti` | 114:1721 | frame | visible, PROOF | 0 | 0 |  | 4000, 1000 | 892 × 227 | A S2 Home / unsent; A S2 Home / schedule; A S2 Home / schedule, top |
| `A S2 Home / empty` | 103:2341 | frame | visible, — | 7 | 2 |  | 120, 1120 | 390 × 844 | — |
| `A S2 Home / sessions` | 103:2353 | frame | visible, — | 0 | 3 |  | 590, 1120 | 390 × 844 | — |
| `A S2 Home / results` | 103:2370 | frame | visible, — | 5 | 3 |  | 1530, 1120 | 390 × 844 | — |
| `A S2 Home / no results` | 103:2383 | frame | visible, — | 0 | 2 |  | 2000, 1120 | 390 × 844 | — |
| `A S2 Home / searching` | 103:2981 | frame | visible, — | 6 | 2 |  | 2470, 1120 | 390 × 844 | — |
| `A S2 Home / after first capture` | 103:2993 | frame | visible, — | 1 | 3 |  | 2940, 1120 | 390 × 844 | — |
| `A S2 Home / after failed capture` | 103:3010 | frame | visible, — | 1 | 3 |  | 3410, 1120 | 390 × 844 | — |
| `A S2 Home / unsent` | 140:1618 | frame | visible, — | 2 | 3 | **yes** | 3880, 1120 | 390 × 844 | PROOF · Top bar; Account/Microphone sheet; Account/List row |
| `A S2 Home / schedule` | 204:4082 | frame | visible, — | 0 | 3 | **yes** | 4350, 1120 | 390 × 844 | PROOF · Top bar; Account/Microphone sheet; PROOF · Microphone sheet; Account/List row |
| `A S2 Home / schedule, top` | 204:4127 | frame | visible, — | 0 | 3 |  | 4820, 1120 | 390 × 844 | PROOF · Top bar; PROOF · Microphone sheet |
| `A S2 Home / empty day` | 204:4172 | frame | visible, — | 0 | 2 |  | 5290, 1120 | 390 × 844 | — |
| `Account/Microphone sheet` | 121:1793 | component | visible, — | 0 | 0 |  | 4000, 1300 | 390 × 256 | A S2 Home / unsent; A S2 Home / schedule |
| `PROOF · Account/Microphone sheet over the re` | 121:1848 | frame | visible, PROOF | 0 | 0 |  | 4450, 1300 | 390 × 844 | A S2 Home / schedule; A S2 Home / schedule, top |
| `Account/List row` | 163:1444 | component | visible, — | 0 | 0 |  | 4000, 1800 | 390 × 72 | A S2 Home / unsent; A S2 Home / schedule |
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

**47 nodes: 43 frames, 3 components, 1 component set. 128 reactions. 3 starting points.**

---

## What the inventory decides, before a single node moves

### The two SUPERSEDED frames cannot go to `Archive`

Both have **zero inbound** and would otherwise qualify, but both carry **outbound reactions to live frames**. Under the brief's own rule they stay where they are, and here is what they point at:

**`A S4 Patient` 103:2412** (hidden, SUPERSEDED) — 3 outbound, all `ON_CLICK` from the frame:

| To | |
|---|---|
| `A S2 Home / empty` 103:2341 | live |
| `A S3 Microphone` 103:2397 | live |
| `A S5 Recording / recording` 103:2426 | live |

**`A S6 Stop confirmation` 103:2451** (hidden, SUPERSEDED) — 3 outbound, all `ON_CLICK` from the frame:

| To | |
|---|---|
| `A S5 Recording / recording` 103:2426 | live, twice |
| `A S7 Sending` 103:2463 | live |

Moving either would put six edges across a page boundary. **Both stay put.** Worth saying plainly: these are dead frames tethered to live ones by reactions nobody will ever fire, because both frames are hidden. Cutting those six reactions would free both to archive — that is a separate ruling for Daniel, not something to do inside a tidy.

### Four components move to `Components`, cleanly

`Account/Avatar` 108:1212, `Account/Top bar` 114:600 (set), `Account/Microphone sheet` 121:1793, `Account/List row` 163:1444 — all **0 in, 0 out**, none a starting point. Nothing blocks them.

### Four PROOF frames move to `Archive`, cleanly

108:1225, 109:1212, 114:1721, 121:1848 — all **0 in, 0 out**, none a starting point.

### Five frames stay put but want Daniel's eye

Zero inbound, not starting points, not labelled — so nothing reaches them in the prototype:

| Frame | What it shows |
|---|---|
| `A S1 Login / error` 103:2330 | The login card with an error alert. Nothing navigates to it; the error state is a design reference, not a reachable screen |
| `A S2 Home / sessions` 103:2353 | "Today" and three session rows, one Failed. The pre-schedule home — arguably now replaced by the schedule frames |
| `A S2 Home / no results` 103:2383 | "No patients match" under the search field |
| `A S2 Home / schedule, top` 204:4127 | The schedule at the list's start. Built last batch as a reference for the unscrolled state |
| `A S2 Home / empty day` 204:4172 | "No appointments today" |

Two of these are worth a decision rather than a shrug: **`A S2 Home / sessions`** may be genuinely superseded by the schedule now, and **`A S1 Login / error`** is the only login state with no way in.

### The overlaps are real and all in one place

Seven overlapping pairs, all in the band **x 3880–5680, y 1120–2144** — where last batch's three schedule frames were placed at x 4350, 4820 and 5290, straight through the column of `Account/` masters and PROOF frames parked at x 4000–4842. Nothing else on the page overlaps anything.

The tidy fixes this by construction: the masters leave for `Components`, the PROOF frames leave for `Archive`, and the A S2 row is relaid on an 80 pitch.

---

## Not started

Steps **2 (move)**, **3 (lay out in rows)** and **4 (centre Forgot Password)** are untouched, as are the two DECISIONs, the spec edits and the screenshots. Resuming needs only the hand-saved version.

One thing found while reading for step 4: the ruling that fixes the link's right edge at 350, `mobileAccount_forgotLinkRightAlignedUnderPassword` (FLAGS.md line 317), is **already struck through** — closed on 2026-09-16 when Daniel ruled the 16/16 spacing. Its text still carries "right edge on **350**", and `mobile-spec.md` §6.1 still states it as live. Both need the supersession note when the batch resumes; the spec line is the one that is actually wrong today.
