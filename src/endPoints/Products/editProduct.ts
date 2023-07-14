import { Request, Response } from 'express'
import { db } from "../../database/knex"

export const editProduct = async (req: Request, res: Response) => {
    const id = req.params.id

    const { id: newId, name, price, description, imageUrl } = req.body

    try {

        //Validação ID
        if (newId !== undefined) {
            if (typeof (newId) !== "string") {
                res.status(422)
                throw new Error("O ID deve ser uma string")
            }

            if(newId[0]!=="p" || newId[1]!=="r" || newId[2]!=="o" || newId[3]!=="d"){
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
                throw new Error("O preço deve ser um number")
            }
        }

        //Validação description
        if (description !== undefined) {
            if (typeof (description) !== "string") {
                res.status(422)
                throw new Error("A descrição deve ser uma string")
            }
        }

        //Validação Url
        if (imageUrl !== undefined) {
            if (typeof (imageUrl) !== "string") {
                res.status(422)
                throw new Error("A URL deve ser uma string")
            }
        }



        const [findProduct] = await db("products").where({ id: id })

        if (findProduct) {
            const updateProduct = {
                id: newId || findProduct.id,
                name: name || findProduct.name,
                price: price || findProduct.price,
                description: description || findProduct.description,
                image_url: imageUrl || findProduct.image_url,
            }

            await db("products").update(updateProduct).where({ id: id })

            res.status(200).send("Produto atualizado com sucesso")
        }

        else {
            res.status(404)
            throw new Error("'id' não encontrada")

        }

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }

}