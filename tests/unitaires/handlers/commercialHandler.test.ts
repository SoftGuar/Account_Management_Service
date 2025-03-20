// tests/unit/handlers/commercialHandler.test.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import * as CommercialHandler from '../../../app/handlers/commercialHandler';
import { CommercialService } from '../../../app/services/commercialService';

// Mock de CommercialService
jest.mock('../../../app/services/commercialService', () => ({
  CommercialService: {
    createCommercial: jest.fn(),
    getAllCommercials: jest.fn(),
    getCommercialById: jest.fn(),
    updateCommercial: jest.fn(),
    deleteCommercial: jest.fn()
  }
}));

describe('CommercialHandler', () => {
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
  
  describe('createCommercial', () => {
    it('should create a commercial and return 201 status code', async () => {
      // Arrange
      const commercialData = { 
        name: 'Test Commercial', 
        email: 'commercial@example.com',
        phone: '0123456789'
      };
      const newCommercial = { id: 1, ...commercialData };
      
      mockRequest = {
        body: commercialData
      };
      
      (CommercialService.createCommercial as jest.Mock).mockResolvedValue(newCommercial);
      
      // Act
      await CommercialHandler.createCommercial(
        mockRequest as FastifyRequest<{ Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.createCommercial).toHaveBeenCalledWith(commercialData);
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: newCommercial
      });
    });
    
    it('should return 400 status code when service throws an error', async () => {
      // Arrange
      const commercialData = { 
        name: 'Test Commercial', 
        email: 'commercial@example.com',
        phone: '0123456789'
      };
      const error = new Error('Invalid data');
      
      mockRequest = {
        body: commercialData
      };
      
      (CommercialService.createCommercial as jest.Mock).mockRejectedValue(error);
      
      // Act
      await CommercialHandler.createCommercial(
        mockRequest as FastifyRequest<{ Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.createCommercial).toHaveBeenCalledWith(commercialData);
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid data'
      });
    });
  });
  
  describe('getCommercials', () => {
    it('should return all commercials with 200 status code', async () => {
      // Arrange
      const commercials = [
        { id: 1, name: 'Commercial 1', email: 'commercial1@example.com', phone: '0123456789' },
        { id: 2, name: 'Commercial 2', email: 'commercial2@example.com', phone: '9876543210' }
      ];
      
      (CommercialService.getAllCommercials as jest.Mock).mockResolvedValue(commercials);
      
      // Act
      await CommercialHandler.getCommercials(
        mockRequest as FastifyRequest, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.getAllCommercials).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: commercials
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      (CommercialService.getAllCommercials as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await CommercialHandler.getCommercials(
        mockRequest as FastifyRequest, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.getAllCommercials).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
  
  describe('getCommercialById', () => {
    it('should return commercial by id with 200 status code', async () => {
      // Arrange
      const commercialId = 1;
      const commercial = { 
        id: commercialId, 
        name: 'Test Commercial', 
        email: 'commercial@example.com',
        phone: '0123456789'
      };
      
      mockRequest = {
        params: { id: commercialId.toString() }
      };
      
      (CommercialService.getCommercialById as jest.Mock).mockResolvedValue(commercial);
      
      // Act
      await CommercialHandler.getCommercialById(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.getCommercialById).toHaveBeenCalledWith(commercialId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: commercial
      });
    });
    
    it('should return 404 status code when commercial is not found', async () => {
      // Arrange
      const commercialId = 999;
      
      mockRequest = {
        params: { id: commercialId.toString() }
      };
      
      (CommercialService.getCommercialById as jest.Mock).mockResolvedValue(null);
      
      // Act
      await CommercialHandler.getCommercialById(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.getCommercialById).toHaveBeenCalledWith(commercialId);
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Commercial not found'
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      const commercialId = 1;
      
      mockRequest = {
        params: { id: commercialId.toString() }
      };
      
      (CommercialService.getCommercialById as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await CommercialHandler.getCommercialById(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.getCommercialById).toHaveBeenCalledWith(commercialId);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
  
  describe('updateCommercial', () => {
    it('should update commercial and return 200 status code', async () => {
      // Arrange
      const commercialId = 1;
      const commercialData = { 
        name: 'Updated Commercial',
        phone: '9876543210'
      };
      const updatedCommercial = { 
        id: commercialId, 
        name: 'Updated Commercial', 
        email: 'commercial@example.com',
        phone: '9876543210'
      };
      
      mockRequest = {
        params: { id: commercialId.toString() },
        body: commercialData
      };
      
      (CommercialService.updateCommercial as jest.Mock).mockResolvedValue(updatedCommercial);
      
      // Act
      await CommercialHandler.updateCommercial(
        mockRequest as FastifyRequest<{ Params: { id: string }, Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.updateCommercial).toHaveBeenCalledWith(commercialId, commercialData);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        data: updatedCommercial
      });
    });
    
    it('should return 400 status code when service throws an error', async () => {
      // Arrange
      const commercialId = 1;
      const commercialData = { name: 'Updated Commercial' };
      const error = new Error('Invalid data');
      
      mockRequest = {
        params: { id: commercialId.toString() },
        body: commercialData
      };
      
      (CommercialService.updateCommercial as jest.Mock).mockRejectedValue(error);
      
      // Act
      await CommercialHandler.updateCommercial(
        mockRequest as FastifyRequest<{ Params: { id: string }, Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.updateCommercial).toHaveBeenCalledWith(commercialId, commercialData);
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid data'
      });
    });
  });
  
  describe('deleteCommercial', () => {
    it('should delete commercial and return 200 status code', async () => {
      // Arrange
      const commercialId = 1;
      
      mockRequest = {
        params: { id: commercialId.toString() }
      };
      
      (CommercialService.deleteCommercial as jest.Mock).mockResolvedValue(undefined);
      
      // Act
      await CommercialHandler.deleteCommercial(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.deleteCommercial).toHaveBeenCalledWith(commercialId);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: true,
        message: 'Commercial deleted successfully'
      });
    });
    
    it('should return 500 status code when service throws an error', async () => {
      // Arrange
      const commercialId = 1;
      
      mockRequest = {
        params: { id: commercialId.toString() }
      };
      
      (CommercialService.deleteCommercial as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Act
      await CommercialHandler.deleteCommercial(
        mockRequest as FastifyRequest<{ Params: { id: string } }>, 
        mockReply as FastifyReply
      );
      
      // Assert
      expect(CommercialService.deleteCommercial).toHaveBeenCalledWith(commercialId);
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        success: false,
        message: 'An unexpected error occurred'
      });
    });
  });
});