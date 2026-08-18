#!/usr/bin/env node
// github: apply .github/rulesets and private vulnerability reporting via gh.
// Dry-run by default. Pass --apply to call the API (requires gh auth).
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const apply = process.argv.includes('--apply');
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../..');
const rulesDir = join(root, '.github/rulesets');

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

function remoteSlug() {
  const url = sh('git remote get-url origin');
  const m = url.match(/github\.com[:/](.+?)(?:\.git)?$/);
  if (!m) throw new Error(`not a GitHub remote: ${url}`);
  return m[1].replace(/\.git$/, '');
}

let slug;
try {
  slug = remoteSlug();
} catch (e) {
  console.error(String(e.message || e));
  process.exit(1);
}

const files = existsSync(rulesDir)
  ? readdirSync(rulesDir).filter((f) => f.endsWith('.json'))
  : [];

console.log(`github: repo ${slug}`);
console.log('github: PUT repos/' + slug + '/private-vulnerability-reporting');
console.log('github: gh repo edit --enable-discussions');
for (const f of files) console.log(`github: POST rulesets from ${f}`);

if (!apply) {
  console.log('github: dry-run. Pass --apply (needs gh auth).');
  process.exit(0);
}

try {
  sh('gh auth status');
} catch {
  console.error('github: gh is not logged in. Files are in the tree; run gh auth login, then retry --apply.');
  process.exit(1);
}

sh(`gh api -X PUT repos/${slug}/private-vulnerability-reporting`);
try {
  sh(`gh repo edit ${slug} --enable-discussions`);
} catch (e) {
  console.warn('github: discussions enable skipped:', String(e.stderr || e.message || e));
}

let existing = [];
try {
  existing = JSON.parse(sh(`gh api repos/${slug}/rulesets`));
} catch {
  existing = [];
}
const names = new Set((existing || []).map((r) => r.name));

for (const f of files) {
  const body = readFileSync(join(rulesDir, f), 'utf8');
  const name = JSON.parse(body).name;
  if (names.has(name)) {
    console.log(`github: ruleset already exists: ${name}`);
    continue;
  }
  execSync(`gh api repos/${slug}/rulesets --input -`, {
    input: body,
    encoding: 'utf8',
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  console.log(`github: created ruleset ${name}`);
}
