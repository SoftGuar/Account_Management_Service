// app/services/helperService.ts
import { HelperModel, CreateHelperInput, UpdateHelperInput } from '../models/helper.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const HelperService = {
  createHelper: async (helperData: CreateHelperInput) => {
    try {
      const existingHelper = await HelperModel.findByEmail(helperData.email);
      if (existingHelper) {
        throw new AccountAlreadyExistsError('Helper', helperData.email);
      }

      const hashedPassword = await bcrypt.hash(helperData.password, 10);

      return await HelperModel.create({
        ...helperData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('Helper', { originalError: error });
    }
  },

  getHelperById: async (id: number) => {
    try {
      const helper = await HelperModel.findById(id);
      if (!helper) {
        throw new AccountNotFoundError('Helper', id);
      }
      return helper;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('Helper', id, { originalError: error });
    }
  },
    getHelperByEmail: async (email: string) => {
      try {
        const helper = await HelperModel.findByEmail(email);
        if (!helper) {
          throw new AccountNotFoundError('Helper', email);
        }
        return helper;
      } catch (error) {
        if (error instanceof AccountNotFoundError) throw error;
        throw new AccountFetchError('Helper', email, { originalError: error });
      }
    },
  

  getAllHelpers: async () => {
    try {
      return await HelperModel.getAll();
    } catch (error) {
      throw new AccountFetchError('Helper', undefined, { originalError: error });
    }
  },

  updateHelper: async (id: number, helperData: UpdateHelperInput) => {
    try {
      const helper = await HelperModel.findById(id);
      if (!helper) {
        throw new AccountNotFoundError('Helper', id);
      }

      if (helperData.password) {
        helperData.password = await bcrypt.hash(helperData.password, 10);
      }

      return await HelperModel.update(id, helperData);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountUpdateError('Helper', id, { originalError: error });
    }
  },

  deleteHelper: async (id: number) => {
    try {
      const helper = await HelperModel.findById(id);
      if (!helper) {
        throw new AccountNotFoundError('Helper', id);
      }

      return await HelperModel.delete(id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountDeletionError('Helper', id, { originalError: error });
    }
  },
  getHelperUsers: async (helperId: number) => {
      try {
        const result = await HelperModel.getHelperUsers(helperId);
        return result?.users || [];
      } catch (error) {
        throw new AccountFetchError('Helper Users', helperId, { originalError: error });
      }
    },
  
};