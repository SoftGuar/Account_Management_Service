// app/routers/user.routes.ts
import { FastifyInstance } from 'fastify';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../handlers/userHandler';

const userRoutes = async (fastify: FastifyInstance) => {
  // POST /users - Create a new user
  fastify.post('/', createUser);
  
  // GET /users - Get all users
  fastify.get('/', getUsers);

  // GET /users/:id - Get a single user by ID
  fastify.get('/:id', getUserById);

  // PUT /users/:id - Update a user by ID
  fastify.put('/:id', updateUser);

  // DELETE /users/:id - Delete a user by ID
  fastify.delete('/:id', deleteUser);
};

export default userRoutes;
