# Try two patient page layouts

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · built on `scratchpad` 262:7760 · read only: `Account screens` 103:2319, `Components` 1:2, library `YX2n4YLrEpBXNbcc73T6dw`

An experiment, not a change. Two frames for Daniel to compare on a phone. **Nothing that exists today was modified**, and neither frame is wired or reachable.

---

## What the enumeration found

### `A4 Patient / summary` 103:3037 — the page as it is

Four absolute children on a `color/background/default` page:

| child | y | h | what it is |
|---|---|---|---|
| `Visit/Recording bar` instance, `State=ready` | 0 | **201** | the whole header, as one component |
| `Drawer` | 201 | 643 | 32 top corners, `color/background/paper` |
| `Footer band` | 722 | 122 | white rectangle |
| `Start recording CTA` | 738 | 56 | 358 wide at x 16 |

Inside the 201 bar, top to bottom:

| part | y | h | geometry |
|---|---|---|---|
| `Top safe area` | 0 | 47 | — |
| `Back row` | 47 | 44 | the "Patients" text Button at x **4.017**, 103 × 36, `ChevronLeft` + label on `color/primary/main` |
| `Patient identity` | 91 | 44 | padding 8 / 16 / 0 / 16, `BASELINE` row: **Marcus Vance** at 24 / 36 on `color/text/primary`, **DOB 03/14/1972** at 14 / 20 on `color/text/secondary`, box 120 wide |
| `Pills row` | 135 | 50 | padding 12 / 16 / 0 / 16, gap 8: **SOAP Note pill 139 × 38** at x 16, **device pill 82 × 38** at x 163 |

Both pills are the library **Button** set 6:16 at `variant=contained, color=primary, size=medium`, filled `color/common/white` with a 1 px `color/core/main` stroke and ink on `color/core/contrastText`. The CTA is the same set at `color=secondary`, filled `color/secondary/main`, label on `color/secondary/contrastText`, radius 24.

### `A5 Recording / summary` 103:3045 — the band the experiment is matching

| part | y | h | fill |
|---|---|---|---|
| `Visit/Recording bar`, `State=recording` | 0 | **119** | **`color/success/dark`** #2B865A |
| ↳ `Top safe area` | 0 | 47 | — |
| ↳ `Bar row` | 47 | **72** | padding 0 / 16, gap 16, `CENTER` |
| `Bar field behind drawer 32` (SCAFFOLDING) | 119 | 32 | same fill, so the drawer's corners cut through the band and not the page |
| `Drawer` | 119 | 725 | — |

**How the controls sit in it**: the `Bar row` is one horizontal row — a `Readout` column FILLing the width (patient name 16 / 24, timer 24 / 36, both `color/common/white`) with a fixed **76 × 40** `Controls` frame trailing at x 308, holding the 40 pause and stop Icon buttons **centred on the timer line**. Everything lives in the band; nothing floats over the drawer.

### The drawer's closed state — it already exists

**`Visit/Drawer edge` 70:1480**, a component, **390 × 112**, `color/background/paper`, 32 top corners, `clipsContent`:

| part | y | h |
|---|---|---|
| `Puller zone` | 0 | 30 — a 30 × 6 `color/grey/400` puller at x 180, y 8 |
| `Title row` | 30 | 48 — **"Patient chart"**, Akkurat LL **Bold** 16 / 24 at x 16, `color/text/primary` |
| `Bottom safe area` | 78 | 34 |
| `Top stroke` | — | present but hidden; it sits over a colour field on the recording screens |

**The puller carries no reaction in the component.** The drag-to-open behaviour is a per-frame reaction on the three recording screens, not something the closed state owns.

---

## What was built

Both frames are **390 × 844** on `scratchpad`, side by side at **x 1000** and **x 1470**, each with a 24 / 34 Bold label above it.

### `EXPERIMENT A · Patient page, plain header` 282:7488

| block | y | h |
|---|---|---|
| `Header` (SCAFFOLDING) | 0 | **135** — safe area 47, back row 44, patient identity 44 |
| `Control group` | 135 | **118** — padding 16 / 16 / 0 / 16, gap 8 |
| ↳ Start Encounter | 151 | 56, **358** wide |
| ↳ `Config row` | 215 | 38 — SOAP Note and the device pill, **175 each**, 8 apart |
| `Patient admin details` | 269 | **288** — four 72 rows on `color/background/paper` |
| `Visit/Drawer edge (closed chart)` | **732** | 112 |

No band. Page colour throughout, exactly as today.

### `EXPERIMENT B · Patient page, resting band` 282:7501

| block | y | h |
|---|---|---|
| `Resting band` (SCAFFOLDING) | 0 | **269** — the same header and control group, inside a full-bleed band |
| `Patient admin details` | 285 | 288 |
| `Visit/Drawer edge (closed chart)` | **732** | 112 |

Same arrangement, same numbers, one surface around the top.

**"Matches the recording band's geometry"** was read as *same construction*, not *same height*: full bleed to both edges, the 47 safe area inside it, content padded 16 at the sides, square corners, no bottom padding beyond the control group's own 16. It is deeper — 269 against 119 — because it holds a header and three controls where the recording band holds a readout and two.

### The resting colour — `color/primary/main`

**Not chosen by hue.** The recording band is `Visit/Recording bar` at `State=recording`, bound `color/success/dark`. **The same component's `State=paused` 51:1006 binds `color/primary/main`** #004852 — and so does the sign-in field (§3). So the band already has a non-recording fill in this file, from the same component, and that is closest in role by construction rather than by matching a colour.

**No GAP was needed**; nothing had to fall back to the page surface.

Ink on it follows §3's standing rule for text on a colour field, `color/common/white`: the "Patients" link and its chevron, the patient name, and the DOB. The three Buttons keep their own bindings — the CTA's label on `color/secondary/contrastText`, the two pills' labels and glyphs on `color/core/contrastText` — because they sit on their own fills, not on the band.

### Patient admin details, both frames

Built by cloning the **`Medication row` wrapper 272:397**, which is the composition this file already has for a two-line row: the library `List/Item` at `Lines=Two`, `Show icon` off, FILLing a **FIXED 72** wrapper carrying a **1 px INSIDE bottom stroke bound `color/divider`**. Widened to **390** so the block bleeds to both edges the way schedule rows do; the `List/Item`'s own 16 of padding keeps the text on x 16. Last row's divider off.

| row | primary | secondary |
|---|---|---|
| 1 | Reason for visit | Sore throat, nasal congestion, productive cough |
| 2 | Last seen | March 2, 2026 |
| 3 | Insurance | Blue Cross Blue Shield PPO |
| 4 | Primary care provider | Dr. Alma Reyes |

**Label on the primary line, value on the secondary — the opposite of Medications and Vitals, deliberately.** Those sheets put the fact first because their primaries name themselves: "Blood pressure 124/78 mmHg" needs no label above it. "March 2, 2026" does. So here the label leads, which is also what `Account/List row` 163:1444 does. Row 1's value is the longest at 46 characters and **does not wrap** — measured on the instance, all four rows read 390 × 72 with the `List/Item` at 71.

### The closed drawer — 112

**`Visit/Drawer edge` 70:1480**, instanced, at **y 732** so its bottom sits on the frame bottom.

**Why 112**: it is the file's existing closed-drawer expression, already used on the three recording screens, so the experiment introduces no new closed state to argue about — and at 112 the puller, the 32 corners and the **"Patient chart"** title all show, which is what "enough of its top edge to read as a surface" needs. **The puller is not wired**, as instructed.

---

## Nothing was modified

| | before | after |
|---|---|---|
| `Account screens` children | 54 | **54** |
| Frames | 46 | **46** |
| Reactions | 157 across 153 nodes | **157 across 153** |
| Destinations | 42 | **42** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |
| `scratchpad` reactions | 1 | **1** |
| `scratchpad` starting points | 0 | **0** |

`A4 Patient / summary`'s four children are still at y 0 / 201 / 722 / 738, and its CTA still reads **"Start recording"** — the rename is on the experiments only. `scratchpad` went from 2 children to 6: two frames and two labels.

---

## What was found

### Both layouts leave a large empty band of page — GAP

**175 px on A** (admin ends 557, drawer starts 732) and **159 px on B** (573 to 732). It is not an error; it is what the arrangement produces once the controls move to the top, four admin rows take 288 and the closed drawer takes 112. Whether that space wants more content, a taller closed drawer, or is simply the page breathing is Daniel's call, and it is the most visible difference from today's page — where the drawer starts at 201 and fills everything below. `mobilePatientPage_gapBetweenAdminAndClosedDrawer`.

### The ready bar cannot be rearranged from an instance — GAP

`Visit/Recording bar` 48:918 at `State=ready` is a fixed 201-tall variant that puts the pills row **below** the patient identity — precisely the arrangement this experiment moves — and an instance cannot reorder its children (rule 6). So the safe area, the back row and the patient identity were reassembled around **clones of the component's own nodes**, which carry their bindings across as objects rather than as retyped values, and both frames' top blocks are named **SCAFFOLDING** with the reason in the layer name.

If either layout is adopted, `Visit/Recording bar` needs a variant for it. `mobilePatientPage_readyBarCannotBeRearranged`.

### No muted ink for a dark surface — GAP

On B the patient name and the DOB are both `color/common/white`, because §3 gives one ink over a colour field and the library has no muted white. On the page they are `color/text/primary` and `color/text/secondary`. The recording bar has the same problem and leans on size — name 16 / 24, timer 24 / 36 — and B does the same, name 24 / 36 against DOB 14 / 20, so the hierarchy survives even though the secondary ink does not. `mobilePatientPage_noMutedInkOnAColourField`.

### One thing that went wrong and was caught

Whitening the band's ink in one pass hit **every** TEXT and VECTOR inside it, including the Start Encounter label on its coral fill and both pill labels on their white fills — white on white. Caught by reading the bindings back, and repaired by copying each node's fills from the matching node in Experiment A, matched by walking both Button instances in parallel and checking the trees were the same shape. All nine restored bindings were read back: `color/secondary/contrastText` on the CTA, `color/core/contrastText` on the two pills.

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read.
- **Geometry read back from the built frames**, not from the plan: block tops and heights, the 175 / 159 gaps, pills at 175 each, CTA at 358 × 56, admin rows at 390 × 72, drawer edge at y 732.
- **Every binding read back by variable id and resolved to a name** — the band on `color/primary/main`, the admin block on `color/background/paper`, the page on `color/background/default`, the divider on `color/divider`, the four white nodes on `color/common/white`.
- **`componentPropertyReferences` checked on every clone** and read back `null` — a clone outside a component cannot hold them, which the API confirms by refusing to set them.
- **Counts read before the first write and after the last**, on `Account screens` and on `scratchpad`.
- **Four renders looked at**: both experiments, the recording screen they are matching, and today's patient page.

---

## What I believe but did not see

- **The prototype was not played.** Neither frame is wired; the puller is deliberately dead.
- **Nothing here is a recommendation.** The two frames are built to be compared, and the report does not pick one.
- **"Start Encounter" is Daniel's word**, from FHIR, and is recorded in the spec as possibly temporary.
- **The admin content is invented for the demo** and describes no real person, insurer or provider.
- **The label-leads choice for the admin rows is a judgement**, made because a bare date does not name itself. If Daniel wants it the other way, it is one property per row.
- **The experiments do not show a scrolled state.** Nothing on either frame overflows, so there is nothing to scroll.

---

## Renders

- `figma-export/patient-page-experiments-2026-09-17/` — both experiments, `A5 Recording / summary`, and `A4 Patient / summary` as it stands, four files
- `reports/Try two patient page layouts.png` — the contact sheet: the two experiments beside today's page, then each beside the recording screen
