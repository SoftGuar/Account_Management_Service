import { UserService } from '../../../app/services/userService';
import { UserModel } from '../../../app/models/user.model';
import bcrypt from 'bcrypt';

jest.mock('../../../app/models/user.model');
jest.mock('bcrypt');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user when email does not exist', async () => {
      const userData = {
        first_name: 'exp',
        last_name: 'exp',
        email: 'exmp@example.com',
        password: 'securepassword',
        phone: '1234567890'
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (UserModel.create as jest.Mock).mockResolvedValue({ id: 1, ...userData, password: 'hashedpassword' });

      const result = await UserService.createUser(userData);

      expect(UserModel.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(UserModel.create).toHaveBeenCalledWith({ ...userData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 1, ...userData, password: 'hashedpassword' });
    });

    it('should throw an error if a user with the same email already exists', async () => {
      const userData = {
        first_name: 'exp',
        last_name: 'exp',
        email: 'exmp@example.com',
        password: 'securepassword',
        phone: '1234567890'
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email: 'exmp@example.com' });

      await expect(UserService.createUser(userData)).rejects.toThrow('User with this email already exists');
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, first_name: 'exp', last_name: 'exp', email: 'exp@example.com', password: 'hashedpassword' };

      (UserModel.findById as jest.Mock).mockResolvedValue(user);

      const result = await UserService.getUserById(1);

      expect(UserModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await UserService.getUserById(99);

      expect(UserModel.findById).toHaveBeenCalledWith(99);
      expect(result).toBeNull();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, first_name: 'exp', last_name: 'exp', email: 'exp@example.com', password: 'hashedpassword' },
        { id: 2, first_name: 'exp', last_name: 'exp', email: 'exp2@example.com', password: 'hashedpassword' }
      ];
      (UserModel.getAll as jest.Mock).mockResolvedValue(users);

      const result = await UserService.getAllUsers();

      expect(UserModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('updateUser', () => {
    it('should update a user without changing password', async () => {
      const updateData = { first_name: 'exp Updated', last_name: 'exp Updated' };
      (UserModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await UserService.updateUser(1, updateData);

      expect(UserModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update a user with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (UserModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await UserService.updateUser(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(UserModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword' });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });

    it('should return null if user does not exist', async () => {
      (UserModel.update as jest.Mock).mockResolvedValue(null);

      const result = await UserService.updateUser(99, { first_name: 'No User' });

      expect(UserModel.update).toHaveBeenCalledWith(99, { first_name: 'No User' });
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      (UserModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await UserService.deleteUser(1);

      expect(UserModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false if user does not exist', async () => {
      (UserModel.delete as jest.Mock).mockResolvedValue(false);

      const result = await UserService.deleteUser(99);

      expect(UserModel.delete).toHaveBeenCalledWith(99);
      expect(result).toBe(false);
    });
  });

  describe('addHelperToUser', () => {
    it('should add a helper to a user', async () => {
      (UserModel.addHelper as jest.Mock).mockResolvedValue(true);

      const result = await UserService.addHelperToUser(1, 2);

      expect(UserModel.addHelper).toHaveBeenCalledWith(1, 2);
      expect(result).toBe(true);
    });
  });

  describe('removeHelperFromUser', () => {
    it('should remove a helper from a user', async () => {
      (UserModel.removeHelper as jest.Mock).mockResolvedValue(true);

      const result = await UserService.removeHelperFromUser(1, 2);

      expect(UserModel.removeHelper).toHaveBeenCalledWith(1, 2);
      expect(result).toBe(true);
    });
  });

  describe('getUserHelpers', () => {
    it('should return all helpers for a user', async () => {
      const helpers = [
        { id: 2, first_name: 'Helper1', last_name: 'One' },
        { id: 3, first_name: 'Helper2', last_name: 'Two' }
      ];
      
      (UserModel.getUserHelpers as jest.Mock).mockResolvedValue({ helpers });

      const result = await UserService.getUserHelpers(1);

      expect(UserModel.getUserHelpers).toHaveBeenCalledWith(1);
      expect(result).toEqual(helpers);
    });

    it('should return empty array if user has no helpers or user not found', async () => {
      (UserModel.getUserHelpers as jest.Mock).mockResolvedValue(null);

      const result = await UserService.getUserHelpers(1);

      expect(UserModel.getUserHelpers).toHaveBeenCalledWith(1);
      expect(result).toEqual([]);
    });
  });
});