import { FastifyRequest, FastifyReply } from 'fastify';
import { HelperService } from '../services/helperService';
import { CreateHelperInput, UpdateHelperInput } from '../models/helper.model';

export const createHelper = async (
  request: FastifyRequest<{ Body: CreateHelperInput }>,
  reply: FastifyReply
) => {
  try {
    const helperData = request.body;
    const newHelper = await HelperService.createHelper(helperData);

    return reply.code(201).send({
      success: true,
      data: newHelper
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getHelpers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const helpers = await HelperService.getAllHelpers();

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

export const getHelperById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const helper = await HelperService.getHelperById(Number(id));

    if (!helper) {
      return reply.code(404).send({
        success: false,
        message: 'Helper not found'
      });
    }

    return reply.code(200).send({
      success: true,
      data: helper
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const updateHelper = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateHelperInput }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const helperData = request.body;

    const updatedHelper = await HelperService.updateHelper(Number(id), helperData);

    return reply.code(200).send({
      success: true,
      data: updatedHelper
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const deleteHelper = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    await HelperService.deleteHelper(Number(id));

    return reply.code(200).send({
      success: true,
      message: 'Helper deleted successfully'
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};
