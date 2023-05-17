import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

//HTTP Method: GET , POST , PUT , DELETE, PATCH
//GET: Buscar uma ou mais informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informação existente no back-end
//DELETE: Remover uma informação do back-end
//PATCH: Atualizar uma informação especifica

app.get('/hello', async () => {
    
    const users  = await prisma.user.findMany();
    return users;
});

app.listen({
    port: 3333,
}).then(()=>{
    console.log('HTTP Server is running on http://localhost:3333');
})
