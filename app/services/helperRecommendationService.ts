// services/helperRecommendationService.ts
import bcrypt from 'bcrypt';

import { 
    HelperRecommendationModel, 
    CreateHelperRecommendationInput, 
    UpdateHelperRecommendationInput 
  } from '../models/helperRecommendation.model';
  import { HelperService } from './helperService';
import { UserService } from './userService';
  
  export const HelperRecommendationService = {
    createRecommendation: async (data: CreateHelperRecommendationInput) => {
      try {
        // Try to get the helper - if it returns a value, the helper exists
        let existingHelper = null;
        try {
          existingHelper = await HelperService.getHelperByEmail(data.email);
          // If we reach here without error, the helper exists
          throw new Error('Helper with this email already exists');
        } catch (error: any) {
          // If error message includes "not found", that's expected
          if (!error.message?.toLowerCase().includes('not found')) {
            // Some other error occurred
            throw error;
          }
          // Otherwise it's the "not found" error we expect, so continue
        }
        
        // Check if recommendation with this email already exists
        const existingRecommendation = await HelperRecommendationModel.findByEmail(data.email);
        if (existingRecommendation) {
          throw new Error('Recommendation for this email already exists');
        }
        
        return await HelperRecommendationModel.create(data);
      } catch (error) {
        console.error('Error creating helper recommendation:', error);
        throw error;
      }
    },
     getRecommendationById: async (id: number) => {
      try {
        const recommendation = await HelperRecommendationModel.findById(id);
        if (!recommendation) {
          throw new Error('Helper recommendation not found');
        }
        return recommendation;
      } catch (error) {
        throw error;
      }
    },
    
    getAllRecommendations: async () => {
      try {
        return await HelperRecommendationModel.getAll();
      } catch (error) {
        throw error;
      }
    },
    
    updateRecommendation: async (id: number, data: UpdateHelperRecommendationInput) => {
      try {
        const recommendation = await HelperRecommendationModel.findById(id);
        if (!recommendation) {
          throw new Error('Helper recommendation not found');
        }
        return await HelperRecommendationModel.update(id, data);
      } catch (error) {
        throw error;
      }
    },
    
    approveRecommendation: async (id: number, password: string) => {
      try {
        const recommendation = await HelperRecommendationModel.findById(id);
        if (!recommendation) {
          throw new Error('Helper recommendation not found');
        }
        
        if (recommendation.status !== 'pending') {
          throw new Error('Recommendation is not in pending status');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create actual helper account
        const helper = await HelperService.createHelper({
          first_name: recommendation.first_name,
          last_name: recommendation.last_name,
          email: recommendation.email,
          password: hashedPassword,
          phone: recommendation.phone || undefined,
        });

        const helperUser= await UserService.addHelperToUser(recommendation.user_id, helper.id)
        
        // Update recommendation status
        await HelperRecommendationModel.update(id, { status: 'approved' });
        
        return { helper, recommendation,helperUser };
      } catch (error) {
        throw error;
      }
    },
    
    rejectRecommendation: async (id: number, notes?: string) => {
      try {
        const recommendation = await HelperRecommendationModel.findById(id);
        if (!recommendation) {
          throw new Error('Helper recommendation not found');
        }
        
        return await HelperRecommendationModel.update(id, { 
          status: 'rejected',
          notes: notes ? `${recommendation.notes || ''}\nRejection note: ${notes}` : recommendation.notes
        });
      } catch (error) {
        throw error;
      }
    },
    
    deleteRecommendation: async (id: number) => {
      try {
        const recommendation = await HelperRecommendationModel.findById(id);
        if (!recommendation) {
          throw new Error('Helper recommendation not found');
        }
        return await HelperRecommendationModel.delete(id);
      } catch (error) {
        throw error;
      }
    },
  };