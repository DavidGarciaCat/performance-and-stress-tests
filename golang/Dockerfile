FROM golang:latest

WORKDIR /app

COPY main.go .

RUN go build -o server main.go

EXPOSE 8005

CMD ["./server"]
