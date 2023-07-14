
import { Request, Response } from 'express'
import { db } from "../../database/knex"
import { TProducts } from '../../types'



export const addNewProduct = async (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl } = req.body

    try {

        //Validação ID
        if (id !== undefined) {
            if (typeof (id) !== "string") {
                res.status(422)
                throw new Error("O ID deve ser um texto")
            }

            if(id[0]!=="p" || id[1]!=="r" || id[2]!=="o" || id[3]!=="d"){
            res.status(422)
            throw new Error("o ID deve conter 'prod' no início")

            }

            
        }

        //Validação name
        if (name !== undefined) {
            if (typeof (name) !== "string") {

                res.status(422)
                throw new Error("O ID deve ser um texto")

            }
            if (name.length <= 1) {
                res.status(400)
                throw new Error("O nome do produto deve conter pelo menos 2 caracteres")

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
                throw new Error("A descrição deve ser um texto")

            }
        }

        //Validação URL
        if (imageUrl !== undefined) {
            if (typeof (imageUrl) !== "string") {

                res.status(422)
                throw new Error("A url deve ser um texto")

            }
        }

        //Validação Id Existente
      
        const [findIdProduct] = await db ("products").where({ id: id })

         if (findIdProduct) {
            res.status(400)
            throw new Error("O Id cadastrado já existe")

        } 

        const newProduct:TProducts = {
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