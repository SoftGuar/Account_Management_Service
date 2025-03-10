import { FastifyInstance } from 'fastify';
import { createDecider, getDeciders, getDeciderById, updateDecider, deleteDecider } from '../../handlers/deciderHandler';
import { createDeciderSchema, deleteDeciderSchema , getDeciderByIdSchema, getDecidersSchema, updateDeciderSchema } from './decider.schema';

const deciderRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createDeciderSchema }, createDecider);
  fastify.get('/', { schema: getDecidersSchema }, getDeciders);
  fastify.get('/:id', { schema: getDeciderByIdSchema }, getDeciderById);
  fastify.put('/:id', { schema: updateDeciderSchema }, updateDecider);
  fastify.delete('/:id', { schema: deleteDeciderSchema }, deleteDecider);
};

export default deciderRoutes;
