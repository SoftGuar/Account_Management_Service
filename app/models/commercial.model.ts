import prisma from '../services/prismaService';

export interface CreateCommercialInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
}

export interface UpdateCommercialInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

export const CommercialModel = {
  create: async (commercialData: CreateCommercialInput) => {
    try {
      return await prisma.commercial.create({
        data: commercialData
      });
    } catch (error) {
      console.error('Error creating commercial:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.commercial.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding commercial by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.commercial.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding commercial by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.commercial.findMany();
    } catch (error) {
      console.error('Error getting all commercials:', error);
      throw error;
    }
  },

  update: async (id: number, commercialData: UpdateCommercialInput) => {
    try {
      return await prisma.commercial.update({
        where: { id },
        data: commercialData
      });
    } catch (error) {
      console.error('Error updating commercial:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.commercial.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting commercial:', error);
      throw error;
    }
  }
};
