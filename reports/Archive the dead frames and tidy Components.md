# Archive the dead frames and tidy Components

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, pages `Account screens`, `Components` and `Archive` · `figma.skipInvisibleInstanceChildren = false` on every read · no node deleted

![contact sheet](Archive%20the%20dead%20frames%20and%20tidy%20Components.png)

---

## 1. The dead frames

### The six reactions, removed

Both frames are hidden and nothing leads to them, so every reaction inside them was unfireable. Each owner node was walked to the page before removal and read **`ownerEffectivelyVisible: false`** (trap 39) — the reactions were not merely unused, they were unreachable.

**`A S4 Patient` 103:2412** — 3 reactions, all `ON_CLICK` / `NAVIGATE`:

| Owner | Went to |
|---|---|
| `Back tap target 48` `I103:2418;114:610` | `A S2 Home / empty` 103:2341 |
| `Microphone summary row` 103:2424 | `A S3 Microphone` 103:2397 |
| `Start recording CTA` 103:2425 | `A S5 Recording / recording` 103:2426 |

**`A S6 Stop confirmation` 103:2451** — 3 reactions, all `ON_CLICK` / `NAVIGATE`:

| Owner | Went to |
|---|---|
| `Scrim` 103:2461 | `A S5 Recording / recording` 103:2426 |
| `Button` `I103:2462;747:151` | `A S5 Recording / recording` 103:2426 |
| `Button` `I103:2462;747:152` | `A S7 Sending` 103:2463 |

Removed with `setReactionsAsync([])`. **`Account screens` went 128 → 122, exactly six**, and nothing else on the page was touched.

### Archived

Both frames moved to `Archive` 214:3026, below the PROOF frames, at y **11248** and **12292**.

**Neither renders there, because both stay hidden.** The Archive screenshot shows **17 frames, not 19** — the two dead screens occupy the bottom of the page as empty space. That is correct and intended (nothing was unhidden), but it means the page render is not a census of the page.

### The rows closed up

Both dead frames were last in their rows, so removing them left no middle gap. The **Stop row shortened from 844 to 238**, the height of the overlay, which is now the only frame in it, and the two rows below moved up by 606:

| Row | y before | y after | height |
|---|---|---|---|
| Sign in | 0 | 0 | 844 |
| Home and schedule | 1044 | 1044 | 844 |
| Microphone | 2088 | 2088 | 844 |
| Patient | 3132 | 3132 | 844 |
| Recording | 4176 | 4176 | 844 |
| **Stop** | 5220 | 5220 | **844 → 238** |
| **Hand off** | 6264 | **5658** | 844 |
| **Account** | 7308 | **6702** | 844 |

Page bottom **8152 → 7546**. 200 between rows throughout.

---

## 2. `Components`

### PROOF frames moved

**All 13 PROOF frames on the page had zero reactions, so all 13 qualified and none was skipped.**

| | | |
|---|---|---|
| `PROOF · Batch 2 local components` 4:560 | `PROOF · Batch 3 local components` 6:1009 | `PROOF · D0 instance swap probe` 43:1630 |
| `PROOF · D1 Visit components` 48:1567 | `PROOF · D2 Patient summary sheet` 50:1710 | `PROOF · D3 Visit recording bar…` 51:2184 |
| `PROOF · Circle controls` 74:544 | `PROOF · Icon button glyph slot probe` 80:524 | `PROOF · List/Item at 390…` 83:583 |
| `PROOF · Visit/Top bar ink edges` 93:2752 | `PROOF · Visit MUI icon masters` 159:1109 | `PROOF · Visit/Recording bar ready…` 182:7090 |
| `PROOF · Schedule/Row…` 196:787 | | |

**Worth flagging: `PROOF · Schedule/Row` 196:787 is now on `Archive`.** It is the sheet this batch and the last three used for review, exported as recently as this morning. It qualifies on the rule as written — PROOF, zero reactions — and it is still readable where it sits, but it is no longer beside the component it proves.

### The layout

Four labelled groups, 28 px Akkurat LL Bold label at x 0, nodes from x 360, **80 between nodes, 200 between groups**, wrapping at 3000 of content width. Within a group, nodes are sorted tallest first so the icon rows sit together.

| Group | Nodes | y | Rows | Height |
|---|---|---|---|---|
| `Visit/` | 22 | 0 | 2 | 1510 |
| `Account/` | 4 | 1710 | 1 | 264 |
| `Schedule/` | 1 | 2174 | 1 | 432 |
| Base components | 9 | 2806 | 2 | 400 |

The page went from **9464 tall and 8 overlapping pairs** to **3206 tall and zero**. `Visit/Drawer` 48:897, which sat at y −64 under five other nodes, now starts the first row at y 0.

---

## 3. Moving a master did not change its instances — but proving it took a walk

This is the finding of the batch.

Instance counts were taken for all 36 masters before the moves and again after. **Five masters appeared to gain instances**, which is impossible — moving a node cannot create one:

| Master | before | after |
|---|---|---|
| `Icon/Microphone` 4:368 | 31 | 54 |
| `Status chip` 4:395 | 59 | 80 |
| `Visit/Sheet list row` 48:137 | 86 | 128 |
| `Visit/Sheet/Placeholder` 48:141 | 5 | 7 |
| `Visit/Icon/Cancel` 74:540 | 47 | 48 |

So the counts were re-derived by **walking every page** and tallying through `getMainComponentAsync`:

| Master | Components | Screens | Visit screens | Account screens | Archive | **Sum** | API after |
|---|---|---|---|---|---|---|---|
| `Icon/Microphone` | 5 | 9 | 11 | 19 | 10 | **54** | 54 |
| `Status chip` | 6 | 12 | 9 | 40 | 13 | **80** | 80 |
| `Visit/Sheet list row` | 14 | 0 | 42 | 56 | 16 | **128** | 128 |
| `Visit/Sheet/Placeholder` | 1 | 0 | 2 | 2 | 2 | **7** | 7 |
| `Visit/Icon/Cancel` | 5 | 0 | 16 | 20 | 7 | **48** | 48 |

**All five match the later number exactly.** So the later reads were the complete ones and the earlier reads were short by whatever sat on pages that script had not loaded. **No instance changed; the measurement did.** The other 31 masters were identical in both reads because their instances happened to live on pages both scripts had loaded.

`getInstancesAsync` counts file-wide but only sees loaded pages, and the shortfall is silent. **The same shape appeared earlier today** — a videocam icon reading 24 against a true 28 — and was written off then as a stale read. It is not stale, it is structural, and it is now **trap 45 in PLUGIN-NOTES.md**: a before/after instance count is only comparable if both reads loaded the same pages; otherwise walk and sum.

---

## Verification

| Page | Nodes before | Nodes after | Reactions before | Reactions after |
|---|---|---|---|---|
| **Account screens** | 47 (39 frames, 8 labels) | **45 (37 frames, 8 labels)** | 128 across 125 | **122 across 119** |
| **Components** | 49 | **40 (36 nodes, 4 labels)** | 0 | 0 |
| **Archive** | 4 | **19** | 0 | 0 |
| Visit screens | 26 | 26 | 84 across 81 | 84 across 81 |
| Screens | 18 | 18 | 42 across 41 | 42 across 41 |

**Every difference accounted for:**

- **Account screens −2 frames**: the two dead screens left for `Archive`. **−6 reactions on −6 nodes**: exactly the six removed, as the ruling required. No other reaction changed.
- **Components −13**: the 13 PROOF frames left for `Archive`. **+4 TEXT**: the group labels. 49 → 40.
- **Archive +15**: 13 PROOF from `Components` and the 2 dead screens. 4 → 19.
- **Visit screens and Screens untouched**, re-read for both node and reaction counts.

**Starting points unchanged: three on `Account screens`** — `Account device` 103:2320, `Unsent recording` 140:1618, `Schedule` 204:4082. One each on `Visit screens` and `Screens`. `Archive` and `Components` have none.

**No reaction crosses pages.** All **31** distinct destination ids on `Account screens` resolved and walked to their page; every one lands on `Account screens`. `Archive` and `Components` hold **zero** reactions, so neither can source a cross-page edge — which is also why archiving the two frames was safe only after the six were cut.

**Zero overlaps on all three pages** — `Account screens`, `Components` and `Archive` — each checked by comparing every pair of top-level bounding boxes.

---

## What I believe but did not see

- **The prototype was not played.** That the remaining 122 reactions still work is inferred from the count dropping by exactly six and every destination resolving on-page, not from navigating anything.
- **The six removed reactions are gone, not relocated.** Each owner read 0 immediately after `setReactionsAsync([])`, and the page total fell by six — but I did not re-walk the two frames after they landed on `Archive` to confirm zero there. The `Archive` page total of 0 reactions covers it indirectly.
- **The instance walk covered five pages** — Components, Screens, Visit screens, Account screens, Archive. `Flow` has no children and `Foundations` has three; neither was tallied, and the five sums already matched exactly, so neither holds any of these instances. That is an inference from the arithmetic closing, not a read of those two pages.
- **Only the five changed masters were walked.** The other 31 are asserted unchanged on the API's word, which this same batch showed can under-report.
- **The Archive render is a 603 × 3700 scale of an 1800 × 11048 column**, and the contact sheet scales it down further to sit beside the other two; the full-size render is in `figma-export` if it needs reading.
- **Group membership on `Components` is by name prefix.** `Icon/Microphone (SCAFFOLDING)` sorted into Base components because it does not start with `Visit/`, `Account/` or `Schedule/` — it is a scaffolding component with 54 instances, so it stays on the page, but its group is a naming accident rather than a decision.
- All three screenshots were **looked at before this was written**.

---

## Renders

- `figma-export/archive-dead-frames-2026-09-17/account-screens-page.png`
- `figma-export/archive-dead-frames-2026-09-17/components-page.png`
- `figma-export/archive-dead-frames-2026-09-17/archive-page.png`
- `reports/Archive the dead frames and tidy Components.png` — the three side by side
