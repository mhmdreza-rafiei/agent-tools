'use strict';
/**
 * Self-check for the demo server.
 * Usage: node check.js
 * Exits 0 on pass, 1 on any failure.
 *
 * ponytail: no test framework — assert + node:http is the smallest correct tool.
 */
const http = require('http');
const { server } = require('./server');

const PORT = process.env.PORT || 3741;
const BASE = `http://localhost:${PORT}`;

let passed = 0;
let failed = 0;

function assert(label, condition, detail = '') {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}${detail ? ': ' + detail : ''}`);
    failed++;
  }
}

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    };
    const req = http.request(opts, (res) => {
      let raw = '';
      res.on('data', c => { raw += c; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('\n── Demo self-check ──\n');

  // 1. GET /tasks returns empty list initially
  {
    const r = await request('GET', '/tasks');
    assert('GET /tasks → 200', r.status === 200, `got ${r.status}`);
    assert('initial tasks array is empty', Array.isArray(r.body.tasks) && r.body.tasks.length === 0);
  }

  // 2. POST /tasks creates a task
  {
    const r = await request('POST', '/tasks', { text: 'Write catalog tests' });
    assert('POST /tasks → 201', r.status === 201, `got ${r.status}`);
    assert('response has task.id', typeof r.body.task?.id === 'number');
    assert('response has task.text', r.body.task?.text === 'Write catalog tests');
  }

  // 3. GET /tasks now returns the created task
  {
    const r = await request('GET', '/tasks');
    assert('GET /tasks → 200 after POST', r.status === 200);
    assert('tasks list has one item', r.body.tasks?.length === 1);
    assert('task text matches', r.body.tasks?.[0]?.text === 'Write catalog tests');
  }

  // 4. POST /tasks with empty text → 422
  {
    const r = await request('POST', '/tasks', { text: '   ' });
    assert('POST empty text → 422', r.status === 422, `got ${r.status}`);
    assert('error field present', typeof r.body.error === 'string');
  }

  // 5. POST /tasks with invalid JSON → 400
  {
    const r = await new Promise((resolve, reject) => {
      const bad = 'not-json';
      const opts = {
        hostname: 'localhost', port: PORT, path: '/tasks', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bad) },
      };
      const req = http.request(opts, (res) => {
        let raw = '';
        res.on('data', c => { raw += c; });
        res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(raw) }));
      });
      req.on('error', reject);
      req.write(bad);
      req.end();
    });
    assert('POST invalid JSON → 400', r.status === 400, `got ${r.status}`);
  }

  // 6. DELETE /tasks/:id removes the task
  {
    const r = await request('DELETE', '/tasks/1');
    assert('DELETE /tasks/1 → 200', r.status === 200, `got ${r.status}`);
    assert('deleted id returned', r.body.deleted === 1);
  }

  // 7. GET /tasks after delete → empty again
  {
    const r = await request('GET', '/tasks');
    assert('GET /tasks after delete → empty', r.body.tasks?.length === 0);
  }

  // 8. DELETE non-existent task → 404
  {
    const r = await request('DELETE', '/tasks/999');
    assert('DELETE unknown id → 404', r.status === 404, `got ${r.status}`);
  }

  // 9. Unknown route → 404
  {
    const r = await request('GET', '/unknown');
    assert('GET /unknown → 404', r.status === 404, `got ${r.status}`);
  }

  console.log(`\n── Results: ${passed} passed, ${failed} failed ──\n`);
  server.close();
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('check.js crashed:', err);
  server.close();
  process.exit(1);
});
