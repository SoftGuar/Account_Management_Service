// routes/api/helperRecommendation.routes.ts
import { FastifyInstance } from 'fastify';
import {
  createHelperRecommendation,
  getHelperRecommendations,
  getHelperRecommendationById,
  approveHelperRecommendation,
  rejectHelperRecommendation,
  deleteHelperRecommendation
} from '../../handlers/helperRecommendationHandler';
import {
  createHelperRecommendationSchema,
  getHelperRecommendationsSchema,
  getHelperRecommendationByIdSchema,
  approveHelperRecommendationSchema,
  rejectHelperRecommendationSchema,
  deleteHelperRecommendationSchema
} from './helperRecommendation.schema';

const helperRecommendationRoutes = async (fastify: FastifyInstance) => {
  // User endpoint - requires user authentication
  fastify.post('/', { schema: createHelperRecommendationSchema }, createHelperRecommendation);
  
  // Admin endpoints - require admin authentication
  fastify.get('/', { schema: getHelperRecommendationsSchema }, getHelperRecommendations);
  fastify.get('/:id', { schema: getHelperRecommendationByIdSchema }, getHelperRecommendationById);
  fastify.post('/:id/approve', { schema: approveHelperRecommendationSchema }, approveHelperRecommendation);
  fastify.post('/:id/reject', { schema: rejectHelperRecommendationSchema }, rejectHelperRecommendation);
  fastify.delete('/:id', { schema: deleteHelperRecommendationSchema }, deleteHelperRecommendation);
};



export default helperRecommendationRoutes;