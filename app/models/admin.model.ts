import prisma from '../services/prismaService';

export interface CreateAdminInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  add_by: number;
  privilege : number;
}

export interface UpdateAdminInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  privilege : number;
  add_by?: number;
}

export const AdminModel = {
  create: async (adminData: CreateAdminInput) => {
    try {
      return await prisma.admin.create({
        data: adminData
      });
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await prisma.admin.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding admin by email:', error);
      throw error;
    }
  },

  findById: async (id: number) => {
    try {
      return await prisma.admin.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error finding admin by ID:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.admin.findMany();
    } catch (error) {
      console.error('Error getting all admins:', error);
      throw error;
    }
  },

  update: async (id: number, adminData: UpdateAdminInput) => {
    try {
      return await prisma.admin.update({
        where: { id },
        data: adminData
      });
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.admin.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }
};
