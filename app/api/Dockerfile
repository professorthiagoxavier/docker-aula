FROM node:alpine

#pasta padrão
WORKDIR /usr/app 

#copiar todos os arquivos que começam com package para dentro da pasta /usr/app
COPY package*.json ./  
RUN npm install 

COPY ..

#Qual a porta precisa ser exposta
EXPOSE 3000

CMD ["npm", "start"]