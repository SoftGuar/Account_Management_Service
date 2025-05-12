import { DeciderService } from '../../../app/services/deciderService';
import { DeciderModel } from '../../../app/models/decider.model';
import bcrypt from 'bcrypt';

jest.mock('../../../app/models/decider.model');
jest.mock('bcrypt');

describe('DeciderService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDecider', () => {
    it('should create an Decider when email does not exist', async () => {
      const DeciderData = {
        first_name: 'axp',
        last_name: 'axp',
        email: 'axp.axp@example.com',
        password: 'securepassword',
        phone: '1234567890'
      };

      (DeciderModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (DeciderModel.create as jest.Mock).mockResolvedValue({ id: 1, ...DeciderData, password: 'hashedpassword' });

      const result = await DeciderService.createDecider(DeciderData);

      expect(DeciderModel.findByEmail).toHaveBeenCalledWith(DeciderData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(DeciderData.password, 10);
      expect(DeciderModel.create).toHaveBeenCalledWith({ ...DeciderData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 1, ...DeciderData, password: 'hashedpassword' });
    });

    it('should throw an error if an Decider with the same email already exists', async () => {
      const DeciderData = {
        first_name: 'axpe',
        last_name: 'axp',
        email: 'axpe.axp@example.com',
        password: 'password123',
      };

      (DeciderModel.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'axpe.axp@example.com' });

      await expect(DeciderService.createDecider(DeciderData))
      .rejects.toThrow("Decider account with identifier 'axpe.axp@example.com' already exists.");
    
        });

    it('should create an Decider without a phone number', async () => {
      const DeciderData = {
        first_name: 'expp',
        last_name: 'exp2',
        email: 'exp2@example.com',
        password: 'mypassword',
      };

      (DeciderModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (DeciderModel.create as jest.Mock).mockResolvedValue({ id: 2, ...DeciderData, password: 'hashedpassword' });

      const result = await DeciderService.createDecider(DeciderData);

      expect(DeciderModel.create).toHaveBeenCalledWith({ ...DeciderData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 2, ...DeciderData, password: 'hashedpassword' });
    });
  });

  describe('getDeciderById', () => {
    it('should return an Decider by ID', async () => {
      const Decider = { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp.axp@example.com', password: 'hashedpassword' };

      (DeciderModel.findById as jest.Mock).mockResolvedValue(Decider);

      const result = await DeciderService.getDeciderById(1);

      expect(DeciderModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(Decider);
    });

 
  
  });

  describe('getAllDeciders', () => {
    it('should return all Deciders', async () => {
      const Deciders = [
        { id: 1, first_name: 'axp', last_name: 'axp', email: 'axp@example.com', password: 'hashedpassword'  },
        { id: 2, first_name: 'axpe', last_name: 'axp', email: 'axpe@example.com', password: 'hashedpassword'}
      ];
      (DeciderModel.getAll as jest.Mock).mockResolvedValue(Deciders);

      const result = await DeciderService.getAllDeciders();

      expect(DeciderModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(Deciders);
    });
  });

  describe('updateDecider', () => {
    it('should update an Decider without changing password', async () => {
      const updateData = { first_name: 'axp Updated', last_name: 'axp Updated' };
      (DeciderModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await DeciderService.updateDecider(1, updateData);

      expect(DeciderModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update an Decider with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (DeciderModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await DeciderService.updateDecider(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(DeciderModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword' });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });
  });

  describe('deleteDecider', () => {
    it('should delete an Decider', async () => {
      (DeciderModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await DeciderService.deleteDecider(1);

      expect(DeciderModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false when decider deletion fails', async () => {
      (DeciderModel.delete as jest.Mock).mockResolvedValue(false);
      
      const result = await DeciderService.deleteDecider(1);
      
      expect(DeciderModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(false);
    });
  
  });
});
