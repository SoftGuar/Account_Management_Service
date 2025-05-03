import { FastifyRequest, FastifyReply } from 'fastify';
import { SuperAdminService } from '../services/superAdminService';

export const getSuperAdminById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
    const { id } = request.params;
    const superAdmin = await SuperAdminService.getSuperAdminById(Number(id));
    
    return reply.code(200).send({
      success: true,
      data: superAdmin
    });
};