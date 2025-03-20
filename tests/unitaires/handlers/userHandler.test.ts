// tests/unit/handlers/userHandler.test.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import * as UserHandler from '../../../app/handlers/userHandler';
import { UserService } from '../../../app/services/userService';

// Mock de UserService
jest.mock('../../../app/services/userService', () => ({
  UserService: {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserHelpers: jest.fn(),
    addHelperToUser: jest.fn(),
    removeHelperFromUser: jest.fn()
  }
}));

describe('UserHandler', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;
  
  beforeEach(() => {
    // Réinitialiser tous les mocks
    jest.clearAllMocks();
    
    // Créer des mocks pour request et reply
    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });
  
  describe('createUser', () => {
    it('should create a user and return 201 status code', async () => {
      // Arrange
      const userData = { name: 'Test User', email: 'test@example.com' };
      const newUser = { id: 1, ...userData };
      
      mockRequest = {
        body: userData
      };
      
      (UserService.createUser as jest.Mock).mockResolvedValue(newUser);
      
      // Act
      await UserHandler.createUser(
        mockRequest as FastifyRequest<{ Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.createUser).toHaveBeenCalledWith(userData);
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: newUser
      });
    });
    
    it('should return 400 status code when service throws an error', async () => {
      // Arrange
      const userData = { name: 'Test User', email: 'test@example.com' };
      const error = new Error('Invalid data');
      
      mockRequest = {
        body: userData
      };
      
      (UserService.createUser as jest.Mock).mockRejectedValue(error);
      
      // Act
      await UserHandler.createUser(
        mockRequest as FastifyRequest<{ Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.createUser).toHaveBeenCalledWith(userData);
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid data'
      });
    });
  });
  
  describe('getUsers', () => {
    it('should return all users with 200 status code', async () => {
      // Arrange
      const users = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' }
      ];
      
      (UserService.getAllUsers as jest.Mock).mockResolvedValue(users);
      
      // Act
      await UserHandler.getUsers(
        mockRequest as FastifyRequest, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getAllUsers).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: users
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      (UserService.getAllUsers as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await UserHandler.getUsers(
        mockRequest as FastifyRequest, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getAllUsers).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
  
  describe('getUserById', () => {
    it('should return user by id with 200 status code', async () => {
      // Arrange
      const userId = 1;
      const user = { id: userId, name: 'Test User', email: 'test@example.com' };
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.getUserById as jest.Mock).mockResolvedValue(user);
      
      // Act
      await UserHandler.getUserById(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getUserById).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: user
      });
    });
    
    it('should return 404 status code when user is not found', async () => {
      // Arrange
      const userId = 999;
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.getUserById as jest.Mock).mockResolvedValue(null);
      
      // Act
      await UserHandler.getUserById(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getUserById).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'User not found'
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      const userId = 1;
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.getUserById as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await UserHandler.getUserById(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getUserById).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
  
  describe('updateUser', () => {
    it('should update user and return 200 status code', async () => {
      // Arrange
      const userId = 1;
      const userData = { name: 'Updated User' };
      const updatedUser = { id: userId, name: 'Updated User', email: 'test@example.com' };
      
      mockRequest = {
        params: { id: userId.toString() },
        body: userData
      };
      
      (UserService.updateUser as jest.Mock).mockResolvedValue(updatedUser);
      
      // Act
      await UserHandler.updateUser(
        mockRequest as FastifyRequest<{ Params: { id: string }, Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.updateUser).toHaveBeenCalledWith(userId, userData);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: updatedUser
      });
    });
    
    it('should return 400 status code when service throws an error', async () => {
      // Arrange
      const userId = 1;
      const userData = { name: 'Updated User' };
      const error = new Error('Invalid data');
      
      mockRequest = {
        params: { id: userId.toString() },
        body: userData
      };
      
      (UserService.updateUser as jest.Mock).mockRejectedValue(error);
      
      // Act
      await UserHandler.updateUser(
        mockRequest as FastifyRequest<{ Params: { id: string }, Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.updateUser).toHaveBeenCalledWith(userId, userData);
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid data'
      });
    });
  });
  
  describe('deleteUser', () => {
    it('should delete user and return 200 status code', async () => {
      // Arrange
      const userId = 1;
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.deleteUser as jest.Mock).mockResolvedValue(undefined);
      
      // Act
      await UserHandler.deleteUser(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.deleteUser).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        message: 'User deleted successfully'
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      const userId = 1;
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.deleteUser as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await UserHandler.deleteUser(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.deleteUser).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
  
  describe('getUserHelpers', () => {
    it('should return user helpers with 200 status code', async () => {
      // Arrange
      const userId = 1;
      const helpers = [
        { id: 2, name: 'Helper 1' },
        { id: 3, name: 'Helper 2' }
      ];
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.getUserHelpers as jest.Mock).mockResolvedValue(helpers);
      
      // Act
      await UserHandler.getUserHelpers(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getUserHelpers).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: helpers
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      const userId = 1;
      
      mockRequest = {
        params: { id: userId.toString() }
      };
      
      (UserService.getUserHelpers as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await UserHandler.getUserHelpers(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.getUserHelpers).toHaveBeenCalledWith(userId);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
  
  describe('addHelperToUser', () => {
    it('should add helper to user and return 200 status code', async () => {
      // Arrange
      const userId = 1;
      const helperId = 2;
      const updatedUser = { 
        id: userId, 
        name: 'Test User', 
        helpers: [{ id: helperId, name: 'Helper User' }]
      };
      
      mockRequest = {
        params: { 
          id: userId.toString(),
          helperId: helperId.toString()
        }
      };
      
      (UserService.addHelperToUser as jest.Mock).mockResolvedValue(updatedUser);
      
      // Act
      await UserHandler.addHelperToUser(
        mockRequest as FastifyRequest<{ Params: { id: string, helperId: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.addHelperToUser).toHaveBeenCalledWith(userId, helperId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: updatedUser
      });
    });
    
    it('should return 400 status code when service throws an error', async () => {
      // Arrange
      const userId = 1;
      const helperId = 2;
      const error = new Error('Helper already assigned');
      
      mockRequest = {
        params: { 
          id: userId.toString(),
          helperId: helperId.toString()
        }
      };
      
      (UserService.addHelperToUser as jest.Mock).mockRejectedValue(error);
      
      // Act
      await UserHandler.addHelperToUser(
        mockRequest as FastifyRequest<{ Params: { id: string, helperId: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.addHelperToUser).toHaveBeenCalledWith(userId, helperId);
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Helper already assigned'
      });
    });
  });
  
  describe('removeHelperFromUser', () => {
    it('should remove helper from user and return 200 status code', async () => {
      // Arrange
      const userId = 1;
      const helperId = 2;
      const updatedUser = { 
        id: userId, 
        name: 'Test User', 
        helpers: []
      };
      
      mockRequest = {
        params: { 
          id: userId.toString(),
          helperId: helperId.toString()
        }
      };
      
      (UserService.removeHelperFromUser as jest.Mock).mockResolvedValue(updatedUser);
      
      // Act
      await UserHandler.removeHelperFromUser(
        mockRequest as FastifyRequest<{ Params: { id: string, helperId: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.removeHelperFromUser).toHaveBeenCalledWith(userId, helperId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: updatedUser
      });
    });
    
    it('should return 400 status code when service throws an error', async () => {
      // Arrange
      const userId = 1;
      const helperId = 2;
      const error = new Error('Helper not assigned to user');
      
      mockRequest = {
        params: { 
          id: userId.toString(),
          helperId: helperId.toString()
        }
      };
      
      (UserService.removeHelperFromUser as jest.Mock).mockRejectedValue(error);
      
      // Act
      await UserHandler.removeHelperFromUser(
        mockRequest as FastifyRequest<{ Params: { id: string, helperId: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(UserService.removeHelperFromUser).toHaveBeenCalledWith(userId, helperId);
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Helper not assigned to user'
      });
    });
  });
});