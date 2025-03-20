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
    it('should create an user when email does not exist', async () => {
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

    it('should throw an error if an user with the same email already exists', async () => {
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

    it('should create an user without a phone number', async () => {
      const userData = {
        first_name: 'exp',
        last_name: 'exp',
        email: 'exmp@example.com',
        password: 'securepassword',
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (UserModel.create as jest.Mock).mockResolvedValue({ id: 2, ...userData, password: 'hashedpassword' });

      const result = await UserService.createUser(userData);

      expect(UserModel.create).toHaveBeenCalledWith({ ...userData, password: 'hashedpassword' });
      expect(result).toEqual({ id: 2, ...userData, password: 'hashedpassword' });
    });
  });

  describe('getuserById', () => {
    it('should return an user by ID', async () => {
      const user = { id: 1, first_name: 'exp', last_name: 'exp', email: 'exp@example.com', password: 'hashedpassword' };

      (UserModel.findById as jest.Mock).mockResolvedValue(user);

      const result = await UserService.getUserById(1);

      expect(UserModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });
  });

  describe('getAllusers', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, first_name: 'exp', last_name: 'exp', email: 'exp@example.com', password: 'hashedpassword' },
        { id: 2, first_name: 'exp', last_name: 'Doe', email: 'exp2@example.com', password: 'hashedpassword' }
      ];
      (UserModel.getAll as jest.Mock).mockResolvedValue(users);

      const result = await UserService.getAllUsers();

      expect(UserModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('updateuser', () => {
    it('should update an user without changing password', async () => {
      const updateData = { first_name: 'exp Updated', last_name: 'exp Updated' };
      (UserModel.update as jest.Mock).mockResolvedValue({ id: 1, ...updateData });

      const result = await UserService.updateUser(1, updateData);

      expect(UserModel.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should update an user with a new hashed password', async () => {
      const updateData = { password: 'newpassword123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      (UserModel.update as jest.Mock).mockResolvedValue({ id: 1, password: 'newhashedpassword' });

      const result = await UserService.updateUser(1, updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(UserModel.update).toHaveBeenCalledWith(1, { password: 'newhashedpassword' });
      expect(result).toEqual({ id: 1, password: 'newhashedpassword' });
    });
  });

  describe('deleteuser', () => {
    it('should delete an user', async () => {
      (UserModel.delete as jest.Mock).mockResolvedValue(true);

      const result = await UserService.deleteUser(1);

      expect(UserModel.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
