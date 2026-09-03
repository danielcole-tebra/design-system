# Split drop button — code and Storybook discovery

Discovery pass, 2026-08-20. **Nothing built. No Figma node created or mutated.**

Answers D.a–D.d and, incidentally, **corrects P1.a's account of the 64px floor**.

---

## Verdict

**Does not exist as a design-system component. Composed inline at each call site.**

One named `SplitButton` exists, but it is local to a single micro-frontend, is not exported by
`@kareo-engineering/design-system`, has no story, and has exactly one consumer. Seven other sites
each rebuild the control from scratch.

**Building it in the rebuild library would be a proposal, not a derivation.** It belongs in
`zKT34LQogNjz3Z07fY4VQB`, framed as a proposal. **The argument for it is eight sites, seven
implementations, four different caret glyphs and three different minimum widths.**

---

## D.a — code

### New Note's own call site is an assembly, not an import

`clinical-system/src/components/ClinicalPageHeader/HeaderRightLinks/CreateNoteButton.tsx:96-117`

```tsx
<ButtonGroup>                                    // from @mui/material, line 8
  <Button size="small" startIcon={<PlusOutlinedIcon />} …>New Note</Button>
  <Button size="small" aria-haspopup="menu" onClick={handleToggle} ref={anchorRef}>
    <DownCaretIcon fontSize="xsmall" />
  </Button>
</ButtonGroup>
<Popper …><MenuList id="note-type-list">{noteTypes.map(…)}</MenuList></Popper>
```

Its imports are `ButtonGroup`, `Button`, `Popper`, `MenuList`, `MenuItem`, `Paper`, `Grow`,
`ClickAwayListener` — **all from `@mui/material`**. There is no wrapper import. **Assembly.**

### Searched independently, on structure

**28 `<ButtonGroup>` render sites** in non-test source. Classified by whether a caret icon sits inside
the group and menu machinery exists in the file:

**Eight split controls:**

| # | Site | Caret glyph | Menu | Shares an implementation? |
|---:|---|---|---|---|
| 1 | `appointment-workflow-ui/src/components/SplitButton.tsx:69` | `DownCaretIcon` (Tebra) | `Popper` + `MenuList` | **is** the shared one |
| 2 | `clinical-system/.../HeaderRightLinks/CreateNoteButton.tsx:96` | `DownCaretIcon` (Tebra) | `Popper` + `MenuList` | No — rebuilt |
| 3 | `clinical-system/.../CreateNoteButton/CreateSelector.tsx:334` | `DownCaretIcon` (Tebra) | `Popover` | No — rebuilt |
| 4 | `admin-ui/.../IntakeFormListHeader.tsx:90` | `DownCaretIcon` (Tebra), forced to 16×16 | `Popper` + `Paper` | No — rebuilt |
| 5 | `composition-ui/.../CompositionFooter.tsx:353` | `KeyboardArrowDownRoundedIcon` (**MUI**) | `Popper` | No — rebuilt |
| 6 | `documents-ui/src/components/EditDialogActions.tsx:161` | `ArrowDropDown` (**MUI**) | `Menu` | No — rebuilt |
| 7 | `messages-ui/.../Preview/Header/PreviewHeader.tsx:109` | `ArrowDropDown` (**MUI**), as `startIcon` on an empty Button | `Popper` + `MenuList` | No — rebuilt |
| 8 | `patient-intake-admin-ui/.../NotSubmittedSection.tsx:167` | `ArrowDropDownIcon` (**MUI**) | `Popper` + `MenuList` | No — rebuilt |

The other twenty `ButtonGroup` sites are **segmented controls** — view switchers, type selectors,
zoom controls, editor ribbons, quick presets. No caret, no menu. Not split buttons.

### The one named component

`packages/appointment-workflow-ui/src/components/SplitButton.tsx`

```ts
type SplitButtonProps = ButtonGroupProps & {
  disable?: boolean;
  label: React.ReactElement;
  onClick: (event: Event) => void;
  onOptionSelected: (o: any, i: number, e: Event) => void;
  options: NoteTypeObj[];
};
```

- **Not in `@kareo-engineering/design-system`.** It lives in one micro-frontend's `src/components/`.
- **Consumed once**: `ClinicalNodeSplitButtonV2.tsx:49` → `AppointmentCardV2.tsx:306`. One chain, one
  screen.
- Its `options` type is `NoteTypeObj[]` and its aria-label is `"clinical note split button"` — it is
  **not a generic split button**; it is a note-type picker that happens to be factored out.

### The finding

**Eight sites, seven implementations.** `CreateNoteButton` and `SplitButton` do materially the same
job — ButtonGroup, main action, caret button, `Popper`, `MenuList` of **note types** — in two
packages, with no shared code. `CreateSelector` is a third note-creation split in the same package as
the second.

**Three independent note-creation split buttons exist in `clinical-system` and
`appointment-workflow-ui` alone.**

They disagree on the caret: **four glyphs across eight sites** — Tebra's `DownCaretIcon` at four,
MUI's `ArrowDropDown` at three, MUI's `KeyboardArrowDownRounded` at one.

---

## D.b — Storybook

**No split button is published. It is not a declared member of the design system.**

- Story files exist in **two** packages only: `design-system` (68) and `billing-system` (2).
  `appointment-workflow-ui` has **none**, so `SplitButton.tsx` has no story and cannot have one
  without a Storybook in that package.
- The hosted index (141 entries) contains **no split-button story**. The only `drop` matches are
  `Components/Data Display/Chip → Dropdown Filter`, `→ Drop Chip Pattern`, and `Patterns/Drop Chip` —
  all Chip, unrelated.
- Every published button story: `Button`, `Button Variations`, `ButtonGroup`, `ButtonGroup
  Variations`, `IconButton` ×3, `ToggleButton` ×3.

**`ButtonGroup` is published, but it does not show a split.** Read live from the running story
(`components-inputs-button-buttongroup--button-group-variations`):

```
groupCount: 12   iconsInsideAnyGroup: 0   anyMenuOrPopper: 0
buttonLabels: ["Default 1","Default 2","Secondary 1","Secondary 2"]
```

Twelve groups, **zero icons inside any of them**, zero poppers. The story declares the segmented
control and nothing else.

No auth blocked anything; every story queried was reachable.

**Worth noting for wherever this lands:** Storybook already has a `Patterns/` namespace
(`Patterns/Drop Chip`). There is precedent for declaring a composite as a pattern rather than a
component.

---

## D.c — the ButtonGroup floor, and a correction

### P1.a was wrong. The floor inside a ButtonGroup is 40, not 64.

P1.a recorded that the caret segment's 64 comes from MUI's `min-width: 64px` via
`size/button/minWidth`, and that production's caret button gets the same floor in the browser.
**The second half of that is false.**

Measured live in Storybook:

| Context | Computed `min-width` | Evidence |
|---|---:|---|
| Standalone `<Button>` | **64px** | 38 buttons on `Button Variations`, all 64 |
| `<Button>` inside `<ButtonGroup>` | **40px** | 12 groups on `ButtonGroup Variations`, all 40 |

The rule, read from the theme-resolved stylesheet:

```css
.css-5fxo6a .MuiButtonGroup-grouped { min-width: 40px; box-shadow: none; }
```

**MUI's `ButtonGroup` root style overrides its children's 64 with 40.** Tebra does not participate:
`ButtonOverrides.ts` and `ButtonGroupOverrides.ts` contain **no `minWidth` at all** — grepped, zero
matches in either file.

### Consequences

1. **Production's New Note caret button has a 40px floor, not 64.** It is inside a `ButtonGroup`.
2. **The Figma `Button group / Segment` master carries `minWidth: 64` — wrong by 24px.** That is the
   real geometry defect, and it propagates: the action row's `New Note / caret` measures **64** where
   production would compute **40**. Recorded, not fixed; `Button group / Segment` is a published
   library component and this is not that component's build pass.

### Call sites do override the floor — three of eight, at three different values

| Site | Override | Resolves to |
|---|---|---|
| `admin-ui/.../IntakeFormListHeader.tsx:107` | `minWidth: "30px !important"` on the caret button | **30** |
| `composition-ui/.../CompositionFooter.tsx:50` (`SIGN_MENU_BUTTON_SX`) | `minWidth: theme.spacing(4.5)` | **36** |
| `composition-ui/.../CompositionFooter.tsx:45` (`MAIN_SIGN_BUTTON_SX`) | `minWidth: 0` | **0** |

The other five keep MUI's 40.

**So the 40 is a default, not a constraint.** Three sites already treat it as adjustable, and no two
of them chose the same value. A rebuilt component should expose the caret width rather than hard-code
any of 30, 36, 40 or 64.

---

## D.d — is a split ever full-width?

**No. Not at any size, anywhere in the product.**

`fullWidth` appears on exactly **one** `ButtonGroup` in the entire monorepo:

```
packages/appointment-workflow-ui/src/components/CalendarEventDrawer/EventTypeSelector.tsx:47
  <ButtonGroup color="primary" size="small" fullWidth>
```

That group has **no caret and no menu** — it is a segmented event-type selector, one of the twenty
non-split sites. **Zero of the eight split controls are full-width.**

### What that means for the legacy set's distribution

The legacy `Drop Button`'s 32/16/16 — `Full Width=Yes` only at Large — cannot be shown to be
mis-authoring by this evidence. **The product never renders a full-width split at any size**, so a
distribution that offers fill at one size and not the others is not contradicted by usage. It is not
confirmed either; the legacy set may simply have been built out unevenly.

**Recorded as undetermined.** What *is* determined: fill-capability at every size would be building
for a case the product does not have.

The separate observation that at Medium the legacy caret is `HUG` rather than `FIXED` is an internal
inconsistency in that set regardless of usage, and stands as recorded in `SPLIT-DROP-BUTTON-P1A.md`.

---

## Contradictions recorded, not resolved

| # | A | B | Status |
|---|---|---|---|
| 1 | `SPLIT-DROP-BUTTON-P1A.md`: the caret's 64 is MUI's floor, and production's caret gets the same floor | Measured: grouped buttons floor at **40**; only standalone buttons floor at 64 | **P1.a is wrong.** Corrected here. The Figma `Button group / Segment` master's `minWidth: 64` is wrong by 24px |
| 2 | `SplitButton.tsx` is a named, reusable component | It is package-local, unexported from the design system, unstoried, and typed to `NoteTypeObj[]` | Both true. Whether it counts as "a component the product has" is the membership question |
| 3 | Four caret glyphs across eight sites — `DownCaretIcon` ×4, `ArrowDropDown` ×3, `KeyboardArrowDownRounded` ×1 | — | Open. No convention exists to violate |
| 4 | Three sites override the button floor at 0, 30 and 36 | Five keep 40 | Open. The floor is treated as adjustable by a third of sites |

---

## Where this lands

Against the prompt's three outcomes:

- ~~Component exists in code and is published in Storybook~~ — no.
- ~~Exists in code, not published~~ — partially: `SplitButton.tsx` exists and is unpublished. But it
  is one micro-frontend's private helper with one consumer and a note-type-specific interface, not a
  design-system component withheld from Storybook.
- **Does not exist, composed inline at each call site** — **this one.** Seven of eight sites assemble
  it from `ButtonGroup` + two `Button`s + a `Popper`/`Menu`, importing nothing shared.

**Building it in the rebuild library is a proposal, not a rebuild.** It belongs in
`zKT34LQogNjz3Z07fY4VQB` framed as such.

No recommendation offered, per instruction.
