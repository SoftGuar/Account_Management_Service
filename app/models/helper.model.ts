import prisma from '../services/prismaService';

export interface CreateHelperInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateHelperInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const HelperModel = {
  create: async (helperData: CreateHelperInput) => {
    try {
      return await prisma.helper.create({
        data: helperData
      });
    } catch (error) {
      console.error('Error creating helper:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.helper.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding helper by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.helper.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding helper by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.helper.findMany();
    } catch (error) {
      console.error('Error getting all helpers:', error);
      throw error;
    }
  },

  update: async (id: number, helperData: UpdateHelperInput) => {
    try {
      return await prisma.helper.update({
        where: { id },
        data: helperData
      });
    } catch (error) {
      console.error('Error updating helper:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.helper.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting helper:', error);
      throw error;
    }
  },
  getHelperUsers : async (helperId: number) => {
    return prisma.helper.findUnique({
      where: { id: helperId },
      select: {
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            created_at:true,
          },
        },
      },
    });
  },

};
