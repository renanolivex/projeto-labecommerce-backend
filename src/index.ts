import {  createProduct, createUser, getAllProducts, getAllUsers,   products, searchProductsByName, users } from "./database"
import express, {Request, Response} from 'express'
import cors from 'cors'
import { TProducts, TUsers } from "./types"


console.log("Aplicativo foi iniciado") 
/* 
console.log(users)
console.log(products)
 */
console.log(searchProductsByName(products, "Mouse gamer"))

 
 createUser("u003","Luis", "luisra@hotmail.com", "ooowdu" ) 



 createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.kabum.com.br/produtos/fotos/391851/ssd-husky-gaming-512gb-sata-iii-leitura-520mb-s-e-gravacao-450mb-s-preto-hgml022_1672251263_gg.jpg")


console.log(getAllUsers()) 
console.log(getAllProducts())


const app = express();

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})
//Pegar usuarios
app.get("/users",(req:Request, res:Response)=>{
    res.status(200).send(users)
})

app.get("/products",(req:Request, res:Response)=>{
    
    const name=req.query.name as string
    let response
    if(name){

        response = searchProductsByName(products, name)
   }else {response = products}
   res.status(200).send(response)
})

app.post("/users", (req:Request, res:Response)=>{
    const {id, name, email, password, createdAt}= req.body
    
    const newUser:TUsers = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt
        
    }

    users.push(newUser);
    res.status(201).send("Usuario registrado com sucesso")
})

app.post("/products", (req:Request, res:Response)=>{
    const {id, name, price, description, imageUrl}= req.body
    
    const newProduct:TProducts = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,              
    }

    products.push(newProduct);
    res.status(201).send("Produto registrado com sucesso")
})

//APAGAR USUÁRIO
app.delete("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const findIndex=users.findIndex((user)=>{
        return user.id === id
    })
    if(findIndex >=0){
    users.splice(findIndex, 1)
    res.status(200).send("Usuário apagado com sucesso")
} else{res.status(200).send("Usuário não encontrado")}
})

//APAGAR PRODUTO
app.delete("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const findIndex=products.findIndex((product)=>{
        return product.id === id
    })
    if(findIndex >=0){
    products.splice(findIndex, 1)
    res.status(200).send("Produto apagado com sucesso")
} else{res.status(200).send("Produto não encontrado")}
})

//EDIT PRODUTO
app.put("/products/:id", (req: Request, res:Response)=>{
    const id=req.params.id
    const {id:newId,price,description,imageUrl} =req.body
    const findProducts = products.find((product)=>{
        return product.id===id
      })
   
    if(findProducts){
    
        findProducts.id=newId || findProducts.id,
        findProducts.price = price || findProducts.price,
        findProducts.description = description||findProducts.description,
        findProducts.imageUrl = imageUrl||findProducts.imageUrl
        
        res.status(200).send("Produto alterado com sucesso!")
    }else{
        res.status(200).send("Produto não encontrado")
    }
})
