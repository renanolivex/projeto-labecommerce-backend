import { Request, Response } from 'express'
import { db } from "../database/knex"
import { users, products } from '../database'



export const addNewPurchases = async (req: Request, res: Response) => {
    const { id, buyer, total_price } = req.body
    const { product_id, quantity } = req.body


    try {
        //Validação ID
        if (id !== undefined) {
            if (typeof (id) !== "string") {
                res.status(422)
                throw new Error("O ID deve ser uma string")
            }
        }

        //Validação buyer
        if (buyer !== undefined) {
            if (typeof (buyer) !== "string") {

                res.status(422)
                throw new Error("O ID deve ser uma string")

            }

        }
        //Validação quantity
        if (total_price !== undefined) {
            if (typeof (total_price) !== "number") {

                res.status(422)
                throw new Error("O Preço deve ser um número")
            }
        }
        const newPurchase = {
            id: id,
            buyer: buyer,
            total_price: total_price
        }
        const newPurchase2 = {

            purchase_id: id,
            product_id: product_id,
            quantity: quantity
        }

        const products = [newPurchase2]
        await db("purchases").insert(newPurchase)
        await db("purchases_products").insert(products)

        res.status(201).send("Pedido realizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }

    }


}