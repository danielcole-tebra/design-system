# Encounter Note header layout — 2026-09-08

Schema record: `npveRebuild_noteHeaderLayout_2026-09-08`. Backup: `design-system-schema.backup-2026-09-08-pre-npve-note-header-layout.json`. Apply script: `apply-npve-note-header-layout.js`.

Target `fdCQVFdvOByaOYIJYag0d6` written. Source `zVsuhYehoSLLq880qRBFkq` and library `YX2n4YLrEpBXNbcc73T6dw` read only. Record gate: `npveRebuild_moduleChipRelationshipSpacing_2026-09-06` recorded DONE — passed.

Stop condition: stop if Title or Status text properties break, the placed Note instance detaches, the card changes from 831×748, toolbar/body/footer alignment breaks, or a new icon stand-in is required. No stop condition triggered.

## Outcome

The Note card header now models the relationships visible in the interface instead of relying on a fixed spacer. The title identity stays at the left edge; Auto-saved and the two actions stay at the right edge. The header uses the approved base-8 spacing rule even though that makes it 8 px taller than the source.

The existing toolbar was not redesigned. Its responsive grouping was already correct. Its documented icon and 38-versus-42 px library differences remain open.

## Source and decision

| Item | Source | Rebuild decision |
|---|---|---|
| Note card | 831×748 | Remains 831×748 |
| Header | 65 px including its boundary; 12 px top/bottom, 16 px left/right | 72 px header plus 1 px divider; 16 px on all four sides |
| Title behavior | A fill-width title group pushes status/actions right | Explicit left identity and right status/action groups with `SPACE_BETWEEN` |
| Title relationship | Shield and title are one identity | Existing 40 px shield/lock control + title at `space/8` |
| Status relationship | Dot and label are one status | Existing Auto-saved group retained at `space/8` |
| Action relationship | Expand and Close sit at the right edge | Existing 40 px action buttons grouped at `space/8` |
| Semantic separation | Source uses a legacy 26 px top-row gap | Status group to action group uses `space/16` |

## Figma changes

| Node | Change |
|---|---|
| Note card `424:4362` | Remains 831×748; component API unchanged |
| Header `424:4363` | `SPACE_BETWEEN`, 16 px padding all sides, height 72 |
| Header identity `500:5745` | New auto-layout group; existing shield/lock and Title at 8 px |
| Header status and actions `500:5747` | New auto-layout group; Auto-saved and actions at 16 px |
| Header actions `500:5746` | New auto-layout group; existing Expand and Close at 8 px |
| Spacer `424:4370` | Hidden and renamed superseded; not deleted |
| Change-log row `505:5754` | Added to the existing Encounter helper as a live `Change log/Row` instance |

Downstream positions after the taller header:

| Region | Before | After |
|---|---:|---:|
| Header divider y | 64 | 72 |
| Toolbar y | 65 | 73 |
| Body y | 123 | 131 |
| Body height | 550 | 542 |
| Footer divider y | 673 | 673 |
| Footer y | 674 | 674 |

The body absorbs the 8 px header increase. The footer and total card height do not move.

## Component API and propagation

The six Note card properties remain unchanged:

- `Title` TEXT
- `Status text` TEXT
- `Body content` INSTANCE_SWAP
- `Show footer` BOOLEAN
- `Show toolbar` BOOLEAN
- `Toolbar content` INSTANCE_SWAP

The Title and Status text property references remain attached to their original text nodes after reparenting. The sole placed Note instance `I434:7474;434:4866;434:4394;429:4542` remains linked to master `424:4362`, stays 831×748, and retains all six values.

## Visual verification

`comparison-note-header-toolbar.png` is the primary side-by-side review image. It shows the original 12 px source header at left and the normalized 16 px rebuild at right. The right-side cluster is now correctly anchored. No text or controls are clipped.

The standalone rebuilt Note master was compared with the 831×748 crop of the Note inside `Page/Encounter`. There are 78 differing pixels out of 621,588. They are confined to the four outer rounded-border/crop antialias edges; the internal component render is identical.

## Standing rules

| Rule | Result |
|---|---|
| 1 — Instance paint verification | PASS — master and placed page instance rendered after the edit |
| 2 — Unbound paint audit | PASS — 27 authored nodes, zero unbound solid paints |
| 3 — Reference counts | PASS — one placed Note instance, one added change-log row, unchanged component API |
| 4 — Invisible instance traversal | PASS — `skipInvisibleInstanceChildren=false` on every walk |
| 5 — Opacity last | PASS — no opacity changed |
| 6 — Enumerate, do not recall | PASS — source, target, variables, properties, and placement read live |
| 7 — File identity first | PASS — target explicit; source/library read only |
| 8 — Round with record | PASS — backup before write; zero fractional authored geometry |
| 9 — Bound-paint alpha | PASS — no paint changed |
| 10 — Clone/property references | PASS — existing nodes reparented, not cloned; references survived |

## Findings

- GAP count remains 5. No new marker was required.
- The source-only shield-lock, expand, template-list, person-heart, and microphone glyphs remain documented library gaps.
- The rebuilt toolbar continues to use the approved library Button dimensions and existing stand-in glyphs. This batch did not change them.
- DEFECT count for this batch: 0. The existing fixed-header-spacer finding is resolved in the schema.

## Screenshots

- `comparison-note-header-toolbar.png`
- `source-note-header-toolbar.png`
- `rebuild-note-header-toolbar.png`
- `source-note-card-4841-17104.png`
- `rebuild-note-card-424-4362.png`
- `placed-note-card-from-page.png`
- `source-encounter-4841-17077.png`
- `rebuild-encounter-429-4161.png`
- `comparison-encounter-434-7474.png`
