import adminRoutes from './admin.routes';
import commercialRoutes from './commercial.routes';
import exampleRoutes from './example.routes';
import userRoutes from './user.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });
  
  // Register user routes with a prefix
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(adminRoutes, { prefix: '/admins' });
  fastify.register(commercialRoutes, { prefix: '/commercials' });


};

export default registerRoutes;