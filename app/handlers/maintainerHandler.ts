// app/handlers/maintainerHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { MaintainerService } from '../services/maintainerService';
import { CreateMaintainerInput, UpdateMaintainerInput } from '../models/maintainer.model';

export const createMaintainer = async (
  request: FastifyRequest<{ Body: CreateMaintainerInput }>,
  reply: FastifyReply
) => {
  const maintainerData = request.body;
  const newMaintainer = await MaintainerService.createMaintainer(maintainerData);

  return reply.code(201).send({
    success: true,
    data: newMaintainer
  });
};

export const getMaintainers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const maintainers = await MaintainerService.getAllMaintainers();

  return reply.code(200).send({
    success: true,
    data: maintainers
  });
};

export const getMaintainerById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const maintainer = await MaintainerService.getMaintainerById(Number(id));

  return reply.code(200).send({
    success: true,
    data: maintainer
  });
};

export const updateMaintainer = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateMaintainerInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const maintainerData = request.body;

  const updatedMaintainer = await MaintainerService.updateMaintainer(Number(id), maintainerData);

  return reply.code(200).send({
    success: true,
    data: updatedMaintainer
  });
};

export const deleteMaintainer = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await MaintainerService.deleteMaintainer(Number(id));

  return reply.code(200).send({
    success: true,
    message: 'Maintainer deleted successfully'
  });
};