import prisma from '../services/prismaService';

export interface CreateDeciderInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
}

export interface UpdateDeciderInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

export const DeciderModel = {
  create: async (deciderData: CreateDeciderInput) => {
    try {
      return await prisma.decider.create({
        data: deciderData
      });
    } catch (error) {
      console.error('Error creating decider:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.decider.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding decider by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.decider.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding decider by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.decider.findMany();
    } catch (error) {
      console.error('Error getting all deciders:', error);
      throw error;
    }
  },

  update: async (id: number, deciderData: UpdateDeciderInput) => {
    try {
      return await prisma.decider.update({
        where: { id },
        data: deciderData
      });
    } catch (error) {
      console.error('Error updating decider:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.decider.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting decider:', error);
      throw error;
    }
  }
};
