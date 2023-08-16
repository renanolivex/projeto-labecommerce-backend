# Labecommerce

Primeiro trabalho relacionado a Back-end. A proposta do projeto é criar endPoints que adicionem, editem, mostrem e deletem usuários, produtos e compras vinculada a um banco de dados.
O projeto foi um requisito do curso de desenvolvimento full-stack da Labenu e será avaliada.

# Documentação no Postman
https://documenter.getpostman.com/view/26594293/2s946fdCSa

# Súmario

- <a>PATHS</a>
- <a>EXEMPLOS</a>
- <a>COMO ACESSAR O PROJETO</a>
- <a>TECNOLOGIAS</a>
- <a>DESENVOLVEDOR</a>

# Paths 
Requisições de Usuários
- /users 

Requisições de Produtos
- /products

Requisições de Compras
- /purchases

# Exemplos
## USER - Get all users 
- Retorna todos os usuários cadastrados
``` bash
[
  {
    "id": "u001",
    "name": "Renan",
    "email": "renan_em@gmail.com",
    "password": "888552489",
    "createdAt": "2023-07-11 23:11:18"
  },
  {
    "id": "u002",
    "name": "Luís",
    "email": "lu-is@gmail.com",
    "password": "88855hjks",
    "createdAt": "2023-07-11 23:11:36"
  },
  {
    "id": "u003",
    "name": "Laura",
    "email": "laulau@gmail.com",
    "password": "dv22vv2r",
    "createdAt": "2023-07-11 23:11:54"
  }
]
```
## USER - Create user
- Cadastra novos usuários
`````` bash
curl --location --request DELETE 'http://localhost:3003/users/u003'
``````
- Resposta
``````bash
Cadastro realizado com sucesso
``````

## USER - Delete user by id
- Deleta o usuário escolhido por ID
``````
curl --location --request DELETE 'http://localhost:3003/users/u003'
``````

- Resposta
``````
Usuário apagado com sucesso!
``````
##

## PRODUCTS - Get all Products
- Retorna produtos cadastrados
``````
curl --location 'http://localhost:3003/products?name=Monitor'
``````
- Resposta
```bash
[
  {
    "id": "prod002",
    "name": "Monitor",
    "price": 900,
    "description": "Monitor LED Full HD 24 polegadas",
    "imageUrl": "https://picsum.photos/seed/Monitor/400"
  }
]
```
## PRODUCTS - Create products
- Cria um produto novo

````bash
{
        "id": "prod006",
        "name": "Echo 5º geração",
        "price":18.55,
        "description": "Funciona com alexa",
        "imageUrl": "http2.mlstatic.com/pen-drive-sandisk-8-gb-cruzer-blade-100-original-o-melhor-D_NQ_NP_18442-MLB20156048733_092014-F.jpg"
}
````

- Resposta
```bash
Produto cadastrado com sucesso
```

## PRODUCTS - Delete user by id
- Delete o produto escolhido por ID

``` bash
curl --location --request DELETE 'http://localhost:3003/products/prod007' \
--data ''
```

- Resposta
```
Produto apagado com sucesso!
```

## PRODUCTS - Edit product by id

- Edita o produto escolhido por ID
```bash
curl --location --request PUT 'http://localhost:3003/products/prod004' \
--data '{
      "id": "prod006",
        "name": "SoundBar",
        "price":200,
        "description": "Soundbar ",
        "imageUrl": "https://picsum.photos/seed/Sound%20gamer/"
}'
```
- Resposta 
```
Produto atualizado com sucesso
```
##
## PURCHASE - Get purchase by id
    
- Mostra a compra escolhida por ID
```bash
curl --location 'http://localhost:3003/purchases/pur002'
```
- Resposta
  
```bash
{
  "purchaseId": "pur002",
  "buyerId": "u001",
  "buyerName": "Renan",
  "buyerEmail": "renan_em@gmail.com",
  "totalPrice": 6000,
  "createdAt": "2023-07-14 00:22:40",
  "products": [
    {
      "id": "prod001",
      "name": "Mouse gamer",
      "price": 250,
      "description": "Melhor mouse do mercado!",
      "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
      "quantity": 2
    },
    {
      "id": "prod002",
      "name": "Monitor",
      "price": 900,
      "description": "Monitor LED Full HD 24 polegadas",
      "imageUrl": "https://picsum.photos/seed/Monitor/400",
      "quantity": 1
    },
    {
      "id": "prod003",
      "name": "SoundBar",
      "price": 1099.99,
      "description": "Auto Sound Engine (ASE), Bluetooth, 300W, Subwoofer Sem Fios",
      "imageUrl": "https://images.kabum.com.br/produtos/fotos/467121/soundbar-lg-sqc2-bluetooh-300w-subwoofer-sem-fios-2-1-canais-auto-sound-engine-ase-adaptive-sound-control-asc-sqc2-abrallk_1686938008_gg.jpg",
      "quantity": 3
    }
  ]
}
```

## PURCHASE - Create purchase
- Cria uma nova compra
```bash
curl --location 'http://localhost:3003/purchases' \
--data '{
    "id": "pur002",
    "buyer": "u001",
    "total_price":6000,
    "products": [
        {
            "id": "prod001",
            "quantity": 2
        },
        {
            "id": "prod002",
            "quantity": 1
        }
        ,
        {
            "id": "prod003",
            "quantity": 3
        }
    ]
}'
```

- Resposta

```
Pedido realizado com sucesso
```

## PURCHASE - Delete purchase by id

- Deleta uma compra por ID

```bash
curl --location --request DELETE 'http://localhost:3003/purchases/pur002'
```
- Resposta
```bash
Compra apagada com sucesso!
```

# Como acessar o projeto
<h3>Necessário:</h3>

<p>- VSCode </p>
<p>- Node.js</p>
<p>- SQLite</p>


<h3>Comandos no VSCode: </h3>
<p>- npm i</p>
<p>- npm run dev</p>

<h3>Passos</h3>
<p>1º Abra o VSCode e clone o repositório</p>
<p>2º Instale as dependências (npm i)</p>
<p>3º Instale e crie um servidor com o SQLite</p>
<p>4º Execute o codigo npm run dev para o servidor ficar online na porta 3003</p>
<p>5º Utilize programas como Postman para visualizar o servidor se quiser</p>


# Tecnologias 
Para a criação do projeto foram utilizadas as ferramentas:
- Node.js
- SQLite
- Express
- Knex
- Typescript

# Desenvolvedor

![Desenvolvedor](./src/assets/Desenvolvedor.jpg) 
<p>Renan N. de Oliveira



