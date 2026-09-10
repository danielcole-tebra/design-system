const { finalizeRecord } = require('./scripts/schema/lib');

finalizeRecord('workflow_npveQueueRefresh_2026-09-10', (record) => {
  record._status = 'DONE — three atomic Patient Summary items proposed with planner-owned risk and dependencies';
  record.validation = {
    manifest: 'PASS — proposed items require no risk lock until operator approval',
    workflow: 'PASS — store, indexes, generated contract, and workflow validators passed',
    canvas: 'N/A — read-only Figma planning batch'
  };
  record.outcome = 'Patient Summary is the next coherent batch. The queue separates content, feedback states, and shared-shell composition so each visual packet is reviewed before its dependent item starts.';
  return record;
});
