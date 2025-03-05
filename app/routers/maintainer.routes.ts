import { FastifyInstance } from 'fastify';
import {
  createMaintainer,
  getMaintainers,
  getMaintainerById,
  updateMaintainer,
  deleteMaintainer
} from '../handlers/maintainerHandler';

export default async function maintainerRoutes(fastify: FastifyInstance) {
  fastify.post('/', createMaintainer);
  fastify.get('/', getMaintainers);
  fastify.get('/:id', getMaintainerById);
  fastify.put('/:id', updateMaintainer);
  fastify.delete('/:id', deleteMaintainer);
}
