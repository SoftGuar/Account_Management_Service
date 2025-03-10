import { FastifyInstance } from 'fastify';
import { createCommercial, getCommercials, getCommercialById, updateCommercial, deleteCommercial } from '../../handlers/commercialHandler';
import { createCommercialSchema, deleteCommercialSchema , getCommercialByIdSchema, getCommercialsSchema, updateCommercialSchema } from './commercial.schema';

const commercialRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createCommercialSchema }, createCommercial);
  fastify.get('/', { schema: getCommercialsSchema }, getCommercials);
  fastify.get('/:id', { schema: getCommercialByIdSchema }, getCommercialById);
  fastify.put('/:id', { schema: updateCommercialSchema }, updateCommercial);
  fastify.delete('/:id', { schema: deleteCommercialSchema }, deleteCommercial);
};

export default commercialRoutes;
