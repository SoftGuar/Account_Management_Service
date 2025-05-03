// app/models/superAdmin.model.ts
import prisma from '../services/prismaService';

export interface CreateSuperAdminInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateSuperAdminInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const SuperAdminModel = {
  create: async (superAdminData: CreateSuperAdminInput) => {
    try {
      return await prisma.superAdmin.create({
        data: superAdminData
      });
    } catch (error) {
      console.error('Error creating superAdmin:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.superAdmin.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding superAdmin by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.superAdmin.findUnique({
        where: { id },
        include: {
          admins: true
        }
      });
    } catch (error) {
      console.error('Error finding superAdmin by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.superAdmin.findMany({
        include: {
          admins: true
        }
      });
    } catch (error) {
      console.error('Error getting all superAdmins:', error);
      throw error;
    }
  },

  update: async (id: number, superAdminData: UpdateSuperAdminInput) => {
    try {
      return await prisma.superAdmin.update({
        where: { id },
        data: superAdminData
      });
    } catch (error) {
      console.error('Error updating superAdmin:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.superAdmin.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting superAdmin:', error);
      throw error;
    }
  }
};