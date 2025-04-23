import { FastifyInstance } from 'fastify';
import { createAssistance, getAssistances } from '../../handlers/assistanceHandler';
import { 
  createAssistanceSchema, 
  getAssistancesSchema, 
} from './assistance.schema';

const assistanceRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createAssistanceSchema }, createAssistance);
  fastify.get('/', { schema: getAssistancesSchema }, getAssistances);
  
};

export default assistanceRoutes;
