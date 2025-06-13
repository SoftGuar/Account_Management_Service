import prisma from '../services/prismaService';

export const UserActionService = {
  addAction: async (userId: number, action: string) => {
    return prisma.userAction.create({
      data: { user_id: userId, action },
    });
  },
};