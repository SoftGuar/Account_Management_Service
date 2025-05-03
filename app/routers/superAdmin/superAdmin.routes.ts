import { FastifyInstance } from 'fastify';
import { getSuperAdminById } from '../../handlers/superAdminHandler';
import { getSuperAdminByIdSchema } from './superAdmin.schema';

const superAdminRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/:id', { schema: getSuperAdminByIdSchema }, getSuperAdminById);
};

export default superAdminRoutes;