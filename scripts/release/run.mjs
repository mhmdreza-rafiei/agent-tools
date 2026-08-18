#!/usr/bin/env node
// release: bump version + changelog + annotated tag (dry-run by default).
// GitHub's Releases sidebar is NOT the releases/ folder. Push the tag so
// .github/workflows/github-release.yml publishes a real GitHub Release.
import { execSync } from 'node:child_process';

const apply = process.argv.includes('--apply');
const push = process.argv.includes('--push');
const PREFIX = 'v';

function git(args) {
  return execSync(`git ${args}`, { encoding: 'utf8' }).trim();
}

function bump(prev) {
  const m = prev.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return `${PREFIX}0.1.0`;
  return `${PREFIX}${m[1]}.${m[2]}.${Number(m[3]) + 1}`;
}

let lastTag = '';
try {
  lastTag = git('describe --tags --abbrev=0');
} catch {
  lastTag = '';
}
const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const next = bump(lastTag || 'v0.0.0');
const log = git(`log --pretty=format:"- %s" ${range}`);
const changelog = `## ${next}\n\n${log}\n`;

console.log(`release: next version = ${next}`);
console.log('--- changelog ---');
console.log(changelog);

if (!apply) {
  console.log('release: dry-run only. Pass --apply to create the tag.');
  console.log('release: then git push origin <tag> so GitHub Actions publishes the Release.');
  process.exit(0);
}

execSync(`git tag -a ${next} -m "Release ${next}"`, { stdio: 'inherit' });
console.log(`release: created tag ${next}`);

if (push) {
  execSync(`git push origin ${next}`, { stdio: 'inherit' });
  console.log(`release: pushed ${next} — GitHub Release is created by the github-release workflow.`);
} else {
  console.log(`release: git push origin ${next}`);
  console.log('release: that tag (not the releases/ folder) is what GitHub lists under Releases.');
}
