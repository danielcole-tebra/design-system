# Polish the patient summaries

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319, `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Three rulings, four items, all four done. Every change is one write on one shared component.

---

## What the enumeration found

**Five frames show a patient summary, and all five are the same component.**

| frame | id | patient | state |
|---|---|---|---|
| `A4 Patient / summary` | 103:3037 | Marcus Vance | ready |
| `A5 Recording / summary` | 103:3045 | Marcus Vance | **recording** |
| `A5 Paused / summary` | 103:3051 | Marcus Vance | **paused** |
| `A4 Colette / summary, after Marcus` | 249:10819 | Colette Mwangi | ready |
| `A4 Colette / summary, after Yusuf` | 249:10824 | Colette Mwangi | ready |

**It is a component, instanced, not frame content.** Each frame holds a `Visit/Drawer` instance at `Mode=sheet` whose `Sheet#48:4` slot carries an instance of **`Visit/Sheet/Patient summary` 50:969**. Colette's two differ from Marcus's only by text overrides, which is why her sheet was 997 against his 1141.

**Where the parts live inside 50:969:**

```
Visit/Sheet/Patient summary 50:969      VERTICAL, gap 16, 358 wide, HUG
├─ Alert                    50:970      library Alert, variant=standard severity=warning
│    └─ Message#165:0 → Text I50:970;165:26   ← the disclaimer
├─ Patient summary content  50:982      VERTICAL, gap 16
│    ├─ Current Situation   50:983      VERTICAL, gap 8
│    │    ├─ Heading        50:984      Bold 16 / 24
│    │    └─ Bulleted content 50:985    Regular 16 / 24  ← ALL THREE BULLETS, ONE NODE
│    ├─ Key Background      50:986  (Heading 50:987, Bulleted content 50:988)
│    ├─ Active Care Plan    50:989  (Heading 50:990, Bulleted content 50:991)
│    └─ Progress & Next Steps 50:992 (Heading 50:993, Bulleted content 50:994)
└─ Patient summary feedback 50:995      "How would your rate…" + two thumbs
```

**The bullets are not separate nodes.** Each section's bullets are lines inside **one** TEXT node, formatted `{type: "UNORDERED"}` over the whole range. That is the single fact this batch turns on: the gap between bullets is **`listSpacing`**, not an auto-layout gap, which is exactly why it can be opened without touching the spacing inside a wrapped bullet.

**The numbers as found:**

| thing | before |
|---|---|
| disclaimer text | "AI can make mistakes. Always double check summaries." |
| disclaimer style | Akkurat LL Regular **14 / 20**, `color/text/primary`, inside the library Alert |
| disclaimer available width | **294** (Alert 358, padding 16 + 16, icon 20, gap 12) |
| disclaimer rendered | **362** → wrapped to **2 lines**, 40 tall |
| body text | Akkurat LL Regular **16 / 24** (`body1`) |
| gap between bullets | **`listSpacing` 0** |
| gap between wrapped lines | **24** (the line height) |
| `paragraphSpacing` | 0 |
| heading → its own bullets | 8 (section frame gap) |
| previous bullets → next heading | 16 (content frame gap) |

**Scroll bounds, last bullet and footer, per frame, before:**

| frame | scroll area (`Sheet body`) | its `paddingBottom` | last bullet bottom, scrolled to end | footer top |
|---|---|---|---|---|
| A4 Patient / summary | y 279, h 565, → 844 | 122 | **721** | **722** |
| A4 Colette / after Marcus | y 279, h 565, → 844 | 122 | **721** | **722** |
| A4 Colette / after Yusuf | y 279, h 565, → 844 | 122 | **721** | **722** |
| A5 Recording / summary | y 197, h 647, → 844 | 34 | 721 | *no footer* |
| A5 Paused / summary | y 197, h 647, → 844 | 34 | 721 | *no footer* |

One pixel of clearance on the three frames that have a footer, and the feedback block entirely behind the band.

---

## 1. Disclaimer

**Measured, not guessed.** A probe at Akkurat LL Regular 14 / 20 with `textAutoResize = WIDTH_AND_HEIGHT`, kept on the `scratchpad` page as `MEASUREMENT PROBE 2026-09-17` **278:401**:

| string | rendered width | fits 294? |
|---|---|---|
| "AI can make mistakes. Always double check summaries." (old) | **362** | no — wrapped to 2 lines |
| **"AI-generated summary. Verify before use."** | **267** | **yes, 27 px to spare** |
| "AI-generated. Verify before use." (fallback) | 205 | yes |

**The preferred string was used.** The fallback was not needed.

Set through the Alert's `Message#165:0` text property, so the library component is untouched. The Alert drops **68 → 48**; the text node reads 294 wide and **20 tall**, one line.

The Alert is `severity=warning`, which per TEBRA-DESIGN-SYSTEM §3.13 renders its border and icon in `secondary.main` **coral**, not a yellow — a known trap in that row, not something this batch introduced. Its style is otherwise unchanged.

---

## 2. Bullet spacing

| | value |
|---|---|
| body line height | **24** |
| half, rounded to an integer | **12** |
| set as | `listSpacing = 12` on 50:985, 50:988, 50:991, 50:994 |
| `lineHeight` | **24, unchanged** — wrapped lines inside a bullet are untouched |
| `paragraphSpacing` | **0, unchanged** |

Each section has three bullets, so each gains 2 × 12 = **24**. Section heights 264 → 288, 168 → 192, 192 → 216, 168 → 192. Content 968 → **1064**.

**Heading spacing was checked and left alone**, as the brief required. After the change:

| gap | value |
|---|---|
| heading → its own first bullet | **8** |
| bullet → bullet | **12** |
| last bullet of a section → next heading | **16** |

8 < 16, so every heading still sits closer to its own list than to the one above it. **The condition to stop was not met.**

---

## 3. Scroll clearance

**Where the padding had to go.** The three A4 frames already carry `paddingBottom 122` on `Sheet body` — the scrolling frame itself, sized to the footer band. The ruling exists anyway, so that padding was not producing clearance when the prototype was played: padding on a FIXED auto-layout frame whose content overflows does not reliably extend the scroll, the content simply overflows past it.

So the clearance was put **inside the scrolling content**, on the sheet, which is the same construction `Schedule content` already uses to clear the home indicator and is true under either reading of Figma's scroll extent.

**The value: 138** = the footer band's **122** + the ruling's **16**. That is the smallest round figure that puts *nothing* in the sheet behind the band — the last bullet clears by far more than 16, and the feedback block, which is the actual last thing in the sheet, clears by exactly 16.

Made **once**, on `Visit/Sheet/Patient summary` 50:969. All five frames inherited it.

**Before and after, per frame, scrolled to the end:**

| frame | last bullet bottom before | after | footer top | clearance after |
|---|---|---|---|---|
| `A4 Patient / summary` | 721 | **617** | 722 | **105** |
| `A4 Colette / summary, after Marcus` | 721 | **617** | 722 | **105** |
| `A4 Colette / summary, after Yusuf` | 721 | **617** | 722 | **105** |
| `A5 Recording / summary` | 721 | **617** | — | no footer |
| `A5 Paused / summary` | 721 | **617** | — | no footer |

And the tail of the sheet, on the three frames that have a footer:

| | before | after |
|---|---|---|
| feedback block bottom, scrolled to end | 794 (72 px **behind** the band) | **706** (16 clear) |

**Sheet heights:** Marcus 1141 → **1355**, Colette 997 → **1211**. Of the 214 Marcus gains, 96 is bullet spacing, 138 is the new padding, and −20 is the disclaimer dropping to one line.

---

## 4. Wiring

Read before the first write and after the last, on `Account screens`:

| | before | after |
|---|---|---|
| Children | 54 | **54** |
| Frames | 46 | **46** |
| Reactions | 157 across 153 nodes | **157 across 153** |
| Destinations | 42 | **42** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |

**Nothing was wired, unwired or repointed.**

The five `SCAFFOLDING` frames added to `Archive` had every reaction stripped before and after cloning; that page still reads **0 reactions** and **no starting point**, so trap 46 had nothing to catch.

---

## How the scrolled screenshots were made

The plugin API cannot run a prototype, so "scrolled to the end" was rendered rather than played. Each summary frame was cloned onto `Archive`, the clone's `Drawer` instance **detached** so the sheet could be positioned inside `Sheet body`, and the sheet held at `y = bodyHeight − sheetHeight` — the end of the scroll under the stricter of the two readings of Figma's scroll extent, so the pictures show the *worst* case, not the flattering one. All reactions were stripped. They are labelled and kept:

| frame | id | sheet y |
|---|---|---|
| `SCAFFOLDING · A4 Patient / summary, scrolled to the end` | 278:12272 | −790 |
| `SCAFFOLDING · A4 Colette / summary, after Marcus, …` | 278:12506 | −646 |
| `SCAFFOLDING · A5 Recording / summary, …` | 278:12740 | −708 |
| `SCAFFOLDING · A5 Paused / summary, …` | 278:12949 | −708 |
| `SCAFFOLDING · A4 Colette / summary, after Yusuf, …` | 278:13158 | −646 |

---

## What was found

### `Sheet body`'s 122 of bottom padding is not clearance — DEFECT

Covered above. **Not changed**: 122 is right for a sheet that does not overflow, and taking it off touches every sheet frame in the file. Whether it should come off, and whether the chart list wants the same treatment, is open in `mobile-plan.md`. Logged as `mobileSummary_scrollFramePaddingIsNotClearance`.

### The Patient summary still carries a feedback action — GAP

`Patient summary feedback` 50:995 — "How would your rate the accuracy of this summary?" and two thumb Icon buttons — is an action, and §6.4 says every ported sheet drops its actions. It was ported before that rule was written and has survived every batch since. Left in place: removing it was not asked, and it is the last thing in the sheet, so the new padding now clears it rather than leaving it behind the band. **Its copy also reads "How would your rate"**, which is a typo for "How would you rate". Neither was changed. Logged as `mobileSummary_feedbackBlockSurvivesTheActionDrop`.

### The recording frames get 138 of trailing blank — DEFECT

`A5 Recording / summary` and `A5 Paused / summary` have no Start Recording band, so the new padding shows as empty white at the end of their scroll, of which only 34 is the home-indicator safe area. The brief said to make the change once on the shared source, and splitting the clearance across two places to save the blank would be worse. Visible in renders `08-` and `10-`. Logged as `mobileSummary_recordingFramesGetFooterPaddingTheyDoNotNeed`.

### The disclaimer reads through into the archive — DECISION

Four archived frames instance the same component and now show the new copy: `V4 Patient / summary`, `V5 Recording / summary` and `V5 Paused / summary` on `Archive · Visit screens`, and `PROOF · D2 Patient summary sheet 2026-09-15` on `Archive`. Overriding them back to the old string, to freeze the archive, would be a direct edit of archived frames — worse than letting an instance track its component. Recorded so it is not read later as an unlogged edit. Logged as `mobileSummary_disclaimerPropagatesIntoTheArchive`.

**The complete inventory of the disclaimer, ten nodes:** the master on `Components`, five summary frames on `Account screens`, three on `Archive · Visit screens`, one on `Archive`. `Foundations`, `Flow`, `scratchpad` and `Archive · Screens` carry none. All ten are the same component-internal node and all ten changed together.

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** set at the top of every read, and effective visibility computed by walking to the page rather than trusting `node.visible` (trap 39).
- **The disclaimer measured, not eyeballed**: a probe node at the same face and size, `WIDTH_AND_HEIGHT`, kept on `scratchpad` as evidence.
- **Read back on all five instances, not the master** (rule 3): disclaimer characters, width 294 and height 20 on every one; `listSpacing` 12 on all four bullet nodes on every one; `paddingBottom` 138 on every sheet.
- **Scrolled-to-end arithmetic computed per frame from absolute transforms**, under both readings of Figma's scroll extent, and the stricter one rendered.
- **Reaction, destination, off-page and starting-point counts** read before the first write and after the last.
- **Ten renders looked at**: five frames at the top, five at the end of their scroll.

---

## What I believe but did not see

- **The prototype was not played.** Figma's exact scroll extent for an overflowing auto-layout frame could not be executed from the plugin API. The fix was built to satisfy the ruling under either reading — 105 px of clearance under the stricter one, 227 under the looser — so the conclusion does not depend on which is right. The scrolled screenshots show the stricter one.
- **The summary content itself is Daniel's**, invented for the demo. No wording inside a bullet was changed.
- **The library Alert was not touched** — only its `Message` text property on one instance.
- **Colette's two summary frames are identical** to each other but for where "Patients" goes back to, so their renders are duplicates.
- **The typo "How would your rate"** is in the feedback prompt and was left alone, as was the feedback block itself.

---

## Renders

- `figma-export/patient-summaries-2026-09-17/` — the five summary frames at the top and at the end of their scroll, ten files
- `reports/Polish the patient summaries.png` — the contact sheet, five columns, top row above scrolled row
