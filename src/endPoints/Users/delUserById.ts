import { Request, Response } from 'express'
import { db } from "../../database/knex"

export const delUserById = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
       
        const [findUser] = await db("users").where({ id: id })

        if (findUser) {
            await db("users").del().where({ id: id })

            res.status(200).send("Usuário apagado com sucesso!")
        } 
        if (!findUser){
            res.status(200)
            throw new Error("Usuário não encontrado")}
        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }

}
