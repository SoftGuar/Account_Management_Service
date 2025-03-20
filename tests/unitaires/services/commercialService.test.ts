import { CommercialService } from '../../../app/services/commercialService';
import { CommercialModel } from '../../../app/models/commercial.model';
import bcrypt from 'bcrypt';

jest.mock('../../../app/models/commercial.model');
jest.mock('bcrypt');

describe('CommercialService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCommercial', () => {
    it('should create an Commercial when email does not exist', async () => {
      const CommercialData = {
        first_name: 'axp',
        last_name: 'axp',
        email: 'axp.axp@example.com',
        password: 'securepassword',
        phone: '1234567890'
      };

      (CommercialModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (CommercialModel.create as jest.Mock).mockResolvedValue({ id: 1, ...CommercialData, password: 'hashedpassword' });

      const result = await CommercialService.createCommercial(CommercialData);

      expect(CommercialModel.findByEmail).toHaveBeenCalledWith(CommercialData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(CommercialData.password, 10);
      expect(CommercialModel.create).toHaveBeenCalledWith({ ...CommercialData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 1, ...CommercialData, password: 'hashedpassword' });
    });

    it('should throw an error if an Commercial with the same email already exists', async () => {
      const CommercialData = {
        first_name: 'axpe',
        last_name: 'axp',
        email: 'axpe.axp@example.com',
        password: 'password123',
      };

      (CommercialModel.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'axpe.axp@example.com' });

      await expect(CommercialService.createCommercial(CommercialData)).rejects.toThrow('Commercial with this email already exists');
    });

    it('should create an Commercial without a phone number', async () => {
      const CommercialData = {
        first_name: 'expp',
        last_name: 'exp2',
        email: 'exp2@example.com',
        password: 'mypassword',
      };

      (CommercialModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (CommercialModel.create as jest.Mock).mockResolvedValue({ id: 2, ...CommercialData, password: 'hashedpassword' });

      const result = await CommercialService.createCommercial(CommercialData);

      expect(CommercialModel.create).toHaveBeenCalledWith({ ...CommercialData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 2, ...CommercialData, password: 'hashedpassword' });
    });
  });

  describe('getCommercialById', () => {
    it('should return an Commercial by ID', async () => {
      const Commercial = { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp.axp@example.com', password: 'hashedpassword' };

      (CommercialModel.findById as jest.Mock).mockResolvedValue(Commercial);

      const result = await CommercialService.getCommercialById(1);

      expect(CommercialModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(Commercial);
    });
    it('should return null when commercial is not found', async () => {
      (CommercialModel.findById as jest.Mock).mockResolvedValue(null);
      
      const result = await CommercialService.getCommercialById(999);
      
      expect(CommercialModel.findById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  
  });

  describe('getAllCommercials', () => {
    it('should return all Commercials', async () => {
      const Commercials = [
        { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp@example.com', password: 'hashedpassword'  },
        { id: 2, first_name: 'axpe', last_name: 'axp', email: 'axpe@example.com', password: 'hashedpassword'}
      ];
      (CommercialModel.getAll as jest.Mock).mockResolvedValue(Commercials);

      const result = await CommercialService.getAllCommercials();

      expect(CommercialModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(Commercials);
    });
  });

  describe('updateCommercial', () => {
    it('should update an Commercial without changing password', async () => {
      const updateData = { first_name: 'axp Updated', last_name: 'axp Updated' };
      (CommercialModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await CommercialService.updateCommercial(1, updateData);

      expect(CommercialModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update an Commercial with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (CommercialModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await CommercialService.updateCommercial(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(CommercialModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword' });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });
  });

  describe('deleteCommercial', () => {
    it('should delete an Commercial', async () => {
      (CommercialModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await CommercialService.deleteCommercial(1);

      expect(CommercialModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
    it('should return false when commercial deletion fails', async () => {
      (CommercialModel.delete as jest.Mock).mockResolvedValue(false);
      
      const result = await CommercialService.deleteCommercial(1);
      
      expect(CommercialModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(false);
    });
  
  });
});
