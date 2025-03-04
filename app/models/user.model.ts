import prisma from '../services/prismaService';

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
}

export interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

export const UserModel = {
  create: async (userData: CreateUserInput) => {
    try {
      return await prisma.user.create({
        data: userData
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.user.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.user.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  update: async (id: number, userData: UpdateUserInput) => {
    try {
      return await prisma.user.update({
        where: { id },
        data: userData
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};
