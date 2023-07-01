import cluster from 'cluster';
import { RequestOptions, createServer, request } from 'http';
import { serv } from './server.js';
import { availableParallelism } from 'os';
import { balanceRR } from './helpers/balancer.js';
import 'dotenv/config';

const port = process.env.PORT || 3000;

if (cluster.isPrimary && process.argv.find((arg) => arg.startsWith('multi'))) {
  const clustersCount = availableParallelism() - 1;
  const getBalancer = balanceRR(clustersCount);

  for (let i = 1; i <= clustersCount; i++) {
    const worker = cluster.fork({ PORT: +port + i });
    cluster.on('exit', () => {
      console.log(`worker died ${worker.process.pid}`);
      cluster.fork({ PORT: +port + i });
    });
  }

  const proxy = createServer((client_req, client_res) => {
    const options: RequestOptions = {
      path: client_req.url,
      port: +port + getBalancer(),
      method: client_req.method,
    };
    const proxyReq = request(options, function (res) {
      res.pipe(client_res);
    });

    client_req.pipe(proxyReq);
  });

  proxy.listen(port, () => {
    console.log(`Primary on PORT ${port}`);
  });
  process.on('SIGINT', () => {
    proxy.close(() => {
      process.exit();
    });
  });
} else {
  serv.listen(port, () => console.log(`Cluster started on ${process.env.PORT}, pid: ${process.pid}`));
}
