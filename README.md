# Recipes Challenge Api

## Ambiente local

### Requisitos
  [Node.js](https://nodejs.org/pt-br/download/)
### Executando
Na pasta raiz do projeto:

 1) Instale as dependências do projeto:
```sh
npm i
```
2) Configure seu arquivo `.env` seguindo o que está descrito em `.env.example`:
```sh
RECIPES_URL=http://www.recipepuppy.com/api
GIPHY_URL=https://api.giphy.com/v1/gifs/search
GIPHY_KEY=KhxoZU9s9eH33FuElzp0nSIDwUwDwuQA
PORT=3000
```
3) Finalmente, rode a aplicação:
```sh
npm start
```

## Utilizando Docker

### Requisitos
[Docker](https://docs.docker.com/get-docker/)

### Executando
 1) Execute o comando na pasta raiz do projeto:
```sh
docker build -t nome_desejado_para_imagem .
```
2) Rode sua imagem docker utilizando`:
```sh
docker run -p 3000:3000 -d nome_desejado_para_imagem
```


A aplicação estará disponível em ```localhost:3000```, se executada localmente, estará disponível em  ```localhost:PORT```, de acordo com o valor de ```PORT``` definido no `.env`, exemplo:
```
http://localhost:3000/api/recipes?i={ingredient1},{ingredient2}
```
### Testes

```sh
#Para executar teste de integração
npm run test:e2e

#Para executar testes unitários
npm run test
```

