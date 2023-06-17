# versao do node instalada
FROM node:14
# endereco do projeto dentro do container do docker
WORKDIR /usr/src/app
# copia todos os arquivos package
COPY package*.json ./
# instalar o conteudo do package.json
RUN npm install
# copiar os arquivos e levar para o docker
COPY . .
# PORTA Q SERÁ EXPOSTA
EXPOSE 3000
# COMANDOS Q SERAO EXECUTADOS equivaltente ao $node server.js
CMD ["node","main.js"]

