import adminRoutes from './admin/admin.routes';
import commercialRoutes from './commercial/commercial.routes';
import deciderRoutes from './decider/decider.routes';
import exampleRoutes from './example.routes';
import maintainerRoutes from './maintainer/maintainer.routes';
import userRoutes from './user/user.routes';
import helperRoutes from './helper/helper.routes';
import helperRecommendationRoutes from './helperRecommendation/helperRecommendation.routes'
import superAdminRoutes from './superAdmin/superAdmin.routes';

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import assistanceRoutes from './assistance/assistance.routes';

const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });
  
  // Register user routes with a prefix
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(adminRoutes, { prefix: '/admins' });
  fastify.register(commercialRoutes, { prefix: '/commercials' });
  fastify.register(deciderRoutes, { prefix: '/decider' });
  fastify.register(maintainerRoutes, { prefix: '/maintainer' });
  fastify.register(helperRoutes, { prefix: '/helpers' });
  fastify.register(assistanceRoutes, { prefix: '/assistances' });
  fastify.register(superAdminRoutes, { prefix: '/superAdmins' });

  fastify.register(helperRecommendationRoutes, { prefix: '/helperRecommendations' });



};

export default registerRoutes;