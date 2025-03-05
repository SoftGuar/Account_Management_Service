import { FastifyInstance } from 'fastify';
import { 
  createCommercial, 
  getCommercials, 
  getCommercialById, 
  updateCommercial, 
  deleteCommercial 
} from '../handlers/commercialHandler';

const commercialRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', createCommercial);

  fastify.get('/', getCommercials);

  fastify.get('/:id', getCommercialById);

  fastify.put('/:id', updateCommercial);

  fastify.delete('/:id', deleteCommercial);
};

export default commercialRoutes;
