// A read-only source component set whose definitions Figma cannot read (record workflow_flowsheetsResume_2026-09-12).
//
// The Flowsheets finish batch stopped when the owning set 129:6647 in the read-only source zVsuhYehoSLLq880qRBFkq
// answered componentPropertyDefinitions with "in get_componentPropertyDefinitions: Component set has existing errors".
// The source is never edited and the manifest never substitutes another source, so the gate accepts such a set only
// on this evidence, all of it read live from Figma by the runner's read program (scripts/workflow/runner/plugin.js):
//   error      the exact text Figma threw, quoted verbatim; it must name componentPropertyDefinitions
//   set        the owning set's identity (id, name, type COMPONENT_SET, parentId, page { id, name }) and geometry
//   variants   every variant child's id, name and variantProperties
// The variant the batch uses is matched by its variantProperties, never by name alone. The control entry in
// execution.json is marked `definitions: "unreadable at source"`, quotes the same error, names the read-only source
// file and the flag that records the set (scripts/workflow/validate-execution.js). A target or library component is
// never accepted this way: it reads its definitions exactly as before.
const fs = require('fs');
const path = require('path');

const MARKER = 'unreadable at source';
const ERROR_RE = /componentPropertyDefinitions/;

const nonempty = (v) => typeof v === 'string' && v.trim().length > 0;
const plain = (v) => !!v && typeof v === 'object' && !Array.isArray(v);
const finite = (v) => Number.isFinite(v);

// Key-order-independent equality of two variantProperties objects.
function sameProperties(a, b) {
  if (!plain(a) || !plain(b)) return false;
  const ka = Object.keys(a).sort();
  const kb = Object.keys(b).sort();
  return ka.length === kb.length && ka.every((k, i) => k === kb[i] && a[k] === b[k]);
}

// Errors in an unreadable-definitions record as the read program saves it: { error, set, variants }.
function unreadableErrors(unreadable, label = 'definitionsUnreadable') {
  if (!plain(unreadable)) return [`${label}: missing the unreadable-definitions record (exact error, set identity and geometry, variants)`];
  const errors = [];
  if (!nonempty(unreadable.error)) errors.push(`${label}: the exact Figma error must be quoted`);
  else if (!ERROR_RE.test(unreadable.error)) errors.push(`${label}: the quoted error must be the componentPropertyDefinitions failure, not another error (got ${JSON.stringify(unreadable.error.slice(0, 80))})`);
  const set = unreadable.set;
  if (!plain(set)) errors.push(`${label}: set identity missing`);
  else {
    for (const k of ['id', 'name', 'parentId']) if (!nonempty(set[k])) errors.push(`${label}: set ${k} missing`);
    if (set.type !== 'COMPONENT_SET') errors.push(`${label}: set type must be COMPONENT_SET (got ${JSON.stringify(set.type)})`);
    if (!plain(set.page) || !nonempty(set.page.id) || !nonempty(set.page.name)) errors.push(`${label}: set page { id, name } missing`);
    if (!finite(set.width) || !finite(set.height)) errors.push(`${label}: set geometry (width, height) missing`);
  }
  const variants = unreadable.variants;
  if (!Array.isArray(variants) || !variants.length) errors.push(`${label}: every variant child (id, name, variantProperties) must be read`);
  else {
    const ids = new Set();
    variants.forEach((v, i) => {
      if (!plain(v) || !nonempty(v.id) || !nonempty(v.name)) errors.push(`${label}: variant ${i} lacks id or name`);
      else if (ids.has(v.id)) errors.push(`${label}: variant ${v.id} listed twice`);
      else ids.add(v.id);
      if (!plain(v) || !plain(v.variantProperties) || !Object.keys(v.variantProperties).length) errors.push(`${label}: variant ${plain(v) && v.id ? v.id : i} lacks variantProperties`);
    });
  }
  return errors;
}

// The variant the batch uses, matched by its properties: exactly one variant may carry them.
function matchVariant(unreadable, properties, label = 'control') {
  if (!plain(properties) || !Object.keys(properties).length) return { variant: null, errors: [`${label}: properties must name the used variant's variantProperties`] };
  const variants = Array.isArray(unreadable && unreadable.variants) ? unreadable.variants : [];
  const matches = variants.filter((v) => plain(v) && sameProperties(v.variantProperties, properties));
  const setId = unreadable && plain(unreadable.set) ? unreadable.set.id : 'the set';
  if (!matches.length) return { variant: null, errors: [`${label}: no variant of ${setId} carries ${JSON.stringify(properties)}`] };
  if (matches.length > 1) return { variant: null, errors: [`${label}: ${matches.length} variants of ${setId} carry ${JSON.stringify(properties)}; the match must be unique`] };
  return { variant: matches[0], errors: [] };
}

// A node as the read program snaps it (a COMPONENT variant or its COMPONENT_SET) carrying definitionsUnreadable.
function unreadableNodeErrors(node, label = 'node') {
  if (!plain(node)) return [`${label}: missing`];
  const errors = [];
  if (node.definitions !== undefined && node.definitionsUnreadable !== undefined) errors.push(`${label}: carries both definitions and definitionsUnreadable; a set is readable or it is not`);
  if (node.componentPropertyDefinitions !== undefined) errors.push(`${label}: definitions are readable (componentPropertyDefinitions present); map it as an ordinary component`);
  const u = node.definitionsUnreadable;
  errors.push(...unreadableErrors(u, `${label}.definitionsUnreadable`));
  if (errors.length) return errors;
  if (node.type === 'COMPONENT_SET') {
    if (node.id !== u.set.id) errors.push(`${label}: a COMPONENT_SET node must be the unreadable set itself (${u.set.id})`);
  } else if (node.type === 'COMPONENT') {
    if (node.parentId !== u.set.id) errors.push(`${label}: variant ${node.id} must belong to the unreadable set ${u.set.id} (parentId ${node.parentId})`);
    const own = u.variants.find((v) => v.id === node.id);
    if (!own) errors.push(`${label}: variant ${node.id} is not among the set's read variants`);
    else if (!sameProperties(node.variantProperties, own.variantProperties)) errors.push(`${label}: variantProperties on ${node.id} disagree with the set's variant list`);
  } else errors.push(`${label}: only a COMPONENT variant or its COMPONENT_SET may carry definitionsUnreadable (got ${node.type})`);
  return errors;
}

// The flag that records the unreadable set must exist in the flag register and name the set by id.
function flagNamesSet(root, flagId, setId) {
  if (!nonempty(flagId)) return ['flag: a flag naming the unreadable set is required'];
  const files = ['flags/active.json', 'flags/resolved.json'].map((f) => path.resolve(root, f)).filter((f) => fs.existsSync(f));
  if (!files.length) return ['flag: no flag register under flags/'];
  for (const file of files) {
    let doc;
    try { doc = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (error) { return [`flag: ${path.basename(file)} unreadable (${error.message})`]; }
    const entry = (doc.entries || []).find((e) => e && e.flag && e.flag.id === flagId);
    if (!entry) continue;
    if (!JSON.stringify(entry.flag).includes(setId)) return [`flag ${flagId} does not name the set ${setId}`];
    return [];
  }
  return [`flag ${flagId} is not in the flag register`];
}

// A control entry marked `definitions: "unreadable at source"` against its saved snapshot component.
function unreadableControlErrors({ control, component, item, root, label = 'control' }) {
  const errors = [];
  const source = item && item.source && item.source.fileKey;
  if (!nonempty(source)) errors.push(`${label}: ${MARKER} needs a read-only source on the manifest item`);
  else if (control.fileKey !== source) errors.push(`${label}: ${MARKER} is accepted for the read-only source ${source} only (got ${JSON.stringify(control.fileKey)})`);
  if (item && item.target && nonempty(control.fileKey) && control.fileKey === item.target.fileKey) errors.push(`${label}: the target file's components must read their definitions; ${MARKER} is not accepted there`);
  if (!component) { errors.push(`${label}: component identity absent from saved snapshot`); return errors; }
  for (const k of ['id', 'name', 'type', 'parentId']) if (!nonempty(component[k])) errors.push(`${label}: snapshot component lacks ${k}`);
  if (!finite(component.width) || !finite(component.height)) errors.push(`${label}: snapshot component lacks geometry (width, height)`);
  errors.push(...unreadableNodeErrors(component, `${label} snapshot`));
  if (errors.length) return errors;
  const u = component.definitionsUnreadable;
  if (control.error !== u.error) errors.push(`${label}: the control must quote the exact Figma error the readback saved (${JSON.stringify(u.error)})`);
  if (component.type !== 'COMPONENT') errors.push(`${label}: map the variant the batch uses, not the set ${u.set.id}`);
  const { variant, errors: matchErrors } = matchVariant(u, control.properties, label);
  errors.push(...matchErrors);
  if (variant && variant.id !== component.id) errors.push(`${label}: properties ${JSON.stringify(control.properties)} match variant ${variant.id}, not the mapped ${component.id}`);
  errors.push(...flagNamesSet(root, control.flag, u.set.id).map((e) => `${label}: ${e}`));
  return errors;
}

module.exports = { ERROR_RE, MARKER, flagNamesSet, matchVariant, sameProperties, unreadableControlErrors, unreadableErrors, unreadableNodeErrors };
