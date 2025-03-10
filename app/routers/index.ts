import adminRoutes from './admin/admin.routes';
import commercialRoutes from './commercial/commercial.routes';
import deciderRoutes from './decider/decider.routes';
import exampleRoutes from './example.routes';
import maintainerRoutes from './maintainer/maintainer.routes';
import userRoutes from './user/user.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });
  
  // Register user routes with a prefix
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(adminRoutes, { prefix: '/admins' });
  fastify.register(commercialRoutes, { prefix: '/commercials' });
  fastify.register(deciderRoutes, { prefix: '/decider' });
  fastify.register(maintainerRoutes, { prefix: '/maintainer' });



};

export default registerRoutes;