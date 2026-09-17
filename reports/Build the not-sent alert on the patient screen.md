# Build the not-sent alert on the patient screen

2026-09-17 · File `TP5KrQtY0T5IcMNqi375So`, page `Account screens` · `figma.skipInvisibleInstanceChildren = false` on every read · additive only

![contact sheet](Build%20the%20not-sent%20alert%20on%20the%20patient%20screen.png)

---

## What was built

**`A4 Patient / list, not sent` 200:6707**, at (1530, 6800), 390 × 844 — a clone of `A4 Patient / list` 103:3027, placed beside `A4 Patient / placeholder`.

| Piece | Value |
|---|---|
| Alert | library `Alert` `variant=standard, severity=error`, master 2:785 in set 2:784 |
| Alert geometry | **358 × 48 at (16, 201)** |
| Message | "Recording from 9:15 AM not sent" |
| Action | text Button `variant=text, color=error, size=small` 6:62, label **"Retry"**, in the Alert's own action slot |
| Retry wiring | `ON_CLICK` → `A S7 Sending` 103:2463, `NAVIGATE`, reset scroll |
| Drawer | moved **201 → 265**, height **643 → 579**, bottom still **844** |
| Gap | **16** above the alert and 16 below it |

**The Alert has a real action slot, so nothing was blocked.** The component exposes `action#802:26` as an `INSTANCE_SWAP` whose default is `Icon/CloseOutlined` 2:761, gated behind a separate `onClose#165:7` BOOLEAN that controls the `Action` frame's visibility. Revealing the action therefore takes two property writes, not one: `onClose` true to show the frame, then the swap to replace the close icon with a Button. Its `preferredValues` already list two component sets, so a Button in that slot is what the library intends. The other properties read back as `Show title#802:13` false, `icon#745:0` true, `Title#802:0` "Alert title" (hidden).

### The gap, and why 16

The pills row frame ends at **185** (`Pills row` at y 135, 50 tall; both pills are 38 tall at y 147, so pill ink also ends at 185). The drawer began at **201**. The existing gap was therefore **16**, and that is the gap used on both sides of the alert:

- alert top **201** = 185 + 16
- alert bottom **249**
- drawer top **265** = 249 + 16

Confirmed in the 1x render rather than derived: scanning down the centre, the alert's top border is the first non-beige pixel at **y 201** and reads `(216, 59, 77)` = **#D83B4D**, the spec's Failed-to-send red; the interior is white to 247; the bottom border is at 248; beige runs 249–264; the drawer's top stroke is at **265**.

### The drawer

Moved down 64 and shortened by 64, so its bottom stays on 844. `resize()` took effect and was read back — the Drawer is a direct child of the frame, not an instance inside an instance, so trap 18 did not apply. The **footer band stays at y 722 × 122** and **Start Recording at y 738**; both are siblings of the drawer, not children, so they never moved, and the drawer's 122 bottom padding still lands on 722.

**One visible consequence:** the shorter drawer shows **eight** chart rows before the list scrolls where the source shows nine. Sheet 9 is now below the fold. The list scrolls, so nothing is lost, but the two frames do not crop identically — visible in the contact sheet.

---

## What was found

**1. The Retry target is 28 px tall, against the spec's 48 minimum.** `mobile-spec.md` §3 sets a minimum touch target of 48. The Button is **64 × 28** and the `Action` frame that holds it is **64 × 36**. Neither reaches 48, and the library Alert offers no larger action area — the frame is sized by the Alert's own 6 px padding against a 48-tall bar. Wiring the `Action` frame instead of the Button would gain 8 px and still fall short. **Not resolved** (rule 10). This is the component's limit, not a build choice, and it is the first place in this prototype where a wired control is under 48.

**2. The alert's message does not truncate, but it has little room.** "Recording from 9:15 AM not sent" measures **218** wide in a 294-wide slot with `textTruncation` DISABLED and `textAutoResize` HEIGHT — so it fits on one line with 76 px to spare, and a longer string would wrap and grow the alert rather than clip. Any later copy change moves the drawer, because the drawer's position is derived from the alert's height.

**3. The clone carried everything, and the count proves it rather than the recipe.** Traps 35 and 42 both warn about loss on clone. Comparing source and clone **by layer-name path** before touching anything: 5 reaction-bearing nodes on each, 5 reactions on each, **identical JSON on every path, nothing missing, nothing extra, nothing differing**, and 0 frame-own reactions on both. No reaction was re-applied, which is what trap 35's amendment asks for — a blind replay would have doubled all five.

**4. `flowStartingPoints` is unchanged at two and holds no duplicate.** `Account device` 103:2320 and `Unsent recording` 140:1618, read after the clone. A cloned frame does not inherit a starting point, so nothing had to be removed.

**5. The severity red and the error ramp agree.** The alert's border samples #D83B4D, which is the spec's "Failed to send, stop confirm" colour and `color/error/main`. `TEBRA-DESIGN-SYSTEM.md` §3.13 says `standardError` is a **white ground plus a 1 px coloured border** rather than MUI's computed tint, and that is exactly what rendered — the alert is white on the beige, not a pale red wash.

### A design question, raised rather than decided

**The Retry button's colour was not ruled.** Daniel ruled "a text Button". The Button set offers `primary`, `secondary`, `error` and `inherit`; I used **`color=error`** so the action reads as part of the error alert, and `size=small` because 28 is exactly the height of the `Action` frame the Alert ships. The alternative worth considering is `primary` teal, which would match every other text action in the app and make Retry look like a link rather than part of the warning. Cheap to change — one property on one instance.

---

## Counts, before and after

| Page | Frames before | Frames after | Reactions before | Reactions after |
|---|---|---|---|---|
| **Account screens** | 39 (+4 components) | **40** (+4 components) | 114 across 111 | **120 across 117** |
| Visit screens | 26 | 26 | 84 across 81 | 84 across 81 |
| Screens | 18 | 18 | 42 across 41 | 42 across 41 |

**Every difference accounted for:**

- **+1 frame** — `A4 Patient / list, not sent` 200:6707. The page's child count went 43 → 44; four of those children are components (`Account/Avatar`, `Account/Top bar`, `Account/Microphone sheet`, `Account/List row`), which is why 44 children is 40 frames.
- **+6 reactions on +6 nodes** — **5** carried across by the clone (Back to patients, device pill, Patient summary row, Medications row, Start Recording CTA) and **1** new, the Retry button. No existing reaction was edited.
- **Visit screens and Screens are untouched**, re-read after the build: 26/84/81 and 18/42/41, one starting point each.

**No reaction crosses pages.** All **30** distinct destination ids on `Account screens` were resolved with `getNodeByIdAsync` and walked up to their page; every one lands on `Account screens`, none off-page, none unresolvable.

**The source frame is untouched**: `A4 Patient / list` 103:3027 re-read after the build still has 4 children and its Drawer still at y 201, height 643.

---

## What I believe but did not see

- **The prototype was not played.** Retry's reaction is read back from the node, not observed navigating. Same for the five carried reactions — they are byte-identical JSON to the source's, which is evidence they were copied, not evidence they work.
- **Nothing was checked on a device.** The 28 px touch target is a measurement against a written rule, not an observed miss.
- **The schedule rulings are recorded, not built.** Marcus Vance being the Failed to send row, the next upcoming belonging to someone else, and every other row being inert are all written into FLAGS.md and the spec; no schedule frame exists yet, so nothing in the file tests them.
- **`A S2 Home / unsent` was confirmed unchanged only by not being touched** — its reaction was not re-read this batch. The page-level count of 120 across 117 is consistent with it being intact, but that is inference from a total, not a read of that node.
- **The renders are 1x**, as the brief asked, so fine antialiasing on the alert's 1 px border is not resolvable in them; the border colour was sampled from the pixel grid, where a 1 px line at integer y is exact.
- Both renders were **looked at before this was written**.

---

## Renders

- `figma-export/patient-not-sent-2026-09-17/a4-patient-list-not-sent-200-6707-1x.png`
- `figma-export/patient-not-sent-2026-09-17/a4-patient-list-103-3027-1x.png`
- `reports/Build the not-sent alert on the patient screen.png` — the two side by side
