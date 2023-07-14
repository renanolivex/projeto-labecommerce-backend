import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from "./database/knex"
import { getAllProducts } from "./endPoints/Products/getAllProducts"
import { getAllUsers } from "./endPoints/Users/getAllUsers"
import { addNewUser } from "./endPoints/Users/addNewUser"
import { delUserById } from "./endPoints/Users/delUserById"
import { delProductById } from "./endPoints/Products/delProductById"
import { editProduct } from "./endPoints/Products/editProduct"
import { addNewPurchases } from "./endPoints/Purchases/addNewPurchases"
import { delPurchases } from "./endPoints/Purchases/delPurchases"
import { getAllPurchases } from "./endPoints/Purchases/getAllPurchases"
import { addNewProduct } from './endPoints/Products/addNewProduct'


console.log("Aplicativo foi iniciado")

const app = express();

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})




//Buscar Usuários--------------------------------------------------------------------------------------------------------------------------
app.get("/users", getAllUsers)

//Buscar Produtos--------------------------------------------------------------------------------------------------------------------------
app.get("/products", getAllProducts)

//Criar novo Usuário-----------------------------------------------------------------------------------------------------------------------
app.post("/users", addNewUser)

//Criar novo Produto-----------------------------------------------------------------------------------------------------------------------
app.post("/products", addNewProduct)

//Deletar Usuário por ID--------------------------------------------------------------------------------------------------------------------
app.delete("/users/:id", delUserById)

//Deletar Produto por ID--------------------------------------------------------------------------------------------------------------------
app.delete("/products/:id", delProductById)

//Editar Produto --------------------------------------------------------------------------------------------------------------------------
app.put("/products/:id", editProduct)

//Criar nova compra -----------------------------------------------------------------------------------------------------------------------
app.post("/purchases", addNewPurchases)

//Deletar compras -------------------------------------------------------------------------------------------------------------------------
app.delete("/purchases/:id", delPurchases)

//Buscar compras -----------------------------------------------------------------------------------------------------------------------
app.get("/purchases/:id", getAllPurchases)

