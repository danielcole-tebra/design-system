// Records the start of the approved global NPVE Sidesheet header-padding batch.
const fs = require('fs');

const schemaPath = './design-system-schema.json';
const backupPath = './design-system-schema.backup-2026-09-04-pre-npve-sidesheet-header-padding-global.json';
const recordKey = 'npveRebuild_sidesheetHeaderPaddingGlobal_2026-09-04';
const previousKey = 'npveRebuild_sidesheetHeaderInsetAudit_2026-09-04';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (schema[recordKey]) throw new Error(`${recordKey} already exists`);
if (!String(schema[previousKey]?._status || '').startsWith('READ-ONLY AUDIT COMPLETE')) {
  throw new Error(`${previousKey} is not recorded complete`);
}

fs.copyFileSync(schemaPath, backupPath);
schema[recordKey] = {
  _status: 'IN PROGRESS — applying canonical 16px vertical padding to every NPVE Sidesheet Header.',
  date: '2026-09-04',
  _targetFile: 'fdCQVFdvOByaOYIJYag0d6',
  _libraryFile: 'YX2n4YLrEpBXNbcc73T6dw read only',
  _sourceFile: 'zVsuhYehoSLLq880qRBFkq read only',
  report: 'figma-export/npve-sidesheet-header-padding-global-2026-09-04/report.md',
  recordGate: `${previousKey} recorded complete — passed`,
  userDecision: 'Use genuine 16px top/bottom Header padding even though the resulting 72px Header is taller than the 64px source; canonical base-8 spacing takes precedence.',
  scope: 'Bind paddingTop and paddingBottom to published space/16 on all three Sidesheet Headers; preserve the 40px Icon button touch targets, producing a 72px Header and 20px visual title clearance. Keep fixed sheets 550×600 by shrinking their flexible Body 16px. Grow Medication content-driven placements 550×366→550×382 to preserve Body 238px. Update the five affected Change log/Row instances.',
  intendedGeometry: {
    header: '550×72, padding 16/8/16/16, 40px controls at y16, 32px title at y20',
    fixedSheet: '550×600; divider y72 h1; Body y73 h456; Footer y529 h71',
    footerHidden: 'Body y73 h527',
    medication: '550×382; Header72 + Divider1 + Body238 + Footer71; Footer y311'
  },
  preserve: 'All component IDs, Placement values, 12 existing properties/defaults, 70 reference entries per variant, radii, four-sided outline, body padding, footer padding, content, icon swaps, text styles, paints, and every live instance link.',
  stopCondition: 'Stop on file/page/component identity mismatch, missing space/16, any non-16 Header vertical padding, Header other than 72px, changed API/default, fewer than 70 property-reference entries per variant, detached instance, changed paint/alpha, Medication Body other than 238px, fractional authored geometry, or unexpected placed-instance diff.',
  flagsAdded: []
};

fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 1)}\n`);
console.log(`started ${recordKey}`);
