import { fastify } from "fastify"
import { DataBasePostgres } from "./database-postgres.js"
// import { DataBaseMemory } from "./database-memory.js";
// import { request } from "http";

const server = fastify()

// const database = new DataBaseMemory()
const database = new DataBasePostgres()

server.post("/videos", async(request, reply) => {
  const { title, description, duration } = request.body

   await database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})
// GET http://localhost:333/videos
server.get('/videos', async(request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})
// PUT http://localhost:333/videos
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send()
})
// DELET http://localhost:333/videos
server.delete("/videos/:id",async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})
