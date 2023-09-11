const cluster = require('cluster');
const http = require('http');
const { availableParallelism } = require('os');
const process = require('process');
const Benchmark = require('./benchmark');

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary Cluster with PID ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({server: 'nodejs', hello: 'world'}));
    } else if (req.method === 'GET' && req.url === '/loop') {
      const startTime = new Date();
      let i = 0;
      while (i < 1000000000) {
        i++;
      }
      const endTime = new Date();
      const elapsedTime = endTime - startTime;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({server: 'nodejs', hello: 'world', loop: i, elapsedTime: elapsedTime}));
    } else if (req.method === 'GET' && req.url === '/benchmark') {
      const benchmark = (new Benchmark()).test_benchmark(true)
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(benchmark));
    } else {
      res.statusCode = 404;
      res.end();
    }
  }).listen(8001, () => {
    console.log('Server is running on port 8001');
  });
}
