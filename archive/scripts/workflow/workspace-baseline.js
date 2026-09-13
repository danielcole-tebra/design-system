const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('./lib');

function fileState(file, root = ROOT) {
  const full = path.resolve(root, file);
  const relative = path.relative(root, full);
  if (path.isAbsolute(file) || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error('Baseline path must stay inside the repository');
  if (!fs.existsSync(full)) return 'missing';
  const stat = fs.lstatSync(full);
  if (stat.isSymbolicLink()) return `symlink:${fs.readlinkSync(full)}`;
  if (!stat.isFile()) throw new Error(`Cannot baseline non-file ${file}`);
  return crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
}

function unchangedBaseline(file, baseline, root = ROOT) {
  return !!baseline && Object.hasOwn(baseline, file) && baseline[file] === fileState(file, root);
}
module.exports = { fileState, unchangedBaseline };
