import { FastifyInstance } from 'fastify';
import { createDecider, getDeciders, getDeciderById, updateDecider, deleteDecider } from '../handlers/deciderHandler';
import { isSuperAdmin } from '../middlewares/roleMiddleware';

const deciderRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', createDecider);

  fastify.get('/', getDeciders);

  fastify.get('/:id', getDeciderById);

  fastify.put('/:id', updateDecider);

  fastify.delete('/:id', deleteDecider);
};

export default deciderRoutes;
