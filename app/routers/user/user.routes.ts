// app/routes/api/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  getUserHelpers,
  addHelperToUser,
  getUserByEmail,
  removeHelperFromUser
} from '../../handlers/userHandler';
import { 
  createUserSchema, 
  deleteUserSchema, 
  getUserByIdSchema, 
  getUsersSchema, 
  updateUserSchema,
  getUserHelpersSchema,
  getUserByEmailSchema,
  addHelperToUserSchema,
  removeHelperFromUserSchema
} from './user.schema';

const userRoutes = async (fastify: FastifyInstance) => {
  // POST /users - Create a new user
  fastify.post('/', { schema: createUserSchema }, createUser);
  
  // GET /users - Get all users
  fastify.get('/', { schema: getUsersSchema }, getUsers);
  
  // GET /users/:id - Get a single user by ID
  fastify.get('/:id', { schema: getUserByIdSchema }, getUserById);
  
  // PUT /users/:id - Update a user by ID
  fastify.put('/:id', { schema: updateUserSchema }, updateUser);
  
  // DELETE /users/:id - Delete a user by ID
  fastify.delete('/:id', { schema: deleteUserSchema }, deleteUser);

  // Add this route inside the userRoutes function
fastify.get('/by-email', { schema: getUserByEmailSchema }, getUserByEmail);

  
  fastify.get('/:id/helpers', { schema: getUserHelpersSchema }, getUserHelpers);
  
  fastify.post('/:id/helpers/:helperId', { schema: addHelperToUserSchema }, addHelperToUser);
  
  fastify.delete('/:id/helpers/:helperId', { schema: removeHelperFromUserSchema }, removeHelperFromUser);
};

export default userRoutes;