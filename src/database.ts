import { TProducts, TUsers } from "./types";

export const users: TUsers[] = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Fulano2",
        email: "fulano2@email.com",
        password: "fulano1232",
        createdAt: new Date().toISOString()
    }
]

export const products: TProducts[] = [
    {

        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {

        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]




export function createUser (id:string, name:string, email:string, password:string ){
    const newUser = {
    id:id,
    name:name,    
    email:email,
    password:password,
    createdAt: new Date().toISOString()
    }
    users.push(newUser)
    return console.log("Cadastro de usuario realizado!")
    
}
 



export function createProduct (id:string, name:string, price: number, description:string, imageUrl:string){

    const newProduct = {
        id:id,
        name:name,    
        price:price,
        description:description,
        imageUrl: imageUrl,
        }
        products.push(newProduct)
        return console.log("Cadastro de produto realizado!")



}
export function getAllUsers (){
    return console.table(users)

}

export function getAllProducts (){
    return console.table(products)

}
 
 
 

//Exercicio 3
export function searchProductsByName(products:TProducts[], name:string):TProducts[] {
    return products.filter(
      (product) => {
        return product.name.toLowerCase().includes(name.toLowerCase())
        
      }
    )
  }


