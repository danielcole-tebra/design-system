# Build the new patient landing page

2026-09-17 · `TP5KrQtY0T5IcMNqi375So` · `Components` 1:2, `Account screens` 103:2319, `scratchpad` 262:7760, `Archive` 214:3026 · library `YX2n4YLrEpBXNbcc73T6dw`, read only

Three rulings moved from experiment to settled, six items, all six done.

---

## One thing to settle first: where the portraits are

The brief asked whether `assets/patients/marcus-vance.png` and `assets/patients/colette-mwangi.png` exist.

**`assets/patients/` does not exist.** Both portraits do:

| file | size |
|---|---|
| `assets/marcus-vance.png` | 1254 × 1254 |
| `assets/colette-mwangi.png` | 1254 × 1254 |

They are one folder up from the named path, and they landed in the repo earlier the same day — they are the two files that swept into the previous batch's commit.

**They were used, and no missing-asset GAP was logged.** The ruling says the patient header carries a profile picture; these are the only two portraits in the repo; nothing was sourced from anywhere else. The only thing that differs from the brief is the folder, so it is recorded as a defect to settle rather than as an absent asset. If you meant the fallback to fire, say so and it is a two-line change to initials.

---

## What the enumeration found

### `EXPERIMENT A · Patient page, plain header` 282:7488

| block | y | h | what |
|---|---|---|---|
| `Header` (SCAFFOLDING) | 0 | 135 | safe area 47, back row 44 with the "Patients" text Button at x 4.017, patient identity 44 |
| `Control group` | 135 | 118 | padding 16/16/0/16, gap 8 — Start Encounter **358 × 56**, then a config row of the SOAP Note pill and the microphone pill **FILLing 175 each** |
| `Patient admin details` | 269 | 288 | 390-wide `color/background/paper` block, four 72 rows, library `List/Item` at `Lines=Two` over a 1 px INSIDE `color/divider` stroke, last row's off |
| `Visit/Drawer edge (closed chart)` | 732 | 112 | puller, "Patient chart", 34 bottom safe area |

### Every frame a patient lands on today

Twenty reactions point at a patient page with the drawer open. They split three ways.

**Seven landings from outside — all repointed:**

| # | from frame | node | to (before) |
|---|---|---|---|
| 1 | `A S2 Home / results` | `Search result row` 103:2382 | A4 Patient / list |
| 2 | `A S2 Home / schedule` | `Schedule row · Marcus Vance` 204:4380 | A4 Patient / list |
| 3 | `A S2 Home / schedule, top` | `Schedule row · Marcus Vance` 204:4309 | A4 Patient / list |
| 4 | `A S8 Sent / sent` | `Next patient CTA` 103:2483 | A4 Colette / after Marcus |
| 5 | `A S2 Home / schedule, Marcus sent` | `Schedule row · Colette Mwangi` 227:2440 | A4 Colette / after Marcus |
| 6 | `A S8 Sent / Yusuf` | `Next patient CTA` 230:5054 | A4 Colette / after Yusuf |
| 7 | `A S2 Home / schedule, both sent` | `Schedule row · Colette Mwangi` 230:4697 | A4 Colette / after Yusuf |

**Nine drawer backs from the patient's own sheets — left alone**, because they live on frames this batch must not touch: `A4 Patient / placeholder`, `/ summary` and `/ vitals` back to `A4 Patient / list`; Colette's summary, medications and vitals on each path back to her two chart lists.

**Two of Yusuf's — out of scope:** `A S9 Account / unsent`'s not-sent row and his schedule row on three frames.

### The chart list each landing page opens

| patient / path | chart list |
|---|---|
| Marcus | `A4 Patient / list` **103:3027** |
| Colette, after Marcus | `A4 Colette / after Marcus` **246:4990** |
| Colette, after Yusuf | `A4 Colette / after Yusuf` **246:4995** |

---

## 1. The component

**`Visit/Patient header` 287:10323**, on `Components` at (3992, 0). **390 × 265.**

| part | h |
|---|---|
| Top safe area | 47 |
| Back row | 44 — the "Patients" Button at x 4.017 |
| Patient identity | **56** — padding 8/16/0/16, gap 12, `CENTER`: the **48 avatar**, then a `Name and DOB` row (gap 8, `BASELINE`) |
| Control group | 118 — Start Encounter 358 × 56, config row 175 + 175 |

**Properties exposed:** `Name#287:0` (TEXT), `DOB#287:1` (TEXT), `Avatar#287:2` (INSTANCE_SWAP, default Marcus, both portraits as `preferredValues` per trap 14). Read back on the master and on all three instances.

Experiment A's own `Header` and `Control group` are now **hidden and renamed SUPERSEDED**, kept under rule 1, with the new component instance in their place.

## 2. The avatar

**`Visit/Avatar/Marcus Vance` 287:7428** and **`Visit/Avatar/Colette Mwangi` 287:7431**, 48 × 48 each.

Both wrap the **library Avatar** `Content=Letter` (from set 208:11) with three local overrides, because the library cannot do this on its own:

| override | why |
|---|---|
| resize 40 → **48** | §3.31: Avatar is substrate MUI, 40px, **no `size` prop** |
| `cornerRadius` 20 → **24** | a resized instance keeps radius 20 and stops being a circle |
| fill → **IMAGE at `scaleMode FILL`** | there is **no photo variant** — only Fallback, Letter, Icon |

The initials (`MV`, `CM`) are set and then **hidden underneath**, so the fallback is still in the file if the image is ever dropped.

Uploaded through `upload_assets`; both responses carried `placedOnNodeId`, and the fills were read back anyway (trap 6) — both confirmed as IMAGE with the right hash and a 1254 × 1254 source.

## 3. The landing frames

| frame | id | at | avatar |
|---|---|---|---|
| `A4 Patient / landing` | **287:10395** | (6470, 3132) | Marcus |
| `A4 Colette / landing, after Marcus` | **287:10504** | (6940, 3132) | Colette |
| `A4 Colette / landing, after Yusuf` | **287:10615** | (7410, 3132) | Colette |

Each: header 265, admin details at y **281** (288 tall), closed drawer at y **732**. **163 of page** shows between the admin block and the drawer.

**No value wraps.** All twelve secondaries read 20 tall — checked on the instances, not assumed. The longest is "Sore throat, nasal congestion, productive cough".

## 4. Wiring on the landing frames

| frame | Back to patients | Start Encounter | closed drawer (tap + drag) |
|---|---|---|---|
| A4 Patient / landing | A S2 Home / schedule | **A S5 Recording / recording** | A4 Patient / list |
| A4 Colette / landing, after Marcus | A S2 Home / schedule, Marcus sent | **nothing** | A4 Colette / after Marcus |
| A4 Colette / landing, after Yusuf | A S2 Home / schedule, both sent | **nothing** | A4 Colette / after Yusuf |

The drag uses **`SMART_ANIMATE / EASE_OUT / 0.225`**, copied from the recording screens' own drawer edge, because trap 37 rejects a null transition on `ON_DRAG`. The pills carry no reaction.

**Nothing on Colette's path reaches a Marcus frame** — checked against all five Marcus frame ids, zero hits.

## 5. The repointing, and what stays reachable

All seven landings repointed and read back. **None of the three replaced frames could be marked SUPERSEDED**, because all three are still reached:

| replaced frame | still reached from |
|---|---|
| `A4 Patient / list` 103:3027 | `A4 Patient / placeholder`, `/ summary`, `/ vitals` drawer backs — **and** `A4 Patient / landing`'s closed drawer |
| `A4 Colette / after Marcus` 246:4990 | her summary, medications and vitals drawer backs on that path — **and** her landing page's closed drawer |
| `A4 Colette / after Yusuf` 246:4995 | the same three on that path — **and** her landing page's closed drawer |

That is the brief's own condition, and it fails for all three: nine sheet returns plus the three new closed drawers. Names left as they are. The next batch brings those sheets in line.

## 6. Counts, with the arithmetic

| | before | after |
|---|---|---|
| Children on `Account screens` | 54 | **57** |
| Frames | 46 | **49** |
| Reactions | 157 | **167** |
| Nodes with reactions | 153 | **160** |
| Destinations | 42 | **45** |
| Off-page destinations | 0 | **0** |
| Starting points | 2 | **2** |

- **+3 children, +3 frames** — the three landing frames.
- **+10 reactions on +7 nodes** — Marcus's frame carries 4 (back, Start Encounter, drawer tap, drawer drag) and Colette's two carry 3 each (back, drawer tap, drawer drag). That is 4 + 3 + 3 = 10 across 3 + 2 + 2 = 7 nodes, because each closed drawer is **one** node carrying two reactions. 157 + 10 = **167**; 153 + 7 = **160**.
- **+3 destinations** — the three new frames. The seven repointed reactions moved *off* the three old frames, but those stay destinations, because the nine sheet backs and the three new closed drawers still point at them. 42 + 3 = **45**.
- **Starting points unchanged** at `Account device` and `Schedule`, read by nodeId after every clone (trap 46).

**Every destination read back by frame name from both `action` and `actions`** (note 49). They agreed on all seventeen — ten new, seven repointed.

---

## What was found

### A fixed-width DOB box wrapped Colette's date — and the render caught it, not the arithmetic

The header's DOB was cloned from the ready bar, where it is a fixed box (trap 48's history), and it came through as **FIXED 103, `textAutoResize NONE`**. My width arithmetic said both names fitted, and for Marcus it did: "DOB 03/14/1972" is exactly 103.

**"DOB 05/09/1968" is 108** — the same character count with wider glyphs — so it wrapped to two lines on both Colette frames. The first screenshot showed it immediately.

Setting `textAutoResize = 'WIDTH_AND_HEIGHT'` **did not take**: it read back `NONE`, because the node was `layoutSizingVertical: FILL` and a FILL child cannot hug. It needed **HUG on both axes first**, then the mode. Fixed on the master and re-read on all three instances.

After the fix, measured on the instances: the identity row gives **298** after the 48 avatar and the 16 gutters, and the widest case is 175 + 8 + 108 = **291** — 7 px of slack. `mobilePatientPage_fixedDobBoxWrappedColette`.

### The library Avatar has no image content and no size — GAP

`Content` is Fallback / Letter / Icon, all three 40 × 40, with no `size` prop — §3.31 confirms it is substrate MUI with every override commented out. A 48 portrait avatar therefore needs three local overrides and a wrapper component per patient. **The library needs an Avatar with an image slot and a size.** `libraryAvatar_noImageContentAndNoSize`.

### The portraits are not under `assets/patients/` — DEFECT

Covered at the top. `mobilePatientPage_portraitsAreNotUnderAssetsPatients`.

### 163 of empty page remains

The gap between the admin rows and the closed drawer is unchanged from the experiment — it was 175 there, and 163 here because the header is 12 taller. It was flagged then as the thing to judge on a phone, and it still is.

---

## Verification

- **`figma.skipInvisibleInstanceChildren = false`** at the top of every read.
- **Read back from the instances, not the masters** (rule 3): header height, identity row height, name and DOB characters, widths and heights, the avatar swap value, all twelve admin row strings, and each secondary's rendered height to prove nothing wraps.
- **The new component instantiated three times and each instance read**, plus a two-up proof on paper.
- **Image fills read back** after upload rather than trusted from the POST response (trap 6), with the source size resolved through `getImageByHash`.
- **Every reaction read back by frame name from both representations** (note 49), including the seven repointed ones with their before-destinations recorded.
- **Colette's path checked for leaks** against all five Marcus frame ids: zero.
- **`flowStartingPoints` read after the clones** by nodeId, not name (trap 46): unchanged at two.
- **Four renders looked at**, and the first pass was rejected on them — the DOB wrap was invisible in the numbers and obvious in the pixels.

---

## What I believe but did not see

- **The prototype was not played.** The loop is traced through stored destinations.
- **The portraits are stock headshots** supplied in the repo; they describe no real patient, and the clinical content around them remains invented for the demo.
- **The old chart-list, summary, Medications, Vitals and Yusuf frames were not touched**, as instructed — which is exactly why their drawer backs still return to the old pages and why none could be retired.
- **`EXPERIMENT A` on `scratchpad` now shows the real header.** Its original header and control group are hidden beneath it rather than removed, so the experiment still reads as the thing the landing page came from.
- **The closed drawer's drag transition was copied, not chosen.** It matches the recording screens; whether 0.225 s is right for a drawer opening from the bottom of a patient page is a judgement nobody has made yet.

---

## Renders

- `figma-export/patient-landing-2026-09-17/` — the three landing frames and the header with both avatars, four files
- `reports/Build the new patient landing page.png` — the contact sheet: the three frames, then the header component with each portrait
