import { FastifyInstance } from 'fastify';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../../handlers/adminHandler';
import { createAdminSchema, deleteAdminSchema , getAdminByIdSchema, getAdminsSchema, updateAdminSchema } from './admin.schema';

const adminRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createAdminSchema }, createAdmin);
  fastify.get('/', { schema: getAdminsSchema }, getAdmins);
  fastify.get('/:id', { schema: getAdminByIdSchema }, getAdminById);
  fastify.put('/:id', { schema: updateAdminSchema }, updateAdmin);
  fastify.delete('/:id', { schema: deleteAdminSchema }, deleteAdmin);
};

export default adminRoutes;