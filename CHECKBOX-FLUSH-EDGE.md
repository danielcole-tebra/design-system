# Checkbox — edge alignment

2026-08-22. **The library change is made and verified at master level. It is not published.** There is
no Plugin API for publishing a library; that step is manual and is the one thing in this brief I could
not do. The Problems page is untouched, per the sequencing rule.

Library `YX2n4YLrEpBXNbcc73T6dw`, component set `Checkbox` (`136:47`), Inputs page.

---

## The source enumeration, first

The instruction was to determine what the real product does before building. It does nothing.

`packages/design-system/src/overrides/CheckboxOverrides.tsx` is 27 lines. It sets three glyph
`defaultProps` and a `colorPrimary` block handling disabled colour. **It contains no padding, no
margin, no box-model rule of any kind.** A repo-wide grep for `MuiCheckbox` / `MuiFormControlLabel` /
`MuiFormGroup` theme overrides returns 12 hits, none of which is a shared inset rule — the two that
touch `.MuiCheckbox-root` padding are `patient-intake-ui`'s PDF-print compaction, not edge alignment.

So the brief's "adopt the product's solution" branch is closed. There is no solution to adopt. What
there is instead is a count.

### Census: every `<Checkbox>` element in `web-app-v2`

Parsed by JSX-tag extraction with brace balancing, not line grep, so multi-line `sx` blocks are read
whole. Matches `<Checkbox`, `<StyledCheckbox`, and any other `*Checkbox` tag.

**173 elements across 105 files.** 138 leave the 9px inset alone. 35 touch the box model:

| Class | Sites | Treatment | Resulting click target |
|---|---:|---|---|
| **A** | **12** | `p: 0` / `padding: 0` — all four sides | **24 × 24** |
| **B** | **3** | `padding: "1px 6px 0px 0px"` — left zeroed, asymmetric | **30 × 25** |
| **C** | **1** | `px: 0` — both horizontal sides | **24 × 42** |
| **D** | **2** | negative left margin, padding untouched | 42 × 42 |
| E–H | 17 | vertical compaction (5), label gap via `mr` (11), indent via `pl` (1) | not edge alignment |

**18 of 173 call sites hand-author a flush edge.** That is the finding.

Four mutually incompatible techniques, no shared abstraction, and **16 of the 18 destroy the click
target to get there** — the exact trade the brief forbids. The 2 that preserve the target
(`filterDefinitions.tsx:261` at `ml: -1`, `ResponsibilityRangeFilter.tsx:74` at `marginLeft: -2`)
resolve to −8px and −16px. Neither is −9px. Both are eyeballed, and both are wrong.

### The 18

**A — all four sides zeroed (target → 24 × 24)**

```
admin-ui/…/EditRoutingDrawer/RoutingAssigneesSelect.tsx:402, :456
admin-ui/…/GroupMembersSelect/GroupMembersSelect.tsx:95
admin-ui/…/TableHeaderCellsDropdown/TableHeaderCellsDropdown.tsx:31
customer-upgrade-ui/…/CustomerUpgradeProviderDrawer.tsx:143, :217
inbox-ui/…/cc-staff-option-row/CcStaffOptionRow.tsx:30
patient-intake-admin-ui/…/ReviewIntake/CompareCell.tsx:23
patient-intake-admin-ui/…/ReviewIntake/overrides/EmergencyContact.tsx:56
patient-intake-admin-ui/…/ReviewIntake/overrides/PharmacyList.tsx:34
patient-intake-admin-ui/…/SendFormsDialog/CheckboxInlineEdit.tsx:39
patient-intake-ui/…/SelectPharmacy/PharmacySearch.tsx:183
```

`CompareCell.tsx` is the clearest statement of the problem in the whole codebase:

```tsx
<Box sx={{ width: "24px" }}>
  <Checkbox size="small" disableRipple sx={{ padding: 0 }} … />
</Box>
```

A 24px slot was built so the box would land on the column spine, and the target was cut to 24px to
fit it. `disableRipple` on the same element is the author acknowledging what they gave up.

**B — asymmetric, left zeroed (target → 30 × 25)**

```
appointment-workflow-ui/src/components/CheckboxGroup.tsx:138, :195   padding: "1px 6px 0px 0px"
appointment-workflow-ui/src/components/TaskPanel.tsx:89              padding: "2px 6px 0px 0px"
```

These three are the closest thing to a correct instinct in the source — zero the aligned side, keep
the other. They pair it with `marginLeft: "unset"` on the `FormControlLabel`, cancelling MUI's global
`-11px`. They still shrink the target, because they take the reclaimed 9px away instead of moving it.

**C — both horizontal sides zeroed (target → 24 × 42)**

```
scheduling-settings-ui/…/AppointmentManagement/PolicySection.tsx:138   px: 0, mt: "-0.6rem"
```

Aligning to a `gridTemplateColumns: "auto 1fr"` spine, with a fractional negative top margin on top.

**D — negative left margin (target intact, offset wrong)**

```
worklist-ui/…/PatientCollections/filterDefinitions.tsx:261                    ml: -1   → −8px
worklist-ui/…/PatientCollections/components/filters/ResponsibilityRangeFilter.tsx:74   marginLeft: -2  → −16px
```

### On MUI's own answer

The brief expected MUI's answer to be a negative margin on `FormControlLabel` or `padding: 0` on the
Checkbox. Both appear, and both are visible above as classes D and A. Worth recording that MUI ships
the first one globally — `FormControlLabel` carries `marginLeft: -11px` by default in v5 — which for a
9px-inset Checkbox **overshoots by 2px**, putting the box 2px outside its container rather than on it.
That is why class B explicitly writes `marginLeft: "unset"`. The framework default is not the spine
either.

I could not read this from `node_modules` — dependencies are not installed in this checkout — so it is
recorded from the published v5 styles rather than measured here. `@mui/material` resolves to 5.13.3 /
5.13.5 / 5.14.11 / 5.15.12 / 5.17.1 across the workspace.

### Storybook membership

`stories/Checkbox/Checkbox.config.ts` enumerates Unchecked / Checked / Indeterminate × normal /
disabled. **No edge-alignment prop is declared anywhere in the component's public API.** The flush
edge is entirely consumer-authored, in every one of the 18 places it happens.

---

## Which shape, and why

**A variant axis: `Flush` = `None` | `Left`.** Set now reads 3 × 4 × 2 = **24 variants**.

Three reasons, in order of force.

**1. Figma leaves no choice between "boolean" and "variant axis".** A BOOLEAN component property in
Figma drives child visibility and nested-instance swaps. It cannot drive a padding value. Padding
differences are expressible only as a variant axis. The brief offered boolean / enum / variant axis as
three options; in this medium the first two collapse into the third. This is a constraint of the tool,
not a design preference, and it is worth stating plainly rather than dressing a forced move as a
judgement.

**2. The evidence names one edge.** All 18 flush-edge sites involve the left edge. Zero sites need a
right edge alone. The 5 vertical-zeroing sites are row-height compaction, not edge alignment — they
sit inside `DrugInfo`, `StripePaymentForm`, `BusinessInfoStep`, none of which is aligning to anything.
So `Left` is the only value that has earned a place. Naming the axis `Flush` with an *edge* as its
value, rather than `True`/`False`, means `Right` / `Top` / `Bottom` can be added later without
breaking the API, if evidence for them ever appears.

**3. `Both` is deliberately excluded.** Class C wants it, and it cannot be had. Zeroing both horizontal
insets leaves a 24px-wide frame — the target destroyed, which is the entire thing this axis exists to
prevent. `PolicySection.tsx:138` is therefore the one call site of the 18 this change cannot fully
serve. Recording that rather than pretending otherwise.

### The mechanism

`Flush=Left` keeps the root at 42 × 42 and redistributes the inset:

```
Flush=None    padding  9 / 9 / 9 / 9      box at x = 9      target 42
Flush=Left    padding  9 / 18 / 9 / 0     box at x = 0      target 42
```

The left inset moves to the right rather than being deleted. `18 = 42 − 24` — derived, not authored:
the MUI SwitchBase target minus the medium SvgIcon. Top and bottom stay at 9. This is why the target
survives where all 16 target-destroying call sites lost it: they subtracted, this relocates.

Two variables added to `Tebra/Dimension`, matching the existing `space/N` convention exactly
(scopes `WIDTH_HEIGHT, GAP`; code syntax `var(--tebra-space-N)`):

| Variable | ID | Value |
|---|---|---:|
| `space/0` | `VariableID:681:2` | 0 |
| `space/18` | `VariableID:681:3` | 18 |

Both carry descriptions recording that they exist for this axis and that 18 is derived.

### The consequence, recorded not resolved

Two things follow from redistribution rather than negative margin, and neither is hidden:

**The gap to the right grows by 9px.** With `Flush=Left`, anything placed after the checkbox sits 18px
from the visible box instead of 9px. A consumer matching optical label spacing subtracts 9 from their
container gap. This is written into the component-set description so it is not rediscovered.

**On Hover and Focus visible, the ring is no longer concentric with the box.** The ripple circle and
the 3px focus outline belong to the 42px root, which does not move; the box moves left within it. This
is visible in the component-set screenshot. It is *not* a Figma artifact — CSS `padding: 9px 18px 9px
0` on a 42px `ButtonBase` with `border-radius: 50%` renders exactly this. The alternative (MUI's
`margin-left: -9px`, ring concentric, whole control overhanging the container by 9px) is not
expressible in Figma at all, since there is no negative padding. The two behaviours are genuinely
different and the source has no precedent for either, so this is logged as a contradiction rather than
decided here.

---

## Verification

### Master level, all 24 variants

Read from the masters, not from instances — instances render resolved bindings and look right while a
master carries raw paint.

```
variantCount      24
paintsTotal       52     paintsBound 52     paintsUnbound 0
distinctWidths    [42]   distinctHeights [42]
nonePads          ["9/9/9/9"]     noneBoxLeft  [9]
flushPads         ["9/18/9/0"]    flushBoxLeft [0]
nonePadVars       74:79 | 74:79 | 74:79 | 74:79
flushPadVars      74:79 | 681:3  | 74:79 | 681:2
glyphSizes        ["24x24"]
strokeWeights     [0, 3]          radii [21]
```

Every paint on every descendant of all 24 variants was walked, not sampled — 52 SOLID paints across
fills and strokes, every one variable-bound, zero raw. The hover fill (`VariableID:196:2`) survives on
all six Hover variants; the focus stroke (`VariableID:74:3`, 3px) on all six Focus visible variants;
the disabled glyph fills on all six Disabled variants. Bindings were carried by clone, so they were
lifted off the existing masters rather than looked up by name.

Screenshot: `checkbox-set-24.png` — 4 states × 3 checked, twice, `Flush=None` block above,
`Flush=Left` block below, the lower block's boxes visibly 9px to the left.

### Test 1 — shared left edge

`Checkbox — Flush verification` (`684:168`), Inputs page. Two auto-layout rows, both zero-padding,
both starting at the same x. A 1px magenta guide sits on the shared edge.

| Row | Row abs x | Instance abs x | Visible box abs x | Overrides |
|---|---:|---:|---:|---:|
| `Flush=None` | 1884 | 1884 | **1893** (edge + 9) | **0** |
| `Flush=Left` | 1884 | 1884 | **1884** (on the edge) | **0** |

`overrides: 0` on both is the constraint test the brief set: a consumer placing a flush checkbox gets
a flush box with **no override and no absolute positioning**. Nothing inside either instance was
touched. Screenshot: `test1-shared-edge.png`.

### Test 2 — click target on the flush variant

`Checkbox — Flush target measurement` (`685:175`). Measured, not assumed:

```
instance          42 × 42
visible box       24 × 24
box offset from target left edge     0
```

**42px, intact.** Screenshot `test2-target.png` shows the 42 × 42 target dashed in magenta with the
24 × 24 box outlined in blue sitting on its left edge, 9 above, 9 below, 18 of target to the right.

### Existing instances — before and after

Full census both times, every instance re-measured on width, height, absolute x/y, relative x/y, all
four paddings, and glyph offset.

| File | Instances | Changed |
|---|---:|---:|
| `YX2n4YLrEpBXNbcc73T6dw` (library) | 20 | **0** |
| `zKT34LQogNjz3Z07fY4VQB` (proposals) | 26 | **0** |

Library: 2 on Inputs, 18 on DataGrid exemplars. All 20 matched byte-for-byte and all now report
`Flush=None`. The three instances created by the verification harness are excluded by ID, not by
count.

Proposals: all 26 on the Problems page. Measured `glyphAbsX` reproduces the brief's numbers exactly —
page-level filters at **313**, table checkbox column at **329**.

**The proposals-file result is a pre-publish reading and must be re-run after publishing.** That file
still holds the 12-variant snapshot (`remoteSetVariantCount: 12`, no `Flush` property), so it cannot
yet have moved. What can be shown now is that the link will survive: the component key for
`Checked=Unchecked, State=Default` is `243efa248e3f876e935d48c3d9c9736add2f9ef2` in the library after
the rename and `243efa248e3f876e935d48c3d9c9736add2f9ef2` as recorded by the proposals file before it.
**Keys are preserved through the rename**, so the 26 instances re-link to the same variants and gain
`Flush=None` rather than breaking or swapping.

### Publish

`set.getPublishStatusAsync()` → `CHANGED`. The Plugin API exposes publish *status* and nothing else —
there is no publish method — so this must be done from the Figma UI. Pending: 12 renamed variants,
12 new variants, 2 new variables.

---

## Fourth occurrence

This is the fourth time in this workstream that the same pattern has produced the same cost.

| # | Component | Value it could not express | What consumers did instead |
|---|---|---|---|
| 1 | `Button group / Segment` | grouped minimum width (40 vs 64) | inherited 64 and lived with it |
| 2 | `List / Item` | canonical height | hand-authored per page |
| 3 | `List / Item` | selected state | hand-authored per page |
| 4 | **`Checkbox`** | **flush container edge** | **18 call sites, four techniques, 16 with the target destroyed** |

The shape is identical each time: a component cannot express a value it plainly needs, the need does
not go away, and every consumer solves it privately and differently. What distinguishes this fourth
one is that the private solutions are not merely inconsistent — they are **actively harmful**. Sixteen
of eighteen traded a 42px touch target for a straight line, which is the trade this brief opens by
forbidding. Nobody decided that; it is what you get when the only available tool is subtraction.

The count is also the argument for where the fix belongs. Had this been a component property from the
start, the 18 sites would be 18 uses of one prop, `CompareCell`'s 24px slot would not exist, and
`disableRipple` would not be sitting next to it as an apology.

---

## Not done, deliberately

The Problems page is unchanged. Its overrides — the filters' 16px offset against the table cell's, and
the `relX: 16` on every table checkbox cell — come off as a separate, deliberate step once the library
is published, not as a side effect of this one.

Worth flagging for that step: the library's own **DataGrid exemplars** carry the same workaround, at
`relX: 4` on 18 checkbox cells. They are evidence of the same gap and should be reviewed at the same
time.
