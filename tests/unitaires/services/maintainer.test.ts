import { MaintainerService } from '../../../app/services/maintainerService';
import { MaintainerModel } from '../../../app/models/maintainer.model';
import bcrypt from 'bcrypt';

jest.mock('../../../app/models/maintainer.model');
jest.mock('bcrypt');

describe('MaintainerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMaintainer', () => {
    it('should create an Maintainer when email does not exist', async () => {
      const MaintainerData = {
        first_name: 'axp',
        last_name: 'axp',
        email: 'axp.axp@example.com',
        password: 'securepassword',
        phone: '1234567890'
      };

      (MaintainerModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (MaintainerModel.create as jest.Mock).mockResolvedValue({ id: 1, ...MaintainerData, password: 'hashedpassword' });

      const result = await MaintainerService.createMaintainer(MaintainerData);

      expect(MaintainerModel.findByEmail).toHaveBeenCalledWith(MaintainerData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(MaintainerData.password, 10);
      expect(MaintainerModel.create).toHaveBeenCalledWith({ ...MaintainerData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 1, ...MaintainerData, password: 'hashedpassword' });
    });

    it('should throw an error if an Maintainer with the same email already exists', async () => {
      const MaintainerData = {
        first_name: 'axpe',
        last_name: 'axp',
        email: 'axpe.axp@example.com',
        password: 'password123',
      };

      (MaintainerModel.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'axpe.axp@example.com' });

      await expect(MaintainerService.createMaintainer(MaintainerData)).rejects.toThrow('Maintainer with this email already exists');
    });

    it('should create an Maintainer without a phone number', async () => {
      const MaintainerData = {
        first_name: 'expp',
        last_name: 'exp2',
        email: 'exp2@example.com',
        password: 'mypassword',
      };

      (MaintainerModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (MaintainerModel.create as jest.Mock).mockResolvedValue({ id: 2, ...MaintainerData, password: 'hashedpassword' });

      const result = await MaintainerService.createMaintainer(MaintainerData);

      expect(MaintainerModel.create).toHaveBeenCalledWith({ ...MaintainerData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 2, ...MaintainerData, password: 'hashedpassword' });
    });
  });

  describe('getMaintainerById', () => {
    it('should return an Maintainer by ID', async () => {
      const Maintainer = { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp.axp@example.com', password: 'hashedpassword' };

      (MaintainerModel.findById as jest.Mock).mockResolvedValue(Maintainer);

      const result = await MaintainerService.getMaintainerById(1);

      expect(MaintainerModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(Maintainer);
    });

    it('should return null when maintainer is not found', async () => {
      (MaintainerModel.findById as jest.Mock).mockResolvedValue(null);
      
      const result = await MaintainerService.getMaintainerById(999);
      
      expect(MaintainerModel.findById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });

  });

  describe('getAllMaintainers', () => {
    it('should return all Maintainers', async () => {
      const Maintainers = [
        { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp@example.com', password: 'hashedpassword'  },
        { id: 2, first_name: 'axpe', last_name: 'axp', email: 'axpe@example.com', password: 'hashedpassword'}
      ];
      (MaintainerModel.getAll as jest.Mock).mockResolvedValue(Maintainers);

      const result = await MaintainerService.getAllMaintainers();

      expect(MaintainerModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(Maintainers);
    });
  });

  describe('updateMaintainer', () => {
    it('should update an Maintainer without changing password', async () => {
      const updateData = { first_name: 'axp Updated', last_name: 'axp Updated' };
      (MaintainerModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await MaintainerService.updateMaintainer(1, updateData);

      expect(MaintainerModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update an Maintainer with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (MaintainerModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await MaintainerService.updateMaintainer(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(MaintainerModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword' });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });
  });

  describe('deleteMaintainer', () => {
    it('should delete an Maintainer', async () => {
      (MaintainerModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await MaintainerService.deleteMaintainer(1);

      expect(MaintainerModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false when maintainer deletion fails', async () => {
      (MaintainerModel.delete as jest.Mock).mockResolvedValue(false);
      
      const result = await MaintainerService.deleteMaintainer(1);
      
      expect(MaintainerModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(false);
    });

  });
});
