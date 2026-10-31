// Bounded local document reads. No dependencies, network, or file writes.
const fs = require('node:fs');

function headings(text) {
  const result = [];
  let position = 0, fence = null;
  for (const line of text.split(/(?<=\n)/)) {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
    } else if (!fence) {
      const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (match) result.push({ title: match[2], level: match[1].length, start: position });
    }
    position += line.length;
  }
  return result.map((heading, i) => ({ ...heading,
    end: result.slice(i + 1).find(next => next.level <= heading.level)?.start ?? text.length }));
}

function readPage(text, { section, index = false, offset = 0 } = {}) {
  if (!Number.isSafeInteger(offset) || offset < 0 || (section !== undefined && index)) throw new Error('Invalid read options');
  const entries = headings(text);
  let source = text;
  if (index) {
    source = entries.map(h => `${'#'.repeat(h.level)} ${h.title} (${h.end - h.start} characters)`).join('\n');
  } else if (section !== undefined) {
    const matches = entries.filter(h => h.title === section);
    if (matches.length !== 1) throw new Error('Section must match exactly one heading; use --index');
    source = text.slice(matches[0].start, matches[0].end);
  }
  if (offset > source.length) throw new Error('Offset exceeds selected text');
  let end = Math.min(offset + 6000, source.length);
  // Keep a surrogate pair together across pages.
  if (end < source.length && /[\uD800-\uDBFF]/.test(source[end - 1])) end--;
  return { text: source.slice(offset, end), offset, nextOffset: end < source.length ? end : null,
    totalCharacters: source.length, complete: end === source.length };
}

if (require.main === module) {
  try {
    const [file, ...args] = process.argv.slice(2);
    if (!file) throw new Error('Usage: node tools/builder/read.cjs FILE [--index | --section "Heading"] [--offset N]');
    const options = {};
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--index') options.index = true;
      else if (args[i] === '--section' && args[i + 1] !== undefined) options.section = args[++i];
      else if (args[i] === '--offset' && /^\d+$/.test(args[i + 1] ?? '')) options.offset = Number(args[++i]);
      else throw new Error('Unknown or incomplete argument: ' + args[i]);
    }
    const page = readPage(fs.readFileSync(file, 'utf8'), options);
    process.stdout.write(`${file} | ${options.section ?? (options.index ? 'index' : 'whole file')} | characters ${page.offset}..${page.offset + page.text.length}/${page.totalCharacters}\n${page.text}\n${page.complete ? 'END of selected text' : 'MORE: repeat the same command with --offset ' + page.nextOffset}\n`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { headings, readPage };
