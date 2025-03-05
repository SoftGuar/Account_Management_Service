import { DeciderModel, CreateDeciderInput, UpdateDeciderInput } from '../models/decider.model';
import bcrypt from 'bcrypt';

export const DeciderService = {
  createDecider: async (deciderData: CreateDeciderInput) => {
    const existingDecider = await DeciderModel.findByEmail(deciderData.email);
    
    if (existingDecider) {
      throw new Error('Decider with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(deciderData.password, 10);

    return DeciderModel.create({
      ...deciderData,
      password: hashedPassword
    });
  },

  getDeciderById: async (id: number) => {
    return DeciderModel.findById(id);
  },

  getAllDeciders: async () => {
    return DeciderModel.getAll();
  },

  updateDecider: async (id: number, deciderData: UpdateDeciderInput) => {
    // If updating password, hash it
    if (deciderData.password) {
      deciderData.password = await bcrypt.hash(deciderData.password, 10);
    }

    return DeciderModel.update(id, deciderData);
  },

  deleteDecider: async (id: number) => {
    return DeciderModel.delete(id);
  }
};
