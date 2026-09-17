# Change the telehealth marker to text and icon

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, `Components` page · `figma.skipInvisibleInstanceChildren = false` on every read · additive only

![contact sheet](Change%20the%20telehealth%20marker%20to%20text%20and%20icon.png)

---

## What was built

### 1. `Visit/Icon/VideocamOutlined (MUI)` 206:830

24 × 24 COMPONENT at (2544, 7518) on `Components`, beside the three chevron masters, `clipsContent` false, `fills` [].

**The path came from the package, not from memory.** `@mui/icons-material` is not installed in a readable `node_modules`, but the yarn cache in `C:\Code\web-app-v2` holds the archives. Read straight out of `@mui-icons-material-npm-5.15.19`:

```
M15 8v8H5V8zm1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1
```

**The same archive was used as a control.** `ChevronRight.js` reads `M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z`, whose bounding box is x 8.59, y 6, 7.41 × 12 — exactly what `Visit/Icon/ChevronRight (MUI)` 159:1105 already carries in Figma. So the path source and the import pipeline both check out before the new icon was trusted.

Against the icon recipe: the imported vector kept its viewBox position at **(3, 6), 18 × 12** (recipe 1, never reset to 0 — and it matches the path's own bbox); `constraints` SCALE/SCALE (recipe 2); named `Vector`, master named `Visit/Icon/… (MUI)` (recipe 4); fill bound **`color/text/primary`** on the master like both chevrons, overridden per instance (recipe 3). The SVG wrapper `createNodeFromSvg` produces — which trap 31 warns carries an undeclared white fill — was emptied and removed rather than kept.

### 2. The marker, on all four `Schedule/Row` variants

On the `Secondary line`, **8 after the time** (the line's existing `space/16`-free gap of 8, unchanged), a `Telehealth` group: `·` → 4 → 16 icon → 4 → "Telehealth".

| | |
|---|---|
| Group | `Telehealth`, HORIZONTAL, HUG/HUG, gap **4**, CENTER, no padding, no fill, **97 × 20** |
| Separator | `·`, body2 **14 / 20**, `color/text/secondary`, 4 wide |
| Icon | `Videocam`, instance of 206:830 at **16 × 16**, vector overridden to **`color/text/secondary`** |
| Word | "Telehealth", body2 **14 / 20**, `color/text/secondary`, 69 wide |
| Driven by | `Telehealth#196:10`, now referencing the group |

**Both texts were cloned from the `Time` node**, so all five type bindings (`fills`, `fontSize`, `fontFamily`, `lineHeight`, `fontWeight`) came across as objects rather than values retyped from a read — the same technique S2 used to build the row off `Session row`. **Each clone's `componentPropertyReferences` was cleared before anything else.** A clone carries them, and `Time` holds `{characters: "Time#196:5"}`; left alone, both the separator and the word would have been driven by the time property and would have read "9:15 AM".

**The Chip is hidden, not deleted** (rule 1): renamed `Telehealth chip (SUPERSEDED 2026-09-17 · replaced by the text and icon group)`, `visible` false, **and its own `componentPropertyReferences` cleared first** so the boolean can never bring it back. Clearing before hiding matters — had the reference stayed, setting Telehealth true would have shown both the chip and the group.

---

## The numbers asked for

- **Time line with Telehealth on: 155.** Time 50 + gap 8 + group 97. In row coordinates the content runs x 16 to **171**; with Telehealth off it ends at 66.
- **Text column beside the failed chip: 203.** Unchanged — the marker lives inside the column, so it does not move the status chip or the chevron.

**The row stays 72 and nothing truncates.** Read on all eight proof instances: every row 72 × 390, `textTruncation` DISABLED on `Name`, `Time` and the new word, every `Name` exactly 24 tall and every `Time` and word exactly 20, so nothing wrapped either.

---

## What was found

### 1. The column no longer changes height when the marker appears

Measured with Telehealth off and on, all eight instances: the `Text` column is **44 in both cases**, at y **13.5** in both, and the `Secondary line` is **20** in both.

With the Chip it was not. The chip was 24 tall against the time's 20, so showing it took the secondary line to 24 and the column from 44 to 48, and the centred column shifted 2 px up. That shift is now gone. The old COMPOSITIONS entry argued for `size=small` precisely because 24 was the least-bad chip height; **text at 20 removes the problem rather than minimising it**, and the entry has been amended to say so.

### 2. Two pills became one, which was the point

Before, a telehealth row with a status carried a grey outlined pill and a coloured outlined pill on the same 390 — the eye had to work out which was the status. The contact sheet's right column shows the new reading: the marker is a continuation of the time in the same ink, and the only pill on any row is the one that reports the handoff.

### 3. `getInstancesAsync` gave a stale count, and the walk caught it

The first call returned **24** instances of the new master where 28 exist (4 in the variants, 8 in the proof, 16 across the two schedule frames). The four missing were exactly the proof rows with Telehealth off, which looked like a hidden-subtree skip and would have been worth a PLUGIN-NOTES trap.

**It was not.** A direct walk plus a second call returned **28** and agreed with each other. The first read was taken while `Account screens` was not loaded in that script's context. Recorded here as a non-finding so nobody writes the trap later: **`getInstancesAsync` counts the whole file, so its result depends on which pages the current script has loaded** — check it against a walk before believing a shortfall.

### 4. The proof sheet's title is now partly out of date

`PROOF · Schedule/Row …` 196:787 still reads "Chevron ink right 374, row on background/paper" and says nothing about the marker. Nothing in it is false, so it was left alone — the last batch's title edit made the hugging frame grow from 980 to 1289 wide and needed a second pass to fix, and that is not worth repeating for an addition. Named so the next reader knows the title under-describes the sheet.

---

## Verification

- **Property references: 7 per variant, unchanged and identical across the four.** The `Telehealth` group now carries `{visible: "Telehealth#196:10"}` and the chip no longer appears in the list — a clean swap, not an addition. The other six are `Name`, `Time`, and `Label`/`Delete icon` on each of the two nested library Chips.
- **Proof sheet read back**, all eight instances: group 97 wide at x 74 (right edge 171), visible on exactly the four Telehealth-true rows, chip hidden on all eight, status chip still ending at 342, icon 16 × 16 everywhere.
- **The schedule frames picked up the change** without being touched: `A S2 Home / schedule` 204:4082 and `/ schedule, top` 204:4127, 8 rows each, all 72 tall, **Colette Mwangi the only row showing the group** in both, no chip visible anywhere. Effective visibility was tested by walking to the page (trap 39), not by reading `visible` on the node.
- **Counts.** `Components` 44 → **45** children (+1, the icon master). `Account screens` unchanged at 47 children and **126 reactions across 123** — this batch wired nothing.

---

## What I believe but did not see

- **The prototype was not played.** Nothing here is evidence about behaviour; the marker is not interactive and no reaction was touched.
- **The glyph is the right glyph** on the strength of the package path and the ChevronRight control, plus looking at the 2x render — not against Storybook or a running app, neither of which was opened.
- **`Visit screens` and `Screens` were not re-read this batch.** Neither uses `Schedule/Row`, so neither can have changed, but that is inference from where the component is used, not a fresh count.
- **The 16 px icon is judged at 2x on a monitor**, not at arm's length on a phone — the same open question `mobile-plan.md` already carries for the pill triangle and the avatar.
- The separator is a **middle dot U+00B7**, not a bullet; at 14 px in secondary ink the two are hard to tell apart in a render, and this is asserted from the character written, not from the pixels.
- Both 2x exports and the 1x frame were **looked at before this was written**.

---

## Renders

- `figma-export/telehealth-text-2026-09-17/schedule-row-set-196-777-2x.png`
- `figma-export/telehealth-text-2026-09-17/schedule-row-proof-196-787-2x.png`
- `figma-export/telehealth-text-2026-09-17/as2-home-schedule-top-204-4127-1x.png`
- `reports/Change the telehealth marker to text and icon.png` — the proof sheet and the phone side by side
