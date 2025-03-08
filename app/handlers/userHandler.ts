// app/handlers/userHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';
import { CreateUserInput, UpdateUserInput } from '../models/user.model';

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  try {
    const userData = request.body;
    const newUser = await UserService.createUser(userData);
    
    return reply.code(201).send({
      success: true,
      data: newUser
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await UserService.getAllUsers();
    
    return reply.code(200).send({
      success: true,
      data: users
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const user = await UserService.getUserById(Number(id));

    if (!user) {
      return reply.code(404).send({
        success: false,
        message: 'User not found'
      });
    }

    return reply.code(200).send({
      success: true,
      data: user
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

export const updateUser = async (
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserInput }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const userData = request.body;
    
    const updatedUser = await UserService.updateUser(Number(id), userData);

    return reply.code(200).send({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await UserService.deleteUser(Number(id));

    return reply.code(200).send({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};