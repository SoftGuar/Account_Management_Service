// app/services/assistanceService.ts
import { AssistanceModel, CreateAssistanceInput, UpdateAssistanceInput } from '../models/assistance.model';
import bcrypt from 'bcrypt';
import {
  AccountAlreadyExistsError,
  AccountNotFoundError,
  AccountCreationError,
  AccountUpdateError,
  AccountDeletionError,
  AccountFetchError,
} from '../errors/accounts.error';

export const AssistanceService = {
  createAssistance: async (assistanceData: CreateAssistanceInput) => {
    try {
      const existingAssistance = await AssistanceModel.findByEmail(assistanceData.email);
      if (existingAssistance) {
        throw new AccountAlreadyExistsError('Assistance', assistanceData.email);
      }

      const hashedPassword = await bcrypt.hash(assistanceData.password, 10);

      return await AssistanceModel.create({
        ...assistanceData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof AccountAlreadyExistsError) throw error;
      throw new AccountCreationError('Assistance', { originalError: error });
    }
  },
 

  getAllAssistances: async () => {
    try {
      return await AssistanceModel.getAll();
    } catch (error) {
      throw new AccountFetchError('Assistance', undefined, { originalError: error });
    }
  },

};