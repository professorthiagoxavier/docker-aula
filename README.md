# Introdução ao Docker 

Uma imagem é um template

Você pode usar 


### Trabalhando com docker

Em resumo, imagem é template que pode ser utilizado. 

Container é o processo de criar e executar containers a partir de imagens Docker. 


##Iniciar o node 

> npm init -y



***Criar o dockerfile 
Dockerfile 



****Criar o index.js
- Instalar o express 
> npm install express



*** Criar o dockeignore 



***criar a imagem

```
docker build -t app-node .
```

```
# Use an official Node.js runtime as a base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose the port your application will run on (replace 3000 with your app's port if necessary)
EXPOSE 3000

CMD ["npm", "start"]
```

##Rodar container node 

```
docker run -p 4000:4000 -d app-node
```


##Criar um container mysql 
- Acessar o docker hub: https://hub.docker.com/_/mysql


```
docker run --name database-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql
```




**docker run:** já ira executar a o container, caso a imagem não exista, fará o download
**name:** indica que você dará um nome ao Container




****Conectar a api no node 






##Criar uma arquivo sql 


```
CREATE DATABASE IF NOT EXISTS fiap;
USE fiap;

CREATE TABLE IF NOT EXISTS products (
  id INT(11) AUTO_INCREMENT,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  PRIMARY KEY (id)
);

INSERT INTO products VALUE(0, 'Curso 1', 2500);
INSERT INTO products VALUE(0, 'Curso 2', 900);
```


##Executar comandos dentro de um Container



```
docker exec -i database-mysql mysql -uroot -p123 < db/script.sql
```


docker exec: indica que faremos uma execução dentro do container
tag i: permite que o processo abra de forma interativa. Sempre que precisamos rodar um processo interativo. 
database-mysql: é o nome do Container
tag p: password e 123 é a minha senha 'forte'. rsrsrsrs
db/script.sql é o caminho do script que será executado. 



##Acessar o container e executar um bash

```
docker exec -it database-mysql /bin/bash
````

it: acessar de forma interativa
database-mysql: nome do container 
/bin/bash: indica que acessaremos via bash 


Após acessar vamos logar no mysql 


```
mysql -uroot -p123 
```

Vamos agora acessar a database 


```
use fiap
```

Só lembrando que fiap foi a database criada no script, confirme o nome da sua. 

```
select * from products; 
```

Por último vamos fazer o select na tabela para confirmar a inserção dos dados

Para sair do container podemos utilizar exit. 



##Criar volumes

É possível compartilhar uma pasta do seu host com o container 


Antes, vamos parar nosso container 

```
docker stop database-mysql
```

**stop** é o comando para parar
**database-mysql** o nome do container 


**No linux**

```
docker run --name database-mysql -v $(pwd)/db/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql
```

**No windows
```

docker run --name database-mysql -v db/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql

```



**db/data**: o nome do volume 
**tag v**: indica o volume
**rm**: remover o container caso exista
**name**: parametro para criar um nome do Container
**mysql-container**: o nome do container





###Criar um link para Container

docker run -p 4000:4000 -d --rm --name node-container --link database-mysql app-node







###Referências: 

https://www.youtube.com/watch?v=AVNADGzXrrQ














docker exec -it 54d15030f602 bash




























