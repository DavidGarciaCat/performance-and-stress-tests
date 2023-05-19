FROM python:3.9-alpine

WORKDIR /app

COPY benchmark.py .
COPY server.py .

EXPOSE 8002

CMD ["python", "server.py"]
