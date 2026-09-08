# Past Medical History condition row — pilot report

Status: complete and awaiting operator review before the section pilot begins.

## Outcome

- Built `Past medical history condition row` as a two-variant component set: `Comment=Empty` and `Comment=Filled`.
- Kept the 518px content width and used a 42px row so the published Checkbox and Icon button retain their supported touch targets.
- Exposed editable `Condition` text and an explicit, source-backed `Comment` state.
- Used live published Checkbox, Icon button, ChatOutlined, ChatFilled, and Divider dependencies; no control was detached or redrawn.
- Added state proofs for Trauma and Cataracts, frozen/live comparison helpers, one plain-language change row, and the sole comparison on Screens.
- Left shared component APIs and the shared comparison master unchanged.

## Intentional difference

The source row is 32px high, but the subscribed Checkbox is 42px. The rebuild records the row as 42px rather than shrinking the published touch target. Visible glyph size and horizontal relationships remain faithful to the reference.

## Validation

- File identity matched the four-page NPVE target inventory.
- All pages were walked with invisible instance children included.
- No fractional authored geometry was found.
- New product nodes contain no unbound solid paints; only the two established organizer sections use raw organizer fill/stroke.
- Both variants have matching property-reference counts.
- Trauma/Cataracts rendered labels and empty/filled icon states match their instance properties.
- Master-to-instance paint comparisons returned zero mismatches for both variants.
- The executor inspected the comparison and state renders.

## Pilot measurement

The lean contract reduced startup context from 1,340,696 bytes to 54,805 bytes (95.9%). This first live item still incurred nine correction cycles, chiefly from undocumented Figma property-forwarding and comparison-slot behavior. Those are now concrete workflow findings for the pilot retrospective; they do not change the approved component result.

## Evidence

- `comparison.png` — operator-facing reference/rebuild/change packet
- `states.png` — empty and filled live proof instances
- `source-row-129-9306.png` — frozen source crop
- `audit.json` — deterministic evidence and tool-call measurement

Stop condition: met. No section or body component was mutated. Operator review is required before `pilot-pmhx-section` starts.
