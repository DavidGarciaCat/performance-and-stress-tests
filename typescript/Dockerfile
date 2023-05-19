FROM denoland/deno:latest

WORKDIR /app

COPY benchmark.ts .
COPY server.ts .

EXPOSE 8004

CMD ["deno", "run", "--allow-env", "--allow-net", "server.ts"]
