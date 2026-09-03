# NPVE rebuild — source file enumeration (NDE-2026)

Batch `npveRebuild_enum_2026-09-02`, 2026-09-02. Source zVsuhYehoSLLq880qRBFkq read only (loadAsync only, no page switch). Target fdCQVFdvOByaOYIJYag0d6 not opened.

## Outcome

- READ-ONLY ENUMERATION COMPLETE. Stopped after step 5 as instructed. No writes of any kind to the source file; the target file was not opened.
- Source page list (18 pages, first page "Cover", second "-----DESIGNS-----") does not match figmaBuild.pages._order, so this is confirmed NOT the library. The two library files were opened read-only for key inventories only.
- Pages: 18; empty separators: -----DESIGNS----- (10:15), -----COMPONENTS----- (21:320), -----ARCHIVE----- (105:1425), -----RESEARCH------ (4211:15272). Sections found: 0.
- Provenance: {"instances":22337,"designSystemRebuild":598,"tebraWorkingUiKit":10766,"otherRemote":9629,"local":1344}. Of 22,337 instances, 598 (2.7%) resolve to Design System Rebuild, 10,766 (48.2%) to the deprecated Tebra Working UI Kit, 9,629 (43.1%) to remote components in NEITHER inventory, 1,344 (6.0%) to local components. Rebuild usage is concentrated on NeuNeu (Icon/* and Button variants) and the NeuNeu SideRail/NavStack area; nearly every other screen is kit-built.
- Schema record written by apply-npve-enum.js, backup design-system-schema.backup-2026-09-02-pre-npve-enum.json. Flags added: 9 (npveSource_*).

## Method

- **walk.** Per page, PageNode.loadAsync() then page.children. setCurrentPageAsync was deliberately NOT used so the user's current-page view state was never changed. figma.skipInvisibleInstanceChildren=false set at the top of every script (runtime flag, not file data).
- **instanceProvenance.** Every INSTANCE under each top-level node (nested instances included) resolved to its main component. remote=false counted as local. remote=true keys matched by their first 8 hex chars against key inventories of Design System Rebuild (657 components/sets across 11 pages) and Tebra Working UI Kit ZPf0sJy83aPyrHjCVHomya (1674 across 12 pages). Zero prefix overlap between the two inventories.
- **inventoryCaveat.** Both inventories are of components ON CANVAS today. A published component that has since been deleted from a library canvas would classify here as "other remote", not as that library.
- **textScan.** TEXT nodes under each top-level node tested against /old|v\d+|archived?|deprecated|wip|draft|do not use|legacy|obsolete|19xx|20xx|d/d/yy/. Hits inside remote instances (node ids starting "I") are library placeholder copy, not text authored in this file, and are marked insideRemoteInstances.
- **screenshots.** get_screenshot on each page id, 1600px long edge, saved under figma-export/npve-enum-2026-09-02/. Every image was opened and looked at.

- **screenshotsLookedAt.** Yes. Notable in pixels: Workflows is a tall column of black-backdrop section boards (Sidesheet View, General Workflow x2, Prototype, Med List, Signed Note, New Create Flow, Mark As Error, Select Appointment Date, Recording/Transcription Live); Error States is a grid of 1429px encounter screens each with a modal; NeuNeu holds a "Menus / IA" board plus new-shell screens with a dark left rail; Neu holds older shell screens with a light rail and a colour swatch column; Sandbox has a "Megamenu" board; Maps is an all-text "Object Map"; Research Framework is a timeline table.

## Screenshots

| Page | File |
|---|---|
| Cover (0:1) | `page-01-Cover.png` |
| -----DESIGNS----- (10:15) | empty separator, no image |
| Workflows (105:1426) | `page-03-Workflows.png` |
| Error States (1050:8411) | `page-04-Error-States.png` |
| V2:AI Patient Summary (3813:14586) | `page-05-V2-AI-Patient-Summary.png` |
| -----COMPONENTS----- (21:320) | empty separator, no image |
| ⚙️ Components (21:321) | `page-07-Components.png` |
| Demos/Protos (3569:14562) | `page-08-Demos-Protos.png` |
| -----ARCHIVE----- (105:1425) | empty separator, no image |
| NeuNeu (4740:14057) | `page-10-NeuNeu.png` |
| Neu (1424:8259) | `page-11-Neu.png` |
| Sandbox (112:4335) | `page-12-Sandbox.png` |
| Misc (4250:14678) | `page-13-Misc.png` |
| NoFolder Navigation (12:866) | `page-14-NoFolder-Navigation.png` |
| Folder Navigation (10:14) | `page-15-Folder-Navigation.png` |
| -----RESEARCH------ (4211:15272) | empty separator, no image |
| Maps (4211:15273) | `page-17-Maps.png` |
| Research Framework (1236:3155) | `page-18-Research-Framework.png` |

## Page and frame tables

Inst = all instances under the node, DSR = Design System Rebuild, Kit = Tebra Working UI Kit, Other = remote in neither inventory, Local.

**Cover** (0:1) — top-level nodes: 1
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Cover | 10:4 | FRAME | 0, 0 | 1920×960 | 0 | 0 | 0 | 0 | 0 |

**-----DESIGNS-----** (10:15) — top-level nodes: 0 (empty separator, no image)

**Workflows** (105:1426) — top-level nodes: 26
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Frame 758532141 | 3943:12393 | FRAME | -1873, -254 | 2922×2008 | 351 | 0 | 164 | 180 | 7 |
| Frame 758532154 | 4317:11594 | FRAME | -1873, -2414 | 2922×2008 | 347 | 0 | 164 | 176 | 7 |
| Frame 758532155 | 4715:26647 | FRAME | -1873, -4666 | 1584×1364 | 217 | 6 | 116 | 74 | 21 |
| Frame 758532140 | 5093:18693 | FRAME | -1853, -5857 | 1429×815 | 134 | 0 | 66 | 52 | 16 |
| Frame 758532143 | 3943:12395 | FRAME | -1873, 2072 | 15951×1314 | 2278 | 0 | 1107 | 934 | 237 |
| Frame 758532144 | 3943:12402 | FRAME | -1873, 3626 | 2906×1360 | 388 | 0 | 195 | 163 | 30 |
| Frame 758532149 | 3943:13025 | FRAME | -2100, 9462 | 4367×2839 | 542 | 0 | 253 | 211 | 78 |
| arrow_drop_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24(1) 1 | 3534:17621 | FRAME | 4125, 9299 | 24×24 | 0 | 0 | 0 | 0 | 0 |
| Module Dropdown (hidden) | 899:7657 | INSTANCE | 3190, 7120 | 376×504 | 25 | 0 | 8 | 5 | 12 |
| Frame 758532101 | 3456:11503 | FRAME | -2127, 19000 | 1517×280 | 0 | 0 | 0 | 0 | 0 |
| Frame 758532100 | 2939:11510 | FRAME | -2018, 21748 | 1762×280 | 0 | 0 | 0 | 0 | 0 |
| Frame 758532151 | 3943:13027 | FRAME | -2100, 13193 | 5039×1249 | 76 | 0 | 49 | 27 | 0 |
| Mark As Error_Ready | 3456:11505 | FRAME | -2127, 19404 | 1429×810 | 239 | 0 | 109 | 104 | 26 |
| Rec_Ready | 3124:12369 | FRAME | -2018, 22258 | 1429×1013 | 249 | 0 | 114 | 109 | 26 |
| Rec_Ready | 4841:17077 | FRAME | -550, 23349 | 1429×1013 | 267 | 6 | 123 | 110 | 28 |
| Sidesheetv3 | 4841:21245 | INSTANCE | 900, 23414 | 550×948 | 84 | 3 | 41 | 36 | 4 |
| Rec_Ready | 4841:18039 | FRAME | -550, 24387 | 1429×1013 | 350 | 9 | 164 | 146 | 31 |
| Rec_Started | 3159:20067 | FRAME | -299, 22258 | 1429×1013 | 224 | 0 | 106 | 104 | 14 |
| Rec_Paused | 4296:17197 | FRAME | 1240, 22258 | 1429×1013 | 224 | 0 | 106 | 104 | 14 |
| Rec_Processing | 4275:15285 | FRAME | 3439, 22258 | 1429×1013 | 224 | 0 | 106 | 104 | 14 |
| Rec_Closed | 4294:15013 | FRAME | 8127, 22236 | 1429×1013 | 221 | 0 | 104 | 103 | 14 |
| Rec_Open | 3159:21282 | FRAME | 4993, 22258 | 1429×1013 | 228 | 0 | 109 | 105 | 14 |
| Replace_Section_Modal | 4439:16310 | FRAME | 6571, 22258 | 1429×1013 | 266 | 0 | 134 | 118 | 14 |
| Frame 758532153 | 3943:13029 | FRAME | -2100, 14790 | 5039×3547 | 902 | 0 | 461 | 337 | 104 |
| Screenshot 2026-05-05 at 9.44.35 AM 1 | 3806:13143 | RECTANGLE | 8430, 3487 | 1458×106 | 0 | 0 | 0 | 0 | 0 |
| Frame 758532132 | 3810:13146 | FRAME | 8509, 3216 | 758×116 | 9 | 0 | 7 | 2 | 0 |

**Error States** (1050:8411) — top-level nodes: 20
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Module Errors | 2117:8381 | FRAME | 0, 0 | 2846×675 | 16 | 0 | 8 | 8 | 0 |
| Cost Disclosure | 4494:15947 | FRAME | 16, 1017 | 1429×790 | 202 | 0 | 97 | 78 | 27 |
| E-06 | 4505:18288 | FRAME | 16, 2199 | 1429×766 | 172 | 0 | 89 | 69 | 14 |
| Transcription service disconnected | 4508:23664 | FRAME | 16, 3244 | 1429×766 | 166 | 0 | 85 | 67 | 14 |
| Transcription service disconnected | 4508:24088 | FRAME | 16, 3244 | 1429×766 | 165 | 0 | 85 | 66 | 14 |
| Transcription service disconnected | 4549:28463 | FRAME | 16, 4162 | 1429×766 | 171 | 0 | 89 | 68 | 14 |
| Transcription service disconnected | 4597:30566 | FRAME | 1668, 4162 | 1429×766 | 225 | 0 | 109 | 102 | 14 |
| Transcription service disconnected | 4508:26782 | FRAME | 6257, 2223 | 1429×766 | 166 | 0 | 85 | 67 | 14 |
| Transcription service disconnected | 4508:24483 | FRAME | 1511, 3244 | 1429×766 | 187 | 0 | 95 | 78 | 14 |
| E-07 | 4505:19685 | FRAME | 1511, 2199 | 1429×766 | 167 | 0 | 85 | 68 | 14 |
| No mics detected | 4507:22374 | FRAME | 3355, 4289 | 1429×766 | 167 | 0 | 85 | 68 | 14 |
| E-09 | 4507:21046 | FRAME | 3093, 2199 | 1429×766 | 212 | 0 | 100 | 98 | 14 |
| Session Timeout | 4505:16648 | FRAME | 1691, 1017 | 1429×790 | 205 | 0 | 97 | 81 | 27 |
| E-11 Mic Disconnected | 4507:22770 | FRAME | 4675, 2199 | 1429×790 | 208 | 9 | 97 | 75 | 27 |
| Session ID Failures | 4508:23234 | FRAME | 6729, 4354 | 1429×790 | 202 | 0 | 97 | 78 | 27 |
| Internal Service Error - Failed Call for Recording | 4505:17114 | FRAME | 3355, 1017 | 1429×790 | 202 | 0 | 97 | 78 | 27 |
| Permission Validation Error | 4505:17721 | FRAME | 4899, 1017 | 1429×790 | 202 | 0 | 97 | 78 | 27 |
| TemplateMgmt | 4565:29308 | FRAME | -1463, 2420 | 376×490 | 51 | 0 | 19 | 32 | 0 |
| Failed to get appointment | 4567:30083 | FRAME | 16, 5209 | 1429×766 | 167 | 0 | 85 | 68 | 14 |
| Stage — app content behind the scrim | 5039:28223 | FRAME | 1789, 5382 | 800×420 | 7 | 7 | 0 | 0 | 0 |

**V2:AI Patient Summary** (3813:14586) — top-level nodes: 1
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| AI Note - Vew Patient Details (All Cards) | 3813:15084 | FRAME | 0, 0 | 1440×900 | 109 | 0 | 43 | 66 | 0 |

**-----COMPONENTS-----** (21:320) — top-level nodes: 0 (empty separator, no image)

**⚙️ Components** (21:321) — top-level nodes: 34
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| SectionMgmt | 21:585 | COMPONENT_SET | 10, -336 | 530×790 | 31 | 0 | 7 | 24 | 0 |
| Social | 26:10376 | COMPONENT_SET | 10, 616 | 582×1632 | 215 | 0 | 133 | 82 | 0 |
| PatientSummary | 127:3348 | COMPONENT | 1056, 44 | 634×883 | 8 | 0 | 4 | 4 | 0 |
| Frame 758532088 | 1663:20062 | FRAME | 1075, 1228 | 1381×148 | 24 | 0 | 3 | 7 | 14 |
| Sidesheetv3 | 129:6647 | COMPONENT_SET | -1888, -3940 | 18040×2415 | 4722 | 15 | 2892 | 1790 | 25 |
| sidebar | 4667:5031 | TEXT | 11410, -3233 | 56×20 | 0 | 0 | 0 | 0 | 0 |
| sidebar | 4667:13076 | TEXT | 12038, -3213 | 56×20 | 0 | 0 | 0 | 0 | 0 |
| sidebar | 4667:13077 | TEXT | 12632, -3203 | 56×20 | 0 | 0 | 0 | 0 | 0 |
| sidebar | 4667:13075 | TEXT | 10941, -3296 | 56×20 | 0 | 0 | 0 | 0 | 0 |
| Frame 758532122 | 3496:15087 | FRAME | 11702, -4177 | 26×24 | 0 | 0 | 0 | 0 | 0 |
| Slice 1 | 917:15599 | SLICE | -2539, -1433 | 100×100 | 0 | 0 | 0 | 0 | 0 |
| Modules_HFlex | 625:4598 | COMPONENT_SET | -4917, -2749 | 1397×80 | 32 | 0 | 0 | 10 | 22 |
| Frame 758532106 | 2198:9863 | FRAME | -5356, -2531 | 1975×406 | 44 | 0 | 0 | 44 | 0 |
| BlinkingTextCursor | 745:6722 | COMPONENT_SET | -1956, -328 | 37×121 | 0 | 0 | 0 | 0 | 0 |
| EditIcon | 749:7554 | COMPONENT_SET | -2408, -1552 | 72×128 | 2 | 0 | 0 | 2 | 0 |
| Module Dropdown | 776:5769 | COMPONENT_SET | -980, -360 | 408×932 | 44 | 0 | 15 | 9 | 20 |
| 8 | 968:14874 | FRAME | 2841, -266 | 1429×891 | 55 | 0 | 15 | 18 | 22 |
| Ready | 968:14897 | FRAME | 3888, 1906 | 755×659 | 104 | 0 | 52 | 48 | 4 |
| Recording | 4032:14352 | FRAME | 4702, 1906 | 755×659 | 104 | 0 | 52 | 48 | 4 |
| Paused | 4032:14534 | FRAME | 5542, 1906 | 755×659 | 104 | 0 | 52 | 48 | 4 |
| Paused | 4113:18278 | FRAME | 6317, 1906 | 755×659 | 104 | 0 | 52 | 48 | 4 |
| Frame 758532082 | 874:2359 | FRAME | -3283, -1792 | 331×213 | 2 | 0 | 1 | 1 | 0 |
| Footer | 883:6147 | FRAME | -4118, 1078 | 1397×70 | 35 | 0 | 29 | 6 | 0 |
| Check-Circle | 980:15872 | COMPONENT_SET | -1200, -100 | 142×96 | 1 | 0 | 0 | 1 | 0 |
| PatientHeader | 2133:8680 | COMPONENT_SET | 1716, 2345 | 1200×688 | 95 | 0 | 0 | 93 | 2 |
| Actions | 2133:9096 | COMPONENT_SET | 2171, 1824 | 577×132 | 20 | 0 | 0 | 20 | 0 |
| Primary Nav | 2189:10117 | FRAME | -332, 4795 | 1429×65 | 8 | 0 | 3 | 4 | 1 |
| Practice | 2189:10133 | FRAME | -216, 4564 | 65×65 | 1 | 0 | 0 | 1 | 0 |
| Dashboard | 2189:10294 | FRAME | -113, 4564 | 65×65 | 1 | 0 | 0 | 1 | 0 |
| TemplateMgmt | 2811:11430 | COMPONENT_SET | 779, -508 | 1502×501 | 191 | 0 | 69 | 122 | 0 |
| ShieldSet | 3513:14193 | COMPONENT_SET | 794, -1109 | 72×184 | 0 | 0 | 0 | 0 | 0 |
| Contextual Alert | 3551:14780 | INSTANCE | 11055, -4097 | 754×40 | 6 | 0 | 4 | 2 | 0 |
| NoteHeader | 4275:15830 | COMPONENT_SET | 758, -881 | 800×182 | 15 | 0 | 9 | 4 | 2 |
| Frame 758532164 | 4296:15558 | FRAME | -1743, -6993 | 2673×1681 | 129 | 0 | 81 | 45 | 3 |

**Demos/Protos** (3569:14562) — top-level nodes: 1
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Frame 1 | 3569:14563 | FRAME | 0, 0 | 638×700 | 73 | 0 | 50 | 22 | 1 |

**-----ARCHIVE-----** (105:1425) — top-level nodes: 0 (empty separator, no image)

**NeuNeu** (4740:14057) — top-level nodes: 26
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| MacBook Air - 10 | 4803:1007 | FRAME | 2111, -910 | 1146×832 | 86 | 42 | 0 | 40 | 4 |
| MacBook Air - 12 | 4879:1932 | FRAME | 2111, 1061 | 1146×832 | 189 | 43 | 66 | 73 | 7 |
| PatientHeader | 4807:12563 | COMPONENT | 784, -1651 | 1090×48 | 10 | 10 | 0 | 0 | 0 |
| MacBook Air - 11 | 4809:12930 | FRAME | 2111, 58 | 1280×832 | 89 | 54 | 0 | 31 | 4 |
| Frame 758532125 | 4800:20783 | FRAME | 3566, 221 | 363×242 | 7 | 7 | 0 | 0 | 0 |
| Patient Card | 4803:23538 | FRAME | 4004, 173 | 361×373 | 6 | 6 | 0 | 0 | 0 |
| MacBook Air - 5 | 4775:10790 | FRAME | 3331, -910 | 1280×832 | 64 | 26 | 2 | 35 | 1 |
| MacBook Air - 6 | 4792:14540 | FRAME | 4711, -910 | 1146×832 | 189 | 11 | 88 | 73 | 17 |
| With Legacy Nav | 4745:17168 | FRAME | -175, -948 | 1280×832 | 22 | 0 | 4 | 18 | 0 |
| SideRail | 4762:2160 | COMPONENT_SET | 1394, -3094 | 526×864 | 37 | 0 | 0 | 37 | 0 |
| Frame 758532158 | 4797:19845 | FRAME | 1976, -3723 | 1182×2312 | 210 | 183 | 0 | 7 | 20 |
| Sidesheetv3 | 4863:23145 | FRAME | 3818, -3068 | 441×600 | 37 | 2 | 22 | 13 | 0 |
| Sidesheetv3 | 4884:2634 | FRAME | 4357, -3068 | 441×503 | 48 | 8 | 20 | 20 | 0 |
| Autocomplete | 4797:20462 | FRAME | 3292, -3094 | 370×1500 | 38 | 0 | 38 | 0 | 0 |
| Frame 758532125 | 4801:21353 | FRAME | 3559, 560 | 415×114 | 4 | 4 | 0 | 0 | 0 |
| Frame 758532197 | 4803:23808 | FRAME | 3559, 743 | 675×104 | 11 | 11 | 0 | 0 | 0 |
| PracticeHeader | 4796:19669 | COMPONENT | 784, -1775 | 1090×55 | 4 | 3 | 0 | 1 | 0 |
| PatientNav | 4796:19668 | COMPONENT | 784, -1855 | 1090×25 | 0 | 0 | 0 | 0 | 0 |
| NavStack | 4845:22161 | COMPONENT_SET | 768, -1550 | 1122×352 | 51 | 39 | 0 | 3 | 9 |
| check_filled | 4868:23823 | INSTANCE | 3851, -3165 | 20×20 | 2 | 0 | 1 | 1 | 0 |
| add_circle_outline | 4868:23838 | INSTANCE | 3938, -3180 | 20×20 | 1 | 0 | 0 | 1 | 0 |
| Canvas Tools | 4907:2529 | INSTANCE | 1934, 2090 | 1392×64 | 40 | 0 | 0 | 40 | 0 |
| Sidesheetv3 | 4946:17224 | FRAME | 3570, 909 | 550×948 | 94 | 39 | 37 | 18 | 0 |
| Sidesheetv3 | 4946:17710 | FRAME | 4749, 909 | 550×948 | 79 | 24 | 37 | 18 | 0 |
| Sidesheetv3 | 4946:17965 | FRAME | 4157, 909 | 550×948 | 77 | 19 | 37 | 21 | 0 |
| Sidesheetv3 | 5034:19820 | FRAME | 5369, 909 | 550×948 | 67 | 12 | 37 | 18 | 0 |

**Neu** (1424:8259) — top-level nodes: 26
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| CONTAINER | 2154:9260 | FRAME | -3, -906 | 1280×768 | 179 | 0 | 68 | 96 | 15 |
| CONTAINER | 2162:7367 | FRAME | -3, -1837 | 1280×768 | 180 | 0 | 70 | 99 | 11 |
| SidePanelExpand1 | 2196:8153 | FRAME | -60, -2861 | 1156×768 | 182 | 0 | 66 | 100 | 16 |
| SidePanelExpand1 | 4113:19513 | FRAME | 2595, -392 | 1156×768 | 182 | 0 | 66 | 100 | 16 |
| Practice Header | 4113:20227 | FRAME | 2643, -656 | 1098×72 | 0 | 0 | 0 | 0 | 0 |
| SidePanelDpand2 | 2233:10042 | FRAME | 1477, -2876 | 1308×768 | 182 | 0 | 66 | 100 | 16 |
| SidePanelDpand2 | 2454:841 | FRAME | 1420, -4039 | 1308×768 | 181 | 0 | 66 | 100 | 15 |
| Rectangle 1 | 1424:8742 | RECTANGLE | -753, 129 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 2 | 1424:8743 | RECTANGLE | -701, 129 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 3 | 1424:8745 | RECTANGLE | -649, 129 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 4 | 1424:8746 | RECTANGLE | -597, 129 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 9 | 1631:18223 | RECTANGLE | -597, 55 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 10 | 1631:18225 | RECTANGLE | -597, -19 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 6 | 1631:18220 | RECTANGLE | -597, 213 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 7 | 1631:18221 | RECTANGLE | -597, 277 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 8 | 1631:18222 | RECTANGLE | -597, 356 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Rectangle 5 | 1424:8747 | RECTANGLE | -545, 129 | 39×43 | 0 | 0 | 0 | 0 | 0 |
| Frame 758532075 | 1586:17262 | FRAME | -387, -338 | 43×729 | 0 | 0 | 0 | 0 | 0 |
| CONTAINER | 2162:7723 | FRAME | 1462, -1837 | 1280×768 | 150 | 0 | 51 | 71 | 28 |
| Healthcare EHR Module Design | 2147:7288 | FRAME | 659, 1418 | 1359×907 | 0 | 0 | 0 | 0 | 0 |
| Icon_Home | 2196:8670 | COMPONENT_SET | 1, -3030 | 88×56 | 0 | 0 | 0 | 0 | 0 |
| Icon_Workspace | 2196:8673 | COMPONENT_SET | 211, -3038 | 87×56 | 0 | 0 | 0 | 0 | 0 |
| Icon_Pinned | 2196:8927 | COMPONENT_SET | 545, -3017 | 93×56 | 0 | 0 | 0 | 0 | 0 |
| keyboard_arrow_left_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1 | 2196:11185 | FRAME | 901, -3025 | 24×24 | 0 | 0 | 0 | 0 | 0 |
| App Icons | 2196:11421 | FRAME | -1316, -2618 | 96×65 | 0 | 0 | 0 | 0 | 0 |
| SIDENAV-FUTURE | 2230:8575 | COMPONENT_SET | -1017, -2881 | 561×800 | 40 | 0 | 0 | 32 | 8 |

**Sandbox** (112:4335) — top-level nodes: 19
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Main | 112:4336 | FRAME | 0, 0 | 1413×1555 | 130 | 0 | 65 | 65 | 0 |
| Main | 112:4605 | FRAME | 1620, 0 | 1413×1555 | 130 | 0 | 65 | 65 | 0 |
| Active AI Note | 112:4880 | FRAME | 0, 1894 | 1413×1525 | 147 | 0 | 79 | 68 | 0 |
| Active AI Note | 654:5587 | FRAME | 0, 3592 | 1413×804 | 8 | 0 | 4 | 4 | 0 |
| Primary Nav | 654:5588 | INSTANCE | 0, 3592 | 1413×65 | 8 | 0 | 4 | 4 | 0 |
| MegaMenu1 | 656:3881 | FRAME | 0, 4634 | 1413×869 | 16 | 0 | 8 | 8 | 0 |
| MegaMenu2 | 656:4110 | FRAME | 1480, 4634 | 1413×869 | 16 | 0 | 8 | 8 | 0 |
| MegaMenu2 | 660:4621 | FRAME | 0, 5698 | 1413×869 | 21 | 0 | 12 | 9 | 0 |
| MegaMenu2 | 664:5316 | FRAME | 1518, 5698 | 1413×869 | 21 | 0 | 12 | 9 | 0 |
| MegaMenu2 | 664:5529 | FRAME | 2966, 5698 | 1413×869 | 23 | 0 | 14 | 9 | 0 |
| MegaMenu3 | 656:4322 | FRAME | 3024, 4634 | 1413×869 | 21 | 0 | 12 | 9 | 0 |
| MegaMenu3 | 4136:4409 | FRAME | 4734, 3722 | 1413×662 | 241 | 0 | 165 | 76 | 0 |
| Frame 758532053 | 681:2827 | FRAME | -1010, 4634 | 879×1933 | 0 | 0 | 0 | 0 | 0 |
| SPA | 2443:9419 | FRAME | 1372, 13048 | 1359×918 | 0 | 0 | 0 | 0 | 0 |
| Container | 2443:9988 | FRAME | 2881, 13525 | 439×135 | 0 | 0 | 0 | 0 | 0 |
| Container | 2443:10008 | FRAME | 2881, 13728 | 406×113 | 0 | 0 | 0 | 0 | 0 |
| Container | 2443:10050 | FRAME | 2881, 13960 | 406×109 | 0 | 0 | 0 | 0 | 0 |
| Frame 758532068 | 4155:4495 | FRAME | 6828, 3722 | 549×917 | 156 | 0 | 110 | 46 | 0 |
| Frame 758532069 | 4207:15079 | FRAME | 8121, 3722 | 959×148 | 12 | 0 | 8 | 4 | 0 |

**Misc** (4250:14678) — top-level nodes: 2
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Appointment Selection | 4250:15022 | FRAME | -196, -169 | 457×315 | 9 | 0 | 6 | 3 | 0 |
| Frame 758531120 | 4348:12604 | FRAME | -149, 355 | 1123×175 | 72 | 0 | 44 | 28 | 0 |

**NoFolder Navigation** (12:866) — top-level nodes: 7
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Main | 26:10816 | FRAME | 1876, -8 | 1413×2643 | 187 | 0 | 94 | 91 | 2 |
| Main | 74:647 | FRAME | 5101, -8 | 1413×2345 | 779 | 0 | 157 | 622 | 0 |
| Frame 758532023 | 77:4715 | FRAME | 6898, 393 | 843×38 | 0 | 0 | 0 | 0 | 0 |
| Note | 26:11726 | INSTANCE | 1415, -8 | 449×200 | 2 | 0 | 0 | 2 | 0 |
| 📝 Annotation · SectionMgmt | 26:11864 | GROUP | 3233, 944 | 710×156 | 0 | 0 | 0 | 0 | 0 |
| 📝 Annotation · Button | 26:11883 | GROUP | 3249, 1590 | 440×96 | 0 | 0 | 0 | 0 | 0 |
| Module Dropdown | 63:463 | FRAME | 1438, 266 | 404×412 | 21 | 0 | 12 | 9 | 0 |

**Folder Navigation** (10:14) — top-level nodes: 1
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| CurrentHeader | 10:2208 | FRAME | 0, 0 | 1413×2824 | 195 | 0 | 72 | 123 | 0 |

**-----RESEARCH------** (4211:15272) — top-level nodes: 0 (empty separator, no image)

**Maps** (4211:15273) — top-level nodes: 13
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Frame 4 | 4211:15346 | FRAME | -313, -477 | 1293×1072 | 0 | 0 | 0 | 0 | 0 |
| Frame 10 | 4211:15390 | FRAME | -519, 979 | 443×1068 | 0 | 0 | 0 | 0 | 0 |
| Frame 16 | 4211:15493 | FRAME | 159, 3395 | 443×352 | 0 | 0 | 0 | 0 | 0 |
| Frame 18 | 4211:15501 | FRAME | 743, 3395 | 443×352 | 0 | 0 | 0 | 0 | 0 |
| Frame 20 | 4211:15509 | FRAME | 1283, 3383 | 443×376 | 0 | 0 | 0 | 0 | 0 |
| Frame 31 | 4216:52 | FRAME | 159, 825 | 1499×496 | 0 | 0 | 0 | 0 | 0 |
| Frame 30 | 4216:51 | FRAME | 159, 1466 | 1576×1648 | 0 | 0 | 0 | 0 | 0 |
| Frame 14 | 4211:15485 | FRAME | 1932, 1039 | 443×952 | 0 | 0 | 0 | 0 | 0 |
| Frame 22 | 4215:2 | FRAME | 3521, -299 | 443×1000 | 0 | 0 | 0 | 0 | 0 |
| Frame 23 | 4215:6 | FRAME | 4135, -299 | 443×616 | 0 | 0 | 0 | 0 | 0 |
| Frame 29 | 4215:31 | FRAME | 4645, -307 | 459×2148 | 0 | 0 | 0 | 0 | 0 |
| Frame 26 | 4215:18 | FRAME | 5139, -307 | 459×1316 | 0 | 0 | 0 | 0 | 0 |
| Frame 21 | 4211:15513 | FRAME | 1797, -357 | 443×640 | 0 | 0 | 0 | 0 | 0 |

**Research Framework** (1236:3155) — top-level nodes: 1
| Name | Id | Type | x, y | w×h | Inst | DSR | Kit | Other | Local |
|---|---|---|---|---|---|---|---|---|---|
| Frame 1 | 1236:3156 | FRAME | -409, 0 | 1231×369 | 0 | 0 | 0 | 0 | 0 |

## Other-library groups

Four name patterns among the 207 "other" keys: (1) a categorised icon pack ("Interface, Essential/…", "Health, Medicine/…"); (2) Material-style "Style=Outlined" icons (calendar_today, expand_more, add); (3) components whose parent-set names match component sets that exist LOCALLY on this file's ⚙️ Components page (SectionMgmt, Check-Circle, Modules, Sidesheetv3, TemplateMgmt) — consistent with this file being a duplicate of, or consuming, an earlier NDE file; (4) kit-style names (close, plus, security, "Icon Button/Default/Small/…", "_icon button template", Badge, Divider) whose keys are not in the kit canvas today. Which files these come from is NOT determined here; the plugin API exposes no library file key for a remote component. Reported, not resolved.

| Group | Keys | Instances | Examples |
|---|---|---|---|
| categorisedIconPack | 72 | 3775 | Health, Medicine/Syringe; Arrows, Diagrams/Arrow; Interface, Essential/bulb-light-gloss; Health, Medicine/shield-virus-protection; Health, Medicine/medical-cross-refreash-reload-arrow; Health, Medicine/Drugs, Pill; Health, Medicine/prescription-square; School, Learning/Lab, Tube; Science/lab-tube; Interface, Essential/Delete, Disabled; Health, Medicine/Scales,Weight, Diet Scale; Weather, Climate/Temperature |
| kitStyleNamesNotInCurrentKitCanvas | 54 | 4399 | rcm-overview; tutorial; Caption; menu; Message_light; security_outline; security; close; plus; close-alt; Icon Button/Default/Small/False/False; _icon button template |
| namesMatchingLocalOrProductComponents | 58 | 1272 | Check-Circle / Mode=NotSelected; Note / Color=1. Yellow, Dark=True; Bullet / Color=1. Yellow, Dark=True; nav / payments / State=inactive; Badge / Type=Basic; ThumbsUp / State=Default; ThumbsDown / State=Default; TemplateMgmt; ConfigAndData-Line-Don't remove!; Check-Circle / Mode=Selected; Breadcrumb Buttons / Type=Back Button, State=Default; Breadcrumbs / Stste=Default |
| materialStyleIcons | 23 | 183 | print / Style=Outlined; star_border / Style=Outlined; check_circle / Style=Filled; star / Style=Outlined; expand_more / Style=Outlined; dashboard / Style=Outlined; calendar_today / Style=Outlined; work_outline / Style=Outlined; person / Style=Outlined; business / Style=Outlined; attach_money / Style=Outlined; close / Style=Outlined |

## Staleness evidence (listed, not judged)

Evidence only. Nothing here decides which frames are current.

### Page and node names

| Page | Kind | Id | Name | Term |
|---|---|---|---|---|
| V2:AI Patient Summary | page | 3813:14586 | V2:AI Patient Summary | V2 |
| -----ARCHIVE----- | page | 105:1425 | -----ARCHIVE----- | ARCHIVE |
| Neu | page | 1424:8259 | Neu | Neu (additional term) |
| Workflows | RECTANGLE | 3806:13143 | Screenshot 2026-05-05 at 9.44.35 AM 1 | 2026 |
| NeuNeu | FRAME | 4745:17168 | With Legacy Nav | Legacy |
| Neu | COMPONENT_SET | 2230:8575 | SIDENAV-FUTURE | FUTURE (additional term) |

### Near-duplicates

| Page | By | Value | Nodes |
|---|---|---|---|
| Workflows | name | Rec_Ready | 3124:12369; 4841:17077; 4841:18039 |
| Workflows | dimensions | 2922x2008 | 3943:12393 Frame 758532141; 4317:11594 Frame 758532154 |
| Workflows | dimensions | 1429x1013 | 3124:12369 Rec_Ready; 4841:17077 Rec_Ready; 4841:18039 Rec_Ready; 3159:20067 Rec_Started; 4296:17197 Rec_Paused; 4275:15285 Rec_Processing; 4294:15013 Rec_Closed; 3159:21282 Rec_Open; 4439:16310 Replace_Section_Modal |
| Error States | name | Transcription service disconnected | 4508:23664; 4508:24088; 4549:28463; 4597:30566; 4508:26782; 4508:24483 |
| Error States | dimensions | 1429x790 | 4494:15947 Cost Disclosure; 4505:16648 Session Timeout; 4507:22770 E-11 Mic Disconnected; 4508:23234 Session ID Failures; 4505:17114 Internal Service Error - Failed Call for Recording; 4505:17721 Permission Validation Error |
| Error States | dimensions | 1429x766 | 4505:18288 E-06; 4508:23664 Transcription service disconnected; 4508:24088 Transcription service disconnected; 4549:28463 Transcription service disconnected; 4597:30566 Transcription service disconnected; 4508:26782 Transcription service disconnected; 4508:24483 Transcription service disconnected; 4505:19685 E-07; 4507:22374 No mics detected; 4507:21046 E-09; 4567:30083 Failed to get appointment |
| ⚙️ Components | name | sidebar | 4667:5031; 4667:13076; 4667:13077; 4667:13075 |
| ⚙️ Components | name | Paused | 4032:14534; 4113:18278 |
| ⚙️ Components | dimensions | 56x20 | 4667:5031 sidebar; 4667:13076 sidebar; 4667:13077 sidebar; 4667:13075 sidebar |
| ⚙️ Components | dimensions | 755x659 | 968:14897 Ready; 4032:14352 Recording; 4032:14534 Paused; 4113:18278 Paused |
| ⚙️ Components | dimensions | 65x65 | 2189:10133 Practice; 2189:10294 Dashboard |
| NeuNeu | name | Frame 758532125 | 4800:20783; 4801:21353 |
| NeuNeu | name | Sidesheetv3 | 4863:23145; 4884:2634; 4946:17224; 4946:17710; 4946:17965; 5034:19820 |
| NeuNeu | dimensions | 1146x832 | 4803:1007 MacBook Air - 10; 4879:1932 MacBook Air - 12; 4792:14540 MacBook Air - 6 |
| NeuNeu | dimensions | 1280x832 | 4809:12930 MacBook Air - 11; 4775:10790 MacBook Air - 5; 4745:17168 With Legacy Nav |
| NeuNeu | dimensions | 20x20 | 4868:23823 check_filled; 4868:23838 add_circle_outline |
| NeuNeu | dimensions | 550x948 | 4946:17224 Sidesheetv3; 4946:17710 Sidesheetv3; 4946:17965 Sidesheetv3; 5034:19820 Sidesheetv3 |
| Neu | name | CONTAINER | 2154:9260; 2162:7367; 2162:7723 |
| Neu | name | SidePanelExpand1 | 2196:8153; 4113:19513 |
| Neu | name | SidePanelDpand2 | 2233:10042; 2454:841 |
| Neu | dimensions | 1280x768 | 2154:9260 CONTAINER; 2162:7367 CONTAINER; 2162:7723 CONTAINER |
| Neu | dimensions | 1156x768 | 2196:8153 SidePanelExpand1; 4113:19513 SidePanelExpand1 |
| Neu | dimensions | 1308x768 | 2233:10042 SidePanelDpand2; 2454:841 SidePanelDpand2 |
| Neu | dimensions | 39x43 | 1424:8742 Rectangle 1; 1424:8743 Rectangle 2; 1424:8745 Rectangle 3; 1424:8746 Rectangle 4; 1631:18223 Rectangle 9; 1631:18225 Rectangle 10; 1631:18220 Rectangle 6; 1631:18221 Rectangle 7; 1631:18222 Rectangle 8; 1424:8747 Rectangle 5 |
| Sandbox | name | Main | 112:4336; 112:4605 |
| Sandbox | name | Active AI Note | 112:4880; 654:5587 |
| Sandbox | name | MegaMenu2 | 656:4110; 660:4621; 664:5316; 664:5529 |
| Sandbox | name | MegaMenu3 | 656:4322; 4136:4409 |
| Sandbox | name | Container | 2443:9988; 2443:10008; 2443:10050 |
| Sandbox | dimensions | 1413x1555 | 112:4336 Main; 112:4605 Main |
| Sandbox | dimensions | 1413x869 | 656:3881 MegaMenu1; 656:4110 MegaMenu2; 660:4621 MegaMenu2; 664:5316 MegaMenu2; 664:5529 MegaMenu2; 656:4322 MegaMenu3 |
| NoFolder Navigation | name | Main | 26:10816; 74:647 |
| Maps | dimensions | 443x352 | 4211:15493 Frame 16; 4211:15501 Frame 18 |

### Visible text

Nearly all date strings are sample patient data (DOB 08/01/1994, lab dates 5/25/25–7/18/25) repeated through the kit's note template; those inside remote instances are library defaults. Authored-in-file items of note: "2026 // Charts" on the Cover; "Status: Signed Final … Signed: 03/03/2026" and "04/24/26 11:46 AM" on Workflows; "DRAFT • 08/09/2025" and "Dates: 08/09/2025" on ⚙️ Components frame "8" (968:14874); "Draft" text on Neu 2147:7397 and Components 129:7490/129:7542; "Archived" on NeuNeu Autocomplete frame 4797:20527; "February 2021"/"March 2021" on Error States E-06; "February 31, 2026" (a non-existent date) on Misc 4250:15000; "Encounter - Aug 21 2026" throughout NeuNeu; a rectangle named "Screenshot 2026-05-05 at 9.44.35 AM 1" on Workflows.

| Page | String | Count | Inside remote instances | Frames | Authored text ids |
|---|---|---|---|---|---|
| Cover | 2026 // Charts | 1 | 0 | 10:4 | 10:9 |
| Workflows | DOB: 08/01/1994 (29 y/o) | 39 | 0 | 3943:12393, 4317:11594, 4715:26647, 5093:18693, 3943:12395, 3943:12402 | 112:5666, 112:6140, 4317:11614 |
| Workflows | 04/18/2022 | 21 | 0 | 3943:12393, 4317:11594, 4715:26647, 5093:18693, 3943:12395, 3943:12402 | 112:5677, 112:6151, 4317:11625 |
| Workflows | Current Situation 32-year-old male presenting for sick visit | 4 | 4 | 3943:12393, 4317:11594 |  |
| Workflows | Save as Draft | 36 | 36 | 3943:12393, 4317:11594, 4715:26647, 5093:18693, 3943:12395, 3943:12402 |  |
| Workflows | Created by Steven Strange on 1/23/24 | 96 | 96 | 3943:12393, 4317:11594, 4715:26647, 5093:18693, 3943:12395, 3943:12402 |  |
| Workflows | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 50 | 49 | 3943:12393, 4317:11594, 4715:26647, 5093:18693, 3943:12395, 3943:12402 | 3456:13226 |
| Workflows | 5/25/25 | 100 | 98 | 3943:12393, 4317:11594, 4715:26647, 5093:18693, 3943:12395, 3943:12402 | 3456:13263, 3456:13415 |
| Workflows | 6/20/25 | 100 | 98 |  |  |
| Workflows | 6/29/25 | 100 | 98 |  |  |
| Workflows | 7/18/25 | 100 | 98 |  |  |
| Workflows | Created by Tebra on 1/23/24 | 2 | 2 | 3943:12393, 4317:11594 |  |
| Workflows | 11/21/24 | 2 | 2 | 4715:26647 |  |
| Workflows | Status: Signed Final Author: John Doe, MD Signed: 03/03/2026 | 4 | 0 | 3943:13025, 3943:13029 | 2175:9406, 3534:17566, 3534:17167 |
| Workflows | HPI: 36-year-old male presents with 3-month history of worse | 4 | 0 | 3943:13025, 3943:13029 | 2175:9432, 2175:10202, 3534:17176 |
| Workflows | 04/24/26 11:46 AM | 2 | 0 | 3943:13025, 3943:13029 | 3534:17614, 3541:14298 |
| Workflows | 4/27/26 | 1 | 0 | 3456:11505 | 3456:13210 |
| Workflows | 5/1/26 | 1 | 0 | 3456:11505 | 3456:13212 |
| Workflows | 4/21/26 | 1 | 0 | 3456:11505 | 3456:13215 |
| Workflows | 4/12/26 | 1 | 0 | 3456:11505 | 3456:13218 |
| Workflows | DoS: 3/26/26 (last update 3/28/26) | 1 | 0 | 3810:13146 | 3810:13240 |
| Error States | DOB: 08/01/1994 (29 y/o) | 17 | 0 | 4494:15947, 4505:18288, 4508:23664, 4508:24088, 4549:28463, 4597:30566 | 4494:15962, 4505:18303, 4508:23679 |
| Error States | Save as Draft | 17 | 17 |  |  |
| Error States | Created by Steven Strange on 1/23/24 | 38 | 36 |  | 4507:21217, 4565:29332 |
| Error States | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 20 | 18 |  | 4507:21220, 4565:29335 |
| Error States | 5/25/25 | 40 | 36 |  | 4507:21257, 4507:21409, 4565:29372 |
| Error States | 6/20/25 | 40 | 36 |  |  |
| Error States | 6/29/25 | 40 | 36 |  |  |
| Error States | 7/18/25 | 40 | 36 |  |  |
| Error States | February 2021 | 1 | 0 | 4505:18288 | 4565:29949 |
| Error States | March 2021 | 1 | 0 | 4505:18288 | 4565:29994 |
| Error States | Created by Tebra on 1/23/24 | 2 | 0 | 4507:21046, 4565:29308 | 4507:21214, 4565:29329 |
| V2:AI Patient Summary | 06/19/24 | 1 | 1 | 3813:15084 |  |
| V2:AI Patient Summary | 09/22/2024 | 1 | 0 | 3813:15084 | 3813:15167 |
| V2:AI Patient Summary | Current Situation 32-year-old male presenting for sick visit: sore throat, nasal | 1 | 0 | 3813:15084 | 3813:15585 |
| V2:AI Patient Summary | Key Background Previous Buspirone trial discontinued due to dizziness (2023). | 1 | 0 | 3813:15084 | 3813:15586 |
| V2:AI Patient Summary | DOB: 08/01/1992 (32 y/o) | 1 | 0 | 3813:15084 | 3813:15285 |
| ⚙️ Components | Current Situation 32-year-old male presenting for sick visit | 4 | 0 | 127:3348, 129:6647 | 127:3154, 3028:16365, 3028:16381 |
| ⚙️ Components | DOB: 08/01/1994 (29 y/o) | 2 | 0 | 1663:20062, 968:14874 | 1663:20074, 968:14889 |
| ⚙️ Components | 04/18/2022 | 1 | 0 | 1663:20062 | 1663:20085 |
| ⚙️ Components | 6/3/26 32-year-old male presenting for sick visit: sore thro | 1 | 0 | 129:6647 | 4079:15504 |
| ⚙️ Components | 6/1/26 32-year-old male presenting for sick visit: sore thro | 1 | 0 | 129:6647 | 4079:15578 |
| ⚙️ Components | 2/1/26 | 3 | 0 | 129:6647, 4296:15558 | 939:9256, 917:15551, 4305:21717 |
| ⚙️ Components | 3/4/26 | 2 | 0 | 129:6647 | 893:3615, 909:12698 |
| ⚙️ Components | Draft | 3 | 1 | 129:6647 | 129:7490, 129:7542 |
| ⚙️ Components | 10/30/25 | 1 | 0 | 129:6647 | 129:7482 |
| ⚙️ Components | 10/20/25 | 1 | 0 | 129:6647 | 129:7487 |
| ⚙️ Components | 10/25/25 | 7 | 0 | 129:6647 | 129:7563, 129:7570, 129:7577 |
| ⚙️ Components | 10/25/25 Client reports ongoing stress related to work deadl | 1 | 0 | 129:6647 | 129:7724 |
| ⚙️ Components | 11/3/25 Lorem ipsum dolor sit amet consectetur. Aliquam veli | 1 | 0 | 129:6647 | 129:7725 |
| ⚙️ Components | 10/25/25 - 10/26/25 | 3 | 0 | 129:6647 | 129:7803, 129:8389, 648:1858 |
| ⚙️ Components | 11/21/24-11/31/24 | 1 | 0 | 129:6647 | 648:3644 |
| ⚙️ Components | 10/25/16 | 1 | 0 | 129:6647 | 129:8824 |
| ⚙️ Components | 2014-08-23 | 1 | 0 | 129:6647 | 129:9117 |
| ⚙️ Components | 11/21/24 | 2 | 0 | 129:6647 | 4598:31377, 4695:13240 |
| ⚙️ Components | 10/27/23 | 4 | 0 | 129:6647 | 129:10409, 129:10422, 129:10445 |
| ⚙️ Components | 4/11/26 | 10 | 2 | 129:6647, 4296:15558 | 3496:14067, 3496:14274, 3569:22407 |
| ⚙️ Components | 4/14/26 | 12 | 3 | 129:6647, 4296:15558 | 3496:14295, 3496:14314, 3496:14333 |
| ⚙️ Components | 01/14/26 | 1 | 0 | 129:6647 | 3501:15730 |
| ⚙️ Components | 11/02/25 | 1 | 0 | 129:6647 | 3501:15731 |
| ⚙️ Components | 10/22/25 | 1 | 0 | 129:6647 | 3501:15732 |
| ⚙️ Components | 09/14/25 | 1 | 0 | 129:6647 | 3501:15733 |
| ⚙️ Components | 09/01/25 | 1 | 0 | 129:6647 | 3501:15734 |
| ⚙️ Components | 4/22/26 | 1 | 0 | 129:6647 | 3496:15079 |
| ⚙️ Components | 4/21/26 | 6 | 0 | 129:6647 | 3496:13917, 3496:13934, 3496:13950 |
| ⚙️ Components | 11/2/25 | 1 | 0 | 129:6647 | 2116:9033 |
| ⚙️ Components | 10/14/25 | 1 | 0 | 129:6647 | 2116:9077 |
| ⚙️ Components | 11/3/25 | 2 | 0 | 129:6647 | 129:11274, 129:11292 |
| ⚙️ Components | DRAFT • 08/09/2025 | 1 | 0 | 968:14874 | 968:15022 |
| ⚙️ Components | Dates: 08/09/2025 | 2 | 0 | 968:14874 | 968:15049, 968:15076 |
| ⚙️ Components | Created by Steven Strange on 1/23/24 | 11 | 8 | 968:14897, 4032:14352, 4032:14534, 4113:18278, 2811:11430 | 2811:11453, 2811:12001, 2811:12261 |
| ⚙️ Components | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 8 | 4 | 968:14897, 4032:14352, 4032:14534, 4113:18278, 2811:11430 | 2811:11456, 2811:12009, 2811:12269 |
| ⚙️ Components | 5/25/25 | 16 | 8 |  |  |
| ⚙️ Components | 6/20/25 | 16 | 8 |  |  |
| ⚙️ Components | 6/29/25 | 16 | 8 |  |  |
| ⚙️ Components | 7/18/25 | 16 | 8 |  |  |
| ⚙️ Components | 04/22/26 | 3 | 0 | 4032:14352, 4032:14534, 4113:18278 | 4032:14386, 4032:14568, 4113:18312 |
| ⚙️ Components | Save as Draft | 1 | 1 | 883:6147 |  |
| ⚙️ Components | DOB: 04/21/1982 | 3 | 0 | 2133:8680 | 2133:8691, 2133:8822, 2133:8955 |
| ⚙️ Components | 04/21/1982 | 3 | 0 | 2133:8680 | 2133:8773, 2133:8906, 2133:8987 |
| ⚙️ Components | 10/23/25 | 3 | 0 | 2133:8680 | 2133:8783, 2133:8916, 2133:9007 |
| ⚙️ Components | 1/21/26 | 3 | 0 | 2133:8680 | 2133:8788, 2133:8921, 2133:9012 |
| ⚙️ Components | Created by Tebra on 1/23/24 | 4 | 0 | 2811:11430 | 2811:11450, 2811:11997, 2811:12257 |
| Demos/Protos | 4/11/26 | 2 | 2 | 3569:14563 |  |
| Demos/Protos | 4/14/26 | 3 | 3 | 3569:14563 |  |
| NeuNeu | DOB: 04/21/1982 | 11 | 11 | 4803:1007, 4879:1932, 4807:12563, 4809:12930, 4745:17168, 4797:19845 | 4775:10830, 4792:14580, 4745:17263 |
| NeuNeu | Encounter - Aug 21 2026 | 16 | 0 | 4803:1007, 4879:1932, 4809:12930, 4775:10790, 4792:14540, 4797:19845 | 4803:1397, 4803:1409, 4881:3008 |
| NeuNeu | 8/21/26 | 6 | 0 | 4803:1007, 4879:1932, 4809:12930, 4775:10790 | 4803:1045, 4881:18753, 4809:12981 |
| NeuNeu | 10/21/26 @ 11:30 AM | 2 | 0 | 4803:1007, 4809:12930 | 4803:1063, 4809:12999 |
| NeuNeu | Save as Draft | 2 | 2 | 4879:1932, 4792:14540 |  |
| NeuNeu | Created by Steven Strange on 1/23/24 | 4 | 4 | 4879:1932, 4792:14540 |  |
| NeuNeu | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 2 | 2 | 4879:1932, 4792:14540 |  |
| NeuNeu | 5/25/25 6/20/25 6/29/25 7/18/25 (kit note defaults) | 16 | 16 | 4879:1932, 4792:14540 |  |
| NeuNeu | 4/26/1988 (38) | 2 | 0 | 4803:23538, 4801:21353 | 4803:23548, 4801:21363 |
| NeuNeu | 8/18/26 | 2 | 0 | 4803:23538, 4801:21353 | 4803:23551, 4801:21361 |
| NeuNeu | 8/12/26 | 2 | 0 | 4803:23538 | 4803:23561, 4803:23572 |
| NeuNeu | 08/21/26 | 1 | 0 | 4775:10790 | 4788:14475 |
| NeuNeu | Last appointment: 6/12/26 | 1 | 0 | 4775:10790 | 4778:11742 |
| NeuNeu | Appointment date: 6/12/26 | 1 | 0 | 4775:10790 | 4778:11755 |
| NeuNeu | 02/12/2023 02/11/2023 02/07/2023 01/03/2023 10/15/2022 02/08/2023 10/01/2022 | 7 | 0 | 4775:10790 | 4779:13237, 4779:13243, 4779:13247 |
| NeuNeu | Archive | 1 | 1 | 4797:19845 |  |
| NeuNeu | Reviewed by Dr. Lee on 08/21/26 | 2 | 0 | 4863:23145 | 4863:23458, 4863:23473 |
| NeuNeu | Ordered  by Dr. Lee on 08/21/26 | 1 | 0 | 4863:23145 | 4867:23787 |
| NeuNeu | 11/21/24-11/31/24 | 1 | 0 | 4884:2634 | 4885:6143 |
| NeuNeu | Archived | 1 | 0 | 4797:20462 | 4797:20527 |
| NeuNeu | 4/22/28 | 1 | 1 | 4803:23808 |  |
| NeuNeu | 09/12/25 | 1 | 1 | 4803:23808 |  |
| NeuNeu | 4/21/87 | 1 | 1 | 4946:17224 |  |
| Neu | 4:00 PM / 2/25/26 | 5 | 0 | 2154:9260 | 2154:9346, 2154:9349, 2154:9352 |
| Neu | DOB: 08/01/1994 (29 y/o) | 1 | 0 | 2154:9260 | 2154:9379 |
| Neu | 04/18/2022 | 1 | 0 | 2154:9260 | 2154:9390 |
| Neu | Current Situation 32-year-old male presenting for sick visit | 7 | 7 | 2154:9260, 2162:7367, 2196:8153, 4113:19513, 2233:10042, 2454:841 |  |
| Neu | 3/3/26 | 3 | 0 | 2154:9260, 2454:841, 2162:7723 | 2185:8235, 2454:1394, 2454:1377 |
| Neu | Save as Draft | 7 | 7 |  |  |
| Neu | Created by Steven Strange on 1/23/24 | 26 | 26 |  |  |
| Neu | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 13 | 13 |  |  |
| Neu | 5/25/25 6/20/25 6/29/25 7/18/25 (kit note defaults) | 104 | 104 |  |  |
| Neu | Last: 4/15/25 | 7 | 3 | 2162:7367, 2196:8153, 4113:19513, 2233:10042, 2454:841, 2230:8575 | 2189:10953, 2454:1534, 2196:11233 |
| Neu | 04/21/1982 | 3 | 0 | 2162:7367, 4113:20227 | 2189:11248, 4120:20633, 4113:20331 |
| Neu | DOB: 04/21/1982 | 11 | 0 | 2162:7367, 2196:8153, 4113:19513, 2233:10042, 2454:841, 2162:7723 | 2162:8256, 2196:8965, 2196:8354 |
| Neu | 03/25/26 | 24 | 12 | 2196:8153, 4113:19513, 2233:10042, 2454:841, 2230:8575 | 2454:1599, 2454:1613, 2454:1622 |
| Neu | Patient is a 58-year-old with multiple chronic conditions pr | 1 | 0 | 2147:7288 | 2147:7334 |
| Neu | Draft | 1 | 0 | 2147:7288 | 2147:7397 |
| Sandbox | DOB: 08/01/1994 (29 y/o) | 13 | 0 | 112:4336, 112:4605, 112:4880, 654:5587, 656:3881, 656:4110 | 112:4350, 112:4619, 112:4894 |
| Sandbox | 04/18/2022 | 13 | 0 | 112:4336, 112:4605, 112:4880, 654:5587, 656:3881, 656:4110 | 112:4361, 112:4630, 112:4905 |
| Sandbox | last updated 1/6/26 at 1:29 PM | 3 | 0 | 112:4336, 112:4605, 112:4880 | 112:4414, 112:4683, 112:4958 |
| Sandbox | 36 y/o (4/21/1988) | 3 | 3 | 112:4336, 112:4605, 112:4880 |  |
| Sandbox | 12/2/25 | 3 | 0 | 112:4336, 112:4605, 112:4880 | 112:4465, 112:4734, 112:5009 |
| Sandbox | Save as Draft | 3 | 3 |  |  |
| Sandbox | Created by Steven Strange on 1/23/24 | 6 | 6 |  |  |
| Sandbox | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 3 | 3 |  |  |
| Sandbox | 5/25/25 6/20/25 6/29/25 7/18/25 (kit note defaults) | 24 | 24 |  |  |
| Misc | February 26, 2026 | 1 | 0 | 4250:15022 | 4250:15019 |
| Misc | February 31, 2026 | 1 | 0 | 4250:15022 | 4250:15000 |
| Misc | March 15, 2026 | 1 | 0 | 4250:15022 | 4250:15002 |
| NoFolder Navigation | DOB: 08/01/1994 (29 y/o) | 2 | 0 | 26:10816, 74:647 | 26:10830, 74:661 |
| NoFolder Navigation | 04/18/2022 | 2 | 0 | 26:10816, 74:647 | 26:10841, 74:672 |
| NoFolder Navigation | last updated 1/6/26 at 1:29 PM | 2 | 0 | 26:10816, 74:647 | 26:11867, 74:725 |
| NoFolder Navigation | 36 y/o (4/21/1988) | 2 | 2 | 26:10816, 74:647 |  |
| NoFolder Navigation | 10/25/25 | 4 | 0 | 26:10816 | 26:10943, 26:10949, 26:10956 |
| NoFolder Navigation | 12/2/25 | 2 | 0 | 26:10816, 74:647 | 26:10975, 74:846 |
| NoFolder Navigation | Save as Draft | 2 | 2 |  |  |
| NoFolder Navigation | Created by Steven Strange on 1/23/24 | 4 | 4 |  |  |
| NoFolder Navigation | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 2 | 2 |  |  |
| NoFolder Navigation | 5/25/25 6/20/25 6/29/25 7/18/25 (kit note defaults) | 16 | 16 |  |  |
| NoFolder Navigation | DataGrid patient DOB/visit dates (1/12/1951 ... 10/6/2018), ~60 cells | 60 | 60 | 74:647 |  |
| Folder Navigation | DOB: 08/01/1994 (29 y/o) | 1 | 0 | 10:2208 | 10:2223 |
| Folder Navigation | 04/18/2022 | 1 | 0 | 10:2208 | 10:2234 |
| Folder Navigation | 36 y/o (4/21/1988) | 1 | 1 | 10:2208 |  |
| Folder Navigation | 10/25/25 | 4 | 0 | 10:2208 | 10:2332, 10:2338, 10:2345 |
| Folder Navigation | 12/2/25 | 1 | 0 | 10:2208 | 10:2436 |
| Folder Navigation | Save as Draft | 1 | 1 |  |  |
| Folder Navigation | Created by Steven Strange on 1/23/24 | 2 | 2 |  |  |
| Folder Navigation | Lipid Panel (1/27/25) shows cholesterol levels slightly abov | 2 | 2 |  |  |
| Folder Navigation | 5/25/25 6/20/25 6/29/25 7/18/25 (kit note defaults) | 16 | 16 |  |  |

## Schema record summary

Key `npveRebuild_enum_2026-09-02` holds: _status, fileIdentityCheck, method, pages[18] with frames[178], provenanceSummary (totals, otherRemoteGroups), staleness (pageNames, frameAndNodeNames, nearDuplicates, visibleText), caveats. Raw per-frame key maps and both library key-prefix sets are in `enum-data.json`. Flags: npveSource_pageNameV2, npveSource_archiveSeparatorPage, npveSource_neuNeuNeuNaming, npveSource_screenshotRectangleDated, npveSource_nearDuplicateFrames, npveSource_draftAndArchivedLabels, npveSource_impossibleDateInMock, npveSource_libraryProvenanceSplit, npveSource_fullyCoveredFrame.

Caveats:

- Sections: none exist in the source; every top-level node is a FRAME, COMPONENT, COMPONENT_SET, INSTANCE, GROUP, TEXT, RECTANGLE or SLICE.
- Instance counts include instances nested inside instances (an icon inside a button counts as its own instance).
- Two large kit component sets on ⚙️ Components dominate counts: Sidesheetv3 (129:6647) alone holds 4,722 instances.
- Elements inside frames were not inventoried and nothing was mapped to library components, per instruction.