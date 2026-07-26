#!/usr/bin/env node
// audit-catalog: find missing author, orphan files, and duplicate names.
// No external deps; Node built-ins only.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const AUTHOR = 'mhmdreza_rafiei';
let findings = 0;

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

// 1) author check across agents, rules, skills
walk(join(root, 'agents'), (p) => {
  const fm = readFm(p) || '';
  if (!new RegExp(`^author:\\s*${AUTHOR}\\s*$`, 'm').test(fm)) {
    console.warn(`ORPHAN-AUTHOR: ${relative(root, p)}`);
    findings++;
  }
});
walk(join(root, 'rules'), (p) => {
  const fm = readFm(p) || '';
  if (!new RegExp(`^author:\\s*${AUTHOR}\\s*$`, 'm').test(fm)) {
    console.warn(`ORPHAN-AUTHOR: ${relative(root, p)}`);
    findings++;
  }
});
walk(join(root, 'skills'), (p) => {
  if (!p.endsWith('SKILL.md')) return;
  const fm = readFm(p) || '';
  if (!new RegExp(`^author:\\s*${AUTHOR}\\s*$`, 'm').test(fm)) {
    console.warn(`ORPHAN-AUTHOR: ${relative(root, p)}`);
    findings++;
  }
});

// 2) duplicate names within a kind
const byKind = { agents: {}, rules: {}, skills: {} };
walk(join(root, 'agents'), (p) => {
  const fm = readFm(p) || '';
  const m = fm.match(/^name:\s*(.+)$/m);
  const name = m ? m[1].trim() : p;
  byKind.agents[name] = (byKind.agents[name] || 0) + 1;
});
walk(join(root, 'rules'), (p) => {
  const fm = readFm(p) || '';
  const m = fm.match(/^name:\s*(.+)$/m);
  const name = m ? m[1].trim() : p;
  byKind.rules[name] = (byKind.rules[name] || 0) + 1;
});
walk(join(root, 'skills'), (p) => {
  if (!p.endsWith('SKILL.md')) return;
  const fm = readFm(p) || '';
  const m = fm.match(/^name:\s*(.+)$/m);
  const name = m ? m[1].trim() : p;
  byKind.skills[name] = (byKind.skills[name] || 0) + 1;
});
for (const kind of Object.keys(byKind)) {
  for (const [name, n] of Object.entries(byKind[kind])) {
    if (n > 1) { console.warn(`DUP-NAME: ${kind}/${name} appears ${n}x`); findings++; }
  }
}

if (findings === 0) console.log('audit-catalog: OK -- no missing authors or duplicate names.');
else { console.error(`audit-catalog: ${findings} finding(s).`); process.exit(1); }
