import { MaintainerModel, CreateMaintainerInput, UpdateMaintainerInput } from '../models/maintainer.model';
import bcrypt from 'bcrypt';

export const MaintainerService = {
  createMaintainer: async (maintainerData: CreateMaintainerInput) => {
    const existingMaintainer = await MaintainerModel.findByEmail(maintainerData.email);
    
    if (existingMaintainer) {
      throw new Error('Maintainer with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(maintainerData.password, 10);

    return MaintainerModel.create({
      ...maintainerData,
      password: hashedPassword
    });
  },

  getMaintainerById: async (id: number) => {
    return MaintainerModel.findById(id);
  },

  getAllMaintainers: async () => {
    return MaintainerModel.getAll();
  },

  updateMaintainer: async (id: number, maintainerData: UpdateMaintainerInput) => {
    // If updating password, hash it
    if (maintainerData.password) {
      maintainerData.password = await bcrypt.hash(maintainerData.password, 10);
    }

    return MaintainerModel.update(id, maintainerData);
  },

  deleteMaintainer: async (id: number) => {
    return MaintainerModel.delete(id);
  }
};
