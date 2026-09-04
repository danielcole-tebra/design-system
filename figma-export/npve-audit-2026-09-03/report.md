# NPVE rebuild — read-only audit of post-pause work, 2026-09-03

Batch id `npveRebuild_audit_2026_09_03`. Target `fdCQVFdvOByaOYIJYag0d6` read only (no node created, moved or edited; pages loaded with `loadAsync`, never switched). Library `YX2n4YLrEpBXNbcc73T6dw` read only. Source not opened. `figma.skipInvisibleInstanceChildren = false` on every walk. Every count below is enumerated from the file in this batch; nothing is carried from the prompt or from earlier reports.

Screenshots (this folder, all PNG, 1x unless stated):

- `page-templates-3-2.png` — Templates page, 3632 × 12112 natural, capped to 1200 wide
- `page-screens-27-2.png` — Screens page, 1868 × 7100 natural, capped to 1053 wide
- `page-archive-126-2.png` — Archive page, 3108 × 4313 natural, capped to 2883 wide
- `step3-legacy-screen-27-6-1x.png` — Clin_Problems-Recent 27:6 as it now sits in Archive
- `step4-problem-summary-row-153-1186-1x.png` — Problem summary row master
- `step4-problems-list-body-156-2426-1x.png` — Problems list body set, both variants
- `step5-comparison-recent-116-498-1x.png` — comparison instance, Problems picker · Recent
- `step5-comparison-status-menu-160-3680-1x.png` — comparison instance, Problems list · Status menu

## File identity

Pages read: Cover 0:1, Templates 3:2, Screens 27:2, Archive 126:2. Local variables: 0. Local collections: 0. Every bound variable is an import from Design System Rebuild (three library collections visible: Tebra/Color, Tebra/Dimension, Tebra/Typography).

| Page | Top-level | Nodes walked |
|---|---|---|
| Cover | 1 frame | 8 |
| Templates | 5 sections (01 Sidesheet shell, 02 Problems picker, 03 Problems management, 04 Change log utilities, 05 Rebuild comparison) | 2284 |
| Screens | 3 sections (01 Current comparisons, 02 Problems management, 03 Problems management comparisons) | 1163 |
| Archive | 4 sections (01 Gap and defect markers, 02 Detached comparison history, 03 Template checks and legacy, 04 Recovery checks) | 872 |

Node-id sessions present in the file's own nodes run 1 → 172. Sessions 74–78 and everything from 88 upward post-date the pause record (the pause lists 27:6, 40:252, 26:221 and 26:208 as the newest artefacts). No node in the file carries a 997 session id.

## Step 1 — Records

Schema records after `npveRebuild_pause_2026_09_03`, in file order:

| Record | Scope | Touches the target? |
|---|---|---|
| `libraryTodos_readOnly_2026_09_03` | library read | no |
| `libraryTodos_write1_2026_09_03` | library, Text field small + Tabs/Tab | no |
| `libraryTodos_write2_2026_09_03` | library variables; rule 8 re-run on target Screens | read only: "6 top-level nodes, 485 walked" on Screens 27:2, i.e. 27:6 and 40:252 were still on Screens at that point |

Flags: 193 total, 187 at pause. The six added all carry `discoveredDuring: libraryTodos_readOnly_2026_09_03`. None mentions the target restructure.

**Finding 1.** Everything listed below has no schema record, no `apply-*.js`, no `figma-export/<batch>/report.md`, no flag and no git commit: the page restructure (sections on every page, Archive page), Problems picker body promoted to a variant set (94:812, Active tab = Recent/All/Favorites), Problem row promoted to a variant set (107:485, Favorite × Action, six variants), Problem summary row 153:1186, Problems list body 156:2426 (State = Closed/Open), the Rebuild comparison master restructured into an instance-swap shell with twelve `_Rebuild comparison/*` sub-components, four comparison instances on Screens, two Sidesheet instances on Screens, the four markers moved to Archive, the two legacy comparisons detached into Archive, `_Legacy` renames of 4:13 and 26:208, and the Recovery checks section. Git status shows only the write2 files as untracked; nothing from this work is on disk.

**Recovery checks 142:996.** The section holds one node, 130:1185 "Recovery check — Rebuild comparison · Recent", an instance of Rebuild comparison 35:332 with every property at the master default (Reference/Rebuild/Change log content = the `Problems · Recent` sub-components, caption "Source: zVsuhYehoSLLq880qRBFkq 4618:4930, exported 2026-09-02"). It contains no note, no text that differs from 116:498, and no marker. Nothing on disk mentions "Recovery" (grep over `*.md`, `*.js`, `*.json` in this folder: 0 hits). What it was recovering from is not recorded anywhere in the file or the repo. Its section stroke is white at 10% while every other section's stroke is black at 10%, which is the only thing that distinguishes it.

## Step 2 — Split brain

### Mechanism

The four ids named in the prompt (`10:104`, `75:689`, `18:101`, `75:690`) do not resolve through `getVariableByIdAsync`, with or without the library key prefix. The Plugin API cannot enumerate a consumer file's variable-subscription table; it can only see ids that nodes bind. Enumerating from bindings:

- Every bound variable id has the form `VariableID:<library key>/<suffix>`. The suffix is not the library's own variable id (library space/8 is `74:78`; the consumer binds `…/74:297` and `…/997:15`).
- Suffix sessions in use: **74** (all colour, typography, radius, border, size/button variables and four old space refs), **116** (font/lineHeight/h3 only), **997** (all space/* refs written by current bindings).
- Session 997 matches the library session in which write2 edited every space/* variable and created space/32 (`VariableID:997:2`). No consumer node is in session 997. So the 997 suffix tracks the library-side version that was published after write2, and the accept-updates pass rewrote every direct space binding in the target to it.
- Four keys are bound under two suffixes at once: space/8 (`74:297` and `997:15`), space/6 (`74:289` / `997:12`), space/7 (`74:293` / `997:14`), space/17 (`74:321` / `997:26`). Every other space key (0, 3, 4, 5, 9, 12, 14, 16, 18) is bound under 997 only. space/16 and space/12, which the prompt names as duplicated, resolve to one id each in the bindings.

Where the old (74-series) space refs live: **only inside instances of the old Button import 3:105** — its padding (space/17, space/7), gap (space/8) and, per variant, space/6 — plus the orphaned Icon button import 6:7 (space/8 × 4 in its master, no instances). In Sidesheet 6:65 the five old space/8 refs are exactly the three footer Buttons (6:85, 6:93, 6:101) and their nested paints.

Components: Button 3:105 and 155:1191 share library key `cfb726c7…` (library master 79:2); Icon button 6:7 and 77:1104 share key `7ebea5d7…` (library 170:77). Same key, same 72/24 variants, same first-variant geometry and description length. The only difference is the internal variable refs: the older node of each pair binds 74-series space ids, the newer binds 997. So this is **not** a library republish under new component ids and **not** a rename. It is the consumer holding two subscription versions of one component: the pre-write2 version and the post-write2 version. The 77-series nodes (Text field 77:697, Tabs 77:650, Tabs/Tab 77:639, Icon button 77:1104) were all created in consumer session 77, while instances built in session 26 point at them, which is the signature of an accept-updates pass re-creating the component reference nodes; Button was not part of that pass (write1 did not change it), so 3:105 stayed, and the Problems management build in session 155 pulled a fresh Button that Figma could not dedupe against the stale 3:105.

### Who binds which copy

Instance counts per component copy (every page, every depth, hidden included):

| Copy | Templates | Screens | Archive | Total |
|---|---|---|---|---|
| Button 3:105 (old, 74-series refs) | 30 | 18 | 10 | **58** |
| Button 155:1191 (new, 997 refs) | 4 | 4 | 0 | **8** |
| Icon button 6:7 (old) | 0 | 0 | 0 | **0** |
| Icon button 77:1104 (new) | 120 | 28 | 34 | **182** |

Who uses which Button: 3:105 is every Sidesheet footer button (Cancel, Save & Add to Note, Save) — in the Sidesheet master, all four Sidesheet template instances, all six `_Rebuild comparison/Rebuild/*` sub-components, all five comparison instances, both Screens Sidesheet instances, both legacy screens and the Coral check 3:397. 155:1191 is only "Create New Problem" in Problems list body (2 variants) and its four placed copies. So the answer to "legacy binds old, new binds new" is **no**: the new Problems management screens carry both copies at once (3 × 3:105 in the footer, 1 × 155:1191 in the toolbar).

Variable side, per top-level frame (bindings, not nodes): every Sidesheet-based frame has 15 old refs (5 space/8, 2 space/6, 4 space/17, 4 space/7 — all inside the three 3:105 Buttons) against 83–183 refs on 997. Problems list body (156:2426) has 0 old refs; its Button is 155:1191. Problem summary row: 0 old, 9 on 997. The Change log components: 0 old.

What moves on the next library update: if Button is republished with a change and updates are accepted, the 58 instances on 3:105 should re-point (Figma keys on component key), and the file would be whole again; the 8 on 155:1191 are already current. Until then a script that imports Button by key gets 155:1191, and any instance swap between the two copies shows in the UI as a swap to a "different" component. There is no render divergence today: both copies resolve the same variables to the same values.

## Step 3 — Library publish state on the target

Read on the two archived screens and on every Screens-page frame (instances only, rendered values):

| Frame | Text field small instance | Label / resting y in the 40 Input | Label slot h | Icon button set | Icon child |
|---|---|---|---|---|---|
| 27:6 (Archive, Recent) | I27:6;6:80;26:222 (Value=Filled) | 9 (hidden) | 40 | 77:1104 × 10 | 24 × 24 at (8,8) |
| 40:252 (Archive, Favorites) | I40:252;6:80;94:653 (Value=Empty) | 9 (visible) | 40 | 77:1104 × 10 | 24 × 24 at (8,8) |
| 116:498 comparison · Recent | …114:780;6:80;26:222 | 9 | 40 | 77:1104 × 10 | 24 × 24 |
| 116:1338 comparison · Favorites | …114:900;6:80;94:653 | 9 | 40 | 77:1104 × 10 | 24 × 24 |
| 160:3169 comparison · Main | …160:1328;6:80;160:4896 (Status filter, 154 wide) | 9 | 40 | 77:1104 × 2 | 24 × 24 |
| 160:3680 comparison · Status menu | …160:1608;6:80;160:4918 | 9 | 40 | 77:1104 × 2 | 24 × 24 |
| 156:2428 Sidesheet · Closed | …6:80;160:4896 | 9 | 40 | 77:1104 × 2 | 24 × 24 |
| 156:2707 Sidesheet · Open | …6:80;160:4918 | 9 | 40 | 77:1104 × 2 | 24 × 24 |

Library masters re-read this batch: 130:140 resting y 9 / slot 40 (hidden), 130:159 resting y 9 / slot 40 (visible). So **the write1 Text field fix has landed on every screen, old and new**: the small resting label is at the fixed inset (9), the hidden Label slot is 40, not 56. The Tab label case reads TITLE on the archived screens ("All Recent Favorites" in `step3-legacy-screen-27-6-1x.png`).

Icon button glyph box: the library was not changed for this (the read batch ruled the 19.125-tall Group 573:3583 intrinsic geometry, exempt under rule 8, and no write touched it). Library 575:17 still reads 20.000025 × 19.125002; every FavoritesOutlined swap on the target reads the same. Old and new screens agree because there is no fixed value to show. `Icon button` instances hold one 24 × 24 Icon child at (8, 8) in 40 × 40 on all pages.

Ordering: the accepted components are the session-77 nodes; the new sets 94:812 and 107:485, the comparison shell (114–116) and Problems management (152–172) all instance them. So updates were accepted **before** the new screens were built and **before** the Button duplication in session 155, and the target accepted both library publishes (write1 components, write2 variables) in one pass or two passes that both precede session 88.

## Step 4 — New components

### Problem summary row 153:1186 (COMPONENT, 518 × 72, 16 nodes)

Properties: Name#153:0 TEXT, Code#153:1 TEXT, Status#170:0 TEXT. Reference count 3.

**No nested instance anywhere in the component.** The two circled controls are drawn:

| Node | Type | Geometry | Paint |
|---|---|---|---|
| 170:1607 Edit problem | FRAME 40 × 40 | hidden #FFFFFF fill | — |
| 170:1608 Touch target | VECTOR 39 × 39 at (0.5, 0.5) | stroke #8CA7A2, 1px — the ring | unbound |
| 170:1609 Pencil outline | VECTOR 13.476 × 13.476 at (12.61, 13.91) | stroke #004852 | unbound |
| 170:1610 Pencil cap | VECTOR 6 × 6 | fill #004852 | unbound |
| 170:1611 Add to note | FRAME 40 × 40 | hidden #FFFFFF fill | — |
| 170:1612 Touch target | VECTOR 39 × 39 at (0.5, 0.5) | stroke #8CA7A2, 1px — the ring | unbound |
| 170:1613 › 170:1614 Vector | GROUP/VECTOR 19 × 22.558 | fill #417E86 | unbound |
| 170:1591 Status "ACTIVE" | TEXT Akkurat LL Bold 14, lineHeight AUTO, no type bindings | fill #3FA266 | unbound |
| 170:1592 Status dropdown | VECTOR 9 × 5 | fill #3FA266, stroke #000000 | both unbound |
| 153:1190 Actions | FRAME 88 × 40 | fill #FFFFFF | unbound |

Nine unbound solid paints on seven nodes, four raw hexes with no library token (#8CA7A2, #3FA266, #417E86 — the last already flagged as a no-token colour in `npveProblemsRecent_unresolvedColours`; #004852 is color/primary/main's value but bound nowhere). The ring convention the project settled on (plain Icon button plus a DEFECT marker, `npveRebuild_problemsRecent_build` and the "Add button" change-log row) is not followed: the source's ringed controls were redrawn as rings. The Problems list change-log row reads "Hand-drawn controls → published library instances / Library linkage and updateability"; for these two controls that is not what the artifact contains. The Status text is the only text in the whole target that binds no font family, size, line height or weight variable (Name and Code bind family and weight).

Rule 8: nothing to report — the fractional numbers are VECTOR/GROUP bounds, exempt. Rule 2 at the master level: 9 hits (above). No hidden text, no placeholder copy.

### Problems list body 156:2426 (COMPONENT_SET, 2 variants 518 × 333)

Properties: State (Closed/Open). Reference counts 24 / 35 (the difference is the Menu instance's own internal refs on the Open variant; the two variants' own references match).

Nested instances, all library (remote) or local sets: Button 155:1191 "Create New Problem" (×1 per variant), Text field 77:697 "Status filter" 154 × 40 (×1 per variant, Value=Empty, resting label "Status"), Checkbox 155:1491 (×2 per variant, via Icon/CheckboxUnchecked 155:1480), Problem summary row 153:1186 (×3 per variant), Divider 6:62 (×3 per variant), and on State=Open **Menu 156:1283 with four Menu/Item 156:1268** as "Problem status menu" 156:1321 (344 × 144, radius bound to radius/sm). Menu key `39efaa1f…` = library Menu 749:323; Menu/Item `94668f17…` = library Menu/Item 152:15; Checkbox `df21c69f…` = library 136:47. So **the status menu does use the imported library Menu and Menu/Item**.

Unbound paints: **16 frames fill #FFFFFF unbound** (Toolbar, Filters, No known problems, Only show active problems, Status groups, Problem — Active, Problem — Resolved, Problem — Marked as error, on both variants). The variant roots bind color/background/paper; the inner frames do not (rule 10 spirit: white should be paper, bound). No fractional geometry outside VECTOR/GROUP. No hidden target-authored text.

Hidden placeholder copy: "Second line of the comment / Third line of the comment" appears **only inside Text field instances**, at library node 130:149 (size=small Empty) / 130:168 (size=small Filled), a hidden TEXT named "Multiline rows" in the library master's Text frame. The library Text field set 121:350 holds 20 of these. It is library-inherited, not authored in the target; it is present in Problems list body (2), Problems picker body (3), the Rebuild comparison master (1) and every Sidesheet instance. Not a target defect; a library note.

### Problem row 107:485 (COMPONENT_SET, six variants 518 × 56, 107:414 … 107:473)

Properties: Name#107:0, Code#107:7, Favorite, Action. Reference count 4 on every variant. Nested instances: Icon button 77:1104 as Favorite and Trailing action on every variant (Trailing action hidden on the two Action=None variants); swaps Icon/FavoritesOutlined 26:203, Icon/FavoritesFilled 40:250, Icon/PlusOutlined 3:75, Icon/CheckCircle (MUI) 26:206. 0 unbound paints, 0 non-exempt fractional nodes, no drawn shapes, no hidden text. Clean.

### Problems picker body 94:812 (COMPONENT_SET, three variants 518 × 385: 26:221 Recent, 94:639 All, 94:652 Favorites)

Property: Active tab. Reference count 36 on every variant. Nested: Text field 77:697 (Search field), Tabs 77:650 × 3 per variant with two hidden (the boolean-visibility trio recorded in `npveRebuild_goldStarsAndCorrections`; the set now selects by variant, so each variant carries two dead Tabs instances), Divider 6:62 (Tab underline), Problem row 107:485 × 4. 0 unbound, 0 fractional. The hidden-Tabs pattern is carried over from the pre-set design and is now redundant with the variant axis: 6 hidden Tabs instances across the set.

### Rebuild comparison 35:332 and `_Rebuild comparison/*`

35:332 is a COMPONENT 1708 × 1290, horizontal, gap 32 / padding 32 (literal — space/32 now exists in the library, `npveComparison_noSpace32Token` still open), fill color/grey/300 bound. Properties: three TEXT captions and three INSTANCE_SWAP slots (`Reference content#114:0`, `Rebuild content#114:1`, `Change log content#114:2`, 4 preferred values each). Reference count 104. Each column still contains a hidden `__Legacy placeholder — …` frame beside the swap slot (three per instance).

Twelve sub-components, all COMPONENT, local, 0 unbound, 0 non-exempt fractional:

| Sub-component | Content | Note |
|---|---|---|
| Reference/Problems · Recent 114:777 | RECTANGLE 550 × 600, IMAGE FIT, **1100 × 1200 px (2x)**, hash 5bbc19ec = legacy 36:261 | ok |
| Reference/Problems · Favorites 114:897 | RECTANGLE 550 × 600, IMAGE FIT, **550 × 600 px (1x)** | caption "4618:5137, refreshed 2026-09-03" |
| Reference/Problems · Main 160:1323 | RECTANGLE 550 × 517, IMAGE FILL, **550 × 517 px (1x)** | 83 px blank below |
| Reference/Problems · Status menu 160:1325 | RECTANGLE 550 × 510, IMAGE FILL, **550 × 510 px (1x)** | 90 px blank below; export shows a cursor |
| Rebuild/Problems · Recent 114:779 | Sidesheet instance 114:780 | overrides identical to 27:6 |
| Rebuild/Problems · Favorites 114:899 | Sidesheet instance 114:900 | overrides identical to 40:252 |
| Rebuild/Problems · Main 160:1327 | Sidesheet instance 160:1328 (Problems list body Closed) | |
| Rebuild/Problems · Status menu 160:1607 | Sidesheet instance 160:1608 (Problems list body Open) | |
| Change log/Problems · Recent 114:880 | FRAME 480 × 1198, 12 Change log/Row | |
| Change log/Problems · Favorites 114:994 | FRAME 480 × 1198, 13 rows | |
| Change log/Problems · Main 160:1847 | FRAME 480 × 1198, 12 rows placed, 4 visible in render | |
| Change log/Problems · Status menu 160:1924 | FRAME 480 × 1198, 12 rows, 5 visible | |

Rule 15 says the source export is a flat image **at 2x**; three of the four are 1x. Rule 15 also says the export "does not update when the source changes"; the Favorites caption says "refreshed 2026-09-03" and its image hash differs from the legacy 40:5xx export. Rules 14 and 15 say the placed change log and comparison are **detached frames** because an instance cannot host children; the restructure makes them instances whose content is supplied through instance-swap slots to per-screen sub-components. That is a workable answer to rule 6, but it is a convention change that neither rule nor schema records, and it leaves each screen's content living in a Templates sub-component rather than on Screens.

## Step 5 — Duplication

The screens inside comparisons 116:498 and 116:1338 are **separate instance trees, not references to the archived screens**. Read on all four: main component Sidesheet 6:65, 550 × 600, identical `componentProperties` (Title, Body content 26:221 / 94:652, the three action swaps 3:106 / 3:136 / 3:118, the four booleans), identical text characters (31 texts) and identical hidden-node lists (16 / 17). So they are faithful duplicates today. The Recent screen content now exists three times: Archive 27:6 (inside Legacy detached 36:258 › Rebuild 36:262 › Rebuilt screen 36:264), Templates 114:780 (the master of the Rebuild sub-component), and, through instancing, 116:498 and Recovery check 130:1185. Favorites exists twice (40:252, 114:900). Any future correction has to be made on the Templates sub-component master; the Archive copies will not follow and are already the rule-1 "superseded" copies without a README or superseded label on the frames themselves (the section names carry it).

## Standing batch rules

1. Instance paint verification — **not run**: this batch places nothing; the new sets were verified on their existing placed instances instead (Problem summary row × 12 placements, Problems list body × 8, Problem row × 44, picker body × 8 — all rendered paints match their masters, unbound hexes included).
2. Unbound paint audit, every top-level node, every page: Cover 1 (cover frame #010000, pre-existing), Templates 35 (9 in Problem summary row, 17 in Problems list body, 1 Actions frame, plus 10 section fills/strokes — Figma section chrome #E4E4E4 / black 10%), Screens 6 (all section chrome), Archive 8 (all section chrome, Recovery checks uses a white 10% stroke). Net target-authored: **27 on the new Problems management components, 0 elsewhere**.
3. Reference counts per variant: Problem row 4/4/4/4/4/4, picker body 36/36/36, Problems list body 24/35 (Menu instance internals), Problem summary row 3, Rebuild comparison 104. No dropped-reference variant.
4. `skipInvisibleInstanceChildren = false` set in every script.
5. Opacity last — no writes.
6. Enumerated from the file throughout; prompt ids treated as claims (four variable ids not confirmable).
7. File identity: keys passed explicitly on all 14 calls; target page list Cover/Templates/Screens/Archive read before any conclusion.
8. Rule 8 walk on all four pages: **0 hits**; exempt VECTOR/GROUP 277 / 117 / 68 / 0.
9. Bound paint alpha — no writes.
10. Clone drops refs — see rule 3, none dropped.

## Counts

- Markers in file: 2 GAP (27:295 Search field, 27:306 Colours without a token), 2 DEFECT (33:236 Add button ring, 52:428 Tabs bottom rule), all four now in Archive 126:2025 and no longer beside any screen.
- New findings this batch: 8 DEFECT, 3 DECISION, 2 info. Written to `flags[]` and to the record.

## Decisions needed

1. Whether to keep the instance-swap comparison shell (rules 14/15 rewrite) or return to detached frames; either way, record it.
2. Whether the drawn rings on Problem summary row stay with a DEFECT marker (project convention) or are replaced by plain Icon buttons plus marker.
3. Whether GAP/DEFECT markers may live in Archive or must sit beside the screens they mark (rule 9 says GAP "stays marked in the frame").
4. Re-export Favorites, Main and Status menu references at 2x, or amend rule 15.
5. Re-import or leave the Button split (58 on 3:105, 8 on 155:1191) until the next Button publish.
