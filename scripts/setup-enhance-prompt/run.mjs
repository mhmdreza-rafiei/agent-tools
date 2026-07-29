#!/usr/bin/env node
// setup-enhance-prompt: install enhance-prompt profile via agentry + patch AGENTS.md
// No external deps; Node built-ins only.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const auto = args.includes('--auto');
const isGlobal = args.includes('-g') || args.includes('--global');
const yes = args.includes('-y') || args.includes('--yes');

const fromIdx = args.indexOf('--from');
const catalog = fromIdx !== -1 ? args[fromIdx + 1] : 'mhmdreza-rafiei/agent-tools';

const agents = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '-a' || args[i] === '--agent') agents.push(args[i + 1]);
}
if (agents.length === 0) agents.push('cursor');

const skip = new Set(['--auto', '-g', '--global', '-y', '--yes', '--from', '-a', '--agent']);
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (skip.has(args[i])) {
    if (args[i] === '--from' || args[i] === '-a' || args[i] === '--agent') i++;
    continue;
  }
  if (!args[i].startsWith('-')) positional.push(args[i]);
}
const target = resolve(positional[0] || '.');

const profile = auto ? 'enhance-prompt-auto' : 'enhance-prompt';
const scopeFlag = isGlobal ? '-g' : '-p';
const agentFlags = agents.map((a) => `-a ${a}`).join(' ');
const yesFlag = yes ? '-y' : '';
const opts = `${scopeFlag} ${agentFlags} ${yesFlag}`.replace(/\s+/g, ' ').trim();

const ARTIFACTS = [
  ['skills', 'enhance-prompt'],
  ['skills', 'workflow/enhance-prompt-setup'],
  ['agents', 'ai/prompt-architect'],
  ['rules', 'ask-dont-guess'],
  ['rules', 'ai-attribution'],
  ['rules', 'prompt-quality'],
];
if (auto) ARTIFACTS.push(['rules', 'enhance-prompt-auto']);

function run(cmd) {
  console.log(`setup-enhance-prompt: ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: target });
}

function installArtifacts() {
  console.log('setup-enhance-prompt: installing artifacts individually...');
  for (const [kind, id] of ARTIFACTS) {
    run(`agentry add ${kind} ${catalog} ${id} ${opts}`);
  }
}

try {
  run(`agentry add profile ${profile} ${catalog} ${opts}`);
} catch {
  installArtifacts();
}

const agentsMd = join(target, 'AGENTS.md');
const block = `
## Prompt enhancement

| Skill | When |
|-------|------|
| enhance-prompt | \`/enhance-prompt\` or \`enhance-prompt self use\` |
| workflow/enhance-prompt-setup | \`/enhance-prompt-setup\` |

${auto ? '**Auto mode:** `enhance-prompt-auto` rule is active -- every task message is enhanced internally before acting. Remove that rule to disable.\n' : '**Manual mode:** invoke `/enhance-prompt` when you want a prompt rewritten.\n'}
`;

if (existsSync(agentsMd)) {
  let text = readFileSync(agentsMd, 'utf8');
  if (!text.includes('## Prompt enhancement')) {
    text = text.trimEnd() + '\n' + block;
    writeFileSync(agentsMd, text, 'utf8');
    console.log('setup-enhance-prompt: patched AGENTS.md');
  }
} else {
  writeFileSync(agentsMd, `# AGENTS.md\n${block}`, 'utf8');
  console.log('setup-enhance-prompt: created AGENTS.md');
}

console.log(`setup-enhance-prompt: done (${profile}, ${isGlobal ? 'global' : 'project'}).`);
