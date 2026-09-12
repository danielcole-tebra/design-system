const fs = require('fs');
const { execFileSync } = require('child_process');
const { ROOT, readJson, store } = require('../lib');
const { validateExecution } = require('../validate-execution');
const { validateEvidence } = require('../validate-evidence');
const { repositoryContext, approval, need } = require('./core');
const { checkRecordCeiling, envelopeWith } = require('../../schema/record-scripts');
function command(name, ...args) {
  return execFileSync(process.execPath, [`scripts/workflow/${name}.js`, ...args], { cwd: ROOT, encoding: 'utf8' }).trim();
}
function preclose(id, finalBody) {
  const ctx = repositoryContext(id);
  approval(ctx.item, ctx.run, ctx.record);
  validateExecution(ctx.item, 'finish'); validateEvidence(id);
  need(String(finalBody._status || finalBody.status).startsWith('DONE'), 'Explicit final status required');
  need(finalBody.report === ctx.item.requiredEvidence.report, 'Final report mismatch');
  need(finalBody.screenshots?.includes(ctx.item.requiredEvidence.comparisonRender), 'Final screenshot citation missing');
  const rules = Object.keys(readJson('foundation/standingBatchRules.json')).filter(k => /^\d+_/.test(k));
  for (const key of rules) need(String(finalBody.standingBatchRules?.[key]).startsWith('PASS'), `Supply actual evidence for ${key}`);
  need(finalBody.proofDisposition && finalBody.operatorPresentationEvidence, 'Supply proof disposition and operator presentation evidence');
  need(fs.existsSync(require('./core').local(ROOT, finalBody.operatorPresentationEvidence)), 'Missing operator presentation evidence');
  return { ctx, checks: command('check-batch', id) };
}
// Call from the batch's finalize-*.js. No review/approval fields are generated.
// Proof archiving, if needed, must already be recorded and guarded while IN PROGRESS.
function closeout(id, finalBody, { dryRun = true } = {}) {
  const { ctx, checks } = preclose(id, finalBody);
  if (dryRun) return { checks, finalization: 'ready for explicit finalize invocation', mutated: false };
  // Preserve approval, scope and risk from the opened record.
  for (const key of ['risk', 'scope', 'operatorContinuationQuote']) if (key in finalBody) {
    require('./core').equal(finalBody[key], ctx.record[key], `Closeout cannot change ${key}`);
  }
  // The record ceiling stops here, before the record becomes immutable (record workflow_recordScripts_2026-09-12).
  store.finalizeRecord(ctx.item.expectedRecordId, (record, loaded) => {
    const next = { ...record, ...finalBody };
    const env = envelopeWith(loaded, ctx.item.expectedRecordId, next);
    checkRecordCeiling({ id: ctx.item.expectedRecordId, date: env.date, envelope: env, stage: 'close' });
    return next;
  });
  command('generate-contract');
  const finish = command('finish-batch', id);
  return { checks, finish, next: 'Review git diff; commit only the bounded allowlist, generated files, record and evidence. If finish fails after DONE, fix evidence/tooling and retry finish; never rewrite DONE.' };
}
module.exports = { preclose, closeout };
