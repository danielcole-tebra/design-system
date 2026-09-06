# Library to-dos from the NPVE rebuild

Written 2026-09-03 as the input document for the library work chat. Every item below is an open flag in `design-system-schema.json` from the NPVE batches (2026-09-02 to 2026-09-03) whose fix lives in the Design System Rebuild library `YX2n4YLrEpBXNbcc73T6dw`. Marker node ids are on the Screens page of the NPVE target `fdCQVFdvOByaOYIJYag0d6`. Code paths are under `C:\Code\web-app-v2`; `packages/design-system/src` is shortened to `ds/`. Library variable names and values were read from the library file on 2026-09-03, not from the schema plan.

Standing rules apply to the library work too: additive only, published names locked, code's prop names in lowercase, Figma-only affordances in Sentence case, verify in pixels.

## 1. Search input pattern

**Wrong.** The library Text field (121:350) cannot express a search field: it has no start adornment slot, no placeholder text, a Filled variant with an empty Label leaves a 10px break in the top outline, and the size=small Label slot is 56 tall inside a 40 input.

**Visible symptom.** The placeholder text sits about 8px too low in the small field, visible in the library file itself, not introduced by the rebuild. Measured 2026-09-03: on the library master 130:140 the resting label's box centre is 8px below the input's centre and its glyph centre 8.3px below (label 130:155 in Input 130:141, 40 tall); on the target search field the same label (I40:252;6:80;26:222;130:155) reads +8 by box and +9.9 by glyphs. The cause is the resting-label frame's absolute inset of 16, which is the medium field's value; small needs 8. It is not the 56-tall Label slot, which was measured and ruled out.

**Fix.** Add a documented search input pattern, or the three Text field affordances it needs: a leading adornment slot, placeholder text independent of the label, and a closed outline when there is no label; set the small resting-label inset to 8 on all ten size=small variants; and fix the small Label slot height to 40.

**Evidence.**
- Code: `ds/overrides/TextFieldOverrides.tsx`; `packages/treatment-plan-ui/src/components/wiley/ProblemSearchField.tsx` (InputAdornment + SearchIcon, placeholder, no label); `packages/documents-ui/src/components/DataGridColumnFilter.tsx`.
- Flags: `npveProblemsRecent_textFieldNoStartAdornment` (GAP), `npveSearch_noPlaceholderInTextField` (GAP), `npveSearch_emptyLabelBreaksFilledOutline` (DEFECT), `npveLabelDrift_smallRestingLabelInsetIsMedium` (DEFECT, medium), `npveProblemsBuild_textFieldSmallLabelSlotHeight` (DEFECT), `npveProblemsBuild_searchLabelCopy` (DECISION, consequence of the above).
- Markers and nodes: GAP marker 27:295 on Screens; target check pair 45:277 (Filled, empty label) vs 45:255 (Empty); target 25:564 for the Label slot read; library small masters 130:140 to 130:311 (Label / resting frame at y 16); library glyphs Icon/Search 575:30 and Icon/SearchOutlined (MUI) 312:4 exist. Drift evidence: `figma-export/npve-label-drift-underline-2026-09-03/step1-library-textfield-small-empty-130-140-3x.png` and `step1-target-searchfield-40-252-crop-3x.png`.

## 2. Ringed plus button

**Wrong.** The source add control is a plus inside a 24px grey ring (white fill, 1px #D6D6D6, radius 16); the library Icon button (170:77) has no outlined or ringed variant, so the rebuilt plus is a bare glyph and the affordance is lost.

**Fix.** Decide whether a ringed Icon button variant belongs in the library; MUI IconButton has no outlined variant and `IconButtonOverrides.ts` adds none, so this is either a new Figma-only affordance (Sentence case) or a product-level style that the library should not model.

**Evidence.**
- Code: `ds/overrides/IconButtonOverrides.ts` (root, colorPrimary, colorError, sizeSmall only).
- Flag: `npveProblemsCorrections_iconButtonNoRingedVariant` (DEFECT, medium).
- Markers and nodes: DEFECT marker 33:236 on Screens; source ring 980:15883 and controls 4618:5049 / 5070 / 5091 in NDE-2026; target Problem row 26:208 Trailing action.

## 3. Tabs on a divider

**Wrong.** Library Tabs (201:14) renders no rule under the strip, and neither MUI Tabs nor `TabsOverrides.tsx` draws one; the product adds a 1px divider per screen, so every consumer has to hand-build the strip.

**Fix.** Publish a documented tabs-on-divider pattern (Tabs over a full-width Divider, gap 0) rather than a Tabs variant, with the divider under the indicator, touching: the two teal rows sit directly on the grey row with no overlap and no gap, which is what MUI renders (indicator at bottom: 0 sits above the border row). Decided 2026-09-03; the NPVE rebuild is built this way.

**Evidence.**
- Code: `ds/overrides/TabsOverrides.tsx` (indicatorColor only); `packages/admin-ui/src/components/MessageRouting/MessageRoutingLayout.tsx:58-63` and `packages/payment-subscription-ui/src/pages/SubscriptionManagement/SubscriptionManagementPage.tsx:143-152` (borderBottom on Tabs); `packages/ordering-system/src/components/Monograph/MonographSections/MonographTabs.tsx:45-46` (bordered wrapper).
- Flags: `npveCleanup_tabsNoBottomRule` (DEFECT, medium); `npveTabUnderline_overlapIsDecisionNotCss` resolved 2026-09-03 (matched CSS rendering).
- Markers and nodes: DEFECT marker 52:428 on Screens; the working reference is target 26:221 › Tabs strip 51:307 (VERTICAL, gap 0 bound space/0, 49 tall) › Tab underline 51:308 (Divider, in flow as the last child, FILL width, 1 tall).

## 4. Active tab on Tabs

**Wrong.** Tabs (201:14) exposes no property at the set level, so a consumer cannot switch the selected tab from a parent; the NPVE body carries three Tabs instances and three visibility booleans with no exclusivity.

**Fix.** Add an Active axis (or expose the nested Tab selected property) on Tabs itself.

**Evidence.**
- Flag: `npveFavorites_activeTabNotExpressible` (GAP, medium).
- Nodes: library Tabs 201:14; target 26:221 properties Active All#39:2, Active Recent#39:3, Active Favorites#39:4.

## 5. Tab label type unbound

**Wrong.** Tabs/Tab (201:13) binds the label fill but none of family, size, line height or weight; it renders Akkurat LL Regular 16/20 as literal values.

**Fix.** Bind the label to font/family/base, font/weight/regular, font/size/body1 (16) and font/lineHeight/body2 (20), or whichever pair the code's Tab typography resolves to, and record the pairing.

**Evidence.**
- Code: `ds/overrides/TabOverrides.tsx` (hover background only; type comes from MUI defaults and `ds/typography/typography.ts`).
- Flag: `npveProblemsBuild_tabLabelTypeUnbound` (DEFECT, low).
- Nodes: library variants 201:3, 201:5, 201:7, 201:10; read on target instance 26:244.

## 6. Colour tokens: the star gold and the greens

**Wrong.** Only two source colours have no token: #1D6B45 (selected check, built with `color/success/dark` as nearest) and #323232 (icon strokes). The star gold #F2BA2A already exists as `color/warning/dark` (code `warning.dark`, "neuron"); the Favorites stars were bound to `color/grey/600` by our error and were rebound to `color/warning/dark` on 2026-09-03. The other colours in the original six already have tokens (#417E86 = `color/primary/light`, #9A9A9A = `color/grey/500`, #B51A2C = `color/error/dark`); #C3E7C0 exists only as `color/hardcoded (no palette)/chipSuccessBackground`.

**Fix.** Decide whether #1D6B45 and #323232 are off-palette source values to stay on `color/success/dark` and `color/text/secondary`, or get new tokens. Marker 27:306 and the unresolved-colours flag now name only these two.

**Evidence.**
- Code: `ds/palette/paletteValues.ts:36-46` (warning #FCDE73 / #F2BA2A, success #6FC691 / #3FA266 / #2B865A; no #1D6B45); `ds/overrides/ChipOverrides.ts:20` (#C3E7C0 hardcoded).
- Flags: `npveProblemsRecent_unresolvedColours` (GAP, low), `chipRawHex` (pre-NPVE).
- Markers and nodes: GAP marker 27:306 on Screens; source star 4618:5349 (#F2BA2A) and check 4618:5010 (#1D6B45) in NDE-2026; target Favorites rows on 40:252 (stars bound grey/600).

## 7. Space scale oddities

**Wrong.** Tebra/Dimension holds twenty `space/*` variables: 0, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 23, 24, 40. The odd values were added one at a time to match MUI internal geometry (space/12 is recorded as "MUI root padding 9 + chip margin 3"), 32 is missing so the comparison frames use a literal, and every variable carries a `codeSyntax` of `var(--tebra-space-N)` that exists nowhere in the repo.

**Fix.** Decide a real scale (the code has none of its own; MUI's default is multiples of 8), keep the odd values only as component-size tokens or aliases with a note saying which component needs them, add space/32, and remove or correct the code syntax so it does not claim a CSS variable that is not there.

**Evidence.**
- Code: `ds/theme/theme.ts` (no spacing override); `grep -r "tebra-space-17" packages` returns nothing.
- Flag: `npveComparison_noSpace32Token` (GAP, low).
- Nodes: library Tebra/Dimension collection; target Rebuild comparison 35:332 (literal 32 padding and gap); schema `figmaVariablePlan` entries for space/12 and space/24 carry the "addedDuringBuild" notes.

## 8. Heading and letter-spacing tokens

**Wrong.** Tebra/Typography has sizes and line heights for caption, body2, body1, h1, h2, h3 only; code defines h4 (16/24 bold), h5 (14/20 bold) and subtitle2 (12/16 bold) as well, and there is no letter-spacing variable at all, so the Change log title sits on body1 + bold and the 0.5px letter spacing on chip and slot labels is unbound.

**Fix.** Add font/size and font/lineHeight for h4, h5 and subtitle2 (values from `typography.ts`), and a letter-spacing variable if code defines one for the chip and caption styles.

**Evidence.**
- Code: `ds/typography/typography.ts:31-40` (h4, h5).
- Flags: `npveChangelog_noH4Token` (low), `npveBuild_slotLetterSpacingUnbound` (info).
- Nodes: target Change log title 18:110; Slot 4:13 label 4:14; library Tebra/Typography collection (17 variables).

## 9. Sidesheet: no library component, Drawer cannot host a body

**Wrong.** The library Drawer (749:239) has no content slot, its header is 56 tall with a black title where the source sidesheet header is 64 tall with a #545454 title, there is no footer/action-row component outside Dialog, and Button has no fullWidth axis; the NPVE sidesheet is therefore a local component in the target with a SCAFFOLDING body slot.

**Fix.** Promote a sidesheet to the library with a documented body-slot convention (frames, not an instance, because instances cannot host children), decide whether the header adopts the Drawer header or gets its own, add a footer actions component, and add a `fullWidth` axis to Button (it is a code prop, so lowercase).

**Evidence.**
- Code: `ds/stories/Drawer/Drawer.example.tsx`; `ds/overrides/DialogOverrides.ts`; `ds/overrides/ButtonOverrides.ts` (MUI Button has fullWidth).
- Flags: `npveSidesheet_noBodySlotInLibraryDrawer` (GAP, high), `npveSidesheet_headerDiffersFromDrawerHeader` (DEFECT, medium), `npveSidesheet_noFooterActionsComponent` (GAP, medium), `npveSidesheet_noFullWidthButtonAxis` (GAP, low), `npveBuild_noLibrarySidesheet` (GAP, medium).
- Nodes: library Drawer 749:239 (variants 187:3, 749:212, 749:221, 749:230), Header 749:231, Dialog Actions 186:9, Button 79:2; target Sidesheet 6:65 and Slot 4:13 on Templates.

## 10. No generic pick-from-a-list row

**Wrong.** The library has no row for picking something from a list: a leading icon or control, primary text, inline secondary text, and a trailing action. List/Item (174:17) offers an Icon slot and stacked primary and secondary text only, so every screen that needs the pick row builds its own.

**Fix.** Generalise the NPVE Problem row (target 26:208: leading Icon button, name, inline code, trailing Icon button, 518×48, padding 12/16, gap 16) into the library as that row. Problems, medications and allergies are all consumers of the same shape, so one library row serves all three; this is not a List/Item patch.

**Evidence.**
- Code: `ds/overrides/ListItemOverrides.ts`, `ds/overrides/ListItemButtonOverrides.ts`; `ds/stories/List/List.stories.tsx`.
- Flag: `npveProblemsRecent_listItemNoTrailingSlot` (GAP, medium; text reframed 2026-09-03).
- Nodes: library 174:17 and instance 499:6; target Problem row 26:208, the working reference; consumers on the target's Screens page: Recent 27:6 (outlined star, plus or check trailing) and Favorites 40:252 (gold filled star, plus trailing); source rows 4618:5008 to 4618:5071.

## 11. Button label title case

**Wrong.** The library Button label applies textCase TITLE, so "Save & Add to Note" renders "Save & Add To Note"; code's button typography uses `textTransform: capitalize`, which capitalises every word the same way, so this may match code and differ from the source copy rather than be a library defect.

**Fix.** Verify against Storybook, then either keep Title case and record it as matching code or change the label to no text case.

**Evidence.**
- Code: `ds/typography/typography.ts:65` (`textTransform: "capitalize"`); `ds/overrides/ButtonOverrides.ts` (no textTransform).
- Flag: `npveBuild_buttonLabelTitleCase` (DEFECT, low).
- Nodes: library Button 79:2 Label; target instance 6:179.

## 12. Icon button glyph box is fractional

**Wrong.** The glyph Group 573:3583 inside Icon button (170:77) measures 19.125 tall, which every rule 8 walk of the target reports (5 hits on Templates, 4 on Screens).

**Fix.** Rebuild the glyph frame at an integer box (24 or 20) and re-verify rule 8 on one instance.

**Evidence.**
- Recorded in `npveRebuild_tabUnderlineFix_2026_09_03.step5_diff.rules.8_roundWithRecord` and the cleanup batch's rule 8 line.
- Nodes: library Icon button 170:77 › 573:3583; seen on target rows 26:261, 26:272, 26:282, 26:292.

## 13. Text field masters ship hidden placeholder text

**Wrong.** Every Text field master (set 121:350, 20 occurrences, e.g. 130:149 in size=small Empty and 130:168 in size=small Filled) carries a hidden TEXT layer "Multiline rows" reading "Second line of the comment / Third line of the comment". It rides into every consumer instance as hidden copy, so any search of a consumer file for stray placeholder text hits the library, not the file.

**Fix.** Decide whether the multiline slot is a real affordance (then name and expose it as a property with empty default copy) or scaffolding (then label it SCAFFOLDING per rule 6 and empty the characters). Either way the placeholder sentence should not ship inside a published master.

**Evidence.**
- Found 2026-09-03 by the target audit while searching fdCQVFdvOByaOYIJYag0d6 for the phrase: hits only inside Text field instances (npveRebuild_audit_2026_09_03 step 4; flag `npveAudit_textFieldHiddenPlaceholderCopy`).
- Nodes: library 121:350 › 130:149, 130:168 ("Multiline rows", visible false, parent "Text").

## 14. Icon/ArrowDropDown is missing

**Wrong.** MUI's default Select caret is ArrowDropDown, a filled triangle (`@mui/material/Select` `IconComponent` default; `SvgIcon` ArrowDropDown). The library ships only chevron carets (Icon/DownCaret 76:5, Up, Left, Right), so every consumer dropdown stands in with DownCaret and renders a chevron where the product renders a triangle.

**Fix.** Add Icon/ArrowDropDown (24 box, filled triangle 10×5 centred) beside the caret set, named after the MUI glyph with the (MUI) suffix per the icon convention, then swap the stand-ins.

**Evidence.**
- MUI Select API: `IconComponent` defaults to ArrowDropDown.
- Source 545:5239 status word caret: filled triangle vector 8.81 × 4.4 (`npveRebuild_mgmtFidelity_2026-09-04` step 2).
- GAP marker "Dropdown caret" beside the Problems management screens in fdCQVFdvOByaOYIJYag0d6 (npveRebuild_mgmtFidelityBuild_2026-09-04); decision 2026-09-04 (Daniel): keep the chevron until the icon ships.
- Flag `npveMgmt_statusCaretGlyphGap`.

## 15. Text field has no end-adornment slot

**Wrong.** Text field exposes label, value, helper, required, select and multiline controls, but no start- or end-adornment slot. The Edit Problem reference places a Calendar icon inside each date field, so a consumer cannot reproduce that control through the published component API.

**Fix.** Add an optional end-adornment instance-swap slot to Text field, with the same absolute positioning and text clearance used by MUI InputAdornment. Keep the default hidden and curate Icon/Calendar as a preferred value. The existing search-field task still covers the separate leading-adornment and placeholder needs.

**Evidence.**
- Source: NPVE NDE-2026 `Clin_Problems-Edit` 4536:27605, date fields at 4598:31375 and 4695:13238.
- Target: `Problem edit body` 316:3412 uses explicit GAP wrappers around live Text field and Icon/Calendar instances; marker 324:4934.
- Flag: `npveProblemEdit_textFieldNoEndAdornment` (GAP, medium).

## 16. Chip has no dropdown style

**Wrong.** The Allergies source shows the severity as a green pill reading "Mild" with a caret, a chip that opens a menu. Chip (156:171) has color=success but only a Delete icon boolean; there is no caret or trailing-icon slot, so a consumer cannot express a dropdown chip.

**Fix.** Add a trailing-icon slot or a Dropdown boolean to Chip (Figma-only affordance, Sentence case), defaulting to the DownCaret glyph, or publish a documented Chip + caret pattern. Then swap the NPVE stand-in.

**Evidence.**
- Source: NPVE NDE-2026 `Clin_Allergies` 129:7726, severity control I129:7816 (Akkurat LL Bold 14 label).
- Target: `Allergy severity selector` 352:3206 (local stand-in; fill bound chipSuccessBackground, radius bound radius/chip, live DownCaret); GAP marker 404:7061 "Dropdown chip" beside the Allergies comparison 356:6236 on Screens.
- Flags: `npveExtReview_allergySeveritySelectorUnmarked` (GAP, medium); marked 2026-09-05 by `npveRebuild_extReviewRepairs_2026-09-05`.
- Screens: `figma-export/npve-external-review-2026-09-05/comparison-allergies-356-6236-1x.png`.

## 17. Chip cannot carry a bold prefix

**Wrong.** The Procedures/Surgical History source shows metadata pills that lead with a bold prefix ("CPT: 27427", "For: MCL Tear, Left Knee"). Chip has one Label at one weight, so the prefix cannot be emphasised inside a published Chip.

**Fix.** Decide whether a two-part label (Prefix + Label, prefix bold) belongs on Chip as a Figma-only affordance, or whether the product should render the prefix at one weight. If the former, add a Prefix text property with an empty default; then swap the NPVE stand-in.

**Evidence.**
- Source: NPVE NDE-2026 `Clin_ProSH` 648:3473, event card pills.
- Target: `Procedure history metadata` 337:3881 (local outlined badge with separate Prefix and Value text, all paints bound); GAP marker 404:7070 "Chip with bold prefix" beside the Procedures comparison 339:6481 on Screens.
- Flags: `npveExtReview_procedureMetadataBadgeUnmarked` (GAP, medium); marked 2026-09-05 by `npveRebuild_extReviewRepairs_2026-09-05`.
- Screens: `figma-export/npve-external-review-2026-09-05/comparison-procedures-339-6481-1x.png`.

## Checked and left out

These NPVE flags are open but the library is not the fix: `npveProblemsRecent_filterTabsCompact` (source hand-drew 28-tall tabs; the library Tabs was accepted), `npveSidesheet_closeIsBareIconInSource` and `npveProblemsRecent_bareIconControls` (source has no hit areas; the library already does), `npveProblemsBuild_coverPageUnboundFill` and `npveProblemsBuild_strayChangelogRow` (target file), `npveComparison_imageFillUnbindable` (by design), `npveBuild_importedNodesDroppedBetweenCalls` and `npveChangelog_placedLogIsDetached` (plugin API behaviour), `npveCloseout_storybookUnreachable` (reference checkout), and the nine `npveSource_*` findings about the NDE-2026 file.
