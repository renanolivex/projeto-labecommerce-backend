import {  createProduct, createUser, getAllProducts, getAllUsers,   products, searchProductsByName, users } from "./database"
import express, {Request, Response} from 'express'
import cors from 'cors'
import { TProducts, TUsers } from "./types"
import { type } from "os"


console.log("Aplicativo foi iniciado") 
/* 
console.log(users)
console.log(products)
 */
console.log(searchProductsByName(products, "Mouse gamer"))

 
 createUser("u003","Luis", "luisra@hotmail.com", "ooowdu" ) 



 createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.kabum.com.br/produtos/fotos/391851/ssd-husky-gaming-512gb-sata-iii-leitura-520mb-s-e-gravacao-450mb-s-preto-hgml022_1672251263_gg.jpg")


/* console.log(getAllUsers()) 
console.log(getAllProducts()) */


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
    
    try {
        res.status(200).send(users)
        
    } catch (error) {
        res.status(400).send(error)
    }
})
//Pegar todos os produtos
app.get("/products",(req:Request, res:Response)=>{
    
    const name=req.query.name as string

    try {
        let response

            if(name!==undefined){
            if(typeof (name)!=="string"){

                res.status(422) 
                throw new Error("A pesquisa do produto deve conter somente letras")
            } 
    
            if(name.length<=0){
                res.status(404) 
                throw new Error("O nome do produto buscado deve conter pelo menos 1 caracter")
            }
    
            response = searchProductsByName(products, name)
            if (response.length === 0){
                res.status(404) 
                throw new Error("Não foi encontrado nenhum produto")

            }
       }else {response = products}
       res.status(200).send(response)
        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }
  
})

//Criar novo Usuario
app.post("/users", (req:Request, res:Response)=>{
    const {id, name, email, password, createdAt}= req.body
    
    try {
        //Validação ID
        if(id!==undefined){
        if(typeof(id)!=="string"){
            
            res.status(422) 
            throw new Error("O ID deve ser uma string")

        }}

        //Validação name

        if(name!==undefined){
        if(typeof(name)!=="string"){
            
            res.status(422) 
            throw new Error("O nome deve ser uma string")

        }

        if(name.length<=1){
            res.status(400) 
            throw new Error("O nome deve conter pelo menos 2 caracteres")

        }
      }

      //Validação email

      if(email!==undefined){
      if(typeof(email)!=="string"){
            
        res.status(422) 
        throw new Error("O email deve ser uma string")

    }}

     //Validação de senha

     if(password!==undefined){
        if(typeof(password)!=="string"){
              
          res.status(422) 
          throw new Error("O email deve ser uma string")
  
      }if(password.length<4){
        res.status(400)
        throw new Error("A senha deve conter pelo menos 4 caracteres")
      }
    
    }
 
    //Validação CreatedAt

    if(createdAt!==undefined){
        if(typeof(createdAt)!=="string"){
              
          res.status(422) 
          throw new Error("O createdAt deve ser uma string")
  
      }}

       //Validação se email e ID existem
      const findId = users.find((user)=>user.id===id)

      if(findId){
        res.status(400)
        throw new Error("O Id já existe! Escolha outra Id")
      }

      
      const findEmail = users.find((user)=>user.email===email)

      if(findEmail){
        res.status(400)
        throw new Error("O Email já existe! Escolha outro Email")
      }

       
        const newUser:TUsers = {
            id: id,
            name: name,
            email: email,
            password: password,
            createdAt: createdAt
            
        }
    
        users.push(newUser);
        res.status(201).send("Usuario registrado com sucesso")
        
    } catch (error) {
           if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }
   
})

app.post("/products", (req:Request, res:Response)=>{
    const {id, name, price, description, imageUrl}= req.body
    
    try {


        //Validação ID
        if(id!==undefined){
            if(typeof(id)!=="string"){
                res.status(422) 
                throw new Error("O ID deve ser uma string")
            }}
    
        //Validação name
        if(name!==undefined){
            if(typeof(name)!=="string"){
                
                res.status(422) 
                throw new Error("O ID deve ser uma string")
    
            }}


        //Validação Price
        if(price!==undefined){
            if(typeof(price)!=="number"){
                
                res.status(422) 
                throw new Error("O Preço deve ser um número")
            }}
    
        
        //Validação Description
        if(description!==undefined){
            if(typeof(description)!=="string"){
                
                res.status(422) 
                throw new Error("A descrição deve ser uma string")
    
            }}

        //Validação URL
        if(imageUrl!==undefined){
            if(typeof(imageUrl)!=="string"){
                
                res.status(422) 
                throw new Error("A url deve ser uma string")
    
            }}


        //Validação Id Existente
        const findIdProduct = products.find((product)=> product.id === id )

        if(findIdProduct){
            res.status(400)
            throw new Error("O Id cadastrado já existe")

        }
    
        const newProduct:TProducts = {
            id: id,
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,              
        }
    
        products.push(newProduct);
        res.status(201).send("Produto registrado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
        
    }

    
})

//APAGAR USUÁRIO
app.delete("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    try {

        
        const findIndex=users.findIndex((user)=>{
            return user.id === id
        })
        if(findIndex >=0){
        users.splice(findIndex, 1)
        res.status(200).send("Usuário apagado com sucesso")
    } else{res.status(200)
    throw new Error("Usuário não encontrado")
    
}
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    } 
   
})

//APAGAR PRODUTO
app.delete("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    try {
        const findIndex=products.findIndex((product)=>{
            return product.id === id
        })
        if(findIndex >=0){
        products.splice(findIndex, 1)
        res.status(200).send("Produto apagado com sucesso")
    } else{res.status(200)
    throw new Error("Produto não encontrado")}
        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }
    
})

//EDIT PRODUTO
app.put("/products/:id", (req: Request, res:Response)=>{
    const id=req.params.id

    const {id:newId,price,description,imageUrl} =req.body

    try {

       //Validação ID
       if(newId!==undefined){
        if(typeof(newId)!=="string"){
            res.status(422) 
            throw new Error("O ID deve ser uma string")
        }}

         //Validação Price
       if(price!==undefined){
        if(typeof(price)!=="number"){
            res.status(422) 
            throw new Error("O preço deve ser um number")
        }}

        //Validação description
       if(description!==undefined){
        if(typeof(description)!=="string"){
            res.status(422) 
            throw new Error("A descrição deve ser uma string")
        }}

         //Validação Url
       if(imageUrl!==undefined){
        if(typeof(imageUrl)!=="string"){
            res.status(422) 
            throw new Error("A URL deve ser uma string")
        }}
        

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
        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }
  
})
