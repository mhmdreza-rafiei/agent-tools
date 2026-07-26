#!/usr/bin/env node
// stats: print catalog inventory (agents, rules, skills, profiles, scripts).
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function listMdc(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isFile() && e.name.endsWith('.mdc')) out.push(e.name.replace(/\.mdc$/, ''));
    else if (e.isDirectory()) {
      for (const sub of readdirSync(join(dir, e.name), { withFileTypes: true })) {
        if (sub.isFile() && sub.name.endsWith('.mdc')) out.push(`${e.name}/${sub.name.replace(/\.mdc$/, '')}`);
      }
    }
  }
  return out.sort();
}

function listSkills(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() && existsSync(join(dir, e.name, 'SKILL.md'))) out.push(e.name);
    else if (e.isDirectory()) {
      for (const sub of readdirSync(join(dir, e.name), { withFileTypes: true })) {
        if (sub.isDirectory() && existsSync(join(dir, e.name, sub.name, 'SKILL.md'))) {
          out.push(`${e.name}/${sub.name}`);
        }
      }
    }
  }
  return out.sort();
}

function listProfiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => f.replace(/\.ya?ml$/, ''))
    .sort();
}

function listScripts(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() && readdirSync(join(dir, e.name), { withFileTypes: true }).some((f) => f.isFile())) out.push(e.name);
  }
  return out.sort();
}

const agents = listMdc(join(root, 'agents'));
const rules = listMdc(join(root, 'rules'));
const skills = listSkills(join(root, 'skills'));
const profiles = listProfiles(join(root, 'profiles'));
const scripts = listScripts(join(root, 'scripts'));

const total = agents.length + rules.length + skills.length + profiles.length + scripts.length;

console.log('agent-tools catalog stats');
console.log('========================');
console.log(`Agents (${agents.length}):`);
for (const a of agents) console.log(`  - ${a}`);
console.log(`Rules (${rules.length}):`);
for (const r of rules) console.log(`  - ${r}`);
console.log(`Skills (${skills.length}):`);
for (const s of skills) console.log(`  - ${s}`);
console.log(`Profiles (${profiles.length}):`);
for (const p of profiles) console.log(`  - ${p}`);
console.log(`Scripts (${scripts.length}):`);
for (const s of scripts) console.log(`  - ${s}`);
console.log('========================');
console.log(`Total artifacts: ${total}`);
