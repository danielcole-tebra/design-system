# Medlist · Comparison F with last activity and detail markers

Added F based on E. Last activity shows recorded event plus MM/DD/YY. Compound and patient-reported markers move to expanded Medication details. Rebalanced Medication/Last activity columns while retaining full names, fixed action positions and all clinical data.

[Review section](https://www.figma.com/design/yh2F6OUgdI6K0risLtKLEQ?node-id=91-10443) · File: yh2F6OUgdI6K0risLtKLEQ

## Timing

Start: 2026-11-15T18:03:17.316Z. Ready to construct: 2026-11-15T18:05:11.620Z. Construction returned: 2026-11-15T18:06:07.211Z. First image: 2026-11-15T18:06:50.234Z. Verified: 2026-11-15T18:09:07.302Z.

Preparation/discovery: 114.304s; construction: 55.591s; verification after construction: 180.091s. First image elapsed: 212.918s; verified elapsed: 349.986s. Actual input wait: 0s (not subtracted). Successful push/completion is reported in final chat.

## Verified

- Eleven native control/header/chip comparisons and391 assertions passed.
- Local F-only set91:10288 has Collapsed91:10289 and Expanded91:10337, with repaired property references and reciprocal CHANGE_TO targets. Other row sets unchanged.
- Grid44/296/176/136/208/80/276 totals1216. Medication usable280 px; Last activity usable160 px. Supply, order, review and actions retain original x positions; action anchors948/1052/1164.
- All ten current medication names fit on one line without truncation; widest source name258 px. All activity strings fit one line. Collapsed rows59 px. Displayed F frame1440×1184.
- All original row properties and source dates retained. Last activity is a separate TEXT property with actual Prescribed event and compact date. No discontinued/renewed/refilled event invented for these records.
- Compound and patient-reported source markers are hidden when collapsed and visible under Medication supporting details when applicable. Full directions, pharmacy, supply, clinician and status data preserved; exact expanded text composition verified.
- All ten rows verified in both states, with source styles, full copy and wiring preserved across roundtrips. No header or row clipping. Timeline remains hidden.
- Medication-name text uses HEIGHT auto-resize, no max-line limit and truncation disabled. Temporary master-width reduction verified the real long name wraps without changing its string; restored to280 px and verified20 px height.
- A–E and working screen snapshots unchanged. Main components and two retained expanded marker specimens sit outside the comparison board. Archive examples moved clear of the widened board.
- Full F, expanded compound/reported cases and full comparison-board screenshots viewed.
- F screen has2342 editable descendants:587 instances,768 frames,266 vectors,720 text nodes,1 rectangle; zero image fills. Counts include retained hidden prior rows.

## Findings and recovery

- DECISION · Owner Daniel; scope Comparison F only; status requested trial applied2026-11-15. Last activity combines recorded event+date. Compound/source markers move into expanded details. Rebalancing retains full medication names; no ellipsis added.
- Longer-name wrapping is a composition choice for F, not a claim about shipping behavior. Current content stays single-line; genuinely longer text can increase row height instead of obscuring strength or dosage form.
- Only Prescribed is present in the supplied source date-type fields. Other event categories discussed by Daniel are not represented as factual patient activity. MM/DD/YY preserves each original calendar date.
- F uses its own local row set, preserving earlier comparison designs. Additional Date property remains stored as source data; Last activity is formatted display copy. Source label is hidden in expanded metadata because event is already visible in Last activity.
- First construction return exceeded tool48000-byte response limit; tool explicitly reported canvas edits uncommitted and safe retry. Retried with a lossless grouped-ID ledger: byInstance prefix + semicolon + each suffix reconstructs all created IDs.
- Initial narrow-width test on nested instance text could not override the inherited width. Repeated the check through temporary F expanded-master width, then restored280 px; all assertions passed. No production-width change resulted.
- Stored wiring and programmatic variant transitions checked; no presentation playback claimed.

## Observable effort

Counts through verification: figmaCalls=11; otherCalls=unavailable; searches=0; technicalRetries=1; canvasCorrections=0; clarificationStops=0; tokens=unavailable.

## Reading

- Figma use/generate-design and generate-library skills; LIBRARY.md Efficient execution and API checks; COMPOSITIONS.md Rows and cards.
- Current row variant structure, component properties, E source rows, measured medication-name widths and textTruncation/maxLines API definitions.
- Existing single-line build reference for clone property-reference repair.

## Evidence

Compact readback and source metrics: [record.json](record.json). Screenshots:

- [comparison-f.png](comparison-f.png)
- [expanded-markers.png](expanded-markers.png)
- [comparison-board.png](comparison-board.png)

One fixed-build run; not evidence of a general speedup.
