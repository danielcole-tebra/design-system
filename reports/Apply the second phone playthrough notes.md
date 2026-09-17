# Apply the second phone playthrough notes

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Account screens` 103:2319 and `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw` read only

Five rulings, five pieces of work, all five built and verified in pixels. One of the rulings corrects the first playthrough's reading of the same screen, and one piece of work departs from the brief on purpose — both are set out below.

The wiring was not touched: 114 reactions across 110 owners, 32 destinations, none of them on another page, two starting points, before and after.

---

## What was built

### 1. The scroll area runs to the bottom of the frame

Daniel's correction: *"The beige he saw under the list was the scroll area stopping short, not the page showing where the list ends."*

The first batch built the scroll frame to end on **810**, the 34 bottom safe area, which is exactly what produced a beige band under the list at every offset. That band was read as the page. It was the window.

| | before | after |
|---|---|---|
| `Schedule scroll` | 390 x **579**, bottom 810 | 390 x **613**, bottom **844** |
| `Content` | 763, y 47 | **797**, y 47 |
| `Schedule content` | 1072, padding 0 | **1106**, `paddingBottom` **34** |

The 34 did not disappear — it **moved inside the scrolling stack**. That is the whole difference, and the two readings are indistinguishable at rest: a short window shows beige under the list at every offset; padding inside the stack shows nothing until you reach the end, and then shows exactly the clearance the closing line needs.

**The offsets did not move, and that was checked rather than assumed.** `/ schedule` and `/ schedule, Marcus sent` are still at **−252**, the other two at **0**, read back before and after on all four. Extending a container downward does not touch its top edge, and the top edge is what the peek cue is measured from — Renata Ilves's row midpoint still lands on it. The renders confirm the cue survived: the half-cut 10:20 AM row is still the first thing under the header on both offset frames.

Every frame still overflows: **1106 against 613**, and **854 against 613** at the −252 offset.

### 2. The date header is separated from the list under it

A **1 px INSIDE bottom stroke**, bound to **`color/divider`**. The binding was read off a live `Schedule/Row` instance rather than chosen — `VariableID:…/74:173`, #D6D6D6, the same 1 px INSIDE bottom stroke the rows carry. Applied to all five headers.

In pixels: full width at **y 230**, sampled **(214, 214, 214)** on both `A S2 Home / schedule` (white list below it) and `A S2 Home / empty day` (beige below it).

**One thing the tree did not predict.** An INSIDE stroke insets an auto-layout frame's content box by its weight, so the moment the stroke went on, the centred date fell from **y 10 to y 9.5** on every header — a half pixel, against rule 4, with nothing thrown and the row still reading 40. Corrected with **`paddingTop 1`**: content box back to 38 above the stroke, date back on **y 10**, row still exactly **40**, because an INSIDE stroke takes no height. Read back on all five.

### 3. The empty day shows the date header

`Date header` **241:4990**, **cloned from 204:4374** rather than rebuilt, so it is the same object down to the stroke and the 1 px top padding. Inserted into `A S2 Home / empty day`'s `Content` stack between the search block and the `List`; `Content` goes **184 → 224**. "No appointments today" now sits under the date and its divider instead of under the search field. There is no scroll area on this frame and none was added.

### 4. The sign-in screen shows "Visit Companion"

Three frames carry the Tebra logo — `A S1 Login / default` 103:2320, `/ error` 103:2330, `/ after sign out` 163:2938. The forgot-password and reset-sent frames carry no logo, so they were left; enumerated from the file, not assumed.

Built as an **`App identity`** lockup, one per frame, at **(16, 132), 358 x 84**:

- the existing `Nav/Logo` instance, **reparented rather than re-created**, so its id survives (it carried no reactions — checked before the move, per trap 38);
- `itemSpacing` **24, bound to `space/24`**;
- the name, Akkurat LL Regular **24 / 36** — the home top bar title's face — FILLing the 358 with `textAlignHorizontal CENTER`, so no node carries the half pixel that centring an odd-width string in an even box produces.

**The fields below did not move.** Every card is still at **y 256**, and the lockup sits the original **40** above it. The lockup was placed from the card upward rather than from the logo downward, so the logo rises **192 → 132** and nothing under it shifts by a pixel. Read back on all three: `card.y` unchanged, gap below the lockup 40.

**The gap between logo and name is 24 because that is the largest spacing token the library has.** The gap already below the logo is 40; the nearest token to it in the whole `Tebra/Dimension` collection is `space/24`. See *What was found*.

**The one deliberate departure from the brief.** The brief said to use the home top bar title's colour binding. That is `color/text/primary` **#000000**, and on the `#004852` sign-in field it measures **2.05 : 1** — unreadable. The name binds **`color/common/white`** instead, **10.25 : 1**, which is §3's standing rule for this file ("Text and meter on colour fields | #FFFFFF `color/common/white`"). The text *style* is the title's, exactly. Reported rather than done quietly; one bound paint reverses it.

### 5. The drawer divider, closed

Closed as Daniel ruled it: a **rendering artifact of two adjacent fields, not geometry**. Nothing was changed, and nothing needed to be — the first batch's finding is the evidence, and it stands: no such line exists in the tree or in the pixels on any recording or paused frame. Struck through in the plan's Open list. It was never logged in FLAGS.md, so there was nothing to strike there.

### The scaffolding render

`SCAFFOLDING · schedule scrolled to the end (temporary offset, 2026-09-17)` **241:4998**, a clone of `/ schedule, top` on the `Archive` page at a temporary **−493** offset (613 − 1106), which puts the end of the list in the window.

Two things were done to it before it moved pages: **all four of its reactions were stripped**, so nothing crosses a page boundary, and `flowStartingPoints` was read before and after the clone — trap 46 says a clone of a starting-point frame carries a duplicate, and `/ schedule, top` is not one, so none appeared. Confirmed: `Archive` has no starting points and the clone has no reactions.

The render shows what the ruling is for: white rows to Amara Dunbar 5:00 PM, the last row's divider at **y 745**, then beige from **746** — the closing line centred in its 64-tall row, then the **34** of padding, and the frame ends. Nothing is cropped.

---

## What was found

### 1. The library's spacing scale stops at 24

The whole `Tebra/Dimension` collection is 24 variables. The `space/` ramp is **0, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 16, 17, 23, 24** — no 32, no 40, no 48. The only larger numbers in the collection are `size/input/small` 40 and `size/button/minWidth` 64, which are sizes, not gaps.

So "the spacing token nearest the gap already below the logo" resolves to **`space/24`**, 16 short of the 40 it is nearest to. And the 40 itself is bound to nothing and never was — it is a coordinate in a `layoutMode NONE` frame. The same is true of the 34 safe-area clearance used throughout this prototype. Logged as **`mobileFoundations_spacingScaleStopsAt24`**; closing it needs a library batch.

### 2. The sign-in lockup is two nearly-matching inks

The name renders `color/common/white` **#FFFFFF**. The wordmark beside it renders **#F7F4EB**, the nav's hardcoded `navLogoCream`, which `mobileBrand_libraryHasNoStandaloneLogo` already records as unbindable in the lockup. They read as one at arm's length and they are not the same value. Worth a look on the phone before it is called finished.

### 3. `mobileSchedule_listEndsWithAClosingLine` was amended, not struck

The closing line survives this correction unchanged — only the premise behind it was wrong. The FLAGS line now carries the amendment inline rather than a strike-through, because striking it would suggest the row came out, and it did not.

---

## Verification

Every number was read back from the file after the write, and every frame was looked at before this was written.

| | before | after |
|---|---|---|
| `Account screens` children | 44 (36 frames + 8 labels) | **44 (36 + 8)** |
| Reactions | 114 across 110 | **114 across 110** |
| Destinations | 32, none off-page | **32, none off-page** |
| Starting points | `Account device`, `Schedule` | **unchanged** |
| `Archive` frames | 25 | **26** (the scaffolding clone) |

**Integer geometry.** All 28 nodes this batch created or moved were checked for integer `x`, `y`, `width`, `height`: **28 of 28 pass** — the four `Schedule scroll` frames (0, 184, 390, 613), the four `Schedule content` stacks (390 x 1106 at −252 or 0), the four `Content` stacks (390 x 797), the five `Date header` frames (0, 144, 390, 40), the empty day's `Content` (390 x 224) and its date text (16, 10, 154, 20), the three `App identity` lockups (16, 132, 358, 84), the three `App name` texts (0, 48, 358, 36) and the three reparented wordmarks (129, 0, 100, 24). The half pixel the stroke introduced was caught and removed before this count was taken.

**Pixel checks, not tree checks.** The date-header divider was sampled in the 1x renders at **(214, 214, 214)** across the width at y 230 on two frames. The sign-in name was sampled along its own scanline and alternates **(255, 255, 255)** glyph against **(0, 72, 82)** field. The scrolled-to-the-end frame was scanned down its centre: white to 744, divider **745**, beige from **746** to the frame bottom.

**Bound, not literal.** The five header strokes went through `setBoundVariableForPaint` with the resolved colour written in first and the alpha re-applied last, and all five read back on `color/divider`. The three name fills read back on `color/common/white`. The three lockup gaps read back bound to `space/24`.

---

## What I believe but did not see

- **The prototype was not played.** The scroll behaviour is asserted from the container and stack geometry plus the scaffolding render at a fixed offset; I did not drag the list on a phone.
- **The scaffolding frame is a still at one offset**, not a scroll. It proves the end of the list renders as intended; it does not prove the scrolling reaches it.
- **The contrast numbers 2.05 : 1 and 10.25 : 1 are computed** from the WCAG relative-luminance formula on #000000 / #FFFFFF against #004852, not measured with a tool.
- **The 40 gap on the login frames is inferred to be deliberate**, because it is identical on all three frames; nothing in the record says who chose it or why.
- **`A S2 Home / empty day`'s date header was cloned from the schedule's**, so its divider and padding are correct by construction; it was also rendered and sampled, but its `List` below was not re-read beyond confirming it moved to y 184.

---

## Renders

- `figma-export/phone-playthrough-notes-2-2026-09-17/` — the eight changed frames and the scaffolding frame, all at 1x
- `reports/Apply the second phone playthrough notes.png` — the nine side by side
