import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../services/adminService';
import { CreateAdminInput, UpdateAdminInput } from '../models/admin.model';

interface CreateAdminRequest {
  Body: CreateAdminInput;
}

interface UpdateAdminRequest {
  Params: { id: string };
  Body: UpdateAdminInput;
}

interface GetAdminRequest {
  Params: { id: string };
}

interface DeleteAdminRequest {
  Params: { id: string };
}

export const createAdmin = async (
  request: FastifyRequest<CreateAdminRequest>,
  reply: FastifyReply
) => {
  try {
    const adminData = request.body;
    const newAdmin = await AdminService.createAdmin(adminData);
    
    return reply.code(201).send({
      success: true,
      data: newAdmin
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getAdmins = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const admins = await AdminService.getAllAdmins();
    
    return reply.code(200).send({
      success: true,
      data: admins
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const getAdminById = async (
  request: FastifyRequest<GetAdminRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const admin = await AdminService.getAdminById(Number(id));

    if (!admin) {
      return reply.code(404).send({
        success: false,
        message: 'Admin not found'
      });
    }

    return reply.code(200).send({
      success: true,
      data: admin
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const updateAdmin = async (
  request: FastifyRequest<UpdateAdminRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const adminData = request.body;
    
    const updatedAdmin = await AdminService.updateAdmin(Number(id), adminData);

    return reply.code(200).send({
      success: true,
      data: updatedAdmin
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const deleteAdmin = async (
  request: FastifyRequest<DeleteAdminRequest>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await AdminService.deleteAdmin(Number(id));

    return reply.code(200).send({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};
