import { DeciderModel, CreateDeciderInput, UpdateDeciderInput } from '../models/decider.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const DeciderService = {
  createDecider: async (deciderData: CreateDeciderInput) => {
    try {
      const existingDecider = await DeciderModel.findByEmail(deciderData.email);
      if (existingDecider) {
        throw new AccountAlreadyExistsError('Decider', deciderData.email);
      }

      const hashedPassword = await bcrypt.hash(deciderData.password, 10);

      return await DeciderModel.create({
        ...deciderData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('Decider', { originalError: error });
    }
  },

  getDeciderById: async (id: number) => {
    try {
      const decider = await DeciderModel.findById(id);
      if (!decider) {
        throw new AccountNotFoundError('Decider', id);
      }
      return decider;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('Decider', id, { originalError: error });
    }
  },

  getAllDeciders: async () => {
    try {
      return await DeciderModel.getAll();
    } catch (error) {
      throw new AccountFetchError('Decider', undefined, { originalError: error });
    }
  },

  updateDecider: async (id: number, deciderData: UpdateDeciderInput) => {
    try {
      const decider = await DeciderModel.findById(id);
      if (!decider) {
        throw new AccountNotFoundError('Decider', id);
      }

      if (deciderData.password) {
        deciderData.password = await bcrypt.hash(deciderData.password, 10);
      }

      return await DeciderModel.update(id, deciderData);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountUpdateError('Decider', id, { originalError: error });
    }
  },

  deleteDecider: async (id: number) => {
    try {
      const decider = await DeciderModel.findById(id);
      if (!decider) {
        throw new AccountNotFoundError('Decider', id);
      }

      return await DeciderModel.delete(id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountDeletionError('Decider', id, { originalError: error });
    }
  },
};
