import { Request, Response } from 'express'
import { db } from "../database/knex"


export const getAllPurchases = async (req: Request, res: Response) => {

    const id = req.params.id
    try {          
        if (id !== undefined) {
            
           
                 const result = 
            await db("purchases").select("purchases.id AS purchaseId", "users.id AS buyerId", "users.name AS buyerName", "users.email AS buyerEmail", "purchases.total_price AS totalPrice", "purchases.created_at AS createdAt")
            .innerJoin("users","purchases.buyer","=","users.id" ).where("purchases.id", "LIKE", `%${id}%`)
            
            res.status(200).send(result)          

        } 
    
    

    } catch (error) {
        res.status(400).send(error)
    }
}