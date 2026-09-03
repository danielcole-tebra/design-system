# Change log component — build batch, 2026-09-02

Batch `npveRebuild_changelog_2026-09-02`. Target `fdCQVFdvOByaOYIJYag0d6` (NPVE Rebuild), page Templates `3:2`. Library `YX2n4YLrEpBXNbcc73T6dw` read only: one component (Divider orientation=horizontal, key `0143de7b…`) and fifteen variables imported by key inside the build script. Source file not touched. Schema record written by `apply-npve-changelog.js` after backup `design-system-schema.backup-2026-09-02-pre-npve-changelog.json`. Flags now 162.

## Step 1. Components built

**Change log/Row** `18:103` at (0, 300), 448×37, hug height. Root VERTICAL, gap bound space/0, no fill. Child `Cells` HORIZONTAL, FILL width, padding top/bottom bound space/8, left/right bound space/0, gap bound space/12, top-aligned. Three TEXT cells, Akkurat LL Regular 14/20, each bound font/family/base, font/size/body2, font/lineHeight/body2, font/weight/regular, auto-resize height:

- `What` fixed 120, fill bound color/text/primary
- `From to` FILL (184 wide inside a 448 row), fill bound color/text/primary
- `Why` fixed 120, fill bound color/text/secondary

Then `Row divider`, a Divider instance at FILL width. Properties `What#18:0`, `From to#18:1`, `Why#18:2` (TEXT) drive the three cells' characters. Screenshot `step1-row-master-18-103.png`.

**Change log** `18:109` at (0, 420), 480×94 with its one row, hug height. Root VERTICAL, width 480, padding 16 all sides bound space/16, gap bound space/0, fill #FFFFFF bound color/background/paper, stroke 1 inside on all sides #D6D6D6 bound color/divider, radius 0. Children: `Title` TEXT "Changes: Sidesheet" Akkurat LL Bold 16/24 bound font/family/base, font/size/body1, font/lineHeight/body1, font/weight/bold, color/text/primary; `Title divider` (Divider, FILL); `Rows` VERTICAL FILL-width frame, gap bound space/0, holding one `Change log/Row` instance. Property `Title#18:3` (TEXT). Screenshot `step1-changelog-master-18-109.png`.

Unbound: letter spacing 0% on every text node (no letter-spacing variable exists). No h4 token exists in the Typography collection (sizes caption 12, chip 13, body2 14, buttonLarge 15, body1 16, h3 20, h2 24, h1 32), so the title binds body1 size and line height with weight bold. Flag `npveChangelog_noH4Token`.

## Step 2. Placed change log

`18:135` at (1300, 0), 480×630, to the right of the Sidesheet master `6:65` (700, 0). Nine rows `18:139` … `18:187`, text set verbatim from the prompt.

The prompt expected rows to be added on the instance by duplicating. Figma refused: appending a second `Change log/Row` into the instance's Rows frame threw `in appendChild: Cannot move node. New parent is an instance or is inside of an instance`. There is no slot API in this Plugin API build. The script's fallback detached the placed instance into a plain frame (all bindings kept), named it `Change log — Sidesheet (detached: instances cannot host added rows)`, and appended eight more Row instances. Each row is still a live instance of `Change log/Row`, so cell styling propagates; container changes on `Change log` will not reach placed copies. Flag `npveChangelog_placedLogIsDetached`, medium, needs a decision before the next rebuilt frame gets its change log. Alternative if instances must stay instances: a fixed row count on the master with `Show row N` booleans.

Screenshot `step2-changelog-sidesheet-18-135.png`, 480×630 at 1x, looked at: bold black title, thin grey rule, nine divider-separated rows, grey third column. Every wrap is at a word boundary; nothing clips or overlaps.

Wrap report at the built widths (What 120, From to 184, Why 120, gap 12):

| Row | From to lines | Why lines |
|---|---|---|
| Header | 2 | 2 |
| Close button | 2 | 1 |
| Back button | 2 | 1 |
| Sheet border | 2 ("only" alone) | 1 |
| Footer | 2 | 2 |
| Middle button | 2 | 3 ("component" alone) |
| Button labels | 2 | 2 |
| Hidden layers | 3 ("carried" alone) | 3 |
| Body | 3 ("own" alone) | 3 |

Judgement: no bad wraps. The From to cell at 184 is the constraint; a 560-wide component would give it 264 and bring most rows to two lines. Not changed, per the prompt.

## Step 3. CLAUDE.md

Rule 14 added after rule 13, as written in the prompt.

## Step 4. Standing batch rules 1, 2, 5, 9

Scope: `18:103`, `18:109`, `18:135`, root plus every descendant, `skipInvisibleInstanceChildren = false`.

- Rule 1 PASS. Placed frame and nested Row instances read the same paints as the masters: root #FFFFFF color/background/paper, stroke #D6D6D6 color/divider, title and primary cells #000000 color/text/primary, Why #545454 color/text/secondary.
- Rule 2 PASS. Visible solid paints: Row 4, Change log 8, placed 40; none unbound.
- Rule 5 PASS. No paint below opacity 1.
- Rule 9 PASS. No bound paint opacity touched; all 1.00.
- Rule 4 check: no fractional x, y, width or height on any node in the three trees.

## Files

- `C:\Code\design system\figma-export\npve-changelog-2026-09-02\step1-row-master-18-103.png`
- `C:\Code\design system\figma-export\npve-changelog-2026-09-02\step1-changelog-master-18-109.png`
- `C:\Code\design system\figma-export\npve-changelog-2026-09-02\step2-changelog-sidesheet-18-135.png`
- `C:\Code\design system\apply-npve-changelog.js`
- `C:\Code\design system\design-system-schema.backup-2026-09-02-pre-npve-changelog.json`

- Amendment 2026-09-02: rule 14 replaced to state the detached-frame convention; flag `npveChangelog_placedLogIsDetached` resolved via `apply-npve-changelog-rule14.js` (backup `design-system-schema.backup-2026-09-02-pre-rule14-amendment.json`). No Figma writes.
