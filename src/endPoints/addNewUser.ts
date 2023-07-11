
import { Request, Response } from 'express'
import { db } from "../database/knex"
import { users } from '../database'


export const addNewUser = async (req: Request, res: Response) => {
    const { id, name, email, password } = req.body


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
                throw new Error("O nome deve ser uma string")

            }

            if (name.length <= 1) {
                res.status(400)
                throw new Error("O nome deve conter pelo menos 2 caracteres")

            }
        }

        //Validação email

        if (email !== undefined) {
            if (typeof (email) !== "string") {

                res.status(422)
                throw new Error("O email deve ser uma string")

            }
        }

        //Validação de senha

        if (password !== undefined) {
            if (typeof (password) !== "string") {

                res.status(422)
                throw new Error("O password deve ser uma string")

            } if (password.length < 4) {
                res.status(400)
                throw new Error("A senha deve conter pelo menos 4 caracteres")
            }

        }


        //Validação se email e ID existem
        const findId = users.find((user) => user.id === id)

        if (findId) {
            res.status(400)
            throw new Error("O Id já existe! Escolha outra Id")
        }


        const findEmail = users.find((user) => user.email === email)

        if (findEmail) {
            res.status(400)
            throw new Error("O Email já existe! Escolha outro Email")
        }

        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password
        }

        await db("users").insert(newUser)


        res.status(201).send("Cadastro realizado com sucesso")
    }


    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro desconhecido")
        }
    }

}