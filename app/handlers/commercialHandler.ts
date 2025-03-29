// app/handlers/commercialHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CommercialService } from '../services/commercialService';
import { CreateCommercialInput, UpdateCommercialInput } from '../models/commercial.model';

export const createCommercial = async (
  request: FastifyRequest<{ Body: CreateCommercialInput }>,
  reply: FastifyReply
) => {
  const commercialData = request.body;
  const newCommercial = await CommercialService.createCommercial(commercialData);

  return reply.code(201).send({
    success: true,
    data: newCommercial
  });
};

export const getCommercials = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const commercials = await CommercialService.getAllCommercials();

  return reply.code(200).send({
    success: true,
    data: commercials
  });
};

export const getCommercialById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const commercial = await CommercialService.getCommercialById(Number(id));

  return reply.code(200).send({
    success: true,
    data: commercial
  });
};

export const updateCommercial = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateCommercialInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const commercialData = request.body;

  const updatedCommercial = await CommercialService.updateCommercial(Number(id), commercialData);

  return reply.code(200).send({
    success: true,
    data: updatedCommercial
  });
};

export const deleteCommercial = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await CommercialService.deleteCommercial(Number(id));

  return reply.code(200).send({
    success: true,
    message: 'Commercial deleted successfully'
  });
};
