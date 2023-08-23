import { Request, Response } from 'express'
import { db } from "../../database/knex"
import { TPurchase, TPurchaseProducts } from '../../types'




export const addNewPurchases = async (req: Request, res: Response) => {
    
    

    try {

        const { id, buyer, total_price, products } = req.body
        //Validação ID
        if (id !== undefined) {
            if (typeof (id) !== "string") {
                res.status(422)
                throw new Error("O ID deve ser uma string")
            }
            if (id.length<1){
                res.status(422)
                throw new Error("O ID deve conter pelos menos 1 caracter")
            }
            if(id[0]!=="p" || id[1]!=="u" || id[2]!=="r"){
                res.status(422)
                throw new Error("o ID deve conter 'pur' no início")
    
                }
            

        }

        //Validação buyer
        if (buyer !== undefined) {
            if (typeof (buyer) !== "string") {

                res.status(422)
                throw new Error("O ID deve estar no formato de texto")
            }
            if(total_price<= 0){
                res.status(422)
                throw new Error("O preço do produto deve ser maior que 0")
            }
        }
        //Validação quantity
        if (total_price !== undefined) {
            if (typeof (total_price) !== "number") {

                res.status(422)
                throw new Error("O Preço deve ser um número")
            }
        }

        //Validação Produto

        if(products !== undefined){
            if(products.length<=0){
                res.status(422)
                throw new Error("A compra deve conter pelo menos um produto!")
            }

            for(let product of products){
                if(product.id !== undefined){
                    if (typeof (product.id) !== "string") {
                        res.status(422)
                        throw new Error("O id do produto deve ser um texto")
                    }
                }

                if(product.quantity !==undefined){
                    if(typeof(product.quantity) !== "number"){
                        res.status(422)
                        throw new Error("A quantidade deve ser um número")
                    }
                    if(product.quantity <= 0){
                        res.status(422)
                        throw new Error("O produto escolhido não tem quantidade")
                    }

                }
            }

            let [result] = await db("users").where({id:buyer})
            if (!result){
                    res.status(422)
                    throw new Error("Usuário não encontrado")
            }

            [result] = await db("purchases").where({id:id})
            if (result){
                res.status(422)
                    throw new Error("ID de compra já cadastrada na lista de compras")
            }

            for(let product of products){
                const [result] = await db ("products").where({id:product.id})
                if(!result){
                    res.status(422)
                        throw new Error("Produto não encontrado")
                }
            }

        }

        const newPurchase:TPurchase={
            id:id,
            buyer:buyer,
            total_price:total_price,
            created_at: new Date().toISOString().slice(0,19).replace('T',' ')
        }
        await db("purchases").insert(newPurchase)

        
        for(let product of products) {
            const newProduct: TPurchaseProducts={
                product_id: product.id,
                purchase_id:id,
                quantity: product.quantity
            }
            await db("purchases_products").insert(newProduct)
        }


        res.status(201).send("Pedido realizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }

    }


}