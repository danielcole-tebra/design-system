# Split button — Part 2 build

2026-08-20. Built in the library file `YX2n4YLrEpBXNbcc73T6dw`, page **Actions**, component set
**`627:161`**. Verified in the library. The row swap and control-screen screenshot are **deliberately
not attempted** — both are blocked on the publish and will be done in one batch afterward.

Part 1 is `SEGMENT-MINWIDTH-FIX.md`. Discovery is `SPLIT-BUTTON-DISCOVERY.md`.

---

## 1. Admitted by a different door

**This component has no Storybook story, and that is recorded on the component itself.**

Storybook membership is normally what admits a component to this library. By that test this one does
not qualify. It was admitted on **production evidence**: `web-app-v2` renders the control at **eight
call sites across seven implementations**. The control is not new — what was missing is that nobody
built it once instead of eight times. The library documents behaviour the product already has; it is
not proposing behaviour the product lacks.

That reasoning lives in the component's `description` so an auditor reading the library later can see
this one came in on usage rather than declaration.

---

## 2. Source enumerated before building

`clinical-system/.../HeaderRightLinks/CreateNoteButton.tsx:96-117`

```tsx
<ButtonGroup>                                        // no props at all
  <Button size="small" startIcon={<PlusOutlinedIcon />}
          style={{ width: "max-content" }}>New Note</Button>
  <Button size="small" aria-haspopup="menu" ref={anchorRef}>
    <DownCaretIcon fontSize="xsmall" />               // a CHILD, not startIcon/endIcon
  </Button>
</ButtonGroup>
```

| Question | Answer, from source |
|---|---|
| **Which props reach the two Buttons** | `size="small"` on both. Label button: `startIcon`, `onClick`, `style={{width:"max-content"}}`, `data-testid`. Caret button: `aria-controls`, `aria-expanded`, `aria-haspopup="menu"`, `onClick`, `ref`, `data-testid`. **Neither receives `variant` or `color`** |
| **Padding** | From the theme's Button sizes — Small `5/11`, Medium `7/17`. Not authored at the call site |
| **Divider treatment** | The non-last segment's **right border**, `primary.main` teal, from `ButtonGroupOverrides.groupedContainedSecondary`. Disabled drops it to `primary[200]` |
| **Corner radii** | Button `borderRadius: 24`; MUI's ButtonGroup removes the inner radii, leaving a pill cap at each outer end. Carried by the Segment set's `Position` axis |
| **Caret glyph size** | `fontSize="xsmall"` → `SvgIconOverrides.fontSizeXsmall = 1rem` = **16px** |

**One thing worth flagging:** `style={{ width: "max-content" }}` on the label button is an inline
style, not `sx`, so it bypasses the theme entirely. It has no Figma counterpart and none was
authored — the label segment hugs, which is what `max-content` means.

---

## 3. What was built

**`Split button`**, **8 variants**, `Size` × `State`.

| | Total | Height | Label half | **Caret half** | Caret content | Caret floor |
|---|---:|---:|---:|---:|---:|---:|
| **Small** · 4 states | **150** | **30** | 110 | **40** | 38 | **40 — engages** |
| **Medium** · 4 states | **181** | **38** | 131 | **50** | 50 | 40 — unreached |

**Corrected 2026-08-20 — see 3b.** At Small the content is 38 and the **floor engages**, giving 40.
At Medium the content is 50 and governs. Both numbers recorded at both sizes.

Set is 948 × 204, 8 variants. **Zero authored fractional dimensions** — every variant, half and height is an
integer.

### The caret number, three passes

| Pass | Caret, Small | Basis |
|---|---:|---|
| Prompt's Part 1 | 40 | assumed the floor governed |
| Part 1 measured / first build | 46 | content 46 — but the content was wrong |
| **Corrected (3b)** | **40** | content 38, **floor engages** |

The first prediction landed on the right number for the wrong reason. The spurious 8px gap was
holding content 6px above the floor, so the floor looked unreachable when it was not.

### Structure

Two `Button group / Segment` instances in a zero-gap row — `Position=First` with the label and a
`PlusOutlined` start icon, `Position=Last` with only a `DownCaret`. **Segments are instanced, not
redrawn.** Both are `isExposedInstance`, so their `Label`, icon booleans and icon swaps surface on
the parent.

---

## 3b. Corrections, 2026-08-20 — both caught by visual review

Neither was caught by a structural assertion. **That is the third time.** Corrected in place; the set
was not rebuilt.

### C1 — the caret sat in too much space, and the cause was a spurious gap

**The `8` in `11 + 0 + 8 + 16 + 11 = 46` was an artifact of how it was modelled, not something in the
source.** The caret was built into the Segment's **End icon** slot beside an empty Label, so the
Segment's `itemSpacing: 8` fell between them.

In `CreateNoteButton.tsx:106-116` the caret is the Button's **only child** — not `startIcon`, not
`endIcon`:

```tsx
<Button size="small" aria-haspopup="menu" ref={anchorRef}>
  <DownCaretIcon fontSize="xsmall" />
</Button>
```

MUI's 8px lives on `.MuiButton-startIcon { margin-right: 8 }` and `.MuiButton-endIcon
{ margin-left: 8 }`. **A lone child gets neither.** Corrected to `itemSpacing: 0`.

**C1.a — the padding, and where it comes from.** The caret button carries **no `sx`, no `style`, no
`padding`, no `minWidth`** at the call site — only `size="small"` and handlers. Grepped, zero
overrides. So the padding falls out of MUI's contained `sizeSmall` `4px 10px` and `sizeMedium`
`6px 16px`, with Tebra's 1px border folded in, giving the Segment's authored **5/11** and **7/17**.
**Recorded as a MUI default with no override**, the same way the floor finding was.

| | Before | After | Governed by |
|---|---:|---:|---|
| Caret content, Small | 46 | **38** | `11 + 16 + 11` |
| **Caret half, Small** | **46** | **40** | **the 40 floor — it now engages** |
| Caret content, Medium | 58 | **50** | `17 + 16 + 17` |
| **Caret half, Medium** | **58** | **50** | content — floor unreached |
| Total, Small | 156 | **150** | |
| Total, Medium | 189 | **181** | |

**Removing the spurious 8 dropped Small's content below the floor, so the floor finally engages.** The
caret half is now **40** — exactly MUI's `.MuiButtonGroup-grouped { min-width: 40px }`, which is what
production renders. Part 1's original prediction of 40 was right, but for the wrong reason: it assumed
the floor governed without knowing a spurious gap was holding content above it.

### C1.b — the old library, read once under authorisation

`ZPf0sJy83aPyrHjCVHomya` node `12459:164859`, cross-check only. **Source remains
`CreateNoteButton.tsx`.**

| Size | Caret half | Children | Authored padding | Implied side padding | Sizing |
|---|---:|---|---|---:|---|
| Large | **42 × 42** | one 16px icon | 10 / 10 / 10 / 10 | **13** | FIXED |
| Medium | 36 × 36 | one 16px icon | 10 / 10 / 10 / 10 | 10 | **HUG** |
| Small | 28 × 28 | one 16px icon | 10 / 10 / 10 / 10 | 6 | FIXED |

**It confirms the structural point and disagrees on the number.**

- **Confirms:** its caret half holds **one child** — a 16px icon, **no label node**. That is the
  independent evidence that our empty-label-plus-gap was wrong.
- **Disagrees:** 42 at Large against our 40 at the nearest comparable. Theirs is a hand-set FIXED
  width; ours is MUI's grouped `min-width`. **Source wins. Recorded, not reconciled.**
- The reported ~14.33 per side was a screen measurement at unknown zoom, as flagged. **The real
  implied value is 13** at Large, and it is not authored — it falls out of a FIXED 42 against a 16px
  icon. The authored padding is 10 at every size.
- Its own **Medium is `HUG` where Large and Small are `FIXED`** — the internal inconsistency already
  recorded in `SPLIT-DROP-BUTTON-P1A.md`, re-confirmed here.

### C2 — states are per half now

**The two halves were changing together. They are separate `<Button>` elements in source and each
takes its own hover.**

Enumerated from `CreateNoteButton.tsx` first: two `<Button>`s inside a `<ButtonGroup>`, **neither
disabled at the call site** (grepped, zero hits), nothing suppressed. Each supports `:hover`,
`:active`, `:focus-visible` and `disabled` natively.

| State | Label half | Caret half |
|---|---|---|
| **Default** | Default | Default |
| **Hover** | **Hover** | Default |
| **Drop hover** | Default | **Hover** |
| **Disabled** | Disabled | Disabled |

**8 variants** — 2 sizes × 4 states.

**Disabled is group-level, confirmed from source not assumed:** `SplitButton.tsx` sets
`disabled={disableButtons}` on the **ButtonGroup**, which MUI propagates to every child.
`CreateNoteButton` never disables at all.

**Not built, with reasons:**

- **Focused / Drop focused** — **no Focus state exists anywhere in this library.** `Button` and
  `Button group / Segment` both carry `Default | Hover | Disabled` only. There is no substrate to
  compose from. The old library has them; adopting them would mean inventing a focus treatment.
- **Selected / Drop selected** — MUI `Button` has no selected state and the source has none. Those
  are the superseded kit's own invention.
- **Active** — `ButtonOverrides` writes `"&:hover, &:active"` as one rule, so active resolves to the
  same colour as hover and is **not separately buildable**. Same situation as `Tab`.

The old library's 64-variant structure was **not adopted wholesale**, per instruction: its Full Width
axis has no product case, and its Medium hug-caret is a defect. **Only the state decomposition was
taken.**

### Verified visually

Screenshot of all eight taken and reviewed. **Hover and Drop hover are mirror images** — Hover
lightens the label half and leaves the caret full coral; Drop hover leaves the label full coral and
lightens the caret. They are unambiguously different, which is the test this correction existed for.
Disabled pales both. The caret is visibly tighter at both sizes.

---

## 4. The axes, and what was deliberately not built

**Sizes: Small and Medium only.** Enumerated from the eight sites:

| Size | Sites | Which |
|---|---:|---|
| `size="small"` | **5** | CreateNoteButton, CreateSelector, IntakeFormListHeader, PreviewHeader, NotSubmittedSection |
| no size → medium | **3** | SplitButton, CompositionFooter, EditDialogActions |
| **Large** | **0** | — |

**Large is not built because nothing renders it.**

**No full-width axis.** `fullWidth` appears on exactly one `ButtonGroup` in the monorepo — a
segmented event-type selector with no caret. Zero of the eight splits are full-width at any size.
A fill axis would be building for a case that does not exist. This is also why the legacy kit's
`Drop Button`, whose `Full Width=Yes` exists only at Large, was not used as a model.

**Colour: Secondary only.** No site renders a contained-**primary** split. The one primary site,
`PreviewHeader`, uses `variant="outlined"` — for which the Segment set has **no substrate at all**.
Building a Primary axis would offer a state no site produces, the same reasoning that excluded fill.

### What produces the coral, since the variant name does not say it

`ButtonGroupOverrides.ts:5-6` sets `defaultProps: { variant: "contained", color: "secondary" }`.
`CreateNoteButton` passes **neither**, so both defaults apply and `containedSecondary` paints
`secondary.main`.

**Do not read the coral off the word "contained".** `ButtonOverrides.ts:40-44` gives
`containedPrimary` a `common.white` background with a `1px core.main` border — contained **primary**
is the white pill in this theme, which is why AI Note Assist renders white. The coral comes
specifically from `color: secondary`.

---

## 5. The variance, recorded on the component

Documentation, not something resolved here:

- **Eight sites, seven implementations.** Three are note creation with no shared code:
  `CreateNoteButton` and `CreateSelector` in `clinical-system`, `SplitButton` in
  `appointment-workflow-ui`.
- **Four caret glyphs:** Tebra `DownCaretIcon` ×4, MUI `ArrowDropDown` ×3, MUI
  `KeyboardArrowDownRounded` ×1. **This component adopts `DownCaretIcon`**; the other three are not
  adopted.
- **Three sites override the 40 floor, no two agreeing:** `minWidth: 0` and `theme.spacing(4.5)` = 36
  in `CompositionFooter`, `30px !important` in `IntakeFormListHeader`. Five keep 40.
- **Storybook has a `Patterns/` namespace precedent** (`Patterns/Drop Chip`). A split button would
  have a home there as a declared pattern, closing the membership gap from the code side rather than
  the library side. **Recorded, not acted on.**

---

## 6. The Segment fix was latent library-wide

Worth stating plainly, because it explains how a wrong value survived.

`Button group / Segment` carried `minWidth: 64` — the **standalone** Button floor applied to a
**grouped** context, wrong by 24px. **Nothing in the library was narrow enough to reveal it.** All 14
Segment instances in the library sit at 76–107, every one content-governed and already above 64. The
wrong floor was inert everywhere it was used, so nothing surfaced it.

**The action row's caret half is the first thing small enough to hit it** — content 46, under the
wrong 64 floor, so it inflated to 64 and sat there looking deliberate.

**And anything built at small sizes would have hit it too.** This component is the second: its Small
caret is 46 and its Medium caret is 58, both under 64. Built against the uncorrected master, both
would have inflated to 64 — the Small control would have measured 174 instead of 156 and the Medium
189 instead of... also 189, since 58 < 64 would have inflated to 64, giving 195. **Two of the six
variants would have been wrong.**

A floor that is never reached is invisible. This one was wrong for as long as the library contained
nothing small, and would have gone on being wrong for every small control built after it.

---

## 7. Verified in the library

- **Screenshot taken, all six variants.** Small and Medium × Default / Hover / Disabled. Coral at
  Default, `secondary.light` at Hover, `secondary[100]` at Disabled, teal seam visible at Default and
  Hover and `primary[200]` at Disabled.
- **6 variants, integer geometry throughout**, set 743 × 204.
- **Every paint inherited from the Segment set**, which is itself fully variable-bound. Nothing was
  painted in this component, so there is nothing here to bind or to leak.

**Observed while building, not fixed:** in `State=Disabled` the `PlusOutlined` and `DownCaret` glyphs
stay at full ink while the label greys to `secondary[100]`. Icon masters expose no colour property,
so recolouring needs an instance override or a detach — the same limitation recorded as **PH-4** on
the patient header. **Inherited from `Segment`, not introduced here.**

---

## 8. Deliberately not done

| | Why |
|---|---|
| Row swap — replacing the action row's hand-authored New Note with an instance | **Blocked on publish.** The proposals file holds the library at its last-published state |
| Control-screen screenshot | Same |
| Publishing `Design System Rebuild` | **Not available in the Plugin API.** Manual step |
| Touching the standalone `Button` master's 64 | Correct for its context. Part 1 scope was explicit |
| Kit re-export | Not requested; kit stays at 150 |

**Both pending items need one publish, then one accept in `zKT34LQogNjz3Z07fY4VQB`.** After that,
in a single batch: the action row's caret goes 64 → 46 and New Note 174 → 156, the hand-authored pair
is replaced by a `Split button` instance, and the row plus control screen are screenshotted. The row
height stays **56 = 36 + 10 + 10** — New Note is 30 tall and stays 30, so nothing reaches the
derivation.
