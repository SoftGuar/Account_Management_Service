import { FastifyRequest, FastifyReply } from 'fastify';
import { AssistanceService } from '../services/assistanceService';
import { CreateAssistanceInput, UpdateAssistanceInput } from '../models/assistance.model';

export const createAssistance = async (
  request: FastifyRequest<{ Body: CreateAssistanceInput }>,
  reply: FastifyReply
) => {
  const assistanceData = request.body;
  const newAssistance = await AssistanceService.createAssistance(assistanceData);

  return reply.code(201).send({
    success: true,
    data: newAssistance
  });
};

export const getAssistances = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const assistances = await AssistanceService.getAllAssistances();

  return reply.code(200).send({
    success: true,
    data: assistances
  });
};

