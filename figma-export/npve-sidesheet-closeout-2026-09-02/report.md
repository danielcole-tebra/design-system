# NPVE rebuild — base Sidesheet template closeout

Batch `npveRebuild_sidesheet_closeout_2026_09_02`, 2026-09-02. Target fdCQVFdvOByaOYIJYag0d6 (writes), library YX2n4YLrEpBXNbcc73T6dw (read only).

## Outcome

- BASE COMPLETE. Steps 1 and 4 pass. Step 2 (Storybook check) is open: Storybook unreachable this session; flag npveBuild_buttonLabelTitleCase left open with the code path recorded. Stopped after step 4; no sub-header, no screens.
- Template status: **base complete**.
- Schema record written by apply-npve-sidesheet-closeout.js, backup design-system-schema.backup-2026-09-02-pre-npve-sidesheet-closeout.json. Flags: +1 (npveCloseout_storybookUnreachable); npveBuild_arrowLeftGlyphIsReturnArrow marked resolved; npveBuild_importedNodesDroppedBetweenCalls handling updated. GAP 0, DEFECT 0 new.

## Step 1 — icon swaps

- **method.** Icon/LeftCaret (key 42105eed…, target 14:103) and Icon/CloseOutlined (key 1fe139d4…, target 14:105) imported and set as the Icon swap value on Back 6:67 and Close 6:74 in the same script. No nodes created or deleted on the master.
- **before.** {"back":"Icon/ArrowLeft (target 6:58)","close":"Icon/Close (MUI) (target 6:56)"}
- **after.** {"back":"Icon/LeftCaret","close":"Icon/CloseOutlined, now matching Drawer Header 749:231"}
- **propagation.** All four instances read Icon/LeftCaret on Back and Icon/CloseOutlined on Close. Visibility still driven by properties: 6:109 back off/footer on/tertiary off; 6:144 back ON; 6:179 tertiary ON; 6:214 footer OFF. Master references intact: Back visible←Show back, Footer visible←Show footer, Secondary visible+mainComponent, Tertiary visible+mainComponent, Primary mainComponent, Body slot mainComponent, Title characters.
- **unusedImports.** Icon/ArrowLeft and Icon/Close (MUI) are no longer referenced by any node; they were not deleted (rule 1) and Figma may drop them as unused imports.

## Step 2 — Storybook check

- Result: UNREACHABLE. Flag npveBuild_buttonLabelTitleCase left open.
- Attempts:
  - yarn not on PATH (exit 127).
  - node .yarn/releases/yarn-4.17.1.cjs storybook --ci --no-open: exit 7, "Required unplugged package missing from disk: open@npm:8.4.2" — the PnP checkout needs yarn install, which would write into the read-only reference repo and was not run.
  - Chrome browser extension not connected, so a running Storybook could not have been screenshotted either.
- Code path:
  - `src/typography/typography.ts`: button: { fontWeight: 400, fontSize: "1rem", lineHeight: "1.5rem", textTransform: "capitalize" } (line 61-66); theme.ts line 82 wires typography into the theme, and MUI Button applies theme.typography.button.
  - `src/cobranding/createPartnerTheme.ts`: button: { … textTransform: "capitalize" as const } (line 30-35).
  - `src/overrides/ButtonOverrides.ts`: no textTransform rule; no outlined rule.
  - `reading`: CSS text-transform: capitalize upper-cases the first letter of every word, so "Save & Add to Note" would render "Save & Add To Note" in code, which is what Figma textCase TITLE produces. This points to the library being correct and the flag being superseded, but the instruction requires a Storybook render as evidence, so the flag stays open.
- Unblocks: Run yarn install in web-app-v2 (writes .yarn/unplugged), start Storybook on 6006, connect the Chrome extension, open Components/Inputs/Button, set the label text and screenshot.

## Step 3 — CLAUDE.md

- Section "Known plugin API traps" added after Standing rules with the three traps as written.

Text as written:

```
## Known plugin API traps

- `importComponentByKeyAsync` and `importVariableByKeyAsync` results do not persist between `use_figma` calls. Import and use in the same script.
- `setBoundVariableForPaint` with a null variable returns an unbound paint without throwing. Read the paint back after binding.
- Assigning `componentPropertyReferences` replaces the whole object. Set every key in one assignment.
```

## Step 4 — re-screenshot and rules

| Instance | File |
|---|---|
| defaults-6-109 | `step4-instance-1-defaults-6-109.png` |
| show-back-6-144 | `step4-instance-2-show-back-6-144.png` |
| show-tertiary-6-179 | `step4-instance-3-show-tertiary-6-179.png` |
| show-footer-off-6-214 | `step4-instance-4-show-footer-off-6-214.png` |

Looked at: Yes: 6:144 shows the chevron back and the outlined close; 6:179 shows the outlined close and three footer buttons.

| Rule | Result |
|---|---|
| 1_instancePaintVerification | PASS. Master and four instances: root fill #FFFFFF@1 color/background/paper; root stroke #D6D6D6 color/divider; title #000000 color/text/primary; primary action #FF8D6E@1 color/secondary/main; its label #004852 color/secondary/contrastText. Identical on all five. |
| 2_unboundPaintAudit | PASS. 22 visible solid paints per node tree on master and each instance, 0 unbound. |
| 5_opacityLast | PASS. 0 paints with opacity below 1. |
| 9_boundPaintAlpha | PASS. No bound paint opacity touched; all read 1.00. |

## Schema record summary

Key `npveRebuild_sidesheet_closeout_2026_09_02`: _status, templateStatus, step1_iconSwaps, step2_storybookCheck (attempts, codePath, whatUnblocks), step3_claudeMd, step4_rerun, screenshots.