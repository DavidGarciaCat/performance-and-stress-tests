const http = require('http');
const Benchmark = require('./benchmark');

const server = http.createServer((req, res) => {
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
    benchmark = (new Benchmark()).test_benchmark(true)
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(benchmark));
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8001, () => {
  console.log('Server is running on port 8001');
});
