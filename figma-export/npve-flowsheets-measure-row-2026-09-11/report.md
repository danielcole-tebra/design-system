# Flowsheets measure rows — 2026-09-11

Built one local `Flowsheets/Measure row` set with Basic and With trend variants. PHQ-9's 15 uses the existing First Aid token; GAD-7's 12 uses Neuron. The two source/rebuild/change comparisons were saved, inspected and shown to the operator. No dependent Flowsheets work is authorized by this closeout.

**Result:** 4 temporary glyph gaps, 0 remaining visual defects. One procedural guard violation occurred during proof archiving and is explicitly recorded below. The final design checks pass; this is not a claim that every mutation guard was followed.

## Scope and decisions

- Item: `npve-flowsheets-measure-row`; record: `npveRebuild_flowsheetsMeasureRow_2026-09-11`.
- Previous audit record was DONE; this item has no unfinished dependencies. A new IN PROGRESS record existed before construction.
- Per-item approval: “build the row with substitute icons for now”. It is not copied from an earlier completed item.
- Color decision: “Maybe just juse Neuron and first Aid for the color token for now.” The announced provisional example mapping is PHQ-9 15 → First Aid and GAD-7 12 → Neuron. No clinical thresholds, automatic severity selection or scoring rules were added.
- Medium risk, planner-recorded. Exact scope, original proposal, operator words and stop condition remain in the record and manifest.
- No graph, questionnaire, list body, selector, sheet, library publication or preferred-menu changes.

## Built nodes

| Item | Figma ID |
|---|---|
| Templates organizer | 684:8265 |
| Flowsheets/Measure row set | 686:8437 |
| Basic master / live helper instance | 684:8266 / 684:8297 |
| With trend master / live helper instance | 685:8297 / 685:8332 |
| Basic rebuild / reference / change helpers | 684:8296 / 688:2 / 688:4 |
| With trend rebuild / reference / change helpers | 685:8331 / 689:2 / 689:4 |
| Screens organizer | 687:13026 |
| Basic / With trend comparison instances | 691:611 / 691:929 |

Set key: `0b4ce23947858055f554744e963f805040b61505`. Shared comparison master35:332 and Change log/Row18:103 retain their original geometry, definitions and preferred values. Each Screens placement is a live Rebuild comparison with three dedicated component helpers. `final-placements.json` enumerates all new roots and descendants; separate proof receipts list moved and README IDs.

## Source and library evidence

Source NDE-2026 `zVsuhYehoSLLq880qRBFkq` was read-only. Basic row939:9251 and trend row939:9353 are548×64. Original2x PNGs are1096×128 and displayed at548×64 in frozen-reference rectangles. These are the only rasterized design content.

Library `YX2n4YLrEpBXNbcc73T6dw` was read-only. Fresh authenticated reads verified page inventories, component identity, parent, dimensions, keys and owning-set definitions. See `fresh-source.json`, `fresh-library.json`, `target.json`, `controls.json`, and each runner step's fresh reads.

| Use | Published component | Key |
|---|---|---|
| Action control | Icon button / default / medium / Default | c417c9bd187d428a763cd7763de09f7f258a73b6 |
| Temporary note | Icon/AddPaymentNote | 9fe47d27ed040f1d0e988074b7ea7ba27afcebef |
| Temporary chart | Icon/Reports | db42927d9f67e0cd570251253ac74ad81941a783 |
| Temporary edit | Icon/EditOutlined | ae295bfd62904c894356ffb63fa20fe2ef03b060 |
| Add | Icon/PlusOutlined | 925d1c32ce73e949f4f67701add8eb5be3ed342f |
| Temporary trend | Icon/UpCaret | 2b3c06250ebf83c4c467989941ade387c36b65e9 |

All remain live instances. The existing icon-mapping GAP stays open; placeholders do not claim exact source glyphs. The larger chart icon is the approved Reports substitution. Consuming glyph paints bind text/secondary, including the otherwise-white Reports glyph. No glyph was detached or redrawn.

First Aid is `color/error/main`, #D83B4D, key138a46cabb1d233ffc170d8f5c88290ff17ecd35. Neuron is `color/warning/dark`, #F2BA2A, keyc7b6e6f8145265bb911f98a5a2f0d9e3c2fccf78. Both score text fills retain live variable aliases, verified in master and placed instances. No token was created or changed.

## Appearance and behavior

Both rebuilt rows use518px content width,16px vertical padding/column gaps,8px action gaps, and existing Akkurat LL styles. Published40px Icon buttons are unchanged within42px local action areas; the global size-disagreement flag is not falsely closed. The visible GAP label below each row identifies temporary icons. Total helper height98px includes that marker; the actual content row is74px high.

Basic retains PHQ-9 /15 /2/1/26. With trend retains GAD-7 /12 /15% /2 days ago. The trend row's original1px top/bottom dividers were initially omitted, caught during final pixel comparison, and restored on685:8298 using `color/divider` (#D6D6D6), with zero side strokes. Final row and comparison PNGs were regenerated and inspected. Basic correctly has no divider strokes.

After combining independently built variants, Figma retained the exposed Measure, Latest, Updated and Trend references. Both disposable instances visibly rendered changed test text. `proof-test.json` records the test inputs and actual rendered characters. This verifies behavior beyond matching property counts.

Inspected images: `basic.png`, `trend.png`, `comparison-basic.png`, `comparison-trend.png`, `comparison.png`, `proofs.png`, and `archive-readme.png`. No overlapping controls or clipped text remain. `proofs.png` documents property behavior before the later master-divider correction; archived instances continue to inherit the corrected live master.

## Runner and recovery

The reusable runner performed six supported operations: two helper builds, two frozen-reference image placements, and two comparison placements. Each has fresh source/target reads, immutable intent, result and receipt under `runner/`. Unsupported native row/set creation and proof organization used the established recorded workflow.

Basic helper transport tried `figma.io.write`, but this client exposed no file attachment. The compact mutation receipt established creation, and one complete fresh subtree readback was saved before acknowledging the runner. No creation was replayed. Comparison replies used reversible string-table serialization and were decoded to complete native JSON evidence; the runner program and validation were unchanged.

The runner's comparison operation requires HUG content. Its new reference helpers were changed to vertical auto-layout before placement; the frozen rectangle stayed548×64. This was an implementation correction to the new helper, without a shared-master edit.

After the divider correction, two oversized read-only audit replies exceeded the tool response limit and were rejected rather than used. The replacement collection separated full-page results from bounded direct/nested instance results. Saved `audit-direct.json` and `audit-nested.json` are complete; their joined `audit-instances.json` contains all four final master/instance pairs. Full-page evidence is collected in separate activated-page calls, not inferred from partially loaded pages.

### Procedural guard exception

While IN PROGRESS, the record was updated before archiving proofs. That made the generated contract stale. `check-batch` correctly failed, but the orchestration failed to test the command's exit code and dispatched the archive mutation anyway. It created692:2392 and692:2393 and moved proofs687:8335 and687:8361 within the authorized target file.

This was a real violation of the required pre-mutation guard. It cannot be erased by later passing checks. The exception is preserved in the immutable record and `audit.json` as `workflowGuardCompliance.pass:false`.

Recovery regenerated the contract, passed the guard, and read back the actual archive IDs. The other107 records and294 flags remained unchanged. Later mutation dispatch explicitly aborted on nonzero guard exit. No uncertain creation was replayed.

The initial proof destination/names also differed from the proof convention. The correction was recorded before a passing guard, then the dated section was nested under mandated06 Pilot proofs570:10455, proofs renamed with the `PROOF —` prefix, and the existing Archive README185:5 appended. Pilot width grew to3716 while its height720 and following sections stayed in place. README frame185:3 grew to800px without overlap. Proof content and IDs were retained, and nothing was deleted.

## Final checks

- Full-page unbound entries are exactly unchanged: Cover1, Templates48, Screens43, Archive20. Final node counts9/11862/5960/1845. Existing unbound paints were not silently fixed.
- Four final direct/nested instance comparisons have identical complete rendered paint arrays to their two masters, including effective alpha and variable bindings.
- Descendant property references: Basic7/7; With trend8/8, including nested comparison instances. Exposed text behavior separately passed.
- Zero fractional authored geometry in new roots. Intrinsic library vector geometry was retained.
- Shared comparison and Change log/Row: zero definition, geometry or preferred-menu differences.
- All ten standing design checks are recorded with evidence in `final-body.json` and the final record. These passes do not certify compliance with the separate missed workflow guard.
- Whole comparison and both states were inspected and shown; no operator acceptance or next-item approval is inferred.

## Checkpoint and cost

`execution.json` records verified milestones and corrections. `audit.json`, `deterministic-audit.json`, `audit-instances.json`, `after-*.json`, and proof receipts contain final evidence. Frozen references and runner results remain saved. The finalizer uses `runner/closeout.js` for readiness, record finalization, contract generation and finish validation.

Context measurement: legacy1580858bytes versus lean163272bytes,89.7% reduction. The handoff's separate equivalent-information comparison is134533pretty versus113967compact bytes,15.29%, with identical parsed digest. These measure bytes, not token or credit savings. Complete-run token, model-effort and credit counters are unavailable and recorded as null in workflow metrics; no costs are inferred.

Stop after this batch. A later Flowsheets list/body proposal can consume these rows, but must get its own bounded scope, record and operator authorization. The current approval cannot be reused.

Closeout compatibility: the first read-only readiness invocation found that runner/core defines repositoryContext but omits its export. The batch-local finalizer supplies the same authoritative manifest/run/index/record/checkpoint reader before loading runner/closeout. No runner file or approval/check/evidence/finish gate was changed. The next dry-run passed.
