import prisma from '../services/prismaService';

export interface CreateMaintainerInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateMaintainerInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const MaintainerModel = {
  create: async (maintainerData: CreateMaintainerInput) => {
    try {
      return await prisma.maintainer.create({
        data: maintainerData
      });
    } catch (error) {
      console.error('Error creating maintainer:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.maintainer.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding maintainer by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.maintainer.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding maintainer by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.maintainer.findMany();
    } catch (error) {
      console.error('Error getting all maintainers:', error);
      throw error;
    }
  },

  update: async (id: number, maintainerData: UpdateMaintainerInput) => {
    try {
      return await prisma.maintainer.update({
        where: { id },
        data: maintainerData
      });
    } catch (error) {
      console.error('Error updating maintainer:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.maintainer.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting maintainer:', error);
      throw error;
    }
  }
};
