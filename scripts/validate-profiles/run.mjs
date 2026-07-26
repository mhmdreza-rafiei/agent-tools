#!/usr/bin/env node
// validate-profiles: structural lint of profiles/*.yaml (no external deps).
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const profilesDir = join(root, 'profiles');
const AUTHOR = 'mhmdreza_rafiei';
let violations = 0;

function validateProfile(p) {
  const text = readFileSync(p, 'utf8');
  const lines = text.split(/\r?\n/);
  const rel = relative(root, p);
  const checks = [
    [/^name:\s*\S/m, 'missing name: field'],
    [new RegExp(`^author:\\s*${AUTHOR}\\s*$`, 'm'), 'missing or wrong author'],
    [/^scope:\s*(project|global)\s*$/m, 'scope must be project or global'],
    [/^targets:/m, 'missing targets: section'],
    [/^artifacts:/m, 'missing artifacts: section'],
  ];
  for (const [re, msg] of checks) {
    if (!re.test(text)) {
      console.warn(`FAIL ${rel}: ${msg}`);
      violations++;
    }
  }
  // every artifact ref should have a non-empty id
  for (const l of lines) {
    const m = l.match(/^\s*-\s*id:\s*(\S*)/);
    if (m && m[1] === '') {
      console.warn(`FAIL ${rel}: artifact ref with empty id`);
      violations++;
    }
  }
}

if (!existsSync(profilesDir)) {
  console.error('No profiles/ directory found.');
  process.exit(1);
}

const profiles = readdirSync(profilesDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
if (profiles.length === 0) {
  console.warn('No profile YAMLs found.');
}
for (const f of profiles) {
  validateProfile(join(profilesDir, f));
}

if (violations === 0) {
  console.log(`validate-profiles: OK -- ${profiles.length} profile(s) valid.`);
} else {
  console.error(`validate-profiles: ${violations} violation(s) found.`);
  process.exit(1);
}
