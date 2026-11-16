# Floating encounter recorder study

- Date: 2026-11-16.
- Requested by: Andrew Pennell.
- File: SDE Alpha Prototypes, `ViAWRVVtgkCXzItk0sQ5P0`.
- New page: Study · Floating recorder, `1376:21590`.
- Review start: https://www.figma.com/design/ViAWRVVtgkCXzItk0sQ5P0?node-id=1376-21591
- Figma session: `ee32dc31-d4db-4dc8-86f7-b5921a611235`.

## Design

Preserved the Proto-Chart Header Space source page and created five 1493 × 1033 concept frames with the existing Maya note, patient header, Summary and right module sidebar. The dedicated recorder rail is hidden in these copies. The note begins 72 px higher and grows from 730 to 802 px, ending at its previous lower edge. A smaller clipped text viewport reserves room for the floating control.

The floating recorder stays at a constant right edge of x=682 and y=837, with 64 px height. It ends at y=901, 24 px above the note footer at y=925. The editor viewport ends at y=780, clear of the recorder. Width follows content:

| State | Frame | Width | Controls |
|---|---|---|---|
| Ready | `1376:21591` | 226 | Start recording; microphone settings |
| Recording | `1376:28101` | 335 | Recording indicator, 02:14, Pause, Finish, settings |
| Paused | `1376:29198` | 331 | Paused indicator, 02:14, Resume, Finish, settings |
| Processing | `1376:30295` | 227 | Linked library progress indicator and processing status |
| Review ready | `1376:31392` | 241 | Review AI results; settings |

Each recorder is an instance of a page-local composition below the review frames. Library Buttons, the existing small Icon button, Circular progress, text styles, tokens and Elevation / 8 are retained/reused. This is a proposed composition, not a published library asset. New recorder text uses Akkurat LL. No screenshot is used as an editable UI layer.

## Stored prototype wiring

- Start recording → Recording.
- Pause → Paused; Resume → Recording.
- Finish from Recording or Paused → Processing.
- Processing → Review ready after an illustrative two-second delay.
- Overflow → microphone settings overlay `1376:32625`; Done closes it.

All checked destinations resolve. The source screen's copied reactions were cleared before cloning the remaining states. The settings microphone selector and its descendants were checked and had no inherited reactions. The device field is illustrative and Review AI results is an end-state affordance without a downstream result view in this study. The elapsed time is static; no audio, device selection, persistence or actual processing is implemented. Stored wiring was inspected, not played through.

## Verification and evidence

Visually inspected ready.png and recording.png in full-screen context, plus paused-control.png, processing-control.png, review-control.png and microphone-settings.png. Structural read-back confirms the recorder is clear of the editor and footer in every state, the right sidebar remains present, the dedicated recorder rail is hidden, and all newly composed recorder text uses Akkurat LL. The checked full screens contain no image-filled nodes.

- `verification.json`: state bounds, clearance, font checks and resolved destinations.
- `build.js`: construction script; content-hugging master sizing and final microphone-reaction cleanup were applied afterward and are documented above.
- Two early construction attempts rolled back: a mistyped body2 style key, then an unsupported manual overlay-position argument. Both were corrected before the successful build. No partial study page from those attempts was retained.

Repository guidance was pulled before this batch. Existing Figma pages and library masters were not changed. Named-path commit/push follows this report; the push outcome is reported in chat rather than in a timestamp-only follow-up commit.
