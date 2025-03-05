import { FastifyRequest, FastifyReply } from 'fastify';
import { CommercialService } from '../services/commercialService';
import { CreateCommercialInput, UpdateCommercialInput } from '../models/commercial.model';

interface CreateCommercialRequest {
  Body: CreateCommercialInput;
}

interface UpdateCommercialRequest {
  Params: { id: string };
  Body: UpdateCommercialInput;
}

interface GetCommercialRequest {
  Params: { id: string };
}

interface DeleteCommercialRequest {
  Params: { id: string };
}

export const createCommercial = async (
  request: FastifyRequest<CreateCommercialRequest>,
  reply: FastifyReply
) => {
  try {
    const commercialData = request.body;
    const newCommercial = await CommercialService.createCommercial(commercialData);
    
    return reply.code(201).send({
      success: true,
      data: newCommercial
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getCommercials = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const commercials = await CommercialService.getAllCommercials();
    
    return reply.code(200).send({
      success: true,
      data: commercials
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const getCommercialById = async (
  request: FastifyRequest<GetCommercialRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const commercial = await CommercialService.getCommercialById(Number(id));

    if (!commercial) {
      return reply.code(404).send({
        success: false,
        message: 'Commercial not found'
      });
    }

    return reply.code(200).send({
      success: true,
      data: commercial
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const updateCommercial = async (
  request: FastifyRequest<UpdateCommercialRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const commercialData = request.body;
    
    const updatedCommercial = await CommercialService.updateCommercial(Number(id), commercialData);

    return reply.code(200).send({
      success: true,
      data: updatedCommercial
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const deleteCommercial = async (
  request: FastifyRequest<DeleteCommercialRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await CommercialService.deleteCommercial(Number(id));

    return reply.code(200).send({
      success: true,
      message: 'Commercial deleted successfully'
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};
