FROM php:7.4-apache

# configurar a pasta
WORKDIR /var/www/html

# Dependências
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mysqli gd zip mbstring xml


RUN apt-get install -y zip unzip

# Copiar os arquivos 
COPY . /var/www/html

# Alterar o proprietários dos arquivos
RUN chown -R www-data:www-data /var/www/html


# Expor a porta
EXPOSE 80

# Configurar o apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Iniciar o server
CMD ["apache2-foreground"]
