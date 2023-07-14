import { Request, Response } from 'express'
import { db } from "../../database/knex"


export const delProductById = async (req: Request, res: Response) => {
    const id = req.params.id

    try {

        const [findProduct] = await db("products").where({ id: id })

        if (findProduct) {
            await db("products").del().where({ id: id })

            res.status(200).send("Produto apagado com sucesso!")
        }
        if(!findProduct) {  res.status(422)
        throw new Error("ID não encontrado")}
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }

}