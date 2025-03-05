import { FastifyInstance } from 'fastify';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../handlers/adminHandler';
import { isSuperAdmin } from '../middlewares/roleMiddleware';


const adminRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/',  createAdmin);

  fastify.get('/',  getAdmins);

  fastify.get('/:id',  getAdminById);

  fastify.put('/:id',  updateAdmin);

  fastify.delete('/:id',  deleteAdmin);
};

export default adminRoutes;
