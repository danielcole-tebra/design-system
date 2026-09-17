# Bring Yusuf's page in line

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319, `Components` 1:2 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

One ruling, one default for Daniel to confirm, five items, all five done. Yusuf is now two frames like everyone else.

---

## Two things the enumeration settled before anything was built

### The brief's frame id is the drawer's

The brief names `A4 Yusuf / list, not sent` **200:6709**. **200:6709 is the `Drawer` instance inside the frame**; the frame is **200:6707**, which is what `mobile-spec.md` §6 already said. Read from the file and used. Nothing was ambiguous once the tree was open — the two ids are one apart because the drawer is the frame's second child.

### "Beside 200:6709" could not be taken literally

The Patient row on `Account screens` is contiguous at a **470 px pitch** from x 360 to x 7410, sixteen frames with no gaps. The slot beside Yusuf's frame is `A4 Colette / after Marcus`. Inserting would have meant moving thirteen frames.

The new page went to **(7880, 3132)** — the end of the row, which is exactly where `A4 Patient / landing` and Colette's two went when they were built. **The four landing pages are now contiguous**, which is the more useful adjacency.

---

## What the enumeration found

### `A4 Yusuf / list, not sent` 200:6707, before

| child | id | y | h | visible |
|---|---|---|---|---|
| `Visit/Recording bar` | 200:6708 | 0 | 201 | yes |
| `Not sent alert` | 200:7141 | 201 | 48 | yes |
| `Drawer` | 200:6709 | **265** | **579** | yes |
| `Footer band` | 200:6710 | 722 | 122 | yes |
| `Start recording CTA` | 200:6711 | 738 | 56 | yes |

`Sheet list` `I200:6709;48:823`: **501 tall, 122 of bottom padding**, 42 children of which **nine visible** chart rows totalling 432. So 432 + 122 = 554 in a 501 box — **two rows did not fit**, which is the open item the plan has been carrying.

**Two reactions inside**, and only two:

| node | trigger | to |
|---|---|---|
| `Back to patients` `I200:6708;61:472` | tap | `A S2 Home / schedule, Marcus sent` |
| `Not sent alert` 200:7141 (the whole alert) | tap | `A S7 Sending / Yusuf` |

**Every chart row is inert.** No row on this frame carries a reaction, then or now.

### Every reaction that landed on it

Four, **all from outside Yusuf's own frames**, so all four were repointed:

| # | from frame | node | node name |
|---|---|---|---|
| 1 | `A S9 Account / unsent` 140:1547 | **163:2791** | `Account/List row · 1 recording not sent` |
| 2 | `A S2 Home / schedule` 204:4082 | **204:4377** | `Schedule row · Yusuf Bahri` |
| 3 | `A S2 Home / schedule, top` 204:4127 | **204:4245** | `Schedule row · Yusuf Bahri` |
| 4 | `A S2 Home / schedule, Marcus sent` 227:2420 | **227:2436** | `Schedule row · Yusuf Bahri` |

### `assets/yusuf-bahri.png`

**It does not exist.** `assets/` holds two files, `marcus-vance.png` and `colette-mwangi.png`, both 1254 × 1254. So the brief's fallback applies: the library Avatar with initials YB at 48, and a GAP.

---

## 1. The avatar

**`Visit/Avatar/Yusuf Bahri` 298:8127**, on `Components` at (3402, 1442), 48 × 48.

Built as a clone of `Visit/Avatar/Marcus Vance` so the shell is identical — the library Avatar at `Content=Letter`, resized 40 → 48, `cornerRadius` 20 → 24 — and then **the two things that make it a portrait were undone**:

| | Marcus and Colette | Yusuf |
|---|---|---|
| disc fill | IMAGE, `scaleMode FILL`, the portrait's hash | **SOLID, bound `3bacd025…/74:119`** — the library's own grey, copied verbatim off master 108:1220 so the resolved colour and the binding travel together (Paints rule 1) |
| `Letter` TEXT | `MV` / `CM`, **hidden** | **`YB`, visible** |

Added to `Visit/Patient header`'s `Avatar#287:2` `preferredValues`, which now carries **three**. Each key was resolved back by scanning `Components` for local components with that key:

| key | component |
|---|---|
| `9ef60c86…` | `Visit/Avatar/Marcus Vance` 287:7428 |
| `fc0e41d5…` | `Visit/Avatar/Colette Mwangi` 287:7431 |
| `1e68a509…` | **`Visit/Avatar/Yusuf Bahri` 298:8127** |

`importComponentByKeyAsync` returns null for all three — they are local, not remote. That is the right answer and the right way round: per trap 4, an import that had succeeded would have been a write on a read.

## 2. The landing frame

**`A4 Yusuf / landing, not sent` 298:11207**, cloned from `A4 Patient / landing` 287:10395.

| block | y | h | bottom |
|---|---|---|---|
| `Header` (SUPERSEDED, hidden) | 0 | 135 | 135 |
| `Control group` (SUPERSEDED, hidden) | 135 | 118 | 253 |
| **`Visit/Patient header`** 298:11229 | **0** | **265** | **265** |
| **`Not sent alert`** 298:11318 | **281** | **48** | **329** |
| **`Patient admin details`** 298:11220 | **345** | **288** | **633** |
| **`Visit/Drawer edge`** 298:11230 | **732** | 112 | 844 |

**16 above the alert (265 → 281) and 16 below (329 → 345).** The admin block ends on **633**, **99 above the closed drawer at 732**. That is 64 less page than the other three landing pages show, which is exactly the alert plus its two gaps — the alert is paid for out of the beige, not out of the admin rows.

Identity set by property: `Name#287:0` "Yusuf Bahri", `DOB#287:1` "DOB 07/22/1985", `Avatar#287:2` → 298:8127.

**No value wraps.** All four secondaries read **20** tall, read back on the instances:

| row | primary | secondary | secondary h |
|---|---|---|---|
| 1 | Reason for visit | Lower back pain follow-up | 20 |
| 2 | Last seen | August 20, 2026 | 20 |
| 3 | Insurance | **UnitedHealthcare Choice Plus** | 20 |
| 4 | Primary care provider | Dr. Alma Reyes | 20 |

The longest, "UnitedHealthcare Choice Plus", sits inside the 358 column with room; the one to watch on a future patient is still Marcus's "Sore throat, nasal congestion, productive cough".

**Dr. Alma Reyes is also Marcus's primary care provider** — the brief gives them the same one. Colette's is Dr. Samuel Okafor. Left as specified.

## 3. The open chart

200:6707, rebuilt on the pattern of the twelve.

| | before | after |
|---|---|---|
| top | `Visit/Recording bar` 201 | **`Visit/Patient header` 298:11336, 390 × 265** |
| scrim | none | **`Scrim` 298:11374, 390 × 844** |
| drawer y | 265 | **147** |
| drawer h | 579 | **697** |
| `Sheet list` | 501 | **619** |
| `Sheet list` bottom padding | 122 | **34** |
| visible chart rows | 9, two of them unreachable | **9, all nine on screen** |

**Child order rebuilt to `[bar, band, CTA, alert, header, Scrim, Drawer]`** — the scrim above the header and below the drawer, as it is on the other twelve.

The scrim is a clone of **163:2904**, the sign-out warning's, so every scrim in the file is still the same object: `SOLID` bound `color/computed (no palette)/alphaBlack50` with paint opacity 0.5. Trap 43's measurement carries over — it renders at 0.5 once.

**Four nodes hidden and renamed SUPERSEDED**: `Visit/Recording bar` 200:6708, **`Not sent alert` 200:7141**, `Footer band` 200:6710, `Start recording CTA` 200:6711.

**The list now shows all nine rows** — Patient summary, Allergies, Medications, Problems, Procedures & surgical history, Family history, External care history, Vitals, Social history — **432 in 619**, ending on **657**, identical to Marcus's. The two rows that used to sit behind the footer band with no scroll to reach them are the plan's open item, and it closes here.

## 4. Wiring

Every reaction **built fresh** — `{trigger, actions:[{type:'NODE', destinationId, navigation:'NAVIGATE', transition, …}]}` — never by mutating a copy, per note 49.

**Landing, 298:11207 — four reactions**

| node | trigger | to | transition |
|---|---|---|---|
| `Back to patients` `I298:11229;287:10326` | tap | `A S2 Home / schedule, Marcus sent` | — |
| `Not sent alert` 298:11318, the whole alert | tap | `A S7 Sending / Yusuf` | — |
| `Visit/Drawer edge` 298:11230 | tap | `A4 Yusuf / list, not sent` | `SMART_ANIMATE / EASE_OUT / 0.225` |
| `Visit/Drawer edge` 298:11230 | **drag** | `A4 Yusuf / list, not sent` | the same |

`Start encounter CTA` cleared to **no reaction**; both pills carry none. Back goes where 200:6707's back went; Retry goes where the old Retry went.

**Open chart, 200:6707 — five reactions, three live**

| node | trigger | to | visible? |
|---|---|---|---|
| `Scrim` 298:11374 | tap | `A4 Yusuf / landing, not sent` | yes, `SMART_ANIMATE / EASE_OUT / 0.225` |
| `Puller zone` `I200:6709;90:1925` | **drag** | the same | yes, the same |
| `Back to patients` `I298:11336;287:10326` | tap | `A S2 Home / schedule, Marcus sent` | yes |
| `Back to patients` `I200:6708;61:472` | tap | `A S2 Home / schedule, Marcus sent` | **no** — superseded |
| `Not sent alert` 200:7141 | tap | `A S7 Sending / Yusuf` | **no** — superseded |

Chart rows untouched and still inert. The cloned header arrived carrying Marcus's `Start Encounter` → `A S5 Recording / recording`; **cleared**, because Yusuf's CTA never had one.

**The four inbound reactions, repointed and read back**

| from frame | node | before | after |
|---|---|---|---|
| `A S9 Account / unsent` | 163:2791 | A4 Yusuf / list, not sent | **A4 Yusuf / landing, not sent** |
| `A S2 Home / schedule` | 204:4377 | A4 Yusuf / list, not sent | **A4 Yusuf / landing, not sent** |
| `A S2 Home / schedule, top` | 204:4245 | A4 Yusuf / list, not sent | **A4 Yusuf / landing, not sent** |
| `A S2 Home / schedule, Marcus sent` | 227:2436 | A4 Yusuf / list, not sent | **A4 Yusuf / landing, not sent** |

Each was checked for a reaction count of exactly 1 before being replaced, so nothing was overwritten blind. **The only things still pointing at 200:6707 are the landing page's own drawer edge**, tap and drag — swept for across the whole page afterwards.

**Nothing on Yusuf's path reaches a Marcus or Colette frame.** Both his frames were walked against all five Marcus frame ids and all ten Colette frame ids: **zero hits**. `A S7 Sending / Yusuf` is his own; `A S2 Home / schedule, Marcus sent` is a schedule, not a patient screen.

## 5. Counts, with the arithmetic

| `Account screens` 103:2319 | before | after | delta |
|---|---|---|---|
| Children | 57 | **58** | +1 — the landing frame |
| Frames | 49 | **50** | +1 |
| Nodes | 7753 | **7913** | +160 — the frame clone, the alert clone, the header clone, the scrim |
| Nodes with reactions | 200 | **206** | **+6** |
| Reactions | 207 | **214** | **+7** |
| Destinations (action count) | 199 | **206** | +7 |
| Unique destinations | 45 | **46** | +1 — the landing frame |
| Off-page destinations | 0 | **0** | — |
| Starting points | 2 | **2** | — |

**+7 reactions on +6 nodes**, because the drawer edge is one node carrying two:

| new carrier | reactions |
|---|---|
| landing `Back to patients` | 1 |
| landing `Visit/Drawer edge` | **2** — tap and drag |
| landing `Not sent alert` | 1 |
| open-chart header `Back to patients` | 1 |
| open-chart `Scrim` | 1 |
| open-chart `Puller zone` | 1 |
| **6 nodes** | **7 reactions** |

The landing clone arrived with four of Marcus's and one was cleared (`Start Encounter`), so 4 − 1 + 1 alert = 4 on the landing; 3 on the open chart; 4 + 3 = 7. Repointing the four inbound moved destinations without changing any count.

**Starting points read by nodeId** (trap 46): `Account device` 103:2320 and `Schedule` 204:4082, unchanged. The clone was of `A4 Patient / landing`, which is not a starting point, so there was nothing to inherit — but it was read rather than assumed, because trap 46 exists.

**`action` and `actions` agree on all 214 reactions on the page** — compared node by node, zero mismatches.

---

## What was found

### The library Avatar's fallback initials are invisible — DEFECT

`Content=Letter` 108:1220 pairs a disc bound to `3bacd025…/74:119` (**#D6D6D6**) with a `Letter` TEXT bound to `b1c39ab0…/74:150` (**#E8E5DF**). Sampled off the render of Yusuf's landing page: disc **(214, 214, 214)**, ink **(229, 226, 221)**. That is **1.16:1**, against WCAG's 4.5:1 for body text and 3:1 for large text.

**Neither value is an override.** This is the component as the library publishes it, and it is what every patient without a portrait will get. The pairing presumably assumes a coloured disc — the account avatar is salmon and reads fine — but the *default* disc is the grey one. The contact sheet has it at 2x; it is not a subtle miss.

Not fixed: the library is read only this batch, and rule 10 says report. `libraryAvatar_fallbackInitialsAreInvisible`.

### Four landing pages, two behaviours for one gesture — DEFECT

The brief asked for the closed drawer to open "on tap and drag … with `SMART_ANIMATE / EASE_OUT / 0.225`", so Yusuf's 298:11230 carries that transition on **both** triggers.

`A4 Patient / landing` 287:10418 and Colette's two carry it on the **`ON_DRAG` only**; their `ON_CLICK` has `transition: null` and cuts instantly. That asymmetry has a cause — trap 37 rejects a null transition on `ON_DRAG`, so the drag *had* to be given one, and the tap was simply never revisited — but the result is that **four landing pages now do two different things with the same gesture**.

Built as the brief said and reported rather than harmonised. One of the two is right; Daniel says which and it is four nodes either way. `mobileYusuf_drawerTapAnimatesOnHisPageOnly`.

### The alert was hidden, not left under the scrim — DECISION

The brief listed the alert among the nodes to hide and rename SUPERSEDED, and then said "The alert sits under the scrim, on the landing page only." The second sentence can be read as leaving it visible beneath the scrim.

**It was hidden**, for two reasons that are geometry rather than taste. At its own y of **201** it would sit **54 px below the drawer's new top of 147**, so it would be behind the white sheet as well as the scrim — a dimmed strip of nothing. And the landing page is the frame the four inbound reactions now open, so it is the frame a provider actually sees the alert on.

The old node **200:7141 was kept, not moved** (rule 1), and still carries its Retry reaction — invisible, like the 28 others the file already has. If Daniel meant it visible, it is one flag on one node. `mobileYusuf_alertIsLiveOnTheLandingPageOnly`.

### Where the alert sits on the landing page — Claude's default, for Daniel

Recorded in `mobile-plan.md` as open, not in the spec:

> On Yusuf's landing page, the not-sent alert sits between the header and the admin details.

It reads as a banner about the visit rather than a row of the chart, and it keeps the admin block contiguous. The alternative — under the admin rows — buries the one thing the second demo scenario asks you to tap.

### No portrait for Yusuf — GAP

`assets/yusuf-bahri.png` does not exist, so one of the three patient headers shows initials where the ruling says profile picture. The shell is identical to the other two, so it is a one-property change the day a portrait lands. `mobileYusuf_noPortraitInTheRepo`.

---

## Verification

- **Enumerated from the file, not from the spec** — which is how the 200:6709 / 200:6707 discrepancy surfaced, and how the four inbound reactions were found rather than assumed from the wiring tables.
- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read, with effective visibility computed by walking to the page, so the two superseded carriers stay distinguishable from the three live ones.
- **Every reaction built fresh** per note 49, never by mutating `JSON.parse(JSON.stringify(reactions))`.
- **Every destination read back by frame name from both `action` and `actions`**, across the whole page, not just the nodes touched: 214 reactions, zero mismatches.
- **Inbound reactions checked for a count of 1 before replacement**, so nothing was overwritten blind.
- **Leak sweep** over both Yusuf frames against all fifteen Marcus and Colette frame ids.
- **Counts before the first write and after the last**, with the +7-on-+6 discrepancy chased down to the drawer edge rather than waved through.
- **Read back on the instances**: header properties, admin row strings and heights, alert message and Retry label, scrim size and bound fill, drawer y and height, `Sheet list` height and padding, and the nine visible rows by name.
- **Four renders looked at** before this was written — Yusuf's two beside Marcus's two — plus a 2x crop of the YB avatar, which is the only reason the contrast defect is in this report.

---

## What I believe but did not see

- **The prototype was not played.** The scrim's hit-testing over the header, and whether the tap and the drag feel like one surface, are unplayed here as they were on the twelve.
- **The 1.16:1 is measured from the render, but the variable values are read from the component**, not from a contrast tool; the arithmetic is WCAG's formula applied to the two sampled RGB triples.
- **The alert clone carried its own reaction across** and was rewritten fresh anyway, so the clone's fidelity was never load-bearing.
- **Yusuf has no recording or paused frames**, so "bring Yusuf's frames in line" is fully closed by these two. The recording and paused screens that remain on the old header are Marcus's, and they stay that way deliberately.
- **`A S7 Sending / Yusuf` and `A S8 Sent / Yusuf` were not touched.** The resend path downstream of Retry is unchanged.

---

## Renders

- `reports/yusuf-in-line/` — Yusuf's landing and open chart, Marcus's landing and open chart, 1x PNGs
- `reports/Bring Yusuf's page in line.png` — the contact sheet: the two pairs side by side, with the YB avatar and the alert enlarged beneath
