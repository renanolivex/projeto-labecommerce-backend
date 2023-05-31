import {  createProduct, createUser, getAllProducts, getAllUsers,   products, searchProductsByName, users } from "./database"

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