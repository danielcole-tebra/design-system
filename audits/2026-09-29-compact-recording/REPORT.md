# Print as Button-icon and compact recording controls, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive); library and source read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted. Parts 0 to 3 done; no design question stopped the batch. The five rulings are DECISION lines in FLAGS.md, and the engineering flag about recording with Problems open is struck.

## 0. Print
Built `Icon/MUI/PrintOutlined` 980:16636 in section 32 (5.15.12, path and the dot circle flattened into one vector at its viewBox position, SCALE constraints, bound fill). In every variant of the Note toolbar set 966:16408 (all ten) the Print pill is hidden and renamed `_Superseded · Print pill` (its Show print link moved off it) and a Button-icon (outlined, Circle, medium, 38 tall like the mic pill) named Print sits after the mic pill and carries the Show print property. Encounter · Ready 978:4048 still shows Print. `p0-print-ready-toolbar-2x-source-above.png` (source above, rebuild below, true 2x).

## 1. Glyphs
`Icon/MUI/Pause` 980:16643, `PlayArrow` 980:16647, `Stop` 980:16651, all in section 32 with the recipe.

## 2. Compact variants
The set now has VARIANT "Width" = Full (default) | Compact next to Recording state. Ten variants: the five Full ones are unchanged; the five Compact ones are clones. Started Compact 981:19699: italic "Transcribing", Divider, Cancel, Button-icon Pause, Button-icon Stop, mic pill. Paused Compact 981:19714: "Paused", Divider, Cancel, Button-icon PlayArrow, Button-icon Stop, mic pill. Ready 981:19687, Processing 981:19729 and Closed 981:19740 Compact copy Full.
Widths read back: all Compact variants are 799 wide; the content needs 741 (Started, right group 346) and 710 (Paused, 315), so both fit inside 799 with room to spare. All gaps are 8. Cloning inside the set kept most property links; the few that dropped were re-linked and counted (Show date, Show print, the Transcription status swap). Screenshots: `p2-toolbar-set-966-16408.png` (whole set), `p2-{ready,started,paused,processing,closed}-full-above-compact-below-2x.png`.

## 3. Frames
Two frames added after Encounter · Paused: `Encounter · Started · Problems open` 982:4584 and `Encounter · Paused · Problems open` 982:5443, Page/Encounter at Note and Problems with the Note toolbar at Width=Compact and the matching state, each labelled "No source: compact controls, Daniel 2026-09-29". Later frames moved down two pitches (1145); order top to bottom: Ready, Add Problem, Started, Paused, Started · Problems open, Paused · Problems open, Processing, AI Note Results, Replace section, Closed. Screenshots: `p3-started-problems-open-982-4584.png`, `p3-paused-problems-open-982-5443.png`, `p3-whole-page-943-14942.png`.

## Notes
- Icon-only controls need tooltips (Pause, Resume, Finish, Print): recorded for engineering, not built.
- The Print Button-icon inks the library Button-icon colour, not the source's grey-teal; the MUI drawing is heavier than the source's.
- The Full variants still hold the text-Button controls with the open Button ink and capitalisation flags.
