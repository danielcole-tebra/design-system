const fs=require('fs');const d='figma-export/npve-flowsheets-list-body-2026-09-11/';const b=JSON.parse(fs.readFileSync(d+'final-body.json'));
const report=`# Flowsheets list header and body —2026-09-11

Built the approved518px list header and body, plus a separate Add to Note footer action. The selector now has the approved Flowsheets label above Mental Health. Both dates align under Updated. Existing substitute icons, First Aid/Neuron example color bindings and GAP labels remain.

## Authorization and scope

Build quote: “Yeah, let's build list header and body next”. Appearance decision: “go ahead with those recommendations”. Both recorded before Figma mutation in this item's record and locked medium-risk manifest. Dependency npve-flowsheets-measure-row is complete. The earlier row approval was not used to authorize this batch. Source/library files remained read-only. No full Sidesheet, graphs, questionnaire content, scoring thresholds or shared shell changes.

## Deliverables and mappings

| Deliverable | Master | Live proof | Comparison |
|---|---|---|---|
| Header |705:8366|705:8411|712:611|
| List body |706:8405|706:8538|712:962|
| Footer action |706:8637|706:8647|715:1017|

Templates section705:8365, Screens section709:12062. Each component has a dedicated Reference/Rebuild/Change log helper triplet. Frozen source PNGs exported at2x and displayed1:1; rebuilt content stays live. Twelve new components including helpers have live paint/reference comparisons, plus two existing row regression pairs.

| Published control | Verified library ID | Usage |
|---|---|---|
| Autocomplete/Field small Default Filled |85:258|Label=Flowsheets; Value text=Mental Health; Clear icon=false|
| Button contained primary large Default |78:26|Create New Flowsheet; end PlusOutlined|
| Button contained primary medium Default |78:14|Add to Note|
| Icon/PlusOutlined |76:8|End icon for Create action|
| Table/Cell head padding=none |190:11|MEASURE, LATEST, UPDATED, ACTIONS|
| Flowsheets/Measure row |684:8266 /685:8297|Live Basic and With trend rows|

Full native owning definitions and keys: fresh-library.json, fresh-target.json, controls.json. Code Connect search found no files; existing form controls were inspected before library inventory. Code precedence checked in ButtonOverrides.ts, AutocompleteOverrides.tsx, TextFieldOverrides.tsx and TableOverrides.ts under C:/Code/web-app-v2/packages/design-system. Heading background follows core.light; text follows h5. See appearance.md for exact spacing/surface decisions and supporting readbacks.

## Visible changes and evidence

Header518×74 contains275px field and227×42 Create button separated by16px. Body518×306 includes36px heading and the two98px approved rows with GAP labels. Heading column widths80/136/110/192 correspond to row x0/80/216/326. Basic spacer684:8271 moved from index3 to2 in parent684:8267, explicitly approved and recorded before mutation. Root row definitions, paints and dimensions remain unchanged. Footer518×38 right-aligns the published medium button; its title casing follows the library.

Paper f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0; core.light f9545265b644c9c79e2deb92e852841880f84343; space16 6016592c19254dd61e9de9e006459546eaece0bb; space8 183d5d946d268e8bd37735b8b0dc95111c46eddd. No bound alpha forced to1. Score examples retain prior First Aid/Neuron bindings without introducing severity rules.

Inspected PNGs: header.png, body.png, footer.png, row-regression.png; comparison-header.png, comparison-body.png, comparison-footer.png and final comparison.png. The final comparison was re-exported after removal of default section borders. No component clipping or action overlap observed. Source/rebuild differences are explained in each live Change log.

## Audit

Reusable runner used for all9 supported helper/image/comparison operations, with source/target identity readbacks and immutable intents. Local unsupported component assembly remained recorded and guarded. One rejected oversized image dispatch created no nodes: image-header-not-applied.json confirms the rectangle was empty. It recovered via a new compact image intent with identical PNG bytes. The body upload used a reversible byte-to-character encoding; no raster editing or rescaling.

One comparison response was truncated after successful creation. Its parent and five smaller subtrees were read back and reassembled into complete native evidence; the mutation was never replayed. Audit output similarly used reversible deduplication to keep full paint arrays rather than discarding evidence.

All4 pages were explicitly activated for full walks. Final unbound IDs are exactly the baseline: Cover1, Templates48, Screens43, Archive20. Two new section strokes were the only initial additions and were removed (section-border-fix.json). All14 master/live paint arrays and descendant reference counts match. Zero fractional authored geometry. Rebuild comparison, Change log/Row and measure-row set definitions/dimensions unchanged. Full results: audit-input.json, audit-result.json, audit.json and audit-*.json.

## Workflow exception

The first helpers-header step passed the runner's internal guard, but the client bridge's additional immediately-before-dispatch check was omitted because it tested “mutate” instead of “mutation”. No failed guard was bypassed. The discriminator was corrected and explicit fail-closed guards ran before later writes. The omission remains a historical failure of the required double-check; it is not retroactively marked compliant. Recorded as resolved flag npveFlowsheetsList_bridgeDispatchGuard, with workflowGuardCompliance.pass=false. This did not change scope or approvals. Subsequent guard and full file audits passed.

## Ten standing checks

${Object.entries(b.standingBatchRules).map(([k,v])=>'- '+k+': '+v).join('\n')}

## Closeout

New visual defects:0. New visual GAPs:0; two inherited visible GAP markers remain for temporary icon substitutions. One procedural finding resolved and retained in the record. No temporary loose proof nodes were created; permanent live helpers supply proof, and each rebuilt component appears once in its dedicated Screens comparison. Archive remains unchanged, so no proof move or README edit was required.

Record: records/npve/2026-09-11/npveRebuild_flowsheetsListBody_2026-09-11.json. Operator presentation recorded in operator-presentation.md; finished-design acceptance is not assumed. Token/credit usage unavailable and recorded as null. Context measurement met its target (89.4% broader legacy-to-lean byte reduction); approved task handoff equivalent-payload reduction17.15%. These are byte measurements, not token or credit savings.

Remaining Flowsheets work: full-sheet composition and separately scoped graphs/questionnaires. This batch grants no permission to start them.
`;
fs.writeFileSync(d+'report.md',report);
