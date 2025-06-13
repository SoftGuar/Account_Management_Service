import prisma from '../services/prismaService';

export const UserActionService = {
  addAction: async (userId: number, action: string) => {
    return prisma.userAction.create({
      data: { user_id: userId, action },
    });
  },
  getActionsByUserId: async (userId: number) => {
    return prisma.userAction.findMany({
      where: { user_id: userId },
      orderBy: { createdAt: 'desc' }
    });
  },
};