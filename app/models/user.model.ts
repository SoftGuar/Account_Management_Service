import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient with debug logs to help troubleshoot connection issues
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
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
  }
};