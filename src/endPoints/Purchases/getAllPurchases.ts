import { Request, Response } from 'express'
import { db } from "../../database/knex"
import { TFinalPurchase } from '../../types'





export const getAllPurchases = async (req: Request, res: Response) => {

    const id = req.params.id
    try {          
        if (id !== undefined) {
            
           
            const [result] = 
            await db("purchases").select("purchases.id AS purchaseId",
            "users.id AS buyerId", "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt")
            .innerJoin("users","purchases.buyer","=","users.id" )
            .where("purchases.id", "=", id)

            const result2 = 
            await db("purchases_products").select("product.id AS id",
             "product.name AS name", 
             "product.price AS price", 
             "product.description AS description", 
             "product.image_url AS imageUrl", 
             "purchases_products.quantity AS quantity")
            .innerJoin("products as product","purchases_products.product_id","product.id")
            .where("purchases_products.purchase_id", "=", id )


            
            const finalResult:TFinalPurchase={
                ...result ,
                products:result2,
            }
            if(result.length === 0){
                res.status(422)
                throw new Error("Compra não encontrada")
            }
            
            res.status(200).send(finalResult)          

        } 
    
    

    } catch (error) {
        res.status(400).send(error)
    }
}