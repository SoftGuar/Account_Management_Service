import { FastifyInstance } from 'fastify';
import { createHelper, getHelpers, getHelperById, updateHelper, deleteHelper,getHelperUsers } from '../../handlers/helperHandler';
import { 
  createHelperSchema, 
  deleteHelperSchema, 
  getHelperByIdSchema, 
  getHelpersSchema, 
  updateHelperSchema ,
  getHelperUsersSchema
} from './helper.schema';

const helperRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createHelperSchema }, createHelper);
  fastify.get('/', { schema: getHelpersSchema }, getHelpers);
  fastify.get('/:id', { schema: getHelperByIdSchema }, getHelperById);
  fastify.put('/:id', { schema: updateHelperSchema }, updateHelper);
  fastify.delete('/:id', { schema: deleteHelperSchema }, deleteHelper);
  fastify.get('/:id/users', { schema: getHelperUsersSchema }, getHelperUsers);
  
};

export default helperRoutes;
