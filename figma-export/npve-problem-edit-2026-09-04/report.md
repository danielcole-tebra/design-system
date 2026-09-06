# NPVE Edit Problem Sidesheet — 2026-09-04

## Outcome

Built and validated the remaining Problems edit reference from source `zVsuhYehoSLLq880qRBFkq` node `4536:27605` in target `fdCQVFdvOByaOYIJYag0d6`.

The rebuild is a live `Sidesheet` instance inside `_Rebuild comparison/Rebuild/Problems · Edit`; its body, footer action group, reference, rebuild, change log, comparison, and GAP marker all remain attached. The source and shared library stayed read only.

## Source facts

- Root: 550 × 458.
- Header: 64px with 16px inset.
- Body: 318px; 16px vertical and 20px horizontal inset; 16px stack gap.
- Controls: Problem/ICD select, Status select, Acute/Chronic choices, two date fields with Calendar icons, and 104px Comments field.
- Footer: 76px with Mark as error left, Cancel and Save right.

## Components and composition

- `Problem edit body` (`316:3412`), 518 × 288.
  - Five subscribed Text field instances.
  - Two subscribed Chip instances.
  - Two subscribed Icon/Calendar instances.
  - Canonical 16px major stack and 8px compact gaps.
- `Problem edit footer actions` (`320:3849`), 518 × 38.
  - Uses the existing full-width Sidesheet action slot.
  - Contains live Button compositions for Mark as error, Cancel, and Save.
- `Problem edit / Mark as error action` (`318:3643`) is a live `variant=text, color=error` Button wrapper.
- Sidesheet Body content preferred values now include `Problem edit body`; default remains `26:221`.
- Sidesheet Full-width action preferred values now include `Problem edit footer actions`; default remains `248:1827`.
- Rebuild comparison preferred values include the new reference, rebuild, and change-log helpers; all defaults remain unchanged.

## Comparison decisions

- Sheet: source 550 × 458 → established Problems shell 550 × 600.
- Header: 64px → canonical 72px shared header.
- Body inset: 20px horizontal → canonical 16px Sidesheet inset.
- Problem and Status: subscribed small Text fields at 40px.
- Type choices: source 29px pills → subscribed 32px Chips.
- Comments: subscribed medium multiline Text field with a 104px outline. Its fixed library sample rows are blanked as an attached instance override; no field was redrawn.
- Footer: source 76px / 20px inset → shared 71px / 16px footer. The existing full-width slot carries the source's left/right action arrangement.

## GAP and DEFECT findings

- New GAP: `npveProblemEdit_textFieldNoEndAdornment`.
  - Text field has no end-adornment slot, so the Calendar icons cannot live inside the published component API.
  - The rebuild uses explicitly named local GAP wrappers around attached Text field and Icon/Calendar instances.
  - Standard marker: `324:4934`.
  - Library follow-up: `figma-export/library-todos/LIBRARY-TODOS.md` item 15.
- Existing DEFECT encountered, not newly counted: `npveAudit_textFieldHiddenPlaceholderCopy`.
  - Multiline masters ship fixed second- and third-line sample copy.
  - The Edit Problem instance blanks that copy while remaining attached.
- New DEFECT: 0.
- New decision: 0.

## Organization

- Templates section `08 · Problem editing` (`316:3411`) at y=16616, 200px after the preceding section.
- Screens section `08 · Problem editing comparison` (`318:6739`) at y=14232, 200px after the preceding section.
- Both use the established `#E4E4E4` work-area fill.
- Sole comparison placement: `Rebuild comparison — Problems · Edit` (`318:6740`).

## Verification

- File identity: PASS — target pages Cover `0:1`, Templates `3:2`, Screens `27:2`, Archive `126:2`; source `4536:27605` read live.
- Source export: PASS — 1100 × 916 PNG at 2×; reference fill hash `a62362f2274f16a7c8e302871915a5fbf4acc71d`, scaling factor 0.5.
- Instance integrity: PASS — no detached instances on Templates or Screens.
- Body instance paints: PASS — 35 visible paint entries on the master and 35 on the live nested body; normalized signatures are identical.
- Sidesheet link: PASS — live `Placement=Floating` instance, 550 × 600, Body content `316:3412`, Full-width action `320:3849`.
- Comments propagation: PASS — nested live field is 518 × 104, medium multiline, 104px outline, fixed sample layer empty.
- Footer propagation: PASS — Mark as Error, Cancel, and Save render in the source arrangement.
- Defaults: PASS — Sidesheet Body content `26:221`, Full-width action `248:1827`; comparison Reference/Rebuild/Log `114:777` / `114:779` / `114:880`.
- Geometry: PASS — no fractional authored geometry remains in either new section.
- Paints: PASS — no local component surface paint added; only the established unbound `#E4E4E4` section fill and 10% outline exception.
- Existing screens: PASS — all prior Sidesheet values and geometry remained unchanged; only preferred-value lists inherited the two additive options.
- Visual QA: PASS — body, 2× live Sidesheet, and full reference/rebuild/change-log comparison rendered and inspected.

## Screenshots

- `source-problem-edit-4536-27605-2x.png`
- `component-problem-edit-body-316-3412-2x.png`
- `rebuild-problem-edit-318-3655-2x.png`
- `comparison-problem-edit-318-6740.png`

## Recovery and visual-review notes

- First body render exposed inherited green uppercase styling on the Type label and clipping on both floating date labels; both were corrected before shell assembly.
- The one-line Text field instance could be resized to 104px but its internal outline stayed 40px. Visual comparison rejected that state. The final Comments control uses the medium multiline variant's real 104px outline and blanks only its fixed sample-copy layer.
- First shell render showed action swaps resetting labels to `Button` and all three actions aligning right. Footer structure audit found the existing full-width slot; the final screen uses an attached three-action group there without changing the shell.
- Final structural audit caught a half-pixel-centred flexible spacer and default-white section fills. Spacer height was normalized to 2px and both section fills copied from the established `#E4E4E4` precedent.

## Schema summary

- Record: `npveRebuild_problemEdit_2026-09-04`.
- New flags: 1 GAP, 0 DEFECT, 0 DECISION.
- Flags before: 229.
- Flags after: 230.
