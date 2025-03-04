// app/routers/user.routes.ts
import { FastifyInstance } from 'fastify';
import { createUser, getUsers } from '../handlers/userHandler';

const userRoutes = async (fastify: FastifyInstance) => {
  // POST /users - Create a new user
  fastify.post('/', createUser);
  
  // GET /users - Get all users
  fastify.get('/', getUsers);
};

export default userRoutes;