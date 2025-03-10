import { FastifyInstance } from 'fastify';
import { createMaintainer, getMaintainers, getMaintainerById, updateMaintainer, deleteMaintainer } from '../../handlers/maintainerHandler';
import { createMaintainerSchema, deleteMaintainerSchema , getMaintainerByIdSchema, getMaintainersSchema, updateMaintainerSchema } from './maintainer.schema';

const maintainerRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createMaintainerSchema }, createMaintainer);
  fastify.get('/', { schema: getMaintainersSchema }, getMaintainers);
  fastify.get('/:id', { schema: getMaintainerByIdSchema }, getMaintainerById);
  fastify.put('/:id', { schema: updateMaintainerSchema }, updateMaintainer);
  fastify.delete('/:id', { schema: deleteMaintainerSchema }, deleteMaintainer);
};

export default maintainerRoutes;
