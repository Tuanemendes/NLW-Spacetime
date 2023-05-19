
import { FastifyInstance } from 'fastify'
import {z} from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance){

  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy:{
        createdAt:'asc',
      },
    })

    return memories.map(memory =>{
      return{
        id:memory.id,
        coverUrl:memory.coverUrl,
        excerpt:memory.content.substring(0, 115).concat('...'),
      }
    })
  })
      
  app.get('/memories/:id', async (resquest) => {
 
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(resquest.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where:{
        id,
      },
    })

    return memory
  })


  app.post('/memories', async (resquest) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const {content,coverUrl, isPublic} = bodySchema.parse(resquest.body)

    const memory = await prisma.memory.create({
      data:{
        content,
        coverUrl,
        isPublic,
        userId: '1b558d24-a043-41ca-aea8-9dea3eb4aba8',
      },
    })
    return memory
  })

  app.put('/memories/:id', async (resquest) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(resquest.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const {content,coverUrl, isPublic} = bodySchema.parse(resquest.body)

    const memoryUpdate = await prisma.memory.update({
      where:{
        id,
      },
      data:{
        content,
        coverUrl,
        isPublic,
      }
    })
    return memoryUpdate
  })
  app.delete('/memories/:id', async (resquest) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(resquest.params)

    await prisma.memory.delete({
      where:{
        id,
      },
    })
  })
}

//HTTP Method: GET , POST , PUT , DELETE, PATCH
//GET: Buscar uma ou mais informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informação existente no back-end
//DELETE: Remover uma informação do back-end
//PATCH: Atualizar uma informação especifica