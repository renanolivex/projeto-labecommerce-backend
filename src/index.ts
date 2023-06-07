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

