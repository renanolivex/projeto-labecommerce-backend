import { Request, Response } from 'express'
import { db } from "../../database/knex"

export const getAllProducts = async (req: Request, res: Response) => {

    const name = req.query.name

    try {
        if (name !== undefined) {

            const result = await db("products").select("id", "name", "price", "description", "image_url AS imageUrl").where("name", "LIKE", `%${name}%`)

            res.status(200).send(result)
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }

}
