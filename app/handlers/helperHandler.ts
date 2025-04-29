import { FastifyRequest, FastifyReply } from 'fastify';
import { HelperService } from '../services/helperService';
import { CreateHelperInput, UpdateHelperInput } from '../models/helper.model';

export const createHelper = async (
  request: FastifyRequest<{ Body: CreateHelperInput }>,
  reply: FastifyReply
) => {
  const helperData = request.body;
  const newHelper = await HelperService.createHelper(helperData);

  return reply.code(201).send({
    success: true,
    data: newHelper
  });
};

export const getHelpers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const helpers = await HelperService.getAllHelpers();

  return reply.code(200).send({
    success: true,
    data: helpers
  });
};

export const getHelperById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const helper = await HelperService.getHelperById(Number(id));

  return reply.code(200).send({
    success: true,
    data: helper
  });
};

export const updateHelper = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateHelperInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const helperData = request.body;

  const updatedHelper = await HelperService.updateHelper(Number(id), helperData);

  return reply.code(200).send({
    success: true,
    data: updatedHelper
  });
};

export const deleteHelper = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await HelperService.deleteHelper(Number(id));

  return reply.code(200).send({
    success: true,
    message: 'Helper deleted successfully'
  });
};
export const getHelperUsers = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const helpers = await HelperService.getHelperUsers(Number(id));
    
    return reply.code(200).send({
      success: true,
      data: helpers
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};
