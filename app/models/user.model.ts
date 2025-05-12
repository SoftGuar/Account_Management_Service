import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  MAC :string;
}

export interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  MAC ?: string ;
  phone?: string;
}

export interface UserOutput {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null; // Accepter null ou undefined
  MAC:string;
  created_at :Date;
  updated_at :Date;

  helpers?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    created_at :Date;
    updated_at :Date;
  }[];
}

export const UserModel = {
  async create(data: CreateUserInput): Promise<UserOutput> {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        MAC:true,
        created_at :true,
        updated_at:true

      },
    });
    return user;
  },

  async findByEmail(email: string): Promise<UserOutput | null> {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        MAC:true,
        created_at :true,
        updated_at:true
      },
    });
  },

  async findById(id: number): Promise<UserOutput | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        MAC:true,
        created_at :true,
        updated_at:true,
        helpers: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            created_at :true,
            updated_at:true
    
          },
        },
      },
    });
  },

  async getAll(): Promise<UserOutput[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        MAC : true,
        created_at :true,
        updated_at:true,
        helpers: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            created_at :true,
            updated_at:true    
          },
        },
      },
    });
  },

  async update(id: number, data: UpdateUserInput): Promise<UserOutput> {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        MAC : true,
        created_at :true,
        updated_at:true,
      },
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  },

  // Fonctions pour gérer les helpers
  async addHelper(userId: number, helperId: number): Promise<UserOutput> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        helpers: {
          connect: { id: helperId },
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        MAC : true,
        phone: true,
        created_at :true,
        updated_at:true,
        helpers: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            created_at :true,
            updated_at:true
    
          },
        },
      },
    });
  },

  async removeHelper(userId: number, helperId: number): Promise<UserOutput> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        helpers: {
          disconnect: { id: helperId },
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        MAC : true,
        created_at :true,
        updated_at:true,
        helpers: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            created_at :true,
            updated_at:true
    
          },
        },
      },
    });
  },

  async getUserHelpers(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        helpers: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            created_at :true,
            updated_at:true
    
          },
        },
      },
    });
  },
};