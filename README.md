# Introdução ao Docker 

Em resumo, imagem é template que pode ser utilizado. 

Container é o processo de criar e executar containers a partir de imagens Docker. 


## Iniciar o node 

```
 npm init -y
```



### Criar o index.js
- Instalar o express, mysql2 e nodemon

```
npm install express mysql2 nodemon
```


## Código index.js

```
const express = require('express')
const mysql2 = require('mysql2');

const PORT = 3000;
const HOST = '0.0.0.0' //Uma forma do docker entender que ele só precisa repassar a porta 3000

const connection = mysql2.createConnection({
    //host: 'database-mysql',
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'fiap',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

const app = express()


app.get('/', (req, res) => {
    const query = 'SELECT * FROM products';

    connection.query(query, (err, results, fields) => {
      if (err) {
        console.error('Error executing SELECT query:', err);
        return;
      }
    
      //console.log('Query results:');
      res.send(results.map(item => ({ name: item.name, price: item.price })));
 
    });
})


app.listen(PORT, HOST)
```

## Criar o dockerignore e o gitignore

Vamos criar tanto o .gitignore quanto o dockignore para bloquearmos o envio da pasta nodemodule

- Conteudo:
```
node_modules
```


### Criar a imagem docker


## Criar o dockerfile 
Dockerfile 
```
# Usar uma imagem existente do node
FROM node:alpine

# Configurar o caminho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos
COPY package*.json ./

# Executar npm install 
RUN npm install

# Copiar o resto da aplicação
COPY . .

# Expor a porta 
EXPOSE 3000

CMD ["npm", "start"]
```

## Criar a imagem 

Vamos criar a imagem a partir do dockerfile. Precisamos executar o local do dockerfile

```
docker build -t app-node .
```

**docker build:** utilizado para executar o build do dockerfile
**-t:**: nome da imagem
**. (ponto)**: indica que exite um arquivo dockerfile

## Criar o container node 

Vamos criar um container baseado na imagem que acabamos de criar.

```
docker run -p 4000:4000 -d app-node
```
**docker run** vamos criar um container
**-p** vamos indicar um mapeamento de porta
**4000:4000** irá expor a porta interna. No exemplo a porta 4000 interna será exposta pela porta 4000 externa. 

##Criar um container mysql 
- Acessar o docker hub: https://hub.docker.com/_/mysql

Para este exemplo é importante deixarmos claro que iremos utilizar uma imagem existente. 


```
docker run --name database-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql
```
**docker run:** já ira executar a o container, caso a imagem não exista, fará o download
**name** indica o nome do container
**e** utlizado para configurar o ambiente
**MYSQL_ROOT_PASSWORD=123** utilizado para definir a senha da base 
**mysql**: a imagem padrão do mysql. Neste caso fará o pull do dockerhub. 



## Criar uma arquivo sql 


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

## Acessar o container e executar um bash

Vamos acessar o container para executar o script. 

```
docker exec -it database-mysql /bin/bash
````

**it:** acessar de forma interativa
**database-mysql:** nome do container 
**/bin/bash:** indica que acessaremos via bash 


## Após acessar vamos logar no mysql 

```
mysql -uroot -p123 
```

## Vamos agora acessar a database 

```
use fiap
```

Só lembrando que fiap foi a database criada no script, confirme o nome da sua. 

```
select * from products; 
```

Por último vamos fazer o select na tabela para confirmar a inserção dos dados

Para sair do container podemos utilizar exit. 

### Criar volumes

É possível compartilhar uma pasta do seu host com o container 

Antes, vamos parar nosso container 

```
docker stop database-mysql
```

**stop** é o comando para parar
**database-mysql** o nome do container 


## No linu

```
docker run --name database-mysql -v $(pwd)/db/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql
```

## No windows
```

docker run --name database-mysql -v db/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql

```

**db/data**: o nome do volume 
**tag v**: indica o volume
**rm**: remover o container caso exista
**name**: parametro para criar um nome do Container
**mysql-container**: o nome do container


### Criar um link para Container

Para podermos conectar o container node ao container do mysql iremos expor um link entre eles. 


Para isso vamos parar o container: 
```
docker ps

docker stop nome_container_ou_id
```

# Executar o container 

Vamos executar o container do node com a criação do link 

```
docker run -p 4000:4000 -d --rm --name node-container --link database-mysql app-node
````

**link** indica um link entra o container
**database-mysql** nome do container mysql 
**app-node** nome da imagem node criada

### Alterar a conexão

Antes de subir é importante alterar o index e incluir o nome do link na conexão. 

- Parar o container node novamente

```
docker ps

docker stop nome_container
```

- Alterar a conexão da base:

```
const connection = mysql2.createConnection({
    //host: 'database-mysql',
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'fiap',
  });
```

# Build da imagem node novamente 


```
docker build -t app-node .
```

Executar o container 

```
docker run -p 4000:4000 -d --rm --name node-container --link database-mysql app-node
````





### Referências: 

- https://www.youtube.com/watch?v=AVNADGzXrrQ
- https://hub.docker.com/
































