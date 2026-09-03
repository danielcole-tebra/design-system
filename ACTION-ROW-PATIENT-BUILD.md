# Patient action row — build

Built 2026-08-20 in the proposals file `zKT34LQogNjz3Z07fY4VQB`, new page **`Patient action row`**,
component **`45:537`**. Placed on `Control — patient chart` as instance **`46:196`**.

Phase 0 is `ACTION-ROW-PATIENT-PHASE0.md`. Its four contradictions were resolved by instruction:
**revert to production's composition; the modal test is withdrawn.**

---

## 1. The modal test is withdrawn

Recorded so it is not reintroduced. The test read: *if an action opens a modal and acts on the
patient in place it belongs in this row; if it navigates, the rail owns it.*

Phase 0 showed it selects almost the inverse of the list it was attached to. Of the six actions it
was written to admit, exactly one — `Send Patient Education` — opens a modal. `New Note`,
`AI Note Assist` and `Collect Payment` navigate; `Print` opens a PDF in a new tab; `Send Secure
Message` was already admitted as an exception. Meanwhile all five C-CDA items it sent *into* More are
modals and pass it cleanly.

**Withdrawn on instruction. The row is production's composition, moved. Nothing else was changed.**
C1, C2, C3 and C4 are closed by that same decision.

---

## 2. What was built

| Position | Control | Component | Size | Icon |
|---|---|---|---|---|
| 1 | **New Note** | `Button group / Segment` ×2, Contained · Secondary · Small, Position First + Last | 30 | `PlusOutlined` + `DownCaret` |
| 2 | **AI Note Assist** | `Button` Contained · Primary · Small | 30 | **none — gap** |
| 3 | **Collect Payment ($0.00)** | `Button` Text · Primary · Small | 28 | none (production has none) |
| 4 | **Print** | `Button` Text · Primary · Medium | 36 | **none — gap** |
| → right edge | **More** | `Button` Text · Primary · Medium | 36 | `DownCaret` |

`More` carries all **eight**, labels verbatim from `clinical-system/src/types/header.ts:50-59`:
Send Secure Message · Send Patient Education · Health Data Exchange · Export Immunization Data ·
Export Health Surveillance Data · Import Summary of Care · Export Referral · Export Continuity of
Care. Recorded in the component description; the popover itself is not drawn.

---

## 3. Height, derived

**56 = 36 + 10 + 10.**

- **36** is the tallest control in the row, read from the library node, not from prose: `Button`
  `Variant=Text, Color=Primary, Size=Medium, State=Default` measures **36** high with padding 6/8.
  Print and More resolve to Medium because `HeaderRightLinks.tsx` passes **no `size` prop** to either.
- **10 + 10** is the patient header band's own vertical padding, reused so the two bands agree rather
  than each inventing a rhythm.

The working estimate was 56 and the derivation lands on 56. **It was derived, not adopted** — had the
tallest control been the Small contained button at 30, this row would be 50.

Other measured values, for the record:

| Button | Height | Padding |
|---|---:|---|
| Text · Small | 28 | 4/5 |
| Text · Medium | **36** | 6/8 |
| Contained · Small | 30 | 5/11 |
| Contained · Medium | 38 | 7/17 |
| Segment · Secondary · Small | 30 | — |

**Zero authored fractional dimensions.** Row 900 × 56; Actions cluster 565 × 36; More 79 × 36 at
x = 805, so 805 + 79 = 884 = 900 − 16, the right padding closing exactly.

---

## 4. Alignment to the header

| | Patient header | Action row |
|---|---|---|
| Master width | 900 | **900** |
| `minWidth` | 900 | **900** |
| `maxWidth` | null | **null** |
| Horizontal padding | 16 / 16 | **16 / 16** |
| Vertical padding | 10 / 10 | **10 / 10** |
| Ground | `color/background/paper` | **`color/background/paper`** |
| Bottom rule | 1px inside, `color/divider` | **1px inside, `color/divider`** |

The 900 is a **floor, not a fixed width** — `minWidth: 900`, no `maxWidth` — exactly as the header
declares it, and exactly the case the standing convention warns about. A master cannot fill at the
top level, so instances fill when placed.

**On the control screen**, verified structurally: row `x = 0`, `width = 1184`, identical to the header
instance. `72 + 56 + 768 = 896`, closing against the body height exactly.

| Node | y | Size |
|---|---:|---|
| `Patient header` | 0 | 1184 × 72 |
| **`Patient action row`** | **72** | **1184 × 56** |
| `Page content` | 128 | 1184 × **768** (was 824) |

**The row costs 56 of the 896 body.** `Page content` drops from 824 to 768, a 6.8% reduction, on a
body height the control screen's own caption already records as unsourced.

---

## 5. Verification

Both screenshots taken and reviewed.

| Check | Result |
|---|---|
| Row reads as a separate band, not a continuation | **Passes, but by a hairline only** — see below |
| Five controls visible, More at the right edge | Passes |
| Left and right edges align to the header's | Passes — `x=0`, `w=1184`, asserted and visible |
| Nothing truncates at 1440 | Passes — 565 of 1152 available width used by the left cluster |

**On the band separation, honestly.** The row is white on white against the header, separated by the
header's 1px `divider` rule above and its own 1px rule below. It does read as a distinct band, and
the two rules are visible in the screenshot. But the separation is **a hairline, not a ground
change**. If it needs to be unambiguous, the row taking `color/background/default` `#E8E5DF` would do
it with an existing token and no invention. Not done, because it would depart from the header's
treatment and the instruction was to change position only. Raised for your call.

**Two things the screenshot showed that assertions did not.**

1. **Print reads visibly heavier than Collect Payment beside it.** Print is Medium (16px) and Collect
   Payment is Small (14px) because production sets `size="small"` on one and nothing on the other.
   This is production's own inconsistency, reproduced faithfully rather than corrected. It is the
   single most visible oddity in the row and it is not a build error.
2. **AI Note Assist renders as a white pill with a sage border, not a teal fill.** Correct.
   `ButtonOverrides.ts:40-44` gives `containedPrimary` a `common.white` background with a
   `1px core.main` border. See §7.

---

## 6. The icon gap

**Print and AI Note Assist ship without their production icons.** This is a library defect, not a
design decision.

The library file holds **76 icon masters** on `Icons & illustrations`. **Five are published and
importable** into a consuming file: `DownCaret`, `PlusOutlined`, `CloseOutlined`, `TrashOutlined`,
`LinearEllipsis` — the Button set's own preferred swap values. Every other master, including the
entire code-source batch imported 2026-08-19 at node ids `575:x`, fails
`importComponentByKeyAsync` with *"Component with key … not found"*.

| Needed | Production uses | Library has it? | Built with |
|---|---|---|---|
| New Note leading | `PlusOutlinedIcon` | **published** `76:8` | `PlusOutlined` |
| New Note caret | `DownCaretIcon` | **published** `76:5` | `DownCaret` |
| More caret | `DownCaretIcon` | **published** `76:5` | `DownCaret` |
| Print leading | `PrintOutlinedIcon` | exists `575:26`, **unpublished** | **nothing** |
| AI Note Assist leading | `Book4SparkSharp` (`@mui-symbols-material/w400`) | **no equivalent at all** | **nothing** |

Nothing absurd was substituted. Of the five published icons none is a printer and none is a
spark, book or AI mark, so substituting would have meant putting a trash can or a close cross on
Print. Label-only is the honest build; the gap is recorded here and in the component description.

**Flagged for the kit stream:** 71 of 76 icon masters are unreachable from any consuming file. That
is either an un-run publish or a deliberate hold, and this build cannot tell which.

---

## 7. Correction to Phase 0

**I recorded a code-versus-capture disagreement that does not exist, and it was my error.**

Phase 0 §C4 said `AiNoteButton.tsx:57`'s `variant="contained"` should render teal while the capture
showed a white bordered pill, and logged that as an unresolved disagreement with the older capture.

`ButtonOverrides.ts:40-44`:

```ts
containedPrimary: ({ theme }) => ({
  color: theme.palette.core.contrastText,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.core.main}`,
  ...
})
```

**In this theme, contained primary *is* the white pill.** Code, capture and the built Figma Button all
agree. Caught when the row rendered. The Phase 0 record has been corrected in place rather than left
standing.

---

## 8. Bindings

| Property | Bound to |
|---|---|
| Row ground | `color/background/paper` |
| Row bottom rule | `color/divider` |
| Button colours | inherited from the `Button` and `Button group / Segment` sets |

**Zero hardcoded paints in the row.** Both variable ids were taken from the patient header band's own
bindings rather than looked up by name, so the two bands are provably on the same tokens.

Padding and gap are **raw integers, deliberately**. The header leaves its own 10/16 unbound —
`boundVariables` on `12:755` contains only `fills` and `strokes` — and matching it was judged better
than binding here and diverging. `space/10` does not exist in `Tebra/Dimension` in any case; the
collection has `space/9` and `space/11` but no `space/10`, which is worth a look on its own.

Gap 16 between actions is `HeaderRightLinks.tsx:109`'s `spacing={{ md: 0.25, lg: 2 }}` at `lg`
(2 × 8 = 16). At `md` production tightens to 2px; not modelled, single breakpoint built.

---

## 9. Recorded, not resolved

Carried forward from the prompt, unchanged:

- **Whether the row persists on every destination as chrome, or appears only where it earns its
  height.** Unresolved by decision. Built once, on the Facesheet control only.
- **Whether Notes should carry New Note and AI Note Assist as page actions.** Notes already puts
  create-treatment-plan and create-psychotherapy-note flat on the page. If those two are page actions
  this row loses its first two controls and its composition changes.
- **Page actions** (`+ Problem`, `+ Vitals`, `Create Order`, `Add Member`, `+ Upload`) belong with
  each destination's page heading. Not built here.
- **What is inside the legacy `Exchange` menu.** It is confirmed *a menu* — it carries a split caret
  in `patient_history_rich01.png` — but a closed-menu capture cannot show its contents.

New, from this build:

- **Note type selection lives in the action row.** `CreateNoteButton.tsx:56` fetches
  `getPracticeNoteTypes(patientId)` and renders one menu item per practice-configured note type. The
  split is not an action menu, it is a type picker sitting in patient chrome.
- **There is a third composition nobody has designed for.** `CLINICAL_NDE_FEATURE_FLAG` replaces both
  New Note and AI Note Assist with `CreateSelector`, a mega-menu carrying New Documentation
  Experience (BETA), Classic Documentation, Classic Documentation + AI Transcription and Treatment
  Plans. Built here is the flag-off composition.
- **The header carries 11 or 12 actions depending on `dark-feature.facesheet-hie-modal` and whether
  the viewer is a provider.** Neither number is *the* count.
- **`ChartAccess` renders twice on one screen** — `PatientOverview.tsx:225` and
  `ClinicalPageNav.tsx:93`.
- **Band separation is a hairline** (§5). Raised, not resolved.
- **71 of 76 library icons are unpublished** (§6). Raised for the kit stream.
- **`space/10` does not exist** while `space/9` and `space/11` do (§8).

---

*Build pass. Composition is production's, unchanged. Only position changed. No product code touched,
nothing exported, library not republished.*
