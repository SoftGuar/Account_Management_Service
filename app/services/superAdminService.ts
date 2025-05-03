// app/services/superAdminService.ts
import { SuperAdminModel, CreateSuperAdminInput, UpdateSuperAdminInput } from '../models/superAdmin.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const SuperAdminService = {
  createSuperAdmin: async (superAdminData: CreateSuperAdminInput) => {
    try {
      const existingSuperAdmin = await SuperAdminModel.findByEmail(superAdminData.email);
      if (existingSuperAdmin) {
        throw new AccountAlreadyExistsError('SuperAdmin', superAdminData.email);
      }

      const hashedPassword = await bcrypt.hash(superAdminData.password, 10);

      return await SuperAdminModel.create({
        ...superAdminData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('SuperAdmin', { originalError: error });
    }
  },

  getSuperAdminById: async (id: number) => {
    try {
      const superAdmin = await SuperAdminModel.findById(id);
      if (!superAdmin) {
        throw new AccountNotFoundError('SuperAdmin', id);
      }
      return superAdmin;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('SuperAdmin', id, { originalError: error });
    }
  },
};