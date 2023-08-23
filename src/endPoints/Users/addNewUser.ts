
import { Request, Response } from 'express'
import { db } from "../../database/knex"
import { TUsers } from '../../types'

export const addNewUser = async (req: Request, res: Response) => {
    const { id, name, email, password } = req.body


    try {
        //Validação ID
        if (id !== undefined) {
            if (typeof (id) !== "string") {

                res.status(422)
                throw new Error("O ID deve estar no formato de texto!")

            }
            if(id[0]!=="u"){
                res.status(422)
                throw new Error("o ID deve começar com a letra 'u' no início")
    
                }
        }

        //Validação name

        if (name !== undefined) {
            if (typeof (name) !== "string") {

                res.status(422)
                throw new Error("O nome deve estar no formato de texto")

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
                throw new Error("O email deve estar no formato de texto!")
                
            }

         if (email.length <=0) {
            res.status(400)
            throw new Error("O email deve conter caracteres")
        }

            
      
        }

        //Validação de senha

        if (password !== undefined) {
            if (typeof (password) !== "string") {

                res.status(422)
                throw new Error("O password deve estar no formato de texto!")

            } if (password.length < 4) {
                res.status(400)
                throw new Error("A senha deve conter pelo menos 4 caracteres")
            }

        }


        //Validação se email e ID existem
        const [findId] = await db ("users").where({ id: id })

        if (findId) {
            res.status(400)
            throw new Error("O ID já está em uso! Escolha outra ID")
        }


        const [findEmail] = await db ("users").where({ email:email })

        if (findEmail) {
            res.status(400)
            throw new Error("O Email já cadastrado! Escolha outro Email")
        }

        const newUser:TUsers = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: new Date().toISOString().slice(0,19).replace('T',' ')
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