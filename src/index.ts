import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from "./database/knex"
import { getAllProducts } from "./endPoints/getAllProducts"
import { getAllUsers } from "./endPoints/getAllUsers"
import { addNewUser } from "./endPoints/addNewUser"
import { addNewProduct } from "./endPoints/addNewProduct"
import { delUserById } from "./endPoints/delUserById"
import { delProductById } from "./endPoints/delProductById"
import { editProduct } from "./endPoints/editProduct"
import { addNewPurchases } from "./endPoints/addNewPurchases"
import { delPurchases } from "./endPoints/delPurchases"
import { getAllPurchases } from "./endPoints/getAllPurchases"


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

//Buscar compras -----------------------------------------------------------------------------------------------------------------------
app.get("/allpurchases", async (req: Request, res: Response) => {


    try {

        const result = await db("purchases")
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/allpurchases2", async (req: Request, res: Response) => {


    try {

        const result = await db("purchases_products")
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error)
    }
})
