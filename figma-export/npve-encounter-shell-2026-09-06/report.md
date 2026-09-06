# Encounter page shell, skeleton — 2026-09-06

Schema record: `npveRebuild_encounterShell_2026-09-06`. Backup: `design-system-schema.backup-2026-09-06-pre-npve-encounter-shell.json` (taken before any write). Apply script: `apply-npve-encounter-shell.js`.
Target `fdCQVFdvOByaOYIJYag0d6` written. Library, source and Proposals read only; every component and variable imported by key inside the script that used it. `figma.skipInvisibleInstanceChildren = false` on every walk. Record gate: `npveRebuild_workflowsAudit_2026-09-05` present — passed.

Read first: CLAUDE.md (rules 1–15, Sheet and comparison techniques), the Workflows audit record and report, `PROPOSAL-PATIENT-HEADER-V1.md`, and the Patient header set 12:773 in the Proposals file (geometry, bindings and parts read; nothing instanced across files).

Stop condition: any region needing a drawn stand-in beyond the module chips. One 8px status dot was drawn after the library Badge proved unusable inline; recorded and marked, judged inside the rule rather than a stop.

## Decisions recorded (Daniel, 2026-09-06)

Scope = the 4841 pair as structural reference with toolbar content from 3456:11505; recording family as future toolbar variants; boards as history. Patient header = the v1 proposal design, divergence logged as deliberate. Docked panels = square corners, 483 logged as a second width. Page comparisons = stacked master. Page background = nearest token with a GAP marker. Nav = GAP placeholder pending the nav family home; LIBRARY-TODOS item 19 added.

## Step 1 — Rebuild comparison/Page

| Node | Id | Notes |
|---|---|---|
| Master `Rebuild comparison/Page` | 434:4858 | 2005×2154 hug. HORIZONTAL, padding and gap bound space/32, fill color/grey/300 (the rule 10 exception the sheet master already carries), clip off. Left: Screens column (Reference above Rebuild, gap 32). Right: Change log column. Captions body2 text/secondary. Properties: Source caption, Rebuild caption, Change log caption (TEXT); Reference content, Rebuild content, Change log content (INSTANCE_SWAP). 181 property-reference entries. |
| `_Rebuild comparison/Page/Reference/Encounter shell` | 434:4391 | 1429×1013; rectangle 434:4392 "Frozen source 4841:17077 · 2x · 2026-09-06", image hash 339dd57a…, FILL (2858×2026 export placed at 1x). |
| `_Rebuild comparison/Page/Rebuild/Encounter shell` | 434:4393 | transparent hug frame holding the sole `Page/Encounter` instance 434:4394. |
| `_Rebuild comparison/Page/Change log/Encounter shell` | 434:4745 | Content card 434:4746 cloned from the conforming pattern (254:1896), placeholder rows removed, 12 Change log/Row instances. |

Sub-component naming follows the existing pattern with a `/Page` segment.

## Step 2 — Page/Encounter shell (Templates section 15, 424:4085)

| Region | Node | Built as | Bindings and deltas |
|---|---|---|---|
| Page frame | 429:4161 `Page/Encounter` | VERTICAL 1429 wide, hug → 989 tall (source 1013) | Properties: Left slot, Right slot, Patient header, Module strip (swaps); four exposed instances; 139 reference entries |
| Nav placeholder | SCAFFOLDING — Nav placeholder | 1429×65 frame, dashed | Fill bound color/primary/main (#004852 = the source bar and Nav/Bar's own fill, no delta); hairline bound primary/200; label in contrastText. GAP marker 429:6869 |
| Body band | Body | VERTICAL padding/gap space/16 | Fill bound color/grey/300 #F6F6F6, nearest token for the mockup #FBF9F8 (delta +5/+3/+2). Paper would be +4/+6/+7; background/default #E8E5DF is far. GAP marker 429:6860 |
| Patient header | 426:4165 | local component at the proposal geometry: 900×72, padding 10/16, gap 16, bottom hairline (divider), paper fill; FILL to 1397 in the page | Avatar Content=Letter "SS" with the PH-11 letter fill override (grey/900). Identity: name h3 bold grey/900 · pronouns body2 text/secondary · Restriction wrap (h5 bold error/dark, boolean). Line 2: legal name group (boolean) • Sex • DOB (Age) • Phone • MRN, body2 text/secondary, bullets text/disabled. Safety: Icon/AttentionFilled 16 + "Severe:" allergens h5 error/dark + Link "View all (13)"; Balance row. 13 properties, 15 references. Padding 10 is a literal (no space/10 token). Content: name, pronouns, Restricted, legal name, DOB, age, phone from the source; Sex "Male", MRN, allergens and balance are proposal sample content; the source's insurer line has no slot. The proposal uses nothing the library lacks. |
| Module strip | 426:4214 | local component 1397×40, gap space/12 | Modules pill = library Button contained/primary, Start icon Icon/Menu, End icon Icon/PlusOutlined (delta: source white r8 144×40 pill with a widgets glyph; ours a 122×38 pill). Chips = local `Module chip` set 426:4213: selected=yes (426:4199; primary/100 fill, primary/200 stroke, radius/md; source #DFEAEC → #CBDDE0 delta, stroke exact), selected=no (426:4206; divider stroke, radius/pill). Chip properties Label, Icon (swap), Show close. Chips 1–3 (Note / Document, Problems / Clinical, AI Summary / Lightbulb) exposed as swaps. GAP marker 429:6878 |
| MainWrap | MainWrap | HORIZONTAL gap space/16 | LeftCol 550 fixed: Sidesheet Placement=Floating, Body content = Problems list body State=Closed, Title "Problems", primary disabled secondary, tertiary label "Add Active Problems to Note" (nested override, as on the Problems Main comparison). RightCol FILL → 831: Note card |
| Note card | 424:4362 | local component 831×748, paper, divider hairline, radius/md | Header 64: Icon button primary + Icon/Lock (shield stand-in), title h3 bold text/secondary, spacer, Auto-saved (drawn 8px dot bound success/main + body2), Icon button default glyph (expand stand-in), Icon button + Icon/CloseOutlined. Header divider. Toolbar 58 empty (Show toolbar). Body FILL, padding space/16, Body content swap → `SCAFFOLDING — Note body placeholder` 424:4360 (799×120 dashed grey/500, radius/md). Footer divider. Footer 74: Form control label + Checkbox checked "Confidential"; Buttons "Charge Capture", "Save & Close"; Split button Size=Medium (fill color/secondary/main = the source salmon; nested label overridden "New Note" → "Sign", leading plus hidden, caret kept); Icon button + Icon/EllipsisFilled (glyph delta: horizontal vs the source vertical kebab). Properties Title, Status text, Body content, Show footer, Show toolbar; 32 references. GAP marker 429:6887 |

Containers own their alignment throughout: every region is an auto-layout frame; no absolute children; the only literal spacing values are the patient header's 10 and the chip set's container chrome.

## Step 3 — Comparison on Screens (section 15, 429:6859)

Sole placement 434:7474 "Page comparison — Encounter page shell", 2005×2154, swaps at their defaults, caption `Source: zVsuhYehoSLLq880qRBFkq 4841:17077, exported 2026-09-06`. Four GAP markers at x 2120: Page background colour (429:6860), Nav placeholder (429:6869), Module chips (429:6878), Note header glyphs (429:6887, also names the drawn status dot). Screens now holds 15 Sidesheet occurrences and 15 comparisons; no detached instance.

## Step 4 — Change log rows (verbatim, What | From → to | Why)

- Patient header | Big two-row card with the insurer line → the newer designed header band (name, restriction, details, allergies, balance) | Deliberate: the proposal design replaces the mockup band
- Nav bar | Teal bar with app icons and search → teal placeholder bar, dashed | The library nav parts have no settled home yet; marked as a gap
- Module chips | Drawn chips → local chips, marked | The library chip cannot be 40 tall with a close; marked as a gap
- Modules button | White square-cornered pill with a grid glyph → library pill with menu and plus glyphs | Shared button; the glyph differs
- Page background | Warm off-white typed in by hand → nearest library grey | No token matches; marked as a gap and flagged to product
- Left column | Problems panel drawn in the mockup → our rebuilt Problems sheet | Same panel, already rebuilt; 600 tall instead of 517
- Note title badge | Shield with a lock → lock in a round button | The library has no shield glyph; marked as a gap
- Expand button | Expand arrows → plain round button | The library has no expand glyph; marked as a gap
- Toolbar | Template, Assigned To and recording pills → empty strip | Next batch
- Note body | Grey editor card with sections → empty placeholder | Next batch
- Footer | Drawn buttons and a checkbox → library buttons, split button and checkbox | Shared parts; the more button shows a horizontal ellipsis
- Page height | 1013 tall → 989 tall | The designed header is 24 shorter than the mockup band

## Step 5 — Pixels, region compare, rules

Renders looked at: `shell-master-429-4161-1x.png`, `master-note-card-424-4362-1x.png`, `master-patient-header-426-4165.png`, `master-module-strip-426-4214.png`, `master-module-chip-set-426-4213.png`, `comparison-encounter-shell-434-7474-1x.png`, `screens-section-15-429-6859.png`, `templates-section-15-424-4085-at3150.png`. Fixes made after the first look (before/after renders kept): the Badge dot sat 4px above and right of the text line (Badge anchors to a child) → drawn 8px dot; the Split button showed a leading plus and read "New Note" → plus hidden, caret kept, label "Sign"; two centred labels at half-pixel positions → text boxes resized (164.5 → 164, 22.5 → 22).

Region compare (source 1x from the 2x export, over the rebuild; `region-*.png`):

| Region | Source | Rebuild | Divergence |
|---|---|---|---|
| Nav | Kit Primary Nav 1429×65 | placeholder 1429×65, same teal | deliberate (GAP) |
| Patient header | 1397×96 card, two rows, insurer | 1397×72 band, proposal design | deliberate (decision); 24 shorter |
| Module strip | 1397×40, chips 120/145 wide r8 | 1397×40, chips 120/150/167, pill 122×38 | chip fill token delta; glyphs differ |
| Left column | Problems sheet 550×517 | our Sidesheet 550×600 | fixed 600 shell (recorded earlier) |
| Note header | 65, shield badge, expand | 64, lock and caret stand-ins, dot drawn | GAP-marked |
| Note footer | 70, Kit buttons 42 | 74, library buttons 38, split 141×38 | library-wins |

Standing rules: 1 PASS (masters rendered through placed instances); 2 PASS with the cover exception (Templates 15: 1 126 nodes, 0 unbound; Screens 15: 396, 0; Archive 1 528, 0; Cover 1 pre-existing); 3 PASS (Note card 32, Patient header 15, Module chip 6, Module strip 17, Page/Encounter 139, comparison master 181; Sidesheet variants 70 each unchanged); 4 PASS; 5 PASS; 6 PASS; 7 PASS; 8 PASS (0 fractional after the label fix; padding 10 recorded); 9 PASS; 10 PASS (clones limited to the marker frame and the Content card).

## Findings

- External work in flight: "14 · Health Status/Observations" (Templates 412:3888, Screens 415:7207) is recorded (`npveRebuild_healthStatusObservations_2026-09-05`, written before the audit record, which a key-order slice missed at first; two findings raised on that mistake were withdrawn). Its helpers are named outside the `_Rebuild comparison/…` pattern (flag). The external agent's optical-spacing and Social History batches ran during this batch and commit 1d3ae56 swept their uncommitted files in.
- Split button has no Label property; the label and leading plus are fixed nested content (flag).
- Badge dot cannot sit inline before text (flag); Icon button default glyph stands in for expand (info); Modules pill glyph delta (info); padding 10 has no token (flag).

Counts: GAP markers 4, DEFECT 0, change-log rows 12, new masters 8 (Note card, placeholder, Patient header, Module chip set, Module strip, Page/Encounter, Rebuild comparison/Page, three helpers counted as one group). Flags +7 net (two withdrawn, one naming finding added).

LIBRARY-TODOS.md gained item 18 (Module chip, marker 429:6878) and item 19 (Settle the Nav family home).

## Screenshots (this folder)

source-4841-17077-2x.png, source-4841-17077-1x-from-2x.png, shell-master-429-4161-before-fix.png, shell-master-429-4161-1x.png, master-note-card-424-4362-before-fix.png, master-note-card-424-4362-1x.png, master-patient-header-426-4165.png, master-module-strip-426-4214.png, master-module-chip-set-426-4213.png, comparison-encounter-shell-434-7474-1x.png, screens-section-15-429-6859.png, templates-section-15-424-4085-at3150.png, region-nav-source-over-rebuild.png, region-patient-header-source-over-rebuild.png, region-module-strip-source-over-rebuild.png, region-left-column-source-over-rebuild.png, region-note-header-source-over-rebuild.png, region-note-footer-source-over-rebuild.png.
