import { FastifyRequest, FastifyReply } from 'fastify';
import { MaintainerService } from '../services/maintainerService';
import { CreateMaintainerInput, UpdateMaintainerInput } from '../models/maintainer.model';

interface CreateMaintainerRequest {
  Body: CreateMaintainerInput;
}

interface UpdateMaintainerRequest {
  Params: { id: string };
  Body: UpdateMaintainerInput;
}

interface GetMaintainerRequest {
  Params: { id: string };
}

interface DeleteMaintainerRequest {
  Params: { id: string };
}

export const createMaintainer = async (
  request: FastifyRequest<CreateMaintainerRequest>,
  reply: FastifyReply
) => {
  try {
    const maintainerData = request.body;
    const newMaintainer = await MaintainerService.createMaintainer(maintainerData);
    
    return reply.code(201).send({
      success: true,
      data: newMaintainer
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getMaintainers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const maintainers = await MaintainerService.getAllMaintainers();
    
    return reply.code(200).send({
      success: true,
      data: maintainers
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const getMaintainerById = async (
  request: FastifyRequest<GetMaintainerRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const maintainer = await MaintainerService.getMaintainerById(Number(id));

    if (!maintainer) {
      return reply.code(404).send({
        success: false,
        message: 'Maintainer not found'
      });
    }

    return reply.code(200).send({
      success: true,
      data: maintainer
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const updateMaintainer = async (
  request: FastifyRequest<UpdateMaintainerRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const maintainerData = request.body;
    
    const updatedMaintainer = await MaintainerService.updateMaintainer(Number(id), maintainerData);

    return reply.code(200).send({
      success: true,
      data: updatedMaintainer
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const deleteMaintainer = async (
  request: FastifyRequest<DeleteMaintainerRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await MaintainerService.deleteMaintainer(Number(id));

    return reply.code(200).send({
      success: true,
      message: 'Maintainer deleted successfully'
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};
