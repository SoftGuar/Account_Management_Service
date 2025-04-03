// app/services/commercialService.ts
import { CommercialModel, CreateCommercialInput, UpdateCommercialInput } from '../models/commercial.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const CommercialService = {
  createCommercial: async (commercialData: CreateCommercialInput) => {
    try {
      const existingCommercial = await CommercialModel.findByEmail(commercialData.email);
      if (existingCommercial) {
        throw new AccountAlreadyExistsError('Commercial', commercialData.email);
      }

      const hashedPassword = await bcrypt.hash(commercialData.password, 10);

      return await CommercialModel.create({
        ...commercialData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('Commercial', { originalError: error });
    }
  },

  getCommercialById: async (id: number) => {
    try {
      const commercial = await CommercialModel.findById(id);
      if (!commercial) {
        throw new AccountNotFoundError('Commercial', id);
      }
      return commercial;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('Commercial', id, { originalError: error });
    }
  },

  getAllCommercials: async () => {
    try {
      return await CommercialModel.getAll();
    } catch (error) {
      throw new AccountFetchError('Commercial', undefined, { originalError: error });
    }
  },

  updateCommercial: async (id: number, commercialData: UpdateCommercialInput) => {
    try {
      const commercial = await CommercialModel.findById(id);
      if (!commercial) {
        throw new AccountNotFoundError('Commercial', id);
      }

      if (commercialData.password) {
        commercialData.password = await bcrypt.hash(commercialData.password, 10);
      }

      return await CommercialModel.update(id, commercialData);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountUpdateError('Commercial', id, { originalError: error });
    }
  },

  deleteCommercial: async (id: number) => {
    try {
      const commercial = await CommercialModel.findById(id);
      if (!commercial) {
        throw new AccountNotFoundError('Commercial', id);
      }

      return await CommercialModel.delete(id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountDeletionError('Commercial', id, { originalError: error });
    }
  },
};
