import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';
import { CreateUserInput, UpdateUserInput } from '../models/user.model';
import { AccountNotFoundError } from '../errors/accounts.error';

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const userData = request.body;
  const newUser = await UserService.createUser(userData);

  return reply.code(201).send({
    success: true,
    data: newUser
  });
};

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const users = await UserService.getAllUsers();

  return reply.code(200).send({
    success: true,
    data: users
  });
};

export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const user = await UserService.getUserById(Number(id));
  if (!user) {
    // Throw a custom error that will be caught by your error handler
    throw new AccountNotFoundError('User', id);
  }
  return reply.code(200).send({
    success: true,
    data: user
  });
};

export const updateUser = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const userData = request.body;

  const updatedUser = await UserService.updateUser(Number(id), userData);
  return reply.code(200).send({
    success: true,
    data: updatedUser
  });
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await UserService.deleteUser(Number(id));
  return reply.code(200).send({
    success: true,
    message: 'User deleted successfully'
  });
};

export const getUserHelpers = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const helpers = await UserService.getUserHelpers(Number(id));

  return reply.code(200).send({
    success: true,
    data: helpers
  });
};

export const addHelperToUser = async (
  request: FastifyRequest<{ Params: { id: string, helperId: string } }>,
  reply: FastifyReply
) => {
  const { id, helperId } = request.params;

  const updatedUser = await UserService.addHelperToUser(Number(id), Number(helperId));
  return reply.code(200).send({
    success: true,
    data: updatedUser
  });
};

export const removeHelperFromUser = async (
  request: FastifyRequest<{ Params: { id: string, helperId: string } }>,
  reply: FastifyReply
) => {
  const { id, helperId } = request.params;

  const updatedUser = await UserService.removeHelperFromUser(Number(id), Number(helperId));
  return reply.code(200).send({
    success: true,
    data: updatedUser
  });
};
