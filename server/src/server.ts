import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories';
const app = fastify();

app.register(memoriesRoutes)
app.register(cors,{
    origin: 'true', // Access-Control-Allow-Origin: true
})

app.listen({
    port: 3333,
}).then(()=>{
    console.log('HTTP Server is running on http://localhost:3333');
})
