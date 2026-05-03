import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const app = express()
app.use(express.json())



app.get('/usuarios', async (req, res) => {

    const users =  await prisma.user.findMany()


    res.status(200).json(users)
});


app.post('/usuarios', async (req, res) => {
    
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json({ message: 'Usuário criado com sucesso!', user })
});


app.put('/usuarios/:id', async (req, res) => {
    
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user })
});


app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
});

app.listen(3000)
/* 
    GET - Buscar uma informação dentro do servidor
    POST - Inserir uma informação dentro do servidor
    PUT - Alterar uma informação dentro do servidor
    PATCH - Alterar uma informação dentro do servidor de forma parcial
    DELETE - Deletar uma informação dentro do servidor
*/

