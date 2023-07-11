
import { Request, Response } from 'express'
import { db } from "../database/knex"

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const result = await db("users").select("id", "name", "email", "password", "created_at AS createdAt")

        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error)
    }
}