import { AdminService } from '../../../app/services/adminService';
import { AdminModel } from '../../../app/models/admin.model';
import bcrypt from 'bcrypt';

jest.mock('../../../app/models/admin.model');
jest.mock('bcrypt');

describe('AdminService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAdmin', () => {
    it('should create an admin when email does not exist', async () => {
      const adminData = {
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin.admin@example.com',
        password: 'securepassword',
        privilege: 4,
        add_by: 1,
        phone: '1234567890'
      };

      (AdminModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (AdminModel.create as jest.Mock).mockResolvedValue({ id: 1, ...adminData, password: 'hashedpassword' });

      const result = await AdminService.createAdmin(adminData);

      expect(AdminModel.findByEmail).toHaveBeenCalledWith(adminData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(adminData.password, 10);
      expect(AdminModel.create).toHaveBeenCalledWith({ ...adminData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 1, ...adminData, password: 'hashedpassword' });
    });

    it('should throw an error if an admin with the same email already exists', async () => {
      const adminData = {
        first_name: 'admin2',
        last_name: 'admin',
        email: 'admin2.admin@example.com',
        password: 'password123',
        privilege: 4,
        add_by: 2
      };

      (AdminModel.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'admin2.admin@example.com' });

      await expect(AdminService.createAdmin(adminData)).rejects.toThrow('Admin with this email already exists');
    });

    it('should create an admin without a phone number', async () => {
      const adminData = {
        first_name: 'admin3',
        last_name: 'admin',
        email: 'admin3.admin@example.com',
        password: 'mypassword',
        privilege: 4,

        add_by: 3
      };

      (AdminModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (AdminModel.create as jest.Mock).mockResolvedValue({ id: 2, ...adminData, password: 'hashedpassword' });

      const result = await AdminService.createAdmin(adminData);

      expect(AdminModel.create).toHaveBeenCalledWith({ ...adminData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 2, ...adminData, password: 'hashedpassword' });
    });
  });

  describe('getAdminById', () => {
    it('should return an admin by ID', async () => {
      const admin = { id: 1, first_name: 'admin', last_name: 'admin', email: 'admin.admin@example.com', password: 'hashedpassword', add_by: 1 };

      (AdminModel.findById as jest.Mock).mockResolvedValue(admin);

      const result = await AdminService.getAdminById(1);

      expect(AdminModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(admin);
    });

    it('should return null when admin is not found', async () => {
      (AdminModel.findById as jest.Mock).mockResolvedValue(null);
      
      const result = await AdminService.getAdminById(999);
      
      expect(AdminModel.findById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  
  });

  describe('getAllAdmins', () => {
    it('should return all admins', async () => {
      const admins = [
        { id: 1, first_name: 'admin', last_name: 'admin', email: 'admin@example.com', password: 'hashedpassword', add_by: 1 },
        { id: 2, first_name: 'admin2', last_name: 'admin', email: 'admin2@example.com', password: 'hashedpassword', add_by: 2 }
      ];
      (AdminModel.getAll as jest.Mock).mockResolvedValue(admins);

      const result = await AdminService.getAllAdmins();

      expect(AdminModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(admins);
    });
  });

  describe('updateAdmin', () => {
    it('should update an admin without changing password', async () => {
      const updateData = { first_name: 'admin Updated', last_name: 'admin Updated' , privilege:2 };
      (AdminModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await AdminService.updateAdmin(1, updateData);

      expect(AdminModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update an admin with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' , privilege: 2 };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (AdminModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await AdminService.updateAdmin(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(AdminModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword', privilege: 2 });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });
  });

  describe('deleteAdmin', () => {
    it('should delete an admin', async () => {
      (AdminModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await AdminService.deleteAdmin(1);

      expect(AdminModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });


      it('should return false when admin deletion fails', async () => {
        (AdminModel.delete as jest.Mock).mockResolvedValue(false);
        
        const result = await AdminService.deleteAdmin(1);
        
        expect(AdminModel.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(false);
      });
    
  });
});
