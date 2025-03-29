// app/services/userService.ts
import { UserModel, CreateUserInput, UpdateUserInput } from '../models/user.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const UserService = {
  createUser: async (userData: CreateUserInput) => {
    try {
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) {
        throw new AccountAlreadyExistsError('User', userData.email);
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      return await UserModel.create({
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('User', { originalError: error });
    }
  },

  getUserById: async (id: number) => {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new AccountNotFoundError('User', id);
      }
      return user;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('User', id, { originalError: error });
    }
  },

  getAllUsers: async () => {
    try {
      return await UserModel.getAll();
    } catch (error) {
      throw new AccountFetchError('User', undefined, { originalError: error });
    }
  },

  updateUser: async (id: number, userData: UpdateUserInput) => {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new AccountNotFoundError('User', id);
      }

      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      return await UserModel.update(id, userData);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountUpdateError('User', id, { originalError: error });
    }
  },

  deleteUser: async (id: number) => {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new AccountNotFoundError('User', id);
      }

      return await UserModel.delete(id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountDeletionError('User', id, { originalError: error });
    }
  },

  addHelperToUser: async (userId: number, helperId: number) => {
    try {
      return await UserModel.addHelper(userId, helperId);
    } catch (error) {
      throw new AccountUpdateError('User', userId, { originalError: error, helperId });
    }
  },

  removeHelperFromUser: async (userId: number, helperId: number) => {
    try {
      return await UserModel.removeHelper(userId, helperId);
    } catch (error) {
      throw new AccountUpdateError('User', userId, { originalError: error, helperId });
    }
  },

  getUserHelpers: async (userId: number) => {
    try {
      const result = await UserModel.getUserHelpers(userId);
      return result?.helpers || [];
    } catch (error) {
      throw new AccountFetchError('User Helpers', userId, { originalError: error });
    }
  },
};
