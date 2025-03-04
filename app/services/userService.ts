// app/services/userService.ts
import { UserModel, CreateUserInput, UpdateUserInput } from '../models/user.model';
import bcrypt from 'bcrypt';

export const UserService = {
  createUser: async (userData: CreateUserInput) => {
    // Check if user with this email already exists
    const existingUser = await UserModel.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return UserModel.create({
      ...userData,
      password: hashedPassword
    });
  },

  getUserById: async (id: number) => {
    return UserModel.findById(id);
  },

  getAllUsers: async () => {
    return UserModel.getAll();
  },

  updateUser: async (id: number, userData: UpdateUserInput) => {
    // If updating password, hash it
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return UserModel.update(id, userData);
  },

  deleteUser: async (id: number) => {
    return UserModel.delete(id);
  }
};
