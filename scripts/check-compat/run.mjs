#!/usr/bin/env node
// check-compat: strict agentry-compatibility gate (extensions, paths, frontmatter).
// No external deps; Node built-ins only.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
let bad = 0;

function walk(dir, cb) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, cb);
    else cb(p, e);
  }
}

function readFm(path) {
  const text = readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') return null;
  let end = -1;
  for (let i = 1; i < lines.length; i++) if (lines[i] === '---') { end = i; break; }
  return end === -1 ? null : lines.slice(1, end).join('\n');
}

// agents: only .mdc, must have name + description
walk(join(root, 'agents'), (p, e) => {
  if (!e.name.endsWith('.mdc')) {
    console.warn(`COMPAT-FAIL: ${relative(root, p)} -- agents must be .mdc`);
    bad++;
    return;
  }
  const fm = readFm(p) || '';
  if (!/^name:\s*.+/m.test(fm)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing name`); bad++; }
  if (!/^description:\s*.+/m.test(fm)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing description`); bad++; }
});

// rules: only .mdc, must have description + alwaysApply
walk(join(root, 'rules'), (p, e) => {
  if (!e.name.endsWith('.mdc')) {
    console.warn(`COMPAT-FAIL: ${relative(root, p)} -- rules must be .mdc`);
    bad++;
    return;
  }
  const fm = readFm(p) || '';
  if (!/^description:\s*.+/m.test(fm)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing description`); bad++; }
  if (!/^alwaysApply:\s*(true|false)/m.test(fm)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing alwaysApply`); bad++; }
});

// skills: must be SKILL.md, must have name + description
walk(join(root, 'skills'), (p, e) => {
  if (e.name !== 'SKILL.md') return;
  const fm = readFm(p) || '';
  if (!/^name:\s*.+/m.test(fm)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing name`); bad++; }
  if (!/^description:\s*.+/m.test(fm)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing description`); bad++; }
});

// profiles: .yaml/.yml, must have name + scope
walk(join(root, 'profiles'), (p, e) => {
  if (!e.name.endsWith('.yaml') && !e.name.endsWith('.yml')) {
    console.warn(`COMPAT-FAIL: ${relative(root, p)} -- profiles must be .yaml/.yml`);
    bad++;
    return;
  }
  const text = readFileSync(p, 'utf8');
  if (!/^name:\s*.+/m.test(text)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing name`); bad++; }
  if (!/^scope:\s*.+/m.test(text)) { console.warn(`COMPAT-FAIL: ${relative(root, p)} -- missing scope`); bad++; }
});

if (bad === 0) console.log('check-compat: OK -- catalog is agentry-compatible.');
else { console.error(`check-compat: ${bad} incompatibility(ies).`); process.exit(1); }
