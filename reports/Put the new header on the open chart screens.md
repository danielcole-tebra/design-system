# Put the new header on the open chart screens

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319, `Components` 1:2, `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Three rulings, seven items, all seven done. Twelve frames, and all twelve started identical.

---

## What the enumeration found

**Every one of the twelve was built the same way**, which is why one pass did all of them:

| part | before |
|---|---|
| Header | `Visit/Recording bar` at `State=ready`, **390 × 201** at y 0 |
| Drawer | **643** at y **201** |
| `Sheet body` / `Sheet list` | **565** at y 279, padding **8 / 16 / 122 / 16** (the list 0/0/122/0) |
| `Footer band` | white rectangle **390 × 122** at y **722** |
| `Start recording CTA` | **358 × 56** at y **738** |

Reactions per frame, before: a back and a microphone pill on the header; a drawer back or three chart rows on the drawer; and on Marcus's four, a Start recording CTA. Colette's eight never had a CTA reaction.

---

## 1. Header

A **`Visit/Patient header` 287:10323** instance on each frame at (0, 0), **390 × 265**, set to that patient's name, DOB and avatar — Marcus on four, Colette on eight.

The old `Visit/Recording bar` is **hidden and renamed SUPERSEDED**, kept under rule 1 with its reactions in place.

**Nothing wrapped and nothing came through stale.** All twelve read one line at the expected widths — Marcus 156 / 103, Colette 175 / 108 — and no name or DOB exceeded its line height. Trap 50's hazard is a swap onto a component cloned from the one being replaced; these headers were **added**, not swapped, so there was nothing to inherit.

## 2. Drawer

| | value |
|---|---|
| top | **265** — the header's bottom |
| height | **579** — 844 − 265 |
| `Sheet body` / `Sheet list` | **501** — 579 − 78 (puller zone 30 + title row 48) |

Identical on all twelve.

## 3. Footer

`Footer band` and `Start recording CTA` **hidden and renamed SUPERSEDED** on all twelve.

**`Sheet body` and `Sheet list` bottom padding: 122 → 34.** With no footer band, the only thing covering the bottom edge is the home indicator.

## 4. Summary padding

**`Visit/Sheet/Patient summary` 50:969: `paddingBottom` 138 → 50** — the 34 home indicator plus 16.

138 was the footer band's 122 plus 16. That number was correct while the patient screens had a footer; now it would just be 88 px of dead scroll.

| | Marcus | Colette |
|---|---|---|
| sheet height | 1355 → **1267** | 1211 → **1123** |

**Where the last content sits, scrolled to the end:**

| frame | feedback block bottom | last bullet bottom |
|---|---|---|
| `A4 Patient / summary` | **794** | **705** |
| `A5 Recording / summary` | **794** | **705** |

Identical, because both scrollers bottom out at 844. The feedback block lands exactly **16 above the 810 home indicator**, which is what the 50 buys. `A5 Recording / summary` was out of scope for the header but shares the sheet, and gains 88 px of its scroll back.

## 5. Chart list

All **nine** rows show on all six chart lists: Patient summary, Allergies, Medications, Problems, Procedures & surgical history, Family history, External care history, Vitals, Social history.

| | value |
|---|---|
| content | 9 × 48 + 34 padding = **466** |
| area | **501** |
| **scrolls?** | **No** |
| last row bottom | **775** |

35 px of page below the last row before the home indicator. Medications (330) and Vitals (474) do not scroll either — **only the summary does**, at 1309 in 501.

## 6. Wiring

| | Marcus's four | Colette's four, after Marcus | Colette's four, after Yusuf |
|---|---|---|---|
| Start Encounter | **A S5 Recording / recording** | **inert** | **inert** |
| Back to patients | A S2 Home / schedule | A S2 Home / schedule, Marcus sent | A S2 Home / schedule, both sent |
| Puller, drag down | **A4 Patient / landing** | **A4 Colette / landing, after Marcus** | **A4 Colette / landing, after Yusuf** |
| Drawer back, chart rows | unchanged | unchanged | unchanged |
| SOAP Note, microphone | inert | inert | inert |

The drag uses **`SMART_ANIMATE / EASE_OUT / 0.225`** (trap 37), the mirror of the landing page's closed drawer opening on the same transition.

**Nothing on Colette's path reaches a Marcus frame** — every reaction on her eight frames read back and checked.

**The hidden CTA's reactions were left**, as instructed. See below for what that does to the totals.

## 7. Counts, with the arithmetic

| | before | after |
|---|---|---|
| Children on `Account screens` | 57 | **57** |
| Frames | 49 | **49** |
| Reactions | 167 | **195** |
| Nodes with reactions | 160 | **188** |
| Destinations | 45 | **45** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |

- **Children and frames unchanged.** The twelve headers are children of frames, not of the page.
- **+28 reactions on +28 nodes** — 12 backs + 12 puller drags + 4 Start Encounters. 167 + 28 = **195**; 160 + 28 = **188**. One reaction per node, so the two move together.
- **Destinations unchanged at 45.** Nothing new was pointed at: `A S5 Recording / recording`, the three schedule frames and the three landing frames were all already destinations.
- **Starting points read by nodeId** (trap 46): `Account device` 103:2320 and `Schedule` 204:4082, unchanged.

**Every destination read back by frame name from both `action` and `actions`** (note 49). They agreed on all 28.

---

## What was found

### Hidden nodes keep their reactions and still count — DEFECT

The brief asked whether they do. **They do.**

| hidden carrier | count | reactions |
|---|---|---|
| superseded `Visit/Recording bar` (back + microphone pill) | 12 | 24 |
| superseded `Start recording CTA`, Marcus's four | 4 | 4 |
| **total** | **28 nodes** | **28 reactions** |

That is **28 of the page's 195** sitting on nodes nobody can see or tap — the count is about 14% larger than the prototype's real wiring. They were left in place as the brief directed and as rule 1 requires. Two consequences worth naming:

- A reaction count is no longer a measure of what a provider can do. Subtract the hidden 28.
- **`A S3 Microphone` is no longer reachable from any visible control on a patient screen**, because the live pills are inert and only the hidden bars still point at it. It is still reachable from the account screen.

`mobileChart_hiddenNodesStillCarryReactions`.

### The chart list no longer scrolls, and says nothing about it — GAP

466 of content in a 501 area. The list really does end at Social history, and ending there is correct — but the schedule solves exactly this with a closing line ("That's everyone for today") and the chart list has no equivalent. 35 px of page below the last row is either restful or unfinished depending on the phone. Worth a look at arm's length. `mobileChart_listNoLongerScrollsAndSaysNothingAboutIt`.

### Padding follows what is actually in the way

Worth stating as a rule rather than a number, because this is the second time it has changed: **a scrolling stack ends with padding equal to whatever covers its bottom edge, plus the air the content is owed.** With a 122 footer that was 138; with no footer it is 50; the schedule's is 34 because only the indicator is in its way. The number is derived, not chosen, and it changes whenever the thing covering the edge does.

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read, and effective visibility computed by walking to the page — which is how the 28 hidden reaction-carriers were counted rather than guessed.
- **Read back from the instances on all twelve**: header height, name and DOB characters, widths and heights with an explicit wrap check (trap 48), avatar swap value, drawer y and height, `Sheet body` height and padding, sheet height and padding, and the nine row labels on each of the six lists.
- **Scroll arithmetic computed per frame from absolute transforms**, and the two scrolled-to-end states rendered rather than asserted — rebuilt as fresh `SCAFFOLDING` frames on `Archive` for the new geometry, with the two stale ones labelled SUPERSEDED.
- **Every reaction read back by frame name from both representations**, with effective visibility recorded alongside, so the hidden ones are identifiable in the read.
- **Counts read before the first write and after the last**; starting points by nodeId.
- **Fourteen renders looked at**: all twelve frames, plus both summaries scrolled to the end.

---

## What I believe but did not see

- **The prototype was not played.** The puller drag is the one interaction I would most want on a phone — a drag down to dismiss the chart is a gesture, and 0.225 s was copied from the recording screens rather than judged for this one.
- **The recording and paused frames still carry the old bar**, deliberately: the ruling says the recording screen is unchanged.
- **Yusuf's frames still carry the old header and footer.** They were out of scope; his drawer already starts at 265, but for a different reason — the not-sent alert — so his frame now looks accidentally similar to the new ones without being one.
- **The superseded bars and CTAs are hidden, not removed**, so every count in this report includes them unless it says otherwise.
- **`A5 Paused / summary` also picked up the 50 padding**, since it instances the same sheet. It was not in scope and was not otherwise touched.

---

## Renders

- `figma-export/open-chart-header-2026-09-17/` — all twelve frames and both scrolled summaries, fourteen files
- `reports/Put the new header on the open chart screens.png` — the contact sheet, one row per patient path plus the scrolled pair
