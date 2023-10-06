// import{createServer} from 'node:http';

// const server = createServer((request, response) => {
// response.write('Imprima na tela');
//     return response.end();
// })

// server.listen(3333);

// Servidor com fastify
// POST http://localhost:333/videos
// O id é um router parameter

import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";
import { request } from "http";

const server = fastify();

const database = new DataBaseMemory();

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});
// GET http://localhost:333/videos
server.get("/videos", (request) => {
  const search = request.query.search


  const videos = database.list(search)

  return videos;
});
// PUT http://localhost:333/videos
server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});
// DELET http://localhost:333/videos
server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
