# Note body units, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive only); library and source read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted. Note card, Page/Encounter and the existing icon swaps are untouched. Three components built in the new Templates section `34 · Note body` `954:15028`, each instantiated in every state and screenshotted. No design question stopped the batch; the Add Section glyph is left open for Daniel on purpose.

New icons in section 32 (paths from @mui/icons-material 5.15.12): `Icon/MUI/DragIndicator` 954:15015, `Splitscreen` 954:15018, `PlaylistAdd` 954:15021, `PostAdd` 954:15024 (two vectors).

## Measurements from Rec_Started 3159:20067 and Rec_Paused 4296:17197
The two frames match node for node in these regions.
- **Editor band** (Subjective 3159:20154): fill `#F6F6F6`, border 1px `#D6D6D6`, radius 8, padding 8, gap 8. Tokens: fill **`color/grey/300`**, border **`color/grey/400`** (the same value as `color/divider`). Radius 8 has no exact token (`radius/sm` 4, `radius/chipSmall` 12). The toolbar row inside has no fill of its own.
- **Toolbar row** (3159:20156): 1176 x 40, padding 8, gap 12, 24 glyphs in `#545454` (= `color/grey/600`, which is also the library Icon button's ink). Order and dividers: Undo, Redo | H1 | Bold, Italic, Underline | Align left, Numbered list |. Dividers are vertical 1px `#D6D6D6`, 20 tall. H1 is the glyph `format_h1`, ruled to be a text label.
- **Add Section pill**: 161 x 42, padding 15/15/8/8, fill white, border 1px `#8CA7A2`, radius 24, splitscreen_add 24 + label 14/18 `#004852` + caret.
- **Section block** (Section_fhx 3321:14608, 1325 wide): header 1325 x 32 (24 + 8 bottom), gap 8; drag_indicator 24 + gap 8 + title Bold 18/24 `#000000`; on the right "Link to Section" Bold 14/18 `#545454` + arrow_drop_down 24, gap 0; body padded left 32.
- **Tag** (3321:14622): 176 x 28, fill `#FDFCFD`, border 1px `#8657AC` inside, radius 4, padding 8/8/2/2, gap 2, label Bold 16/24 `#8657AC`. Sits at the body's left inset, then 8, then the first line of text (16/20); the remaining lines wrap flush left at the same x as the tag, at 16/24.
Sizes for the rebuild come from the target's own widths: Note card 831, so editor card 799, toolbar row 783, section block 759.

## Re-grid (cleanup-batch mapping: peers 16, tight pairs 8, 10 to 8, 20 to 24)
| Source | Rebuild | Why |
|---|---|---|
| toolbar padding 8 | 8 | on the grid |
| icon gap 12 (24 glyphs) | 0 inside a group, 8 around dividers | the library Icon button small is 34 with its own padding, so a 12 gap would open the pitch to 46 |
| divider 20 tall | 24 | nearest scale value |
| header bottom padding 8 | gap 8 | on the grid |
| tag padding 8/8/2/2, gap 2 | the library Chip's own (24 tall) | not authored |
| body left inset 32, tag to text 8 | 32, 8 | on the grid |
No off-grid value is authored. Gaps and padding bind `space/0`, `space/8` or `space/32`, except the zero padding on the Note tag wrapper, which is a literal 0.

## 1. Note editor/Toolbar `955:15327`
Component set, one property: `Add Section glyph` = None | Splitscreen | PlaylistAdd | PostAdd (`955:15119`, `15173`, `15224`, `15275`). Each variant is 783 x 54: padding 8 (`space/8`), left cluster 362 wide, Add Section 149 x 38 on the right.
- Left: library **Icon button** `color=default, size=small` with Icon/MUI glyphs (Undo, Redo, FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft, FormatListNumbered), 34 each, grouped with gap 0; library **Divider** `orientation=vertical`, resized to 1 x 24; **H1** is a library Button, `variant=text, color=primary, size=small`, label "H1".
- Right: library Button `contained, primary, medium` (the outlined Button), label "Add Section", End icon on with the same DownCaret swap as the Template pill in 468:5582, Start icon per variant.
- **Add Section glyph:** None is the default (top-left variant, no start icon). The three candidates are shown in the other variants for Daniel. Nothing is picked.
- **Toolbar band tokens:** fill `color/grey/300`, border `color/grey/400` (see Measurements). The component itself is transparent so it can sit on the card; the proof frame `955:24361` uses those two tokens.
- Deviation: the row is 54 tall (source 40) because of the 34 Icon button, 38 Add Section and the 8 padding.
Screenshots: `after-toolbar-proof-955-24361.png` (all four variants on the band), `compare-toolbar-source-vs-rebuild-2x.png` (source Started and Paused beside the rebuild at 2x).

## 2. Note section block `955:15050`
Component set with one VARIANT property `Show tag` = true | false (`955:15017`, `955:15037`) and two TEXT properties, `Title` (default "Family History") and `Body`. Each variant is 759 wide: header (drag handle `Icon/MUI/DragIndicator`, Title on `h4`, right-aligned "Link to Section" on `h5` in `color/text/secondary` with `Icon/MUI/ArrowDropDown`), a library Divider (horizontal), then the body (`body1`, `color/text/primary`, left inset `space/32`). Gaps `space/8`; drag and caret inks `color/grey/600`.
- **Tag technique used: absolutely positioned tag plus paragraph indent.** The tag is an instance of Note tag/FHx placed absolute at (32, 0); the body text carries a paragraph indent of 150 (tag 142 + gap 8). It renders cleanly at 1x: the tag sits at the start of the first line, the first line is indented past it and the following lines wrap flush left under it, which is how the source wraps. No fallback needed. Limits, flagged as a GAP: the indent is a fixed number, so a longer tag label would overlap the first line; and the tag's label is edited on the exposed instance, not through a component property.
- **Show tag is a variant, not a boolean.** A boolean can hide the tag but not remove the indent, which would leave the first line indented with nothing in front of it. The property is named as asked; it just shows as a dropdown.
- Title: the source title is Bold 18/24, which has no library text style. `h4` (16/24 Bold) is bound. "Link to Section" is 14/18 in the source and `h5` is 14/20.
Instances, every state, in `PROOF · Note section block states` `955:15051`: tag on and off, each with a long body and a short body (`955:15052`, `15070`, `15088`, `15101`). Screenshots: `after-block-proof-955-15051.png`, `after-block-set-955-15050.png`, `compare-block-source-vs-rebuild-1x.png`.

## 3. Note tag/FHx `954:15029`
The library Chip, `size=small, variant=outlined, color=default`, label "(FHx) Diabetes (Father)", 142 x 24, with nothing overridden, inside a hugging component with the Chip instance exposed so its Label is editable on instances. The source tag is purple (`#8657AC` ring and label, `#FDFCFD` fill). The 76 colour variables in the library have no purple, tag or matching secondary token (secondary is coral `#FF8D6E`), so nothing is bound and the chip keeps the library's own grey ring and ink. The description says "GAP: no tag color token". Screenshots: `after-tag-954-15029.png`, `compare-tag-source-vs-rebuild-4x.png`.

## FLAGS.md
GAP npveNoteBody_addSectionGlyphPick, npveNoteBody_tagColorNoToken, npveNoteBody_sectionBlockLimits (covers the inline-tag indent, the variant, the label and the title style) and npveNoteBody_toolbarSizingAndBandTokens. npveWorkflows_editorToolbarNoPattern annotated to point at the local toolbar and left open; the grouped MUI icons GAP lists the four new icons (26 in all).
