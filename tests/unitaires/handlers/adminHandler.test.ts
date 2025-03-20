import { FastifyRequest, FastifyReply } from 'fastify';
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from '../../../app/handlers/adminHandler';
import { AdminService } from '../../../app/services/adminService';

// Mock du service AdminService
jest.mock('../../../app/services/adminService', () => ({
  AdminService: {
    createAdmin: jest.fn(),
    getAllAdmins: jest.fn(),
    getAdminById: jest.fn(),
    updateAdmin: jest.fn(),
    deleteAdmin: jest.fn()
  }
}));

describe('AdminHandlers', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;
  
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    
    // Configurer les mocks de request et reply
    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });
  
  describe('createAdmin', () => {
    const adminData = { name: 'Test Admin', email: 'admin@test.com', role: 'admin' };
    
    beforeEach(() => {
      mockRequest = {
        body: adminData
      };
    });
    
    it('devrait créer un administrateur avec succès', async () => {
      // Arrangez
      const mockNewAdmin = { id: 1, ...adminData };
      (AdminService.createAdmin as jest.Mock).mockResolvedValue(mockNewAdmin);
      
      // Agissez
      await createAdmin(mockRequest as FastifyRequest<{ Body: any }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(AdminService.createAdmin).toHaveBeenCalledWith(adminData);
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true, data: mockNewAdmin });
    });
    
    it('devrait retourner une erreur si la création échoue', async () => {
      // Arrangez
      const errorMessage = 'Email déjà utilisé';
      const mockError = new Error(errorMessage);
      (AdminService.createAdmin as jest.Mock).mockRejectedValue(mockError);
      
      // Agissez
      await createAdmin(mockRequest as FastifyRequest<{ Body: any }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ success: false, message: errorMessage });
    });
  });
  
  describe('getAdmins', () => {
    beforeEach(() => {
      mockRequest = {};
    });
    
    it('devrait récupérer tous les administrateurs avec succès', async () => {
      // Arrangez
      const mockAdmins = [
        { id: 1, name: 'Admin 1', email: 'admin1@test.com', role: 'admin' },
        { id: 2, name: 'Admin 2', email: 'admin2@test.com', role: 'super_admin' }
      ];
      (AdminService.getAllAdmins as jest.Mock).mockResolvedValue(mockAdmins);
      
      // Agissez
      await getAdmins(mockRequest as FastifyRequest, mockReply as FastifyReply);
      
      // Affirmez
      expect(AdminService.getAllAdmins).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true, data: mockAdmins });
    });
    
    it('devrait retourner une erreur si la récupération échoue', async () => {
      // Arrangez
      (AdminService.getAllAdmins as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Agissez
      await getAdmins(mockRequest as FastifyRequest, mockReply as FastifyReply);
      
      // Affirmez
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ success: false, message: 'An unexpected error occurred' });
    });
  });
  
  describe('getAdminById', () => {
    const adminId = '1';
    
    beforeEach(() => {
      mockRequest = {
        params: { id: adminId }
      };
    });
    
    it('devrait récupérer un administrateur par ID avec succès', async () => {
      // Arrangez
      const mockAdmin = { id: 1, name: 'Test Admin', email: 'admin@test.com', role: 'admin' };
      (AdminService.getAdminById as jest.Mock).mockResolvedValue(mockAdmin);
      
      // Agissez
      await getAdminById(mockRequest as FastifyRequest<{ Params: { id: string } }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(AdminService.getAdminById).toHaveBeenCalledWith(1);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true, data: mockAdmin });
    });
    
    it('devrait retourner 404 si l\'administrateur n\'est pas trouvé', async () => {
      // Arrangez
      (AdminService.getAdminById as jest.Mock).mockResolvedValue(null);
      
      // Agissez
      await getAdminById(mockRequest as FastifyRequest<{ Params: { id: string } }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({ success: false, message: 'Admin not found' });
    });
    
    it('devrait retourner une erreur si la récupération échoue', async () => {
      // Arrangez
      (AdminService.getAdminById as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Agissez
      await getAdminById(mockRequest as FastifyRequest<{ Params: { id: string } }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ success: false, message: 'An unexpected error occurred' });
    });
  });
  
  describe('updateAdmin', () => {
    const adminId = '1';
    const updateData = { name: 'Updated Admin', role: 'super_admin' };
    
    beforeEach(() => {
      mockRequest = {
        params: { id: adminId },
        body: updateData
      };
    });
    
    it('devrait mettre à jour un administrateur avec succès', async () => {
      // Arrangez
      const mockUpdatedAdmin = { id: 1, ...updateData, email: 'admin@test.com' };
      (AdminService.updateAdmin as jest.Mock).mockResolvedValue(mockUpdatedAdmin);
      
      // Agissez
      await updateAdmin(
        mockRequest as FastifyRequest<{ Params: { id: string }, Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Affirmez
      expect(AdminService.updateAdmin).toHaveBeenCalledWith(1, updateData);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true, data: mockUpdatedAdmin });
    });
    
    it('devrait retourner une erreur si la mise à jour échoue', async () => {
      // Arrangez
      const errorMessage = 'Admin not found';
      const mockError = new Error(errorMessage);
      (AdminService.updateAdmin as jest.Mock).mockRejectedValue(mockError);
      
      // Agissez
      await updateAdmin(
        mockRequest as FastifyRequest<{ Params: { id: string }, Body: any }>, 
        mockReply as FastifyReply
      );
      
      // Affirmez
      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ success: false, message: errorMessage });
    });
  });
  
  describe('deleteAdmin', () => {
    const adminId = '1';
    
    beforeEach(() => {
      mockRequest = {
        params: { id: adminId }
      };
    });
    
    it('devrait supprimer un administrateur avec succès', async () => {
      // Arrangez
      (AdminService.deleteAdmin as jest.Mock).mockResolvedValue(true);
      
      // Agissez
      await deleteAdmin(mockRequest as FastifyRequest<{ Params: { id: string } }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(AdminService.deleteAdmin).toHaveBeenCalledWith(1);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ success: true, message: 'Admin deleted successfully' });
    });
    
    it('devrait retourner une erreur si la suppression échoue', async () => {
      // Arrangez
      (AdminService.deleteAdmin as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      // Agissez
      await deleteAdmin(mockRequest as FastifyRequest<{ Params: { id: string } }>, mockReply as FastifyReply);
      
      // Affirmez
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ success: false, message: 'An unexpected error occurred' });
    });
  });
});