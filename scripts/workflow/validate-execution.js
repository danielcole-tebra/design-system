const fs = require('fs');
const path = require('path');
const { ROOT, readJson } = require('./lib');

function executionPath(item) {
  return path.posix.join(path.posix.dirname(item.requiredEvidence.report), 'execution.json');
}

// Validate supplied evidence, not the truth of remote Figma state. No network or canvas mutations.
function validateExecutionData(data, item, { stage = 'ready', root = ROOT } = {}) {
  const errors = [];
  const nonempty = value => typeof value === 'string' && value.trim().length > 0;
  const file = (value, label, png = false) => {
    if (!nonempty(value)) { errors.push(`${label}: missing evidence path`); return; }
    const full = path.resolve(root, value);
    const rel = path.relative(root, full);
    if (path.isAbsolute(value) || rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) {
      errors.push(`${label}: evidence must be a repo-relative file`); return;
    }
    if (!fs.existsSync(full) || !fs.statSync(full).isFile() || fs.statSync(full).size === 0) {
      errors.push(`${label}: missing or empty file ${value}`); return;
    }
    if (png) {
      const fd = fs.openSync(full, 'r');
      const signature = Buffer.alloc(8);
      try { fs.readSync(fd, signature, 0, 8, 0); } finally { fs.closeSync(fd); }
      if (!signature.equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) errors.push(`${label}: not a PNG`);
    }
    return full;
  };
  if (!['ready', 'finish'].includes(stage)) throw new Error(`Unknown execution stage: ${stage}`);
  if (data?.format !== 'tebra.design-execution' || ![1, 2].includes(data.version)) errors.push('unsupported execution format/version');
  // Version 1 checkpoints already in flight remain valid; version 2 records appearance evidence.
  if (data?.version === 2) {
    file(data.appearance?.specification, 'appearance specification');
    if (stage === 'finish') {
      const review = data.appearance?.review;
      if (review?.inspected !== true) errors.push('appearance: whole-form review not inspected');
      file(review?.render, 'appearance review render', true);
      if (review?.render !== item.requiredEvidence.comparisonRender) errors.push('appearance: review must use final comparison');
      for (const area of ['surfaces', 'borders', 'content', 'states', 'layout', 'actions']) {
        if (!nonempty(review?.areas?.[area])) errors.push(`appearance: missing ${area} observation`);
      }
      if (!Array.isArray(review?.differences)) errors.push('appearance: differences must be an array');
      else for (const difference of review.differences) {
        if (!nonempty(difference?.observation) || !['corrected', 'approved'].includes(difference?.disposition) || !nonempty(difference?.evidence)) {
          errors.push('appearance: each difference needs observation, corrected/approved disposition and evidence');
        }
      }
    }
  }
  if (data?.itemId !== item.id || data?.recordId !== item.expectedRecordId) errors.push('execution item/record mismatch');
  const pre = data?.preflight || {};
  if (pre.targetFileKey !== item.target.fileKey) errors.push('execution target identity mismatch');
  file(pre.identityEvidence, 'identity');
  file(pre.toolEvidence, 'tool discovery/read');
  if (!Array.isArray(pre.tools) || !pre.tools.length || !pre.tools.every(nonempty)) errors.push('record actual authenticated tool names');
  if (!Array.isArray(pre.controls) || !pre.controls.length) errors.push('missing verified control mappings');
  else for (const [i, control] of pre.controls.entries()) {
    if (!nonempty(control?.name) || !nonempty(control?.component)) errors.push(`control ${i}: missing name or component identity`);
    if (!control?.properties || typeof control.properties !== 'object' || Array.isArray(control.properties)) errors.push(`control ${i}: properties must be an object`);
    const evidence = file(control?.evidence, `control ${i}`);
    if (evidence) {
      try {
        const snapshot = JSON.parse(fs.readFileSync(evidence, 'utf8'));
        const component = snapshot.components?.find(c => c.id === control.component || c.key === control.component);
        if (!component?.componentPropertyDefinitions || typeof component.componentPropertyDefinitions !== 'object') {
          errors.push(`control ${i}: component identity/definitions absent from saved snapshot`);
        } else for (const [name, value] of Object.entries(control.properties || {})) {
          const definition = component.componentPropertyDefinitions[name];
          if (!definition) errors.push(`control ${i}: unknown property ${name}`);
          else if (definition.type === 'VARIANT' && !definition.variantOptions?.includes(value)) errors.push(`control ${i}: unavailable variant ${name}=${value}`);
          else if (definition.type === 'BOOLEAN' && typeof value !== 'boolean') errors.push(`control ${i}: ${name} must be boolean`);
          else if (['TEXT', 'INSTANCE_SWAP'].includes(definition.type) && typeof value !== 'string') errors.push(`control ${i}: ${name} must be text or an instance ID`);
        }
      } catch (error) { errors.push(`control ${i}: invalid component snapshot (${error.message})`); }
    }
  }
  if (!Array.isArray(data?.unresolved) || data.unresolved.length) errors.push('unresolved execution failures: diagnose/read back before further writes');
  if (!Array.isArray(data?.corrections)) errors.push('corrections must be an array (empty if none)');
  if (!nonempty(data?.nextAction)) errors.push('missing concrete next action');
  if (!Array.isArray(data?.milestones) || !data.milestones.length) errors.push('missing visible milestones');
  else {
    const names = new Set();
    for (const [i, milestone] of data.milestones.entries()) {
      if (!nonempty(milestone?.name) || names.has(milestone.name)) errors.push(`milestone ${i}: missing or duplicate name`);
      names.add(milestone?.name);
      if (!['pending', 'verified'].includes(milestone?.status)) errors.push(`milestone ${i}: invalid status`);
      if (stage === 'finish' && milestone?.status !== 'verified') errors.push(`milestone ${i}: not verified`);
      if (milestone?.status === 'verified') {
        if (!Array.isArray(milestone.nodeIds) || !milestone.nodeIds.length || !milestone.nodeIds.every(nonempty)) errors.push(`milestone ${i}: missing actual node IDs`);
        if (milestone.inspected !== true) errors.push(`milestone ${i}: render not inspected`);
        file(milestone.render, `milestone ${i} render`, true);
      }
    }
    if (stage === 'finish' && !data.milestones.some(m => m.render === item.requiredEvidence.comparisonRender && m.status === 'verified')) errors.push('final comparison is not a verified milestone');
  }
  if (errors.length) throw new Error(`Execution evidence failed (${stage}):\n- ${errors.join('\n- ')}`);
  return data;
}

function validateExecution(item, stage = 'ready') {
  return validateExecutionData(readJson(executionPath(item)), item, { stage });
}

if (require.main === module) {
  const [id, stage = 'ready'] = process.argv.slice(2);
  const item = readJson('workflow/manifest.json').items.find(i => i.id === id);
  if (!item) throw new Error('Usage: node scripts/workflow/validate-execution.js <item-id> [ready|finish]');
  validateExecution(item, stage);
  console.log(`execution PASS ${id} (${stage})`);
}
module.exports = { executionPath, validateExecutionData, validateExecution };
