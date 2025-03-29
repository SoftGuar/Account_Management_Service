// app/handlers/deciderHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { DeciderService } from '../services/deciderService';
import { CreateDeciderInput, UpdateDeciderInput } from '../models/decider.model';

export const createDecider = async (
  request: FastifyRequest<{ Body: CreateDeciderInput }>,
  reply: FastifyReply
) => {
  const deciderData = request.body;
  const newDecider = await DeciderService.createDecider(deciderData);

  return reply.code(201).send({
    success: true,
    data: newDecider
  });
};

export const getDeciders = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const deciders = await DeciderService.getAllDeciders();

  return reply.code(200).send({
    success: true,
    data: deciders
  });
};

export const getDeciderById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const decider = await DeciderService.getDeciderById(Number(id));

  return reply.code(200).send({
    success: true,
    data: decider
  });
};

export const updateDecider = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateDeciderInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const deciderData = request.body;

  const updatedDecider = await DeciderService.updateDecider(Number(id), deciderData);

  return reply.code(200).send({
    success: true,
    data: updatedDecider
  });
};

export const deleteDecider = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await DeciderService.deleteDecider(Number(id));

  return reply.code(200).send({
    success: true,
    message: 'Decider deleted successfully'
  });
};