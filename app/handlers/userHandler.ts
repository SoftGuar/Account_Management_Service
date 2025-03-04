// app/handlers/userHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';
import { CreateUserInput } from '../models/user.model';

interface CreateUserRequest {
  Body: CreateUserInput;
}

export const createUser = async (
  request: FastifyRequest<CreateUserRequest>,
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
    if (error instanceof Error) {
      return reply.code(400).send({
        success: false,
        message: error.message
      });
    }
    
    return reply.code(500).send({
      success: false,
      message: 'An unexpected error occurred'
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