FROM php:8.2

WORKDIR /var/www/html

COPY benchmark.php .
COPY server.php .

EXPOSE 8003

CMD ["php", "-S", "0.0.0.0:8003", "server.php"]
