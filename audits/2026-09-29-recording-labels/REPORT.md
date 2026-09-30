# Text-and-icon recording controls at every width, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive); library read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted. Read first: CLAUDE.md, PLUGIN-NOTES.md, `audits/2026-09-29-recording-controls/REPORT.md`.

## Result in one paragraph
Compact Started and Paused now use the same text buttons as Full (Pause, Resume, Finish with plain MUI start icons). At Compact the content does **not** fit 799: Started overflows by **8 px** and Paused by **65 px**, and there was no gap left to tighten. Both variants are stopped at that state, as instructed, and the overflow is visible in the shots (Paused Compact clips the Assigned To pill).

## 1. Compact Started and Paused, set 966:16408
The four Button-icon controls (981:19930 Pause, 981:19934 Finish in Started; 981:19938 Resume, 981:19942 Finish in Paused) were swapped in place with `swapComponent` to the same text Button variant the Full controls use (`variant=text, color=primary, size=medium`), then set: Label Pause, Resume, Finish; Start icon on; start glyph `Icon/MUI/Pause`, `PlayArrow`, `Stop`; End icon off. Read back: identical properties to the Full buttons; sizes 86, 85, 101 and 85 wide, all 36 tall, matching Full. Swapping in place kept the node ids, so the frame reactions on them survived (read back 1 reaction each). Content and order are now identical to Full: status, divider, Cancel, Pause or Resume, Finish, mic pill.

## 2. Fit at Compact (799)
Every gap in the variants was already 8: variant gap between groups 8, right group 8, Recording controls 8, status dot to text 8 (the left group's 16 between the two pills is outside the instruction and was not touched). So the tightening step changed nothing, and Full needed nothing to match.

| Variant | Frame | Left content | Right content | Gap | Content needed | Overflow |
|---|---|---|---|---|---|---|
| Started, Compact 981:19699 | 799 | 387 | 412 | 8 | 807 | **8 px** |
| Paused, Compact 981:19714 | 799 | 387 | 469 | 8 | 864 | **65 px** |
| Started, Full 966:16237 | 807 | 387 | 412 | 8 | 807 | 0 |
| Paused, Full 966:16289 | 864 | 387 | 469 | 8 | 864 | 0 |
| Ready Full / Compact | 799 | 387 | 248 (294 with Print) | 8 | 643 (689 with Print) | 0 |
| Processing Full / Compact | 799 | 387 | 228 | 8 | 623 | 0 |

Compact content is now identical to Full, so the two widths can no longer differ by more than their frame: 807 and 864 against 799. The left group is FILL, so the overflow lands on it: Started Compact's left group reads 379 for 387 of content (the Assigned To pill's caret touches the recording dot), and Paused Compact's reads 322 for 387 (the Assigned To pill is clipped at "Assignec" behind the status text). Nothing further was done, per the instruction. What would fix it is a decision for you (a wider Compact, one of the two left pills shortening, or the left pills' 16 gap): the left gap at 8 would recover exactly the 8 px for Started, and leave 57 px over for Paused.

## 3. Glyph size
The three start icons sit in the Button's 16 x 16 slot, which the nested instance will not let me resize (tried: `resize` on the nested start icon is ignored, read back 16). The lever was the glyph masters: each vector inside `Icon/MUI/Pause` 980:16643, `PlayArrow` 980:16647 and `Stop` 980:16651 was rescaled about the 24 x 24 centre (Pause and PlayArrow x 19/14, Stop x 19/12), fills still bound, SCALE constraints kept. Rendered glyph size read back from the instances (painted vector bounds at the 16 slot):

| Glyph | Before | After | Reference |
|---|---|---|---|
| Pause | 8 x 9.3 | 10.9 x 12.7 | mic 9.3 x 12.7 |
| Stop | 8 x 8 | 12.7 x 12.7 | Add Section glyph 12.7 x 9.3 |
| Resume (PlayArrow) | 7.3 x 9.3 | 10 x 12.7 | |

Painted height now equals the mic glyph's 12.7 for all three. The masters are no longer the exact MUI drawing at 24 (they are the same shape scaled up inside the frame); usage was only these recording controls (the instance count could not be confirmed file-wide from a single page, trap 45).

## 4. Status ink
"04:12" and "Paused · 04:12" in all four variants: fill rebound from `color/text/secondary` to the library `color/text/primary` (read back: alias `…/74:135`, black). Regular 14, unchanged size and weight.

## 5. Processing, both Widths
"Processing AI Transcriptions" (italic, secondary) is now "Processing recording": Akkurat LL Regular 14, fill `color/text/primary`. Nothing else in Processing changed (both variants read 138 wide for the text; Processing content needs 623 of 799).

## 6. Print
`Show print` set true on every Ready toolbar instance, matching F01. Shell page (3 changed): Encounter · Ready · Add Problem 943:14943, AI Note Results 943:15819, Replace section 978:6363. Prototype page (13 changed): F02 1004:8210, F08 1004:8223, F09 1004:8226, and a to j (1004:35117, 35634, 36294, 36888, 37585, 38284, 38862, 39570, 40247, 41040). F01 on both pages already had it. All read back Print visible. **No overflow**: the Ready toolbar in the Note-and-Problems frames is the Full variant at 799, content 689 with Print, 110 spare. (The Ready frames in that layout use Width = Full; only Started and Paused use Compact.)

## 7. Reactions and reachability
| | Count |
|---|---|
| Before (last report) | 132 |
| After | **132** |
| Lost | 0 |
| Restored | 0 |
| Added | 0 |
The four swapped Compact controls kept their reactions (F05 Pause -> F06, Finish -> F07; F06 Resume -> F05, Finish -> F07). Reachability from F01: **all 20 frames reachable, none without an exit**; flow starting point Encounter unchanged.

## Evidence
- `toolbar-set-966-16408.png` (whole set, 1x; Full left, Compact right).
- 1x crops from the prototype frames: `toolbar-started-full-1x.png`, `toolbar-paused-full-1x.png`, `toolbar-started-compact-1x.png`, `toolbar-paused-compact-1x.png`, `toolbar-processing-full-1x.png`.
- Full frames, 1x: `frame-F05-started-problems-open-1004-8217.png`, `frame-F06-paused-problems-open-1004-8219.png`, `frame-a-problems-open-1004-35117.png`; also F03, F04, F07 (the crops' sources).

I looked at every shot. Plainly, what renders wrong or tight:
1. **Paused Compact (F06 and the set): the Assigned To pill is cut off** at "Assignec" by the status text, the 65 px overflow.
2. **Started Compact (F05): the Assigned To pill's caret touches the red dot** (8 px overflow, no gap).
3. **The scaled glyphs now read at the size of the mic glyph;** Stop is a solid 12.7 px square, larger than the label's cap height, which is the size you asked for but reads heavy next to the 14 px labels.
4. **Print is still an icon-only Button-icon in the toolbar** (Ready frames), which the ruling "no icon-only controls in the toolbar" arguably covers; I set Show print as instructed and did not change the control. Needs a decision.
5. Everything else, including Processing, Started Full and Paused Full, reads as specified.
