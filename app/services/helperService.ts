
import { HelperModel, CreateHelperInput, UpdateHelperInput } from '../models/helper.model';
import bcrypt from 'bcrypt';

export const HelperService = {
  createHelper: async (helperData: CreateHelperInput) => {
    // Check if a helper with this email already exists
    const existingHelper = await HelperModel.findByEmail(helperData.email);

    if (existingHelper) {
      throw new Error('Helper with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(helperData.password, 10);

    return HelperModel.create({
      ...helperData,
      password: hashedPassword
    });
  },

  getHelperById: async (id: number) => {
    return HelperModel.findById(id);
  },

  getAllHelpers: async () => {
    return HelperModel.getAll();
  },

  updateHelper: async (id: number, helperData: UpdateHelperInput) => {
    // If updating password, hash it
    if (helperData.password) {
      helperData.password = await bcrypt.hash(helperData.password, 10);
    }

    return HelperModel.update(id, helperData);
  },

  deleteHelper: async (id: number) => {
    return HelperModel.delete(id);
  }
};
