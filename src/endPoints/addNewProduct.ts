
import { Request, Response } from 'express'
import { db } from "../database/knex"
import { products } from '../database'

export const addNewProduct = async (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl } = req.body

    try {

        //Validação ID
        if (id !== undefined) {
            if (typeof (id) !== "string") {
                res.status(422)
                throw new Error("O ID deve ser uma string")
            }
        }

        //Validação name
        if (name !== undefined) {
            if (typeof (name) !== "string") {

                res.status(422)
                throw new Error("O ID deve ser uma string")

            }
        }

        //Validação Price
        if (price !== undefined) {
            if (typeof (price) !== "number") {

                res.status(422)
                throw new Error("O Preço deve ser um número")
            }
        }

        //Validação Description
        if (description !== undefined) {
            if (typeof (description) !== "string") {

                res.status(422)
                throw new Error("A descrição deve ser uma string")

            }
        }

        //Validação URL
        if (imageUrl !== undefined) {
            if (typeof (imageUrl) !== "string") {

                res.status(422)
                throw new Error("A url deve ser uma string")

            }
        }

        //Validação Id Existente
        const findIdProduct = products.find((product) => product.id === id)

        if (findIdProduct) {
            res.status(400)
            throw new Error("O Id cadastrado já existe")

        }

        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: imageUrl
        }

        await db("products").insert(newProduct)

        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }

    }


}