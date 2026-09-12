// Closes the Batch D record through the templated close helper it delivers. preflight() runs the validator, the
// ceilings and the eight self-tests first so the recorded evidence is measured; close() measures the record against
// the record ceiling and refuses to write over it before the record becomes immutable.
// Usage: node finalize-workflow-record-scripts-2026-09-12.js
const fs = require('fs');
const path = require('path');
const { close, preflight } = require('./scripts/schema/record-scripts');

const id = 'workflow_recordScripts_2026-09-12';
const evidence = 'figma-export/workflow-record-scripts-2026-09-12';
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));

const validation = preflight();
const startup = readJson(`${evidence}/startup-this-session.json`);
const smoke = readJson(`${evidence}/figma-smoke-result.json`).result;
const calls = startup.callsBeforeFirstTaskAction;
const sum = (from, to) => calls.slice(from, to).reduce((total, call) => total + call.bytes, 0);

const result = close(id, (record) => ({
  ...record,
  _status: 'DONE — templated record scripts (apply, checkpoint, close, preflight) with the record-ceiling hard stop before every write; schema self-test opens after the latest DONE record and asserts the gate by inclusion; shared Figma helpers composed into use_figma scripts, smoke-run read-only on the NPVE target; repository-only plus one read-only Figma call.',
  outcome: 'The three Batch D deliverables are in place. Batch scripts no longer call the store directly: apply opens a record once the body carries the batch keys and a quoted operator statement, checkpoint updates a record that stays IN PROGRESS, close finalizes, and each measures the record file against byteCeilings.record and refuses to write over it, so the hard stop sits before the record becomes immutable and a DONE record over the ceiling can only be one written outside the helpers. The runner closeout runs the same check. The schema self-test passes while other records are IN PROGRESS. The Figma helpers carry the guard, import, paint and readback patterns of the proven build scripts as one text block, refuse writes in the read-only source file, and passed a read-only run against the real target file. This record was opened by apply() and closed by close().',
  implementation: [
    'scripts/schema/record-scripts.js (new): apply({ id, previous, workstream, date, createdBy, body }), checkpoint(id, mutate), close(id, mutate, { allowTierChange, terminal }), preflight({ selfTests }); checkRecordCeiling, recordBytes (indent-1 JSON plus newline, the bytes lib.writeJson writes), envelopeWith, findPlaceholders; apply requires _status IN PROGRESS, date, workstream, risk.tier in the four classes, a quote at risk.operatorQuote, risk.approval.quote or operatorContinuationQuote, scope, report, stopCondition, nextAction and no unfilled placeholder marker; close requires a DONE status, outcome, validation, an existing report and an unchanged risk.tier',
    'scripts/schema/new-record-scripts.js (new): --id --previous --date [--workstream --slug --evidence --by --out]; writes apply-<slug>.js and finalize-<slug>.js from templates whose unfilled placeholder markers apply and close refuse; refuses to overwrite',
    'scripts/schema/record-scripts-self-test.js (new): scratch-store dry run of every refusal and the happy path (seven stages)',
    'scripts/schema/self-test.js: previous is the latest DONE record; the gate assertions test inclusion and that only the dry run left the IN PROGRESS list',
    'scripts/figma/helpers.js (new): helpers(figma, { readOnly }) returns F (guardFile, node, page, fonts, components, variables, styles, paint, bind, frame, text, instance, props, integer, snapshot, readback, created); prelude(options) and compose(options) build the script text; FILES, FONTS.akkurat, NPVE_TARGET_PAGES, LIMIT 50000',
    'scripts/figma/helpers-self-test.js (new): in-memory Plugin API double covering the traps (null variable returns an unbound paint, a wrong property name is ignored, text needs fonts) and end-to-end composition',
    'scripts/workflow/runner/closeout.js: envelopeWith + checkRecordCeiling inside its finalizeRecord mutate',
    'workflow/check-catalog.json: deterministic.recordCeilingAtWrite (19 deterministic checks)',
    'workflow/rules.json: agent rule 7 and standing rule 16 name the helpers (source records and notes extended); CLAUDE.md Recording; workflow/README.md steps 4 and 7 and the command list; contract regenerated',
    `${evidence}/: report.md, startup-this-session.json, figma-smoke.figma.js, figma-smoke-result.json, scaffold-demo/ (an unfilled pair, refused by apply)`
  ],
  hardStop: {
    where: 'scripts/schema/record-scripts.js checkRecordCeiling, called by apply before openRecord and inside the finalizeRecord mutate of checkpoint and close (and of the runner closeout), so the store never writes an over-ceiling record dated on or after byteCeilings.record.appliesFrom',
    ceiling: 'workflow/check-catalog.json → byteCeilings.record (32000 bytes from 2026-09-12); an override is accepted only as a call option, used by the self-test',
    measure: 'the envelope the store would write, serialized as lib.writeJson does; the self-test checks the measured bytes equal the file on disk at apply and at close',
    onBreach: 'RecordCeilingError naming the id, stage, bytes and ceiling, with the catalog remedy; the record stays as it was (absent, or IN PROGRESS and trimmable)'
  },
  schemaSelfTest: {
    before: 'previous = the last record in store order; equality assertions on recordGate.inProgress and recordGate.clear; failed whenever any record was IN PROGRESS',
    after: 'previous = the latest DONE record; inclusion assertions; passes with npveRebuild_flowsheetsFinish_2026-09-11 and this record IN PROGRESS',
    resultThisSession: validation.selfTests[0]
  },
  figmaHelpers: {
    shape: 'a plain function shipped as text: compose() prepends it, then the prelude the options describe (guardFile, page, fonts, parent, lib, vars, styles), then the body, then a default return; every import is null-checked by name and key; paint and bind are read back; creators append to the parent immediately and track ids; creators refuse the read-only source file',
    smokeRun: {
      call: 'one read-only use_figma call on fdCQVFdvOByaOYIJYag0d6: no page change, no creation, no mutation; script and result saved in the evidence folder',
      guard: `file and page set matched: ${smoke.pages.join(', ')}`,
      section: `${smoke.parent.id} ${smoke.parent.name} (${smoke.parent.type}, ${smoke.parent.width}x${smoke.parent.height}, fill bound to ${smoke.parent.boundVariables.fills[0]})`,
      imports: `component ${smoke.cell.key} → ${smoke.cell.name} (${smoke.cell.width}x${smoke.cell.height}, owner ${smoke.cell.owner}, properties ${smoke.cell.properties.join(', ')}); variables ${smoke.vars.paper.name} (${smoke.vars.paper.resolvedType}), ${smoke.vars.s8.name} (${smoke.vars.s8.resolvedType}); style ${smoke.styles.h4.name} (${smoke.styles.h4.type})`,
      paint: `SOLID bound to ${smoke.paint.boundTo}; matchesVariable ${smoke.paint.matchesVariable}`,
      created: smoke.created.length,
      notCovered: 'frame, text, instance and bind ran only on the Node double; their first canvas use is the next design batch, which reads back per the execution policy'
    }
  },
  validation: {
    ...validation,
    canvas: 'One read-only use_figma call (figma-smoke.figma.js → figma-smoke-result.json); no mutation, no page change',
    screenshots: 'N/A — tooling and record changes only; nothing rendered',
    figmaCalls: 1,
    figmaMutations: 0,
    existingDoneRecordsEdited: 0
  },
  startupAccounting: {
    callsBeforeFirstTaskAction: startup.beforeFirstTaskAction.calls,
    resultBytesBeforeFirstTaskAction: startup.beforeFirstTaskAction.resultBytes,
    firstTaskAction: startup.firstTaskAction,
    measuredBy: `scripts/workflow/measure-startup.js, output in ${evidence}/startup-this-session.json`,
    note: `Calls 1 to 5 (${sum(0, 5)} bytes) were the lean set by projection: validator line and manifest item list, current-state and the workflow records of the index, the contract sections (record gate, rule 16, agent rules, execution policy, integrity, current state, record store), the Batch C record. Calls 6 to 13 (${sum(5, 13)} bytes) opened the tooling the approved work changes, named per rule 16: the scripts tree and root script list, openRecord/finalizeRecord and the export list of scripts/schema/lib.js, scripts/schema/self-test.js, validate-ceilings.js, the Batch C apply and finalize scripts, the Flowsheets apply script head and tail, the finalizeRecord call sites in prepare.js and runner/closeout.js, finish-batch.js, the three per-batch build-helpers.js and the heads of five build scripts, runner/plugin.js, the workflow self-tests and lib exports, validate-workflow.js, check-catalog.json, README and the Batch C report heads, rules.json line locations, measure-startup and generate-contract heads. Over the 128,000 lean target because the tooling reads were the work; call 9 (the helper comparison) overran the result window and cost a partial re-read in call 10, and calls 7 and 8 batched more than they needed.`
  },
  findings: { GAP: 0, DEFECT: 0, DECISION: 3 },
  decisionsForOperator: [
    'Rule wording: standing rule 16 now states the record-script shape (apply, checkpoint, close, scaffold) where it stated the openRecord/finalizeRecord shape, and agent rule 7 names the helpers; both amendments cite this record. Confirm or reword; the canonical text is workflow/rules.json.',
    'Hard-stop placement: the ceiling check lives in the helpers and the runner closeout, not in openRecord/finalizeRecord themselves, as the operator commissioned. A script that calls the store directly can still write an over-ceiling record; the validator reports it. Moving the check into the store API would be a separate, recorded change.',
    'Carry-over: the stopped Flowsheets batch (2026-09-11) still holds untracked files and uncommitted edits to flags/active.json and manifest.json; preserved, not committed. This commit\'s regenerated indexes and contract digest that working tree, as batches A and C did.'
  ],
  deferred: ['Batch E: durable plan.md and inventory.json per batch'],
  standingBatchRules: 'N/A for this repository-only workflow batch; the ten Figma rules are unchanged and still required for design batches.',
  nextAction: 'Batch E in a fresh session: durable plan.md and inventory.json per batch. The next design batch opens its record with node scripts/schema/new-record-scripts.js and builds its use_figma scripts with scripts/figma/helpers.js compose().'
}));
console.log(`finalized ${result.file} (${result.bytes} bytes, headroom ${result.headroom}); ${result.status.slice(0, 80)}`);
