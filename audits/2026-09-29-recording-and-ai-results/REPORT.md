# Recording states and AI Note Results body, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6` (writes, additive). Source and library read only. Nothing deleted; superseded pieces are renamed `_Superseded · …`. No design question stopped the batch; the open ones are at the end.

## 0. H1 Button
No library Button value inks grey (text variant: primary and secondary ink primary/main, error red, inherit white). H1 left teal on all four variants. GAP npveNoteToolbar_h1ButtonNoGreyInk. `s0-note-editor-toolbar-set-955-15327.png`.

## 1. Recording states, Note toolbar set 966:16408
Variants (all 42 tall): Ready 468:5582 (799, default), Started 966:16237 (916), Paused 966:16289 (908), Processing 966:16341 (799), Closed 966:16372 (799). Left side is identical everywhere. Proof instances in 967:25480, each read back with the right Recording state.

| State | Right side, as the source draws it |
|---|---|
| Ready | text Button "Start Transcribing" with RadioButtonChecked, mic pill |
| Started | italic "Transcription in Progress", vertical Divider, Cancel (error), Pause (PauseCircleOutline), Finish (StopCircleOutlined), mic pill |
| Paused | italic "Transcription Paused", Divider (the source draws one), Cancel, Resume (PlayCircleOutline), Finish, mic pill |
| Processing | italic "Processing AI Transcriptions", mic pill; the source's Pause, Finish and menu are hidden |
| Closed | "View AI Recording" (a text Button; the source is a 16 Regular teal link); no mic pill (the source has none) |

Ready glyph: the source draws radio_button_checked, which matches MUI RadioButtonChecked. Built as `Icon/MUI/RadioButtonChecked` 965:694 from @mui/icons-material 5.15.12, unedited path, vector at (2,2), SCALE constraints, bound fill. The invented piece 469:5827 and its instance are renamed `_Superseded`; GAP npveEncounter_transcriptionStatusInvention struck.

Findings: Started and Paused need 916 and 908 and do not fit the 799 card (source card is 1397 wide). Button ink and weight differ from the source controls (primary/main Regular 16 against primary/light Bold 14). Italic status is a token-bound text node, flagged. Note card still 831 x 748. Screenshots: `s1-compare-{ready,started,paused,processing,closed}-source-above-1x.png` (source above, instance below), `s1-toolbar-set-966-16408.png`.

## 2. AI Note Results body
- `AI result section` set 969:16275 (new section `35 · AI Note Results` 969:16238): heading row (h4 title, right-aligned action area) over body text. Action = Add ("Add Section"), Append or replace ("Append to Section", "Replace Section"), Added (italic "Added to Note"); TEXT Title and Body. 518 x 228 each. `s2-ai-result-section-set-969-16275.png`.
- `AI Note Results body` 969:16276, 518 x 744: library Alert warning (outlined) with dismiss, then Subjective (Add), Objective (Append or replace), Assessment (Added) in a clipping 680 tall list; the last section clips as the source does. `s2-ai-note-results-body-969-16276.png`.
- Sheet 943:16231 Body content set to the new body. It was the only instance of the placeholder in the file (Encounter shell, Screens, Templates scanned). 943:14940 renamed `_Superseded`. Footer stays "Add All to Note". `s2-frame-943-15819-vs-source-1x.png` (source left, rebuild right).

Re-grid from source: gaps 20 and 18 to 16, title 18 to 16 Bold, padding 8 kept. Visible differences: the Button title-cases labels ("Append To Section"), heading row 36 against 24, Alert outlined-warning colours, sheet 550 against 483 wide, and the note area behind the sheet is the Note body build.

## Open for Daniel
1. How Started and Paused fit the 799 card (wrap, small Buttons, or a menu).
2. Whether the library Button should get a grey ink value (H1) and a light-primary Bold text variant for the recording controls.
3. The Alert outlined-warning colours against the source.
