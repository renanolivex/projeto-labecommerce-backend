import { Request, Response } from 'express'
import { db } from "../../database/knex"


export const delPurchases = async (req: Request, res: Response) => {
    

    try {
         const id = req.params.id
        const [findPurchase] = await db("purchases").where({ id: id })


        if (findPurchase) {
            await db("purchases").del().where({ id: id })
            res.status(200).send("Compra apagada com sucesso!")
        }

        if(!findPurchase)  {res.status(422)
        throw new Error("ID não encontrado")}

       
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        } }}