import { FastifyRequest, FastifyReply } from 'fastify';
import { DeciderService } from '../services/deciderService';
import { CreateDeciderInput, UpdateDeciderInput } from '../models/decider.model';

export const createDecider = async (
  request: FastifyRequest<{ Body: CreateDeciderInput }>,
  reply: FastifyReply
) => {
  try {
    const deciderData = request.body;
    const newDecider = await DeciderService.createDecider(deciderData);
    
    return reply.code(201).send({
      success: true,
      data: newDecider
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getDeciders = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const deciders = await DeciderService.getAllDeciders();
    
    return reply.code(200).send({
      success: true,
      data: deciders
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const getDeciderById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const decider = await DeciderService.getDeciderById(Number(id));

    if (!decider) {
      return reply.code(404).send({
        success: false,
        message: 'Decider not found'
      });
    }

    return reply.code(200).send({
      success: true,
      data: decider
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const updateDecider = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateDeciderInput }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const deciderData = request.body;
    
    const updatedDecider = await DeciderService.updateDecider(Number(id), deciderData);

    return reply.code(200).send({
      success: true,
      data: updatedDecider
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const deleteDecider = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await DeciderService.deleteDecider(Number(id));

    return reply.code(200).send({
      success: true,
      message: 'Decider deleted successfully'
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};