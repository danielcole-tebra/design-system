# Past Medical History section — pilot report

Status: complete and awaiting operator review before the body/sidesheet pilot begins.

## Outcome

- Built `Past medical history section` as a reusable 518×112 vertical component.
- Exposed editable `Heading` text and retained the nested approved rows' `Condition` and `Comment` properties.
- Rebuilt the exact Eyes example with Blindness/Empty and Cataracts/Filled live row instances.
- Applied 8px between the 20px heading and the contiguous 42px row list.
- Added frozen/live/change helpers and one compact shared-master comparison on Screens.
- Left tokens, published library components, the approved row master, shared comparison APIs, and the sidesheet body untouched.

## Source-backed differences

- Heading-to-list spacing: source 0px → rebuild 8px, applying the established NPVE tight-relationship rule.
- Condition rows: source legacy 32px rows → approved live 42px rows, preserving their supported touch targets and comment states.

These are applications of already approved system rules, not new decisions introduced by this batch.

## Validation

- File identity matched the four-page NPVE target inventory.
- Every page was walked with invisible instance children included.
- No fractional authored geometry was found.
- New product nodes contain no unbound solid paints; only the two organizer sections use the established raw organizer fill/stroke.
- The master contains five expected component-property references.
- The proof renders EYES, Blindness/Empty, and Cataracts/Filled from stored properties.
- Ten master/instance solid paints matched exactly, including bound-variable identity and effective alpha.
- The executor inspected the proof and comparison renders.

## Pilot measurement

This second low-risk item completed with one correction cycle, down from nine on the first item. The correction was caught by the mandatory initial render before comparison work: a transparent component exposed the organizer background. Reusing the approved row's bound paper fill resolved it without a new token or design decision.

## Evidence

- `comparison.png` — operator-facing reference/rebuild/change packet
- `proof.png` — live section proof instance
- `source-section-129-9315.png` — frozen source crop
- `audit.json` — deterministic evidence and tool-call measurement

Stop condition: met. The body and sidesheet were not mutated. Operator review is required before `pilot-pmhx-body-sheet` starts.
