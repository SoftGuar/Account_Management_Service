// app/services/adminService.ts
import { AdminModel, CreateAdminInput, UpdateAdminInput } from '../models/admin.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const AdminService = {
  createAdmin: async (adminData: CreateAdminInput) => {
    try {
      const existingAdmin = await AdminModel.findByEmail(adminData.email);
      if (existingAdmin) {
        throw new AccountAlreadyExistsError('Admin', adminData.email);
      }

      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      return await AdminModel.create({
        ...adminData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('Admin', { originalError: error });
    }
  },

  getAdminById: async (id: number) => {
    try {
      const admin = await AdminModel.findById(id);
      if (!admin) {
        throw new AccountNotFoundError('Admin', id);
      }
      return admin;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('Admin', id, { originalError: error });
    }
  },

  getAllAdmins: async () => {
    try {
      return await AdminModel.getAll();
    } catch (error) {
      throw new AccountFetchError('Admin', undefined, { originalError: error });
    }
  },

  updateAdmin: async (id: number, adminData: UpdateAdminInput) => {
    try {
      const admin = await AdminModel.findById(id);
      if (!admin) {
        throw new AccountNotFoundError('Admin', id);
      }

      if (adminData.password) {
        adminData.password = await bcrypt.hash(adminData.password, 10);
      }

      return await AdminModel.update(id, adminData);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountUpdateError('Admin', id, { originalError: error });
    }
  },

  deleteAdmin: async (id: number) => {
    try {
      const admin = await AdminModel.findById(id);
      if (!admin) {
        throw new AccountNotFoundError('Admin', id);
      }

      return await AdminModel.delete(id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountDeletionError('Admin', id, { originalError: error });
    }
  },
};