import { FastifyInstance } from 'fastify';
import { addUserAction, getUserActionsByUserId } from '../../handlers/userActionHandler';
import { addUserActionSchema, getUserActionsSchema } from './userAction.schema';

export default async function userActionRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/user-actions',
    { schema: addUserActionSchema },
    addUserAction
  );

  fastify.get(
    '/user-actions/:userId',
    { schema: getUserActionsSchema },
    getUserActionsByUserId
  );
}