# Walkthrough video: title, recap and audio cleanup

Created two chromatic, stretched-type graphics using the built-in image-generation tool and Daniel's supplied poster as style reference. Opening text: “LET'S BUILD.” Closing text: “YOUR TURN.” with Set up your space / Rebuild with the library / Review what changed. Exact prompts: [title-prompt.txt](title-prompt.txt) and [summary-prompt.txt](summary-prompt.txt).

## Delivered files

- Title: ../../assets/onboarding/walkthrough-title.png
- Summary: ../../assets/onboarding/walkthrough-summary.png
- Finished video (local delivery, not committed): C:/Users/coled/Videos/Tebra walkthrough/Tebra-walkthrough-finished.mp4
- Standalone card copies: C:/Users/coled/Videos/Tebra walkthrough/01-title.png and 02-summary.png
- Source retained: C:/Users/coled/Videos/2026-11-02 13-07-45.mp4

Finished MP4: 3828 × 2148, H.264, 30 fps, stereo AAC 48 kHz/192 kbps, fast-start metadata, 361.566667 seconds, 49,507,531 bytes. SHA256 C1FE4F026FA6F8EE51E4071D1E7B8AA3200178FA6EF808147C0FD29552D11780. Source is 349.55 seconds at 60 fps; export samples 30 fps without cropping the source. Generated art is 1672 × 941 and scaled to video dimensions.

## Video assembly

Four-second title with a 0.3-second fade in, complete original recording with cleaned audio, then eight-second recap with a 0.5-second fade out. Original narration is shifted exactly four seconds, with no speech cuts. Title/recap are silent. [render-video.py](render-video.py) records the export command.

## Audio

FFmpeg 9.0 processing: 75 Hz high-pass for low-frequency plosive/rumble energy; adeclick threshold 3 for impulsive noise; measured loudnorm pass targeting -16 LUFS, -1.5 dBTP and LRA 11. The click detector identified 98,326 / 33,554,400 samples (0.293%). Detection count is not a subjective claim that every audible pop was eliminated.

Pre-normalization measurement after cleanup: -26.26 LUFS, -0.09 dBTP, LRA 9.4.
Final AAC measured by a fresh full-file decode: -16.60 LUFS, -1.28 dBTP, LRA 6.0. AAC reconstruction raises peaks slightly above the processing ceiling; exported peaks remain below 0 dBFS.
Processing commands: [process-audio.ps1](process-audio.ps1). Listening quality was not independently verified; measurements establish loudness/peak behavior.

## Figma

[Walkthrough](https://www.figma.com/board/uKNQ26ndMmK3c58oIaaBdh?node-id=37-2), file uKNQ26ndMmK3c58oIaaBdh. Added image nodes 37:2 and 37:3 at the beginning/end. Preserved Daniel's live order (Connect Figma before the separate-work-folder card), without rewriting his steps. Shifted existing visible content down and corrected the existing intro/link overlap. No nodes deleted. Current docs were not renumbered in this artwork task.

## Verification

- Inspected generated art text and the three FigJam renders (title, recap, board).
- Live readback confirms both image hashes, preserved card order, no top-level overlap/overflow.
- Inspected exported video frames at 3.9, 4.1 and 353.7 seconds, confirming opener, source start and closing recap.
- Full video/audio decode completed without decode errors; ffprobe confirms duration, streams and dimensions.
- One initial audio-check attempt occurred before the MP4 finalized and failed to open it. Repeated after encode completion; final decode and measurement succeeded.
- Sampled source frames at 15, 170 and 330 seconds to ground the recap; no full transcript or semantic speech review claimed.

Evidence: [figma-evidence.json](figma-evidence.json), [update-board.js](update-board.js), [title](title.png), [summary](summary.png), [board](board.png). Export and analysis logs remain alongside the local video. No benchmark timing claimed.
