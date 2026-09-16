# Plugin notes

## Calling
use_figma takes fileKey, code and description; the code runs in the plugin sandbox with the `figma` global; top-level await works; `return` a JSON value. Change pages with `await figma.setCurrentPageAsync(page)`. No loadAllPagesAsync, setPluginData, createImageAsync or saveVersionHistoryAsync ("not a supported API", 2026-09-13), so a script cannot name a version checkpoint; back up with a before export and a before.json of the exact pre-state. Variables live under figma.variables.*, not on figma.

## Traps
1. importComponentByKeyAsync / importVariableByKeyAsync results do not persist between calls. Import and use in one script.
2. setBoundVariableForPaint with a null variable returns an unbound paint without throwing. Read the paint back.
3. Assigning componentPropertyReferences replaces the whole object. Set every key in one assignment.
4. Importing by key is a write: importComponentByKeyAsync, importComponentSetByKeyAsync and importVariableByKeyAsync create a remote copy in the file. Never do it on read-only work.
5. download_assets renders a node against everything behind it inside its bounds, so a fill-less node or a rounded corner bakes the parent section's colour into the PNG (Sidesheet Floating corners and the Problems picker body came out on #E4E4E4, 2026-09-13). When the ground matters, export an instance placed in a paper-filled PROOF frame.
6. upload_assets with nodeIds can store an image without placing it: a pass whose POST responses carried no placedOnNodeId left the old fills in place (2026-09-13). Read the fill back; if the hash is wrong, set fills to {type IMAGE, scaleMode, imageHash} with the returned hash, which is legitimate because the image is already in the file.
7. absoluteRenderBounds on a component master leaves out a child that overhangs the box: masters 26:221 and 732:8713 read equal to their boxes while an instance of the same master (771:11274) and the 2x exports carried the 8px floating-label overflow (2026-09-13). Size a plate from the stored image (figma.getImageByHash(hash).getSizeAsync()) against its rectangle, never from the master's bounds.

## Paints
1. setBoundVariableForPaint keeps the raw colour you passed and Figma renders it ({0,0,0} rendered black); write the resolved value into the paint, then bind.
2. Paint-level opacity on a bound paint is discarded by appendChild, resize and combineAsVariants; apply it last via Object.assign({}, boundPaint, {opacity}) and read fills[0].opacity back.
3. setBoundVariable takes FLOAT variables on width, height, strokeWeight and corner radii, not only padding and itemSpacing.
4. Tokens page: derive from figma.variables, never a hardcoded list; read valuesByMode[collection.modes[0].modeId]; bind rather than paint; apply text styles and read style.boundVariables back.
5. Every icon master's vector fill is bound to a token, so a lost override degrades to a themed colour.
6. Apply effect styles with setEffectStyleIdAsync, not node.effects.

## Components
7. INSTANCE_SWAP addComponentProperty needs the component's node id as defaultValue, not a publish key.
8. editComponentProperty cannot change a VARIANT default; the default is the top-left-most variant on canvas, not children[0], so a layers reorder changes nothing; move the variant.
9. Setting an INSTANCE_SWAP property to the slot's existing default resets the layer name and drops colour overrides; only set a swap when the target differs.
10. An INSTANCE_SWAP property resolves to one defaultValue across every variant; no variant can ship a different default control.
11. A set-level TEXT property likewise forces one default on every variant and collapses heights; if variants differ by text, do not expose it.
12. Cloning a variant inside a COMPONENT_SET silently drops componentPropertyReferences on the clone and its descendants; add properties after all variants exist or copy references node-for-node, and count references per variant.
13. constraints cannot be overridden on an instance, only fills; set them on the master.
14. Give instance-swap slots preferredValues.
15. A property-driven sizer must mirror every node that can widen the element (label plus optional asterisk); test with the optional child on.
16. Never fake a border gap with a background-coloured mask; build it from auto-layout slices with per-side stroke weights, end radii and a hugging middle slice sized by transparent text bound to the label.
17. Set figma.skipInvisibleInstanceChildren = false before any walk; the first unbound-paint audit reported 0 while blind to hidden slots.
34. setProperties() on a VARIANT axis drops the instance's text overrides and takes the target variant's own defaults. Switching a Session row from State=default to State=failed reset Name and Capture time from "Marcus Vance" / "9:42 AM" to the failed master's "Dolores Okonkwo" / "9:12 AM" (2026-09-15); the layer names match on both variants and the overrides were still lost. Read the characters back after every variant switch and re-apply, following the font-load recipe. Reactions on the instance survive the switch.

35. clone() on a top-level FRAME drops the frame's OWN reactions and keeps every descendant's. Duplicating the eleven-screen mobile prototype onto a new page (2026-09-15) carried all 37 child reactions across intact and silently lost S7 Sending's two frame-level ones, the AFTER_TIMEOUT 3s and the tap-anywhere ON_CLICK, which are the whole failure path. Only a reaction count caught it. Count reactions on the source and the clone and compare, and re-apply any frame-level reaction with setReactionsAsync after cloning. Note the scope of rule 8 and trap 12 while you are there: componentPropertyReferences did NOT drop on this clone — 580 on the originals, 580 on the duplicates, zero rebinds — so that loss is specific to cloning a variant inside a COMPONENT_SET, not to cloning frames that merely contain instances.

18. resize() and resizeWithoutConstraints() on an instance nested inside another instance are silently ignored: the swapped slot keeps the master's size (a 600px reference slot stayed 600 around a 2399px helper, 2026-09-13). Read the size back; let the column clip off instead. When the swapped helper's master is an auto-layout frame, the nested slot accepts layoutSizingVertical = 'HUG' and grows to the helper's height (Flowsheets forms comparisons; verified 2026-09-14 on 803:19794: 550x600 slots became 604 and 740 after the reference and rebuild helpers were given a vertical auto-layout hugging their single child, sizes unchanged).

## Layout
19. resize() after counterAxisSizingMode locks the axis to FIXED; re-set AUTO or clones inherit a frozen height.
20. Auto-layout frames accept minWidth, maxWidth, minHeight, maxHeight (Tab: minWidth 90, maxWidth 360, minHeight 48).
21. Frames default clipsContent true, so overhanging absolute children (notch label, focus ring, Badge anchor) vanish; clear it on the component and every wrapper.
22. Badge's translate(50%,-50%) has no equivalent; use a centring anchor frame twice the offset wide, primaryAxisAlignItems CENTER, centred on the anchor.
23. combineAsVariants keeps the layout you give; layoutMode NONE with a size-per-row grid reviews better than WRAP.
24. GROUP, BOOLEAN_OPERATION and VECTOR bounds derive from contents and may be fractional; exclude them from integer checks.
25. ELLIPSE arcData {startingAngle, endingAngle, innerRadius} draws an SVG dasharray ring with no fractional value stored (innerRadius is a 0-1 ratio). Angle 0 is 3 o'clock, as in SVG.

26. A 1px component inside an auto-layout stack adds its pixel to the stack (the library Divider made a two-chip delta 33 tall, 2026-09-14). layoutPositioning = 'ABSOLUTE' takes it out of flow and keeps it rendering: set the positioning first, then x/y and constraints, then resize. The parent must not clip. Renumber nothing else; later Text notes keep their numbers.

## Text
26. Name a TEXT node after setting characters, never the literal "Text" (autoRename overwrites it); prefer type or index lookup.
27. An empty TEXT node collapses to width 0 and FILL does not recover it: textAutoResize HEIGHT, resize() to a real width, then FILL; verify width > 0.
28. Order: fontName, characters, setTextStyleIdAsync, textAutoResize, resize; textAutoResize set earlier does not survive.
29. resize() on a TEXT node silently resets textAutoResize to NONE; set the mode after the resize.
30. setTextStyleIdAsync resets textDecoration; apply UNDERLINE after it and after any later characters assignment.

## SVG import
31. createNodeFromSvg gives its wrapper an opaque white fill the SVG did not declare; walk the frame itself or clear it.
32. createNodeFromSvg accepts an embedded base64 image (RECTANGLE with IMAGE fill); probe with a 1x1 PNG.
33. An SVG clipPath imports as a mask group with a black fill that renders nothing but reads as unbound; bind it to what the source declares.

## Icon recipe
1. Keep the imported viewBox position inside the 24x24 frame; never reset x/y to 0. createNodeFromSvg positions them correctly; verified: DownCaret (2, 6.49), Cancel (2, 2), Close-MUI (5, 5), TrashOutlined (2.52, 2), Checkbox (3, 3).
2. Every vector gets constraints {horizontal:'SCALE', vertical:'SCALE'} on the master; CENTER renders oversized at 16px.
3. No currentColor: clone the source text paint (resolved colour and boundVariables together) onto every vector per variant; skip white knockout shapes.
4. Vector layers are named "Vector"; swap overrides survive only across matching layer names. Masters are Icon/Name, MUI-internal glyphs Icon/Name (MUI).

## Storybook
In C:\Code\web-app-v2\packages\design-system, `yarn storybook` serves http://localhost:6006 (yarn PnP; ask before running `yarn install` there). Stories: src/stories/<Name>/<Name>.stories.tsx, title "Components/<Group>/<Name>". Story URL: /?path=/story/<title lowercased, / and spaces as ->--<export kebab-cased>, e.g. components-inputs-textfield--default.
