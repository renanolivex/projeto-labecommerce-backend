import { Request, Response } from 'express'
import { db } from "../database/knex"


export const delPurchases = async (req: Request, res: Response) => {
    const id = req.params.id

    try {

        const [findPurchase] = await db("purchases").where({ id: id })


        if (findPurchase) {
            await db("purchases").del().where({ id: id })
            res.status(200).send("Compra apagada com sucesso!")
        }

        else {
            res.status(200)
            throw new Error("Compra não encontrada")
        }

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }

}