#!/usr/bin/env node
// workbook: human markdown → PDF; pack master/ as a zip.
// PDFs are built from scripts/workbook/pages/ (human track), not from context/*.md.
// No npm deps. PDF uses Edge/Chrome headless when present.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  cpSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, execSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');
const pagesDir = join(here, 'pages');
const masterDir = join(repoRoot, 'master');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(s) {
  let t = esc(s);
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^\*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return t;
}

function mdToHtml(md) {
  const fences = [];
  let src = md.replace(/\r\n/g, '\n').replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const i = fences.length;
    fences.push(
      `<pre><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(code.replace(/\n$/, ''))}</code></pre>`,
    );
    return `\n\n%%FENCE${i}%%\n\n`;
  });

  const lines = src.split('\n');
  const out = [];
  let i = 0;
  let para = [];

  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(/^%%FENCE(\d+)%%$/);
    if (fence) {
      flushPara();
      out.push(fences[Number(fence[1])]);
      i++;
      continue;
    }
    if (/^\s*$/.test(line)) {
      flushPara();
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      flushPara();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      flushPara();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      flushPara();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      flushPara();
      out.push('<hr>');
      i++;
      continue;
    }
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    if (ul) {
      flushPara();
      out.push('<ul>');
      while (i < lines.length) {
        const m = lines[i].match(/^\s*[-*]\s+(.*)$/);
        if (!m) break;
        out.push(`<li>${inline(m[1])}</li>`);
        i++;
      }
      out.push('</ul>');
      continue;
    }
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ol) {
      flushPara();
      out.push('<ol>');
      while (i < lines.length) {
        const m = lines[i].match(/^\s*\d+\.\s+(.*)$/);
        if (!m) break;
        out.push(`<li>${inline(m[1])}</li>`);
        i++;
      }
      out.push('</ol>');
      continue;
    }
    para.push(line);
    i++;
  }
  flushPara();
  return out.join('\n');
}

function wrapHtml(title, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @page { size: letter; margin: 20mm 18mm; }
  body {
    font: 13pt/1.5 "Segoe UI", system-ui, sans-serif;
    color: #111;
    max-width: 640px;
    margin: 0 auto;
    padding: 12mm 0;
  }
  h1 {
    font-size: 22pt;
    font-weight: 650;
    margin: 0 0 18pt;
    letter-spacing: -0.02em;
  }
  h2 { font-size: 14pt; margin: 18pt 0 8pt; }
  p { margin: 0 0 12pt; color: #333; }
  ol, ul { margin: 0 0 12pt; padding-left: 1.3em; }
  li { margin: 0 0 8pt; }
  code { font-family: Consolas, "Cascadia Mono", monospace; font-size: 0.88em; }
</style>
</head>
<body>
${body}
</body>
</html>
`;
}

function findBrowser() {
  const env = process.env;
  const candidates = [
    join(env.PROGRAMFILES || '', 'Microsoft/Edge/Application/msedge.exe'),
    join(env['PROGRAMFILES(X86)'] || '', 'Microsoft/Edge/Application/msedge.exe'),
    join(env.LOCALAPPDATA || '', 'Microsoft/Edge/Application/msedge.exe'),
    join(env.PROGRAMFILES || '', 'Google/Chrome/Application/chrome.exe'),
    join(env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ];
  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }
  for (const cmd of ['msedge', 'chrome', 'google-chrome', 'chromium']) {
    try {
      const out = execSync(
        process.platform === 'win32' ? `where ${cmd}` : `command -v ${cmd}`,
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
      )
        .trim()
        .split(/\r?\n/)[0];
      if (out && existsSync(out)) return out;
    } catch {
      /* skip */
    }
  }
  return null;
}

function fileUrl(p) {
  const abs = resolve(p).replace(/\\/g, '/');
  if (/^[A-Za-z]:/.test(abs)) return `file:///${abs}`;
  return `file://${abs}`;
}

function htmlToPdf(htmlPath, pdfPath) {
  const browser = findBrowser();
  if (!browser) return false;
  try {
    execFileSync(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-pdf-header-footer',
        `--print-to-pdf=${pdfPath}`,
        fileUrl(htmlPath),
      ],
      { stdio: 'ignore' },
    );
    return existsSync(pdfPath) && statSync(pdfPath).size > 0;
  } catch {
    try {
      execFileSync(
        browser,
        ['--headless', '--disable-gpu', `--print-to-pdf=${pdfPath}`, fileUrl(htmlPath)],
        { stdio: 'ignore' },
      );
      return existsSync(pdfPath) && statSync(pdfPath).size > 0;
    } catch {
      return false;
    }
  }
}

function mdFileToPdf(mdPath, pdfPath) {
  const md = readFileSync(mdPath, 'utf8');
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : basename(mdPath, extname(mdPath));
  const tmp = join(tmpdir(), `workbook_${Date.now()}_${basename(pdfPath, '.pdf')}.html`);
  writeFileSync(tmp, wrapHtml(title, mdToHtml(md)), 'utf8');
  const ok = htmlToPdf(tmp, pdfPath);
  rmSync(tmp, { force: true });
  return ok;
}

function zipDir(srcDir, outZip) {
  if (existsSync(outZip)) rmSync(outZip);
  mkdirSync(dirname(outZip), { recursive: true });
  if (process.platform === 'win32') {
    const ps = `Compress-Archive -Path '${srcDir}\\*' -DestinationPath '${outZip}' -Force`;
    execFileSync('powershell', ['-NoProfile', '-Command', ps], { stdio: 'inherit' });
  } else {
    execFileSync('tar', ['-a', '-cf', outZip, '-C', srcDir, '.'], { stdio: 'inherit' });
  }
  if (!existsSync(outZip) || statSync(outZip).size === 0) {
    throw new Error(`zip failed: ${outZip}`);
  }
}

function buildMasterPdfs() {
  if (!existsSync(pagesDir)) throw new Error(`missing ${pagesDir}`);
  mkdirSync(masterDir, { recursive: true });
  const pages = readdirSync(pagesDir).filter((f) => f.endsWith('.md'));
  let pdfs = 0;
  let htmlFallback = 0;
  for (const f of pages) {
    const mdPath = join(pagesDir, f);
    const stem = basename(f, '.md');
    const pdfPath = join(masterDir, `${stem}.pdf`);
    const ok = mdFileToPdf(mdPath, pdfPath);
    if (ok) pdfs++;
    else {
      htmlFallback++;
      const htmlPath = join(masterDir, `${stem}.html`);
      const md = readFileSync(mdPath, 'utf8');
      const title = (md.match(/^#\s+(.+)$/m) || [,'page'])[1];
      writeFileSync(htmlPath, wrapHtml(title, mdToHtml(md)), 'utf8');
      console.log(`workbook: no browser — wrote ${stem}.html (Print to PDF)`);
    }
  }
  return { pages: pages.length, pdfs, htmlFallback };
}

function packMaster() {
  const built = buildMasterPdfs();
  const releases = join(repoRoot, 'releases');
  mkdirSync(releases, { recursive: true });
  for (const stale of ['master_template.zip', 'workbook.pdf', 'workbook.html']) {
    const p = join(releases, stale);
    if (existsSync(p)) rmSync(p);
  }
  const wrapRoot = join(tmpdir(), `master_pack_${Date.now()}`);
  const wrap = join(wrapRoot, 'master');
  mkdirSync(wrap, { recursive: true });
  cpSync(masterDir, wrap, { recursive: true });
  const zipPath = join(releases, 'master.zip');
  zipDir(wrapRoot, zipPath);
  rmSync(wrapRoot, { recursive: true, force: true });
  return { ...built, zipPath };
}

function usage() {
  console.log(`usage:
  node scripts/workbook/run.mjs              build master/*.pdf and releases/master.zip
  node scripts/workbook/run.mjs --pack       same
  node scripts/workbook/run.mjs <file.md>    that file → sibling .pdf`);
}

const args = process.argv.slice(2).filter((a) => a !== '--pack');
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  usage();
  process.exit(0);
}

if (args.length === 0 || process.argv.includes('--pack')) {
  const r = packMaster();
  console.log(`workbook: ${r.pages} human pages → ${r.pdfs} pdfs`);
  console.log(`workbook: zip releases/master.zip`);
  process.exit(0);
}

const input = resolve(args[0]);
if (!existsSync(input) || !statSync(input).isFile()) {
  console.error(`workbook: markdown file not found: ${input}`);
  process.exit(1);
}
const outPdf = input.replace(/\.md$/i, '.pdf');
if (mdFileToPdf(input, outPdf)) console.log(`workbook: ${outPdf}`);
else console.log('workbook: no browser found');
