# Library to-dos read-only batch, 2026-09-03

Batch id `libraryTodos_readOnly_2026_09_03`. Library file `YX2n4YLrEpBXNbcc73T6dw`, read only. No Figma writes except two transient instances (986:2 Icon button, 986:8 Button) created on the Cover page for capture and removed in the same batch; a `findAll` on the page for the TRANSIENT name marker returned nothing afterwards. Two earlier transient instances (980:147, 980:5323) were created and removed inside single scripts. `figma.skipInvisibleInstanceChildren = false` was set at the top of every walk.

Scope: LIBRARY-TODOS items 1, 5, 7, 8, 11, 12 and the flags they name. Code reads are against `C:\Code\web-app-v2\packages\design-system\src` (`ds/`) and MUI 5.15.12, the version `@mui/material ^5.15.11` resolves to in `yarn.lock` (line 10912). MUI sources were unzipped from `.yarn/cache` into the scratchpad; the repo has no `node_modules` (yarn PnP).

## File identity (rule 7)

Pages read: Cover 118:250, Foundations 145:2, Reference 259:2879, Actions 259:2873, Inputs 259:2874, Data display 259:2875, Feedback 259:2876, Surfaces & navigation 259:2877, Icons & illustrations 259:2878, Compositions 446:2, Layouts 489:2. The component pages match the schema's inventory, so the file is the library. Finding: `figmaBuild.pages._order` in the schema still reads `Cover, Tokens, Actions, Inputs, Data display, Feedback, Surfaces & navigation, Icons & illustrations, Reference`; it predates the rename of Tokens to Foundations and the Compositions and Layouts pages. Reported, not changed.

## A. Code reads

### A1. `ds/typography/typography.ts`

| Variant | fontSize | lineHeight | fontWeight | letterSpacing | textTransform | Lines |
|---|---|---|---|---|---|---|
| h4 | 1rem (16) | 1.5rem (24) | 700 | not set | not set | 31-35 |
| h5 | 0.875rem (14) | 1.25rem (20) | 700 | not set | not set | 36-40 |
| subtitle2 | 0.75rem (12) | 1rem (16) | 700 | not set | not set | 41-45 |
| body1 | 1rem (16) | 1.5rem (24) | 400 | not set | not set | 46-50 |
| body2 | 0.875rem (14) | 1.25rem (20) | 400 | not set | not set | 51-55 |
| caption | 0.75rem (12) | 1rem (16) | 400 | not set | not set | 56-60 |
| button | 1rem (16) | 1.5rem (24) | 400 | not set | capitalize | 61-66 |

`fontSize: 16`, `htmlFontSize: 16`, family `"Akkurat LL", "Helvetica - Neue", Helvetica, Arial` (lines 3-10). No `letterSpacing` appears anywhere in the file (grep over `typography/` returned nothing). The variant sizes are literal rem strings, not `pxToRem` calls, so the 14.29% inflation of rule 4 does not touch them.

Inferred, not rendered: MUI's `createTypography.js` (5.15.12, line 78) `deepmerge`s these overrides into its defaults per variant, so every field the override leaves unset survives from MUI's `buildVariant` (lines 46-68). The effective letter spacing is therefore MUI's, not zero: button `0.02857em` (0.457px at 16), caption `0.03333em` (0.4px at 12), body1 `0.00938em`, body2 `0.01071em`, h4 `0.00735em`, h5 `0em`, subtitle2 `0.00714em`. Code defines no letter-spacing value of its own for the chip or the caption. This bears on item 8's "letter-spacing variable if code defines one": it does not, but the rendered spacing is not 0 either.

### A2. Tab typography

`ds/overrides/TabOverrides.tsx` (14 lines) sets only the hover and active background; `ds/overrides/TabsOverrides.tsx` (8 lines) sets only `indicatorColor: "primary"`. No other file in `ds/` names `MuiTab`. The theme (`ds/theme/theme.ts:80-84`) passes `typography` and `overrides` straight into `createTheme`. The deciding line is MUI's `Tab/Tab.js:46`, `_extends({}, theme.typography.button, { maxWidth: 360, minWidth: 90, ..., minHeight: 48, padding: '12px 16px' })`. A Tab label therefore resolves to Akkurat LL, 16px, line height 24px, weight 400, `text-transform: capitalize`, letter spacing `0.02857em` (inferred per A1). Padding 12 + 24 + 12 = the 48 minHeight.

### A3. Small resting label

`ds/overrides/TextFieldOverrides.tsx` (20 lines) sets only the Select caret icon; nothing about the label. MUI `InputLabel/InputLabel.js` (5.15.12), outlined variant: resting medium `translate(14px, 16px) scale(1)` (line 97), resting small `translate(14px, 9px) scale(1)` (line 100), shrunk `translate(14px, -9px) scale(0.75)` (line 107). The label inherits body1 (24px line box), the small OutlinedInput is 8.5 + 23 + 8.5 = 40 tall (`OutlinedInput.js:113`, `InputBase.js:127`), so the code label box centre sits at 9 + 12 = 21 against an input centre of 20 (+1); medium 16 + 12 = 28 against 28 (0).

Rule 4 inflation: 16 × 16/14 = 18.29; 9 × 16/14 = 10.29. These are reported because the prompt asked for them, but the translate values are literal px in MUI's source with no `pxToRem` call on the path, so the inflation does not apply to them. That is a disagreement with the premise of the ask, reported not resolved. Note also that item 1 says "small needs 8"; code says 9.

### A4. Spacing

`ds/theme/theme.ts` has no `spacing` override (grep over `theme/` returned nothing), so MUI's default 8px multiplier applies. `grep -r "tebra-space" packages` from `C:\Code\web-app-v2\packages`: **0** matches. The `var(--tebra-space-N)` code syntax on the Dimension variables names a CSS variable that does not exist in the repo.

### A5. Button case

`ds/overrides/ButtonOverrides.ts` sets no `textTransform` (radius 24, no shadow, per-colour paints, icon sizes via `pxToRem(16)`); `typography.ts:65` sets `button.textTransform: "capitalize"`. MUI `Button/Button.js:69` spreads `theme.typography.button` into the root, so a contained primary button label renders with CSS `capitalize`, which uppercases the first letter of every word including "to": "Save & Add To Note".

### A6. Storybook

Not reachable. `curl http://localhost:6006/` returns nothing (code 000). The reference checkout is yarn PnP with the `open@8.4.2` unplug missing (flag `npveCloseout_storybookUnreachable`); starting it needs a `yarn install`, which is a state change this read-only batch did not make. Skipped; no derivation substituted.

## B. Library reads

Screenshots are natural-size captures from `get_screenshot` (which never upscales) enlarged 3× nearest-neighbour locally, so every pixel row quoted below is a 1× row. A true 3× `exportAsync` was tried; its bytes cannot leave the plugin sandbox intact (no `fetch`, and base64 through the chat corrupts), so the 1× captures are the evidence.

### B1. Text field size=small masters

Set 121:350 "Text field" on Inputs, 20 variants, **10 size=small** (300×60, Input 300×40).

| Variant | id | Label / resting y, h, visible | Label slot h, visible | Label box centre − input centre | Glyph centre − input centre |
|---|---|---|---|---|---|
| Default, Empty | 130:140 | 16, 24, yes | 56, hidden | +8 | +8.32 |
| Default, Filled | 130:159 | 16, 24, hidden | 40, visible | +8 | — |
| Hover, Empty | 130:178 | 16, 24, yes | 56, hidden | +8 | +8.32 |
| Hover, Filled | 130:197 | 16, 24, hidden | 40, visible | +8 | — |
| Focused, Empty | 130:216 | 16, 24, hidden | 40, visible | +8 | — |
| Focused, Filled | 130:235 | 16, 24, hidden | 40, visible | +8 | — |
| Disabled, Empty | 130:254 | 16, 24, yes | 56, hidden | +8 | +8.32 |
| Disabled, Filled | 130:273 | 16, 24, hidden | 40, visible | +8 | — |
| Error, Empty | 130:292 | 16, 24, yes | 56, hidden | +8 | +8.32 |
| Error, Filled | 130:311 | 16, 24, hidden | 40, visible | +8 | — |

Every Label / resting frame is absolute at y 16, 24 tall, in a 40-tall Input; the medium reference 121:230 has the same y 16 / h 24 inside a 56-tall Input, which is where 16 centres. Glyph centre is from `absoluteRenderBounds` of Label text (e.g. 130:155: y 54.416, h 11.808, against Input 130:141 at y 32, h 40).

Label slot: 56 tall on the four variants where it is hidden (Value=Empty, not focused), 40 tall on the six where it is visible. Refines flag `npveProblemsBuild_textFieldSmallLabelSlotHeight`: the 56 sits only on hidden slots; every visible slot is already 40.

Pixels, `b1-textfield-small-empty-130-140-1x.png` (300×60): outline rows 0 and 39 at x 150 (helper-text ink at 55-56); label glyph ink rows 22 to 34, columns 14 to 126, glyph centre row 28.5 against the input centre 20. Marked 3× crop `b1-textfield-small-empty-130-140-3x-marked.png`: blue line at the input centre (y 20), purple at the glyph centre (y 28.3); looked at, the label sits in the lower half of the box.

Code (A3): +1 by box for small, 0 for medium. Library: +8 on all ten. Disagree.

### B2. Tabs/Tab 201:13

Set "Tabs/Tab" 480×96, variants 201:3 selected=no Default, 201:5 selected=no Hover, 201:7 selected=yes Default, 201:10 selected=yes Hover; each 90×48, HORIZONTAL, padding 12/16/12/16, Label text at y 14, 37×20.

Label on all four: bound `fills` only (color/text/secondary on selected=no, color/primary/main on selected=yes). Family, size, line height, weight all literal: Akkurat LL Regular, 16, line height 20px, letter spacing 0%, textCase ORIGINAL, no text style.

Pixels, `b2-tab-201-3-1x.png` (90×48): label ink rows 18 to 30, columns 27 to 61. 3× `b2-tab-201-3-3x.png`.

Code (A2): 16 / 24 / 400 / capitalize / letter spacing 0.02857em. Library: 16 / 20 / Regular / ORIGINAL / 0. Disagree on line height and case; agree on family, size, weight. Item 5's proposed pairing "font/lineHeight/body2 (20)" would bind the library's current literal, not the code value; code's pair is font/size/body1 16 + font/lineHeight/body1 24.

### B3. Icon button 170:77 › 573:3583

Group 573:3583 is not a child of Icon button 170:77. Its parent is COMPONENT 575:17 "Icon/FavoritesOutlined" (24×24, Icons & illustrations). Icon button's variants (24, 40×40 medium and 34×34 small) hold one child, INSTANCE "Icon" 170:6 at (8, 8) 24×24, an instance-swap slot `Icon#170:0` defaulting to Icon/DownCaret 76:5; FavoritesOutlined reaches the target rows through that swap.

Bounds inside 575:17:

| Node | type | x | y | w | h |
|---|---|---|---|---|---|
| 573:3583 Group | GROUP | 2.0000 | 2.0000 | 20.000025 | 19.125002 |
| 573:3584 Vector | VECTOR | 2.0000 | 2.0000 | 20.000025 | 19.125002 |

Vector: 1 fill, 0 strokes, strokeWeight 1. The Group has exactly one child.

Transient instance 986:2 of 170:5 with Icon swapped to 575:17: instance 40×40; Group render bounds 20.000025 × 19.125002 at (10, 10) inside the instance; Vector render bounds 20 × 19.125. With the default DownCaret the vector is 20.000013 × 11.026 at (2, 6.487), also fractional. Pixels, `b3-iconbutton-favoritesoutlined-transient-1x.png` (40×40): glyph ink rows 10 to 29 and columns 10 to 29, a 20×20 ink box (anti-aliasing fills the 0.875 remainder). 3× `b3-iconbutton-favoritesoutlined-transient-3x.png`, looked at: outlined star, centred.

Finding against item 12: rule 8 in the schema exempts VECTOR and GROUP bounds as intrinsic geometry ("the union of their path data, are not authored, and are not rounded"). The 19.125 the target walks report is that exempt case, and the fix the item proposes (rebuild the glyph frame at 24 or 20) would go into Icon/FavoritesOutlined, not Icon button. Whether the walks should stop reporting it, or the icon gets an integer wrapper, is a decision; reported, not resolved.

### B4. Variables

Tebra/Typography (VariableCollectionId:74:49, 17 variables, mode Default):

| Name | Value | codeSyntax WEB |
|---|---|---|
| font/family/base | Akkurat LL | var(--tebra-font-family-base) |
| font/weight/regular | 400 | var(--tebra-font-weight-regular) |
| font/weight/bold | 700 | var(--tebra-font-weight-bold) |
| font/size/caption | 12 | var(--tebra-font-size-caption) |
| font/size/chip | 13 | var(--tebra-font-size-chip) |
| font/size/body2 | 14 | var(--tebra-font-size-body2) |
| font/size/buttonLarge | 15 | var(--tebra-font-size-button-large) |
| font/size/body1 | 16 | var(--tebra-font-size-body1) |
| font/size/h3 | 20 | var(--tebra-font-size-h3) |
| font/size/h2 | 24 | var(--tebra-font-size-h2) |
| font/size/h1 | 32 | var(--tebra-font-size-h1) |
| font/lineHeight/caption | 16 | var(--tebra-font-line-height-caption) |
| font/lineHeight/body2 | 20 | var(--tebra-font-line-height-body2) |
| font/lineHeight/body1 | 24 | var(--tebra-font-line-height-body1) |
| font/lineHeight/h1 | 48 | var(--tebra-font-line-height-h1) |
| font/lineHeight/h2 | 36 | var(--tebra-line-height-h2) |
| font/lineHeight/h3 | 32 | var(--tebra-line-height-h3) |

Against code (A1): no font/size or font/lineHeight for h4 (16/24), h5 (14/20) or subtitle2 (12/16); no letter-spacing variable. h4 and body1, h5 and body2, subtitle2 and caption share sizes and line heights and differ only by weight. Side finding: `font/lineHeight/h2` and `h3` code syntax reads `--tebra-line-height-*` while every other line height reads `--tebra-font-line-height-*`.

Tebra/Dimension (VariableCollectionId:74:65, 34 variables), the 20 `space/*`:

| Name | Value | codeSyntax WEB | Description |
|---|---|---|---|
| space/0 | 0 | var(--tebra-space-0) | Zero inset, Checkbox Flush=Left only |
| space/2 | 2 | var(--tebra-space-2) | |
| space/3 | 3 | var(--tebra-space-3) | |
| space/4 | 4 | var(--tebra-space-4) | |
| space/5 | 5 | var(--tebra-space-5) | |
| space/6 | 6 | var(--tebra-space-6) | |
| space/7 | 7 | var(--tebra-space-7) | |
| space/8 | 8 | var(--tebra-space-8) | |
| space/9 | 9 | var(--tebra-space-9) | |
| space/11 | 11 | var(--tebra-space-11) | |
| space/12 | 12 | var(--tebra-space-12) | (schema plan: Autocomplete Multiple padding, MUI 9 + chip 3) |
| space/13 | 13 | var(--tebra-space-13) | |
| space/14 | 14 | var(--tebra-space-14) | |
| space/16 | 16 | var(--tebra-space-16) | |
| space/17 | 17 | var(--tebra-space-17) | |
| space/18 | 18 | var(--tebra-space-18) | Derived 42 − 24, Checkbox Flush=Left |
| space/19 | 19 | var(--tebra-space-19) | |
| space/23 | 23 | var(--tebra-space-23) | |
| space/24 | 24 | var(--tebra-space-24) | |
| space/40 | 40 | (none) | theme.spacing(5), Feedback p={5} |

All scoped WIDTH_HEIGHT + GAP. No space/32. 19 of 20 carry `var(--tebra-space-N)`; the repo has 0 occurrences of `tebra-space` (A4). The other 14 Dimension variables (radius/*, border/*, size/*) were listed but are outside this batch.

### B5. Button 79:2 Label textCase

Set "Button" on Actions, 72 variants (variant contained/text × color primary/secondary/error/inherit × size medium/small/large × State Default/Hover/Disabled, minus combinations the set does not carry). textCase census over all 72 Label texts: **TITLE: 72**. Label is Akkurat LL Regular, 16/24 medium, 14/20 small, 15/24 large, letter spacing 0px, no text style.

Transient instance 986:8 of 78:14 (contained, primary, medium, Default) with `Label#83:165` = "Save & Add to Note": instance 176×38, text 142×24 at (17, 7), characters "Save & Add to Note", textCase TITLE, render bounds 140.4×11.8. Pixels, `b5-button-contained-primary-save-add-to-note-transient-1x.png` (176×38): label ink rows 13 to 24, columns 18 to 157. 3× `b5-button-contained-primary-save-add-to-note-transient-3x.png`, looked at: reads "Save & Add To Note" with a capital T.

Code (A5): CSS `capitalize` also yields "Save & Add To Note". Agree, by reading the CSS semantics, not a Storybook render (A6). Untested edge: CSS `capitalize` leaves later letters alone, and Figma TITLE is understood to do the same, so mixed-case labels like "ICD-10" are expected to match; not verified in pixels. The flag's detail ("MUI's default is uppercase; Title case matches neither") is wrong on the first point: `typography.ts:65` overrides MUI's uppercase with capitalize.

## Item verdicts

| Item | Code | Library | Verdict |
|---|---|---|---|
| 1 small resting label | small translate y 9 → box centre +1; medium 16 → 0 | resting frame y 16 on all 10 small variants → +8 box, +8.3 glyph | Disagree. Slot: 56 only where hidden, 40 where visible |
| 5 Tab label type | button: 16/24/400/capitalize, letter spacing 0.02857em (inferred) | literal 16/20/Regular/ORIGINAL, fills bound only | Disagree on line height and case |
| 7 space scale | no spacing override (MUI 8); 0 uses of tebra-space | 20 space/* incl. 3,5,7,9,11,13,17,19,23; no 32; 19 codeSyntax to a CSS var that does not exist | Disagree on code syntax; scale is a decision |
| 8 heading and letter-spacing tokens | h4 16/24, h5 14/20, subtitle2 12/16, all 700; no letterSpacing authored, MUI em defaults survive (inferred) | 17 variables, no h4/h5/subtitle2, no letter spacing | Disagree (gap confirmed); letter-spacing value to bind is a decision |
| 11 Button case | capitalize → "Save & Add To Note" | TITLE on 72/72 → "Save & Add To Note" | Agree, CSS semantics not Storybook |
| 12 Icon button glyph | n/a | Group 573:3583 is in Icon/FavoritesOutlined 575:17, 20.000025×19.125002; rule 8 exempts GROUP/VECTOR bounds | Disagree with the item's node and with its fix |

## Standing batch rules

1 instance paint verification: not applicable, no new variants; the two transient instances were used for rendered reads. 2 unbound paint audit: not run, no paints changed; the library-wide walk is a separate batch. 3 reference counts: not applicable, no clone. 4 skipInvisible false: set at the top of every walk. 5 opacity last: no paint touched. 6 enumerate: variants, variables and text nodes enumerated from the file. 7 file identity: pages read and matched on the component pages; `_order` stale (above). 8 round with record: the only fractional value met is 573:3583, intrinsic GROUP/VECTOR geometry the rule exempts; DownCaret 76:4 (20×11.026) is the same case. 9 bound paint alpha: no paint touched. 10 clone drops refs: no clone.

## Schema record

Backup `design-system-schema.backup-2026-09-03-pre-library-todos-read.json`, then `apply-library-todos-read.js` writes `libraryTodos_readOnly_2026_09_03` and appends the findings above to `flags[]` as new entries prefixed `libraryRead_`; the six named flags get a dated `readOnly2026_09_03` line appended to `detail`. No flag is resolved.

## Files

- `b1-textfield-small-empty-130-140-1x.png`, `b1-textfield-small-empty-130-140-3x-marked.png`
- `b2-tab-201-3-1x.png`, `b2-tab-201-3-3x.png`
- `b3-iconbutton-favoritesoutlined-transient-1x.png`, `b3-iconbutton-favoritesoutlined-transient-3x.png`
- `b5-button-contained-primary-save-add-to-note-transient-1x.png`, `b5-button-contained-primary-save-add-to-note-transient-3x.png`
