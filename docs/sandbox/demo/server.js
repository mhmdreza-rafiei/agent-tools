'use strict';
const http = require('http');

const PORT = process.env.PORT || 3741;

/** @type {Array<{id: number, text: string}>} */
const tasks = [];
let nextId = 1;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); }
      catch (e) { reject(new ApiError('Invalid JSON body', 400)); }
    });
    req.on('error', e => reject(new ApiError(`Read error: ${e.message}`, 500)));
  });
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
  });
  res.end(payload);
}

async function handleRequest(req, res) {
  const { method, url } = req;

  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  if (url === '/tasks' && method === 'GET') {
    return send(res, 200, { tasks });
  }

  if (url === '/tasks' && method === 'POST') {
    const body = await parseBody(req);
    if (typeof body.text !== 'string' || body.text.trim() === '') {
      throw new ApiError('Field "text" must be a non-empty string', 422);
    }
    const task = { id: nextId++, text: body.text.trim() };
    tasks.push(task);
    return send(res, 201, { task });
  }

  const deleteMatch = url.match(/^\/tasks\/(\d+)$/);
  if (deleteMatch && method === 'DELETE') {
    const id = Number(deleteMatch[1]);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) throw new ApiError(`Task ${id} not found`, 404);
    tasks.splice(idx, 1);
    return send(res, 200, { deleted: id });
  }

  if (url === '/' && method === 'GET') {
    const fs = require('fs');
    const path = require('path');
    const file = path.join(__dirname, 'index.html');
    try {
      const html = fs.readFileSync(file, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch (e) {
      throw new ApiError('index.html not found', 500);
    }
  }

  throw new ApiError(`Not found: ${method} ${url}`, 404);
}

const server = http.createServer(async (req, res) => {
  try {
    await handleRequest(req, res);
  } catch (err) {
    const status = err instanceof ApiError ? err.status : 500;
    const message = err instanceof ApiError ? err.message : 'Internal server error';
    if (!(err instanceof ApiError)) {
      console.error('[server] Unexpected error:', err);
    }
    send(res, status, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`demo server listening on http://localhost:${PORT}`);
});

module.exports = { server, tasks };
