import { HelperService } from '../../../app/services/helperService';
import { HelperModel } from '../../../app/models/helper.model';
import bcrypt from 'bcrypt';

jest.mock('../../../app/models/Helper.model');
jest.mock('bcrypt');

describe('HelperService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHelper', () => {
    it('should create an Helper when email not exist', async () => {
      const HelperData = {
        first_name: 'axp',
        last_name: 'axp',
        email: 'axp.axp@example.com',
        password: 'securepassword',
        phone: '1234567890'
      };

      (HelperModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (HelperModel.create as jest.Mock).mockResolvedValue({ id: 1, ...HelperData, password: 'hashedpassword' });

      const result = await HelperService.createHelper(HelperData);

      expect(HelperModel.findByEmail).toHaveBeenCalledWith(HelperData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(HelperData.password, 10);
      expect(HelperModel.create).toHaveBeenCalledWith({ ...HelperData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 1, ...HelperData, password: 'hashedpassword' });
    });

    it('should throw an error if an Helper with the same email already exists', async () => {
      const HelperData = {
        first_name: 'axpe',
        last_name: 'axp',
        email: 'axpe.axp@example.com',
        password: 'password123',
      };

      (HelperModel.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'axpe.axp@example.com' });

      await expect(HelperService.createHelper(HelperData)).rejects.toThrow('Helper with this email already exists');
    });

    it('should create an Helper without a phone number', async () => {
      const HelperData = {
        first_name: 'expp',
        last_name: 'exp2',
        email: 'exp2@example.com',
        password: 'mypassword',
      };

      (HelperModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (HelperModel.create as jest.Mock).mockResolvedValue({ id: 2, ...HelperData, password: 'hashedpassword' });

      const result = await HelperService.createHelper(HelperData);

      expect(HelperModel.create).toHaveBeenCalledWith({ ...HelperData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 2, ...HelperData, password: 'hashedpassword' });
    });
  });

  describe('getHelperById', () => {
    it('should return an Helper by ID', async () => {
      const Helper = { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp.axp@example.com', password: 'hashedpassword' };

      (HelperModel.findById as jest.Mock).mockResolvedValue(Helper);

      const result = await HelperService.getHelperById(1);

      expect(HelperModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(Helper);
    });
  });

  describe('getAllHelpers', () => {
    it('should return all Helpers', async () => {
      const Helpers = [
        { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp@example.com', password: 'hashedpassword'  },
        { id: 2, first_name: 'axpe', last_name: 'axp', email: 'axpe@example.com', password: 'hashedpassword'}
      ];
      (HelperModel.getAll as jest.Mock).mockResolvedValue(Helpers);

      const result = await HelperService.getAllHelpers();

      expect(HelperModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(Helpers);
    });
  });

  describe('updateHelper', () => {
    it('should update an Helper without changing password', async () => {
      const updateData = { first_name: 'axp Updated', last_name: 'axp Updated' };
      (HelperModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await HelperService.updateHelper(1, updateData);

      expect(HelperModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update an Helper with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (HelperModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await HelperService.updateHelper(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(HelperModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword' });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });
  });

  describe('deleteHelper', () => {
    it('should delete an Helper', async () => {
      (HelperModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await HelperService.deleteHelper(1);

      expect(HelperModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
