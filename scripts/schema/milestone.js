// Milestone snapshots under backup policy B (record backupPolicyB_2026-09-08): immutable records + git +
// milestone tags at each workstream close or weekly, whichever comes first.
//   node scripts/schema/milestone.js <reason>      create milestone/<YYYY-MM-DD>-<slug> at HEAD (annotated)
//   node scripts/schema/milestone.js --status      print the latest milestone and whether the weekly window is open
// A milestone is only created on a clean, validated tree; the tag is the snapshot, so it must point at a commit.
const { execFileSync } = require('child_process');
const { ROOT } = require('./lib');

const MILESTONE_PREFIX = 'milestone/';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

function latestMilestone() {
  const out = git('for-each-ref', '--sort=-taggerdate', '--format=%(refname:short)|%(taggerdate:iso-strict)|%(objectname:short)|%(*objectname:short)', `refs/tags/${MILESTONE_PREFIX}`);
  const line = out.split(/\r?\n/).filter(Boolean)[0];
  if (!line) return null;
  const [name, date, tagObject, commit] = line.split('|');
  return { name, date, commit: commit || tagObject };
}

function milestoneStatus(now = new Date()) {
  const latest = latestMilestone();
  if (!latest) return { latest: null, ageDays: null, overdue: true, reason: 'no milestone tag exists' };
  const ageMs = now - new Date(latest.date);
  const ageDays = Number((ageMs / (24 * 60 * 60 * 1000)).toFixed(1));
  return { latest, ageDays, overdue: ageMs > WEEK_MS, reason: ageMs > WEEK_MS ? `latest milestone ${latest.name} is ${ageDays} days old (weekly limit)` : null };
}

function createMilestone(reason) {
  if (!reason || !reason.trim()) throw new Error('Usage: node scripts/schema/milestone.js <reason>  (e.g. "NPVE sidesheets workstream close" or "weekly")');
  const dirty = git('status', '--porcelain');
  if (dirty) throw new Error(`Working tree is not clean; commit first:\n${dirty}`);
  const { validateSplit } = require('./validate-split');
  validateSplit({ skipMilestone: true });
  const date = new Date().toISOString().slice(0, 10);
  const slug = reason.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  const name = `${MILESTONE_PREFIX}${date}-${slug}`;
  const existing = git('tag', '--list', name);
  if (existing) throw new Error(`${name} already exists`);
  const head = git('rev-parse', '--short', 'HEAD');
  execFileSync('git', ['tag', '-a', name, '-m', `Milestone snapshot: ${reason.trim()} (backup policy B, record backupPolicyB_2026-09-08). Store and aggregate validated at ${head}.`], { cwd: ROOT, stdio: 'inherit' });
  return { name, commit: head };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--status')) {
    const status = milestoneStatus();
    console.log(status.latest ? `latest milestone ${status.latest.name} at ${status.latest.commit} (${status.ageDays} days old)${status.overdue ? ' — OVERDUE' : ''}` : 'no milestone tag exists — OVERDUE');
    if (status.overdue) process.exitCode = 1;
  } else {
    const created = createMilestone(args.join(' '));
    console.log(`milestone ${created.name} at ${created.commit}`);
  }
}

module.exports = { MILESTONE_PREFIX, createMilestone, latestMilestone, milestoneStatus };
