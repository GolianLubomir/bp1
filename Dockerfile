# Základný obraz - PHP s Apache
FROM php:8.1-apache

# Nainštalovanie závislostí
RUN apt-get update && apt-get upgrade -y && apt-get install -y wget \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip

# Nainštalovanie rozšírení
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Aktivovanie mod_rewrite pre Apache
RUN a2enmod rewrite headers

# Stiahnutie dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Nastavenie pracovného adresára v kontajneri
WORKDIR /var/www

# Odstránenie predvoleného virtuálneho hostiteľa Apache
RUN rm /etc/apache2/sites-available/000-default.conf

# Pridanie konfiguračného súboru Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Nainštalovanie Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Kopírovanie existujúceho aplikačného zdrojového kódu
COPY . /var/www

# Nastavenie prístupových práv pre koreňový adresár
RUN chown -R www-data:www-data /var/www

# Inštalácia závislostí pomocou Composer
RUN composer install

# Exponovanie portu 80
EXPOSE 80

# Spustenie Apache v popredí
CMD ["apache2-foreground"]
