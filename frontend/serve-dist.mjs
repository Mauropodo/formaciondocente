import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('./dist/', import.meta.url);
const host = '127.0.0.1';
const port = 4321;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const serveFile = async (relativePath) => {
  const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, '');
  const resolved = new URL(safePath, root);
  return readFile(resolved);
};

const server = createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url ?? '/', `http://${host}:${port}`);
    let pathname = decodeURIComponent(requestUrl.pathname);

    if (pathname.endsWith('/')) {
      pathname += 'index.html';
    } else if (!extname(pathname)) {
      pathname += '/index.html';
    }

    const filePath = pathname.replace(/^\/+/, '');
    const body = await serveFile(filePath);
    const contentType = contentTypes[extname(filePath)] ?? 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(body);
  } catch {
    try {
      const fallback = await serveFile('404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fallback);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  }
});

server.listen(port, host, () => {
  console.log(`Static preview running at http://${host}:${port}`);
});
