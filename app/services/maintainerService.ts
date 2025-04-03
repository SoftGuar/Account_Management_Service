// app/services/maintainerService.ts
import { MaintainerModel, CreateMaintainerInput, UpdateMaintainerInput } from '../models/maintainer.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const MaintainerService = {
  createMaintainer: async (maintainerData: CreateMaintainerInput) => {
    try {
      const existingMaintainer = await MaintainerModel.findByEmail(maintainerData.email);
      if (existingMaintainer) {
        throw new AccountAlreadyExistsError('Maintainer', maintainerData.email);
      }

      const hashedPassword = await bcrypt.hash(maintainerData.password, 10);

      return await MaintainerModel.create({
        ...maintainerData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('Maintainer', { originalError: error });
    }
  },

  getMaintainerById: async (id: number) => {
    try {
      const maintainer = await MaintainerModel.findById(id);
      if (!maintainer) {
        throw new AccountNotFoundError('Maintainer', id);
      }
      return maintainer;
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountFetchError('Maintainer', id, { originalError: error });
    }
  },

  getAllMaintainers: async () => {
    try {
      return await MaintainerModel.getAll();
    } catch (error) {
      throw new AccountFetchError('Maintainer', undefined, { originalError: error });
    }
  },

  updateMaintainer: async (id: number, maintainerData: UpdateMaintainerInput) => {
    try {
      const maintainer = await MaintainerModel.findById(id);
      if (!maintainer) {
        throw new AccountNotFoundError('Maintainer', id);
      }

      if (maintainerData.password) {
        maintainerData.password = await bcrypt.hash(maintainerData.password, 10);
      }

      return await MaintainerModel.update(id, maintainerData);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountUpdateError('Maintainer', id, { originalError: error });
    }
  },

  deleteMaintainer: async (id: number) => {
    try {
      const maintainer = await MaintainerModel.findById(id);
      if (!maintainer) {
        throw new AccountNotFoundError('Maintainer', id);
      }

      return await MaintainerModel.delete(id);
    } catch (error) {
      if (error instanceof AccountNotFoundError) throw error;
      throw new AccountDeletionError('Maintainer', id, { originalError: error });
    }
  },
};