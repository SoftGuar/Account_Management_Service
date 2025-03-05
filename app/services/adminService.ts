// app/services/adminService.ts
import { AdminModel, CreateAdminInput, UpdateAdminInput } from '../models/admin.model';
import bcrypt from 'bcrypt';

export const AdminService = {
  createAdmin: async (adminData: CreateAdminInput) => {
    // Vérifier si un admin avec cet email existe déjà
    const existingAdmin = await AdminModel.findByEmail(adminData.email);
    
    if (existingAdmin) {
      throw new Error('Admin with this email already exists');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    return AdminModel.create({
      ...adminData,
      password: hashedPassword
    });
  },

  getAdminById: async (id: number) => {
    return AdminModel.findById(id);
  },

  getAllAdmins: async () => {
    return AdminModel.getAll();
  },

  updateAdmin: async (id: number, adminData: UpdateAdminInput) => {
    // If updating password, hash it
    if (adminData.password) {
      adminData.password = await bcrypt.hash(adminData.password, 10);
    }

    return AdminModel.update(id, adminData);
  },

  deleteAdmin: async (id: number) => {
    return AdminModel.delete(id);
  }
};
