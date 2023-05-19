# Stress Tests

Basic repo to collect basic usage metrics for performance and stress testing.

## Usage

This repository contains the same code in different programming languages:
- (HTTP Port 8001) JavaScript powered by Node.js
- (HTTP Port 8002) Python
- (HTTP Port 8003) PHP
- (HTTP Port 8004) TypeScript powered by Deno
- (HTTP Port 8005) GO

```bash
# Start the Docker containers
docker-compose up
```

All the containers have the same accessible URLs:

- `GET /` returns a simple `Hello World` message
- `GET /loop` runs a loop from 1 to 1_000_000_000; then returns a `Hello World` message and the elapsed time in milliseconds
- `GET /benchmark` runs several operations from several types of processing, including `maths`, `string processing`, `loops` and `conditionals`; then returns the results of each test suite in seconds

> **PLEASE NOTE** Python does not have (in the version I used) four of the mathematical operations during the Benchmark test suite.

> **WARNING** I have just started to work on the GoLang version. For now, the only URI available is `GET /`; the other ones will be implemented as soon as I have some time to do it.

## Response time

My system is an Apple MacBook Pro 13-inch M1 (2020) with 16GB

### JavaScript + Node.js

```bash
$ time curl -o response.json http://localhost:8001/

0.00s user
0.01s system
  53% cpu
0.026 total
```

```bash
$ time curl -o response.json http://localhost:8001/loop

0.00s user
0.01s system
   2% cpu
0.547 total
```

```bash
$ time curl -o response.json http://localhost:8001/benchmark

0.00s user
0.01s system
   7% cpu
0.183 total
```

### Python

```bash
$ time curl -o response.json http://localhost:8002/

0.00s user
0.01s system
  44% cpu
0.035 total
```

```bash
$ time curl -o response.json http://localhost:8002/loop

 0.01s user
 0.01s system
    0% cpu
11.242 total
```

```bash
$ time curl -o response.json http://localhost:8002/benchmark

0.00s user
0.01s system
   5% cpu
0.279 total
```

### PHP

```bash
$ time curl -o response.json http://localhost:8003/

0.00s user
0.01s system
  41% cpu
0.039 total
```

```bash
$ time curl -o response.json http://localhost:8003/loop

0.00s user
0.01s system
   0% cpu
2.554 total
```

```bash
$ time curl -o response.json http://localhost:8003/benchmark

0.00s user
0.01s system
   6% cpu
0.136 total
```

### TypeScript + Deno

```bash
$ time curl -o response.json http://localhost:8004/

0.00s user
0.01s system
  10% cpu
0.151 total
```

```bash
$ time curl -o response.json http://localhost:8004/loop

0.00s user
0.01s system
   0% cpu
3.844 total
```

```bash
$ time curl -o response.json http://localhost:8004/benchmark

0.00s user
0.01s system
   1% cpu
1.150 total
```

### GO

```bash
$ time curl -o response.json http://localhost:8005/

0.00s user
0.02s system
  52% cpu
0.054 total
```

## Stress tests

My system is an Apple MacBook Pro 13-inch M1 (2020) with 16GB

To perform the stress tests, I have used the [wrk](https://github.com/wg/wrk) tool, and set
the threads, requests and time limit described in this Gist: https://gist.github.com/sahilsk/370f895f50407e9fe4dc

### JavaScript + Node.js

```bash
$ wrk -t12 -c400 -d30s http://localhost:8001/

Running 30s test @ http://localhost:8001/
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    10.95ms    3.79ms  63.97ms   84.43%
    Req/Sec     1.83k   828.67     3.82k    63.53%
  655012 requests in 30.04s, 118.69MB read
  Socket errors: connect 157, read 130, write 0, timeout 0
Requests/sec:  21808.13
Transfer/sec:      3.95MB
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8001/loop

Running 30s test @ http://localhost:8001/loop
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.35s   476.21ms   1.95s    72.73%
    Req/Sec     0.51      0.97     3.00     85.71%
  91 requests in 30.08s, 20.08KB read
  Socket errors: connect 157, read 105, write 0, timeout 80
Requests/sec:      3.03
Transfer/sec:     683.68B
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8001/benchmark

Running 30s test @ http://localhost:8001/benchmark
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   777.90ms  381.57ms   1.76s    72.00%
    Req/Sec     3.22      3.66    20.00     81.00%
  326 requests in 30.07s, 124.16KB read
  Socket errors: connect 157, read 319, write 0, timeout 301
Requests/sec:     10.84
Transfer/sec:      4.13KB
```

### Python

```bash
$ wrk -t12 -c400 -d30s http://localhost:8002/

Running 30s test @ http://localhost:8002/
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   106.63ms  336.55ms   1.89s    91.24%
    Req/Sec    25.99     58.34   415.00     91.69%
  2477 requests in 30.08s, 391.87KB read
  Socket errors: connect 157, read 2659, write 0, timeout 113
Requests/sec:     82.35
Transfer/sec:     13.03KB
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8002/loop

Running 30s test @ http://localhost:8002/loop
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.00us    0.00us   0.00us     nan%
    Req/Sec     0.00      0.00     0.00    100.00%
  2 requests in 30.08s, 424.00B read
  Socket errors: connect 157, read 106, write 0, timeout 2
Requests/sec:      0.07
Transfer/sec:      14.10B
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8002/benchmark

Running 30s test @ http://localhost:8002/benchmark
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.38s   196.34ms   1.55s    93.43%
    Req/Sec     2.46      1.77     5.00     70.00%
  140 requests in 30.08s, 49.16KB read
  Socket errors: connect 157, read 246, write 0, timeout 3
Requests/sec:      4.65
Transfer/sec:      1.63KB
```

### PHP

```bash
$ wrk -t12 -c400 -d30s http://localhost:8003/

Running 30s test @ http://localhost:8003/
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    79.96ms   60.92ms 215.55ms   43.78%
    Req/Sec    85.39     89.66   686.00     83.84%
  4788 requests in 30.06s, 869.70KB read
  Socket errors: connect 157, read 4904, write 0, timeout 0
Requests/sec:    159.27
Transfer/sec:     28.93KB
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8003/loop

Running 30s test @ http://localhost:8003/loop
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.00us    0.00us   0.00us     nan%
    Req/Sec     0.00      0.00     0.00    100.00%
  11 requests in 30.08s, 2.55KB read
  Socket errors: connect 157, read 108, write 0, timeout 11
Requests/sec:      0.37
Transfer/sec:      86.83B
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8003/benchmark

Running 30s test @ http://localhost:8003/benchmark
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.06s   569.91ms   1.98s    60.00%
    Req/Sec     2.78      3.06    10.00     86.20%
  298 requests in 30.07s, 168.47KB read
  Socket errors: connect 157, read 401, write 0, timeout 278
Requests/sec:      9.91
Transfer/sec:      5.60KB
```

### TypeScript + Deno

```bash
$ wrk -t12 -c400 -d30s http://localhost:8004/

Running 30s test @ http://localhost:8004/
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    29.89ms   66.07ms   1.14s    98.93%
    Req/Sec   821.26    326.40     1.72k    67.63%
  293889 requests in 30.08s, 45.97MB read
  Socket errors: connect 157, read 102, write 0, timeout 0
Requests/sec:   9770.41
Transfer/sec:      1.53MB
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8004/loop

Running 30s test @ http://localhost:8004/loop
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.00us    0.00us   0.00us     nan%
    Req/Sec     0.00      0.00     0.00    100.00%
  10 requests in 30.07s, 1.98KB read
  Socket errors: connect 157, read 101, write 0, timeout 10
Requests/sec:      0.33
Transfer/sec:      67.51B
```

```bash
$ wrk -t12 -c400 -d30s http://localhost:8004/benchmark

Running 30s test @ http://localhost:8004/benchmark
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.00us    0.00us   0.00us     nan%
    Req/Sec     0.00      0.00     0.00       nan%
  0 requests in 30.08s, 0.00B read
  Socket errors: connect 157, read 102, write 0, timeout 0
Requests/sec:      0.00
Transfer/sec:       0.00B
```

### GO

```bash
$ wrk -t12 -c400 -d30s http://localhost:8005/

Running 30s test @ http://localhost:8005/
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.94ms    3.22ms  58.38ms   84.02%
    Req/Sec     3.38k     1.55k    7.17k    62.58%
  1213271 requests in 30.06s, 165.46MB read
  Socket errors: connect 157, read 100, write 0, timeout 0
Requests/sec:  40361.98
Transfer/sec:      5.50MB
```

## HTTP Response

### JavaScript + Node.js

```
curl -X GET http://localhost:8001/ | jq
```
```json
{
  "server": "nodejs",
  "hello": "world"
}
```

```
curl -X GET http://localhost:8001/loop | jq
```
```json
{
  "server": "nodejs",
  "hello": "world",
  "loop": 1000000000,
  "elapsedTime": 519
}
```

```
curl -X GET http://localhost:8001/benchmark | jq
```
```json
{
  "benchmark": {
    "math": "0.120",
    "string": "127.343",
    "loops": "0.947",
    "ifelse": "0.942",
    "total": "129.502"
  },
  "sysinfo": {
    "time": "2023-05-18T02:28:45.941Z",
    "node_version": "v14.21.3",
    "platform": "linux",
    "server_name": "0526e609d693"
  },
  "version": "1.0"
}
```

### Python

```
curl -X GET http://localhost:8002/ | jq
```
```json
{
  "server": "python",
  "hello": "world"
}
```

```
curl -X GET http://localhost:8002/loop | jq
```
```json
{
  "server": "python",
  "hello": "world",
  "loop": 1000000000,
  "elapsedTime": 11263.392
}
```

```
curl -X GET http://localhost:8002/benchmark | jq
```
```json
{
  "sysinfo": {
    "time": "2023-05-18 02:30:02",
    "python_version": "3.9.16",
    "platform": "Linux",
    "server_name": "6c373c16c7d8"
  },
  "benchmark": {
    "math": 0.094,
    "string": 0.087,
    "loops": 0.037,
    "ifelse": 0.034,
    "total": 0.252
  },
  "version": 1.0
}
```

### PHP

```
curl -X GET http://localhost:8003/ | jq
```
```json
{
  "server": "php",
  "hello": "world"
}
```

```
curl -X GET http://localhost:8003/loop | jq
```
```json
{
  "server": "php",
  "hello": "world",
  "loop": 1000000000,
  "elapsed_time": 2525.6400108337402
}
```

```
curl -X GET http://localhost:8003/benchmark | jq
```
```json
{
  "version": "1.6",
  "sysinfo": {
    "time": "2023-05-18 02:31:01",
    "php_version": "8.2.6",
    "platform": "Linux",
    "server_name": "0.0.0.0",
    "server_addr": null,
    "xdebug": false
  },
  "benchmark": {
    "math": "0.050 sec.",
    "string": "0.065 sec.",
    "loops": "0.005 sec.",
    "ifelse": "0.009 sec.",
    "calculation": "0.129 sec.",
    "total": "0.129 sec."
  }
}
```

### TypeScript + Deno

```
curl -X GET http://localhost:8004/ | jq
```
```json
{
  "server": "deno",
  "hello": "world"
}
```

```
curl -X GET http://localhost:8004/loop | jq
```
```json
{
  "server": "deno",
  "hello": "world",
  "loop": 1000000000,
  "elapsedTime": 3744
}
```

```
curl -X GET http://localhost:8004/benchmark | jq
```
```json
{
  "benchmark": {
    "math": "146.000",
    "string": "1034.000",
    "loops": "16.000",
    "ifelse": "12.000",
    "total": "1210.000"
  },
  "sysinfo": {
    "time": "2023-05-18T12:47:03.798Z",
    "node_version": "1.33.3",
    "platform": "linux",
    "server_name": "956e8a6110d1"
  },
  "version": "1.0"
}
```
