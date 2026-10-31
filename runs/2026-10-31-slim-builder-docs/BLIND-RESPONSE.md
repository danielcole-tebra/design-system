# Blind agent response

Fresh subagent, no parent-history fork; only four active files allowed. Response retained verbatim below (Markdown formatting preserved).

1. Use **opaque #CBDDE0**, code token `action.hover`, recorded Figma variable `color/action/hover`, for the standard Icon button’s hover background. No design question or finding is needed for that documented value. (LIBRARY.md, **Icon button**, **Token mappings**.)

2. The documented clickable filled primary Chip hovers to **`primary.dark` #004852**, identical to its resting `primary.main`; it produces no visible colour change. **DECISION `primary-chip-visible-hover`:** Daniel must choose the requested departure; no replacement colour is approved. The `color/primary/dark` Figma mapping is plan-only and unverified. (LIBRARY.md, **Chip**, **Token mappings**; OPEN-ISSUES.md, **`primary-chip-visible-hover`**.)

3. The dialog title uses **substrate Typography `h6`, Akkurat Regular**, with intended Figma size **20px**. Code requests weight 500 and `pxToRem(20)`, documented as rendering Regular at approximately 22.86px. Resolved line-height and published text-style name are unknown; do not substitute `h3` Bold. (LIBRARY.md, **Dialog and Drawer**, **Typography**.)

4. For a visually outlined secondary action, use **Button `variant=contained, color=primary`**: white `common.white` fill, 1px `core.main` border, `core.contrastText` label, and `action.hover` hover ground. Match the approved form’s size and action order; neither is supplied here. No `outlined` Figma variant is recorded. Clarify only if “secondary” explicitly means `color=secondary`, which gives coral. (LIBRARY.md, **Button**; COMPOSITIONS.md, **Actions and section labels**, **Edit forms on paper**.)

5. **DECISION: confirm the variant.** A filled warning banner has **`warning.main` #FCDE73 yellow** ground and computed `rgba(0,0,0,0.87)` text; standard warning has **white `background.paper`** ground, coral `secondary.main` #FF8D6E border/icon, and black `text.primary` text. Set `severity=warning` explicitly; top-of-page placement does not settle the variant. The filled warning’s Figma ground mapping is plan-only and its text mapping is unverified. (LIBRARY.md, **Alert**, **Token mappings**.)

6. **GAP `slider-coverage`: documentation coverage only.** The requested range is 0–10, but these docs establish no Slider styling, geometry, implementation, Figma variants, or states; live availability remains unknown. Ask Daniel for the intended design/source, step, initial value, and labels before specifying it. (LIBRARY.md, **Uncovered requests**; OPEN-ISSUES.md, **`slider-coverage`**.)

7. **GAP `text-field-adornments`:** recorded Text field instances lack start/end adornment slots. Propose an outer frame containing a **Text field instance plus an overlaid `Icon/Search` instance**, labelled **SCAFFOLDING**; Daniel must accept that workaround and text clearance or choose a library extension. Do not insert children into the instance or invent spacing. Navigation `PatientSearch` is distinct and has a trailing `SearchOutlined` magnifier. (LIBRARY.md, **Text field**, **Navigation search**; COMPOSITIONS.md, **Search and other adornments**; OPEN-ISSUES.md, **`text-field-adornments`**.)

8. Report the discrepancy without silently correcting either source. Code governs declared values, but these docs are dated transcription: verify the relevant evidence before calling it **DEFECT**, which requires a confirmed render difference from shipping behavior; unresolved human choices are **DECISION**. Library findings go in **OPEN-ISSUES.md**; screen-only findings go in the consuming project’s spec/register, with owner, scope, status, impact, evidence date, and approved workaround. A real batch also gets one **LOG.md** entry and evidence under **runs/**; resolved changes update the authoritative LIBRARY.md or COMPOSITIONS.md entry, retaining historical evidence. Figma markers are grey. This test made no records or changes. (AGENTS.md, **Authority and scope**, **Record once, maintain the current answer**; OPEN-ISSUES.md, **Adding and closing entries**.)

Confusing or unresolved points:

- “Outlined secondary” maps to `contained/primary`; action hierarchy and colour prop need careful distinction. (LIBRARY.md, **Button**.)
- “Warning banner” still leaves filled versus standard unresolved. (LIBRARY.md, **Alert**.)
- Dialog title line-height/style name, primary.dark variable availability, and Slider coverage remain unknown. (LIBRARY.md, **Dialog and Drawer**, **Token mappings**, **Uncovered requests**.)
- Historical Figma support does not establish current publication or consumer support. (LIBRARY.md, **Evidence and availability**.)

Read scope: **AGENTS.md in full; COMPOSITIONS.md in full; OPEN-ISSUES.md in full; LIBRARY.md introduction through Navigation search, plus Uncovered requests.** A single `rg` search also exposed matching lines and headings throughout the latter three files, including the **Other controls and surfaces** and **API checks by operation** headings. **Searches: 1.** No files outside the four were opened; no Figma, web, MCP source access, writes, commits, or pushes occurred. Exact token usage was not exposed.