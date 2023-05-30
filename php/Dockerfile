FROM php:8.2-apache

WORKDIR /var/www/html

COPY benchmark.php /var/www/html/benchmark.php
COPY server.php /var/www/html/index.php

RUN echo "FallbackResource /index.php" >> /etc/apache2/apache2.conf

EXPOSE 8003
