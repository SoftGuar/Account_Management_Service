import { FastifyRequest, FastifyReply } from 'fastify';
import { UserActionService } from '../services/userActionService';

export const addUserAction = async (
  request: FastifyRequest<{
    Body: { userId: number; action: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const { userId, action } = request.body;
    const record = await UserActionService.addAction(userId, action);
    return reply.code(201).send({ success: true, data: record });
  } catch (err: any) {
    return reply.code(500).send({
      success: false,
      error: {
        message: err.message || 'Failed to add user action',
        code: 'USER_ACTION_CREATE_ERROR',
        timestamp: new Date().toISOString(),
      },
    });
  }
};