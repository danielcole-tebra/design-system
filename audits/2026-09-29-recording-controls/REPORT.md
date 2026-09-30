# Recording controls, Start recording, F01 and prototype, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive); library read only. `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted. Read first: CLAUDE.md, PLUGIN-NOTES.md, the 2026-09-29 LOG entries, `audits/2026-09-29-compact-recording/`, `audits/2026-09-29-prototype-wiring/REPORT.md`, and the recording section of `mobile-spec.md` for the Visit Companion conventions.

## 1. Recording controls, Note toolbar set 966:16408

Status, in Started and Paused at both Widths:
- **Started (Full 966:16237, Compact 981:19699):** the standalone italic words are gone. A new auto-layout `Status` frame (gap 8, centred) holds an 8 x 8 ellipse `Recording dot` and the text `Elapsed time` reading "04:12". The dot's fill is bound to the library `color/error/main` (read back: the alias resolves to `VariableID:138a46…/74:72`, colour #D83B4D). The old text node was reused, not recreated: it is now Akkurat LL **Regular** (was Italic), 14 / 20 as before, fill still bound `color/text/secondary`, family, size and line height still bound.
- **Paused (Full 966:16289, Compact 981:19714):** `Status` holds only the text `Status text` reading "Paused · 04:12" (middle dot), no dot, same Regular style.
- Status is identical at Full and Compact (50 wide Started, 92 wide Paused, 20 tall in all four). The Divider after the status is kept, in the same place.
- "Transcription in Progress", "Transcription Paused", "Transcribing" and "Paused" as standalone words no longer exist in the set. What still reads "Transcri…" in the set: the hidden `_Superseded · Transcription status` slot in both Ready variants (record, hidden) and, out of scope, "Processing AI Transcriptions" in both Processing variants.
- **Glyphs.** Full: the start icon of Pause is `Icon/MUI/Pause` 980:16643, Resume `Icon/MUI/PlayArrow` 980:16647, Finish `Icon/MUI/Stop` 980:16651 (was `PauseCircleOutline`, `PlayCircleOutline`, `StopCircleOutlined`). Compact: Button-icon 952:14989 (outlined, Circle) was already on the same three plain glyphs; read back, no change needed. All three glyph masters existed from the compact batch, so **no new Icon/MUI glyph was built** in this batch.
- **Cancel** is unchanged: red text Button in all four.
- **Widths.** Full variants are FIXED, so they were narrowed to their content: Started 916 -> **807**, Paused 908 -> **864** (left group 387, 8 gap, right group 412 and 469). Compact variants stay at 799, the card width they were built for; their right groups are now 317 (Started) and 359 (Paused), against 346 and 315 before, so Paused Compact is 44 wider than before because "Paused · 04:12" is longer than "Paused" (Started Compact is 29 narrower). Full got narrower in both states; Compact fits its 799 either way (content 754 at most).
- Processing and Closed, out of scope, as found: Processing reads "Processing AI Transcriptions" (italic, `color/text/secondary`) beside the mic pill; Closed reads "View AI Recording" (text Button) with no status text.

The whole set at 1x: `toolbar-set-966-16408.png` (two columns, Full left, Compact right; rows Ready, Started, Paused, Processing, Closed).

## 2. Start recording
The Start button in Ready Full and Ready Compact (966:16230, 981:19695) now carries the Label property "Start recording" and the layer name `Start recording`. The library Button title-cases its label, so it **renders "Start Recording"** in every frame (visible in the F01 and a shots); the characters are sentence case. The hidden superseded status slot in both Ready variants still holds the old text "Start Transcribing", left as a record.

## 3. F01 pills, and Print
- **Cause: instance overrides, not a variant.** On both F01 copies (Encounter shell 978:4048 and prototype 1004:8208) the Ready toolbar instance is the same variant as every other Ready frame (`Recording state=Ready, Width=Full`, 468:5582). The two pills carried component-property overrides of `Label#83:165` ("SOAP" on the Template pill, "Otto Octavius" on the Assigned To pill) and the toolbar instance had `Show print#966:1` = true. Every other Ready frame (F02, F08, F09, a to j) has no overrides and `Show print` false.
- **Fix:** `resetOverrides()` on the two pill instances of each F01 copy. Read back: Template pill "Template: SOAP" (200 wide), Assigned To pill "Assigned To" (171 wide) on both frames. The prototype copy kept its Start recording reaction.
- **Print:** not touched, as asked. It is shown on F01 only (both copies), and the reason is the `Show print` instance override, **not Width**. Width=Full and Width=Compact both carry the same Print Button-icon, hidden by default (Show print false); no Ready frame's Width decides it. F02, F08, F09, a to j (all Ready toolbar frames) hide it. Shots: `frame-F01-ready-1004-8208.png` shows "Template: SOAP", "Assigned To", Start Recording, mic pill and Print.

## 4. Frame a
`Start recording` in a (`I1004:35118;429:4542;469:9852;966:16230`) -> Started · Problems open 1004:8217, On click, Navigate to, Instant. Read back.

## 5. Reactions check
Re-enumerated every reaction on page 1004:8207 and diffed it by node id and destination against the prototype-wiring table (131 rows).
| | Count |
|---|---|
| Before (wiring report) | 131 |
| After | 132 |
| Lost | **0** |
| Restored | 0 (nothing needed restoring) |
| Added | 1: frame a Start recording -> 1004:8217 |
The edits reused the existing nodes (the status text was reused and reparented; buttons only had property changes), so instance child ids were unchanged and no reaction was lost. The one stored reaction on a renamed node (F01 Start recording) survived.

Reachability from F01 (flow starting point Encounter, read back): **all 20 frames reachable, none without an exit.** New edge: a -> F05. F05 out-edges: F03, a, F06, F07. a now leads to c, F01, e, F02, b, h, F05, f.

## Evidence
- `toolbar-set-966-16408.png` (every variant, 1x).
- `toolbar-started-full-1x.png`, `toolbar-paused-full-1x.png`, `toolbar-started-compact-1x.png`, `toolbar-paused-compact-1x.png`: instance crops of the toolbar band from F03, F04, F05 and F06, 1x.
- Full frames from the prototype page, 1x: `frame-F01-ready-1004-8208.png`, `frame-F03-started-1004-8213.png`, `frame-F04-paused-1004-8215.png`, `frame-F05-started-problems-open-1004-8217.png`, `frame-F06-paused-problems-open-1004-8219.png`, `frame-a-problems-open-1004-35117.png`.

I looked at every shot. Anything that reads wrong, plainly:
1. **In the set shot, the Full Started and Paused variants sit tight:** the status touches the Assigned To pill's right edge (8 gap). It is the variant at its minimum width; in the frames the toolbar is wider and the status sits with room around it.
2. **The time and "Paused · 04:12" are small grey text next to the coloured controls.** They use the existing status ink (`color/text/secondary`, 14) as asked for regular body text; if the time should read as the primary ink, that is a one-token change.
3. **The dot is a small 8 px red disc against the 14 px text,** as specified; it sits centred on the text line.
4. **"Start Recording" renders title case** (library Button), noted above.
