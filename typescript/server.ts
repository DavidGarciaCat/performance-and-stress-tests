import { serve } from "https://deno.land/std@0.110.0/http/server.ts";
import Benchmark from "./benchmark.ts";

// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 8004 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8004/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    console.log(new Date(), requestEvent.request.url)
    // The native HTTP server uses the web standard `Request` and `Response`
    // objects.
    if ("http://localhost:8004/" === requestEvent.request.url) {
      const body = {server: "deno", hello: "world"};
      const response = new Response(JSON.stringify(body), {status: 200});
      response.headers.set("content-type", "application/json");
      requestEvent.respondWith(response);
    } else if ("http://localhost:8004/loop" === requestEvent.request.url) {
      const startTime = new Date();
      let i = 0;
      while (i < 1000000000) {
        i++;
      }
      const endTime = new Date();
      const elapsedTime = endTime - startTime;
      const body = {
        server: "deno",
        hello: "world",
        loop: 1000000000,
        elapsedTime: elapsedTime,
      };
      const response = new Response(JSON.stringify(body), {status: 200});
      response.headers.set("content-type", "application/json");
      requestEvent.respondWith(response);
    } else if ("http://localhost:8004/benchmark" === requestEvent.request.url) {
      const body = new Benchmark().test_benchmark(true);
      const response = new Response(JSON.stringify(body), {status: 200});
      response.headers.set("content-type", "application/json");
      requestEvent.respondWith(response);
    } else {
      const body = { status: 404, error: "not found", server: "deno" };
      const response = new Response(JSON.stringify(body), {status: 404});
      response.headers.set("content-type", "application/json");
      requestEvent.respondWith(response);
    }
  }
}
