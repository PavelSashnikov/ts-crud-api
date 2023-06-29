import { createServer } from 'http';

export const serv = createServer(async (req, res) => {
  console.log("🚀 ~ file: server.ts:5 ~ serv ~ req.url:", req.url)
  if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('server works');
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('unknown endpoint'));
  }
});
