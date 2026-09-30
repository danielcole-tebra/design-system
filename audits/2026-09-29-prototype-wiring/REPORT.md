# Encounter prototype wiring, 2026-09-29

File `fdCQVFdvOByaOYIJYag0d6`, page `Encounter prototype` 1004:8207 (writes, additive; library read only). `figma.skipInvisibleInstanceChildren = false` on every script. Nothing deleted, no frame moved. Flow starting point **Encounter** set on F01 (1004:8208), read back.

Read first: CLAUDE.md, PLUGIN-NOTES.md, the prototype-frames report, the click-map report. Every reaction below was read back off the page after setting (a second script enumerated all reactions on all twenty frames; that scan is the source of this table). Reactions were not played in Figma's prototype viewer from here; what is verified is that each one is stored with the destination shown.

Frame names in the table: F01 to F10 are row 1 in order; a to j are the row 2 frames named in the prototype-frames report.

## Result
- **131 reactions set:** 130 On click (four of them on the Modules + hotspots) and 1 After delay 2500 ms (frame F07). All Navigate to, Instant. Every listed reaction is set or reported below.
- **Instance children took reactions directly.** Only four hotspots were needed, and they are the four Modules + ones the brief called for.
- **Show back = true on the Edit Problem sheet** (frame h): the header now shows the back arrow (`h-show-back-1004-39570.png`). Sheet height stays 600, title and body unchanged.

## Reported, not set
1. **Self-links are refused by Figma.** A Navigate to must land on a different top-level frame, so the brief's "All tab -> F02" on F02, "Recent -> i" on i and "Favorites -> j" on j were not set (those tabs are already the current tab). The same rule left these Ready-frame links off, all pointing at the frame they sit in: Problems chip in a, Allergies chip and header View all (13) in c, Vitals chip in e, FHx tags in f. Nothing is lost by it.
2. **Not in the brief, so left dead:** b's row pencils, status carets and Create New Problem (only b's three menu items are wired); the Problems chip in F02, i and j; Note chip ✕; every control listed as dead in the brief.
3. **Family History and Family History edit (f, g) have no module chip,** so there is no chip ✕ to wire there; their only way out to F01 is the sheet ✕, and to Problems, Allergies and Vitals the chips.

## Hotspots (SCAFFOLDING, transparent rectangles at frame level, fill opacity 0)
| Frame | Node | Box (x, y, w, h) | Destination | Stands in for |
|---|---|---|---|---|
| F01 | `1008:13157` | 16, 166, 122, 38 | a | Modules dropdown (deferred) |
| F10 | `1008:13159` | 16, 166, 122, 38 | a | Modules dropdown (deferred) |
| F03 | `1008:13161` | 16, 166, 122, 38 | F05 | Modules dropdown (deferred) |
| F04 | `1008:13163` | 16, 166, 122, 38 | F06 | Modules dropdown (deferred) |

Each sits over the Modules + button, named `SCAFFOLDING/Hotspot/Modules +`, last child of its frame so it is on top. The button itself carries no reaction. Outlined on the exports only: `hotspot-F01-1004-8208.png`, `hotspot-F03-1004-8213.png`, `hotspot-F04-1004-8215.png`, `hotspot-F10-1004-8231.png`.

## Reachability from F01, following the reactions as set
Breadth first over the stored destinations, starting at the flow starting point.
- **Unreachable frames: none.** All 20 are reached.
- **Frames with no exit except nav: none.** Every frame has at least one reaction that leaves it. F07 leaves only by its 2500 ms timer, F09 only by its two buttons.
- Path to the Problems island: F01 Modules + -> a -> F02; F03 Modules + -> F05; F04 Modules + -> F06. The rest follow from a: b (status caret), h (pencil), c, e, f from the chips, header link and tags; d from c; g from f; i and j from F02's tabs.
- Out-edges by frame: F01 to c, F03, f, a. F02 to F01, a, i, j. F03 to F01, F04, F07, F05. F04 to F01, F03, F07, F06. F05 to F03, a, F06, F07. F06 to F04, a, F05, F07. F07 to F08. F08 to F10, F09. F09 to F08. F10 to c, F08, f, a. a to c, F01, e, F02, b, h, f. b to c, a, F01, e, f. c to a, e, F01, d, f. d to c, a, e, F01, f. e to c, a, F01, f. f to c, a, e, F01, g. g to c, a, e, f, F01. h to c, a, F01, e, f. i to a, F02, j. j to a, F02, i.
- Oddities worth knowing, not faults: F05 and F06 reach Processing only as F07 (Note only), and F07 always ends on F08 whichever Started frame you came from, so the click-through drops the Problems column after Finish. F09 Yes, replace section returns to F08 with nothing changed (no replaced state exists).

## Every reaction
| Frame | Control | Node or hotspot id | Destination | Trigger |
|---|---|---|---|---|
| F01 | View all (13) | `I1004:8209;974:16288;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| F01 | Start Transcribing | `I1004:8209;974:16294;469:9852;966:16230` | Encounter · Started (`1004:8213`) | On click, Navigate to, Instant |
| F01 | FHx tag (Family History) | `I1004:8209;974:16294;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| F01 | FHx tag (Social History) | `I1004:8209;974:16294;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| F01 | SCAFFOLDING/Hotspot/Modules + | `1008:13157` | a (`1004:35117`) | On click, Navigate to, Instant |
| F02 | Problems sheet ✕ | `I1004:8211;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| F02 | Picker ✕ | `I1004:8212;279:2420` | a (`1004:35117`) | On click, Navigate to, Instant |
| F02 | Tab Recent | `I1004:8212;279:2423;94:642;201:17` | i (`1004:40247`) | On click, Navigate to, Instant |
| F02 | Tab Favorites | `I1004:8212;279:2423;94:642;201:19` | j (`1004:41040`) | On click, Navigate to, Instant |
| F02 | Cancel | `I1004:8212;279:2427` | a (`1004:35117`) | On click, Navigate to, Instant |
| F02 | Save & Add to Note | `I1004:8212;279:2428` | a (`1004:35117`) | On click, Navigate to, Instant |
| F02 | Save | `I1004:8212;279:2429` | a (`1004:35117`) | On click, Navigate to, Instant |
| F03 | Cancel | `I1004:8214;974:16294;469:9852;966:16269` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| F03 | Pause | `I1004:8214;974:16294;469:9852;966:16275` | Encounter · Paused (`1004:8215`) | On click, Navigate to, Instant |
| F03 | Finish | `I1004:8214;974:16294;469:9852;966:16282` | Encounter · Processing (`1004:8221`) | On click, Navigate to, Instant |
| F03 | SCAFFOLDING/Hotspot/Modules + | `1008:13161` | Encounter · Started · Problems open (`1004:8217`) | On click, Navigate to, Instant |
| F04 | Cancel | `I1004:8216;974:16294;469:9852;966:16321` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| F04 | Resume | `I1004:8216;974:16294;469:9852;966:16327` | Encounter · Started (`1004:8213`) | On click, Navigate to, Instant |
| F04 | Finish | `I1004:8216;974:16294;469:9852;966:16334` | Encounter · Processing (`1004:8221`) | On click, Navigate to, Instant |
| F04 | SCAFFOLDING/Hotspot/Modules + | `1008:13163` | Encounter · Paused · Problems open (`1004:8219`) | On click, Navigate to, Instant |
| F05 | Problems chip ✕ | `I1004:8218;429:4199;426:4239;426:4204` | Encounter · Started (`1004:8213`) | On click, Navigate to, Instant |
| F05 | Problems sheet ✕ | `I1004:8218;429:4239;6:74` | Encounter · Started (`1004:8213`) | On click, Navigate to, Instant |
| F05 | Cancel | `I1004:8218;429:4542;469:9852;981:19708` | a (`1004:35117`) | On click, Navigate to, Instant |
| F05 | Pause (icon) | `I1004:8218;429:4542;469:9852;981:19930` | Encounter · Paused · Problems open (`1004:8219`) | On click, Navigate to, Instant |
| F05 | Finish (icon) | `I1004:8218;429:4542;469:9852;981:19934` | Encounter · Processing (`1004:8221`) | On click, Navigate to, Instant |
| F06 | Problems chip ✕ | `I1004:8220;429:4199;426:4239;426:4204` | Encounter · Paused (`1004:8215`) | On click, Navigate to, Instant |
| F06 | Problems sheet ✕ | `I1004:8220;429:4239;6:74` | Encounter · Paused (`1004:8215`) | On click, Navigate to, Instant |
| F06 | Cancel | `I1004:8220;429:4542;469:9852;981:19723` | a (`1004:35117`) | On click, Navigate to, Instant |
| F06 | Resume (icon) | `I1004:8220;429:4542;469:9852;981:19938` | Encounter · Started · Problems open (`1004:8217`) | On click, Navigate to, Instant |
| F06 | Finish (icon) | `I1004:8220;429:4542;469:9852;981:19942` | Encounter · Processing (`1004:8221`) | On click, Navigate to, Instant |
| F07 | Encounter · Processing (frame trigger) | `1004:8221` | Encounter · Ready · AI Note Results (`1004:8223`) | After delay 2500 ms, Navigate to, Instant |
| F08 | AI sheet ✕ | `I1004:8225;279:2420` | Encounter · Closed (`1004:8231`) | On click, Navigate to, Instant |
| F08 | Replace Section | `I1004:8225;279:2423;969:16301;969:16262` | Encounter · Replace section (`1004:8226`) | On click, Navigate to, Instant |
| F09 | Cancel | `I1004:8230;976:16645;186:10` | Encounter · Ready · AI Note Results (`1004:8223`) | On click, Navigate to, Instant |
| F09 | Yes, replace section | `I1004:8230;976:16645;186:18` | Encounter · Ready · AI Note Results (`1004:8223`) | On click, Navigate to, Instant |
| F10 | View all (13) | `I1004:8232;974:16288;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| F10 | View AI Recording | `I1004:8232;974:16294;469:9852;966:16402` | Encounter · Ready · AI Note Results (`1004:8223`) | On click, Navigate to, Instant |
| F10 | FHx tag (Family History) | `I1004:8232;974:16294;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| F10 | FHx tag (Social History) | `I1004:8232;974:16294;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| F10 | SCAFFOLDING/Hotspot/Modules + | `1008:13159` | a (`1004:35117`) | On click, Navigate to, Instant |
| a | View all (13) | `I1004:35118;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| a | Problems chip ✕ | `I1004:35118;429:4199;426:4239;426:4204` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| a | Vitals chip | `I1004:35118;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| a | Allergies chip | `I1004:35118;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| a | Problems sheet ✕ | `I1004:35118;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| a | Create New Problem | `I1004:35118;429:4239;6:80;155:1561` | Encounter · Ready · Add Problem (`1004:8210`) | On click, Navigate to, Instant |
| a | Row 1 status caret (Status control) | `I1004:35118;429:4239;6:80;172:3134;170:1590` | b (`1004:35634`) | On click, Navigate to, Instant |
| a | Row 1 edit pencil | `I1004:35118;429:4239;6:80;172:3134;958:15333` | h (`1004:39570`) | On click, Navigate to, Instant |
| a | Row 2 status caret (Status control) | `I1004:35118;429:4239;6:80;172:3151;170:1590` | b (`1004:35634`) | On click, Navigate to, Instant |
| a | Row 2 edit pencil | `I1004:35118;429:4239;6:80;172:3151;958:15333` | h (`1004:39570`) | On click, Navigate to, Instant |
| a | Row 3 status caret (Status control) | `I1004:35118;429:4239;6:80;172:3168;170:1590` | b (`1004:35634`) | On click, Navigate to, Instant |
| a | Row 3 edit pencil | `I1004:35118;429:4239;6:80;172:3168;958:15333` | h (`1004:39570`) | On click, Navigate to, Instant |
| a | FHx tag (Family History) | `I1004:35118;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| a | FHx tag (Social History) | `I1004:35118;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| b | View all (13) | `I1004:35635;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| b | Problems chip | `I1004:35635;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| b | Problems chip ✕ | `I1004:35635;429:4199;426:4239;426:4204` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| b | Vitals chip | `I1004:35635;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| b | Allergies chip | `I1004:35635;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| b | Problems sheet ✕ | `I1004:35635;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| b | Menu item Active | `I1004:35635;429:4239;6:80;156:1321;154:3` | a (`1004:35117`) | On click, Navigate to, Instant |
| b | Menu item Resolved | `I1004:35635;429:4239;6:80;156:1321;154:5` | a (`1004:35117`) | On click, Navigate to, Instant |
| b | Menu item Mark as Error | `I1004:35635;429:4239;6:80;156:1321;154:7` | a (`1004:35117`) | On click, Navigate to, Instant |
| b | FHx tag (Family History) | `I1004:35635;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| b | FHx tag (Social History) | `I1004:35635;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| c | Problems chip | `I1004:36295;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| c | Vitals chip | `I1004:36295;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| c | Allergies chip ✕ | `I1004:36295;429:4199;465:5505;426:4204` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| c | Allergies sheet ✕ | `I1004:36295;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| c | Create New Allergy | `I1004:36295;429:4239;6:80;355:5925` | d (`1004:36888`) | On click, Navigate to, Instant |
| c | FHx tag (Family History) | `I1004:36295;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| c | FHx tag (Social History) | `I1004:36295;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| d | View all (13) | `I1004:36889;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| d | Problems chip | `I1004:36889;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| d | Vitals chip | `I1004:36889;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| d | Allergies chip | `I1004:36889;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| d | Allergies chip ✕ | `I1004:36889;429:4199;465:5505;426:4204` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| d | Back | `I1004:36889;429:4239;6:67` | c (`1004:36294`) | On click, Navigate to, Instant |
| d | Sheet ✕ | `I1004:36889;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| d | Cancel | `I1004:36889;429:4239;6:85` | c (`1004:36294`) | On click, Navigate to, Instant |
| d | Save & Add To Note | `I1004:36889;429:4239;6:93` | c (`1004:36294`) | On click, Navigate to, Instant |
| d | Save | `I1004:36889;429:4239;6:101` | c (`1004:36294`) | On click, Navigate to, Instant |
| d | FHx tag (Family History) | `I1004:36889;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| d | FHx tag (Social History) | `I1004:36889;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| e | View all (13) | `I1004:37586;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| e | Problems chip | `I1004:37586;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| e | Vitals chip ✕ | `I1004:37586;429:4199;465:5473;426:4204` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| e | Allergies chip | `I1004:37586;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| e | Vitals sheet ✕ | `I1004:37586;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| e | FHx tag (Family History) | `I1004:37586;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| e | FHx tag (Social History) | `I1004:37586;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| f | View all (13) | `I1004:38285;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| f | Problems chip | `I1004:38285;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| f | Vitals chip | `I1004:38285;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| f | Allergies chip | `I1004:38285;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| f | Family History sheet ✕ | `I1004:38285;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| f | Father row edit | `I1004:38285;429:4239;6:80;346:3123;346:3094` | g (`1004:38862`) | On click, Navigate to, Instant |
| g | View all (13) | `I1004:38863;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| g | Problems chip | `I1004:38863;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| g | Vitals chip | `I1004:38863;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| g | Allergies chip | `I1004:38863;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| g | Back | `I1004:38863;429:4239;6:67` | f (`1004:38284`) | On click, Navigate to, Instant |
| g | Sheet ✕ | `I1004:38863;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| g | Cancel | `I1004:38863;429:4239;6:85` | f (`1004:38284`) | On click, Navigate to, Instant |
| g | Save | `I1004:38863;429:4239;6:101` | f (`1004:38284`) | On click, Navigate to, Instant |
| g | FHx tag (Family History) | `I1004:38863;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| g | FHx tag (Social History) | `I1004:38863;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| h | View all (13) | `I1004:39571;429:4165;426:4194` | c (`1004:36294`) | On click, Navigate to, Instant |
| h | Problems chip | `I1004:39571;429:4199;426:4239` | a (`1004:35117`) | On click, Navigate to, Instant |
| h | Problems chip ✕ | `I1004:39571;429:4199;426:4239;426:4204` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| h | Vitals chip | `I1004:39571;429:4199;465:5473` | e (`1004:37585`) | On click, Navigate to, Instant |
| h | Allergies chip | `I1004:39571;429:4199;465:5505` | c (`1004:36294`) | On click, Navigate to, Instant |
| h | Back (Show back = true) | `I1004:39571;429:4239;6:67` | a (`1004:35117`) | On click, Navigate to, Instant |
| h | Sheet ✕ | `I1004:39571;429:4239;6:74` | Encounter · Ready (`1004:8208`) | On click, Navigate to, Instant |
| h | Mark As Error | `I1004:39571;429:4239;252:2211;320:3850;318:3644` | a (`1004:35117`) | On click, Navigate to, Instant |
| h | Cancel | `I1004:39571;429:4239;252:2211;320:3858` | a (`1004:35117`) | On click, Navigate to, Instant |
| h | Save | `I1004:39571;429:4239;252:2211;320:3864` | a (`1004:35117`) | On click, Navigate to, Instant |
| h | FHx tag (Family History) | `I1004:39571;429:4542;958:25193;958:25154;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| h | FHx tag (Social History) | `I1004:39571;429:4542;958:25193;958:25175;955:15030` | f (`1004:38284`) | On click, Navigate to, Instant |
| i | Picker ✕ | `I1004:40249;279:2420` | a (`1004:35117`) | On click, Navigate to, Instant |
| i | Tab All | `I1004:40249;279:2423;26:244;201:15` | Encounter · Ready · Add Problem (`1004:8210`) | On click, Navigate to, Instant |
| i | Tab Favorites | `I1004:40249;279:2423;26:244;201:19` | j (`1004:41040`) | On click, Navigate to, Instant |
| i | Cancel | `I1004:40249;279:2427` | a (`1004:35117`) | On click, Navigate to, Instant |
| i | Save & Add To Note | `I1004:40249;279:2428` | a (`1004:35117`) | On click, Navigate to, Instant |
| i | Save | `I1004:40249;279:2429` | a (`1004:35117`) | On click, Navigate to, Instant |
| j | Picker ✕ | `I1004:41042;279:2420` | a (`1004:35117`) | On click, Navigate to, Instant |
| j | Tab All | `I1004:41042;279:2423;94:657;201:15` | Encounter · Ready · Add Problem (`1004:8210`) | On click, Navigate to, Instant |
| j | Tab Recent | `I1004:41042;279:2423;94:657;201:17` | i (`1004:40247`) | On click, Navigate to, Instant |
| j | Cancel | `I1004:41042;279:2427` | a (`1004:35117`) | On click, Navigate to, Instant |
| j | Save & Add To Note | `I1004:41042;279:2428` | a (`1004:35117`) | On click, Navigate to, Instant |
| j | Save | `I1004:41042;279:2429` | a (`1004:35117`) | On click, Navigate to, Instant |
