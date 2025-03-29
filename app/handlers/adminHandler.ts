// app/handlers/adminHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../services/adminService';
import { CreateAdminInput, UpdateAdminInput } from '../models/admin.model';

export const createAdmin = async (
  request: FastifyRequest<{ Body: CreateAdminInput }>,
  reply: FastifyReply
) => {
  const adminData = request.body;
  const newAdmin = await AdminService.createAdmin(adminData);

  return reply.code(201).send({ success: true, data: newAdmin });
};

export const getAdmins = async (request: FastifyRequest, reply: FastifyReply) => {
  const admins = await AdminService.getAllAdmins();
  return reply.code(200).send({ success: true, data: admins });
};

export const getAdminById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const admin = await AdminService.getAdminById(Number(id));

  return reply.code(200).send({ success: true, data: admin });
};

export const updateAdmin = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateAdminInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const adminData = request.body;

  const updatedAdmin = await AdminService.updateAdmin(Number(id), adminData);
  return reply.code(200).send({ success: true, data: updatedAdmin });
};

export const deleteAdmin = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await AdminService.deleteAdmin(Number(id));

  return reply.code(200).send({ success: true, message: 'Admin deleted successfully' });
};
