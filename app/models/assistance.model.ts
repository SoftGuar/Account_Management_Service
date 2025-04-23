import prisma from '../services/prismaService';

export interface CreateAssistanceInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateAssistanceInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const AssistanceModel = {
  create: async (assistanceData: CreateAssistanceInput) => {
    try {
      return await prisma.assistance.create({
        data: assistanceData
      });
    } catch (error) {
      console.error('Error creating assistance:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.assistance.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding assistance by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.assistance.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding assistance by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.assistance.findMany();
    } catch (error) {
      console.error('Error getting all assistances:', error);
      throw error;
    }
  },

  update: async (id: number, assistanceData: UpdateAssistanceInput) => {
    try {
      return await prisma.assistance.update({
        where: { id },
        data: assistanceData
      });
    } catch (error) {
      console.error('Error updating assistance:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.assistance.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting assistance:', error);
      throw error;
    }
  },

};
