import { CommercialModel, CreateCommercialInput, UpdateCommercialInput } from '../models/commercial.model';
import bcrypt from 'bcrypt';

export const CommercialService = {
  createCommercial: async (commercialData: CreateCommercialInput) => {
    const existingCommercial = await CommercialModel.findByEmail(commercialData.email);
    
    if (existingCommercial) {
      throw new Error('Commercial with this email already exists');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(commercialData.password, 10);

    return CommercialModel.create({
      ...commercialData,
      password: hashedPassword
    });
  },

  getCommercialById: async (id: number) => {
    return CommercialModel.findById(id);
  },

  getAllCommercials: async () => {
    return CommercialModel.getAll();
  },

  updateCommercial: async (id: number, commercialData: UpdateCommercialInput) => {
    if (commercialData.password) {
      commercialData.password = await bcrypt.hash(commercialData.password, 10);
    }

    return CommercialModel.update(id, commercialData);
  },

  deleteCommercial: async (id: number) => {
    return CommercialModel.delete(id);
  }
};
