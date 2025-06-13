import { FastifyInstance } from 'fastify';
import { addUserAction } from '../../handlers/userActionHandler';
import { addUserActionSchema } from './userAction.schema';

export default async function userActionRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/user-actions',
    { schema: addUserActionSchema },
    addUserAction
  );
}