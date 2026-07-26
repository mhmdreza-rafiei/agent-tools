#!/usr/bin/env node
// release: bump version + generate changelog + tag (dry-run by default).
// No external deps; Node built-ins only.
import { execSync } from 'node:child_process';

const apply = process.argv.includes('--apply');
const PREFIX = 'v';

function git(args) {
  return execSync(`git ${args}`, { encoding: 'utf8' }).trim();
}

function bump(prev) {
  // simple patch bump: v1.2.3 -> v1.2.4
  const m = prev.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return `${PREFIX}0.1.0`;
  return `${PREFIX}${m[1]}.${m[2]}.${Number(m[3]) + 1}`;
}

const lastTag = git('describe --tags --abbrev=0 2>nul') || '';
const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const next = bump(lastTag || 'v0.0.0');

const log = git(`log --pretty=format:"- %s" ${range}`);
const changelog = `## ${next}\n\n${log}\n`;

console.log(`release: next version = ${next}`);
console.log('--- changelog ---');
console.log(changelog);

if (apply) {
  execSync(`git tag -a ${next} -m "Release ${next}"`, { stdio: 'inherit' });
  console.log(`release: created tag ${next}`);
} else {
  console.log('release: dry-run only. Pass --apply to create the tag.');
}
