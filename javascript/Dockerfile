FROM node:14-alpine

WORKDIR /app

COPY benchmark.js .
COPY cluster.js .
COPY server.js .

EXPOSE 8001

CMD ["node", "cluster.js"]
