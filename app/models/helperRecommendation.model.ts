// models/helperRecommendation.model.ts
import prisma from '../services/prismaService';

export interface CreateHelperRecommendationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  user_id: number;
}

export interface UpdateHelperRecommendationInput {
  first_name?: string;
  last_name?: string;
  email?: string;  
  phone?: string;
  status?: string;
  notes?: string|null;
}

export const HelperRecommendationModel = {
  create: async (data: CreateHelperRecommendationInput) => {
    try {
      return await prisma.helperRecommendation.create({
        data
      });
    } catch (error) {
      console.error('Error creating helper recommendation:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.helperRecommendation.findUnique({
        where: { id },
        include: { user: true }
      });
    } catch (error) {
      console.error('Error finding helper recommendation by ID:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.helperRecommendation.findFirst({
        where: { email, status: 'pending' }
      });
    } catch (error) {
      console.error('Error finding helper recommendation by email:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.helperRecommendation.findMany({
        include: { user: true },
        orderBy: { created_at: 'desc' }
      });
    } catch (error) {
      console.error('Error getting helper recommendations:', error);
      throw error;
    }
  },

  update: async (id: number, data: UpdateHelperRecommendationInput) => {
    try {
      return await prisma.helperRecommendation.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating helper recommendation:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.helperRecommendation.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting helper recommendation:', error);
      throw error;
    }
  },
};