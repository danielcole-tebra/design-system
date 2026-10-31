// Local only. Input is a saved record.json, never JSON embedded in a shell command.
// Generates a concise report and appends one idempotent LOG entry. Does not commit.
const fs = require('node:fs');
const path = require('node:path');

function renderRecord(record) {
  const nonempty = (value, name) => {
    if (typeof value !== 'string' || !value.trim() || value.includes('REPLACE_')) throw new Error('Missing actual value: ' + name);
    return value;
  };
  if (record.schemaVersion !== 1) throw new Error('Expected schemaVersion 1');
  for (const field of ['title', 'date', 'fileKey', 'reviewUrl', 'summary']) nonempty(record[field], field);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.date)) throw new Error('Use YYYY-MM-DD date');
  for (const field of ['verified', 'findings', 'reads', 'screenshots']) {
    if (!Array.isArray(record[field])) throw new Error('Expected array: ' + field);
    record[field].forEach(value => nonempty(value, field));
  }
  if (!record.verified.length || !record.screenshots.length) throw new Error('Record actual verification and screenshots');
  if (!record.evidence || typeof record.evidence !== 'object' || Array.isArray(record.evidence) || !Object.keys(record.evidence).length) throw new Error('Missing compact evidence');
  const timing = record.timing ?? {}, names = ['start', 'ready', 'built', 'firstImage', 'verified'];
  const times = names.map(name => {
    if (typeof timing[name] !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(timing[name])) throw new Error('UTC ISO checkpoint required: ' + name);
    const value = Date.parse(timing[name]);
    if (!Number.isFinite(value)) throw new Error('Invalid checkpoint: ' + name);
    return value;
  });
  if (times.some((time, i) => i > 0 && time < times[i - 1])) throw new Error('Checkpoints out of order');
  if (!Number.isFinite(timing.inputWaitSeconds) || timing.inputWaitSeconds < 0) throw new Error('Record actual input wait seconds');
  const effort = record.effort ?? {};
  nonempty(effort.through, 'effort.through');
  for (const field of ['figmaCalls', 'otherCalls', 'searches', 'technicalRetries', 'canvasCorrections', 'clarificationStops']) {
    if (effort[field] !== null && (!Number.isSafeInteger(effort[field]) || effort[field] < 0)) throw new Error('Count or null required: ' + field);
  }
  if (effort.tokens !== null && (!Number.isSafeInteger(effort.tokens) || effort.tokens < 0)) throw new Error('Exact tokens or null required');
  const seconds = (a, b) => (times[b] - times[a]) / 1000;
  const list = values => values.length ? values.map(value => '- ' + value).join('\n') : '- None reported.';
  const report = `# ${record.title}\n\n${record.summary}\n\n[Review section](${record.reviewUrl}) · File: ${record.fileKey}\n\n## Timing\n\nStart: ${timing.start}. Ready to construct: ${timing.ready}. Construction returned: ${timing.built}. First image: ${timing.firstImage}. Verified: ${timing.verified}.\n\nPreparation/discovery: ${seconds(0, 1)}s; construction: ${seconds(1, 2)}s; verification after construction: ${seconds(2, 4)}s. First image elapsed: ${seconds(0, 3)}s; verified elapsed: ${seconds(0, 4)}s. Actual input wait: ${timing.inputWaitSeconds}s (not subtracted). Successful push/completion is reported in final chat.\n\n## Verified\n\n${list(record.verified)}\n\n## Findings and recovery\n\n${list(record.findings)}\n\n## Observable effort\n\nCounts through ${effort.through}: ${['figmaCalls', 'otherCalls', 'searches', 'technicalRetries', 'canvasCorrections', 'clarificationStops', 'tokens'].map(key => key + '=' + (effort[key] ?? 'unavailable')).join('; ')}.\n\n## Reading\n\n${list(record.reads)}\n\n## Evidence\n\nCompact readback and source metrics: [record.json](record.json). Screenshots:\n\n${list(record.screenshots.map(name => '[' + name + '](' + name + ')'))}\n\nOne fixed-build run; not evidence of a general speedup.\n`;
  return report;
}

function recordBatch(repoRoot, inputPath) {
  const runs = fs.realpathSync(path.join(repoRoot, 'runs'));
  const input = fs.realpathSync(inputPath);
  const relative = path.relative(runs, input);
  if (relative.startsWith('..') || path.isAbsolute(relative) || path.basename(input) !== 'record.json' || path.dirname(input) === runs) {
    throw new Error('Input must be record.json inside a run folder');
  }
  const record = JSON.parse(fs.readFileSync(input, 'utf8'));
  const report = renderRecord(record), folder = path.dirname(input);
  for (const name of record.screenshots) {
    if (!/^[\w.-]+\.png$/i.test(name)) throw new Error('Screenshot must be a local PNG filename');
    const resolved = fs.realpathSync(path.join(folder, name));
    if (path.dirname(resolved) !== folder || !fs.statSync(resolved).isFile()) throw new Error('Screenshot outside run folder');
  }
  const runPath = path.relative(repoRoot, folder).split(path.sep).join('/');
  const marker = `<!-- builder-run:${runPath} -->`;
  const entry = `\n\n${marker}\n## ${record.date} — ${record.title}\n- File: ${record.fileKey}. ${record.summary.replace(/\s+/g, ' ')}\n- Evidence: ${runPath}/REPORT.md, record.json, ${record.screenshots.join(', ')}.\n`;
  const logPath = path.join(repoRoot, 'LOG.md'), log = fs.readFileSync(logPath, 'utf8');
  const reportPath = path.join(folder, 'REPORT.md');
  if (fs.existsSync(reportPath) && fs.readFileSync(reportPath, 'utf8') !== report) throw new Error('Existing report differs; review before replacing');
  if (log.includes(marker) && !log.replace(/\r\n/g, '\n').includes(entry.trimStart())) throw new Error('Existing LOG entry differs; review before replacing');
  if (!fs.existsSync(reportPath)) fs.writeFileSync(reportPath, report, { flag: 'wx' });
  if (!log.includes(marker)) fs.appendFileSync(logPath, entry);
  return { report: reportPath, record: input, log: logPath, alreadyLogged: log.includes(marker) };
}

if (require.main === module) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node tools/builder/record.cjs runs/RUN/record.json');
    console.log(JSON.stringify(recordBatch(path.resolve(__dirname, '../..'), process.argv[2])));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { renderRecord, recordBatch };
